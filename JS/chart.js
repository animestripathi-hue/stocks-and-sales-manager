const canvas = document.getElementById("salesChart");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 300;

const sales = JSON.parse(localStorage.getItem("sales")) || [];
let totals = {};

sales.forEach(s => {
    totals[s.product] = (totals[s.product] || 0) + Number(s.total);
});

let x = 50;
Object.keys(totals).forEach(p => {
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(x, 250 - totals[p] / 10, 40, totals[p] / 10);
    ctx.fillStyle = "#000";
    ctx.fillText(p, x, 270);
    x += 60;
});
