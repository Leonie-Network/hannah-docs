# Proxy

A Go service that takes UDP audio-stream handling off Hannah Core.

When a Proxy connects to Core (`RegisterProxy`, a bidirectional keep-alive gRPC stream),
Core disables its own UDP server entirely — all satellite audio then flows through the
Proxy instead. Go's concurrency model suits that job well; the Proxy hands Core clean PCM
audio (`SubmitSatelliteAudio`) rather than Core having to juggle raw UDP packets itself.
If the Proxy disconnects, Core re-enables UDP automatically.

The Proxy also relays satellite connect/disconnect events (`NotifySatelliteRegistered` /
`NotifySatelliteGone`) and receives `PlayAudioCommand`s pushed back from Core over the
same stream for TTS playback.
