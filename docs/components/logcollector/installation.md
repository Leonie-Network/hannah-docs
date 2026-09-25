# Installation

Brauchst du den LogCollector überhaupt? Siehe [Übersicht](index.md) — er ist empfohlen und vereinfacht den Support-Prozess.

Über [Docker Compose](../../manual/installation.md) mit dem Profile `with-logcollector` (oder
`full`) dazuschalten.

## Native Installation

```bash
curl -fsSL https://raw.githubusercontent.com/NurPech/hannah-logcollector/refs/heads/main/deploy/install.sh | sudo bash
```

Config: `/etc/hannah-logcollector/config.yaml`. Die Vorlage liegt nach der Installation bereits
daneben — kopieren, anpassen, Dienst starten:

```bash
sudo cp /etc/hannah-logcollector/config.example.yaml /etc/hannah-logcollector/config.yaml
sudo nano /etc/hannah-logcollector/config.yaml
sudo systemctl enable --now hannah-logcollector
```

Prüfen, ob der Dienst wirklich läuft:

```bash
sudo systemctl status hannah-logcollector
sudo journalctl -u hannah-logcollector -f
```

Zum Deinstallieren: anders als bei den übrigen Komponenten installiert der LogCollector (ein
einzelnes Go-Binary) sich nicht in ein eigenes Verzeichnis mit eigener Kopie des
Scripts — `install.sh` muss dafür noch einmal per `curl` geholt werden, die Argumente
dahinter landen dann direkt beim Script:

```bash
curl -fsSL https://raw.githubusercontent.com/NurPech/hannah-logcollector/refs/heads/main/deploy/install.sh | sudo bash -s -- --uninstall
```

## Automatisch aktuell halten

Optional — nur relevant, wenn du [AutoDeploy](../autodeploy/index.md) einsetzt.
**Vorher den [Sicherheitshinweis zu `post_install`](../autodeploy/index.md) lesen** (bei
LogCollector selbst zwar ohne `post_install`, aber relevant, sobald du weitere Komponenten über
dieselbe AutoDeploy-Instanz verwaltest).

Eintrag für AutoDeploy (`/etc/hannah/autodeploy.yaml`):

```yaml
  - name: logcollector
    channel: logcollector-stable-arm64
    install_dir: /usr/local/bin
    service: hannah-logcollector
```

*(`channel` ist architekturabhängig — `logcollector-stable-arm64` gilt für ARM64.)*
