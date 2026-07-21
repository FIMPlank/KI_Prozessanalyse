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

  const list = document.getElementById("answer-list");
  list.innerHTML = "";
  questions.forEach((q) => {
    const value = answers[q.id];
    const option = q.options.find((o) => o.value === value);
    const li = document.createElement("li");
    li.innerHTML = `<span class="q">${q.prompt}</span> &mdash; <strong>${option ? option.label : ""}</strong>`;
    list.appendChild(li);
  });

  const form = document.getElementById("lead-form");
  const emailInput = document.getElementById("email");
  const errorEl = document.getElementById("lead-error");
  const submitBtn = document.getElementById("lead-submit");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorEl.hidden = true;

    const email = emailInput.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      errorEl.textContent = "Bitte eine gültige E-Mail-Adresse eingeben.";
      errorEl.hidden = false;
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Wird gesendet…";

    // CRM/Mail-Endpoint ist laut Spec noch offen (Abschnitt 8) — hier lokal
    // simuliert, bis der Endpoint feststeht.
    setTimeout(() => {
      markLeadCaptured();
      document.getElementById("lead-form-wrap").hidden = true;
      document.getElementById("lead-success").hidden = false;
    }, 400);
  });
})();
