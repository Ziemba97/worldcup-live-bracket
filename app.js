const API_KEY = "be44d5f532fd44788e5b9003ec75a2a0";

/* =========================
   FULL TOURNAMENT MODEL
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
  ]
};

/* =========================
   RENDER BRACKET
   ========================= */

function render() {
  const container = document.getElementById("bracket");
  container.innerHTML = "";

  Object.keys(rounds).forEach(roundName => {
    const col = document.createElement("div");
    col.className = "round";

    col.innerHTML = `<h3>${roundName}</h3>`;

    rounds[roundName].forEach((m, i) => {
      const div = document.createElement("div");
      div.className = "match";

      div.onclick = () => openModal(m);

      div.innerHTML = `
        <div class="team"><span>${m[0]}</span><span id="${m[0]}-${m[1]}-h">-</span></div>
        <div class="team"><span>${m[1]}</span><span id="${m[0]}-${m[1]}-a">-</span></div>
        <div class="score">vs</div>
      `;

      col.appendChild(div);
    });

    container.appendChild(col);
  });
}

/* =========================
   LIVE SCORE UPDATE
   ========================= */

async function updateScores() {
  try {
    const res = await fetch("https://api.football-data.org/v4/matches", {
      headers: { "X-Auth-Token": API_KEY }
    });

    const data = await res.json();
    const matches = data.matches || [];

    matches.forEach(m => {
      const key = `${m.homeTeam?.name}-${m.awayTeam?.name}`;

      const h = document.getElementById(`${key}-h`);
      const a = document.getElementById(`${key}-a`);

      if (h && a) {
        h.innerText = m.score?.fullTime?.home ?? 0;
        a.innerText = m.score?.fullTime?.away ?? 0;
      }
    });

    document.getElementById("status").innerText =
      `Live system active • ${matches.length} matches`;

  } catch (e) {
    document.getElementById("status").innerText =
      "Offline mode (bracket simulation active)";
  }
}

/* =========================
   MATCH MODAL
   ========================= */

function openModal(match) {
  const modal = document.getElementById("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <h3>${match[0]} vs ${match[1]}</h3>
      <p>Round: Knockout Stage</p>
      <button onclick="closeModal()">Close</button>
    </div>
  `;

  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

/* =========================
   INIT
   ========================= */

render();
updateScores();

setInterval(updateScores, 60000);
