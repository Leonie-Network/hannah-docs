# Installation

Über [Docker Compose](../../manual/installation.md) mit dem Profile `with-proxy` (oder
`full`) dazuschalten.

## Native Installation

```bash
curl -fsSL https://raw.githubusercontent.com/NurPech/Hannah/refs/heads/master/proxy/deploy/install.sh | sudo bash
```

Config: `/etc/hannah-proxy/config.yaml` — Startpunkt ist `proxy/config.example.yaml` im
[hannah-Repo](https://github.com/NurPech/hannah).

## Automatisch aktuell halten

Eintrag für [AutoDeploy](../autodeploy/index.md) (`/etc/hannah/autodeploy.yaml`):

```yaml
  - name: proxy
    channel: proxy-stable-arm64
    install_dir: /usr/local/bin
    service: hannah-proxy
```

*(`channel` ist architekturabhängig — `proxy-stable-arm64` gilt für ARM64.)*
