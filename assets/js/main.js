/**
 * ARUN KUMAR RANA - MAIN APPLICATION CONTROLLER
 * Handles Navigation, Intersection Observers, Mobile Menu, Contact Form
 */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('#mobileMenuBtn');
  const navMenu = document.querySelector('#navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      const isExpanded = navMenu.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      mobileMenuBtn.innerHTML = isExpanded ? '✕' : '☰';
    });

    // Close mobile menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '☰';
      });
    });
  }

  // 2. Active Section Spy using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // 3. Back to Top Button
  const backToTopBtn = document.querySelector('#backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Contact Form Handler (Simulated Client-Side Send)
  const contactForm = document.querySelector('#contactForm');
  const formStatus = document.querySelector('#formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.querySelector('#contactName').value.trim();
      const email = document.querySelector('#contactEmail').value.trim();
      const message = document.querySelector('#contactMessage').value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill out all required fields.';
        formStatus.className = 'form-status';
        formStatus.style.display = 'block';
        formStatus.style.color = 'var(--accent-amber)';
        return;
      }

      // Display success response UI
      formStatus.textContent = 'Thank you, ' + name + '! Your message has been recorded. I will get back to you shortly.';
      formStatus.className = 'form-status success';
      contactForm.reset();

      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 6000);
    });
  }
});
