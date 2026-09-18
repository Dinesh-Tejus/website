import React, { useEffect, useRef, useState } from 'react';
import portrait from '../images/portrait-refined-sharp.webp';
import translationImage from '../images/EngToKan.webp';
import blindSightImage from '../images/Blindsight.png';
import scoutArchitectureImage from '../images/scout-architecture.jpeg';

const heroProof = [
  ['Current', 'Reidy.AI · Full Stack AI Developer'],
  ['Stack', 'Agents · DuckDB · FastAPI · React'],
];

const entries = [
  {
    id: 'scout',
    category: 'builds',
    type: 'Featured case study · Voice AI',
    title: 'Scout: Voice-Powered Competitive Brand Intelligence',
    shortTitle: 'Scout',
    excerpt: 'A full-duplex voice and text system that lets founders and marketers research a visual competitive landscape in real time.',
    body: [
      'Scout turns a spoken prompt like “matcha brands in Boston” into a live competitive-intelligence session. It discovers relevant brands, refines the search loop, analyzes competitors’ visual identity, extracts positioning language, and streams market patterns plus white-space opportunities as research completes.',
      'The system combines Gemini Live native audio for real-time conversation, Gemini Flash vision for brand-image analysis, Tavily search and Parallel AI extraction for grounded competitor discovery, and a FastAPI + React 19 TypeScript/Vite interface for streaming results.',
      'Firestore caches source data and persists sessions, while Cloud Run and Cloud Build handle deployment. The important product detail is the loop: voice, search, extraction, vision analysis, synthesis, and UI streaming stay synchronized instead of becoming a static report.',
    ],
    image: scoutArchitectureImage,
    alt: 'High-level Scout architecture diagram showing voice, search, extraction, analysis, and streaming UI components',
    signal: 'Gemini Live audio / Gemini Flash vision / grounded streaming research',
    proof: [
      ['Interface', 'Full-duplex voice + text'],
      ['Pipeline', 'Discovery · vision · positioning'],
      ['Infra', 'FastAPI · React 19 · Firestore · Cloud Run'],
    ],
    link: 'https://github.com/Dinesh-Tejus/Scout',
  },
  {
    id: 'portfolio-threat-agent',
    category: 'builds',
    type: 'Case study · Applied AI monitoring',
    title: 'Portfolio Threat Early Warning Agent',
    shortTitle: 'Threat Agent',
    excerpt: 'A source-grounded research agent that watches a stock portfolio for validated negative catalysts, ranks materiality, and delivers concise threat briefs.',
    body: [
      'Portfolio Threat Early Warning Agent is a local research-and-monitoring system for investors who want portfolio-specific awareness without turning the product into a trading bot. A user supplies a portfolio JSON, then the agent searches the web with Tavily for recent negative catalysts that could matter to each holding.',
      'The important reliability boundary is deliberate: the agent discovers candidate threats, while the application verifies each claim against retrieved source snippets, enriches approved signals with Yahoo Finance market context, ranks materiality using exposure, sector concentration, stop distance, recency, severity, and price reaction, then renders a concise threat brief.',
      'Monitor mode sends validated new threats to Telegram and dedupes by source URL. The project explicitly avoids price prediction, trade recommendations, and stop changes, and includes a historical evaluation harness over known news windows that scores ticker, event, date, and materiality labels instead of rewarding final wording.',
    ],
    signal: 'Source-grounded retrieval / validation / materiality ranking / evals',
    proof: [
      ['Boundary', 'Agent discovers · app verifies'],
      ['Delivery', 'Telegram monitor + URL dedupe'],
      ['Eval', 'Historical news-window harness'],
    ],
    link: 'https://github.com/Dinesh-Tejus/Portfolio-Threat-Early-Warning-Agent',
  },
  {
    id: 'darwin',
    category: 'builds',
    type: 'Case study · Developer tools',
    title: 'Darwin: Legacy Package Detector',
    shortTitle: 'Darwin',
    excerpt: 'A VS Code extension for finding unmaintained packages and previewing migration paths before technical debt becomes a release blocker.',
    body: [
      'Darwin scans Python and JavaScript or TypeScript imports for deprecated or unmaintained packages, then uses web research and model analysis to judge package health.',
      'The extension includes inline diagnostics, migration suggestions with diff previews, workspace-wide scanning, local caching, confidence thresholds, ignore lists, and undo support.',
    ],
    signal: 'Gemini / Tavily / VS Code',
    proof: [
      ['Problem', 'Dependency health checks'],
      ['System', 'Inline diagnostics + diff previews'],
      ['Why it mattered', 'Workspace-wide migration guidance'],
    ],
    link: 'https://github.com/Dinesh-Tejus/Darwin',
  },
  {
    id: 'blindsight',
    category: 'builds',
    type: 'Case study · AI accessibility',
    title: 'BlindSight: AI-Powered File Assistant',
    shortTitle: 'BlindSight',
    excerpt: 'A voice-controlled file-system assistant for visually impaired users, built as a serious prototype rather than a concept deck.',
    body: [
      'BlindSight is a high-fidelity prototype for voice-controlled file-system navigation for visually impaired users. Whisper CPP handles speech-to-text, while a Llama 70B model through Groq interprets natural-language commands.',
      'The prototype supports folder navigation, file and directory creation, document reading and editing, text-to-speech feedback, and keyboard-interrupt control. Testing recorded 95% speech-recognition accuracy and an 85% task-success rate.',
    ],
    image: blindSightImage,
    alt: 'BlindSight project mark',
    signal: '95% speech accuracy / 85% task success',
    proof: [
      ['Problem', 'Voice-controlled file navigation'],
      ['System', 'Whisper CPP · Groq · TTS'],
      ['Result', '95% accuracy / 85% task success'],
    ],
    link: 'https://github.com/Dinesh-Tejus/BlindSight',
  },
  {
    id: 'unlearning',
    category: 'research',
    type: 'Case study · Machine unlearning',
    title: 'Selective knowledge removal from Llama-3-8B',
    shortTitle: 'Unlearning',
    excerpt: 'A controlled comparison of LoRA, sparse-autoencoder ablation, and guardrailing for removing Harry Potter knowledge from Llama-3-8B-Instruct.',
    body: [
      'The project evaluates three approaches to removing Harry Potter knowledge from Llama-3-8B-Instruct: LoRA fine-tuning, sparse autoencoder feature ablation, and guardrailing.',
      'LoRA increased target-domain perplexity from 24.58 to 5.7 × 10^12 while maintaining a WikiText-2 perplexity of 15.49. The sparse-autoencoder experiment ablated the 100 most active target-domain features for a more selective intervention.',
    ],
    signal: 'Perplexity 24.58 → 5.7 × 10^12',
    proof: [
      ['Problem', 'Targeted knowledge removal'],
      ['System', 'LoRA · SAE ablation · guardrailing'],
      ['Result', 'Selective intervention on Llama-3-8B'],
    ],
    link: 'https://github.com/Dinesh-Tejus/Machine-Unlearning',
  },
  {
    id: 'fine-tuning',
    category: 'research',
    type: 'Case study · Model adaptation',
    title: 'Comparing LoRA, OFT, and ETHER',
    shortTitle: 'Fine-tuning',
    excerpt: 'An implementation-focused comparison of three parameter-efficient language-model fine-tuning methods.',
    body: [
      'This project implements LoRA, OFT, and ETHER as parameter-efficient methods for fine-tuning a language model and comparing their results.',
      'LoRA recorded the highest ROUGE-1 score at 0.7385 with roughly 4 million trainable parameters. ETHER+ used 344,000 trainable parameters, recorded a ROUGE-1 score of 0.6278, and used 30% GPU compared with 80% for LoRA and OFT.',
    ],
    signal: '344K parameters / 30% GPU with ETHER+',
    proof: [
      ['Problem', 'PEFT tradeoffs'],
      ['System', 'LoRA · OFT · ETHER'],
      ['Result', '344K trainable params / 30% GPU'],
    ],
    link: 'https://github.com/Dinesh-Tejus/Comparing-LORA-OFT-ETHER',
  },
  {
    id: 'translation',
    category: 'builds',
    type: 'Case study · NLP',
    title: 'Regional Language Translation',
    shortTitle: 'Translation',
    excerpt: 'A comparison between a custom encoder-decoder model and fine-tuned mT5 for Kannada-English translation across 150,000 sentence pairs.',
    body: [
      'The project implements an LSTM encoder-decoder with attention, then compares it with mT5-base fine-tuned on 150,000 Kannada-English sentence pairs.',
      'The mT5 experiment improved BLEU from 0.0715 to 0.0823, a 15% increase. SentencePiece tokenization was used to handle Kannada morphology.',
    ],
    image: translationImage,
    alt: 'Illustration of an encoder-decoder Kannada-English translation system',
    signal: '150K sentence pairs / 15% BLEU gain',
    proof: [
      ['Problem', 'Kannada-English translation'],
      ['System', 'LSTM attention · mT5-base'],
      ['Result', 'BLEU 0.0715 → 0.0823'],
    ],
    link: 'https://github.com/Dinesh-Tejus/Kannada-English-Translation',
  },
];

