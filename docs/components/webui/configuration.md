# Konfiguration

WebUI hat keine eigene Datenbank für Einstellungen — die komplette Konfiguration liegt in
`config.yaml`.

```yaml
# Wo der WebUI-Flask-Server selbst lauscht
host: "127.0.0.1"
port: 5000

# Signiert die Flask-Session-Cookie — muss über alle gunicorn-Worker und Neustarts
# hinweg stabil sein, sonst werden Nutzer zufällig ausgeloggt. Generieren mit:
#   python3 -c "import secrets; print(secrets.token_hex(32))"
secret_key: "IHR_SECRET_KEY"

# Telegram Login Widget (Account-Verknüpfung in /me) — Bot-Token via @BotFather,
# Domain muss dort per /setdomain auf diese WebUI-Instanz freigeschaltet sein.
telegram_bot_token: ""
telegram_bot_username: ""

# Hannah Core, per gRPC
grpc:
  host: "127.0.0.1"
  port: 50051
```

| Schlüssel | Zweck |
|---|---|
| `host` / `port` | Bind-Adresse des Flask-Servers |
| `secret_key` | Signiert die Session-Cookie. Muss über alle gunicorn-Worker und Neustarts stabil bleiben — ändert sich der Wert, werden alle eingeloggten Nutzer abgemeldet |
| `telegram_bot_token` / `telegram_bot_username` | Optional. Aktiviert das Telegram-Login-Widget in `/me` (Account-Verknüpfung). Bot-Token via [@BotFather](https://t.me/BotFather); die WebUI-Domain muss dort per `/setdomain` freigeschaltet sein |
| `grpc.host` / `grpc.port` | Adresse von Hannah Core |
