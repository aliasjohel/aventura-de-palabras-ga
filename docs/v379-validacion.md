# v379 — poderes visibles en los fondos de perfil

20 de octubre de 2026.

Azrak enciende su espada con una llamarada, filo brillante y chispas durante un ciclo de siete segundos. Nivor mira hacia la izquierda, toma impulso y expulsa una ráfaga de hielo con niebla, líneas de viento y cristales cada 7,5 segundos. El fuego y la ventisca usan SVG ligero sobre la ilustración original; comparten el contenedor y la transformación del personaje para conservar su alineación en todos los tamaños. No se agregan imágenes ni videos al juego.

Se conserva el tamaño del bosque, las seis opciones, las traducciones, la selección temporal y los datos de identidad y monedero. Los poderes se pausan al cerrar el perfil u ocultar la aplicación. Con movimiento reducido, la espada conserva un brillo estático y la ventisca se oculta.

Validación con tools/check-profile-powers.cjs: fases apagadas y activas de ambos ciclos, alineación por contenedor compartido, anchos 320/390/844, pausa y movimiento reducido. Captura real del navegador: docs/v379-poderes.gif. Regresión con tools/check-world-profile-backgrounds.cjs: seis fondos, tres idiomas, tres anchos, imágenes diferidas y ausencia de cambios en identidad, monedero y progreso.

Se ejecutan las 206 pruebas automáticas, el manifiesto, la comprobación incremental y actualización v378 → v379 preservando datos ficticios. La publicación comprueba versión, archivos, poderes y recarga sin conexión.
