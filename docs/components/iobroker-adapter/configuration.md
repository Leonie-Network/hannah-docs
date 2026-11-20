# Konfiguration

Nur der Tab **Connection** ist wirklich Pflicht — ohne eine erreichbare Hannah-Core-Adresse
verbindet sich der Adapter gar nicht erst. Die übrigen sechs Tabs sind Feintuning, das du
bei Bedarf anpasst, sobald die Grundverbindung steht.

Keine `config.yaml` — die Konfiguration ist eine normale ioBroker-Adapterinstanz, verwaltet
über den Konfigurationsdialog in Admin. Sieben Tabs:

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

Optional — nur relevant, wenn du über den Satellite Manager im Adapter-Tab Satelliten
flashst oder deren OTA-Updates auslöst.

| Feld | Zweck |
|---|---|
| Firmware Source URL | URL zur Firmware-ZIP (Hannah Update Server, GitHub/GitLab-Release oder jede direkte URL) — muss ein `manifest.json` plus die Binärdateien enthalten |
| Auth Token | Bearer-Token des Update-Servers, siehe [Update-Server nutzen](../update-server/usage.md). Braucht Rechte auf den Kanal `satellite-esp-stable-init-rev5`. Leer lassen nur bei einer öffentlichen URL |

Wird beim Flashen/Neuflashen eines Satelliten über die Satellite-Manager-Oberfläche im
Adapter-Tab verwendet.

### Zwei Stellen für die Update-Server-Adresse

Die Adresse des Update-Servers steht an zwei Stellen, und an beiden gehört etwas anderes hinein.
Die eine Adresse nutzt der Adapter selbst, um das Installationspaket zu laden. Die andere
schreibt der Adapter in den Satelliten, damit der sich später selbst aktualisiert.

| Wo | Feld | Was hineingehört | Wofür |
|---|---|---|---|
| Tab **Firmware** | Firmware Source URL | der **vollständige Link** zum Installationspaket, z. B. `https://hannah-update.sgessinger.de/releases/latest?channel=satellite-esp-stable-init-rev5` | Der Adapter lädt damit das Paket für den Erstflash |
| Tab **Firmware** | Auth Token | Token mit Recht auf den Kanal `satellite-esp-stable-init-rev5` | für diesen Download |
| Tab **Satellite Defaults** (und im Flash-Dialog eines Satelliten) | OTA URL | nur die **Adresse des Servers**, ohne Pfad: `https://hannah-update.sgessinger.de` | wird in den Satelliten geschrieben, er hängt `/latest?channel=…` selbst an |
| Tab **Satellite Defaults** | OTA Channel | `satellite-esp-stable-rev5` | Kanal, aus dem der Satellit seine Updates holt |
| Tab **Satellite Defaults** | OTA Token | Token mit Recht auf den Kanal `satellite-esp-stable-rev5` | für die Updates des Satelliten |

Ein Token darf für beides dasselbe sein, wenn er Rechte auf beide Kanäle hat.

Trägst du in „Firmware Source URL“ nur die Adresse des Servers ein (ohne `/releases/latest?channel=…`),
bekommt der Adapter statt des Pakets die Weboberfläche des Servers zurück und meldet
„Downloaded file is not a valid ZIP archive“.

## Satellite Defaults

Vorbelegte Werte beim Flashen oder Neuschreiben des NVS eines Satelliten — pro Gerät
überschreibbar.

