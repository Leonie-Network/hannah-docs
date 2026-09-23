# Microsoft-Entra-Verknüpfung einrichten

Damit Nutzer ihr Microsoft-Konto unter **Mein Konto** verknüpfen können (siehe
[Verknüpfte Konten](../../manual/users.md#verknupfte-konten)), braucht die WebUI eine eigene
App-Registrierung in deinem Microsoft-Entra-Tenant. Das ist einmalige Admin-Arbeit — danach
läuft die Verknüpfung für jeden Nutzer über die ganz normale Microsoft-Anmeldung.

Hannah speichert dabei nur die Objekt-ID des Kontos. Zugriff auf Postfach, Kalender oder
Dateien bekommt sie nicht, die App-Registrierung braucht dafür auch keine Berechtigungen.

!!! warning "Voraussetzung: HTTPS"
    Nach der Anmeldung schickt Microsoft den Browser zurück an die WebUI — und zwar
    immer an eine `https://`-Adresse. Die WebUI muss also per HTTPS erreichbar sein,
    entweder über die native TLS-Terminierung (`tls.enabled`, siehe
    [Konfiguration](configuration.md)) oder über einen eigenen Reverse-Proxy. Ein
    selbstsigniertes Zertifikat reicht, sofern der Browser es einmal akzeptiert hat.

## 1. App registrieren

Im [Microsoft Entra Admin Center](https://entra.microsoft.com) unter
**App-Registrierungen** → "Neue Registrierung":

- **Name** — frei wählbar, z. B. "Hannah WebUI"
- **Unterstützte Kontotypen** — "Nur Konten in diesem Organisationsverzeichnis"
  (Single-Tenant). Konten aus fremden Tenants lehnt die WebUI ohnehin ab.
- **Umleitungs-URI** — Plattform **Web**, Adresse
  `https://deine-webui-adresse/me/entra/callback`

Die Umleitungs-URI muss **exakt** der Adresse entsprechen, unter der du die WebUI im
Browser aufrufst, inklusive Port (z. B. `https://hannah.example.com:5000/me/entra/callback`).
Rufst du die WebUI unter mehreren Adressen auf, trag jede davon als eigene Umleitungs-URI ein.

## 2. Client-Secret anlegen

In der neuen App-Registrierung unter **Zertifikate & Geheimnisse** → "Neuer geheimer
Clientschlüssel". Kopier dir direkt danach den **Wert** (nicht die Geheimnis-ID) — Microsoft
zeigt ihn nur dieses eine Mal an.

!!! note "Ablaufdatum im Blick behalten"
    Ein Client-Secret läuft nach der gewählten Laufzeit ab. Danach schlägt jede neue
    Verknüpfung fehl, bis du ein neues Secret angelegt und in der WebUI eingetragen hast.
    Bereits verknüpfte Konten bleiben davon unberührt.

Unter **API-Berechtigungen** musst du nichts hinzufügen. Je nach Einstellung deines Tenants
fragt Microsoft beim ersten Verbinden nach einer Zustimmung; dürfen Nutzer bei dir nicht
selbst zustimmen, erteilst du sie einmalig als Admin über "Administratorzustimmung erteilen".

## 3. Werte in der WebUI eintragen

Auf der **Übersicht**-Seite der App-Registrierung findest du die **Anwendungs-ID (Client)**
und die **Verzeichnis-ID (Mandant)**. Zusammen mit dem Secret aus Schritt 2 gehören sie in
`config.yaml` (siehe [Konfiguration](configuration.md)):

```yaml
entra_client_id: "Anwendungs-ID (Client)"
entra_client_secret: "Wert des Client-Secrets"
entra_tenant: "Verzeichnis-ID (Mandant)"
```

Docker-Nutzer setzen stattdessen die Umgebungsvariablen `HANNAH_WEBUI_ENTRA_CLIENT_ID`,
`HANNAH_WEBUI_ENTRA_CLIENT_SECRET` und `HANNAH_WEBUI_ENTRA_TENANT`.

Dienst neu starten. Fehlt einer der drei Werte, zeigt **Mein Konto** bei "Microsoft Entra"
nur einen Hinweis statt des "Verbinden"-Buttons.

## 4. Verknüpfen

In der WebUI unter **Mein Konto** → "Verknüpfte Konten" → "Microsoft Entra" →
"Verbinden". Nach der Microsoft-Anmeldung landest du wieder auf **Mein Konto**, und das
Konto ist verknüpft.
