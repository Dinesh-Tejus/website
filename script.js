
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

// Navigation active state
function initNavigationState() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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

// Mobile navigation toggle
function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close nav on link click
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
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

// Project Modal System
function initProjectModals() {
    const projectData = {
        'darwin': {
            badge: 'VS Code Extension',
            title: 'Darwin: Legacy Package Detector',
            description: 'Intelligent VS Code extension that scans Python and JavaScript/TypeScript imports for deprecated or unmaintained packages. It combines web search (via Tavily) with AI analysis (via Google Gemini) to identify package health and provides one-click automated migration suggestions with diff previews.',
            metrics: [
                { value: 'AI-Powered', label: 'Analysis' },
                { value: '1-Click', label: 'Migration' },
                { value: 'Polyglot', label: 'PY/JS/TS' }
            ],
            technologies: ['VS Code API', 'Google Gemini', 'Tavily Search', 'TypeScript', 'Node.js', 'Esbuild'],
            features: [
                'Automatic deprecation detection via AI-powered web search verification',
                'Inline diagnostics, hover information, and strikethrough decorations for legacy imports',
                'One-click automated migration to modern alternatives with built-in undo support',
                'Workspace-wide scanning and local caching for performance and cost efficiency',
                'Customizable confidence thresholds and ignore lists'
            ],
            link: 'https://github.com/Dinesh-Tejus/Darwin'
        },
        'llm-finetuning': {
            badge: 'Featured Research',
            title: 'LLM Fine-tuning Comparison Study',
            description: 'Systematic evaluation of LoRA, OFT, and ETHER+ on Llama-3.2-3B-Instruct. LoRA achieved highest ROUGE-1 (0.7385) with ~4M params; ETHER+ achieved 0.6278 with only 344K params and 30% GPU utilization vs 80% for LoRA/OFT. Trained on Stanford Alpaca dataset. Demonstrated performance-efficiency trade-offs across methods.',
            metrics: [
                { value: '0.739', label: 'ROUGE-1' },
                { value: '92%', label: 'Param Reduction' },
                { value: '344K', label: 'ETHER+ Params' }
            ],
            technologies: ['PyTorch', 'Llama-3.2-3B', 'LoRA', 'OFT', 'ETHER+', 'HuggingFace', 'Stanford Alpaca'],
            features: [
                'LoRA: 0.7385 ROUGE-1 with ~4M trainable parameters',
                'ETHER+: 344K parameters with 30% GPU utilization vs 80% for others',
                'OFT: 0.7176 ROUGE-1 with orthogonal fine-tuning via Cayley parameterization',
                'Baseline improvement from 0.2467 to 0.7385 ROUGE-1 (3x gain)',
                'Robustness analysis across learning rates and hyperparameter configurations'
            ],
            link: 'https://github.com/Dinesh-Tejus/Comparing-LORA-OFT-ETHER'
        },
        'blindsight': {
            badge: 'AI Accessibility',
            title: 'BlindSight: AI-Powered File Assistant',
            description: 'High-fidelity prototype for voice-controlled file system navigation for the visually impaired. Integrated OpenAI Whisper CPP (Tiny model) for speech-to-text with Llama-1:70B via Groq API for natural language command interpretation. Implemented multi-threaded document reading, space-bar interrupt control, and pyttsx3 text-to-speech. Achieved 95% speech recognition accuracy and 85% task success rate across file operations.',
            metrics: [
                { value: '95%', label: 'Speech Accuracy' },
                { value: '85%', label: 'Task Success' },
                { value: '70B', label: 'LLM Params' }
            ],
            technologies: ['LLaMA-70B', 'Whisper CPP', 'Groq API', 'pyttsx3', 'Python', 'Multi-threading'],
            features: [
                'Whisper CPP speech-to-text with 95% accuracy on voice commands',
                'Llama-70B via Groq API for natural language command interpretation',
                'Multi-threaded document reader for parallel file processing',
                'Space-bar interrupt functionality for real-time voice control',
                'Cross-platform support (Windows 10/11, macOS 12–15)'
            ],
            link: 'https://github.com/Dinesh-Tejus/BlindSight'
        },
        'unlearning': {
            badge: 'Research',
            title: 'Machine Unlearning Research',
            description: 'Investigated selective knowledge removal from Llama-3-8B-Instruct targeting the Harry Potter universe. Compared three unlearning approaches: LoRA fine-tuning drove target-domain perplexity from 24.58 to 5.7×10¹² while preserving general knowledge (WikiText-2 perplexity: 15.49). Sparse Autoencoder approach ablated top-100 features with high Harry Potter activation, achieving subtler forgetting (perplexity 53.85) with better fluency. Guardrailing was effective but vulnerable to jailbreaking.',
            metrics: [
                { value: '5.7e12', label: 'Target Perplexity' },
                { value: '15.49', label: 'General Perplexity' },
                { value: '3', label: 'Methods' }
            ],
            technologies: ['LLaMA-3-8B', 'Sparse Autoencoders', 'LoRA', 'PyTorch', 'Guardrailing', 'Feature Ablation'],
            features: [
                'LoRA unlearning: target perplexity 24.58 → 5.7×10¹² with general knowledge preserved',
                'Sparse Autoencoder: ablated top-100 HP-activated features for targeted forgetting',
                'WikiText-2 perplexity maintained at 15.49 (vs 16.01 baseline) after LoRA unlearning',
                'Comparative analysis of aggressive vs subtle forgetting trade-offs',
                'Guardrailing analysis revealing jailbreak vulnerabilities in prompt-based approaches'
            ],
            link: 'https://github.com/Dinesh-Tejus/Machine-Unlearning'
        },
        'translation': {
            badge: 'NLP',
            title: 'Regional Language Translation',
            description: 'Built an LSTM-based encoder-decoder with attention mechanism from scratch for Kannada-English translation, then fine-tuned mT5-base on 150,000 parallel sentence pairs from a 75M corpus. The attention mechanism removed the encoder bottleneck, and fine-tuning improved BLEU score from 0.0715 to 0.0823 (15% improvement). Used SentencePiece tokenization to handle Kannada\'s rich morphology with 512-token dialogue and 128-token summary lengths.',
            metrics: [
                { value: '15%', label: 'BLEU Improvement' },
                { value: '150K', label: 'Parallel Pairs' },
                { value: 'mT5', label: 'Base Model' }
            ],
            technologies: ['LSTM', 'Attention Mechanism', 'mT5', 'SentencePiece', 'Seq2Seq', 'PyTorch'],
            features: [
                'LSTM encoder-decoder with attention mechanism built from scratch',
                'Fine-tuned mT5-base achieving 15% BLEU improvement (0.0715 → 0.0823)',
                'SentencePiece tokenization for Kannada morphological richness',
                'Trained on 150K pairs from 75M parallel corpus',
                'Attention alignment visualization to analyze translation quality'
            ],
            link: 'https://github.com/Dinesh-Tejus/Kannada-English-Translation'
        },
        'gpt2': {
            badge: 'Deep Learning',
            title: 'Custom GPT-2 Implementation',
            description: 'Implemented GPT-2 Medium (~260M parameters) from scratch with 24 transformer layers, 16 attention heads, and 1024-dimensional embeddings. Achieved perplexity of 279.78 on WikiText (8.6% improvement over the Small variant at 306.19). Implemented three decoding strategies: greedy search, top-k sampling, and nucleus (top-p) sampling. Training loss converged from 7.5 to 4.4 over 5 epochs with validation plateauing at epoch 3.',
            metrics: [
                { value: '260M', label: 'Parameters' },
                { value: '279.8', label: 'Perplexity' },
                { value: '24', label: 'Layers' }
            ],
            technologies: ['GPT-2', 'PyTorch', 'Transformers', 'Causal Self-Attention', 'Nucleus Sampling', 'WikiText'],
            features: [
                '260M parameter decoder-only transformer with 24 layers and 16 attention heads',
                'Perplexity of 279.78, 8.6% improvement over Small variant (306.19)',
                'Three decoding strategies: greedy, top-k, and nucleus (top-p) sampling',
                'Causal self-attention with cross-entropy token prediction objective',
                'Training convergence from 7.5 to 4.4 loss with epoch-level checkpointing'
            ],
            link: '#'
        },
        'dialogue': {
            badge: 'NLP',
            title: 'Dialogue Summarization',
            description: 'Evaluated three transformer architectures (BART, T5-large, PEGASUS) on the SAMSum dialogue summarization dataset of 16,369 conversations. Fine-tuned BART-large-CNN with FP16 mixed precision training, reducing training loss from 0.97 to 0.23 over 459 steps. Achieved ROUGE-1: 0.4193 and ROUGE-2: 0.2162, outperforming T5-large (0.3394) and PEGASUS-xsum (0.2144). Monitored via Wandb with ROUGE metric tracking.',
            metrics: [
                { value: '0.419', label: 'ROUGE-1' },
                { value: '0.216', label: 'ROUGE-2' },
                { value: '3', label: 'Models Compared' }
            ],
            technologies: ['BART', 'T5-large', 'PEGASUS', 'HuggingFace', 'PyTorch', 'Wandb'],
            features: [
                'BART-large-CNN fine-tuned with FP16 mixed precision (loss 0.97 → 0.23)',
                'Outperformed T5-large and PEGASUS-xsum on SAMSum benchmark',
                '3-model comparative evaluation with Lead-3 baseline',
                'Trained on 14,732 dialogues with Seq2SeqTrainer and AdamW optimizer',
                'ROUGE metric monitoring via Weights & Biases integration'
            ],
            link: '#'
        },
        'penicillin': {
            badge: 'Big Data',
            title: 'Biopharmaceutical Manufacturing Analysis',
            description: 'Conducted distributed big data analysis using Hadoop for storage and PySpark for in-memory processing on Databricks to optimize penicillin production. Analyzed large-scale manufacturing datasets to identify key parameters affecting yield and optimized production settings for efficiency using MapReduce pipelines.',
            metrics: [
                { value: 'Big Data', label: 'Scale' },
                { value: 'PySpark', label: 'Processing' },
                { value: 'Hadoop', label: 'Storage' }
            ],
            technologies: ['Big Data', 'PySpark', 'Hadoop', 'MapReduce', 'Databricks Products', 'Big Data Analytics'],
            features: [
                'Hadoop distributed storage for large-scale manufacturing data',
                'PySpark in-memory processing for real-time analytics',
                'MapReduce pipelines for batch parameter analysis',
                'Yield optimization through multi-variable parameter tuning',
                'Databricks-hosted distributed computing environment'
            ],
            link: '#'
        },
        'loan-payback': {
            badge: 'Kaggle Competition',
            title: 'Predicting Loan Payback',
            description: 'Kaggle Playground Series competition predicting loan repayment on 593,994 training records. Built a Level 2 stacked ensemble with Logistic Regression, XGBoost, CatBoost, and LightGBM as base learners and a LightGBM meta-model with isotonic calibration, achieving ROC-AUC of 0.92366. Validated through 5-fold stratified cross-validation with adversarial testing to detect train-test distribution shifts. SHAP analysis provided model interpretability across borrower financials and credit history features.',
            metrics: [
                { value: '0.923', label: 'ROC-AUC' },
                { value: '594K', label: 'Records' },
                { value: '4', label: 'Models' }
            ],
            technologies: ['XGBoost', 'CatBoost', 'LightGBM', 'Logistic Regression', 'SHAP', 'Ensemble Learning'],
            features: [
                'Level 2 stacked ensemble with isotonic-calibrated LightGBM meta-model',
                'Combined Logistic Regression, XGBoost, CatBoost, and LightGBM base learners',
                'SHAP analysis for model interpretability and feature importance',
                '5-fold stratified cross-validation with adversarial distribution testing',
                'Handled class imbalance (80% repayment, 20% default) effectively'
            ],
            link: '#'
        }
    };

    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;

    // Open modal when clicking on project card
    document.querySelectorAll('.project-card-mini').forEach(card => {
        card.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];

            if (project) {
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

// Experience Modal System
function initExperienceModals() {
    const modal = document.getElementById('experienceModal');
    const modalBody = document.getElementById('experienceModalBody');
    const modalClose = document.getElementById('experienceModalClose');
    const modalOverlay = modal.querySelector('.modal-overlay');

    // Open modal when clicking on experience card
    document.querySelectorAll('.experience-card').forEach(card => {
        card.addEventListener('click', function () {
            const logo = this.querySelector('.company-logo').outerHTML;
            const title = this.querySelector('.job-title').textContent;
            const company = this.querySelector('.company').textContent;
            const duration = this.querySelector('.duration').textContent;
            const description = this.querySelector('.job-description').textContent;
            const metrics = this.querySelector('.impact-metrics').outerHTML;
            const details = this.querySelector('.experience-details').innerHTML;
            const techTags = this.querySelector('.tech-tags').outerHTML;

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

            const injectedMetrics = modalBody.querySelector('.impact-metrics');
            if (injectedMetrics) {
                injectedMetrics.style.background = 'transparent';
                injectedMetrics.style.border = 'none';
                injectedMetrics.style.padding = '0';
                injectedMetrics.style.margin = '0';
            }

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
    initSmoothScroll();
    animateCounters();
    initScrollAnimations();
    initHeaderScroll();
    initNavigationState();
    initMobileNav();
    initExperienceModals();
    initProjectModals();
});

// Handle window resize
window.addEventListener('resize', throttle(() => {
    // Reinitialize functions if needed
}, 250));
