# Daten und Verbindungen

Standardmäßig läuft alles auf deiner eigenen Hardware: Spracherkennung (faster-whisper),
das Verstehen der Befehle (regelbasiert) und die Sprachausgabe (Piper). Ein LLM für
Smalltalk ist optional und läuft lokal über Ollama oder, wenn du es so einstellst, bei
einem Cloud-Anbieter. Diese Seite sagt, was trotzdem nach außen geht, was die Server zu
Hannah von dir sehen und was gespeichert wird.

## Welche Komponente wohin verbindet

Die Tabelle nennt alle Komponenten. Steht bei "Nach außen" nur ein Strich, spricht sie nur
mit anderen Hannah-Komponenten und Systemen in deinem Netz.

| Komponente | Was sie tut | Nach außen |
|---|---|---|
| [Core](../../components/core/index.md) | Spracherkennung, Verstehen, Antworten, Steuerung | Version-Check, Modell-Downloads beim ersten Start und, was du selbst einschaltest. Einzelheiten stehen unter der Tabelle |
| [Satellit](../../components/satellite/index.md) | Mikrofon und Lautsprecher | Der Update-Server für Firmware-Updates (abschaltbar) und ein Zeitserver |
| [Proxy](../../components/proxy/index.md) | optionaler Audio-Server | – |
| [Asset Server](../../components/asset-server/index.md) | liefert Töne | – |
| [WebUI](../../components/webui/index.md) | Verwaltung im Browser | Nur wenn du einen dieser Logins einrichtest. Telegram-Login: Das erledigt dein Browser, die WebUI selbst verbindet nirgends hin. Microsoft-Entra-Login: Die WebUI fragt dabei selbst bei `login.microsoftonline.com` nach, ob die Anmeldung gültig ist |
| [Telegram](../../components/telegram/index.md) | Hannah per Telegram erreichen | Die Telegram-Server: Die Komponente holt die Nachrichten dort ab |
| [Microsoft Teams](../../components/msteams/index.md) | Hannah in Teams erreichen | Microsoft stellt die Nachrichten an die Bridge zu. Sie ist **die einzige Komponente, die aus dem Internet erreichbar sein muss** |
| [Chat (Terminal)](../../components/chat/index.md) | Hannah in der Konsole | – |
| [VoiceID](../../components/voiceid/index.md) | Sprechererkennung | Beim ersten Start: das Sprachmodell von Hugging Face. Danach nichts mehr |
| [Timer](../../components/timer/index.md) | Timer und Wecker | – |
| [AutoDeploy](../../components/autodeploy/index.md) | Updates ohne Docker | Der Update-Server und, wenn du `post_install` nutzt, der Paketindex (PyPI) |
| [LogCollector](../../components/logcollector/index.md) | sammelt die Logs | – (er leitet sie an den Log-Empfänger weiter, den du einträgst) |
| [ioBroker-Adapter](../../components/iobroker-adapter/index.md) | Brücke zu ioBroker | – |

Mit Docker kommen zusätzlich die Images von der Registry (Quay).

**Core im Einzelnen:**

- **Immer:** der Version-Check bei `hannah-versions.leonie.network`. Du kannst ihn abschalten.
- **Beim ersten Start:** Modelle von Hugging Face (Whisper-Spracherkennung, Piper-Stimmen).
- **Nur wenn du es einschaltest:** Azure (Sprache), Amazon Polly (Sprachausgabe) und ein
  Cloud-LLM (OpenAI, Groq, Mistral).

## Was gespeichert wird

- **Stimmprofile** (nur wenn du [VoiceID](../../components/voiceid/index.md) einrichtest):
  keine Aufnahmen, sondern ein mathematisches Profil deiner Stimme.
- **Activity-Log** (nur wenn du eine MySQL-Datenbank dafür einträgst): hält fest, wer wann
  was gesagt hat, und speichert dazu auch die Audioaufnahmen der Befehle. Ohne diesen
  Eintrag ist es aus.
- **Nutzer, Räume, Erinnerungen und Einstellungen** liegen in Hannahs eigener Datenbank
  auf deinem Core.

## Was die Server von dir sehen

Das betrifft die beiden Dienste, die zu Hannah gehören:

- **Der Version-Check** schickt keine Daten, nur die Anfrage selbst. Technisch bedingt sieht
  der Server dabei deine IP-Adresse. Du kannst ihn in den Einstellungen (Kategorie
  `version_check`) abschalten.
- **Der Update-Server** bekommt von Satelliten und AutoDeploy den Kanal, die aktuelle
  Version und eine Geräte-ID, dazu technisch bedingt die IP-Adresse. Die ID ist beim
  Satelliten die MAC-Adresse seines Chips, bei AutoDeploy ein einmal erzeugter, zufälliger
  Text. Beides ist kein Name. Der Server speichert je Geräte-ID Kanal und Version, mehr
  nicht, und ordnet die ID keinem Konto zu.

  Dein Konto legst du beim Registrieren an, siehe
  [Update-Server nutzen](../../components/update-server/usage.md): Dort gibst du eine
  E-Mail-Adresse an, die per Mail bestätigt wird, sowie Vor- und Nachname, die du frei
  wählen kannst. Der Update-Server selbst kennt davon nur den Benutzernamen. Downloads
  stehen zusammen mit diesem Benutzernamen und der IP-Adresse im Protokoll des Servers (Audit-Log).
  Das Log wird nicht automatisch geleert: Die Einträge einer Version verschwinden, sobald
  diese Version vom Server entfernt wird. Was nicht gespeichert wird, kann bei einem
  Einbruch auch nicht abfließen.
