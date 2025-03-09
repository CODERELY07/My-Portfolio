document.addEventListener("DOMContentLoaded", function () {
    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    const sections = document.querySelectorAll("section");
    let currentIndex = 0;
    let isScrolling = false; // Prevents rapid scrolling

    // Smooth Scroll on Navbar Click
    document.querySelectorAll(".nav-link").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default anchor click behavior
            const targetId = this.getAttribute("href").substring(1); // Get the target section ID
            const targetElement = document.getElementById(targetId); // Get the target element

            if (targetElement) {
                // Find the index of the section we are clicking on
                currentIndex = Array.from(sections).indexOf(targetElement);

                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: "smooth"
                });
            }
        });
    });

    // Auto Scroll to Next or Previous Section on Mouse Scroll
    window.addEventListener("wheel", (event) => {
        if (isScrolling) return; // Prevents spam scrolling
        isScrolling = true;
    
        // Lower threshold to make it more sensitive
        if (event.deltaY > 3) { // Scroll Down (next section)
            currentIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else if (event.deltaY < -3) { // Scroll Up (previous section)
            currentIndex = Math.max(currentIndex - 1, 0);
        }
    
        // Scroll to the current section based on currentIndex
        sections[currentIndex].scrollIntoView({ behavior: "smooth" });
    
        // Reduce delay to allow faster consecutive scrolling
        setTimeout(() => {
            isScrolling = false;
        }, 500); // Reduced from 800ms to 500ms
    }, { passive: false });
    
});
