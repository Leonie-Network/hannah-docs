# Smart-Home-Integration

Diese Seite erklärt, wie aus einem ganz normalen ioBroker-Gerät ein Gerät wird, das
Hannah per Sprache versteht und steuert — vom Grundkonzept über ein Beispiel bis zur
Frage, was passiert, wenn ein Kommando mal nicht eindeutig ist.

Voraussetzung ist eine laufende Verbindung zwischen Hannah und ioBroker über den
[ioBroker-Adapter](../components/iobroker-adapter/index.md) — die
[Konfiguration](../components/iobroker-adapter/configuration.md) dort steht bereits,
wenn der Health-Check erfolgreich ist.

## Grundkonzept: vier Kategorien

ioBroker kennt viele Objekttypen; für Hannah zählt praktisch nur einer: der **State**
(einzelner Wert, z. B. "Licht Küche an/aus" oder "Temperatur Wohnzimmer"). Aus jedem
relevanten State liest der Adapter vier Dinge heraus:

| Kategorie | Beantwortet | Woher |
|---|---|---|
| **Raum** | In welchem Zimmer steht/wirkt das Gerät? | ioBroker-Enum `enum.rooms.*` |
| **Funktion** | Wofür ist der State da (Licht, Heizung, Rollladen, …)? | ioBroker-Enum `enum.functions.*`, plus Fallback über Namens-Stichwörter |
| **Rolle** | Was für eine Art Wert ist das technisch (Schalter, Dimmer, Sensor, …)? | ioBroker-eigenes `common.role`-Feld am State |
| **Wert** | Boolean, Zahl, Text, Auswahlliste oder Farbe? | ioBroker-eigenes `common.type`/`common.states` |

Räume und Funktionen musst du in ioBroker selbst pflegen (Standard-ioBroker-Funktion,
nichts Hannah-Spezifisches) — Rolle und Werttyp bringt praktisch jeder Adapter für seine
Geräte schon korrekt mit.

## Wie Hannah ein Gerät einordnet

Aus der **Rolle** leitet der Hannah-Adapter automatisch eine **Kategorie** und einen
**canonical key** (den internen "Schlüssel" für genau diesen Wert am Gerät) ab. Die
wichtigsten Fälle:

| ioBroker-Rolle | Hannah-Kategorie | canonical key |
|---|---|---|
| `switch.light` | `light` (Lampe) | `on` |
| `level.dimmer` | `light` | `level` |
| `level.color*` | `light` | `color` |
| `switch`/`switch.power` (schreibbar) | `socket` (Steckdose) | `on` |
| `level.blind`/`level.curtain` | `blind` (Rollladen) | `level` |
| `sensor.window` | `window` | `open` |
| `sensor.door`/`indicator.open` | `door` | `open` |
| `level.temperature` | `thermostat` | `expected` (Soll-Temperatur) |
| `value.temperature` | `temperature_sensor` bzw. `thermostat`-`current` | `current` |
| `value.humidity` | `humidity_sensor` | `current` |
| `value.brightness` | `illuminance_sensor` | `illuminance` |

Findet sich keine passende Rolle, schaut Hannah ersatzweise auf den Namen der
**Funktion** (z. B. "Heizung"/"Therm" → Thermostat, "Fenster" → Fenster) — weniger
zuverlässig als eine saubere Rolle, aber ein brauchbarer Fallback.

### Von Hand korrigieren

Ordnet Hannah ein Gerät falsch ein (z. B. weil ein Adapter eine unübliche Rolle
verwendet), musst du nicht den ioBroker-State selbst umbauen: In den
**Objekt-Eigenschaften** jedes States/Kanals/Geräts gibt es einen eigenen
"Hannah"-Reiter mit einem "Override für Hannah aktivieren"-Schalter. Einmal aktiviert,
lässt er sich frei setzen:

- **Name** — wie Hannah das Gerät bei der Spracherkennung nennt/erkennt, ohne den
  ioBroker-Objektnamen zu ändern
- **Typ** — überschreibt die automatisch geratene Kategorie (z. B. erzwinge `light`
  statt einer falsch erkannten Kategorie)
- **canonicalKey** (nur auf State-Ebene) — überschreibt, welcher Wert das ist (`on`,
  `level`, `current`, …)
- **shutterInverted** (nur bei Kategorie `blind`) — dreht die Prozentkonvention um,
  siehe unten

Ein State-Override sticht einen Geräte-Override, der wiederum die automatische
Erkennung sticht — du kannst also gezielt nur einen einzelnen State korrigieren, ohne
das ganze Gerät anzufassen.

## Die Hannah-Kategorien im Detail

Pro Kategorie kennt Hannah feste "canonical keys" mit definiertem Wertebereich:

| Kategorie | Keys (Wertebereich/Format) |
|---|---|
| `light` (Lampe) | `on` (an/aus) · `level` (0–100 %) · `color` (Hex-Farbe `#RRGGBB`, oder das Wort "warm" für warmweiß) |
| `socket` (Steckdose) | `on` (an/aus) · `power` (Watt, nur lesend) |
| `climate` (Klimaanlage) | `on` (an/aus) · `mode` (`cool`/`heat`/`dry`/`fan_only`/`auto`, auf Deutsch angesagt) · `current`/`expected` (°C) · `fanSpeed` (`low`/`medium`/`high`/`auto`) |
| `blind` (Rollladen) | `level` (0–100 %, **0 = zu, 100 = auf** — Hannahs Standardkonvention) |
| `window` / `door` | `open` (offen/geschlossen) |
| `thermostat` | `current`/`expected` (°C) |
| `temperature_sensor` | `current` (°C) |
| `humidity_sensor` | `current` (0–100 %) |
| `illuminance_sensor` | `illuminance` (Lux, nach oben offen) |
| `air_quality_sensor` | `iaq` (Luftqualitätsindex 0–500, siehe unten) · `co2_equiv`/`voc_equiv` (ppm) |

