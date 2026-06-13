const API_KEY = "PASTE_YOUR_API_KEY_HERE";

async function fetchMatches() {
  try {
    const res = await fetch("https://api.football-data.org/v4/matches", {
      headers: { "X-Auth-Token": API_KEY }
    });

    const data = await res.json();
    return data.matches || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

function render(matches) {
  const container = document.getElementById("bracket");
  container.innerHTML = "";

  const roundMap = {
    GROUP_STAGE: [],
    LAST_16: [],
    QUARTER_FINALS: [],
    SEMI_FINALS: [],
    FINAL: []
  };

  matches.forEach(m => {
    if (roundMap[m.stage]) {
      roundMap[m.stage].push(m);
    }
  });

  for (const stage in roundMap) {
    const col = document.createElement("div");
    col.className = "round";

    col.innerHTML = `<h3>${stage.replace("_", " ")}</h3>`;

    roundMap[stage].forEach(m => {
      const div = document.createElement("div");
      div.className = "match";

      div.innerHTML = `
        ${m.homeTeam.name} ${m.score?.fullTime?.home ?? "-"}
        <br/>
        ${m.awayTeam.name} ${m.score?.fullTime?.away ?? "-"}
      `;

      col.appendChild(div);
    });

    container.appendChild(col);
  }
}

async function update() {
  document.getElementById("status").innerText = "Updating live data...";
  const matches = await fetchMatches();
  render(matches);
  document.getElementById("status").innerText = "Live • updates every 60s";
}

update();
setInterval(update, 60000);
