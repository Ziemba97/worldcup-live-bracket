const API_KEY = "be44d5f532fd44788e5b9003ec75a2a0";

/* =========================
   STATIC WORLD CUP BRACKET
   ========================= */

const bracket = {
  "Round of 32": [
    ["South Korea", "Canada"],
    ["Germany", "Australia"],
    ["Netherlands", "Morocco"],
    ["Brazil", "Japan"],
    ["France", "Tunisia"],
    ["Ecuador", "Senegal"],
    ["Mexico", "Scotland"],
    ["England", "Norway"],
    ["USA", "Ivory Coast"],
    ["Belgium", "Algeria"],
    ["Colombia", "Croatia"],
    ["Spain", "Austria"],
    ["Switzerland", "Egypt"],
    ["Argentina", "Uruguay"],
    ["Portugal", "Panama"],
    ["Turkey", "Iran"]
  ]
};

/* =========================
   RENDER BRACKET
   ========================= */

function renderBracket() {
  const container = document.getElementById("bracket");
  container.innerHTML = "";

  for (const round in bracket) {
    const col = document.createElement("div");
    col.className = "round";

    col.innerHTML = `<h3>${round}</h3>`;

    bracket[round].forEach(match => {
      const div = document.createElement("div");
      div.className = "match";

      div.innerHTML = `
        <div><strong>${match[0]}</strong></div>
        <div style="opacity:0.6">vs</div>
        <div><strong>${match[1]}</strong></div>
        <div class="score" id="${match[0]}-${match[1]}">- : -</div>
      `;

      col.appendChild(div);
    });

    container.appendChild(col);
  }
}

/* =========================
   LIVE SCORE ENRICHMENT
   (non-blocking, optional API)
   ========================= */

async function updateScores() {
  try {
    const res = await fetch("https://api.football-data.org/v4/matches", {
      headers: { "X-Auth-Token": API_KEY }
    });

    const data = await res.json();
    const matches = data.matches || [];

    matches.forEach(m => {
      const key1 = `${m.homeTeam?.name}-${m.awayTeam?.name}`;
      const key2 = `${m.awayTeam?.name}-${m.homeTeam?.name}`;

      const scoreText = `${m.score?.fullTime?.home ?? 0} - ${m.score?.fullTime?.away ?? 0}`;

      const el =
        document.getElementById(key1) ||
        document.getElementById(key2);

      if (el) el.innerText = scoreText;
    });

    document.getElementById("status").innerText =
      "Live data updating • " + matches.length + " matches loaded";

  } catch (e) {
    console.log("API fallback mode");

    document.getElementById("status").innerText =
      "Bracket mode (live API unavailable)";
  }
}

/* =========================
   AUTO WINNER SIMULATION
   (so bracket NEVER breaks)
   ========================= */

function simulateProgression() {
  // simple visual progression (placeholder logic)
  // later we can make it fully real-time bracket logic

  console.log("Bracket system active");
}

/* =========================
   INIT
   ========================= */

renderBracket();
updateScores();
simulateProgression();

setInterval(updateScores, 60000);
