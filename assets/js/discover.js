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

  toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
  });

  document.querySelector(".logout").addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out successfully!");
    window.location.href = "signin.html";
  });

  populateShowGrid();
});

let currentPage = 1;

async function fetchShows(page) {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows?page=${page}`);
    const data = await response.json();
    return data.slice(0, 12);
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return [];
  }
}

async function populateShowGrid() {
  const showGrid = document.getElementById("showGrid");
  showGrid.innerHTML = "";

  const shows = await fetchShows(currentPage);

  shows.forEach((show) => {
    const card = document.createElement("div");
    card.classList.add("show-card");

    card.addEventListener("click", function () {
      window.location.href = `show.html?id=${show.id}`;
    });

    card.innerHTML = `
            <img src="${
              show.image
                ? show.image.original
                : "https://via.placeholder.com/150"
            }" alt="${show.name}">
            <div class="show-info">
                <strong>${show.name}</strong><br>
                ${show.premiered ? show.premiered.split("-")[0] : "N/A"}
            </div>
        `;

    showGrid.appendChild(card);
  });

  document.getElementById("pageNumber").textContent = `Page ${currentPage}`;
}

function changePage(direction) {
  currentPage += direction;
  if (currentPage < 1) currentPage = 1;
  populateShowGrid();
}

