# Installation

Wie die anderen nativen Komponenten per `install.sh`, allerdings als root statt als
`hannah`-User:

```bash
curl -fsSL https://github.com/NurPech/Hannah/raw/refs/heads/master/autodeploy/deploy/install.sh | sudo bash
```

Unter macOS gibt es eine eigene Variante:

```bash
curl -fsSL https://github.com/NurPech/Hannah/raw/refs/heads/master/autodeploy/deploy/install-macos.sh | sudo bash
```

## Konfiguration

Linux: `/etc/hannah/autodeploy.conf`. Unter macOS steht der Pfad noch nicht fest.

Pro Komponente ein Eintrag, z. B.:

```yaml
  - name: core
    channel: core-stable
    install_dir: /opt/hannah/core
    service: hannah
    post_install: "/opt/hannah/core/venv/bin/pip install --upgrade -q -r /opt/hannah/core/requirements.txt"

  - name: proxy
    channel: proxy-stable-arm64
    install_dir: /usr/local/bin
    service: hannah-proxy
```

| Feld | Bedeutung |
|---|---|
| `name` | Freier Bezeichner für den Eintrag |
| `channel` | Release-Kanal auf dem Update-Server, von dem aktualisiert wird |
| `install_dir` | Installationsverzeichnis der Komponente |
| `service` | Name des systemd-Service, der nach einem Update neugestartet wird |
| `post_install` | Optional: Befehl, der nach dem Entpacken eines neuen Release läuft (z. B. Python-Dependencies aktualisieren) |
