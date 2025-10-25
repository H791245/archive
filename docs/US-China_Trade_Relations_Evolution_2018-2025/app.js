// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger progress bar animations
            if (entry.target.querySelector('.progress-fill')) {
                animateProgressBars(entry.target);
            }
            
            // Trigger stat counter animations
            if (entry.target.querySelector('.stat-card')) {
                animateStats(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all content sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => observer.observe(section));
    
    // Initialize timeline detail
    showTimelineDetail(4);
});

// Animate progress bars
function animateProgressBars(section) {
    const progressBars = section.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }, index * 200);
    });
}

// Animate stat counters
function animateStats(section) {
    const statCards = section.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            const targetValue = parseInt(card.getAttribute('data-count'));
            const numberElement = card.querySelector('.stat-number');
            animateCounter(numberElement, targetValue);
        }, index * 100);
    });
}

// Counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
        const percentSpan = element.querySelector('.stat-percent');
        if (percentSpan) {
            element.innerHTML = Math.floor(current) + '<span class="stat-percent">%</span>';
        }
    }, 30);
}

// Toggle expand/collapse for rare earth section
function toggleExpand(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.classList.remove('fa-minus-circle');
        icon.classList.add('fa-plus-circle');
        button.innerHTML = '<i class="fas fa-plus-circle"></i> What are Rare Earth Elements?';
    } else {
        content.classList.add('active');
        icon.classList.remove('fa-plus-circle');
        icon.classList.add('fa-minus-circle');
        button.innerHTML = '<i class="fas fa-minus-circle"></i> Hide Details';
    }
}

// Timeline detail display
const timelineData = [
    {
        title: '2018: Trade War Begins',
        description: 'Trump launches first tariffs on Chinese goods, targeting intellectual property theft and forced technology transfer. China scrambles to respond with limited options.'
    },
    {
        title: '2019: Escalation',
        description: 'Tariffs expand to cover $550B of Chinese goods. China retaliates where possible but lacks strategic leverage. Trade tensions reach their peak.'
    },
    {
        title: '2020: Phase One Deal',
        description: 'After months of negotiations, US and China sign Phase One trade deal. China commits to purchasing additional US goods, though compliance remains partial.'
    },
    {
        title: '2021-2024: China Prepares',
        description: 'China quietly consolidates control over rare earth processing and refining. Strategic investments in critical minerals create future leverage points.'
    },
    {
        title: '2025: Rare Earth Leverage Deployed',
        description: 'China deploys rare earth export controls, demonstrating strategic leverage and forcing a fundamental shift in US-China power dynamics. The "pain is excruciating."'
    }
];

function showTimelineDetail(index) {
    const detailBox = document.getElementById('timelineDetail');
    const titleElement = document.getElementById('detailTitle');
    const descriptionElement = document.getElementById('detailDescription');
    
    // Update active state
    const timelinePoints = document.querySelectorAll('.timeline-point');
    timelinePoints.forEach((point, i) => {
        if (i === index) {
            point.classList.add('active');
        } else {
            point.classList.remove('active');
        }
    });
    
    // Update content with fade effect
    detailBox.style.opacity = '0';
    setTimeout(() => {
        titleElement.textContent = timelineData[index].title;
        descriptionElement.textContent = timelineData[index].description;
        detailBox.style.opacity = '1';
    }, 200);
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

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-image');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add transition effect to timeline detail box
const timelineDetailBox = document.getElementById('timelineDetail');
if (timelineDetailBox) {
    timelineDetailBox.style.transition = 'opacity 0.3s ease';
}

// Hover effects for cards
const cards = document.querySelectorAll('.stat-card, .takeaway-card, .key-point-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add dynamic glow effect to important elements
function addGlowEffect() {
    const glowElements = document.querySelectorAll('.trump-card, .dramatic-text h3');
    glowElements.forEach(element => {
        setInterval(() => {
            element.style.textShadow = `0 0 ${Math.random() * 20 + 10}px #f4d03f`;
        }, 2000);
    });
}

addGlowEffect();

// Keyboard navigation for timeline
document.addEventListener('keydown', (e) => {
    const activePoint = document.querySelector('.timeline-point.active');
    const allPoints = document.querySelectorAll('.timeline-point');
    let currentIndex = Array.from(allPoints).indexOf(activePoint);
    
    if (e.key === 'ArrowRight' && currentIndex < allPoints.length - 1) {
        showTimelineDetail(currentIndex + 1);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        showTimelineDetail(currentIndex - 1);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});