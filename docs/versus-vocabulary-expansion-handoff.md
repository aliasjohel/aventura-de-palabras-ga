# Ampliación de vocabulario de Versus: entrega para Supabase

Estado actualizado: **servidor aplicado y verificado por Aria, según confirmación
del usuario; cliente v368 preparado para commit local, sin push ni publicación**.
El usuario confirmó 2000 entradas españolas sin cambios, 2000 inglesas y 1999
portuguesas, huella correcta, cero palabras inválidas y conservación de datos.
Esta sesión no volvió a consultar producción ni reaplicó la migración.
Proyecto autorizado: `aventura-de-palabras` (`hlixavucxdxevbbhlxkc`).
Base del cliente: v367, commit `8a85789`; futura caché local preparada: v368.
No se implementaron dificultades, máximos históricos, desbloqueos ni avisos de ascenso.

## Cantidades aprobadas

| Temática | ES conservado | EN anterior | EN nuevo | EN final | PT-BR anterior | PT-BR nuevo | PT-BR final |
|---|---:|---:|---:|---:|---:|---:|---:|
| Países | 100 | 56 | 44 | 100 | 56 | 44 | 100 |
| Frutas | 100 | 47 | 13 | 60 | 60 | 30 | 90 |
| Animales | 250 | 76 | 199 | 275 | 107 | 153 | 260 |
| Comidas | 200 | 57 | 153 | 210 | 64 | 146 | 210 |
| Profesiones | 200 | 65 | 125 | 190 | 77 | 113 | 190 |
| Deportes | 100 | 52 | 26 | 78 | 54 | 23 | 77 |
| Transportes | 100 | 62 | 38 | 100 | 57 | 33 | 90 |
| Objetos | 400 | 77 | 360 | 437 | 90 | 332 | 422 |
| Naturaleza | 250 | 72 | 178 | 250 | 84 | 176 | 260 |
| Nombres | 300 | 92 | 208 | 300 | 113 | 187 | 300 |
| **Total** | **2000** | **656** | **1344** | **2000** | **762** | **1237** | **1999** |

Son entradas por temática. Se admiten coincidencias justificadas entre temáticas;
no hay claves normalizadas duplicadas dentro de una temática e idioma.
No se añadió una palabra para completar artificialmente 2000 en portugués.
Las categorías restrictivas, especialmente frutas inglesas, quedaron por debajo
de la propuesta inicial. Las más amplias compensan sin modificar las diez temáticas.

## Archivos SQL que debe recibir la otra conversación

Todos están en `E:\Proyectos\Aventura-de-Palabras-i18n-stage2b`:

1. `tools\sql\versus-vocabulary-preflight.sql` — solo lectura: estructura,
   funciones vigentes, triggers, permisos, RLS, bancos base y duelos activos.
2. `tools\sql\versus-vocabulary-preservation.sql` — solo lectura: recuentos y
   huellas agregadas de tablas de jugadores y juego, antes y después.
3. `supabase\migrations\20261019005111_expand_versus_localized_vocabulary.sql`
   — **único archivo que modifica datos**: inserciones aditivas y transaccionales.
4. `tools\sql\versus-vocabulary-postflight.sql` — solo lectura: comparación
   exacta de grafías y claves con las 3999 entradas localizadas esperadas,
   cantidades por temática, caracteres y huella española.

Las rutas completas se obtienen anteponiendo el directorio anterior. No aplicar
las migraciones históricas del repositorio ni publicar el cliente todavía.

## Orden de revisión y aplicación remota (completado por Aria según el usuario)

1. Confirmar en la conexión real el proyecto `hlixavucxdxevbbhlxkc`.
2. Ejecutar preflight y revisar TODOS sus resultados, incluidas las definiciones
   de `set_versus_challenge`, normalización, validación y recuperación.
   Cada `problems` debe ser 0; la huella española debe ser verdadera.
   Confirmar PK `(word_language,theme_key,word_key)`, clave generada con la
   normalización del juego, RLS activada y ausencia de acceso directo del cliente.
   No reemplazar funciones ni quitar políticas para resolver una discrepancia.
