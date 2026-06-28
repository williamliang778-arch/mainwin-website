const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main > section[id]");
const productMenu = document.querySelector("[data-product-menu]");
const productMenuTriggers = document.querySelectorAll("[data-product-menu-trigger]");
const productMenuCloseItems = document.querySelectorAll("[data-product-menu-close]");

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

const openProductMenu = () => {
  if (!productMenu) return;
  productMenu.classList.add("open");
  document.body.classList.add("product-menu-open");
};

const closeProductMenu = () => {
  if (!productMenu) return;
  productMenu.classList.remove("open");
  document.body.classList.remove("product-menu-open");
};

productMenuTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    openProductMenu();
  });
});

productMenuCloseItems.forEach((item) => {
  item.addEventListener("click", closeProductMenu);
});

if (productMenu) {
  productMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeProductMenu);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProductMenu();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeTarget = `#${entry.target.id}`;
      const hasMatchingNavItem = [...navItems].some((item) => item.getAttribute("href") === activeTarget);
      if (!hasMatchingNavItem) return;
      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === activeTarget);
      });
    });
  },
  { rootMargin: "-42% 0px -48% 0px", threshold: 0.01 }
);

sections.forEach((section) => observer.observe(section));

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const data = new FormData(contactForm);

    if (formStatus) {
      formStatus.textContent = "Sending your inquiry...";
      formStatus.className = "form-helper is-pending";
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send inquiry.");
      }

      contactForm.reset();

      if (formStatus) {
        formStatus.textContent = "Thank you. Your inquiry has been sent successfully.";
        formStatus.className = "form-helper is-success";
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent =
          "Sorry, the inquiry could not be sent. Please email william@szmainwin.com directly.";
        formStatus.className = "form-helper is-error";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Inquiry";
      }
    }
  });
}

