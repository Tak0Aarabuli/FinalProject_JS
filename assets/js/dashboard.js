document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
        alert("You are not logged in! Redirecting to Sign In...");
        window.location.href = "signin.html";
    }

    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");
        alert("Logged out successfully!");
        window.location.href = "signin.html";
    });

    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelector(".toggle-btn");

    // Toggle sidebar collapse
    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
    });

    // Logout functionality
    document.querySelector(".logout").addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");
        alert("Logged out successfully!");
        window.location.href = "signin.html";
    });
});
