# Konfiguration

Keine `config.yaml` — die Konfiguration ist eine normale ioBroker-Adapterinstanz, verwaltet
über den Konfigurationsdialog in Admin. Sechs Tabs:

## Connection

| Feld | Zweck |
|---|---|
| Hannah Host | IP-Adresse oder Hostname von Hannah Core |
| gRPC Port | Standard `50051` |

## Device Discovery

| Feld | Zweck |
|---|---|
| Rooms / Functions | Welche `enum.rooms`/`enum.functions`-Einträge Hannah kennen soll — alle abgewählt = alle werden übernommen |
| Extra State Prefixes | Zusätzliche State-ID-Präfixe, die an Hannah gestreamt werden (z. B. `0_userdata.0` für eigene Scripte) |
| Floor Mappings | Etagen-Label in State-ID-Pfaden auf eine Abkürzung mappen (z. B. „Erdgeschoss" → „EG"). Leer = eingebaute Defaults (`EG`, `OG`, `UG`, `DG`, `KG`, `ZG`) |

Wird nur **einmal beim Adapter-Start** eingelesen (`_subscribeEnumStates()`) — neue
Räume/Funktionen, die angelegt werden während der Adapter schon läuft, brauchen einen
Adapter-Neustart, um live anzukommen.

## Integrations

| Feld | Zweck |
|---|---|
| Residents Adapter Instance | Welche `residents.<instance>` für Anwesenheitserkennung genutzt wird |

## Firmware

| Feld | Zweck |
|---|---|
| Firmware Source URL | URL zur Firmware-ZIP (Hannah Update Server, GitHub/GitLab-Release oder jede direkte URL) — muss ein `manifest.json` plus die Binärdateien enthalten |
| Auth Token | Optional, als Bearer-Token gesendet. Leer lassen, wenn die URL öffentlich ist |

Wird beim Flashen/Neuflashen eines Satelliten über die Satellite-Manager-Oberfläche im
Adapter-Tab verwendet.

## Satellite Defaults

Vorbelegte Werte beim Flashen oder Neuschreiben des NVS eines Satelliten — pro Gerät
überschreibbar.

| Feld | Zweck |
|---|---|
| WiFi SSID / Password | WLAN-Zugangsdaten für neue Satelliten |
| MQTT Broker / Port / User / Password | MQTT-Zugangsdaten für neue Satelliten |
| OTA URL / Channel / Token | Update-Server-URL, Kanal und Bearer-Token für OTA-Updates |
| Asset Server URL / Token | Asset-Server-URL und Bearer-Token (Sound-Assets) |
| NVS Update API Token | Bearer-Token für den satelliteneigenen `POST /nvs`-Endpunkt — separat vom OTA-Token. Leer deaktiviert Remote-NVS-Updates auf dem Satelliten |
| Disable TLS certificate validation | Nur für selbstsignierte Zertifikate — schaltet TLS-Prüfung komplett ab, unsicher |
| Your Hannah User ID | Numerische Hannah-User-ID (Trust-Level 10), als Requestor für Admin-Aktionen aus diesem Panel (z. B. Satellit umbenennen). Leer deaktiviert diese Aktionen |

## Weather

| Feld | Zweck |
|---|---|
| Weather Source | `Disabled`, `openweathermap`, `accuweather`, `daswetter` oder `Custom` |
| Instance | Bei einem bekannten Anbieter: welche Instanz dieses Adapters |
| Custom-Mapping | Bei `Custom`: pro Feld (Temperature, Humidity, Condition text, Precipitation mm, Wind speed m/s, Wind direction text) die State-ID angeben, aus der Hannah den Wert liest |
