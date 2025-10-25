// Progress Bar
function updateProgressBar() {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
}

window.addEventListener('scroll', updateProgressBar);

// Scroll Animation Observer
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

// Observe all animated elements
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(element => {
    observer.observe(element);
});

// Truth Card Expansion
const truthCards = document.querySelectorAll('.truth-card');

truthCards.forEach(card => {
    const expandBtn = card.querySelector('.expand-btn');
    
    expandBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close other expanded cards
        truthCards.forEach(otherCard => {
            if (otherCard !== card && otherCard.classList.contains('expanded')) {
                otherCard.classList.remove('expanded');
            }
        });
        
        // Toggle current card
        card.classList.toggle('expanded');
    });
    
    // Also allow clicking the entire card to expand
    card.addEventListener('click', () => {
        // Close other expanded cards
        truthCards.forEach(otherCard => {
            if (otherCard !== card && otherCard.classList.contains('expanded')) {
                otherCard.classList.remove('expanded');
            }
        });
        
        // Toggle current card
        card.classList.toggle('expanded');
    });
});

// Smooth scroll for better UX
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

// Add hover effect to stat cards with enhanced animation
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Slight pulse animation on number
        const number = card.querySelector('.stat-number');
        number.style.transform = 'scale(1.1)';
        setTimeout(() => {
            number.style.transform = 'scale(1)';
        }, 200);
    });
});

// Add transition to stat numbers
statCards.forEach(card => {
    const number = card.querySelector('.stat-number');
    number.style.transition = 'transform 0.2s ease';
});

// Initialize on page load
window.addEventListener('load', () => {
    updateProgressBar();
});

// Add keyboard accessibility for expand buttons
truthCards.forEach(card => {
    const expandBtn = card.querySelector('.expand-btn');
    
    expandBtn.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            expandBtn.click();
        }
    });
});

// Horizontal scroll indicator for stats section (mobile)
const statsScrollContainer = document.querySelector('.stats-scroll-container');
if (statsScrollContainer) {
    let isScrolling;
    
    statsScrollContainer.addEventListener('scroll', () => {
        // Clear timeout on scroll
        window.clearTimeout(isScrolling);
        
        // Add scrolling class
        statsScrollContainer.classList.add('is-scrolling');
        
        // Set timeout to remove class after scrolling stops
        isScrolling = setTimeout(() => {
            statsScrollContainer.classList.remove('is-scrolling');
        }, 150);
    });
}