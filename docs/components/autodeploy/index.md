# AutoDeploy

**Optional, aber empfehlenswert.** Ohne AutoDeploy musst du jede Komponente von Hand
aktualisieren (Install-Script erneut ausführen); mit AutoDeploy passiert das automatisch
im Hintergrund.

Anders als die übrigen Komponenten läuft dieser Dienst als root statt als `hannah`-User
— er braucht die zusätzlichen Rechte, um andere Systemdienste zu installieren und neu zu
starten.
