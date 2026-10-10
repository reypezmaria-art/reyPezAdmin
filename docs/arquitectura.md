# Propuesta futura: PWA local-first

Esto es una propuesta, **no capacidades implementadas**.

## Flujo propuesto

1. Instalar una PWA desde HTTPS en el Android de la bodega; service worker versionado precachea el shell y recursos estáticos. Permitir apertura sin red después de una instalación completa y verificada. No depender de fuentes o imágenes externas.
2. IndexedDB con transacciones guarda empleado mínimo y evento de marcaje junto con outbox antes de mostrar confirmación. Evento inmutable: `eventId` UUID, `employeeId` global estable, `deviceId`, tipo, hora local, zona horaria y versión de esquema. UUID del evento se genera una vez, se reutiliza en todos los reintentos.
3. Al iniciar o recuperar conectividad, enviar lotes de outbox con reintentos y backoff. `navigator.onLine` solo es una pista. No depender exclusivamente de Background Sync, cuyo soporte varía. Incluir botón explícito y estado verificable.
4. Servidor con restricción única por `eventId`, acuse durable y recepción idempotente. Un fallo después de aceptar pero antes del acuse obliga a reintentar el mismo ID sin insertar duplicados. Marcar como confirmado localmente únicamente después de acuse. No borrar la cola prematuramente.
5. Conciliar eventos de múltiples dispositivos, relojes incorrectos y entradas/salidas fuera de orden. Conservar auditoría, hora local y hora de recepción; presentar anomalías a administración. Una corrección debe ser un nuevo evento vinculado al original, con motivo y autorización, no una reescritura silenciosa.

Separar UI → casos de uso → repositorios (`EmployeeRepository`, `PunchRepository`, `Outbox`) → adaptadores IndexedDB/API. La interfaz actual de guardado de Store es solo un punto de partida; migrar a transacciones por entidad/evento. Backend por decidir: evaluar costos, operaciones, reglas de acceso, respaldo y capacidades idempotentes antes de elegir.

## Pruebas de aceptación pendientes

- Android real: modo avión, cierre forzado del navegador y reinicio del equipo; abrir y recuperar todos los marcajes.
- Cortar conexión en cada paso de envío/acuse, reintentar lotes y comprobar una fila por evento en servidor.
- Simular error de cuota, almacenamiento eliminado, migración de schema, actualización interrumpida del service worker y reloj atrasado.
- Dos dispositivos con la misma persona: orden, duplicados semánticos y conflictos visibles. Dos pestañas: transacciones y coordinación.
- Validar accesibilidad táctil, estabilidad con días de operación sin red, baterías y política de navegador administrado.
- Definir recuperación cuando Android borra almacenamiento: persistencia solicitada al navegador ayuda pero no equivale a garantía. Respaldo y monitoreo son necesarios.

## Preguntas para Mari y Allan

- ¿Qué empleados, áreas, turnos y sedes deben existir? ¿Qué ID visible se necesita, y quién puede asignarlo?
- ¿Identificación en entrada: PIN, tarjeta/QR o selección? Evitar que un ID visible se considere autenticación. ¿Qué controles contra marcajes de otra persona son adecuados?
- ¿Cómo se manejan descansos, turno nocturno, múltiples jornadas, olvidos y empleados inactivos? ¿Se permiten salidas sin entrada para conciliación?
- ¿Quién autoriza correcciones y cómo queda el historial de cambios? ¿Qué reportes y exportaciones necesita contaduría?
- ¿El empleado consulta solo su información? ¿Qué permisos tiene Mari y cuáles Allan? Roles del prototipo no son permisos reales.
- ¿Una o varias bodegas/dispositivos? ¿Cuánto tiempo pueden permanecer sin internet? ¿Qué volumen y retención se espera?
- ¿Qué zona horaria oficial, tolerancia de reloj y criterio de día laboral se usará? ¿Cómo resolver cambios de horario?
- ¿Administración de Android: instalación, bloqueo del dispositivo, respaldo, actualizaciones, pérdida/robo y soporte?
- ¿Qué necesidades financieras tienen prioridad? El módulo reservado debe definirse antes de programar cálculos.

## Criterios antes de operación real

Acordar privacidad, datos mínimos, retención, accesos reales, procedimientos y responsable de soporte. Validar la PWA con pruebas de desconexión y sincronización anteriores. Migrar desde datos ficticios con entorno separado. Ninguno de estos pasos exige escoger hoy un backend.
