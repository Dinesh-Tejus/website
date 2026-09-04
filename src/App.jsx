import React, { useEffect, useRef, useState } from 'react';
import portrait from '../images/portrait-refined-sharp.webp';
import translationImage from '../images/EngToKan.webp';
import blindSightImage from '../images/Blindsight.png';

const entries = [
  {
    id: 'scout',
    category: 'builds',
    type: 'Voice AI',
    title: 'Scout: Voice-Powered Brand Research',
    shortTitle: 'Scout',
    excerpt: 'A voice-powered brand research agent built with the Gemini 2.5 Live API, Tavily, and Firestore.',
    body: [
      'Scout is a voice-powered agent for brand research, combining live voice interaction through the Gemini 2.5 Live API with web research from Tavily.',
      'The application uses Firestore for data, FastAPI and React for its backend and frontend, and runs on Cloud Run.',
    ],
    signal: 'Gemini 2.5 Live + Tavily + Firestore',
  },
  {
    id: 'darwin',
    category: 'builds',
    type: 'Developer tools',
    title: 'Darwin: Legacy Package Detector',
    shortTitle: 'Darwin',
    excerpt: 'An AI-driven VS Code extension that flags unmaintained packages and helps automate migrations using Gemini and Tavily.',
    body: [
      'Darwin scans Python and JavaScript or TypeScript imports for deprecated or unmaintained packages. It combines Tavily web search with Google Gemini analysis to assess package health.',
      'The extension provides inline diagnostics, migration suggestions with diff previews, workspace-wide scanning, local caching, confidence thresholds, ignore lists, and undo support.',
    ],
    signal: 'Gemini + Tavily + VS Code',
    link: 'https://github.com/Dinesh-Tejus/Darwin',
  },
  {
    id: 'blindsight',
    category: 'builds',
    type: 'AI accessibility',
    title: 'BlindSight: AI-Powered File Assistant',
    shortTitle: 'BlindSight',
    excerpt: 'A voice-controlled file navigation prototype using Whisper CPP, Llama-70B through Groq, and text-to-speech.',
    body: [
      'BlindSight is a high-fidelity prototype for voice-controlled file-system navigation for visually impaired users. Whisper CPP handles speech-to-text, while a Llama 70B model through the Groq API interprets natural-language commands.',
      'The prototype supports folder navigation, file and directory creation, document reading and editing, text-to-speech feedback, and a keyboard interrupt control. Testing recorded 95% speech-recognition accuracy and an 85% task-success rate.',
    ],
    image: blindSightImage,
    alt: 'BlindSight project mark',
    signal: '95% speech accuracy / 85% task success',
    link: 'https://github.com/Dinesh-Tejus/BlindSight',
  },
  {
    id: 'unlearning',
    category: 'research',
    type: 'Machine unlearning',
    title: 'Selective knowledge removal from Llama-3-8B',
    shortTitle: 'Unlearning',
    excerpt: 'A comparison of LoRA fine-tuning, sparse autoencoder feature ablation, and prompt-based guardrailing.',
    body: [
      'The project evaluates three approaches to removing Harry Potter knowledge from Llama-3-8B-Instruct: LoRA fine-tuning, sparse autoencoder feature ablation, and guardrailing.',
      'LoRA increased target-domain perplexity from 24.58 to 5.7 x 10^12 while maintaining a WikiText-2 perplexity of 15.49. The sparse-autoencoder experiment ablated the 100 most active target-domain features for a more selective intervention.',
    ],
    signal: 'Perplexity 24.58 to 5.7 x 10^12',
    link: 'https://github.com/Dinesh-Tejus/Machine-Unlearning',
  },
  {
    id: 'fine-tuning',
    category: 'research',
    type: 'Model adaptation',
    title: 'Comparing LoRA, OFT, and ETHER',
    shortTitle: 'Fine-tuning',
    excerpt: 'An implementation-focused comparison of three parameter-efficient language-model fine-tuning methods.',
    body: [
      'This project implements LoRA, OFT, and ETHER as parameter-efficient methods for fine-tuning a language model and comparing their results.',
      'LoRA recorded the highest ROUGE-1 score at 0.7385 with roughly 4 million trainable parameters. ETHER+ used 344,000 trainable parameters, recorded a ROUGE-1 score of 0.6278, and used 30% GPU compared with 80% for LoRA and OFT.',
    ],
    signal: '344K parameters / 30% GPU with ETHER+',
    link: 'https://github.com/Dinesh-Tejus/Comparing-LORA-OFT-ETHER',
  },
  {
    id: 'translation',
    category: 'builds',
    type: 'Natural language processing',
    title: 'Regional Language Translation',
    shortTitle: 'Translation',
    excerpt: 'A comparison between a custom encoder-decoder model and fine-tuned mT5 for Kannada-English translation.',
    body: [
      'The project implements an LSTM encoder-decoder with attention, then compares it with mT5-base fine-tuned on 150,000 Kannada-English sentence pairs.',
      'The mT5 experiment improved BLEU from 0.0715 to 0.0823, a 15% increase. SentencePiece tokenization was used to handle Kannada morphology.',
    ],
    image: translationImage,
    alt: 'Illustration of an encoder-decoder Kannada-English translation system',
    signal: '150K sentence pairs / 15% BLEU improvement',
    link: 'https://github.com/Dinesh-Tejus/Kannada-English-Translation',
  },
];

