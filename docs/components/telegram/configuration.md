# Konfiguration

Telegram hat keine eigene Datenbank für Einstellungen — die komplette Konfiguration liegt
in `config.yaml`.

```yaml
# hannah-telegram configuration
# Copy this file to config.yaml and fill in the secrets.

# Telegram Bot Token from @BotFather
telegram_token: "YOUR_BOT_TOKEN_HERE"

# URL der Hannah WebUI — für Links in Bot-Antworten an unbekannte User
webui_url: "https://hannah.example.com"

grpc:
  host: "127.0.0.1"
  port: 50051
```

| Schlüssel | Zweck |
|---|---|
| `telegram_token` | Bot-Token von [@BotFather](https://t.me/BotFather) |
| `webui_url` | Basis-URL der [WebUI](../webui/index.md) — wird in Bot-Antworten an noch nicht verknüpfte User verlinkt |
| `grpc.host` / `grpc.port` | Adresse von Hannah Core |

Alle eigentlichen Befehle (Text, Sprachnachrichten, `/auto`) laufen über gRPC an Core
(`SubmitText`/`SubmitVoice`/`GetCarState`) — der Bot selbst hält keinen eigenen Zustand
außer der laufenden Verbindung.