const transistorSeries = {
  "3hx": [
    ["OR-3H4", "Commercial Grade", "AC input", "SSOP4", "4.4*2.6*2", "1.2", "80", "3750", "0.2", "20", "300", "-55 to +125", "assets/datasheets/or-3h4-commercial-grade.pdf"],
    ["OR-3H7", "Industrial Grade", "DC input", "SSOP4", "4-4*2.6*2", "1.2", "80", "3750", "0.2", "50", "600", "-55 to +125", "assets/datasheets/or-3h7-industrial-grade.pdf"],
    ["OR-3H7", "Commercial Grade", "DC input", "SSOP4", "4.4*2.6*2", "1.2", "80", "3750", "0.2", "50", "600", "-55 to +125", "assets/datasheets/or-3h7-commercial-grade.pdf"],
    ["OR-3H7", "Automotive Grade", "DC input", "SSOP4", "4-4*2.6*2", "1.2", "80", "3750", "0.2", "50", "600", "-55 to +125", "assets/datasheets/or-3h7-automotive-grade.pdf"],
    ["OR-3H4-4", "Industrial Grade", "AC input", "SSOP16", "10.3*4.4*2.0", "1.2", "80", "3750", "0.2", "20", "300", "-55 to +125", "assets/datasheets/or-3h4-4-datasheet.pdf"],
    ["OR-3H7-4", "Industrial Grade", "DC input", "SSOP16", "10.3*4.4*2.0", "1.2", "80", "3750", "0.2", "20", "300", "-55 to +125", "assets/datasheets/or-3h7-4-datasheet.pdf"],
  ],
  h11ax: [
    ["H11A1", "", "AC input", "DIP6", "7.14*6.5*3.5", "1.2", "80", "5000", "0.4", "20 min", "", "", ""],
    ["H11A2", "", "AC input", "DIP6", "7.14*6.5*3.5", "1.2", "80", "5000", "0.4", "10 min", "", "", ""],
    ["H11A3", "", "AC input", "DIP6", "7.14*6.5*3.5", "1.2", "80", "5000", "0.4", "50 min", "", "", ""],
    ["H11A4", "", "AC input", "DIP6", "7.14*6.5*3.5", "1.2", "80", "5000", "0.4", "100 min", "", "", ""],
  ],
  "8xx": [
    ["ORPC-814", "Commercial Grade", "AC input", "DIP4", "6.4*4.6*3.48", "1.2", "80", "5000", "0.2", "20", "300", "-55 to +110", "assets/datasheets/orpc-814-commercial-grade.pdf"],
    ["ORPC-814", "Industrial Grade", "AC input", "DIP4", "6.4*4.6*3.48", "1.2", "80", "5000", "0.2", "20", "300", "-55 to +125", "assets/datasheets/orpc-814-industrial-grade.pdf"],
    ["ORPC-827", "Industrial Grade", "AC input", "DIP8", "9.68*6.5*3.5", "1.2", "80", "5000", "0.4", "50", "600", "-55 to +115", "assets/datasheets/orpc-827-industrial-grade.pdf"],
    ["ORPC-844", "Industrial Grade", "AC input", "DIP16", "19.84*6.5*3.5", "1.2", "80", "5000", "0.2", "20", "300", "-55 to +110", "assets/datasheets/orpc-844-industrial-grade.pdf"],
    ["ORPC-824", "Industrial Grade", "DC input", "DIP8", "9.68*6.5*3.5", "1.2", "80", "5000", "0.4", "50", "600", "-55 to +115", "assets/datasheets/orpc-824-industrial-grade.pdf"],
    ["ORPC-847", "Industrial Grade", "DC input", "DIP16", "19.84*6.5*3.5", "1.2", "80", "5000", "0.2", "50", "600", "-55 to +110", "assets/datasheets/orpc-847-industrial-grade.pdf"],
    ["ORPC-817", "Commercial Grade", "DC input", "DIP4", "6.4*4.6*3.48", "1.2", "80", "5000", "0.2", "50", "600", "-55 to +110", "assets/datasheets/orpc-817-commercial-grade.pdf"],
    ["ORPC-817", "Industrial Grade", "DC input", "DIP4", "6.4*4.6*3.48", "1.2", "80", "5000", "0.2", "50", "600", "-55 to +125", "assets/datasheets/orpc-817-industrial-grade.pdf"],
    ["ORPC-851", "Industrial Grade", "DC input", "DIP4", "6.4*4.6*3.48", "1.2", "350", "5000", "0.2", "50", "600", "-55 to +110", "assets/datasheets/orpc-851-industrial-grade.pdf"],
  ],
  "35x": [
    ["OR-354", "Commercial Grade", "AC input", "SOP4", "4.4*3.85*2", "1.2", "80", "3750", "0.4", "20", "300", "-55 to +125", "assets/datasheets/or-354-commercial-grade.pdf"],
    ["OR-354", "Industrial Grade", "AC input", "SOP4", "4.4*3.85*2", "1.2", "80", "3750", "0.4", "20", "300", "-55 to +125", "assets/datasheets/or-354-industrial-grade.pdf"],
    ["OR-357", "Commercial Grade", "DC input", "SOP4", "4.4*3.85*2", "1.2", "80", "3750", "0.4", "50", "600", "-55 to +125", "assets/datasheets/or-357-commercial-grade.pdf"],
    ["OR-357", "Automotive Grade", "DC input", "SOP4", "4.4*3.85*2", "1.2", "80", "3750", "0.4", "50", "600", "-55 to +125", "assets/datasheets/or-357-automotive-grade.pdf"],
    ["OR-357", "Industrial Grade", "DC input", "SOP4", "4.4*3.85*2", "1.2", "80", "3750", "0.4", "50", "600", "-55 to +125", "assets/datasheets/or-357-industrial-grade.pdf"],
    ["OR-351", "Industrial Grade", "DC input", "SOP4", "4.4*3.85*2", "1.2", "350", "3750", "0.4", "50", "600", "-55 to +125", "assets/datasheets/or-351-industrial-grade.pdf"],
  ],
  d2x: [
    ["OR-D205", "", "DC input", "SOP8", "4.88*3.92*3.18", "1.2", "80", "3750", "0.4", "40", "80", "-55 to +110", ""],
    ["OR-D206", "", "DC input", "SOP8", "4.88*3.92*3.18", "1.2", "80", "3750", "0.4", "63", "125", "-55 to +110", ""],
    ["OR-D207", "", "DC input", "SOP8", "4.88*3.92*3.18", "1.2", "80", "3750", "0.4", "100", "200", "-55 to +110", ""],
    ["OR-D211", "", "DC input", "SOP8", "4.88*3.92*3.18", "1.2", "80", "3750", "0.4", "20 min", "", "-55 to +110", ""],
    ["OR-D213", "", "DC input", "SOP8", "4.88*3.92*3.18", "1.2", "80", "3750", "0.4", "100 min", "", "-55 to +110", ""],
    ["OR-D217", "", "DC input", "SOP8", "4.88*3.92*3.18", "1.2", "80", "3750", "0.4", "100 min", "", "-55 to +110", ""],
  ],
  "4nxx": [
    ["4N25", "", "DC input", "DIP6", "7.14*6.5*3.5", "1.2", "80", "5000", "0.5", "20 min", "", "-55 to +115", ""],
    ["4N27", "", "DC input", "DIP6", "7.14*6.5*3.5", "1.2", "80", "5000", "0.5", "10 min", "", "-55 to +115", ""],
    ["4N35", "", "DC input", "DIP6", "7.14*6.5*3.5", "1.2", "80", "5000", "0.3", "100 min", "", "-55 to +115", ""],
    ["4N38", "", "DC input", "DIP6", "7.14*6.5*3.5", "1.2", "80", "5000", "1", "20 min", "", "-55 to +115", ""],
  ],
  "10xx": [
    ["OR-1000", "Commercial Grade", "DC input", "LSOP4", "7.5*3.6*2.0", "1.2", "70", "5000", "0.3", "50", "600", "-55 to +125", "assets/datasheets/or-1000-commercial-grade.pdf"],
    ["OR-1000", "Industrial Grade", "DC input", "LSOP4", "7.5*3.6*2.0", "1.2", "70", "5000", "0.3", "50", "600", "-55 to +125", "assets/datasheets/or-1000-industrial-grade.pdf"],
    ["OR-1003", "Commercial Grade", "DC input", "LSOP4", "7.5*3.6*2.0", "1.2", "70", "5000", "0.3", "100", "200", "-55 to +125", "assets/datasheets/or-1000-commercial-grade.pdf"],
    ["OR-1007", "Commercial Grade", "DC input", "LSOP4", "7.5*3.6*2.0", "1.2", "70", "5000", "0.3", "80", "160", "-55 to +125", "assets/datasheets/or-1000-commercial-grade.pdf"],
    ["OR-1003", "Industrial Grade", "DC input", "LSOP4", "7.5*3.6*2.0", "1.2", "70", "5000", "0.3", "100", "200", "-55 to +125", "assets/datasheets/or-1000-industrial-grade.pdf"],
    ["OR-1007", "Industrial Grade", "DC input", "LSOP4", "7.5*3.6*2.0", "1.2", "70", "5000", "0.3", "80", "160", "-55 to +125", "assets/datasheets/or-1000-industrial-grade.pdf"],
    ["OR-1008", "Industrial Grade", "DC input", "LSOP4", "7.5*3.6*2.0", "1.2", "70", "5000", "0.3", "130", "260", "-55 to +125", "assets/datasheets/or-1000-industrial-grade.pdf"],
    ["OR-1008", "Commercial Grade", "DC input", "LSOP4", "7.5*3.6*2.0", "1.2", "70", "5000", "0.3", "130", "260", "-55 to +125", "assets/datasheets/or-1000-commercial-grade.pdf"],
    ["OR-1009", "Commercial Grade", "DC input", "LSOP4", "7.5*3.6*2.0", "1.2", "70", "5000", "0.3", "200", "400", "-55 to +125", "assets/datasheets/or-1000-commercial-grade.pdf"],
  ],
};

