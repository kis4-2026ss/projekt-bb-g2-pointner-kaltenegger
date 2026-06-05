Projekt-Proposal: Der visuelle Frontend „Self-Healer“ Benchmark
---
### Ziel des Projekts
Das übergeordnete Ziel dieses Projekts ist es, drei verschiedene KI-gestützte Entwicklungs-Workflows empirisch anhand eines standardisierten Satzes von Frontend-Fehlern zu vergleichen. Wir wollen herausfinden, welcher Workflow die beste Balance zwischen technischer Korrektheit, visueller UI-Verbesserung und Kosteneffizienz (Token-Ökonomie) bietet.

Die Validierung erfolgt rein datengestützt. Wir messen den Erfolg jedes Versuchs anhand von fünf Kernmetriken, die während der Testläufe protokolliert werden:

1. Gesamter Token-Verbrauch: Absoluter Kostenvergleich (Input- + Output-Tokens) zwischen den drei Workflows.

2. Fehlerbehebungsquote: Die Anzahl der injizierten Fehler, die erfolgreich identifiziert und vollständig behoben wurden.

3. Anzahl menschlicher Interaktionen: Wie oft ein menschlicher Entwickler eingreifen, Prompts anpassen oder Halluzinationen korrigieren musste.

4. Gesamte Bearbeitungszeit: Die tatsächliche Zeit (in Minuten) vom ersten Fehlerbericht bis zum fehlerfreien Build.

--- 
### System, Feature und Workflow
Das Projekt führt eine zweiphasige Systemarchitektur ein:

Phase 1: Ein standardisiertes, fehlerhaftes Frontend-Projekt (z. B. mit React oder Angular) wird bereitgestellt. Diese hat absichtlich eingebaute Fehler bestehend aus 10 spezifischen Mängeln: 4 funktionale/logische Laufzeitfehler, 3 Layout-/Responsive-Design-Fehler und 3 völlig ungestylte, unbenutzbare UI-Komponenten.

Phase 2: Diese identische, fehlerhafte Codebasis wird kopiert und durch drei separate KI-Behebungs-Workflows geschickt:

1. Reine Codebasis (Ohne MCP):	Ein Standard-LLM erhält Zugriff auf die Dateien im Editor. Es kann die laufende Anwendung oder Konsolen-Logs nicht sehen.
2. Mit MCP-Server:	Ein fortschrittlicher Agent ist mit einem maßgeschneiderten Browser-Controller MCP-Server verbunden. Die KI kann aktiv Konsolen-Logs lesen, berechnete DOM-Styles inspizieren und Code eigenständig patchen.
3. Chat-basiert mit Screenshots:	Ein multimodaler Workflow. Das LLM erhält die reinen Textdateien plus PNG-Screenshots der fehlerhaften Browser-Ansicht, die von einem Vision-Modell analysiert werden.
<pre style="white-space: pre; font-family: monospace; line-height: 1.2;">
                                 │
                                 ▼
                   [Fehlerhafte Basis-Frontend-App]
                (10 versteckte Bugs & verzerrte UI)
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
   [Workflow 1]             [Workflow 2]            [Workflow 3]
 Reiner Code-Kontext      MCP-Server Agent        Multimodaler Chat
    (Nur Text)          (Live DevTools + File)   (Code + Screenshots)
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                        [Die Evaluierung]
</pre>
Verwendete Tools/Technologien: 
+ Playwright MCP-Server
+ Gemini Chat/CLI
+ VSCode

---
### Projektplan

Meilenstein 1: Setup, Frontend-Projekt & MCP-Infrastruktur
* **Task 1.1: Bereitstellung der fehlerhaften Basis-App (Seed)**
    * *Beschreibung:* Heraussuchen des Frontend-Grundgerüsts und gezielter Einbau der 10 Defekte (Logikfehler, zerschossenes CSS, ungestylte UI).
* **Task 1.2: Recherchieren und Einbinden des MCP-Server**
    * *Beschreibung:* Recherchieren eines geeigneten MCP-Servers, sowie die Einbindung in den verwendent KI-Agenten.
* **Resultat:** Die fehlerhafte App läuft lokal und der MCP-Server steht bereit für die Testläufe.

Meilenstein 2: Die 3 Testläufe, Analyse & Präsentations-Vorbereitung
* **Task 2.1: Durchführung der 3 Workflows**
    * *Beschreibung:* Sequenzielles Durchlaufen der Fehlerbehebung mit Workflow 1 (Nur Code), Workflow 2 (Mit MCP) und Workflow 3 (Chat + Screenshots).
* **Task 2.2: Datenauswertung & Metriken-Vergleich**
    * *Beschreibung:* Aggregieren und Bereinigen der Logs bezüglich Token-Verbrauch, Zeitaufwand, gelösten Fehlern und menschlichen Eingriffen.
* **Task 2.3: Finalisierung der 15-Minuten-Präsentation**
    * *Beschreibung:* Erstellung der Folien mit erklärung zum Projekt, sowie mit klaren Vergleichsdiagrammen.
* **Resultat:** Das Projekt ist vollständig ausgewertet und die Präsentation ist bereit für den Vortrag.

---
### Aufgabenverteilung
Andreas Pointner(AP), Sebastian Kaltenegger(SK)

+ Proposal: AP, SK
+ Fehlerhaftes Projekt bereitstellen: AP, SK
+ Vorbereitung zur Auswertung(File): AP
+ Workflow 1: SK
+ Workflow 2: SK
+ Workflow 3: AP
+ Presentation: AP, SK


