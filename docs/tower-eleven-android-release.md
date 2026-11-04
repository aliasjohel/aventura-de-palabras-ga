# Once trajes de Torre · Android · v391-towerten-candidate1

Publicación de desarrollo autorizada el 3 de noviembre de 2026. Incluye Aren aprobado y los diez conjuntos de la candidata `4966d39`, sin trabajos pendientes del directorio principal. El punto de restauración es el commit `ee8fbefb3efe26fd5bfb10e6cdd2af877b7efd5c`, conservado en la etiqueta `restore/pre-tower-eleven-20261103` antes de actualizar main.

## Uso desde Android

1. Abrir https://aliasjohel.github.io/aventura-de-palabras-ga/ o la PWA instalada.
2. Aceptar la actualización disponible. Si no aparece, usar **Buscar actualizaciones** en el menú y volver a abrir al terminar. No hace falta borrar datos ni reinstalar.
3. Entrar en **Configuración → Trajes de Torre · Prueba visual**.
4. Elegir cualquiera de las once opciones y tocar **Aplicar a esta sesión**. Jugar con el personaje correspondiente.
5. Para volver al traje habitual, elegir **Desactivado · Usar mi traje habitual** y aplicar. La elección temporal también se borra al recargar o cambiar de cuenta.

La primera selección descarga únicamente las poses iniciales de ese traje; las cinemáticas adicionales se descargan cuando se necesitan y se conservan en caché. Los diez conjuntos nuevos suman 114 WebP y 19,85 MiB. Aren mantiene sus once imágenes y su calibración aprobada. Las dimensiones y los apoyos de los nuevos conjuntos se normalizaron con las referencias originales.

## Validación previa a publicar

- 21/21 pruebas de regresión de caché, multimedia, puertas de desarrollo, Versus, Kairós y teclado de IA.
- Diez conjuntos: ataques, habilidades, daños, cambios de traje y transformaciones. 150 comprobaciones de geometría, 112 de cinemáticas, sin fallos de geometría ni errores de página.
- Aren: quince comprobaciones de combate y tres de selección correctas.
- Actualización v390 → v391: cinco archivos de código/catálogos; cero imágenes de traje descargadas durante la actualización; versión antigua activa hasta la activación; almacenamiento local e IndexedDB conservados; traje reutilizable offline.
- Manifiesto de 895 recursos con hashes verificados. Los scripts `public-files.cjs` y `live-release.cjs` comprueban los bytes públicos y la actualización del Service Worker público en un navegador con emulación móvil. Sus resultados se guardan en `.local-developer/tower-ten-outfits/` después del despliegue.

La prueba física en Android queda a cargo de la siguiente revisión con el usuario; la emulación móvil no mide la fluidez ni la memoria del dispositivo real.

## Alcance temporal

Se mantiene el acceso visual libre de desarrollo. No otorga premios permanentes ni modifica inventarios, monedas, XP, ranking, Supabase o reglas de combate. Antes de Google Play debe desactivarse `DEVELOPMENT_OUTFIT_PREVIEW` y comprobarse `node tools/check-tower-preview-release.cjs --production`. Los desbloqueos definitivos se implementarán por separado con validación de los diez pisos por personaje.

El [informe de la candidata](tower-ten-development-playtest.md) conserva el detalle por conjunto, las correcciones de Guardiana y Kálamo y la auditoría de recursos. Sus referencias a candidata sin publicar describen el estado previo a esta autorización.
