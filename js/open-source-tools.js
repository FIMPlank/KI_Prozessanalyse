const openSourceTools = [
  {
    name: "BPMN Chatbot",
    input: "Text/Sprache",
    output: "Sehr gute BPMN2.0-Modellierung",
    bearbeitung: "Interaktiv, ohne Editor",
    code: "Auf Anfrage beim Autor",
    ux: "hoch",
  },
  {
    name: "ProMoAI",
    input: "Text/BPMN-Modelle/Eventlogs",
    output: "Kein BPMN2.0-Output",
    bearbeitung: "Interaktiv, ohne Editor",
    code: "Verfügbar, nicht kommerziell nutzbar",
    ux: "mittel",
  },
  {
    name: "BPMN Wizard",
    input: "Text",
    output: "BPMN2.0 ok",
    bearbeitung: "Interaktiv, ohne Editor",
    code: "Frei verfügbar",
    ux: "mittel",
  },
  {
    name: "NaLa2BPMN",
    input: "Text",
    output: "Gute BPMN2.0-Modellierung",
    bearbeitung: "Kein Editor, nur Download",
    code: "Auf Anfrage",
    ux: "gering",
  },
  {
    name: "BPMN Assistant",
    input: "Text + Bilder",
    output: "Gute BPMN2.0-Modellierung",
    bearbeitung: "Interaktiv, ohne Editor",
    code: "Frei verfügbar",
    ux: "hoch",
  },
  {
    name: "GPT Codegen",
    input: "Text",
    output: "Sehr gute BPMN2.0-Modellierung",
    bearbeitung: "Keine Bearbeitung",
    code: "Frei verfügbar",
    ux: "gering",
  },
];

const UX_RANK = { hoch: 0, mittel: 1, gering: 2 };

function renderOpenSourceTable(container, { sortByUx = false } = {}) {
  const rows = sortByUx
    ? [...openSourceTools].sort((a, b) => UX_RANK[a.ux] - UX_RANK[b.ux])
    : openSourceTools;

  container.innerHTML = `
    <div class="table-scroll">
      <table class="os-table">
        <thead>
          <tr>
            <th>Tool</th>
            <th>Dateninput</th>
            <th>Datenoutput</th>
            <th>Bearbeitung</th>
            <th>Code verfügbar</th>
            <th>Benutzerfreundlichkeit</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (tool) => `
            <tr>
              <td class="tool-name-cell">${tool.name}</td>
              <td>${tool.input}</td>
              <td>${tool.output}</td>
              <td>${tool.bearbeitung}</td>
              <td>${tool.code}</td>
              <td><span class="ux-badge ux-${tool.ux}">${tool.ux}</span></td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}
