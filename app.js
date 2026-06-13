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

/* =========================
   TREE BUILD (deterministic)
   ========================= */

function strength(t){
  return [...t].reduce((a,c)=>a+c.charCodeAt(0),0);
}

function winner(a,b){
  return strength(a) > strength(b) ? a : b;
}

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

/* =========================
   POSITION ENGINE (CENTERED)
   ========================= */

const nodePositions = [];

function layout() {
  const widthStep = 250;
  const heightStep = 70;

  tree.forEach((round, r) => {
    round.forEach((m, i) => {
      const x = r * widthStep + 100;
      const y = i * heightStep * Math.pow(2, r) + 80;

      nodePositions.push({ ...m, x, y, id: `${r}-${i}` });
    });
  });
}

/* =========================
   SVG CONNECTIONS
   ========================= */

function drawLines() {
  const svg = document.getElementById("svg");

  nodePositions.forEach((node, i) => {
    const next = nodePositions.find(n => n.a === node.w || n.b === node.w);

    if(next){
      const line = document.createElementNS("http://www.w3.org/2000/svg","line");

      line.setAttribute("x1", node.x + 160);
      line.setAttribute("y1", node.y + 20);
      line.setAttribute("x2", next.x);
      line.setAttribute("y2", next.y + 20);
      line.setAttribute("stroke", "rgba(120,160,255,0.25)");
      line.setAttribute("stroke-width", "2");

      svg.appendChild(line);
    }
  });
}

/* =========================
   RENDER NODES
   ========================= */

function renderNodes() {
  const container = document.getElementById("bracket");

  nodePositions.forEach(n => {
    const div = document.createElement("div");
    div.className = "match";

    div.style.left = n.x + "px";
    div.style.top = n.y + "px";

    div.innerHTML = `
      ${n.a} vs ${n.b}
      <br>
      <b style="color:#00ffb3">${n.w}</b>
    `;

    container.appendChild(div);
  });
}

/* =========================
   INIT
   ========================= */

layout();
renderNodes();
drawLines();

document.getElementById("status").innerText =
  "SVG MODE ACTIVE — TRUE TOURNAMENT TREE RENDERED";
