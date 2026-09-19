# Installation

Brauchst du den Proxy überhaupt? Siehe [Übersicht](index.md) — die meisten Setups
kommen ohne aus.

Über [Docker Compose](../../manual/installation.md) mit dem Profile `with-proxy` (oder
`full`) dazuschalten.

## Native Installation

```bash
curl -fsSL https://raw.githubusercontent.com/NurPech/Hannah/refs/heads/master/proxy/deploy/install.sh | sudo bash
```

Config: `/etc/hannah-proxy/config.yaml`. Die Vorlage liegt nach der Installation bereits
daneben — kopieren, anpassen, Dienst starten:

```bash
sudo cp /etc/hannah-proxy/config.example.yaml /etc/hannah-proxy/config.yaml
sudo nano /etc/hannah-proxy/config.yaml
sudo systemctl enable --now hannah-proxy
```

Prüfen, ob der Dienst wirklich läuft:

```bash
sudo systemctl status hannah-proxy
sudo journalctl -u hannah-proxy -f
```

Zum Deinstallieren: anders als bei den übrigen Komponenten installiert der Proxy (ein
einzelnes Go-Binary) sich nicht in ein eigenes Verzeichnis mit eigener Kopie des
Scripts — `install.sh` muss dafür noch einmal per `curl` geholt werden, die Argumente
dahinter landen dann direkt beim Script:

```bash
curl -fsSL https://raw.githubusercontent.com/NurPech/Hannah/refs/heads/master/proxy/deploy/install.sh | sudo bash -s -- --uninstall
```

## Automatisch aktuell halten

Optional — nur relevant, wenn du [AutoDeploy](../autodeploy/index.md) einsetzt.
**Vorher den [Sicherheitshinweis zu `post_install`](../autodeploy/index.md) lesen** (bei
Proxy selbst zwar ohne `post_install`, aber relevant, sobald du weitere Komponenten über
dieselbe AutoDeploy-Instanz verwaltest).

Eintrag für AutoDeploy (`/etc/hannah/autodeploy.yaml`):

```yaml
  - name: proxy
    channel: proxy-stable-arm64
    install_dir: /usr/local/bin
    service: hannah-proxy
```

*(`channel` ist architekturabhängig — `proxy-stable-arm64` gilt für ARM64.)*