const experiences = [
  {
    id: 'reidy',
    date: 'Mar 2026 - Present',
    org: 'Reidy.AI',
    location: 'Full Stack AI Developer',
    role: 'Full Stack AI Developer',
    summary: 'Building an agentic property appraisal pipeline that turns dense inputs into long-form reports and usable decisions.',
    bullets: [
      'Built an agentic appraisal pipeline that generates 70-100 page property reports.',
      'Developed NL-to-SQL workflows over property datasets with DuckDB.',
      'Supported pre-sales discovery, architecture reviews, and POCs.',
    ],
    stack: 'DuckDB / NL-to-SQL / Agents / Property analytics',
  },
  {
    id: 'c10',
    date: 'Aug 2024 - Dec 2024',
    org: 'C10 Labs',
    location: 'Machine Learning Engineer Co-op',
    role: 'Machine Learning Engineer Co-op',
    summary: 'Built multi-agent retrieval systems, extraction pipelines, and high-volume email automation.',
    bullets: [
      'Built a multi-agent RAG Q&A system using knowledge graphs.',
      'Developed extraction pipelines for 500-1500 page documents.',
      'Delivered contract risk assessment and high-volume email agents.',
    ],
    stack: 'AutoGen / LangChain / LangGraph / OpenAI / Neo4j',
  },
  {
    id: 'autodesk',
    date: 'Jun 2021 - Aug 2023',
    org: 'Autodesk',
    location: 'Software Engineer',
    role: 'Software Engineer',
    summary: 'Worked on enterprise authentication and access tooling in the Microsoft Azure ecosystem.',
    bullets: [
      'Built Azure App Proxy solutions for secure enterprise access.',
      'Automated SSO provisioning.',
      'Built Microsoft Authenticator analytics dashboards in Power BI.',
    ],
    stack: 'Azure / App Proxy / SSO / Power BI',
  },
  {
    id: 'neu',
    date: 'Aug 2023 - Dec 2025',
    org: 'Northeastern University',
    location: 'M.S. in Artificial Intelligence',
    role: 'M.S. in Artificial Intelligence',
    summary: 'Completed graduate study in AI with a 3.96/4.00 GPA and coursework spanning LLMs, ML, and NLP.',
    bullets: [
      'GPA: 3.96 / 4.00.',
      'Coursework focused on large language models, machine learning, and natural language processing.',
    ],
    stack: 'Northeastern University / AI / LLMs / ML / NLP',
  },
];

const focusNotes = [
  ['Multi-agent systems', 'Orchestration, retrieval, and knowledge-graph workflows that connect language models to useful tools and data.'],
  ['RAG and structured data', 'Practical retrieval, property analytics, and NL-to-SQL systems shaped around real constraints.'],
  ['Model adaptation and unlearning', 'Parameter-efficient fine-tuning, selective knowledge removal, and careful evaluation.'],
];

