# Known Gaps

Bekannte Lücken und Einschränkungen — Dinge, die (noch) nicht so funktionieren, wie man
es intuitiv erwarten würde, oder bewusst so gebaut sind, damit du nicht danach suchst,
ohne es zu finden. Alle hier gelisteten Punkte sind bekannt und stehen langfristig auf
der Liste, nicht überraschend/unentdeckt.

## Wecker: kein Trust-Level-Schutz beim Löschen fremder Wecker

Wer einen Satelliten im Haus anspricht und Datum bzw. Uhrzeit eines Weckers trifft, kann
diesen Wecker per Sprache beenden oder für den Tag aussetzen — unabhängig davon, wem er
gehört. Es gibt dafür aktuell kein
[Trust-Level](users.md#trust-level)-Gate (siehe [Wecker](alarms.md#wichtig-kein-trust-level-schutz)).

Langfristig soll das eingeschränkt werden, sodass fremde Wecker nicht mehr ohne
Weiteres per Sprache beendet werden können.

## Trigger: global statt pro Nutzer

[Trigger](triggers.md) wirken aktuell global — sie gelten für das ganze Haus, nicht für
einzelne Personen. Genau deshalb ist das Anlegen/Bearbeiten an ein vergleichsweise hohes
Trust-Level (≥ 7) gebunden: ein Trigger, den eine Person anlegt, betrifft potenziell
alle.

Langfristig sollen Trigger auf "pro Nutzer" umgebaut werden — dann ließe sich vermutlich
auch das nötige Trust-Level für einfache, auf die eigene Person beschränkte Trigger
absenken.
