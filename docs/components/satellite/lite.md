# Lite-Satellit (PC)

**Bei Bedarf — nur zum Ausprobieren und Testen.** Du brauchst ihn nur, wenn du Hannah
ohne ESP32-Hardware ansprechen willst, z. B. um eine frische Installation zu testen,
bevor die Satelliten-Platine da ist. Er ist **kein Ersatz** für einen echten
[Satelliten](index.md) im Alltag und wird für den produktiven Einsatz nicht unterstützt.

Der Lite-Satellit ist ein kleines Programm für deinen PC (Windows oder Linux). Er
benutzt dessen Mikrofon und Lautsprecher und meldet sich bei Hannah genau so an wie ein
echter Satellit — Hannah macht zwischen beiden keinen Unterschied. Er taucht also ganz
normal unter [Satelliten verwalten](../../manual/satellites.md) auf, und du kannst ihm
dort einen Raum zuweisen.

## Was er kann — und was bewusst nicht

| Kann er | Kann er nicht |
|---|---|
| Sprachbefehle per Tastenkürzel (PTT) aufnehmen und an Hannah schicken | Wake-Word — du musst immer die Sprechtaste benutzen |
| Hannahs Antworten über den PC-Lautsprecher abspielen | Präzise Sprachpausen-Erkennung — er erkennt das Ende eines Satzes nur grob an der Lautstärke |
| Nach einer Rückfrage von Hannah automatisch weiter zuhören | Firmware-Updates, BLE-Anwesenheitserkennung, Sensoren, LED-Ring |
| Stummschalten und Lautstärke — per Tastenkürzel oder von Hannah aus | Sound-Effekte (z. B. Timer-Jingle, Weckton) — die bleiben stumm |

## Voraussetzungen

- Ein PC mit Mikrofon und Lautsprecher (bzw. Headset)
- **Windows:** keine weiteren Voraussetzungen
- **Linux:** ein normaler Desktop mit grafischer Oberfläche (X11) und Sound
  (PulseAudio, PipeWire oder ALSA). Auf einem Server ohne Bildschirm läuft er nicht.
- Hannah Core läuft bereits und ist mit einem MQTT-Broker verbunden (der
  „Nachrichtenverteiler", über den Hannah mit ihren Satelliten spricht) — der
  Lite-Satellit braucht **denselben** Broker.

## Installation

1. Lade die passende Datei aus den
   [Releases](https://github.com/Leonie-Network/hannah-satellite-lite/releases) herunter:
   `hannah-satellite-lite-<version>-windows-amd64.exe` bzw.
   `hannah-satellite-lite-<version>-linux-amd64`. Das ist bereits das fertige Programm,
   eine Installation im eigentlichen Sinn gibt es nicht.
2. Lege daneben eine Datei `config.yaml` an (siehe unten).
3. Starte das Programm aus diesem Ordner heraus. Unter Linux musst du es vorher einmalig
   ausführbar machen: `chmod +x hannah-satellite-lite-*`.

Beim ersten Start fragt Windows eventuell, ob das Programm im Netzwerk kommunizieren
darf — das musst du erlauben, sonst kommen Hannahs Antworten nicht an.

## Konfiguration

Die `config.yaml` muss im selben Ordner liegen, aus dem du das Programm startest:

```yaml
mqtt:
  address: 192.168.1.1   # IP deines MQTT-Brokers, ohne Port
  port: 1883
  username: ""
  password: ""

satellite:
  satellite_id: pc-arbeitszimmer

# Optional — leer lassen, um ein Tastenkürzel abzuschalten.
keybindings:
  mute: ctrl+shift+m
  ptt: ctrl+shift+space
  vol_up: ctrl+shift+up
  vol_down: ctrl+shift+down
```

| Einstellung | Zweck | Pflicht? |
|---|---|---|
| `mqtt.address` / `port` | Derselbe MQTT-Broker, den auch Hannah Core benutzt | Ja |
| `mqtt.username` / `password` | Nur, falls dein Broker eine Anmeldung verlangt | Nein |
| `satellite.satellite_id` | Name, unter dem der Satellit bei Hannah auftaucht. Muss eindeutig sein — also nicht derselbe wie bei einem deiner echten Satelliten | Ja |
| `keybindings.*` | Tastenkürzel, siehe unten | Nein |

Jeder Wert lässt sich alternativ als Umgebungsvariable setzen:
`HANNAH_SATELLITE_` + Pfad in Großbuchstaben, Ebenen getrennt durch `__` —
z. B. `HANNAH_SATELLITE_MQTT__ADDRESS=192.168.1.1`.

## Bedienung

Die Tastenkürzel funktionieren überall, auch wenn gerade ein anderes Fenster im
Vordergrund ist — sie ersetzen die Tasten auf dem echten Satelliten.

| Standard-Kürzel | Funktion |
|---|---|
| `Strg+Umschalt+Leertaste` | **Sprechtaste** — gedrückt halten, sprechen, loslassen |
| `Strg+Umschalt+M` | Mikrofon stumm schalten / wieder an |
| `Strg+Umschalt+↑` / `Strg+Umschalt+↓` | Lautstärke +/− 5 % |

Stellt Hannah eine Rückfrage, hört der Lite-Satellit danach von selbst zu — dann einfach
antworten, ohne Taste. Die Aufnahme endet automatisch, sobald du kurz nicht mehr
sprichst.

## Wenn etwas nicht klappt

**Programm beendet sich sofort mit `Device or resource busy` / `Device in use`** —
Eine andere Anwendung belegt Mikrofon oder Lautsprecher exklusiv (z. B. Audio-Software
oder Soundkarten-Tools). Schließe sie, oder deaktiviere unter Windows in den
Eigenschaften des Geräts *Anwendungen haben alleinige Kontrolle über dieses Gerät*.

**Satellit taucht in der WebUI nicht auf** — Prüfe, ob `mqtt.address` wirklich auf
denselben Broker zeigt wie Hannah Core. Im Programmfenster sollte kurz nach dem Start
`[Audio] Proxy: …` stehen — fehlt das, hat der Lite-Satellit Hannah nicht gefunden.

**Tastenkürzel reagieren nicht (Linux)** — Globale Tastenkürzel funktionieren nur unter
X11. Unter einer reinen Wayland-Sitzung kann es sein, dass sie nicht ankommen.
