const errorModal = new Modal("error");
const successModal = new Modal("success");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    errorModal.open("No account found. Please sign up first.", "Invalid Data");
    return;
  }

  if (email === savedUser.email && password === savedUser.password) {
    successModal.open("Login successful! Redirecting...", "Welcome!");
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    errorModal.open(
      "Invalid email or password. Please try again.",
      "Invalid Data"
    );
  }
});
