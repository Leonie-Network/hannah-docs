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
- **Die Container von Core, WebUI, Telegram, Proxy, VoiceID, LogCollector, Timer, Teams
  und Asset Server laufen nicht als root.** Ein Fehler in einem Container gibt keinen
  Vollzugriff. Beim Asset Server gilt das ab Version 0.7.0 für den Server-Prozess: Beim
  ersten Start nach dem Update übernimmt er kurz als root das Datenverzeichnis und wechselt
  dann auf den Benutzer `1000:1000`
  ([Details](../../components/asset-server/installation.md#container-benutzer)).
- **Was du tun kannst:** Nimm eine feste Version oder einen Digest statt `latest` mit
  `pull_policy: always`, dann kommt nur an, was du bewusst aktualisierst. Spiel neue
  Versionen ein paar Tage später ein, dann haben andere schon Erfahrungen gesammelt.

## Weg 2: Update-Server

Der Update-Server liefert Satelliten-Updates (OTA) und die Releases für AutoDeploy, also
die Installation ohne Docker.

- **HTTPS mit Token.** Der Satellit prüft das Zertifikat des Servers. Startet eine neue
  Firmware nicht, fällt er auf die alte zurück.
- **Die Firmware der Satelliten ist signiert.** Seit Version 0.105.0 trägt die Firmware
  jedes Releases eine Signatur, die ihre Echtheit bestätigt. Den Schlüssel dazu verwaltet
  HashiCorp Vault, siehe
  [Wie der Signaturschlüssel geschützt ist](#wie-der-signaturschlussel-geschutzt-ist). Ein
  Satellit mit signierter Firmware nimmt ein Update nur an, wenn es mit demselben Schlüssel
  signiert ist, egal ob es über den Update-Server oder über die Weboberfläche des
  Satelliten kommt. Satelliten mit älterer Firmware prüfen
  noch nichts, die Prüfung beginnt mit dem ersten signierten Release, das sie übernehmen.
  Wer Hannah selbst baut, bekommt standardmäßig eine Firmware ohne Signatur und ohne Prüfung.
- **Die Prüfsumme bei AutoDeploy** kommt vom selben Server wie das Archiv. Sie schützt vor
  Übertragungsfehlern, nicht vor einem kompromittierten Server.
- **Was du tun kannst:** AutoDeploy weglassen, bei den Satelliten die *Update-Server URL*
  leeren und alles von Hand aktualisieren.

### Wie der Signaturschlüssel geschützt ist

Den Schlüssel, mit dem die Firmware signiert wird, verwaltet
[HashiCorp Vault](https://www.vaultproject.io/). Das ist ein weit verbreiteter Tresor für
Geheimnisse, gebaut nach dem Prinzip *Zero Trust*: Zugriff bekommt nur, wer sich für genau
diese eine Aufgabe ausweist, und nur für die Dauer dieser Aufgabe.

- **Der Schlüssel verlässt Vault nie.** Er wurde in Vault erzeugt und lässt sich nicht
  herausholen, auch nicht für die Build-Pipeline. Sie schickt nur den Fingerabdruck der
  Firmware hin und bekommt die Signatur zurück.
- **Vault speichert alles verschlüsselt.** Mit einer gestohlenen Datenbank allein lässt
  sich der Schlüssel nicht auslesen.
- **Signieren darf nur ein Release-Bau.** Dafür stellt Vault der Pipeline ein Token aus, das
  nur 15 Minuten gilt und nur für dieses Projekt und nur bei einem geschützten
  Versions-Tag. Mit dem Token darf die Pipeline signieren, den Schlüssel aber weder
  verändern noch herausholen.

**Was bleibt:** Die Pipeline und das GitLab-Konto, das einen Release auslöst, sind die Stelle,
der du vertraust. Wer sie übernimmt, könnte beim nächsten Release eine eigene Firmware
signieren lassen. Das ist eine Hürde, die ein Angreifer erst finden und überwinden müsste,
und sie liegt vor dem Update-Server, nicht dahinter.

### Was passiert, wenn der Update-Server kompromittiert wird

Der Update-Server ist darauf ausgelegt, dass das nicht passiert: Er steht hinter einer
WAF (Web Application Firewall), jede Aktion läuft nur mit einem Token, und die Rechte sind
fein abgestuft. Ausschließen lässt es sich trotzdem nicht. Er ist außerdem die einzige
Komponente, die nicht Open Source ist. Wer ihn prüfen oder auditieren möchte, kann sich bei
Leonie melden.

Ein Angreifer könnte im schlimmsten Fall manipulierte AutoDeploy-Releases ausliefern.
AutoDeploy führt Updates mit Root-Rechten aus, siehe den
[Sicherheitshinweis](../../components/autodeploy/index.md). Bei den Satelliten reicht der
Update-Server allein dafür nicht mehr: Die Firmware muss mit dem Schlüssel signiert sein,
der in Vault liegt, und darauf hat der Update-Server keinen Zugriff. Ein Satellit mit
signierter Firmware lehnt eine manipulierte also ab. Das gilt noch nicht für
Satelliten mit älterer, unsignierter Firmware. Der Container-Weg ist von alledem nicht
betroffen, er hängt stattdessen an Quay.

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
  Pakete), keine signierten Container-Images, keine Build-Provenance (kryptografischer
  Nachweis, woraus gebaut wurde). Signiert ist nur die Firmware der Satelliten.
- **Keine bitgleich reproduzierbaren Builds.** Du kannst jedes Release nachbauen, bekommst
  aber nicht zwingend dasselbe Image: Die Python-Pakete sind nur mit Mindestversion
  festgelegt, ein späterer Bau kann also neuere Versionen ziehen. Das soll sich ändern, die
  Versionen sollen festgelegt werden.

**Bewusst nicht vorgesehen** ist Secure Boot. Die Signatur der Satelliten-Firmware prüft nur
Updates, die auf einen Satelliten kommen. Sie schützt nicht vor jemandem, der den
Satelliten in der Hand hat und ihn über den UART-Header neu beschreibt. Das ist eine
Entscheidung und keine Lücke.
