/**
 * COMMON UTILITIES SCRIPT
 * 
 * This file contains shared logic used across multiple pages of the website.
 * 
 * Major Features:
 * 1. Mobile Menu Toggle: Handles the "Hamburger" menu click to show/hide the navigation on small screens.
 * 2. Important Links Carousel: Manages the scrolling logo strip (e.g., "India.gov.in", "Digital India") at the bottom of the page.
 *    - It calculates how many items fit on the screen.
 *    - It handles the "Next" and "Previous" button clicks.
 *    - It ensures the layout adapts when the window is resized.
 */
// Common JavaScript for MegHousing
// Includes: Mobile Menu Toggle, Important Links Carousel

document.addEventListener('DOMContentLoaded', function () {

    // ---------------------------------------------------------
    // Mobile Menu Toggle
    // ---------------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            // PHASE 1 FIX: Update aria-expanded to reflect open/closed state
            // WCAG 4.1.2 — Name, Role, Value: interactive controls must expose their state
            var isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', String(isExpanded));
        });

        // PHASE 1 FIX: Close menu when Escape key is pressed
        // WCAG 2.1.1 — Keyboard: all functionality available via keyboard
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus(); // Return focus to toggle button
            }
        });
    }

    // ---------------------------------------------------------
    // Important Links Carousel Logic
    // ---------------------------------------------------------
    const track = document.getElementById('linkTrack');
    const prevBtn = document.getElementById('linkPrev');
    const nextBtn = document.getElementById('linkNext');

    // Only run if the carousel exists on this page
    if (track && prevBtn && nextBtn) {
        const items = track.querySelectorAll('a');

        // MATH CONSTANTS
        // Desktop: 200px + 10px = 210px
        // Mobile: 130px + 10px = 140px
        const MARGIN = 10;

        let itemWidth = 160; // Default (Match CSS)
        let fullItemWidth = itemWidth + MARGIN;

        let currentIndex = 0;
        let visibleItems = 0;
        let maxIndex = 0;

        const updateDimensions = () => {
            // UPDATE CONSTANTS BASED ON SCREEN
            if (window.innerWidth <= 768) {
                itemWidth = 130; // Mobile Width matches CSS
            } else {
                itemWidth = 160; // Desktop Width matches CSS
            }
            fullItemWidth = itemWidth + MARGIN;

            const trackContainer = track.parentElement;
            const section = trackContainer.parentElement;

            // Available width: Container Width - roughly 80px for buttons (smaller on mobile)
            // Use a safer buffer to ensure rounding doesn't break it
            const availableWidth = section.clientWidth - (window.innerWidth <= 768 ? 60 : 100);

            // Calculate how many full items fit
            visibleItems = Math.floor(availableWidth / fullItemWidth);

            // Ensure at least 1 item is visible (safety)
            if (visibleItems < 1) visibleItems = 1;

            // Force container width to EXACTLY fit these items
            // Width = (N-1)*Full + Item
            const exactContainerWidth = ((visibleItems - 1) * fullItemWidth) + itemWidth;

            trackContainer.style.width = `${exactContainerWidth}px`;
            trackContainer.style.flex = "0 0 auto";

            // Recalculate Max Index
            maxIndex = Math.max(0, items.length - visibleItems);

            // Clamp current index if resize caused it to go out of bounds
            if (currentIndex > maxIndex) currentIndex = maxIndex;

            updateCarousel();
        };

        const updateCarousel = () => {
            // translate = index * fullWidth
            let translateX = -(currentIndex * fullItemWidth);

            track.style.transform = `translateX(${translateX}px)`;

            // Update Buttons
            prevBtn.disabled = (currentIndex <= 0);
            nextBtn.disabled = (currentIndex >= maxIndex);
        };

        // Event Listeners
        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        // Init
        updateDimensions();

        // Resize (Debounced)
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateDimensions, 100);
        });
    }
});
