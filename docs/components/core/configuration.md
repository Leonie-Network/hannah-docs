# Konfiguration

Core ist die einzige Komponente mit zwei getrennten Konfigurationsebenen:

- **Die meisten Einstellungen** (NLU-Wortlisten, LLM-System-Prompt, BLE-Tags,
  Auto-Zuordnungen, Trigger, Routinen, Fahrzeuge, Gruppen, …) liegen **nicht** in
  `config.yaml`, sondern in Cores eigener Datenbank (`hannah.db`) und werden ausschließlich
  über die [WebUI](../webui/index.md) verwaltet. Sie gehören nicht auf diese Seite, weil
  sie sich zur Laufzeit ändern und nicht Teil der Auslieferung sind.
- **`config.yaml`** enthält nur die Infrastruktur-/Bootstrap-Konfiguration — alles, was
  Core zum Start braucht, bevor die Datenbank überhaupt erreichbar ist.

Diese Seite beschreibt ausschließlich `config.yaml`.

## Netzwerk

```yaml
udp:
  host: "0.0.0.0"       # Bind-Adresse des Servers
  port: 7775            # UDP-Port für Audio-Streaming und Registrierung
  advertise_host: ""    # Leer = eigene IP automatisch ermitteln
  discovery_topic: "hannah/server"  # Retained MQTT-Topic für Satellit-Discovery

mqtt:
  host: "192.168.1.1"
  port: 1883
  username: "mqtt"
  password: "IHR_MQTT_PASSWORT"
  topic_audio_in: "hannah/+/audio"
  topic_intent_out: "hannah/{device}/intent"
  topic_text_out: "hannah/{device}/text"
  topic_answer_out: "hannah/{device}/answer"
  topic_error_out: "hannah/{device}/error"
  topic_text_command_in: "0_userdata/0/hannah/set/textCommand"

grpc:
  host: "0.0.0.0"
  port: 50051
  enforce_protocol_version: false
  enforce_compat_version: false
```

| Schlüssel | Zweck |
|---|---|
| `udp.*` | UDP-Server für direkt verbundene Satelliten. Deaktiviert sich selbst, solange ein [Proxy](../proxy/index.md) per `RegisterProxy` verbunden ist |
| `mqtt.*` | Zugangsdaten zum MQTT-Broker sowie die Topic-Namen für Audio/Intent/Antwort/Fehler pro Satellit |
| `grpc.host` / `grpc.port` | Bind-Adresse des gRPC-Servers (externe Services: Telegram, Proxy, WebUI, Adapter, …) |
| `grpc.enforce_protocol_version` | Lehnt gRPC-Calls ohne/mit falscher `x-proto-version`-Metadata ab statt nur zu loggen. Erst aktivieren, wenn alle Clients umgestellt sind |
| `grpc.enforce_compat_version` | Wie oben, aber pro Nachricht (`x-compat-version`) statt global |

## Sprachverarbeitung

```yaml
stt:
  model: "base"          # tiny | base | small | medium | large-v3 (lokales Fallback)
  language: "de"
  device: "cpu"          # cpu | cuda
  compute_type: "int8"   # int8 (schnell, Pi) | float16 (GPU) | float32
  no_speech_threshold: 0.6

  # Remote-STT (empfohlen): faster-whisper-server auf einem stärkeren Rechner
  # remote_url: "http://192.168.1.2:8000"
  # remote_model: "Systran/faster-whisper-large-v3"
  # remote_timeout: 15.0

  # Azure Speech-to-Text (Alternative zu faster-whisper)
  # azure_key: "..."
  # azure_region: germanywestcentral

tts:
  backend: piper   # piper (lokal/offline) | azure | polly — piper ist immer der Fallback
  model: "/home/pi/de_DE-kerstin-low.onnx"   # leer = TTS deaktiviert
  length_scale: 1.0    # Sprechgeschwindigkeit (>1 = langsamer)
  noise_scale: 0.667
  noise_w: 0.8

  # azure_key / azure_region / azure_voice (backend: azure)
  # polly_key_id / polly_secret_key / polly_region / polly_voice / polly_engine (backend: polly)

  cache_dir: .tts_cache   # Disk-Cache für Cloud-Synthesen
  warm_phrases: [...]     # Beim Start vorsynthetisierte Standard-Phrasen
  confirmation_sound: "/home/pi/confirmation.wav"   # leer = synthetisiert

voice_id:
  enabled: false          # true = Speaker-ID aktiv (Core löst Sprecher selbst auf)
  base_url: "http://localhost:8765"   # HTTP-Base-URL des VoiceID-Diensts
  timeout_sec: 3.0

audio:
  sample_rate: 16000
  sample_width: 2        # Bytes pro Sample (2 = 16-bit)
  channels: 1
  format: "auto"          # "raw_pcm" | "wav" | "auto" (erkennt WAV-Header, sonst raw_pcm)

llm:
  enabled: false          # true = LLM aktiv (Smalltalk, Notification-Reformulierung)
  provider: ollama        # ollama | openai_compat | openai | groq | mistral
  base_url: "http://localhost:11434"
  # api_key: ""           # Nur für Cloud-Anbieter
  model: "llama3.2"
  timeout: 60
  max_tokens: 2048
  context_ttl: 120.0      # Sekunden bis der Konversations-Kontext verfällt
  history_turns: 3        # Wie viele vergangene Turns maximal einfließen
  fallback_response: "Das kann ich leider nicht beantworten."   # Antwort ohne aktives LLM
```

