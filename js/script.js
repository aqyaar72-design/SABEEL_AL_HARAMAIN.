document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.getElementById("navMenu");

    if (!menuBtn || !navMenu) {
        console.error("Mobile menu lama helin.");
        return;
    }

    menuBtn.addEventListener("click", function () {

        navMenu.classList.toggle("open");

        if (navMenu.classList.contains("open")) {
            menuBtn.textContent = "✕";
            menuBtn.setAttribute("aria-label", "Xir liiska");
        } else {
            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-label", "Fur liiska");
        }

    });

    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {
            navMenu.classList.remove("open");
            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-label", "Fur liiska");
        });

    });

});