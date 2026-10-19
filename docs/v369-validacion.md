**Aventura de Palabras — v369 preparada localmente para revisión**

Base publicada comprobada: `d3d0bf1`. La versión candidata usa `aventura-palabras-runtime-v369`. No se realizó commit, push ni publicación. No se ejecutaron migraciones ni escrituras en Supabase.

**Mediciones comparables**

Comparación de v368 desde Git contra los archivos locales de v369, con Edge sin interfaz, perfiles limpios, viewport 390 × 844, movimiento reducido, 40 ms de latencia y 5 MiB/s. La prueba de arranque desactiva el service worker en ambas versiones para aislar el tráfico de la página. Los archivos de texto antiguos se preparan antes de medir para excluir el costo de invocar Git. Una ventana de diez segundos mide las solicitudes y los bytes recibidos. Son resultados de laboratorio, no tiempos prometidos para un teléfono ni para GitHub Pages.

| Medición | v368 | v369 |
| --- | ---: | ---: |
| JavaScript e idiomas listos | 3.544 ms | 2.403 ms |
| Comienzo de aparición del menú, introducción reducida | 4.314 ms | 3.524 ms |
| Solicitudes en los primeros 10 s | 195 | 87 |
| Bytes de red recibidos en esos 10 s | 42,582 MB | 14,231 MB |
| Tamaño de los archivos solicitados en esos 10 s | 179,134 MB | 14,215 MB |
| Espera al pedir el SDK | Timeout a los 15.014 ms | 2 ms; ya precargado |
| Descarga del SDK durante la precarga | No completó antes del timeout | 147 ms |
| Archivos exigidos para instalar el núcleo | 710 | 114 |
| Tamaño de ese conjunto, sin compresión HTTP | 1.109,515 MB | 10,710 MB |

MB significa 1.000.000 de bytes. El tamaño solicitado no es lo mismo que el ya recibido: v368 todavía tenía numerosas descargas pendientes al cerrar la ventana. Los bytes recibidos incluyen cabeceras, por lo que pueden superar ligeramente el tamaño de los archivos completados.

La aparición del menú se registra al retirarse `intro-pendiente`; el fundido de salida de 720 ms continúa después. La introducción y sus duraciones no se modificaron. El tamaño de instalación se calculó con los bytes normalizados que publica Git; no se cronometró una instalación local completa de 1,1 GB de v368. La instalación real del núcleo de v369 se comprobó aparte con su worker sin modificar: entre aproximadamente 4,0 y 6,6 segundos en ejecuciones locales; última ejecución 6.649 ms. Ese cronómetro incluye abrir la página y esperar su control por el worker, sin la limitación artificial aplicada al benchmark de arranque.

En la medición final, v369 no produjo excepciones JavaScript, errores de consola, respuestas HTTP de error ni solicitudes fallidas. Los datos completos están en `E:/Proyectos/Aventura-de-Palabras-i18n-stage2b/docs/v369-mediciones.json`. Se reproducen con `node tools/measure-progressive-loading.cjs`.

**Comportamiento implementado**

- El catálogo completo conserva los 710 recursos de v368 y añade los dos módulos de carga. El núcleo contiene el código, los datos de idioma y los recursos del menú y la introducción inicial, incluyendo su audio. Las imágenes de paneles ocultos y sus adornos se cargan cuando resultan visibles.
- Las músicas de escenas futuras no se descargan al abrir el juego. Se conservan los archivos y la reproducción existente; cambia su preparación. Las imágenes indispensables que deben cargarse antes de mostrar una pantalla se solicitan explícitamente para evitar bloqueos de imágenes diferidas.
- Antes de entrar a una misión se comprueba su conjunto de recursos, con fondos del mundo, elementos compartidos, personajes narrativos, sonidos y cinemáticas. Los combates preparan las poses, los recursos de ambos personajes, sus trajes y finales, las músicas y los escenarios. La preparación del prólogo también espera sus archivos. Los paquetes comparten los archivos y se reutilizan por hash.
- En desafíos online, la comprobación ocurre antes de `guardarDesafio`. Se bloquea una segunda confirmación mientras la primera sigue pendiente. No se añadieron reintentos automáticos de RPC, escrituras o jugadas; no se tocaron los temporizadores del servidor. La reconexión conserva las reglas vigentes.
- El SDK mantiene su versión fijada y recibe una precarga con prioridad alta. Su cargador sigue siendo de una sola operación pendiente y distingue un fallo de descarga del SDK de un fallo posterior al inicializar Supabase. Precargar el SDK no crea cuentas ni sesiones.
- El worker se registra al estar listo el DOM, sin esperar todas las imágenes y sonidos de la página. La interfaz admite progreso de la primera instalación, comprueba que el mensaje venga de su registro y ofrece reintento manual y al recuperar la red. Las comprobaciones de actualización se agrupan en una sola operación pendiente.
- El núcleo solo se publica en caché tras completarse y verificarse. Los recursos adicionales se descargan bajo demanda con SHA-256, solicitudes compartidas, concurrencia limitada, plazos y reintentos acotados de lectura. Una descarga parcial de audio no sustituye al archivo completo.
- Cada consulta de disponibilidad offline revisa la presencia real de todos los archivos del conjunto; no utiliza una marca permanente de «descargado». También se revisa el núcleo antes de anunciarlo disponible. La interfaz distingue núcleo instalado de contenido pendiente de descargar.

