const API_KEY = "be44d5f532fd44788e5b9003ec75a2a0";

async function fetchMatches() {
  try {
    const res = await fetch(
      "https://api.football-data.org/v4/competitions/WC/matches",
      {
        headers: {
          "X-Auth-Token": "be44d5f532fd44788e5b9003ec75a2a0"
        }
      }
    );

    const data = await res.json();
    return data.matches || [];
  } catch (err) {
    console.error("API error:", err);
    return [];
  }
}

function render(matches) {
  const container = document.getElementById("bracket");
  container.innerHTML = "";

  const round = document.createElement("div");
  round.className = "round";

  round.innerHTML = `<h3>LIVE MATCHES</h3>`;

  if (!matches.length) {
    round.innerHTML += `<div class="match">No data available</div>`;
  }

  matches.slice(0, 20).forEach(m => {
    const div = document.createElement("div");
    div.className = "match";

    div.innerHTML = `
      <strong>${m.homeTeam?.name || "TBD"}</strong>
      ${m.score?.fullTime?.home ?? "-"}
      <br/>
      <strong>${m.awayTeam?.name || "TBD"}</strong>
      ${m.score?.fullTime?.away ?? "-"}
    `;

    round.appendChild(div);
  });

  container.appendChild(round);
}

async function update() {
  document.getElementById("status").innerText = "Updating live data...";

  const matches = await fetchMatches();
  render(matches);

  document.getElementById("status").innerText = "Live • updates every 60s";
}

update();
setInterval(update, 60000);
