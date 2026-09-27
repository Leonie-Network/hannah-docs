# Installation

Der Asset Server gibt es nur als Docker-Image (`quay.io/m1kad0/hannah-asset-server`) — kein
natives `install.sh`. Quellcode: [github.com/NurPech/hannah-asset-server](https://github.com/NurPech/hannah-asset-server).

## Docker Compose

```yaml
services:
  hannah-asset-server:
    image: quay.io/m1kad0/hannah-asset-server:latest
    ports:
      - "8080:8080"
    volumes:
      - asset-data:/data
    environment:
      - BASE_URL=https://assets.example.com
      - STORAGE_PATH=/data
      # - ADMIN_PASSWORD=change-me  # beim ersten Start setzen, um einen Admin-User anzulegen
    restart: unless-stopped

volumes:
  asset-data:
```

`BASE_URL` ist Pflicht (inkl. `https://`) — der Server startet ohne sie nicht. Ohne
`ADMIN_PASSWORD` beim allerersten Start wird kein Admin-User angelegt und du kommst nicht
in die Verwaltungs-Oberfläche hinein.

## Satelliten auf die eigene Instanz umstellen

Jeder Satellit hat in seiner eigenen Web-Oberfläche einen Abschnitt "Asset Server" mit den
Feldern URL, Token und Namespace — dort trägst du deine eigene Instanz ein, statt die
Default-Werte zu übernehmen. Kein Firmware-Neubau nötig, die Werte werden auf dem Satelliten
selbst gespeichert.

## Assets hochladen

Sound-Dateien lädst du entweder über die Admin-Weboberfläche des Servers hoch, oder per
Kommandozeile mit dem im [Quellcode](https://github.com/NurPech/hannah-asset-server)
enthaltenen `scripts/asset-cli.ps1` (PowerShell 7+).

## API

Für eigene Integrationen: die Manifest-/Download-Endpunkte sind unter
[Asset Server (Entwickler)](../../services/asset-server.md) dokumentiert.
