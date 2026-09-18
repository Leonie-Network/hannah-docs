# Core

Das Herzstück von Hannah: Spracherkennung (STT), Sprachverständnis (NLU),
Sprachausgabe (TTS), Geräte-Steuerung und die gesamte Orchestrierung laufen hier. Alle
anderen Komponenten — Satelliten, WebUI, Telegram, Proxy, … — sprechen über gRPC oder
MQTT mit Core.

Core läuft problemlos auf einem Raspberry Pi, ist aber nicht darauf festgelegt.
