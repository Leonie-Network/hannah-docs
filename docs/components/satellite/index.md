# Satellit

**Pflicht — mindestens einer.** Ohne Satellit hat Hannah kein Mikrofon: Core allein
verarbeitet nur, was bei ihr ankommt, nimmt selbst aber nichts auf.

Die ESP32-S3-Geräte, die Sprachbefehle per Wake-Word oder PTT aufnehmen und an Hannah
Core (bzw. den [Proxy](../proxy/index.md)) senden. Eigene Firmware, eigene Hardware —
siehe [Hardware-Übersicht](../../hardware/overview.md) für PCB und Bauteile. Die Platine
kannst du fertig bestückt bei PCBWay bestellen, siehe [Platine bestellen](pcb-order.md).

Jeder Satellit hat eine eigene, lokale Web-Oberfläche (`http://<satellit-ip>/settings`)
für WLAN, MQTT und ein paar Audio-Parameter — unabhängig von Core/WebUI/Adapter. Die IP
ist entweder aus dem ioBroker-Adapter (Satellitenliste) ersichtlich, oder — solange noch
kein WLAN konfiguriert ist — `192.168.4.1` im eigenen Access-Point-Modus des Satelliten.

Firmware-Verteilung (Erstflash + laufende OTA-Updates) läuft über den
[Update-Server](../update-server/index.md).

!!! tip "Noch keine Hardware?"
    Zum Ausprobieren gibt es den [Lite-Satelliten](lite.md) — ein kleines Programm, das
    deinen PC mit Mikrofon und Lautsprecher zum Satelliten macht. Kein Ersatz für einen
    echten Satelliten, aber genug, um eine Installation zu testen.
