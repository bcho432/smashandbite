// Order Modal Functionality
const orderModal = document.getElementById('order-modal');
const orderNowBtn = document.getElementById('order-now-btn');
const orderModalClose = document.querySelector('.order-modal-close');

// Open modal when ORDER NOW is clicked
orderNowBtn.addEventListener('click', () => {
    orderModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

// Close modal when X is clicked
orderModalClose.addEventListener('click', () => {
    orderModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === orderModal) {
        orderModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && orderModal.style.display === 'block') {
        orderModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Function to confirm and redirect to delivery platform
function confirmAndRedirect(url, platform) {
    const message = `You're about to be redirected to ${platform}.\n\nMake sure to change the pickup time!\n\nClick OK to continue.`;
    
    if (confirm(message)) {
        window.open(url, '_blank');
        // Close the modal after redirecting
        orderModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(220, 38, 38, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Prefill form fields from URL query parameters
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const name = params.get('name');
    const message = params.get('message');

    if (email) document.querySelector('input[name="email"]').value = email;
    if (name) document.querySelector('input[name="name"]').value = name;
    if (message) document.querySelector('textarea[name="message"]').value = message;
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.querySelector('input[name="name"]').value;
            const email = document.getElementById('email-input').value;
            const message = document.getElementById('message-input').value;
            const subject = encodeURIComponent('New Message from Smash & Bite Website');
            // Add two new lines after the email for separation
            const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage: ${message}`);
            window.location.href = `mailto:smashandbite25@gmail.com?subject=${subject}&body=${body}`;
        });
    }
});

// Notification system with red theme
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    const bgColor = '#dc2626';
    const textColor = '#ffffff';

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: ${textColor};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 25px rgba(220, 38, 38, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        border: 1px solid rgba(220, 38, 38, 0.2);
    `;

    document.body.appendChild(notification);
    setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 100);

    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.menu-item, .feature, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Hover effect for menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 20px 50px rgba(220, 38, 38, 0.3)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.3)';
    });
});

// Lazy load image fade-in (excluding hero and about slideshow images)
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img:not(.hero-slide-image):not(.about-slide-image)');
    images.forEach(img => {
        img.addEventListener('load', function () {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Initialize Slick carousel for about section
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Slick carousel
    $('.about-slick-carousel').slick({
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: true,
        fade: false,
        cssEase: 'ease-in-out',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    dots: true
                }
            }
        ]
    });
});

// Burger icon glow
document.addEventListener('DOMContentLoaded', () => {
    const burgerIcons = document.querySelectorAll('.burger-showcase');
    if (burgerIcons.length > 0) {
        setInterval(() => {
            burgerIcons.forEach(icon => {
                icon.style.filter = 'drop-shadow(0 0 60px #ff2d2d)';
            });
            setTimeout(() => {
                burgerIcons.forEach(icon => {
                    icon.style.filter = 'drop-shadow(0 0 30px #ff2d2d)';
                });
            }, 1000);
        }, 3000);
    }
});

// Typewriter effect for hero title
function typeWriterLoop(element, text, speed = 100, pause = 1200) {
    let i = 0;
    let isErasing = false;

    function type() {
        if (!isErasing && i <= text.length) {
            element.innerHTML = text.substring(0, i);
            i++;
            if (i > text.length) {
                setTimeout(() => {
                    isErasing = true;
                    type();
                }, pause);
            } else {
                setTimeout(type, speed);
            }
        } else if (isErasing && i >= 0) {
            element.innerHTML = text.substring(0, i);
            i--;
            if (i < 0) {
                isErasing = false;
                setTimeout(type, speed);
            } else {
                setTimeout(type, speed / 2);
            }
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriterLoop(heroTitle, originalText, 150, 1200);
    }
});

