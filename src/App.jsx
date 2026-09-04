import React, { useEffect, useMemo, useState } from 'react';
import portrait from '../images/portrait-refined.webp';
import translationImage from '../images/EngToKan.webp';
import blindSightImage from '../images/Blindsight.png';

const entries = [
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
    date: 'Mar 2026 - present',
    org: 'Reidy.AI',
    location: 'Current role',
    role: 'AI Developer',
    summary: 'Currently working as an AI Developer at Reidy.AI.',
    bullets: [],
    stack: '',
  },
  {
    id: 'neu',
    date: 'Sep - Dec 2025',
    org: 'Northeastern University, Khoury College',
    location: 'Boston, Massachusetts',
    role: 'Graduate Teaching Assistant',
    summary: 'Supported Natural Language Processing students across course concepts and practical implementation.',
    bullets: [
      'Supported students learning transformer architectures, attention mechanisms, fine-tuning techniques, and NLP pipeline development.',
      'Conducted office hours, graded assignments, and assisted with material from tokenization through large language models.',
    ],
    stack: 'NLP / Transformers / PyTorch / Hugging Face / Teaching',
  },
  {
    id: 'c10',
    date: 'Aug - Dec 2024',
    org: 'C10 Labs',
    location: 'Cambridge, Massachusetts',
    role: 'Machine Learning Engineer Co-op',
    summary: 'Developed multi-agent systems for database retrieval, document processing, and high-volume email analysis.',
    bullets: [
      'Developed a multi-agent RAG SQL chatbot using AutoGen and Neo4j knowledge graphs, achieving 75%+ accuracy.',
      'Built document pipelines for 500-1,500 page specifications with LLM-powered extraction and summarization.',
      'Built an email-classification system with 85%+ accuracy and reduced API costs by 40% through prompt and retrieval optimization.',
    ],
    stack: 'AutoGen / LangChain / LangGraph / OpenAI / Neo4j / Vector databases / AWS',
  },
  {
    id: 'autodesk',
    date: 'Jun 2021 - Aug 2023',
    org: 'Autodesk',
    location: 'Bengaluru, India',
    role: 'Software Engineer',
    summary: 'Built enterprise authentication, access-provisioning, monitoring, and analytics systems in the Microsoft Azure ecosystem.',
    bullets: [
      'Architected Azure App Proxy solutions for secure enterprise authentication.',
      'Automated SSO provisioning, reducing setup time from two weeks to three minutes.',
      'Built Power BI dashboards and data pipelines for a Microsoft Authenticator rollout.',
    ],
    stack: 'Azure / Azure App Proxy / Python / Power BI / OAuth 2.0 / SAML / SSO',
  },
];

const focusNotes = [
  ['Multi-agent AI systems', 'Orchestration, retrieval, and knowledge-graph workflows that connect language models to useful tools and data.'],
  ['Efficient model adaptation', 'Parameter-efficient fine-tuning and practical experiments in selective knowledge removal.'],
  ['AI people can use', 'Developer tools, accessibility interfaces, and production workflows built around real constraints.'],
];