const darlingtonSeries = [
  ["OR-3H5", "", "DC input", "SSOP4", "4.4*2.6*2.0", "1.2", "35", "3750", "1", "600", "7500", "-55 to +100", ""],
  ["OR-3H5-4", "", "DC input", "SSOP16", "10.29*4.4*2", "1.2", "35", "3750", "1", "600", "7500", "-55 to +100", ""],
  ["OR-352", "", "DC input", "SOP4", "4.4*3.85*2.0", "1.2", "350", "3750", "1", "1000 min", "-", "-55 to +110", ""],
  ["OR-815", "", "DC input", "DIP4", "4.4*3.85*2.0", "1.2", "35", "5000", "1", "600", "7500", "-55 to +110", ""],
  ["OR-852", "", "DC input", "DIP4", "4.4*3.85*2.0", "1.2", "350", "5000", "1", "1000", "15000", "-55 to +110", ""],
  ["OR-845", "", "DC input", "DIP16", "19.84*6.5*3.5", "1.2", "40", "5000", "1", "600", "7500", "-55 to +110", ""],
  ["OR-825", "", "DC input", "DIP8", "9.68*6.5*3.5", "1.2", "40", "5000", "1", "600", "7500", "-55 to +110", ""],
  ["OR-4N29", "", "DC input", "DIP6", "7.14*6.5*3.5", "1.2", "55", "5000", "1", "100 min", "-", "-55 to +115", ""],
  ["OR-355", "", "DC input", "SOP4", "4.4*3.85*2.0", "1.2", "35", "3750", "1", "600", "7500", "-55 to +110", ""],
  ["OR-4N30", "", "DC input", "DIP6", "7.14*6.5*3.5", "1.2", "55", "5000", "1", "100 min", "-", "-55 to +115", ""],
  ["OR-4N31", "", "DC input", "DIP6", "7.14*6.5*3.5", "1.2", "55", "5000", "1.2", "50 min", "-", "-55 to +115", ""],
  ["OR-4N32", "", "DC input", "DIP6", "7.14*6.5*3.5", "1.2", "55", "5000", "1", "500 min", "-", "-55 to +115", ""],
  ["OR-4N33", "", "DC input", "DIP6", "7.14*6.5*3.5", "1.2", "55", "5000", "1", "500 min", "-", "-55 to +115", ""],
];

