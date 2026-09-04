import React, { useEffect, useRef, useState } from 'react';
import portrait from '../images/portrait-refined-sharp.webp';
import translationImage from '../images/EngToKan.webp';
import blindSightImage from '../images/Blindsight.png';

const heroProof = [
  ['Current', 'Reidy.AI · Full Stack AI Developer'],
  ['Scope', '70-100 page appraisal reports'],
  ['Systems', '500-1500 page extraction pipelines'],
  ['Training', 'Northeastern M.S. AI · 3.96/4.00 GPA'],
];

const focusAreas = [
  {
    title: 'Multi-agent systems',
    text: 'Orchestration patterns that stay understandable as the workflow grows, with tools, retrieval, and handoffs wired together deliberately.',
  },
  {
    title: 'RAG + knowledge graphs',
    text: 'Document intelligence and structured retrieval for dense corpora, property data, and other domains where plain prompting is not enough.',
  },
  {
    title: 'Model adaptation + unlearning',
    text: 'Parameter-efficient fine-tuning, selective knowledge removal, and evaluation when the base model needs to be shaped for a specific job.',
  },
];

const entries = [
  {
    id: 'scout',
    category: 'builds',
    type: 'Voice AI',
    title: 'Scout: Voice-Powered Brand Research',
    shortTitle: 'Scout',
    excerpt: 'Live voice research workflow that combines Gemini 2.5 Live, Tavily search, and Firestore-backed state.',
    body: [
      'Scout turns voice into a real research interface. A user can ask follow-up questions naturally while the system keeps state in Firestore and resolves live web sources through Tavily.',
      'The application is built with FastAPI and React, runs on Cloud Run, and uses Gemini 2.5 Live for the conversational layer.',
    ],
    signal: 'Gemini 2.5 Live / Tavily / Firestore',
    proof: [
      ['Context', 'Voice-first brand research'],
      ['Build', 'FastAPI · React · Cloud Run'],
      ['System', 'Live speech + web research'],
    ],
  },
  {
    id: 'darwin',
    category: 'builds',
    type: 'Developer tools',
    title: 'Darwin: Legacy Package Detector',
    shortTitle: 'Darwin',
    excerpt: 'An AI-driven VS Code extension that flags unmaintained packages and helps automate migrations using Gemini and Tavily.',
    body: [
      'Darwin scans Python and JavaScript or TypeScript imports for deprecated or unmaintained packages, then uses web research and model analysis to judge package health.',
      'The extension includes inline diagnostics, migration suggestions with diff previews, workspace-wide scanning, local caching, confidence thresholds, ignore lists, and undo support.',
    ],
    signal: 'Gemini / Tavily / VS Code',
    proof: [
      ['Context', 'Dependency health checks'],
      ['Build', 'Inline diagnostics + diff previews'],
      ['System', 'Workspace scanning with undo'],
    ],
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
      'BlindSight is a high-fidelity prototype for voice-controlled file-system navigation for visually impaired users. Whisper CPP handles speech-to-text, while a Llama 70B model through Groq interprets natural-language commands.',
      'The prototype supports folder navigation, file and directory creation, document reading and editing, text-to-speech feedback, and keyboard-interrupt control. Testing recorded 95% speech-recognition accuracy and an 85% task-success rate.',
    ],
    image: blindSightImage,
    alt: 'BlindSight project mark',
    signal: '95% speech accuracy / 85% task success',
    proof: [
      ['Context', 'Voice-controlled file navigation'],
      ['Build', 'Whisper CPP · Groq · TTS'],
      ['Result', '95% accuracy / 85% task success'],
    ],
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
      'LoRA increased target-domain perplexity from 24.58 to 5.7 × 10^12 while maintaining a WikiText-2 perplexity of 15.49. The sparse-autoencoder experiment ablated the 100 most active target-domain features for a more selective intervention.',
    ],
    signal: 'Perplexity 24.58 → 5.7 × 10^12',
    proof: [
      ['Context', 'Targeted knowledge removal'],
      ['Build', 'LoRA · SAE ablation · guardrailing'],
      ['Result', 'Selective intervention on Llama-3-8B'],
    ],
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
    proof: [
      ['Context', 'PEFT comparison study'],
      ['Build', 'LoRA · OFT · ETHER'],
      ['Result', '344K trainable params / 30% GPU'],
    ],
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
    signal: '150K sentence pairs / 15% BLEU gain',
    proof: [
      ['Context', 'Kannada-English translation'],
      ['Build', 'LSTM attention · mT5-base'],
      ['Result', 'BLEU 0.0715 → 0.0823'],
    ],
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
    summary: 'Leading applied AI work where the output has to be long, structured, and defensible.',
    signal: '70-100 page reports / DuckDB NL-to-SQL / customer-facing architecture',
    bullets: [
      'Built an agentic appraisal pipeline that turns property data into 70-100 page reports.',
      'Developed DuckDB-backed NL-to-SQL workflows over property datasets.',
      'Supported pre-sales discovery, architecture reviews, and POCs with customers.',
    ],
    stack: 'Agents / DuckDB / property analytics / technical discovery',
  },
  {
    id: 'c10',
    date: 'Aug 2024 - Dec 2024',
    org: 'C10 Labs',
    location: 'Machine Learning Engineer Co-op',
    role: 'Machine Learning Engineer Co-op',
    summary: 'Built retrieval and automation systems for dense documents and high-volume workflows.',
    signal: '500-1500 page extraction / knowledge graphs / email automation',
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
    summary: 'Worked on enterprise access and analytics tooling where reliability and rollout mattered.',
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
    title: 'Multi-agent systems',
    text: 'Agent orchestration, tool use, and handoffs that remain understandable when the workflow stops being a demo and starts being a system.',
  },
  {
    title: 'RAG and structured data',
    text: 'Retrieval patterns, knowledge graphs, and NL-to-SQL setups that make language models useful against real datasets.',
  },
  {
    title: 'Model adaptation and unlearning',
    text: 'Fine-tuning, evaluation, and selective knowledge removal for teams that need control over what the model knows.',
  },
];

