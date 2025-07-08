
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
            this.themeToggle.innerHTML = `
                <span class="theme-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="5"></circle>
                        <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                    </svg>
                </span>
            `;
        } else {
            document.body.classList.remove('dark');
            this.themeToggle.innerHTML = `
                <span class="theme-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </span>
            `;
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

// Contact Form Management
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Simulate form submission (replace with actual service like Formspree)
        try {
            // Show loading state
            const submitBtn = this.form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" class="spinner"/></svg>Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.form.reset();
            
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        } catch (error) {
            this.showMessage('Failed to send message. Please try again or contact me directly.', 'error');
            console.error('Form submission error:', error);
        }
    }

    showMessage(message, type) {
        // Create and show notification
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
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

// Mobile menu toggle
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
    
    // Initialize contact form
    new ContactFormManager();
    
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
            transition: all 0.3s ease;
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
    
    // Add animation styles for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
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
