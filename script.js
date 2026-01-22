// Loading Animation
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1000);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scroll for Nav Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        // Close mobile menu
        navLinks.classList.remove('active');
    });
});

// Scroll Indicator
const scrollIndicator = document.getElementById('scrollIndicator');
const scrollDots = document.querySelectorAll('.scroll-dot');
const sections = document.querySelectorAll('.section');

// Add hero to sections for scroll indicator
const heroSection = document.querySelector('.hero');
const allSections = [heroSection, ...sections];

scrollDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        allSections[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Update active scroll dot on scroll
window.addEventListener('scroll', () => {
    let current = '';

    allSections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.id || 'hero';
        }
    });

    scrollDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.dataset.section === current) {
            dot.classList.add('active');
        }
    });

    // Update nav active state
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Add fade-in class to sections initially
document.querySelectorAll('.section').forEach((section, index) => {
    if (index % 2 === 0) {
        section.classList.add('fade-in-left');
    } else {
        section.classList.add('fade-in-right');
    }
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real application, you would send the form data to a server
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Enhanced scroll animations with parallax
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Add parallax effect to hero background
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});