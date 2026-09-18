# Architecture Overview

> This page is a placeholder. Content to be written — see the repo README for the
> overall system layout in the meantime.

## Data flow

Satellite (audio / PTT) → UDP → STT → NLU → intent handling → TTS → back to the satellite.

## Protocols

Hannah's components talk to each other over three channels, each used for what it's best at:

- **gRPC** — typed, bidirectional communication with external services (Telegram, the
  ioBroker adapter, the satellite proxy)
- **MQTT** — the universal control channel for satellites (mute, volume, announcements),
  since it reaches both directly UDP-connected and proxy-connected satellites
- **UDP** — raw audio streaming between a satellite and Hannah Core

*(Detailed protocol docs to follow.)*
