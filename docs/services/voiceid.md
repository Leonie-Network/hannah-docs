# VoiceID

Speaker identification: matches incoming voice audio against enrolled voiceprints so
Hannah can tell who's talking, not just what was said.

Enrollment happens over the `EnrollVoiceprint` gRPC call. Identifying a specific speaker
feeds into the user registry's trust-level system — some actions (e.g. disarming an
alarm) can be gated to specific, sufficiently-trusted people rather than "anyone whose
voice reached a satellite."
