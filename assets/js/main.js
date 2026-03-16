/* =========================================================
   HELPER: LOAD HTML PARTIALS
========================================================= */
function loadHTML(id, file) {
  const container = document.getElementById(id);
  if (!container) return;

  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load " + file);
      return response.text();
    })
    .then((html) => {
      container.innerHTML = html;
    })
    .catch((error) => {
      console.error(error);
    });
}

/* =========================================================
   DOM READY (SINGLE ENTRY POINT)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // Global Partials
  loadHTML("header", "partials/header.html");
  loadHTML("footer", "partials/footer.html");
  loadHTML("blog-section", "partials/blog-section.html");
  loadHTML("team-section", "partials/team-section.html");

  // Page-specific logic
  loadProductDetails();
  loadProjectDetails();
  loadCareerDetails();
  initTeamSlider();

  setTimeout(() => {
    initTeamSlider();
  }, 200);
});

/* ==============================================================================================
   PRODUCTS SECTION DATA
================================================================================================= */

/* =========================================================
   PRODUCT DATA 
========================================================= */
const productsData = {
  "distribution-transformer": {
    title: "Distribution Transformers",
    subtitle: "Reliable Power Distribution",
    description:
      "BIS-compliant transformers designed for safe and efficient urban and rural power distribution with long-lasting performance.",
    specs: [
      "Voltage class up to 220 kV",
      "Capacity up to 10 MVA",
      "ONAN / ONAF cooling",
      "Low loss CRGO / amorphous core",
      "IS 2026 / IEC compliant",
    ],
    images: [
      "assets/images/why-choose-us.png",
      "assets/images/why-choose-us.png",
    ],
  },

  "lfa-transformer": {
    title: "LFA Transformers",
    subtitle: "Low Loss Energy Efficient Transformers",
    description:
      "Energy-efficient LFA transformers designed to minimize losses and improve operational efficiency as per Indian standards.",
    specs: [
      "Voltage class up to 220 kV",
      "Capacity up to 10 MVA",
      "ONAN / ONAF cooling",
      "Low loss CRGO / amorphous core",
      "IS 2026 / IEC compliant",
    ],
    images: [
      "assets/images/why-choose-us.png",
      "assets/images/why-choose-us.png",
    ],
  },
  "power-transformer": {
    title: "Power Transformers",
    subtitle: "High-Capacity Power Transmission Solutions",
    description:
      "Our Power Transformers are engineered to deliver reliable, high-efficiency performance in transmission and substation applications. Designed and manufactured in accordance with IS 2026 and relevant IEC standards, these transformers are suitable for voltage classes up to 220 kV and capacities up to 10 MVA. Built using high-grade core steel, advanced insulation systems, and precision winding techniques, they ensure minimal losses, superior thermal performance, and long service life. Ideal for utilities, industrial plants, renewable energy projects, and infrastructure networks, our power transformers are tested for electrical, mechanical, and thermal reliability to perform consistently under demanding operating conditions.",
    specs: [
      "Voltage class up to 220 kV",
      "Capacity up to 10 MVA",
      "ONAN / ONAF cooling",
      "Low loss CRGO / amorphous core",
      "IS 2026 / IEC compliant",
    ],
    images: [
      "assets/images/why-choose-us.png",
      "assets/images/why-choose-us.png",
    ],
  },

  "custom-transformer": {
    title: "Power Transformers",
    subtitle: "High Capacity Power Solutions",
    description:
      "High-capacity power transformers engineered as per IS 2026 for substations and industrial applications.",
    specs: [
      "Voltage class up to 220 kV",
      "Capacity up to 10 MVA",
      "ONAN / ONAF cooling",
      "Low loss CRGO / amorphous core",
      "IS 2026 / IEC compliant",
    ],
    images: [
      "assets/images/why-choose-us.png",
      "assets/images/why-choose-us.png",
    ],
  },
};

