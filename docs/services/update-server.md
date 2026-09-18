# Update Server

Handles OTA firmware distribution for satellites. Satellites poll for updates on a
configured release channel; when one's available, Core coordinates the OTA flow with the
satellite over MQTT (`hannah/satellite/{device}/ota/pending` → `/ok`).

Versions are tracked per channel rather than globally — a channel's version only advances
when something in it actually changed, so unrelated components don't all bump together on
every release.
