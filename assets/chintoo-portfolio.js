// ==========================================
// CHINTOO KUMAR - PORTFOLIO JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. VIEWPORT CHECK
    // ==========================================

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();

        return (
            rect.top <=
                (window.innerHeight ||
                    document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }


    // ==========================================
    // 2. SCROLL ANIMATIONS
    // ==========================================

    function handleScrollAnimations() {

        const elementsToAnimate = document.querySelectorAll(
            ".hero-text, " +
            ".hero img, " +
            ".section-heading, " +
            ".project-card, " +
            ".about-image, " +
            ".about-text, " +
            ".contact-info, " +
            ".contact-form, " +
            ".footer-col"
        );

        elementsToAnimate.forEach(function (element) {

            if (isInViewport(element)) {
                element.classList.add("animate");
            }

        });
    }


    // ==========================================
    // 3. HEADER SCROLL EFFECT
    // ==========================================

    function handleHeaderScroll() {

        const header =
            document.getElementById("main-header");

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }


    // ==========================================
    // 4. SMOOTH SCROLLING
    // ==========================================

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (anchor) {

            anchor.addEventListener("click", function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#" ||
                    targetId === ""
                ) {
                    return;
                }

                const targetElement =
                    document.querySelector(targetId);

                if (targetElement) {

                    event.preventDefault();

                    const header =
                        document.getElementById("main-header");

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        targetElement.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight -
                        20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                }
            });
        });


    // ==========================================
    // 5. HERO - VIEW PROJECTS BUTTON
    // ==========================================

    const projectButton =
        document.querySelector(".hero-text button");

    if (projectButton) {

        projectButton.addEventListener(
            "click",
            function () {

                const projects =
                    document.getElementById("projects");

                if (!projects) return;

                const header =
                    document.getElementById("main-header");

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    projects.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        );
    }


    // ==========================================
    // 6. PROJECT CARD EFFECT
    // ==========================================

    const projectCards =
        document.querySelectorAll(".project-card");

    projectCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            this.classList.add("hovered");
        });

        card.addEventListener("mouseleave", function () {
            this.classList.remove("hovered");
        });
    });


    // ==========================================
    // 7. CONTACT FORM
    // ==========================================

    const contactForm =
        document.querySelector("#contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const name =
                    document.getElementById("name")?.value.trim();

                const email =
                    document.getElementById("email")?.value.trim();

                const subject =
                    document.getElementById("subject")?.value.trim();

                const message =
                    document.getElementById("message")?.value.trim();


                if (!name || !email || !subject || !message) {

                    alert("Please fill in all fields.");

                    return;
                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email)) {

                    alert("Please enter a valid email address.");

                    return;
                }


                // Visitor's email application

                const yourEmail =
                    "chintookumar.dev@gmail.com";

                const mailSubject =
                    encodeURIComponent(subject);

                const mailBody =
                    encodeURIComponent(
                        "Name: " +
                        name +
                        "\n\n" +
                        "Email: " +
                        email +
                        "\n\n" +
                        "Message:\n" +
                        message
                    );

                const mailtoLink =
                    "mailto:" +
                    yourEmail +
                    "?subject=" +
                    mailSubject +
                    "&body=" +
                    mailBody;

                window.location.href = mailtoLink;
            }
        );
    }


    // ==========================================
    // 8. DOWNLOAD CV
    // ==========================================

    const cvButton =
        document.querySelector(".about-btn");

    if (cvButton) {

        cvButton.addEventListener(
            "click",
            function () {

                const cvPath =
                    "./assets/Chintoo-Kumar-CV.pdf";

                const link =
                    document.createElement("a");

                link.href = cvPath;
                link.download = "Chintoo-Kumar-CV.pdf";

                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);
            }
        );
    }


    // ==========================================
    // 9. FINANCIAL YEAR
    // ==========================================

    function updateFinancialYear() {

        const today = new Date();

        const currentYear =
            today.getFullYear();

        const currentMonth =
            today.getMonth();

        /*
            Indian Financial Year:
            April 1 - March 31

            Example:
            April 2026 - March 2027
            = FY 2026-27
        */

        const financialYearStart =
            currentMonth >= 3
                ? currentYear
                : currentYear - 1;

        const financialYearEnd =
            financialYearStart + 1;

        const financialYearText =
            financialYearStart +
            "-" +
            String(financialYearEnd).slice(-2);


        document
            .querySelectorAll("[data-financial-year]")
            .forEach(function (element) {

                element.textContent =
                    financialYearText;
            });


        const copyright =
            document.querySelector(".copyright p");

        if (copyright) {

            copyright.innerHTML =
                "&copy; " +
                financialYearText +
                " Chintoo Kumar. All rights reserved.";
        }
    }


    // ==========================================
    // 10. CURRENT YEAR
    // ==========================================

    function updateCurrentYear() {

        const currentYear =
            new Date().getFullYear();

        document
            .querySelectorAll("[data-current-year]")
            .forEach(function (element) {

                element.textContent =
                    currentYear;
            });
    }


    // ==========================================
    // 11. NEWSLETTER
    // ==========================================

    const newsletterForm =
        document.querySelector("#newsletterForm");

    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const input =
                    newsletterForm.querySelector(
                        'input[type="email"]'
                    );

                if (!input) return;

                const email =
                    input.value.trim();

                if (!email) {

                    alert(
                        "Please enter your email address."
                    );

                    return;
                }

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email)) {

                    alert(
                        "Please enter a valid email address."
                    );

                    return;
                }

                alert(
                    "Thank you for subscribing!"
                );

                input.value = "";
            }
        );
    }


    // ==========================================
    // 12. INITIALIZE
    // ==========================================

    updateFinancialYear();

    updateCurrentYear();

    handleScrollAnimations();

    handleHeaderScroll();


    // ==========================================
    // 13. SCROLL EVENT
    // ==========================================

    let scrollTimeout = null;

    window.addEventListener(
        "scroll",
        function () {

            if (scrollTimeout) return;

            scrollTimeout =
                setTimeout(function () {

                    handleScrollAnimations();
                    handleHeaderScroll();

                    scrollTimeout = null;

                }, 50);
        },
        { passive: true }
    );


    // ==========================================
    // 14. RESIZE EVENT
    // ==========================================

    window.addEventListener(
        "resize",
        function () {

            handleScrollAnimations();
            handleHeaderScroll();

        }
    );


    // ==========================================
    // 15. IMAGE ERROR HANDLING
    // ==========================================

    document
        .querySelectorAll("img")
        .forEach(function (image) {

            image.addEventListener(
                "error",
                function () {

                    this.classList.add("image-error");

                }
            );
        });


    // ==========================================
    // 16. ACTIVE NAVIGATION
    // ==========================================

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            'nav a[href^="#"]'
        );


    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY + 150;

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");
            }
        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === "#" + currentSection
            ) {

                link.classList.add("active");
            }
        });
    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    // ==========================================
    // 17. CONSOLE
    // ==========================================

    console.log(
        "Chintoo Kumar Portfolio Loaded Successfully."
    );

});
