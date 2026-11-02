# Aren · Campeón del Último Piso · v388-arenchampion1

Esta publicación de desarrollo ofrece una apariencia temporal, sin autorización individual por UUID y sin cambios de Supabase. No concede un derecho de propiedad ni habilita el desbloqueo definitivo de Torre.

## Android

1. Abrir el juego habitual en GitHub Pages o la PWA instalada.
2. Aceptar la actualización disponible. Si no aparece, usar **Buscar actualizaciones** desde el menú; volver a abrir el juego cuando termine. No borrar datos ni reinstalar.
3. Entrar en **Configuración → Trajes de Torre · Prueba visual**.
4. Elegir **Aren · Campeón del Último Piso** y tocar **Aplicar a esta sesión**.
5. Cerrar Configuración y jugar con Aren. Los combates mantienen la orientación horizontal habitual del juego. El selector se puede usar en vertical.

Se aplica a los sprites de Aren en los combates de Aventura, Torre Arcade y Versus. No reemplaza las ilustraciones narrativas ni los sprites de exploración. En Multijugador cambia únicamente la vista local de quien lo activa: el servidor y el rival conservan el traje autorizado habitual. No se envía un identificador de traje falso ni se modifica el equipamiento persistente.

La elección se borra al recargar o cambiar de cuenta. Se desactiva eligiendo **Desactivado · Usar mi traje habitual** y aplicando. Aren Unión conserva su autorización y sus habilidades propias; primero hay que desactivarlo mediante su control existente para probar esta apariencia de Aren normal.

## Separación y carga

- El catálogo de prueba está en `js/tower-outfit-preview.js`, separado de `CosmeticStore.catalog` y del inventario. No contiene llamadas RPC, compras, equipamiento persistente ni escrituras en almacenamiento.
- Cinco WebP (695.824 bytes) al activar; finales, planta, mano, vidrio y edades se preparan cuando la escena correspondiente los necesita. Los once WebP suman 1.921.732 bytes y coinciden exactamente con los aprobados.
- Todos los recursos están en el catálogo inmutable del Service Worker para descarga selectiva; ninguna imagen del traje pertenece a `CORE_ASSETS` ni se incluye en los paquetes de Multijugador o mundos para jugadores que no la seleccionan.
- Los ajustes de escala y apoyo se aplican solo a las imágenes del nuevo traje y se componen con las animaciones originales. Las cinemáticas conservan sus tiempos y secuencias. El montaje de Kairós reconoce la apariencia temporal sin alterar la selección real.
- Las clases de prueba y las preferencias visuales no se usan en reglas de servidor. Se mantienen los controles de derechos, habilidades, compras, partidas, ranking y premios. No se cambiaron migraciones, permisos ni módulos de servidor.

## Otros diez personajes

El selector se genera desde un catálogo de apariencias de desarrollo. Para cada futuro traje se agregarán WebP, metadatos, calibración y recursos selectivos; no requiere concesiones por UUID. Esta publicación solo incluye el traje de Aren. Los otros diez quedan para después de su revisión en un Android físico.

## Puerta de lanzamiento en Google Play

Antes de una versión de producción:

1. Cambiar `DEVELOPMENT_OUTFIT_PREVIEW` a `false` en `js/tower-outfit-preview.js`. El módulo deja de mostrar el selector, devuelve cero recursos y rechaza la selección; no hay códigos, URL ni preferencias locales que lo reactiven.
2. Ejecutar `node tools/check-tower-preview-release.cjs --production`; aborta mientras el acceso de desarrollo siga habilitado.
3. Regenerar el catálogo y los hashes con `node tools/build-cache-manifest.cjs`, comprobar con `--check` y publicar con una versión de caché nueva.
4. Implementar y probar aparte el desbloqueo definitivo validado por Supabase tras diez pisos del personaje, el inventario permanente y la revocación completa de rutas de prueba. No están implementados ni activados por esta publicación.

## Validación y límites

- Dos pruebas nuevas: acceso de producción desactivado rechaza selección sin tocar DOM/red; el traje no aparece en inventario ni en descarga inicial.
- 37/37 contratos actuales de personajes, trajes, permisos de autor desactivados, carga selectiva, confirmación de trajes de sala y sesiones de Multijugador. Se ejecutaron sobre los archivos del candidato mediante un directorio de QA local; no se publicaron las modificaciones pendientes de otras funciones ni esos archivos temporales.
- 16/16 comprobaciones de caché incremental, rangos multimedia offline y puerta de lanzamiento; ensayo real de actualización `v387-trunkcontact1 → v388-arenchampion1`: cinco archivos de código/estilo, cero imágenes del traje, versión anterior activa hasta confirmar, recarga offline y conservación de datos locales/IndexedDB.
- Edge Chromium con emulación móvil y táctil: selección en Configuración, cero WebP antes de seleccionar, cinco iniciales, once tras recorrer escenas, ataques, lupa, impactos y recuperación de base; cinco cinemáticas en 844×390 y 667×375; las tres edades de Kairós; victoria y derrota; los otros diez personajes; cierre de sesión, recarga e idiomas.
- Combate completo procesando letras y usando la lupa: Aren termina con cuatro corazones y el rival con cero; cierre natural del motor. La selección y las pruebas visuales conservan el almacenamiento de negocio.
- La suite histórica versionada contiene 37 fallos anteriores al candidato, incluidos contratos obsoletos de las autorizaciones inseguras ya retiradas y dependencias de pruebas no versionadas. Se ejecutó en el punto de restauración y en el candidato y se comparó la lista: no se corrigen ni se atribuyen al traje. No se afirma que esa suite histórica esté completamente aprobada.
- El fallo previamente documentado de `tests/multiplayer-lab.test.cjs` pertenece al árbol de trabajo pendiente y queda fuera de la publicación. No se publica ni regenera el laboratorio.
- La verificación física en Android corresponde al siguiente paso del usuario; la emulación no certifica hardware real. No se ejecutaron partidas ni reclamos de recompensa en producción para verificar.

Comprobaciones reproducibles: `tools/check-tower-outfit-preview.cjs`, `tools/check-tower-preview-upgrade.cjs`, `tools/check-incremental-update.cjs`, `tools/check-tower-preview-release.cjs`, y `tools/verify-tower-preview-publication.cjs <commit>`.

## Restauración

Base: `4ac4b0b543698c9a03dafb4edebe6ee4fb29fa42`, etiqueta local `backup/aren-champion-before-20261102`. Rama aislada: `release/aren-champion-playtest-20261102`.

Para revertir, crear una rama desde el remoto vigente y revertir únicamente el commit de esta publicación. Cambiar el identificador de caché a una revisión nueva, regenerar/verificar el manifiesto y publicar el commit de reversión. No usar force-push, no restaurar bases de datos ni sobrescribir actividad posterior. Para retirar solo el acceso de pruebas, basta la puerta de lanzamiento descrita arriba y una nueva actualización del cliente.
