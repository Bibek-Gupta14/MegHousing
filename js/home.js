/**
 * HOMEPAGE SLIDER SCRIPT
 *
 * This script runs the main image banner slider on the Homepage.
 *
 * Features:
 * - Infinite Loop: It seamlessly jumps from the last slide back to the first.
 * - Auto-Play: Automatically advances slides every 5 seconds.
 * - Pause on Hover: Stops auto-play when the user mouse-overs the slider.
 * - Pause on Focus: Stops auto-play when a keyboard user focuses inside the slider.
 * - Pause Button: Visible play/pause toggle button for WCAG 2.2.2 compliance.
 * - Navigation: Supports Next/Prev buttons and Arrow keys.
 *
 * PHASE 2 FIXES:
 * - BUG FIX: sliderContainer was referenced inside moveSlide() before it was
 *   declared on line 127. Moved declaration to top of scope.
 * - WCAG 2.2.2: Added pause-on-keyboard-focus so auto-play stops when a
 *   keyboard user is interacting with the carousel.
 * - WCAG 2.2.2: Wired up the pause/play toggle button added in index.html.
 */
document.addEventListener('DOMContentLoaded', function () {
    var track = document.querySelector('.slider-track');
    // Only run if the slider exists on this page
    if (!track) return;

    // PHASE 2 FIX: Declare sliderContainer at the top so it is available
    // inside moveSlide() — previously it was declared after moveSlide() was defined,
    // causing a silent "sliderContainer is not defined" error on slide change.
    var sliderContainer = document.querySelector('.gallery-slider');

    var originalSlides = Array.from(track.children);
    var nextBtn = document.querySelector('.slider-section .next-btn');
    var prevBtn = document.querySelector('.slider-section .prev-btn');
    var pauseBtn = document.getElementById('slider-pause-btn');

    // Clone First and Last slides for infinite loop
    var firstClone = originalSlides[0].cloneNode(true);
    var lastClone  = originalSlides[originalSlides.length - 1].cloneNode(true);

    // Mark clones so they are never announced by screen readers
    firstClone.setAttribute('aria-hidden', 'true');
    lastClone.setAttribute('aria-hidden', 'true');

    // Append/Prepend clones
    track.appendChild(firstClone);
    track.insertBefore(lastClone, originalSlides[0]);

    // Re-query slides to include clones
    var allSlides  = document.querySelectorAll('.slider-track .slide');
    var totalSlides = allSlides.length;

    // State
    var currentIndex  = 1; // Start at real first slide (index 1, after prepended clone)
    var isTransitioning = false;
    var slideInterval;
    var isPaused = false;
    var intervalTime = 8000; // 5 seconds

    // PHASE 1: Count of real (non-clone) slides for aria position announcements
    var realSlideCount = originalSlides.length;

    // Initial positioning (show real first slide with no animation)
    track.style.transition = 'none';
    track.style.transform  = 'translateX(-' + (currentIndex * 100) + '%)';

    // ----------------------------------------------------------------
    // CORE SLIDE FUNCTION
    // ----------------------------------------------------------------
    function moveSlide(direction) {
        if (isTransitioning) return;
        isTransitioning = true;

        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';

        if (direction === 'next') {
            currentIndex++;
        } else {
            currentIndex--;
        }

        track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

        // PHASE 1: Update aria-label to announce slide position to screen readers
        var realIndex = currentIndex - 1; // Adjust for prepended clone
        if (realIndex < 0) realIndex = realSlideCount - 1;
        if (realIndex >= realSlideCount) realIndex = 0;
        if (sliderContainer) {
            sliderContainer.setAttribute('aria-label',
                'Departmental photo gallery, slide ' + (realIndex + 1) + ' of ' + realSlideCount);
        }
    }

    // ----------------------------------------------------------------
    // INFINITE LOOP — jump silently after transition ends
    // ----------------------------------------------------------------
    track.addEventListener('transitionend', function () {
        isTransitioning = false;

        if (allSlides[currentIndex] === firstClone) {
            // At cloned end — jump to real start
            track.style.transition = 'none';
            currentIndex = 1;
            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        } else if (allSlides[currentIndex] === lastClone) {
            // At cloned start — jump to real end
            track.style.transition = 'none';
            currentIndex = totalSlides - 2;
            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        }
    });

    // ----------------------------------------------------------------
    // TIMER
    // ----------------------------------------------------------------
    function startTimer() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(function () {
            moveSlide('next');
        }, intervalTime);
    }

    function stopTimer() {
        clearInterval(slideInterval);
    }

    function resetTimer() {
        stopTimer();
        if (!isPaused) startTimer();
    }

    // ----------------------------------------------------------------
    // PAUSE / PLAY BUTTON (WCAG 2.2.2)
    // ----------------------------------------------------------------
    function setPausedState(paused) {
        isPaused = paused;
        if (isPaused) {
            stopTimer();
            if (pauseBtn) {
                pauseBtn.setAttribute('aria-label', 'Play image gallery slideshow');
                pauseBtn.innerHTML = '<i class="fas fa-play" aria-hidden="true"></i>';
            }
        } else {
            startTimer();
            if (pauseBtn) {
                pauseBtn.setAttribute('aria-label', 'Pause image gallery slideshow');
                pauseBtn.innerHTML = '<i class="fas fa-pause" aria-hidden="true"></i>';
            }
        }
    }

    if (pauseBtn) {
        pauseBtn.addEventListener('click', function () {
            setPausedState(!isPaused);
        });
    }

    // ----------------------------------------------------------------
    // PREV / NEXT BUTTONS
    // ----------------------------------------------------------------
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            if (!isTransitioning) {
                moveSlide('next');
                resetTimer();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            if (!isTransitioning) {
                moveSlide('prev');
                resetTimer();
            }
        });
    }

    // ----------------------------------------------------------------
    // PAUSE ON HOVER & PAUSE ON KEYBOARD FOCUS (WCAG 2.2.2)
    // ----------------------------------------------------------------
    if (sliderContainer) {
        // Mouse hover
        sliderContainer.addEventListener('mouseenter', stopTimer);
        sliderContainer.addEventListener('mouseleave', function () {
            if (!isPaused) startTimer();
        });

        // PHASE 2: Pause when any element inside the slider receives keyboard focus
        // Resumes only when focus leaves the entire slider container
        sliderContainer.addEventListener('focusin', function () {
            stopTimer();
        });
        sliderContainer.addEventListener('focusout', function (e) {
            // Only restart if focus moved outside the slider container entirely
            if (!sliderContainer.contains(e.relatedTarget)) {
                if (!isPaused) startTimer();
            }
        });

        // Arrow key navigation
        sliderContainer.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
            if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
        });
    }

    // ----------------------------------------------------------------
    // START
    // ----------------------------------------------------------------
    startTimer();
});
