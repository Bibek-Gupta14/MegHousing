/**
 * THEME SWITCHER SCRIPT
 * 
 * This file handles the "Contrast" controls (Default, Black, White).
 * Optimized for ZERO FLICKER / No FOUC.
 * 
 * Logic:
 * - Runs immediately (blocking) in <head>.
 * - Reads 'theme' cookie (default, black, white).
 * - Sets <html data-theme="..."> attribute synchronously.
 * - CSS uses this attribute to apply overrides instantly.
 */

(function () {
	var theme_cookie_name = "theme";
	var theme_cookie_duration = 30; // days

	function get_cookie(cookie_name) {
		var nameq = cookie_name + "=";
		var c_ar = document.cookie.split(';');
		for (var i = 0; i < c_ar.length; i++) {
			var c = c_ar[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameq) == 0) return decodeURIComponent(unescape(c.substring(nameq.length, c.length)));
		}
		return '';
	}

	function set_cookie(name, value, days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "") + expires + "; path=/";
	}

	// Exposed global function for buttons to call
	window.switch_style = function (theme_name) {
		// Map 'style' (legacy name) to 'default'
		if (theme_name === 'style') theme_name = 'default';

		document.documentElement.setAttribute('data-theme', theme_name);
		set_cookie(theme_cookie_name, theme_name, theme_cookie_duration);
	};

	// IMMEDIATE EXECUTION
	// This runs before <body> is parsed, preventing flicker.
	var saved_theme = get_cookie(theme_cookie_name) || 'default';
	document.documentElement.setAttribute('data-theme', saved_theme);
})();