const experiences = [
  {
    id: 'reidy',
    badge: 'Current role',
    date: 'Mar 2026 - Present',
    org: 'Reidy.AI',
    location: 'Full Stack AI Developer',
    role: 'Full Stack AI Developer',
    summary: 'Leading the applied AI work that turns property data into long-form reports, usable queries, and customer-ready systems.',
    signal: '70-100 page reports / DuckDB NL-to-SQL / customer-facing architecture',
    bullets: [
      'Built an agentic appraisal pipeline that turns property data into 70-100 page reports.',
      'Developed DuckDB-backed natural-language querying over property datasets for internal and customer workflows.',
      'Supported pre-sales discovery, architecture reviews, and POCs so the system matched the way operators actually work.',
    ],
    stack: 'Agents / DuckDB / property analytics / technical discovery',
  },
  {
    id: 'c10',
    badge: 'Previous role',
    date: 'Aug 2024 - Dec 2024',
    org: 'C10 Labs',
    location: 'Machine Learning Engineer Co-op',
    role: 'Machine Learning Engineer Co-op',
    summary: 'Built retrieval and automation systems for dense documents and high-volume workflows.',
    signal: '500-1500 page extraction / knowledge graphs / email automation',
    bullets: [
      'Built a multi-agent RAG Q&A system using knowledge graphs for structured retrieval.',
      'Developed extraction pipelines for 500-1500 page documents.',
      'Delivered contract-risk assessment and high-volume email agents.',
    ],
    stack: 'AutoGen / LangChain / LangGraph / OpenAI / Neo4j',
  },
  {
    id: 'autodesk',
    badge: 'Enterprise systems',
    date: 'Jun 2021 - Aug 2023',
    org: 'Autodesk',
    location: 'Software Engineer',
    role: 'Software Engineer',
    summary: 'Worked on access and analytics tooling where reliability, rollout, and internal adoption mattered.',
    signal: 'Azure App Proxy / SSO automation / Power BI dashboards',
    bullets: [
      'Built Azure App Proxy solutions for secure enterprise access.',
      'Automated SSO provisioning.',
      'Built Microsoft Authenticator analytics dashboards in Power BI.',
    ],
    stack: 'Azure / App Proxy / SSO / Power BI',
  },
  {
    id: 'neu',
    badge: 'Graduate study',
    date: 'Aug 2023 - Dec 2025',
    org: 'Northeastern University',
    location: 'M.S. in Artificial Intelligence',
    role: 'M.S. in Artificial Intelligence',
    summary: 'Completed graduate study in AI with a 3.96/4.00 GPA and coursework spanning LLMs, ML, and NLP.',
    signal: '3.96 GPA / LLMs / ML / NLP',
    bullets: [
      'GPA: 3.96 / 4.00.',
      'Coursework focused on large language models, machine learning, and natural language processing.',
    ],
    stack: 'Northeastern University / AI / research foundation',
  },
];

