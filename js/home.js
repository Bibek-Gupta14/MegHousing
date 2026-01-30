/**
 * HOMEPAGE SLIDER SCRIPT
 * 
 * This script runs the main image banner slider on the Homepage.
 * 
 * Features:
 * - Infinite Loop: It seamlessly jumps from the last slide back to the first.
 * - Auto-Play: Automatically advances slides every 5 seconds.
 * - Pause on Hover: Stops auto-play when the user mouse-overs the slider.
 * - Navigation: Supports Next/Prev buttons and Arrow keys.
 */
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.slider-track');
    // Only run if the slider exists
    if (!track) return;

    let originalSlides = Array.from(track.children);
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    // Clone First and Last slides for infinite loop
    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

    // Append/Prepend clones
    track.appendChild(firstClone);
    track.insertBefore(lastClone, originalSlides[0]);

    // Re-query slides to include clones
    const allSlides = document.querySelectorAll('.slide');
    const totalSlides = allSlides.length;

    // State
    let currentIndex = 1; // Start at real first slide (index 1)
    let isTransitioning = false;
    let slideInterval;
    const intervalTime = 5000; // 5 seconds fixed

    // Initial positioning (Show real first slide)
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    function moveSlide(direction) {
        if (isTransitioning) return;
        isTransitioning = true;

        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';

        if (direction === 'next') {
            currentIndex++;
        } else {
            currentIndex--;
        }

        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Handle Jump logic after transition completes
    track.addEventListener('transitionend', () => {
        isTransitioning = false;

        // Infinite Loop Logic
        if (allSlides[currentIndex] === firstClone) {
            // We are at the cloned end, jump to real start
            track.style.transition = 'none';
            currentIndex = 1;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        else if (allSlides[currentIndex] === lastClone) {
            // We are at the cloned start, jump to real end
            track.style.transition = 'none';
            currentIndex = totalSlides - 2;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    });

    // Timer Logic
    function startTimer() {
        // Clear any existing timer first to be safe
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            moveSlide('next');
        }, intervalTime);
    }

    function stopTimer() {
        clearInterval(slideInterval);
    }

    function resetTimer() {
        stopTimer();
        startTimer();
    }

    // Controls
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (!isTransitioning) {
                moveSlide('next');
                resetTimer();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (!isTransitioning) {
                moveSlide('prev');
                resetTimer();
            }
        });
    }

    // Pause on hover
    const sliderContainer = document.querySelector('.gallery-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopTimer);
        sliderContainer.addEventListener('mouseleave', startTimer);

        // Keyboard Nav
        sliderContainer.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
            if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
        });
    }

    // Start
    startTimer();
});
