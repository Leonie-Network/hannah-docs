# Services Overview

Beyond Hannah Core itself, a few standalone services round out the system:

- **[Proxy](proxy.md)** (Go) — takes UDP audio-stream handling off Core; hands Core clean PCM over gRPC instead
- **[Telegram](telegram.md)** — a separate microservice bot, so a crash there can't take Hannah down
- **[VoiceID](voiceid.md)** — speaker identification
- **[Timer service](timer.md)** — timers and alarms, connected via a bidirectional gRPC stream
- **[Asset server](asset-server.md)** — serves TTS/sound assets to satellites and Core over HTTP
- **[Update server](update-server.md)** — OTA firmware distribution for satellites
- **[WebUI](webui.md)** — web-based control interface, its own repository
