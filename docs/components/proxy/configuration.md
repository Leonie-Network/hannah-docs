# Konfiguration

Proxy hat keine eigene Datenbank für Einstellungen — die komplette Konfiguration liegt in
`config.yaml`.

```yaml
proxy_id: "hannah-proxy"   # human-readable name shown in Hannah logs

hannah:
  address: "192.168.8.15:50051"  # Hannah Core gRPC address

udp:
  listen_addr: ":7775"          # UDP port satellites connect to (same as Hannah's UDP port)
  advertise_host: "192.168.8.5" # LAN IP published to satellites via MQTT discovery;
                                 # leave empty to keep Hannah's own address in the topic
```

| Schlüssel | Zweck |
|---|---|
| `proxy_id` | Frei wählbarer Name, taucht so in Hannah Cores Logs auf — nützlich, wenn mehrere Proxys laufen |
| `hannah.address` | `host:port` von Hannah Cores gRPC-Server (Standardport `50051`) |
| `udp.listen_addr` | Port, auf dem der Proxy UDP-Verbindungen von Satelliten annimmt — muss zum UDP-Port passen, den Hannah Core selbst konfiguriert hat |
| `udp.advertise_host` | LAN-IP, die per MQTT-Discovery an Satelliten weitergegeben wird. Leer lassen, um stattdessen Hannahs eigene Adresse im Discovery-Topic zu behalten |

Solange der Proxy per [`RegisterProxy`](../../architecture/protocols/grpc.md) mit Hannah
Core verbunden ist, deaktiviert Core seinen eigenen UDP-Server — es gibt also pro Setup
immer nur einen aktiven UDP-Endpunkt (Proxy oder Core direkt, nie beide).
