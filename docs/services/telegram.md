# Telegram

A standalone microservice bot that lets you talk to Hannah over Telegram — text in,
text (or voice) out — using the same `SubmitText`/`SubmitVoice` gRPC calls a satellite's
voice command would hit.

It runs as its own process with its own lifecycle deliberately: a crash in the Telegram
integration can't take Hannah Core down with it.
