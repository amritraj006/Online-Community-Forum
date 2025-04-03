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

});


function toggleArrow(id, up) {
    document.getElementById(id).textContent = up ? "⏶" : "⏷";
}

document.querySelectorAll(".group").forEach((item) => {
    let arrow = item.querySelector("span");

    item.addEventListener("mouseenter", () => toggleArrow(arrow.id, true));
    item.addEventListener("mouseleave", () => toggleArrow(arrow.id, false));
});


