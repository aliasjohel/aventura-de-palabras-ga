# Torre · prueba de personajes bloqueados · v392-tower-character-playtest1

La versión v391 permitía elegir los once trajes, pero la selección normal seguía bloqueando a los personajes que no estaban desbloqueados por historia o comprados. Se permite ahora usar temporalmente el personaje del traje elegido en la Torre Arcade local. No se concede propiedad del personaje ni del traje.

En Android, aceptar la actualización, abrir **Configuración → Trajes de Torre · Prueba visual**, elegir un traje y tocar **Aplicar a esta sesión**. Después entrar en **Modos de juego → Torre Arcade**, elegir el personaje marcado **PRUEBA TEMPORAL** y comenzar. Repetir la selección de traje para probar otro personaje.

Solo se habilita el personaje del traje activo, con el adaptador local de Torre y sin partida en línea. Multijugador y la selección normal conservan los desbloqueos reales. Desactivar el traje, cambiar de cuenta o recargar revoca el acceso; si se retira durante un combate con un personaje prestado, se detiene ese combate y se vuelve a la selección disponible.

Los pisos de la prueba comienzan desde cero y avanzan en memoria; no sustituyen el progreso guardado. Los pisos normales siguen usando su almacenamiento habitual cuando la prueba está desactivada. No se modifican inventarios, monedas, XP, ranking, Supabase, reglas de combate ni imágenes. Se mantiene la puerta de desarrollo que debe desactivarse antes de Google Play.

Validación previa: 23/23 regresiones; recorrido real por los controles de Configuración y Torre con solo Guardiana desbloqueada, seleccionando y entrando al combate con los once personajes; revocación durante el combate y al recargar; restauración de los bloqueos normales; cero escrituras remotas y estado de negocio conservado. La actualización v391 → v392 descarga únicamente HTML, app.js y el módulo visual, sin imágenes; conserva datos locales e IndexedDB y reutiliza el traje offline. Manifiesto de 895 recursos verificado.

Comprobaciones: `node tools/tower-ten-outfits/access.cjs`, `node tools/tower-ten-outfits/access.cjs --live`, `node tools/tower-ten-outfits/upgrade.cjs`, `node tools/tower-ten-outfits/public-files.cjs` (Node con certificados del sistema), y las pruebas `tests/tower-character-playtest.test.cjs`. Los resultados públicos se guardan en `.local-developer/tower-ten-outfits/`. La prueba física del dispositivo se realiza después con el usuario.

Punto de restauración: `restore/pre-tower-character-access-20261103`, sobre la publicación v391 `3a70005db887fe5fbc80c52827b1c6b1ae73878c`.