**Conservación y compatibilidad**

No se alteraron los archivos de `assets`, los bancos de palabras, el motor de palabras, las migraciones ni la referencia de caché v347. Las reglas, puntos, monedas, compras, clasificaciones y estadísticas no forman parte de los cambios.

La activación de v369 conserva las cachés anteriores. Mantiene referencias a los recursos opcionales antiguos en su ubicación original y reutiliza los archivos compartidos con igual hash; no copia las colecciones de imágenes y sonidos. La versión activa sigue disponible si una descarga nueva falla. Se comprobó la separación entre el worker activo y el que espera autorización para actualizar.

Un cliente de v369 detecta si todavía lo controla el worker de v368, que no conoce el protocolo de paquetes. En ese caso valida las descargas sin presentar esa validación como garantía offline; el protocolo nuevo se utiliza cuando cambia el controlador.

La prueba real de actualización v368 → v369 conservó, byte por byte, localStorage e IndexedDB con datos ficticios de perfil, cartera, compras, progreso de Aventura, Torre, idioma, audio y una marca sintética de sesión. No se utilizó el perfil personal del navegador ni datos de jugadores para estas pruebas.

**Pruebas ejecutadas y resultado**

La suite completa de `tests/*.test.cjs` terminó con **204 aprobadas, 0 fallos y 0 omitidas**. Incluye las regresiones existentes y las pruebas nuevas de instalación mínima, caché antigua, interrupción y reanudación, archivos desalojados, cuota insuficiente tanto en el núcleo como en paquetes, progreso sin controlador, reintento único y descarga única del SDK. La falta de espacio se simuló sin llenar el disco ni borrar datos.

También aprobaron estas comprobaciones de navegador y generación:

- `tools/check-progressive-install.cjs`: worker real sin recortar; instalación nueva, progreso previo al controlador, paquete incompleto rechazado, recuperación tras error 503, guardado sin cambios, tres idiomas offline, imagen HTTP 200 y audio HTTP 206 desde caché.
- `tools/check-release-update.cjs`, con `PREVIOUS_RELEASE_REF=d3d0bf1`: actualización real v368 → v369, aislamiento de versiones y conservación de localStorage e IndexedDB; usa un conjunto acotado de medios para la prueba de actualización.
- `tools/check-incremental-update.cjs`: migración antigua sin copiar recursos; una actualización CSS solo descarga su archivo; rangos de imagen y audio y reproducción real offline.
- `tools/check-i18n-2b.cjs`: interfaz, perfil, tienda, rangos, trajes, tres idiomas, tamaños móviles y alternativa española cuando fallan los catálogos.
- `tools/check-i18n-3d.cjs`: ocho mundos traducidos, palabras y pistas, ciclos del banco, persistencia, portugués con cedilla y alternativas seguras.
- `tools/check-i18n-3e.cjs`, normal y `--offline`: diez temáticas en tres idiomas, selección manual y automática, fijación, regeneración, recuperación, Torre y tutorial.
- `tools/check-versus-vocabulary-ui.cjs`: bancos sin cambios y compatibilidad del cliente antiguo con las 2.581 incorporaciones de v368.
- `tools/check-combat-images-ready.cjs`: la entrada espera la decodificación, cuadros de Nivor, ataques simultáneos, cancelación y reintento.
- `tools/check-costumes-before-duel.cjs`: selección de trajes en Versus y Torre, originales y comprados, dos tamaños de pantalla.
- `tools/check-audio-settings.cjs`, `tools/check-world-music.cjs` y `tools/check-character-music.cjs`: mezclador y persistencia, seis pistas de mundo, diez temas de personajes, transición de cinemática a duelo, pausa, bucles y reproducción real offline.
- `tools/check-cinema-audio-offline.cjs`: espera de música, interrupciones, bloqueo de reproducción automática, continuación silenciosa explícita y tres MP3 reales offline.
- `tools/check-narrative-offline.cjs`: traducciones narrativas y preferencia de idioma después de recargar offline.
- `tools/build-cache-manifest.cjs --check`, `tools/prepare-progressive-assets.cjs --check`, `tools/build-i18n-ui-fallback.cjs --check`, `tools/build-versus-vocabulary.cjs --check` y `git diff --check`: correctos.

