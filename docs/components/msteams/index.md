# Microsoft Teams

**Bei Bedarf.** Hannah funktioniert auch komplett ohne Teams — diese Komponente erlaubt
zusätzlich, Hannah in Microsoft Teams anzuschreiben: Text rein, Hannahs Antwort als
Text zurück.

Es antworten nur Nutzer aus deinem eigenen Microsoft-Tenant, die ihr Konto vorher in der
WebUI verknüpft haben (siehe [Microsoft-Entra-Verknüpfung](../webui/entra-login.md)).
Alle anderen bekommen einen Hinweis oder werden stillschweigend ignoriert.

!!! danger "Anders als alle anderen Komponenten: aus dem Internet erreichbar"
    Microsoft stellt Teams-Nachrichten per HTTPS **an** die Bridge zu. Sie muss also aus
    dem Internet erreichbar sein — als einzige Hannah-Komponente. Bevor du sie in
    Betrieb nimmst, lies den Abschnitt
    [Sicherheit](installation.md#sicherheit) auf der Installationsseite.
