# Installation

Über [Docker Compose](../../manual/installation.md) mit dem Profile `with-voiceid` (oder
`full`) dazuschalten. Braucht eine eigene `voiceid-config.yaml`, ist aber auch ohne sie
mit brauchbaren Defaults lauffähig (siehe [Konfiguration](configuration.md)).

## Native Installation

```bash
curl -fsSL https://github.com/NurPech/Hannah/raw/refs/heads/master/voiceid/deploy/install.sh | sudo bash
```

Config: `/etc/hannah-voiceid/config.yaml`. Die Vorlage liegt bereits im Release, im
Installationsverzeichnis — kopieren, anpassen, Dienst starten:

```bash
sudo cp /opt/hannah/voiceid/config.example.yaml /etc/hannah-voiceid/config.yaml
sudo nano /etc/hannah-voiceid/config.yaml
sudo systemctl enable --now hannah-voiceid
```

Unter macOS gibt es eine eigene Variante:

```bash
curl -fsSL https://github.com/NurPech/Hannah/raw/refs/heads/master/voiceid/deploy/install-macos.sh | sudo bash
```

Config dort: `/opt/hannah/etc/voiceid.yaml` — anderer Pfad und Dateiname als unter Linux.
Das Script legt sie nicht automatisch an; ohne sie läuft VoiceID mit generischen Defaults
(`unknown_threshold=0.25`, `uncertain_threshold=0.40`).

## Automatisch aktuell halten

Optional — nur relevant, wenn du [AutoDeploy](../autodeploy/index.md) einsetzt.
Eintrag mit macOS-Pfaden/Service-Namen:

```yaml title="macOS (/opt/hannah/etc/autodeploy.yaml)"
  - name: voiceid
    channel: voiceid-stable
    install_dir: /opt/hannah/voiceid
    service: com.hannah.voiceid
    post_install: "/opt/hannah/voiceid/venv/bin/pip install -q -r /opt/hannah/voiceid/requirements.txt"
```

Unter Linux gilt dasselbe Format wie bei den anderen Komponenten (`service` als
systemd-Name statt `com.hannah.*`, Config in `/etc/hannah/autodeploy.yaml`).
