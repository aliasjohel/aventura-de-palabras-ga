# Limpieza de recursos del juego — 23/09/2026

Se eliminaron 63 archivos publicados sin referencias activas: 88,50 MiB. Entre ellos hay conceptos de personajes, versiones anteriores de ataques, fondos reemplazados, medallas SVG antiguas y un sonido sustituido por el trueno.

14 de esos archivos seguían en la lista de instalación sin conexión. Quitarlos ahorra 21.371.397 bytes (20,38 MiB) por instalación. El total de imágenes y sonidos precargados baja de 816,45 a 796,07 MiB. La primera estimación de 714,51 MiB no incluía la lista adicional `RECURSOS_MODOS_LOCALES`; las cifras anteriores incluyen ambas listas completas, sin duplicados.

Otros seis borradores locales, que nunca se publicaron, se conservaron en `.local-developer/unused-assets/`, fuera de los recursos del juego y excluidos de Git. Las capturas y herramientas de desarrollo no forman parte de la descarga sin conexión y se conservaron.

La lista exacta, los tamaños y el commit previo para recuperar cualquier archivo se encuentran en `asset-cleanup-reviewed.json`. Los archivos eliminados siguen recuperables desde el historial de Git. No se modificaron partidas, compras, monedas, imágenes activas, sonidos activos ni cinemáticas.

## Comprobación

- Búsqueda en HTML, CSS, JavaScript y manifiesto, excluyendo las referencias históricas de herramientas.
- Resolución adicional de fondos y cinemáticas de Azrak mediante sus datos ejecutables, incluidos nombres calculados a partir de `key`.
- Preservación de las rutas dinámicas de trajes, marcos, medallas, expresiones, caminatas, hojas y víctimas de cinemáticas.
- Todos los recursos que quedan en la instalación y las rutas dinámicas auditadas existen.
- Suite completa de pruebas, incluida la instalación y migración de la caché.

`node tools/audit-game-assets.cjs` vuelve a generar un diagnóstico de solo lectura. Sus candidatos requieren revisión manual: la mera ausencia de una referencia literal no autoriza su eliminación.

La caché v301 copia los recursos vigentes de la instalación anterior y deja afuera los obsoletos. Al activarse elimina la caché antigua, sin borrar almacenamiento de progreso ni compras.
