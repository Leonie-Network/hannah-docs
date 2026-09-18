# Hannah

Hannah is a self-hosted, German-speaking voice assistant for the smart home — a locally
run replacement for Google Assistant or Amazon Echo. It runs on a Raspberry Pi and
integrates with [ioBroker](https://www.iobroker.net/). Satellites are custom ESP32-S3
devices that pick up wake word / push-to-talk voice commands and send them to Hannah Core.

This site documents Hannah's architecture, hardware, and components for anyone who wants
to build one themselves or contribute.

## Where to start

- **[Architecture](architecture/overview.md)** — how the pieces talk to each other
- **[Hardware](hardware/overview.md)** — the satellite PCB and enclosure
- **[Development](development/getting-started.md)** — setting up a dev environment
- **[Services](services/overview.md)** — the components that make up the system

## Repositories

- [hannah](https://github.com/NurPech/hannah) — Core, satellite firmware, and supporting services (public mirror)
- [hannah-proto](https://github.com/NurPech/hannah-proto) — the gRPC protocol shared by every component
- [AudioLib](https://github.com/NurPech/AudioLib) — audio processing library used by the satellite firmware
- [ioBroker.hannah](https://github.com/NurPech/ioBroker.hannah) — the ioBroker adapter

Found something outdated or missing? PRs against [this repo](https://github.com/Leonie-Network/hannah-docs) are welcome.
