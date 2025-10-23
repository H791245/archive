// Dutch Schwa Learning App JavaScript

// Animation and interaction functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Add click interactions to practice cards
    addPracticeCardInteractions();
    
    // Add pronunciation playback simulation
    addPronunciationEffects();
    
    // Add scroll animations
    setupScrollAnimations();
    
    console.log('Dutch Schwa Learning App initialized!');
});

function initializeAnimations() {
    // Add entrance animations to cards
    const cards = document.querySelectorAll('.fact-card, .example-box, .practice-word-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function addPracticeCardInteractions() {
    const practiceCards = document.querySelectorAll('.practice-word-card');
    
    practiceCards.forEach(card => {
        // Add click effect for pronunciation practice
        card.addEventListener('click', function() {
            // Visual feedback
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(22, 160, 133, 0.3)';
            
            // Get the pronunciation text
            const pronunciation = this.querySelector('.pronunciation').textContent;
            
            // Create a temporary highlight effect
            const schwaElements = this.querySelectorAll('.schwa');
            schwaElements.forEach(schwa => {
                schwa.style.backgroundColor = '#E74C3C';
                schwa.style.color = 'white';
                schwa.style.transform = 'scale(1.2)';
                schwa.style.transition = 'all 0.3s ease';
            });
            
            // Reset after animation
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                schwaElements.forEach(schwa => {
                    schwa.style.backgroundColor = '';
                    schwa.style.color = '';
                    schwa.style.transform = '';
                });
            }, 500);
            
            // Show feedback message
            showPronunciationFeedback(this, pronunciation);
        });
        
        // Add hover effect enhancement
        card.addEventListener('mouseenter', function() {
            const schwaElements = this.querySelectorAll('.schwa');
            schwaElements.forEach(schwa => {
                schwa.style.backgroundColor = 'rgba(231, 76, 60, 0.2)';
                schwa.style.transition = 'background-color 0.3s ease';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const schwaElements = this.querySelectorAll('.schwa');
            schwaElements.forEach(schwa => {
                schwa.style.backgroundColor = '';
            });
        });
    });
}

function showPronunciationFeedback(card, pronunciation) {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.textContent = `🔊 ${pronunciation}`;
    feedback.style.cssText = `
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: #2C3E50;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        z-index: 1000;
        opacity: 0;
        animation: fadeInOut 2s ease;
        pointer-events: none;
        white-space: nowrap;
    `;
    
    // Add CSS animation
    if (!document.querySelector('#feedback-animation')) {
        const style = document.createElement('style');
        style.id = 'feedback-animation';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
                20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Position relative to card
    card.style.position = 'relative';
    card.appendChild(feedback);
    
    // Remove after animation
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 2000);
}

function addPronunciationEffects() {
    // Add click effects to all schwa elements
    const schwaElements = document.querySelectorAll('.schwa');
    
    schwaElements.forEach(schwa => {
        schwa.addEventListener('click', function() {
            // Pulse animation
            this.style.animation = 'schwaPulse 0.6s ease';
            
            // Reset animation
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
        
        // Make them look clickable
        schwa.style.cursor = 'pointer';
        schwa.title = 'Click to highlight the schwa sound!';
    });
    
    // Add CSS for pulse animation
    if (!document.querySelector('#schwa-animation')) {
        const style = document.createElement('style');
        style.id = 'schwa-animation';
        style.textContent = `
            @keyframes schwaPulse {
                0% { transform: scale(1); background-color: rgba(231, 76, 60, 0.1); }
                50% { transform: scale(1.3); background-color: #E74C3C; color: white; }
                100% { transform: scale(1); background-color: rgba(231, 76, 60, 0.1); }
            }
        `;
        document.head.appendChild(style);
    }
}

function setupScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-animate');
        observer.observe(section);
    });
}

