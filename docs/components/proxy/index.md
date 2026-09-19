# Proxy

**Optional.** Ohne Proxy verbinden sich Satelliten direkt per UDP mit Core — für die
meisten Setups reicht das. Sinnvoll wird der Proxy erst, wenn viele Satelliten Core sonst
zu sehr belasten würden, oder wenn Satelliten Core aus dem Netzwerk heraus nicht direkt
per UDP erreichen können.

Er nimmt Core die UDP-Audio-Verarbeitung der Satelliten ab. Sobald ein Proxy verbunden
ist, schaltet Core seinen eigenen UDP-Server ab — die komplette
Satelliten-Kommunikation läuft dann über den Proxy, der sie gebündelt per gRPC an Core
weiterreicht.
