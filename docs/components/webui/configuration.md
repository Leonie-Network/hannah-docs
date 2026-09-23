# Konfiguration

Zwei Werte musst du wirklich setzen, damit die WebUI läuft: `secret_key` und, falls Core
nicht auf derselben Maschine läuft, `grpc.host`. Alles andere kannst du zunächst bei den
Vorgabewerten belassen.

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

# Telegram Login Widget — nur Rückfallebene für die Account-Verknüpfung in /me,
# solange keine Telegram-Komponente mit Hannah verbunden ist (sonst läuft die
# Verknüpfung per Link zum Bot, ganz ohne diese Werte). Bot-Token via @BotFather,
# Domain muss dort per /setdomain auf diese WebUI-Instanz freigeschaltet sein.
telegram_bot_token: ""
telegram_bot_username: ""

# Microsoft Entra (Account-Verknüpfung in /me) — Single-Tenant-App-Registrierung
# mit Client-Secret, keine API-Berechtigungen nötig. Siehe Microsoft-Entra-
# Verknüpfung einrichten.
entra_client_id: ""
entra_client_secret: ""
entra_tenant: ""    # Tenant-ID (GUID)

# Hannah Core, per gRPC
grpc:
  host: "127.0.0.1"
  port: 50051

# Native TLS-Terminierung — nur nötig fürs Telegram-Login-Widget (verlangt HTTPS,
# prüft aber nicht, ob das Zertifikat vertrauenswürdig ist — ein selbstsigniertes
# reicht). Bei leerem cert_file/key_file wird beim ersten Start
# automatisch eines erzeugt und dauerhaft gespeichert; ein Neustart erzeugt es nie
# erneut, solange die Datei existiert. Schritt-für-Schritt-Anleitung inkl. Domain-
# Einrichtung: siehe Telegram-Verknüpfung einrichten.
tls:
  enabled: false
  cert_file: ""
  key_file: ""
```

| Schlüssel | Zweck |
|---|---|
| `host` / `port` | Bind-Adresse des Flask-Servers |
| `secret_key` | Signiert die Session-Cookie. Muss über alle gunicorn-Worker und Neustarts stabil bleiben — ändert sich der Wert, werden alle eingeloggten Nutzer abgemeldet |
| `telegram_bot_token` / `telegram_bot_username` | Optional. Aktiviert das Telegram-Login-Widget in `/me` — nur als Rückfallebene, solange keine [Telegram-Komponente](../telegram/index.md) mit Hannah verbunden ist. Mit laufender Komponente verknüpft `/me` per Link zum Bot und braucht diese Werte nicht. Bot-Token via [@BotFather](https://t.me/BotFather); die WebUI-Domain muss dort per `/setdomain` freigeschaltet sein |
| `entra_client_id` / `entra_client_secret` / `entra_tenant` | Optional. Aktiviert die Microsoft-Entra-Verknüpfung in `/me`. Alle drei müssen gesetzt sein, sonst zeigt `/me` nur einen Hinweis. Einrichtung: [Microsoft-Entra-Verknüpfung einrichten](entra-login.md) |
| `grpc.host` / `grpc.port` | Adresse von Hannah Core |
| `tls.enabled` | Optional, Default `false`. Aktiviert HTTPS direkt in der WebUI — Voraussetzung für das Telegram-Login-Widget (nicht für die Verknüpfung per Link zum Bot). Siehe [Telegram-Verknüpfung einrichten](telegram-login.md) für die komplette Einrichtung inkl. Domain |
| `tls.cert_file` / `tls.key_file` | Optional, eigenes Zertifikat/Key. Leer gelassen wird beim ersten Start automatisch ein selbstsigniertes generiert |
