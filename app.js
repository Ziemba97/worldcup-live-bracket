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
    let round = [];
    let next = [];

    for(let i=0;i<current.length;i+=2){
      const a = current[i];
      const b = current[i+1];
      const w = winner(a,b);

      round.push({a,b,w, id:`${rounds.length}-${i}`});
      next.push(w);
    }

    rounds.push(round);
    current = next;
  }

  return rounds;
}

const tree = buildTree(teams);

/* =========================
   CLEAN HIERARCHICAL LAYOUT
   ========================= */

const nodePos = new Map();

function layout() {
  const xGap = 260;
  const yGap = 70;

  tree.forEach((round, r) => {
    round.forEach((m, i) => {

      let y;

      if (r === 0) {
        y = i * yGap;
      } else {
        // align to children midpoint
        const left = nodePos.get(`${r-1}-${i*2}`);
        const right = nodePos.get(`${r-1}-${i*2+1}`);
        y = (left.y + right.y) / 2;
      }

      const x = r * xGap + 80;

      nodePos.set(`${r}-${i}`, { ...m, x, y });
    });
  });
}

/* =========================
   SVG CONNECTIONS (CLEAN LINES)
   ========================= */

function draw(svg){
  tree.forEach((round, r) => {
    if(r === 0) return;

    round.forEach((m, i) => {
      const child = nodePos.get(`${r}-${i}`);
      const parentA = nodePos.get(`${r-1}-${i*2}`);
      const parentB = nodePos.get(`${r-1}-${i*2+1}`);

      [parentA, parentB].forEach(p => {
        const line = document.createElementNS("http://www.w3.org/2000/svg","path");

        const midX = (p.x + child.x) / 2;

        const d = `
          M ${p.x+160} ${p.y+20}
          C ${midX} ${p.y+20},
            ${midX} ${child.y+20},
            ${child.x} ${child.y+20}
        `;

        line.setAttribute("d", d);
        line.setAttribute("fill", "none");
        line.setAttribute("stroke", "rgba(120,160,255,0.25)");
        line.setAttribute("stroke-width", "2");

        svg.appendChild(line);
      });
    });
  });
}

/* =========================
   RENDER NODES
   ========================= */

function render(){
  const container = document.getElementById("bracket");
  const svg = document.getElementById("svg");

  container.innerHTML = "";
  svg.innerHTML = "";

  nodePos.forEach(n => {
    const div = document.createElement("div");
    div.className = "match";

    div.style.left = n.x + "px";
    div.style.top = n.y + "px";

    div.innerHTML = `
      <div>${n.a}</div>
      <div style="opacity:0.5">vs</div>
      <div>${n.b}</div>
      <b style="color:#00ffb3">${n.w}</b>
    `;

    container.appendChild(div);
  });

  draw(svg);
}

/* =========================
   INIT
   ========================= */

layout();
render();

document.getElementById("status").innerText =
  "FIXED BRACKET ENGINE — CLEAN TREE LAYOUT ACTIVE";
