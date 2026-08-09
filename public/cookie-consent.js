/**
 * SanityOps Cookie Consent — v1.0
 * Manages cookie consent banner, preferences modal, and conditional GA loading.
 */
(function () {
  'use strict';

  /* ── Configuration ─────────────────────────────────── */
  const STORAGE_KEY = 'sanityops-cookie-consent';
  const GA_ID = 'G-G89XCYRE5L';

  /* ── DOM utilities ──────────────────────────────────── */
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'className') { e.className = attrs[k]; }
        else if (k === 'innerHTML') { e.innerHTML = attrs[k]; }
        else if (k === 'textContent') { e.textContent = attrs[k]; }
        else if (k.startsWith('on')) { e.addEventListener(k.slice(2).toLowerCase(), attrs[k]); }
        else { e.setAttribute(k, attrs[k]); }
      });
    }
    if (children) {
      children.forEach(function (c) {
        if (typeof c === 'string') { e.appendChild(document.createTextNode(c)); }
        else if (c) { e.appendChild(c); }
      });
    }
    return e;
  }

  /* ── State ──────────────────────────────────────────── */
  function getConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setConsent(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        analytics: state.analytics,
        timestamp: Date.now(),
        version: 1
      }));
    } catch (e) {
      // storage full or unavailable — fail silently
    }
  }

  /* ── GA loading ─────────────────────────────────────── */
  function loadGA() {
    if (window._sanityops_ga_loaded) { return; }
    window._sanityops_ga_loaded = true;

    var gtagScript = document.createElement('script');
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    gtagScript.async = true;
    gtagScript.setAttribute('data-cookie-consent', 'analytics');
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function unloadGA() {
    // Remove GA cookies
    var gaCookies = ['_ga', '_gid', '_gat', '_ga_' + GA_ID.replace(/[^a-zA-Z0-9]/g, '_')];
    gaCookies.forEach(function (name) {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=' + location.hostname;
    });

    // Remove GA script tags
    var scripts = document.querySelectorAll('script[src*="googletagmanager"], script[data-cookie-consent="analytics"]');
    scripts.forEach(function (s) { s.remove(); });

    window._sanityops_ga_loaded = false;
  }

  /* ── Banner ─────────────────────────────────────────── */
  var bannerEl = null;

  function createBanner() {
    return el('div', { className: 'cc-banner', id: 'cc-banner' }, [
      el('div', { className: 'cc-banner__inner' }, [
        el('div', { className: 'cc-banner__content' }, [
          el('p', { className: 'cc-banner__title', textContent: 'Your Privacy Choices' }),
          el('p', { className: 'cc-banner__text', innerHTML:
            'We use strictly necessary cookies to operate our website and keep you signed in. ' +
            'With your consent, we also use analytics cookies (such as Google Analytics) to understand ' +
            'how our website is used and improve it. You can accept, reject, or manage your preferences ' +
            'at any time. For more information, please see our ' +
            '<a href="/legal/cookie-policy">Cookie Policy</a> and <a href="/legal/privacy-policy">Privacy Policy</a>.'
          })
        ]),
        el('div', { className: 'cc-banner__actions' }, [
          el('button', { className: 'cc-btn cc-btn--text', textContent: 'Manage Preferences', onClick: function () {
            openModal();
          }}),
          el('div', { className: 'cc-banner__actions-right' }, [
            el('button', { className: 'cc-btn cc-btn--secondary', textContent: 'Reject Non-Essential', onClick: function () {
              handleReject();
            }}),
            el('button', { className: 'cc-btn cc-btn--primary', textContent: 'Accept All', onClick: function () {
              handleAcceptAll();
            }})
          ])
        ])
      ])
    ]);
  }

  function showBanner() {
    if (!bannerEl) {
      bannerEl = createBanner();
      document.body.appendChild(bannerEl);
    }
    bannerEl.classList.add('is-visible');
  }

  function hideBanner() {
    if (bannerEl) {
      bannerEl.classList.remove('is-visible');
    }
  }

  /* ── Preferences Modal ──────────────────────────────── */
  var modalOverlayEl = null;
  var analyticsToggleEl = null;

  function createModal() {
    var currentConsent = getConsent();
    var analyticsOn = currentConsent ? currentConsent.analytics : false;

    analyticsToggleEl = el('input', {
      type: 'checkbox',
      id: 'cc-toggle-analytics',
      checked: analyticsOn
    });

    var modalEl = el('div', { className: 'cc-modal' }, [
      el('h2', { className: 'cc-modal__title', textContent: 'Cookie Preferences' }),
      el('p', { className: 'cc-modal__desc', textContent:
        'You can manage your cookie preferences below. Strictly necessary cookies are always active ' +
        'because they are required for the website to function.'
      }),

      // Category 1: Strictly Necessary
      el('div', { className: 'cc-category' }, [
        el('div', { className: 'cc-category__header' }, [
          el('h3', { className: 'cc-category__name', textContent: 'Strictly Necessary Cookies' }),
          el('span', { className: 'cc-category__status', textContent: 'Always Active' })
        ]),
        el('p', { className: 'cc-category__desc', textContent:
          'These cookies are required for essential website functions, including account login, ' +
          'session management, authentication, and security. They cannot be disabled through this tool.'
        })
      ]),

      // Category 2: Analytics
      el('div', { className: 'cc-category' }, [
        el('div', { className: 'cc-category__header' }, [
          el('h3', { className: 'cc-category__name', textContent: 'Analytics Cookies' }),
          el('label', { className: 'cc-toggle' }, [
            analyticsToggleEl,
            el('span', { className: 'cc-toggle__slider' })
          ])
        ]),
        el('p', { className: 'cc-category__desc', innerHTML:
          'These cookies help us understand how visitors use our website, such as which pages are visited ' +
          'and how users navigate the site. We use Google Analytics for this purpose. We use this information ' +
          'in aggregated form to improve our website and services. ' +
          '<a href="/legal/cookie-policy">Learn more in our Cookie Policy.</a>'
        })
      ]),

      el('div', { className: 'cc-modal__actions' }, [
        el('button', { className: 'cc-btn cc-btn--primary', textContent: 'Save Preferences', onClick: function () {
          handleSavePreferences();
        }}),
        el('button', { className: 'cc-btn cc-btn--primary', textContent: 'Accept All', onClick: function () {
          analyticsToggleEl.checked = true;
          handleSavePreferences();
        }}),
        el('button', { className: 'cc-btn cc-btn--secondary', textContent: 'Reject Non-Essential', onClick: function () {
          analyticsToggleEl.checked = false;
          handleSavePreferences();
        }})
      ])
    ]);

    modalOverlayEl = el('div', { className: 'cc-modal-overlay', id: 'cc-modal-overlay', onClick: function (e) {
      if (e.target === modalOverlayEl) {
        closeModal();
      }
    }}, [modalEl]);

    document.body.appendChild(modalOverlayEl);
  }

  function openModal() {
    if (!modalOverlayEl) {
      createModal();
    } else {
      // Sync toggle with current consent
      var consent = getConsent();
      if (analyticsToggleEl) {
        analyticsToggleEl.checked = consent ? consent.analytics : false;
      }
    }
    modalOverlayEl.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modalOverlayEl) {
      modalOverlayEl.classList.remove('is-visible');
      document.body.style.overflow = '';
    }
  }

  /* ── Handlers ───────────────────────────────────────── */
  function handleAcceptAll() {
    setConsent({ analytics: true });
    hideBanner();
    loadGA();
  }

  function handleReject() {
    setConsent({ analytics: false });
    hideBanner();
  }

  function handleSavePreferences() {
    var analyticsOn = analyticsToggleEl ? analyticsToggleEl.checked : false;
    setConsent({ analytics: analyticsOn });
    closeModal();
    hideBanner();

    if (analyticsOn) {
      loadGA();
    } else {
      unloadGA();
    }
  }

  /* ── Footer link binding (event delegation) ─────────── */
  function bindFooterLink() {
    document.addEventListener('click', function (e) {
      if (e.target.id === 'cc-footer-preferences' || e.target.closest('#cc-footer-preferences')) {
        e.preventDefault();
        openModal();
      }
    });
  }

  /* ── Init ───────────────────────────────────────────── */
  function init() {
    var consent = getConsent();

    if (!consent) {
      showBanner();
    } else if (consent.analytics) {
      loadGA();
    }

    bindFooterLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
