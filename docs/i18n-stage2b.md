# Etapa 2B — interfaz en español, inglés y portugués de Brasil

Implementación local para revisión, basada en la Etapa 2A (`fd290ad`). Está en `E:/Proyectos/Aventura-de-Palabras-i18n-stage2b`, separada del repositorio de trabajo con los cambios pendientes de marcos. No se publicó, no se creó un PR y no se hicieron operaciones remotas en Supabase ni GitHub.

Español sigue siendo el idioma principal y el respaldo. Se conservan el selector, la detección con `navigator.languages` y la clave independiente `aventuraIdiomaV1`. Los nombres propios y los datos del jugador no se traducen. La opción portuguesa ahora indica `Português (Brasil)`.

## 1. Archivos

Archivos de aplicación modificados:

- `index.html`: claves en menú, selector de modos, Configuración, ranking, tienda y perfiles; etiquetas accesibles y placeholder del código de desarrollador. Se separaron algunas etiquetas de sus flechas decorativas para conservar los elementos y eventos.
- `actualizar.html`: traducciones de la pantalla abierta desde «Buscar actualizaciones», incluidos estados y errores.
- `js/i18n.js`: consulta de traducciones sin sustituir contenido por una clave si el catálogo todavía no está disponible.
- `js/i18n-settings.js`: avisos del selector que también se actualizan con el idioma.
- `js/player-avatar.js`: etiquetas de avatares y marcos, vista previa, estados, historial y estadísticas del perfil propio, selección y avisos de marcos en la tienda. Se mantienen los IDs y la lógica de guardado.
- `js/public-player-profile.js`: perfil público, estadísticas, trofeos, fechas, resultados, carga, navegación y avisos de apariencia. Las consultas y la sincronización existente no cambian.
- `js/cosmetic-shop.js`: nombres y descripciones de los 12 trajes existentes, poses de vista previa, saldo, precio, estado de propiedad/equipo y avisos. No se cambian precios, requisitos, cobros ni inventario.
- `js/app.js`: presentación de Configuración y del ranking del menú, confirmación de nueva aventura y etiqueta del botón Aventura. El perfil propio recibe un indicador local `aliasIsFallback`, para distinguir el nombre predeterminado de un alias real llamado «Aventurero»; no se guarda ni se envía al servidor.
- `js/pwa.js`: traducción de estados de descarga, disponibilidad offline y avisos de actualización. Los mensajes de protocolo, estados internos y acciones del worker se conservan.
- `sw.js`: paquete local `v341`, con los nuevos módulos y `actualizar.html`. Continúa usando revisiones por versión para impedir mezclas entre archivos y catálogos.
- `locales/languages.json`: nombre visible de la opción portuguesa.
- Los seis archivos `common.json`, `menu.json`, `profile.json`, `shop.json`, `characters.json` y `errors.json` dentro de **cada** carpeta `locales/es/`, `locales/en/` y `locales/pt-BR/`: 18 catálogos modificados, con 332 claves de interfaz por idioma. Inglés y portugués incluyen singular/plural de monedas.

Archivos nuevos:

- `js/i18n-ui.js`: presentación dinámica por claves, parámetros y referencias a otras traducciones. Conserva los nodos vecinos y botones al cambiar de idioma; no accede al almacenamiento, a la red ni a funciones de guardado. Traduce las insignias únicamente en los perfiles y el ranking del menú, sin modificar `js/versus-ranks.js` ni sus reglas.
- `js/i18n-es-fallback.js`: respaldo español generado desde los catálogos, disponible incluso si falla su carga. Es un recurso derivado; las traducciones se editan en los JSON.
- `tools/build-i18n-ui-fallback.cjs`: genera o verifica ese recurso con `node tools/build-i18n-ui-fallback.cjs` / `--check`.
- `tests/i18n-interface.test.cjs`: cobertura de claves, parámetros, nombres propios, textos españoles, pluralización, ventanas abiertas, errores y compatibilidad con el núcleo i18n anterior.
- `tools/check-i18n-2b.cjs`: pruebas de navegador y diseño con imágenes originales y datos locales de prueba.
- Este informe y las capturas `tools/i18n-2b-*.png`: menú de modos, Configuración, perfiles propio/público, trajes y marcos en los tres idiomas; también Configuración a 320 px. Son evidencia de pruebas y no forman parte del paquete del juego.