const highSpeedSeries = {
  "6n13x": [
    ["OR-6N135", "DIP8", "9.68*6.5*3.5", "30 max", "2000/2000", "5000", "1", "8", "7", "50", "-40 to +110", ""],
    ["OR-6N136", "DIP8", "9.68*6.5*3.5", "30 max", "1000/1000", "5000", "1", "8", "19", "50", "-40 to +110", ""],
    ["OR-6N137", "DIP8", "9.68*6.5*3.5", "7 max", "75/75", "5000", "-", "50 max", "-", "-", "-40 to +110", ""],
    ["OR-6N138", "DIP8", "9.68*6.5*3.5", "7 max", "15000/50000", "5000", "1", "60 max", "300 min", "-", "-40 to +85", ""],
    ["OR-6N139", "DIP8", "9.68*6.5*3.5", "18 max", "30000/90000", "5000", "1", "60 max", "300 min", "-", "-40 to +85", ""],
  ],
  "25xx26xx": [
    ["OR-2530", "DIP8", "9.68*6.5*3.5", "30 max", "2000/2000", "5000", "1", "25 max", "7", "50", "-40 to +100", ""],
    ["OR-2531", "DIP8", "9.68*6.5*3.5", "30 max", "1000/1000", "5000", "1", "25 max", "19", "50", "-40 to +100", ""],
    ["OR-2630", "DIP8", "9.68*6.5*3.5", "7 max", "100/100", "5000", "5", "50 max", "-", "-", "-40 to +100", ""],
    ["OR-2631", "DIP8", "9.68*6.5*3.5", "7 max", "100/100", "5000", "10", "50 max", "-", "-", "-40 to +100", ""],
  ],
  "0xxx": [
    ["OR-0452", "SO8", "4.88*3.92*3.18", "30 max", "1000/1000", "3750", "1 min", "8", "19", "50", "-55 to +100", ""],
    ["OR-0500", "SO8", "4.88*3.92*3.18", "30 max", "2000/2000", "3750", "1 min", "8", "7", "50", "-55 to +100", ""],
    ["OR-0501", "SO8", "4.88*3.92*3.18", "30 max", "1000/1000", "3750", "1 min", "8", "19", "50", "-55 to +100", ""],
    ["OR-0453", "SO8", "4.88*3.92*3.18", "30 max", "1000/1000", "3750", "15", "8", "19", "50", "-55 to +100", ""],
    ["OR-0530", "SO8", "4.88*3.92*3.18", "30 max", "2000/2000", "3750", "1 min", "8", "7", "50", "-55 to +100", ""],
    ["OR-0531", "SO8", "4.88*3.92*3.18", "30 max", "1000/1000", "3750", "1 min", "8", "19", "50", "-55 to +100", ""],
    ["OR-0600", "SO8", "4.88*3.92*3.18", "30 max", "75/75", "3750", "-", "50 max", "-", "-", "-40 to +85", ""],
    ["OR-0601", "SO8", "4.88*3.92*3.18", "30 max", "75/75", "3750", "5", "50 max", "-", "-", "-40 to +85", ""],
  ],
  "x0l-x01": [
    ["OR-60L", "LSO6", "6.81*4.5*3.18", "7 max", "75/90", "5000", "10", "50 max", "5 min", "-", "-40 to +105", ""],
    ["OR-50L", "LSO6", "6.81*4.5*3.18", "30 max", "800/800", "5000", "15", "16 max", "15 min", "-", "-40 to +105", ""],
    ["OR-M501", "SOP5", "4.4*3.85*2.0", "30V", "800/800", "3750", "15 min", "8", "20", "50", "-55 to +100", ""],
    ["OR-M601", "SOP5", "4.4*3.85*2.0", "7V", "90/75", "3750", "10 min", "50", "-", "-", "-55 to +85", ""],
    ["OR-M611", "SOP5", "4.4*3.85*2.0", "7V", "90/75", "3750", "10 min", "50", "-", "-", "-55 to +85", ""],
  ],
  "or-h61l": [
    ["OR-H61L", "LSO8", "13.6*6.248*3.607", "7 max", "1000/100", "7500", "20", "10 max", "-", "-", "-40 to +105", ""],
  ],
};

