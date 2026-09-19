# Satelliten verwalten

!!! note "Nicht zu verwechseln mit dem Satellite Manager im ioBroker-Adapter"
    Diese Seite beschreibt die **WebUI-seitige** Satellitenverwaltung — Zuordnung zu
    Nutzern und Räumen, FollowUp, Firmware-Updates anstoßen, Satelliten löschen. Das
    **Flashen** neuer Satelliten und das Neuschreiben ihrer WLAN-/MQTT-Einstellungen
    (NVS-Rewrite) läuft dagegen über den
    [Satellite Manager im ioBroker-Adapter](../components/iobroker-adapter/usage.md#satellite-manager).
    Beide Werkzeuge ergänzen sich, sie konkurrieren nicht.

Unter **Satelliten** siehst du alle Satelliten, die sich jemals bei Hannah gemeldet
haben — als Tabelle (Desktop) oder Kartenliste (Mobil). Mit Trust-Level < 10 siehst du
nur die dir gehörenden Satelliten.

## Was du hier siehst und tun kannst

| Spalte/Feld | Bedeutung |
|---|---|
| Status-Punkt | Grau = offline, Grün = online, Gelb/Amber = online, aber Update verfügbar |
| Gerät | Die feste Geräte-ID, nicht änderbar |
| Anzeigename | Frei wählbarer Name, sofort per Eingabefeld + ↵ speicherbar |
| Zugewiesener Raum | Der Raum, dem dieser Satellit für Ansagen/Automatisierungen zugeordnet ist |
| Besitzer | Welcher Nutzer diesen Satelliten "besitzt" (relevant z. B. für Trust-Level-Checks) — ab Trust 10 änderbar, sonst nur lesbar |
| FollowUp | An/Aus — siehe unten |
| Zuletzt gesehen | Zeitpunkt der letzten Kontaktaufnahme |
| Firmware | Nur ab Trust 10 sichtbar: aktuelle Version, plus Update-Button falls verfügbar |

**Raum-Diskrepanz**: Meldet sich ein Satellit mit einem anderen Raum, als ihm hier
zugewiesen ist (z. B. weil er per NVS-Rewrite umgezogen wurde), erscheint ein gelber
Warnhinweis "Meldet sich als: *Raum*" direkt neben dem Raum-Feld — ein Hinweis, dass die
Zuordnung hier noch nachgezogen werden sollte.

**FollowUp** (`smalltalk_followup_listen`): ist das an, hört der Satellit nach einer
Hannah-Antwort noch kurz weiter zu, ohne dass du das Wake-Word erneut sagen musst — nützlich
für kurze Rückfragen/Dialoge, kostet aber etwas Reaktionszeit und kann in lauten Räumen zu
Fehlauslösungen führen. Aus ist der sichere Standard.

**Löschen** (Trust ≥ 10, mit Bestätigungsdialog) entfernt den Satelliten komplett aus
Hannah — er kann sich danach jederzeit neu registrieren, taucht dann aber wieder als
unzugeordnet (kein Besitzer, kein Raum) auf.

## Firmware-Updates

Ist eine neuere Firmware verfügbar, zeigt die Firmware-Spalte (nur Trust ≥ 10) einen
Update-Button mit Zielversion an. Ein Klick stößt das Update über den
[Update-Server](../components/update-server/index.md) an — der Satellit lädt es selbst
herunter und installiert es per OTA, ganz ohne physischen Zugriff.

!!! tip "Zwei Wege zum gleichen Ziel"
    Firmware-Updates lassen sich sowohl hier in der WebUI als auch direkt im
    [Satellite Manager des ioBroker-Adapters](../components/iobroker-adapter/usage.md#satellite-manager)
    anstoßen. Beide lösen denselben OTA-Vorgang aus — nimm, was gerade griffbereit ist.
