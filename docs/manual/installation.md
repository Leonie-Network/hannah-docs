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
- **Ein erreichbarer MQTT-Broker.** Core startet zwar auch ohne, aber Satelliten-Steuerung
  und MQTT-basierte Trigger funktionieren dann nicht — das ergibt so wenig Sinn. Hast du
  schon einen eigenen (z. B. für andere Smart-Home-Komponenten), trägst du nur seine
  Adresse ein. Sonst bringt die Docker-Compose-Variante weiter unten optional einen fertig
  konfigurierten Mosquitto-Broker mit.

Es gibt zwei Wege, Hannah selbst zu betreiben: als Docker-Container, oder nativ per
Installations-Script pro Komponente.

=== "Docker (Schnellstart)"

    Komponenten anklicken, fertige `docker-compose.yml` bekommen — inklusive automatisch
    generierter Passwörter, ganz ohne separate Config-Dateien. Der schnellste Weg, Hannah
    auszuprobieren.

    !!! tip "Docker-Kenner"
        Willst du die Datei lieber selbst anpassen (eigene Image-Tags, zusätzliche Volumes,
        volle Kontrolle) — siehe Tab **Docker Compose (für Docker-Kenner)**.

    <style>
    .hannah-compose-builder{border:1px solid var(--md-default-fg-color--lightest,#c7d0da);border-radius:12px;padding:20px;margin:16px 0;font-family:system-ui,-apple-system,sans-serif}
    .hannah-compose-builder fieldset{border:1px solid var(--md-default-fg-color--lightest,#c7d0da);border-radius:8px;margin:0 0 16px;padding:12px 16px}
    .hannah-compose-builder legend{font-weight:600;padding:0 4px}
    .hannah-compose-builder label{display:block;margin:8px 0;font-size:.95rem}
    .hannah-compose-builder label input[type="text"],
    .hannah-compose-builder label input[type="password"]{display:block;width:100%;max-width:420px;margin-top:6px;padding:10px 12px;font-size:1rem;border:1px solid var(--md-default-fg-color--light,#8b96a3);border-radius:6px;background:var(--md-code-bg-color,#f5f5f5);color:var(--md-default-fg-color,#1c2430)}
    .hannah-compose-builder label input[type="text"]:focus,
    .hannah-compose-builder label input[type="password"]:focus{outline:none;border-color:var(--md-accent-fg-color,#5b4fd1);box-shadow:0 0 0 3px var(--md-accent-fg-color--transparent,rgba(91,79,209,.25))}
    .hannah-compose-builder label input[type="checkbox"],
    .hannah-compose-builder label input[type="radio"]{margin-right:8px}
    .hannah-compose-builder [data-hcb="generate"]{background:var(--md-primary-fg-color,#5b4fd1);color:#fff;border:none;border-radius:6px;padding:10px 18px;font-size:1rem;cursor:pointer;margin-top:8px}
    .hannah-compose-builder [data-hcb="download-compose"],
    .hannah-compose-builder [data-copy-target]{background:var(--md-default-fg-color--lightest,#c7d0da);border:none;border-radius:6px;padding:8px 14px;cursor:pointer;margin-top:8px;margin-right:8px}
    .hannah-compose-builder [data-hcb="errors"]{background:#fdecea;color:#611a15;border-radius:8px;padding:12px 16px;margin:12px 0}
    .hannah-compose-builder pre{max-height:420px;overflow:auto}
    .hannah-compose-builder .admonition:first-child{margin-top:0}
    </style>

    <div class="hannah-compose-builder" id="hannah-compose-builder">

    <div class="admonition tip">
    <p class="admonition-title">🧩 Interaktiver Builder</p>
    <p>Häkchen setzen, Felder ausfüllen — unten direkt die passende <code>docker-compose.yml</code> herunterladen.</p>
    </div>

    <p><strong>Core</strong> und <strong>WebUI</strong> sind immer dabei — alles andere ist optional.</p>

    <label>IP-Adresse dieses Docker-Hosts im Netzwerk (Pflicht — deine Satelliten müssen Hannah über
    diese Adresse erreichen können, egal ob mit oder ohne Proxy)
    <input type="text" data-hcb="host-lan-ip" placeholder="192.168.1.5"></label>

    <fieldset>
    <legend>Komponenten</legend>
    <label><input type="checkbox" checked disabled> Core (immer dabei)</label>
    <label><input type="checkbox" checked disabled> WebUI (immer dabei)</label>
    <label style="margin-left:24px"><input type="checkbox" data-hcb="webui-tls"> TLS aktivieren (selbstsigniertes Zertifikat, z.B. für Telegram-Login-Widget)</label>
    <label><input type="checkbox" data-hcb="component-telegram"> Telegram — Hannah per Chat ansprechen</label>
    <div data-hcb="telegram-fields" hidden style="margin-left:24px">
    <label>Bot-Token (von <a href="https://core.telegram.org/bots#how-do-i-create-a-bot">@BotFather</a>)<input type="text" data-hcb="telegram-token" placeholder="123456:ABC-DEF..."></label>
    <label>WebUI-URL für Bot-Antworten (optional)<input type="text" data-hcb="telegram-webui-url" placeholder="https://hannah.example.com"></label>
    </div>
    <label><input type="checkbox" data-hcb="component-proxy"> Proxy — nimmt Core die UDP-Verarbeitung ab</label>
    <label><input type="checkbox" data-hcb="component-voiceid"> VoiceID — erkennt wer spricht</label>
    <label><input type="checkbox" data-hcb="component-timer"> Timer — Timer und Wecker</label>
    </fieldset>

    <fieldset>
    <legend>MQTT-Broker (kein Optional-Teil — Core braucht immer einen)</legend>
    <label><input type="radio" name="hcb-mqtt-mode" value="bundled" checked> Mitgelieferten Mosquitto nutzen (einfachster Fall, ohne Auth)</label>
    <label><input type="radio" name="hcb-mqtt-mode" value="own"> Eigenen Broker verwenden</label>
    <div data-hcb="mqtt-own-fields" hidden style="margin-left:24px">
    <label>Adresse<input type="text" data-hcb="mqtt-host" placeholder="192.168.1.1"></label>
    <label>Port (optional, Default 1883)<input type="text" data-hcb="mqtt-port"></label>
    <label>Benutzername (optional)<input type="text" data-hcb="mqtt-user"></label>
    <label>Passwort (optional)<input type="password" data-hcb="mqtt-pass"></label>
    </div>
    </fieldset>

    <fieldset>
    <legend>Aktivitäts-Log</legend>
    <label><input type="checkbox" data-hcb="activity-log-enabled"> Aktivitäts-Log aktivieren</label>
    <div data-hcb="db-fields" hidden style="margin-left:24px">
    <label><input type="radio" name="hcb-db-mode" value="bundled" checked> Mitgelieferte Datenbank verwenden</label>
    <label><input type="radio" name="hcb-db-mode" value="own"> Bestehende Datenbank verwenden</label>
    <div data-hcb="db-own-fields" hidden style="margin-left:24px">
    <label>Adresse<input type="text" data-hcb="db-host" placeholder="192.168.1.X"></label>
    <label>Port (optional, Default 3306)<input type="text" data-hcb="db-port"></label>
    <label>Benutzername<input type="text" data-hcb="db-user"></label>
    <label>Passwort<input type="password" data-hcb="db-pass"></label>
    <label>Datenbankname<input type="text" data-hcb="db-name"></label>
    </div>
    </div>
    </fieldset>

    <div data-hcb="errors" hidden></div>

    <button type="button" data-hcb="generate">docker-compose.yml erzeugen</button>

    <div data-hcb="output" hidden>
    <p>Fertig — Passwörter und Secrets wurden automatisch zufällig generiert, keine
    <code>change-me</code>-Platzhalter mehr. Einfach herunterladen und
    <code>docker compose up -d</code> ausführen.</p>
    <p>Danach kurz <code>docker compose logs -f hannah-core</code> prüfen — beim
    allerersten Start steht dort dein generierter Admin-Login, siehe
    <a href="../users/#erster-login">Nutzerverwaltung → Erster Login</a>.</p>
    <pre><code data-hcb="yaml-code"></code></pre>
    <button type="button" data-hcb="download-compose">docker-compose.yml herunterladen</button>
    <button type="button" data-copy-target='[data-hcb="yaml-code"]'>In Zwischenablage kopieren</button>
    </div>

    </div>

=== "Docker Compose (für Docker-Kenner)"

    Für alle, die sich mit Docker auskennen und die Datei lieber selbst anpassen (z.B. eigene
    Image-Tags, zusätzliche Volumes) — der Builder im Tab **Docker (Schnellstart)** deckt den
    Standardfall ab, hier die volle Datei mit allen Komponenten über Profiles gesteuert.

    **Du möchtest Hannah nur erstmal ausprobieren?** Dann brauchst du zunächst nur Core und
    WebUI. Die anderen Dienste in der folgenden Compose-Datei sind optional und werden erst
    durch ein passendes Profile aktiviert (Details weiter unten) — nur bei MQTT lohnt sich
    ein genauerer Blick: Core startet zwar auch ohne Broker durch, aber ohne einen (eigenen
    oder per `with-mqtt` mitgeliefert) funktioniert nichts, was über Satelliten oder
    MQTT-Trigger läuft. "Optional" bei Mosquitto heißt nur: der *mitgelieferte Container*
    ist optional, falls du schon einen eigenen Broker hast — nicht MQTT als Ganzes.

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
              - "7775:7775/udp"
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
            volumes:
              - webui_data:/data
            environment:
              HANNAH_WEBUI_SECRET_KEY: "change-me-to-a-random-string"
              HANNAH_WEBUI_GRPC_HOST: "hannah-core"
              HANNAH_WEBUI_GRPC_PORT: "50051"
              # Optional: natives TLS fürs Telegram-Login-Widget, siehe
              # Telegram-Verknüpfung einrichten (WebUI-Komponente)
              # HANNAH_WEBUI_TLS_ENABLED: "true"

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
            # Nutzt du with-proxy: hier "- \"7775:7775/udp\"" ergänzen und dieselbe
            # Zeile bei hannah-core entfernen (Port-Konflikt sonst, siehe Warnhinweis oben)
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
          webui_data:
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

    !!! warning "udp.advertise_host setzen"
        Ohne Proxy (siehe Profile-Tabelle unten) übernimmt Core selbst die UDP-Verbindung zu
        deinen Satelliten — dafür muss `udp.advertise_host` in `core-config.yaml` auf die
        **LAN-IP-Adresse dieses Docker-Hosts** zeigen (nicht leer lassen: Core würde sonst
        seine eigene, von außen unerreichbare Container-Adresse im Netzwerk bekanntgeben, und
        kein Satellit findet sie).

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

    !!! warning "MQTT ist keine Option, nur der Broker dahinter"
        Core braucht immer einen erreichbaren MQTT-Broker, um richtig zu funktionieren —
        ohne läuft er zwar an, aber Satelliten-Steuerung und MQTT-Trigger bleiben tot.
        `with-mqtt` ist nur dann verzichtbar, wenn `mqtt.host` stattdessen auf einen
        eigenen, bereits laufenden Broker zeigt.

    !!! warning "with-proxy: Port-Zeile manuell umziehen"
        Core und Proxy können nicht beide gleichzeitig Port `7775/udp` auf dem Host
        belegen — `docker compose up -d` startet sonst nur den ersten der beiden, der
        zweite scheitert mit "port is already allocated". Aktivierst du `with-proxy`,
        musst du deshalb von Hand:

        1. bei `hannah-core` die Zeile `- "7775:7775/udp"` unter `ports:` entfernen
        2. sie stattdessen bei `hannah-proxy` unter `ports:` eintragen
        3. in `proxy-config.yaml` `udp.advertise_host` auf die LAN-IP dieses Docker-Hosts
           setzen (dieselbe Adresse wie oben bei `udp.advertise_host` in `core-config.yaml`
           — die braucht Core dann nicht mehr, weil sie ihre UDP-Verarbeitung an Proxy
           abgibt)

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

    !!! tip "Admin-Zugangsdaten stehen im Log"
        Beim allerersten Start legt Core automatisch einen Admin-Account mit zufälligem
        Passwort an und gibt beides genau einmal hier aus — siehe
        [Nutzerverwaltung → Erster Login](users.md#erster-login).

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

    Beim allerersten Start legt Core hier automatisch einen Admin-Account mit zufälligem
    Passwort an und gibt beides genau einmal aus — siehe
    [Nutzerverwaltung → Erster Login](users.md#erster-login).

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

Läuft alles, geht's mit der WebUI weiter: zuerst mit den Admin-Zugangsdaten aus dem
Core-Log einloggen (siehe [Nutzerverwaltung → Erster Login](users.md#erster-login)), dann
[Nutzerverwaltung](users.md) (wer darf was) und [Satelliten verwalten](satellites.md)
(Räume/Besitzer zuordnen), dann [Smart-Home-Integration](smart-home-integration.md), um
ioBroker-Geräte per Sprache steuerbar zu machen.
