# Konfiguration

Ohne diese Datei tut AutoDeploy nichts — anders als bei den meisten anderen Komponenten
gibt es hier keine sinnvollen Defaults ohne Konfiguration: du musst mindestens
eintragen, *welche* Komponenten überwacht werden sollen (Abschnitt
[Komponenten-Liste](#komponenten-liste) unten).

AutoDeploy hat keine eigene Datenbank für Einstellungen — die komplette Konfiguration
liegt in `autodeploy.yaml`.

| Plattform | Config-Datei |
|---|---|
| Linux | `/etc/hannah/autodeploy.yaml` |
| macOS | `/opt/hannah/etc/autodeploy.yaml` |

Am einfachsten lässt du sie dir vom [Config-Builder](#config-builder) unten
zusammenstellen — für Linux und macOS — und fügst das Ergebnis unverändert in die Datei ein:

```bash title="Linux"
sudo nano /etc/hannah/autodeploy.yaml
sudo systemctl enable --now hannah-autodeploy
```

```bash title="macOS"
sudo nano /opt/hannah/etc/autodeploy.yaml
sudo launchctl kickstart -k system/com.hannah.autodeploy
```

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

## Config-Builder

Du musst die Datei nicht von Hand schreiben: Such dir hier Plattform und Komponenten
aus, unten steht dann die fertige Konfiguration — einfach kopieren und so einfügen.

<style>
.hannah-autodeploy-builder{font-family:system-ui,-apple-system,sans-serif}
.hannah-autodeploy-builder fieldset{border:1px solid var(--md-default-fg-color--lightest,#c7d0da);border-radius:8px;margin:0 0 16px;padding:12px 16px}
.hannah-autodeploy-builder legend{font-weight:600;padding:0 4px}
.hannah-autodeploy-builder [hidden]{display:none !important}
.hannah-autodeploy-builder label{display:block;margin:8px 0;font-size:.95rem}
.hannah-autodeploy-builder label input[type="checkbox"],
.hannah-autodeploy-builder label input[type="radio"]{margin-right:8px}
.hannah-autodeploy-builder [data-copy-target]{background:var(--md-default-fg-color--lightest,#c7d0da);border:none;border-radius:6px;padding:8px 14px;cursor:pointer;margin-top:8px}
.hannah-autodeploy-builder pre{max-height:420px;overflow:auto}
</style>

<div class="admonition tip">
<p class="admonition-title">🧩 Interaktiver Builder</p>
<div class="hannah-autodeploy-builder" id="hannah-autodeploy-builder">
<fieldset>
<legend>Plattform</legend>
<div class="seg">
<label><input type="radio" name="had-platform" value="linux" checked>Linux</label>
<label><input type="radio" name="had-platform" value="mac">macOS</label>
</div>
<p><em>Unter Linux stehen alle Komponenten zur Verfügung, unter macOS nur VoiceID.</em></p>
</fieldset>
<fieldset>
<legend>Komponenten</legend>
<label><input type="checkbox" checked disabled> AutoDeploy (immer dabei)</label>
<label data-had-linux-only><input type="checkbox" data-had="component-core"> Core</label>
<label data-had-linux-only><input type="checkbox" data-had="component-webui"> WebUI</label>
<label data-had-linux-only><input type="checkbox" data-had="component-telegram"> Telegram</label>
<label><input type="checkbox" data-had="component-voiceid"> VoiceID</label>
<label data-had-linux-only><input type="checkbox" data-had="component-proxy"> Proxy</label>
<label data-had-linux-only><input type="checkbox" data-had="component-logcollector"> LogCollector</label>
<p><em>Der <a href="../timer/">Timer</a> und die <a href="../msteams/">Microsoft-Teams-Bridge</a> gibt es nur als Docker-Image, sie laufen deshalb nicht über AutoDeploy und stehen nicht zur Auswahl.</em></p>
</fieldset>
<fieldset data-had="arch-fields" hidden>
<legend>Prozessor deines Rechners (wichtig für Proxy und LogCollector)</legend>
<div class="seg">
<label><input type="radio" name="had-arch" value="arm64" checked>arm64 (z. B. Raspberry Pi)</label>
<label><input type="radio" name="had-arch" value="amd64">amd64 (x86_64)</label>
</div>
</fieldset>
<p>Das kommt in die Datei <code data-had="path"></code>:</p>
<pre><code data-had="yaml-code"></code></pre>
<button type="button" data-copy-target='[data-had="yaml-code"]'>In Zwischenablage kopieren</button>
</div>
</div>

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
    post_install: "/opt/hannah/autodeploy/venv/bin/pip install --upgrade -q -r /opt/hannah/autodeploy/requirements.txt"

  - name: voiceid
    channel: voiceid-stable
    install_dir: /opt/hannah/voiceid
    service: com.hannah.voiceid
    post_install: "/opt/hannah/voiceid/venv/bin/pip install --upgrade -q -r /opt/hannah/voiceid/requirements.txt"
```

| Feld | Bedeutung |
|---|---|
| `name` | Freier Bezeichner für den Eintrag |
| `channel` | Release-Kanal auf dem Update-Server, von dem aktualisiert wird |
| `install_dir` | Installationsverzeichnis der Komponente |
| `service` | Name des Service (systemd unter Linux, launchd-Job unter macOS), der nach einem Update neugestartet wird |
| `post_install` | Optional: Befehl, der nach dem Entpacken eines neuen Release läuft (z. B. Python-Dependencies aktualisieren) |
