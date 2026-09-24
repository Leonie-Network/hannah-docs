# Hannah

Hannah ist ein **lokal betriebener, deutschsprachiger Sprachassistent** für das Smart
Home — ein selbst gehosteter Ersatz für Google Assistant oder Amazon Echo. Sie läuft
problemlos auf einem Raspberry Pi, ist aber nicht darauf festgelegt, und ist über
[ioBroker](https://www.iobroker.com/) an dein Smart Home angebunden. Satelliten sind ESP32-S3-Geräte, die per Wake-Word oder Push-to-Talk
Sprachbefehle aufnehmen und an Hannah weiterleiten.

## Wo anfangen?

- **[Installation](manual/installation.md)** — Hannah einrichten
- **[Komponenten](components/index.md)** — was es alles gibt, und wie man's einzeln installiert/konfiguriert
- **[Known Gaps](manual/known-gaps.md)** — bekannte Lücken und Einschränkungen

Wer mehr über den Aufbau von Hannah wissen möchte oder mitentwickeln will, findet unter
**[Entwickler](architecture/overview.md)** die technische Dokumentation (auf Englisch).

## Hilfe und Austausch

- [Hannah-Thread im ioBroker-Forum](https://forum.iobroker.net/topic/84378/hannah-open-source-smart-home-sprachassistentin) — Fragen, Erfahrungen, Ideen
- [Issues auf GitHub](https://github.com/NurPech/hannah/issues) — Fehler melden

## Repositories

- [hannah](https://github.com/NurPech/hannah) — Core, Satelliten-Firmware und weitere Dienste (öffentlicher Mirror)
- [hannah-proto](https://github.com/NurPech/hannah-proto) — das von allen Komponenten genutzte gRPC-Protokoll
- [AudioLib](https://github.com/NurPech/AudioLib) — Audio-Verarbeitung für die Satelliten-Firmware
- [ioBroker.hannah](https://github.com/NurPech/ioBroker.hannah) — der ioBroker-Adapter

Etwas veraltet oder fehlt? Pull Requests gegen [dieses Repo](https://github.com/Leonie-Network/hannah-docs) sind willkommen.
