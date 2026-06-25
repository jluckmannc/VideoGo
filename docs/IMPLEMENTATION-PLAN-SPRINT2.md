# 🚀 PLAN DE IMPLEMENTACIÓN — Sprint 2: Contactos Dinámicos + Historial SOS

**Fecha:** 25 de junio, 2026  
**Aprobado por:** Jaime (jluckmannc@gmail.com)  
**Status:** ⏳ IN PROGRESS

---

## 📋 RESUMEN EJECUTIVO

**Objetivo:** Completar VideoGo 2.0 (de 6/10 a 8-9/10 en QA score)

**Bloqueadores identificados:**
1. Contactos hardcodeados (no persistencia)
2. SOS sin historial (eventos desaparecen)
3. Sin data layer localStorage

**Solución:** Implementar localStorage CRUD + integración historial

**Timeline:** 5-6 horas engineer → completado hoy (2026-06-25)

**Aprobación:** ✅ Jaime dio luz verde 2026-06-25 13:15

---

## ✅ PUNTOS APROBADOS

Jaime aprobó explícitamente estos 5 puntos técnicos:

1. ✅ **Crear `06a-sos-contactos.html`** con CRUD completo
   - Listar contactos desde localStorage
   - Modal agregar contacto (nombre + teléfono)
   - Editar / Eliminar con confirmación
   - Persistir en localStorage

2. ✅ **localStorage con estructura JSON** (sin async)
   - Formato: `videogo_contacts`, `videogo_sos_events`, `videogo_recordings`
   - Validación mínima (teléfono regex)
   - Default hardcodeados si vacío

3. ✅ **Default contacts si localStorage vacío**
   - María García +34 123 456 789
   - Pedro López +34 987 654 321
   - Ana Martínez +34 555 666 777

4. ✅ **Integrar SOS events en 04-historial.html**
   - Sección "Eventos de Emergencia" separada
   - Badge rojo 🚨 con icono SOS
   - Click abre detalles (duración, contactos, timestamp)

5. ✅ **6 archivos JS + 1 pantalla nueva**
   - `js/storage.js` — helpers localStorage
   - `js/sos.js` — lógica activación/cancelación/restauración
   - `js/recorder.js` — timer grabación
   - `js/contacts.js` — CRUD contactos
   - `js/app.js` — inicialización
   - `screens/06a-sos-contactos.html` — pantalla nueva

---

## 📁 FICHEROS A CREAR / MODIFICAR

### CREAR (6 archivos nuevos)

```
js/storage.js                      [NEW]  localStorage helpers
js/sos.js                          [NEW]  SOS logic
js/recorder.js                     [NEW]  Timer simulation
js/contacts.js                     [NEW]  CRUD contacts
js/app.js                          [NEW]  App initialization
screens/06a-sos-contactos.html    [NEW]  Contact manager
```

### MODIFICAR (5 archivos existentes)

```
index.html                         [EDIT] Link js/ files
screens/06-configuracion.html      [EDIT] Link to 06a
screens/07-sos-confirmacion.html   [EDIT] Load contacts from storage
screens/08-sos-activo.html         [EDIT] Load contacts + save events
screens/04-historial.html          [EDIT] Add SOS events section
```

---

## 🔧 ARQUITECTURA TÉCNICA

### localStorage Schema

```javascript
{
  "videogo_contacts": [
    {
      "id": "contact_1",
      "name": "María García",
      "phone": "+34 123 456 789",
      "email": "maria@example.com",    // opcional
      "consent": true,
      "consent_date": "2026-06-25T00:00:00Z"
    },
    // ... más contactos
  ],
  
  "videogo_sos_events": [
    {
      "id": "sos_1",
      "startTime": "2026-06-25T14:36:00Z",
      "duration": 135,                 // segundos
      "contacts_notified": [1, 2, 3],  // IDs
      "recording_id": "rec_123",
      "location_mock": { "lat": 40.4168, "lng": -3.7038 },
      "status": "completed"            // "active" | "completed" | "cancelled"
    },
    // ... más eventos
  ],
  
  "videogo_recordings": [
    {
      "id": "rec_1",
      "startTime": "2026-06-25T14:00:00Z",
      "duration": 3600,                // segundos
      "segments": 5,
      "size": "1.2 GB"
    },
    // ... más grabaciones
  ],
  
  "videogo_current_recording": {
    "isRecording": false,
    "startTime": null,
    "segments": 0
  }
}
```

