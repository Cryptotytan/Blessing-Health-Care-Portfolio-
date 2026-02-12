document.addEventListener('DOMContentLoaded', () => {
    const navbar      = document.querySelector('.navbar');
    const hamburger   = document.getElementById('hamburger');
    const mobileMenu  = document.getElementById('mobileMenu');

    /* ========================================
       1. NAVBAR SCROLL EFFECT
    ======================================== */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ========================================
       2. MOBILE MENU (fixed)
    ======================================== */
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileMenu.classList.toggle('is-open');
            hamburger.classList.toggle('is-active', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-open');
                hamburger.classList.remove('is-active');
            });
        });
    }

    /* ========================================
       3. SMOOTH SCROLLING
    ======================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ... (you can keep the rest of your reveal, skill bars, and form code)
});
