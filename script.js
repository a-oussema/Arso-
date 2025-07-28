document.addEventListener('DOMContentLoaded', () => {

    // 1. INITIALIZE ANIMATE ON SCROLL (AOS)
    // ==========================================
    AOS.init({
        duration: 800,      // Animation duration in ms
        once: true,         // Animate elements only once
        offset: 50,         // Trigger animations a little early
        easing: 'ease-in-out',
    });

    // 2. THEME SWITCHER LOGIC
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeToggle.checked = true;
        }
    }

    // Handle theme change
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 3. MOBILE NAVIGATION TOGGLE
    // ==========================================
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu'); // New: Target the mobile menu container
    const navLinksContainer = document.querySelector('.nav__links'); // Still used for click outside detection
    const navLinks = document.querySelectorAll('.nav__link'); // Desktop links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav__link'); // New: Mobile menu links
    const body = document.body;

    // Toggle nav menu visibility
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        
        mobileMenu.hidden = isExpanded; // Toggle hidden attribute
        hamburger.classList.toggle('open'); // For hamburger animation
        body.classList.toggle('nav-active'); // For body scroll lock and main nav display
    });

    // Close menu when a link is clicked (for both desktop and mobile if applicable)
    // Updated to include mobileNavLinks
    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.addEventListener('click', () => {
            if (body.classList.contains('nav-active')) {
                body.classList.remove('nav-active');
                hamburger.setAttribute('aria-expanded', 'false'); // Reset aria-expanded
                hamburger.classList.remove('open'); // Close hamburger animation
                mobileMenu.hidden = true; // Hide mobile menu
            }
        });
    });

    // Close menu when clicking outside of it
    // Note: This logic needs careful consideration if mobileMenu is separate from navLinksContainer
    body.addEventListener('click', (e) => {
        // Check if the body has 'nav-active' AND the click is NOT inside hamburger AND is NOT inside mobileMenu
        if (body.classList.contains('nav-active') && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            body.classList.remove('nav-active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.classList.remove('open');
            mobileMenu.hidden = true;
        }
    });

    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});