Pruebas existentes actualizadas:

- `tests/i18n.test.cjs` y `tests/i18n-preferences.test.cjs`: más etiquetas y versión de caché actual.
- `tests/pwa-update-progress.test.cjs` y `tests/offline-local-modes.test.cjs`: verifican claves y sus textos españoles en los catálogos, en lugar de exigirlos escritos directamente en el JS.
- `tools/check-i18n-2a.cjs`: regresión del selector, caché `v341`, tienda traducida offline y pantalla de actualización offline. Conserva la captura histórica de la Etapa 2A.

No se modificaron hojas de estilo. La prueba de los textos localizados con los estilos originales pasó, por lo que se retiraron los ajustes preventivos de CSS.

## 2. Áreas traducidas

| Área | Cobertura de esta etapa |
| --- | --- |
| Menú principal | Navegación, acceso al perfil, selector de modos, sus tarjetas y entrada al tutorial, ranking, medallas y avisos de conexión/actualización. |
| Configuración | Idioma, vibración, nueva aventura y su confirmación, acceso de desarrollador y etiquetas/avisos de sus controles. Los valores narrativos de Mundo/Misión quedan en español. |
| Perfil propio y público | Títulos, controles, etiquetas, estados, estadísticas, favoritos, historial, fechas, trofeos, rangos, avatares genéricos y marcos. |
| Tienda | Trajes y sus descripciones, catálogo, poses de prueba, precios y monedas, requisitos visibles, botones, marcos gratuitos y avisos de compra/equipo/sincronización. |
| Accesibilidad | Etiquetas, textos alternativos, placeholder, nombres accesibles de controles e indicadores de rango correspondientes a esas áreas. |

Las consultas ya existentes de perfiles/ranking y las acciones de compra, equipo y sincronización siguen donde estaban. Cambiar de idioma solo actualiza la presentación; no repite esas operaciones.

## 3. Exclusiones deliberadas

- Historia, cinemáticas, diálogos, misiones, mapa narrativo, palabras jugables, soluciones, reglas de puzzles y bancos de palabras: fuera de la autorización de esta etapa. Sus archivos y catálogos permanecen sin cambios.
- Sala, tutorial, preparación y combate multijugador, Torre durante la partida y sus mensajes: quedan para otra etapa. Las tarjetas del selector de modos sí se tradujeron porque pertenecen al menú. El historial dentro del perfil y el diálogo compartido de ranking sí están cubiertos como interfaz de perfil/menú.
- Nombres propios de personajes, marca GA Games y título Aventura de Palabras: se conservan. Se tradujeron etiquetas descriptivas de avatar y nombres comerciales de trajes, sin modificar sus IDs.
- Alias, códigos de amigo y datos personales: se muestran literalmente, aunque coincidan con una traducción. El nombre predeterminado del perfil se identifica por un indicador de presentación, sin comparar su texto visible.
- Catálogo económico original, cartera, adaptadores de Supabase, migraciones, sesiones y compras de Google Play: no se modificaron.

Se conserva el español visible existente. La única actualización informativa del texto español es la nota del selector de idioma, que ahora describe el alcance real de la Etapa 2B; no cambia ningún texto de historia o de juego.

## 4. Pruebas y resultados

Antes de editar: **42 pruebas de referencia correctas**. Después: **54 pruebas automatizadas seleccionadas correctas**, más las pruebas de navegador, instalación y caché real.

```powershell
node --test tests/i18n.test.cjs tests/i18n-preferences.test.cjs tests/i18n-interface.test.cjs tests/pwa-update-progress.test.cjs tests/game-wallet.test.cjs tests/cosmetic-store.test.cjs tests/offline-local-modes.test.cjs tests/rank-divisions.test.cjs
node tools/build-i18n-ui-fallback.cjs --check
node tools/check-i18n-2b.cjs
node tools/check-i18n-2a.cjs
```

También se verificó la sintaxis de los diez módulos de aplicación/worker afectados y `git diff --check`.

