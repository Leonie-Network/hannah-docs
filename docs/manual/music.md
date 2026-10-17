# Musik hören (Music Assistant)

**Optional.** Diese Seite brauchst du nur, wenn du [Music Assistant](https://music-assistant.io/)
benutzt und deine Satelliten auch Musik abspielen sollen. Hannah selbst funktioniert
ohne all das genau wie bisher.

Ein Satellit meldet sich von selbst bei Music Assistant als eigener Lautsprecher an. Du wählst ihn
dort in der App oder der Weboberfläche aus und startest die Musik wie bei jedem anderen Gerät.
Eingerichtet werden muss am Satelliten nichts.

## Was du brauchst

- **Music Assistant ab Version 2.11.** Diese Version gibt es derzeit nur als Beta. Music
  Assistant 2.10 verbindet sich nicht mit dem Satelliten.
- **Satellit und Music Assistant im selben Netz.** Der Satellit macht sich per mDNS bemerkbar,
  und das funktioniert nur innerhalb eines Netzes. Sonst findet Music Assistant den Satelliten
  nicht.

## So benutzt du es

1. Schalte den Satelliten ein und warte, bis er mit dem WLAN verbunden ist.
2. Öffne Music Assistant. Der Satellit erscheint nach kurzer Zeit als Player mit dem Namen
   **Hannah &lt;Geräte-ID&gt;**, zum Beispiel `Hannah 9070690de424`. Die Geräte-ID siehst du auch in der
   [Satellitenverwaltung](satellites.md).
3. Wähle den Player aus und starte die Musik.

!!! note "Es kann ein paar Minuten dauern"
    Wie schnell Music Assistant den Satelliten findet, schwankt. Meist sind es Sekunden, manchmal
    mehrere Minuten. Wenn der Player noch fehlt, warte ein wenig, bevor du etwas änderst.

!!! warning "Stell die Musik zuerst leise"
    Hast du an einem Satelliten noch nie die Lautstärke verstellt, startet die Musik mit 80 %. Das
    ist laut. Stell die Lautstärke deshalb beim ersten Mal in Music Assistant niedrig ein, bevor du
    die Musik startest. Danach merkt sich der Satellit deinen Wert.

## Mehrere Satelliten gleichzeitig

In Music Assistant kannst du Satelliten zu einer Gruppe zusammenfassen, zum Beispiel
"Erdgeschoss". Sie spielen dann dieselbe Musik gleichzeitig, ein Echo ist nicht zu hören.

## Wenn Hannah spricht

Spricht Hannah (Antwort, Ansage, Wecker, Timer), wird die Musik leiser und läuft im Hintergrund
weiter. Sobald Hannah fertig ist, wird sie wieder lauter. Du musst die Musik dafür nicht
anhalten.

## Lautstärke

Jeder Satellit hat **zwei getrennte Lautstärken**, ähnlich wie im Auto:

| Lautstärke | Gilt für | Einstellen |
|---|---|---|
| **Musik** | alles, was Music Assistant schickt | in Music Assistant oder mit den Tasten am Satelliten |
| **Hannah** | Antworten, Ansagen, Wecker, Timer, Töne | mit den Tasten am Satelliten |

Die Tasten **Vol+** und **Vol−** am Satelliten bedienen immer die Lautstärke, die gerade
passt:

- Läuft Musik und spricht Hannah nicht: die **Musik**.
- Spricht Hannah gerade, oder läuft keine Musik: **Hannahs Stimme**.

Änderst du die Musiklautstärke an den Tasten, zeigt Music Assistant den neuen Wert an.
Stellst du sie in Music Assistant ein, ändert sich Hannahs Stimme nicht. Beide Werte bleiben
nach einem Neustart erhalten.

## Gut zu wissen

- **Der Satellit spielt Musik in Mono.** Auch eine Gruppe aus zwei Satelliten ist kein Stereopaar.
- **Findet der Satellit nach dem Einschalten zehn Minuten lang keinen Music Assistant**, hört er
  auf zu suchen. Das ist gewollt, damit ein Satellit ohne Music Assistant nicht ewig weitersucht.
  Ein Neustart (Strom kurz trennen) startet die Suche neu. Hat er sich einmal verbunden,
  wartet er danach weiter auf Music Assistant.
- **Musik steuern geht nur in Music Assistant.** Hannah per Sprache bitten, Musik zu starten oder
  zu wechseln, kann sie noch nicht.

## Musik und Sprache gleichzeitig

Läuft Musik aus dem Lautsprecher desselben Satelliten, nimmt sein Mikrofon sie mit auf. Dann
erkennt Hannah das Wake-Word schlechter, und auch Sprachbefehle per PTT kommen
oft nicht richtig an. Ohne Musik arbeitet beides wie gewohnt.

!!! tip "Halte die Musik kurz an"
    Halte die Musik kurz an, bevor du mit Hannah sprichst. Eine Echo-Unterdrückung ist geplant.

Weitere bekannte Einschränkungen stehen unter [Known Gaps](known-gaps.md).
