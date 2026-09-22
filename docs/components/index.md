# Komponenten

Hannah besteht aus mehreren eigenständigen Diensten. [Core](core/index.md) und die
[WebUI](webui/index.md) sind zwingend nötig — alles andere ist optional und wird bei
Bedarf dazugeschaltet.

Die Karte zeigt, wie die Komponenten zusammenhängen — Details zu jeder einzelnen stehen
in der Tabelle darunter.

<style>
.hannah-system-map{margin:0 0 24px;font-family:system-ui,-apple-system,sans-serif}
.hannah-system-map .diagram-scroll{overflow-x:auto;border:1px solid var(--md-default-fg-color--lightest,#c7d0da);border-radius:12px;padding:6px}
.hannah-system-map svg{display:block;min-width:760px;width:100%;height:auto}
.hannah-system-map figcaption{font-size:.85rem;color:var(--md-default-fg-color--light,#56606d);margin-top:10px;line-height:1.5}
.hsm-box{fill:var(--md-default-bg-color,#fff);stroke:#8a97a6;stroke-width:1.6}
.hsm-box-optional{fill:var(--md-default-bg-color,#fff);stroke:#8a97a6;stroke-width:1.5;stroke-dasharray:6 5}
.hsm-box-core{fill:var(--md-code-bg-color,#f7f9fb);stroke:#1c2430;stroke-width:2.2}
.hsm-title{font-family:system-ui,-apple-system,sans-serif;font-weight:600;fill:var(--md-default-fg-color,#1c2430);font-size:14.5px;text-anchor:middle}
.hsm-sub{font-family:system-ui,-apple-system,sans-serif;fill:var(--md-default-fg-color--light,#56606d);font-size:11.5px;text-anchor:middle}
.hsm-line{stroke:#8a97a6;stroke-width:1.8;fill:none}
.hsm-line-optional{stroke:#8a97a6;stroke-width:1.6;fill:none;stroke-dasharray:6 5}
.hsm-legend{display:flex;flex-wrap:wrap;gap:18px;margin-top:12px;font-size:.85rem;color:var(--md-default-fg-color--light,#56606d)}
.hsm-legend span.swatch{display:inline-block;width:22px;border-top:2px solid #8a97a6;margin-right:6px;vertical-align:middle}
.hsm-legend span.swatch.optional{border-top-style:dashed}
a.hsm-link{cursor:pointer}
a.hsm-link:hover .hsm-box, a.hsm-link:hover .hsm-box-optional, a.hsm-link:hover .hsm-box-core{stroke:#5b4fd1;stroke-width:2.4}
a.hsm-link:hover .hsm-title{text-decoration:underline}
</style>
<div class="hannah-system-map">
  <figure style="margin:0">
    <div class="diagram-scroll">
      <svg viewBox="0 0 1100 460" role="img" aria-label="Übersicht: Satelliten sprechen mit Core, optional über den Proxy dazwischen. Core wiederum verbindet sich mit der WebUI, dem ioBroker-Adapter, und optional mit Telegram, VoiceID und dem Timer.">
        <defs>
          <marker id="hsm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <polygon points="0,0 10,5 0,10" fill="#8a97a6" />
          </marker>
        </defs>

        <a class="hsm-link" href="satellite/">
          <rect class="hsm-box" x="40" y="205" width="200" height="90" rx="10" />
          <text class="hsm-title" x="140" y="242">Satellit</text>
          <text class="hsm-sub" x="140" y="262">Küche, Wohnzimmer, …</text>
          <text class="hsm-sub" x="140" y="278">(mindestens einer)</text>
        </a>

        <line class="hsm-line" x1="240" y1="250" x2="300" y2="250" marker-end="url(#hsm-arrow)" />
        <a class="hsm-link" href="proxy/">
          <rect class="hsm-box-optional" x="300" y="215" width="170" height="70" rx="10" />
          <text class="hsm-title" x="385" y="245">Proxy</text>
          <text class="hsm-sub" x="385" y="264">optional, entlastet Core bei</text>
          <text class="hsm-sub" x="385" y="278">vielen Satelliten</text>
        </a>
        <line class="hsm-line" x1="470" y1="250" x2="520" y2="250" marker-end="url(#hsm-arrow)" />

        <a class="hsm-link" href="core/">
          <rect class="hsm-box-core" x="520" y="160" width="280" height="190" rx="14" />
          <text class="hsm-title" x="660" y="200" font-size="17">Hannah Core</text>
          <text class="hsm-sub" x="660" y="224">Versteht deine Sprache und</text>
          <text class="hsm-sub" x="660" y="240">antwortet</text>
          <text class="hsm-sub" x="660" y="264">Steuert dein Smart Home</text>
          <text class="hsm-sub" x="660" y="288">Merkt sich Erinnerungen,</text>
          <text class="hsm-sub" x="660" y="304">Wecker, Trigger</text>
          <text class="hsm-sub" x="660" y="330">Pflicht — das Herzstück</text>
        </a>

        <line class="hsm-line" x1="800" y1="190" x2="860" y2="72" marker-start="url(#hsm-arrow)" />
        <a class="hsm-link" href="webui/">
          <rect class="hsm-box" x="860" y="40" width="200" height="64" rx="9" />
          <text class="hsm-title" x="960" y="66">WebUI</text>
          <text class="hsm-sub" x="960" y="85">Einstellungen &amp; Steuerung im Browser</text>
        </a>

        <line class="hsm-line" x1="800" y1="230" x2="860" y2="156" marker-start="url(#hsm-arrow)" marker-end="url(#hsm-arrow)" />
        <a class="hsm-link" href="iobroker-adapter/">
          <rect class="hsm-box" x="860" y="124" width="200" height="64" rx="9" />
          <text class="hsm-title" x="960" y="150">ioBroker-Adapter</text>
          <text class="hsm-sub" x="960" y="169">nötig für Smart-Home-Steuerung</text>
        </a>

        <line class="hsm-line-optional" x1="800" y1="270" x2="860" y2="240" marker-start="url(#hsm-arrow)" marker-end="url(#hsm-arrow)" />
        <a class="hsm-link" href="telegram/">
          <rect class="hsm-box-optional" x="860" y="208" width="200" height="64" rx="9" />
          <text class="hsm-title" x="960" y="234">Telegram</text>
          <text class="hsm-sub" x="960" y="253">optional, Hannah per Chat</text>
        </a>

        <line class="hsm-line-optional" x1="800" y1="310" x2="860" y2="324" marker-end="url(#hsm-arrow)" />
        <a class="hsm-link" href="voiceid/">
          <rect class="hsm-box-optional" x="860" y="292" width="200" height="64" rx="9" />
          <text class="hsm-title" x="960" y="318">VoiceID</text>
          <text class="hsm-sub" x="960" y="337">optional, erkennt wer spricht</text>
        </a>

        <line class="hsm-line-optional" x1="800" y1="340" x2="860" y2="408" marker-start="url(#hsm-arrow)" marker-end="url(#hsm-arrow)" />
        <a class="hsm-link" href="timer/">
          <rect class="hsm-box-optional" x="860" y="376" width="200" height="64" rx="9" />
          <text class="hsm-title" x="960" y="402">Timer</text>
          <text class="hsm-sub" x="960" y="421">optional, Timer &amp; Wecker</text>
        </a>
      </svg>
    </div>
    <figcaption>
      Durchgezogener Rand = Pflicht (bzw. für Smart-Home-Steuerung nötig), gestrichelter
      Rand = optional. Satelliten sprechen immer mit Core — der Proxy kann sich optional
      dazwischenschalten. Core wiederum verbindet sich mit der WebUI und dem
      ioBroker-Adapter sowie optional mit Telegram, VoiceID und dem Timer.
    </figcaption>
  </figure>
</div>

| Komponente | Zweck | Pflicht? |
|---|---|---|
| [Core](core/index.md) | Das Herzstück: STT, NLU, TTS, Geräte-Steuerung, Orchestrierung. Alle anderen Komponenten sprechen mit ihr. | Ja |
| [WebUI](webui/index.md) | Web-Oberfläche zur Steuerung und Konfiguration | Ja |
| [Satellit](satellite/index.md) | ESP32-S3-Hardware, nimmt Sprachbefehle auf | Ja (mind. einer) |
| [Proxy](proxy/index.md) | Nimmt Core die UDP-Audio-Verarbeitung der Satelliten ab — sinnvoll, wenn viele Satelliten Core sonst zu sehr belasten würden | Nein |
| [Telegram](telegram/index.md) | Hannah per Telegram-Chat ansprechen, als eigener Prozess | Nein |
| [Chat (Terminal)](chat/index.md) | Hannah am PC per Tastatur schreiben, direkt im Terminal | Nein |
| [VoiceID](voiceid/index.md) | Erkennt, *wer* spricht, nicht nur *was* gesagt wurde | Nein |
| [Timer](timer/index.md) | Timer und Wecker | Nein |
| [AutoDeploy](autodeploy/index.md) | Hält die anderen Komponenten automatisch aktuell | Nein |
| [Update-Server](update-server/index.md) | Die Quelle, von der Installationen, AutoDeploy und die Satelliten-Firmware ihre Releases beziehen | — (kein eigener nötig) |
| [ioBroker-Adapter](iobroker-adapter/index.md) | Bindet Hannah an ioBroker an — ohne ihn keine Smart-Home-Steuerung | Ja (für Smart-Home-Steuerung) |

!!! note "macOS"
    Native Installation unter macOS gibt es bislang nur für [AutoDeploy](autodeploy/index.md)
    und [VoiceID](voiceid/index.md). Für alle anderen Komponenten: Linux (nativ) oder
    [Docker](../manual/installation.md).
