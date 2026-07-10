/* =========================================================================
   CONTENT DATA
   Kept separate from markup so the "service registry", project cards and
   timeline are each rendered from a single source of truth.
   ========================================================================= */

const SKILLS = [
  {
    name: 'languages',
    badge: 'core',
    tags: ['Python', 'SQL', 'JavaScript'],
  },
  {
    name: 'backend',
    badge: 'primary',
    tags: ['Django', 'Flask', 'FastAPI', 'REST APIs', 'Microservices', 'JWT / OAuth'],
  },
  {
    name: 'databases',
    badge: 'storage',
    tags: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    name: 'ml & generative-ai',
    badge: 'applied',
    tags: ['Scikit-learn', 'MLflow', 'NLP', 'LLMs', 'LangChain', 'RAG'],
  },
  {
    name: 'cloud',
    badge: 'infra',
    tags: ['AWS (S3, EC2)', 'Azure'],
  },
  {
    name: 'tooling',
    badge: 'ops',
    tags: ['Docker', 'Linux', 'Git', 'GitHub'],
  },
  {
    name: 'data libraries',
    badge: 'analysis',
    tags: ['Pandas', 'NumPy'],
  },
  {
    name: 'engineering practice',
    badge: 'foundations',
    tags: ['OOP', 'Data Structures & Algorithms', 'System Design'],
  },
];

const PROJECTS = [
  {
    name: 'TestTeller AI Agent',
    period: 'Feb 2025 — Aug 2025',
    status: '200 OK',
    stack: ['Python', 'RAG', 'Vector Databases', 'LLM Orchestration', 'Docker', 'REST APIs'],
    highlights: [
      'Designed an end-to-end AI system that converts technical documentation and source code into structured, executable test cases using a Retrieval-Augmented Generation pipeline.',
      'Built a modular ingestion and embedding pipeline handling multi-format inputs (PDF, DOCX, XLSX, Markdown, Git repositories), turning unstructured artifacts into searchable vector knowledge stores.',
      'Engineered a multi-provider LLM orchestration layer supporting OpenAI, Gemini, Claude and local Ollama models, with fallback routing for reliability and cost optimization.',
      'Developed a structured test-generation engine producing framework-specific output (Pytest, Playwright, Cypress, JUnit, Jest) via templated prompt engineering and retrieval-grounded context injection.',
      'Tuned chunking strategy and vector similarity, improving retrieval relevance and cutting manual test design effort by 70% in evaluation runs.',
      'Containerized the full system with Docker, isolating ingestion, embedding, retrieval and generation into independently scalable services.',
    ],
  },
  {
    name: 'Microservices-Based E-Commerce Backend',
    period: 'Oct 2025 — Apr 2026',
    status: '200 OK',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Docker Compose', 'OpenAPI', 'Microservices'],
    highlights: [
      'Designed a microservices e-commerce backend with FastAPI, decomposing the system into User, Product, Cart, Order and Payment services for independent deployment and fault isolation.',
      'Built and exposed 25+ asynchronous REST APIs, using FastAPI\u2019s async capabilities to handle concurrent requests and improve throughput under load.',
      'Implemented JWT-based authentication and role-based access control across services, keeping customer and admin workflows securely separated with stateless sessions.',
      'Orchestrated services with Docker and Docker Compose, standardizing environment configuration and reducing setup inconsistencies.',
      'Designed inter-service communication with structured API contracts and centralized request routing through a gateway layer, improving maintainability and observability.',
      'Optimized PostgreSQL performance with indexed queries and schema normalization, supporting high-volume transactional workloads.',
    ],
  },
];

const TIMELINE = [
  {
    kicker: 'Jan 2025 — Apr 2026',
    title: 'Master of Science, Information Technology',
    sub: 'Belhaven University, Mississippi',
  },
  {
    kicker: 'Aug 2016 — Sep 2020',
    title: 'Bachelor of Engineering, Computer Science',
    sub: 'JNTUH, India',
  },
  {
    kicker: 'June 2026',
    title: 'Microsoft Azure Certified',
    sub: 'Infosys Skillsoft',
  },
  {
    kicker: 'March 2026',
    title: 'Analytical SQL for Developers',
    sub: 'Oracle',
  },
];

/* =========================================================================
   INIT
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  renderRegistry();
  renderProjects();
  renderTimeline();

  initHeaderScroll();
  initMobileNav();
  initScrollSpy();
  initRevealOnScroll();
  initBackToTop();
  initTerminal();
  initNodeGraph();
});

/* =========================================================================
   RENDERERS
   ========================================================================= */
function renderRegistry() {
  const root = document.getElementById('registry');
  const frag = document.createDocumentFragment();

  SKILLS.forEach((group, i) => {
    const card = document.createElement('article');
    card.className = 'registry-card reveal';
    card.style.transitionDelay = `${(i % 4) * 60}ms`;

    card.innerHTML = `
      <div class="registry-head">
        <h3 class="registry-name">${group.name}</h3>
        <span class="registry-badge">${group.badge}</span>
      </div>
      <ul class="registry-tags">
        ${group.tags.map((t) => `<li>${t}</li>`).join('')}
      </ul>
    `;
    frag.appendChild(card);
  });

  root.appendChild(frag);
}

