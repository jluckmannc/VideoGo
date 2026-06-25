/**
 * App.js - Inicialización global de VideoGo
 * Runs on every page load, handles state restoration and global setup
 */

const App = {
  /**
   * Inicializar la aplicación
   */
  init() {
    // 1. Verificar localStorage (crear defaults si es necesario)
    this.ensureStorage();

    // 2. Restaurar estado de grabación si existe
    this.restoreRecorderState();

    // 3. Restaurar SOS activo si existe
    this.restoreSOSState();

    // 4. Setup global event listeners
    this.setupGlobalListeners();

    // 5. Update time in status bar
    this.updateStatusBar();
    setInterval(() => this.updateStatusBar(), 60000); // Actualizar cada minuto

    console.log('VideoGo initialized');
  },

  /**
   * Asegurar que localStorage tenga los datos básicos
   */
  ensureStorage() {
    if (!localStorage.getItem('videogo_contacts')) {
      Storage.setContacts(Storage.DEFAULT_CONTACTS);
    }
    if (!localStorage.getItem('videogo_recordings')) {
      Storage.setRecordings([]);
    }
    if (!localStorage.getItem('videogo_sos_events')) {
      localStorage.setItem('videogo_sos_events', JSON.stringify([]));
    }
    if (!localStorage.getItem('videogo_settings')) {
      Storage.setSettings({ theme: 'dark', notifications: true, location_sharing: true });
    }
  },

  /**
   * Restaurar estado de grabación desde sessionStorage
   */
  restoreRecorderState() {
    const current = Storage.getCurrentRecording();
    if (current && current.isRecording) {
      Recorder.restore();
    }
  },

  /**
   * Restaurar SOS activo si existe
   */
  restoreSOSState() {
    const activeEvent = SOS.restoreActive();
    if (activeEvent) {
      // Si estamos en pantalla diferente a 08-sos-activo, ir allá
      const currentPath = window.location.pathname;
      if (!currentPath.includes('08-sos-activo')) {
        window.location.href = 'screens/08-sos-activo.html';
      }
    }
  },

  /**
   * Setup global event listeners
   */
  setupGlobalListeners() {
    // Prevenir navegación accidental
    window.addEventListener('beforeunload', (e) => {
      if (Recorder.isRecording) {
        e.preventDefault();
        e.returnValue = 'Una grabación está en progreso. ¿Estás seguro?';
      }
    });
  },

  /**
   * Actualizar hora en status bar
   */
  updateStatusBar() {
    const timeEl = document.querySelector('.time');
    if (timeEl) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      timeEl.textContent = `${hours}:${minutes}`;
    }
  },

  /**
   * Función helper para navegar entre pantallas
   */
  navigate(screenPath) {
    window.location.href = screenPath;
  },

  /**
   * Reset completo para testing
   */
  reset() {
    localStorage.clear();
    sessionStorage.clear();
    Recorder.isRecording = false;
    Recorder.startTime = null;
    Recorder.pausedTime = 0;
    Recorder.segments = 1;
    console.log('App reset complete');
  }
};

// Inicializar cuando DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
