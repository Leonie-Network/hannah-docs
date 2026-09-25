# AutoDeploy

**Empfohlen.** Ohne AutoDeploy musst du jede Komponente von Hand
aktualisieren (Install-Script erneut ausführen); mit AutoDeploy passiert das automatisch
im Hintergrund.

Anders als die übrigen Komponenten läuft dieser Dienst als root statt als `hannah`-User
— er braucht die zusätzlichen Rechte, um andere Systemdienste zu installieren und neu zu
starten.

!!! danger "Sicherheitsrisiko: `post_install`"
    Der optionale `post_install`-Befehl (siehe [Konfiguration](configuration.md)) läuft
    mit root-Rechten und installiert bei jedem Update typischerweise frische
    Python-Abhängigkeiten per `pip install` — von welchem Paket-Index auch immer dein
    System gerade konfiguriert ist. Ein kompromittiertes oder böswilliges Paket dort
    (Supply-Chain-Angriff) hätte damit vollen Zugriff auf deinen Server, nicht nur auf
    Hannah. Nutze nur Update-Kanäle, denen du vertraust — z. B.
    [Leonies offenen Update-Server](../update-server/index.md) als Standard-Quelle.
    Eine hundertprozentige Garantie gegen Supply-Chain-Angriffe gibt es dabei nie, aber
    ein bekannter, seriös betriebener Kanal ist deutlich risikoärmer als eine beliebige
    dritte Quelle.

    Der [Docker-Weg](../../manual/installation.md) hat dieses Risiko strukturell nicht:
    Abhängigkeiten werden einmalig beim Bauen des Images installiert, nicht Monate
    später bei dir auf dem Server, und Container sind ohnehin vom Rest des Systems
    isoliert.