function Header({ dark, onThemeToggle }) {
  const [open, setOpen] = useState(false);
  const links = [['#entries', 'Entries'], ['#experience', 'Experience'], ['#about', 'About'], ['#contact', 'Write to me']];

  return (
    <header className="site-header">
      <div className="page-width header-inner">
        <a className="brand" href="#top" aria-label="Tejus Dinesh, home">Tejus Dinesh</a>
        <nav className={open ? 'is-open' : ''} aria-label="Primary navigation">
          {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="text-control" type="button" onClick={onThemeToggle} title="Change color theme">
            {dark ? 'Light' : 'Dark'}
          </button>
          <button className="menu-control" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">
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

function ProjectShowcase({ projects, onOpen }) {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((entry) => entry.id === activeId) || projects[0];

  useEffect(() => {
    if (!projects.some((entry) => entry.id === activeId)) setActiveId(projects[0].id);
  }, [activeId, projects]);

  return (
    <div className="project-showcase">
      <div className="project-index" role="tablist" aria-label="Selected projects">
        {projects.map((entry) => (
          <button
            key={entry.id}
            className={entry.id === active.id ? 'is-active' : ''}
            type="button"
            role="tab"
            aria-selected={entry.id === active.id}
            onClick={() => setActiveId(entry.id)}
          >
            <span>{entry.type}</span>
            <strong>{entry.shortTitle}</strong>
          </button>
        ))}
      </div>
      <article className="project-stage" key={active.id}>
        <ProjectVisual entry={active} />
        <div className="project-copy">
          <p>{active.signal}</p>
          <h3>{active.title}</h3>
          <p className="project-summary">{active.excerpt}</p>
          <button className="inline-action" type="button" onClick={() => onOpen(active)}>Project details</button>
        </div>
      </article>
    </div>
  );
}

function EntryModal({ entry, onClose }) {
  useEffect(() => {
    if (!entry) return undefined;
    const onKey = (event) => event.key === 'Escape' && onClose();
    document.body.classList.add('dialog-open');
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('dialog-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [entry, onClose]);

  if (!entry) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className="entry-modal" role="dialog" aria-modal="true" aria-labelledby="entry-modal-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close project details">Close</button>
        <ProjectVisual entry={entry} modal />
        <div className="modal-copy">
          <p className="modal-type">{entry.type}</p>
          <h2 id="entry-modal-title">{entry.title}</h2>
          {entry.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <a className="primary-action" href={entry.link} target="_blank" rel="noreferrer">Open repository</a>
        </div>
      </article>
    </div>
  );
}

function ExperienceRow({ experience, open, onToggle }) {
  return (
    <article className={`role ${open ? 'is-expanded' : ''}`}>
      <button className="role-heading" type="button" onClick={onToggle} aria-expanded={open}>
        <span className="role-date">{experience.date}</span>
        <span className="role-identity">
          <strong>{experience.role}</strong>
          <span>{experience.org}</span>
        </span>
        <span className="role-location">{experience.location}</span>
        <span className="role-toggle" aria-hidden="true">{open ? '-' : '+'}</span>
      </button>
      <div className="role-panel" hidden={!open}>
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
  const [focusIndex, setFocusIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [openRole, setOpenRole] = useState('reidy');
  const filteredEntries = useMemo(() => filter === 'all' ? entries : entries.filter((entry) => entry.category === filter), [filter]);

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
      <Header dark={dark} onThemeToggle={() => setDark((value) => !value)} />
      <main id="top">
        <section className="hero page-width">
          <div className="hero-copy">
            <p className="hero-role">AI Developer at Reidy.AI</p>
            <h1>I build AI systems<br /><span>that hold up in use.</span></h1>
            <p className="hero-intro">Agents, retrieval, model adaptation, and practical machine learning shaped around real constraints.</p>
            <div className="hero-actions">
              <a className="primary-action" href="#entries">View work</a>
              <a className="secondary-action" href="mailto:dtejus03@gmail.com">Email me</a>
            </div>
          </div>
          <figure className="hero-portrait">
            <img src={portrait} alt="Tejus Dinesh wearing a coral hoodie in a glass atrium" />
            <figcaption>Tejus Dinesh / Houston, Texas</figcaption>
          </figure>
          <div className="hero-facts" aria-label="Profile summary">
            <p><span>Current</span><strong>AI Developer, Reidy.AI</strong></p>
            <p><span>Background</span><strong>AI, ML, enterprise software</strong></p>
            <p><span>Education</span><strong>MS in AI, Northeastern</strong></p>
          </div>
        </section>

        <section className="focus-band">
          <div className="page-width focus-layout">
            <div className="focus-heading">
              <p>What I am thinking about now</p>
              <div className="focus-controls" role="group" aria-label="Choose focus area">
                {focusNotes.map(([title], index) => (
                  <button key={title} className={focusIndex === index ? 'is-active' : ''} type="button" onClick={() => setFocusIndex(index)} aria-label={`Show ${title}`} />
                ))}
              </div>
            </div>
            <div className="focus-copy" key={focusIndex}>
              <h2>{focusNotes[focusIndex][0]}</h2>
              <p>{focusNotes[focusIndex][1]}</p>
            </div>
          </div>
        </section>

        <section className="entries page-width" id="entries" data-reveal>
          <div className="section-heading">
            <h2>Selected work</h2>
            <p>Research and builds where the implementation matters as much as the idea.</p>
          </div>
          <div className="project-filters" role="group" aria-label="Filter projects">
            {[['all', 'All'], ['builds', 'Builds'], ['research', 'Research']].map(([value, label]) => (
              <button key={value} type="button" className={filter === value ? 'is-active' : ''} onClick={() => setFilter(value)}>{label}</button>
            ))}
          </div>
          <ProjectShowcase projects={filteredEntries} onOpen={setSelectedEntry} />
        </section>

        <section className="experience" id="experience" data-reveal>
          <div className="page-width">
            <div className="experience-intro">
              <h2>From enterprise software to applied AI.</h2>
              <p>Five years across engineering, research, and teaching, with the work itself kept visible.</p>
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
          <div className="about-statement">
            <h2>A technical career is part of a life, not the whole page.</h2>
            <p>Based in Houston, I build AI systems, study how models behave, and keep a life outside the terminal.</p>
          </div>
          <div className="about-details">
            <p>I completed my MS in Artificial Intelligence at Northeastern University in December 2025. My work spans multi-agent systems, RAG, knowledge graphs, model fine-tuning, machine unlearning, NLP, and developer tooling.</p>
            <p>Chess, basketball, hiking, and television are part of the context, not a forced visual theme. Over time, this site can grow into technical notes, personal writing, photographs, and trip records.</p>
          </div>
          <div className="future-pages" aria-label="Future site areas">
            <span>Projects</span>
            <span>Research</span>
            <span>Notes</span>
            <span>Life</span>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="page-width footer-layout">
          <div>
            <h2>Good work starts with a useful conversation.</h2>
            <a className="footer-email" href="mailto:dtejus03@gmail.com">dtejus03@gmail.com</a>
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
