/**
 * UI.js - Utilidades para DOM updates y event listeners
 * Shared functions for UI interactions across screens
 */

const UI = {
  /**
   * Mostrar toast/snackbar
   */
  showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.85);
      color: white;
      padding: 12px 20px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 500;
      backdrop-filter: blur(8px);
      z-index: 1000;
      animation: slideUp 300ms ease-out;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideDown 300ms ease-out';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /**
   * Mostrar modal/diálogo
   */
  showModal(title, message, buttons = []) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(2px);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const dialog = document.createElement('div');
    dialog.style.cssText = `
      background: var(--surface);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
      padding: 24px;
      width: 85%;
      max-width: 280px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
      animation: slideUp 300ms cubic-bezier(0.2, 0, 0, 1);
    `;

    let html = `<h3 style="margin: 0 0 12px; font-size: 20px; font-weight: 700; color: var(--fg); font-family: var(--font-display)">${title}</h3>`;
    html += `<p style="margin: 0 0 20px; font-size: 14px; color: var(--muted); line-height: 1.5">${message}</p>`;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = 'display: flex; gap: 10px; width: 100%;';

    buttons.forEach(btn => {
      const button = document.createElement('button');
      button.textContent = btn.label;
      button.style.cssText = `
        flex: 1;
        padding: 12px;
        border-radius: var(--radius-lg);
        border: ${btn.variant === 'primary' ? 'none' : '1px solid var(--border)'};
        background: ${btn.variant === 'primary' ? 'var(--danger)' : 'transparent'};
        color: ${btn.variant === 'primary' ? 'white' : 'var(--fg)'};
        cursor: pointer;
        font-family: inherit;
        font-weight: 600;
        font-size: 14px;
        transition: all var(--motion-base) var(--ease-standard);
      `;
      button.addEventListener('mouseenter', () => {
        if (btn.variant !== 'primary') {
          button.style.background = 'rgba(255,255,255,0.04)';
        }
      });
      button.addEventListener('mouseleave', () => {
        if (btn.variant !== 'primary') {
          button.style.background = 'transparent';
        }
      });
      button.addEventListener('click', () => {
        if (btn.onClick) btn.onClick();
        overlay.remove();
      });
      buttonsContainer.appendChild(button);
    });

    dialog.appendChild(buttonsContainer);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.remove();
      }
    });

    return overlay;
  },

  /**
   * Mostrar diálogo de confirmación (reemplaza confirm() nativo)
   * Retorna una Promise que se resuelve con true/false
   */
  showConfirm(message) {
    return new Promise((resolve) => {
      this.showModal('Confirmación', message, [
        {
          label: 'Cancelar',
          variant: 'secondary',
          onClick: () => resolve(false)
        },
        {
          label: 'Confirmar',
          variant: 'primary',
          onClick: () => resolve(true)
        }
      ]);
    });
  },

  /**
   * Mostrar loading spinner
   */
  showLoading(show = true) {
    let spinner = document.getElementById('app-loading-spinner');
    if (!spinner) {
      spinner = document.createElement('div');
      spinner.id = 'app-loading-spinner';
      spinner.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        backdrop-filter: blur(2px);
      `;
      spinner.innerHTML = `
        <div style="
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255,255,255,0.2);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
      `;
      document.body.appendChild(spinner);
    }
    spinner.style.display = show ? 'flex' : 'none';
  },

  /**
   * Formatear tiempo HH:MM:SS
   */
  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hours, minutes, secs]
      .map(n => String(n).padStart(2, '0'))
      .join(':');
  },

  /**
   * Formatear fecha y hora
   */
  formatDateTime(isoString) {
    const date = new Date(isoString);
    const today = new Date();

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000).toDateString() === date.toDateString();

    let dateStr;
    if (isToday) {
      dateStr = 'Hoy';
    } else if (isYesterday) {
      dateStr = 'Ayer';
    } else {
      dateStr = date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    }

    const timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    return `${dateStr}, ${timeStr}`;
  },

  /**
   * Calcular tiempo relativo ("hace 5 minutos")
   */
  formatRelativeTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);

    if (diffSecs < 60) return 'hace unos segundos';
    const diffMins = Math.floor(diffSecs / 60);
    if (diffMins < 60) return `hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    const diffDays = Math.floor(diffHours / 24);
    return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
  },

  /**
   * Vibrar dispositivo (si soporta)
   */
  vibrate(pattern = 100) {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  },

  /**
   * Hacer focus en elemento
   */
  focus(selector) {
    const el = document.querySelector(selector);
    if (el) el.focus();
  },

  /**
   * Agregar clase con validación
   */
  addClass(selector, className) {
    const el = document.querySelector(selector);
    if (el) el.classList.add(className);
  },

  /**
   * Remover clase con validación
   */
  removeClass(selector, className) {
    const el = document.querySelector(selector);
    if (el) el.classList.remove(className);
  },

  /**
   * Toggle clase
   */
  toggleClass(selector, className) {
    const el = document.querySelector(selector);
    if (el) el.classList.toggle(className);
  }
};

// Agregar estilos globales para animaciones
if (!document.getElementById('ui-global-styles')) {
  const style = document.createElement('style');
  style.id = 'ui-global-styles';
  style.textContent = `
    @keyframes slideUp {
      from {
        transform: translateX(-50%) translateY(40px);
        opacity: 0;
      }
      to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
    }

    @keyframes slideDown {
      from {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
      to {
        transform: translateX(-50%) translateY(40px);
        opacity: 0;
      }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}
