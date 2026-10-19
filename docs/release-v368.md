# v368 preparada: vocabulario ampliado de Versus

El cliente agrega 1344 entradas inglesas (total 2000) y 1237 portuguesas
(total 1999). Conserva las 2000 españolas. La ampliación se usa solo en Versus;
Torre, los combates de Aventura y el tutorial conservan los bancos anteriores.
No cambia puntos, monedas, estadísticas ni reglas de combate. No incluye
progresión de vocabulario por rango.

La fuente revisada genera el banco local, la migración y las consultas de auditoría.
La caché preparada es `aventura-palabras-runtime-v368`, con el nuevo módulo
incluido en el manifiesto de hashes y actualización de la referencia de app.js.

## Estado del servidor y de la publicación

El usuario confirmó que Aria aplicó
`20261019005111_expand_versus_localized_vocabulary.sql` en el proyecto
`hlixavucxdxevbbhlxkc` y verificó las 5999 entradas, huella correcta,
cero entradas inválidas y conservación de datos de jugadores.
Esta sesión no reaplicó SQL ni realizó una verificación independiente de producción.

Cliente preparado para commit local. **Push y publicación pendientes de autorización
expresa del usuario después de recibir los resultados de la revisión.**

## Verificación local repetida antes del commit

- Suite Node completa: 195 pruebas.
- PostgreSQL embebido: todas las 5999 entradas mediante RPC/trigger reales;
  recuperación portuguesa, revancha, idempotencia, preservación de filas históricas,
  rechazo de diferencias con la línea base y bloqueo ante partidas activas.
- Navegador: preparación en los tres idiomas y diez temáticas, palabras nuevas
  manuales, sorteo y fijación; aislamiento de Torre/Aventura y compatibilidad v367.
- PWA sin conexión: selección, combate, recuperaciones, portugués y guardado.
- Caché incremental, audio/rangos offline y actualización v367→v368 con
  conservación exacta de localStorage e IndexedDB.
- Generación sincronizada, manifiesto SHA-256 y revisión de espacios del diff.

Las comprobaciones online de esta preparación son locales/simuladas. No se
abrieron partidas reales contra producción ni se modificaron estadísticas reales.
Después de autorizar el despliegue, comprobar la entrega pública de los hashes
y la versión del worker; las partidas reales con cuentas de QA siguen pendientes.

Los recuentos por temática, fuentes y descartes se detallan en
`docs/versus-vocabulary-expansion-handoff.md`.
