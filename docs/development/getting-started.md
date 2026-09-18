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
- An [ioBroker](https://www.iobroker.net/) instance for smart home integration
- One or more satellites — either the custom PCB (see [Hardware](../hardware/overview.md)), or a dev kit while you're prototyping
- ESP-IDF for building satellite firmware

*(Step-by-step setup instructions to follow.)*
