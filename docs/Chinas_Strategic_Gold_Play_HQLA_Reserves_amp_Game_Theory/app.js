// Animation and Interactivity Controller
class InfographicController {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupTimelineInteractions();
        this.setupHoverEffects();
        this.setupProgressBars();
    }

    setupScrollAnimations() {
        // Intersection Observer for fade-in animations
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

        // Observe all fade-in elements
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => observer.observe(el));

        // Observe sections for staggered animations
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            const cards = section.querySelectorAll('.metric-card, .motivation-card, .takeaway-item');
            cards.forEach((card, cardIndex) => {
                setTimeout(() => {
                    observer.observe(card);
                }, cardIndex * 100);
            });
        });
    }

    setupTimelineInteractions() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                this.showTimelineTooltip(e.target);
            });

            item.addEventListener('mouseleave', () => {
                this.hideTimelineTooltip();
            });

            item.addEventListener('click', (e) => {
                this.highlightTimelineItem(e.target);
            });
        });
    }

    showTimelineTooltip(item) {
        // Remove existing tooltip
        this.hideTimelineTooltip();

        const tooltip = document.createElement('div');
        tooltip.className = 'timeline-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <h4>${item.dataset.month}</h4>
                <p><strong>Total Holdings:</strong> ${item.dataset.tonnes} tonnes</p>
                <p><strong>Value:</strong> ${item.dataset.value}</p>
                <p><strong>Monthly Addition:</strong> +${item.dataset.add} tonnes</p>
            </div>
        `;

        // Style the tooltip
        Object.assign(tooltip.style, {
            position: 'absolute',
            background: 'var(--color-charcoal)',
            color: 'var(--color-white)',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '1000',
            pointerEvents: 'none',
            transform: 'translateX(-50%)',
            top: '-120px',
            left: '50%',
            minWidth: '200px',
            border: '2px solid var(--color-gold)'
        });

        item.style.position = 'relative';
        item.appendChild(tooltip);

        // Add entrance animation
        setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
            tooltip.style.transition = 'all 0.2s ease';
        }, 10);
    }

    hideTimelineTooltip() {
        const existingTooltip = document.querySelector('.timeline-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
    }

    highlightTimelineItem(item) {
        // Remove previous highlights
        document.querySelectorAll('.timeline-item').forEach(el => {
            el.classList.remove('highlighted');
        });

        // Add highlight to clicked item
        item.classList.add('highlighted');

        // Add CSS for highlight effect
        if (!document.querySelector('#dynamic-styles')) {
            const style = document.createElement('style');
            style.id = 'dynamic-styles';
            style.textContent = `
                .timeline-item.highlighted .timeline-marker {
                    background: var(--color-accent-red);
                    transform: scale(1.2);
                    box-shadow: 0 0 20px rgba(197, 48, 48, 0.5);
                }
                .timeline-item.highlighted {
                    transform: scale(1.1);
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupHoverEffects() {
        // Enhanced hover effects for cards
        const cards = document.querySelectorAll('.metric-card, .motivation-card, .scenario-card, .hqla-level');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.addCardHoverEffect(e.target);
            });

            card.addEventListener('mouseleave', (e) => {
                this.removeCardHoverEffect(e.target);
            });
        });

        // Network diagram interactions
        const countryNodes = document.querySelectorAll('.country-node');
        countryNodes.forEach(node => {
            node.addEventListener('click', () => {
                this.pulseNetworkEffect();
            });
        });
    }

    addCardHoverEffect(card) {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'hover-ripple';
        
        Object.assign(ripple.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
            borderRadius: 'inherit',
            opacity: '0',
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            zIndex: '1'
        });

        card.style.position = 'relative';
        card.appendChild(ripple);

        setTimeout(() => {
            ripple.style.opacity = '1';
        }, 10);
    }

    removeCardHoverEffect(card) {
        const ripple = card.querySelector('.hover-ripple');
        if (ripple) {
            ripple.style.opacity = '0';
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 300);
        }
    }

    pulseNetworkEffect() {
        const centralNode = document.querySelector('.central-node');
        const countryNodes = document.querySelectorAll('.country-node');

        // Pulse central node
        centralNode.style.animation = 'pulse 0.8s ease-in-out';
        
        // Stagger country node animations
        countryNodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.animation = 'pulse 0.6s ease-in-out';
            }, index * 100);
        });

        // Add pulse keyframes if not exist
        if (!document.querySelector('#pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'pulse-animation';
            style.textContent = `
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(212, 175, 55, 0.7); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }

        // Clear animations after completion
        setTimeout(() => {
            centralNode.style.animation = '';
            countryNodes.forEach(node => {
                node.style.animation = '';
            });
        }, 1200);
    }

    setupProgressBars() {
        // Animate HQLA level bars when they come into view
        const bars = document.querySelectorAll('.bar-fill');
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 500);
                }
            });
        }, { threshold: 0.5 });

        bars.forEach(bar => barObserver.observe(bar));
    }
}

// Utility functions for enhanced interactions
class Utils {
    static formatNumber(num) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(num);
    }

    static animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = this.formatNumber(current);
        }, 16);
    }

    static createParticleEffect(container, count = 20) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            Object.assign(particle.style, {
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: 'var(--color-gold)',
                borderRadius: '50%',
                opacity: '0.7',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: Math.random() * 2 + 's'
            });

            container.appendChild(particle);
        }

        // Add float animation
        if (!document.querySelector('#particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
                    50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        // Remove particles after animation
        setTimeout(() => {
            container.querySelectorAll('.particle').forEach(p => p.remove());
        }, 8000);
    }
}

// Enhanced scroll effects
class ScrollEffects {
    constructor() {
        this.setupParallax();
        this.setupScrollIndicator();
    }

    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    setupScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        
        Object.assign(indicator.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '0%',
            height: '4px',
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-gold))',
            zIndex: '9999',
            transition: 'width 0.1s ease'
        });

        document.body.appendChild(indicator);

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            indicator.style.width = scrollPercent + '%';
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InfographicController();
    new ScrollEffects();
    
    // Add particle effects to hero section
    setTimeout(() => {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            Utils.createParticleEffect(heroSection, 15);
        }
    }, 1000);

    // Animate metric values on scroll
    const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const valueEl = entry.target.querySelector('.metric-value');
                if (valueEl && !valueEl.dataset.animated) {
                    valueEl.dataset.animated = 'true';
                    const text = valueEl.textContent;
                    const number = parseFloat(text.replace(/[^0-9.]/g, ''));
                    if (!isNaN(number)) {
                        valueEl.textContent = '0';
                        Utils.animateCounter(valueEl, number, 1500);
                        setTimeout(() => {
                            valueEl.textContent = text; // Restore original format
                        }, 1600);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.metric-card').forEach(card => {
        metricObserver.observe(card);
    });

    console.log('🏆 China Gold Reserves Infographic Loaded Successfully!');
});