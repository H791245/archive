// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all timeline events
const timelineEvents = document.querySelectorAll('.timeline-event');
timelineEvents.forEach((event, index) => {
  event.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(event);
});

// Observe player cards
const playerCards = document.querySelectorAll('.player-card');
playerCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(card);
});

// Observe number cards
const numberCards = document.querySelectorAll('.number-card');
let numbersAnimated = false;

const numberObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !numbersAnimated) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('number-card')) {
        animateNumbers();
        numbersAnimated = true;
      }
    }
  });
}, observerOptions);

numberCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
  numberObserver.observe(card);
});

// Observe crisis cards
const crisisCards = document.querySelectorAll('.crisis-card');
crisisCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.15}s`;
  observer.observe(card);
});

// Observe market cards
const marketCards = document.querySelectorAll('.market-card');
marketCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(card);
});

// Observe takeaway items
const takeawayItems = document.querySelectorAll('.takeaway-item');
takeawayItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.15}s`;
  observer.observe(item);
});

// Animated number counter
function animateNumbers() {
  const numberElements = document.querySelectorAll('[data-target]');
  
  numberElements.forEach(element => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateNumber = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = target;
      }
    };
    
    updateNumber();
  });
}

// Smooth scroll for anchor links (if any)
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
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled / 700);
  }
});

// Log initialization
console.log('Educational infographic loaded successfully!');
console.log('Scroll to see animations and interactive elements.');