# Telegram-Verknüpfung einrichten

!!! success "Diese Seite brauchst du normalerweise nicht"
    Läuft die [Telegram-Komponente](../telegram/index.md), verknüpft **Mein Konto**
    Telegram über einen Link zum Hannah-Bot — ganz ohne Domain und HTTPS (siehe
    [Verknüpfte Konten](../../manual/users.md#verknupfte-konten)).

!!! warning "Nur für die Rückfallebene"
    Die Einrichtung hier betrifft nur das Telegram-Login-Widget, das die WebUI anbietet,
    solange keine Telegram-Komponente mit Hannah verbunden ist — etwa weil sie noch in einer
    älteren Version läuft. Das Widget verlangt zwingend eine **echte Domain** (keine
    IP-Adresse) und **HTTPS**, außerdem `telegram_bot_token` und `telegram_bot_username` in
    der [Konfiguration](configuration.md). Nichts davon ist bei einer frischen Installation
    eingerichtet.

Von außerhalb deines eigenen Netzwerks muss dabei niemand auf die WebUI zugreifen
können — die komplette Einrichtung hier bleibt innerhalb deines LAN, keine
Portfreigabe am Router nötig.

## 1. Domain besorgen und intern auflösen lassen

Falls du noch keine eigene Domain hast, reicht auch ein kostenloser DynDNS-Dienst —
davon gibt es viele (z. B. DuckDNS, No-IP, oder was dein Router schon eingebaut
mitbringt). Wichtig ist nur, dass die Domain **innerhalb deines Netzwerks** auf die
lokale IP-Adresse deines Hannah-Servers zeigt (nicht auf eine öffentliche IP):

=== "Mit eigenem DNS-Server/Router"
    Trag dort einen eigenen A-Record für deine Domain ein, der auf die lokale IP
    deines Servers zeigt (z. B. `192.168.1.50`). Das ist der sauberste Weg, wirkt
    aber nur, wenn dein Router/DNS-Server das unterstützt.

=== "Ohne eigenen DNS-Server"
    Trag die Zuordnung stattdessen auf jedem Gerät ein, von dem aus du die WebUI im
    Browser aufrufst — in der **Hosts-Datei** dieses Geräts:

    - Windows: `C:\Windows\System32\drivers\etc\hosts`
    - Linux/macOS: `/etc/hosts`

    Eine Zeile anhängen (Adminrechte nötig):

    ```
    192.168.1.50   deine-domain.tld
    ```

    Das muss auf jedem Gerät einzeln gemacht werden, mit dem du die WebUI besuchst.

## 2. TLS in der WebUI aktivieren

In `config.yaml` (siehe [Konfiguration](configuration.md)):

```yaml
tls:
  enabled: true
```

Docker-Nutzer setzen stattdessen die Umgebungsvariable `HANNAH_WEBUI_TLS_ENABLED=true`.

Dienst neu starten. Beim allerersten Start danach erzeugt die WebUI automatisch ein
selbstsigniertes Zertifikat mit sehr langer Laufzeit und speichert es dauerhaft
(systemd: `/var/lib/hannah-webui/tls/`, Docker: `/data/tls/`). Weitere Neustarts oder
Updates erzeugen es nicht erneut — einmal akzeptiert, bleibt es akzeptiert.

Du kannst stattdessen auch ein eigenes Zertifikat hinterlegen (`tls.cert_file` /
`tls.key_file`), musst dich dann aber selbst um dessen Gültigkeit kümmern.

!!! note "Alternative: eigener Reverse-Proxy"
    Wer bereits einen Reverse-Proxy (z. B. nginx, Caddy, Traefik) betreibt, kann die
    TLS-Terminierung auch dort erledigen, statt `tls.enabled` in der WebUI zu setzen.
    Diese Seite geht darauf nicht weiter ein — die Einrichtung eines Reverse-Proxys
    hängt zu stark vom jeweiligen Setup ab, um sie hier allgemeingültig zu beschreiben.

## 3. Zertifikat im Browser akzeptieren

Rufst du die WebUI jetzt über `https://deine-domain.tld:5000` auf, zeigt der
Browser eine Warnung — das Zertifikat ist selbstsigniert, also niemandem "offiziell"
bekannt. Das ist hier unproblematisch: Telegram prüft beim Login-Widget nur, ob die
Verbindung überhaupt verschlüsselt ist, nicht, ob das Zertifikat einer vertrauten
Stelle gehört. Einmal die Ausnahme im Browser bestätigen ("Trotzdem fortfahren" o. ä.),
danach ist Ruhe.

## 4. Domain beim Bot hinterlegen

Im Chat mit [@BotFather](https://t.me/BotFather):

1. `/setdomain` senden
2. deinen Bot auswählen
3. die Domain **ohne** `https://` eintragen, also nur `deine-domain.tld`

## 5. Verknüpfen

Zurück in der WebUI unter **Mein Konto** → "Verknüpfte Konten" → "Verbinden" — der
Telegram-Login-Flow sollte jetzt durchlaufen.
