# Satelliten und das Mikrofon

Das Mikrofon eines Satelliten ist immer an, anders kann ein Wake-Word nicht funktionieren.
Ob ein Satellit mehr tut, als er soll, kann dir niemand beweisen, auch nicht mit offenem
Code. Du kannst es aber selbst überprüfen. Diese Seite sagt, was ein Satellit tut, was ihn
verändern könnte und wie du dich absicherst.

## Was ein unveränderter Satellit tut

- **Das Wake-Word wird auf dem Satelliten selbst erkannt.** Dafür verlässt kein Audio das
  Gerät.
- **Erst danach sendet er Audio an Hannah**, und zwar nur, was nach dem Wake-Word oder dem
  Tastendruck gesprochen wird, nichts davon vorher. Das Senden endet mit der Sprechpause.
- **Der Satellit zeigt es an.** Beim Senden leuchtet der LED-Ring in einem eigenen Zustand.
- **Er speichert keine Aufnahmen.** Frühere Rev.-5-Firmware hielt zu Debug-Zwecken die
  letzten vier Sekunden im Arbeitsspeicher vor und gab sie im Netz heraus. Das ist seit
  Version 0.103.4 abgestellt, siehe Changelog.
- **Die Mute-Taste trennt die Stromversorgung des Mikrofons.** Das schaltet die Firmware,
  es ist kein mechanischer Schalter. Der PTT-Taster holt das Mikrofon für die Dauer des
  Tastendrucks bewusst zurück.

Zwei Ausnahmen lösen Zuhören ohne Wake-Word aus, beide von Hannah selbst: Stellt sie dir
eine Rückfrage, hört der Satellit kurz auf die Antwort. Und für das Sammeln von
Wake-Word-Trainingsdaten gibt es einen Aufnahmemodus, der Audio dauerhaft sendet. Ihn kann
nur eine Komponente auslösen, die nicht öffentlich ist.

## Wie ein Satellit trotzdem zum Lauscher werden könnte

Es gibt drei Wege, und bei allen steht am Anfang ein Zugriff, den du dir nicht wünschst:

1. **Eine manipulierte Firmware.** Wer eine andere Firmware auf den Satelliten bringt,
   bestimmt, was er tut. Möglich ist das über den Update-Server (falls der kompromittiert
   wird, siehe [Lieferkette](supply-chain.md)), über jemanden, der in deinem Netz ist, oder
   über physischen Zugriff auf den UART-Header und die beiden Tasten auf der Unterseite
   der Platine. Wer in deinem lokalen Netz ist, hat dabei allerdings ganz andere
   Möglichkeiten, als einen Satelliten umzuprogrammieren. Firmware-Signatur und Secure Boot
   sind bewusst nicht vorgesehen. Der Schutz ist dein Netz und dein Vertrauen in den
   Update-Weg.
2. **Befehle an den Satelliten.** Satelliten nehmen Steuerbefehle über MQTT an. Der
   MQTT-Broker gehört daher nur ins interne Netz. Dann gilt dasselbe wie oben: Wer dort
   hinkommt, hat andere Möglichkeiten.
3. **Hannah selbst.** Core bekommt das Audio nach dem Wake-Word. Wer Core kontrolliert,
   hört mit. Core läuft bei dir, es ist die Stelle, der du vertrauen musst.

## Was dagegen hilft

- **Hannah in ein eigenes Netz:** ein **VLAN** (ein per Router oder Switch abgetrenntes
  Teilnetz) oder ein eigenes WLAN für smarte Geräte. Ein Gastnetz, das die Geräte
  untereinander abschottet, geht dafür nicht, denn Core und Satelliten müssen sich
  erreichen können. Core (mit dem Proxy, falls du ihn nutzt), MQTT-Broker und Satelliten
  gehören zusammen, und zwar in beide Richtungen: Nicht nur die Satelliten erreichen den
  Core, auch der Core muss die Satelliten erreichen. Nach außen
  erlaubst du nur, was du wirklich brauchst: die Verbindungen zu deinen anderen Systemen
  (zum Beispiel ioBroker), einen Zeitserver und, wenn du sie willst, Updates.
- **Internetzugang der Satelliten: eine bewusste Entscheidung.** Ohne Internetzugang kann
  auch ein manipulierter Satellit nichts nach draußen senden. Dafür bekommt er keine
  Updates mehr, die du dann von Hand einspielst. Mit Internetzugang bleiben Updates
  automatisch, dafür verlässt du dich auf den Update-Weg. Beides ist in Ordnung, du
  solltest dich nur bewusst entscheiden.
- **MQTT-Broker mit Anmeldung** statt offen, siehe [Installation](../installation.md).
- **Updates bewusst steuern:** Lässt du im Satelliten das Feld *Update-Server URL* leer,
  sucht er keine Updates mehr, siehe
  [Satellit konfigurieren](../../components/satellite/configuration.md#firmware).
- **Selbst nachsehen:** Das Audio geht unverschlüsselt per UDP (Port 7775) an Hannah. Du
  kannst es mitschneiden, zum Beispiel mit Wireshark. Ein ruhiger Satellit sendet nur kleine
  Lebenszeichen alle zehn Sekunden. Sendet er laufend Daten, ohne dass jemand spricht,
  stimmt etwas nicht.

Mehr zu den Ports steht unter [Netzwerk und Firewall](network.md).
