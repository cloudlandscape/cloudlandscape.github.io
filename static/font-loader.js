// Non-blocking Google Fonts loader — replaces inline onload attribute (CSP: no unsafe-inline)
(function() {
    var link = document.getElementById('google-fonts-preload');
    if (link) {
        link.onload = function() { this.rel = 'stylesheet'; };
        // Already loaded (cached): promote immediately
        if (link.sheet) { link.rel = 'stylesheet'; }
    }
})();
