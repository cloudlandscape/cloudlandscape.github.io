// Provider comparison functionality
(function() {
    'use strict';
    
    const MAX_COMPARE = 4;
    const MIN_COMPARE = 2;
    const STORAGE_KEY = 'cloudlandscape_comparison';
    
    // Get comparison state from localStorage
    function getComparisonState() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }
    
    // Save comparison state to localStorage
    function saveComparisonState(providers) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(providers));
        } catch (e) {
            console.error('Failed to save comparison state', e);
        }
    }
    
    // Add provider to comparison
    function addToComparison(slug, title) {
        const current = getComparisonState();
        
        if (current.length >= MAX_COMPARE) {
            alert(`You can only compare up to ${MAX_COMPARE} providers at once.`);
            return false;
        }
        
        if (current.find(p => p.slug === slug)) {
            return false; // Already in comparison
        }
        
        current.push({ slug, title });
        saveComparisonState(current);
        updateUI();
        return true;
    }
    
    // Remove provider from comparison
    function removeFromComparison(slug) {
        const current = getComparisonState();
        const filtered = current.filter(p => p.slug !== slug);
        saveComparisonState(filtered);
        updateUI();
    }
    
    // Clear all comparisons
    function clearComparison() {
        saveComparisonState([]);
        updateUI();
    }
    
    // Update UI elements
    function updateUI() {
        const current = getComparisonState();
        const count = current.length;
        
        // Update counter
        const counter = document.querySelector('.comparison-counter');
        if (counter) {
            counter.textContent = count;
            counter.style.display = count > 0 ? 'inline-block' : 'none';
        }
        
        // Update compare button visibility
        const compareBtn = document.querySelector('.comparison-bar .btn-compare');
        if (compareBtn) {
            compareBtn.style.display = count >= MIN_COMPARE ? 'inline-block' : 'none';
        }
        
        // Update comparison bar visibility
        const comparisonBar = document.querySelector('.comparison-bar');
        if (comparisonBar) {
            comparisonBar.style.display = count > 0 ? 'flex' : 'none';
        }
        
        // Update list in comparison bar
        const list = document.querySelector('.comparison-list');
        if (list) {
            list.innerHTML = current.map(p => `
                <div class="comparison-item">
                    <span>${p.title}</span>
                    <button class="remove-comparison" data-slug="${p.slug}">×</button>
                </div>
            `).join('');
        }
        
        // Update add buttons on cards
        document.querySelectorAll('[data-provider]').forEach(btn => {
            const slug = btn.dataset.provider;
            const isInComparison = current.find(p => p.slug === slug);
            const isFull = count >= MAX_COMPARE;
            
            if (isInComparison) {
                btn.textContent = '✓ Added to Comparison';
                btn.classList.add('in-comparison');
                btn.disabled = false;
            } else if (isFull) {
                btn.textContent = 'Comparison Full';
                btn.disabled = true;
                btn.classList.remove('in-comparison');
            } else {
                btn.textContent = 'Add to Comparison';
                btn.disabled = false;
                btn.classList.remove('in-comparison');
            }
        });
    }
    
    // Initialize comparison bar
    function initComparisonBar() {
        // Check if bar already exists
        if (document.querySelector('.comparison-bar')) return;
        
        const bar = document.createElement('div');
        bar.className = 'comparison-bar';
        bar.innerHTML = `
            <div class="comparison-content">
                <div class="comparison-header">
                    <strong>Compare Providers (<span class="comparison-counter">0</span>)</strong>
                    <button class="btn-clear-comparison">Clear All</button>
                </div>
                <div class="comparison-list"></div>
                <button class="btn btn-compare" style="display: none;">
                    Compare Now →
                </button>
            </div>
        `;
        
        document.body.appendChild(bar);
        
        // Add event listeners
        bar.querySelector('.btn-clear-comparison').addEventListener('click', clearComparison);
        bar.querySelector('.btn-compare').addEventListener('click', () => {
            const current = getComparisonState();
            const slugs = current.map(p => p.slug).join(',');
            window.location.href = `/compare.html?providers=${slugs}`;
        });
    }
    
    // Initialize
    function init() {
        initComparisonBar();
        updateUI();
        
        // Add to comparison buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-provider]')) {
                const btn = e.target;
                const slug = btn.dataset.provider;
                const title = btn.closest('article, .provider-detail')?.querySelector('h1, h2')?.textContent || slug;
                
                const current = getComparisonState();
                const isInComparison = current.find(p => p.slug === slug);
                
                if (isInComparison) {
                    removeFromComparison(slug);
                } else {
                    addToComparison(slug, title);
                }
            }
            
            // Remove from comparison
            if (e.target.matches('.remove-comparison')) {
                const slug = e.target.dataset.slug;
                removeFromComparison(slug);
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