| Schlüssel | Zweck |
|---|---|
| `stt.*` | faster-whisper-Konfiguration — lokal, remote (empfohlen) oder Azure |
| `tts.*` | Piper (immer Fallback), optional Azure oder Polly als Cloud-Backend |
| `voice_id.*` | Anbindung an [VoiceID](../voiceid/index.md) für Speaker-Erkennung |
| `audio.*` | Erwartetes Audioformat für eingehende Streams |
| `llm.*` | Ollama/Cloud-LLM für Smalltalk. `system_prompt` liegt in den DB-Settings, nicht hier |

## Sonstiges

```yaml
user_registry:
  hannah_roomie: "hannah"   # Roomie-ID, unter der Hannah sich selbst als Resident registriert

satellite_manager:
  seed_ttl_days: 7              # Provisionierte, aber nie gepairte Satelliten-Seeds nach X Tagen löschen
  restart_interval_days: 7      # Präventiver Rejuvenation-Restart

residents:
  topic_prefix_read: "residents/0/roomie"
  state_key: "presence/state"
  hannah_roomie: "hannah"
  state_home: 1
  state_away: 0

iobroker:
  virtual_device_prefix: "javascript.0.virtualDevice"
  feedback_timeout: 3.0   # Sekunden bis "Gerät antwortet nicht"

memory:
  db: "memory.db"        # SQLite-Datei für Langzeitgedächtnis
  recent_limit: 10       # Wie viele Erinnerungen in den System-Prompt injiziert werden

# plink_wav_path: "/home/pi/plink.wav"   # WAV für den Wakeword-Training-Plink-Ton
                                          # Leer/nicht ladbar = generierter Ersatzton
```

| Schlüssel | Zweck |
|---|---|
| `user_registry.hannah_roomie` | Roomie-ID für Hannahs eigenen Resident-Eintrag — **unabhängig** von `residents.hannah_roomie` unten, beide haben zufällig denselben Default |
| `satellite_manager.*` | Aufräum-Fristen für Satelliten-Provisionierung |
| `residents.*` | Anbindung an den ioBroker-Residents-Adapter für Anwesenheitserkennung |
| `iobroker.virtual_device_prefix` | Pfad-Prefix der virtualDevice-Geräte in ioBroker |
| `iobroker.feedback_timeout` | Wartezeit, bevor ein gesteuertes Gerät als "antwortet nicht" gilt |
| `memory.*` | SQLite-Speicher für Langzeit-Erinnerungen |
| `plink_wav_path` | Eigener Ton für den geführten Plink beim Wakeword-Training statt des generierten Standardtons |

## Nicht (mehr) in config.yaml

Diese Themen klingen nach Infra-Config, leben aber komplett in der DB — ein `config.yaml`-Eintrag hat keine Wirkung:

- Fahrzeuge (`cars`/`user_to_car`-Tabellen) und BLE-Tags (`ble_tags`-Tabelle) — Admin-UI bzw. `GetCars`/`CreateCar`/… und `GetGroups`/… gRPC
- Gruppen (Satelliten-Sets für Announcements/Steuerung) — Admin-UI / `GetGroups`/`CreateGroup`/`SetGroupSatellites` gRPC
- NLU-Wortlisten, LLM-System-Prompt — Admin-UI / `GetSettings`/`UpdateConfig` gRPC, bei leerer DB automatisch mit generischen Defaults befüllt