3. Guardar resultados de preservation. No devuelve filas individuales de jugadores.
4. Esperar una ventana sin salas `complete/preparing/playing` ni partidas `playing`.
   No cancelar duelos, borrar salas, eliminar sesiones ni forzar resultados.
5. Aplicar **solo** la migración nueva mediante el mecanismo de migraciones remoto
   que mantenga el historial del proyecto. El CLI local únicamente creó el archivo;
   no registró ni aplicó una migración remota. No ejecutar una segunda vez como
   SQL suelto si ya se utilizó una herramienta de aplicación de migraciones.
6. Ejecutar postflight: todos los `problems` e `invalid_entries` en 0, todos los
   `passed` verdaderos; inglés 2000 y portugués 1999. Español permanece en 2000.
7. Volver a ejecutar preservation y comparar. Actividad normal de usuarios puede
   cambiar esas huellas; investigar las diferencias, nunca restaurar datos para
   forzar una coincidencia. La migración solo inserta en el diccionario localizado.
8. Devolver resultados, identificación de la migración realmente aplicada y
   confirmación del proyecto. Después se solicita al usuario autorización para
   publicar el cliente ya preparado.

La migración bloquea brevemente las tablas necesarias, verifica que no haya
duelos activos, comprueba la línea base y conserva todo dentro de una transacción.
Si hay discrepancias o no puede adquirir el bloqueo en cinco segundos, se detiene.
No modifica funciones, políticas, usuarios, desafíos ni registros históricos.
`ON CONFLICT DO NOTHING` permite repetir la aplicación sin sobrescribir grafías;
la comprobación final revierte la transacción si el conjunto no es exacto.
El control de duelos activos evita ampliar el banco de recuperaciones de un
combate en curso. Los desafíos históricos permanecen intactos.

## Fuente común y revisión lingüística

- `data/versus-vocabulary.json`: incorporaciones aprobadas, evidencia por entrada,
  referencias de origen, exclusiones y reservas.
- `data/versus-vocabulary-candidates.json`: candidatos seleccionados por temática.
- `data/versus-vocabulary-editorial-exclusions.json`: 139 descartes iniciales
  de borrador, expresiones compuestas, grafías o encajes temáticos dudosos.
- `data/versus-vocabulary-totals.json`: cantidades generadas.
- `tools/build-versus-vocabulary.cjs`: genera el módulo local y los tres archivos
  de consulta más la migración desde la misma fuente. `--check` no escribe.

La selección temática se revisó editorialmente; la existencia y grafía de cada
incorporación se contrastó con diccionarios abiertos fijados por commit:

- LibreOffice dictionaries, revisión `67032ee957631908098a72edf48dc81cac27e369`:
  `en/en_US.dic`, `en/en_US.aff`, `pt_BR/pt_BR.dic`, `pt_BR/pt_BR.aff`.
  La fuente portuguesa es VERO. Se conservan huellas SHA-256 de los archivos.
  Palabras comunes verificadas en minúscula; nombres con capitalización propia.
- Países: nombres comunes/oficiales exactos de `mledoze/countries`, revisión
  `c2ac0049c14edcf2436c7aa1b2493222a020b462`, con SHA-256 del JSON.
  No se concatenaron nombres con espacios ni guiones.

Las consultas directas a IBGE y la descarga SSA no pudieron completarse
(timeout y HTTP 403 respectivamente). **No se presentan como fuentes utilizadas**.
Los nombres incorporados tienen evidencia ortográfica en los diccionarios
fijados y selección editorial; no se afirma una clasificación estadística de
popularidad ni revisión externa por un lingüista nativo. No hay clasificación
de dificultad ni se utiliza frecuencia como requisito de rango.

Resultado del filtrado posterior al primer borrador:

| Motivo de exclusión | Registros |
|---|---:|
| Longitud o caracteres incompatibles | 33 |
| Nombre de país no confirmado por coincidencia exacta con la fuente | 17 |
| Grafía no confirmada por el diccionario fijado | 203 |
| Ambigüedad o encaje temático editorial | 43 |
| Ya existente o colisión normalizada | 125 |
| **Total de este filtrado** | **421** |

