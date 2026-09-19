# Installation

AutoDeploy gibt es nur als native Installation (kein Docker-Image) — ergibt Sinn, da es
gerade die Aufgabe hat, andere systemd-Services (unter Linux) bzw. launchd-Jobs (unter
macOS) auf dem Host zu aktualisieren, nicht sich selbst in einem Container.

Installation läuft wie bei den anderen nativen Komponenten per `install.sh`, allerdings
als root statt als `hannah`-User:

```bash
curl -fsSL https://github.com/NurPech/Hannah/raw/refs/heads/master/autodeploy/deploy/install.sh | sudo bash
```

Prüfen, ob der Dienst wirklich läuft:

```bash
sudo systemctl status hannah-autodeploy
sudo journalctl -u hannah-autodeploy -f
```

Zum Deinstallieren, Script liegt bereits im Installationsverzeichnis:

```bash
sudo bash /opt/hannah/autodeploy/deploy/install.sh --uninstall
```

Unter macOS gibt es eine eigene Variante:

```bash
curl -fsSL https://github.com/NurPech/Hannah/raw/refs/heads/master/autodeploy/deploy/install-macos.sh | sudo bash
```

Prüfen unter macOS:

```bash
sudo launchctl print system/com.hannah.autodeploy
sudo tail -f /opt/hannah/autodeploy.log
```

Deinstallieren unter macOS:

```bash
sudo bash /opt/hannah/autodeploy/deploy/install-macos.sh --uninstall
```

Config-Datei: `/etc/hannah/autodeploy.yaml` (Linux) bzw. `/opt/hannah/etc/autodeploy.yaml`
(macOS) — siehe [Konfiguration](configuration.md) für alle Schlüssel und das
Komponenten-Listenformat.