const triacSeries = {
  moc30xx: [
    ["OR-MOC3021", "DIP6", "7.14*6.5*3.5", "2.5", "-", "400", "5000", "1.2", "15", "-55 to +125", "-40 to +110", ""],
    ["OR-MOC3022", "DIP6", "7.14*6.5*3.5", "2.5", "-", "400", "5000", "1.2", "10", "-55 to +125", "-40 to +110", ""],
    ["OR-MOC3023", "DIP6", "7.14*6.5*3.5", "2.5", "-", "400", "5000", "1.2", "5", "-55 to +125", "-40 to +110", ""],
    ["OR-MOC3051", "DIP6", "7.14*6.5*3.5", "2.5", "-", "600", "5000", "1.2", "15", "-55 to +125", "-40 to +110", ""],
    ["OR-MOC3052", "DIP6", "7.14*6.5*3.5", "2.5", "-", "600", "5000", "1.2", "10", "-55 to +125", "-40 to +110", ""],
    ["OR-MOC3053", "DIP6", "7.14*6.5*3.5", "2.5", "-", "600", "5000", "1.2", "5", "-55 to +125", "-40 to +110", ""],
    ["OR-MOC3041", "DIP6", "7.14*6.5*3.5", "2.5", "-", "400", "5000", "1.2", "15", "-55 to +125", "-40 to +110", ""],
    ["OR-MOC3042", "DIP6", "7.14*6.5*3.5", "2.5", "-", "400", "5000", "1.2", "10", "-55 to +125", "-40 to +110", ""],
    ["OR-MOC3043", "DIP6", "7.14*6.5*3.5", "2.5", "-", "400", "5000", "1.2", "5", "-55 to +125", "-40 to +110", ""],
    ["OR-MOC3063", "DIP6", "7.14*6.5*3.5", "2.5", "-", "600", "5000", "1.2", "5", "-55 to +125", "-40 to +110", "assets/datasheets/or-moc3063-datasheet.pdf"],
    ["OR-MOC3062", "DIP6", "7.14*6.5*3.5", "2.5", "-", "600", "5000", "1.2", "10", "-55 to +125", "-40 to +110", ""],
    ["OR-MOC3061", "DIP6", "7.14*6.5*3.5", "2.5", "-", "600", "5000", "1.2", "10", "-55 to +125", "-40 to +110", ""],
    ["OR-MOC3081", "DIP6", "7.14*6.5*3.5", "2.5", "-", "800", "5000", "1.2", "15", "-55 to +125", "-40 to +110", ""],
    ["OR-MOC3082", "DIP6", "7.14*6.5*3.5", "2.5", "-", "800", "5000", "1.2", "10", "-55 to +125", "-40 to +110", ""],
    ["OR-MOC3083", "DIP6", "7.14*6.5*3.5", "2.5", "-", "800", "5000", "1.2", "5", "-55 to +125", "-40 to +110", ""],
  ],
  m30xx: [
    ["OR-M3022", "SOP4-DC", "4.4*2.6*2", "2.5", "-", "400", "3750", "1.2", "10", "-55 to +125", "-40 to +110", ""],
    ["OR-M3023", "SOP4-DC", "4.4*2.6*2", "2.5", "-", "400", "3750", "1.2", "5", "-55 to +125", "-40 to +110", ""],
    ["OR-M3024", "SOP4-DC", "4.4*2.6*2", "2.5", "-", "400", "3750", "1.2", "3", "-55 to +125", "-40 to +110", ""],
    ["OR-M3052", "SOP4-DC", "4.4*2.6*2", "2.5", "-", "600", "3750", "1.2", "10", "-55 to +125", "-40 to +110", ""],
    ["OR-M3053", "SOP4-DC", "4.4*2.6*2", "2.5", "-", "600", "3750", "1.2", "5", "-55 to +125", "-40 to +110", ""],
    ["OR-M3054", "SOP4-DC", "4.4*2.6*2", "2.5", "-", "600", "3750", "1.2", "3", "-55 to +125", "-40 to +110", ""],
    ["OR-M3042", "SOP4-DC", "4.4*2.6*2", "2.5", "-", "400", "3750", "1.2", "10", "-55 to +125", "-40 to +110", ""],
    ["OR-M3043", "SOP4-DC", "4.4*2.6*2", "2.5", "-", "400", "3750", "1.2", "5", "-55 to +125", "-40 to +110", ""],
    ["OR-M3044", "SOP4-DC", "4.4*2.6*2", "2.5", "-", "400", "3750", "1.2", "3", "-55 to +125", "-40 to +110", ""],
    ["OR-M3062", "SOP4-DC", "4.4*2.6*2", "3", "20", "600", "3750", "1.5", "10", "-", "-40 to +110", ""],
    ["OR-M3063", "SOP4-DC", "4.4*2.6*2", "3", "20", "600", "3750", "1.5", "5", "-", "-40 to +110", ""],
    ["OR-M3064", "SOP4-DC", "4.4*2.6*2", "3", "20", "600", "3750", "1.5", "3", "-", "-40 to +110", ""],
    ["OR-M3082", "SOP4-DC", "4.4*2.6*2", "3", "20", "800", "3750", "1.5", "10", "-", "-40 to +110", ""],
    ["OR-M3083", "SOP4-DC", "4.4*2.6*2", "3", "20", "800", "3750", "1.5", "5", "-", "-40 to +110", ""],
    ["OR-M3084", "SOP4-DC", "4.4*2.6*2", "3", "20", "800", "3750", "1.5", "3", "-", "-40 to +110", ""],
  ],
  "x233-x213": [
    ["OR-0223", "DIP7", "9.68*6.5*3.5", "2.5", "-", "600", "5000", "3", "10", "0.3", "-55 to +85", ""],
    ["OR-1223", "DIP7", "9.68*6.5*3.5", "2.5", "-", "600", "5000", "6", "10", "0.6", "-55 to +85", ""],
    ["OR-2223", "DIP7", "9.68*6.5*3.5", "2.5", "-", "600", "5000", "9", "10", "0.9", "-55 to +85", ""],
    ["OR-3223", "DIP7", "9.68*6.5*3.5", "2.5", "-", "600", "5000", "12", "10", "1.2", "-55 to +85", ""],
    ["OR-0213", "DIP7", "9.68*6.5*3.5", "2.5", "-", "600", "5000", "3", "10", "0.3", "-55 to +85", ""],
    ["OR-1213", "DIP7", "9.68*6.5*3.5", "2.5", "-", "600", "5000", "6", "10", "0.6", "-55 to +85", ""],
    ["OR-2213", "DIP7", "9.68*6.5*3.5", "2.5", "-", "600", "5000", "9", "10", "0.9", "-55 to +85", ""],
    ["OR-3213", "DIP7", "9.68*6.5*3.5", "2.5", "-", "600", "5000", "12", "10", "1.2", "-55 to +85", ""],
  ],
  t30xx: [
    ["OR-T3021", "DIP4", "6.4*4.6*3.5", "2.5", "-", "400", "5000", "1.5", "15", "-", "-40 to +110", ""],
    ["OR-T3022", "DIP4", "6.4*4.6*3.5", "2.5", "-", "400", "5000", "1.5", "10", "-", "-40 to +110", ""],
    ["OR-T3023", "DIP4", "6.4*4.6*3.5", "2.5", "-", "400", "5000", "1.5", "5", "-", "-40 to +110", ""],
    ["OR-T3051", "DIP4", "6.4*4.6*3.5", "2.5", "-", "600", "5000", "1.5", "15", "-", "-40 to +110", ""],
    ["OR-T3052", "DIP4", "6.4*4.6*3.5", "2.5", "-", "600", "5000", "1.5", "10", "-", "-40 to +110", ""],
    ["OR-T3053", "DIP4", "6.4*4.6*3.5", "2.5", "-", "600", "5000", "1.5", "5", "-", "-40 to +110", ""],
    ["OR-T3041", "DIP4", "6.4*4.6*3.5", "3", "20", "400", "5000", "1.5", "15", "-", "-40 to +110", ""],
    ["OR-T3042", "DIP4", "6.4*4.6*3.5", "3", "20", "400", "5000", "1.5", "10", "-", "-40 to +110", ""],
    ["OR-T3043", "DIP4", "6.4*4.6*3.5", "3", "20", "400", "5000", "1.5", "5", "-", "-40 to +110", ""],
    ["OR-T3061", "DIP4", "6.4*4.6*3.5", "3", "20", "600", "5000", "1.5", "15", "-", "-40 to +110", ""],
    ["OR-T3062", "DIP4", "6.4*4.6*3.5", "3", "20", "600", "5000", "1.5", "10", "-", "-40 to +110", ""],
    ["OR-T3063", "DIP4", "6.4*4.6*3.5", "3", "20", "600", "5000", "1.5", "5", "-", "-40 to +110", ""],
    ["OR-T3081", "DIP4", "6.4*4.6*3.5", "3", "20", "800", "5000", "1.5", "15", "-", "-40 to +110", ""],
    ["OR-T3082", "DIP4", "6.4*4.6*3.5", "3", "20", "800", "5000", "1.5", "10", "-", "-40 to +110", ""],
    ["OR-T3083", "DIP4", "6.4*4.6*3.5", "3", "20", "800", "5000", "1.5", "5", "-", "-40 to +110", ""],
  ],
};

