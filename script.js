

// Smooth scrolling for navigation
function initSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
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
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const countUp = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => countUp(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                countUp(counter);
                observer.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Scroll animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Parallax effect for background
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.bg-animation');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Download resume functionality
function initDownloadResume() {
    const downloadBtn = document.getElementById('downloadResume');

    downloadBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Add a loading state
        const originalText = this.innerHTML;
        this.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
            </svg>
            Preparing...
        `;

        // Simulate download preparation
        setTimeout(() => {
            // Create a mock PDF download
            const link = document.createElement('a');
            link.href = '#'; // Replace with actual resume PDF path
            link.download = 'Tejus_Dinesh_Resume.pdf';

            // For demo purposes, show an alert
            alert('Resume download would start here. Please add your actual resume PDF to the project and update the href.');

            // Reset button
            downloadBtn.innerHTML = originalText;
        }, 1500);
    });
}

// Skill tag interaction
function initSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Project cards interaction
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card-mini');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Project Modal System
function initProjectModals() {
    const projectData = {
        'llm-finetuning': {
            badge: 'Featured Research',
            title: 'LLM Fine-tuning Comparison Study',
            description: 'Comprehensive evaluation of LoRA, OFT, and ETHER+ fine-tuning methodologies achieving 73.9% ROUGE-1 score. Demonstrated ETHER+\'s superior parameter efficiency with only 344K trainable parameters versus 4.2M for LoRA, while maintaining competitive performance. Implemented custom attention mechanisms and analyzed trade-offs between model capacity and training efficiency.',
            metrics: [
                { value: '73.9%', label: 'ROUGE-1 Score' },
                { value: '92%', label: 'Parameter Reduction' },
                { value: '344K', label: 'Trainable Params' }
            ],
            technologies: ['PyTorch', 'HuggingFace', 'LoRA', 'ETHER+', 'OFT', 'Transformers'],
            features: [
                'Comparative analysis of three state-of-the-art fine-tuning methods',
                'Custom implementation of ETHER+ optimization algorithm',
                'Comprehensive benchmarking on multiple NLP tasks',
                'Parameter efficiency analysis and memory profiling',
                'Detailed ablation studies on attention mechanisms'
            ],
            link: 'https://github.com/Dinesh-Tejus/Comparing-LORA-OFT-ETHER'
        },
        'blindsight': {
            badge: 'AI Accessibility',
            title: 'BlindSight: AI-Powered File Assistant',
            description: 'Voice-controlled file management platform for visually impaired users with 95% speech recognition accuracy. Integrated LLaMA-70B with custom in-context learning strategies achieving 85% task completion accuracy. Implemented advanced prompt engineering and few-shot learning to handle complex file operations through natural language.',
            metrics: [
                { value: '95%', label: 'Speech Accuracy' },
                { value: '85%', label: 'Task Success Rate' },
                { value: '70B', label: 'Model Parameters' }
            ],
            technologies: ['LLaMA-70B', 'In-Context Learning', 'Speech Recognition', 'Python', 'Natural Language Processing'],
            features: [
                'Real-time voice command processing with high accuracy',
                'Advanced prompt engineering for file operations',
                'Few-shot learning for handling diverse user commands',
                'Accessible interface design for visually impaired users',
                'Context-aware file management and navigation'
            ],
            link: 'https://github.com/Dinesh-Tejus/BlindSight'
        },
        'unlearning': {
            badge: 'Research',
            title: 'Machine Unlearning Research',
            description: 'Implementation of "Who is Harry Potter?" paper for LLaMA-3-8B model. Conducted comparative study of Guardrailing, LoRA fine-tuning, and Sparse Autoencoders for selective knowledge removal while preserving model intelligence. Achieved targeted forgetting with minimal impact on general capabilities, demonstrating practical applications for privacy compliance and bias mitigation in production LLMs.',
            metrics: [
                { value: '8B', label: 'Model Size' },
                { value: '3', label: 'Methods Compared' },
                { value: '95%', label: 'Knowledge Retained' }
            ],
            technologies: ['LLaMA-3', 'Sparse Autoencoders', 'LoRA', 'PyTorch', 'Guardrailing'],
            features: [
                'Selective knowledge removal from large language models',
                'Comparative analysis of three unlearning techniques',
                'Preservation of general model capabilities during unlearning',
                'Privacy compliance and bias mitigation strategies',
                'Detailed performance metrics and evaluation framework'
            ],
            link: 'https://github.com/Dinesh-Tejus/Machine-Unlearning'
        },
        'translation': {
            badge: 'NLP',
            title: 'Regional Language Translation',
            description: 'Built LSTM-based Encoder-Decoder with attention mechanism for Kannada-English translation. Fine-tuned google/mt5-large achieving 15% performance improvement over baseline models. Implemented custom tokenization and preprocessing pipelines for handling regional language complexities.',
            metrics: [
                { value: '15%', label: 'Improvement' },
                { value: 'MT5', label: 'Base Model' },
                { value: 'LSTM', label: 'Architecture' }
            ],
            technologies: ['LSTM', 'Attention Mechanism', 'MT5', 'TensorFlow', 'Seq2Seq'],
            features: [
                'Custom LSTM encoder-decoder architecture with attention',
                'Fine-tuning of google/mt5-large for regional languages',
                'Advanced preprocessing for Kannada script',
                'Attention visualization and analysis',
                'Comprehensive evaluation on translation quality'
            ],
            link: 'https://github.com/Dinesh-Tejus/Kannada-English-Translation'
        },
        'gpt2': {
            badge: 'Deep Learning',
            title: 'Custom GPT-2 Implementation',
            description: 'Built decoder-only Transformer architecture from scratch with 134M+ parameters. Pre-trained on WikiText dataset for high-quality unsupervised language representations. Implemented multi-head attention, positional encoding, and layer normalization from first principles.',
            metrics: [
                { value: '134M+', label: 'Parameters' },
                { value: '12', label: 'Transformer Layers' },
                { value: 'WikiText', label: 'Training Data' }
            ],
            technologies: ['Transformers', 'PyTorch', 'GPT-2', 'Attention Mechanism', 'Neural Networks'],
            features: [
                'Complete Transformer decoder implementation from scratch',
                'Multi-head self-attention mechanism',
                'Positional encoding and embeddings',
                'Layer normalization and residual connections',
                'Pre-training on large-scale text corpus'
            ],
            link: '#'
        },
        'dialogue': {
            badge: 'NLP',
            title: 'Dialogue Summarization',
            description: 'Fine-tuned BART-large-CNN on dialogue data comparing 3 transformer architectures. Achieved highest ROUGE scores (ROUGE-1: 0.419, ROUGE-2: 0.216) on SAMSum dataset. Implemented custom training loops and evaluation metrics for dialogue-specific summarization.',
            metrics: [
                { value: '0.419', label: 'ROUGE-1' },
                { value: '0.216', label: 'ROUGE-2' },
                { value: 'BART', label: 'Architecture' }
            ],
            technologies: ['BART', 'Transformers', 'HuggingFace', 'NLP', 'PyTorch'],
            features: [
                'Fine-tuning BART-large-CNN for dialogue summarization',
                'Comparative analysis of three transformer architectures',
                'Custom evaluation metrics for dialogue quality',
                'Data augmentation for improved performance',
                'State-of-the-art ROUGE scores on SAMSum dataset'
            ],
            link: '#'
        },
        'penicillin': {
            badge: 'Big Data',
            title: 'Biopharmaceutical Manufacturing Analysis',
            description: 'Conducted big data analysis using Hadoop and PySpark on Databricks to optimize penicillin production settings. Utilized Hadoop for distributed storage and PySpark for in-memory data processing to handle large-scale manufacturing datasets. The project focused on identifying key parameters affecting yield and optimizing the production process for efficiency.',
            metrics: [
                { value: 'Big Data', label: 'Scale' },
                { value: 'PySpark', label: 'Processing' },
                { value: 'Hadoop', label: 'Storage' }
            ],
            technologies: ['Big Data', 'PySpark', 'Hadoop', 'MapReduce', 'Databricks Products', 'Big Data Analytics'],
            features: [
                'Conducted big data analysis using Hadoop and PySpark',
                'Optimized penicillin production settings',
                'Utilized Hadoop for distributed storage',
                'Implemented PySpark for in-memory data processing',
                'Analyzed large-scale manufacturing datasets'
            ],
            link: '#'
        }
    };

    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Open modal when clicking on project card
    document.querySelectorAll('.project-card-mini').forEach(card => {
        card.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];

            if (project) {
                // Build modal content
                let metricsHtml = project.metrics.map(m =>
                    `<div class="modal-metric">
                        <span class="modal-metric-value">${m.value}</span>
                        <span class="modal-metric-label">${m.label}</span>
                    </div>`
                ).join('');

                let techHtml = project.technologies.map(t =>
                    `<span class="modal-tech-tag">${t}</span>`
                ).join('');

                let featuresHtml = project.features.map(f =>
                    `<li>${f}</li>`
                ).join('');

                modalBody.innerHTML = `
                    <div class="modal-header">
                        <span class="modal-badge">${project.badge}</span>
                        <h2 class="modal-title">${project.title}</h2>
                        <p class="modal-description">${project.description}</p>
                    </div>
                    
                    <div class="modal-metrics">${metricsHtml}</div>
                    
                    <div class="modal-section">
                        <h3 class="modal-section-title">Technologies Used</h3>
                        <div class="modal-tech-tags">${techHtml}</div>
                    </div>
                    
                    <div class="modal-section">
                        <h3 class="modal-section-title">Key Features</h3>
                        <ul class="modal-features">${featuresHtml}</ul>
                    </div>
                    
                    <a href="${project.link}" class="modal-link" target="_blank">
                        View Project on GitHub
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                `;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid var(--cyan-accent)';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };

        // Start typing effect after initial animation
        setTimeout(typeWriter, 800);
    }
}

// Floating icons animation
function initFloatingIcons() {
    const floatingIcons = document.querySelectorAll('.floating-icon');

    floatingIcons.forEach((icon, index) => {
        // Add random floating movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;

            icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + (index * 1000));
    });
}

// Contact form interactions
function initContactInteractions() {
    const contactLinks = document.querySelectorAll('.contact-link');

    contactLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple effect
function addRippleCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Navigation active state
function initNavigationState() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// Theme transition effect
function initThemeTransition() {
    document.body.style.transition = 'all 0.3s ease';
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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



// Experience Modal System
function initExperienceModals() {
    const modal = document.getElementById('experienceModal');
    const modalBody = document.getElementById('experienceModalBody');
    const modalClose = document.getElementById('experienceModalClose');
    const modalOverlay = modal.querySelector('.modal-overlay');

    // Open modal when clicking on experience card
    document.querySelectorAll('.experience-card').forEach(card => {
        card.addEventListener('click', function () {
            // Extract data from the card
            const logo = this.querySelector('.company-logo').outerHTML;
            const title = this.querySelector('.job-title').textContent;
            const company = this.querySelector('.company').textContent;
            const duration = this.querySelector('.duration').textContent;
            const description = this.querySelector('.job-description').textContent;
            const metrics = this.querySelector('.impact-metrics').outerHTML;
            const details = this.querySelector('.experience-details').innerHTML;
            const techTags = this.querySelector('.tech-tags').outerHTML;

            // Build modal content
            modalBody.innerHTML = `
                <div class="modal-header">
                    <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 20px;">
                        ${logo}
                        <div>
                            <h2 class="modal-title" style="margin-bottom: 5px;">${title}</h2>
                            <p class="company" style="margin-bottom: 5px;">${company}</p>
                            <p class="duration">${duration}</p>
                        </div>
                    </div>
                    <p class="modal-description">${description}</p>
                </div>
                
                <div class="modal-metrics" style="margin-top: 20px; margin-bottom: 30px;">
                    ${metrics}
                </div>
                
                <div class="modal-section">
                    <div class="experience-details-content">
                        ${details}
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3 class="modal-section-title">Technologies Used</h3>
                    ${techTags}
                </div>
            `;

            // Fix styles for injected content
            const injectedMetrics = modalBody.querySelector('.impact-metrics');
            if (injectedMetrics) {
                injectedMetrics.style.background = 'transparent';
                injectedMetrics.style.border = 'none';
                injectedMetrics.style.padding = '0';
                injectedMetrics.style.margin = '0';
            }

            // Add specific styles for the details list in modal
            const detailsList = modalBody.querySelector('ul');
            if (detailsList) {
                detailsList.classList.add('modal-features');
            }

            const techContainer = modalBody.querySelector('.tech-tags');
            if (techContainer) {
                techContainer.classList.add('modal-tech-tags');
                techContainer.style.marginTop = '0';
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components

    initSmoothScroll();
    animateCounters();
    initScrollAnimations();
    initHeaderScroll();
    initParallax();
    initDownloadResume();
    initSkillTags();
    initProjectCards();
    initFloatingIcons();
    initContactInteractions();
    addRippleCSS();
    initNavigationState();
    initThemeTransition();

    initExperienceModals();
    initProjectModals();

    // Optional: Add typing effect (uncomment if desired)
    // initTypingEffect();

    console.log('Portfolio loaded successfully! 🚀');
});

// Add some easter eggs
let clickCount = 0;
document.querySelector('.brand').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        console.log('🎉 You found the easter egg! Welcome to my portfolio!');
        clickCount = 0;
    }
});

// Handle window resize
window.addEventListener('resize', throttle(() => {
    // Reinitialize functions if needed
}, 250));

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any modals or overlays
        document.activeElement.blur();
    }
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        // Add any image URLs you want to preload
        // 'path/to/your/profile-image.jpg'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Call preload on load
window.addEventListener('load', preloadImages);