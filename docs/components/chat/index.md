# Chat (Terminal)

**Optional.** Hannah funktioniert auch komplett ohne — hannah-chat ist ein kleines
Programm, mit dem du Hannah am PC per Tastatur schreibst statt sprichst. Praktisch, wenn
du am Rechner sitzt, gerade nicht sprechen möchtest, oder schnell etwas ausprobieren
willst. Vom Prinzip her wie der [Telegram-Bot](../telegram/index.md), nur ohne Telegram:
es läuft direkt in einem Terminal-Fenster (der Kommandozeile, unter Windows z. B.
PowerShell).

Was du eintippst, versteht Hannah genauso wie einen gesprochenen Befehl — „Mach das Licht
in der Küche an" funktioniert hier also genauso wie am Satelliten.

!!! note "Nur von zu Hause aus"
    hannah-chat funktioniert nur, wenn dein PC im selben Netzwerk ist wie Hannah — also
    zum Beispiel im gleichen WLAN zu Hause. Von unterwegs, übers Internet, erreicht es
    Hannah nicht. Dafür gibt es den [Telegram-Bot](../telegram/index.md).

Zur Einrichtung siehe [Installation](installation.md).

## Bedienung

Einfach losschreiben und mit Enter abschicken. Wenn du nicht weiterweißt: `/help`. Alles, was nicht mit `/` beginnt, geht als
normaler Befehl oder normale Frage an Hannah. Mit `/` beginnen die Befehle des
Programms selbst:

| Befehl | Funktion |
|---|---|
| `/help` | Zeigt alle verfügbaren Befehle mit kurzer Beschreibung an |
| `/login` | Als Hannah-Nutzer anmelden (fragt Benutzername und Passwort ab) |
| `/logout` | Abmelden — danach bist du wieder anonym unterwegs |
| `/devices` | Geräte raumweise durchblättern und direkt steuern, über ein nummeriertes Menü. Braucht Trust-Level 7 |
| `/exit` | Programm beenden |

**Warum anmelden?** Ohne Anmeldung weiß Hannah nicht, wer schreibt, und behandelt dich
wie einen Gast. Manche Befehle sind aber an ein Trust-Level gebunden — also daran, wie
viel ein Nutzer bei Hannah darf (siehe [Nutzerverwaltung](../../manual/users.md)).
Mit `/login` meldest du dich mit denselben Zugangsdaten an wie in der WebUI.

**Im `/devices`-Menü** tippst du einfach die angezeigte Nummer: erst den Raum, dann das
Gerät, dann die Aktion. `0` geht eine Ebene zurück bzw. schließt das Menü.