const singleChannelOutput = "Single-channel output / Normally Open 1 Form A";
const dualChannelOutput = "Dual-channel output / Normally Open 2 Form A";

const ssrSeries = {
  "4xx": [
    ["OR-406A", "DIP4", "6.4*4.6*3.5", "5000", "60", "550", singleChannelOutput, "-40 to +125", "0.75", "5", "-40 to +85", ""],
    ["OR-425A", "DIP4", "6.4*4.6*3.5", "5000", "250", "180", singleChannelOutput, "-40 to +125", "6.5", "5", "-40 to +85", ""],
    ["OR-440A", "DIP4", "6.4*4.6*3.5", "5000", "400", "120", singleChannelOutput, "-40 to +125", "20", "5", "-40 to +85", ""],
    ["OR-460A", "DIP4", "6.4*4.6*3.5", "5000", "600", "50", singleChannelOutput, "-40 to +125", "40", "5", "-40 to +85", ""],
  ],
  m4x0a: [
    ["OR-M425A", "SOP4", "4.4*3.85*2", "3750", "250", "180", singleChannelOutput, "-40 to +125", "9", "3", "-40 to +85", ""],
    ["OR-M406A", "SOP4", "4.4*3.85*2", "3750", "60", "550", singleChannelOutput, "-40 to +125", "2", "3", "-40 to +85", ""],
    ["OR-M440A", "SOP4", "4.4*3.85*2", "3750", "400", "120", singleChannelOutput, "-40 to +125", "20", "5", "-40 to +85", ""],
    ["OR-M460A", "SOP4", "4.4*3.85*2", "3750", "600", "50", singleChannelOutput, "-40 to +125", "40", "5", "-40 to +85", ""],
  ],
  "6xxa": [
    ["OR-606A", "DIP6", "7.14*6.5", "5000", "60", "550", singleChannelOutput, "-40 to +125", "0.75", "3", "-40 to +85", ""],
    ["OR-625A", "DIP6", "7.14*6.5", "5000", "250", "180", singleChannelOutput, "-40 to +125", "6.5", "3", "-40 to +85", ""],
    ["OR-640A", "DIP6", "7.14*6.5", "5000", "400", "120", singleChannelOutput, "-40 to +125", "20", "3", "-40 to +85", ""],
    ["OR-660A", "DIP6", "7.14*6.5", "5000", "600", "50", singleChannelOutput, "-40 to +125", "40", "3", "-40 to +85", ""],
  ],
  "5211": [
    ["OR-5211", "LDIP-6", "9.68*6.5*3.5", "5000", "600", "120", singleChannelOutput, "-", "-", "-", "-40 to +85", ""],
  ],
  "601jx": [
    ["OR-601JX", "SO-16", "10.37*8.76*3.5", "5000", "1500", "20", singleChannelOutput, "-55 to +150", "50", "3", "-40 to +125", ""],
  ],
  "8xxa": [
    ["OR-806A", "DIP6", "7.14*6.5", "5000", "60", "500", dualChannelOutput, "-40 to +125", "0.75", "5", "-40 to +85", ""],
    ["OR-825A", "DIP6", "7.14*6.5", "5000", "250", "180", dualChannelOutput, "-40 to +125", "6.5", "5", "-40 to +85", ""],
    ["OR-840A", "DIP6", "7.14*6.5", "5000", "400", "120", dualChannelOutput, "-40 to +125", "20", "5", "-40 to +85", ""],
    ["OR-860A", "DIP6", "7.14*6.5", "5000", "600", "50", dualChannelOutput, "-40 to +125", "40", "5", "-40 to +85", ""],
  ],
  aqv25x: [
    ["OR-AQV258", "DIP6", "7.14*6.5", "5000", "1500", "40", singleChannelOutput, "-40 to +125", "5", "5", "-40 to +110", ""],
  ],
};

