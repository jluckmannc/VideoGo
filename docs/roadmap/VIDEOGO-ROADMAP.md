# 🚗 VideoGo - Roadmap de Desarrollo

## Estado Actual (Sprint 1 ✅)

**Modo Emergencia / SOS - Implementado**
- ✅ Botón SOS en controles de grabación
- ✅ Pantalla de confirmación con 3-segundo hold
- ✅ Pantalla de emergencia activa (contactos, ubicación simulada, alarma)
- ✅ Animaciones y feedback visual
- ✅ Integración con pantalla principal

**Limitaciones documentadas:**
- Demo-only (sin backend)
- Contactos hardcodeados
- Sin persistencia de estado
- Sin especificaciones de integración

---

## 📋 Sprint 2: Gestión de Contactos + Robustez

### 2.1 Gestión de Contactos de Confianza

**Qué es:**
Nueva sección en Ajustes donde usuarios pueden ver, agregar, editar y eliminar contactos que recibirán notificaciones en emergencias.

**Por qué importa:**
Hoy los contactos están hardcodeados. Usuarios no pueden:
- Verificar quién será notificado
- Cambiar la lista según el viaje
- Agregar contactos nuevos
- Confirmar consentimiento

**Tareas:**
- [ ] Nueva pantalla: `screens/06a-ajustes-sos-contactos.html`
  - Lista de contactos con nombre + teléfono
  - Botón "Agregar contacto"
  - Botón "Editar" por contacto (eliminar, cambiar número)
  - Verificación: "Este contacto consintió ser notificado en emergencias"
  
- [ ] Modal de agregar contacto
  - Campos: Nombre, Teléfono, Email (opcional)
  - Botón "Confirmar"
  
- [ ] Integración con SOS
  - Antes de confirmar SOS: mostrar lista actual
  - Opción de agregar/quitar rápidamente desde confirmación
  
- [ ] Almacenamiento local
  - Guardar contactos en `localStorage`
  - Recuperar al abrir la app

**Prototipo (ASCII):**
```
┌─────────────────────────┐
│ Ajustes > SOS Contactos │
├─────────────────────────┤
│ María García            │ ✎ ✕
│ +34 123 456 789         │
│ ✓ Consentimiento dado   │
├─────────────────────────┤
│ Pedro López             │ ✎ ✕
│ +34 987 654 321         │
│ ✓ Consentimiento dado   │
├─────────────────────────┤
│ + Agregar contacto      │
└─────────────────────────┘
```

---

### 2.2 Botón Cancelar SOS Accesible

**Qué es:**
Mejorar accesibilidad del botón "Cancelar SOS" en pantalla activa.

**Por qué importa:**
Hoy el botón está al final de contenido desplazable. En pánico, usuario no lo ve.

**Tareas:**
- [ ] Mover botón a flotante (bottom-right)
  - Rojo semitransparente
  - Siempre visible, no se oculta al desplazar
  - Hover: cambiar opacidad
  
- [ ] Agregar gesto de escape
  - Swipe hacia abajo (en móvil) = cancelar
  - O: tecla ESC (en desktop)
  
- [ ] Diálogo de confirmación
  - "¿Realmente cancelar emergencia?"
  - "Sí, cancelar" / "No, volver"

**CSS Update (08-sos-activo.html):**
```css
.cancel-sos-btn-floating {
  position: fixed;
  bottom: 60px;
  right: 20px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--danger);
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cancel-sos-btn-floating:hover {
  opacity: 0.9;
  transform: scale(1.05);
}
```

---

### 2.3 Persistencia de Estado SOS

**Qué es:**
Si el usuario minimiza o cierra la app durante SOS, el estado se preserva.

**Por qué importa:**
Si SOS se pierde, contactos no saben si sigue siendo emergencia.

**Tareas:**
- [ ] Guardar estado en `sessionStorage`
  - Timestamp de activación
  - Lista de contactos notificados
  - ID de sesión de grabación
  
- [ ] Recuperación al volver a la app
  - Si app se abre y hay SOS activo: volver a 08-sos-activo.html
  - Continuar contando tiempo desde antes
  
- [ ] Badge visual en Home
  - Ícono rojo pulsante en navbar si hay SOS activo
  - "Emergencia activa" en status bar

