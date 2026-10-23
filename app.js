const copy = {
  ua: {
    skipLink: "Перейти до вмісту",
    openMenu: "Відкрити меню",
    mainNavigation: "Основна навігація",
    language: "Мова сайту",
    close: "Закрити",
    navHome: "Головна",
    navJobs: "Вакансії",
    leaveResume: "Залишити резюме",
    footerDescription: "Допомагаємо кандидатам знаходити роботу у Словаччині.",
    contacts: "Контакти",
    followUs: "Ми в соцмережах",
    privacyPolicy: "Політика конфіденційності",
    rightsReserved: "Усі права захищено",
    contactPlaceholder: "[ЗАПОВНИТИ]",
    heroEyebrow: "Робота у Словаччині",
    heroTitle: "Робота у Словаччині починається тут",
    heroText: "Переглядай актуальні вакансії, обирай відповідні умови та залишай заявку онлайн.",
    viewJobs: "Переглянути вакансії",
    photoNoteEyebrow: "Нові можливості",
    photoNote: "Твій наступний професійний крок",
    benefitsEyebrow: "Чому ми",
    benefitsTitle: "Допомагаємо знайти відповідну роботу",
    benefitsText: "Зручний шлях від пошуку вакансії до подання заявки.",
    benefitJobsTitle: "Актуальні вакансії",
    benefitJobsText: "Пропозиції з описом доступних умов і вимог.",
    benefitApplicationTitle: "Зручна заявка",
    benefitApplicationText: "Подай резюме онлайн за кілька простих кроків.",
    benefitCommunicationTitle: "Зрозуміла комунікація",
    benefitCommunicationText: "Користуйся сайтом українською або словацькою.",
    categoriesEyebrow: "Напрямки",
    categoriesTitle: "Обери сферу, що тобі до вподоби",
    categoriesText: "Переглянь категорії та відфільтруй пропозиції за напрямком.",
    categoryProduction: "Виробництво",
    categoryLogistics: "Склади та логістика",
    categoryAutomotive: "Автомобільна промисловість",
    categoryHospitality: "Громадське харчування",
    categoryOther: "Інші вакансії",
    featuredEyebrow: "Можливості",
    featuredTitle: "Актуальні вакансії",
    featuredText: "Переглянь пропозиції, які відповідають твоїм очікуванням.",
    allJobs: "Усі вакансії",
    emptyJobsTitle: "Поки що немає актуальних вакансій",
    emptyJobsText: "Зараз готуємо нові пропозиції. Ви можете залишити резюме, щоб ми могли розглянути вашу кандидатуру.",
    emptyFilteredTitle: "За цими фільтрами вакансій не знайдено",
    emptyFilteredText: "Зміни запит або скинь фільтри, щоб переглянути інші актуальні пропозиції.",
    ctaEyebrow: "Наступний крок",
    ctaTitle: "Не знайшов відповідну вакансію?",
    ctaText: "Залиш резюме та розкажи про свої побажання. Ми зможемо розглянути твою кандидатуру для відповідних пропозицій.",
    catalogTitle: "Актуальні вакансії у Словаччині",
    catalogText: "Обери вакансію, яка відповідає твоєму досвіду та очікуванням.",
    searchLabel: "Посада",
    searchPlaceholder: "Пошук за назвою посади",
    cityLabel: "Місто",
    allCities: "Усі міста",
    categoryLabel: "Категорія",
    allCategories: "Усі категорії",
    scheduleLabel: "Графік",
    allSchedules: "Будь-який графік",
    resetFilters: "Скинути фільтри",
    jobCount: (count) => `${count} ${count === 1 ? "вакансія" : count > 1 && count < 5 ? "вакансії" : "вакансій"}`,
    salaryLabel: "Зарплата",
    scheduleFact: "Графік",
    housingLabel: "Житло",
    details: "Детальніше",
    applyNow: "Відгукнутися",
    detailsResponsibilities: "Обов’язки",
    detailsRequirements: "Вимоги",
    detailsConditions: "Умови роботи",
    unspecified: "Не вказано",
    applicationEyebrow: "Наступний крок",
    applicationTitle: "Залишити резюме",
    applicationIntro: "Заповни форму, і ми зможемо розглянути твою кандидатуру.",
    applicationForJob: "Заявка на вакансію",
    fullName: "Ім’я та прізвище *",
    namePlaceholder: "Як до вас звертатися",
    phoneLabel: "Номер телефону *",
    emailLabel: "Email",
    directionLabel: "Бажаний напрямок роботи",
    directionPlaceholder: "Оберіть напрямок",
    commentLabel: "Коментар",
    commentPlaceholder: "Розкажіть про досвід або побажання",
    resumeLabel: "Резюме (PDF або DOCX)",
    resumeHint: "Необов’язково · до 8 МБ",
    consentText: "Підтверджую, що ознайомився/-лася з повідомленням про обробку персональних даних. *",
    submitApplication: "Надіслати заявку",
    submitting: "Надсилаємо…",
    cancel: "Скасувати",
    privacyHint: "Заявку буде надіслано для розгляду вашої кандидатури. Персональні дані обробляються відповідно до повідомлення про конфіденційність.",
    applicationSuccess: "Дякуємо! Заявку успішно збережено.",
    applicationError: "Не вдалося зберегти заявку. Перевір з’єднання та спробуй ще раз.",
    invalidEmail: "Перевір правильність email.",
    fileTooLarge: "Файл завеликий. Максимальний розмір — 8 МБ.",
    invalidFile: "Додай резюме у форматі PDF або DOCX.",
    consentRequired: "Підтверди ознайомлення з повідомленням про обробку персональних даних.",
    invalidSubmission: "Перевір обов’язкові поля та спробуй ще раз.",
    vacancyUnavailable: "Ця вакансія вже неактуальна. Онови сторінку та обери іншу.",
    rateLimited: "Забагато спроб. Зачекай трохи й спробуй ще раз.",
    privacyEyebrow: "Ваші дані",
    privacyTitle: "Повідомлення про конфіденційність",
    privacyParagraph1: "Ім’я, телефон, email, бажаний напрямок, коментар і дані вибраної вакансії використовуються для розгляду заявки та зв’язку з кандидатом.",
    privacyParagraph2: "За наявності резюме його файл зберігається у приватному сховищі сервера. Доступ до заявки та файлу не надається через відкриті посилання.",
    privacyParagraph3: "Надсилаючи заявку, ви підтверджуєте ознайомлення з цим повідомленням. Для запитань щодо персональних даних зверніться до Voloshyn Personal за контактами внизу сторінки.",
    privacyParagraph4: "Перед початком приймання заявок власник сайту має вказати фактичні дані контролера, контакт для запитів, правову підставу та строк зберігання і затвердити повну політику конфіденційності.",
    understood: "Зрозуміло",
    unavailableJobs: "Не вдалося завантажити вакансії. Спробуйте пізніше або залиште резюме.",
    notFound: "Сторінку не знайдено",
    notFoundText: "Скористайся навігацією, щоб перейти на головну або переглянути вакансії."
  },
  sk: {
    skipLink: "Prejsť na obsah",
    openMenu: "Otvoriť menu",
    mainNavigation: "Hlavná navigácia",
    language: "Jazyk stránky",
    close: "Zavrieť",
    navHome: "Domov",
    navJobs: "Pracovné ponuky",
    leaveResume: "Poslať životopis",
    footerDescription: "Pomáhame uchádzačom nájsť si prácu na Slovensku.",
    contacts: "Kontakt",
    followUs: "Nájdete nás na sociálnych sieťach",
    privacyPolicy: "Ochrana osobných údajov",
    rightsReserved: "Všetky práva vyhradené",
    contactPlaceholder: "[DOPLNIŤ]",
    heroEyebrow: "Práca na Slovensku",
    heroTitle: "Práca na Slovensku sa začína tu",
    heroText: "Pozrite si aktuálne pracovné ponuky, vyberte si vhodné podmienky a odošlite žiadosť online.",
    viewJobs: "Pozrieť pracovné ponuky",
    photoNoteEyebrow: "Nové príležitosti",
    photoNote: "Váš ďalší kariérny krok",
    benefitsEyebrow: "Prečo my",
    benefitsTitle: "Pomáhame nájsť vhodnú prácu",
    benefitsText: "Jednoduchá cesta od hľadania pracovnej ponuky až po odoslanie žiadosti.",
    benefitJobsTitle: "Aktuálne pracovné ponuky",
    benefitJobsText: "Ponuky s opisom dostupných podmienok a požiadaviek.",
    benefitApplicationTitle: "Jednoduchá žiadosť",
    benefitApplicationText: "Pošlite životopis online v niekoľkých jednoduchých krokoch.",
    benefitCommunicationTitle: "Zrozumiteľná komunikácia",
    benefitCommunicationText: "Používajte stránku v ukrajinčine alebo slovenčine.",
    categoriesEyebrow: "Oblasti",
    categoriesTitle: "Vyberte si oblasť, ktorá vám vyhovuje",
    categoriesText: "Pozrite si kategórie a vyfiltrujte ponuky podľa zamerania.",
    categoryProduction: "Výroba",
    categoryLogistics: "Sklady a logistika",
    categoryAutomotive: "Automobilový priemysel",
    categoryHospitality: "Gastronómia",
    categoryOther: "Ostatné ponuky",
    featuredEyebrow: "Príležitosti",
    featuredTitle: "Aktuálne pracovné ponuky",
    featuredText: "Pozrite si ponuky, ktoré zodpovedajú vašim očakávaniam.",
    allJobs: "Všetky pracovné ponuky",
    emptyJobsTitle: "Momentálne nie sú k dispozícii žiadne ponuky",
    emptyJobsText: "Momentálne pripravujeme nové ponuky. Môžete nám poslať životopis, aby sme mohli posúdiť váš profil.",
    emptyFilteredTitle: "Pre zvolené filtre sme nenašli žiadne ponuky",
    emptyFilteredText: "Zmeňte vyhľadávanie alebo zrušte filtre a pozrite si ďalšie aktuálne ponuky.",
    ctaEyebrow: "Ďalší krok",
    ctaTitle: "Nenašli ste vhodnú pracovnú ponuku?",
    ctaText: "Pošlite nám životopis a napíšte, čo hľadáte. Váš profil môžeme posúdiť pre vhodné pracovné príležitosti.",
    catalogTitle: "Aktuálne pracovné ponuky na Slovensku",
    catalogText: "Vyberte si pracovnú ponuku, ktorá zodpovedá vašim skúsenostiam a očakávaniam.",
    searchLabel: "Pozícia",
    searchPlaceholder: "Hľadať podľa názvu pozície",
    cityLabel: "Mesto",
    allCities: "Všetky mestá",
    categoryLabel: "Kategória",
    allCategories: "Všetky kategórie",
    scheduleLabel: "Pracovný čas",
    allSchedules: "Ľubovoľný pracovný čas",
    resetFilters: "Zrušiť filtre",
    jobCount: (count) => `${count} ${count === 1 ? "pracovná ponuka" : count >= 2 && count <= 4 ? "pracovné ponuky" : "pracovných ponúk"}`,
    salaryLabel: "Mzda",
    scheduleFact: "Pracovný čas",
    housingLabel: "Ubytovanie",
    details: "Viac informácií",
    applyNow: "Odpovedať",
    detailsResponsibilities: "Náplň práce",
    detailsRequirements: "Požiadavky",
    detailsConditions: "Pracovné podmienky",
    unspecified: "Neuvedené",
    applicationEyebrow: "Ďalší krok",
    applicationTitle: "Poslať životopis",
    applicationIntro: "Vyplňte formulár a my budeme môcť posúdiť váš profil.",
    applicationForJob: "Žiadosť o pracovnú ponuku",
    fullName: "Meno a priezvisko *",
    namePlaceholder: "Ako vás môžeme osloviť",
    phoneLabel: "Telefónne číslo *",
    emailLabel: "E-mail",
    directionLabel: "Požadovaná pracovná oblasť",
    directionPlaceholder: "Vyberte oblasť",
    commentLabel: "Poznámka",
    commentPlaceholder: "Napíšte nám o svojich skúsenostiach alebo požiadavkách",
    resumeLabel: "Životopis (PDF alebo DOCX)",
    resumeHint: "Nepovinné · maximálne 8 MB",
    consentText: "Potvrdzujem, že som sa oboznámil/-a s informáciami o spracúvaní osobných údajov. *",
    submitApplication: "Odoslať žiadosť",
    submitting: "Odosielame…",
    cancel: "Zrušiť",
    privacyHint: "Žiadosť bude odoslaná na posúdenie vášho profilu. Osobné údaje sa spracúvajú podľa oznámenia o ochrane súkromia.",
    applicationSuccess: "Ďakujeme! Vaša žiadosť bola úspešne uložená.",
    applicationError: "Žiadosť sa nepodarilo uložiť. Skontrolujte pripojenie a skúste to znova.",
    invalidEmail: "Skontrolujte, či je e-mailová adresa správna.",
    fileTooLarge: "Súbor je príliš veľký. Maximálna veľkosť je 8 MB.",
    invalidFile: "Priložte životopis vo formáte PDF alebo DOCX.",
    consentRequired: "Potvrďte, že ste sa oboznámili s informáciami o spracúvaní osobných údajov.",
    invalidSubmission: "Skontrolujte povinné polia a skúste to znova.",
    vacancyUnavailable: "Táto pracovná ponuka už nie je aktuálna. Obnovte stránku a vyberte inú.",
    rateLimited: "Príliš veľa pokusov. Chvíľu počkajte a skúste to znova.",
    privacyEyebrow: "Vaše údaje",
    privacyTitle: "Oznámenie o ochrane osobných údajov",
    privacyParagraph1: "Meno, telefón, e-mail, požadovaná oblasť, poznámka a údaje o vybranej pracovnej ponuke sa používajú na posúdenie žiadosti a kontaktovanie uchádzača.",
    privacyParagraph2: "Ak priložíte životopis, jeho súbor sa uloží do súkromného úložiska servera. Žiadosť ani súbor nie sú prístupné cez verejné odkazy.",
    privacyParagraph3: "Odoslaním žiadosti potvrdzujete, že ste sa oboznámili s týmto oznámením. V prípade otázok o osobných údajoch kontaktujte Voloshyn Personal prostredníctvom kontaktov v päte stránky.",
    privacyParagraph4: "Pred začatím prijímania žiadostí musí prevádzkovateľ doplniť skutočné identifikačné údaje prevádzkovateľa, kontaktnú adresu, právny základ a dobu uchovávania a schváliť úplné zásady ochrany osobných údajov.",
    understood: "Rozumiem",
    unavailableJobs: "Pracovné ponuky sa nepodarilo načítať. Skúste to neskôr alebo nám pošlite životopis.",
    notFound: "Stránka sa nenašla",
    notFoundText: "Pomocou navigácie prejdite na domovskú stránku alebo na pracovné ponuky."
  }
};

