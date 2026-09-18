# UDP

Raw audio between a satellite and Hannah Core, used when the satellite is directly
reachable (as opposed to going through the Proxy). No TLS — the LAN-only, low-power
trade-off described in [Architecture Overview](../overview.md).

## Message types

| Type | Content |
|---|---|
| `0x01` | JSON control message (register, heartbeat, status) |
| `0x02` | Audio chunk (raw PCM, 16kHz, 16-bit, mono) — satellite → Core |
| `0x03` | TTS audio chunk — Core → satellite |

## Registration

```json
{"type": "register", "device": "kitchen-esp", "room": "Kitchen", "ip": "...", "port": 5005}
```