### JavaScript Modular

**storage.js** — CRUD localStorage
```javascript
const Storage = {
  // Contactos
  getContacts() { /* ... */ },
  setContact(contact) { /* ... */ },
  updateContact(id, data) { /* ... */ },
  deleteContact(id) { /* ... */ },
  
  // SOS Events
  addSOSEvent(event) { /* ... */ },
  getSOSEvents() { /* ... */ },
  
  // Recordings
  addRecording(recording) { /* ... */ },
  getRecordings() { /* ... */ },
}
```

**sos.js** — SOS logic
```javascript
const SOS = {
  activate(contacts) {
    // 1. Guardar en sessionStorage
    // 2. Navegar a 08-sos-activo
    // 3. Iniciar timer
  },
  
  cancel() {
    // 1. Confirmar "¿Realmente cancelar?"
    // 2. Guardar evento en localStorage
    // 3. Volver a grabación
  },
  
  restoreActive() {
    // Si hay SOS activo, restaurar pantalla
  }
}
```

**recorder.js** — Timer real
```javascript
const Recorder = {
  isRecording: false,
  startTime: null,
  
  start() { /* inicia timer */ },
  stop() { /* guarda grabación */ },
}
```

**app.js** — Inicialización
```javascript
function initApp() {
  // 1. Cargar defaults si localStorage vacío
  // 2. Restaurar SOS activo si existe
  // 3. Configurar event listeners
}
```

**contacts.js** — CRUD UI
```javascript
const Contacts = {
  render() { /* renderizar lista */ },
  addModal() { /* abrir modal */ },
  edit(id) { /* editar contacto */ },
  delete(id) { /* eliminar contacto */ }
}
```

---

## 📊 MATRIZ DE CAMBIOS

