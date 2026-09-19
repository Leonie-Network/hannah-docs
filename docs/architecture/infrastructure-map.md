<!-- Hannah Infrastructure Map -- embed fragment for MkDocs (hannah-docs) -->
<!-- If IBM Plex Sans/Mono isn't loaded globally yet, add these two lines once to the MkDocs theme (extra_head / custom head partial):
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
-->
<style>
.hannah-infra-map{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;color:#141413}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}

  .hannah-infra-map {
    --bg: #eef1f4;
    --surface: #ffffff;
    --surface-strong: #f7f9fb;
    --border: #c7d0da;
    --ink: #1c2430;
    --ink-soft: #56606d;
    --accent-udp: #0e8a7d;
    --accent-grpc: #5b4fd1;
    --accent-mqtt: #a8690a;
    --accent-http: #b23a54;
    --font-sans: 'IBM Plex Sans', system-ui, sans-serif;
    --font-mono: 'IBM Plex Mono', ui-monospace, 'Cascadia Code', monospace;
  }
  @media (prefers-color-scheme: dark) {
    .hannah-infra-map:not([data-theme="light"]) {
      --bg: #10161f;
      --surface: #1a2230;
      --surface-strong: #212b3a;
      --border: #34414f;
      --ink: #e6ecf3;
      --ink-soft: #9fb0c2;
      --accent-udp: #35cdbb;
      --accent-grpc: #a89ef7;
      --accent-mqtt: #e3a83e;
      --accent-http: #e8798f;
    }
  }
  .hannah-infra-map[data-theme="dark"] {
    --bg: #10161f;
    --surface: #1a2230;
    --surface-strong: #212b3a;
    --border: #34414f;
    --ink: #e6ecf3;
    --ink-soft: #9fb0c2;
    --accent-udp: #35cdbb;
    --accent-grpc: #a89ef7;
    --accent-mqtt: #e3a83e;
    --accent-http: #e8798f;
  }

  * { box-sizing: border-box; }
  .hannah-infra-map {
    color: var(--ink);
    font-family: var(--font-sans);
    padding: 28px 20px 60px;
    max-width: 1180px;
    margin: 0 auto;
  }

  .hannah-infra-map header { margin-bottom: 28px; }
  .eyebrow {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent-grpc);
    margin: 0 0 8px;
  }
  .hannah-infra-map h1 {
    font-size: clamp(1.6rem, 4vw, 2.15rem);
    margin: 0 0 10px;
    letter-spacing: -0.01em;
    text-wrap: balance;
  }
  .hannah-infra-map header p {
    max-width: 62ch;
    color: var(--ink-soft);
    line-height: 1.55;
    margin: 0 0 6px;
    font-size: 0.98rem;
  }

  .hannah-infra-map figure { margin: 0 0 18px; }
  .diagram-scroll {
    overflow-x: auto;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--surface);
    padding: 6px;
  }
  .diagram-scroll svg {
    display: block;
    min-width: 980px;
    width: 100%;
    height: auto;
  }
  figcaption {
    font-size: 0.85rem;
    color: var(--ink-soft);
    margin-top: 10px;
    line-height: 1.5;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 18px 28px;
    padding: 14px 18px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    margin-bottom: 34px;
    font-size: 0.85rem;
  }
  .legend-item { display: flex; align-items: center; gap: 9px; }
  .swatch { width: 26px; height: 0; border-top-width: 3px; border-top-style: solid; flex-shrink: 0; }
  .swatch.udp { border-color: var(--accent-udp); }
  .swatch.grpc { border-color: var(--accent-grpc); }
  .swatch.mqtt { border-color: var(--accent-mqtt); border-top-style: dashed; }
  .swatch.http { border-color: var(--accent-http); border-top-style: dotted; border-top-width: 4px; }
  .legend-item span.label { font-family: var(--font-mono); font-size: 0.82rem; color: var(--ink); }

  .hannah-infra-map h2 {
    font-size: 1.15rem;
    margin: 0 0 4px;
    letter-spacing: -0.01em;
  }
  .section-note {
    color: var(--ink-soft);
    font-size: 0.9rem;
    margin: 0 0 14px;
    max-width: 68ch;
  }

  .table-scroll {
    overflow-x: auto;
    border: 1px solid var(--border);
    border-radius: 12px;
    margin-bottom: 30px;
  }
  .hannah-infra-map table {
    border-collapse: collapse;
    width: 100%;
    min-width: 720px;
    font-size: 0.87rem;
    background: var(--surface);
  }
  .hannah-infra-map thead th {
    text-align: left;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink-soft);
    background: var(--surface-strong);
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
  }
  .hannah-infra-map tbody td {
    padding: 9px 14px;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
  }
  tbody tr:last-child td { border-bottom: none; }
  td.mono, thead th.mono-col { font-family: var(--font-mono); font-size: 0.82rem; }
  td.dim { color: var(--ink-soft); }

  .hannah-infra-map footer {
    font-size: 0.8rem;
    color: var(--ink-soft);
    border-top: 1px solid var(--border);
    padding-top: 14px;
    margin-top: 8px;
  }

  /* SVG-internal styles */
  .box { fill: var(--surface); stroke: var(--border); stroke-width: 1.5; }
  .box-dashed { fill: var(--surface); stroke: var(--ink-soft); stroke-width: 1.4; stroke-dasharray: 6 5; }
  .box-core { fill: var(--surface-strong); stroke: var(--ink); stroke-width: 2; }
  .box-group { fill: none; stroke: var(--ink-soft); stroke-width: 1.3; stroke-dasharray: 5 5; }
  .box-title { font-family: var(--font-sans); font-weight: 600; fill: var(--ink); }
  .box-sub { font-family: var(--font-mono); fill: var(--ink-soft); }
  .group-label { font-family: var(--font-mono); fill: var(--ink-soft); letter-spacing: 0.06em; }
  .line-udp { stroke: var(--accent-udp); stroke-width: 2.5; fill: none; }
  .line-grpc { stroke: var(--accent-grpc); stroke-width: 2.5; fill: none; }
  .line-mqtt { stroke: var(--accent-mqtt); stroke-width: 2.3; stroke-dasharray: 7 5; fill: none; }
  .line-http { stroke: var(--accent-http); stroke-width: 2; stroke-dasharray: 1.5 4.5; stroke-linecap: round; fill: none; }
  .line-proto { stroke: var(--ink-soft); stroke-width: 1.4; stroke-dasharray: 3 3; fill: none; }
  .line-label { font-family: var(--font-mono); fill: var(--ink); }
  .label-bg { fill: var(--bg); opacity: 0.94; }
  .arrow-udp-fill { fill: var(--accent-udp); }
  .arrow-grpc-fill { fill: var(--accent-grpc); }
  .arrow-mqtt-fill { fill: var(--accent-mqtt); }
  .arrow-http-fill { fill: var(--accent-http); }

  .hint { font-size: 0.82rem; color: var(--ink-soft); margin: 10px 0 0; }
  .edge { transition: opacity .15s ease; }
  .edge-dim, .edge-dim-hover { opacity: 0.15; }
  .edge-hover line, .edge-hover path, .edge-hover polyline { stroke-width: 4.2; }
  .edge-hover .line-label { font-weight: 700; }
  .edge-hover .label-bg { opacity: 1; }
  .box-hoverable { cursor: default; }
  .box-hoverable:hover .box { stroke: var(--ink); stroke-width: 2.2; }
  a.box-link { cursor: pointer; }
  a.box-link:hover .box { stroke: var(--accent-grpc); stroke-width: 2.4; }
  a.box-link:hover .box-title { text-decoration: underline; }
  .legend-item[data-protocol] {
    cursor: pointer;
    user-select: none;
    padding: 4px 9px;
    margin: -4px -9px;
    border-radius: 7px;
    transition: background .15s ease, opacity .15s ease;
  }
  .legend-item[data-protocol]:hover { background: var(--surface-strong); }
  .legend-item.legend-active { background: var(--surface-strong); opacity: 1; }
  .legend.has-active .legend-item[data-protocol]:not(.legend-active) { opacity: 0.5; }

