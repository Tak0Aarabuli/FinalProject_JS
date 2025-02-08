document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".toggle-btn");

  toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
  });

  document.querySelector(".logout").addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out successfully!");
    window.location.href = "signin.html";
  });

  const urlParams = new URLSearchParams(window.location.search);
  const showId = urlParams.get("id");

  if (!showId) {
    document.body.innerHTML = "<h1>Error: No episode ID provided!</h1>";
    return;
  }

  const apiUrl = `https://api.tvmaze.com/shows/${showId}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("episode-title").innerText = data.name;
      document.getElementById(
        "episode-year"
      ).innerText = `Premiered: ${data.premiered}`;
      document.getElementById("episode-genres").innerText =
        data.genres.join(", ");
      document.getElementById("episode-summary").innerHTML = data.summary;
      document.getElementById("episode-rating").innerText =
        data.rating.average || "N/A";

      const imageElement = document.getElementById("episode-image");
      imageElement.src = data.image
        ? data.image.original
        : "assets/images/placeholder.jpg";
      imageElement.alt = data.name;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.body.innerHTML = "<h1>Error fetching episode details!</h1>";
    });
});
