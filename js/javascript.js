// ============================================
// PROTECCIÓN Y SEGURIDAD - HV Nicolás Bolívar
// ============================================

(function() {
    'use strict';

    // ========================================
    // CONFIGURACIÓN GLOBAL
    // ========================================
    const CONFIG = {
        typingSpeed: 100,
        typingDelay: 500,
        scrollThreshold: 50,
        revealThreshold: 0.1
    };

    // ========================================
    // SCROLL AL INICIO FORZOSO
    // ========================================
    function forceScrollToTop() {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Forzar que el hash sea vacío
        if (window.location.hash !== '' && window.location.hash !== '#inicio') {
            history.replaceState(null, null, ' ');
        }
    }

    // Ejecutar inmediatamente al cargar
    forceScrollToTop();
    window.addEventListener('load', forceScrollToTop);

    // ========================================
    // PROTECCIONES DE SEGURIDAD
    // ========================================

    // Deshabilitar clic derecho
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Deshabilitar teclas comunes para inspeccionar
    document.addEventListener('keydown', function(e) {
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
        if (
            e.keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
            (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
            (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
            (e.ctrlKey && e.keyCode === 83) || // Ctrl+S
            (e.ctrlKey && e.keyCode === 80) // Ctrl+P
        ) {
            e.preventDefault();
            return false;
        }
    });

    // Detectar y bloquear DevTools con overlay
    let devtoolsOpen = false;
    const checkDevTools = function() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;

        if (widthThreshold || heightThreshold) {
            devtoolsOpen = true;
            const overlay = document.getElementById('security-overlay');
            if (overlay) overlay.classList.add('active');
        } else {
            devtoolsOpen = false;
            const overlay = document.getElementById('security-overlay');
            if (overlay) overlay.classList.remove('active');
        }
    };

    setInterval(checkDevTools, 500);

    // Bloquear selección de texto
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Bloquear arrastre de imágenes
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('draggable', 'false');
    });

    // Prevenir impresión
    const blockPrint = function() {
        window.onbeforeprint = function() {
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#1a1a1a;color:#fff;font-family:sans-serif;"><div><h2>🔒 La impresión está deshabilitada</h2></div></div>';
        };
    };
    blockPrint();

    // Prevenir copiar
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });

    document.addEventListener('cut', function(e) {
        e.preventDefault();
        return false;
    });

    // Ofuscar contenido en consola
    console.log('%c🛑 ALTO', 'font-size: 40px; font-weight: bold; color: #ef4444; background: #000; padding: 20px;');
    console.log('%cEsta es una función de seguridad para protegerte.', 'font-size: 16px; color: #fff; background: #000; padding: 10px;');
    console.log('%cSi alguien te pidió copiar y pegar algo aquí, es probablemente un scammer.', 'font-size: 14px; color: #fbbf24; background: #000; padding: 10px;');

    // ========================================
    // TYPING ANIMATION
    // ========================================
    const typingTexts = [
        'Full Stack',
        'React & Angular',
        'Node.js & Python',
        'AI Enthusiast'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const currentText = typingTexts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = CONFIG.typingSpeed;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }

    // ========================================
    // DARK MODE
    // ========================================
    function initDarkMode() {
        const toggleButton = document.getElementById('darkModeToggle');
        const body = document.body;

        if (!toggleButton || !body) return;

        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
            updateThemeIcon(toggleButton, true);
        }

        toggleButton.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
            updateThemeIcon(toggleButton, isDark);
        });
    }

    function updateThemeIcon(button, isDark) {
        const icon = button.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon';
        }
    }

    // ========================================
    // SCROLL PROGRESS BAR
    // ========================================
    function initScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // ========================================
    // ACTIVE NAVIGATION
    // ========================================
    function initActiveNav() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section[id]');

        if (!navItems.length || !sections.length) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${sectionId}`) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        });

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // ========================================
    // REVEAL ON SCROLL
    // ========================================
    function initRevealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');

        if (!reveals.length) return;

        const revealOnScroll = () => {
            reveals.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = CONFIG.revealThreshold * window.innerHeight;

                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();
    }

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ========================================
    // PARALLAX EFFECT FOR HERO
    // ========================================
    function initParallax() {
        const heroSection = document.querySelector('.hero-section');
        const heroImage = document.querySelector('.hero-image');
        const heroGlow = document.querySelector('.hero-glow');

        if (!heroSection || !heroImage || !heroGlow) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroTop = heroSection.offsetTop;

            if (scrolled < heroSection.offsetHeight + heroTop) {
                const offset = (scrolled - heroTop) * 0.3;
                heroImage.style.transform = `translateY(${offset * 0.5}px)`;
                heroGlow.style.transform = `translate(-50%, -50%) translateY(${offset}px)`;
            }
        });
    }

    // ========================================
    // CARD HOVER EFFECTS (3D Tilt)
    // ========================================
    function initCardEffects() {
        const cards = document.querySelectorAll('.project-card, .timeline-content, .about-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ========================================
    // WATERMARK DE PROTECCIÓN
    // ========================================
    function addWatermark() {
        const watermark = document.createElement('div');
        watermark.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 10px;
            font-size: 10px;
            color: rgba(0,0,0,0.3);
            z-index: 9999;
            pointer-events: none;
            font-family: sans-serif;
        `;
        watermark.textContent = '© Nicolás Bolívar - Todos los derechos reservados';
        document.body.appendChild(watermark);

        // Dark mode watermark
        if (document.body.classList.contains('dark-mode')) {
            watermark.style.color = 'rgba(255,255,255,0.2)';
        }
    }

    // ========================================
    // MENSAJE ANTI-INSPECCIÓN EN CONSOLE
    // ========================================
    function antiConsoleMessage() {
        const style = 'background: #ef4444; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;';
        console.log('%c🔒 Esta página está protegida contra copias', style);
    }

    // ========================================
    // INITIALIZATION
    // ========================================
    document.addEventListener('DOMContentLoaded', () => {
        // Start typing animation
        setTimeout(typeText, CONFIG.typingDelay);

        // Initialize all features
        initDarkMode();
        initScrollProgress();
        initActiveNav();
        initRevealOnScroll();
        initSmoothScroll();
        initParallax();
        initCardEffects();
        addWatermark();
        antiConsoleMessage();

        // Prevenir recarga accidental (solo permite una recarga por sesión)
        if (sessionStorage.getItem('pageReloaded')) {
            return;
        }
        sessionStorage.setItem('pageReloaded', 'true');

        // Log seguro
        console.log('%c👋 Bienvenido', 'font-size: 20px; font-weight: bold; color: #2563eb;');
        console.log('%cHoja de Vida de Nicolás Bolívar', 'font-size: 14px; color: #7c3aed;');
    });

    // Prevenir hotlinking de imágenes
    document.addEventListener('dragstart', e => e.preventDefault());

})();