/* =========================================================
   LOAD PRODUCT DETAILS (SAFE ON ALL PAGES)
========================================================= */
function loadProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId || !productsData[productId]) return;

  const product = productsData[productId];

  // Hero / Title
  const titleEl = document.getElementById("product-title");
  if (titleEl) titleEl.innerText = product.title;

  // Content section
  const subtitleEl = document.getElementById("product-subtitle");
  const descEl = document.getElementById("product-description");

  if (subtitleEl) subtitleEl.innerText = product.subtitle;
  if (descEl) descEl.innerText = product.description;

  // Images
  const img1 = document.getElementById("product-image-1");
  const img2 = document.getElementById("product-image-2");

  if (img1) img1.src = product.images[0];
  if (img2) img2.src = product.images[1];
}

/* =========================================================
   PRODUCT LISTING DATA
========================================================= */
const productListingData = [
  {
    title: "Civil & Construction",
    description:
      "Trends, technologies, and project insights from the civil engineering and construction sector. Explore topics covering infrastructure development, materials, structural systems, and modern construction practices.",
    image: "assets/images/civil-construction/m3m-crown.png",
    alt: "contribution-of-mdp-in-Civil-sector",
    id: "Civil",
  },
  {
    title: "Information & Technology",
    description:
      "Insights into digital transformation, industrial automation, data systems, and emerging technologies shaping modern businesses and infrastructure.",
    image: "assets/images/information-technology/data-centre.png",
    alt: "contribution-of-mdp-in-IT-sector",
    id: "Information-Technology",
  },
  {
    title: "Manufacturing & Industry",
    description:
      "Discover innovations in industrial production, engineering processes, quality systems, and the technologies driving modern manufacturing.",
    image: "assets/images/manufacturing/manufacturing-bg.jpg",
    alt: "contribution-of-mdp-in-Manufacturing-sector",
    id: "Manufacturing-Transformers",
  },
  {
    title: "Power Supply & Distribution",
    description:
      "Knowledge and analysis on electrical networks, grid infrastructure, transformers, and sustainable power distribution systems.",
    image: "assets/images/power-distribution/power-distribution.png",
    alt: "Custom Transformers",
    id: "custom-transformer",
  },
];

/* =========================================================
   RENDER PRODUCT LISTING (NO HTML STRINGS)
========================================================= */
function renderProductListing() {
  const container = document.getElementById("products-container");
  const template = document.getElementById("product-card-template");

  if (!container || !template) return;

  productListingData.forEach((product) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".product-image").src = product.image;
    clone.querySelector(".product-image").alt = product.alt;
    clone.querySelector(".product-title").innerText = product.title;
    clone.querySelector(".product-description").innerText = product.description;
    clone.querySelector(".product-link").href =
      `products-details.html?id=${product.id}`;

    container.appendChild(clone);
  });
}

/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderProductListing();
});

/* ==============================================================================================
   CAREER SECTION DATA
================================================================================================= */