const profileFacts = [
  ['Current', 'Full Stack AI Developer, Reidy.AI'],
  ['Based in', 'Houston, Texas'],
  ['Education', 'M.S. Artificial Intelligence, Northeastern · 3.96 GPA'],
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

function Header({ dark, onThemeToggle }) {
  const [open, setOpen] = useState(false);
  const links = [['#work', 'Work'], ['#experience', 'Experience'], ['#about', 'About'], ['#contact', 'Contact']];

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
          <button className="theme-control" type="button" onClick={onThemeToggle} title={dark ? 'Switch to light mode' : 'Switch to dark mode'} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
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

function ProjectCard({ entry, onOpen }) {
  return (
    <article className={`project-card ${entry.id === 'scout' ? 'project-card--featured' : ''}`}>
      <ProjectVisual entry={entry} />
      <div className="project-card-body">
        <p className="project-type">{entry.type}</p>
        <h3>{entry.title}</h3>
        <p className="project-summary">{entry.excerpt}</p>
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
          {entry.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {entry.link && <a className="primary-action" href={entry.link} target="_blank" rel="noreferrer">Open repository</a>}
        </div>
      </article>
    </div>
  );
}

function ExperienceRow({ experience, open, onToggle }) {
  return (
    <article className={`role ${open ? 'is-expanded' : ''}`}>
      <button className="role-heading" type="button" onClick={onToggle} aria-expanded={open} aria-controls={`role-panel-${experience.id}`}>
        <span className="role-date">{experience.date}</span>
        <span className="role-identity">
          <strong>{experience.role}</strong>
          <span>{experience.org}</span>
        </span>
        <span className="role-location">{experience.location}</span>
        <span className="role-toggle" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className="role-panel" id={`role-panel-${experience.id}`} hidden={!open}>
        <p className="role-summary">{experience.summary}</p>
        {experience.bullets.length > 0 && (
          <ul>{experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        )}
        {experience.stack && <p className="role-stack">{experience.stack}</p>}
      </div>
    </article>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('site-theme') === 'dark');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [openRole, setOpenRole] = useState('reidy');
  const filteredEntries = entries;

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
            <p className="hero-role">Full Stack AI Developer at Reidy.AI</p>
            <h1>I build AI systems<br /><span>that are useful in practice.</span></h1>
            <p className="hero-intro">Agentic software, retrieval, structured data, and model adaptation: designed with enough discipline to hold up outside a demo.</p>
            <div className="hero-actions">
              <a className="primary-action" href="#work">View work</a>
              <a className="secondary-action" href="mailto:dtejus03@gmail.com">Email me</a>
            </div>
            <dl className="hero-facts" aria-label="Profile summary">
              {profileFacts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="hero-portrait">
            <img src={portrait} alt="Tejus Dinesh wearing a coral hoodie in a glass atrium" />
            <figcaption>Tejus Dinesh / Houston, Texas</figcaption>
          </figure>
        </section>

        <section className="overview-band">
          <div className="page-width overview-layout" data-reveal>
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Current direction</p>
              <h2>Practical systems, careful implementation, and simple interfaces.</h2>
            </div>
            <div className="overview-columns">
              {focusNotes.map(([title, text]) => (
                <div key={title} className="overview-item">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="entries page-width" id="work" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2>Projects that were built to ship, not just to impress.</h2>
            <p>Research and builds where the implementation has to survive contact with reality.</p>
          </div>
          <div className="project-grid">
            {filteredEntries.map((entry) => (
              <ProjectCard key={entry.id} entry={entry} onOpen={setSelectedEntry} />
            ))}
          </div>
        </section>

        <section className="experience" id="experience" data-reveal>
          <div className="page-width experience-layout">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Experience</p>
              <h2>From enterprise software to applied AI.</h2>
              <p>Experience across app access, retrieval, knowledge graphs, document pipelines, and the little things that keep systems trustworthy.</p>
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

        <section className="about page-width" id="about" data-reveal>
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">About</p>
            <h2>A technical career is part of a life, not the whole page.</h2>
          </div>
          <div className="about-grid">
            <p>I completed my MS in Artificial Intelligence at Northeastern University in December 2025 with a 3.96 GPA. My work spans multi-agent systems, RAG, knowledge graphs, model fine-tuning, machine unlearning, NLP, and developer tooling.</p>
            <p>That combination is the point: shipping useful systems, not just elegant demos.</p>
            <div className="about-points" aria-label="Selected focus areas">
              {focusNotes.map(([title]) => <span key={title}>{title}</span>)}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="page-width footer-layout" data-reveal>
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Good work starts with a useful conversation.</h2>
            <div className="footer-contact" aria-label="Contact Tejus Dinesh">
              <a href="mailto:dtejus03@gmail.com">dtejus03@gmail.com</a>
              <a href="tel:+18576547354">857-654-7354</a>
            </div>
          </div>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/tejus-dinesh/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/Dinesh-Tejus" target="_blank" rel="noreferrer">GitHub</a>
            <span>&copy; 2026 Tejus Dinesh</span>
          </div>
        </div>
      </footer>
      <EntryModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
    </>
  );
}
