// ============================================================
//  OSADEBAMWEN ENOBAKHARE — PORTFOLIO JAVASCRIPT
//  script.js
// ============================================================

(function() {
    'use strict';

    // ========================================
    //  DOM ELEMENT REFERENCES
    // ========================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.navbar__mobile-link');
    const navLinks = document.querySelectorAll('.navbar__link');
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.skills__bar-fill');

    // ========================================
    //  NAVBAR SCROLL EFFECT
    // ========================================
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ========================================
    //  MOBILE MENU TOGGLE
    // ========================================
    function toggleMobileMenu() {
        const isOpen = mobileMenu.classList.contains('is-open');
        
        if (isOpen) {
            // Close menu
            mobileMenu.classList.remove('is-open');
            hamburger.classList.remove('is-active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        } else {
            // Open menu
            mobileMenu.classList.add('is-open');
            hamburger.classList.add('is-active');
            hamburger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }

    // ========================================
    //  CLOSE MOBILE MENU ON LINK CLICK
    // ========================================
    function closeMobileMenu() {
        mobileMenu.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // ========================================
    //  SMOOTH SCROLL FOR NAVIGATION LINKS
    // ========================================
    function smoothScrollToSection(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // ========================================
    //  SCROLL REVEAL ANIMATION
    // ========================================
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    // ========================================
    //  ANIMATE SKILL BARS
    // ========================================
    function animateSkillBars() {
        const windowHeight = window.innerHeight;
        
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            
            if (barTop < windowHeight - 100 && !bar.classList.contains('animate')) {
                bar.classList.add('animate');
            }
        });
    }

    // ========================================
    //  ACTIVE NAVIGATION LINK HIGHLIGHTING
    // ========================================
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = navbar.offsetHeight;
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ========================================
    //  FORM SUBMISSION HANDLER
    // ========================================
    function handleFormSubmit(e) {
        // Note: This is a placeholder. In production, you would integrate with
        // Formspree or another form handling service by updating the action URL
        const form = e.target;
        const submitButton = form.querySelector('.form__submit');
        
        // Add loading state to button
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // The actual form submission will be handled by Formspree
        // No need to prevent default as we want the form to submit naturally
    }

    // ========================================
    //  INITIALIZE INTERSECTION OBSERVER FOR PERFORMANCE
    // ========================================
    function initIntersectionObserver() {
        // Only use Intersection Observer if browser supports it
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, observerOptions);

            revealElements.forEach(element => {
                observer.observe(element);
            });

            // Separate observer for skill bars
            const skillObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
                        entry.target.classList.add('animate');
                    }
                });
            }, observerOptions);

            skillBars.forEach(bar => {
                skillObserver.observe(bar);
            });
        } else {
            // Fallback to scroll event if Intersection Observer is not supported
            window.addEventListener('scroll', () => {
                revealOnScroll();
                animateSkillBars();
            });
        }
    }

    // ========================================
    //  INITIALIZE SCROLL TO TOP BUTTON (Optional Enhancement)
    // ========================================
    function initScrollToTop() {
        // Create scroll to top button
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollButton.className = 'scroll-to-top';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #0B4F6C 0%, #1B6F8C 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            box-shadow: 0 4px 20px rgba(11, 79, 108, 0.3);
            transition: all 0.3s ease;
            z-index: 999;
        `;
        
        document.body.appendChild(scrollButton);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollButton.style.display = 'flex';
            } else {
                scrollButton.style.display = 'none';
            }
        });

        // Scroll to top on click
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effect
        scrollButton.addEventListener('mouseenter', () => {
            scrollButton.style.transform = 'translateY(-5px)';
            scrollButton.style.boxShadow = '0 6px 25px rgba(11, 79, 108, 0.4)';
        });

        scrollButton.addEventListener('mouseleave', () => {
            scrollButton.style.transform = 'translateY(0)';
            scrollButton.style.boxShadow = '0 4px 20px rgba(11, 79, 108, 0.3)';
        });
    }

    // ========================================
    //  TYPING EFFECT FOR HERO SUBTITLE (Optional Enhancement)
    // ========================================
    function initTypingEffect() {
        const subtitle = document.querySelector('.hero__subtitle');
        if (!subtitle) return;

        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.opacity = '1';
        
        let index = 0;
        const typingSpeed = 50;

        function type() {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            }
        }

        // Start typing after a short delay
        setTimeout(type, 500);
    }

    // ========================================
    //  HANDLE EXTERNAL LINKS
    // ========================================
    function handleExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            // Add security attributes
            link.setAttribute('rel', 'noopener noreferrer');
        });
    }

    // ========================================
    //  INITIALIZE PARTICLES BACKGROUND (Optional Enhancement)
    // ========================================
    function initParticlesBackground() {
        // This is a placeholder for a particles.js integration
        // You can add particles.js library and initialize it here
        // for a more dynamic background effect
    }

    // ========================================
    //  KEYBOARD NAVIGATION ACCESSIBILITY
    // ========================================
    function initKeyboardNavigation() {
        // Close mobile menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
                closeMobileMenu();
            }
        });

        // Trap focus in mobile menu when open
        if (mobileMenu) {
            const focusableElements = mobileMenu.querySelectorAll(
                'a[href], button:not([disabled])'
            );
            
            if (focusableElements.length > 0) {
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];

                mobileMenu.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab' && mobileMenu.classList.contains('is-open')) {
                        if (e.shiftKey) {
                            // Shift + Tab
                            if (document.activeElement === firstFocusable) {
                                e.preventDefault();
                                lastFocusable.focus();
                            }
                        } else {
                            // Tab
                            if (document.activeElement === lastFocusable) {
                                e.preventDefault();
                                firstFocusable.focus();
                            }
                        }
                    }
                });
            }
        }
    }

    // ========================================
    //  LAZY LOAD IMAGES
    // ========================================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback: load all images immediately
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // ========================================
    //  PRELOADER (Optional)
    // ========================================
    function hidePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            }, 500);
        }
    }

    // ========================================
    //  EVENT LISTENERS
    // ========================================
    function attachEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', handleNavbarScroll);
        
        // Mobile menu toggle
        if (hamburger) {
            hamburger.addEventListener('click', toggleMobileMenu);
        }

        // Close mobile menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                smoothScrollToSection.call(link, e);
                closeMobileMenu();
            });
        });

        // Smooth scroll for desktop navigation
        navLinks.forEach(link => {
            link.addEventListener('click', smoothScrollToSection);
        });

        // Scroll-based animations and highlights
        window.addEventListener('scroll', () => {
            highlightActiveSection();
        });

        // Form submission
        const contactForm = document.querySelector('.contact__form form');
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('is-open') && 
                !mobileMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    // ========================================
    //  INITIALIZATION
    // ========================================
    function init() {
        // Core functionality
        attachEventListeners();
        handleNavbarScroll();
        initIntersectionObserver();
        handleExternalLinks();
        initKeyboardNavigation();
        initLazyLoading();
        
        // Optional enhancements
        initScrollToTop();
        // initTypingEffect(); // Uncomment to enable typing effect
        
        // Hide preloader if exists
        hidePreloader();

        // Initial reveal of elements in view
        revealOnScroll();
        animateSkillBars();

        // Log initialization
        console.log('✅ Portfolio initialized successfully');
    }

    // ========================================
    //  RUN ON DOM CONTENT LOADED
    // ========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM is already loaded
        init();
    }

    // ========================================
    //  HANDLE WINDOW RESIZE
    // ========================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        // Close mobile menu on resize
        if (window.innerWidth > 1024 && mobileMenu.classList.contains('is-open')) {
            closeMobileMenu();
        }

        // Debounce resize events
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Any resize-dependent recalculations can go here
        }, 250);
    });

    // ========================================
    //  PERFORMANCE OPTIMIZATION
    // ========================================
    // Debounce scroll events for better performance
    let scrollTimer;
    let ticking = false;

    function optimizedScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleNavbarScroll();
                highlightActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Replace scroll listener with optimized version
    window.addEventListener('scroll', optimizedScroll, { passive: true });

})();
