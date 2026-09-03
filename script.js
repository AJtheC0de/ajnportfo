const themeToggle = document.querySelector(".theme-toggle");
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const languageControl = document.querySelector(".language-control");
const languageToggle = document.querySelector(".language-toggle");
const languageButtons = document.querySelectorAll("[data-lang]");
const root = document.documentElement;
const revealItems = document.querySelectorAll(".reveal");
const nav = document.querySelector(".nav");
const navLinks = [...nav.querySelectorAll('nav a[href^="#"]')];

const translations = {
  de: {
    nav: {
      work: "Projekte",
      skills: "Skills",
      about: "Über mich",
      contact: "Kontakt",
    },
    hero: {
      eyebrow: "Customer Success / Product / AI / Web",
      title:
        "Ich verbinde Kundenverständnis, Produktdenken und Umsetzung.",
      lead: "Ich bin Driton Ajnuni aus Luzern. Im Customer Success begleite ich Kunden produktiv durch Onboarding, Support und Prozesse. Nebenbei baue ich Apps, Websites und Marken, wodurch ich Produkt, Design, AI-Tools und Umsetzung aus eigener Praxis kenne.",
      primary: "Projekte ansehen",
      secondary: "Kontakt aufnehmen",
    },
    profile: {
      status: "Luzern / Customer Success / Product Builder",
      title:
        "Stärken in Support, Produkt und Launches.",
      text: "Für Arbeitgeber bringe ich Kundenfokus, saubere Kommunikation und die Fähigkeit mit, Ideen schnell in sichtbare Ergebnisse zu verwandeln.",
    },
    marquee: {
      one: "400+ Onboardings",
      two: "40+ Websites",
      three: "iOS App Founder",
      four: "Customer Success",
      five: "AI Workflows",
      six: "Deutsch / Englisch / Albanisch",
      seven: "Schweiz & Deutschland",
    },
    work: {
      eyebrow: "Ausgewählte Projekte",
      title: "Projekte, die zeigen wie ich arbeite",
    },
    projects: {
      button: "Projekt ansehen",
      soon: "Coming soon",
      imposteri: {
        tag: "Live · Mobile Game",
        text: "Ein veröffentlichtes iOS-Spiel mit Social-Mechaniken, Powers und täglicher Motivation. Zeigt meine Stärke, eine Idee bis zum App-Store-Launch zu bringen.",
      },
      marook: {
        tag: "Live · AI Learning App",
        text: "Eine Lern-App, die Bücher, Notizen und Lernkarten verbindet. Hier arbeite ich an AI-gestützten Lernflows, klarer UX und einem echten Nutzen für Nutzer.",
      },
      sixam: {
        tag: "Laufend · Web Agency",
        text: "Mein Web-Projekt für digitale Auftritte. Fokus auf Positionierung, Struktur, Design und Websites, die schnell verständlich machen, wofür eine Marke steht.",
      },
      bardhesija: {
        tag: "Eigenmarke · Kosovo",
        text: "Eine Zahnaufhellungscreme, die ich selbst gebrandet und im Kosovo vermarktet habe. Von der Positionierung bis zur Produktpräsentation habe ich die Marke eigenständig aufgebaut.",
      },
      stealth: {
        tag: "In Arbeit · Bigger Product",
        text: "Ein größeres Produkt ist in Arbeit. Noch nicht offiziell, aber ein gutes Beispiel dafür, dass ich langfristig denke, validiere und eigene Produktideen weiterentwickle.",
      },
    },
    skills: {
      eyebrow: "Was ich mitbringe",
      title: "Meine Stärken auf einen Blick.",
      lead: "Arbeitgeber sollen sofort sehen: Ich kann mit Kunden umgehen, Produkte erklären, Probleme strukturieren und digitale Lösungen praktisch umsetzen.",
      customerTitle: "Customer Success",
      customerText:
        "Onboardings, Support, Schulungen und klare Kommunikation mit Kunden. Ich übersetze Funktionen in echten Nutzen.",
      productTitle: "Produkt & Prozesse",
      productText:
        "Ich erkenne wiederkehrende Probleme, strukturiere Abläufe und denke in einfachen Lösungen statt komplizierten Umwegen.",
      buildTitle: "Web, Apps & Launches",
      buildText:
        "40+ Websites, eigene iOS-Apps und laufende Brands. Ich kann Ideen nicht nur planen, sondern auch sichtbar machen.",
      aiTitle: "AI & moderne Tools",
      aiText:
        "Ich nutze AI-Tools für Recherche, Content, Prototyping und schnellere Workflows, ohne den praktischen Blick zu verlieren.",
      proofOne: "400+ Kunden onboarded",
      proofTwo: "40+ Websites umgesetzt",
      proofThree: "2 iOS-Apps veröffentlicht",
      proofFour: "3 Sprachen im Alltag",
    },
    tools: {
      eyebrow: "Programme & Tools",
      title: "Womit ich arbeite.",
      lead: "Ein ausgewähltes Toolkit für Kunden, Produkte und digitale Ideen.",
      csm: "Customer Success",
      backend: "Backend & Daten",
      web: "Web & Build",
      ai: "AI",
      design: "Design & Content",
      workspace: "Workflows",
    },
    about: {
      eyebrow: "Über mich",
      title:
        "Ich mache komplexe Produkte verständlich und baue eigene Ideen von null auf.",
      one: "Bei Belbo arbeite ich im Customer Success und habe über 400 Kunden onboarded. Am meisten motiviert mich, wenn Menschen ein Produkt nicht nur bedienen, sondern wirklich verstehen und daraus echten Nutzen ziehen.",
      two: "Ich halte Dinge gerne einfach: Prozesse, Kommunikation und Tools sollen klar sein. Neben der Arbeit baue ich eigene Projekte, habe über 40 Websites umgesetzt und mit Imposteri und Marook zwei eigene iOS-Apps im App Store veröffentlicht.",
      statOne: "Kunden onboarded",
      statTwo: "Websites gebaut",
      statThree: "Sprachen",
      statFour: "Erfahrung in der Schweiz und Deutschland",
      principleLabel: "Mein Prinzip",
      principleTitle: "Weniger zerdenken. Mehr ausprobieren.",
      noteOne:
        "Ich übernehme Verantwortung, teste Ideen früh und entwickle aus Feedback konkrete Ergebnisse.",
      balanceLabel: "Abseits vom Screen",
      balanceTitle: "Bewegung hält den Kopf klar.",
      noteTwo:
        "Im Gym finde ich Ausgleich. Neue Tech und eigene Ideen sorgen dafür, dass die Neugier bleibt.",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Lets work together.",
      email: "Email",
    },
    aria: {
      menuOpen: "Menü öffnen",
      menuClose: "Menü schließen",
      language: "Sprache wechseln",
      themeDark: "Dunkelmodus aktivieren",
      themeLight: "Hellmodus aktivieren",
    },
  },
  en: {
    nav: {
      work: "Projects",
      skills: "Skills",
      about: "About me",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Customer Success / Product / AI / Web",
      title:
        "I connect customer understanding, product thinking and execution.",
      lead: "I am Driton Ajnuni from Lucerne. In Customer Success, I guide customers through onboarding, support and processes. On the side, I build apps, websites and brands, which gives me hands-on experience across product, design, AI tools and execution.",
      primary: "View projects",
      secondary: "Get in touch",
    },
    profile: {
      status: "Lucerne / Customer Success / Product Builder",
      title:
        "Strengths in support, product and launches.",
      text: "For employers, I bring customer focus, clear communication and the ability to turn ideas into visible results quickly.",
    },
    marquee: {
      one: "400+ onboardings",
      two: "40+ websites",
      three: "iOS app founder",
      four: "Customer Success",
      five: "AI workflows",
      six: "German / English / Albanian",
      seven: "Switzerland & Germany",
    },
    work: {
      eyebrow: "Selected projects",
      title: "Projects that show how I work",
    },
    projects: {
      button: "View project",
      soon: "Coming soon",
      imposteri: {
        tag: "Live · Mobile Game",
        text: "A published iOS game with social mechanics, powers and daily motivation. It shows my ability to bring an idea all the way to an App Store launch.",
      },
      marook: {
        tag: "Live · AI Learning App",
        text: "A learning app that connects books, notes and flashcards. I am working on AI-supported learning flows, clear UX and real user value.",
      },
      sixam: {
        tag: "Ongoing · Web Agency",
        text: "My web project for digital presences. Focused on positioning, structure, design and websites that quickly communicate what a brand stands for.",
      },
      bardhesija: {
        tag: "Own Brand · Kosovo",
        text: "A teeth-whitening cream that I branded and marketed myself in Kosovo. I built the brand independently, from positioning to product presentation.",
      },
      stealth: {
        tag: "In Progress · Bigger Product",
        text: "A larger product is in progress. It is not official yet, but it shows that I think long term, validate ideas and keep developing my own products.",
      },
    },
    skills: {
      eyebrow: "What I bring",
      title: "My strengths at a glance.",
      lead: "Employers should see it immediately: I can work with customers, explain products, structure problems and turn digital ideas into practical solutions.",
      customerTitle: "Customer Success",
      customerText:
        "Onboarding, support, training and clear communication with customers. I translate features into real value.",
      productTitle: "Product & Processes",
      productText:
        "I spot recurring problems, structure workflows and think in simple solutions instead of complicated detours.",
      buildTitle: "Web, Apps & Launches",
      buildText:
        "40+ websites, own iOS apps and ongoing brands. I can do more than plan ideas; I can make them visible.",
      aiTitle: "AI & Modern Tools",
      aiText:
        "I use AI tools for research, content, prototyping and faster workflows while keeping a practical view.",
      proofOne: "400+ customers onboarded",
      proofTwo: "40+ websites delivered",
      proofThree: "2 iOS apps published",
      proofFour: "3 languages day to day",
    },
    tools: {
      eyebrow: "Programs & Tools",
      title: "What I work with.",
      lead: "A focused toolkit for customers, products and digital ideas.",
      csm: "Customer Success",
      backend: "Backend & Data",
      web: "Web & Build",
      ai: "AI",
      design: "Design & Content",
      workspace: "Workflows",
    },
    about: {
      eyebrow: "About me",
      title:
        "I make complex products understandable and build my own ideas from zero.",
      one: "At Belbo, I work in Customer Success and have onboarded over 400 customers. What motivates me most is when people do not just use a product, but truly understand it and get real value from it.",
      two: "I like keeping things simple: processes, communication and tools should be clear. On the side, I build my own projects, have created over 40 websites and launched my own iOS apps, Imposteri and Marook, on the App Store.",
      statOne: "customers onboarded",
      statTwo: "websites built",
      statThree: "languages",
      statFour: "experience in Switzerland and Germany",
      principleLabel: "My principle",
      principleTitle: "Think less. Test more.",
      noteOne:
        "I take ownership, test ideas early and turn feedback into concrete results.",
      balanceLabel: "Away from the screen",
      balanceTitle: "Movement keeps my mind clear.",
      noteTwo:
        "The gym gives me balance. New technology and personal ideas keep me curious.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Lets work together.",
      email: "Email",
    },
    aria: {
      menuOpen: "Open menu",
      menuClose: "Close menu",
      language: "Change language",
      themeDark: "Activate dark mode",
      themeLight: "Activate light mode",
    },
  },
};

