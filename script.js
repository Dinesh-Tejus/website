// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        // Toggle theme
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update DOM and localStorage
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Animate elements on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

// Observe elements for animation
// Projects navigation
function setupProjectsNavigation() {
    const projectsContainer = document.getElementById('projects-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    const scrollAmount = projectsContainer.clientWidth / 2; // Scroll one project worth
    
    // Infinite scrolling effect
    let isScrolling = false;
    
    scrollLeftBtn.addEventListener('click', () => {
        if (isScrolling) return;
        isScrolling = true;
        
        projectsContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
        
        // Check if we're at the beginning, if so, reset to end
        setTimeout(() => {
            if (projectsContainer.scrollLeft <= 0) {
                // Disable smooth scrolling temporarily
                projectsContainer.style.scrollBehavior = 'auto';
                projectsContainer.scrollLeft = projectsContainer.scrollWidth;
                // Re-enable smooth scrolling
                setTimeout(() => {
                    projectsContainer.style.scrollBehavior = 'smooth';
                }, 50);
            }
            isScrolling = false;
        }, 500);
    });
    
    scrollRightBtn.addEventListener('click', () => {
        if (isScrolling) return;
        isScrolling = true;
        
        projectsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        // Check if we're at the end, if so, reset to beginning
        setTimeout(() => {
            if (projectsContainer.scrollLeft + projectsContainer.clientWidth >= projectsContainer.scrollWidth - 10) {
                // Disable smooth scrolling temporarily
                projectsContainer.style.scrollBehavior = 'auto';
                projectsContainer.scrollLeft = 0;
                // Re-enable smooth scrolling
                setTimeout(() => {
                    projectsContainer.style.scrollBehavior = 'smooth';
                }, 50);
            }
            isScrolling = false;
        }, 500);
    });
    
    // Auto-scroll every 5 seconds
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            scrollRightBtn.click();
        }, 8000);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Start auto-scroll initially
    startAutoScroll();
    
    // Pause auto-scroll when hovering over projects
    projectsContainer.addEventListener('mouseenter', stopAutoScroll);
    projectsContainer.addEventListener('mouseleave', startAutoScroll);
    
    // Also pause when touching on mobile
    projectsContainer.addEventListener('touchstart', stopAutoScroll);
    projectsContainer.addEventListener('touchend', startAutoScroll);
}

