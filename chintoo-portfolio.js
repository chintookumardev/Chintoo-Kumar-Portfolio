// ==========================================
// CHINTOO KUMAR - PORTFOLIO JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ==========================================
  // ELEMENTS
  // ==========================================

  const header = document.getElementById("main-header");
  const contactForm = document.getElementById("contactForm");
  const heroButton = document.querySelector(".hero-text button");
  const cvButton = document.querySelector(".about-btn");
  const copyrightYear = document.getElementById("fy-year");

  // ==========================================
  // UTILITY
  // ==========================================

  const isInViewport = (element, offset = 0.9) => {
    if (!element) return false;

    const rect = element.getBoundingClientRect();

    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) *
          offset && rect.bottom >= 0
    );
  };

  // ==========================================
  // HEADER SCROLL EFFECT
  // ==========================================

  const handleHeaderScroll = () => {
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  // ==========================================
  // SCROLL ANIMATIONS
  // ==========================================

  const animatedElements = document.querySelectorAll(
    [
      ".hero-text",
      ".hero-image img",
      ".section-heading",
      ".project-card",
      ".about-image",
      ".about-text",
      ".contact-info",
      ".contact-form",
      ".footer-col",
    ].join(","),
  );

  const animateOnScroll = () => {
    animatedElements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("animate");
      }
    });
  };

  // ==========================================
  // SMOOTH SCROLL
  // ==========================================

  const scrollToSection = (target) => {
    if (!target) return;

    const headerHeight = header ? header.offsetHeight : 0;

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      scrollToSection(target);
    });
  });

  // ==========================================
  // HERO PROJECT BUTTON
  // ==========================================

  if (heroButton) {
    heroButton.addEventListener("click", () => {
      const projectsSection = document.getElementById("projects");

      scrollToSection(projectsSection);
    });
  }

  // ==========================================
  // PROJECT STATUS
  // ==========================================

  const projectCards = document.querySelectorAll("#projects .project-card");

  projectCards.forEach((card, index) => {
    const statusElement = card.querySelector(".project-status");

    if (!statusElement) return;

    // First project = completed
    if (index === 0) {
      statusElement.innerHTML = `
        <span class="status-dot completed"></span>
        Completed
      `;

      statusElement.classList.add("status-completed");
    } else {
      statusElement.innerHTML = `
        <span class="status-dot working"></span>
        Under Working
      `;

      statusElement.classList.add("status-working");
    }
  });

  // ==========================================
  // PROJECT CARD HOVER
  // ==========================================

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("project-hover");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("project-hover");
    });
  });

  // ==========================================
  // CONTACT FORM
  // ==========================================

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const subjectInput = document.getElementById("subject");
      const messageInput = document.getElementById("message");

      const name = nameInput?.value.trim() || "";
      const email = emailInput?.value.trim() || "";
      const subject = subjectInput?.value.trim() || "";
      const message = messageInput?.value.trim() || "";

      // Required fields
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Destination email
      const destinationEmail = "chintookumar.dev@gmail.com";

      const mailSubject = encodeURIComponent(subject);

      const mailBody = encodeURIComponent(
        `Name: ${name}

Email: ${email}

Message:
${message}`,
      );

      const mailtoURL =
        `mailto:${destinationEmail}` +
        `?subject=${mailSubject}` +
        `&body=${mailBody}`;

      window.location.href = mailtoURL;

      // Optional reset
      contactForm.reset();
    });
  }

  // ==========================================
  // CV DOWNLOAD
  // ==========================================

  if (cvButton) {
    cvButton.addEventListener("click", () => {
      cvButton.classList.add("downloading");

      setTimeout(() => {
        cvButton.classList.remove("downloading");
      }, 800);
    });
  }

  // ==========================================
  // COPYRIGHT YEAR
  // ==========================================

  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // ==========================================
  // IMAGE FALLBACK
  // ==========================================

  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    image.addEventListener("error", () => {
      if (image.dataset.fallbackApplied === "true") {
        return;
      }

      image.dataset.fallbackApplied = "true";

      image.src =
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="800"
            height="500"
            viewBox="0 0 800 500"
          >
            <rect width="800" height="500" fill="#181818"/>
            <text
              x="50%"
              y="50%"
              dominant-baseline="middle"
              text-anchor="middle"
              fill="#777"
              font-family="Arial"
              font-size="24"
            >
              Image unavailable
            </text>
          </svg>
        `);

      image.alt = "Image unavailable";
    });
  });

  // ==========================================
  // ACTIVE NAVIGATION
  // ==========================================

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav > a[href^="#"]');

  const updateActiveNavigation = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop =
        section.offsetTop - (header ? header.offsetHeight : 0) - 100;

      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const targetId = link.getAttribute("href")?.replace("#", "");

      link.classList.toggle("active", targetId === currentSection);
    });
  };

  // ==========================================
  // SCROLL HANDLER
  // ==========================================

  let ticking = false;

  const handleScroll = () => {
    if (ticking) return;

    window.requestAnimationFrame(() => {
      handleHeaderScroll();
      animateOnScroll();
      updateActiveNavigation();

      ticking = false;
    });

    ticking = true;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // ==========================================
  // RESIZE
  // ==========================================

  window.addEventListener("resize", () => {
    animateOnScroll();
    updateActiveNavigation();
  });

  // ==========================================
  // INITIALIZATION
  // ==========================================

  handleHeaderScroll();
  animateOnScroll();
  updateActiveNavigation();

  // ==========================================
  // CONSOLE
  // ==========================================

  console.log("Chintoo Kumar Portfolio Loaded Successfully.");
});
