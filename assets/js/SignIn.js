document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission refresh

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Retrieve saved user data from Local Storage
  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("No account found. Please sign up first.");
    return;
  }

  if (email === savedUser.email && password === savedUser.password) {
    alert("Login successful! Redirecting...");
    localStorage.setItem("isLoggedIn", "true"); // Store login session
    window.location.href = "dashboard.html"; // Redirect to another page
  } else {
    alert("Invalid email or password. Please try again.");
  }
});
