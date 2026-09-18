# Asset Server

An HTTP service that serves sound assets (TTS jingles, notification sounds, etc.) to both
satellites and Core.

| Endpoint | Purpose |
|---|---|
| `GET /manifest?namespace=satellite` | Manifest of satellite-only assets |
| `GET /manifest?namespace=core` | Manifest of Core-only assets |
| `GET /manifest` | Full manifest across all namespaces the token can see |
| `GET /asset/$key` | Download a single asset by its manifest key |

Assets requested by a satellite are cached locally (LittleFS) so they don't need to be
re-fetched on every play. Authentication is token-based.

## Manifest format

```json
{
  "version": 1,
  "generated_at": "2026-06-04T12:37:05Z",
  "assets": {
    "timer_jingle": {
      "namespaces": ["satellite"],
      "sha256": "e137b95866524a68181f9371070b2df72669f58d7f0144c31b333739e12ea3eb",
      "size": 30960,
      "mime": "audio/wav",
      "meta": {
        "duration_s": 0.97,
        "sample_rate": 16000,
        "channels": 1,
        "bits_per_sample": 16
      }
    }
  }
}
```
