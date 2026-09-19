# Konfiguration

Die WLAN- und MQTT-Werte musst du einmalig setzen, sonst verbindet sich der Satellit gar
nicht erst — alles andere auf dieser Seite hat brauchbare Defaults, die du nur bei
Bedarf anfasst.

Kein `config.yaml` — Einstellungen liegen im Satelliten selbst, im NVS-Flash, verwaltet
über seine lokale Web-Oberfläche unter `/settings`. Nach dem Speichern startet der
Satellit neu.

## WiFi

| Feld | Zweck |
|---|---|
| SSID | Mit „Suchen" scannbar |
| Passwort | Leer lassen, um das gespeicherte Passwort zu behalten |

## MQTT

| Feld | Zweck | Default |
|---|---|---|
| Broker | IP-Adresse des MQTT-Brokers | — |
| Port | | `1883` |
| Benutzer / Passwort | | — |

## Features

| Feld | Zweck | Default |
|---|---|---|
| Erkennungsschwelle | Wakeword-Konfidenz, ab der ein Treffer zählt (0–100 %) | `75%` |
| VAD-Stille (ms) | Wie lange Stille nach der Erkennung gewartet wird, bevor die Aufnahme endet | `1500` |

Nur bei **Rev. 5**, optional:

| Feld | Zweck | Default |
|---|---|---|
| TDM-Beamforming-Richtung | Vorzugsrichtung in Grad, im Uhrzeigersinn | `180°` |

Bezugspunkt für 0°: den Satelliten wie eine Landkarte an die Wand halten, Vol+-Taste
zeigt dabei nach links — die Richtung nach oben ist 0°.

## Firmware

Optional — steuert nur, woher der Satellit seine automatischen OTA-Updates bezieht. Die
Defaults zeigen bereits auf Leonies offenen Update-Server.

| Feld | Zweck | Default |
|---|---|---|
| Update-Server URL | Siehe [Update-Server](../update-server/index.md) | `https://hannah-update.sgessinger.de` |
| Update-Channel | Leer = `stable` | — |
| Update-Server Token | Nur für nicht-öffentliche Kanäle nötig | — |

## Asset Server

| Feld | Zweck | Default |
|---|---|---|
| URL / Token | Siehe [Asset Server](../../services/asset-server.md) | — |
| Namespace | Leer = `satellite` | — |

## Syslog

| Feld | Zweck | Default |
|---|---|---|
| Server | IPv4 eines Syslog-Empfängers — leer deaktiviert Remote-Logging | — (deaktiviert) |
| Port | | `514` |
