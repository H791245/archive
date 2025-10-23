// Jensen Huang Leadership Principles Interactive Features

// State management (using JavaScript variables instead of localStorage)
let expandedCards = new Set();
let activeSection = 'hero';
let isScrolling = false;

// DOM Elements
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const principleCards = document.querySelectorAll('.principle-card');
const sections = document.querySelectorAll('section');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializePrincipleCards();
    initializeScrollAnimations();
    initializeIntersectionObserver();
});

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update nav on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            isScrolling = true;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                updateActiveNavLink();
                updateNavBackground();
                isScrolling = false;
            }, 10);
        }
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.id;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            if (activeSection !== sectionId) {
                activeSection = sectionId;
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
}

// Update navigation background opacity on scroll
function updateNavBackground() {
    const scrolled = window.scrollY;
    const opacity = Math.min(scrolled / 100, 0.95);
    nav.style.backgroundColor = `rgba(10, 10, 10, ${opacity})`;
}

// Principle cards interactive functionality
function initializePrincipleCards() {
    principleCards.forEach(card => {
        card.addEventListener('click', function() {
            toggleCardDetails(this);
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCardDetails(this);
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-expanded', 'false');
    });
}

// Toggle card details visibility
function toggleCardDetails(card) {
    const cardId = card.getAttribute('data-id');
    const details = card.querySelector('.card-details');
    
    if (!details) return;
    
    const isExpanded = expandedCards.has(cardId);
    
    if (isExpanded) {
        // Collapse card
        details.classList.remove('visible');
        details.classList.add('hidden');
        expandedCards.delete(cardId);
        card.setAttribute('aria-expanded', 'false');
        
        // Add collapse animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    } else {
        // Expand card
        details.classList.remove('hidden');
        details.classList.add('visible');
        expandedCards.add(cardId);
        card.setAttribute('aria-expanded', 'true');
        
        // Add expand animation
        card.style.transform = 'scale(1.02)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Scroll card into view if needed
        setTimeout(() => {
            const cardRect = card.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (cardRect.bottom > windowHeight - 50) {
                card.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 200);
    }
}

// Scroll animations using Intersection Observer
function initializeScrollAnimations() {
    // Add staggered animation delays for principle cards
    const categories = document.querySelectorAll('.principle-category');
    
    categories.forEach(category => {
        const cards = category.querySelectorAll('.principle-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${(index * 0.1) + 0.2}s`;
        });
    });
    
    // Add animation delays for other elements
    const statCards = document.querySelectorAll('.stat-card-large');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${(index * 0.1) + 0.1}s`;
    });
    
    const quoteCards = document.querySelectorAll('.quote-card');
    quoteCards.forEach((card, index) => {
        card.style.animationDelay = `${(index * 0.15) + 0.1}s`;
    });
}

// Intersection Observer for fade-in animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.principle-card, .stat-card-large, .quote-card, .influence-card, .timeline-item'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    updateActiveNavLink();
}, 250));

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to collapse all expanded cards
    if (e.key === 'Escape') {
        expandedCards.forEach(cardId => {
            const card = document.querySelector(`[data-id="${cardId}"]`);
            if (card) {
                toggleCardDetails(card);
            }
        });
    }
    
    // Arrow keys for navigation between cards
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('principle-card')) {
            e.preventDefault();
            const allCards = Array.from(principleCards);
            const currentIndex = allCards.indexOf(focusedElement);
            
            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % allCards.length;
            } else {
                nextIndex = currentIndex === 0 ? allCards.length - 1 : currentIndex - 1;
            }
            
            allCards[nextIndex].focus();
        }
    }
});

// Print functionality
function printInfographic() {
    window.print();
}

// Add print button (optional)
const printButton = document.createElement('button');
printButton.textContent = 'Print Infographic';
printButton.className = 'print-btn';
printButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--color-primary);
    color: var(--color-background);
    border: none;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    z-index: 1000;
    transition: all 0.3s ease;
`;

printButton.addEventListener('click', printInfographic);
printButton.addEventListener('mouseenter', function() {
    this.style.background = 'var(--nvidia-green-light)';
});
printButton.addEventListener('mouseleave', function() {
    this.style.background = 'var(--color-primary)';
});

// Add print button to page
document.body.appendChild(printButton);

// Hide print button on mobile
if (window.innerWidth < 768) {
    printButton.style.display = 'none';
}

// Performance optimization: Throttle scroll events
let ticking = false;

function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateActiveNavLink();
            updateNavBackground();
            ticking = false;
        });
        ticking = true;
    }
}

// Replace the existing scroll event listener with throttled version
window.removeEventListener('scroll', updateOnScroll);
window.addEventListener('scroll', updateOnScroll, { passive: true });

// Analytics and tracking (placeholder for future implementation)
function trackCardExpansion(cardId) {
    // Track which principles users are most interested in
    console.log(`Card expanded: ${cardId}`);
}

function trackSectionView(sectionId) {
    // Track which sections users spend most time in
    console.log(`Section viewed: ${sectionId}`);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // Graceful degradation - ensure basic functionality still works
});

// Accessibility enhancements
function announceCardState(card, isExpanded) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-9999px';
    announcement.textContent = `Card ${isExpanded ? 'expanded' : 'collapsed'}: ${card.querySelector('.card-title').textContent}`;
    
    document.body.appendChild(announcement);
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Enhanced card toggle with accessibility
function toggleCardDetailsAccessible(card) {
    const cardId = card.getAttribute('data-id');
    const details = card.querySelector('.card-details');
    
    if (!details) return;
    
    const isExpanded = expandedCards.has(cardId);
    toggleCardDetails(card);
    announceCardState(card, !isExpanded);
}

// Update card event listeners to use accessible version
principleCards.forEach(card => {
    // Remove existing listeners and add new ones
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
    
    newCard.addEventListener('click', function() {
        toggleCardDetailsAccessible(this);
    });
    
    newCard.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCardDetailsAccessible(this);
        }
    });
});

console.log('Jensen Huang Leadership Principles app initialized successfully!');