function renderProjects() {
  const root = document.getElementById('projects-list');
  const frag = document.createDocumentFragment();

  PROJECTS.forEach((project, i) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    card.dataset.open = i === 0 ? 'true' : 'false';
    card.style.transitionDelay = `${i * 80}ms`;

    card.innerHTML = `
      <button class="project-head" aria-expanded="${i === 0}">
        <div class="project-heading">
          <span class="project-name">${project.name}</span>
          <span class="project-period">${project.period}</span>
        </div>
        <div class="project-meta">
          <span class="status-pill">${project.status}</span>
          <span class="project-toggle" aria-hidden="true">+</span>
        </div>
      </button>
      <div class="project-body">
        <div class="project-body-inner">
          <ul class="project-stack">
            ${project.stack.map((s) => `<li>${s}</li>`).join('')}
          </ul>
          <ul class="project-highlights">
            ${project.highlights.map((h) => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    const headBtn = card.querySelector('.project-head');
    headBtn.addEventListener('click', () => {
      const isOpen = card.dataset.open === 'true';
      card.dataset.open = String(!isOpen);
      headBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    frag.appendChild(card);
  });

  root.appendChild(frag);
}

function renderTimeline() {
  const root = document.getElementById('timeline-list');
  const frag = document.createDocumentFragment();

  TIMELINE.forEach((item, i) => {
    const li = document.createElement('li');
    li.className = 'timeline-item reveal';
    li.style.transitionDelay = `${i * 70}ms`;
    li.innerHTML = `
      <p class="timeline-kicker">${item.kicker}</p>
      <h3 class="timeline-title">${item.title}</h3>
      <p class="timeline-sub">${item.sub}</p>
    `;
    frag.appendChild(li);
  });

  root.appendChild(frag);
}

/* =========================================================================
   HEADER: solid background once the page scrolls
   ========================================================================= */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* =========================================================================
   MOBILE NAV TOGGLE
   ========================================================================= */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu whenever a link is chosen
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* =========================================================================
   SCROLL SPY: highlight the nav link matching the section in view
   ========================================================================= */
function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const links = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* =========================================================================
   REVEAL-ON-SCROLL
   ========================================================================= */
function initRevealOnScroll() {
  const targets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((el) => observer.observe(el));
}

/* =========================================================================
   BACK TO TOP
   ========================================================================= */
function initBackToTop() {
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =========================================================================
   TERMINAL TYPING EFFECT
   Renders a fake `curl | jq` call against his own profile. Types character
   by character on first load; if the user prefers reduced motion, or the
   tab is not visible, it renders instantly instead.
   ========================================================================= */
function initTerminal() {
  const output = document.getElementById('terminal-output');
  const cursor = document.getElementById('terminal-cursor');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const commandLine = '$ curl -s https://vihari.dev/api/profile | jq\n\n';
  const jsonLines = [
    '{',
    '  "name": "Vihari Reddy Aleti",',
    '  "role": "Backend & AI Systems Engineer",',
    '  "stack": ["Python", "FastAPI", "PostgreSQL", "LangChain"],',
    '  "focus": ["RESTful APIs", "Microservices", "RAG pipelines"],',
    '  "status": "open_to_work",',
    '  "response_time": "< 24h"',
    '}',
  ];

  const fullText = commandLine + jsonLines.join('\n');

  if (prefersReducedMotion) {
    output.innerHTML = highlightJSON(commandLine, jsonLines);
    cursor.style.display = 'none';
    return;
  }

  let i = 0;
  const speed = 14; // ms per character — fast enough to feel snappy, not gimmicky

  function typeNext() {
    if (i <= fullText.length) {
      output.textContent = fullText.slice(0, i);
      i += 1;
      window.requestAnimationFrame(() => setTimeout(typeNext, speed));
    } else {
      // Swap to the syntax-highlighted version once typing completes
      output.innerHTML = highlightJSON(commandLine, jsonLines);
    }
  }

  // Only start once the hero has scrolled into view, so nothing is "wasted"
  // typing off-screen on very short viewports.
  const heroObserver = new IntersectionObserver(
    (entries, obs) => {
      if (entries[0].isIntersecting) {
        typeNext();
        obs.disconnect();
      }
    },
    { threshold: 0.2 }
  );
  heroObserver.observe(document.querySelector('.hero-visual'));
}

// Wraps the JSON body in spans for lightweight, dependency-free syntax color
function highlightJSON(commandLine, jsonLines) {
  const cmd = `<span class="line-cmd">${escapeHTML(commandLine.trim())}</span>\n\n`;
  const body = jsonLines
    .map((line) => {
      return escapeHTML(line)
        .replace(/"(.*?)":/g, '<span class="tok-key">"$1"</span><span class="tok-punct">:</span>')
        .replace(/: "(.*?)"/g, ': <span class="tok-str">"$1"</span>');
    })
    .join('\n');
  return cmd + body;
}

function escapeHTML(str) {
  return str.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

/* =========================================================================
   AMBIENT NODE-GRAPH BACKGROUND
   A quiet canvas of slowly drifting nodes with connecting lines when close
   enough — a nod to the distributed / microservices systems this profile
   is about. Entirely decorative: paused for prefers-reduced-motion and
   when the tab isn't visible, to keep things battery- and CPU-friendly.
   ========================================================================= */
function initNodeGraph() {
  const canvas = document.getElementById('node-graph');
  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width, height, nodes;
  const NODE_COUNT_DIVISOR = 22000; // lower = more nodes
  const LINK_DISTANCE = 140;

  function resize() {
    width = canvas.width = window.innerWidth * devicePixelRatio;
    height = canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / NODE_COUNT_DIVISOR));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.15 * devicePixelRatio,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines first, so nodes sit on top
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = LINK_DISTANCE * devicePixelRatio;
        if (dist < maxDist) {
          ctx.strokeStyle = `rgba(94, 234, 212, ${0.12 * (1 - dist / maxDist)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw + move nodes
    nodes.forEach((n) => {
      ctx.fillStyle = 'rgba(94, 234, 212, 0.45)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.6 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();

      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    });
  }

  let rafId;
  function loop() {
    step();
    rafId = requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);

  if (prefersReducedMotion) {
    // Draw a single static frame instead of animating
    step();
    return;
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      loop();
    }
  });

  loop();
}
