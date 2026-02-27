// Client-side filtering for provider listing
(function() {
    'use strict';
    
    // Get all providers data from the page
    function getProvidersData() {
        const cards = document.querySelectorAll('.provider-card');
        const providers = [];
        
        cards.forEach(card => {
            const services = Array.from(card.querySelectorAll('.provider-services .badge'))
                .map(badge => badge.textContent.trim());
            const certifications = Array.from(card.querySelectorAll('.provider-certifications .badge'))
                .map(badge => badge.textContent.trim());
            const country = card.querySelector('.provider-meta p strong')?.nextSibling?.textContent?.trim() || '';
            const title = card.querySelector('h3')?.textContent?.trim() || '';
            const description = card.querySelector('p')?.textContent?.trim() || '';
            
            providers.push({
                element: card,
                services: services,
                certifications: certifications,
                country: country,
                title: title,
                description: description,
                searchText: (title + ' ' + description).toLowerCase()
            });
        });
        
        return providers;
    }
    
    // Parse URL parameters
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            services: params.getAll('service'),
            certifications: params.getAll('cert'),
            countries: params.getAll('country'),
            search: params.get('search') || ''
        };
    }
    
    // Update URL without page reload
    function updateUrl(filters) {
        const params = new URLSearchParams();
        
        filters.services.forEach(s => params.append('service', s));
        filters.certifications.forEach(c => params.append('cert', c));
        filters.countries.forEach(c => params.append('country', c));
        if (filters.search) params.set('search', filters.search);
        
        const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
        window.history.pushState({}, '', newUrl);
    }
    
    // Filter providers based on active filters
    function filterProviders(providers, filters) {
        let visibleCount = 0;
        
        providers.forEach(provider => {
            let visible = true;
            
            // Service filter (OR logic)
            if (filters.services.length > 0) {
                visible = visible && filters.services.some(service => 
                    provider.services.some(ps => ps.toLowerCase() === service.toLowerCase())
                );
            }
            
            // Certification filter (OR logic)
            if (filters.certifications.length > 0) {
                visible = visible && filters.certifications.some(cert =>
                    provider.certifications.some(pc => pc.toLowerCase() === cert.toLowerCase())
                );
            }
            
            // Country filter (OR logic)
            if (filters.countries.length > 0) {
                visible = visible && filters.countries.some(country =>
                    provider.country.toLowerCase() === country.toLowerCase()
                );
            }
            
            // Search filter
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                visible = visible && provider.searchText.includes(searchTerm);
            }
            
            provider.element.style.display = visible ? '' : 'none';
            if (visible) visibleCount++;
        });
        
        return visibleCount;
    }
    
    // Update result count
    function updateResultCount(count, total) {
        const resultCount = document.querySelector('.result-count');
        if (resultCount) {
            if (count === total) {
                resultCount.textContent = `${count} providers available`;
            } else {
                resultCount.textContent = `${count} of ${total} providers match your criteria`;
            }
        }
    }
    
    // Initialize filters
    function initFilters() {
        const providers = getProvidersData();
        const urlParams = getUrlParams();
        const activeFilters = {
            services: urlParams.services,
            certifications: urlParams.certifications,
            countries: urlParams.countries,
            search: urlParams.search
        };
        
        // Apply initial filters from URL
        const visibleCount = filterProviders(providers, activeFilters);
        updateResultCount(visibleCount, providers.length);
        
        // Set up search input
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.value = activeFilters.search;
            searchInput.addEventListener('input', function() {
                activeFilters.search = this.value;
                const visible = filterProviders(providers, activeFilters);
                updateResultCount(visible, providers.length);
                updateUrl(activeFilters);
            });
        }
        
        // Set up filter UI event listeners
        document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const filterType = this.dataset.filterType;
                const filterValue = this.dataset.filterValue;
                
                if (this.checked) {
                    if (!activeFilters[filterType].includes(filterValue)) {
                        activeFilters[filterType].push(filterValue);
                    }
                } else {
                    const index = activeFilters[filterType].indexOf(filterValue);
                    if (index > -1) {
                        activeFilters[filterType].splice(index, 1);
                    }
                }
                
                const visible = filterProviders(providers, activeFilters);
                updateResultCount(visible, providers.length);
                updateUrl(activeFilters);
            });
            
            // Check initial state from URL
            const filterType = checkbox.dataset.filterType + 's';
            const filterValue = checkbox.dataset.filterValue;
            if (activeFilters[filterType] && activeFilters[filterType].includes(filterValue)) {
                checkbox.checked = true;
            }
        });
        
        // Reset button
        const resetButton = document.querySelector('.filter-reset');
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                activeFilters.services = [];
                activeFilters.certifications = [];
                activeFilters.countries = [];
                activeFilters.search = '';
                
                document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
                if (searchInput) searchInput.value = '';
                const visible = filterProviders(providers, activeFilters);
                updateResultCount(visible, providers.length);
                updateUrl(activeFilters);
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFilters);
    } else {
        initFilters();
    }
})();
