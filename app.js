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

  tree.forEach((round, idx) => {
    const col = document.createElement("div");
    col.className = "round";

    col.innerHTML = `<h3>${names[idx] || "ROUND"}</h3>`;

    round.forEach((m, i) => {
      const div = document.createElement("div");
      div.className = "match";

      div.innerHTML = `
        <div>${m.a}</div>
        <div style="opacity:0.5">vs</div>
        <div>${m.b}</div>
        <hr style="border:0;border-top:1px solid #2a3a5c">
        <div style="color:#00ffb3;font-weight:bold">${m.w}</div>
      `;

      col.appendChild(div);
    });

    container.appendChild(col);
  });
}
