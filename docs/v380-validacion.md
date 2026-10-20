# v380 — remolino de Nimbus

20 de octubre de 2026.

Nimbus reúne aire frente a sus garras, forma un pequeño remolino de corrientes blancas y celestes y lo libera en una ráfaga. El ciclo de siete segundos combina carga, formación, liberación y disipación; el personaje acompaña con un movimiento breve de impulso. El SVG comparte el contenedor del personaje, de modo que el poder mantiene su posición al cambiar tamaño. La espada de Azrak y la ventisca de Nivor se conservan.

No se agregan recursos multimedia al juego. La animación se pausa al cerrar el perfil u ocultar la aplicación y se desactiva con movimiento reducido. Se conserva el tamaño compacto, la selección temporal y los datos de identidad, monedas y progreso.

Pruebas: tools/check-profile-powers.cjs verifica fases apagadas y activas de los tres poderes, contenedor compartido, anchos 320/390/844, pausa y movimiento reducido. Captura real del navegador: docs/v380-nimbus.gif. tools/check-world-profile-backgrounds.cjs verifica seis fondos en tres idiomas y anchos, imágenes diferidas y datos ficticios sin cambios. También se ejecutan 206 pruebas automáticas, manifiesto, actualización incremental y transición v379 → v380 con conservación de localStorage e IndexedDB. La comprobación pública valida los poderes y la recarga sin conexión.
