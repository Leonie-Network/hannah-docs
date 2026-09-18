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

- **Hannah Core** — the brain: STT, NLU, TTS, device control, orchestration. Comfortably runs on something as modest as a Raspberry Pi, but nothing about it is Pi-specific — any machine that can run Python works.
- **Satellites** — ESP32-S3 devices with microphones, a speaker, an LED ring, and a wake-word model. Stream audio to Core over UDP (or via the Proxy, see below) and receive TTS/commands back.
- **Proxy** — a Go service that takes UDP audio-stream handling off Core's plate. When a Proxy is connected, Core disables its own UDP server entirely; the Proxy handles the satellite UDP streams instead (Go's concurrency model suits that job well) and hands Core clean PCM audio over gRPC.
- **ioBroker adapter** — bridges Hannah to your actual smart home devices via ioBroker, over a bidirectional gRPC stream.
- A handful of standalone services (Telegram bot, VoiceID, timers, asset serving, OTA updates) round out the system — see [Services](../services/overview.md).

See [Protocols](protocols/grpc.md) for how these pieces actually talk to each other.

## Why it's built this way

A few decisions that shaped the architecture:

- **gRPC for external services, MQTT for satellite control.** gRPC gives typed, bidirectional APIs where that's useful (external integrations); MQTT is the one channel that reliably reaches *every* satellite regardless of whether it's UDP-connected or proxy-connected, so all control commands (mute, volume, announcements, …) go through it instead of UDP.
- **STT runs locally** (faster-whisper) — no dependency on a cloud STT provider. NLU is rule-based and works without an LLM; an LLM (via Ollama) is optional, for tool-calling style requests.
- **16kHz mono audio, no TLS on the UDP link.** Matches what the STT/wake-word models expect, and skips the CPU/RAM cost of TLS on the ESP32 — a reasonable trade-off for a LAN-only protocol.
- **ESP32-S3 over a general-purpose SBC (like a Raspberry Pi) for satellites.** A focused, specialized design for exactly this job — compact and low-power (~0.1W vs ~1W for a Pi Zero) — at the cost of building the audio pipeline (wake word, VAD, PDM mics) yourself instead of using a mature Linux audio stack. A fully assembled satellite board runs around 50€, so this isn't primarily about being dramatically cheaper — the real win is size and power draw.
