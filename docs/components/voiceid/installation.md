# Installation

Über [Docker Compose](../../manual/installation.md) mit dem Profile `with-voiceid` (oder
`full`) dazuschalten. Braucht eine eigene `voiceid-config.yaml`.

## Native Installation

```bash
curl -fsSL https://github.com/NurPech/Hannah/raw/refs/heads/master/voiceid/deploy/install.sh | sudo bash
```

Unter macOS gibt es eine eigene Variante:

```bash
curl -fsSL https://github.com/NurPech/Hannah/raw/refs/heads/master/voiceid/deploy/install-macos.sh | sudo bash
```

## Automatisch aktuell halten

Der [Auto-Update](../auto-update/index.md)-Eintrag für VoiceID ist aktuell deaktiviert;
unter macOS ist zudem noch unklar, wo Auto-Update seine Config ablegt. Details folgen,
sobald das geklärt ist.
