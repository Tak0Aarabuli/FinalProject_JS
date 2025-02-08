const errorModal = new Modal("error");
const successModal = new Modal("success");

document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (name === "" || email === "" || password === "") {
      errorModal.open("Please fill in all fields!", "Missing Information");
      return;
    }

    if (!validateEmail(email)) {
      errorModal.open("Please enter a valid email address.", "Invalid Data");

      return;
    }

    if (password.length < 6) {
      errorModal.open(
        "Password must be at least 6 characters long.",
        "Invalid Data"
      );
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    successModal.open("You have successfully signed up!", "Welcome!");
    setTimeout(() => {
      window.location.href = "signIn.html";
    }, 2000);

    document.getElementById("signup-form").reset();
  });

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
