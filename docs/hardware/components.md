# Component Decisions

Some of the more consequential part choices, and what they were chosen over:

| Decision | Chosen | Rejected | Why |
|---|---|---|---|
| Microphone | SPH0641 (PDM) | INMP441 (I2S) | INMP441 went end-of-life |
| Wake word (satellite) | microWakeWord | openWakeWord (ONNX) | openWakeWord needs a Google speech embedding model — too heavy for the ESP32 |
| LED type (Rev. 3+) | SK6812-Mini-E | WS2812B | SK6812 is 3.3V-compatible, no level shifter needed |
| Processor | ESP32-S3 | Original ESP32 | S3 has an AI accelerator and enough PSRAM for TFLite |
| Satellite platform | Custom ESP32-S3 PCB | Raspberry Pi Zero 2 W | Cost (~4€ vs ~18€) and power draw (~0.1W vs ~1W) |
