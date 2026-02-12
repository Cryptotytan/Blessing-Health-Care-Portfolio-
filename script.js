// Portfolio JavaScript
(function() {
    'use strict';

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.navbar__mobile-link');
    const navLinks = document.querySelectorAll('.navbar__link');
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.skills__bar-fill');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function toggleMobileMenu() {
        const isOpen = mobileMenu.classList.contains('is-open');
        
        if (isOpen) {
            mobileMenu.classList.remove('is-open');
            hamburger.classList.remove('is-active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        } else {
            mobileMenu.classList.add('is-open');
            hamburger.classList.add('is-active');
            hamburger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

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

    function animateSkillBars() {
        const windowHeight = window.innerHeight;
        
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            
            if (barTop < windowHeight - 100 && !bar.classList.contains('animate')) {
                bar.classList.add('animate');
            }
        });
    }

    function initIntersectionObserver() {
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
            window.addEventListener('scroll', () => {
                revealOnScroll();
                animateSkillBars();
            });
        }
    }

    function initScrollToTop() {
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

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollButton.style.display = 'flex';
            } else {
                scrollButton.style.display = 'none';
            }
        });

        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        scrollButton.addEventListener('mouseenter', () => {
            scrollButton.style.transform = 'translateY(-5px)';
            scrollButton.style.boxShadow = '0 6px 25px rgba(11, 79, 108, 0.4)';
        });

        scrollButton.addEventListener('mouseleave', () => {
            scrollButton.style.transform = 'translateY(0)';
            scrollButton.style.boxShadow = '0 4px 20px rgba(11, 79, 108, 0.3)';
        });
    }

    function initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
                closeMobileMenu();
            }
        });
    }

    function attachEventListeners() {
        window.addEventListener('scroll', handleNavbarScroll);
        
        if (hamburger) {
            hamburger.addEventListener('click', toggleMobileMenu);
        }

        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                smoothScrollToSection.call(link, e);
                closeMobileMenu();
            });
        });

        navLinks.forEach(link => {
            link.addEventListener('click', smoothScrollToSection);
        });

        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('is-open') && 
                !mobileMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    function init() {
        attachEventListeners();
        handleNavbarScroll();
        initIntersectionObserver();
        initKeyboardNavigation();
        initScrollToTop();
        revealOnScroll();
        animateSkillBars();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && mobileMenu.classList.contains('is-open')) {
            closeMobileMenu();
        }
    });

})();
