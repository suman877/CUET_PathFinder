let name = "";
let subjectLimit = 5;
let qIndex = 0;

/* ===============================
   ALL CUET SUBJECTS (SCORED)
================================ */
const scores = {
  // Languages
  English:0, Hindi:0, Sanskrit:0, Urdu:0, Tamil:0, Telugu:0,
  Bengali:0, Marathi:0, Gujarati:0, Punjabi:0,

  // Sciences
  Mathematics:0, Physics:0, Chemistry:0, Biology:0,
  Biotechnology:0, EnvironmentalStudies:0,

  // Commerce
  Economics:0, Accountancy:0, BusinessStudies:0,

  // Humanities
  History:0, Geography:0, PoliticalScience:0, Sociology:0,
  Psychology:0, Philosophy:0, Anthropology:0,

  // Applied
  ComputerScience:0, LegalStudies:0, TeachingAptitude:0,
  MassMedia:0, FineArts:0, PhysicalEducation:0,

  // General Test
  GeneralTest:0
};

/* ===============================
   ASSESSMENT QUESTIONS
================================ */
const questions = [
  {
    text: "I enjoy solving numerical and logical problems.",
    map: ["Mathematics","Physics","Economics","GeneralTest"]
  },
  {
    text: "I like understanding how society and people function.",
    map: ["Sociology","Psychology","Anthropology"]
  },
  {
    text: "I am interested in governance, law, and public affairs.",
    map: ["PoliticalScience","History","LegalStudies","GeneralTest"]
  },
  {
    text: "Technology and computers excite me.",
    map: ["ComputerScience","Mathematics"]
  },
  {
    text: "I prefer theoretical and conceptual learning.",
    map: ["Philosophy","History","PoliticalScience"]
  },
  {
    text: "I am comfortable with business, finance, and markets.",
    map: ["Economics","Accountancy","BusinessStudies"]
  },
  {
    text: "I enjoy creative expression and media.",
    map: ["FineArts","MassMedia"]
  },
  {
    text: "I am confident in reading and writing academic English.",
    map: ["English"]
  },
  {
    text: "I am interested in teaching or mentoring others.",
    map: ["TeachingAptitude","Psychology"]
  },
  {
    text: "Competitive exams and aptitude tests suit me.",
    map: ["GeneralTest","Mathematics"]
  }
];

/* ===============================
   FLOW CONTROL
================================ */
function goToCount() {
  name = document.getElementById("nameInput").value.trim();
  if(!name) return alert("Please enter your name");
  switchScreen("landing","count");
}

document.getElementById("countSlider").oninput = e => {
  subjectLimit = parseInt(e.target.value);
  document.getElementById("countValue").innerText = subjectLimit;
};

function startAssessment() {
  switchScreen("count","assessment");
  loadQuestion();
}

function loadQuestion() {
  const q = questions[qIndex];
  document.getElementById("questionText").innerText = q.text;

  const options = ["Strongly Agree","Agree","Neutral","Disagree"];
  const box = document.getElementById("options");
  box.innerHTML = "";

  options.forEach((opt,i)=>{
    box.innerHTML += `
      <div class="option">
        <input type="radio" name="ans" value="${3-i}"> ${opt}
      </div>`;
  });

  document.getElementById("progressBar").style.width =
    ((qIndex+1)/questions.length*100)+"%";
}

function nextQuestion() {
  const selected = document.querySelector("input[name='ans']:checked");
  if(!selected) return alert("Please select an option");

  questions[qIndex].map.forEach(sub=>{
    scores[sub] += parseInt(selected.value);
  });

  qIndex++;
  qIndex < questions.length ? loadQuestion() : showResults();
}

/* ===============================
   RESULTS ENGINE
================================ */
function showResults() {
  switchScreen("assessment","results");

  const ranked = Object.entries(scores)
    .sort((a,b)=>b[1]-a[1])
    .map(e=>e[0])
    .slice(0, subjectLimit);

  const half = Math.ceil(ranked.length/2);

  document.getElementById("resultHeading").innerText =
    `Hello ${name}, based on your assessment:`;

  document.getElementById("rec1").innerText =
    ranked.slice(0,half).join(", ");

  document.getElementById("rec2").innerText =
    ranked.slice(half).join(", ");

  document.getElementById("reason1").innerText =
    "This combination strongly aligns with your interests, aptitude, and learning preferences while remaining fully CUET-compliant.";

  document.getElementById("reason2").innerText =
    "This alternative offers balanced academic flexibility and keeps multiple CUET pathways open based on your strengths.";
}

function switchScreen(hide, show) {
  document.getElementById(hide).classList.remove("active");
  document.getElementById(show).classList.add("active");
}
