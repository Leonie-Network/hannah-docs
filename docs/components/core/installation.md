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
- Config: `/etc/hannah/config.yaml`

Beim ersten Lauf legt das Script noch keine `config.yaml` an — die liegt als Vorlage
schon mit im Release, direkt im Installationsverzeichnis. Kopieren, anpassen, Dienst
starten:

```bash
sudo cp /opt/hannah/core/config.example.yaml /etc/hannah/config.yaml
sudo nano /etc/hannah/config.yaml
sudo systemctl enable --now hannah
```

Steuerbar über Umgebungsvariablen:

| Variable | Zweck | Default |
|---|---|---|
| `UPDATE_SERVER_URL` | Basis-URL des Update-Servers | `https://hannah-update.sgessinger.de` |
| `UPDATE_SERVER_TOKEN` | Bearer-Token (nur für nicht-öffentliche Kanäle nötig) | — |
| `CORE_CHANNEL` | Release-Kanal | `core-stable` |

## Automatisch aktuell halten

Eintrag für [AutoDeploy](../autodeploy/index.md) (`/etc/hannah/autodeploy.yaml`):

```yaml
  - name: core
    channel: core-stable
    install_dir: /opt/hannah/core
    service: hannah
    post_install: "/opt/hannah/core/venv/bin/pip install --upgrade -q -r /opt/hannah/core/requirements.txt"
```
