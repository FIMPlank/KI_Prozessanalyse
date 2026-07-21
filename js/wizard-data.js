const questions = [
  {
    id: "q1",
    prompt: "Liegen bereits Prozessunterlagen oder -informationen vor?",
    helper: "Bestehende Dokumentation, Abläufe oder Interviews, auf denen ein Modell aufbauen kann.",
    options: [
      { value: "ja", label: "Ja, es gibt bereits Unterlagen" },
      { value: "nein", label: "Nein, wir starten bei null" },
    ],
  },
  {
    id: "q2",
    prompt: "Wie viele Personen sollen gleichzeitig am Modell arbeiten?",
    options: [
      { value: "einzeln", label: "Einzelperson" },
      { value: "team", label: "Team, parallel" },
    ],
  },
  {
    id: "q3",
    prompt: "Wo soll das Tool gehostet werden?",
    options: [
      { value: "cloud", label: "Cloud" },
      { value: "on-premise", label: "On-Premise" },
      { value: "offen", label: "Noch offen" },
    ],
  },
  {
    id: "q4",
    prompt: "Wie sieht Ihr Budget- bzw. Beschaffungsrahmen aus?",
    options: [
      { value: "ausschreibungspflichtig", label: "Ausschreibungspflichtig" },
      { value: "flexibel", label: "Flexibel" },
      { value: "opensource", label: "Open-Source-Kapazität vorhanden" },
    ],
  },
  {
    id: "q5",
    prompt: "Was ist Ihnen am wichtigsten?",
    options: [
      { value: "modellierungsqualitaet", label: "Modellierungsqualität" },
      { value: "plattformintegration", label: "Plattform-Integration" },
      { value: "konformitaetspruefung", label: "Konformitätsprüfung" },
      { value: "kosten", label: "Kosten" },
    ],
  },
];

const tools = {
  adonis: {
    name: "ADONIS",
    tagline: "Vorbereitende Modellierung mit hoher Plattform-Integration",
    description:
      "ADONIS eignet sich, wenn bereits Prozessunterlagen vorliegen und Modellierungsqualität sowie Plattform-Integration im Vordergrund stehen.",
  },
  "summ-ai": {
    name: "SUMM AI",
    tagline: "Kollaborative Modellierung mit Fokus auf Konformität",
    description:
      "SUMM AI passt, wenn im Team parallel gearbeitet wird und die Konformitätsprüfung das wichtigste Kriterium ist.",
  },
  "picture-nova": {
    name: "PICTURE nova",
    tagline: "Kollaborativ, cloudbasiert, flexibel beschaffbar",
    description:
      "PICTURE nova ist die richtige Wahl für kollaborative Modellierung in der Cloud mit flexiblem Beschaffungsrahmen.",
  },
  "open-source": {
    name: "Open-Source-Stack",
    tagline: "Kosteneffizient, on-premise-fähig, sechs Alternativen",
    description:
      "Wenn Kosten oder Open-Source-Kapazität im Vordergrund stehen bzw. eine Ausschreibung ansteht, empfiehlt sich einer der sechs Open-Source-Alternativen.",
  },
};

function computeRecommendation(answers) {
  const { q1, q2, q3, q4, q5 } = answers;

  if (q4 === "opensource" || q5 === "kosten") {
    return { primary: "open-source", secondary: q3 === "cloud" ? "picture-nova" : "adonis" };
  }
  if (q4 === "ausschreibungspflichtig" && q3 === "on-premise") {
    return { primary: "adonis", secondary: "open-source" };
  }
  if (q5 === "konformitaetspruefung") {
    return { primary: "summ-ai", secondary: "adonis" };
  }
  if (q2 === "team" && q3 === "cloud") {
    return { primary: "picture-nova", secondary: "summ-ai" };
  }
  if (q1 === "ja" && q5 === "plattformintegration") {
    return { primary: "adonis", secondary: "picture-nova" };
  }
  if (q1 === "nein") {
    return { primary: "picture-nova", secondary: "summ-ai" };
  }
  return { primary: "adonis", secondary: "open-source" };
}

const STORAGE_KEY = "ki-prozessanalyse:wizard-answers";
const LEAD_KEY = "ki-prozessanalyse:lead-captured";

function getAnswers() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setAnswer(id, value) {
  const answers = getAnswers();
  answers[id] = value;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  return answers;
}

function clearAnswers() {
  window.localStorage.removeItem(STORAGE_KEY);
}

function markLeadCaptured() {
  window.localStorage.setItem(LEAD_KEY, "1");
}

function hasLeadCaptured() {
  return window.localStorage.getItem(LEAD_KEY) === "1";
}
