# Komponenten

Hannah besteht aus mehreren eigenständigen Diensten. [Core](core/index.md) und die
[WebUI](webui/index.md) sind zwingend nötig — alles andere ist optional und wird bei
Bedarf dazugeschaltet.

| Komponente | Zweck | Pflicht? |
|---|---|---|
| [Core](core/index.md) | Das Herzstück: STT, NLU, TTS, Geräte-Steuerung, Orchestrierung. Alle anderen Komponenten sprechen mit ihr. | Ja |
| [WebUI](webui/index.md) | Web-Oberfläche zur Steuerung und Konfiguration | Ja |
| [Proxy](proxy/index.md) | Nimmt Core die UDP-Audio-Verarbeitung der Satelliten ab — sinnvoll, wenn viele Satelliten Core sonst zu sehr belasten würden | Nein |
| [Telegram](telegram/index.md) | Hannah per Telegram-Chat ansprechen, als eigener Prozess | Nein |
| [VoiceID](voiceid/index.md) | Erkennt, *wer* spricht, nicht nur *was* gesagt wurde | Nein |
| [Timer](timer/index.md) | Timer und Wecker | Nein |
| [AutoDeploy](autodeploy/index.md) | Hält die anderen Komponenten automatisch aktuell | Nein |
| [Update-Server](update-server/index.md) | Die Quelle, von der Installationen und AutoDeploy ihre Releases beziehen | — (kein eigener nötig) |

!!! note "macOS"
    Native Installation unter macOS gibt es bislang nur für [AutoDeploy](autodeploy/index.md)
    und [VoiceID](voiceid/index.md). Für alle anderen Komponenten: Linux (nativ) oder
    [Docker](../manual/installation.md).
