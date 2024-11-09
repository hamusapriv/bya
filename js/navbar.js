document.addEventListener("DOMContentLoaded", () => {
  // Load the navbar HTML
  fetch("/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      // Delay logic until the navbar is fully loaded into the DOM
      setTimeout(() => {
        // Selectors
        const navbarLinks = document.querySelector(".navbar-links");
        const links = document.querySelectorAll(".navbar-links a");

        if (!navbarLinks || links.length === 0) {
          console.error("Navbar links not found!");
          return;
        }

        // Function to normalize paths
        const normalizePath = (path) => {
          return path.replace(/\/index\.html$/, "/").replace(/\/$/, "");
        };

        // Function to update underline position and width
        const updateUnderline = (link) => {
          const rect = link.getBoundingClientRect();
          const navbarRect = navbarLinks.getBoundingClientRect();
          const left = rect.left - navbarRect.left;
          const width = rect.width;

          // Update CSS custom properties for the underline
          navbarLinks.style.setProperty("--hover-left", `${left}px`);
          navbarLinks.style.setProperty("--hover-width", `${width}px`);
        };

        // Identify the active link
        const currentPath = normalizePath(window.location.pathname);
        const activeLink = Array.from(links).find(
          (link) => normalizePath(link.getAttribute("href")) === currentPath
        );

        // Ensure underline starts on the active link
        if (activeLink) {
          updateUnderline(activeLink);
          activeLink.classList.add("active");
        }

        // Add hover effect
        links.forEach((link) => {
          link.addEventListener("mouseenter", () => {
            updateUnderline(link);
          });
        });

        // Reset underline to active link when mouse leaves navbar-links
        navbarLinks.addEventListener("mouseleave", () => {
          if (activeLink) {
            updateUnderline(activeLink);
          }
        });
      }, 100); // Slight delay to ensure DOM is updated
    })
    .catch((error) => console.error("Error loading navbar:", error));
});
