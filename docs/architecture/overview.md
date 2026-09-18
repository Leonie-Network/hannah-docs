# Architecture Overview

## Data flow

```
Satellite (audio / PTT)
    → UDP (raw PCM, 16kHz, 16-bit, mono)
    → STT (faster-whisper, local)
    → NLU (rule-based)
    → Intent handler (device control / answer generator)
    → TTS (Azure Cognitive Services or Piper)
    → back to the satellite (UDP or gRPC, depending on connection type)
```

## Components

- **Hannah Core** — the brain: STT, NLU, TTS, device control, orchestration. Runs on a Raspberry Pi.
- **Satellites** — ESP32-S3 devices with microphones, a speaker, an LED ring, and a wake-word model. Stream audio to Core over UDP (or via the Proxy, see below) and receive TTS/commands back.
- **Proxy** — a small Go service that bridges satellites which can't (or shouldn't) reach Core directly over UDP, tunneling audio over a persistent gRPC stream instead.
- **ioBroker adapter** — bridges Hannah to your actual smart home devices via ioBroker, over a bidirectional gRPC stream.
- A handful of standalone services (Telegram bot, VoiceID, timers, asset serving, OTA updates) round out the system — see [Services](../services/overview.md).

See [Protocols](protocols/grpc.md) for how these pieces actually talk to each other.

## Why it's built this way

A few decisions that shaped the architecture:

- **gRPC for external services, MQTT for satellite control.** gRPC gives typed, bidirectional APIs where that's useful (external integrations); MQTT is the one channel that reliably reaches *every* satellite regardless of whether it's UDP-connected or proxy-connected, so all control commands (mute, volume, announcements, …) go through it instead of UDP.
- **STT runs locally** (faster-whisper) — no dependency on a cloud STT provider. NLU is rule-based and works without an LLM; an LLM (via Ollama) is optional, for tool-calling style requests.
- **16kHz mono audio, no TLS on the UDP link.** Matches what the STT/wake-word models expect, and skips the CPU/RAM cost of TLS on the ESP32 — a reasonable trade-off for a LAN-only protocol.
- **ESP32-S3 over a Raspberry Pi Zero for satellites.** Cheaper (~4€ vs ~18€) and far lower power draw (~0.1W vs ~1W), at the cost of building the audio pipeline (wake word, VAD, PDM mics) yourself instead of using a mature Linux audio stack.
