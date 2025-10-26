// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
        }
    });
}, observerOptions);

// Observe all fade-in-up elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));
    
    // Animate numbers
    animateNumbers();
});

// Animate counting numbers
function animateNumbers() {
    const numberElements = document.querySelectorAll('.stat-value, .info-value');
    
    numberElements.forEach(element => {
        const text = element.textContent;
        
        // Check if it contains a number
        const numberMatch = text.match(/\d+/);
        if (numberMatch) {
            const targetNumber = parseInt(numberMatch[0]);
            const prefix = text.substring(0, text.indexOf(numberMatch[0]));
            const suffix = text.substring(text.indexOf(numberMatch[0]) + numberMatch[0].length);
            
            // Create observer for this element
            const numObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateNumber(element, 0, targetNumber, 1500, prefix, suffix);
                        numObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            numObserver.observe(element);
        }
    });
}

function animateNumber(element, start, end, duration, prefix = '', suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = prefix + Math.floor(current) + suffix;
    }, 16);
}

// Smooth scroll for navigation
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

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.8;
    }
});

// Add hover effects to cards
const cards = document.querySelectorAll('.comparison-card, .philosophy-card, .player-card, .implication-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

// Add dynamic color changes to cost comparison on hover
const costRows = document.querySelectorAll('.cost-row');
costRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
        const prices = this.querySelectorAll('.price');
        prices.forEach(price => {
            price.style.transform = 'scale(1.1)';
            price.style.transition = 'transform 0.3s ease';
        });
    });
    
    row.addEventListener('mouseleave', function() {
        const prices = this.querySelectorAll('.price');
        prices.forEach(price => {
            price.style.transform = 'scale(1)';
        });
    });
});

// Add pulse animation to important info boxes
const infoBoxes = document.querySelectorAll('.info-box');
const infoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'pulse 2s ease-in-out infinite';
        }
    });
}, { threshold: 0.5 });

infoBoxes.forEach(box => {
    infoObserver.observe(box);
});

// Add interactive hover effects for takeaway boxes
const takeawayBoxes = document.querySelectorAll('.takeaway-box');
takeawayBoxes.forEach((box, index) => {
    box.addEventListener('mouseenter', function() {
        this.querySelector('.takeaway-number').style.transform = 'scale(1.2) rotate(5deg)';
        this.querySelector('.takeaway-number').style.transition = 'transform 0.3s ease';
    });
    
    box.addEventListener('mouseleave', function() {
        this.querySelector('.takeaway-number').style.transform = 'scale(1) rotate(0deg)';
    });
});

// Log initialization
console.log('AI Geopolitics Infographic Initialized');
console.log('Interactive elements ready');
console.log('Scroll animations active');