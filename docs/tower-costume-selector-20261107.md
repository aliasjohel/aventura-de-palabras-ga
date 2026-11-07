# Premios de Torre en la selección de personaje

Versión: `v400-tower-costume-selector1`.

Una consulta de solo lectura confirmó que la cuenta piloto tenía concedidos `tower_explorador` y `tower_conquistador`, con los diez pisos de Aren completados. El traje estaba disponible en Tienda → Premios exclusivos de Torre. El selector de personaje, en cambio, enumeraba únicamente el catálogo de trajes comprados y su equipamiento, por lo que omitía el traje ganado e incluso podía mostrar Original como activo mientras el premio estaba equipado.

El selector integrado y la ventana previa al combate ahora incluyen los premios de Torre que posee la cuenta, con sus ilustraciones existentes y su nombre. Sirve para los once personajes tanto en Torre como en Versus. El premio de Aren aparece como «Campeón del Último Piso». Los premios no obtenidos siguen ocultos y el selector de pruebas de desarrollo no concede artículos.

La elección de un premio usa la API existente de equipamiento, con validación de propiedad y revisión en el servidor. Al volver a Original o a un traje comprado se retira primero la selección de Torre, evitando que su apariencia siga superpuesta. Los cambios pendientes de equipamiento normal se sincronizan antes de seleccionar un premio; se conserva el requisito de salir de Aren Unión antes de equipar el premio de Aren. Mientras se confirma una selección se bloquean los cambios de personaje y la confirmación del combate. Los errores conservan la selección anterior y permiten reintentar. Los controles reflejan los cambios de conexión y de inventario.

Se amplió la ventana para que Original, traje comprado, Aren Unión y premio de Torre puedan verse juntos en un celular horizontal, con el título y el botón «Usar este traje» visibles.

Validación:

- 44 casos visuales: once personajes × Torre/Versus × celular/escritorio. Se comprobaron ambos selectores, elección del premio, apariencia del personaje, regreso a Original y traje comprado, y la opción marcada.
- Variantes con cuatro aspectos de Aren, rechazo de guardado sin cambiar la apariencia, controles sin conexión y premios no obtenidos ocultos.
- 50 pruebas Node de tienda, monedero, recompensas, personajes de prueba, reacciones y caché.
- Comprobaciones finales de caché y actualización v399 → v400: solo cambian `js/app.js` y `css/cosmetic-shop.css`, sin imágenes descargadas durante instalación. Se conservan la versión activa hasta aceptar, los datos locales e IndexedDB y la recarga sin conexión.
- Manifiesto de 912 recursos y prueba de caché incremental en navegador real.

La consulta alojada fue de solo lectura. Las pruebas de selección usan inventario y RPC sintéticos en un navegador aislado; no equiparon artículos en la cuenta real ni cambiaron saldos, marcos o permisos del servidor. No se automatizó el teléfono físico del usuario.

Capturas y evidencia: `.local-developer/tower-costume-selector/`. Scripts: `tools/tower-rewards-qa/check-costume-selector.cjs` y `check-selector-upgrade.cjs`.
