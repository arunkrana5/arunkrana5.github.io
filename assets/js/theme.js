/**
 * ARUN KUMAR RANA - THEME MANAGER
 * Handles Light/Dark Theme switching with localStorage persistence
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'akr_portfolio_theme';
  const THEME_TOGGLE_BTN = '#themeToggle';

  // Get initial theme preference
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  // Apply theme to <html> tag
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleIcon(theme);
  }

  // Update theme toggle icon
  function updateToggleIcon(theme) {
    const toggleBtn = document.querySelector(THEME_TOGGLE_BTN);
    if (!toggleBtn) return;

    if (theme === 'light') {
      toggleBtn.innerHTML = '<i class="icon-moon" aria-hidden="true"></i>';
      toggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
      toggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      toggleBtn.innerHTML = '<i class="icon-sun" aria-hidden="true"></i>';
      toggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
      toggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
  }

  // Initialize theme on DOM load
  document.addEventListener('DOMContentLoaded', function () {
    const currentTheme = getPreferredTheme();
    applyTheme(currentTheme);

    const toggleBtn = document.querySelector(THEME_TOGGLE_BTN);
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = activeTheme === 'light' ? 'dark' : 'light';
        applyTheme(nextTheme);
      });
    }
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
