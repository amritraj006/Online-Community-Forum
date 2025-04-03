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


