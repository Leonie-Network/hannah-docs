# Timer Service

Handles timers and alarms, connected to Hannah Core over a bidirectional gRPC stream
(`TimerConnect`). Timer/alarm events flow back to Core over that same stream — e.g. to
trigger a TTS announcement or a sound asset on the satellite that set the timer.
