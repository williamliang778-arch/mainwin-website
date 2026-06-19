const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main > section[id]");

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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
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
