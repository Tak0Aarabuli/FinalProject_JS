document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (name === "" || email === "" || password === "") {
    alert("All fields are required!");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  // Save data to Local Storage
  const userData = {
    name: name,
    email: email,
    password: password,
  };

  localStorage.setItem("user", JSON.stringify(userData));

  alert("Signup successful! Data saved to Local Storage.");

  // Clear form fields after submission
  document.getElementById("signup-form").reset();
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
