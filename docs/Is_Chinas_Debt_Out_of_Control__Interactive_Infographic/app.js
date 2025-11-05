// Progress Bar
function updateProgressBar() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
}

window.addEventListener('scroll', updateProgressBar);

// Perspective Toggle
const toggleButtons = document.querySelectorAll('.toggle-btn');
const optimistContent = document.querySelectorAll('.optimist-content');
const pessimistContent = document.querySelectorAll('.pessimist-content');

toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    toggleButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const view = button.getAttribute('data-view');
    
    if (view === 'optimist') {
      optimistContent.forEach(el => el.style.display = 'block');
      pessimistContent.forEach(el => el.style.display = 'none');
    } else {
      optimistContent.forEach(el => el.style.display = 'none');
      pessimistContent.forEach(el => el.style.display = 'block');
    }
  });
});

// Initialize view
optimistContent.forEach(el => el.style.display = 'block');
pessimistContent.forEach(el => el.style.display = 'none');

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      
      // Animate debt bars
      if (entry.target.classList.contains('comparison-card')) {
        const bar = entry.target.querySelector('.debt-bar');
        if (bar) {
          const percentage = bar.getAttribute('data-percentage');
          // Scale to max 256% (Japan's debt)
          const scaledWidth = Math.min((percentage / 256) * 100, 100);
          setTimeout(() => {
            bar.style.width = scaledWidth + '%';
          }, 200);
        }
      }
      
      // Animate circles
      if (entry.target.classList.contains('debt-card')) {
        const circle = entry.target.querySelector('.circle-progress');
        if (circle) {
          const percentage = circle.getAttribute('data-percentage');
          // Circle animation (max 100% = full circle, scale higher percentages)
          const circumference = 314;
          const displayPercentage = Math.min(percentage, 100);
          const offset = circumference - (displayPercentage / 100) * circumference;
          setTimeout(() => {
            circle.style.strokeDashoffset = offset;
          }, 200);
        }
      }
    }
  });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

// Learn More Buttons
const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
learnMoreButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const target = button.getAttribute('data-target');
    const card = button.closest('.debt-card');
    const description = card.querySelector('.debt-description');
    
    const details = {
      total: 'Total debt includes public, private, corporate, household, and local government debt. At 312% of GDP, this is on the higher end globally. However, IMF estimates tend to be bearish. This figure includes all forms of debt across the economy, making it seem larger than comparable government-only metrics.',
      government: 'Central government debt at 88% GDP is significantly lower than the USA (124%) and Japan (256%). This is the most commonly cited debt metric. China\'s government has significant control over monetary policy, allowing flexible management. Much of this debt funds infrastructure with long-term ROI.',
      corporate: 'Corporate debt at 160% of GDP is high, but crucially, most is loans from state-owned banks to state-owned enterprises. This gives the government leverage to restructure, write off, or manage these debts without systemic risk. China can also sell state assets to reduce this burden if needed.',
      household: 'Household debt at 63% of GDP is very moderate compared to Western standards. Chinese households save approximately $66 trillion USD - far more than they owe. High savings rates provide a cushion against economic shocks and reduce default risk. Unlike the US, student loans and medical debt are minimal.'
    };
    
    if (description.textContent.length < 200) {
      description.textContent = details[target];
      button.textContent = 'Show Less';
    } else {
      // Reset to original short description
      const shortDescriptions = {
        total: 'Includes public, private, local government debt. IMF estimate, likely on higher end.',
        government: 'Central government debt only. Much lower than US and Japan.',
        corporate: 'Mostly state-owned enterprise loans from state banks. Can be restructured.',
        household: 'Very moderate. Households save more than spend ($66 trillion in savings).'
      };
      description.textContent = shortDescriptions[target];
      button.textContent = 'Learn More';
    }
  });
});

// Smooth Scroll for Internal Links
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

// Add pulse animation to key statistics
function pulseStats() {
  const statValues = document.querySelectorAll('.strength-value, .concern-value, .debt-percentage');
  statValues.forEach(stat => {
    stat.style.transition = 'transform 0.3s ease';
  });
}

pulseStats();

// Hover effect enhancement for cards
const allCards = document.querySelectorAll('.debt-card, .comparison-card, .strength-card, .concern-card, .infrastructure-card');
allCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});

// Dynamic text color for perspective toggle
function updatePerspectiveColors() {
  const activeBtn = document.querySelector('.toggle-btn.active');
  if (activeBtn) {
    const view = activeBtn.getAttribute('data-view');
    const root = document.documentElement;
    
    if (view === 'optimist') {
      // Emphasize green/positive colors
      document.querySelector('.strengths-section').style.opacity = '1';
      document.querySelector('.concerns-section').style.opacity = '0.7';
    } else {
      // Emphasize orange/warning colors
      document.querySelector('.strengths-section').style.opacity = '0.7';
      document.querySelector('.concerns-section').style.opacity = '1';
    }
  }
}

// Add perspective color updates to toggle
toggleButtons.forEach(button => {
  button.addEventListener('click', updatePerspectiveColors);
});

updatePerspectiveColors();

// Add loading animation for page load
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Console message for developers
console.log('%c🇨🇳 China Debt Analysis Infographic', 'color: #00D9FF; font-size: 20px; font-weight: bold;');
console.log('%cData sources: IMF, Trading Economics, World Bank, SAFE, US Treasury, Japan MOF', 'color: #FFD700; font-size: 12px;');
console.log('%cBuilt with HTML, CSS, and JavaScript - No external libraries', 'color: #00FF00; font-size: 12px;');