document.addEventListener("DOMContentLoaded", () => {
  // Load the footer HTML
  fetch("../footer-de.html")
    .then((response) => response.text())
    .then((data) => {
      // Insert the footer content into the placeholder
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch((error) => console.error("Error loading footer:", error));
});