const igbtSeries = [
  ["OR-3120", "DIP8", "9-68*6.5*3.5", "2 min", "-2 min", "5000", "20", "5", "300 max", "300 max", "-40 to +110", "assets/datasheets/or-3120-datasheet.pdf"],
  ["OR-3150", "DIP8", "9-68*6.5*3.5", "1 min", "-1 min", "5000", "35", "5", "200 max", "200 max", "-40 to +110", ""],
  ["OR-T350", "DIP8", "9-68*6.5*3.5", "2", "-2", "3750", "15", "5", "500 max", "500 max", "-40 to +110", ""],
  ["OR-314", "LSO6", "6.81*4.5*3.18", "0.6", "0.4", "3750", "20", "3", "200 max", "200 max", "-40 to +105", ""],
  ["OR-341", "LSO6", "6.81*4.5*3.18", "3", "2.5", "3750", "20", "3", "200 max", "200 max", "-40 to +105", ""],
  ["OR-343", "LSO6", "6.81*4.5*3.18", "4", "3", "3750", "20", "3", "200 max", "200 max", "-40 to +105", ""],
  ["OR-152", "SO-5", "4.4*2.54*2.00", "2", "-2", "3750", "20", "3", "150 max", "150 max", "-40 to +100", ""],
  ["OR-155E", "SO-5", "4.4*2.54*2.00", "3", "-3", "3750", "35", "5", "200 max", "200 max", "-40 to +105", ""],
  ["OR-250", "SOP8", "9.68*6.5*3.48", "1", "-1", "2500", "15", "5", "500 max", "500 max", "-20 to +85", ""],
];

const schmittSeries = [
  ["OR-H11L1", "DIP6", "7.14*6.5*3.5", "3-15", "5000", "1.6", "50 max", "5", "0.1", "0.1", "-40 to +85", "assets/datasheets/or-h11l1-datasheet.pdf"],
];

const ipmSeries = [
  ["OR-480", "SO6", "6.81*4.5*3.18", "5000", "25 min", "-25 max", "20", "5.5", "350 max", "350 max", "-40 to +100", "assets/datasheets/or-480-datasheet.pdf"],
];

const photovoltaicSeries = [
  ["OR357PVG", "SOP4", "4.4*3.85*2.2", "3750", "0.8", "0.6", "7", "7", "0.05", "0.02", "-40 to +100", "assets/datasheets/or-357pvg-datasheet.pdf"],
];

const seriesTableBody = document.querySelector("[data-series-table-body]");
const seriesTabs = document.querySelectorAll("[data-series-tab]");
const darlingtonTableBody = document.querySelector("[data-darlington-table-body]");
const highSpeedTableBody = document.querySelector("[data-high-speed-table-body]");
const highSpeedTabs = document.querySelectorAll("[data-high-speed-tab]");
const triacTableBody = document.querySelector("[data-triac-table-body]");
const triacTabs = document.querySelectorAll("[data-triac-tab]");
const ssrTableBody = document.querySelector("[data-ssr-table-body]");
const ssrTabs = document.querySelectorAll("[data-ssr-tab]");
const igbtTableBody = document.querySelector("[data-igbt-table-body]");
const schmittTableBody = document.querySelector("[data-schmitt-table-body]");
const ipmTableBody = document.querySelector("[data-ipm-table-body]");
const photovoltaicTableBody = document.querySelector("[data-photovoltaic-table-body]");
const productFamilyTabs = document.querySelectorAll("[data-family-tab]");
const productFamilySections = document.querySelectorAll("[data-family-section]");

const buildDownloadCell = (download) =>
  download ? `<a href="${download}" download>PDF</a>` : `<button type="button" disabled>Pending</button>`;

const displayProductModel = (model) => (model ? `${model}OV` : "-");

const renderSeriesTable = (seriesKey) => {
  if (!seriesTableBody || !transistorSeries[seriesKey]) return;

  seriesTableBody.innerHTML = transistorSeries[seriesKey]
    .map(([model, grade, input, pkg, size, vf, veco, isolation, saturation, ctrMin, ctrMax, temp, download]) => {
      return `
        <tr>
          <td><strong>${displayProductModel(model)}</strong>${grade ? `<small>${grade}</small>` : ""}</td>
          <td>${input || "-"}</td>
          <td>${pkg || "-"}</td>
          <td>${size || "-"}</td>
          <td>${vf || "-"}</td>
          <td>${veco || "-"}</td>
          <td>${isolation || "-"}</td>
          <td>${saturation || "-"}</td>
          <td>${ctrMin || "-"}</td>
          <td>${ctrMax || "-"}</td>
          <td>${temp || "-"}</td>
          <td>${buildDownloadCell(download)}</td>
        </tr>
      `;
    })
    .join("");
};

const renderOptocouplerTable = (tableBody, rows) => {
  if (!tableBody || !rows) return;

  tableBody.innerHTML = rows
    .map(([model, grade, input, pkg, size, vf, veco, isolation, saturation, ctrMin, ctrMax, temp, download]) => `
      <tr>
        <td><strong>${displayProductModel(model)}</strong>${grade ? `<small>${grade}</small>` : ""}</td>
        <td>${input || "-"}</td>
        <td>${pkg || "-"}</td>
        <td>${size || "-"}</td>
        <td>${vf || "-"}</td>
        <td>${veco || "-"}</td>
        <td>${isolation || "-"}</td>
        <td>${saturation || "-"}</td>
        <td>${ctrMin || "-"}</td>
        <td>${ctrMax || "-"}</td>
        <td>${temp || "-"}</td>
        <td>${buildDownloadCell(download)}</td>
      </tr>
    `)
    .join("");
};

