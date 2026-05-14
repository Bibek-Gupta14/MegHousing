/**
 * ACCESSIBILITY SCRIPT — MegHousing Portal
 * Phase 1 Update: GIGW 3.0 / WCAG 2.1 AA
 *
 * This file handles the "Text Size" controls (A-, A, A+) found in the top utility bar.
 * It allows users to increase or decrease the font size of the entire website for better readability.
 *
 * PHASE 1 CHANGE:
 * - Updated selectors to handle both <button> (Phase 1 update) and legacy <a> elements
 *   for backward compatibility across all pages.
 * - The querySelector by ID (fontSmall, fontDefault, fontLarge) works regardless of element type.
 * - e.preventDefault() retained for <a> fallback compatibility.
 *
 * Logic:
 * - Uses a scale of steps (0.8rem to 1.3rem).
 * - Saves the user's preference in localStorage so it persists across pages.
 */
document.addEventListener('DOMContentLoaded', function () {
    var htmlRoot = document.documentElement;
    // Define scale steps in REM: 0.8, 0.9, 1.0 (Default), 1.1, 1.2, 1.3
    var fontScales = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3];
    var defaultIndex = 2; // Index of 1.0

    // State Management
    var currentIndex = parseInt(localStorage.getItem('userScaleIndex'));

    // Validate stored index
    if (isNaN(currentIndex) || currentIndex < 0 || currentIndex >= fontScales.length) {
        currentIndex = defaultIndex;
    }

    function applyFontSize(index) {
        var sizeRem = fontScales[index];
        htmlRoot.style.fontSize = sizeRem + 'rem';
        localStorage.setItem('userScaleIndex', index);
        currentIndex = index; // Sync state
    }

    // Apply immediately on load
    applyFontSize(currentIndex);

    // A- (Decrease)
    // Works with both <button id="fontSmall"> (Phase 1) and <a id="fontSmall"> (legacy pages)
    var btnSmall = document.getElementById('fontSmall');
    if (btnSmall) {
        btnSmall.addEventListener('click', function (e) {
            if (e.preventDefault) e.preventDefault(); // Safe for both <a> and <button>
            if (currentIndex > 0) {
                applyFontSize(currentIndex - 1);
            }
        });
    }

    // A (Reset)
    var btnDefault = document.getElementById('fontDefault');
    if (btnDefault) {
        btnDefault.addEventListener('click', function (e) {
            if (e.preventDefault) e.preventDefault();
            applyFontSize(defaultIndex);
        });
    }

    // A+ (Increase)
    var btnLarge = document.getElementById('fontLarge');
    if (btnLarge) {
        btnLarge.addEventListener('click', function (e) {
            if (e.preventDefault) e.preventDefault();
            if (currentIndex < fontScales.length - 1) {
                applyFontSize(currentIndex + 1);
            }
        });
    }
});
