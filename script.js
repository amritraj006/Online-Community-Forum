document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById('sidebar');
    const toggleSidebar = document.getElementById('toggleSidebar');
    const closeSidebar = document.getElementById('closeSidebar');

    toggleSidebar.addEventListener('click', () => {
        sidebar.classList.toggle('open'); // Open/close sidebar
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('open'); // Close sidebar
    });

    // Slideshow Functionality
    let currentIndex = 0;
    const slides = document.querySelectorAll(".slide");
    let slideInterval;

    function changeSlide(direction) {
        slides[currentIndex].classList.remove("opacity-100");
        slides[currentIndex].classList.add("opacity-0");

        currentIndex = (currentIndex + direction + slides.length) % slides.length;

        slides[currentIndex].classList.remove("opacity-0");
        slides[currentIndex].classList.add("opacity-100");

        resetAutoSlide(); // Reset auto-slide timer after manual change
    }

    function autoSlide() {
        changeSlide(1);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, 3000);
    }

    // Start auto-slide on page load
    slideInterval = setInterval(autoSlide, 3000);

    // Attach event listeners to buttons
    document.getElementById("prev").addEventListener("click", () => changeSlide(-1));
document.getElementById("next").addEventListener("click", () => changeSlide(1));

});

document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const footer = document.querySelector("footer");
    const main = document.querySelector("main");
    const links = document.querySelectorAll("footer a"); // Select all links inside footer
    const header = document.querySelector("header");
    const sidebar = document.querySelector(".sidebar");

    // Check stored theme and apply
    if (localStorage.getItem("theme") === "dark") {
        footer.classList.add("dark-mode");
        main.classList.add("dark-mode");
        links.forEach(link => link.classList.add("dark-mode"));
        header.classList.add("dark-mode");
        sidebar.classList.add("dark-mode");
        themeToggle.textContent = "🌞"; // Set button text for Light Mode
    }

    themeToggle.addEventListener("click", () => {
        if (footer.classList.contains("dark-mode")) {
            footer.classList.remove("dark-mode");
            main.classList.remove("dark-mode");
            header.classList.remove("dark-mode");
            sidebar.classList.remove("dark-mode");
            links.forEach(link => link.classList.remove("dark-mode"));
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙"; // Change button to show "Dark Mode"
        } else {
            footer.classList.add("dark-mode");
            links.forEach(link => link.classList.add("dark-mode"));
            localStorage.setItem("theme", "dark");
            main.classList.add("dark-mode");
            header.classList.add("dark-mode");
            sidebar.classList.add("dark-mode");
            themeToggle.textContent = "🌞"; // Change button to show "Light Mode"
        }
    });
});

const searchButton = document.getElementById("searchButton");
const searchBox = document.getElementById("searchBox");

// Toggle search box visibility
searchButton.addEventListener("click", () => {
    searchBox.classList.toggle("hidden");
});

// Close search box when clicking outside
document.addEventListener("click", (event) => {
    if (!searchBox.contains(event.target) && !searchButton.contains(event.target)) {
        searchBox.classList.add("hidden");
    }
});

window.addEventListener("scroll", () => {

    let goto = document.querySelector(".goto");
    let footer = document.querySelector("footer"); 
    let footerTop = footer.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;

    if (window.scrollY > 220 && footerTop > windowHeight) {
        goto.style.display = "block";
    } else {
        goto.style.display = "none";
    }

});

document.querySelector(".goto").addEventListener("click", () => {
    document.getElementById("page1").scrollIntoView(
        {behavior: 'smooth'}
    );
})


document.querySelector(".Mathgroups").addEventListener("click", () => {
    let open = document.querySelector(".open1");
    if (open.classList.contains('hidden')) {
        open.classList.remove('hidden');
        open.classList.add('block');
    }
    else {
        open.classList.add('hidden');
        open.classList.remove('block');
    }
})

document.querySelector(".close1").addEventListener("click", () => {
    let open = document.querySelector(".open1");
    if (open.classList.contains('block')) {
        open.classList.add('hidden');
        open.classList.remove('block');
    }
})

document.querySelector(".WebDevGroup").addEventListener("click", () => {
    let open = document.querySelector(".open2");
    if (open.classList.contains('hidden')) {
        open.classList.remove('hidden');
        open.classList.add('block');
    }
    else {
        open.classList.add('hidden');
        open.classList.remove('block');
    }
})

document.querySelector(".close2").addEventListener("click", () => {
    let open = document.querySelector(".open2");
    if (open.classList.contains('block')) {
        open.classList.add('hidden');
        open.classList.remove('block');
    }
})

document.querySelector(".AIGroup").addEventListener("click", () => {
    let open = document.querySelector(".open3");
    if (open.classList.contains('hidden')) {
        open.classList.remove('hidden');
        open.classList.add('block');
    }
    else {
        open.classList.add('hidden');
        open.classList.remove('block');
    }
})

document.querySelector(".close3").addEventListener("click", () => {
    let open = document.querySelector(".open3");
    if (open.classList.contains('block')) {
        open.classList.add('hidden');
        open.classList.remove('block');
    }
})


function toggleArrow(id, up) {
    document.getElementById(id).textContent = up ? "⏶" : "⏷";
}

document.querySelectorAll(".group").forEach((item) => {
    let arrow = item.querySelector("span");

    item.addEventListener("mouseenter", () => toggleArrow(arrow.id, true));
    item.addEventListener("mouseleave", () => toggleArrow(arrow.id, false));
});