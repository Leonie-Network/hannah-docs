# Installation

Über [Docker Compose](../../manual/installation.md) mit dem Profile `telegram` (oder
`full`) dazuschalten. Braucht eine eigene `telegram-config.yaml` (u. a. Bot-Token, siehe
[Konfiguration](configuration.md)).

## Native Installation

```bash
curl -fsSL https://github.com/NurPech/Hannah/raw/refs/heads/master/telegram/deploy/install.sh | sudo bash
```

Config: `/etc/hannah-telegram/config.yaml` (u. a. Bot-Token). Die Vorlage liegt bereits im
Release, im Installationsverzeichnis — kopieren, anpassen, Dienst starten:

```bash
sudo cp /opt/hannah/telegram/config.example.yaml /etc/hannah-telegram/config.yaml
sudo nano /etc/hannah-telegram/config.yaml
sudo systemctl enable --now hannah-telegram
```

## Automatisch aktuell halten

Optional — nur relevant, wenn du [AutoDeploy](../autodeploy/index.md) einsetzt.

Eintrag für AutoDeploy (`/etc/hannah/autodeploy.yaml`):

```yaml
  - name: telegram
    channel: telegram-stable
    install_dir: /opt/hannah/telegram
    service: hannah-telegram
    post_install: "/opt/hannah/telegram/venv/bin/pip install --upgrade -q -r /opt/hannah/telegram/requirements.txt"
```