/* =========================================================
   CAREER DATA (EDIT / EXTEND THIS)
========================================================= */
const careerData = {
  "electrical-design-engineer": {
    title: "Electrical Design Engineer",
    subtitle: "Design & Engineering | Full Time | 2–5 Years",
    description:
      "We are looking for an Electrical Design Engineer to design, develop, and validate distribution and power transformers. The role involves core design calculations, insulation coordination, loss optimization, technical documentation, and coordination with production teams.",
    specs: [
      "Education: B.Tech / BE – Electrical Engineering",
      "Experience: 2–5 Years in transformer design",
      "Strong knowledge of IS & IEC standards",
      "AutoCAD, calculation software proficiency",
      "Location: Jabalpur / Indore",
    ],
  },

  "production-supervisor": {
    title: "Production Supervisor",
    subtitle: "Manufacturing | Full Time | 5–10 Years",
    description:
      "Responsible for supervising shop-floor operations, manpower handling, production planning, and ensuring quality output while meeting delivery schedules.",
    specs: [
      "Diploma / B.Tech in Electrical / Mechanical",
      "Experience in transformer manufacturing",
      "Strong manpower handling skills",
      "Production planning & workflow optimization",
      "Location: Jabalpur",
    ],
  },

  "quality-control-engineer": {
    title: "Quality Control Engineer",
    subtitle: "Quality Assurance | Full Time | 3–6 Years",
    description:
      "Responsible for stage inspection, routine testing, quality documentation, and compliance as per BIS and customer standards.",
    specs: [
      "B.Tech / Diploma – Electrical",
      "Experience in transformer testing & QA",
      "Knowledge of IS 2026 standards",
      "Testing & inspection expertise",
      "Location: Jabalpur",
    ],
  },

  "sales-marketing-executive": {
    title: "Sales & Marketing Executive",
    subtitle: "Business Development | Full Time | 2–6 Years",
    description:
      "Lead business development, handle utility tenders, build client relationships, and drive sales growth in power distribution sector.",
    specs: [
      "MBA / B.Tech preferred",
      "Tender handling experience",
      "Strong communication & negotiation",
      "Willingness to travel",
      "Location: PAN India",
    ],
  },

  "purchase-officer": {
    title: "Purchase & Vendor Development Officer",
    subtitle: "Procurement | Full Time | 3–7 Years",
    description:
      "Responsible for procurement planning, vendor development, cost negotiation, and supply chain coordination.",
    specs: [
      "Graduate / MBA preferred",
      "Experience in industrial procurement",
      "Vendor sourcing & negotiation skills",
      "ERP & Excel proficiency",
      "Location: Jabalpur",
    ],
  },

  "accounts-executive": {
    title: "Accounts & Compliance Executive",
    subtitle: "Finance | Full Time | 2–5 Years",
    description:
      "Handle billing, GST, audits, compliance, and financial reporting.",
    specs: [
      "B.Com / M.Com / CA Inter",
      "GST, TDS, audit experience",
      "Accounting software proficiency",
      "Strong compliance knowledge",
      "Location: Jabalpur",
    ],
  },
};

/* =========================================================
   LOAD CAREER DETAILS (SAFE ON ALL PAGES)
========================================================= */
function loadCareerDetails() {
  const params = new URLSearchParams(window.location.search);
  const careerId = params.get("id");
  if (!careerId || !careerData[careerId]) return;

  const career = careerData[careerId];

  document.getElementById("Career-title").innerText = career.title;
  document.getElementById("Career-subtitle").innerText = career.subtitle;
  document.getElementById("Career-description").innerText = career.description;

  const specsBox = document.getElementById("Career-specs");
  specsBox.innerHTML = "";

  career.specs.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item;
    specsBox.appendChild(li);
  });
}

/* =========================================================
   CAREER LISTING DATA
========================================================= */
const careerListingData = {
  "electrical-design-engineer": {
    title: "Electrical Design Engineer",
    description:
      "Work on design, testing, and documentation of distribution transformers in compliance with IS and IEC standards.",
  },

  "production-supervisor": {
    title: "Production Supervisor",
    description:
      "Lead shop-floor operations, manage manpower, and ensure quality and timely production of transformers.",
  },

  "quality-control-engineer": {
    title: "Quality Control Engineer",
    description:
      "Monitor testing procedures, inspections, and BIS compliance to maintain high-quality manufacturing standards.",
  },

  "sales-marketing-executive": {
    title: "Sales & Marketing Executive",
    description:
      "Develop client relationships, handle utility tenders, and expand market presence across power distribution sectors.",
  },

  "purchase-officer": {
    title: "Purchase & Vendor Development Officer",
    description:
      "Manage procurement of raw materials, vendor coordination, and cost optimization for transformer manufacturing.",
  },

  "accounts-executive": {
    title: "Accounts & Compliance Executive",
    description:
      "Handle billing, GST compliance, audits, and financial reporting in coordination with internal teams.",
  },
};

/* =========================================================
   RENDER CAREER LISTING
========================================================= */
function renderCareerListing() {
  const container = document.getElementById("careers-container");
  const template = document.getElementById("career-card-template");

  if (!container || !template) return;

  Object.entries(careerListingData).forEach(([id, career]) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".career-title").innerText = career.title;
    clone.querySelector(".career-description").innerText = career.description;
    clone.querySelector(".career-link").href = `careers-details.html?id=${id}`;

    container.appendChild(clone);
  });
}

