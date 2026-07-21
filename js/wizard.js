(function () {
  const params = new URLSearchParams(window.location.search);
  let stepIndex = Math.max(0, Math.min(questions.length - 1, parseInt(params.get("q") || "1", 10) - 1));

  const answers = getAnswers();
  const question = questions[stepIndex];

  const pathEl = document.getElementById("process-path");
  renderProcessPath(pathEl, stepIndex + 1, questions.length);

  document.getElementById("question-prompt").textContent = question.prompt;

  const helperEl = document.getElementById("question-helper");
  if (question.helper) {
    helperEl.textContent = question.helper;
    helperEl.hidden = false;
  } else {
    helperEl.hidden = true;
  }

  const optionsEl = document.getElementById("options");
  optionsEl.innerHTML = "";
  optionsEl.setAttribute("aria-label", question.prompt);

  question.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.setAttribute("role", "radio");
    btn.textContent = option.label;
    if (answers[question.id] === option.value) {
      btn.classList.add("selected");
      btn.setAttribute("aria-checked", "true");
    } else {
      btn.setAttribute("aria-checked", "false");
    }
    btn.addEventListener("click", () => {
      setAnswer(question.id, option.value);
      if (stepIndex < questions.length - 1) {
        window.location.href = `wizard.html?q=${stepIndex + 2}`;
      } else {
        window.location.href = "ergebnis.html";
      }
    });
    optionsEl.appendChild(btn);
  });

  const backBtn = document.getElementById("back-link");
  if (stepIndex > 0) {
    backBtn.hidden = false;
    backBtn.addEventListener("click", () => {
      window.location.href = `wizard.html?q=${stepIndex}`;
    });
  } else {
    backBtn.hidden = true;
  }
})();
