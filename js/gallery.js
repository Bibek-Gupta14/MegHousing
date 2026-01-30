/**
 * GALLERY LIGHTBOX SCRIPT
 * 
 * This script powers the image viewing experience (Lightbox) for photo galleries.
 * 
 * Features:
 * - Click any image link (.photo-card a) to open it in a full-screen overlay.
 * - Shows "Next" and "Previous" buttons to navigate through images.
 * - Supports Keyboard Navigation (Left/Right Arrows, Escape to close).
 * - Displays the caption found in the next element.
 */
(function () {
    console.log("Gallery Script Loaded");

    const galleryLinks = document.querySelectorAll('.photo-card a');
    const images = Array.from(galleryLinks).map(link => ({
        src: link.getAttribute('href'),
        caption: link.nextElementSibling ? link.nextElementSibling.innerText : ''
    }));

    let currentIndex = 0;
    let lightboxOverlay = null;
    let lightboxImage = null;
    let lightboxCaption = null;

    function createLightbox() {
        if (document.getElementById('lightbox-overlay')) return;

        lightboxOverlay = document.createElement('div');
        lightboxOverlay.id = 'lightbox-overlay';
        lightboxOverlay.innerHTML = `
            <div class="lightbox-content">
                <div class="lightbox-main">
                    <figure>
                        <div class="lightbox-image-container">
                            <button class="lightbox-close" aria-label="Close Gallery"><i class="fas fa-times"></i></button>
                            <button class="lightbox-nav prev" aria-label="Previous Image"><i class="fas fa-chevron-left"></i></button>
                            <img id="lightbox-img" src="" alt="Gallery Image">
                            <button class="lightbox-nav next" aria-label="Next Image"><i class="fas fa-chevron-right"></i></button>
                        </div>
                        <figcaption id="lightbox-caption"></figcaption>
                    </figure>
                </div>
            </div>
        `;
        document.body.appendChild(lightboxOverlay);

        // References
        lightboxImage = document.getElementById('lightbox-img');
        lightboxCaption = document.getElementById('lightbox-caption');

        // Event Listeners for Controls
        lightboxOverlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightboxOverlay.querySelector('.prev').addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
        lightboxOverlay.querySelector('.next').addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

        // Click outside to close
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });
    }

    function openLightbox(index) {
        if (!lightboxOverlay) createLightbox();

        currentIndex = index;
        updateLightboxContent();
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling

        // Add Keyboard Listeners
        document.addEventListener('keydown', handleKeydown);
    }

    function closeLightbox() {
        if (lightboxOverlay) {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            document.removeEventListener('keydown', handleKeydown);
        }
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxContent();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxContent();
    }

    function updateLightboxContent() {
        const item = images[currentIndex];
        lightboxImage.src = item.src;
        lightboxImage.alt = item.caption;
        lightboxCaption.innerText = item.caption;
    }

    function handleKeydown(e) {
        if (!lightboxOverlay.classList.contains('active')) return;

        if (e.key === 'ArrowRight') {
            showNext();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }

    // Attach Click Events to Links
    galleryLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Stop legacy behavior
            openLightbox(index);
        });
    });

})();
