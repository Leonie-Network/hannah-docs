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

## Minimum trust level per state

A state can require a minimum user trust level (0–10) before Hannah Core sets it. Only
setting is restricted, never reading.

- **`AgentDevice.required_trust_level`** (`optional int32`, hannah-proto 4.7.0) — sent by
  the ioBroker adapter with each device, read from the state's
  `common.custom["hannah.0"].neededTrust`. Unset means no restriction, which is distinct
  from an explicit `0`.
- **`ControlDeviceRequest.source_service` / `source_user_id`** (hannah-proto 4.7.1) — the
  calling service and its user, the same pair as on `SubmitTextRequest`. Core resolves the
  user via `linked_accounts`; a request without them, or from an unlinked account, counts
  as a guest (trust level 0). A rejected request returns `ok=false` with a message meant
  for the user.

Every other write path resolves the user the same way: VoiceID for voice (an unrecognised
voice is a guest), `source_service`/`source_user_id` for `SubmitText`. Commands through
the adapter's `textCommand` state are not restricted.

## Unknown-field report (`AgentAck`)

Protobuf silently drops fields the receiver's schema doesn't know, so a newer adapter
can't tell on its own whether an older Core evaluates a field like
`required_trust_level`. For that, the adapter sets **`AgentMessage.ack_id`** on a message
(hannah-proto 4.7.0). Core processes the message and then replies on the `AgentConnect`
stream with an **`AgentAck`** carrying the same `ack_id` and the unknown field numbers
per fully qualified message type (`UnknownFields`); an empty list means everything was
understood. Core guarantees that every field it does not report is also evaluated.

A Core too old for this never replies. The adapter treats a missing ack after a timeout —
or a connection over the unversioned `hannah` API — as "not supported" and shows an
ioBroker notification when a state has `neededTrust` set.
