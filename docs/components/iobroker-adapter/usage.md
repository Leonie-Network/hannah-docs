# Nutzung

Diese Seite zeigt, was du im Alltag mit dem Adapter machen kannst, sobald die
[Konfiguration](configuration.md) einmal steht — Satelliten verwalten, Hannah aus
eigenen ioBroker-Scripten heraus ansprechen, und wo die Geräte-Zustände liegen, falls du
sie selbst auswerten willst. Nichts davon ist Pflicht, um Hannah zu benutzen — all das
läuft normalerweise automatisch im Hintergrund.

## Satellite Manager

Eigener Tab in der Adapterinstanz in ioBroker Admin: eine Kachel pro registriertem
Satelliten, mit Online/Offline-Status, Raum und Firmware-Version (inkl. Hinweis, wenn
ein Update verfügbar ist).

Pro Kachel:

- **Configure** öffnet die lokale Web-Oberfläche des Satelliten direkt im Browser
  (siehe [Satellit → Konfiguration](../satellite/configuration.md))
- **NVS** öffnet einen Dialog, um die im Satelliten gespeicherten Einstellungen (WLAN,
  MQTT, …) neu zu schreiben — entweder **kabellos** (nur eine Teilmenge der Felder, nur
  wenn der Satellit gerade online ist, startet ihn danach neu) oder **per USB-Kabel**
  (WebSerial, braucht Chrome oder Edge — dafür vollständiger Zugriff, auch wenn der
  Satellit offline ist)

Über den grünen Button unten rechts ("Flash new satellite") lässt sich ein komplett
neuer Satellit einrichten: Gerätename und Raum vergeben, WLAN-/MQTT-/OTA-Zugangsdaten
eintragen, dann entweder direkt per USB-Kabel aus dem Browser flashen (wieder
WebSerial, Chrome/Edge) oder das fertige Firmware-Image für einen späteren, manuellen
Flash herunterladen.

## Blockly-Blöcke

Optional — nur relevant, wenn du eigene ioBroker-Scripte schreibst. Es gibt drei
fertige Blockly-Blöcke (Kategorie "sendTo"), die sich per Drag & Drop aus der Palette
in ein Script ziehen lassen, ohne dass du selbst Code schreiben musst:

| Block | Zweck |
|---|---|
| **Hannah sagen** | Löst eine System-Notification aus — kein Raumbezug, geht über alle Kanäle raus, auf denen der jeweilige Nutzer Systemnachrichten erhält (Satelliten **und** z. B. Telegram). Gedacht für wichtige/dringende Meldungen, nicht für alltägliche Ansagen |
| **Hannah Ansage** | Live-Ansage in einem bestimmten Raum, optional zusätzlich auf eine bestimmte Person eingegrenzt — nur die Satelliten in diesem Raum sprechen |
| **fragen per Hannah** | Frage stellen und die gesprochene Antwort in eine Script-Variable schreiben, mit der das Script weiterarbeitet |

Der Unterschied zwischen den ersten beiden ist wichtig: **"Hannah sagen"** ist der
Notfall-/Wichtig-Kanal (z. B. "Wasserschaden erkannt") und erreicht den Nutzer überall,
nicht nur akustisch im Haus. **"Hannah Ansage"** ist für alltägliche, ortsgebundene
Durchsagen ("Essen ist fertig" in der Küche) — die bleibt akustisch auf den
Ziel-Raum beschränkt. Das "Instance"-Feld bei beiden Blöcken wählt nur, welche
`hannah`-**Adapter**-Instanz die Nachricht verschickt (relevant, falls mehrere laufen)
— nicht, welcher Satellit sie ausspielt.

## States/Objekte-Struktur

Optional — nur relevant, wenn du Hannah-Zustände direkt in eigenen Scripten oder
VIS-Views auswerten willst, statt über die Blockly-Blöcke oder die WebUI zu gehen.

Alles liegt unter `hannah.<instance>.satellites.*`:

| Pfad | Inhalt |
|---|---|
| `rooms.all.*` | Broadcast an alle Satelliten (Announcement, Mute, Do-Not-Disturb) |
| `rooms.<raum>.*` | Broadcast an alle Satelliten in einem Raum, plus `anyOnline` |
| `rooms.<raum>.<satellit>.*` | Einzelner Satellit: u. a. `online`, `address`, `firmware_version`, `update_available`, `volume`, `mute`, `dnd`, `speaking`, `lastTranscript` |
| `sensors.<satellit>.*` | Sensordaten: `temperature`/`pressure` immer; `humidity` sowie die Luftqualitätswerte `iaq`/`iaq_accuracy`/`co2_equiv`/`voc_equiv` erst, sobald der Sensor genug Messdaten für eine verlässliche Kalibrierung gesammelt hat |

Schreibbare States (`mute`, `dnd`, `announcement`, …) wirken sofort — kein
Adapter-Neustart nötig.
