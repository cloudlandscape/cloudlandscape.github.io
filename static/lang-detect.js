// Minimal language detection for compare.html (standalone page)
// Sets html[lang] from localStorage before first paint to prevent language flash
(function() {
    var lang = localStorage.getItem('cloudlandscape_lang') || 'fr';
    document.documentElement.lang = lang;
    document.addEventListener('DOMContentLoaded', function() {
        var skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.textContent = lang === 'fr' ? 'Passer au contenu principal' : 'Skip to main content';
        }
    });
})();
