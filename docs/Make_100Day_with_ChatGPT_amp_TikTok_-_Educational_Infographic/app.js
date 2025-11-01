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

// Observe all sections with data-animate attribute
const animatedSections = document.querySelectorAll('[data-animate]');
animatedSections.forEach(section => {
  observer.observe(section);
});

// Copy Prompt Button Functionality
const copyButton = document.getElementById('copyPrompt');
const fullPrompt = `Research viral TikTok videos related to my new business [YOUR NICHE]. For example: School community for AI education, automation, or vibe coding.

Give me 30 days of viral TikTok hooks and 45-second scripts, spoken conversationally.

Every script should end with a CTA directing viewers to my link in bio. Put in table format from day 1 to day 30.`;

copyButton.addEventListener('click', async () => {
  try {
    // Create a temporary textarea to hold the text
    const textarea = document.createElement('textarea');
    textarea.value = fullPrompt;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    
    // Try to copy using the older execCommand method (more compatible with sandboxed environments)
    const successful = document.execCommand('copy');
    
    // Remove the textarea
    document.body.removeChild(textarea);
    
    if (successful) {
      // Change button text temporarily
      const originalHTML = copyButton.innerHTML;
      copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
      copyButton.style.background = 'var(--accent-mint)';
      
      setTimeout(() => {
        copyButton.innerHTML = originalHTML;
        copyButton.style.background = 'var(--accent-cyan)';
      }, 2000);
    } else {
      throw new Error('Copy command failed');
    }
  } catch (err) {
    // Fallback: Show alert with the prompt
    alert('Copy the prompt below:\n\n' + fullPrompt);
  }
});

// Add hover effects to cards
const cards = document.querySelectorAll('.section-card, .funnel-step, .math-card, .strategy-card, .success-card, .stats-column, .flow-item');

cards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});

// Smooth scroll for any internal links (if added later)
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

// Add a subtle parallax effect to the hero section
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const hero = document.querySelector('.hero');
  
  if (hero && scrollTop < hero.offsetHeight) {
    hero.style.transform = `translateY(${scrollTop * 0.5}px)`;
    hero.style.opacity = 1 - (scrollTop / hero.offsetHeight) * 0.5;
  }
  
  lastScrollTop = scrollTop;
});

// Add number counter animation for math section
function animateValue(element, start, end, duration, suffix = '') {
  const range = end - start;
  const increment = range / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    
    if (suffix === '$') {
      element.textContent = suffix + Math.floor(current);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

// Trigger number animations when math section is visible
const mathSection = document.querySelector('.math-section');
if (mathSection) {
  const mathObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Only animate once
        mathObserver.unobserve(entry.target);
        
        // Animate the numbers in math cards
        const mathValues = document.querySelectorAll('.math-value');
        if (mathValues.length >= 6) {
          // Animate each value with appropriate formatting
          setTimeout(() => animateValue(mathValues[0].childNodes[0], 0, 25, 1000), 200);
          setTimeout(() => animateValue(mathValues[1].childNodes[0], 0, 4, 1000), 400);
          setTimeout(() => animateValue(mathValues[2].childNodes[0], 0, 3, 1000), 600);
          setTimeout(() => animateValue(mathValues[3].childNodes[0], 0, 10000, 1500), 800);
          setTimeout(() => {
            let current = 0;
            const timer = setInterval(() => {
              current += 0.001;
              if (current >= 0.04) {
                current = 0.04;
                clearInterval(timer);
              }
              mathValues[4].childNodes[0].textContent = current.toFixed(2);
            }, 16);
          }, 1000);
          setTimeout(() => animateValue(mathValues[5].childNodes[0], 0, 100, 1500, '$'), 1200);
        }
      }
    });
  }, { threshold: 0.5 });
  
  mathObserver.observe(mathSection);
}

console.log('Educational Infographic Loaded Successfully!');
console.log('Strategy by Sabrina Romanov');