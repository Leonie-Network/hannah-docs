# MQTT

MQTT is the universal control channel between Hannah Core and satellites — the one
channel that reaches both directly UDP-connected satellites *and* proxy-connected ones,
which is why every control command (not audio) goes through it rather than UDP.

## Key topics

| Topic | Purpose |
|---|---|
| `hannah/server` (retained) | Discovery: proxy host:port |
| `hannah/announce`, `hannah/announceSSML` | External → Core: room announcement |
| `hannah/notification` | External → Core: system notification |
| `hannah/volume` (+ `/state`) | Global volume set/read |
| `hannah/satellite/{device}/volume/set` (+ `/state`) | Per-satellite volume |
| `hannah/satellite/{device}/mute/set` (+ `/state`) | Per-satellite mute |
| `hannah/satellite/{device}/dnd` (+ `/state`) | Do-not-disturb |
| `hannah/satellite/{device}/listen` | Core → satellite: enable virtual push-to-talk (e.g. after a follow-up question) |
| `hannah/satellite/{device}/play_asset` | Core → satellite: play a sound asset |
| `hannah/satellite/{device}/ota/pending` / `/ok` | OTA update request / approval |
| `hannah/satellite/{device}/firmware` | Satellite → Core: current firmware version |
| `hannah/satellite/{device}/sensors` | Satellite → Core: environmental sensor readings |
