# Installation

Am einfachsten: der Adapter ist im **"latest"**-Repository von ioBroker gelistet, nicht
im "stable". Falls dein ioBroker-Setup nur "stable" verwendet, zuerst in den
**Systemeinstellungen** (Zahnrad-Icon unten links) auf "latest" umstellen — dann im Tab
"Adapter" nach "hannah" suchen und installieren.

Alternativ, ohne das Repository umzustellen, direkt per npm:

```bash
cd /opt/iobroker
npm install iobroker.hannah@latest
iobroker add iobroker.hannah
```

Oder im Admin mit aktiviertem Expertenmodus über das Adapter-Install-Icon eine
beliebige Quelle angeben, z. B. `iobroker.hannah@latest`.

Nach der Installation eine Instanz anlegen — siehe [Konfiguration](configuration.md) für
alle Einstellungen im Adapter-Konfigurationsdialog.
