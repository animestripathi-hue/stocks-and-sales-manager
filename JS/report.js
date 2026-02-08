const products = JSON.parse(localStorage.getItem("products")) || [];
const sales = JSON.parse(localStorage.getItem("sales")) || [];

document.getElementById("totalProducts").innerText = products.length;

let stockCount = 0;
products.forEach(p => stockCount += Number(p.quantity));
document.getElementById("totalStock").innerText = stockCount;

let totalSaleAmount = 0;
sales.forEach(s => totalSaleAmount += Number(s.total));
document.getElementById("totalSales").innerText = totalSaleAmount;