/* =========================================================
   INIT
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderCareerListing();
});

/* ==============================================================================================
   PROJECTS SECTION DATA
================================================================================================= */

/* =========================================================
   PROJECTS DETAILS PAGE DATA 
========================================================= */
const projectsData = {
  "distribution-transformer": {
    title: "Distribution Transformers",
    subtitle: "Reliable Power Distribution",
    description:
      "BIS-compliant transformers designed for safe and efficient urban and rural power distribution with long-lasting performance.",
    specs: [
      "Voltage class up to 220 kV",
      "Capacity up to 10 MVA",
      "ONAN / ONAF cooling",
      "Low loss CRGO / amorphous core",
      "IS 2026 / IEC compliant",
    ],
    images: [
      "assets/images/why-choose-us.png",
      "assets/images/why-choose-us.png",
    ],
  },

  "lfa-transformer": {
    title: "LFA Transformers",
    subtitle: "Low Loss Energy Efficient Transformers",
    description:
      "Energy-efficient LFA transformers designed to minimize losses and improve operational efficiency as per Indian standards.",
    specs: [
      "Voltage class up to 220 kV",
      "Capacity up to 10 MVA",
      "ONAN / ONAF cooling",
      "Low loss CRGO / amorphous core",
      "IS 2026 / IEC compliant",
    ],
    images: [
      "assets/images/why-choose-us.png",
      "assets/images/why-choose-us.png",
    ],
  },

  "power-transformer": {
    title: "Power Transformers",
    subtitle: "High-Capacity Power Transmission Solutions",
    description:
      "Our Power Transformers are engineered to deliver reliable, high-efficiency performance in transmission and substation applications. Designed and manufactured in accordance with IS 2026 and relevant IEC standards, these transformers are suitable for voltage classes up to 220 kV and capacities up to 10 MVA. Built using high-grade core steel, advanced insulation systems, and precision winding techniques, they ensure minimal losses, superior thermal performance, and long service life. Ideal for utilities, industrial plants, renewable energy projects, and infrastructure networks, our power transformers are tested for electrical, mechanical, and thermal reliability to perform consistently under demanding operating conditions.",
    specs: [
      "Voltage class up to 220 kV",
      "Capacity up to 10 MVA",
      "ONAN / ONAF cooling",
      "Low loss CRGO / amorphous core",
      "IS 2026 / IEC compliant",
    ],
    images: [
      "assets/images/why-choose-us.png",
      "assets/images/why-choose-us.png",
    ],
  },

  "custom-transformer": {
    title: "Power Transformers",
    subtitle: "High Capacity Power Solutions",
    description:
      "High-capacity power transformers engineered as per IS 2026 for substations and industrial applications.",
    specs: [
      "Voltage class up to 220 kV",
      "Capacity up to 10 MVA",
      "ONAN / ONAF cooling",
      "Low loss CRGO / amorphous core",
      "IS 2026 / IEC compliant",
    ],
    images: [
      "assets/images/why-choose-us.png",
      "assets/images/why-choose-us.png",
    ],
  },
};

/* =========================================================
   LOAD PROJECT DETAILS (SAFE ON ALL PAGES)
========================================================= */
function loadProjectDetails() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  if (!projectId || !projectsData[projectId]) return;

  const project = projectsData[projectId];

  // Hero / Title
  const titleEl = document.getElementById("project-title");
  if (titleEl) titleEl.innerText = project.title;

  // Content section
  const subtitleEl = document.getElementById("project-subtitle");
  const descEl = document.getElementById("project-description");

  if (subtitleEl) subtitleEl.innerText = project.subtitle;
  if (descEl) descEl.innerText = project.description;

  // Images
  const img1 = document.getElementById("project-image-1");
  const img2 = document.getElementById("project-image-2");

  if (img1) img1.src = project.images[0];
  if (img2) img2.src = project.images[1];
}

