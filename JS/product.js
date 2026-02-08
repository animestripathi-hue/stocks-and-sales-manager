checkLogin();
checkLogin();

const table = document.getElementById("productTable");

// ALWAYS read fresh data
function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

// Save data safely
function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

function addProduct() {
    const id = document.getElementById("pid").value.trim();
    const name = document.getElementById("pname").value.trim();
    const price = document.getElementById("pprice").value;

    if (id === "" || name === "" || price === "") {
        alert("Please fill all fields");
        return;
    }

    let products = getProducts();

    // Prevent duplicate ID
    if (products.some(p => p.id === id)) {
        alert("Product ID already exists");
        return;
    }

    const product = {
        id: id,
        name: name,
        price: Number(price),
        quantity: 0
    };

    products.push(product);
    saveProducts(products);

    clearForm();
    displayProducts();
}

function displayProducts() {
    const products = getProducts();
    table.innerHTML = "";

    products.forEach(p => {
        table.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>${p.quantity}</td>
            </tr>
        `;
    });
}

function clearForm() {
    document.getElementById("pid").value = "";
    document.getElementById("pname").value = "";
    document.getElementById("pprice").value = "";
}

// Load products on page open
displayProducts();
