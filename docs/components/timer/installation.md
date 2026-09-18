# Installation

Den Timer-Dienst gibt es nur als Docker-Image (`quay.io/m1kad0/hannah-timer`) — kein
natives `install.sh`.

## Als Teil der Haupt-Compose-Datei

Einfachste Variante: in der [Docker-Compose-Installation](../../manual/installation.md)
das Profile `with-timer` (oder `full`) aktivieren — der Service ist dort bereits fertig
definiert und über das gemeinsame `hannah_network` mit Core verbunden.

## Eigenständig

Für ein Setup ohne die volle Compose-Datei — z. B. wenn Hannah Core nativ läuft und nur
der Timer per Docker dazukommen soll:

```bash
docker run -d \
  --name hannah-timer \
  --restart unless-stopped \
  -e HANNAH_TIMER_HANNAH_ADDRESS="192.168.1.10:50051" \
  -e HANNAH_TIMER_LOG_LEVEL="info" \
  -v timer_data:/app/data \
  quay.io/m1kad0/hannah-timer:latest
```

Oder als eigene `docker-compose.yml`:

```yaml
services:
  hannah-timer:
    image: quay.io/m1kad0/hannah-timer:latest
    container_name: hannah-timer
    restart: unless-stopped
    environment:
      HANNAH_TIMER_HANNAH_ADDRESS: "192.168.1.10:50051"
      HANNAH_TIMER_LOG_LEVEL: "info"
    volumes:
      - timer_data:/app/data

volumes:
  timer_data:
```

`HANNAH_TIMER_HANNAH_ADDRESS` ist in beiden Fällen die `host:port`-Adresse von Hannah
Cores gRPC-Server — läuft Core im selben Compose-Netzwerk, reicht der Container-Name
(`hannah-core:50051`), sonst die tatsächliche LAN-Adresse.

## Konfiguration

Reine Umgebungsvariablen, keine Config-Datei.

| Variable | Zweck | Default |
|---|---|---|
| `HANNAH_TIMER_HANNAH_ADDRESS` | `host:port` von Hannah Cores gRPC-Server | — (erforderlich) |
| `HANNAH_TIMER_LOG_LEVEL` | Log-Level (`debug`/`info`/`warn`/`error`) | `info` |

Das Volume `/app/data` hält den persistenten Zustand (laufende Timer/Wecker) — ohne
es gehen aktive Timer bei einem Container-Neustart verloren.