Se actualizaron auxiliares antiguos de prueba para esperar el worker específico antes de desconectar, suministrar el mezclador en una prueba aislada, comprobar el volumen lógico actual y admitir trajes que ya existían. Estos ajustes no cambian el audio ni las reglas del juego.

La conectividad real se verificó mediante GET a `/auth/v1/settings`: HTTP 200, fallo esperado con la red desconectada y HTTP 200 al reconectar; 917 ms para la secuencia, validación TLS activa y cero escrituras. Node falló con `UNABLE_TO_VERIFY_LEAF_SIGNATURE`; Edge, que utiliza su almacén de confianza, pasó sin desactivar TLS. Esto identifica una limitación de certificados de Node, no un fallo observado en Supabase desde el navegador.

**Archivos y reproducción**

Todos están dentro de `E:/Proyectos/Aventura-de-Palabras-i18n-stage2b`:

- Arranque e integración: `index.html`, `js/app.js`, `js/audio-settings.js`, `js/supabase-loader.js`, `js/pwa.js` y `sw.js`.
- Imágenes de elementos ocultos: `js/player-avatar.js`, `js/public-player-profile.js`, `js/versus-ranks.js` y `js/aren-union-duel.js`.
- Catálogo y carga: nuevos `js/resource-catalog.js`, `js/resource-loader.js` y `tools/prepare-progressive-assets.cjs`; generador actualizado `tools/build-cache-manifest.cjs`.
- Textos: `locales/es/common.json`, `locales/en/common.json`, `locales/pt-BR/common.json` y su alternativa generada `js/i18n-es-fallback.js`.
- Pruebas: nuevo `tests/progressive-loading.test.cjs`; ajustes en `tests/pwa-incremental-cache.test.cjs`, `tests/pwa-update-progress.test.cjs`, `tests/offline-local-modes.test.cjs` y `tests/spanish-word-banks.test.cjs`.
- Auxiliares: nuevos `tools/check-progressive-install.cjs` y `tools/measure-progressive-loading.cjs`; ajustes en las comprobaciones de actualización, narrativa offline, música, cinemáticas y selección de trajes mencionadas arriba.
- Informe: `docs/v369-validacion.md` y `docs/v369-mediciones.json`.

Después de cualquier cambio de ejecución: `node tools/build-cache-manifest.cjs` y luego `node tools/build-cache-manifest.cjs --check`. El generador mantiene el catálogo del cliente sincronizado antes de calcular sus hashes.

**Límites y pendientes para la revisión**

Los paquetes de mundos y combates conservan los PNG y audios originales y varios recursos compartidos. Pueden seguir siendo grandes en su primera descarga; esta versión elimina su descarga obligatoria durante la instalación inicial. No hubo conversión ni compresión de recursos. Las instalaciones de v368 conservan lo que ya tenían descargado y, por tanto, no liberan automáticamente ese espacio.

La conservación de cachés antiguas es deliberada: protege pestañas anteriores y recursos opcionales, a costa de mantener metadatos y código de versiones previas. El navegador todavía puede desalojar archivos por su política de almacenamiento; la comprobación de presencia evita anunciar como completo un conjunto al que le falten archivos.

Quedan para validación manual en dispositivos: instalación física en Android/iOS y partidas completas entre dos dispositivos contra Supabase, incluyendo desafío entre amigos, reconexión y revancha. Las regresiones locales y simuladas no se presentan como partidas reales de producción. No se ejecutaron los auxiliares que crean cuentas o escriben partidas en producción, ni se alteraron estadísticas reales. Tampoco hubo verificación de un despliegue v369: todavía no se publicó.
