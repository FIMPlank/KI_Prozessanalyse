function renderProcessPath(container, step, total) {
  const current = Math.min(step, total);
  const nodeGap = 100 / (total - 1 || 1);
  const progressPercent = total > 1 ? ((current - 1) / (total - 1)) * 100 : 100;

  let nodesMarkup = "";
  for (let i = 0; i < total; i++) {
    const x = i * nodeGap;
    const state = i < current - 1 ? "done" : i === current - 1 ? "current" : "";
    nodesMarkup += `<div class="path-node ${state}" style="left: ${x}%"></div>`;
  }

  container.innerHTML = `
    <div class="step-label">Schritt ${current} von ${total}</div>
    <div class="path-track" role="progressbar" aria-valuemin="1" aria-valuemax="${total}" aria-valuenow="${step}">
      <div class="path-fill" style="width: ${progressPercent}%"></div>
      ${nodesMarkup}
    </div>
  `;
}
