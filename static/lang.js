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
    
    // Initialize
    function init() {
        // Attach click handlers to the server-rendered .lang-btn elements (data-lang attribute)
        // This replaces the need for inline onclick attributes (CSP: no unsafe-inline for scripts)
        document.querySelectorAll('.lang-btn[data-lang]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                switchLanguage(this.dataset.lang);
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
