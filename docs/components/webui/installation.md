# Installation

Am schnellsten über [Docker Compose](../../manual/installation.md) — `hannah-webui` ist
standardmäßig mit dabei (zusammen mit Core). Die native Installation auf dieser Seite
brauchst du nur, wenn du bewusst kein Docker willst.

Verbindet sich per gRPC mit Core (`HANNAH_WEBUI_GRPC_HOST` / `HANNAH_WEBUI_GRPC_PORT`) und
braucht einen eigenen `HANNAH_WEBUI_SECRET_KEY` (zufälliger String, siehe
[Hinweis zur Compose-Datei](../../manual/installation.md)).

## Native Installation

Eigenes Repo, eigenes `deploy/install.sh`:

```bash
curl -fsSL https://github.com/NurPech/hannah-webui/raw/refs/heads/main/deploy/install.sh | sudo bash
```

Config: `/etc/hannah-webui/config.yaml`. Die Vorlage liegt bereits im Release, im
Installationsverzeichnis — kopieren, anpassen, Dienst starten:

```bash
sudo cp /opt/hannah/webui/config.example.yaml /etc/hannah-webui/config.yaml
sudo nano /etc/hannah-webui/config.yaml
sudo systemctl enable --now hannah-webui
```

Prüfen, ob der Dienst wirklich läuft:

```bash
sudo systemctl status hannah-webui
sudo journalctl -u hannah-webui -f
```

!!! tip "Erster Login"
    Die WebUI legt selbst keinen Account an — das macht Core beim allerersten Start
    automatisch (Admin-Account, zufälliges Passwort, einmalig ins Core-Log geschrieben).
    Mit diesen Zugangsdaten meldest du dich hier zum ersten Mal an, siehe
    [Nutzerverwaltung → Erster Login](../../manual/users.md#erster-login).

Zum Deinstallieren (Config bleibt erhalten), Script liegt bereits im
Installationsverzeichnis:

```bash
sudo bash /opt/hannah/webui/deploy/install.sh --uninstall
```

## Automatisch aktuell halten

Optional — nur relevant, wenn du [AutoDeploy](../autodeploy/index.md) einsetzt.
**Vorher den [Sicherheitshinweis zu `post_install`](../autodeploy/index.md) lesen.**

Eintrag für AutoDeploy (`/etc/hannah/autodeploy.yaml`):

```yaml
  - name: webui
    channel: webui-stable
    install_dir: /opt/hannah/webui
    service: hannah-webui
    post_install: "/opt/hannah/webui/venv/bin/pip install --upgrade -q -r /opt/hannah/webui/requirements.txt"
```
