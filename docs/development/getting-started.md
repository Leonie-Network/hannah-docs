# Getting Started

Hannah is a multi-repo project:

- [hannah](https://github.com/NurPech/hannah) — the mono-repo: Core (Python), satellite firmware (ESP-IDF/C), the Go proxy, and a few smaller services
- [hannah-proto](https://github.com/NurPech/hannah-proto) — the shared gRPC protocol, published as a package (PyPI, npm, Go module) rather than vendored
- [AudioLib](https://github.com/NurPech/AudioLib) — audio processing (VAD, resampling) used by the satellite firmware
- [ioBroker.hannah](https://github.com/NurPech/ioBroker.hannah) — the ioBroker adapter that bridges Hannah to your smart home devices

## Stack

| Repo / component | Language |
|---|---|
| Hannah Core | Python |
| Satellite firmware | C (ESP-IDF) |
| Proxy | Go |
| hannah-proto | Protocol Buffers (generated for Python/Go/TS) |
| AudioLib | C |
| ioBroker.hannah | TypeScript |

## What you need

- A Raspberry Pi (or similar) for Hannah Core
- An [ioBroker](https://www.iobroker.com/) instance for smart home integration
- One or more satellites — either the custom PCB (see [Hardware](../hardware/overview.md)), or a dev kit while you're prototyping
- ESP-IDF for building satellite firmware

## Building the satellite firmware locally

Activate your ESP-IDF environment, then build from the `satellite-esp` folder of the mono-repo. The board-specific settings come from an `sdkconfig.defaults.<board>` file that you merge on top of the base `sdkconfig.defaults`:

```
idf.py -DSDKCONFIG_DEFAULTS="sdkconfig.defaults;sdkconfig.defaults.rev5" build
```

Use `rev5` for the current custom PCB or `devkit` for a dev kit. The CI build additionally merges a `sdkconfig.ci` that holds server tokens; it is generated in the pipeline and does not exist in a local checkout, so leave it out.

*(Step-by-step setup instructions to follow.)*
