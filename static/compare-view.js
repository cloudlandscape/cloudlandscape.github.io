// Compare page rendering — loaded by /compare.html (standalone, not a Zola template)
(function() {
    'use strict';

    // Set current year in footer
    var yearEl = document.getElementById('current-year');
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

    // Escape HTML special characters to prevent XSS when inserting untrusted text into innerHTML
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Get provider slugs from URL query string
    function getProvidersFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const providers = params.get('providers');
        return providers ? providers.split(',') : [];
    }

    // Fetch and parse provider data from the generated provider page
    async function fetchProviderData(slug) {
        try {
            const response = await fetch(`/providers/${slug}/`);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const title = doc.querySelector('h1')?.textContent || slug;
            const countryEl = doc.querySelector('.meta-item strong');
            let country = 'Unknown';
            if (countryEl && countryEl.textContent.includes('Country')) {
                country = countryEl.nextElementSibling?.textContent?.trim() || 'Unknown';
            }

            const services = Array.from(doc.querySelectorAll('.service-card .service-name')).map(s => s.textContent.trim());
            const certifications = Array.from(doc.querySelectorAll('.cert-name')).map(c => c.textContent.trim());

            const datacenterSection = doc.querySelector('.provider-datacenters');
            const datacenters = datacenterSection
                ? Array.from(datacenterSection.querySelectorAll('li')).map(li => li.textContent.trim())
                : [];

            return { slug, title, country, services, certifications, datacenters };
        } catch (e) {
            console.error('Failed to fetch data for provider:', slug, e);
            return { slug, title: slug, country: 'Unknown', services: [], certifications: [], datacenters: [] };
        }
    }

    function getAllServices(providers) {
        const allServices = new Set();
        providers.forEach(p => p.services.forEach(s => allServices.add(s)));
        return Array.from(allServices).sort();
    }

    function getAllCertifications() {
        return ['SECNUMCLOUD', 'HDS', 'EUCS'];
    }

    function renderComparison(providers) {
        if (providers.length === 0) {
            return `<div class="empty-comparison">
                <h2>No providers selected</h2>
                <p>Please select 2-4 providers from the <a href="/providers/">provider listing</a> to compare.</p>
            </div>`;
        }

        const services = getAllServices(providers);
        const certifications = getAllCertifications();

        let html = '<div class="comparison-table-wrapper"><table class="comparison-table"><caption>Provider feature comparison</caption>';

        html += '<thead><tr><th scope="col">Feature</th>';
        providers.forEach(p => {
            html += `<th scope="col"><a href="/providers/${escapeHtml(p.slug)}/" class="provider-link">${escapeHtml(p.title)}</a></th>`;
        });
        html += '</tr></thead><tbody>';

        // Country row
        html += '<tr><th scope="row">Country</th>';
        providers.forEach(p => { html += `<td>${escapeHtml(p.country)}</td>`; });
        html += '</tr>';

        // Service rows
        html += `<tr><th colspan="${providers.length + 1}" class="section-divider">Services</th></tr>`;
        services.forEach(service => {
            html += `<tr><th scope="row">${escapeHtml(service)}</th>`;
            providers.forEach(p => {
                const has = p.services.some(s => s.toLowerCase() === service.toLowerCase());
                html += `<td>${has
                    ? '<span aria-hidden="true" class="has-feature">✓</span><span class="sr-only">Yes</span>'
                    : '<span aria-hidden="true" class="no-feature">✗</span><span class="sr-only">No</span>'}</td>`;
            });
            html += '</tr>';
        });

        // Certification rows
        html += `<tr><th colspan="${providers.length + 1}" class="section-divider">Certifications</th></tr>`;
        certifications.forEach(cert => {
            html += `<tr><th scope="row">${escapeHtml(cert)}</th>`;
            providers.forEach(p => {
                const has = p.certifications.some(c => c.toUpperCase() === cert);
                const className = has ? 'cert-yes' : 'cert-no';
                html += `<td class="${className}">${has
                    ? '<span aria-hidden="true" class="has-feature">✓</span><span class="sr-only">Yes</span>'
                    : '<span aria-hidden="true" class="no-feature">✗</span><span class="sr-only">No</span>'}</td>`;
            });
            html += '</tr>';
        });

        // Geographic coverage
        html += `<tr><th colspan="${providers.length + 1}" class="section-divider">Geographic Coverage</th></tr>`;
        html += '<tr><th scope="row">Datacenters</th>';
        providers.forEach(p => {
            const locations = p.datacenters && p.datacenters.length > 0
                ? p.datacenters.map(escapeHtml).join(', ')
                : 'Not specified';
            html += `<td>${locations}</td>`;
        });
        html += '</tr>';

        html += '</tbody></table></div>';
        return html;
    }

    function shareComparison() {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({ title: 'Cloud Provider Comparison', url });
        } else {
            navigator.clipboard.writeText(url).then(() => {
                alert('Comparison URL copied to clipboard!');
            });
        }
    }

    async function init() {
        const slugs = getProvidersFromUrl();
        const container = document.getElementById('comparison-content');

        if (slugs.length === 0) {
            container.innerHTML = renderComparison([]);
            return;
        }

        container.setAttribute('aria-busy', 'true');
        container.innerHTML = '<p>Loading provider data...</p>';

        try {
            const providers = await Promise.all(slugs.map(slug => fetchProviderData(slug)));
            container.innerHTML = renderComparison(providers);
        } catch (e) {
            container.innerHTML = '<p class="comparison-error">Error loading comparison. Please try again.</p>';
            console.error(e);
        } finally {
            container.setAttribute('aria-busy', 'false');
        }
    }

    init();
    document.getElementById('share-btn').addEventListener('click', shareComparison);
})();
