(function () {
  const answers = getAnswers();

  if (Object.keys(answers).length < questions.length) {
    window.location.href = "wizard.html";
    return;
  }

  const { primary, secondary } = computeRecommendation(answers);
  const primaryTool = tools[primary];
  const secondaryTool = tools[secondary];

  document.getElementById("result-title").textContent = primaryTool.name;
  document.getElementById("result-tagline").textContent = primaryTool.tagline;
  document.getElementById("result-description").textContent = primaryTool.description;

  document.getElementById("alt-name").textContent = secondaryTool.name;
  document.getElementById("alt-description").textContent = secondaryTool.description;

  const reasonsList = document.getElementById("reasons-list");
  reasonsList.innerHTML = "";
  getRecommendationReasons(answers, primary).forEach((reason) => {
    const li = document.createElement("li");
    li.textContent = reason;
    reasonsList.appendChild(li);
  });

  document.getElementById("limitation-text").textContent = primaryTool.tradeoff;

  const sortByUx = answers.q4 === "opensource";
  const osGuidance =
    "Wählen Sie anhand von Benutzerfreundlichkeit und Code-Verfügbarkeit passend zu Ihren Kapazitäten." +
    (sortByUx ? " Sortiert nach Benutzerfreundlichkeit, da Open-Source-Kapazität vorhanden ist." : "");

  if (primary === "open-source") {
    document.getElementById("primary-os-wrap").hidden = false;
    document.getElementById("primary-os-guidance").textContent = osGuidance;
    renderOpenSourceTable(document.getElementById("primary-os-table"), { sortByUx });
  }
  if (secondary === "open-source") {
    document.getElementById("alt-os-wrap").hidden = false;
    document.getElementById("alt-os-guidance").textContent = osGuidance;
    renderOpenSourceTable(document.getElementById("alt-os-table"), { sortByUx });
  }

  const list = document.getElementById("answer-list");
  list.innerHTML = "";
  questions.forEach((q) => {
    const value = answers[q.id];
    const option = q.options.find((o) => o.value === value);
    const li = document.createElement("li");
    li.innerHTML = `<span class="q">${q.prompt}</span> &mdash; <strong>${option ? option.label : ""}</strong>`;
    list.appendChild(li);
  });
})();
