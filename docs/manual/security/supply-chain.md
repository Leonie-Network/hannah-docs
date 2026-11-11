# Lieferkette

Solange du nicht alles selbst baust, vertraust du dem Hersteller. Es gibt zwei getrennte
Wege, wie Hannah zu dir kommt: als **Container** oder über den **Update-Server**. Hier
steht zuerst, was auf dem jeweiligen Weg schützt, danach, was für beide gilt.

## Weg 1: Container

Wenn du Hannah mit Docker betreibst, kommen die Images von **Quay**. Der Update-Server
spielt dabei keine Rolle.

- **Freigegeben sind nur Versionen ohne `-rc`.** Die Tags mit `-rc` sind Vorab-Versionen,
  also **edge**. Sie sind nicht für den Einsatz gedacht, wer sie nutzt, tut das auf eigene
  Gefahr. Die finale Version ist exakt dasselbe Image, nicht neu gebaut.
- **Quay scannt die Images** und zeigt die gefundenen Schwachstellen an. Du kannst sie dort
  selbst einsehen. Die meisten Meldungen betreffen Abhängigkeiten von Abhängigkeiten, die
  sich nicht selbst beheben lassen, einzelne auch direkte Abhängigkeiten.
- **Core, Telegram, VoiceID und Proxy laufen nicht als root.** Ein Fehler in einem
  Container gibt keinen Vollzugriff.
- **Was du tun kannst:** Nimm eine feste Version oder einen Digest statt `latest` mit
  `pull_policy: always`, dann kommt nur an, was du bewusst aktualisierst. Spiel neue
  Versionen ein paar Tage später ein, dann haben andere schon Erfahrungen gesammelt.

## Weg 2: Update-Server

Der Update-Server liefert Satelliten-Updates (OTA) und die Releases für AutoDeploy, also
die Installation ohne Docker.

- **HTTPS mit Token.** Der Satellit prüft das Zertifikat des Servers. Startet eine neue
  Firmware nicht, fällt er auf die alte zurück.
- **Die Prüfsumme bei AutoDeploy** kommt vom selben Server wie das Archiv. Sie schützt vor
  Übertragungsfehlern, nicht vor einem kompromittierten Server.
- **Was du tun kannst:** AutoDeploy weglassen, bei den Satelliten die *Update-Server URL*
  leeren und alles von Hand aktualisieren.

### Was passiert, wenn der Update-Server kompromittiert wird

Der Update-Server ist darauf ausgelegt, dass das nicht passiert: Er steht hinter einer
WAF (Web Application Firewall), jede Aktion läuft nur mit einem Token, und die Rechte sind
fein abgestuft. Ausschließen lässt es sich trotzdem nicht. Er ist außerdem die einzige
Komponente, die nicht Open Source ist. Wer ihn prüfen oder auditieren möchte, kann sich bei
Leonie melden.

Ein Angreifer könnte im schlimmsten Fall manipulierte Satelliten-Updates und
AutoDeploy-Releases ausliefern. AutoDeploy führt Updates mit Root-Rechten aus, siehe den
[Sicherheitshinweis](../../components/autodeploy/index.md). Der Container-Weg ist davon
nicht betroffen, er hängt stattdessen an Quay.

## Für beide Wege

| Maßnahme | Wirkung |
|---|---|
| Offener Quellcode auf GitHub | Jeder kann prüfen, was drinsteht |
| Änderungen kommen nur über einen Änderungsantrag (Merge Request) in den Hauptzweig, und nur, wenn die automatischen Tests (Pipeline) bestanden sind | Jede Änderung läuft vor dem Einbau durch die Tests |
| Jedes Release ist ein Git-Tag | Du kannst den Stand auschecken und selbst bauen |
| Basis-Images und Werkzeuge der CI sind auf eine exakte Version festgelegt (per Prüfsumme, dem *Digest*), und ein automatisches Dependency-Management (Verwaltung der Abhängigkeiten) hält sie aktuell | Ein Image ändert sich nicht unbemerkt, jede Änderung steht als Commit im Verlauf. Kleine Fehlerkorrektur-Versionen (Patch-Updates) werden erst drei Tage nach Erscheinen übernommen, bekannte Schwachstellen werden gemeldet |
| Die Registries, aus denen die CI ihre Images zieht (Docker Hub, Google, Quay), scannen auf bekannte Schwachstellen | Probleme in den Werkzeugen des Builds fallen auf |

## Was es nicht gibt

- **Keine durchgängige Überwachung der Kette:** keine SBOM (Liste aller enthaltenen
  Pakete), keine signierten Images, keine Build-Provenance (kryptografischer Nachweis,
  woraus gebaut wurde).
- **Keine bitgleich reproduzierbaren Builds.** Du kannst jedes Release nachbauen, bekommst
  aber nicht zwingend dasselbe Image: Die Python-Pakete sind nur mit Mindestversion
  festgelegt, ein späterer Bau kann also neuere Versionen ziehen. Das soll sich ändern, die
  Versionen sollen festgelegt werden.

**Bewusst nicht vorgesehen** sind eine Signatur der Satelliten-Firmware und Secure Boot.
Das ist eine Entscheidung und keine Lücke.
