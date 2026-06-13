/* =========================
   WORLD CUP GOD MODE ENGINE
   ========================= */

const teams = [
  "South Korea","Canada","Germany","Australia",
  "Netherlands","Morocco","Brazil","Japan",
  "France","Tunisia","Ecuador","Senegal",
  "Mexico","Scotland","England","Norway",
  "USA","Ivory Coast","Belgium","Algeria",
  "Colombia","Croatia","Spain","Austria",
  "Switzerland","Egypt","Argentina","Uruguay",
  "Portugal","Panama","Turkey","Iran"
];

/* deterministic strength system (NO randomness chaos) */
function strength(team) {
  return team.split("").reduce((a,c)=>a+c.charCodeAt(0),0);
}

/* winner logic */
function pickWinner(a, b) {
  return strength(a) > strength(b) ? a : b;
}

/* build rounds */
function buildRounds(list) {
  let rounds = [];
  let current = list;

  while (current.length > 1) {
    let next = [];
    let roundMatches = [];

    for (let i = 0; i < current.length; i += 2) {
      const a = current[i];
      const b = current[i+1];

      const winner = pickWinner(a,b);

      roundMatches.push([a,b,winner]);
      next.push(winner);
    }

    rounds.push(roundMatches);
    current = next;
  }

  return rounds;
}

const rounds = buildRounds(teams);

/* render */
function render() {
  const container = document.getElementById("bracket");
  container.innerHTML = "";

  const names = [
    "Round of 32",
    "Round of 16",
    "Quarter Finals",
    "Semi Finals",
    "FINAL"
  ];

  rounds.forEach((round, idx) => {
    const col = document.createElement("div");
    col.className = "round";

    col.innerHTML = `<h3>${names[idx]}</h3>`;

    round.forEach(match => {
      const div = document.createElement("div");
      div.className = "match";

      const [a,b,w] = match;

      div.innerHTML = `
        <div class="${w===a?'winner':''}">${a}</div>
        <div class="${w===b?'winner':''}">${b}</div>
      `;

      col.appendChild(div);
    });

    container.appendChild(col);
  });
}

/* init */
render();
document.getElementById("status").innerText =
  "GOD MODE ACTIVE — FULL TOURNAMENT GENERATED";
