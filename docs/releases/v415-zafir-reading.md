# v415 — Lectura de Zafir y respuesta visual del teclado

Versión: `v415-zafir-reading1`. Base publicada: `bc18665ee51a933aec7fa1b641f68499d5019aaf`, v414-match-likes2. Entrega autorizada por el usuario el 9 de noviembre de 2026.

El diálogo previo al duelo final del mundo 2 se cerraba a los 2,8 segundos. Movimiento reducido podía eliminar la espera de lectura porque compartía el temporizador de las animaciones. Ahora su única intervención espera «Continuar»; el texto completo permanece hasta la acción del jugador, en los tres idiomas y con ambos ajustes de movimiento. No se añadieron frases ni se alteró la cinemática de victoria.

En duelos de Aventura, la letra pendiente se marca inmediatamente y expone `aria-busy`. La marca de usada sólo procede de la lista confirmada por el servidor. Se mantienen la cola de acciones, los bloqueos por habilidades y la protección contra repetir una letra pendiente. La presentación no calcula ni anticipa el resultado real.

## Alcance

- Juego: `js/app.js`, `css/styles.css`, `sw.js` —versión y hashes generados—.
- Verificación: `tests/adventure-zafir-reading-input.test.cjs`, `tools/check-zafir-reading.cjs`.
- Documentación: este informe.

Sin cambios de menú, imágenes nuevas, Me gusta, Torre, anuncios, reglas de combate, economía, XP, progreso, Auth o Supabase. Sin migraciones ni operaciones sobre cuentas reales. La nueva ilustración y propuesta de navegación continúan fuera de esta entrega.

## Pruebas

- 346/346 pruebas generales, sin fallos ni omitidas. Casos nuevos: lectura manual normal/reducida, letras pendientes/confirmadas, cambio de palabra, bloqueo de habilidad, respuesta lenta, toques repetidos y rechazo de solicitud sin inventar un resultado.
- 48 combinaciones de presentación aislada: 280/320/360/393 px, alturas 480/640, tres idiomas y ambos ajustes de movimiento; acceso y clic en Continuar, cierre y foco.
- Actualización exacta v414 → v415 en navegador: un clic en Actualizar ahora, sin recarga previa, preservando localStorage, sessionStorage, IndexedDB y cachés útiles; recarga offline satisfactoria. Los marcadores son de QA y no representan cuentas reales.
- Manifiesto de 915 recursos verificado y prueba de actualización incremental/rangos de audio e imagen offline satisfactoria.
- Comparación byte a byte normalizando finales de línea: desde `const escenasCinematicaFinalDesierto` hasta el final de `js/app.js`, la base y candidata son idénticas. Cubre cinemática final y desbloqueo de Zafir.

También se comprueba el diálogo dentro de la aplicación completa, con servicios externos bloqueados, antes y después de publicar. Los resultados de publicación y hashes se conservan en `.local-developer/releases/v415-zafir/`.

## Respaldo y reversión

Archivos originales, SHA-256 y commit base conservados en `.local-developer/releases/v415-zafir/backup/` y `preflight.json`. Revertir únicamente el commit de esta entrega mediante un nuevo commit, asignar un identificador PWA superior y regenerar/verificar el manifiesto. No forzar main hacia atrás, restaurar saldos ni borrar almacenamiento, progreso, inventarios o cachés útiles.

## Android

1. Abrir la PWA instalada y buscar actualizaciones. Aplicar Actualizar ahora sin borrar datos.
2. Entrar a la última misión del mundo 2. Dejar el texto de Zafir abierto más de cinco segundos; debe permanecer hasta tocar Continuar.
3. Probar también movimiento reducido y los idiomas disponibles. Confirmar que sólo comienza el duelo después de continuar.
4. Pulsar letras: señal dorada inmediata mientras esperan confirmación y marca de usada al confirmarse. Tocar repetidamente no debe repetir la jugada.
5. Completar el duelo y comprobar que la cinemática de victoria conserva su comportamiento. Comparar monedas/XP/progreso con la liquidación normal.

La mejora visual no certifica que toda pausa percibida en Android haya desaparecido; si persiste, distinguir espera de red de detención de audio/animación para orientar una medición posterior.
