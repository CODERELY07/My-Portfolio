
document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    const socialIcons = document.querySelectorAll(".social-icon");

    function updateIcons() {
        if (htmlElement.getAttribute("data-bs-theme") === "dark") {
            socialIcons.forEach(icon => icon.classList.replace("text-dark", "text-light"));
        } else {
            socialIcons.forEach(icon => icon.classList.replace("text-light", "text-dark"));
        }
    }

    // Set default theme
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "dark");
    }

    // Apply stored theme
    if (localStorage.getItem("theme") === "dark") {
        htmlElement.setAttribute("data-bs-theme", "dark");
    } else {
        htmlElement.setAttribute("data-bs-theme", "light");
    }
    updateIcons();

    // Toggle theme on button click
    themeToggle.addEventListener("click", function () {
        if (htmlElement.getAttribute("data-bs-theme") === "light") {
            htmlElement.setAttribute("data-bs-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            htmlElement.setAttribute("data-bs-theme", "light");
            localStorage.setItem("theme", "light");
        }
        updateIcons();
    });
    
    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    const sections = document.querySelectorAll("section");
    let currentIndex = 0;
    let isScrolling = false; 

    // Smooth Scroll on Navbar Click
    document.querySelectorAll(".nav-link").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId); 

            if (targetElement) {
                currentIndex = Array.from(sections).indexOf(targetElement);

                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: "smooth"
                });
            }
        });
    });

    if (window.innerWidth > 768) { // Only run script if screen width is greater than 768px
        let isScrolling = false;
        let currentIndex = 0;
        const sections = document.querySelectorAll("section");
    
        window.addEventListener("wheel", (event) => {
            if (isScrolling) return;
            isScrolling = true;
    
            if (event.deltaY > 3) {
                currentIndex = Math.min(currentIndex + 1, sections.length - 1);
            } else if (event.deltaY < -3) {
                currentIndex = Math.max(currentIndex - 1, 0);
            }
    
            sections[currentIndex].scrollIntoView({ behavior: "smooth" });
    
            setTimeout(() => {
                isScrolling = false;
            }, 500);
        }, { passive: false });
    }
    
});
