# Konfiguration

Kein `config.yaml` — Einstellungen liegen im Satelliten selbst (NVS-Flash), verwaltet
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

Nur bei **Rev. 5**:

| Feld | Zweck | Default |
|---|---|---|
| TDM-Beamforming-Richtung | Vorzugsrichtung in Grad im Uhrzeigersinn ab Norden/Strom-Seite | `180°` |

## Firmware

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
