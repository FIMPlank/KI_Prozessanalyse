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

// Punkte pro Antwort und Tool — Heuristik statt starrer if/else-Kette.
const SCORE_TABLE = {
  q1: {
    ja: { adonis: 2, "open-source": 1 },
    nein: { "picture-nova": 2, "summ-ai": 1 },
  },
  q2: {
    einzeln: { adonis: 1, "open-source": 1 },
    team: { "summ-ai": 2, "picture-nova": 1 },
  },
  q3: {
    cloud: { "picture-nova": 2, "summ-ai": 1 },
    "on-premise": { adonis: 2, "open-source": 1 },
    offen: {},
  },
  q4: {
    ausschreibungspflichtig: { adonis: 2, "picture-nova": 1 },
    flexibel: { "summ-ai": 1, "picture-nova": 1, "open-source": 1 },
    opensource: { "open-source": 3 },
  },
  q5: {
    modellierungsqualitaet: { "summ-ai": 2, adonis: 1 },
    plattformintegration: { adonis: 2 },
    konformitaetspruefung: { "picture-nova": 2 },
    kosten: { "open-source": 3 },
  },
};

function computeRecommendation(answers) {
  const scores = { adonis: 0, "summ-ai": 0, "picture-nova": 0, "open-source": 0 };

  for (const [questionId, value] of Object.entries(answers)) {
    const contributions = SCORE_TABLE[questionId]?.[value] ?? {};
    for (const [toolId, points] of Object.entries(contributions)) {
      scores[toolId] += points;
    }
  }

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return { primary: ranked[0][0], secondary: ranked[1][0] };
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
