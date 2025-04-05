document.addEventListener("DOMContentLoaded", function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileMenuOpenIcon = document.getElementById('mobileMenuOpenIcon');
    const mobileMenuCloseIcon = document.getElementById('mobileMenuCloseIcon');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');

    function toggleMobileMenu() {
        const isOpen = mobileNav.classList.toggle('hidden');
        mobileMenuOpenIcon.classList.toggle('hidden', !isOpen);
        mobileMenuCloseIcon.classList.toggle('hidden', isOpen);
        document.body.style.overflow = isOpen ? '' : 'hidden';
    }

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    mobileCloseBtn.addEventListener('click', toggleMobileMenu);

    // Mobile Dropdowns
    const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
    mobileDropdownBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const dropdownContent = this.nextElementSibling;
            const dropdownIcon = this.querySelector('.mobile-dropdown-icon');
            
            dropdownContent.classList.toggle('hidden');
            dropdownIcon.classList.toggle('rotate-180');
            
            // Close other open dropdowns
            document.querySelectorAll('.mobile-dropdown-content').forEach(content => {
                if (content !== dropdownContent && !content.classList.contains('hidden')) {
                    content.classList.add('hidden');
                    const otherIcon = content.previousElementSibling.querySelector('.mobile-dropdown-icon');
                    otherIcon.classList.remove('rotate-180');
                }
            });
        });
    });

    // Sidebar Functionality
    const toggleSidebar = document.getElementById('toggleSidebar');
    const mobileToggleSidebar = document.getElementById('mobileToggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function openSidebar() {
        sidebar.style.left = '0';
        sidebarOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        sidebarOverlay.style.opacity = '1';
        // Close mobile menu if open
        if (!mobileNav.classList.contains('hidden')) {
            toggleMobileMenu();
        }
    }

    function closeSidebarFunc() {
        sidebar.style.left = '-400px';
        sidebarOverlay.style.opacity = '0';
        setTimeout(() => {
            sidebarOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', (e) => {
            e.preventDefault();
            openSidebar();
        });
    }

    if (mobileToggleSidebar) {
        mobileToggleSidebar.addEventListener('click', (e) => {
            e.preventDefault();
            openSidebar();
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeSidebarFunc);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebarFunc);
    }

    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileNav.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        });
    });

    // Theme toggle (if needed)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
        });
    }
});