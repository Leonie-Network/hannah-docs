# Asset Server

**Ja.** Ohne den Asset Server bekommen deine Satelliten keine Sound-Assets (Timer-Klingeln,
Hinweistöne) — Sprachein- und -ausgabe funktionieren weiterhin normal, nur die kleinen
akustischen Signale fehlen.

Läuft als eigener Dienst. Jeder Satellit lädt sich seine Sounds selbst per HTTP herunter und
cacht sie lokal — Core spricht den Asset Server nicht direkt an, sondern schickt dem
Satelliten nur die Information, *welchen* Sound er abspielen soll.

Standardmäßig zeigen alle Satelliten auf Leonies eigene Instanz. Willst du deine eigenen
Sound-Assets verwalten oder unabhängig von ihrer Instanz sein, kannst du den Asset Server
selbst betreiben — pro Satellit lässt sich URL, Token und Namespace in dessen eigener
Web-Oberfläche umstellen, ganz ohne Firmware-Neubau.