const categories = [
  ["production", "categoryProduction", "▦"],
  ["logistics", "categoryLogistics", "⇄"],
  ["automotive", "categoryAutomotive", "◈"],
  ["hospitality", "categoryHospitality", "♨"],
  ["other", "categoryOther", "＋"]
];
const categoryText = Object.fromEntries(categories.map(([key, label]) => [key, label]));
const images = {
  hero: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1080&q=82"
};
const state = { language: "ua", jobs: [], config: {}, jobsError: false, selectedJob: null, lastFocus: null };
const pageContent = document.querySelector("#page-content");
const applicationDialog = document.querySelector("#application-dialog");
const privacyDialog = document.querySelector("#privacy-dialog");
const detailsDialog = document.querySelector("#details-dialog");
const applicationForm = document.querySelector("[data-application-form]");
const formError = document.querySelector("[data-form-error]");
const formSuccess = document.querySelector("[data-form-success]");
const applicationJob = document.querySelector("[data-application-job]");

function t(key, ...args) {
  const value = copy[state.language][key];
  return typeof value === "function" ? value(...args) : value ?? key;
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function localized(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return String(value[state.language] ?? value.ua ?? value.sk ?? "");
  }
  return value == null ? "" : String(value);
}

function localizedList(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [];
  const items = value[state.language] ?? value.ua ?? value.sk;
  return Array.isArray(items) ? items.map(String).filter(Boolean) : [];
}

