// Mobile responsive enhancements
(function() {
    'use strict';
    
    // Toggle filters on mobile
    function initMobileFilters() {
        const toggle = document.querySelector('.filters-toggle');
        const content = document.querySelector('.filters-content');
        const toggleText = document.querySelector('.toggle-text');
        
        if (!toggle || !content) return;
        
        // Check screen size
        function isMobile() {
            return window.innerWidth <= 768;
        }
        
        // Show/hide filters based on screen size
        function updateFiltersVisibility() {
            if (isMobile()) {
                toggle.style.display = 'block';
                // Content visibility controlled by open class
            } else {
                toggle.style.display = 'none';
                content.classList.add('open');
            }
        }
        
        // Toggle filters
        toggle.addEventListener('click', function() {
            const isOpen = content.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);
            toggleText.textContent = isOpen ? 'Hide Filters' : 'Show Filters';
        });
        
        // Initial state
        updateFiltersVisibility();
        
        // Update on resize
        window.addEventListener('resize', updateFiltersVisibility);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileFilters);
    } else {
        initMobileFilters();
    }
})();