const renderHighSpeedTable = (seriesKey) => {
  if (!highSpeedTableBody || !highSpeedSeries[seriesKey]) return;

  highSpeedTableBody.innerHTML = highSpeedSeries[seriesKey]
    .map(([model, pkg, size, supply, tphl, isolation, cmr, collector, ctrMin, ctrMax, temp, download]) => `
      <tr>
        <td><strong>${displayProductModel(model)}</strong></td>
        <td>${pkg || "-"}</td>
        <td>${size || "-"}</td>
        <td>${supply || "-"}</td>
        <td>${tphl || "-"}</td>
        <td>${isolation || "-"}</td>
        <td>${cmr || "-"}</td>
        <td>${collector || "-"}</td>
        <td>${ctrMin || "-"}</td>
        <td>${ctrMax || "-"}</td>
        <td>${temp || "-"}</td>
        <td>${buildDownloadCell(download)}</td>
      </tr>
    `)
    .join("");
};

const renderTriacTable = (seriesKey) => {
  if (!triacTableBody || !triacSeries[seriesKey]) return;

  triacTableBody.innerHTML = triacSeries[seriesKey]
    .map(([model, pkg, size, vtm, vinh, vdrm, isolation, inputOrItsm, trigger, rmsOrStorage, temp, download]) => `
      <tr>
        <td><strong>${displayProductModel(model)}</strong></td>
        <td>${pkg || "-"}</td>
        <td>${size || "-"}</td>
        <td>${vtm || "-"}</td>
        <td>${vinh || "-"}</td>
        <td>${vdrm || "-"}</td>
        <td>${isolation || "-"}</td>
        <td>${inputOrItsm || "-"}</td>
        <td>${trigger || "-"}</td>
        <td>${rmsOrStorage || "-"}</td>
        <td>${temp || "-"}</td>
        <td>${buildDownloadCell(download)}</td>
      </tr>
    `)
    .join("");
};

const renderSsrTable = (seriesKey) => {
  if (!ssrTableBody || !ssrSeries[seriesKey]) return;

  ssrTableBody.innerHTML = ssrSeries[seriesKey]
    .map(([model, pkg, size, isolation, loadVoltage, loadCurrent, output, storageTemp, ron, ifon, temp, download]) => `
      <tr>
        <td><strong>${displayProductModel(model)}</strong></td>
        <td>${pkg || "-"}</td>
        <td>${size || "-"}</td>
        <td>${isolation || "-"}</td>
        <td>${loadVoltage || "-"}</td>
        <td>${loadCurrent || "-"}</td>
        <td>${output || "-"}</td>
        <td>${storageTemp || "-"}</td>
        <td>${ron || "-"}</td>
        <td>${ifon || "-"}</td>
        <td>${temp || "-"}</td>
        <td>${buildDownloadCell(download)}</td>
      </tr>
    `)
    .join("");
};

const renderSimpleSpecTable = (tableBody, rows) => {
  if (!tableBody || !rows) return;

  tableBody.innerHTML = rows
    .map((row) => {
      const download = row[row.length - 1];
      const cells = row
        .slice(0, -1)
        .map((value, index) => `<td>${index === 0 ? `<strong>${displayProductModel(value)}</strong>` : value || "-"}</td>`)
        .join("");
      return `<tr>${cells}<td>${buildDownloadCell(download)}</td></tr>`;
    })
    .join("");
};

const showProductFamily = (familyKey, updateHash = true) => {
  if (!productFamilySections.length) return;

  const sectionKeys = [...productFamilySections].map((section) => section.dataset.familySection);
  const activeKey = sectionKeys.includes(familyKey) ? familyKey : "transistor";

  productFamilySections.forEach((section) => {
    section.hidden = section.dataset.familySection !== activeKey;
  });

  productFamilyTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.familyTab === activeKey);
  });

  if (updateHash) {
    history.replaceState(null, "", `#${activeKey}`);
  }
};

productFamilyTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    showProductFamily(tab.dataset.familyTab);
  });
});

if (productFamilySections.length) {
  showProductFamily(window.location.hash.replace("#", "") || "transistor", false);

  window.addEventListener("hashchange", () => {
    showProductFamily(window.location.hash.replace("#", "") || "transistor", false);
  });
}

seriesTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const seriesKey = tab.dataset.seriesTab;
    seriesTabs.forEach((item) => item.classList.toggle("active", item === tab));
    renderSeriesTable(seriesKey);
  });
});

renderSeriesTable("3hx");

renderOptocouplerTable(darlingtonTableBody, darlingtonSeries);

highSpeedTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const seriesKey = tab.dataset.highSpeedTab;
    highSpeedTabs.forEach((item) => item.classList.toggle("active", item === tab));
    renderHighSpeedTable(seriesKey);
  });
});

renderHighSpeedTable("6n13x");

triacTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const seriesKey = tab.dataset.triacTab;
    triacTabs.forEach((item) => item.classList.toggle("active", item === tab));
    renderTriacTable(seriesKey);
  });
});

renderTriacTable("moc30xx");

ssrTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const seriesKey = tab.dataset.ssrTab;
    ssrTabs.forEach((item) => item.classList.toggle("active", item === tab));
    renderSsrTable(seriesKey);
  });
});

renderSsrTable("4xx");

renderSimpleSpecTable(igbtTableBody, igbtSeries);
renderSimpleSpecTable(schmittTableBody, schmittSeries);
renderSimpleSpecTable(ipmTableBody, ipmSeries);
renderSimpleSpecTable(photovoltaicTableBody, photovoltaicSeries);
