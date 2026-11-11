# Sicherheit und Vertrauen

**Du musst diese Seite nicht lesen, um Hannah zu nutzen.** Sie ist für alle, die vorher
wissen wollen, wem sie bei Hannah an welcher Stelle vertrauen, was sie selbst prüfen können
und was nicht abgesichert ist. Und für alle, die sich fragen, ob ein Mikrofon im Wohnzimmer
eine gute Idee ist.

## Die Haltung dahinter

Hannah ist ein Open-Source-Projekt einer Einzelperson. Der Code ist offen, damit du
nachlesen kannst, was Hannah tut. Verstehen muss ihn niemand, lesen kann ihn jeder.

- **Keine Garantie.** Hannah ist ein privates Projekt. Es gibt weder Garantie noch
  Gewährleistung, und es besteht keine Verpflichtung zu Support, Updates oder
  Fehlerbehebung. Du betreibst Hannah auf eigene Verantwortung.
- **Keine Hardware zu kaufen.** Von Leonie gibt es keine fertigen Satelliten und keinen
  Verkauf. Die Platine bestellt jeder selbst, siehe
  [Platine bestellen](../../components/satellite/pcb-order.md). Es gibt also keine
  Kundenbeziehung.
- **Nichts davon ist Pflicht.** Update-Server, Satelliten-Updates, AutoDeploy und die
  Cloud-Dienste sind optional. Hannah läuft auch ohne jeden davon.
- **Du kannst dich aus der Kette herausnehmen.** Wer niemandem außer sich selbst vertrauen
  will, schaltet die Updates ab und baut sich Hannah aus dem GitHub-Stand selbst.
- **GitHub und Release sind derselbe Stand.** Der Stand auf GitHub entspricht inhaltlich
  dem, aus dem die Releases gebaut werden. Entfernt sind lediglich private Informationen.

## Wem du wo vertraust

| Stelle | Dafür vertraust du ihr | Kannst du dich herausnehmen? |
|---|---|---|
| **Der Quellcode** (Leonie) | Dass Hannah tut, was sie soll, und nichts Schädliches enthält | Du kannst ihn lesen, er liegt offen auf GitHub |
| **Build und Veröffentlichung** | Dass die Releases aus genau diesem Code gebaut sind | Ja, selbst bauen: jedes Release ist ein Git-Tag |
| **Update-Server** | Dass er dir nur echte Releases ausliefert (Satelliten-Updates, AutoDeploy). Er ist nicht Open Source, auf Anfrage aber prüfbar | Ja, die Updates abschalten |
| **Container-Registry** (Quay) | Dass die Images so ankommen, wie sie veröffentlicht wurden | Ja, selbst bauen |
| **Fremde Software** (Python-Pakete, Basis-Images, Sprachmodelle) | Dass sie sauber ist | Nur teilweise, siehe [Lieferkette](supply-chain.md) |
| **Cloud-Dienste, die du einschaltest** | Dass der Anbieter ordentlich mit deinen Daten umgeht | Ja, der Standard ist lokal, siehe [Daten und Verbindungen](data.md) |
| **Dein Netzwerk** | Dass niemand Unbefugtes drin ist | Nein, das ist das Fundament, siehe [Netzwerk und Firewall](network.md) |

## Wer darf was im Haus

Innerhalb von Hannah regelt das [Trust-Level](../users.md#trust-level) (0 bis 10), wer
welche Geräte schalten und welche Verwaltungsfunktionen nutzen darf. Einzelne Geräte
lassen sich zusätzlich [mit einer Mindest-Stufe schützen](../smart-home-integration.md#gerate-schutzen).

Die Sprechererkennung von [VoiceID](../../components/voiceid/index.md) ist dabei ein
Komfort, kein Passwort. Eine Stimme lässt sich nachmachen oder abspielen. Schütze
Sicherheitsrelevantes wie Schlösser oder Alarmanlagen daher nicht allein mit der Stimme.

## Die Themen im Einzelnen

- [Satelliten und das Mikrofon](satellites.md): Können Satelliten heimlich lauschen, und
  was hilft dagegen?
- [Daten und Verbindungen](data.md): Was bleibt lokal, welche Komponente verbindet wohin
  nach außen, und was sehen die Server, die zu Hannah gehören?
- [Lieferkette](supply-chain.md): Wie kommt Hannah zu dir, was schützt unterwegs, und
  was passiert, wenn der Update-Server kompromittiert wird?
- [Netzwerk und Firewall](network.md): Welche Ports gehören wohin, und was gehört nicht ins
  Internet?

## Kurz-Checkliste

- Hannah samt Satelliten in ein eigenes Netz. Ob die Satelliten Internetzugang haben, ist
  eine bewusste Entscheidung, siehe [Satelliten und das Mikrofon](satellites.md#was-dagegen-hilft)
- MQTT-Broker mit Anmeldung und nur aus dem internen Netz erreichbar
- Keine der Ports aus der [Port-Tabelle](network.md) ins Internet freigeben
- Docker: feste Version statt `latest`, Updates mit ein paar Tagen Abstand
- Cloud-Dienste nur einschalten, wenn du den Anbieter in Kauf nimmst
- WebUI nur über VPN oder mit TLS hinter einem Reverse-Proxy erreichbar machen
- Sicherheitsrelevante Geräte mit einem Trust-Level absichern

## Schwachstellen melden

Hast du eine Sicherheitslücke gefunden, melde sie bitte **nicht** als öffentliches Issue,
sondern vertraulich über das
[Private Vulnerability Reporting auf GitHub](https://github.com/NurPech/hannah/security/advisories/new).
Die Meldung sehen nur du und Leonie.
