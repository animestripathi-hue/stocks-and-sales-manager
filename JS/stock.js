checkLogin();

const select = document.getElementById("productSelect");
const table = document.getElementById("stockTable");

function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

function loadProducts() {
    const products = getProducts();
    select.innerHTML = "";

    if (products.length === 0) {
        select.innerHTML = `<option>No products</option>`;
        table.innerHTML = "";
        return;
    }

    products.forEach((p, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${p.name} (Qty: ${p.quantity})`;
        select.appendChild(option);
    });

    displayStock();
}

function updateStock() {
    const qty = Number(document.getElementById("addQty").value);
    const index = select.value;

    if (qty <= 0) {
        alert("Enter valid quantity");
        return;
    }

    const products = getProducts();
    products[index].quantity += qty;
    saveProducts(products);

    document.getElementById("addQty").value = "";
    loadProducts();
}

function displayStock() {
    const products = getProducts();
    table.innerHTML = "";

    products.forEach((p, index) => {
        const status = p.quantity < 5 ? "Low Stock ⚠️" : "Available";

        table.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>${p.quantity}</td>
                <td>${status}</td>
                <td>
                    <button onclick="deleteProduct(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

/* 🔴 THIS FUNCTION MUST BE GLOBAL */
function deleteProduct(index) {
    const products = getProducts();

    if (!products[index]) {
        alert("Product not found");
        return;
    }

    const confirmDelete = confirm(
        `Delete product "${products[index].name}" permanently?`
    );

    if (!confirmDelete) return;

    products.splice(index, 1);
    saveProducts(products);
    loadProducts();
}

/* Make sure functions are loaded */
loadProducts();
