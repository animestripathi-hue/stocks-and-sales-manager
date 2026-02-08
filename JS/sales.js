checkLogin();

const productSelect = document.getElementById("saleProduct");
const salesTable = document.getElementById("salesTable");

function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

function getSales() {
    return JSON.parse(localStorage.getItem("sales")) || [];
}

function saveSales(sales) {
    localStorage.setItem("sales", JSON.stringify(sales));
}

function loadProducts() {
    const products = getProducts();
    productSelect.innerHTML = "";

    products.forEach((p, index) => {
        if (p.quantity > 0) {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = `${p.name} (Stock: ${p.quantity})`;
            productSelect.appendChild(option);
        }
    });
}

function sellProduct() {
    const qty = Number(document.getElementById("saleQty").value);
    const index = productSelect.value;

    if (qty <= 0) {
        alert("Enter valid quantity");
        return;
    }

    const products = getProducts();
    const product = products[index];

    if (!product || product.quantity < qty) {
        alert("Insufficient stock");
        return;
    }

    // Reduce stock
    product.quantity -= qty;
    saveProducts(products);

    // Save sale
    const sales = getSales();
    sales.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: qty,
        total: product.price * qty,
        date: new Date().toLocaleDateString()
    });

    saveSales(sales);

    document.getElementById("saleQty").value = "";
    loadProducts();
    displaySales();
}

function displaySales() {
    const sales = getSales();
    salesTable.innerHTML = "";

    sales.forEach(s => {
        salesTable.innerHTML += `
            <tr>
                <td>${s.productName}</td>
                <td>${s.price}</td>
                <td>${s.quantity}</td>
                <td>${s.total}</td>
                <td>${s.date}</td>
            </tr>
        `;
    });
}

// Load on page open
loadProducts();
displaySales();
