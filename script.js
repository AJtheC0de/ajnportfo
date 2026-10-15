const root = document.documentElement;
const nav = document.querySelector(".nav");
const themeToggle = document.querySelector(".theme-toggle");
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const languageControl = document.querySelector(".language-control");
const languageToggle = document.querySelector(".language-toggle");
const languageButtons = document.querySelectorAll("[data-lang]");
const navLinks = [...nav.querySelectorAll('nav a[href^="#"]')];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const translations = {
  de: {
    nav: {
      work: "Projekte",
      experience: "Erfahrung",
      skills: "Skills",
      about: "Über mich",
      contact: "Kontakt",
    },
    hero: {
      eyebrow: "Customer Success Manager in Luzern",
      title: "Kundenerfolg mit Builder-Mindset.",
      lead: "7+ Jahre B2B SaaS. Ich betreue 400+ Accounts, halte rund 90 % Renewal Rate und baue nebenbei eigene Produkte.",
      primary: "Projekte ansehen",
      secondary: "Kontakt",
    },
    stats: {
      accountsTag: "Portfolio",
      renewalTag: "Retention",
      revenueTag: "Wachstum",
      featuresTag: "Produkt",
      accounts: "B2B-SaaS-Accounts betreut",
      renewal: "Renewal Rate",
      revenue: "Account-Umsatz durch Upselling",
      features: "Features aus Kundenfeedback umgesetzt",
    },
    work: {
      title: "Eigene Projekte.",
      lead: "Neben dem Job baue ich Produkte selbst, von der Idee bis zum Launch.",
    },
    projects: {
      visit: "Ansehen",
      jobsi: {
        tag: "Neu · Web App",
        quote: "„Lohn ist nicht alles. Zum Glück.“",
        text: "Lohnt sich der Jobwechsel? Jobsi vergleicht zwei Stellen nach Nettolohn, Fahrtkosten, Arbeitszeit und Ferien. Kostenlos und ohne Anmeldung.",
      },
      imposteri: {
        tag: "Live · iOS Game",
        text: "Ein Party-Game mit Social-Mechaniken und Powers. Design, Entwicklung und App-Store-Launch komplett selbst gemacht.",
        metric: "Downloads",
      },
      marook: {
        tag: "Live · iOS App",
        text: "Eine Lern-App, die Bücher, Notizen und Lernkarten mit AI-gestützten Lernflows verbindet.",
      },
      sixam: {
        tag: "Web Agency",
        text: "Websites für kleine Unternehmen, vom Verkauf über die Umsetzung bis zum laufenden Support.",
        metric: "Websites",
      },
      bardhesija: {
        tag: "Eigenmarke · Kosovo",
        text: "Eine Zahnaufhellungscreme, die ich selbst gebrandet und im Kosovo vermarktet habe. Von der Positionierung bis zur Produktpräsentation.",
      },
    },
    experience: {
      title: "Erfahrung.",
      webrebels: {
        role: "Customer Success Manager",
        one: "400+ B2B-SaaS-Accounts vom Onboarding bis zur Vertragsverlängerung betreut",
        two: "Rund 90 % Renewal Rate durch proaktives Account Management und frühes Erkennen gefährdeter Accounts",
        three: "Account-Umsatz um 45 % gesteigert durch gezieltes Upselling und Cross-Selling",
        four: "Kundenfeedback mit dem Produktteam priorisiert, 10+ Features daraus umgesetzt",
      },
      shore: {
        role: "Tech Implementation Manager",
        one: "Direkte Kundenkommunikation in 150+ Website- und Digitalprojekten, vom Kickoff bis zum Launch",
        two: "40+ responsive Websites und mobile Web-Apps für KMU konzipiert und gebaut",
        three: "E-Commerce- und Online-Shop-Lösungen als digitalen Vertriebskanal eingerichtet",
      },
      picturemaxx: {
        role: "Business Administration Manager",
        one: "B2B-Kundenverträge erstellt und verwaltet, interne und externe Projekte koordiniert",
      },
      hotel: {
        role: "Ausbildung Hotelfachmann",
        one: "Gastgeben von der Pike auf gelernt. Bis heute die Basis für meinen Umgang mit Kunden.",
      },
    },
    skills: {
      title: "Was ich mitbringe.",
      csTitle: "Customer Success & Retention",
      csText: "Account Management über den ganzen Lebenszyklus. Ich erkenne Risiken früh und mache aus Kunden langfristige Partner.",
      onboardingTitle: "Onboarding & Implementierung",
      onboardingText: "Kunden schnell produktiv machen, mit klaren Schritten statt langen Handbüchern.",
      salesTitle: "Upsell & Beratung",
      salesText: "Beratungsorientierter Verkauf, der vom Bedarf des Kunden ausgeht.",
      productTitle: "Brücke zum Produktteam",
      productText: "Ich übersetze Feedback in priorisierte Verbesserungen, die das Team umsetzt.",
      techTitle: "Technisch hands-on",
      techText: "No-Code, Automationen, AI und leichte Entwicklung. Ich löse Probleme direkt, statt sie nur weiterzugeben.",
    },
    tools: {
      all: "Alle",
      cs: "Customer Success",
      automation: "Automation",
      backend: "Backend & Payments",
      design: "Design",
      ai: "AI",
      dev: "Development",
    },
    about: {
      title: "Über mich.",
      one: "Mich motiviert es, wenn Kunden ein Produkt nicht nur bedienen, sondern wirklich verstehen. Deshalb verbinde ich Beziehungsarbeit mit technischem Know-how und <mark>löse Probleme dort, wo sie entstehen.</mark>",
      two: "Angefangen habe ich in der Hotellerie in München. Heute lebe ich bei Luzern und arbeite auf Deutsch, Englisch und Albanisch.",
      de: "Deutsch",
      sq: "Albanisch",
      en: "Englisch",
      native: "Muttersprache",
      fluent: "Verhandlungssicher",
      principleTitle: "Weniger zerdenken. Mehr ausprobieren.",
      principleText: "Ich übernehme Verantwortung, teste Ideen früh und mache aus Feedback konkrete Ergebnisse.",
      runTitle: "Ultramarathon als Ausgleich.",
      runText: "Lange Läufe halten den Kopf klar. Dazu kommen Software, AI, Reisen und Bücher.",
    },
    contact: {
      title: "Lass uns sprechen.",
      lead: "Ich bin offen für neue Stellen in Customer Success und Account Management. Schreib mir gerne.",
      copy: "Kopieren",
      copied: "Kopiert",
    },
    status: {
      long: "Offen für neue Stellen in Customer Success & Account Management",
      short: "Offen für neue Stellen",
      pill: "Offen für Stellen",
    },
    footer: { top: "Nach oben" },
    aria: {
      menuOpen: "Menü öffnen",
      menuClose: "Menü schliessen",
      language: "Sprache wechseln",
      themeDark: "Dunkelmodus aktivieren",
      themeLight: "Hellmodus aktivieren",
    },
  },
  en: {
    nav: {
      work: "Projects",
      experience: "Experience",
      skills: "Skills",
      about: "About",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Customer Success Manager in Lucerne",
      title: "Customer success with a builder's mindset.",
      lead: "7+ years in B2B SaaS. I manage 400+ accounts, hold a ~90% renewal rate and build my own products on the side.",
      primary: "View projects",
      secondary: "Contact",
    },
    stats: {
      accountsTag: "Portfolio",
      renewalTag: "Retention",
      revenueTag: "Growth",
      featuresTag: "Product",
      accounts: "B2B SaaS accounts managed",
      renewal: "Renewal rate",
      revenue: "Account revenue through upselling",
      features: "Features shipped from customer feedback",
    },
    work: {
      title: "Own projects.",
      lead: "Outside my job, I build products myself, from idea to launch.",
    },
    projects: {
      visit: "Visit",
      jobsi: {
        tag: "New · Web App",
        quote: "“Salary isn't everything. Luckily.”",
        text: "Is the job change worth it? Jobsi compares two positions by net salary, commuting costs, working hours and vacation. Free, no sign-up.",
      },
      imposteri: {
        tag: "Live · iOS Game",
        text: "A party game with social mechanics and powers. Design, development and App Store launch, all done by me.",
        metric: "Downloads",
      },
      marook: {
        tag: "Live · iOS App",
        text: "A learning app that connects books, notes and flashcards with AI-supported learning flows.",
      },
      sixam: {
        tag: "Web Agency",
        text: "Websites for small businesses, from sales through delivery to ongoing support.",
        metric: "Websites",
      },
      bardhesija: {
        tag: "Own Brand · Kosovo",
        text: "A teeth-whitening cream I branded and marketed myself in Kosovo. From positioning to product presentation.",
      },
    },
    experience: {
      title: "Experience.",
      webrebels: {
        role: "Customer Success Manager",
        one: "Managed 400+ B2B SaaS accounts from onboarding through renewal",
        two: "~90% renewal rate through proactive account management and early identification of at-risk accounts",
        three: "Grew account revenue 45% through targeted upselling and cross-selling",
        four: "Prioritized customer feedback with the product team; 10+ features shipped",
      },
      shore: {
        role: "Tech Implementation Manager",
        one: "Owned customer communication across 150+ website and digital projects, from kickoff to launch",
        two: "Designed and built 40+ responsive websites and mobile web apps for SMBs",
        three: "Set up e-commerce and online shop solutions as a digital sales channel",
      },
      picturemaxx: {
        role: "Business Administration Manager",
        one: "Created and managed B2B customer contracts, coordinated internal and external projects",
      },
      hotel: {
        role: "Apprenticeship, Hotel Management",
        one: "Learned hospitality from the ground up. Still the foundation of how I work with customers.",
      },
    },
    skills: {
      title: "What I bring.",
      csTitle: "Customer Success & Retention",
      csText: "Account management across the full lifecycle. I spot risks early and turn customers into long-term partners.",
      onboardingTitle: "Onboarding & Implementation",
      onboardingText: "Getting customers productive fast, with clear steps instead of long manuals.",
      salesTitle: "Upsell & Consulting",
      salesText: "Consultative selling that starts from what the customer actually needs.",
      productTitle: "Bridge to Product",
      productText: "I translate feedback into prioritized improvements the team ships.",
      techTitle: "Technically hands-on",
      techText: "No-code, automation, AI and light development. I solve problems directly instead of passing them on.",
    },
    tools: {
      all: "All",
      cs: "Customer Success",
      automation: "Automation",
      backend: "Backend & Payments",
      design: "Design",
      ai: "AI",
      dev: "Development",
    },
    about: {
      title: "About me.",
      one: "What motivates me is when customers don't just use a product but truly understand it. That's why I combine relationship work with technical know-how and <mark>solve problems where they start.</mark>",
      two: "I started out in hospitality in Munich. Today I live near Lucerne and work in German, English and Albanian.",
      de: "German",
      sq: "Albanian",
      en: "English",
      native: "Native",
      fluent: "Professional",
      principleTitle: "Think less. Test more.",
      principleText: "I take ownership, test ideas early and turn feedback into concrete results.",
      runTitle: "Ultramarathons for balance.",
      runText: "Long runs keep my mind clear. Add software, AI, travel and books.",
    },
    contact: {
      title: "Let's talk.",
      lead: "I'm open to new roles in customer success and account management. Feel free to reach out.",
      copy: "Copy",
      copied: "Copied",
    },
    status: {
      long: "Open to new roles in Customer Success & Account Management",
      short: "Open to new roles",
      pill: "Open to work",
    },
    footer: { top: "Back to top" },
    aria: {
      menuOpen: "Open menu",
      menuClose: "Close menu",
      language: "Change language",
      themeDark: "Activate dark mode",
      themeLight: "Activate light mode",
    },
  },
};

