# Installation

Am schnellsten über [Docker Compose](../../manual/installation.md) — `hannah-core` ist
darin bereits enthalten und läuft standardmäßig mit.

## Native Installation

Core hat ein eigenes `deploy/install.sh` im [hannah-Repo](https://github.com/NurPech/hannah):

```bash
curl -fsSL https://raw.githubusercontent.com/NurPech/hannah/master/core/deploy/install.sh | sudo bash
```

Zum Deinstallieren (Config bleibt erhalten) das Script herunterladen und mit
`--uninstall` aufrufen:

```bash
sudo bash install.sh --uninstall
```

- Lädt das aktuelle Release vom Update-Server, installiert es als systemd-Service
  (`hannah.service`), laufend unter einem eigenen `hannah`-System-User
- Installationsverzeichnis: `/opt/hannah/core`
- Config: `/etc/hannah/config.yaml` — Startpunkt ist `core/config.example.yaml` im Repo

Steuerbar über Umgebungsvariablen:

| Variable | Zweck | Default |
|---|---|---|
| `UPDATE_SERVER_URL` | Basis-URL des Update-Servers | `https://hannah-update.sgessinger.de` |
| `UPDATE_SERVER_TOKEN` | Bearer-Token (nur für nicht-öffentliche Kanäle nötig) | — |
| `CORE_CHANNEL` | Release-Kanal | `core-stable` |
