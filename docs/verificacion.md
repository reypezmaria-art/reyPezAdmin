# Verificación del prototipo

Fecha de revisión: 10 de octubre de 2026 (UTC). El navegador local muestra fechas en la zona horaria configurada en este Mac.

## Comprobaciones automatizadas

- `npm run build`: TypeScript y bundle de producción de Vite.
- `npm run typecheck`: sin errores.
- `npm test`: 4 pruebas del dominio, todas aprobadas. Cubren ID permanente tras edición/baja, alternancia de movimientos, rechazo de salida inicial y reloj anterior, empleado inactivo, reintento del mismo ID sin duplicado local, validación de formato y siguiente ID.

## Revisión en Chrome local del usuario

- Navegación real entre administrador, empleado y checador.
- Editado Ana Torres a “Ana Torres · Demo” y área “Bodega norte”. Guardado y recarga: nombre, área e ID RP-001 conservados.
- Alta de “Diego Prueba”, asignado RP-005; entrada inicial confirmada localmente.
- Marcaje de salida y nueva entrada de RP-001, confirmaciones locales visibles y selección limpiada después de cada movimiento.
- Vista de empleado refleja ambos nuevos movimientos, ID y datos editados.
- Reporte filtrado por RP-001: dos entradas, una salida, una persona. Fecha 2000-01-01: cero movimientos y estado vacío. Se verificó el evento de entrada del campo fecha.
- Responsive: escritorio normal, viewport solicitado 390×844 (ancho CSS 354 debido al zoom del navegador) y tableta 1024×1180 (ancho CSS 931). Sin desbordamiento global horizontal en las dimensiones comprobadas; tablas tienen desplazamiento propio. No es una prueba de hardware Android.
- Sin errores o advertencias de consola en la revisión final.
- Se restauró el viewport normal y se dejó abierta la pestaña del prototipo.

Las capturas JPEG están en `evidence/`. Son capturas de revisión y pueden mostrar distintos momentos de la demo. La aplicación mantiene las ediciones de prueba ficticias en el navegador de este Mac; “Restablecer demo” permite volver al inicio. El ZIP no incluye datos del navegador.

## Alcance pendiente

No se probó reinicio físico del Mac ni Android, apertura sin internet, PWA instalable, sincronización contra servidor ni accesibilidad exhaustiva. No hay garantías de durabilidad de localStorage. Estas pruebas y la arquitectura futura están en `arquitectura.md`. Las pruebas de deduplicación solo verifican la regla local; no prueban entrega distribuida.
