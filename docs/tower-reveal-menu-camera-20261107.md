# Recompensas de Torre y cámara del menú

Versión: `v399-menu-tower-reward-reveal1`.

## Aviso de recompensas

La pantalla de victoria incorpora «¡Desbloqueaste estas recompensas!» con las imágenes existentes del traje obtenido y del marco recién concedido, si corresponde. Funciona con los once personajes y los marcos Conquistador, Maestro y Leyenda. No equipa artículos automáticamente. Un mensaje indica que se pueden equipar después desde los trajes del personaje y Mi perfil. Textos en español, inglés y portugués.

Las novedades se obtienen de la diferencia entre inventarios confirmados del servidor, sin calcular concesiones a partir de progreso local. La primera sincronización establece la base y no vuelve a anunciar premios históricos. Las notificaciones pendientes se guardan por cuenta, se filtran contra la propiedad confirmada y esperan a que aparezca la pantalla de resultado de Torre. Una concesión tardía también puede incorporarse a esa pantalla. Al mostrarla se reconoce el aviso; repetir un piso o sincronizar el mismo inventario no lo repite. Los avisos no conceden artículos, monedas ni permisos.

Como el usuario ya había obtenido el traje de Aren y Conquistador antes de esta versión, esos artículos históricos no se anunciarán de nuevo al repetir esa Torre. Los siguientes desbloqueos sí mostrarán el aviso.

## Libro, cristal y paisaje

El fondo, el cristal y las antorchas comparten una misma capa y coordenadas de imagen. El cristal se mantiene sobre el libro incluso al desplazarse el paisaje. Se reutilizan las imágenes existentes.

Después de la presentación original se muestra el libro: el cristal emerge durante 1,8 segundos y luego la cámara se desplaza durante 3 segundos hacia la luna y el castillo. Al llegar aparecen los botones del menú con su entrada existente. Después el paisaje va y vuelve lentamente, con el cristal siempre unido a la posición del libro. Los botones permanecen fijos.

Se recalcula el encuadre al cambiar el tamaño de pantalla; no hay un bucle JavaScript por fotograma. La animación usa CSS `transform`, se pausa con la aplicación o el menú ocultos y respeta movimiento reducido. En ese caso se omite el recorrido y se usa el encuadre estático. No se agregan imágenes, videos ni audios.

## Comprobaciones

- 42 pruebas Node, incluidas cuatro nuevas de notificaciones: primera sincronización, los once trajes y tres hitos, reconexión/confirmación y separación de cuentas.
- 17 casos visuales de premios: once personajes en celular horizontal y los tres hitos en vertical e interfaz de escritorio, con los tres idiomas. Se prueban confirmaciones anteriores y posteriores a la pantalla de victoria, imágenes decodificadas, ausencia de equipo automático y ausencia de avisos repetidos.
- Cámara del menú en celular vertical/horizontal y escritorio: cristal anclado al libro, menús ocultos durante el recorrido, luna visible al llegar, cobertura sin bordes vacíos y regreso al encuadre del libro. También movimiento reducido y pausa al ocultar la aplicación.
- Actualización v398 → v399: siete archivos de código/estilo, cero imágenes durante instalación, versión previa activa hasta aceptar, conservación de localStorage e IndexedDB y recarga sin conexión.
- Manifiesto de 912 recursos y pruebas de caché incremental/rangos sin conexión aprobados, incluida ejecución en navegador real.

Las escenas usan inventario sintético local; no se modificaron datos del servidor ni se concedieron premios reales de prueba. No se automatizó el teléfono físico del usuario.

Capturas y evidencia: `.local-developer/reward-reveal/` y `.local-developer/menu-book-camera/`. Pruebas reproducibles: `tools/tower-rewards-qa/check-reward-reveal.cjs`, `check-reveal-upgrade.cjs` y `tools/check-menu-book-camera.cjs`.