const storage = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
  },
};

const t = (key, language = root.lang || "de") =>
  key.split(".").reduce((value, part) => value && value[part], translations[language]);

/* Word-by-word headline reveal */
const splitWords = (element) => {
  const words = element.textContent.trim().split(/\s+/);
  element.setAttribute("aria-label", words.join(" "));
  element.innerHTML = words
    .map((word, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${word}</span></span>`)
    .join(" ");
};

const splitTargets = () => document.querySelectorAll("[data-split]");

/* Scroll-inked paragraph: words darken as it moves through the viewport */
const wrapInk = (element) => {
  let index = 0;
  const wrap = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) return wrap(child);
      const fragment = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) return fragment.append(part);
        const span = document.createElement("span");
        span.className = "ink";
        span.style.setProperty("--i", index++);
        span.textContent = part;
        fragment.append(span);
      });
      child.replaceWith(fragment);
    });
  };
  wrap(element);
  element.style.setProperty("--n", index);
};

/* Brief letter scramble on the last headline word */
const scramble = (element) => {
  const word = element.querySelector(".w:last-child > span");
  if (!word || reduceMotion) return;
  const finalText = word.textContent;
  const glyphs = "abcdefghijklmnopqrstuvwxyz";
  const steps = 14;
  let frame = 0;
  // Lock the word's box so wider random glyphs can't reflow the line
  word.style.width = `${word.getBoundingClientRect().width}px`;
  word.style.whiteSpace = "nowrap";
  word.classList.add("scrambling");
  const timer = setInterval(() => {
    frame++;
    const settled = Math.floor((frame / steps) * finalText.length);
    word.textContent = [...finalText]
      .map((char, i) => (i < settled || /[\s.\-']/.test(char) ? char : glyphs[Math.floor(Math.random() * glyphs.length)]))
      .join("");
    if (frame >= steps) {
      clearInterval(timer);
      word.textContent = finalText;
      word.style.width = "";
      word.style.whiteSpace = "";
      word.classList.remove("scrambling");
    }
  }, 55);
};

/* Language */
const syncLanguageControls = (language) => {
  languageToggle.textContent = language.toUpperCase();
  languageToggle.setAttribute("aria-label", `${language.toUpperCase()} ${t("aria.language", language)}`);
  languageButtons.forEach((button) => button.classList.toggle("active", button.dataset.lang === language));
  mobileNavToggle.setAttribute("aria-label", t(nav.classList.contains("open") ? "aria.menuClose" : "aria.menuOpen", language));
  themeToggle.setAttribute("aria-label", t(root.dataset.theme === "dark" ? "aria.themeLight" : "aria.themeDark", language));
};

const applyLanguage = (language) => {
  const dictionary = translations[language] ? language : "de";
  const shouldTranslate = root.lang !== dictionary;
  root.lang = dictionary;
  storage.set("language", dictionary);

  if (shouldTranslate) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = t(element.dataset.i18n, dictionary);
      if (value) element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const value = t(element.dataset.i18nHtml, dictionary);
      if (value) element.innerHTML = value;
    });
  }

  splitTargets().forEach(splitWords);
  document.querySelectorAll(".ink-scroll").forEach((element) => {
    if (!element.querySelector(".ink")) wrapInk(element);
  });
  syncLanguageControls(dictionary);
};

/* Theme */
const setTheme = (theme) => {
  root.dataset.theme = theme;
  storage.set("theme", theme);
  document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#0b0d12" : "#f6f7f9";
  syncLanguageControls(root.lang || "de");
};

themeToggle.addEventListener("click", (event) => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  if (!document.startViewTransition || reduceMotion) {
    setTheme(next);
    return;
  }
  const x = event.clientX || window.innerWidth - 40;
  const y = event.clientY || 40;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  document.startViewTransition(() => setTheme(next)).ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 650, easing: "cubic-bezier(.16, 1, .3, 1)", pseudoElement: "::view-transition-new(root)" },
    );
  });
});

/* Menus */
const closeMobileMenu = () => {
  nav.classList.remove("open");
  mobileNavToggle.setAttribute("aria-expanded", "false");
  mobileNavToggle.setAttribute("aria-label", t("aria.menuOpen"));
};

const closeLanguageMenu = () => {
  languageControl.classList.remove("open");
  languageToggle.setAttribute("aria-expanded", "false");
};

languageToggle.addEventListener("click", () => {
  const isOpen = languageControl.classList.toggle("open");
  languageToggle.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) closeMobileMenu();
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
    revealSplitInView();
    closeLanguageMenu();
  });
});

mobileNavToggle.addEventListener("click", () => {
  closeLanguageMenu();
  const isOpen = nav.classList.toggle("open");
  mobileNavToggle.setAttribute("aria-expanded", String(isOpen));
  mobileNavToggle.setAttribute("aria-label", t(isOpen ? "aria.menuClose" : "aria.menuOpen"));
});

navLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

document.addEventListener("click", (event) => {
  if (!nav.contains(event.target)) closeMobileMenu();
  if (!languageControl.contains(event.target)) closeLanguageMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
    closeLanguageMenu();
  }
});

/* Init */
setTheme(storage.get("theme") === "dark" ? "dark" : "light");
applyLanguage(storage.get("language") || "de");

/* Toolkit filter: light up matching tools in brand color, dim the rest */
const toolWall = document.querySelector(".tool-wall");
const toolTiles = [...toolWall.querySelectorAll(".tool")];
const toolFilters = document.querySelectorAll(".tool-filter");
toolFilters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    toolFilters.forEach((other) => {
      other.classList.toggle("active", other === button);
      other.setAttribute("aria-pressed", String(other === button));
    });
    toolTiles.forEach((tile) => {
      const match = filter === "all" || tile.dataset.cat === filter;
      tile.classList.toggle("lit", filter !== "all" && match);
      tile.classList.toggle("dim", !match);
    });
  });
});

/* Nav background after leaving the top */
new IntersectionObserver(([entry]) => {
  nav.classList.toggle("scrolled", !entry.isIntersecting);
  root.classList.toggle("is-scrolled", !entry.isIntersecting);
}).observe(
  document.querySelector(".nav-sentinel"),
);

/* Count-up numbers */
const countUp = (element) => {
  const target = Number(element.dataset.to);
  if (reduceMotion) return;
  const start = performance.now();
  const duration = 1600;
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = Math.round(target * (1 - Math.pow(1 - progress, 4)));
    if (progress < 1) requestAnimationFrame(tick);
  };
  element.textContent = "0";
  requestAnimationFrame(tick);
};

/* Scroll reveals */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      entry.target.querySelectorAll(".count").forEach(countUp);
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
);

const revealSplitInView = () => {
  splitTargets().forEach((element) => {
    if (element.classList.contains("is-in")) return;
    revealObserver.observe(element);
  });
};

const revealTargets = document.querySelectorAll(".reveal, [data-split], .stats, .tool-wall");
if (reduceMotion) {
  revealTargets.forEach((item) => item.classList.add("is-in"));
} else {
  revealTargets.forEach((item) => revealObserver.observe(item));
  setTimeout(() => document.querySelectorAll("[data-scramble]").forEach(scramble), 900);
}

/* Drive --progress on inked paragraphs only while they are on screen */
const inkParagraphs = new Set();
const inkLoop = () => {
  inkParagraphs.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const start = window.innerHeight * 0.88;
    const end = window.innerHeight * 0.4;
    const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
    element.style.setProperty("--progress", progress.toFixed(3));
    element.classList.toggle("marked", progress >= 0.98);
  });
  if (inkParagraphs.size) requestAnimationFrame(inkLoop);
};
const inkObserver = new IntersectionObserver((entries) => {
  const wasIdle = inkParagraphs.size === 0;
  entries.forEach((entry) => (entry.isIntersecting ? inkParagraphs.add(entry.target) : inkParagraphs.delete(entry.target)));
  if (wasIdle && inkParagraphs.size) requestAnimationFrame(inkLoop);
});
document.querySelectorAll(".ink-scroll").forEach((element) => {
  if (reduceMotion) element.classList.add("marked");
  else {
    element.style.setProperty("--progress", 0);
    inkObserver.observe(element);
  }
});

/* Pointer effects: card spotlight and magnetic buttons */
if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  });

  document.querySelectorAll(".magnetic").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.3;
      button.style.translate = `${x}px ${y}px`;
    });
    button.addEventListener("pointerleave", () => {
      button.style.translate = "";
    });
  });
}

/* Logo wall: tools lean gently toward the pointer */
if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
  let pointer = null;
  let frame = 0;
  const pull = () => {
    frame = 0;
    toolTiles.forEach((tile) => {
      const rect = tile.getBoundingClientRect();
      if (!pointer) {
        tile.style.setProperty("--tx", "0px");
        tile.style.setProperty("--ty", "0px");
        return;
      }
      const dx = pointer.x - (rect.left + rect.width / 2);
      const dy = pointer.y - (rect.top + rect.height / 2);
      const strength = Math.max(0, 1 - Math.hypot(dx, dy) / 260) * 0.09;
      tile.style.setProperty("--tx", `${(dx * strength).toFixed(1)}px`);
      tile.style.setProperty("--ty", `${(dy * strength).toFixed(1)}px`);
    });
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(pull); };
  toolWall.addEventListener("pointermove", (event) => { pointer = { x: event.clientX, y: event.clientY }; schedule(); });
  toolWall.addEventListener("pointerleave", () => { pointer = null; schedule(); });
}
new MutationObserver(() => {
  if (toolWall.classList.contains("is-in")) setTimeout(() => toolWall.classList.add("settled"), toolTiles.length * 30 + 800);
}).observe(toolWall, { attributeFilter: ["class"] });

/* Mobile: hero portrait shrinks and flies into the nav avatar slot while scrolling */
const flyMedia = window.matchMedia("(max-width: 900px)");
const heroVisual = document.querySelector(".hero-visual");
const navAvatar = document.querySelector(".logo-image");
if (!reduceMotion && heroVisual && navAvatar) {
  let geometry = null;
  let flyFrame = 0;
  let heroOnScreen = true;

  const measure = () => {
    heroVisual.style.transform = "";
    const portrait = heroVisual.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    // Final nav state: fixed at top 10px, avatar offset inside the nav
    const targetTop = 10 + nav.clientTop + navAvatar.offsetTop;
    const targetLeft = navRect.left + nav.clientLeft + navAvatar.offsetLeft;
    const startTop = portrait.top + window.scrollY;
    geometry = {
      distance: Math.max(startTop - targetTop, 1),
      dx: targetLeft - portrait.left,
      scale: navAvatar.offsetWidth / heroVisual.querySelector(".portrait").offsetWidth,
    };
  };

  const fly = () => {
    flyFrame = 0;
    if (!flyMedia.matches) return;
    if (!geometry) measure();
    const progress = Math.min(Math.max(window.scrollY / geometry.distance, 0), 1);
    const eased = 1 - Math.pow(1 - progress, 2);
    const scale = 1 - (1 - geometry.scale) * eased;
    heroVisual.style.transform = `translateX(${(geometry.dx * eased).toFixed(2)}px) scale(${scale.toFixed(4)})`;
    root.classList.toggle("logo-docked", progress >= 1);
    root.classList.toggle("logo-flying", progress > 0 && progress < 1 && !nav.classList.contains("open"));
    if (heroOnScreen) flyFrame = requestAnimationFrame(fly);
  };

  const enable = () => {
    if (flyMedia.matches) {
      root.classList.add("js-fly");
      geometry = null;
      if (!flyFrame) flyFrame = requestAnimationFrame(fly);
    } else {
      root.classList.remove("js-fly", "logo-docked");
      heroVisual.style.transform = "";
    }
  };

  new IntersectionObserver(([entry]) => {
    heroOnScreen = entry.isIntersecting;
    if (heroOnScreen && !flyFrame) flyFrame = requestAnimationFrame(fly);
    if (!heroOnScreen) root.classList.add("logo-docked");
  }).observe(document.querySelector(".hero"));

  flyMedia.addEventListener("change", enable);
  window.addEventListener("resize", () => { geometry = null; });
  enable();
}

/* Copy email */
const copyButton = document.querySelector(".copy-email");
copyButton.addEventListener("click", async () => {
  const label = copyButton.querySelector("span");
  try {
    await navigator.clipboard.writeText(copyButton.dataset.email);
    copyButton.classList.add("copied");
    label.textContent = t("contact.copied");
    setTimeout(() => {
      copyButton.classList.remove("copied");
      label.textContent = t("contact.copy");
    }, 1800);
  } catch {
    window.location.href = `mailto:${copyButton.dataset.email}`;
  }
});

/* Active nav link */
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive && !link.classList.contains("nav-cta"));
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" },
);
sections.forEach((section) => navObserver.observe(section));
