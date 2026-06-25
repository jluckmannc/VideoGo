/**
 * SOS.js - Gestión del modo emergencia
 * Handles activation, cancellation, and state restoration
 */

const SOS = {
  /**
   * Activar modo emergencia
   * Crea evento SOS, guarda contactos notificados, persiste en sessionStorage
   */
  activate(selectedContactIds = []) {
    const contacts = Storage.getContacts();
    const notifiedContactIds = selectedContactIds.length > 0 ? selectedContactIds : contacts.map(c => c.id);

    const sosEvent = {
      startTime: new Date().toISOString(),
      duration: 0,
      contacts_notified: notifiedContactIds,
      recording_id: null,
      location_mock: { lat: 40.4168, lng: -3.7038 },
      status: 'active'
    };

    const activeEvent = Storage.addSOSEvent(sosEvent);
    Storage.setActiveSOSEvent(activeEvent);

    return activeEvent;
  },

  /**
   * Cancelar modo emergencia
   * Actualiza estado en historial, limpia sessionStorage
   */
  cancel() {
    const activeEvent = Storage.getActiveSOSEvent();
    if (activeEvent) {
      const events = Storage.getSOSEvents();
      const idx = events.findIndex(e => e.id === activeEvent.id);
      if (idx !== -1) {
        // Calcular duración real
        const start = new Date(activeEvent.startTime);
        const end = new Date();
        events[idx].duration = Math.floor((end - start) / 1000);
        events[idx].status = 'completed';
        localStorage.setItem('videogo_sos_events', JSON.stringify(events));
      }
    }
    Storage.setActiveSOSEvent(null);
  },

  /**
   * Restaurar SOS activo si app se recarga mientras está activo
   */
  restoreActive() {
    const activeEvent = Storage.getActiveSOSEvent();
    if (activeEvent && activeEvent.status === 'active') {
      return activeEvent;
    }
    return null;
  },

  /**
   * Obtener lista de contactos notificados
   */
  getNotifiedContacts(sosEventId) {
    const events = Storage.getSOSEvents();
    const event = events.find(e => e.id === sosEventId);
    if (!event) return [];

    const contacts = Storage.getContacts();
    return contacts.filter(c => event.contacts_notified.includes(c.id));
  },

  /**
   * Obtener evento activo actual
   */
  getActiveEvent() {
    return Storage.getActiveSOSEvent();
  }
};
