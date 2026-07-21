function renderProcessPath(container, step, total) {
  const nodeGap = 100 / (total - 1 || 1);
  const progressPercent = total > 1 ? (Math.min(step, total) - 1) / (total - 1) : 1;

  let nodesMarkup = "";
  for (let i = 0; i < total; i++) {
    const x = i * nodeGap;
    const done = i <= step - 1;
    nodesMarkup += `<circle cx="${x}" cy="6" r="${done ? 2.4 : 1.8}" fill="${
      done ? "#1FA37E" : "#F6F5F1"
    }" stroke="#0B2B24" stroke-width="0.6" />`;
  }

  container.innerHTML = `
    <div class="step-label">Schritt ${Math.min(step, total)} von ${total}</div>
    <svg viewBox="0 0 100 12" preserveAspectRatio="none" role="progressbar"
         aria-valuemin="1" aria-valuemax="${total}" aria-valuenow="${step}">
      <line x1="0" y1="6" x2="100" y2="6" stroke="#8FE3C4" stroke-width="1.5" />
      <line class="progress-line" x1="0" y1="6" x2="${progressPercent * 100}" y2="6"
            stroke="#1FA37E" stroke-width="1.5" />
      ${nodesMarkup}
    </svg>
  `;
}