const getTranslation = (language, key) =>
  key
    .split(".")
    .reduce((value, part) => value && value[part], translations[language]);

const syncLanguageControls = (dictionary) => {
  languageToggle.textContent = dictionary.toUpperCase();
  languageToggle.setAttribute(
    "aria-label",
    `${dictionary.toUpperCase()} ${translations[dictionary].aria.language}`,
  );
  languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === dictionary);
  });

  const menuIsOpen = nav.classList.contains("open");
  mobileNavToggle.setAttribute(
    "aria-label",
    menuIsOpen
      ? translations[dictionary].aria.menuClose
      : translations[dictionary].aria.menuOpen,
  );
  themeToggle.setAttribute(
    "aria-label",
    root.getAttribute("data-theme") === "dark"
      ? translations[dictionary].aria.themeLight
      : translations[dictionary].aria.themeDark,
  );
};

const closeMobileMenu = () => {
  nav.classList.remove("open");
  mobileNavToggle.setAttribute("aria-expanded", "false");
  mobileNavToggle.setAttribute(
    "aria-label",
    translations[root.lang || "de"].aria.menuOpen,
  );
};

const closeLanguageMenu = () => {
  languageControl.classList.remove("open");
  languageToggle.setAttribute("aria-expanded", "false");
};

