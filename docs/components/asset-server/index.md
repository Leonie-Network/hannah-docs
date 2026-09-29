# Asset Server

**Ja.** Ohne den Asset Server bekommen deine Satelliten keine Sound-Assets (Timer-Klingeln,
Hinweistöne) — Sprachein- und -ausgabe funktionieren weiterhin normal, nur die kleinen
akustischen Signale fehlen.

Läuft als eigener Dienst. Jeder Satellit lädt sich seine Sounds selbst per HTTP herunter und
cacht sie lokal — Core spricht den Asset Server nicht direkt an, sondern schickt dem
Satelliten nur die Information, *welchen* Sound er abspielen soll.

Ohne eigenen Asset Server bekommen die Satelliten keine Sounds — die Instanz der
Entwicklerin ist von außen nicht erreichbar. Deshalb lohnt es sich, einen zu betreiben,
ganz ohne Firmware-Neubau: du trägst nur seine Adresse in die Satelliten ein.

Vier Wege, das einzutragen:

- **Für alle künftigen Satelliten auf einmal:** URL und Token unter
  [Satellite Defaults](../iobroker-adapter/configuration.md#satellite-defaults) im
  ioBroker-Adapter eintragen, **bevor** du den ersten Satelliten flasht — jedes neu
  erzeugte Image übernimmt die Werte automatisch.
- **Für einen einzelnen neuen Satelliten, abweichend vom Default:** im
  "Flash new satellite"-Dialog den Abschnitt "Configuration" aufklappen — er ist mit
  den Defaults vorbefüllt, lässt sich aber vor dem Flashen für genau dieses Gerät
  überschreiben.
- **Für einen bereits laufenden Satelliten, ohne physischen Zugriff:** im
  [Satellite Manager](../iobroker-adapter/usage.md#satellite-manager) über den
  NVS-Dialog — kabellos lässt sich nur der Token ändern, die URL braucht ein
  USB-Kabel (WebSerial).
- **Direkt am Gerät:** in der [lokalen Web-Oberfläche des Satelliten](../satellite/configuration.md)
  selbst, Abschnitt "Asset Server" (URL, Token, Namespace).

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
| `alarm_ring` | Sound | `satellite` | Wird wiederholt abgespielt, solange ein Wecker klingelt |
| `wakeword` | Modell (kein Sound) | `satellite` | Override des Wakeword-Erkennungsmodells (TFLite Micro) |

`connect` und `wakeword` lädt die Firmware immer; `alarm_ring`, `timer_jingle` und
`message_chime` bekommt sie über eine von Core gepflegte Relevanzliste gemeldet.
