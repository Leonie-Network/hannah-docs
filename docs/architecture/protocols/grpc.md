# gRPC

Hannah Core exposes one gRPC service (`HannahService`) on port 50051, used by every
external service — the ioBroker adapter, the Telegram bot, the satellite Proxy — as well
as tooling.

## Protocol source

The `.proto` definitions live in their own repository,
[hannah-proto](https://github.com/NurPech/hannah-proto), split by scope (`shared`,
`user_registry`, `control`, `car_state`, `event_stream`, `satellite_proxy`,
`device_control_menu`, `satellite_provisioning`, `speaker_enrollment`, `agent`,
`wakeword_capture`, `timer_service`) and pulled together by a single `service
HannahService` in `hannah.proto`. It's distributed as a published package —
`pip install hannah-proto` (Python), a Go module, and an npm package (ts-proto codegen) —
rather than vendored into each consumer.

## Notable methods

| Method | Purpose |
|---|---|
| `SubmitText` / `SubmitVoice` | Text/voice command → intent + response |
| `Announce` / `Notify` | TTS announcement to a satellite, or a system notification |
| `GetDevices` / `ControlDevice` | Device list for control UIs / direct state control (bypasses NLU) |
| `GetUsers` / `LinkAccount` / `SetTrustLevel` | User registry management |
| `GetSatellites` | List of registered satellites |
| `SubscribeEvents` | Server-side event stream (`resident.arrived`, `satellite.firmware`, …) |
| `RegisterProxy` | Bidirectional keep-alive stream for proxy-connected satellites |
| `SubmitSatelliteAudio` | Proxy hands off audio for a full STT → NLU → TTS round trip |
| `AgentConnect` | Bidirectional stream to the ioBroker adapter — state updates in, control commands out |
| `TimerConnect` | Bidirectional stream to the timer service |
| `EnrollVoiceprint` | Voice enrollment for speaker identification |
