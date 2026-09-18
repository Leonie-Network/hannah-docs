# Services Overview

> This page is a placeholder.

Beyond Hannah Core itself, a few standalone services round out the system:

- **Proxy** (Go) — bridges UDP-connected satellites to Hannah Core over gRPC
- **Telegram** — a separate microservice bot, so a crash there can't take Hannah down
- **VoiceID** — speaker identification
- **Timer service** — timers and alarms, connected via a bidirectional gRPC stream
- **Asset server** — serves TTS/sound assets to satellites and Core over HTTP
- **Update server** — OTA firmware distribution for satellites

*(One page per service to follow.)*
