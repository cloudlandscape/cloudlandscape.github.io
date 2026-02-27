// Language switching functionality
(function() {
    'use strict';
    
    const STORAGE_KEY = 'cloudlandscape_lang';
    const DEFAULT_LANG = 'fr';
    const SUPPORTED_LANGS = ['fr', 'en'];
    
    // Get current language from storage or browser
    function getCurrentLanguage() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && SUPPORTED_LANGS.includes(stored)) {
                return stored;
            }
        } catch (e) {
            console.warn('localStorage not available', e);
        }
        
        // Detect from browser
        const browserLang = navigator.language.split('-')[0];
        return SUPPORTED_LANGS.includes(browserLang) ? browserLang : DEFAULT_LANG;
    }
    
    // Save language preference
    function saveLanguage(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
            console.warn('Failed to save language preference', e);
        }
    }
    
    // Switch language
    function switchLanguage(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) return;
        
        saveLanguage(lang);
        
        // Get current path
        const path = window.location.pathname;
        let newPath = path;
        
        // Handle language path switching
        if (lang === 'en') {
            // Switch to English version
            if (path === '/') {
                newPath = '/en/';
            } else if (!path.startsWith('/en/')) {
                // Add /en/ prefix but preserve rest of path
                if (path.startsWith('/providers/')) {
                    // For provider pages, check if .en.md version exists
                    newPath = path.replace('/providers/', '/en/providers/');
                } else {
                    newPath = '/en' + path;
                }
            }
        } else {
            // Switch to French version (default)
            if (path.startsWith('/en/')) {
                newPath = path.replace('/en/', '/');
            }
        }
        
        // Navigate to new path
        window.location.href = newPath;
    }
    
    // Create language switcher UI
    function createLanguageSwitcher() {
        const currentLang = getCurrentLanguage();
        
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.setAttribute('role', 'navigation');
        switcher.setAttribute('aria-label', 'Language switcher');
        
        switcher.innerHTML = `
            <button class="lang-btn ${currentLang === 'fr' ? 'active' : ''}" 
                    data-lang="fr" 
                    aria-label="Switch to French"
                    ${currentLang === 'fr' ? 'aria-current="true"' : ''}>
                FR
            </button>
            <span class="lang-separator">|</span>
            <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" 
                    data-lang="en" 
                    aria-label="Switch to English"
                    ${currentLang === 'en' ? 'aria-current="true"' : ''}>
                EN
            </button>
        `;
        
        // Add to navigation
        const nav = document.querySelector('nav');
        if (nav) {
            nav.appendChild(switcher);
        }
        
        // Add event listeners
        switcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.dataset.lang;
                switchLanguage(lang);
            });
        });
    }
    
    // Detect and apply language on page load
    function applyLanguageOnLoad() {
        const currentLang = getCurrentLanguage();
        const path = window.location.pathname;
        
        // Check if we're on the wrong language version
        const isEnPath = path.startsWith('/en/');
        const shouldBeEn = currentLang === 'en';
        
        if (isEnPath !== shouldBeEn) {
            // Redirect to correct language version
            switchLanguage(currentLang);
        }
    }
    
    // Initialize
    function init() {
        // Don't auto-redirect on first load, just create switcher
        createLanguageSwitcher();
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
