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

## Automatisch aktuell halten

Optional — nur relevant, wenn du [AutoDeploy](../autodeploy/index.md) einsetzt.

Eintrag für AutoDeploy (`/etc/hannah/autodeploy.yaml`):

```yaml
  - name: proxy
    channel: proxy-stable-arm64
    install_dir: /usr/local/bin
    service: hannah-proxy
```

*(`channel` ist architekturabhängig — `proxy-stable-arm64` gilt für ARM64.)*