const currentFocus = [
  {
    title: 'Ship the workflow',
    text: 'Turn ambiguous business problems into usable AI tools with clean interfaces and real adoption paths.',
  },
  {
    title: 'Ground the system',
    text: 'Connect models to documents, databases, APIs, and live sources so answers are traceable.',
  },
  {
    title: 'Keep it honest',
    text: 'Add checks, evals, and boundaries so the product behaves under messy real-world inputs.'
  },
];

const skills = ['Python', 'TypeScript', 'LangGraph', 'FastAPI', 'DuckDB', 'Neo4j', 'Azure', 'React'];

const proofItems = [
  {
    eyebrow: 'Certification',
    title: 'Nebius Agentic AI Builder Certification',
    meta: 'Nebius Academy · Certification · Issued Aug 28, 2026 · Expires Aug 28, 2029',
    body: 'Credential issued to Tejus Dinesh for AI agents, AI applications, generative AI, and workflow design.',
    link: 'https://www.credly.com/badges/93e96bfb-90ff-4cf6-8345-11fb9eea01f9',
    linkLabel: 'View Credly badge',
    tags: ['AI Agents', 'AI applications', 'Generative AI', 'Workflows'],
  },
  {
    eyebrow: 'Publication',
    title: 'IoT-Equipped Smart Campus Using LoRa Technology',
    meta: 'Conference paper · Springer Singapore · ICDSMLA 2021 · Lecture Notes in Electrical Engineering, vol 947 · pp. 327–335',
    body: 'Published online February 7, 2023; analyzes LoRa technology for smart campus activities.',
    citation: 'Annapurna, D., Tejus, D., Narayan, G., Hegde, S., PratimMishra, P. (2023). IoT-Equipped Smart Campus Using LoRa Technology. In: Kumar, A., Senatore, S., Gunjan, V.K. (eds) ICDSMLA 2021. Lecture Notes in Electrical Engineering, vol 947. Springer, Singapore.',
    link: 'https://link.springer.com/chapter/10.1007/978-981-19-5936-3_30',
    linkLabel: 'View Springer chapter',
    doi: 'https://doi.org/10.1007/978-981-19-5936-3_30',
    tags: ['LoRa', 'Smart campus', 'IoT systems'],
  },
];

