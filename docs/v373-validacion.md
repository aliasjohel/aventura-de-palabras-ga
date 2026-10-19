# v373 — comprobación rápida de mundos guardados

19 de octubre de 2026.

La comprobación de v371/v372 abría cada respuesta multimedia de la caché, aunque solo necesitaba confirmar su existencia. Esto podía demorar la vuelta al mundo y mostrar «Comprobando los recursos guardados…» durante varios segundos.

El service worker ahora consulta los índices de archivos guardados por URL y revisión. Para recursos de versiones anteriores, consulta una vez el índice de cada caché referenciada por la instalación activa. Los archivos ya guardados no se abren ni se vuelven a descargar. Se conserva la comprobación real de existencia: una entrada eliminada no se considera disponible offline y se recupera con los mecanismos existentes.

Validación:

- 206/206 pruebas automáticas aprobadas, incluida la comprobación sin abrir respuestas multimedia y la detección de archivos eliminados en cachés actuales y anteriores.
- Manifiesto de 712 recursos comprobado.
- Prueba de navegador con un mundo de 187 archivos y 321,1 MB: preparación después de recargar sin conexión en **31 ms** en Edge de escritorio. Sin nuevas descargas. Entrada a través del selector del modo prueba sin pantalla de descarga.
- Audio del dragón reproducido sin conexión.
- Actualización incremental y actualización v372 → v373 con conservación de localStorage e IndexedDB ficticios aprobadas.
- Se conserva el cambio de v372 que mantiene a Aren en la misma posición durante los seis errores del mundo 3.

La medición de 31 ms corresponde al equipo de prueba; falta confirmar el tiempo en los celulares que reportaron la demora. Sin cambios en multimedia, diccionarios ni servicios o datos reales de jugadores.
