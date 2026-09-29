# Installation

Der Asset Server liefert Sounds (z. B. den Timer-Jingle) an deine Satelliten aus. Er ist
**optional**: Hannah läuft auch ohne ihn, die Satelliten können dann nur keine Sounds
abspielen, weil sie keine kennen.

Er ist außerdem **eigenständig** — er kennt weder Core noch den Rest des Stacks, und Core
weiß nichts von ihm. Die Satelliten holen sich ihre Sounds direkt bei ihm, über die URL, die
du in ihrer Web-Oberfläche einträgst (siehe unten). Er kann deshalb in derselben
Compose-Datei wie Hannah laufen, muss aber nicht — und braucht weder `depends_on` noch das
`hannah_network`.

Es gibt ihn nur als Docker-Image (`quay.io/m1kad0/hannah-asset-server`) — kein natives
`install.sh`. Quellcode: [github.com/NurPech/hannah-asset-server](https://github.com/NurPech/hannah-asset-server).

## Docker Compose

Im [Compose-Generator](../../manual/installation.md) und in der vollständigen Compose-Datei
(Profile `with-asset-server`) ist er bereits vorbereitet. Willst du ihn getrennt betreiben:

```yaml
services:
  hannah-asset-server:
    image: quay.io/m1kad0/hannah-asset-server:latest
    container_name: hannah-asset-server
    ports:
      - "8080:8080"
    volumes:
      - asset-data:/data
    environment:
      - STORAGE_PATH=/data
      - ADMIN_PASSWORD=change-me
      - INSECURE_COOKIE=true
    restart: unless-stopped

volumes:
  asset-data:
```

- **`ADMIN_PASSWORD`** legt beim allerersten Start den Benutzer `admin` an. Ohne diese
  Variable gibt es keinen Benutzer und du kommst nicht in die Verwaltungs-Oberfläche.
- **`INSECURE_COOKIE=true`** brauchst du, solange du den Server ohne HTTPS betreibst. Der
  Login-Cookie wird sonst nur über HTTPS akzeptiert, und die Anmeldung im Browser
  funktioniert nicht. Hast du einen Reverse Proxy mit Zertifikat davor, lässt du die
  Variable weg.

## Zugang für die Satelliten einrichten

Der Server ist nach dem Start leer und geschützt: Die Satelliten brauchen ein Token, um
Sounds abzuholen. Das legst du in der Verwaltungs-Oberfläche an:

1. Öffne `http://<IP-des-Docker-Hosts>:8080` und melde dich als `admin` mit deinem
   `ADMIN_PASSWORD` an.
2. Wechsle im Admin-Bereich auf den Tab **Service Accounts** und wähle **New Service
   Account**. Als Name passt z. B. `satellites`.
3. Klicke beim neuen Account auf **Manage** und trage im Feld *Permissions* eine Zeile
   `satellite:read` ein. Speichere mit **Save Permissions**.
4. Klicke auf **Create Token** und kopiere das Token sofort — es wird nur ein einziges Mal
   angezeigt.

Ein Service Account mit `read` auf `satellite` darf auch alle Assets der übergeordneten
Namespaces lesen (siehe unten).

## Satelliten auf den eigenen Server umstellen

Jeder Satellit hat in seiner eigenen Web-Oberfläche einen Abschnitt "Asset Server" mit den
Feldern URL, Token und Namespace:

| Feld | Wert |
|---|---|
| URL | `http://<IP-des-Docker-Hosts>:8080` (ohne `/` am Ende) |
| Token | das Token aus dem vorherigen Schritt |
| Namespace | leer lassen — der Default ist `satellite` |

Kein Firmware-Neubau nötig, die Werte werden auf dem Satelliten selbst gespeichert.

## Namespaces

Assets sind in **Namespaces** organisiert. Es gibt drei von Anfang an: `shared` als
Wurzel, darunter `core` und `satellite`. Sie vererben nach unten:

- Ein Asset in `shared` steht sowohl in `core` als auch in `satellite` zur Verfügung.
- Ein Asset in `satellite` gilt nur für Satelliten, eines in `core` nur für Core.
- Gibt es dasselbe Asset auf mehreren Ebenen, gewinnt die spezifischste — ein `play` in
  `satellite` überschreibt also ein `play` in `shared`.

Du kannst weitere Namespaces anlegen, z. B. `satellite-test` als Kind von `satellite`, um
Sounds auf einem einzelnen Satelliten auszuprobieren. Dessen Namespace trägst du dann in der
Web-Oberfläche dieses Satelliten ein.

## Assets hochladen

Ein frisch installierter Server enthält keine Sounds — die Satelliten bleiben stumm, bis du
welche hochlädst. Das geht entweder über die Verwaltungs-Oberfläche des Servers oder per
Kommandozeile mit dem im [Quellcode](https://github.com/NurPech/hannah-asset-server)
enthaltenen `scripts/asset-cli.ps1` (PowerShell 7+). Zum Hochladen braucht der Account
`write` auf dem Ziel-Namespace — das ist der `admin`, nicht der Satelliten-Account.

## API

Für eigene Integrationen: die Manifest-/Download-Endpunkte sind unter
[Asset Server (Entwickler)](../../services/asset-server.md) dokumentiert.
