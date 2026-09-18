# Konfiguration

VoiceID hat keine eigene Datenbank für Einstellungen — die komplette Konfiguration liegt
in `config.yaml`.

```yaml
server:
  host: "0.0.0.0"
  port: 8080

recognition:
  # Unter diesem Wert gilt der Sprecher als unbekannt
  unknown_threshold: 0.25
  # Unter diesem Wert wird die Erkennung als unsicher geloggt
  uncertain_threshold: 0.40
```

| Schlüssel | Zweck |
|---|---|
| `server.host` / `server.port` | Bind-Adresse des HTTP-Diensts, den [Core](../core/index.md) über `voice_id.base_url` anspricht |
| `recognition.unknown_threshold` | Ähnlichkeits-Score, unterhalb dessen ein erkannter Sprecher als unbekannt gilt |
| `recognition.uncertain_threshold` | Score, unterhalb dessen eine Erkennung zwar akzeptiert, aber als unsicher geloggt wird |

Ist keine `config.yaml` vorhanden, läuft der Dienst mit genau diesen Werten als Default.
Speicherort der Voice-Profile ist keine Config-Option, sondern durch das jeweilige
Install-Verfahren fest vorgegeben — siehe [Installation](installation.md).