| Fichero | Tipo | Cambio | Por qué | Riesgo |
|---------|------|--------|--------|--------|
| index.html | EDIT | `<script src="js/app.js">` | Inicializar app | Bajo |
| 06-config | EDIT | Link a "06a-sos-contactos" | Acceso a contactos | Bajo |
| 07-sos-conf | EDIT | `Storage.getContacts()` | Contactos dinámicos | Medio |
| 08-sos-act | EDIT | `Storage.getContacts()` + `addSOSEvent()` | Persistencia | Medio |
| 04-historial | EDIT | Sección "Eventos SOS" | Integración | Medio |
| 06a-new | CREATE | CRUD contactos | Gestión dinámica | Bajo |
| js/* | CREATE | 6 archivos | Data layer | Bajo |

---

## ⚠️ RIESGOS IDENTIFICADOS

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|------------|--------|-----------|
| localStorage lleno (>5MB) | Baja | Medio | Limitar historial a últimas 50 grabaciones |
| Validación teléfono débil | Media | Bajo | Regex simple `^\+?[\d\s]{10,}` |
| Rutas hardcodeadas rompen | Baja | Alto | Usar pathnames consistentes en router |
| Hold 3s no funciona en touch | Baja | Medio | Ya implementado en 07 (touchstart/end) |
| Primer acceso: contactos vacíos | Alta | Bajo | Default hardcodeados automáticos |
| Refrescar durante SOS | Media | Medio | sessionStorage para recuperación |

---

## 🎯 CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Infraestructura (2-3h)

- [ ] Crear `js/storage.js` con getters/setters
- [ ] Crear `js/sos.js` con lógica de activación
- [ ] Crear `js/recorder.js` con timer real
- [ ] Crear `js/contacts.js` para CRUD UI
- [ ] Crear `js/app.js` para inicialización
- [ ] Default contacts en localStorage si vacío

### Fase 2: Pantalla de Contactos (1-2h)

- [ ] Crear `screens/06a-sos-contactos.html`
- [ ] Listar contactos (forEach desde Storage)
- [ ] Modal agregar contacto (form + validación)
- [ ] Editar contacto (reutilizar modal)
- [ ] Eliminar con confirmación
- [ ] Volver a configuración

### Fase 3: Integración (2-3h)

- [ ] Link en `index.html` → `js/app.js`
- [ ] Link en `06-configuracion.html` → `06a-sos-contactos.html`
- [ ] `07-sos-confirmacion.html` → `Storage.getContacts()`
- [ ] `08-sos-activo.html` → `Storage.getContacts()` + `SOS.activate()`
- [ ] `04-historial.html` → agregar sección "Eventos SOS"
- [ ] Guardar SOS event en localStorage cuando cancelado

### Fase 4: QA (1-2h)

- [ ] Agregar contacto → persiste (refresh)
- [ ] Editar contacto → actualiza (refresh)
- [ ] Eliminar contacto → remueve (refresh)
- [ ] SOS con contactos dinámicos funciona
- [ ] SOS event aparece en historial
- [ ] Click en SOS event → muestra detalles
- [ ] Flujo completo sin crashes

---

## 📈 IMPACTO ESPERADO

### Antes (Actual 6/10 QA Score)

❌ Contactos hardcodeados  
❌ SOS sin historial  
❌ Sin persistencia  
❌ App parece demo incompleta

### Después (Target 8-9/10 QA Score)

✅ Contactos dinámicos + localStorage  
✅ SOS events persisten en historial  
✅ App se siente completa  
✅ Listo para beta  

---

## 🚀 TIMELINE

| Fase | Horas | Inicio | Fin | Status |
|------|-------|--------|-----|--------|
| Infra | 2-3h | 14:30 | 17:00 | ⏳ |
| Contactos | 1-2h | 17:00 | 18:30 | ⏳ |
| Integración | 2-3h | 18:30 | 21:00 | ⏳ |
| QA | 1-2h | 21:00 | 22:30 | ⏳ |
| **TOTAL** | **5-6h** | | **22:30** | ✅ |

**Meta:** Completado antes de medianoche (2026-06-25 23:59)

---

## 📝 NOTAS IMPORTANTES

- **CLAUDE.md restricciones mantienen:**
  - ✅ HTML/CSS/JS vanilla (sin librerías)
  - ✅ localStorage (no backend real)
  - ✅ Sin APIs externas
  - ✅ Sin permisos Android reales

- **Monetización decisión (de CEO):**
  - Freemium clásico ($3.99 Pro, Free con watermark)
  - Justificación: Patrón ganador (DailyRoads 4.5M descargas)
  - No afecta esta implementación (badge en UI future)

- **Regresiones previstas: NINGUNA**
  - Todas las pantallas existentes mantienen función
  - Cambios son aditivos (+ localStorage, + contactos dinámicos)
  - No se reescribe código existente

---

## ✅ AUTORIZACIÓN FINAL

**Aprobado por:** Jaime (jluckmannc@gmail.com)  
**Fecha:** 25 de junio, 2026 — 13:15  
**Decisión:** ✅ ADELANTE CON IMPLEMENTACIÓN

**Puntos aprobados:** 5/5  
**Ficheros a crear:** 6 JS + 1 screen  
**Ficheros a editar:** 5 screens  
**Riesgos mitigados:** ✅  
**QA re-score esperado:** 8-9/10  

---

**Próximo paso:** Engineer inicia Fase 1 (infraestructura).  
**Seguimiento:** Ver `IMPLEMENTATION-TRACKING.md`

---

**Última actualización:** 2026-06-25 13:15  
**Responsable:** Engineer Agent (ab5aa0b927060f632)  
**Validación:** QA (a0fc60adde5c3d0de)
