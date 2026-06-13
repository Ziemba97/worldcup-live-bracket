const API_KEY = "be44d5f532fd44788e5b9003ec75a2a0";

/* =========================
   FULL KNOCKOUT TREE
   ========================= */

let rounds = {
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
  ],
  "Round of 16": [],
  "Quarter Finals": [],
  "Semi Finals": [],
  "Final": []
};

/* =========================
   SIMULATE PROGRESSION
   ========================= */

function simulateNextRound(currentRound, nextRound) {
  const winners = [];

  for (let i = 0; i < currentRound.length; i += 2) {
    const match1 = currentRound[i];
    const match2 = currentRound[i + 1];

    const winner = Math.random() > 0.5 ? match1[0] : match1[1];
    const opponent = Math.random() > 0.5 ? match2[0] : match2[1];

    winners.push([winner, opponent]);
  }

  rounds[nextRound] = winners;
}

/* =========================
   BUILD FULL BRACKET TREE
   ========================= */

function buildTournament() {
  simulateNextRound(rounds["Round of 32"], "Round of 16");
  simulateNextRound(rounds["Round of 16"], "Quarter Finals");
  simulateNextRound(rounds["Quarter Finals"], "Semi Finals");
  simulateNextRound(rounds["Semi Finals"], "Final");
}

/* =========================
   RENDER
   ========================= */

function render() {
  const container = document.getElementById("bracket");
  container.innerHTML = "";

  Object.keys(rounds).forEach(round => {
    const col = document.createElement("div");
    col.className = "round";

    col.innerHTML = `<h3>${round}</h3>`;

    rounds[round].forEach(match => {
      const div = document.createElement("div");
      div.className = "match";

      div.innerHTML = `
        <div class="team"><span>${match[0]}</span><span>-</span></div>
        <div class="team"><span>${match[1]}</span><span>-</span></div>
        <div class="score">vs</div>
      `;

      col.appendChild(div);
    });

    container.appendChild(col);
  });
}

/* =========================
   LIVE UPDATE (optional API)
   ========================= */

async function updateLive() {
  try {
    const res = await fetch("https://api.football-data.org/v4/matches", {
      headers: { "X-Auth-Token": API_KEY }
    });

    const data = await res.json();

    document.getElementById("status").innerText =
      `Live mode • ${data.matches?.length || 0} matches detected`;

  } catch {
    document.getElementById("status").innerText =
      "Tournament simulation mode (offline-safe)";
  }
}

/* =========================
   INIT
   ========================= */

buildTournament();
render();
updateLive();

setInterval(updateLive, 60000);
