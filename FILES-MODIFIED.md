# VideoGo 2.0 - Fase 1: Archivos Modificados/Creados

## NUEVOS (7 archivos)

### JavaScript (6 módulos)
```
js/storage.js           [NEW] 5.0 KB  - localStorage management
js/sos.js               [NEW] 2.2 KB  - SOS activation/cancellation logic
js/recorder.js          [NEW] 4.0 KB  - Recording simulation with timer
js/contacts.js          [NEW] 5.6 KB  - Contact UI rendering
js/ui.js                [NEW] 7.5 KB  - Shared UI utilities
js/app.js               [NEW] 3.1 KB  - Global app initialization
```

### Pantalla
```
screens/06a-sos-contactos.html  [NEW] 8.2 KB - Contact CRUD (add/edit/delete)
```

## MODIFICADOS (4 archivos)

### index.html
```diff
+ <script src="js/storage.js"></script>
+ <script src="js/sos.js"></script>
+ <script src="js/recorder.js"></script>
+ <script src="js/contacts.js"></script>
+ <script src="js/ui.js"></script>
+ <script src="js/app.js"></script>
```
- Integración de Recorder.start()/stop()/markSegment()
- Callback para actualizar timer en tiempo real

### screens/06-configuracion.html
```diff
- <button>+ Agregar contacto</button>
+ <button onclick="window.location.href='06a-sos-contactos.html'">Editar contactos</button>
```

### screens/07-sos-confirmacion.html
```diff
+ <script src="../js/storage.js"></script>
+ <script src="../js/sos.js"></script>
+ <script src="../js/contacts.js"></script>
+ <script src="../js/ui.js"></script>
+ <script src="../js/app.js"></script>
```
- Lista de contactos ahora dinámica (desde localStorage)
- `SOS.activate()` llamado en confirmación

### screens/08-sos-activo.html
```diff
+ <script src="../js/storage.js"></script>
+ <script src="../js/sos.js"></script>
+ <script src="../js/contacts.js"></script>
+ <script src="../js/ui.js"></script>
+ <script src="../js/app.js"></script>
```
- Contactos cargados desde `SOS.getActiveEvent()`
- Panel dinámico en lugar de hardcodeado
- Timers reales desde startTime del evento
- `SOS.cancel()` en confirmación de cancelación

## NO MODIFICADOS (5 pantallas)

```
screens/01-inicio.html          - No cambios
screens/02-grabacion.html       - No cambios
screens/03-flotante.html        - No cambios
screens/04-historial.html       - No cambios
screens/05-detalle.html         - No cambios
```

## TOTAL LÍNEAS DE CÓDIGO

```
storage.js          150 líneas
sos.js               63 líneas
recorder.js         155 líneas
contacts.js          93 líneas
ui.js               185 líneas
app.js               98 líneas
06a-sos-contactos   ~200 líneas (HTML/CSS/JS)
                    ─────────────
TOTAL (Fase 1)      ~944 líneas (código nuevo)

Integraciones        ~120 líneas (modificadas)
```

## localStorage Schema

```javascript
// Contactos (default 3 si vacío)
videogo_contacts = [
  { id: "c_1", name: "María García", phone: "+34...", consent: true, consent_date: "..." }
]

// Grabaciones
videogo_recordings = [
  { id: "rec_1", startTime: "ISO", duration: 3600, segments: 1, size: "1.5 GB" }
]

// Eventos SOS
videogo_sos_events = [
  { id: "sos_1", startTime: "ISO", duration: 125, contacts_notified: ["c_1"], status: "completed" }
]

// Configuración
videogo_settings = { theme: "dark", notifications: true, location_sharing: true }

// Estado temporal (sessionStorage)
videogo_current_recording = { isRecording: true, startTime: ms, segments: 1 }
videogo_active_sos = { id: "sos_1", startTime: "ISO", status: "active" }
```

## Flujo SOS Completo

```
index.html (grabando)
  ↓ [Click SOS]
screens/07-sos-confirmacion.html
  ↓ [Hold 3s]
  ↓ SOS.activate() → crea evento SOS
screens/08-sos-activo.html
  ↓ [Click Cancelar]
  ↓ SOS.cancel() → actualiza evento
screens/04-historial.html
  ↓ [Ver evento SOS]
screens/05-detalle.html (o similar)
```

## Próximas Fases

- Fase 2: QA manual + refinamientos
- Fase 3: Historial dinámico desde localStorage
- Fase 4: Detalles SOS en pantalla 05

