checkLogin();
checkLogin();

let products = JSON.parse(localStorage.getItem("products")) || [];
const table = document.getElementById("productTable");

function addProduct() {
    const id = document.getElementById("pid").value.trim();
    const name = document.getElementById("pname").value.trim();
    const price = document.getElementById("pprice").value;

    if (id === "" || name === "" || price === "") {
        alert("Please fill all fields");
        return;
    }

    // Check duplicate ID
    const exists = products.find(p => p.id === id);
    if (exists) {
        alert("Product ID already exists");
        return;
    }

    const product = {
        id,
        name,
        price: Number(price),
        quantity: 0
    };

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();
    clearForm();
}

function displayProducts() {
    table.innerHTML = "";

    products.forEach(p => {
        const row = `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>${p.quantity}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

function clearForm() {
    document.getElementById("pid").value = "";
    document.getElementById("pname").value = "";
    document.getElementById("pprice").value = "";
}

// Load products on page load
displayProducts();
