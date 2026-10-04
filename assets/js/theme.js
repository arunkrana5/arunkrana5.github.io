/**
 * ARUN KUMAR RANA - THEME MANAGER
 * Handles Light/Dark Theme switching with localStorage persistence & crisp icon rendering
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'akr_portfolio_theme';
  const THEME_TOGGLE_BTN = '#themeToggle';

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    const toggleBtn = document.querySelector(THEME_TOGGLE_BTN);
    if (!toggleBtn) return;

    if (theme === 'light') {
      toggleBtn.innerHTML = '🌙';
      toggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
      toggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      toggleBtn.innerHTML = '☀️';
      toggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
      toggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
  }

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

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