**Rollladen-Sonderfall**: manche Aktoren (z. B. bestimmte Homematic-/KNX-Antriebe)
melden ihre Position genau andersherum (0 % = offen). Statt jedes Mal "andersherum"
mitzudenken, setzt du an genau diesem State das Override-Feld **shutterInverted** — ab
dann rechnet Hannah automatisch um, und du sagst weiterhin ganz normal "Rollladen zu".

**Luftqualität in Worten**: den rohen IAQ-Index sagt dir Hannah nie als Zahl vor,
sondern übersetzt ihn: bis 50 "gut", bis 100 "okay", bis 150 "leicht belastet", darüber
"schlecht".

## Beispiel-Walkthrough: einfach → komplex

### 1. Einfach: eine Lampe

Ein Zigbee-Lampenschalter mit Rolle `switch.light` in Raum "Küche", Funktion "Licht".
Hannah erkennt: Kategorie `light`, Key `on`. Sagst du *"Licht Küche an"*, schreibt Hannah
`on = true` auf genau diesen State — fertig, kein Override nötig.

### 2. Mittel: ein invertierter Rollladen

Ein Rollladenaktor mit Rolle `level.blind` in Raum "Schlafzimmer" meldet 0 % als
*offen* statt wie üblich als *zu*. Ohne Anpassung würde *"Rollladen Schlafzimmer zu"*
das Gegenteil vom Gewünschten tun. Lösung: im ioBroker-Objektbaum am State den
Hannah-Override aktivieren und **shutterInverted** setzen. Ab sofort rechnet Hannah die
Prozentangabe intern um, bevor sie den Wert schreibt — der Sprachbefehl bleibt
unverändert richtig.

### 3. Komplex: eine Klimaanlage

Eine Klimaanlage bringt mehrere States gleichzeitig mit: `mode` (Betriebsart),
`fanSpeed` (Lüfterstufe), `expected` (Soll-Temperatur). Sagst du *"Klimaanlage
Wohnzimmer auf kühlen stellen, Lüfter hoch"*, übersetzt Hannah "kühlen" → `mode: cool`
und "hoch" → `fanSpeed: high` (die deutschen Wörter dafür stehen unter
[Erweiterte Einstellungen → NLU-Wortlisten](settings.md#nlu-wortlisten) und lassen sich
dort erweitern, falls du andere Formulierungen bevorzugst) und schreibt beide States in
einem Rutsch.

## Wie Hannah ein Kommando zerlegt

1. Die Spracherkennung liefert reinen Text (z. B. *"mach das licht in der küche an"*).
2. Der NLU-Teil zerlegt den Text in **Intent** (Aktion), **Raum** und **Gerät** —
   erkannte Füllwörter ("mach", "in der") werden ignoriert, relevante Substantive
   ("licht", "küche") zugeordnet.
3. Hannah schreibt den erkannten Intent (Name, Raum, Gerät, Wert) mit ins Log — nützlich
   für die Fehlersuche, siehe unten.

### Wenn's nicht eindeutig ist: Rückfragen

Hannah fragt aktiv zurück, statt zu raten, in drei Fällen:

- **Mehrdeutige Kategorie** — z. B. *"Küche hoch"* könnte Rollladen oder Klimaanlage
  meinen → *"Meinst du Rollladen oder Klimaanlage?"*
- **Mehrdeutiger Raum** — mehrere Räume passen zum genannten Begriff →
  *"Welchen Raum meinst du — Küche oder Wohnzimmer?"*
- **Mehrdeutiges Gerät im selben Raum** — z. B. zwei Rollläden ("Seite 1"/"Seite 2") →
  *"Welches Gerät meinst du — Rolladen Seite 1 oder Rolladen Seite 2?"*

Deine Antwort auf so eine Rückfrage wird tolerant ausgewertet (auch "die erste", "den
zweiten" funktioniert). Passt die Antwort zu keiner der Optionen, verwirft Hannah die
Rückfrage kommentarlos und behandelt deinen nächsten Satz wieder ganz normal.

### Bestätigung und Timeout

Nach einem Steuerbefehl wartet Hannah kurz (Standard: 3 Sekunden, einstellbar über
`iobroker.feedback_timeout` in [Core → Konfiguration](../components/core/configuration.md#sonstiges))
auf die tatsächliche Rückmeldung des Geräts. Kommt sie rechtzeitig, ist der Vorgang
lautlos erledigt. Bleibt sie aus, sagt Hannah aktiv Bescheid: *"Gerät antwortet
nicht — möglicherweise offline."*

## Troubleshooting: was im Core-Log steht

Bei Problemen lohnt ein Blick ins Core-Log (siehe
[Installation → Prüfen, ob es läuft](installation.md)):

| Log-Zeile (sinngemäß) | Bedeutung |
|---|---|
| `execute: Kein Raum erkannt.` | Weder Raum noch konkretes Gerät im Kommando erkannt |
| `execute: Keine Geräte für Raum '…' gefunden.` | Raum erkannt, aber kein passendes Gerät darin |
| `execute: …, N Gerät(e) gefunden, state='…', value=…` | Erfolgreich zugeordnet und Befehl abgesetzt — der Normalfall |
| `Unbekannter State-Suffix '…' … Live-Update wird verworfen` | Ein ioBroker-Update kam für einen Wert, den Hannah keinem bekannten canonical key zuordnen kann — meist ein Hinweis, dass dieser State einen Override braucht |
| `Timeout: keine Bestätigung für …` | Gerät hat innerhalb des Zeitfensters nicht reagiert |
