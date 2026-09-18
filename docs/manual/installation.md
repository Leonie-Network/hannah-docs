# Installation

## Voraussetzungen

- Ein Server für Hannah Core — ein Raspberry Pi reicht, Hannah ist aber nicht darauf festgelegt
- Eine laufende [ioBroker](https://www.iobroker.com/)-Instanz
- Mindestens ein Satellit — entweder die eigene Platine (siehe [Hardware](../hardware/overview.md)) oder ein Dev-Kit zum Ausprobieren

Es gibt zwei Wege, Hannah selbst zu betreiben: als Docker-Container, oder nativ per
Installations-Script pro Komponente.

## Variante 1: Docker Compose

Die einfachste Variante. Zum Kopieren als `docker-compose.yml`:

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
          HANNAH_WEBUI_SECRET_KEY: "change-me-to-a-random-base64-string"
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
    Die `change-me`-Platzhalter (MySQL-Passwörter, WebUI-Secret-Key) vor dem produktiven
    Einsatz durch eigene, zufällige Werte ersetzen.

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

```bash
docker compose --profile full up -d
```

Jede Komponente braucht ihre eigene Config-Datei (`core-config.yaml`,
`proxy-config.yaml`, …) im selben Verzeichnis wie die `docker-compose.yml`. Als
Startpunkt dienen die `config.example.yaml`-Dateien im jeweiligen Komponenten-Ordner des
[hannah-Repos](https://github.com/NurPech/hannah) (z. B. `core/config.example.yaml`).

## Variante 2: Native Installation per Script

Jede Komponente hat ihr eigenes `deploy/install.sh` (z. B. `core/deploy/install.sh`,
`proxy/deploy/install.sh`, `telegram/deploy/install.sh`, `voiceid/deploy/install.sh`).
Gemeinsames Muster:

- lädt das aktuelle Release vom Hannah-Update-Server
- installiert es als systemd-Service, laufend unter einem eigenen `hannah`-System-User
- Config liegt unter `/etc/hannah/` (bzw. `/etc/hannah-<komponente>/`)
- muss als root laufen (`sudo bash install.sh`)

```bash
sudo bash install.sh              # installieren oder aktualisieren
sudo bash install.sh --uninstall  # deinstallieren (Config bleibt erhalten)
```

Steuerbar über Umgebungsvariablen, u. a. `CORE_CHANNEL` (Release-Kanal, Default
`core-stable`) und `UPDATE_SERVER_TOKEN` (nur nötig für nicht-öffentliche Kanäle).

*(Konfiguration pro Komponente folgt in eigenen Abschnitten.)*

## Auto-Update

Es gibt einen zusätzlichen Dienst, der die anderen Komponenten automatisch aktuell hält —
"AutoDeploy" genannt, obwohl "Auto-Update" die Funktion eigentlich besser trifft (der Name
wird langfristig noch überarbeitet). Auch dieser lässt sich wie die anderen Komponenten
per `install.sh` installieren, läuft aber als root statt als `hannah`-User.

*(Konfiguration pro Komponente folgt.)*
