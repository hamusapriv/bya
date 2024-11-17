document.addEventListener("DOMContentLoaded", () => {
  // Load the navbar HTML
  fetch("/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      setTimeout(() => {
        const navbarLinks = document.querySelector(".navbar-links");
        const links = document.querySelectorAll(".navbar-links a");
        const navbarToggle = document.querySelector(".navbar-toggle");
        const navbarMenu = document.querySelector(".navbar-menu");

        if (
          !navbarLinks ||
          links.length === 0 ||
          !navbarToggle ||
          !navbarMenu
        ) {
          console.error("Navbar elements not found!");
          return;
        }

        // Function to normalize paths
        const normalizePath = (path) => {
          return path.replace(/\/index\.html$/, "/").replace(/\/$/, "");
        };

        // Function to update underline position and width
        const updateUnderline = (link) => {
          // Skip underline logic for screens smaller than 768px
          if (window.innerWidth < 768) return;

          const rect = link.getBoundingClientRect();
          const navbarRect = navbarLinks.getBoundingClientRect();
          const left = rect.left - navbarRect.left;
          const width = rect.width;

          navbarLinks.style.setProperty("--hover-left", `${left}px`);
          navbarLinks.style.setProperty("--hover-width", `${width}px`);
        };

        // Identify the active link
        const currentPath = normalizePath(window.location.pathname);
        const activeLink = Array.from(links).find(
          (link) => normalizePath(link.getAttribute("href")) === currentPath
        );

        if (activeLink) {
          updateUnderline(activeLink);
          activeLink.classList.add("active");
        }

        // Add hover effect for links
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

        // Toggle navbar menu and hamburger icon
        navbarToggle.addEventListener("click", () => {
          const isOpen = navbarMenu.classList.toggle("open");
          navbarToggle.classList.toggle("open", isOpen); // Sync toggle button state with menu
        });

        // Close menu when a link is clicked (better UX)
        links.forEach((link) => {
          link.addEventListener("click", () => {
            navbarMenu.classList.remove("open");
            navbarToggle.classList.remove("open");
          });
        });

        // Handle window resize for responsive behavior
        window.addEventListener("resize", () => {
          if (window.innerWidth >= 768) {
            navbarMenu.classList.remove("open");
            navbarToggle.classList.remove("open");
          }
        });
      }, 100); // Slight delay to ensure DOM is updated
    })
    .catch((error) => console.error("Error loading navbar:", error));
});