// Add interactive quick rule demonstration
document.addEventListener('DOMContentLoaded', function() {
    const ruleExamples = document.querySelectorAll('.rule-examples span');
    
    ruleExamples.forEach(example => {
        example.addEventListener('click', function() {
            // Highlight the 'e' at the end
            const text = this.textContent;
            if (text.endsWith('e')) {
                this.innerHTML = text.slice(0, -1) + '<span class="highlighted-e">e</span>';
                
                // Add CSS for highlighted e if not exists
                if (!document.querySelector('#highlighted-e-style')) {
                    const style = document.createElement('style');
                    style.id = 'highlighted-e-style';
                    style.textContent = `
                        .highlighted-e {
                            background-color: #E74C3C;
                            color: white;
                            padding: 0.1em 0.2em;
                            border-radius: 3px;
                            animation: highlightBounce 0.8s ease;
                        }
                        @keyframes highlightBounce {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.2); }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = text;
                }, 2000);
            }
        });
        
        example.style.cursor = 'pointer';
        example.title = 'Click to see the schwa!';
    });
});

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add a "back to top" functionality when scrolling
    let backToTopButton;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            if (!backToTopButton) {
                backToTopButton = document.createElement('button');
                backToTopButton.innerHTML = '↑';
                backToTopButton.style.cssText = `
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: #16A085;
                    color: white;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(22, 160, 133, 0.3);
                    transition: all 0.3s ease;
                    z-index: 1000;
                `;
                
                backToTopButton.addEventListener('click', function() {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                
                backToTopButton.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.1)';
                    this.style.background = '#138D75';
                });
                
                backToTopButton.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                    this.style.background = '#16A085';
                });
                
                document.body.appendChild(backToTopButton);
            }
        } else if (backToTopButton) {
            backToTopButton.remove();
            backToTopButton = null;
        }
    });
});

// Add educational tooltips
document.addEventListener('DOMContentLoaded', function() {
    // Add tooltips to key terms
    const keyTerms = {
        'unstressed': 'A syllable that is not emphasized when speaking',
        'IPA': 'International Phonetic Alphabet - a system for writing sounds',
        'syllable': 'A unit of sound in a word that contains a vowel sound'
    };
    
    Object.keys(keyTerms).forEach(term => {
        const elements = document.querySelectorAll(`*:not(script):not(style)`);
        elements.forEach(element => {
            if (element.children.length === 0 && element.textContent.toLowerCase().includes(term)) {
                element.innerHTML = element.innerHTML.replace(
                    new RegExp(term, 'gi'),
                    `<span class="tooltip" data-tooltip="${keyTerms[term]}">${term}</span>`
                );
            }
        });
    });
    
    // Add tooltip CSS
    if (!document.querySelector('#tooltip-style')) {
        const style = document.createElement('style');
        style.id = 'tooltip-style';
        style.textContent = `
            .tooltip {
                position: relative;
                border-bottom: 1px dotted #16A085;
                cursor: help;
            }
            .tooltip:hover::after {
                content: attr(data-tooltip);
                position: absolute;
                bottom: 125%;
                left: 50%;
                transform: translateX(-50%);
                background: #2C3E50;
                color: white;
                padding: 0.5rem;
                border-radius: 0.375rem;
                font-size: 0.75rem;
                white-space: nowrap;
                z-index: 1000;
                opacity: 1;
                animation: tooltipFadeIn 0.3s ease;
            }
            @keyframes tooltipFadeIn {
                from { opacity: 0; transform: translateX(-50%) translateY(5px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
});

// Performance optimization: Debounce scroll events
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

// Add progress indicator
document.addEventListener('DOMContentLoaded', function() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #16A085, #E67E22);
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    const updateProgress = debounce(() => {
        const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    }, 10);
    
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
});

console.log('🇳🇱 Dutch Schwa Learning App loaded successfully!');
console.log('Interactive features:');
console.log('- Click practice cards to hear pronunciation');
console.log('- Click schwa symbols (ə) for highlighting');
console.log('- Click rule examples to see schwa emphasis');
console.log('- Scroll animations and progress tracking enabled');