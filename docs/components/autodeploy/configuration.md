# Konfiguration

AutoDeploy hat keine eigene Datenbank für Einstellungen — die komplette Konfiguration
liegt in `autodeploy.yaml`.

| Plattform | Config-Datei |
|---|---|
| Linux | `/etc/hannah/autodeploy.yaml` |
| macOS | `/opt/hannah/etc/autodeploy.yaml` |

Unter Linux liegt eine Beispiel-Config bereits im Release, im Installationsverzeichnis
(Name etwas unglücklich gewählt: `autodeploy.yaml.example`, nicht `config.example.yaml`
wie bei den übrigen Komponenten):

```bash
sudo cp /opt/hannah/autodeploy/autodeploy.yaml.example /etc/hannah/autodeploy.yaml
sudo nano /etc/hannah/autodeploy.yaml
sudo systemctl enable --now hannah-autodeploy
```

Für macOS gibt es aktuell keine Beispiel-Config.

!!! warning "Nach Config-Änderungen neu starten"
    AutoDeploy liest seine Config nicht automatisch neu — nach jeder Änderung an
    `autodeploy.yaml` den Dienst neu starten, sonst wirkt sie erst beim nächsten
    zufälligen Neustart:
    ```bash title="Linux"
    sudo systemctl restart hannah-autodeploy
    ```
    ```bash title="macOS"
    sudo launchctl kickstart -k system/com.hannah.autodeploy
    ```

## Globale Schlüssel

```yaml
server_url: https://hannah-update.sgessinger.de
#token: your-bearer-token-here
poll_interval: 300  # seconds

# Name of this agent's own systemd unit — triggers self-restart after self-update.
self_service: hannah-autodeploy

components:
  - ...
```

| Schlüssel | Zweck |
|---|---|
| `server_url` | Basis-URL des Update-Servers |
| `token` | Optional, nur für nicht-öffentliche Kanäle nötig |
| `poll_interval` | Sekunden zwischen zwei Versions-Checks |
| `self_service` | Name von AutoDeploys eigenem Service (systemd/launchd) — löst nach einem Update von AutoDeploy selbst einen Self-Restart aus |
| `components` | Liste der verwalteten Komponenten, siehe unten |

## Komponenten-Liste

Pro Komponente ein Eintrag. Unter Linux heißt `service` wie der systemd-Service
(`hannah`, `hannah-proxy`, …), unter macOS wie der launchd-Job im
`com.hannah.<komponente>`-Schema:

```yaml title="Linux (/etc/hannah/autodeploy.yaml)"
  - name: autodeploy
    channel: autodeploy-stable
    install_dir: /opt/hannah/autodeploy
    service: hannah-autodeploy
    post_install: "/opt/hannah/autodeploy/venv/bin/pip install --upgrade -q -r /opt/hannah/autodeploy/requirements.txt"

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

```yaml title="macOS (/opt/hannah/etc/autodeploy.yaml)"
components:
  - name: autodeploy
    channel: autodeploy-stable
    install_dir: /opt/hannah/autodeploy
    service: com.hannah.autodeploy
    post_install: "/opt/hannah/autodeploy/venv/bin/pip install -q -r /opt/hannah/autodeploy/requirements.txt"

  - name: voiceid
    channel: voiceid-stable
    install_dir: /opt/hannah/voiceid
    service: com.hannah.voiceid
    post_install: "/opt/hannah/voiceid/venv/bin/pip install -q -r /opt/hannah/voiceid/requirements.txt"
```

| Feld | Bedeutung |
|---|---|
| `name` | Freier Bezeichner für den Eintrag |
| `channel` | Release-Kanal auf dem Update-Server, von dem aktualisiert wird |
| `install_dir` | Installationsverzeichnis der Komponente |
| `service` | Name des Service (systemd unter Linux, launchd-Job unter macOS), der nach einem Update neugestartet wird |
| `post_install` | Optional: Befehl, der nach dem Entpacken eines neuen Release läuft (z. B. Python-Dependencies aktualisieren) |
