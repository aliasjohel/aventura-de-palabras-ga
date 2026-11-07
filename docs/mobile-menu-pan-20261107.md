# Encuadre móvil del menú

Versión: `v397-mobile-menu-pan1`.

El fondo cuadrado se mostraba centrado con `cover`: en celulares horizontales la luna y la parte superior del castillo quedaban fuera del recorte. En vertical el centro privilegiaba las nubes. El encuadre móvil ahora parte de arriba en horizontal y del costado derecho en vertical. Una animación CSS de 32 segundos por trayecto desplaza suavemente una sola capa de la imagen existente, manteniendo el fondo cubierto.

No se agregan imágenes, videos, solicitudes por fotograma, canvas ni temporizadores JavaScript. La imagen original conserva sus bytes. La animación usa `transform`, se pausa con el ciclo de vida existente al ocultar el menú o la aplicación, y se desactiva con `prefers-reduced-motion`. No se midió memoria en el teléfono físico: no se promete costo cero; la animación puede requerir trabajo y memoria de composición de la GPU. El encuadre de escritorio se conserva.

También se corrigió la tarjeta de acceso a Torre: «UN JUGADOR · SIN CONEXIÓN» era una etiqueta fija, no el estado de la sesión. Ahora dice «UN JUGADOR · TORRE ARCADE» y explica que se puede practicar sin conexión y que los premios habilitados requieren cuenta y conexión. Actualizados español, inglés y portugués. No se cambia la validación, los pagos ni la cuenta.

Comprobaciones locales en navegador: cuatro configuraciones (390×844, 844×390 táctil, escritorio 1440×900 y movimiento reducido), ocho fotogramas entre inicio y final del recorrido. Cobertura completa en ambos extremos, coordenadas de la luna dentro del encuadre, pausa al salir del menú y movimiento desactivado cuando corresponde. Se revisaron capturas; en horizontal el castillo y la luna quedan visibles a la derecha del panel. En vertical el panel ocupa gran parte de la escena y puede superponerse al paisaje.

Evidencia y capturas: `.local-developer/mobile-menu/`. Se comprobaron el manifiesto de recursos, las pruebas de caché incremental y rangos de audio, y el navegador real con `tools/check-incremental-update.cjs`. La prueba de actualización v396 → v397 verifica las descargas de código, conservación del estado y funcionamiento sin conexión.