// Particle effect for hero
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #dc2626;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.6;
    `;

    const hero = document.querySelector('.hero');
    if (hero) {
        hero.appendChild(particle);

        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        const endX = startX + (Math.random() - 0.5) * 200;
        const endY = -10;
        const duration = 3000 + Math.random() * 2000;

        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';

        const startTime = Date.now();

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;

            if (progress < 1) {
                const currentX = startX + (endX - startX) * progress;
                const currentY = startY + (endY - startY) * progress;

                particle.style.left = currentX + 'px';
                particle.style.top = currentY + 'px';
                particle.style.opacity = 0.6 * (1 - progress);

                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }

        requestAnimationFrame(animate);
    }
}

setInterval(createParticle, 200);

// Touch/swipe and keyboard support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        console.log(diff > 0 ? 'Swiped left' : 'Swiped right');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.querySelectorAll('.notification').forEach(n => n.remove());
    }
});

// Hero slideshow functionality
let currentHeroSlideIndex = 0;
let heroSlides = [];

function showHeroSlide(index) {
    // console.log('Showing hero slide:', index);
    
    // Hide all hero slides
    heroSlides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.zIndex = '1';
    });
    
    // Show current hero slide
    if (heroSlides[index]) {
        heroSlides[index].classList.add('active');
        heroSlides[index].style.opacity = '1';
        heroSlides[index].style.zIndex = '10';
        // console.log('Activated slide:', index);
    } else {
        console.error('Slide not found at index:', index);
    }
    
    currentHeroSlideIndex = index;
}

function nextHeroSlide() {
    let newIndex = currentHeroSlideIndex + 1;
    
    if (newIndex >= heroSlides.length) {
        newIndex = 0;
    }
    
    // console.log('Moving to next slide:', newIndex);
    showHeroSlide(newIndex);
}

// Initialize hero slideshow
document.addEventListener('DOMContentLoaded', () => {
    heroSlides = document.querySelectorAll('.hero-slide');
    
    // console.log('Found hero slides:', heroSlides.length);
    
    // Debug: Check each slide and image
    heroSlides.forEach((slide, index) => {
        const img = slide.querySelector('.hero-slide-image');
        // console.log(`Slide ${index}:`, slide);
        // console.log(`Slide ${index} image:`, img);
        // if (img) {
            // console.log(`Slide ${index} image src:`, img.src);
            // console.log(`Slide ${index} image loaded:`, img.complete);
            
            // Add load event listener to debug image loading
        //     img.addEventListener('load', () => {
        //         console.log(`Slide ${index} image loaded successfully`);
        //     });
            
        //     img.addEventListener('error', () => {
        //         console.error(`Slide ${index} image failed to load:`, img.src);
        //     });
        // }
    });
    
    if (heroSlides.length > 0) {
        // Force first slide to be visible immediately
        const firstSlide = heroSlides[0];
        const firstImage = firstSlide.querySelector('.hero-slide-image');
        
        if (firstImage) {
            firstSlide.style.opacity = '1';
            firstSlide.style.zIndex = '10';
            firstSlide.classList.add('active');
            // console.log('Forced first slide to be visible');
            
            // Check if image is loaded
            // if (firstImage.complete) {
            //     console.log('First image is already loaded');
            // } else {
            //     console.log('First image is still loading...');
            //     firstImage.addEventListener('load', () => {
            //         console.log('First image loaded successfully');
            //     });
            // }
        }
        
        // Initialize first slide
        showHeroSlide(0);
        
        // Auto-advance hero slides every 3 seconds (faster for testing)
        setInterval(() => {
            nextHeroSlide();
        }, 3000);
        
        // console.log('Slideshow initialized successfully');
    } 
});

// Logo visibility fix
function ensureLogoVisible() {
    const logo = document.querySelector('.nav-logo .logo');
    if (logo) {
        logo.style.display = 'block';
        logo.style.visibility = 'visible';
        logo.style.opacity = '1';
    }
}

// Run the logo fix every 100ms
setInterval(ensureLogoVisible, 100);

// Also run it when the page loads
document.addEventListener('DOMContentLoaded', ensureLogoVisible);




 