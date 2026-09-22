# Installation

hannah-chat ist ein einzelnes, fertiges Programm ohne weitere Abhängigkeiten — es gibt
nichts zu installieren im eigentlichen Sinn, nur herunterzuladen. Das Einzige, was es
braucht, ist ein laufendes Hannah Core im **selben Netzwerk** wie dein PC (z. B. im
gleichen WLAN zu Hause) — übers Internet funktioniert es nicht.

## Herunterladen

Lade die passende Datei aus den
[Releases](https://github.com/Leonie-Network/hannah-chat/releases) herunter:

- **Windows:** `hannah-chat-<version>-windows-amd64.exe`
- **Linux:** `hannah-chat-<version>-linux-amd64` — einmalig ausführbar machen mit
  `chmod +x hannah-chat-*`

## Konfiguration

Lege im selben Ordner eine Datei `config.yaml` an. Sie braucht nur eine einzige
Einstellung — wo Hannah Core zu erreichen ist:

```yaml
hannah:
  address: 192.168.1.10:50051
```

`address` ist die IP-Adresse des Rechners, auf dem Hannah Core läuft, plus Port `50051`
(der Port, über den Hannahs Dienste untereinander per gRPC reden — solange du ihn in
Core nicht geändert hast, bleibt er so).

Alternativ geht das auch ohne Datei, als Umgebungsvariable:
`HANNAH_CHAT_HANNAH__ADDRESS=192.168.1.10:50051`.

## Starten

Terminal im Ordner mit Programm und `config.yaml` öffnen und starten:

=== "Windows"

    ```powershell
    .\hannah-chat-<version>-windows-amd64.exe
    ```

=== "Linux"

    ```bash
    ./hannah-chat-<version>-linux-amd64
    ```

Liegt die `config.yaml` woanders, gibst du ihren Pfad mit `--config` an, z. B.
`--config C:\hannah\config.yaml`.

Wie es danach weitergeht, steht in der [Übersicht](index.md#bedienung).