</style>
<div class="hannah-infra-map">
<header>
  <p class="eyebrow">Reference &middot; As of 2026-09-19</p>
  <h1>Hannah Infrastructure Map</h1>
  <p>Every runtime component of the Hannah stack and how they talk to each other &mdash; from the satellite in the living room to the last HTTP request to the update server. Line color encodes the protocol, not importance.</p>
  <p class="hint">Click the legend to filter by protocol &middot; hover a box to highlight its connections &middot; component names link into the docs.</p>
</header>

<figure>
  <div class="diagram-scroll">
    <svg viewBox="0 0 1560 800" role="img" aria-label="Topology of the Hannah system: satellites connect via UDP (directly or through the Go proxy) and via MQTT to Hannah Core; Core speaks gRPC with the ioBroker adapter, Telegram, VoiceID, the timer service, and the WebUI, and HTTP with the asset and update servers.">
      <defs>
        <marker id="arrow-udp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
          <polygon points="0,0 10,5 0,10" class="arrow-udp-fill" />
        </marker>
        <marker id="arrow-grpc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
          <polygon points="0,0 10,5 0,10" class="arrow-grpc-fill" />
        </marker>
        <marker id="arrow-mqtt" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
          <polygon points="0,0 10,5 0,10" class="arrow-mqtt-fill" />
        </marker>
        <marker id="arrow-http" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <polygon points="0,0 10,5 0,10" class="arrow-http-fill" />
        </marker>
      </defs>

      <!-- Satellite group -->
      <g id="box-satellite" data-connects="edge-sat-proxy edge-sat-core edge-sat-mqtt edge-sat-asset edge-sat-update" class="box-hoverable">
      <a class="box-link" href="https://hannah-docs.leonie.network/components/satellite/" target="_blank" rel="noopener">
      <rect class="box-group" x="40" y="40" width="420" height="140" rx="12" />
      <text class="group-label" x="56" y="60" font-size="12">SATELLITES &mdash; ESP32-S3 (example)</text>
      <rect class="box" x="64" y="76" width="150" height="64" rx="9" />
      <text class="box-title" x="139" y="102" font-size="15.5" text-anchor="middle">Kitchen</text>
      <text class="box-sub" x="139" y="121" font-size="12" text-anchor="middle">ESP32-S3 &middot; Wi-Fi</text>
      <rect class="box" x="234" y="76" width="150" height="64" rx="9" />
      <text class="box-title" x="309" y="102" font-size="15.5" text-anchor="middle">Living Room</text>
      <text class="box-sub" x="309" y="121" font-size="12" text-anchor="middle">ESP32-S3 &middot; Wi-Fi</text>
      </a>
      </g>

      <!-- Transport row -->
      <g id="box-proxy" data-connects="edge-sat-proxy edge-proxy-core" class="box-hoverable">
      <a class="box-link" href="https://hannah-docs.leonie.network/components/proxy/" target="_blank" rel="noopener">
      <rect class="box" x="120" y="230" width="210" height="70" rx="10" />
      <text class="box-title" x="225" y="258" font-size="15.5" text-anchor="middle">Proxy</text>
      <text class="box-sub" x="225" y="276" font-size="12" text-anchor="middle">Go &middot; UDP &#8646; gRPC Bridge</text>
      <text class="box-sub" x="225" y="291" font-size="11" text-anchor="middle">proxy/</text>
      </a>
      </g>

      <g id="box-mqtt" data-connects="edge-sat-mqtt edge-mqtt-core" class="box-hoverable">
      <a class="box-link" href="https://hannah-docs.leonie.network/architecture/protocols/mqtt/" target="_blank" rel="noopener">
      <rect class="box" x="400" y="230" width="230" height="70" rx="10" />
      <text class="box-title" x="515" y="258" font-size="15.5" text-anchor="middle">MQTT Broker</text>
      <text class="box-sub" x="515" y="276" font-size="12" text-anchor="middle">universal control channel</text>
      <text class="box-sub" x="515" y="291" font-size="11" text-anchor="middle">LAN infra</text>
      </a>
      </g>

      <!-- proto pill -->
      <rect class="box-dashed" x="790" y="335" width="300" height="40" rx="20" />
      <text class="box-sub" x="940" y="360" font-size="12" text-anchor="middle">hannah-proto &middot; schema for every gRPC call</text>
      <line class="line-proto" x1="940" y1="375" x2="940" y2="390" />

      <!-- Core -->
      <g id="box-core" data-connects="edge-sat-proxy edge-proxy-core edge-sat-core edge-mqtt-core edge-core-iobroker edge-core-telegram edge-core-voiceid edge-core-timer edge-core-webui edge-core-asset" class="box-hoverable">
      <a class="box-link" href="https://hannah-docs.leonie.network/components/core/" target="_blank" rel="noopener">
      <rect class="box-core" x="760" y="390" width="360" height="190" rx="14" />
      <text class="box-title" x="940" y="420" font-size="18" text-anchor="middle">Hannah Core</text>
      <text class="box-sub" x="940" y="440" font-size="12.5" text-anchor="middle">Raspberry Pi &middot; Python &middot; core/</text>
      <text class="box-sub" x="940" y="465" font-size="12.5" text-anchor="middle">STT &middot; NLU &middot; TTS &middot; LLM (Ollama)</text>
      <text class="box-sub" x="940" y="484" font-size="12.5" text-anchor="middle">Trigger Engine &middot; Routines &middot; Alarms</text>
      <text class="box-sub" x="940" y="503" font-size="12.5" text-anchor="middle">User Registry &middot; Tool Agent</text>
      <text class="box-sub" x="940" y="522" font-size="12.5" text-anchor="middle">Asset Server (HTTP, see below)</text>
      <text class="box-sub" x="940" y="548" font-size="11.5" text-anchor="middle" fill="var(--ink-soft)">Ports: UDP :5005 &middot; gRPC :50051</text>
      </a>
      </g>

      <!-- gRPC service column -->
      <g id="box-iobroker" data-connects="edge-core-iobroker" class="box-hoverable">
      <a class="box-link" href="https://hannah-docs.leonie.network/components/iobroker-adapter/" target="_blank" rel="noopener">
      <rect class="box" x="1220" y="390" width="300" height="64" rx="9" />
      <text class="box-title" x="1370" y="413" font-size="14.5" text-anchor="middle">ioBroker Adapter</text>
      <text class="box-sub" x="1370" y="431" font-size="11.5" text-anchor="middle">TypeScript &middot; iobroker.hannah/</text>
      <text class="box-sub" x="1370" y="446" font-size="11" text-anchor="middle" fill="var(--ink-soft)">&#8627; controls ioBroker enums / devices</text>
      </a>
      </g>

      <g id="box-telegram" data-connects="edge-core-telegram" class="box-hoverable">
      <a class="box-link" href="https://hannah-docs.leonie.network/components/telegram/" target="_blank" rel="noopener">
      <rect class="box" x="1220" y="470" width="300" height="64" rx="9" />
      <text class="box-title" x="1370" y="493" font-size="14.5" text-anchor="middle">Telegram Bot</text>
      <text class="box-sub" x="1370" y="511" font-size="11.5" text-anchor="middle">Python microservice &middot; telegram/</text>
      <text class="box-sub" x="1370" y="526" font-size="11" text-anchor="middle" fill="var(--ink-soft)">own process &amp; lifecycle</text>
      </a>
      </g>

      <g id="box-voiceid" data-connects="edge-core-voiceid" class="box-hoverable">
      <a class="box-link" href="https://hannah-docs.leonie.network/components/voiceid/" target="_blank" rel="noopener">
      <rect class="box" x="1220" y="550" width="300" height="64" rx="9" />
      <text class="box-title" x="1370" y="573" font-size="14.5" text-anchor="middle">VoiceID</text>
      <text class="box-sub" x="1370" y="591" font-size="11.5" text-anchor="middle">Python &middot; voiceid/</text>
      <text class="box-sub" x="1370" y="606" font-size="11" text-anchor="middle" fill="var(--ink-soft)">Speaker ID / voiceprints</text>
      </a>
      </g>

      <g id="box-timer" data-connects="edge-core-timer" class="box-hoverable">
      <a class="box-link" href="https://hannah-docs.leonie.network/components/timer/" target="_blank" rel="noopener">
      <rect class="box" x="1220" y="630" width="300" height="64" rx="9" />
      <text class="box-title" x="1370" y="653" font-size="14.5" text-anchor="middle">Timer Service</text>
      <text class="box-sub" x="1370" y="671" font-size="11.5" text-anchor="middle">own repo &middot; GitLab project 330</text>
      <text class="box-sub" x="1370" y="686" font-size="11" text-anchor="middle" fill="var(--ink-soft)">Timer &amp; alarm events</text>
      </a>
      </g>

      <g id="box-webui" data-connects="edge-core-webui" class="box-hoverable">
      <a class="box-link" href="https://hannah-docs.leonie.network/components/webui/" target="_blank" rel="noopener">
      <rect class="box" x="1220" y="710" width="300" height="64" rx="9" />
      <text class="box-title" x="1370" y="733" font-size="14.5" text-anchor="middle">WebUI</text>
      <text class="box-sub" x="1370" y="751" font-size="11.5" text-anchor="middle">hannah-webui (own repo, TS)</text>
      <text class="box-sub" x="1370" y="766" font-size="11" text-anchor="middle" fill="var(--ink-soft)">Device/user control</text>
      </a>
      </g>

      <!-- HTTP infra row -->
      <g id="box-asset" data-connects="edge-core-asset edge-sat-asset" class="box-hoverable">
      <a class="box-link" href="https://hannah-docs.leonie.network/services/asset-server/" target="_blank" rel="noopener">
      <rect class="box" x="460" y="650" width="280" height="80" rx="10" />
      <text class="box-title" x="600" y="678" font-size="15" text-anchor="middle">Asset Server</text>
      <text class="box-sub" x="600" y="696" font-size="12" text-anchor="middle">HTTP &middot; token auth</text>
      <text class="box-sub" x="600" y="712" font-size="11.5" text-anchor="middle" fill="var(--ink-soft)">Sound assets (satellite / core)</text>
      </a>
      </g>

      <g id="box-update" data-connects="edge-sat-update" class="box-hoverable">
      <a class="box-link" href="https://hannah-docs.leonie.network/components/update-server/" target="_blank" rel="noopener">
      <rect class="box" x="820" y="650" width="280" height="80" rx="10" />
      <text class="box-title" x="960" y="678" font-size="15" text-anchor="middle">Update Server</text>
      <text class="box-sub" x="960" y="696" font-size="12" text-anchor="middle">hannah-satellite-update-server</text>
      <text class="box-sub" x="960" y="712" font-size="11" text-anchor="middle" fill="var(--ink-soft)">OTA firmware &middot; GitLab project 326</text>
      </a>
      </g>

      <g class="edge" data-protocol="udp" id="edge-sat-proxy">
        <line class="line-udp" x1="180" y1="180" x2="225" y2="230" marker-start="url(#arrow-udp)" marker-end="url(#arrow-udp)" />
        <rect class="label-bg" x="70" y="192" width="270" height="18" rx="3" />
        <text class="line-label" x="205" y="205" font-size="11" text-anchor="middle">UDP :5005 &middot; audio (proxy-connected)</text>
      </g>

      <g class="edge" data-protocol="grpc" id="edge-proxy-core">
        <path class="line-grpc" d="M 330,258 L 760,470" marker-start="url(#arrow-grpc)" marker-end="url(#arrow-grpc)" />
        <rect class="label-bg" x="400" y="330" width="270" height="18" rx="3" />
        <text class="line-label" x="535" y="343" font-size="11" text-anchor="middle">gRPC :50051 &middot; RegisterProxy (bidi)</text>
      </g>

      <g class="edge" data-protocol="udp" id="edge-sat-core">
        <path class="line-udp" d="M 400,180 L 850,390" marker-start="url(#arrow-udp)" marker-end="url(#arrow-udp)" />
        <rect class="label-bg" x="590" y="255" width="300" height="18" rx="3" />
        <text class="line-label" x="740" y="268" font-size="11" text-anchor="middle">UDP :5005 &middot; audio (directly connected)</text>
      </g>

      <g class="edge" data-protocol="mqtt" id="edge-sat-mqtt">
        <line class="line-mqtt" x1="350" y1="180" x2="480" y2="230" marker-start="url(#arrow-mqtt)" marker-end="url(#arrow-mqtt)" />
        <rect class="label-bg" x="330" y="192" width="230" height="18" rx="3" />
        <text class="line-label" x="445" y="205" font-size="11" text-anchor="middle">Sensors, heartbeat, firmware version</text>
      </g>

      <g class="edge" data-protocol="mqtt" id="edge-mqtt-core">
        <path class="line-mqtt" d="M 630,258 L 760,505" marker-start="url(#arrow-mqtt)" marker-end="url(#arrow-mqtt)" />
        <rect class="label-bg" x="640" y="400" width="330" height="18" rx="3" />
        <text class="line-label" x="805" y="413" font-size="11" text-anchor="middle">Control commands: volume, mute, announce, OTA handshake</text>
      </g>

      <g class="edge" data-protocol="grpc" id="edge-core-iobroker">
        <line class="line-grpc" x1="1120" y1="422" x2="1220" y2="422" marker-start="url(#arrow-grpc)" marker-end="url(#arrow-grpc)" />
        <rect class="label-bg" x="1095" y="398" width="140" height="16" rx="3" />
        <text class="line-label" x="1165" y="410" font-size="10.5" text-anchor="middle">AgentConnect</text>
      </g>

      <g class="edge" data-protocol="grpc" id="edge-core-telegram">
        <line class="line-grpc" x1="1120" y1="502" x2="1220" y2="502" marker-start="url(#arrow-grpc)" marker-end="url(#arrow-grpc)" />
        <rect class="label-bg" x="1095" y="478" width="140" height="16" rx="3" />
        <text class="line-label" x="1165" y="490" font-size="10.5" text-anchor="middle">SubmitText/Voice</text>
      </g>

      <g class="edge" data-protocol="grpc" id="edge-core-voiceid">
        <line class="line-grpc" x1="1120" y1="578" x2="1220" y2="582" marker-end="url(#arrow-grpc)" />
        <rect class="label-bg" x="1095" y="596" width="150" height="16" rx="3" />
        <text class="line-label" x="1170" y="608" font-size="10.5" text-anchor="middle">EnrollVoiceprint</text>
      </g>

      <g class="edge" data-protocol="grpc" id="edge-core-timer">
        <path class="line-grpc" d="M 1120,578 L 1220,662" marker-start="url(#arrow-grpc)" marker-end="url(#arrow-grpc)" />
        <rect class="label-bg" x="1105" y="640" width="140" height="16" rx="3" />
        <text class="line-label" x="1175" y="652" font-size="10.5" text-anchor="middle">TimerConnect</text>
      </g>

      <g class="edge" data-protocol="grpc" id="edge-core-webui">
        <path class="line-grpc" d="M 1120,578 L 1220,742" marker-start="url(#arrow-grpc)" />
        <rect class="label-bg" x="1100" y="716" width="170" height="16" rx="3" />
        <text class="line-label" x="1185" y="728" font-size="10.5" text-anchor="middle">GetDevices, ControlDevice</text>
      </g>

      <g class="edge" data-protocol="http" id="edge-core-asset">
        <path class="line-http" d="M 820,580 L 590,650" marker-end="url(#arrow-http)" />
        <rect class="label-bg" x="480" y="600" width="280" height="16" rx="3" />
        <text class="line-label" x="620" y="612" font-size="10.5" text-anchor="middle">GET /manifest, /asset (namespace=core)</text>
      </g>

      <g class="edge" data-protocol="http" id="edge-sat-asset">
        <polyline class="line-http" points="440,180 700,300 700,650" marker-end="url(#arrow-http)" />
        <rect class="label-bg" x="700" y="450" width="290" height="16" rx="3" />
        <text class="line-label" x="845" y="462" font-size="10.5" text-anchor="middle">GET /asset (namespace=satellite, LittleFS)</text>
      </g>

      <g class="edge" data-protocol="http" id="edge-sat-update">
        <polyline class="line-http" points="460,180 720,300 720,615 960,615 960,650" marker-end="url(#arrow-http)" />
        <rect class="label-bg" x="720" y="618" width="240" height="16" rx="3" />
        <text class="line-label" x="840" y="630" font-size="10.5" text-anchor="middle">Firmware binary download</text>
      </g>

      <text class="box-sub" x="960" y="748" font-size="10.5" text-anchor="middle" fill="var(--ink-soft)">Approval runs over MQTT (ota/pending &#8596; ota/ok)</text>
    </svg>
  </div>
  <figcaption>Satellites connect via UDP either directly or through the Go proxy to Hannah Core, and share an MQTT control channel with it; Core in turn speaks gRPC with four standalone services (ioBroker adapter, Telegram, VoiceID, timer service, WebUI) and HTTP with two more (asset server, update server). hannah-proto supplies the shared schema for every gRPC call but isn't itself a runtime participant.</figcaption>
</figure>

<div class="legend" id="hannah-legend">
  <div class="legend-item" data-protocol="udp" role="button" tabindex="0"><span class="swatch udp"></span><span class="label">UDP &middot; raw audio stream</span></div>
  <div class="legend-item" data-protocol="grpc" role="button" tabindex="0"><span class="swatch grpc"></span><span class="label">gRPC &middot; typed calls / bidi streams</span></div>
  <div class="legend-item" data-protocol="mqtt" role="button" tabindex="0"><span class="swatch mqtt"></span><span class="label">MQTT &middot; pub/sub control topics</span></div>
  <div class="legend-item" data-protocol="http" role="button" tabindex="0"><span class="swatch http"></span><span class="label">HTTP &middot; assets &amp; firmware</span></div>
</div>

<footer>
  Not kept in sync automatically &mdash; update this map by hand after bigger architecture changes (new services, protocol changes).
</footer>


<script>
(function () {
  var root = document.getElementById('hannah-legend');
  var svg = document.querySelector('.diagram-scroll svg');
  if (!root || !svg) return;
  var edges = Array.prototype.slice.call(svg.querySelectorAll('.edge'));
  var boxes = Array.prototype.slice.call(svg.querySelectorAll('[data-connects]'));
  var legendItems = Array.prototype.slice.call(root.querySelectorAll('.legend-item[data-protocol]'));
  var active = new Set();

  function applyFilter() {
    edges.forEach(function (e) {
      var p = e.getAttribute('data-protocol');
      e.classList.toggle('edge-dim', active.size > 0 && !active.has(p));
    });
    legendItems.forEach(function (b) {
      b.classList.toggle('legend-active', active.has(b.getAttribute('data-protocol')));
    });
    root.classList.toggle('has-active', active.size > 0);
  }

  function toggle(item) {
    var p = item.getAttribute('data-protocol');
    if (active.has(p)) { active.delete(p); } else { active.add(p); }
    applyFilter();
  }

  legendItems.forEach(function (item) {
    item.addEventListener('click', function () { toggle(item); });
    item.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); toggle(item); }
    });
  });

  boxes.forEach(function (box) {
    var ids = (box.getAttribute('data-connects') || '').split(' ').filter(Boolean);
    box.addEventListener('mouseenter', function () {
      edges.forEach(function (e) {
        if (ids.indexOf(e.id) !== -1) {
          e.classList.add('edge-hover');
          e.classList.remove('edge-dim-hover');
        } else {
          e.classList.add('edge-dim-hover');
        }
      });
    });
    box.addEventListener('mouseleave', function () {
      edges.forEach(function (e) {
        e.classList.remove('edge-hover');
        e.classList.remove('edge-dim-hover');
      });
    });
  });

  applyFilter();
})();
</script>

</div>
