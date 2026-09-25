# Komponenten

Hannah besteht aus mehreren eigenständigen Diensten. Was du davon wirklich brauchst,
steht in der Tabelle unten.

Die Karte zeigt, wie die Komponenten zusammenhängen — Details zu jeder einzelnen stehen
in der Tabelle darunter.

<style>
.hannah-system-map{margin:0 0 24px;font-family:system-ui,-apple-system,sans-serif}
.hannah-system-map .diagram-scroll{overflow-x:auto;border:1px solid var(--md-default-fg-color--lightest,#c7d0da);border-radius:12px;padding:6px}
.hannah-system-map svg{display:block;min-width:600px;width:100%;height:auto}
.hannah-system-map figcaption{font-size:.85rem;color:var(--md-default-fg-color--light,#56606d);margin-top:10px;line-height:1.5}
.hsm-box{fill:var(--md-default-bg-color,#fff);stroke:#8a97a6;stroke-width:1.6}
.hsm-box-core{fill:var(--md-code-bg-color,#f7f9fb);stroke:#1c2430;stroke-width:2.2}
.hsm-title{font-family:system-ui,-apple-system,sans-serif;font-weight:600;fill:var(--md-default-fg-color,#1c2430);font-size:14.5px;text-anchor:middle}
.hsm-sub{font-family:system-ui,-apple-system,sans-serif;fill:var(--md-default-fg-color--light,#56606d);font-size:11.5px;text-anchor:middle}
.hsm-line{stroke:#8a97a6;stroke-width:1.8;fill:none}
a.hsm-link{cursor:pointer}
a.hsm-link:hover .hsm-box, a.hsm-link:hover .hsm-box-core{stroke:#5b4fd1;stroke-width:2.4}
a.hsm-link:hover .hsm-title{text-decoration:underline}
</style>
<div class="hannah-system-map">
  <figure style="margin:0">
    <div class="diagram-scroll">
      <svg viewBox="0 0 950 380" role="img" aria-label="Übersicht: Satelliten sprechen mit Core, wahlweise über den Proxy. Core verbindet sich mit WebUI, ioBroker-Adapter, Telegram, Chat und Teams, VoiceID, Timer und dem LogCollector.">
        <defs>
          <marker id="hsm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <polygon points="0,0 10,5 0,10" fill="#8a97a6" />
          </marker>
        </defs>

        <a class="hsm-link" href="satellite/">
          <rect class="hsm-box" x="30" y="156" width="160" height="52" rx="9" />
          <text class="hsm-title" x="110" y="178">Satellit</text>
          <text class="hsm-sub" x="110" y="196">Küche, Wohnzimmer, …</text>
        </a>

        <line class="hsm-line" x1="190" y1="182" x2="230" y2="182" marker-end="url(#hsm-arrow)" />
        <a class="hsm-link" href="proxy/">
          <rect class="hsm-box" x="230" y="156" width="140" height="52" rx="9" />
          <text class="hsm-title" x="300" y="178">Proxy</text>
          <text class="hsm-sub" x="300" y="196">entlastet Core</text>
        </a>
        <line class="hsm-line" x1="370" y1="182" x2="420" y2="182" marker-end="url(#hsm-arrow)" />

        <a class="hsm-link" href="core/">
          <rect class="hsm-box-core" x="420" y="130" width="220" height="104" rx="12" />
          <text class="hsm-title" x="530" y="176" font-size="17">Hannah Core</text>
          <text class="hsm-sub" x="530" y="200">Versteht, antwortet, steuert</text>
        </a>

        <line class="hsm-line" x1="530" y1="234" x2="530" y2="300" marker-end="url(#hsm-arrow)" />
        <a class="hsm-link" href="logcollector/">
          <rect class="hsm-box" x="420" y="300" width="220" height="52" rx="9" />
          <text class="hsm-title" x="530" y="322">LogCollector</text>
          <text class="hsm-sub" x="530" y="340">sammelt die Logs aller Komponenten</text>
        </a>

        <line class="hsm-line" x1="640" y1="145" x2="720" y2="46" marker-start="url(#hsm-arrow)" />
        <a class="hsm-link" href="webui/">
          <rect class="hsm-box" x="720" y="20" width="200" height="52" rx="9" />
          <text class="hsm-title" x="820" y="42">WebUI</text>
          <text class="hsm-sub" x="820" y="60">Einstellungen im Browser</text>
        </a>

        <line class="hsm-line" x1="640" y1="165" x2="720" y2="116" marker-start="url(#hsm-arrow)" marker-end="url(#hsm-arrow)" />
        <a class="hsm-link" href="iobroker-adapter/">
          <rect class="hsm-box" x="720" y="90" width="200" height="52" rx="9" />
          <text class="hsm-title" x="820" y="112">ioBroker-Adapter</text>
          <text class="hsm-sub" x="820" y="130">steuert dein Smart Home</text>
        </a>

        <line class="hsm-line" x1="640" y1="182" x2="720" y2="186" marker-start="url(#hsm-arrow)" marker-end="url(#hsm-arrow)" />
        <rect class="hsm-box" x="720" y="160" width="200" height="52" rx="9" />
        <text class="hsm-title" x="820" y="182"><a class="hsm-link" href="telegram/">Telegram</a> / <a class="hsm-link" href="chat/">Chat</a> / <a class="hsm-link" href="msteams/">Teams</a></text>
        <text class="hsm-sub" x="820" y="200">Hannah per Text</text>

        <line class="hsm-line" x1="640" y1="200" x2="720" y2="256" marker-end="url(#hsm-arrow)" />
        <a class="hsm-link" href="voiceid/">
          <rect class="hsm-box" x="720" y="230" width="200" height="52" rx="9" />
          <text class="hsm-title" x="820" y="252">VoiceID</text>
          <text class="hsm-sub" x="820" y="270">erkennt, wer spricht</text>
        </a>

        <line class="hsm-line" x1="640" y1="220" x2="720" y2="326" marker-start="url(#hsm-arrow)" marker-end="url(#hsm-arrow)" />
        <a class="hsm-link" href="timer/">
          <rect class="hsm-box" x="720" y="300" width="200" height="52" rx="9" />
          <text class="hsm-title" x="820" y="322">Timer</text>
          <text class="hsm-sub" x="820" y="340">Timer &amp; Wecker</text>
        </a>
      </svg>
    </div>
    <figcaption>
      Satelliten sprechen immer mit Core — der Proxy kann sich dazwischenschalten.
    </figcaption>
  </figure>
</div>

| Komponente | Zweck | Brauche ich das? |
|---|---|---|
| [Core](core/index.md) | Das Herzstück: STT, NLU, TTS, Geräte-Steuerung, Orchestrierung. Alle anderen Komponenten sprechen mit ihr. | Ja |
| [WebUI](webui/index.md) | Web-Oberfläche zur Steuerung und Konfiguration | Ja |
| [Satellit](satellite/index.md) | ESP32-S3-Hardware, nimmt Sprachbefehle auf | Ja (mind. einer) |
| [Proxy](proxy/index.md) | Nimmt Core die UDP-Audio-Verarbeitung der Satelliten ab — sinnvoll, wenn viele Satelliten Core sonst zu sehr belasten würden | Bei Bedarf |
| [Telegram](telegram/index.md) | Hannah per Telegram-Chat ansprechen, als eigener Prozess | Bei Bedarf |
| [Chat (Terminal)](chat/index.md) | Hannah am PC per Tastatur schreiben, direkt im Terminal | Bei Bedarf |
| [Microsoft Teams](msteams/index.md) | Hannah per Teams-Chat anschreiben — muss aus dem Internet erreichbar sein | Bei Bedarf |
| [VoiceID](voiceid/index.md) | Erkennt, *wer* spricht, nicht nur *was* gesagt wurde | Bei Bedarf (hilfreich aber immer) |
| [Timer](timer/index.md) | Timer und Wecker | Empfohlen |
| [AutoDeploy](autodeploy/index.md) | Hält die anderen Komponenten automatisch aktuell | Empfohlen |
| [Update-Server](update-server/index.md) | Die Quelle, von der Installationen, AutoDeploy und die Satelliten-Firmware ihre Releases beziehen | — (kein eigener nötig) |
| [LogCollector](logcollector/index.md) | Sammelt die Logs aller Komponenten an einem Ort — erleichtert die Fehlersuche | Empfohlen |
| [ioBroker-Adapter](iobroker-adapter/index.md) | Bindet Hannah an ioBroker an — ohne ihn keine Smart-Home-Steuerung | Ja (für Smart-Home-Steuerung) |

!!! note "macOS"
    Native Installation unter macOS gibt es bislang nur für [AutoDeploy](autodeploy/index.md)
    und [VoiceID](voiceid/index.md). Für alle anderen Komponenten: Linux (nativ) oder
    [Docker](../manual/installation.md).
