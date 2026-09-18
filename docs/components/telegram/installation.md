# Installation

Über [Docker Compose](../../manual/installation.md) mit dem Profile `telegram` (oder
`full`) dazuschalten. Braucht eine eigene `telegram-config.yaml` (u. a. Bot-Token).

## Native Installation

```bash
curl -fsSL https://github.com/NurPech/Hannah/raw/refs/heads/master/telegram/deploy/install.sh | sudo bash
```

Config: `/etc/hannah-telegram/config.yaml` (u. a. Bot-Token). Ein Beispiel ist bislang
noch nicht veröffentlicht.

## Automatisch aktuell halten

Eintrag für [AutoDeploy](../autodeploy/index.md) (`/etc/hannah/autodeploy.conf`):

```yaml
  - name: telegram
    channel: telegram-stable
    install_dir: /opt/hannah/telegram
    service: hannah-telegram
    post_install: "/opt/hannah/telegram/venv/bin/pip install --upgrade -q -r /opt/hannah/telegram/requirements.txt"
```