function ThemeIcon({ dark }) {
  return dark ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M18.3 15.7A8.5 8.5 0 0 1 8.3 5.7a7.5 7.5 0 1 0 10 10Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2.75v2.1M12 19.15v2.1M4.85 4.85l1.48 1.48M17.67 17.67l1.48 1.48M2.75 12h2.1M19.15 12h2.1M4.85 19.15l1.48-1.48M17.67 6.33l1.48-1.48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.48.09.66-.21.66-.47v-1.72c-2.69.59-3.26-1.13-3.26-1.13-.44-1.12-1.08-1.42-1.08-1.42-.88-.6.07-.59.07-.59.97.07 1.48.99 1.48.99.86 1.47 2.26 1.05 2.81.8.09-.63.34-1.05.61-1.29-2.15-.25-4.41-1.07-4.41-4.77 0-1.05.38-1.91 1-2.58-.1-.25-.43-1.26.1-2.62 0 0 .82-.26 2.68.99a9.3 9.3 0 0 1 4.88 0c1.86-1.25 2.68-.99 2.68-.99.53 1.36.2 2.37.1 2.62.62.67 1 1.53 1 2.58 0 3.71-2.27 4.52-4.43 4.76.35.3.67.89.67 1.8v2.67c0 .26.18.57.67.47A9.5 9.5 0 0 0 12 2.5Z" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5.2 8.7h3.1v10.1H5.2V8.7Zm1.6-4.9a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Zm3.8 4.9h3v1.4h.04c.42-.8 1.45-1.65 3-1.65 3.2 0 3.8 2.1 3.8 4.85v5.5h-3.1v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.58v4.99h-3.1V8.7Z" fill="currentColor" />
    </svg>
  );
}

function Header({ dark, onThemeToggle }) {
  const [open, setOpen] = useState(false);
  const links = [['#work', 'Work'], ['#experience', 'Experience'], ['#proof', 'Proof'], ['#focus', 'Build thesis'], ['#contact', 'Contact']];

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="page-width header-inner">
        <a className="brand" href="#main-content" aria-label="Tejus Dinesh, home">Tejus Dinesh</a>
        <nav id="primary-navigation" className={open ? 'is-open' : ''} aria-label="Primary navigation">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="icon-control github-control" href="https://github.com/Dinesh-Tejus" target="_blank" rel="noreferrer" aria-label="Tejus Dinesh on GitHub" title="GitHub">
            <GitHubIcon />
          </a>
          <a className="icon-control github-control" href="https://www.linkedin.com/in/tejus-dinesh/" target="_blank" rel="noreferrer" aria-label="Tejus Dinesh on LinkedIn" title="LinkedIn">
            <LinkedInIcon />
          </a>
          <button className="icon-control theme-control" type="button" onClick={onThemeToggle} title={dark ? 'Switch to light mode' : 'Switch to dark mode'} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
            <ThemeIcon dark={dark} />
            <span className="sr-only">{dark ? 'Light mode' : 'Dark mode'}</span>
          </button>
          <button className="menu-control" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="primary-navigation" aria-label="Toggle navigation">
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </header>
  );
}

