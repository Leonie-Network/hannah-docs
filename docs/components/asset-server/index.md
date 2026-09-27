# Asset Server

**Ja.** Ohne den Asset Server bekommen deine Satelliten keine Sound-Assets (Timer-Klingeln,
Hinweistöne) — Sprachein- und -ausgabe funktionieren weiterhin normal, nur die kleinen
akustischen Signale fehlen.

Läuft als eigener Dienst. Jeder Satellit lädt sich seine Sounds selbst per HTTP herunter und
cacht sie lokal — Core spricht den Asset Server nicht direkt an, sondern schickt dem
Satelliten nur die Information, *welchen* Sound er abspielen soll.

Standardmäßig zeigen alle Satelliten auf Leonies eigene Instanz. Willst du deine eigenen
Sound-Assets verwalten oder unabhängig von ihrer Instanz sein, kannst du den Asset Server
selbst betreiben — pro Satellit lässt sich URL, Token und Namespace in dessen eigener
Web-Oberfläche umstellen, ganz ohne Firmware-Neubau.

!!! note "Seltene Updates sind normal"
    Der Asset Server ist seit Monaten feature-complete und bekommt nur alle paar Monate ein
    Maintenance-Release — eine selten wechselnde Versionsnummer ist hier kein Zeichen von
    Vernachlässigung.

## Bekannte Asset-Keys

Diese Keys erwarten Core bzw. die Satelliten-Firmware fest einprogrammiert — ohne sie
fehlt jeweils nur das genannte Signal, der Rest von Hannah funktioniert normal.

| Key | Typ | Namespace | Zweck |
|---|---|---|---|
| `connect` | Sound | `satellite` | Spielt der Satellit selbst beim Boot/Registrieren, unabhängig von Core |
| `message_chime` | Sound | `satellite` | Neue Mailbox-Nachricht |
| `timer_jingle` | Sound | `satellite` | Timer/Wecker-Ablauf |
| `alarm_ring` | Sound | `shared` | Wird wiederholt abgespielt, solange ein Wecker klingelt |
| `wakeword` | Modell (kein Sound) | `satellite` | Override des Wakeword-Erkennungsmodells (TFLite Micro) |

`connect` und `wakeword` lädt die Firmware immer; `alarm_ring`, `timer_jingle` und
`message_chime` bekommt sie über eine von Core gepflegte Relevanzliste gemeldet.
