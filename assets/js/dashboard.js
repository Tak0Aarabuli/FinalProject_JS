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

  populateSlider();

  populateCastSlider();
});

async function fetchTopShows() {
  const response = await fetch(
    "https://api.tvmaze.com/schedule?country=US&date=2023-07-07"
  );
  const data = await response.json();

  const topShows = data
    .filter((show) => show.show.image && show.show.image.original)
    .slice(0, 5);

  return topShows;
}

async function populateSlider() {
  const tvShowSlider = document.getElementById("tvShowSlider");
  const topShows = await fetchTopShows();

  topShows.forEach((show) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");

    slide.innerHTML = `
            <img src="${show.show.image.original}" alt="${show.show.name}">
            <div class="slide-info">
                <strong>${show.show.name}</strong> <br>
                ${show.airdate}
            </div>
        `;

    tvShowSlider.appendChild(slide);
  });
}

function scrollSlider(direction) {
  const slider = document.getElementById("tvShowSlider");
  const scrollAmount = 300;
  slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}

async function fetchCast() {
  const response = await fetch("https://api.tvmaze.com/shows/1/cast");
  const data = await response.json();

  const castMembers = data.filter(
    (member) => member.person.image && member.character.image
  );

  return castMembers;
}

async function populateCastSlider() {
  const castSlider = document.getElementById("castSlider");
  const castMembers = await fetchCast();

  castMembers.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("cast-card");

    card.innerHTML = `
            <img src="${member.person.image.original}" alt="${member.person.name}">
            <div class="cast-info">
                <strong>${member.person.name}</strong><br>
                as <em>${member.character.name}</em>
            </div>
        `;

    castSlider.appendChild(card);
  });
}

function scrollSlider(direction) {
  const slider = document.getElementById("tvShowSlider");
  const scrollAmount = 220;
  slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}

function scrollSlider1(direction) {
  const slider = document.getElementById("castSlider");
  const scrollAmount = 220;
  slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}
