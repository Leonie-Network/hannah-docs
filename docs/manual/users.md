# Nutzerverwaltung

Jede Person, die mit Hannah spricht oder die WebUI benutzt, ist ein **Nutzer** — in der
WebUI und im Rest dieser Doku auch "Roomie" genannt. Nutzer regeln zwei Dinge: *wer darf
was* (Trust-Level) und *wer ist gerade zuhause* (Anwesenheit, siehe
[Presence-Quellen](#presence-quellen-anwesenheit)).

## Trust-Level

Jeder Nutzer hat ein **Trust-Level von 0 bis 10**. Es ist keine Alters- oder
Rollenbezeichnung, sondern eine reine Zahl, die an genau zwei Stellen wirkt:

1. **Berechtigung** — viele Aktionen in der WebUI (und ein paar Sprachbefehle) sind erst
   ab einem bestimmten Trust-Level sichtbar bzw. ausführbar.
2. **Gesprächskontext** — Hannahs LLM bekommt das Trust-Level der sprechenden Person als
   Teil des System-Prompts mit (`Vertrauenslevel: X/10`). Es beeinflusst also potenziell
   auch, *wie* Hannah antwortet, nicht nur, was sie zulässt.

Neue Nutzer bekommen standardmäßig Trust-Level 5. Ändern kannst du das unter
**Nutzerverwaltung → Bearbeiten** (nur mit eigenem Trust-Level ≥ 10 sichtbar).

Die wichtigsten Schwellenwerte in der WebUI:

| Aktion | Ab Trust-Level |
|---|---|
| Räume sehen | 3 |
| Satelliten sehen (nur eigene, falls < 10) | 5 |
| Trigger ansehen | 5 |
| Eigenen Satelliten umbenennen/verschieben | 5 (nur eigene, außer schon ≥ 10) |
| Trigger anlegen/bearbeiten/löschen | 7 |
| Nutzer verwalten, Satelliten löschen/Besitzer ändern, Firmware-Updates anstoßen | 10 |
| Fahrzeuge, Gruppen, BLE-Tags, Core-Einstellungen (NLU/LLM-Prompt) verwalten | 10 |
| Voiceprint für eine **andere** Person aufnehmen | 10 |
| Aktivitätslog/Postfach einer **anderen** Person einsehen | 10 |
| Verknüpftes Konto einer **anderen** Person trennen | 10 |

!!! note "Wecker sind eine Ausnahme"
    [Wecker](alarms.md) sind bewusst **nicht** trust-gated — Details dazu auf der
    [Wecker-Seite](alarms.md#wichtig-kein-trust-level-schutz).

Für unbekannte oder nicht angemeldete Anfragen (z. B. Systemprozesse) gilt intern kein
Trust-Level-Check — das betrifft nur Hannah selbst, nicht reguläre Nutzer.

## Nutzer anlegen und bearbeiten

Unter **Nutzerverwaltung** (Trust-Level ≥ 10 nötig) legst du neue Nutzer an oder
bearbeitest bestehende:

- **Username, Anzeigename, E-Mail, Passwort** — Anzeigename ist optional und fällt sonst
  auf den Username zurück.
- **Typ**: `roomie` (echter Bewohner), `guest` (Gast) oder `pet` (Haustier — z. B. für
  eigene Presence-Quellen wie einen BLE-Tag am Halsband, ohne dass ein Tier als "Bewohner"
  zählt).
- **Trust-Level** (siehe oben).
- **Aktiv** — deaktivierte Nutzer verschwinden aus den meisten Listen und Auswahlfeldern,
  ohne dass ihre Daten gelöscht werden.
- **System-Benachrichtigungen** — ob diese Person wichtige/dringende Meldungen erhält
  (siehe "Hannah sagen" auf der [ioBroker-Adapter-Nutzungsseite](../components/iobroker-adapter/usage.md#blockly-blocke)).

Es gibt daneben noch einen internen, unsichtbaren **Mood-Level** — beeinflusst
Formulierungen, ist keine von dir zu pflegende Einstellung.

!!! warning "Löschen ist endgültig"
    Einen Nutzer zu löschen entfernt auch alle seine Wecker, verknüpften Konten und
    Presence-Quellen. Satelliten und BLE-Tags, die ihm gehörten, werden nicht gelöscht,
    verlieren aber ihren Besitzer (musst du danach neu zuweisen).

## Verknüpfte Konten

Ein Hannah-Nutzer kann mit externen Konten verknüpft werden. Das läuft an zwei
unterschiedlichen Stellen, je nachdem worum es geht:

- **Residents (ioBroker-Anwesenheit)** — wird admin-seitig auf der Nutzerliste
  verknüpft: pro Nutzer ein Dropdown mit den vom Residents-Adapter gemeldeten Personen +
  "Verknüpfen"-Button. Ein Resident taucht dort erst auf, sobald ioBroker mindestens
  einmal ein Anwesenheits-Update für ihn geschickt hat.
- **Telegram** (und perspektivisch Microsoft) — läuft **nicht** über die
  Nutzerverwaltung, sondern **Self-Service**: jeder Nutzer verknüpft sein eigenes
  Telegram-Konto selbst, auf seiner eigenen Profilseite (**Mein Konto** → "Verknüpfte
  Konten" → "Verbinden"). Das startet den offiziellen Telegram-Login-Widget-Flow. Ist
  die [Telegram-Komponente](../components/telegram/index.md) serverseitig nicht
  eingerichtet, taucht der Button gar nicht erst auf.

Ein externes Konto lässt sich immer nur mit **einem** Hannah-Nutzer verknüpfen. Sein
eigenes Konto trennt jeder selbst; ein fremdes zu trennen braucht Trust-Level ≥ 10.

## Presence-Quellen (Anwesenheit)

Damit Hannah weiß, ob jemand zuhause, unterwegs oder schon eingeschlafen ist, wertet sie
pro Nutzer eine oder mehrere **Presence-Quellen** aus (**Nutzerverwaltung** → Nutzer
bearbeiten → "Presence-Quellen verwalten"). Jede Quelle hat:

- einen **Typ** (z. B. ein roher ioBroker-State, oder ein **BLE-Tag** — siehe
  [Erweiterte Einstellungen → BLE-Tags](settings.md#ble-tags))
- eine **Referenz** (die konkrete State-ID bzw. bei BLE-Tags eine Auswahl aus den
  Tags dieses Nutzers)
- eine **Home-** und **Away-Konfidenz** (0–1) — wie stark diese einzelne Quelle für
  "zuhause" bzw. "weg" spricht, falls sich mehrere Quellen widersprechen
- ob sie **aktiv** ist

Mehrere Quellen pro Nutzer sind der Normalfall (z. B. ioBroker-Präsenzmelder **und**
BLE-Tag) — Hannah kombiniert sie, statt sich auf eine einzelne Quelle zu verlassen.
