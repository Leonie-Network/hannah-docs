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
```

Für macOS gibt es aktuell keine Beispiel-Config.

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
