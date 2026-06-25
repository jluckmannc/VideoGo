/**
 * Storage.js - Gestión de localStorage para VideoGo
 * Handles contacts, recordings, SOS events, and current recording state
 */

const Storage = {
  // Default contacts si localStorage está vacío
  DEFAULT_CONTACTS: [
    { id: 'c_1', name: 'María García', phone: '+34 123 456 789', consent: true, consent_date: new Date().toISOString() },
    { id: 'c_2', name: 'Pedro López', phone: '+34 987 654 321', consent: true, consent_date: new Date().toISOString() },
    { id: 'c_3', name: 'Ana Martínez', phone: '+34 555 666 777', consent: true, consent_date: new Date().toISOString() }
  ],

  /**
   * CONTACTOS
   */
  getContacts() {
    const stored = localStorage.getItem('videogo_contacts');
    if (!stored) {
      this.setContacts(this.DEFAULT_CONTACTS);
      return this.DEFAULT_CONTACTS;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing contacts:', e);
      return this.DEFAULT_CONTACTS;
    }
  },

  setContacts(contacts) {
    localStorage.setItem('videogo_contacts', JSON.stringify(contacts));
  },

  addContact(name, phone) {
    const contacts = this.getContacts();
    const newContact = {
      id: 'c_' + Date.now(),
      name,
      phone,
      consent: true,
      consent_date: new Date().toISOString()
    };
    contacts.push(newContact);
    this.setContacts(contacts);
    return newContact;
  },

  updateContact(id, name, phone) {
    const contacts = this.getContacts();
    const idx = contacts.findIndex(c => c.id === id);
    if (idx !== -1) {
      contacts[idx].name = name;
      contacts[idx].phone = phone;
      this.setContacts(contacts);
      return contacts[idx];
    }
    return null;
  },

  deleteContact(id) {
    const contacts = this.getContacts();
    const filtered = contacts.filter(c => c.id !== id);
    this.setContacts(filtered);
  },

  /**
   * GRABACIONES
   */
  getRecordings() {
    const stored = localStorage.getItem('videogo_recordings');
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing recordings:', e);
      return [];
    }
  },

  addRecording(recording) {
    const recordings = this.getRecordings();
    const newRecording = {
      id: 'rec_' + Date.now(),
      startTime: recording.startTime || new Date().toISOString(),
      duration: recording.duration || 0,
      segments: recording.segments || 1,
      size: recording.size || '0 MB'
    };
    recordings.unshift(newRecording); // Agregar al inicio (más reciente primero)
    localStorage.setItem('videogo_recordings', JSON.stringify(recordings));
    return newRecording;
  },

  /**
   * EVENTOS SOS
   */
  getSOSEvents() {
    const stored = localStorage.getItem('videogo_sos_events');
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing SOS events:', e);
      return [];
    }
  },

  addSOSEvent(event) {
    const events = this.getSOSEvents();
    const newEvent = {
      id: 'sos_' + Date.now(),
      startTime: event.startTime || new Date().toISOString(),
      duration: event.duration || 0,
      contacts_notified: event.contacts_notified || [],
      recording_id: event.recording_id || null,
      location_mock: event.location_mock || { lat: 40.4168, lng: -3.7038 },
      status: event.status || 'active'
    };
    events.unshift(newEvent);
    localStorage.setItem('videogo_sos_events', JSON.stringify(events));
    return newEvent;
  },

  /**
   * GRABACIÓN ACTUAL (sessionStorage para estado temporal)
   */
  getCurrentRecording() {
    const stored = sessionStorage.getItem('videogo_current_recording');
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  },

  setCurrentRecording(recording) {
    if (recording) {
      sessionStorage.setItem('videogo_current_recording', JSON.stringify(recording));
    } else {
      sessionStorage.removeItem('videogo_current_recording');
    }
  },

  /**
   * ESTADO SOS ACTIVO (sessionStorage)
   */
  getActiveSOSEvent() {
    const stored = sessionStorage.getItem('videogo_active_sos');
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  },

  setActiveSOSEvent(event) {
    if (event) {
      sessionStorage.setItem('videogo_active_sos', JSON.stringify(event));
    } else {
      sessionStorage.removeItem('videogo_active_sos');
    }
  },

  /**
   * CONFIGURACIÓN
   */
  getSettings() {
    const stored = localStorage.getItem('videogo_settings');
    if (!stored) {
      const defaults = { theme: 'dark', notifications: true, location_sharing: true };
      this.setSettings(defaults);
      return defaults;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      return { theme: 'dark', notifications: true, location_sharing: true };
    }
  },

  setSettings(settings) {
    localStorage.setItem('videogo_settings', JSON.stringify(settings));
  }
};
