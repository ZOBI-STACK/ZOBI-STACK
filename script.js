// ===================================
// Navigation Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// Mobile Menu Toggle
// ===================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Animated Counter for Stats
// ===================================
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            animateCounter(statNumber);
            statsObserver.unobserve(statNumber);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// Scroll Reveal Animation
// ===================================
const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .team-member, .about-content, .about-image, .contact-info, .contact-form-wrapper');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// ===================================
// Active Navigation Link Based on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', highlightNav);

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Show success message (in a real application, you would send this to a server)
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
});

// ===================================
// Newsletter Form Handling
// ===================================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            newsletterForm.reset();
        }
    });
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================================
// Portfolio Item Click Handler
// ===================================
const portfolioLinks = document.querySelectorAll('.portfolio-link');

portfolioLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Portfolio detail page coming soon!', 'success');
    });
});

// ===================================
// Parallax Effect for Hero Background
// ===================================
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Loading Animation
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('animated');
    }
});

// ===================================
// Add Floating Animation to Service Icons
// ===================================
const serviceIcons = document.querySelectorAll('.service-icon');

serviceIcons.forEach((icon, index) => {
    icon.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
});

// ===================================
// Cursor Trail Effect (Optional Enhancement)
// ===================================
let mouseX = 0;
let mouseY = 0;
let cursorCircle = null;

// Create cursor circle
if (window.innerWidth > 768) {
    cursorCircle = document.createElement('div');
    cursorCircle.className = 'custom-cursor';
    document.body.appendChild(cursorCircle);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (cursorCircle) {
            cursorCircle.classList.add('active');
            cursorCircle.style.left = mouseX - 10 + 'px';
            cursorCircle.style.top = mouseY - 10 + 'px';
        }
    });

    // Scale cursor on clickable elements
    const clickableElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
    
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (cursorCircle) {
                cursorCircle.classList.add('scaled');
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (cursorCircle) {
                cursorCircle.classList.remove('scaled');
            }
        });
    });
}

// ===================================
// Console Message
// ===================================
console.log('%c Quadnex Technologies ', 'background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%); color: white; padding: 10px 20px; font-size: 20px; font-weight: bold;');
console.log('%c Transforming ideas into innovative digital solutions ', 'color: #6366f1; font-size: 14px;');
console.log('%c Website developed with ❤️ by Quadnex Technologies ', 'color: #94a3b8; font-size: 12px;');

// ===================================
// Performance Optimization: Lazy Loading Images
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearElement = document.getElementById('footer-copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = `© ${currentYear} Quadnex Technologies. All rights reserved.`;
    }

    // Initialize all animations and interactions
    console.log('Quadnex Technologies website initialized successfully!');
});