| Feld | Zweck |
|---|---|
| WiFi SSID / Password | WLAN-Zugangsdaten für neue Satelliten |
| MQTT Broker / Port / User / Password | MQTT-Zugangsdaten für neue Satelliten |
| OTA URL / Channel / Token | Update-Server-URL, Kanal und Bearer-Token für OTA-Updates. Der Adapter schreibt sie beim Flashen in die Einstellungen des Satelliten, der Token braucht Rechte auf `satellite-esp-stable-rev5`, siehe [Update-Server nutzen](../update-server/usage.md) |
| Asset Server URL / Token | [Asset-Server](../asset-server/index.md)-URL und Bearer-Token (Sound-Assets) |
| NVS Update API Token | Bearer-Token für den satelliteneigenen `POST /nvs`-Endpunkt — separat vom OTA-Token. Leer deaktiviert Remote-NVS-Updates auf dem Satelliten |
| Disable TLS certificate validation | Nur für selbstsignierte Zertifikate — schaltet TLS-Prüfung komplett ab, unsicher |
| Your Hannah User ID | Numerische Hannah-User-ID (Trust-Level 10), als Requestor für Admin-Aktionen aus diesem Panel (z. B. Satellit umbenennen). Leer deaktiviert diese Aktionen |

## Weather

| Feld | Zweck |
|---|---|
| Weather Source | `Disabled`, `openweathermap`, `accuweather`, `daswetter` oder `Custom` |
| Instance | Bei einem bekannten Anbieter: welche Instanz dieses Adapters |
| Custom-Mapping | Bei `Custom`: pro Feld (Temperature, Humidity, Condition text, Precipitation mm, Wind speed m/s, Wind direction text) die State-ID angeben, aus der Hannah den Wert liest |

## Diagnostics

Zeigt, was Hannah aus deinem ioBroker macht — und vor allem, warum etwas **nicht** so ankommt,
wie du es erwartest. Der Tab hat keine Felder, nur den Knopf **Check devices** (bei deutscher
Admin-Sprache „Geräte prüfen"). Er prüft mit der Raum- und Funktionsauswahl, die gerade im Tab
[Device Discovery](#device-discovery) steht, auch wenn du sie noch nicht gespeichert hast.
Dabei ändert sich nichts an deinem ioBroker.

Das Ergebnis hat vier Teile:

| Teil | Was drinsteht |
|---|---|
| Zahlen | Wie viele States angesehen und vom Adapter gelesen wurden, wie viele davon nur Rohwerte ohne Gerät sind (Wetter, Auto, …), und wie viele Geräte Hannah bekommt |
| **Devices Hannah gets** | Pro Gerät: Raum, Name, Klasse (Licht, Steckdose, Thermostat, …) und seine Slots, jeweils mit dem State dahinter, der Rolle und der Einheit. `rw` heißt schreibbar, `ro` nur lesbar. Generische Slots stehen am Ende. Warnungen zu einem Gerät stehen direkt darunter |
| **States the adapter does not read** | States, die nicht ankommen, nach Grund gruppiert (kein Raum, keine Funktion, oder Raum/Funktion nicht ausgewählt), jeweils mit dem Hinweis, was du in ioBroker ändern musst |
| **Other findings** | Alles andere, z. B. ein Gerät ohne Raum oder ohne erkannten Slot |

Typische Meldungen und was sie bedeuten:

| Meldung | Bedeutung |
|---|---|
| Gerät ohne Raum / State ohne Raum oder Funktion | Dem State, seinem Kanal oder Gerät fehlt der Eintrag in `enum.rooms.*` oder `enum.functions.*` |
| Kein Slot erkannt | Keiner der States hat eine Rolle, die Hannah kennt — Rolle am State setzen oder per [Override](../../manual/smart-home-integration.md#von-hand-korrigieren) einem Slot zuweisen |
| Mehrdeutiger Slot | Mehrere States passen zu demselben Slot und nichts unterscheidet sie — keiner wird benutzt. Den richtigen per Override als **Slot** benennen |
| Einheit passt nicht | Ein State hat eine Einheit, die nicht zum Slot passt (Leistung in mA), er wird dort nicht benutzt |
| Verschiedene Namen | Die States eines Geräts tragen verschiedene Namen im Override — keiner wird benutzt |
| Generischer Slot | Ein State, den Hannah nicht kennt, bleibt als „generischer Slot" am Gerät erhalten (nur zur Information) |

Das ist der erste Anlaufpunkt, wenn Hannah ein Gerät nicht findet oder falsch versteht — bevor
du am Override oder an den Rollen herumstellst.
