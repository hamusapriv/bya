let isArchitecture = true;
const architectureText = document.getElementById("architecture");
const visualisationText = document.getElementById("visualisation");

function toggleText() {
  if (isArchitecture) {
    architectureText.style.transform = "translateY(-100%)";
    architectureText.style.opacity = "0";
    visualisationText.style.transform = "translateY(0)";
    visualisationText.style.opacity = "1";
  } else {
    architectureText.style.transform = "translateY(0)";
    architectureText.style.opacity = "1";
    visualisationText.style.transform = "translateY(100%)";
    visualisationText.style.opacity = "0";
  }
  isArchitecture = !isArchitecture;
}

// Set the toggle to happen every 3 seconds (3000 milliseconds)
setInterval(toggleText, 3000);


