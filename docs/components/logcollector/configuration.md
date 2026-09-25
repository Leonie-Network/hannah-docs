# Konfiguration

Ein Wert ist wirklich Pflicht: `hannah.address`, die Adresse deiner Core-Instanz. Alles
andere kannst du zunächst so lassen.

Die übrigen Komponenten brauchst du dafür **nicht** anzufassen: Der LogCollector meldet sich
beim Start selbst bei Hannah Core an, und Core teilt allen verbundenen Komponenten mit, wohin
sie ihre Logs schicken sollen.

Der LogCollector hat keine eigene Datenbank für Einstellungen — die komplette Konfiguration
liegt in `config.yaml` (native Installation: `/etc/hannah-logcollector/config.yaml`). Jeder
Wert lässt sich zusätzlich per Umgebungsvariable überschreiben, siehe [unten](#umgebungsvariablen).

```yaml
hannah:
  address: "192.168.8.15:50051"   # Hannah Core gRPC address

server:
  listen: ":50060"                # address the LogService listens on
  advertise_host: ""              # host announced to Hannah; empty = the address the collector connects from
  advertise_port: 0               # port announced to Hannah; 0 = the port from `listen`
  instance: "default"             # name of this collector

db:
  path: "/opt/hannah/logcollector/logs.db"

retention:
  days: 7
  max_size_mb: 256

log:
  level: "info"                   # debug | info | warn | error
```

| Schlüssel | Standard | Zweck |
|---|---|---|
| `hannah.address` | `localhost:50051` | `host:port` von Hannah Cores gRPC-Server |
| `server.listen` | `:50060` | Adresse, auf der der LogCollector die Logs der Komponenten entgegennimmt |
| `server.advertise_host` | leer | Adresse, die Core den Komponenten als Ziel mitteilt. Leer lassen, dann nimmt Core die Adresse, von der aus sich der LogCollector verbunden hat. Nur setzen, wenn die übrigen Komponenten den LogCollector unter dieser Adresse nicht erreichen (z. B. Docker-Bridge-Netz, NAT) |
| `server.advertise_port` | `0` | Port, der den Komponenten mitgeteilt wird. `0` = Port aus `server.listen`. Nur nötig, wenn der Port nach außen anders gemappt ist |
| `server.instance` | `default` | Name dieses LogCollectors. Meldet sich ein zweiter mit demselben Namen an, ersetzt er den ersten |
| `db.path` | `logs.db` | Pfad zur SQLite-Datenbank. Temporäre Dateien für Exporte landen im selben Verzeichnis, es muss also beschreibbar sein |
| `retention.days` | `7` | Logs, die älter sind, werden gelöscht |
| `retention.max_size_mb` | `256` | Obergrenze für die gespeicherten Logs — ist sie erreicht, fallen die ältesten Einträge zuerst raus |
| `log.level` | `info` | Detailgrad der eigenen Meldungen des LogCollectors: `debug`, `info`, `warn` oder `error` |

!!! warning "`db.path` bei nativer Installation"
    Der systemd-Dienst darf nur unter `/opt/hannah/logcollector` schreiben. Liegt `db.path`
    woanders, startet der LogCollector nicht. Die Vorlage `config.example.yaml` ist bereits
    richtig eingestellt.

## Aufbewahrung

Es gilt, welche der beiden Grenzen (`retention.days` oder `retention.max_size_mb`) zuerst
erreicht wird. Zur Orientierung: Eine typische Installation erzeugt nur wenige MB Logs pro
Tag, 7 Tage bleiben also meist deutlich unter 100 MB. Die Größengrenze ist ein
Sicherheitsnetz, falls eine Komponente das Log flutet.

## Umgebungsvariablen

Praktisch vor allem für Docker. Eine gesetzte Variable hat Vorrang vor dem Wert in
`config.yaml`.

| Umgebungsvariable | Schlüssel |
|---|---|
| `HANNAH_LOGCOLLECTOR_HANNAH_ADDRESS` | `hannah.address` |
| `HANNAH_LOGCOLLECTOR_SERVER_LISTEN` | `server.listen` |
| `HANNAH_LOGCOLLECTOR_SERVER_ADVERTISE_HOST` | `server.advertise_host` |
| `HANNAH_LOGCOLLECTOR_SERVER_ADVERTISE_PORT` | `server.advertise_port` |
| `HANNAH_LOGCOLLECTOR_SERVER_INSTANCE` | `server.instance` |
| `HANNAH_LOGCOLLECTOR_DB_PATH` | `db.path` |
| `HANNAH_LOGCOLLECTOR_RETENTION_DAYS` | `retention.days` |
| `HANNAH_LOGCOLLECTOR_RETENTION_MAX_SIZE_MB` | `retention.max_size_mb` |
| `HANNAH_LOGCOLLECTOR_LOG_LEVEL` | `log.level` |

Im Docker-Image ist `HANNAH_LOGCOLLECTOR_DB_PATH` bereits auf `/app/data/logs.db` gesetzt —
`/app/data` als Volume einhängen, sonst sind die Logs nach dem Neuerstellen des Containers weg.

!!! warning "Nach Config-Änderungen neu starten"
    Der LogCollector liest seine Config nur beim Start:
    ```bash
    sudo systemctl restart hannah-logcollector
    ```
