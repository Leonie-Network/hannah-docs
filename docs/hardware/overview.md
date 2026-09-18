# Hardware Overview

Hannah's satellites run on a custom ESP32-S3 PCB (88mm round), currently at
[Rev. 5](pcb-revisions.md):

- ESP32-S3-WROOM-1U-N16R8 (external antenna)
- 4× PDM microphones via an ADAU7118 PDM→TDM converter (enables beamforming)
- WS2812B/SK6812-family LED ring
- MAX98357A speaker amp
- BME680 environmental sensor (temperature, humidity, pressure, gas/IAQ)
- LD2410 mmWave presence radar

See [PCB Revisions](pcb-revisions.md) for the full revision history, [Component
Decisions](components.md) for why specific parts were chosen, and
[Enclosure](enclosure.md) for the 3D-printed case.
