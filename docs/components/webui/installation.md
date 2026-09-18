# Installation

Am schnellsten über [Docker Compose](../../manual/installation.md) — `hannah-webui` ist
standardmäßig mit dabei (zusammen mit Core).

Verbindet sich per gRPC mit Core (`HANNAH_WEBUI_GRPC_HOST` / `HANNAH_WEBUI_GRPC_PORT`) und
braucht einen eigenen `HANNAH_WEBUI_SECRET_KEY` (zufälliger String, siehe
[Hinweis zur Compose-Datei](../../manual/installation.md)).

## Native Installation

Eigenes Repo, eigenes `deploy/install.sh`:

```bash
curl -fsSL https://github.com/NurPech/hannah-webui/raw/refs/heads/main/deploy/install.sh | sudo bash
```

## Automatisch aktuell halten

Eintrag für [Auto-Update](../auto-update/index.md) (`/etc/hannah/autodeploy.conf`):

```yaml
  - name: webui
    channel: webui-stable
    install_dir: /opt/hannah/webui
    service: hannah-webui
    post_install: "/opt/hannah/webui/venv/bin/pip install --upgrade -q -r /opt/hannah/webui/requirements.txt"
```
