const themeToggle = document.querySelector(".theme-toggle");
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const languageControl = document.querySelector(".language-control");
const languageToggle = document.querySelector(".language-toggle");
const languageButtons = document.querySelectorAll("[data-lang]");
const root = document.documentElement;
const revealItems = document.querySelectorAll(".reveal");
const nav = document.querySelector(".nav");

const translations = {
  de: {
    nav: {
      work: "Projekte",
      skills: "Skills",
      about: "Über mich",
      contact: "Kontakt",
    },
    hero: {
      eyebrow: "Portfolio · Apps · AI · Customer Success",
      title:
        'Digitale Produkte,<br class="mobile-only-break"> die sich wie echte Erlebnisse anfühlen.',
      lead: "Ich bin Driton Ajnuni aus Luzern — Customer Success Manager bei Belbo und Product Builder. Ich helfe Menschen, Produkte wirklich zu verstehen, und baue nebenbei Apps, Websites und digitale Marken, die einfach nutzbar sind und echten Wert liefern.",
      primary: "Projekte ansehen",
      secondary: "Kontakt aufnehmen",
    },
    profile: {
      status: "Luzern · Customer Success · Builder",
      title:
        'Marook, sixam &<br class="mobile-only-break"> ein Upcoming Big Project',
      text: "Ich baue digitale Lösungen, die Produkt, Marke und Customer Experience verbinden.",
    },
    marquee: {
      one: "395+ Onboardings",
      two: "40+ Websites",
      three: "iOS App Founder",
      four: "Customer Success",
      five: "Product Builder",
      six: "3 Sprachen",
      seven: "Schweiz & Deutschland",
    },
    work: { eyebrow: "Ausgewählte Projekte", title: "Meine digitale Welt" },
    projects: {
      button: "Projekt ansehen",
      soon: "Coming soon",
      imposteri: {
        tag: "Mobile Game",
        text: "Ein iOS-Spiel mit überraschenden Social-Mechaniken, Powers und täglicher Motivation.",
      },
      marook: {
        tag: "AI Learning App",
        text: "Eine mobile App, die Bücher, Notizen und Lernkarten verbindet – powered by smarter KI.",
      },
      sixam: {
        tag: "Web Agency",
        text: "Agentur-Website mit Fokus auf klare Positionierung, starke Optik und digitale Sichtbarkeit.",
      },
      ndr: {
        tag: "Running Wear Brand",
        text: "Eine Marke für ambitionierte Runner, inspiriert von Community, Challenges und langfristigem Wachstum.",
      },
      bardhesija: {
        tag: "Produktvertrieb Kosovo",
        text: "Ein Vertriebsprojekt im Kosovo. Das Original ist nicht mehr online, die frühere Präsentation ist noch sichtbar.",
      },
      notfunded: {
        tag: "Clothing Brand",
        text: "Eine Clothing Brand mit eigenem Club-Feeling, klarer Haltung und digitaler Markenwelt.",
      },
      stealth: {
        tag: "Big Project Coming Soon",
        text: "Ein größeres Produkt ist in Arbeit. Noch nicht offiziell, aber strategisch genug, um hier einen leisen Platz zu bekommen.",
      },
    },
    skills: {
      eyebrow: "Was ich mitbringe",
      title: "Zwischen Kunden, Produkt und Umsetzung.",
      one: "395+ Kunden onboarded und produktiv begleitet",
      two: "Klare Prozesse, einfache Kommunikation und saubere Tools",
      three: "40+ Websites, iOS-App Launch und eigene Produktideen",
      four: "Dreisprachig, kreativ, hands-on und ownership-driven",
    },
    tools: {
      eyebrow: "Programme & Tools",
      title: "Womit ich arbeite.",
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
      one: "Bei Belbo arbeite ich im Customer Success und habe über 395 Kunden onboarded. Am meisten motiviert mich, wenn Menschen ein Produkt nicht nur bedienen, sondern wirklich verstehen und daraus echten Nutzen ziehen.",
      two: "Ich halte Dinge gerne einfach: Prozesse, Kommunikation und Tools sollen klar sein. Neben der Arbeit baue ich eigene Projekte, habe über 40 Websites umgesetzt und mit Imposteri und Marook schon zwei eigene iOS-Apps im App Store veröffentlicht.",
      statOne: "Kunden onboarded",
      statTwo: "Websites gebaut",
      statThree: "Sprachen",
      statFour: "Erfahrung in der Schweiz und Deutschland",
      noteOne:
        "Ich übernehme Verantwortung, denke kreativ und probiere lieber aus, statt Dinge endlos zu überdenken.",
      noteTwo:
        "Wenn ich nicht arbeite oder baue, bin ich meistens im Gym oder schaue mir neue Tech an.",
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
      eyebrow: "Portfolio · Apps · AI · Customer Success",
      title:
        'Digital products<br class="mobile-only-break"> that feel like real experiences.',
      lead: "I am Driton Ajnuni from Lucerne — Customer Success Manager at Belbo and Product Builder. I help people truly understand products, while building apps, websites and digital brands that are simple to use and create real value.",
      primary: "View projects",
      secondary: "Get in touch",
    },
    profile: {
      status: "Lucerne · Customer Success · Builder",
      title:
        'Marook, sixam &<br class="mobile-only-break"> an Upcoming Big Project',
      text: "I build digital solutions that connect product, brand and customer experience.",
    },
    marquee: {
      one: "395+ onboardings",
      two: "40+ websites",
      three: "iOS app founder",
      four: "Customer Success",
      five: "Product Builder",
      six: "3 languages",
      seven: "Switzerland & Germany",
    },
    work: { eyebrow: "Selected projects", title: "My digital world" },
    projects: {
      button: "View project",
      soon: "Coming soon",
      imposteri: {
        tag: "Mobile Game",
        text: "An iOS game with surprising social mechanics, powers and daily motivation.",
      },
      marook: {
        tag: "AI Learning App",
        text: "A mobile app that connects books, notes and flashcards, powered by smarter AI.",
      },
      sixam: {
        tag: "Web Agency",
        text: "Agency website focused on clear positioning, strong visuals and digital visibility.",
      },
      ndr: {
        tag: "Running Wear Brand",
        text: "A brand for ambitious runners, inspired by community, challenges and long-term growth.",
      },
      bardhesija: {
        tag: "Product Distribution Kosovo",
        text: "A distribution project in Kosovo. The original is no longer online, but the earlier presentation is still visible.",
      },
      notfunded: {
        tag: "Clothing Brand",
        text: "A clothing brand with a club feeling, clear attitude and a digital brand world.",
      },
      stealth: {
        tag: "Big Project Coming Soon",
        text: "A larger product is in progress. Not official yet, but strategic enough to deserve a quiet place here.",
      },
    },
    skills: {
      eyebrow: "What I bring",
      title: "Between customers, product and execution.",
      one: "395+ customers onboarded and supported productively",
      two: "Clear processes, simple communication and clean tools",
      three: "40+ websites, iOS app launch and own product ideas",
      four: "Trilingual, creative, hands-on and ownership-driven",
    },
    tools: {
      eyebrow: "Programs & Tools",
      title: "What I work with.",
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
      one: "At Belbo, I work in Customer Success and have onboarded over 395 customers. What motivates me most is when people do not just use a product, but truly understand it and get real value from it.",
      two: "I like keeping things simple: processes, communication and tools should be clear. On the side, I build my own projects, have created over 40 websites and launched my own iOS apps, Imposteri and Marook, on the App Store.",
      statOne: "customers onboarded",
      statTwo: "websites built",
      statThree: "languages",
      statFour: "experience in Switzerland and Germany",
      noteOne:
        "I take ownership, think creatively and prefer trying things out instead of overthinking.",
      noteTwo:
        "When I am not working or building, I am usually at the gym or checking out new tech.",
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
  root.lang = dictionary;
  localStorage.setItem("language", dictionary);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = getTranslation(dictionary, element.dataset.i18n);
    if (value) element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = getTranslation(dictionary, element.dataset.i18nHtml);
    if (value) element.innerHTML = value;
  });

  languageToggle.textContent = dictionary.toUpperCase();
  languageToggle.setAttribute(
    "aria-label",
    translations[dictionary].aria.language,
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

const updateThemeUI = (theme) => {
  root.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    isDark
      ? translations[root.lang || "de"].aria.themeLight
      : translations[root.lang || "de"].aria.themeDark,
  );
};

const getPreferredTheme = () => {
  localStorage.removeItem("theme");
  return "light";
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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.14 },
);
revealItems.forEach((item) => observer.observe(item));