function categoryLabel(category) {
  const labelKey = categoryText[category];
  return labelKey ? t(labelKey) : t("categoryOther");
}

function isActive(job) {
  if (!(job.active === true || job.status === "active")) return false;
  if (job.expiresAt) {
    const expiry = Date.parse(job.expiresAt);
    if (Number.isFinite(expiry) && expiry < Date.now()) return false;
  }
  return true;
}

function routeURL(path, parameters = {}) {
  const url = new URL(path, window.location.origin);
  url.searchParams.set("lang", state.language);
  Object.entries(parameters).forEach(([key, value]) => url.searchParams.set(key, value));
  return `${url.pathname}${url.search}`;
}

function jobMeta(job) {
  const city = localized(job.city);
  const schedule = localized(job.schedule);
  return `<div class="job-meta">
    ${city ? `<span><span aria-hidden="true">⌖</span> ${escapeHTML(city)}</span>` : ""}
    ${schedule ? `<span><span aria-hidden="true">◷</span> ${escapeHTML(schedule)}</span>` : ""}
  </div>`;
}

function jobCard(job) {
  const title = localized(job.title);
  const salary = localized(job.salary);
  const salaryType = localized(job.salaryType);
  const schedule = localized(job.schedule);
  const housing = localized(job.housing);
  const description = localized(job.shortDescription);
  const detailsLabel = `${t("details")}: ${title}`;
  const applyLabel = `${t("applyNow")}: ${title}`;
  const facts = [
    salary ? `<div class="job-fact"><strong>${escapeHTML(t("salaryLabel"))}:</strong> ${escapeHTML(salary)}${salaryType ? ` · ${escapeHTML(salaryType)}` : ""}</div>` : "",
    schedule ? `<div class="job-fact"><strong>${escapeHTML(t("scheduleFact"))}:</strong> ${escapeHTML(schedule)}</div>` : "",
    housing ? `<div class="job-fact"><strong>${escapeHTML(t("housingLabel"))}:</strong> ${escapeHTML(housing)}</div>` : ""
  ].filter(Boolean).join("");
  return `<article class="job-card">
    <span class="job-category">${escapeHTML(categoryLabel(job.category))}</span>
    <h3>${escapeHTML(title)}</h3>
    ${jobMeta(job)}
    ${description ? `<p class="job-description">${escapeHTML(description)}</p>` : ""}
    ${facts ? `<div class="job-facts">${facts}</div>` : ""}
    <div class="job-card-actions">
      <button class="button button-outline" type="button" data-job-details="${escapeHTML(job.id)}" aria-label="${escapeHTML(detailsLabel)}">${escapeHTML(t("details"))}</button>
      <button class="button button-primary" type="button" data-apply-job="${escapeHTML(job.id)}" aria-label="${escapeHTML(applyLabel)}">${escapeHTML(t("applyNow"))}</button>
    </div>
  </article>`;
}

