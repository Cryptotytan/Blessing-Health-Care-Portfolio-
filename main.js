/* ============================================================
   OSADEBAMWEN ENOBAKHARE — PORTFOLIO JAVASCRIPT
   main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ========================================
       1. NAVBAR — SCROLL SHADOW
    ======================================== */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });


    /* ========================================
       2. MOBILE MENU — HAMBURGER TOGGLE
         Uses a dedicated <div id="mobileMenu">
         outside the desktop <ul id="navMenu">
         so `display:none` and `display:flex`
         work independently.
    ======================================== */
    const hamburger   = document.getElementById('hamburger');
    const mobileMenu  = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {

        // Toggle on hamburger click
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileMenu.classList.toggle('is-open');
            hamburger.classList.toggle('is-active', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Close when any mobile nav link is clicked
        mobileMenu.querySelectorAll('.navbar__mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-open');
                hamburger.classList.remove('is-active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close when clicking outside the navbar
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                mobileMenu.classList.remove('is-open');
                hamburger.classList.remove('is-active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                mobileMenu.classList.remove('is-open');
                hamburger.classList.remove('is-active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }


    /* ========================================
       3. SMOOTH SCROLLING (all anchor links)
    ======================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;         // skip bare '#'
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    /* ========================================
       4. SCROLL-REVEAL ANIMATION
    ======================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const checkReveal = () => {
        const windowH     = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            if (el.getBoundingClientRect().top < windowH - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', checkReveal, { passive: true });
    checkReveal(); // run immediately on load


    /* ========================================
       5. SKILL-BAR ANIMATION
    ======================================== */
    const skillBars = document.querySelectorAll('.skills__bar-fill');

    const checkSkillBars = () => {
        const windowH = window.innerHeight;
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < windowH && rect.bottom > 0) {
                bar.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', checkSkillBars, { passive: true });
    checkSkillBars();


    /* ========================================
       6. CONTACT FORM — basic feedback
    ======================================== */
    const contactForm = document.querySelector('.contact__form form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const submitBtn = contactForm.querySelector('.form__submit');
            if (submitBtn) {
                submitBtn.textContent = 'Sending…';
                submitBtn.disabled = true;

                // Re-enable after 4 s in case Formspree doesn't redirect
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled    = false;
                }, 4000);
            }
        });
    }

}); // end DOMContentLoaded
