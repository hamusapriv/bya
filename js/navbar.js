document.addEventListener("DOMContentLoaded", () => {
  fetch("/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      // Add the toggle functionality after the navbar is loaded
      const toggleButton = document.querySelector(".navbar-toggle");
      const menu = document.querySelector(".navbar-menu");

      toggleButton.addEventListener("click", () => {
        menu.classList.toggle("open");
      });
    })
    .catch((error) => console.error("Error loading navbar:", error));
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".navbar-toggle");
  const menu = document.querySelector(".navbar-menu");

  toggleButton.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
});
