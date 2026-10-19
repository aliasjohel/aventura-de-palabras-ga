# v371 — mundos guardados y remolino final

19 de octubre de 2026. Publicación autorizada por el usuario.

## Cambios

- El preparador comprueba primero si el paquete ya está guardado. Si está completo, entra sin iniciar una descarga ni mostrar progreso de descarga. Si la comprobación demora, indica «Comprobando los recursos guardados…».
- La pantalla con MB aparece únicamente cuando faltan recursos. El service worker conserva la recuperación de archivos faltantes y las descargas interrumpidas.
- En el mundo 3, el sexto error cierra una columna de viento delante de Aren, con diez ráfagas y 42 grupos de polvo y fragmentos. Aren pierde visibilidad y asciende ligeramente. Los cinco primeros errores mantienen su efecto anterior.
- El efecto se retira al reintentar, liberar al personaje o cambiar de mundo. Con movimiento reducido se mantiene la cobertura sin animación ni elevación.

## Validación

- 206/206 pruebas automáticas aprobadas.
- Manifiesto de 712 recursos generado y comprobado.
- `node tools/check-incremental-update.cjs`: aprobado, incluidos recursos y audio sin conexión.
- `PREVIOUS_RELEASE_REF=9cdeabe node tools/check-release-update.cjs`: actualización v370 → v371 aprobada, conservando localStorage e IndexedDB ficticios.
- `node tools/check-world-download.cjs`: instalación nueva, mundo 1 guardado, recarga offline sin nuevas descargas ni pantalla «Descargando»; audio del dragón offline. Se agrega comprobación de entrada mediante el selector del modo prueba.
- `node tools/check-wind-finale.cjs`: Edge en viewport 390 × 844; quinto y sexto error, cobertura final, elevación, reinicio, liberación, cambio de mundo y movimiento reducido aprobados, sin errores JavaScript.
- Revisión visual de las capturas del quinto y del último error.
- Sin cambios en multimedia, diccionarios, Supabase ni datos reales.

## Límites

No se realizó una prueba física en Android/iOS. En la reproducción de escritorio, el paquete guardado no requirió tráfico de descarga; el rótulo de descarga de v370 también se mostraba durante las comprobaciones del almacenamiento. Si el navegador elimina archivos del sitio, seguirá siendo necesario recuperar los que falten.

Capturas: [quinto error](v371-viento-quinto-error.png), [último error](v371-viento-ultimo-error.png).