const skills = ['Python', 'TypeScript', 'LangGraph', 'FastAPI', 'DuckDB', 'Neo4j', 'Azure', 'React'];

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

function Header({ dark, onThemeToggle }) {
  const [open, setOpen] = useState(false);
  const links = [['#work', 'Work'], ['#experience', 'Experience'], ['#focus', 'Current focus'], ['#about', 'About'], ['#contact', 'Contact']];

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
            <h1>I build AI systems that hold up under real work.</h1>
            <p className="hero-intro">Agentic pipelines, retrieval layers, and data-heavy interfaces for long documents, property analytics, and enterprise workflows—shipped with enough rigor to be trusted outside a demo.</p>
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
              <p className="eyebrow">Current focus</p>
              <h2>Building systems that connect models to data, tools, and workflows.</h2>
              <p>Right now I’m focused on multi-agent orchestration, retrieval over dense documents, and model adaptation for product work that has to stay clear, auditable, and fast to ship.</p>
            </div>
            <div className="focus-grid">
              {currentFocus.map((item) => (
                <article key={item.title} className="focus-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
              <article className="focus-cta">
                <p className="contact-label">Available for</p>
                <p>AI product engineering, retrieval systems, multi-agent workflows, and implementation-heavy technical roles.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="entries page-width" id="work" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2>Case studies from projects where the implementation details matter.</h2>
            <p>These are systems with scale, constraints, and measurable outcomes—not portfolio cards that stop at the surface.</p>
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
              <h2>Roles that show engineering leverage, not just tenure.</h2>
              <p>From enterprise access to applied AI, the pattern is the same: ship systems that have to work, be explainable, and survive contact with users.</p>
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
            <p className="eyebrow">Background</p>
            <h2>Graduate AI study, enterprise software, and applied systems work.</h2>
          </div>
          <div className="about-grid">
            <p>I completed an M.S. in Artificial Intelligence at Northeastern University with a 3.96/4.00 GPA, after engineering work at Autodesk and applied AI roles at C10 Labs and Reidy.AI.</p>
            <p>The throughline across that path is simple: build useful systems, keep the interface clear, and measure the part that matters.</p>
            <div className="about-points" aria-label="Selected skills">
              {skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
        </section>

        <section className="contact page-width" id="contact" data-reveal>
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Contact</p>
            <h2>If the work is real, email is the right next step.</h2>
            <p>For roles, collaborations, or serious project conversations, reach out directly.</p>
          </div>
          <div className="contact-layout">
            <div className="contact-panel contact-panel--feature">
              <p className="contact-label">Fastest route</p>
              <h3>Email</h3>
              <p className="contact-copy">Best for hiring conversations, partnerships, and AI product work that needs implementation depth.</p>
              <a className="primary-action" href="mailto:dtejus03@gmail.com">dtejus03@gmail.com</a>
              <a className="secondary-action" href="tel:+18576547354">Call or text 857-654-7354</a>
            </div>
            <div className="contact-panel">
              <p className="contact-label">Elsewhere</p>
              <div className="contact-links" aria-label="Contact links">
                <a href="https://www.linkedin.com/in/tejus-dinesh/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="https://github.com/Dinesh-Tejus" target="_blank" rel="noreferrer">GitHub</a>
                <span>Tejus Dinesh</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-inner">
          <span>&copy; 2026 Tejus Dinesh</span>
        </div>
      </footer>
      <EntryModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
    </>
  );
}