/* =========================================================
   PROJECT LISTING DATA
========================================================= */
const projectListingData = [
  {
    title: "Civil & Construction",
    description:
      "Trends, technologies, and project insights from the civil engineering and construction sector. Explore topics covering infrastructure development, materials, structural systems, and modern construction practices.",
    image: "assets/images/product-1.png",
    alt: "Civil Section",
    id: "civil-construction",
  },
  {
    title: "LFA Transformers",
    description:
      "Low loss energy-efficient transformers designed as per Indian utility standards.",
    image: "assets/images/product-1.png",
    alt: "LFA Transformers",
    id: "lfa-transformer",
  },
  {
    title: "Power Transformers",
    description:
      "High-capacity transformers engineered for substations and industrial applications.",
    image: "assets/images/product-1.png",
    alt: "Power Transformers",
    id: "power-transformer",
  },
  {
    title: "Custom Transformers",
    description:
      "Custom-built transformers designed to meet specific load, rating, and site requirements.",
    image: "assets/images/product-1.png",
    alt: "Custom Transformers",
    id: "custom-transformer",
  },
];

/* =========================================================
   RENDER PROJECT LISTING (NO HTML STRINGS)
========================================================= */
function renderProjectListing() {
  const container = document.getElementById("projects-container");
  const template = document.getElementById("project-card-template");

  if (!container || !template) return;

  projectListingData.forEach((product) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".project-image").src = product.image;
    clone.querySelector(".project-image").alt = product.alt;
    clone.querySelector(".project-title").innerText = product.title;
    clone.querySelector(".project-description").innerText = product.description;
    clone.querySelector(".project-link").href =
      `projects-details.html?id=${product.id}`;

    container.appendChild(clone);
  });
}

/* =========================================================
   INIT
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderProjectListing();
});

/* ==============================================================================================
   TEAM SECTION DATA
================================================================================================= */

/* =========================================================
   TEAM SLIDER (SAFE INITIALIZATION)
========================================================= */
function initTeamSlider() {
  const track = document.querySelector(".team-track");
  const slides = document.querySelectorAll(".team-slide");
  const dots = document.querySelectorAll(".slider-indicator .dot");

  if (!track || !slides.length || !dots.length) return;

  let currentIndex = 0;

  function isMobile() {
    return window.innerWidth < 992;
  }

  function updateSlider(index) {
    if (!isMobile()) {
      track.style.transform = "none";
      return;
    }

    index = Math.max(0, Math.min(index, slides.length - 1));

    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");

    currentIndex = index;
  }

  // Dot clicks
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      updateSlider(parseInt(dot.dataset.index, 10));
    });
  });

  // Touch support
  let startX = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      updateSlider(currentIndex + 1);
    } else if (endX - startX > 50) {
      updateSlider(currentIndex - 1);
    }
  });

  // Recalculate on resize
  window.addEventListener("resize", () => {
    updateSlider(currentIndex);
  });

  // Init
  updateSlider(0);
}

/* =========================================================
   HERO SLIDER
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dots .dot");
  let current = 0;
  const interval = 5000;

  // Set background images
  slides.forEach((slide) => {
    const bg = slide.getAttribute("data-bg");
    slide.style.backgroundImage = `url(${bg})`;
  });

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
    current = index;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  let sliderInterval = setInterval(nextSlide, interval);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(sliderInterval);
      showSlide(index);
      sliderInterval = setInterval(nextSlide, interval);
    });
  });
  function animateCounter(el) {
    const target = el.getAttribute('data-target');
    const isNumeric = !isNaN(target);
    if (!isNumeric) return; // skip "Pan-India" text

    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out curve — fast start, slow finish
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * parseInt(target));

      el.textContent = current + (el.getAttribute('data-suffix') || '');

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // Trigger when stats bar scrolls into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number[data-target]').forEach(animateCounter);
        observer.unobserve(entry.target); // run only once
      }
    });
  }, { threshold: 0.3 });

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) observer.observe(statsBar);
});
