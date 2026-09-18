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

Unter Linux ist der [AutoDeploy](../autodeploy/index.md)-Eintrag für VoiceID aktuell
deaktiviert. Unter macOS läuft er aktiv:

```yaml title="macOS (/opt/hannah/etc/autodeploy.yaml)"
  - name: voiceid
    channel: voiceid-stable
    install_dir: /opt/hannah/voiceid
    service: com.hannah.voiceid
    post_install: "/opt/hannah/voiceid/venv/bin/pip install -q -r /opt/hannah/voiceid/requirements.txt"
```
