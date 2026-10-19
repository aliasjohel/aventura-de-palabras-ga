# v370 — descarga completa por mundo (preparada localmente)

Fecha: 19 de octubre de 2026. Validación previa a la publicación autorizada.

## Cambios

- Preparación del mundo completo antes del prólogo y antes de entrar en sus misiones.
- Pantalla de descarga con progreso, porcentaje y MB guardados sobre el total del paquete. Avanza al completar cada archivo verificado; incluye los archivos ya guardados al reanudar.
- Reutilización de los archivos persistidos por el service worker, sin descargarlos otra vez. Los archivos incompletos no se consideran disponibles offline.
- Una preparación por mundo durante la sesión de juego, evitando revisar cientos de archivos entre palabras. Se comprueba de nuevo al volver a la aplicación o recargarla para detectar archivos eliminados del almacenamiento.
- Inclusión de prólogo, poses y finales de combate del reparto de cada mundo. En el bosque también se incluye la transición al mundo 2.
- Corrección de `mural-dragon1.mp3`: el filtro anterior excluía este audio del mundo 1.
- Presentación de misión al repetir desde el mapa.
- La entrada al mundo 4 espera su descarga antes de reproducir la introducción.
- Se solicita almacenamiento persistente cuando el navegador lo permite. El sistema o el usuario pueden borrar datos del sitio; no es posible garantizar conservación absoluta.

## Validación

- 206/206 pruebas automáticas aprobadas.
- `node tools/build-cache-manifest.cjs --check`: correcto.
- `node tools/prepare-progressive-assets.cjs --check`: correcto.
- `node tools/check-incremental-update.cjs`: migración, actualización incremental, aislamiento de versiones y audio offline correctos.
- `node tools/check-progressive-install.cjs`: instalación nueva, recuperación tras interrupción, imágenes y audio offline, tres idiomas y conservación de datos ficticios correctos.
- `node tools/check-world-download.cjs`: Edge real con almacenamiento nuevo; descarga del bosque, recarga sin conexión y nueva preparación sin solicitudes al servidor. Música del mural reproducida offline (`readyState=4`). Progreso visible revisado en viewport de 390 × 844.
- Paquete del bosque: 187 archivos, 321.066.384 bytes (321,1 MB decimales). Los recursos compartidos ya presentes cuentan como guardados y no se descargan otra vez.
- `ALL_WORLDS=1 node tools/check-world-download.cjs`: los cinco paquetes se descargaron y se comprobaron tras recargar sin conexión, sin nuevas solicitudes de descarga y conservando los datos ficticios. Tamaños completos: mundo 1, 321,1 MB; mundo 2, 288,9 MB; mundo 3, 257,3 MB; mundo 4, 282,0 MB; mundo 5, 590,2 MB. Estos tamaños incluyen archivos compartidos que no se duplican en el almacenamiento.
- Actualización controlada desde v369 con conservación de datos ficticios: comprobada mediante `PREVIOUS_RELEASE_REF=02e0cc0 node tools/check-release-update.cjs`.
- No se modificaron recursos multimedia, diccionarios, Supabase ni datos reales de jugadores.

## Límites de la comprobación

Los cinco paquetes y la reproducción offline del audio del dragón se probaron en Edge de escritorio. Faltan Android/iOS físicos, partidas completas de los cinco mundos y una revisión audiovisual humana de todas las cinemáticas. El progreso muestra bytes de archivos guardados, no tráfico de red instantáneo ni bytes parciales de un archivo todavía en descarga.

Captura: [pantalla de descarga](v370-descarga-mundo.png).
