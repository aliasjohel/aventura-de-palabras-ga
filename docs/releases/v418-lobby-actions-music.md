# v418 — Acciones por modalidad y músicas de selección

Versión: `v418-lobby-actions-music1`. Base: v417-duel-cards1, commit `01706f6fe5c7179c4796225f2e9fa5d502bb7e21`. Cambios y publicación conjunta autorizados por el usuario el 9 de noviembre de 2026.

## Flujo de Multijugador

Tocar Clásico o Clasificatorio abre debajo de esa tarjeta el botón existente de búsqueda, con el nombre de la modalidad. Seleccionar una tarjeta no inicia matchmaking: la búsqueda requiere pulsar Buscar rival. Se reutiliza un único conjunto de controles, movido junto a la modalidad elegida, sin botones duplicados ni nuevos handlers de búsqueda.

Se retiran de la vista el resumen repetido de rango, rangos/títulos y el bloque general Buscar partida. El nombre guardado sigue utilizándose sin mostrarlo. El campo existente sólo aparece si falta un nombre válido, conservando el flujo de invitados y las salas manuales. Amigos, Ranking, tutorial y creación/ingreso por código siguen accesibles; se agrupan los enlaces para ahorrar espacio.

Se conservan los radios nativos `classic`/`ranked`, navegación por teclado, cancelación, cola y adaptador. Se impide cambiar la modalidad mientras se espera la cancelación de una solicitud en curso para no redirigir la cancelación a otro modo. No se modifican reglas ni liquidación de duelos.

## Dos músicas nuevas

| Pantalla | Tema y autor | Archivo | Bytes |
| --- | --- | --- | --- |
| Multijugador, selección | Epic March Loop — Eldritch Grim | `assets/sounds/lobby-multiplayer-epic-march-v1.mp3` | 611.152 |
| Aventura y Torre, selección | Medieval: The Old Tower Inn — RandomMind | `assets/sounds/lobby-adventure-old-tower-inn-v1.mp3` | 700.386 |

Son composiciones nuevas para el proyecto: no se reutilizan ni reemplazan temas de personajes, exploración o menú. Se descargaron las versiones de loop originales y se convirtieron a MP3 estéreo 44,1 kHz/112 kbps, normalizado a -20 LUFS y techo -2 dBTP. Total añadido: 1.311.538 bytes, aproximadamente 1,25 MiB, descargados cuando se utilizan.

Fuentes primarias revisadas:

- [Epic March Loop](https://opengameart.org/content/epic-march-loop), [WAV original](https://opengameart.org/sites/default/files/the_march_of_devils_dome_loop.wav).
- [The Old Tower Inn](https://opengameart.org/content/medieval-the-old-tower-inn), [WAV loop original](https://opengameart.org/sites/default/files/Loop_The_Old_Tower_Inn.wav).

Ambos autores/publicadores declaran **CC0 1.0** en sus páginas. [CC0 permite copia, modificación y distribución incluso comercial](https://creativecommons.org/publicdomain/zero/1.0/). Se guardaron páginas, originales y SHA-256 en los registros privados de la entrega. Créditos voluntarios y procedencia se incluyen en `assets/licenses/lobby-music.txt`, accesible desde Ajustes en los tres idiomas. No se afirma respaldo del juego por los autores ni garantía de derechos distintos de los declarados.

El controlador musical existente administra estos dos ambientes. Respeta el mezclador de música y el silencio guardado, pausa al salir/ocultar la página y cede prioridad a combates/cinemáticas. El menú principal deja de sonar mientras se eligen Aventura/Torre y vuelve al cerrar. Un play interrumpido con AbortError no se confunde con un rechazo de autoplay.

## Validación

- **350/350 pruebas generales**, sin fallos ni omitidas; incluyen selección de temas nuevos, prioridad musical, silencio, cambio de pantalla, finalización tardía e interrupción de reproducción.
- **60 casos de regresión de tarjetas**: tamaños horizontales/verticales, tres idiomas y ambos ajustes de movimiento. Sin cambios en orientación, imágenes o valores de modalidad.
- **18 combinaciones del flujo nuevo**: acciones bajo la tarjeta correcta, cuenta guardada sin campo de nombre visible, rango oculto, controles manuales y fallback de invitado. Se verifican inicio explícito, protección contra doble toque, cancelación y modo correcto.
- Reproducción HTMLAudio real de los dos MP3, sin superposición con el menú; volumen cero mediante el mezclador y regreso al menú verificados. Backend/preparación multimedia simulados; sin cuentas, partidas o premios reales.
- Actualización exacta **v417 → v418**, un clic y sin recarga previa, conservando localStorage, sessionStorage, IndexedDB y cachés útiles; recarga offline satisfactoria.
- Manifiesto de **922 recursos** y verificación incremental adicional de imagen/audio offline satisfactorios.

Los ensayos de navegador no sustituyen la aceptación en un Android físico. Se repiten comprobaciones de interfaz y audio contra el sitio publicado, con servicios externos bloqueados y adaptador de prueba.

## Alcance y restauración

Presentación: `index.html`, `css/versus-ranks.css`, `js/multiplayer-lobby.js`, enlaces de integración en `js/app.js`. Música: `js/character-music.js`, dos MP3 y licencia. Tres textos de créditos, fallback/catálogo/manifiesto generados y pruebas. No cambian Supabase, RPC, monedas, XP, ranking, recompensas, inventarios, progreso ni Me gusta. No se instalan migraciones.

Punto de restauración: v417 y su commit base. Diez archivos anteriores y huellas quedan en `.local-developer/releases/v418-lobby-actions-music/backup/` y `preflight.json`. Revertir sólo esta entrega mediante un nuevo commit y una versión PWA superior, regenerando y verificando el manifiesto. Mantener servidos los MP3 durante la transición para clientes anteriores; no resetear main, restaurar saldos o borrar sesiones, progreso, inventarios o cachés útiles.

Android: Buscar actualizaciones → Actualizar ahora sin borrar datos. Entrar en Multijugador, tocar cada tarjeta y usar su botón de búsqueda. Escuchar el ambiente, volver al menú y abrir Aventura y Torre para comprobar el cambio musical. Revisar Ajustes si el volumen de música está a cero o se había silenciado la música del juego.
