# v416 — Menú centrado en Multijugador

Versión: `v416-menu-navigation1`. Base: v415-zafir-reading1, commit `305eef6580d77e56e7df5a73265cdff04ee30398`. Diseño y publicación aprobados por el usuario el 9 de noviembre de 2026.

El menú presenta Multijugador, Aventura y Torre, Ranking, Tienda y Configuración. Multijugador abre directamente las opciones existentes Clásico/Clasificatorio; se retiró la tarjeta ilustrada intermedia. El tutorial conserva sus funciones y queda accesible en la sala, sin interponerse al entrar.

Aventura y Torre abre dos tarjetas verticales en celulares. Torre conserva su marcado, ilustración y efectos. Aventura incorpora una única ilustración de Aren, libro y cristales: WebP de 960 × 640 px, 59.714 bytes (58,31 KiB). Los textos siguen siendo HTML traducible. Al cerrar el mapa se vuelve a las tarjetas; al cerrarlas se vuelve al menú.

Se mantienen cinco filas principales y su altura. Se reutilizan las franjas de fondo existentes y se actualizan sus identificadores en estilos y animación de entrada. El actualizador del antiguo botón simple de Aventura ya no reemplaza el contenido de la nueva tarjeta.

## Alcance

Cambios de presentación/navegación: `index.html`, `js/app.js`, `js/intro.js`, `css/styles.css`, `css/menu-navigation.css`, `css/menu-fantasy.css`, `css/menu-wallet.css`. Textos: tres catálogos `locales/*/menu.json` y fallback español generado. Recurso: `assets/images/ui/adventure-card-v1.webp`. Catálogo y versión/hashes: `js/resource-catalog.js`, `sw.js`. Verificación: `tests/versus-ui.test.cjs`, `tools/check-menu-reorganization.cjs`.

No hay cambios en economía, XP, combate, Supabase, progreso, permisos de Torre, Me gusta ni anuncios. No se instalaron migraciones. La lectura manual de Zafir, el teclado y la cinemática de victoria de v415 se verificaron sin modificaciones. No se publican recursos de diagnóstico privado, fuentes PNG ni propuestas de monetización.

## Pruebas

- 346/346 pruebas generales, sin fallos ni omitidas.
- 36 combinaciones de ancho 280/320/360/393, altura 480/640/852 y tres idiomas. Comparación con v415: el menú no aumentó de altura.
- Navegador con cinco entradas en orden, dos tarjetas verticales, mapa y regreso, selección Clásico/Clasificatorio, tutorial y arranque con Service Worker activo. Servicios externos bloqueados, sin cuentas o recompensas reales.
- Actualización exacta v415 → v416: botón disponible sin recarga previa, un clic, conservación de localStorage, sessionStorage, IndexedDB y cachés útiles; recarga offline satisfactoria.
- Manifiesto: 916 recursos. Verificación incremental adicional con recursos sin descargar de nuevo, imágenes/rangos de audio y reproducción offline satisfactoria.
- Marcado de la tarjeta original de Torre idéntico. Funciones del diálogo y teclado de v415 idénticas a su base aprobada.

## Respaldo y reversión

Los trece archivos de ejecución anteriores y sus huellas están en `.local-developer/releases/v416-menu/backup/` y `preflight.json`. La imagen anterior no se sobrescribe: el WebP de Aventura es un recurso nuevo. Para revertir, crear un nuevo commit que revierta únicamente esta entrega, asignar una versión PWA superior y regenerar/verificar el manifiesto. No resetear main, restaurar saldos o borrar almacenamiento, progreso, inventarios o cachés útiles.

## Android

Buscar actualizaciones y aplicar Actualizar ahora sin borrar datos. Verificar el orden de los cinco botones; entrar en Multijugador y comprobar las dos opciones existentes, luego volver. Abrir Aventura y Torre, comprobar las dos tarjetas, entrar al mapa y regresar. Probar Torre y el tutorial según la navegación habitual. Saldo/nivel deben seguir usando la cuenta real; esta entrega no crea saldos de prueba.

Los resultados finales de despliegue, huellas públicas y navegación publicada se registran en `.local-developer/releases/v416-menu/`. Los ensayos de navegador no sustituyen la aceptación en el teléfono Android real del usuario.
