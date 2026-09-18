# Installation

Der Adapter ist im **"latest"**-Repository von ioBroker gelistet, nicht im "stable".
Falls dein ioBroker-Setup nur "stable" verwendet, unter Adapter-Einstellungen zuerst auf
"latest" umstellen — dann im Tab "Adapter" nach "hannah" suchen und installieren.

Alternativ manuell, unabhängig vom eingestellten Repository:

```bash
iobroker url https://github.com/NurPech/ioBroker.hannah
```

## Konfiguration

Nach der Installation eine Instanz anlegen und im Adapter-Konfigurationsdialog:

- **Connection**: Hannah-Host und gRPC-Port (Standard: `127.0.0.1`, `50051`)
- **Device Discovery**: welche Räume/Funktionen Hannah sehen soll (leer = alle), zusätzliche State-Präfixe (z. B. für Auto-Tracker, Wetter-Adapter)
- **Integrations**: Instanznummer des Residents-Adapters für Anwesenheitserkennung

*(Details folgen.)*
