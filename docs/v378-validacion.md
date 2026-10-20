# v378 — colección de fondos animados por mundo

20 de octubre de 2026.

Mi perfil conserva el bosque y Zafir e incorpora cuatro opciones de prueba: Desierto · Arenas del crepúsculo, Nimbus · Cumbres celestes, Nivor · Aurora de hielo y Azrak · Reino del eclipse. Cada una usa un escenario independiente, con arena, viento, nieve o brasas animadas; las tres últimas incluyen el personaje original en una capa separada. Nimbus y Nivor flotan suavemente; Azrak respira sobre un halo de energía. La colección mantiene las dimensiones de la cabecera de bosque.

Las cuatro ilustraciones y tres figuras optimizadas suman 316.564 bytes. Se cargan al seleccionar el fondo. Las animaciones se pausan al cerrar el perfil y ocultar la aplicación, y respetan movimiento reducido. Las seis opciones se presentan en una cuadrícula de dos columnas. La selección es una prueba temporal: no cambia la apariencia pública, monedas, compras ni desbloqueos.

`tools/check-world-profile-backgrounds.cjs` comprueba las seis opciones en español, inglés y portugués brasileño, a 320, 390 y 844 px; igualdad de dimensiones con el bosque, imágenes decodificables, ausencia de desbordamiento, descarga diferida, pausa y movimiento reducido, cambio de idioma conservando selección, y ausencia de cambios en identidad, monedero y progreso ficticios. Captura conjunta: `docs/v378-coleccion-fondos.png`.

Se ejecutan además las 206 pruebas automáticas, generación y comprobación del manifiesto, `tools/check-incremental-update.cjs` y actualización real v377 → v378 con datos ficticios en localStorage e IndexedDB. La validación pública comprueba archivos, versión y selección de fondos tras el despliegue.

Ilustraciones creadas con image_gen integrado. Los archivos y los prompts finales están documentados en [v378-ilustraciones.md](v378-ilustraciones.md).
