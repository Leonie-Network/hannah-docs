# PCB Revisions

| Rev | Status | Size | Notes |
|---|---|---|---|
| 1 | Prototype (never ordered) | — | Feasibility study |
| 2 | Delivered | 114mm round | Dimension error (57mm radius instead of 75mm diameter); electrical test only |
| 3 | Delivered, has bugs | 88mm round | Target design; not usable |
| 4 | Delivered, superseded | 88mm round | Target design |
| 5 | Delivered, currently deployed | 88mm round | 4× TDM microphones (ADAU7118), WROOM-1U (external antenna), USB-C solder pads, fixed SD slot orientation |

## Rev. 5 (current)

Same footprint as Rev. 4 (88mm round), fits the existing enclosure. Changes:

- **Chip:** ESP32-S3-**WROOM-1U**-N16R8 (external antenna) — Rev. 4 used the internal-antenna variant
- **Microphones:** 4× SPH0655LM4H-1-8 (PDM) → **ADAU7118** (PDM→TDM converter) → TDM straight into the ESP32-S3's I2S peripheral, enabling beamforming
- **Buttons remapped:** the TDM mic lines took over GPIOs previously used for PTT/Vol+/Vol− — rewired to PTT=GPIO40, Vol+=GPIO39, Vol−=GPIO18 (Mute stays GPIO11)
- **Status LED:** its own pin (GPIO1); a second, purely passive power LED was added, wired directly to 3.3V/GND
- **LED ring:** SK6812MINI-RV (was SK6812MINI-E on Rev. 4), driven through a level shifter — unlike the plain 3.3V-compatible SK6812-Mini-E used before it
- **USB-C removed:** replaced with solder pads for an external cable to a panel-mount USB-C connector in the enclosure
- Speaker, BME680 sensor, and the LD2410 radar are unchanged from Rev. 4

## Rev. 4

88mm round, one side slightly flattened for USB-C, 4-layer (F.Cu / GND / 3.3V / B.Cu), ENIG.

- 4× SMD buttons (mute, vol+, vol−, PTT)
- ~24× WS2812B LED ring
- MAX98357A I2S amplifier
- BME680 environmental sensor
- ESP32-S3-WROOM-1-N16R8 (internal antenna)
- 2× SPH0641LU4H-1 PDM microphones
- LD2410 mmWave radar
- USB-C