- Español, inglés y portugués de Brasil: mismas claves y parámetros, nombres propios preservados, español de los trajes idéntico al catálogo original.
- Vista de celular: **320×740**, **390×844** y **844×390**. Menú de modos, Configuración, perfiles, tienda y ranking sin desbordamientos horizontales ni cortes detectados. Se revisaron capturas con las imágenes reales.
- Ventanas ya abiertas: títulos, estados, rangos, nombres de trajes y referencias dentro de mensajes cambian sin cargar de nuevo perfiles, consultar ranking, conectar la tienda ni guardar apariencia.
- Alias literal «Mi perfil» y nombre propio Shadow: se mantienen en los tres idiomas.
- Cancelar «Nueva aventura»: conserva la partida en los tres idiomas.
- Saldo, propiedad/equipo de trajes, identidad, progreso y marcador de sesión: idénticos antes y después de cambiar idioma, explorar la tienda y recargar.
- Fallo completo de los catálogos: la interfaz dinámica continúa utilizable en español desde el respaldo local.
- PWA real: instalación del worker, cambio de idioma offline, recarga offline conservando la elección, tienda offline y navegación a `actualizar.html` offline.
- Cartera y tienda: pruebas existentes de cobro único, recuperación de red, saldo insuficiente, equipo, preservación de propiedad y cambio de cuenta correctas. Rangos: umbrales y progresión originales correctos.

Las pruebas de presentación se ejecutaron con Edge y tamaños de celular, imágenes reales, audio silenciado y conexiones externas bloqueadas. Los perfiles/ranking se simularon localmente. La prueba de instalación PWA usó el worker real y catálogos/JS reales, con respuestas livianas para imágenes y audio; no modificó assets del repositorio. No se ejecutaron pruebas SQL ni operaciones de Supabase. No equivalen a una prueba física de Android ni a una validación de integración con el servidor.

## 5. Hallazgos y diseño

- `actualizar.html` no estaba precacheado. Ahora forma parte del paquete offline junto con i18n.
- Durante una actualización, un worker instalado anterior puede servir todavía el núcleo de la Etapa 2A. La nueva capa de presentación admite ese caso y usa respaldo español hasta disponer del núcleo nuevo; tiene una prueba específica.
- Los errores locales conocidos tienen traducción. Un error desconocido del servidor conserva su mensaje original en español y muestra un aviso comprensible traducido en inglés/portugués; el diagnóstico original se conserva en consola. No se usan mensajes traducidos para decidir cobros, permisos ni estados.
- No se detectaron problemas de diseño que necesitaran cambios de CSS en los tamaños probados. Queda pendiente comprobar el dispositivo físico y sus ajustes de tamaño de letra.

## 6. Prueba sugerida en el celular

Cuando se autorice subir esta versión, comprobar:

1. Elegir Español, English y Português (Brasil), cerrar y abrir Configuración y volver a abrir la aplicación.
2. Recorrer menú y selector de modos; abrir perfil, historial y ranking. Verificar alias, código de amigo, números y nombres propios.
3. En tienda, seleccionar varios trajes y marcos; revisar nombres, descripciones, precios, botones y avisos. Confirmar que cambiar idioma mantiene saldo, propiedad y equipo. No es necesario comprar para esta comprobación.
4. Alternar vertical/horizontal y revisar textos largos y botones, también con el tamaño de letra habitual del celular.
5. Tras instalar/cargar la versión con internet, usar modo avión, cambiar idiomas, reiniciar la PWA y abrir tienda, perfil local y «Buscar actualizaciones». Las compras y los perfiles remotos siguen necesitando conexión.
6. Continuar una partida existente: los textos y palabras de aventura siguen en español y el progreso permanece.

GitHub Pages continúa con la Etapa 2A. No existe todavía una URL publicada de la Etapa 2B.

## 7. Propuesta siguiente

Tras aprobar la prueba móvil, proponer una Etapa 2C limitada a **controles y avisos de Aventura y Torre**: navegación, HUD, botones de continuar/reintentar/salir, victoria/derrota y accesibilidad. Mantener historia, diálogos, misiones, puzzles y palabras jugables aparte hasta acordar su alcance, y tratar multijugador en una etapa separada. No se inició ninguna de esas tareas.