function ProjectVisual({ entry, modal = false }) {
  if (entry.image) {
    return <img className={modal ? 'modal-image' : 'project-image'} src={entry.image} alt={entry.alt} />;
  }

  return (
    <div className={`project-art project-art--${entry.id} ${modal ? 'modal-art' : ''}`} aria-hidden="true">
      <span className="art-orbit" />
      <span className="art-line art-line-one" />
      <span className="art-line art-line-two" />
      <strong>{entry.shortTitle}</strong>
      <small>{entry.signal}</small>
    </div>
  );
}

function PillList({ items, compact = false }) {
  return (
    <ul className={compact ? 'project-pills project-pills--compact' : 'project-pills'}>
      {items.map(([label, value]) => (
        <li key={label} className="project-pill">
          <span className="project-pill-label">{label}</span>
          <span className="project-pill-value">{value}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ entry, onOpen }) {
  return (
    <article className={`project-card ${entry.id === 'scout' ? 'project-card--featured' : ''}`}>
      <ProjectVisual entry={entry} />
      <div className="project-card-body">
        <p className="project-type">{entry.type}</p>
        <h3>{entry.title}</h3>
        <p className="project-summary">{entry.excerpt}</p>
        <PillList items={entry.proof} compact />
        <div className="project-meta-row">
          <span>{entry.signal}</span>
          <button className="inline-action" type="button" onClick={() => onOpen(entry)}>Details</button>
        </div>
      </div>
    </article>
  );
}

function EntryModal({ entry, onClose }) {
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!entry) return undefined;
    previouslyFocusedRef.current = document.activeElement;

    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = Array.from(document.querySelectorAll('.entry-modal'))
        .flatMap((node) => Array.from(node.querySelectorAll(focusableSelector)))
        .filter((element) => !element.hasAttribute('disabled'));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.classList.add('dialog-open');
    window.addEventListener('keydown', onKey);
    queueMicrotask(() => closeButtonRef.current?.focus());
    return () => {
      document.body.classList.remove('dialog-open');
      window.removeEventListener('keydown', onKey);
      const previous = previouslyFocusedRef.current;
      if (previous && typeof previous.focus === 'function') {
        previous.focus();
      }
    };
  }, [entry, onClose]);

  if (!entry) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className="entry-modal" role="dialog" aria-modal="true" aria-labelledby="entry-modal-title" aria-describedby="entry-modal-description">
        <button ref={closeButtonRef} className="modal-close" type="button" onClick={onClose} aria-label="Close project details">Close</button>
        <ProjectVisual entry={entry} modal />
        <div className="modal-copy" id="entry-modal-description">
          <p className="modal-type">{entry.type}</p>
          <h2 id="entry-modal-title">{entry.title}</h2>
          <PillList items={entry.proof} />
          {entry.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {entry.link && <a className="primary-action" href={entry.link} target="_blank" rel="noreferrer">Open repository</a>}
        </div>
      </article>
    </div>
  );
}

