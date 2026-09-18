# Satellit

Die ESP32-S3-Geräte, die Sprachbefehle per Wake-Word oder PTT aufnehmen und an Hannah
Core (bzw. den [Proxy](../proxy/index.md)) senden. Eigene Firmware, eigene Hardware —
siehe [Hardware-Übersicht](../../hardware/overview.md) für PCB und Bauteile.

Jeder Satellit hat eine eigene, lokale Web-Oberfläche (`http://<satellit-ip>/settings`)
für WLAN, MQTT und ein paar Audio-Parameter — unabhängig von Core/WebUI/Adapter. Die IP
ist entweder aus dem ioBroker-Adapter (Satellitenliste) ersichtlich, oder — solange noch
kein WLAN konfiguriert ist — `192.168.4.1` im eigenen Access-Point-Modus des Satelliten.

Firmware-Verteilung (Erstflash + laufende OTA-Updates) läuft über den
[Update-Server](../update-server/index.md).
