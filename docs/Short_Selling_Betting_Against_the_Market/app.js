// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initProcessStepAnimations();
    initProfitBadgeClicks();
    initScrollAnimations();
    initTimelineObserver();
});

// Animate process steps on hover
function initProcessStepAnimations() {
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach((step, index) => {
        // Add initial animation delay
        step.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover effect with scale
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Handle profit badge clicks to show/hide details
function initProfitBadgeClicks() {
    const profitBadges = document.querySelectorAll('.profit-badge.clickable');
    
    profitBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const detailsId = this.getAttribute('data-details');
            const detailsPopup = document.getElementById('details-' + detailsId);
            
            // Close all other popups first
            document.querySelectorAll('.details-popup').forEach(popup => {
                if (popup.id !== 'details-' + detailsId) {
                    popup.classList.remove('active');
                }
            });
            
            // Toggle current popup
            if (detailsPopup) {
                detailsPopup.classList.toggle('active');
                
                // Add pulse effect to badge
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
}

// Smooth scroll animations for sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and principles
    const animatedElements = document.querySelectorAll(
        '.bessent-card, .principle-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Timeline item observer for staggered animations
function initTimelineObserver() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    timelineItems.forEach((item, index) => {
        observer.observe(item);
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / hero.offsetHeight);
    }
});

// Add click outside to close popups
document.addEventListener('click', function(event) {
    const isClickInsideBadge = event.target.closest('.profit-badge');
    const isClickInsidePopup = event.target.closest('.details-popup');
    
    if (!isClickInsideBadge && !isClickInsidePopup) {
        document.querySelectorAll('.details-popup').forEach(popup => {
            popup.classList.remove('active');
        });
    }
});

// Add hover effect to timeline items
const timelineContents = document.querySelectorAll('.timeline-content');
timelineContents.forEach(content => {
    content.addEventListener('mouseenter', function() {
        const marker = this.parentElement.querySelector('.timeline-marker');
        if (marker) {
            marker.style.transform = 'scale(1.1) rotate(5deg)';
            marker.style.transition = 'transform 0.3s ease';
        }
    });
    
    content.addEventListener('mouseleave', function() {
        const marker = this.parentElement.querySelector('.timeline-marker');
        if (marker) {
            marker.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Add interactive hover to Bessent cards
const bessentCards = document.querySelectorAll('.bessent-card');
bessentCards.forEach((card, index) => {
    // Stagger animation on load
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);
    
    // Add 3D tilt effect on hover
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Add pulse animation to warning box
const warningBox = document.querySelector('.warning-box');
if (warningBox) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 2s ease-in-out';
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(warningBox);
}

// Add CSS animation for pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
`;
document.head.appendChild(style);

// Enhanced example box interaction
const exampleSteps = document.querySelectorAll('.example-step');
exampleSteps.forEach((step, index) => {
    setTimeout(() => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
        }, 100);
    }, index * 150);
    
    step.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px) scale(1.02)';
    });
    
    step.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// Add principle card entrance animations
const principleCards = document.querySelectorAll('.principle-card');
const principleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.3 });

principleCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    principleObserver.observe(card);
});

// Log initialization
console.log('Short Selling Infographic Initialized');
console.log('Interactive features loaded successfully');