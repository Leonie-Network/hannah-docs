# Installation

Über [Docker Compose](../../manual/installation.md) mit dem Profile `with-voiceid` (oder
`full`) dazuschalten. Braucht eine eigene `voiceid-config.yaml`.

## Native Installation

```bash
curl -fsSL https://github.com/NurPech/Hannah/raw/refs/heads/master/voiceid/deploy/install.sh | sudo bash
```

Unter macOS gibt es eine eigene Variante:

```bash
curl -fsSL https://github.com/NurPech/Hannah/raw/refs/heads/master/voiceid/deploy/install-macos.sh | sudo bash
```

Config: `/etc/hannah-voiceid/config.yaml`. Ein Beispiel ist bislang noch nicht
veröffentlicht.

## Automatisch aktuell halten

Eintrag für [AutoDeploy](../autodeploy/index.md), macOS-Pfade/Service-Namen:

```yaml title="macOS (/opt/hannah/etc/autodeploy.yaml)"
  - name: voiceid
    channel: voiceid-stable
    install_dir: /opt/hannah/voiceid
    service: com.hannah.voiceid
    post_install: "/opt/hannah/voiceid/venv/bin/pip install -q -r /opt/hannah/voiceid/requirements.txt"
```

Unter Linux gilt dasselbe Format wie bei den anderen Komponenten (`service` als
systemd-Name statt `com.hannah.*`, Config in `/etc/hannah/autodeploy.conf`).
