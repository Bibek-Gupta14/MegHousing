/**
 * ACCESSIBILITY SCRIPT
 * 
 * This file handles the "Text Size" controls (A-, A, A+) found in the top utility bar.
 * It allows users to increase or decrease the font size of the entire website for better readability.
 * 
 * Logic:
 * - Uses a scale of steps (0.8rem to 1.3rem).
 * - Saves the user's preference in localStorage so it persists across pages.
 */
// Accessibility: Text Size Control (Index-Based Multi-Step Logic)
document.addEventListener('DOMContentLoaded', function () {
    const htmlRoot = document.documentElement;
    // Define scale steps in REM: 0.8, 0.9, 1.0 (Default), 1.1, 1.2, 1.3
    const fontScales = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3];
    const defaultIndex = 2; // Index of 1.0

    // State Management
    let currentIndex = parseInt(localStorage.getItem('userScaleIndex'));

    // Validate stored index
    if (isNaN(currentIndex) || currentIndex < 0 || currentIndex >= fontScales.length) {
        currentIndex = defaultIndex;
    }

    function applyFontSize(index) {
        const sizeRem = fontScales[index];
        htmlRoot.style.fontSize = sizeRem + 'rem';
        localStorage.setItem('userScaleIndex', index);
        currentIndex = index; // Sync state
    }

    // Apply immediately on load
    applyFontSize(currentIndex);

    // A- (Decrease)
    const btnSmall = document.getElementById('fontSmall');
    if (btnSmall) {
        btnSmall.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentIndex > 0) {
                applyFontSize(currentIndex - 1);
            }
        });
    }

    // A (Reset)
    const btnDefault = document.getElementById('fontDefault');
    if (btnDefault) {
        btnDefault.addEventListener('click', function (e) {
            e.preventDefault();
            applyFontSize(defaultIndex);
        });
    }

    // A+ (Increase)
    const btnLarge = document.getElementById('fontLarge');
    if (btnLarge) {
        btnLarge.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentIndex < fontScales.length - 1) {
                applyFontSize(currentIndex + 1);
            }
        });
    }
});
