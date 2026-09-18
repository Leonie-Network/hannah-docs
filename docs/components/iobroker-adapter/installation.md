# Installation

Über die ioBroker-Admin-Oberfläche installieren (Tab "Adapter" → nach "hannah" suchen),
oder manuell:

```bash
iobroker url https://github.com/NurPech/ioBroker.hannah
```

## Konfiguration

Nach der Installation eine Instanz anlegen und im Adapter-Konfigurationsdialog:

- **Connection**: Hannah-Host und gRPC-Port (Standard: `127.0.0.1`, `50051`)
- **Device Discovery**: welche Räume/Funktionen Hannah sehen soll (leer = alle), zusätzliche State-Präfixe (z. B. für Auto-Tracker, Wetter-Adapter)
- **Integrations**: Instanznummer des Residents-Adapters für Anwesenheitserkennung

*(Details folgen.)*
