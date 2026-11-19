
/* ========================================
   BALANCEYOURTIME. — LANDING PAGE SCRIPT
======================================== */


/* ========================================
   MOBILE NAVIGATION
======================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

    });


    // Close the menu after clicking a navigation link

    const navigationItems = navLinks.querySelectorAll("a");

    navigationItems.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });


    // Close the menu when clicking outside it

    document.addEventListener("click", (event) => {

        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

}


/* ========================================
   AUTOMATIC COPYRIGHT YEAR
======================================== */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}