function emptyState(filtered = false) {
  const heading = filtered ? t("emptyFilteredTitle") : t("emptyJobsTitle");
  const message = state.jobsError ? t("unavailableJobs") : filtered ? t("emptyFilteredText") : t("emptyJobsText");
  return `<div class="empty-state">
    <span class="empty-icon" aria-hidden="true">${state.jobsError ? "!" : "⌕"}</span>
    <h3>${escapeHTML(state.jobsError ? t("unavailableJobs") : heading)}</h3>
    ${state.jobsError ? "" : `<p>${escapeHTML(message)}</p>`}
    <button class="button button-primary" type="button" data-open-application>${escapeHTML(t("leaveResume"))}</button>
  </div>`;
}

function homePage() {
  const currentJobs = state.jobs.filter(isActive).slice(0, 3);
  const benefits = [
    ["◫", "benefitJobsTitle", "benefitJobsText"],
    ["↗", "benefitApplicationTitle", "benefitApplicationText"],
    ["文", "benefitCommunicationTitle", "benefitCommunicationText"]
  ];
  return `<section class="hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <span class="eyebrow">${escapeHTML(t("heroEyebrow"))}</span>
        <h1>${escapeHTML(t("heroTitle"))}</h1>
        <p>${escapeHTML(t("heroText"))}</p>
        <div class="hero-actions">
          <a class="button button-primary" href="${routeURL("/jobs")}">${escapeHTML(t("viewJobs"))}<span class="button-arrow" aria-hidden="true">→</span></a>
          <button class="button button-outline" type="button" data-open-application>${escapeHTML(t("leaveResume"))}</button>
        </div>
      </div>
      <div class="hero-visual">
        <img class="hero-photo" src="${images.hero}" alt="${escapeHTML(t("heroEyebrow"))}" fetchpriority="high" width="1080" height="810">
        <div class="hero-photo-note"><span>${escapeHTML(t("photoNoteEyebrow"))}</span>${escapeHTML(t("photoNote"))}</div>
      </div>
    </div>
  </section>
  <section class="section" aria-labelledby="benefits-title">
    <div class="container">
      <div class="section-heading"><span class="eyebrow">${escapeHTML(t("benefitsEyebrow"))}</span><h2 id="benefits-title">${escapeHTML(t("benefitsTitle"))}</h2><p>${escapeHTML(t("benefitsText"))}</p></div>
      <div class="benefits-grid">${benefits.map(([icon, title, text]) => `<article class="benefit-card"><span class="benefit-icon" aria-hidden="true">${icon}</span><h3>${escapeHTML(t(title))}</h3><p>${escapeHTML(t(text))}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section section-tinted" aria-labelledby="categories-title">
    <div class="container">
      <div class="section-heading"><span class="eyebrow">${escapeHTML(t("categoriesEyebrow"))}</span><h2 id="categories-title">${escapeHTML(t("categoriesTitle"))}</h2><p>${escapeHTML(t("categoriesText"))}</p></div>
      <div class="category-grid">${categories.map(([value, label, icon]) => `<a class="category-card" href="${routeURL("/jobs", { category: value })}"><span class="category-icon" aria-hidden="true">${icon}</span><strong>${escapeHTML(t(label))}</strong><span class="category-arrow" aria-hidden="true">↗</span></a>`).join("")}</div>
    </div>
  </section>
  <section class="section" aria-labelledby="featured-title">
    <div class="container">
      <div class="section-heading"><span class="eyebrow">${escapeHTML(t("featuredEyebrow"))}</span><h2 id="featured-title">${escapeHTML(t("featuredTitle"))}</h2><p>${escapeHTML(t("featuredText"))}</p></div>
      ${currentJobs.length ? `<div class="job-grid">${currentJobs.map(jobCard).join("")}</div>` : emptyState()}
      ${currentJobs.length ? `<div class="section-action"><a class="button button-outline" href="${routeURL("/jobs")}">${escapeHTML(t("allJobs"))}<span class="button-arrow" aria-hidden="true">→</span></a></div>` : ""}
    </div>
  </section>
  <section class="cta-section">
    <div class="container cta-inner">
      <div class="cta-copy"><span class="eyebrow">${escapeHTML(t("ctaEyebrow"))}</span><h2>${escapeHTML(t("ctaTitle"))}</h2><p>${escapeHTML(t("ctaText"))}</p></div>
      <button class="button" type="button" data-open-application>${escapeHTML(t("leaveResume"))}<span class="button-arrow" aria-hidden="true">→</span></button>
    </div>
  </section>`;
}

function catalogPage() {
  const currentJobs = state.jobs.filter(isActive);
  const params = new URLSearchParams(location.search);
  const selectedCategory = categories.some(([value]) => value === params.get("category")) ? params.get("category") : "";
  const cities = [...new Set(currentJobs.map((job) => localized(job.city)).filter(Boolean))].sort((a, b) => a.localeCompare(b, state.language));
  const schedules = [...new Set(currentJobs.map((job) => localized(job.schedule)).filter(Boolean))].sort((a, b) => a.localeCompare(b, state.language));
  return `<section class="catalog-hero">
    <div class="container"><span class="eyebrow">${escapeHTML(t("featuredEyebrow"))}</span><h1>${escapeHTML(t("catalogTitle"))}</h1><p>${escapeHTML(t("catalogText"))}</p></div>
  </section>
  <section class="catalog-section">
    <div class="container">
      <form class="filter-panel" data-filter-form role="search">
        <label class="filter-field"><span>${escapeHTML(t("searchLabel"))}</span><input type="search" name="search" placeholder="${escapeHTML(t("searchPlaceholder"))}" autocomplete="off" data-i18n-placeholder="searchPlaceholder"></label>
        <label class="filter-field"><span>${escapeHTML(t("cityLabel"))}</span><select name="city"><option value="">${escapeHTML(t("allCities"))}</option>${cities.map((city) => `<option value="${escapeHTML(city)}">${escapeHTML(city)}</option>`).join("")}</select></label>
        <label class="filter-field"><span>${escapeHTML(t("categoryLabel"))}</span><select name="category"><option value="">${escapeHTML(t("allCategories"))}</option>${categories.map(([value, label]) => `<option value="${value}" ${selectedCategory === value ? "selected" : ""}>${escapeHTML(t(label))}</option>`).join("")}</select></label>
        ${schedules.length ? `<label class="filter-field"><span>${escapeHTML(t("scheduleLabel"))}</span><select name="schedule"><option value="">${escapeHTML(t("allSchedules"))}</option>${schedules.map((schedule) => `<option value="${escapeHTML(schedule)}">${escapeHTML(schedule)}</option>`).join("")}</select></label>` : ""}
        <button class="button button-quiet filter-reset" type="reset">${escapeHTML(t("resetFilters"))}</button>
      </form>
      <p class="results-count" data-results-count aria-live="polite"></p>
      <div class="job-grid" data-catalog-results></div>
    </div>
  </section>`;
}

function renderPage() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  document.documentElement.lang = state.language === "ua" ? "uk" : "sk";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[state.language][key] && typeof copy[state.language][key] !== "function") element.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    const active = button.dataset.language === state.language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const active = path === "/" ? link.dataset.nav === "home" : link.dataset.nav === "jobs" && path === "/jobs";
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.title = path === "/jobs"
    ? (state.language === "ua" ? "Актуальні вакансії у Словаччині — Voloshyn Personal" : "Aktuálne pracovné ponuky na Slovensku — Voloshyn Personal")
    : (state.language === "ua" ? "Voloshyn Personal — робота у Словаччині" : "Voloshyn Personal — práca na Slovensku");
  const description = state.language === "ua"
    ? "Переглядайте актуальні вакансії у Словаччині та залишайте заявку в Voloshyn Personal українською або словацькою."
    : "Pozrite si aktuálne pracovné ponuky na Slovensku a pošlite žiadosť v ukrajinčine alebo slovenčine.";
  document.querySelector('meta[name="description"]').content = description;
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[property="og:description"]').content = description;
  document.querySelector('meta[property="og:locale"]').content = state.language === "ua" ? "uk_UA" : "sk_SK";
  const pageURL = new URL(path, window.location.origin);
  const languageURL = (language) => {
    const url = new URL(path, window.location.origin);
    url.searchParams.set("lang", language);
    return url.href;
  };
  document.querySelector('link[rel="canonical"]').href = pageURL.href;
  document.querySelector('link[hreflang="uk"]').href = languageURL("ua");
  document.querySelector('link[hreflang="sk"]').href = languageURL("sk");
  document.querySelector('link[hreflang="x-default"]').href = languageURL("ua");
  if (path === "/") pageContent.innerHTML = homePage();
  else if (path === "/jobs") pageContent.innerHTML = catalogPage();
  else pageContent.innerHTML = `<section class="section"><div class="container"><div class="empty-state"><h1>${escapeHTML(t("notFound"))}</h1><p>${escapeHTML(t("notFoundText"))}</p><a class="button button-primary" href="${routeURL("/")}">${escapeHTML(t("navHome"))}</a></div></div></section>`;
  document.querySelectorAll('.brand[href="/"]').forEach((link) => {
    link.href = routeURL("/");
  });
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.href = routeURL(link.dataset.nav === "jobs" ? "/jobs" : "/");
  });
  if (path === "/jobs") {
    const params = new URLSearchParams(location.search);
    const category = pageContent.querySelector('[name="category"]');
    if (category) category.value = categories.some(([value]) => value === params.get("category")) ? params.get("category") : "";
    updateCatalog();
  }
  document.querySelectorAll("[data-contact]").forEach((link) => {
    const key = link.dataset.contact;
    const value = state.config[key] || "";
    if (key === "email" || key === "phone") {
      const display = value && !value.includes("[") ? value : t("contactPlaceholder");
      link.textContent = display;
      if (value && !value.includes("[")) link.href = `${key === "email" ? "mailto" : "tel"}:${value}`;
      else link.removeAttribute("href");
    } else if (value && /^https?:\/\//i.test(value)) {
      link.href = value;
      link.hidden = false;
    } else link.hidden = true;
  });
  document.querySelector("[data-current-year]").textContent = new Date().getFullYear();
  document.querySelector("[data-privacy-copy]").innerHTML = ["privacyParagraph1", "privacyParagraph2", "privacyParagraph3", "privacyParagraph4"]
    .map((key) => `<p>${escapeHTML(t(key))}</p>`).join("");
  const menu = document.querySelector("#site-nav");
  menu.classList.remove("is-open");
  document.querySelector("[data-menu-toggle]").setAttribute("aria-expanded", "false");
}

function updateCatalog() {
  const form = pageContent.querySelector("[data-filter-form]");
  const results = pageContent.querySelector("[data-catalog-results]");
  if (!form || !results) return;
  const query = form.elements.search.value.trim().toLocaleLowerCase(state.language === "ua" ? "uk" : "sk");
  const city = form.elements.city.value;
  const category = form.elements.category.value;
  const schedule = form.elements.schedule?.value || "";
  const filtered = state.jobs.filter(isActive).filter((job) => {
    const searchable = `${localized(job.title)} ${localized(job.city)}`.toLocaleLowerCase(state.language === "ua" ? "uk" : "sk");
    return (!query || searchable.includes(query))
      && (!city || localized(job.city) === city)
      && (!category || job.category === category)
      && (!schedule || localized(job.schedule) === schedule);
  });
  pageContent.querySelector("[data-results-count]").textContent = state.jobsError ? "" : t("jobCount", filtered.length);
  results.innerHTML = filtered.length ? filtered.map(jobCard).join("") : emptyState(Boolean(query || city || category || schedule));
}

function findJob(id) {
  return state.jobs.find((job) => job.id === id && isActive(job));
}

function openDialog(dialog) {
  state.lastFocus = document.activeElement;
  if (!dialog.open) dialog.showModal();
}

function openApplication(job = null) {
  state.selectedJob = job;
  applicationJob.hidden = !job;
  applicationJob.textContent = job ? `${t("applicationForJob")}: ${localized(job.title)}` : "";
  formError.hidden = true;
  formSuccess.hidden = true;
  applicationForm.reset();
  const submit = applicationForm.querySelector("[data-submit-button]");
  submit.disabled = false;
  submit.textContent = t("submitApplication");
  applicationForm.dataset.submitted = "false";
  openDialog(applicationDialog);
  window.setTimeout(() => applicationForm.elements.name.focus(), 40);
}

function renderJobDetails(job) {
  const items = [
    ["detailsResponsibilities", localizedList(job.responsibilities)],
    ["detailsRequirements", localizedList(job.requirements)],
    ["detailsConditions", localizedList(job.conditions)]
  ];
  const housing = localized(job.housing);
  const salary = localized(job.salary);
  const salaryType = localized(job.salaryType);
  const basics = [
    localized(job.city) ? `<span>⌖ ${escapeHTML(localized(job.city))}</span>` : "",
    salary ? `<span>${escapeHTML(t("salaryLabel"))}: ${escapeHTML(salary)}${salaryType ? ` · ${escapeHTML(salaryType)}` : ""}</span>` : "",
    localized(job.schedule) ? `<span>${escapeHTML(t("scheduleFact"))}: ${escapeHTML(localized(job.schedule))}</span>` : ""
  ].filter(Boolean).join("");
  const sections = items.map(([heading, values]) => values.length
    ? `<section class="details-section"><h3>${escapeHTML(t(heading))}</h3><ul>${values.map((value) => `<li>${escapeHTML(value)}</li>`).join("")}</ul></section>`
    : "").join("");
  const description = localized(job.shortDescription);
  document.querySelector("[data-job-details]").innerHTML = `
    <span class="job-category">${escapeHTML(categoryLabel(job.category))}</span>
    <h2 id="details-title">${escapeHTML(localized(job.title))}</h2>
    ${basics ? `<div class="job-meta">${basics}</div>` : ""}
    ${description ? `<section class="details-section"><p>${escapeHTML(description)}</p></section>` : ""}
    ${housing ? `<section class="details-section"><h3>${escapeHTML(t("housingLabel"))}</h3><p>${escapeHTML(housing)}</p></section>` : ""}
    ${sections}`;
  document.querySelector("[data-details-apply]").dataset.applyJob = job.id;
}

function showFormError(message) {
  formError.textContent = message;
  formError.hidden = false;
  formError.focus?.();
}

async function submitApplication(event) {
  event.preventDefault();
  formError.hidden = true;
  formSuccess.hidden = true;
  if (!applicationForm.reportValidity()) return;
  const data = new FormData(applicationForm);
  const email = String(data.get("email") || "").trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFormError(t("invalidEmail"));
    applicationForm.elements.email.focus();
    return;
  }
  const resume = applicationForm.elements.resume.files[0];
  if (resume && resume.size > 8 * 1024 * 1024) {
    showFormError(t("fileTooLarge"));
    return;
  }
  if (resume && !/\.(pdf|docx)$/i.test(resume.name)) {
    showFormError(t("invalidFile"));
    return;
  }
  if (!applicationForm.elements.consent.checked) {
    showFormError(t("consentRequired"));
    applicationForm.elements.consent.focus();
    return;
  }
  data.set("vacancy_id", state.selectedJob?.id || "");
  data.set("consent", "true");
  const submit = applicationForm.querySelector("[data-submit-button]");
  submit.disabled = true;
  submit.textContent = t("submitting");
  const serverErrors = {
    invalid_submission: "invalidSubmission",
    invalid_file: "invalidFile",
    vacancy_unavailable: "vacancyUnavailable",
    rate_limited: "rateLimited",
    request_too_large: "fileTooLarge"
  };
  try {
    const response = await fetch("/api/applications", { method: "POST", body: data, credentials: "same-origin" });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.saved !== true) {
      const errorKey = serverErrors[result.error];
      throw new Error(errorKey ? t(errorKey) : t("applicationError"));
    }
    formSuccess.textContent = t("applicationSuccess");
    formSuccess.hidden = false;
    applicationForm.dataset.submitted = "true";
    applicationForm.reset();
    submit.textContent = t("applicationSuccess");
    submit.disabled = true;
  } catch (error) {
    showFormError(error.message || t("applicationError"));
    submit.disabled = false;
    submit.textContent = t("submitApplication");
  }
}

document.addEventListener("click", (event) => {
  const languageButton = event.target.closest("[data-language]");
  if (languageButton) {
    state.language = languageButton.dataset.language;
    localStorage.setItem("voloshyn-language", state.language);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", state.language);
    window.history.replaceState({}, "", url);
    renderPage();
    return;
  }
  if (event.target.closest("[data-open-application]")) {
    openApplication();
    return;
  }
  if (event.target.closest("[data-open-privacy]")) {
    openDialog(privacyDialog);
    return;
  }
  if (event.target.closest("[data-close-dialog], [data-cancel-dialog]")) {
    event.target.closest("dialog")?.close();
    return;
  }
  const applyButton = event.target.closest("[data-apply-job]");
  if (applyButton) {
    const job = findJob(applyButton.dataset.applyJob);
    if (job) openApplication(job);
    return;
  }
  const detailsButton = event.target.closest("[data-job-details]");
  if (detailsButton) {
    const job = findJob(detailsButton.dataset.jobDetails);
    if (job) {
      renderJobDetails(job);
      openDialog(detailsDialog);
    }
    return;
  }
  if (event.target.closest("[data-details-apply]")) {
    const job = findJob(event.target.closest("[data-details-apply]").dataset.applyJob);
    detailsDialog.close();
    if (job) window.setTimeout(() => openApplication(job), 0);
    return;
  }
  if (event.target.closest("[data-menu-toggle]")) {
    const button = event.target.closest("[data-menu-toggle]");
    const menu = document.querySelector("#site-nav");
    const isOpen = menu.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  }
});

document.addEventListener("change", (event) => {
  if (event.target.closest("[data-filter-form]")) updateCatalog();
});
document.addEventListener("input", (event) => {
  if (event.target.matches('[data-filter-form] input[name="search"]')) updateCatalog();
});
document.addEventListener("reset", (event) => {
  if (event.target.matches("[data-filter-form]")) window.setTimeout(updateCatalog, 0);
});
document.addEventListener("submit", (event) => {
  if (event.target.matches("[data-application-form]")) submitApplication(event);
});
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    if (state.lastFocus instanceof HTMLElement && state.lastFocus.isConnected) state.lastFocus.focus();
  });
});

try {
  const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
  const savedLanguage = localStorage.getItem("voloshyn-language");
  const language = requestedLanguage || savedLanguage;
  if (language === "sk" || language === "ua") state.language = language;
} catch {
  state.language = "ua";
}

async function loadInitialData() {
  const [jobsResult, configResult] = await Promise.allSettled([
    fetch("/api/jobs", { headers: { Accept: "application/json" } }),
    fetch("/api/config", { headers: { Accept: "application/json" } })
  ]);
  if (jobsResult.status === "fulfilled" && jobsResult.value.ok) {
    const jobs = await jobsResult.value.json();
    state.jobs = Array.isArray(jobs) ? jobs.filter((job) => job && typeof job.id === "string" && job.title) : [];
  } else state.jobsError = true;
  if (configResult.status === "fulfilled" && configResult.value.ok) {
    state.config = await configResult.value.json();
  }
  renderPage();
}

loadInitialData();
