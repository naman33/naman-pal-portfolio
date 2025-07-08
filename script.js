// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('portfolio-theme') || 'light';
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        this.applyTheme();
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    applyTheme() {
        if (this.theme === 'dark') {
            document.body.classList.add('dark');
            this.themeToggle.innerHTML = '<span class="theme-icon">☀️</span>';
        } else {
            document.body.classList.remove('dark');
            this.themeToggle.innerHTML = '<span class="theme-icon">🌙</span>';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('portfolio-theme', this.theme);
        this.applyTheme();
    }
}

// Typewriter Effect for Rotating Text
class TypewriterEffect {
    constructor() {
        this.texts = ["Tech Explorer", "Problem Solver", "Data Scientist", "Code Enthusiast"];
        this.currentIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 2000;
        this.element = document.getElementById('rotatingText');
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const fullText = this.texts[this.currentIndex];
        
        if (this.isDeleting) {
            this.currentText = fullText.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = fullText.substring(0, this.currentText.length + 1);
        }

        this.element.textContent = this.currentText;

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.currentText === fullText) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentIndex = (this.currentIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = Array.from(this.navLinks).map(link => 
            document.getElementById(link.getAttribute('data-section'))
        );
        this.init();
    }

    init() {
        // Add click listeners for smooth scrolling
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('data-section');
                this.scrollToSection(sectionId);
            });
        });

        // Add scroll listener for active section highlighting
        window.addEventListener('scroll', () => this.updateActiveSection());
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    updateActiveSection() {
        const scrollPosition = window.scrollY + 100;

        for (let i = this.sections.length - 1; i >= 0; i--) {
            const section = this.sections[i];
            if (section && section.offsetTop <= scrollPosition) {
                this.setActiveLink(i);
                break;
            }
        }
    }

    setActiveLink(index) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        if (this.navLinks[index]) {
            this.navLinks[index].classList.add('active');
        }
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.card, .skill-card, .project-card');
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                        entry.target.classList.add('animate-fade-in');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.animatedElements.forEach(el => observer.observe(el));
    }
}

// Global scroll function for buttons
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme manager
    new ThemeManager();
    
    // Initialize typewriter effect
    new TypewriterEffect();
    
    // Initialize navigation
    new NavigationManager();
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Add mobile menu button if screen is small
    if (window.innerWidth <= 767) {
        const navContainer = document.querySelector('.nav-container');
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            color: inherit;
        `;
        mobileMenuBtn.onclick = toggleMobileMenu;
        
        // Insert before theme toggle
        const themeToggle = document.getElementById('themeToggle');
        navContainer.insertBefore(mobileMenuBtn, themeToggle);
    }
    
    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Handle mobile menu visibility on resize
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth > 767) {
        navMenu.classList.remove('active');
    }
});

// Prevent FOUC (Flash of Unstyled Content)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});