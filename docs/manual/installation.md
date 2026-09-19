# Installation

## Voraussetzungen

- Ein Server für Hannah Core — läuft z. B. auf einem Raspberry Pi 5 (auf einem solchen
  mit 8GB RAM laufen im Dauerbetrieb seit Langem zusätzlich auch noch VoiceID, Timer,
  WebUI, Telegram und Proxy mit). Eine verlässliche RAM-Untergrenze gibt es nicht — das
  hängt stark davon ab, ob Spracherkennung/-ausgabe lokal laufen (Whisper und Piper
  laden ihre Modelle in den RAM und verarbeiten dort auch die rohen Audiodaten) oder
  über einen Cloud-Dienst wie Azure, wodurch Core selbst sehr genügsam bleibt. Als grobe
  Richtschnur: für dich allein oder zu zweit dürften 2GB reichen, mehr schadet aber nie.
  Ein leistungsstärkerer Server (z. B. x86) ist ebenso geeignet
- Eine laufende [ioBroker](https://www.iobroker.com/)-Instanz
- Mindestens ein Satellit — entweder die eigene Platine (siehe [Hardware](../hardware/overview.md)) oder ein Dev-Kit zum Ausprobieren

Es gibt zwei Wege, Hannah selbst zu betreiben: als Docker-Container, oder nativ per
Installations-Script pro Komponente.

=== "Docker Compose"

    Die einfachste Variante.

    **Du möchtest Hannah nur erstmal ausprobieren?** Dann brauchst du zunächst nur Core und
    WebUI. Die anderen Dienste in der folgenden Compose-Datei sind optional und werden erst
    durch ein passendes Profile aktiviert (Details weiter unten).

    Zum Kopieren als `docker-compose.yml`:

    ??? note "docker-compose.yml anzeigen"
        ```yaml
        services:
          hannah-core:
            image: quay.io/m1kad0/hannah-core:latest
            container_name: hannah-core
            restart: unless-stopped
            pull_policy: always
            depends_on:
              mysql-db:
                condition: service_healthy
                required: false
              mosquitto:
                condition: service_healthy
                required: false
            ports:
              - "50051:50051"
            networks:
              - hannah_network
            volumes:
              - core_activity_audio:/app/activity_audio
              - core_audio_dumps:/app/audio_dumps
              - core_data:/app/data
              - ./core-config.yaml:/etc/hannah/config.yaml:ro

          hannah-webui:
            image: quay.io/m1kad0/hannah-webui:latest
            container_name: hannah-webui
            restart: unless-stopped
            pull_policy: always
            depends_on:
              - hannah-core
            networks:
              - hannah_network
            ports:
              - "5000:5000"
            environment:
              HANNAH_WEBUI_SECRET_KEY: "change-me-to-a-random-string"
              HANNAH_WEBUI_GRPC_HOST: "hannah-core"
              HANNAH_WEBUI_GRPC_PORT: "50051"

          hannah-telegram:
            image: quay.io/m1kad0/hannah-telegram:latest
            container_name: hannah-telegram
            restart: unless-stopped
            pull_policy: always
            profiles: ["full", "integrations", "telegram"]
            depends_on:
              - hannah-core
            networks:
              - hannah_network
            volumes:
              - ./telegram-config.yaml:/etc/hannah-telegram/config.yaml:ro

          hannah-proxy:
            image: quay.io/m1kad0/hannah-proxy:latest
            container_name: hannah-proxy
            restart: unless-stopped
            pull_policy: always
            profiles: ["full", "with-proxy"]
            depends_on:
              - hannah-core
            networks:
              - hannah_network
            volumes:
              - ./proxy-config.yaml:/etc/hannah-proxy/config.yaml:ro

          hannah-voiceid:
            image: quay.io/m1kad0/hannah-voiceid:latest-cpu
            container_name: hannah-voiceid
            restart: unless-stopped
            pull_policy: always
            profiles: ["full", "with-voiceid"]
            depends_on:
              - hannah-core
            networks:
              - hannah_network
            volumes:
              - ./voiceid-config.yaml:/etc/hannah-voiceid/config.yaml:ro
              - hannah_mem:/mnt/hannah_mem

          hannah-timer:
            image: quay.io/m1kad0/hannah-timer:latest
            container_name: hannah-timer
            restart: unless-stopped
            pull_policy: always
            profiles: ["full", "with-timer"]
            depends_on:
              - hannah-core
            networks:
              - hannah_network
            environment:
              HANNAH_TIMER_HANNAH_ADDRESS: "hannah-core:50051"
              HANNAH_TIMER_LOG_LEVEL: "info"
            volumes:
              - timer_data:/app/data

          mysql-db:
            image: mysql:8.0
            container_name: hannah-db
            profiles: ["full", "with-db"]
            environment:
              MYSQL_ROOT_PASSWORD: change-me
              MYSQL_DATABASE: hannah_db
              MYSQL_USER: hannah_user
              MYSQL_PASSWORD: change-me
            networks:
              - hannah_network
            volumes:
              - mysql_data:/var/lib/mysql
            healthcheck:
              test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-pchange-me"]
              interval: 5s
              timeout: 5s
              retries: 5

          mosquitto:
            image: eclipse-mosquitto:2
            container_name: hannah-mosquitto
            profiles: ["full", "with-mqtt"]
            restart: unless-stopped
            networks:
              - hannah_network
            ports:
              - "1883:1883"
              - "9001:9001"
            volumes:
              - mosquitto_data:/mosquitto/data
              - mosquitto_log:/mosquitto/log
              - ./mosquitto.conf:/mosquitto/config/mosquitto.conf:ro
            healthcheck:
              test: ["CMD-SHELL", "nc -z localhost 1883 || exit 1"]
              interval: 5s
              timeout: 3s
              retries: 5

        volumes:
          core_data:
          core_activity_audio:
          core_audio_dumps:
          timer_data:
          mysql_data:
          mosquitto_data:
          mosquitto_log:
          hannah_mem:

        networks:
          hannah_network:
            driver: bridge
        ```

    !!! warning "Passwörter ändern"
        Alle Platzhalter, die mit `change-me` beginnen, vor dem produktiven Einsatz durch
        eigene, zufällige Werte ersetzen — die MySQL-Passwörter (dort steht wörtlich
        `change-me`) und der WebUI-Secret-Key (dort steht `change-me-to-a-random-string`).

    ### Config-Dateien anlegen

    **Bevor** du `docker compose up -d` ausführst: Core (und jede weitere Komponente, die du
    per Profile dazuschaltest) braucht ihre eigene Config-Datei im selben Verzeichnis wie
    die `docker-compose.yml` — z. B. `core-config.yaml`. Fehlt sie, legt Docker beim Start
    automatisch einen leeren *Ordner* mit genau diesem Namen an, die Komponente findet keine
    gültige Config und startet mit Fehlern (in den Core-Logs sichtbar).

    Für den Standard-Fall (nur Core + WebUI) reicht eine Datei — WebUI selbst braucht keine
    eigene, ihre Einstellungen kommen komplett über Umgebungsvariablen in der
    `docker-compose.yml`:

    ```bash
    curl -fsSL https://raw.githubusercontent.com/NurPech/hannah/master/core/config.example.yaml -o core-config.yaml
    nano core-config.yaml
    ```

    Mindestens `mqtt.host` musst du auf deinen Broker zeigen lassen, sonst findet Core ihn
    gar nicht erst — Benutzername/Passwort sind dagegen optional, nur nötig, wenn dein
    Broker Zugangsdaten verlangt (Mosquitto läuft im Standardfall sogar ganz ohne Auth,
    siehe [with-mqtt](#mosquitto-config-nur-bei-with-mqtt) weiter unten). Alle Schlüssel
    erklärt [Core → Konfiguration](../components/core/configuration.md).

    Schaltest du später weitere Profile dazu, brauchen auch die jeweils ihre eigene
    Config-Datei — mit Ausnahme von [WebUI](../components/webui/installation.md) (siehe
    oben) und [Timer](../components/timer/installation.md): beide wurden von Anfang an
    container-tauglich gebaut und nehmen ihre gesamte Konfiguration über
    Umgebungsvariablen statt einer Datei entgegen.

    ```bash title="Telegram"
    curl -fsSL https://raw.githubusercontent.com/NurPech/hannah/master/telegram/config.example.yaml -o telegram-config.yaml
    ```

    ```bash title="Proxy"
    curl -fsSL https://raw.githubusercontent.com/NurPech/hannah/master/proxy/config.example.yaml -o proxy-config.yaml
    ```

    ```bash title="VoiceID"
    curl -fsSL https://raw.githubusercontent.com/NurPech/hannah/master/voiceid/config.example.yaml -o voiceid-config.yaml
    ```

    Welche Schlüssel jede Komponente hat, steht auf ihrer jeweiligen Seite unter
    [Komponenten](../components/index.md).

    Ohne weitere Angaben startet `docker compose up -d` nur Core und die WebUI. Weitere
    Dienste sind über **Profiles** opt-in, z. B.:

    | Profile | Aktiviert |
    |---|---|
    | `with-proxy` | Proxy (nimmt Core die UDP-Verarbeitung ab) |
    | `with-voiceid` | Speaker-ID |
    | `with-timer` | Timer/Wecker-Service |
    | `telegram` | Telegram-Bot |
    | `with-db` | MySQL (Activity-Log) |
    | `with-mqtt` | Mosquitto (falls du keinen eigenen MQTT-Broker hast) |
    | `full` | alles zusammen |

    ### Mosquitto-Config (nur bei `with-mqtt`)

    Hast du schon einen eigenen MQTT-Broker, ignorier diesen Abschnitt — trag einfach seine
    Adresse in `mqtt.host` (`core-config.yaml`) ein. Aktivierst du stattdessen `with-mqtt`,
    um den mitgelieferten Mosquitto-Broker zu nutzen, braucht auch der eine eigene
    Config-Datei im selben Verzeichnis, `mosquitto.conf` — ohne sie startet der Container
    gar nicht erst (derselbe leerer-Ordner-Effekt wie bei einer fehlenden
    `core-config.yaml`). Zum Ausprobieren reicht die denkbar einfachste Variante, ganz ohne
    Authentifizierung:

    ```title="mosquitto.conf"
    listener 1883
    allow_anonymous true
    ```

    Zeig in dem Fall in `core-config.yaml` mit `mqtt.host: "mosquitto"` auf den
    Container-Namen (nicht auf `localhost` oder eine IP) — beide laufen im selben
    Docker-Netzwerk. Wer den Broker absichern will (Passwort, TLS, …), findet das in der
    [offiziellen Mosquitto-Doku](https://mosquitto.org/documentation/authentication-methods/).

    Profiles lassen sich beliebig kombinieren — du musst nicht gleich zu `full` greifen, nur
    weil du mehr als Core+WebUI willst. Beispiel: MQTT-Broker und Activity-Log dazuschalten,
    alles andere weglassen:

    ```bash
    docker compose --profile with-mqtt --profile with-db up -d
    ```

    `full` bleibt die Abkürzung, wenn du wirklich alles auf einmal willst:

    ```bash
    docker compose --profile full up -d
    ```

    ### Prüfen, ob es läuft

    ```bash
    docker compose ps
    docker compose logs -f hannah-core
    ```

    `ps` zeigt, ob die Container wirklich laufen (Status `Up`) oder ständig neu starten;
    `logs -f` folgt dem Log eines Containers live — `hannah-core` durch den Namen jeder
    anderen Komponente ersetzen (z. B. `hannah-webui`), um deren Log zu sehen. Beendet mit
    Strg+C.

=== "Native Installation"

    Kein Docker: jede Komponente installiert sich per eigenem `deploy/install.sh` direkt auf
    den Host und läuft dort als eigener systemd-Service. Sinnvoll, wenn du Docker grundsätzlich
    nicht willst, oder auf Hardware, auf der Container-Overhead spürbar wäre.

    **Zwei Ausnahmen vom Muster unten:**

    - [Timer](../components/timer/index.md) gibt es nur als Docker-Image — kein natives
      `install.sh`.
    - [Proxy](../components/proxy/index.md) installiert nur ein einzelnes Binary (kein
      eigenes Verzeichnis unter `/opt/hannah`, kein venv) — Details auf seiner eigenen
      Seite.

    ### Der immer gleiche Ablauf

    Alle übrigen Komponenten (Core, WebUI, Telegram, VoiceID, AutoDeploy) folgen demselben
    Muster. Am Beispiel Core — für die exakten Befehle, Pfade und Variablen jeder anderen
    Komponente siehe ihre eigene Seite unter [Komponenten](../components/index.md):

    **1. Installieren** — läuft als root, legt einen eigenen `hannah`-Systemuser an
    (AutoDeploy ist die einzige Ausnahme, die läuft selbst als root), installiert unter
    `/opt/hannah/<komponente>`:

    ```bash
    curl -fsSL https://raw.githubusercontent.com/NurPech/hannah/master/core/deploy/install.sh | sudo bash
    ```

    **2. Konfigurieren** — Vorlage kopieren, anpassen, Dienst starten:

    ```bash
    sudo cp /opt/hannah/core/config.example.yaml /etc/hannah/config.yaml
    sudo nano /etc/hannah/config.yaml
    sudo systemctl enable --now hannah
    ```

    **3. Prüfen, ob es läuft:**

    ```bash
    sudo systemctl status hannah
    sudo journalctl -u hannah -f
    ```

    **4. Aktuell halten** — entweder das Install-Script bei jedem neuen Release erneut
    ausführen, oder [AutoDeploy](../components/autodeploy/index.md) das automatisch für dich
    erledigen lassen ([Sicherheitshinweis](../components/autodeploy/index.md) dort unbedingt
    vorher lesen).

    **5. Deinstallieren** — kein erneuter Download nötig, das Script liegt schon im
    Installationsverzeichnis:

    ```bash
    sudo bash /opt/hannah/core/deploy/install.sh --uninstall
    ```

    [Core → Installation](../components/core/installation.md) zeigt genau diesen Ablauf noch
    einmal im Detail; die anderen Komponentenseiten unter [Komponenten](../components/index.md)
    folgen demselben Schema mit ihren jeweiligen Pfaden und Variablen.

## Nächste Schritte

Läuft alles, geht's mit der WebUI weiter: erst [Nutzerverwaltung](users.md) (wer darf
was) und [Satelliten verwalten](satellites.md) (Räume/Besitzer zuordnen), dann
[Smart-Home-Integration](smart-home-integration.md), um ioBroker-Geräte per Sprache
steuerbar zu machen.
