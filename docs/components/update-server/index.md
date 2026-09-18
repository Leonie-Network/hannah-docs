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

Genutzt wird das vor allem indirekt über den [ioBroker-Adapter](../iobroker-adapter/configuration.md#firmware)
— dessen „Firmware Source URL" zeigt auf genau diesen Server (`/releases/latest?channel=...`),
der Satellite Manager im Adapter-Tab übernimmt Flashen und OTA-Anstoß darüber. Ein
Direkt-Download ist über dieselbe URL trotzdem möglich, falls du manuell flashen willst.
