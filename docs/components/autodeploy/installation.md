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

Config-Datei: `/etc/hannah/autodeploy.yaml` (Linux) bzw. `/opt/hannah/etc/autodeploy.yaml`
(macOS) — siehe [Konfiguration](configuration.md) für alle Schlüssel und das
Komponenten-Listenformat.
