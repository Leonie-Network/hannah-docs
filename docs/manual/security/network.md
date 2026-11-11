# Netzwerk und Firewall

Nichts hiervon gehört ins Internet. Die einzige Ausnahme ist die
[Teams-Bridge](../../components/msteams/index.md), die Microsoft aus dem Internet erreichen
muss, siehe [Daten und Verbindungen](data.md). Hannah ist für dein lokales Netz gebaut, die
Verbindungen zwischen den Komponenten sind unverschlüsselt (kein TLS), weil das auf den
Satelliten zu teuer wäre und im eigenen Netz vertretbar ist.

| Port | Dienst | Hinweis |
|---|---|---|
| 50051/tcp | Core (gRPC, die Schnittstelle der Komponenten untereinander) | unverschlüsselt, ohne Anmeldung auf Verbindungsebene |
| 7775/udp | Audio-Server der Satelliten (Core selbst, oder der optionale Proxy) | unverschlüsselt |
| 1883/tcp, 9001/tcp | MQTT-Broker (9001 ist die WebSocket-Variante) | der mitgelieferte Broker läuft ohne Anmeldung, gehört nur ins interne Netz |
| 5000/tcp | WebUI | hat ein Login. Von außen nur hinter VPN oder einem Reverse-Proxy (ein vorgeschalteter Webserver) mit TLS |
| 8080/tcp | VoiceID | nur für Core |
| 50060/tcp | LogCollector | nur für die Komponenten |

## Eigenes Netz

Am einfachsten steckst du Hannah samt Satelliten in ein eigenes Netz, siehe
[Satelliten und das Mikrofon](satellites.md#was-dagegen-hilft). Core und Satelliten müssen
sich gegenseitig erreichen können.

## Ausgehende Verbindungen

Eine rein lokale Installation braucht wenig: den Version-Check, Updates und Modell-Downloads
beim ersten Start. Dazu kommt, was du selbst einschaltest (Cloud-Dienste, Telegram, Teams).
Die Satelliten brauchen außer ihrer Zeitsynchronisation nichts aus dem Internet, es sei
denn, du willst ihre Updates. Was jede Komponente nach außen verbindet, steht unter
[Daten und Verbindungen](data.md#welche-komponente-wohin-verbindet).