const applyLanguage = (language) => {
  const dictionary = translations[language] ? language : "de";
  const shouldTranslateDom = root.lang !== dictionary;
  root.lang = dictionary;
  localStorage.setItem("language", dictionary);

  if (shouldTranslateDom) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = getTranslation(dictionary, element.dataset.i18n);
      if (value) element.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const value = getTranslation(dictionary, element.dataset.i18nHtml);
      if (value) element.innerHTML = value;
    });
  }

  syncLanguageControls(dictionary);
};

const updateThemeUI = (theme) => {
  root.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  themeToggle.dataset.theme = theme;
  themeToggle.setAttribute(
    "aria-label",
    isDark
      ? translations[root.lang || "de"].aria.themeLight
      : translations[root.lang || "de"].aria.themeDark,
  );
};

const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const setTheme = (theme) => {
  updateThemeUI(theme);
  localStorage.setItem("theme", theme);
};

themeToggle.addEventListener("click", () => {
  const nextTheme =
    root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

languageToggle.addEventListener("click", () => {
  const isOpen = languageControl.classList.toggle("open");
  languageToggle.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) closeMobileMenu();
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
    closeLanguageMenu();
  });
});

mobileNavToggle.addEventListener("click", () => {
  closeLanguageMenu();
  const isOpen = nav.classList.toggle("open");
  mobileNavToggle.setAttribute("aria-expanded", String(isOpen));
  mobileNavToggle.setAttribute(
    "aria-label",
    isOpen
      ? translations[root.lang || "de"].aria.menuClose
      : translations[root.lang || "de"].aria.menuOpen,
  );
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (nav.classList.contains("open")) closeMobileMenu();
  });
});

document.addEventListener("click", (event) => {
  if (!nav.contains(event.target) && nav.classList.contains("open"))
    closeMobileMenu();
  if (
    !languageControl.contains(event.target) &&
    languageControl.classList.contains("open")
  )
    closeLanguageMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
    closeLanguageMenu();
  }
});

setTheme(getPreferredTheme());
applyLanguage(localStorage.getItem("language") || "de");

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealItems.forEach((item) => item.classList.add("show"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
  );
  revealItems.forEach((item) => observer.observe(item));
}

const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (observedSections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.25, 0.6] },
  );
  observedSections.forEach((section) => navObserver.observe(section));
}
