/**
 * Contacts.js - UI para gestión de contactos SOS
 * Handles rendering, adding, editing, deleting contacts
 */

const Contacts = {
  /**
   * Renderizar lista de contactos en un contenedor
   */
  renderList(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const contacts = Storage.getContacts();
    const { editable = false, onDelete = null, onEdit = null } = options;

    container.innerHTML = '';

    if (contacts.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,0.5);margin:20px 0">Sin contactos aún</p>';
      return;
    }

    contacts.forEach(contact => {
      const contactEl = document.createElement('div');
      contactEl.className = 'contact-list-item';
      contactEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;flex:1">
          <div style="width:40px;height:40px;border-radius:50%;background:rgba(29,78,216,0.2);border:1.5px solid rgba(29,78,216,0.5);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;color:rgba(241,245,249,0.8)">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div style="min-width:0">
            <div style="font-size:14px;font-weight:500;color:rgba(241,245,249,0.9);margin:0">${escapeHtml(contact.name)}</div>
            <div style="font-size:12px;color:rgba(148,163,184,0.85);margin:0">${escapeHtml(contact.phone)}</div>
          </div>
        </div>
        ${editable ? `
          <div style="display:flex;gap:6px">
            <button class="contact-action-btn edit-btn" data-id="${contact.id}" title="Editar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="contact-action-btn delete-btn" data-id="${contact.id}" title="Eliminar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </button>
          </div>
        ` : ''}
      `;
      container.appendChild(contactEl);
    });

    if (editable) {
      container.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          const contact = contacts.find(c => c.id === id);
          if (onEdit) onEdit(contact);
        });
      });

      container.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = e.currentTarget.dataset.id;
          const confirmed = await UI.showConfirm('¿Eliminar este contacto?');
          if (confirmed) {
            Storage.deleteContact(id);
            this.renderList(containerId, options);
            if (onDelete) onDelete(id);
          }
        });
      });
    }
  },

  /**
   * Renderizar lista de contactos para confirmación SOS (read-only)
   */
  renderForConfirmation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const contacts = Storage.getContacts();
    container.innerHTML = '';

    contacts.forEach(contact => {
      const itemEl = document.createElement('div');
      itemEl.className = 'contact-item';
      itemEl.innerHTML = `
        <div class="contact-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <span>${escapeHtml(contact.name)}</span>
      `;
      container.appendChild(itemEl);
    });
  },

  /**
   * Renderizar lista para pantalla activa de SOS
   */
  renderForActiveEvent(containerId, sosEvent) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const contacts = Storage.getContacts();
    const notifiedIds = sosEvent.contacts_notified || [];

    container.innerHTML = '';

    contacts.forEach((contact, idx) => {
      const isNotified = notifiedIds.includes(contact.id);
      const itemEl = document.createElement('div');
      itemEl.className = 'contact-item';
      itemEl.innerHTML = `
        <div class="contact-status">
          <div class="contact-check" id="check${idx + 1}" style="display: ${isNotified ? 'flex' : 'none'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <span class="contact-name">${escapeHtml(contact.name)}</span>
        </div>
        <span class="contact-time" id="time${idx + 1}">hace 0s</span>
      `;
      container.appendChild(itemEl);
    });
  }
};

/**
 * Escape HTML para prevenir inyecciones
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
