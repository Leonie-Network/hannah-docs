# Update-Server

Die Quelle, von der `install.sh`-Installationen und AutoDeploy ihre Releases beziehen.
Du brauchst keinen eigenen — Leonies Update-Server ist für Dritte geöffnet, genau zu
diesem Zweck: sie ist praktisch die einzige, die die Release-Pakete überhaupt bereitstellen
kann.

Standard-URL: `https://hannah-update.sgessinger.de` (per `UPDATE_SERVER_URL`
überschreibbar, falls du doch einen eigenen betreiben willst).

## Satelliten-Firmware

Der Update-Server liefert nicht nur die Software-Komponenten, sondern auch die
ESP32-S3-Satelliten-Firmware — sowohl das OTA-Binary als auch das WebFlash-Init-Paket
für den Erstflash. Pro PCB-Revision ein eigener Kanal:

| Revision | OTA-Kanal | WebFlash-Init-Kanal |
|---|---|---|
| Rev. 4 | `satellite-esp-stable-rev4` | `satellite-esp-stable-init-rev4` |
| Rev. 5 | `satellite-esp-stable-rev5` | `satellite-esp-stable-init-rev5` |

Zwei getrennte Wege nutzen das:

- **OTA** (bereits laufende Satelliten): fest im Firmware-Build hinterlegter Kanal
  (`satellite-esp-stable-rev4`/`-rev5`) — kein Konfigurationsfeld dafür, Core stößt
  das Update per MQTT an (`hannah/satellite/{device}/ota/pending` → `/ok`).
- **Erstflash/WebFlash** (neuer Satellit): der [ioBroker-Adapter](../iobroker-adapter/configuration.md#firmware)
  lädt über seine konfigurierbare „Firmware Source URL" (zeigt standardmäßig auf den
  `-init`-Kanal dieses Servers) das WebFlash-Paket für den Satellite Manager im Adapter-Tab.
  Ein Direkt-Download über dieselbe URL ist auch möglich, falls du manuell flashen willst.