document.addEventListener('DOMContentLoaded', () => {
    // Setup theme toggle
    setupThemeToggle();
    
    // Setup projects navigation
    setupProjectsNavigation();
    
    // Setup animations
    document.querySelectorAll('.timeline-item, .project-card, .section-title, .about-content, .contact-container').forEach(el => {
        observer.observe(el);
    });


    const styleElement = document.createElement('style');
    styleElement.textContent = bubbleStyles;
    document.head.appendChild(styleElement);
    
    // Call the interactive bubbles setup
    setupInteractiveBubbles();

    // Mobile menu toggle (placeholder for future implementation)
    const mobileMenuSetup = () => {
        // This function can be expanded when implementing mobile navigation
        const windowWidth = window.innerWidth;
        if (windowWidth <= 480) {
            console.log('Mobile view active');
            // Future implementation for mobile menu toggle
        }
    };

    // Run on load
    mobileMenuSetup();

    // Run on resize
    window.addEventListener('resize', mobileMenuSetup);

    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Add active class style to navigation
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active::after {
            width: 100%;
        }
        .nav-links a.active {
            color: var(--accent);
        }
    `;
    document.head.appendChild(style);

    // Project image fallback handling
    document.querySelectorAll('.project-image img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'placeholder.jpg';
            this.alt = 'Project Image';
        });
    });
});

// Typing animation for hero section (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Uncomment to enable typing animation
    // typeWriter();
}

// Replace the existing setupProjectsNavigation function with this enhanced version

function setupProjectsNavigation() {
    const projectsContainer = document.getElementById('projects-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    
    if (!projectsContainer || !scrollLeftBtn || !scrollRightBtn) return;
    
    const projectCards = document.querySelectorAll('.project-card');
    const cardWidth = projectCards.length > 0 ? projectCards[0].offsetWidth + 32 : 0; // Width + gap
    
    // Clone project cards for infinite scroll effect
    function setupInfiniteScroll() {
        // Clone the first few cards and add to the end
        projectCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            clone.classList.add('cloned-card');
            projectsContainer.appendChild(clone);
        });
    }
    
    // Set up scroll functionality
    function handleScroll(direction) {
        if (!projectsContainer) return;
        
        const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
        const currentScroll = projectsContainer.scrollLeft;
        
        projectsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        // Check for infinite scroll reset
        setTimeout(() => {
            // If scrolled to the end, jump to the beginning
            if (direction === 'right' && 
                projectsContainer.scrollLeft + projectsContainer.clientWidth >= 
                projectsContainer.scrollWidth - 50) {
                
                // Disable smooth scrolling temporarily
                projectsContainer.style.scrollBehavior = 'auto';
                projectsContainer.scrollLeft = 0;
                
                // Re-enable smooth scrolling
                setTimeout(() => {
                    projectsContainer.style.scrollBehavior = 'smooth';
                }, 50);
            }
            
            // If scrolled to the beginning, jump to the end of original cards
            if (direction === 'left' && projectsContainer.scrollLeft <= 0) {
                const originalCardsWidth = cardWidth * projectCards.length;
                
                // Disable smooth scrolling temporarily
                projectsContainer.style.scrollBehavior = 'auto';
                projectsContainer.scrollLeft = originalCardsWidth;
                
                // Re-enable smooth scrolling
                setTimeout(() => {
                    projectsContainer.style.scrollBehavior = 'smooth';
                }, 50);
            }
        }, 500);
    }
    
    // Add event listeners
    scrollLeftBtn.addEventListener('click', () => handleScroll('left'));
    scrollRightBtn.addEventListener('click', () => handleScroll('right'));
    
    // Set up auto-scroll
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            handleScroll('right');
        }, 8000);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Initialize
    setupInfiniteScroll();
    startAutoScroll();
    
    // Pause auto-scroll on interaction
    projectsContainer.addEventListener('mouseenter', stopAutoScroll);
    projectsContainer.addEventListener('mouseleave', startAutoScroll);
    projectsContainer.addEventListener('touchstart', stopAutoScroll);
    projectsContainer.addEventListener('touchend', startAutoScroll);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const updatedCardWidth = projectCards.length > 0 ? projectCards[0].offsetWidth + 32 : 0;
        if (updatedCardWidth !== cardWidth && updatedCardWidth > 0) {
            // Reset the scroll position
            projectsContainer.scrollLeft = 0;
        }
    });
}
// Enhanced interactive bubble effect
function setupInteractiveBubbles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const bubbleCount = 12; // Fewer bubbles for subtlety
    const bubbles = [];
    const colors = [
        'rgba(6, 182, 212, 0.08)',   // Accent color
        'rgba(59, 130, 246, 0.08)',  // Primary color
        'rgba(14, 165, 233, 0.08)',  // Accent secondary
        'rgba(16, 185, 129, 0.08)'   // Success color
    ];
    
    // Create regular bubbles
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Randomize bubble size
        const size = Math.random() * 60 + 30; // 30-90px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Randomize initial position
        const posX = Math.random() * 90 + 5; // 5-95%
        const posY = Math.random() * 90 + 5; // 5-95%
        bubble.style.left = `${posX}%`;
        bubble.style.top = `${posY}%`;
        
        // Apply random color
        const colorIndex = Math.floor(Math.random() * colors.length);
        bubble.style.background = colors[colorIndex];
        
        // Much lower opacity for subtlety
        const opacity = Math.random() * 0.15 + 0.05; // 0.05-0.2
        bubble.style.opacity = opacity;
        
        // Add subtle border and blur
        bubble.style.border = '1px solid rgba(255, 255, 255, 0.15)';
        bubble.style.backdropFilter = 'blur(1px)';
        
        // Randomize animation
        const animationDuration = Math.random() * 20 + 40; // 40-60s very slow
        const animationDelay = Math.random() * 5;
        const animationType = Math.random() > 0.5 ? 'float-bubble' : 'float-bubble-alt';
        bubble.style.animation = `${animationType} ${animationDuration}s ease-in-out ${animationDelay}s infinite`;
        
        // Store initial positions and other properties
        bubble.dataset.initialX = posX;
        bubble.dataset.initialY = posY;
        bubble.dataset.size = size;
        
        hero.appendChild(bubble);
        bubbles.push(bubble);
    }
    
    // Create 2 really big bubbles
    for (let i = 0; i < 2; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble', 'big-bubble');
        
        // Very large size
        const size = (i === 0) ? 280 : 350; // Two different sizes for the big bubbles
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Position on opposite sides
        const posX = (i === 0) ? 15 : 80;
        const posY = (i === 0) ? 70 : 30;
        bubble.style.left = `${posX}%`;
        bubble.style.top = `${posY}%`;
        
        // Apply colors - use accent for first, primary for second
        const colorIndex = (i === 0) ? 0 : 1;
        bubble.style.background = colors[colorIndex];
        
        // Extra low opacity for big bubbles
        const opacity = 0.06;
        bubble.style.opacity = opacity;
        
        // Add subtle border and blur
        bubble.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        bubble.style.backdropFilter = 'blur(1px)';
        
        // Slower animation for big bubbles
        const animationDuration = 80 + (i * 20); // 80s for first, 100s for second
        const animationDelay = i * 5;
        const animationType = (i === 0) ? 'float-bubble' : 'float-bubble-alt';
        bubble.style.animation = `${animationType} ${animationDuration}s ease-in-out ${animationDelay}s infinite`;
        
        // Store initial positions and other properties
        bubble.dataset.initialX = posX;
        bubble.dataset.initialY = posY;
        bubble.dataset.size = size;
        
        hero.appendChild(bubble);
        bubbles.push(bubble);
    }
    
    // Add mouse interaction
    hero.addEventListener('mousemove', (e) => {
        // Get mouse position relative to hero section
        const rect = hero.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const heroWidth = rect.width;
        const heroHeight = rect.height;
        
        // Move bubbles based on mouse position
        bubbles.forEach(bubble => {
            const bubbleSize = parseFloat(bubble.dataset.size);
            const initialX = parseFloat(bubble.dataset.initialX);
            const initialY = parseFloat(bubble.dataset.initialY);
            
            // Calculate distance from mouse
            const bubbleX = initialX * heroWidth / 100;
            const bubbleY = initialY * heroHeight / 100;
            const deltaX = mouseX - bubbleX;
            const deltaY = mouseY - bubbleY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            // Move bubble away from cursor with intensity based on distance
            // The effect is stronger for closer bubbles
            const maxDistance = Math.max(heroWidth, heroHeight) / 2;
            const intensity = Math.max(0, 1 - distance / maxDistance) * 15; // Reduced intensity
            
            // Direction away from mouse
            const directionX = deltaX !== 0 ? -deltaX / Math.abs(deltaX) : 0;
            const directionY = deltaY !== 0 ? -deltaY / Math.abs(deltaY) : 0;
            
            // Different movement behavior for big bubbles vs regular bubbles
            if (bubble.classList.contains('big-bubble')) {
                // Big bubbles move very subtly and slower
                const bigBubbleScale = 0.15; // Much smaller movement for big bubbles
                const translateX = directionX * intensity * bigBubbleScale;
                const translateY = directionY * intensity * bigBubbleScale;
                
                // Extract current transform from animation
                const currentAnimationTransform = window.getComputedStyle(bubble).getPropertyValue('transform');
                
                // Add subtle scale effect for big bubbles when mouse is near
                const scaleFactor = Math.max(0.98, 1 - (intensity * 0.001));
                
                bubble.style.transform = `${currentAnimationTransform} translate(${translateX}px, ${translateY}px) scale(${scaleFactor})`;
            } else {
                // Regular bubbles move more
                // Scale movement based on bubble size (smaller bubbles move more)
                const sizeScale = (90 - bubbleSize) / 100;
                
                // Apply transform
                const translateX = directionX * intensity * sizeScale;
                const translateY = directionY * intensity * sizeScale;
                
                bubble.style.transform = `translate(${translateX}px, ${translateY}px)`;
            }
        });
    });
    
    // Reset bubbles when mouse leaves
    hero.addEventListener('mouseleave', () => {
        bubbles.forEach(bubble => {
            bubble.style.transform = 'translate(0, 0)';
        });
    });
    
    // Add click effect - subtle ripple instead of splash bubbles
    hero.addEventListener('click', (e) => {
        // Get click position
        const rect = hero.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        
        // Position at click point
        ripple.style.left = `${clickX}px`;
        ripple.style.top = `${clickY}px`;
        
        // Randomize color slightly
        const colorIndex = Math.floor(Math.random() * colors.length);
        const rippleColor = colors[colorIndex].replace('0.08', '0.03'); // Even more transparent
        ripple.style.borderColor = rippleColor;
        
        // Add to DOM
        hero.appendChild(ripple);
        
        // Remove after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 1500);
        
        // Also subtly pulse the nearest big bubble
        let closestBigBubble = null;
        let closestDistance = Infinity;
        
        bubbles.forEach(bubble => {
            if (bubble.classList.contains('big-bubble')) {
                const bubbleX = parseFloat(bubble.dataset.initialX) * rect.width / 100;
                const bubbleY = parseFloat(bubble.dataset.initialY) * rect.height / 100;
                const distance = Math.sqrt(
                    Math.pow(clickX - bubbleX, 2) + 
                    Math.pow(clickY - bubbleY, 2)
                );
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestBigBubble = bubble;
                }
            }
        });
        
        if (closestBigBubble) {
            // Add a subtle pulse to the closest big bubble
            closestBigBubble.classList.add('pulse');
            
            // Remove the pulse class after animation
            setTimeout(() => {
                closestBigBubble.classList.remove('pulse');
            }, 1000);
        }
    });
}

// Additional CSS styles to add to your style.css
const bubbleStyles = `
/* Enhanced Bubble Styles */
.bubble {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
    z-index: 1;
    pointer-events: none;
    transition: transform 0.6s ease, background-color 0.3s ease;
}

/* Big bubble special styling */
.bubble.big-bubble {
    z-index: 0; /* Place behind other elements */
    transform-origin: center;
    transition: transform 1s ease;
    will-change: transform;
}

/* Splash bubble effect */
.bubble.splash {
    position: absolute;
    transition: transform 0.8s ease-out, opacity 0.8s ease-out;
}

/* Dark theme adjustments */
[data-theme="dark"] .bubble {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

@keyframes float-bubble {
    0% {
        transform: translate(0, 0) rotate(0deg) scale(1);
    }
    33% {
        transform: translate(15px, -20px) rotate(2deg) scale(0.98);
    }
    66% {
        transform: translate(-15px, 10px) rotate(-2deg) scale(1.02);
    }
    100% {
        transform: translate(0, 0) rotate(0deg) scale(1);
    }
}

@keyframes float-bubble-alt {
    0% {
        transform: translate(0, 0) rotate(0deg) scale(1);
    }
    33% {
        transform: translate(-20px, 5px) rotate(-1deg) scale(1.01);
    }
    66% {
        transform: translate(10px, -10px) rotate(1deg) scale(0.99);
    }
    100% {
        transform: translate(0, 0) rotate(0deg) scale(1);
    }
}
`;