# Rey Pez · Laboratorio de operación

**DEMOSTRACIÓN.** Proyecto React + TypeScript nuevo, independiente de la aplicación Rey Pez existente. Una base editable para que Mari y Allan exploren necesidades de administración, contaduría y finanzas. Solo contiene empleados y movimientos ficticios. No conecta servicios, autentica usuarios, calcula nómina ni impuestos. No se creó repositorio remoto ni se publicó.

## Instalar y abrir

Requiere Node.js 22 o posterior y npm. Desde esta carpeta:

```sh
npm ci
npm run dev -- --port 5173
```

Abrir http://127.0.0.1:5173. El servidor se limita a este Mac; esa URL no abre la aplicación desde un Android. Para retomar la vista compilada: `npm run build` y `npm run preview -- --port 4173`.

```sh
npm run typecheck
npm test
npm run build
```

## Explorar

- Administrador: resumen, agregar/editar empleados, cambiar área o estado activo, revisar marcajes, filtrar reporte por persona y fecha local. Finanzas es un espacio para definir necesidades.
- Empleado: selector de rol ficticio, identificador permanente y consulta del historial.
- Checador: selector de empleado activo, entrada/salida alternadas y confirmación de guardado. Se limpia la selección después de marcar para el siguiente empleado.
- Exportar datos demo descarga JSON. Restablecer demo, tras confirmación, vuelve a los ejemplos.
- Los IDs `RP-001` etc. permanecen después de editar o desactivar. El ID siguiente funciona solo en este almacenamiento; no es un identificador global ni credencial.
- Cambiar escenario solo cambia una etiqueta simulada. No corta la red, sube datos ni procesa una cola. Los registros de ejemplo muestran “Sincronizado · simulado”; los nuevos “Pendiente · local”.

## Persistencia implementada y sus límites

`localStorage`, clave exclusiva `rey-pez-laboratorio:v1`, guarda directorio y marcajes al modificar. La recarga y reapertura en el mismo navegador/origen conservan esos datos, mientras el navegador conserve su almacenamiento. El guardado fallido muestra aviso y mantiene cambios en memoria. Los datos no se transfieren entre navegadores, perfiles, puertos ni dispositivos. Almacenar en otro origen crea otra demo. Borrar datos del navegador, modo privado o políticas de almacenamiento pueden perderlos. No hay cifrado ni datos personales reales. Exportar es una copia manual; todavía no hay importación.

**No es una PWA offline.** No hay service worker ni caché de la aplicación, ni sincronización real. No se ha probado apertura sin internet ni reinicio de Android. No usar el prototipo como checador operativo. La deduplicación por ID se prueba solo en memoria; no demuestra sincronización con servidor. Varias pestañas pueden sobrescribir cambios: probar en una sola pestaña.

## Estructura editable

```text
src/main.tsx                 navegación entre las tres vistas y utilidades
src/views/Admin.tsx         módulos del portal de Mari
src/views/Employee.tsx      consulta de empleado
src/views/Kiosk.tsx         checador compartido
src/components/History.tsx  tabla compartida
src/domain/model.ts         tipos, datos ficticios y reglas locales
src/domain/useStore.ts      adaptador localStorage
src/styles.css              diseño responsive sin recursos externos
```

Vite sirve el proyecto; React maneja las vistas. Navegación hash permite recargar una vista directamente. El dominio no depende del backend, por lo que un adaptador futuro podrá reemplazar el almacenamiento. Las reglas bloquean doble entrada/salida e inactividad; esto es una decisión provisional, no una política laboral acordada. El reporte cuenta movimientos, no horas trabajadas. La hora usa el reloj local del dispositivo; ejemplos se generan unas horas antes de la sesión inicial.

## Decisiones abiertas y próximos pasos

Ver [Arquitectura y preguntas](docs/arquitectura.md). Primero revisar este prototipo juntos, acordar flujo real e identificación; después desarrollar y probar una PWA local-first en un Android real. Elegir backend después de esos acuerdos. No se compromete Firebase ni ningún proveedor.

Capturas y evidencia de validación: carpeta `evidence/` y [Verificación](docs/verificacion.md). El ZIP de entrega excluye dependencias, build, archivos privados y secretos.
