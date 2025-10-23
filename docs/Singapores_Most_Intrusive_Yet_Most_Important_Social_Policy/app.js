// Intersection Observer for fade-in animations
class AnimationController {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupCounterAnimations();
    this.setupHoverEffects();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseFloat(entry.target.dataset.delay) || 0;
          
          setTimeout(() => {
            entry.target.classList.add('visible');
            
            // Trigger specific animations based on element type
            this.handleSpecificAnimations(entry.target);
          }, delay * 1000);
        }
      });
    }, this.observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
  }

  handleSpecificAnimations(element) {
    // Animate demographic bars
    if (element.classList.contains('quota-grid')) {
      this.animateDemographicBars();
    }
    
    // Animate counters
    if (element.querySelector('.big-number, .stat-number, .casualty-number')) {
      this.animateCounters(element);
    }
  }

  animateDemographicBars() {
    const bars = document.querySelectorAll('.demographic-bar');
    bars.forEach((bar, index) => {
      setTimeout(() => {
        bar.style.opacity = '1';
        const percentage = parseFloat(bar.dataset.percentage);
        if (percentage) {
          bar.style.setProperty('--bar-width', `${percentage}%`);
        }
      }, index * 200);
    });
  }

  animateCounters(container) {
    const counters = container.querySelectorAll('.big-number, .stat-number, .casualty-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
      if (isNaN(target)) return;
      
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '');
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + (counter.textContent.includes('%') ? '%' : '');
        }
      };
      
      updateCounter();
    });
  }

  setupScrollAnimations() {
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Parallax effect for hero section
    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.hero-section');
      
      if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
      }
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  setupCounterAnimations() {
    // Enhanced counter animations with easing
    const easeOutQuart = (t) => 1 - (--t) * t * t * t;
    
    const animateValue = (element, start, end, duration, suffix = '') => {
      const startTimestamp = performance.now();
      
      const step = (timestamp) => {
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(start + (end - start) * easedProgress);
        
        element.textContent = current.toLocaleString() + suffix;
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      
      requestAnimationFrame(step);
    };

    // Store original values for reuse
    this.counterElements = new Map();
    document.querySelectorAll('.big-number, .stat-number').forEach(el => {
      const text = el.textContent.trim();
      const number = parseInt(text.replace(/[^0-9]/g, ''));
      const suffix = text.replace(/[0-9]/g, '').replace(/,/g, '');
      
      if (!isNaN(number)) {
        this.counterElements.set(el, { number, suffix });
      }
    });
  }

  setupHoverEffects() {
    // Enhanced hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      '.stat-card, .takeaway-card, .process-step, .integration-item, .comparison-item'
    );

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.style.transform = 'translateY(-8px) scale(1.02)';
        element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translateY(0) scale(1)';
        element.style.boxShadow = '';
      });
    });

    // Add ripple effect to cards
    this.addRippleEffect();
  }

  addRippleEffect() {
    const cards = document.querySelectorAll('.stat-card, .takeaway-card, .info-card');
    
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
          z-index: 1;
        `;
        
        // Ensure card has relative positioning
        if (getComputedStyle(card).position === 'static') {
          card.style.position = 'relative';
        }
        card.style.overflow = 'hidden';
        
        card.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
    
    // Add ripple animation CSS if it doesn't exist
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Progress indicator
class ProgressIndicator {
  constructor() {
    this.createProgressBar();
    this.setupScrollProgress();
  }

  createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #3b82f6, #14b8a6);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
  }

  setupScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      progressBar.style.width = Math.min(progress, 100) + '%';
    });
  }
}

// Theme controller (for future dark/light mode toggle)
class ThemeController {
  constructor() {
    this.theme = 'dark'; // Default to dark theme without localStorage
    this.applyTheme();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    // Note: Theme preference not persisted in sandboxed environment
    this.applyTheme();
  }
}

// Navigation controller for better UX
class NavigationController {
  constructor() {
    this.setupKeyboardNavigation();
    this.setupAccessibilityFeatures();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Space bar to scroll down
      if (e.code === 'Space' && !e.target.matches('input, textarea, select')) {
        e.preventDefault();
        window.scrollBy({
          top: window.innerHeight * 0.8,
          behavior: 'smooth'
        });
      }
      
      // Arrow keys for section navigation
      if (e.code === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        this.navigateToNextSection();
      }
      
      if (e.code === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        this.navigateToPrevSection();
      }
    });
  }

  navigateToNextSection() {
    const sections = document.querySelectorAll('section');
    const currentSection = this.getCurrentSection(sections);
    const nextSection = sections[currentSection + 1];
    
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  navigateToPrevSection() {
    const sections = document.querySelectorAll('section');
    const currentSection = this.getCurrentSection(sections);
    const prevSection = sections[currentSection - 1];
    
    if (prevSection) {
      prevSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getCurrentSection(sections) {
    const scrollPosition = window.pageYOffset + window.innerHeight / 2;
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        return i;
      }
    }
    
    return 0;
  }

  setupAccessibilityFeatures() {
    // Add skip links for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
      position: absolute;
      left: -9999px;
      z-index: 999;
      padding: 8px;
      background: var(--accent-blue);
      color: white;
      text-decoration: none;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.left = '8px';
      skipLink.style.top = '8px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.left = '-9999px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const firstSection = document.querySelector('section');
    if (firstSection && !firstSection.id) {
      firstSection.id = 'main-content';
    }
  }
}

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.measurePerformance();
  }

  measurePerformance() {
    // Monitor loading performance
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`Page loaded in ${loadTime}ms`);
      
      // Log performance metrics
      if ('getEntriesByType' in performance) {
        const paintEntries = performance.getEntriesByType('paint');
        paintEntries.forEach(entry => {
          console.log(`${entry.name}: ${entry.startTime}ms`);
        });
      }
    });
    
    // Monitor memory usage (if available)
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        console.log(`Memory usage: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`);
      }, 30000); // Log every 30 seconds
    }
  }
}

// Error handling
class ErrorHandler {
  constructor() {
    this.setupErrorHandling();
  }

  setupErrorHandling() {
    window.addEventListener('error', (e) => {
      console.error('JavaScript error:', e.error);
      this.showUserFriendlyError();
    });
    
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      this.showUserFriendlyError();
    });
  }

  showUserFriendlyError() {
    // Create a subtle error notification
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--accent-red);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    errorDiv.textContent = 'Something went wrong. Please refresh the page.';
    
    document.body.appendChild(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all controllers
  const animationController = new AnimationController();
  const progressIndicator = new ProgressIndicator();
  const themeController = new ThemeController();
  const navigationController = new NavigationController();
  const performanceMonitor = new PerformanceMonitor();
  const errorHandler = new ErrorHandler();

  // Add loading animation
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  // Initialize first section animation
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('visible');
    }, 300);
  }

  console.log('Singapore Housing Infographic loaded successfully!');
});