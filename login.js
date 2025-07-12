// Handle login functionality
// You can add the login logic here
function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username === "admin" && password === "admin") {
      window.location.href = "index.html";
    } else {
      document.getElementById("login-message").textContent = "Invalid credentials!";
    }
  }
  