Sumados los 139 descartes de borrador: **560 registros no incorporados por
estos motivos**. No significa que todas esas palabras sean incorrectas:
algunas son válidas pero no pudieron verificarse con estas fuentes o ya existían.
Otras **1127 candidatas con grafía verificada quedaron en reserva por los límites
editoriales**; no se cuentan como palabras lingüísticamente rechazadas.

`tools/fetch-versus-vocabulary-sources.cjs <directorio-absoluto-externo>` descarga
las versiones fijadas y verifica SHA-256. Para reproducir la revisión se requiere
Python y `spylls==0.1.7`, instalado fuera del juego, y ejecutar
`tools/review-versus-vocabulary.py <directorio-externo>` con ese paquete en
PYTHONPATH. Los diccionarios completos no se redistribuyen con el cliente.

## Aislamiento de modos

`js/word-banks-versus.js` permanece idéntico al publicado: Torre utiliza sus
656/762 entradas anteriores. El módulo nuevo `js/word-banks-versus-expanded.js`
se usa exclusivamente en Versus local y online. Los combates de Aventura y el
tutorial también conservan el proveedor anterior. El español usa siempre
`SpanishWordBanks.versus`, sin modificaciones.

Cambios en archivos existentes: `js/app.js`, `index.html`, `sw.js`.
El manifiesto SHA-256 incluye el módulo nuevo y la caché local preparada es v368.
No se cambian economía, puntos, reglas de combate, clasificación ni adaptadores
de red. El commit local se prepara tras repetir las pruebas; push y publicación
requieren la nueva autorización que pidió el usuario.

## Verificación local

- `node --test tests/*.test.cjs`: **195/195**; incluye reconexión, desafíos,
  protección de partidas simultáneas y regresiones existentes, con sus fixtures
  locales/mocks. No confundir con sesiones reales en producción.
- `node tools/check-versus-vocabulary-sql.cjs`: PostgreSQL embebido PGlite,
  **5999 entradas** pasan por la función real de desafíos y su trigger extraídos
  de las migraciones. Comprobadas recuperación portuguesa, revancha, idempotencia,
  rechazo de deriva del banco base, bloqueo ante duelos activos y preservación
  de filas históricas sintéticas. Auditorías ejecutadas en transacción de lectura.
- `node tools/check-versus-vocabulary-ui.cjs`: tres idiomas y diez temáticas,
  selección automática, manual de palabras nuevas, regeneración fijada,
  identidad exacta del banco antiguo en Torre y duelos de Aventura, idioma de sala.
  El cliente v367 carga su código anterior y puede representar/resolver las
  **2581 incorporaciones**. Solicitudes externas bloqueadas.
- `node tools/check-i18n-3e.cjs` y `--offline`: preparación, combate, recuperaciones,
  portugués, Torre, tutorial y guardado en tres idiomas, incluida PWA sin conexión.
- `node tools/check-i18n-3d.cjs`: mundos de Aventura, pistas/historial y regresión.
- `node tools/check-i18n-3g-ui.cjs`: sala, Amigos, alias, mensajes y selección.
- `node tools/check-incremental-update.cjs`: caché incremental, aislamiento del
  worker activo, imágenes y audio/rangos offline.
- `PREVIOUS_RELEASE_REF=8a85789 node tools/check-release-update.cjs`: instalación
  local v367→v368, worker activo/en espera, arranque offline y preservación exacta
  de localStorage e IndexedDB (perfil, monedas, Torre, idioma y datos sintéticos).
- `node tools/build-versus-vocabulary.cjs --check`, manifiesto `--check` y
  `git diff --check`: coherencia de artefactos y archivos.

No se ejecutó `tools/check-i18n-3g.cjs`: ese recorrido abre sesiones reales en
Supabase. Tampoco se ejecutó la prueba de concurrencia contra producción.
La validación de la base real y las partidas online reales con cuentas de QA
siguen pendientes antes de publicar. Ninguna prueba de esta tarea modificó
estadísticas de jugadores reales.
