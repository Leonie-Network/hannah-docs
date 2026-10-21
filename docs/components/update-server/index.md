# Update-Server

**Kein eigener nötig.** Die Quelle, von der `install.sh`-Installationen und AutoDeploy
ihre Releases beziehen. Du brauchst hier nichts selbst zu betreiben — Leonies
Update-Server ist für Dritte geöffnet, genau zu diesem Zweck: sie ist praktisch die
einzige, die die Release-Pakete überhaupt bereitstellen kann.

Standard-URL: `https://hannah-update.sgessinger.de` (per `UPDATE_SERVER_URL`
überschreibbar, falls du doch einen eigenen betreiben willst).

## Satelliten-Firmware

Der Update-Server liefert nicht nur die Software-Komponenten, sondern auch die
ESP32-S3-Satelliten-Firmware. Für die Platine Rev. 5 gibt es zwei Kanäle:

| Kanal | Inhalt | Wofür |
|---|---|---|
| `satellite-esp-stable-init-rev5` | Installationsdateien | Inbetriebnahme eines neuen Satelliten |
| `satellite-esp-stable-rev5` | Update-Dateien | OTA-Updates laufender Satelliten |

Der `-init`-Kanal liefert ein **ZIP** mit den Installationsdateien (eine `manifest.json` und
vier Binärdateien), der OTA-Kanal die Firmware als einzelne Binärdatei. Die
Installationsdateien brauchst du für die Inbetriebnahme eines neuen Satelliten. Auch der
Satellite Manager im ioBroker-Adapter nutzt sie. Du kannst sie direkt herunterladen (der
Browser speichert die Datei als `<version>.bin`, es ist aber ein ZIP):

```text
https://hannah-update.sgessinger.de/releases/latest?channel=satellite-esp-stable-init-rev5
```

Zwei getrennte Wege nutzen das:

- **OTA** (bereits laufende Satelliten): fest im Firmware-Build hinterlegter Kanal
  — kein Konfigurationsfeld dafür, Core stößt
  das Update per MQTT an (`hannah/satellite/{device}/ota/pending` → `/ok`).
- **Erstflash/WebFlash** (neuer Satellit): der [ioBroker-Adapter](../iobroker-adapter/configuration.md#firmware)
  lädt über seine konfigurierbare „Firmware Source URL" (zeigt standardmäßig auf den
  `-init`-Kanal dieses Servers) das WebFlash-Paket für den Satellite Manager im Adapter-Tab.
  Ein Direkt-Download über dieselbe URL ist auch möglich, falls du manuell flashen willst.

### Installationsdateien manuell flashen

Das ZIP enthält vier Dateien, die an feste Adressen im Flash-Speicher des ESP32-S3 gehören
(die `manifest.json` im ZIP nennt sie ebenfalls):

| Datei | Adresse |
|---|---|
| `bootloader.bin` | `0x0` |
| `partition-table.bin` | `0x8000` |
| `ota_data_initial.bin` | `0xE000` |
| `hannah_satellite.bin` | `0x10000` |

Die Einstellungen des Satelliten (WLAN, MQTT, Update-Server und weitere) liegen in einem
eigenen Bereich ab `0x9000`. Den bringt der Satellite Manager im ioBroker-Adapter als
fertiges Image mit und flasht alles zusammen ab `0x0000`. Flashst du die vier Dateien
einzeln, wird dieser Bereich nicht beschrieben.
