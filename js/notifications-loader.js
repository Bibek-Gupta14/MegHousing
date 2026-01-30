/**
 * NOTIFICATION LOADER SCRIPT
 * 
 * This script is responsible for taking the data from `notifications-data.js`
 * and converting it into HTML to display on the page.
 * 
 * @param {string} containerId - The ID of the <ul> element where notifications should be added.
 * @param {number} limit - The maximum number of items to show. Set to 0 to show ALL items.
 */
function loadNotifications(containerId, limit) {
    // 1. Find the container element
    const container = document.getElementById(containerId);
    if (!container) return;

    // 2. Find the template
    const template = document.getElementById('notice-item-template');
    if (!template) {
        console.warn('Notification template #notice-item-template not found.');
        return;
    }

    // 3. Determine data slice
    let displayData = notifications;
    if (limit > 0) {
        displayData = notifications.slice(0, limit);
    }

    // 4. Clear container
    // Use replaceChildren() to efficiently empty the container
    container.replaceChildren();

    // 5. Generate and append items using Template
    displayData.forEach(item => {
        // Clone the template content
        const clone = template.content.cloneNode(true);

        // Populate Fields
        // Date
        const dateEl = clone.querySelector('.notice-date');
        if (dateEl) dateEl.textContent = item.date;

        // Title & Link
        const linkEl = clone.querySelector('.notice-link');
        if (linkEl) {
            linkEl.textContent = item.title;
            linkEl.href = item.link;
        }

        // File Type & Icon
        const typeEl = clone.querySelector('.file-type');
        if (typeEl) {
            // Append text node for file type, preserving the existing <i> icon
            typeEl.append(item.type);
        }

        // File Size
        const sizeEl = clone.querySelector('.file-size');
        if (sizeEl) sizeEl.textContent = item.size;

        // Append to container
        container.appendChild(clone);
    });

}

/**
 * Loads notifications for the Sitemap page.
 * Uses a simple list format instead of the detailed card layout.
 * 
 * @param {string} containerId - The ID of the <ul> element in sitemap.html
 */
function loadSitemapNotifications(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    notifications.forEach(item => {
        html += `<li><a href="${item.link}" target="_blank">${item.title}</a></li>`;
    });

    container.innerHTML = html;
}
