// Career timeline data
const timelineData = [
  { year: '1984', event: 'Graduated Yale, interned with Jim Rogers', icon: '🎓', highlight: false, side: 'left' },
  { year: '1991-2000', event: 'Soros Fund Management - Managing Partner, London office', icon: '💼', highlight: false, side: 'right' },
  { year: '1992', event: 'Black Wednesday: Made $1B+ shorting British pound', icon: '💰', highlight: true, side: 'left' },
  { year: '2000-2005', event: 'Founded Bessent Capital ($1B hedge fund) - closed 2005', icon: '🚀', highlight: false, side: 'right' },
  { year: '2006-2011', event: 'Adjunct Professor at Yale (economic history)', icon: '📚', highlight: false, side: 'left' },
  { year: '2011-2015', event: 'Returned to Soros as Chief Investment Officer', icon: '💼', highlight: false, side: 'right' },
  { year: '2013', event: 'Made $1.2B shorting Japanese yen', icon: '💴', highlight: true, side: 'left' },
  { year: '2015', event: 'Founded Key Square Capital Management ($2-5.1B assets)', icon: '🏢', highlight: false, side: 'right' },
  { year: 'Jan 28, 2025', event: 'Sworn in as 79th Treasury Secretary', icon: '🏛️', highlight: true, side: 'left' }
];

// Criticisms data
const criticismsData = [
  {
    category: 'Policy Failures',
    severity: 'high',
    source: 'The Nation (April 2025)',
    details: [
      'Claimed China would "eat tariffs" - China retaliated with 84% duties',
      'Said no recession pricing needed - market lost $6 trillion',
      'Predicted mortgage rates would drop - they spiked to 7%',
      'Dismissed 401(k) concerns while retirees lost savings'
    ]
  },
  {
    category: 'Ethics Violations',
    severity: 'critical',
    source: 'NYT, OGE (Aug 2025)',
    details: [
      'Failed to divest assets by April 28, 2025 deadline',
      'Owns $25M North Dakota farmland (70% soybeans to China)',
      'Leads China trade negotiations while profiting from Chinese exports',
      'Only divested 96% of required assets as of Aug 2025',
      'Extended deadline to Dec 15, 2025'
    ]
  },
  {
    category: 'Cronyism Allegations',
    severity: 'high',
    source: 'Disorderly Dispatches (May 2025)',
    details: [
      'Granted Elon Musk access to Treasury payment system',
      'Musk donated heavily to Trump campaign',
      'Suspended CFPB operations Feb 2025 (weakened consumer protections)',
      'Argentina bailout benefited hedge fund cronies'
    ]
  },
  {
    category: 'Federal Reserve Attacks',
    severity: 'medium',
    source: 'Paul Krugman Substack (Sept 2025)',
    details: [
      'Accused of "dishonest slander" against Fed',
      'Demanded probe into Jerome Powell',
      'Called "vile" and economically illiterate by Paul Krugman',
      'Pandered to conspiracy theories'
    ]
  }
];

// Render timeline
function renderTimeline() {
  const timeline = document.getElementById('timeline');
  let side = 'left';
  
  timelineData.forEach((item, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = `timeline-item ${item.side} ${item.highlight ? 'highlight' : ''}`;
    
    timelineItem.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-year">${item.year}</div>
        <div class="timeline-event">
          <span class="timeline-icon">${item.icon}</span>
          ${item.event}
        </div>
      </div>
    `;
    
    timeline.appendChild(timelineItem);
    
    // Alternate sides
    side = side === 'left' ? 'right' : 'left';
  });
}

// Render criticisms
function renderCriticisms() {
  const grid = document.getElementById('criticisms-grid');
  
  criticismsData.forEach((criticism, index) => {
    const card = document.createElement('div');
    card.className = `criticism-card ${criticism.severity}`;
    card.dataset.index = index;
    
    const detailsHTML = criticism.details.map(detail => `<li>${detail}</li>`).join('');
    
    card.innerHTML = `
      <div class="criticism-header">
        <div class="criticism-category">${criticism.category}</div>
        <span class="criticism-severity">${criticism.severity}</span>
      </div>
      <div class="criticism-body">
        <div class="criticism-source">Source: ${criticism.source}</div>
        <ul class="criticism-details">
          ${detailsHTML}
        </ul>
      </div>
    `;
    
    // Add click event for expansion (optional)
    card.addEventListener('click', function() {
      this.classList.toggle('expanded');
    });
    
    grid.appendChild(card);
  });
}

// Animated counter for statistics
function animateCounter(element) {
  const target = parseInt(element.dataset.target);
  const prefix = element.dataset.prefix || '';
  const suffix = element.dataset.suffix || '';
  const duration = 2000; // 2 seconds
  const steps = 60;
  const stepValue = target / steps;
  let current = 0;
  
  const timer = setInterval(() => {
    current += stepValue;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    // Format the number
    let displayValue;
    if (target >= 1000000000) {
      displayValue = (current / 1000000000).toFixed(1);
    } else if (target >= 1000000) {
      displayValue = (current / 1000000).toFixed(1);
    } else {
      displayValue = Math.floor(current);
    }
    
    element.textContent = prefix + displayValue + suffix;
  }, duration / steps);
}

// Intersection Observer for animations
function setupIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate counters
        const counters = entry.target.querySelectorAll('.stat-number');
        counters.forEach(counter => {
          if (!counter.classList.contains('animated')) {
            counter.classList.add('animated');
            animateCounter(counter);
          }
        });
        
        // Add entrance animations
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  // Observe statistics section
  const statsSection = document.querySelector('.statistics-section');
  if (statsSection) {
    statsSection.style.opacity = '0';
    statsSection.style.transform = 'translateY(30px)';
    statsSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(statsSection);
  }
}

// Smooth scroll for anchors
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
}

// Add scroll reveal animations
function addScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all major sections
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

// Initialize app
function init() {
  renderTimeline();
  renderCriticisms();
  setupIntersectionObserver();
  setupSmoothScroll();
  addScrollReveal();
  
  // Add entrance animation to hero
  setTimeout(() => {
    document.querySelector('.hero').style.opacity = '1';
  }, 100);
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}