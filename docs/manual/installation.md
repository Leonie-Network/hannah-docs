# Installation

## Voraussetzungen

- Ein Server für Hannah Core — ein Raspberry Pi reicht, Hannah ist aber nicht darauf festgelegt
- Eine laufende [ioBroker](https://www.iobroker.com/)-Instanz
- Mindestens ein Satellit — entweder die eigene Platine (siehe [Hardware](../hardware/overview.md)) oder ein Dev-Kit zum Ausprobieren

Es gibt zwei Wege, Hannah selbst zu betreiben: als Docker-Container, oder nativ per
Installations-Script pro Komponente.

## Variante 1: Docker Compose

Die einfachste Variante. Eine passende `docker-compose.yml` liegt im
[hannah-Repo](https://github.com/NurPech/hannah):

```yaml
services:
  hannah-core:
    image: quay.io/m1kad0/hannah-core:latest
    container_name: hannah-core
    restart: unless-stopped
    pull_policy: always
    ports:
      - "50051:50051"
    networks:
      - hannah_network
    volumes:
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
      HANNAH_WEBUI_GRPC_HOST: "hannah-core"
      HANNAH_WEBUI_GRPC_PORT: "50051"

networks:
  hannah_network:
    driver: bridge
```

*(Gekürzter Ausschnitt — die vollständige Datei mit allen optionalen Diensten liegt im
Repo.)*

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
