# VideoGo — Instrucciones para Claude Code

## Contexto del proyecto

VideoGo es un demo frontend de una app Android tipo dashcam para conductores.

La app permite simular:
- iniciar grabación,
- ver estado REC,
- contar tiempo de grabación,
- dividir grabaciones en segmentos,
- minimizar,
- marcar un momento importante,
- detener,
- revisar historial,
- acceder a ajustes.

Actualmente es un demo HTML/CSS/JS. No hay backend real, no hay grabación real, no hay APK nativa todavía.

## Objetivo actual

Diseñar e integrar visualmente el flujo de “Modo Emergencia / SOS”.

Este modo debe ser presentado como una función de seguridad con consentimiento, no como espionaje ni control remoto invasivo.

El usuario quiere simular que, en caso de emergencia:
- se avisa a contactos de confianza,
- se comparte ubicación,
- se puede hacer sonar una alarma en el teléfono,
- se muestra información del viaje/grabación,
- se ofrece una experiencia simple para cualquier rango etáreo.

## Restricciones importantes

- No implementar backend real.
- No implementar ubicación real todavía.
- No implementar permisos Android reales.
- No implementar acceso remoto real al celular.
- No implementar Firebase, Drive, Dropbox ni APIs externas.
- No usar librerías externas si no son necesarias.
- No reescribir todo el proyecto.
- No cambiar el estilo general actual.
- No romper las pantallas existentes.
- No borrar archivos.
- No hacer commits salvo que Jaime lo pida explícitamente.

## Cómo debes trabajar

Primero analiza. No edites de inmediato.

Antes de modificar archivos, entrega:
1. Qué entiendes del proyecto.
2. Qué archivos revisarás.
3. Qué pantallas nuevas propones.
4. Qué cambios visuales harías.
5. Qué riesgos ves.
6. Qué plan de implementación propones.

Espera aprobación antes de editar.

## Criterios de diseño

- UX minimalista.
- Botones grandes y claros.
- Lenguaje simple.
- Pensado para conductores.
- Evitar activaciones accidentales del SOS.
- Usar confirmación por mantener presionado, deslizar o cuenta regresiva.
- Priorizar sensación de seguridad, confianza y calma.
- El modo emergencia debe verse serio, no alarmista ni exagerado.

## Propuesta conceptual inicial

El flujo puede incluir:

1. Configuración de contactos de confianza.
2. Botón SOS discreto pero accesible.
3. Pantalla de confirmación: mantener presionado 3 segundos.
4. Estado “SOS activo”.
5. Mock de ubicación compartida.
6. Mock de alarma sonora.
7. Mock de contactos notificados.
8. Opción para cancelar emergencia.
9. Historial o registro del evento.

## Entregable esperado

Claude debe ayudar a diseñar las partes restantes del modo emergencia y luego, solo si se aprueba, integrarlas al demo frontend.