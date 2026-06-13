/* =========================
   ULTIMATE CENTERED BRACKET ENGINE
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

/* deterministic strength system */
function strength(t) {
  return t.split("").reduce((a,c)=>a+c.charCodeAt(0),0);
}

/* winner logic */
function winner(a,b){
  return strength(a) > strength(b) ? a : b;
}

/* build full tree */
function buildTree(list){
  let rounds = [];
  let current = list;

  while(current.length > 1){
    let next = [];
    let round = [];

    for(let i=0;i<current.length;i+=2){
      const a = current[i];
      const b = current[i+1];
      const w = winner(a,b);

      round.push({a,b,w});
      next.push(w);
    }

    rounds.push(round);
    current = next;
  }

  return rounds;
}

const tree = buildTree(teams);

/* render CENTERED TREE */
function render(){
  const container = document.getElementById("bracket");
  container.innerHTML = "";

  const names = [
    "Round of 32",
    "Round of 16",
    "Quarter Finals",
    "Semi Finals",
    "FINAL"
  ];

  tree.forEach((round, idx) => {
    const col = document.createElement("div");
    col.className = "round";

    col.innerHTML = `<h3>${names[idx] || "ROUND"}</h3>`;

    round.forEach(m => {
      const div = document.createElement("div");
      div.className = "match";

      div.innerHTML = `
        <div style="font-size:12px">${m.a}</div>
        <div style="opacity:0.5">vs</div>
        <div style="font-size:12px">${m.b}</div>
        <hr style="border:0;border-top:1px solid #2a3a5c;margin:6px 0">
        <div style="color:#00ffb3;font-weight:bold">${m.w}</div>
      `;

      col.appendChild(div);
    });

    container.appendChild(col);
  });
}

/* INIT */
render();

document.getElementById("status").innerText =
  "ULTIMATE MODE ACTIVE — CENTERED TOURNAMENT TREE LOADED";
