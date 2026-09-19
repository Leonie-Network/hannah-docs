# Installation

Am schnellsten über [Docker Compose](../../manual/installation.md) — `hannah-core` ist
darin bereits enthalten und läuft standardmäßig mit. Die native Installation auf dieser
Seite brauchst du nur, wenn du bewusst **kein** Docker willst.

## Native Installation

Core hat ein eigenes `deploy/install.sh` im [hannah-Repo](https://github.com/NurPech/hannah):

```bash
curl -fsSL https://raw.githubusercontent.com/NurPech/hannah/master/core/deploy/install.sh | sudo bash
```

- Lädt das aktuelle Release vom Update-Server, installiert es als systemd-Service
  (`hannah.service`), laufend unter einem eigenen `hannah`-System-User
- Installationsverzeichnis: `/opt/hannah/core`
- Config: `/etc/hannah/config.yaml`

Zum Deinstallieren (Config bleibt erhalten) braucht es keinen erneuten Download — das
Script liegt bereits im Installationsverzeichnis:

```bash
sudo bash /opt/hannah/core/deploy/install.sh --uninstall
```

Beim ersten Lauf legt das Script noch keine `config.yaml` an — die liegt als Vorlage
schon mit im Release, direkt im Installationsverzeichnis. Kopieren, anpassen, Dienst
starten:

```bash
sudo cp /opt/hannah/core/config.example.yaml /etc/hannah/config.yaml
sudo nano /etc/hannah/config.yaml
sudo systemctl enable --now hannah
```

Prüfen, ob der Dienst wirklich läuft:

```bash
sudo systemctl status hannah
sudo journalctl -u hannah -f
```

`status` zeigt den aktuellen Zustand (läuft/abgestürzt/deaktiviert), `journalctl -f`
folgt dem Log live — hier siehst du z. B. sofort, wenn die Config fehlerhaft ist.

Steuerbar über Umgebungsvariablen:

| Variable | Zweck | Default |
|---|---|---|
| `UPDATE_SERVER_URL` | Basis-URL des Update-Servers | `https://hannah-update.sgessinger.de` |
| `UPDATE_SERVER_TOKEN` | Bearer-Token, nur für nicht-öffentliche Kanäle nötig | — |
| `CORE_CHANNEL` | Release-Kanal | `core-stable` |

## Automatisch aktuell halten

Optional — nur relevant, wenn du [AutoDeploy](../autodeploy/index.md) einsetzt. Ohne
AutoDeploy aktualisierst du Core, indem du das Install-Script erneut ausführst.
**Vorher den [Sicherheitshinweis zu `post_install`](../autodeploy/index.md) lesen.**

Eintrag für AutoDeploy (`/etc/hannah/autodeploy.yaml`):

```yaml
  - name: core
    channel: core-stable
    install_dir: /opt/hannah/core
    service: hannah
    post_install: "/opt/hannah/core/venv/bin/pip install --upgrade -q -r /opt/hannah/core/requirements.txt"
```
