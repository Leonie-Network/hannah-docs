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

## Container-Benutzer

Ab **Version 0.7.0** läuft der Server-Prozess als Benutzer `1000:1000`, nicht mehr als
root. Frühere Versionen liefen als root.

Für bestehende Installationen musst du nichts anpassen. Das Image startet kurz als root,
übergibt das Datenverzeichnis `/data` (samt Inhalt) an `1000:1000` und wechselt dann den
Benutzer, noch bevor Datenbank und Webserver starten. Das passiert automatisch beim ersten
Start nach dem Update auf 0.7.0, es gehen keine Daten verloren. Im Log siehst du dann
`changed ownership of … entries` und `dropped privileges to uid=1000 gid=1000`. Bei
späteren Starts wird nichts mehr geändert. Neue Volumes gehören von Anfang an
`1000:1000`.

!!! warning "Wenn der Wechsel nicht klappt"
    Das Volume muss die Besitzänderung zulassen. Das scheitert zum Beispiel bei einem
    NFS-Share mit `root_squash`. Der Server läuft dann mit einer Warnung im Log
    (`cannot switch to uid 1000`) weiter als root, damit nach dem Update nichts ausfällt.
    Setz in dem Fall einmal die Rechte direkt auf dem Speicher:
    `chown -R 1000:1000` auf das Datenverzeichnis. Mit `REQUIRE_NON_ROOT=true` bricht der
    Server stattdessen mit einer Fehlermeldung ab, wenn er nicht wechseln kann.

## Erster Login

Öffne `http://<IP-des-Docker-Hosts>:8080` und melde dich als `admin` mit deinem
`ADMIN_PASSWORD` an. Der Server ist danach noch leer — wie du Zugang für die Satelliten
einrichtest und Sounds hochlädst, steht unter [Konfiguration](configuration.md).
