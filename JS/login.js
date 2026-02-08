checkLogin();


function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");

    // Hardcoded credentials (college safe)
    if (username === "admin" && password === "1234") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html";
    } else {
        errorMsg.innerText = "Invalid username or password";
    }
}
