# ioBroker-Adapter

**Nötig, wenn du Smart-Home-Geräte steuern willst.** Ohne den Adapter kann Hannah zwar
reden, aber nichts schalten — sie hat schlicht keine Verbindung zu deinem Smart Home.

Er verbindet ioBroker mit Hannah Core über einen bidirektionalen gRPC-Stream
(`AgentConnect`). Geräte-Zustände, Anwesenheitsinformationen und Text-Befehle fließen in
Echtzeit von ioBroker zu Hannah; Hannah sendet SetState-Befehle zurück, wenn sie Geräte
steuert.

Läuft als ganz normaler ioBroker-Adapter — kein eigener Prozess außerhalb von ioBroker,
keine eigene `config.yaml`. Eigenes Repository:
[ioBroker.hannah](https://github.com/NurPech/ioBroker.hannah).
