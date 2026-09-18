# Konfiguration

Core ist der einzige Komponente mit zwei getrennten Konfigurationsebenen:

- **Die meisten Einstellungen** (NLU-Wortlisten, LLM-System-Prompt, BLE-Tags,
  Auto-Zuordnungen, Trigger, Routinen, …) liegen **nicht** in `config.yaml`, sondern in
  Cores eigener Datenbank (`hannah.db`) und werden ausschließlich über die
  [WebUI](../webui/index.md) verwaltet. Sie gehören nicht auf diese Seite, weil sie sich
  zur Laufzeit ändern und nicht Teil der Auslieferung sind.
- **`config.yaml`** enthält nur die Infrastruktur-/Bootstrap-Konfiguration — alles, was
  Core zum Start braucht, bevor die Datenbank überhaupt erreichbar ist.

> Diese Seite ist ein Platzhalter für die `config.yaml`-Sektion im Detail.

*(Wird nach und nach befüllt.)*