function ExperienceRow({ experience, open, onToggle }) {
  return (
    <article className={`role ${open ? 'is-expanded' : ''} ${experience.id === 'reidy' ? 'role--featured' : ''}`}>
      <button className="role-heading" type="button" onClick={onToggle} aria-expanded={open} aria-controls={`role-panel-${experience.id}`}>
        <span className="role-date">{experience.date}</span>
        <span className="role-identity">
          {experience.badge && <span className="role-badge">{experience.badge}</span>}
          <strong>{experience.role}</strong>
          <span>{experience.org}</span>
        </span>
        <span className="role-location">{experience.location}</span>
        <span className="role-toggle" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className="role-panel" id={`role-panel-${experience.id}`} hidden={!open}>
        <p className="role-signal">{experience.signal}</p>
        <p className="role-summary">{experience.summary}</p>
        {experience.bullets.length > 0 && (
          <ul>
            {experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
        )}
        {experience.stack && <p className="role-stack">{experience.stack}</p>}
      </div>
    </article>
  );
}

function ProofCard({ item }) {
  return (
    <article className="proof-card">
      <p className="proof-eyebrow">{item.eyebrow}</p>
      <h3>{item.title}</h3>
      <p className="proof-meta">{item.meta}</p>
      <p className="proof-body">{item.body}</p>
      {item.citation && <p className="proof-citation">{item.citation}</p>}
      <div className="proof-tags" aria-label={`${item.eyebrow} details`}>
        {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <div className="proof-links">
        <a className="inline-action" href={item.link} target="_blank" rel="noreferrer">{item.linkLabel}</a>
        {item.doi && <a className="secondary-action" href={item.doi} target="_blank" rel="noreferrer">DOI</a>}
      </div>
    </article>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('site-theme') === 'dark');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [openRole, setOpenRole] = useState('reidy');

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('site-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((records) => {
      records.forEach((record) => {
        if (record.isIntersecting) {
          record.target.classList.add('is-visible');
          observer.unobserve(record.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header dark={dark} onThemeToggle={() => setDark((value) => !value)} />
      <main id="main-content">
        <section className="hero page-width">
          <div className="hero-copy">
            <p className="hero-role">Full Stack AI Developer · Reidy.AI</p>
            <h1>Applied AI research, engineered into real products.</h1>
            <p className="hero-intro">AI engineer-researcher building agents, retrieval systems, voice interfaces, and model workflows that survive contact with real users.</p>
            <p className="hero-note">I work where research meets product: prototyping quickly, grounding systems in evidence, and engineering the path from model behavior to shipped software.</p>
            <ul className="hero-proof" aria-label="Proof points">
              {heroProof.map(([label, value]) => (
                <li key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </li>
              ))}
            </ul>
            <div className="hero-actions">
              <a className="primary-action" href="#work">View work</a>
              <a className="secondary-action" href="mailto:dtejus03@gmail.com">Email me</a>
            </div>
          </div>
          <figure className="hero-portrait">
            <img src={portrait} alt="Tejus Dinesh wearing a coral hoodie in a glass atrium" />
            <figcaption>Tejus Dinesh / engineering work across AI products, retrieval, and enterprise systems</figcaption>
          </figure>
        </section>

        <section className="focus-band" id="focus">
          <div className="page-width focus-layout" data-reveal>
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Build thesis</p>
              <h2>Where AI gets real: data, tools, users.</h2>
              <p>A quick read on the kind of systems I like building: useful, grounded, and shipped.</p>
            </div>
            <div className="focus-grid">
              {currentFocus.map((item) => (
                <article key={item.title} className="focus-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="entries page-width" id="work" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2>Case studies from systems with scope, constraints, and measurable outcomes.</h2>
            <p>These are implementation-heavy projects that show what the system did, why it mattered, and how much it had to handle.</p>
          </div>
          <div className="project-grid">
            {entries.map((entry) => (
              <ProjectCard key={entry.id} entry={entry} onOpen={setSelectedEntry} />
            ))}
          </div>
        </section>

        <section className="experience" id="experience" data-reveal>
          <div className="page-width experience-layout">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Experience</p>
              <h2>A career story that moves from enterprise reliability to applied AI delivery.</h2>
              <p>Reidy is the current center of gravity; C10 and Autodesk show the leverage and systems thinking that led here, while Northeastern grounds the AI depth behind the work.</p>
            </div>
            <div className="role-list">
              {experiences.map((experience) => (
                <ExperienceRow
                  key={experience.id}
                  experience={experience}
                  open={openRole === experience.id}
                  onToggle={() => setOpenRole(openRole === experience.id ? null : experience.id)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="proof page-width" id="proof" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">Credentials & publication</p>
            <h2>Additional proof points behind the applied AI and systems work.</h2>
            <p>A concise record of external validation: an agentic AI credential and a peer-reviewed Springer conference paper.</p>
          </div>
          <div className="proof-grid">
            {proofItems.map((item) => <ProofCard key={item.title} item={item} />)}
          </div>
        </section>

        <section className="contact page-width" id="contact" data-reveal>
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Contact</p>
            <h2>Let’s build something useful.</h2>
            <p>Best for AI engineering roles, product builds, and collaborations where shipping matters.</p>
          </div>
          <div className="contact-layout">
            <div className="contact-panel contact-panel--feature">
              <p className="contact-label">Fastest route</p>
              <h3>Email me</h3>
              <p className="contact-copy">Hiring, consulting, applied AI builds, or serious collaborations — send the context and I’ll respond directly.</p>
              <a className="primary-action" href="mailto:dtejus03@gmail.com">dtejus03@gmail.com</a>
              <a className="secondary-action" href="tel:+185****7354">Call or text 857-654-7354</a>
            </div>
            <div className="contact-panel">
              <p className="contact-label">Profiles</p>
              <div className="contact-links" aria-label="Contact links">
                <a href="https://www.linkedin.com/in/tejus-dinesh/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="https://github.com/Dinesh-Tejus" target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-inner">
          <span>&copy; 2026 Tejus Dinesh</span>
          <span>Applied AI systems · Retrieval · Enterprise software</span>
        </div>
      </footer>
      <EntryModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
    </>
  );
}
