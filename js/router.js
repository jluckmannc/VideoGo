/**
 * Router.js - Client-side navigation without URL changes
 * Handles screen navigation, dynamic loading, and state management
 */

const Router = {
  currentScreen: 'home',
  screens: {},
  isLoading: false,

  /**
   * Initialize router on page load
   */
  init() {
    // Create screens container if doesn't exist
    let container = document.getElementById('screens-container');
    if (!container) {
      const cameraArea = document.querySelector('.camera-area');
      if (cameraArea) {
        container = document.createElement('div');
        container.id = 'screens-container';
        container.style.position = 'absolute';
        container.style.inset = '0';
        container.style.zIndex = '50';
        container.style.display = 'none';
        cameraArea.appendChild(container);
      }
    }

    // Setup navigation event listeners
    this.setupNavigationListeners();

    // Restore current screen if exists
    this.restoreScreen();

    console.log('Router initialized');
  },

  /**
   * Navigate to a screen
   */
  go(screenName, options = {}) {
    if (this.isLoading) return;

    this.isLoading = true;

    // Save current screen
    sessionStorage.setItem('videogo_current_screen', screenName);
    this.currentScreen = screenName;

    // Load screen content
    this.loadScreen(screenName).then(() => {
      this.isLoading = false;

      // Update visibility
      const homeView = document.querySelector('.phone');
      const container = document.getElementById('screens-container');

      if (screenName === 'home') {
        if (container) container.style.display = 'none';
        homeView.style.display = 'flex';
      } else {
        homeView.style.display = 'none';
        if (container) container.style.display = 'flex';
      }

      // Re-setup navigation listeners in new screen
      this.setupNavigationListeners();

      // Trigger custom event
      window.dispatchEvent(new CustomEvent('routerNavigated', { detail: { screen: screenName } }));
    }).catch(err => {
      console.error('Navigation failed:', err);
      this.isLoading = false;
    });
  },

  /**
   * Load screen HTML content
   */
  async loadScreen(screenName) {
    const container = document.getElementById('screens-container');
    if (!container) return;

    // Map screen names to files
    const screenMap = {
      'flotante': 'screens/03-flotante.html',
      'sos-confirmacion': 'screens/07-sos-confirmacion.html',
      'sos-activo': 'screens/08-sos-activo.html',
      'sos-contactos': 'screens/06a-sos-contactos.html',
      'historial': 'screens/04-historial.html',
      'configuracion': 'screens/06-configuracion.html'
    };

    const screenPath = screenMap[screenName];
    if (!screenPath) {
      console.warn(`Screen not found: ${screenName}`);
      return;
    }

    try {
      const response = await fetch(screenPath);
      if (!response.ok) throw new Error(`Failed to load ${screenPath}`);

      const html = await response.text();

      // Create section wrapper
      const section = document.createElement('section');
      section.id = `screen-${screenName}`;
      section.className = 'router-screen';
      section.innerHTML = html;

      // Clear previous screens
      container.innerHTML = '';
      container.appendChild(section);

      // Execute any scripts in the loaded content
      const scripts = section.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
      });

      this.screens[screenName] = section;
    } catch (err) {
      console.error(`Error loading screen ${screenName}:`, err);
      container.innerHTML = `<div style="padding:20px;color:#ff6b6b">Error loading screen. <a href="#" onclick="Router.go('home')">Go back</a></div>`;
    }
  },

  /**
   * Setup navigation listeners for current screen
   */
  setupNavigationListeners() {
    // Bottom nav buttons
    const navItems = document.querySelectorAll('.bottom-nav-item');
    navItems.forEach((item, idx) => {
      item.onclick = (e) => {
        e.preventDefault();
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Navigate based on index
        switch(idx) {
          case 0: this.go('home'); break;
          case 1: this.go('historial'); break;
          case 2: this.go('configuracion'); break;
        }
      };
    });

    // SOS button in recording controls
    const sosButton = document.querySelector('.rec-actions .ctrl-btn:nth-child(3)');
    if (sosButton) {
      sosButton.onclick = (e) => {
        e.preventDefault();
        this.go('sos-confirmacion');
      };
    }

    // Configuracion screen links
    const sosContactsLink = document.querySelector('[data-route="sos-contactos"]');
    if (sosContactsLink) {
      sosContactsLink.onclick = (e) => {
        e.preventDefault();
        this.go('sos-contactos');
      };
    }

    // Back buttons (generic)
    const backButtons = document.querySelectorAll('[data-route-back]');
    backButtons.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        this.go('home');
      };
    });

    // Cancel SOS button
    const cancelSosBtn = document.querySelector('.cancel-sos-btn-floating, [data-route-cancel-sos]');
    if (cancelSosBtn) {
      cancelSosBtn.onclick = (e) => {
        e.preventDefault();
        this.go('home');
      };
    }
  },

  /**
   * Restore screen from session if exists
   */
  restoreScreen() {
    const savedScreen = sessionStorage.getItem('videogo_current_screen');
    if (savedScreen && savedScreen !== 'home') {
      this.go(savedScreen);
    }
  }
};

// Initialize router when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Router.init());
} else {
  Router.init();
}