**Ejemplo (JavaScript):**
```javascript
// Activar SOS
function activateSOS(contacts) {
  const sosData = {
    id: Date.now(),
    contacts: contacts,
    startTime: new Date(),
    status: 'active'
  };
  sessionStorage.setItem('videogo_sos_active', JSON.stringify(sosData));
}

// Al cargar app
function checkActiveSOS() {
  const sosData = sessionStorage.getItem('videogo_sos_active');
  if (sosData) {
    const sos = JSON.parse(sosData);
    if (sos.status === 'active') {
      window.location.href = 'screens/08-sos-activo.html';
    }
  }
}
```

---

## 🔌 Sprint 3: Integración Backend (Futuro)

### 3.1 API Specification

**Endpoint: POST /api/v1/emergency/activate**

```json
Request:
{
  "userId": "user_12345",
  "contactIds": [101, 102, 103],
  "location": {
    "latitude": 40.4168,
    "longitude": -3.7038,
    "accuracy": 15
  },
  "recordingSessionId": "rec_abc123",
  "timestamp": "2026-06-24T14:36:00Z"
}

Response:
{
  "sosId": "sos_xyz789",
  "status": "active",
  "notificationStatuses": [
    {
      "contactId": 101,
      "name": "María García",
      "method": "sms",
      "status": "sent",
      "timestamp": "2026-06-24T14:36:02Z"
    }
  ],
  "recordingUploadUrl": "https://...",
  "emergencyDispatcherId": "disp_456"
}
```

---

### 3.2 Real Location Integration

- [ ] Request geolocation permission (Android)
- [ ] Real-time location updates every 10 seconds
- [ ] Location history timeline
- [ ] Accuracy indicator

---

### 3.3 Real Notifications

- [ ] SMS integration (Twilio / AWS SNS)
- [ ] Push notifications (Firebase Cloud Messaging)
- [ ] WhatsApp integration (optional)
- [ ] Delivery status tracking

---

### 3.4 Recording Upload

- [ ] Stream video to cloud storage (AWS S3 / Google Cloud)
- [ ] Encryption in transit
- [ ] Metadata (location, duration, contacts notified)

---

### 3.5 Police/Emergency Dispatch Integration

- [ ] Connect with regional emergency services
- [ ] Automatic dispatch if SOS > 30 seconds
- [ ] Real-time communication channel
- [ ] Estimated arrival time for responders

---

## 🎯 Prioridades

| Sprint | Función | Impacto | Esfuerzo | Status |
|--------|---------|--------|---------|--------|
| 1 | SOS básico | Alto | Bajo | ✅ Done |
| 2 | Contactos dinámicos | Alto | Medio | ⏳ Next |
| 2 | Botón flotante | Medio | Bajo | ⏳ Next |
| 2 | Persistencia | Medio | Bajo | ⏳ Next |
| 3 | Backend real | Alto | Alto | 📅 Future |
| 3 | Geolocalización real | Alto | Alto | 📅 Future |
| 3 | Notificaciones reales | Alto | Alto | 📅 Future |

---

## 📝 Notas Técnicas

### localStorage vs sessionStorage
- **sessionStorage:** Persiste solo durante la sesión del navegador (si cierra = se borra)
- **localStorage:** Persiste incluso después de cerrar navegador
- **Para SOS:** Usar `sessionStorage` (no queremos SOS fantasma semanas después)

### Animaciones
Las animaciones actuales son buenas:
- Pulso en header (no irritante)
- Checkmarks cascade (0ms, 200ms, 400ms)
- Wave expand en botón alarma

Mantener este tono = serio, no alarmista.

### Accesibilidad
- [ ] Botones con aria-labels
- [ ] Contraste de colores (WCAG AA mínimo)
- [ ] Navegación por teclado
- [ ] Compatibilidad con lectores de pantalla

---

## 🔗 Referencias

- Spec original: `CLAUDE.md`
- Ideación: `.claudecommands/idear-emergencia.md`
- Implementación Sprint 1: branch `claude/emergency-mode`
- Tickets: (usar GitHub Issues o Linear cuando esté disponible)

---

**Última actualización:** 24 de junio de 2026
**Próxima revisión:** Después de Sprint 2
