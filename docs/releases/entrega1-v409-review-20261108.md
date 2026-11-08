# Entrega 1 — Estabilidad del juego, candidata v409

Base pública: v408, `25bea5df21c4f8469b08ea2ade9ab53de9058126`.
Versión preparada: `v409-stability-only1`. **No publicada. No requiere migraciones.**

## Alcance y archivos de ejecución

| Archivo | Cambio |
| --- | --- |
| `js/pwa.js` | El worker listo prevalece sobre progreso tardío; recuperación del aviso, una activación por clic y recarga diferida hasta el menú, sin recargar otra pestaña sin consentimiento |
| `js/player-avatar.js` | «Conectando…» durante la consulta, sin presentar una espera como alias de invitado |
| `js/versus-room-supabase.js` | Rechazo de perfiles de otra identidad o sesión cambiada mientras se resolvía el RPC |
| `js/app.js` | Únicamente el respaldo del alias: no reutiliza el campo de nombre de otra cuenta |
| `index.html` | Nombre inicial neutral del perfil |
| `js/tower-online.js` | Agrupa liquidaciones simultáneas y reutiliza en memoria la confirmación válida del mismo intento; conserva reintentos, recuperación y aviso único de recibo |
| `sw.js` | Nombre de caché v409 y manifiesto generado para estos recursos |

En Torre, **un nuevo intento de un piso repetido todavía se valida en el servidor**. No se omiten certificación o liquidación según un progreso local. El servidor conserva la entrega única por cuenta/personaje/piso. La optimización solo evita liquidar otra vez un mismo intento que ya tiene recibo confirmado en la sesión. Una respuesta pendiente no se marca como pagada; después de recargar se vuelve a consultar la autoridad del servidor. No se agregan permisos ni fuentes de monedas.

El guard anterior para repetición de **misiones de aventura** no forma parte de esta entrega: no era una corrección de pisos de Torre. Su parche original queda archivado para revisión futura. Tampoco se incluyen SQL o cambios de Me gusta, propiedad de personajes de historia, seguridad histórica, anuncios, arte, selectores o reglas de premios.

## Pruebas y diferencia de recuento

La suite general pasa **334/334, cero omitidas**. La batería previa de 330 incluía un caso ligado al guard de misiones de aventura pospuesto; ese caso se retira de esta entrega junto con el cambio. Se incorporan cinco casos específicos de Torre. No se presenta el recuento nuevo como si fueran exactamente los mismos 330 casos sin cambios.

Los cinco casos verifican: concurrencia y recuperación del mismo intento confirmado; nuevo intento del mismo piso con un solo pago/aviso; pago aún pendiente que sigue admitiendo reintento; respuesta perdida con recuperación desde un cliente nuevo y el mismo identificador de solicitud; cambio de cuenta durante una liquidación.

Pasan además el navegador con Service Worker real, estado activo/en espera, aviso tras mensajes tardíos, protección de partida/pestaña, conservación de marcadores de sesión/progreso e IndexedDB, rangos de audio offline, prueba incremental existente y carga demorada del perfil. Los recursos del manifiesto siguen siendo 913. Se conservan las regresiones y se actualizan los fixtures históricos al contrato autoritativo vigente; no se reintroduce el pago local.

Soporte de pruebas: `tests/adventure-map.test.cjs`, `adventure-mural.test.cjs`, `adventure-world3-complete.test.cjs`, `adventure-world4-complete.test.cjs`, `desert-channels.test.cjs`, `developer-access.test.cjs`, `economy-scale.test.cjs`, `i18n-interface.test.cjs`, `offline-local-modes.test.cjs`, `progressive-loading.test.cjs`, `pwa-ready-race.test.cjs`, `pwa-update-progress.test.cjs`, `tower-settlement-repeat.test.cjs`, `versus-stage2-reconnect.test.cjs`, `versus-ui.test.cjs`; herramientas `tools/check-profile-session-stability.cjs` y `tools/check-stabilization-update.cjs`.

## Permisos y datos

Comprobación alojada de solo lectura: `enabled=true`, `payments_enabled=true`, **`global_enabled=false`**, un piloto autorizado; `grants_enabled=true` sujeto a ese alcance. Se guardan huellas de ambas filas para compararlas antes de una publicación futura. Esta entrega no contiene actualizaciones de esos indicadores, scripts SQL instalables ni modificaciones de inventarios/progreso.

No se borra localStorage, IndexedDB, sesión de Auth o caché multimedia. La deduplicación de liquidaciones es en memoria; las solicitudes pendientes siguen usando su identificador persistido. Las imágenes y la configuración del cliente Supabase no cambian.

Riesgo residual: las pruebas de sesión y datos usan un navegador aislado con marcadores y RPC sintéticos; no equivalen a renovar una sesión real de Android. Queda la aceptación física del botón de actualización, retorno desde segundo plano y reconexión móvil. Si una actualización se acepta justo antes de salir del menú, puede cambiar el controlador, pero se difiere la recarga de la página hasta regresar. No se promete riesgo cero ni funcionamiento de todas las combinaciones Android/WebView sin esa prueba.

## Respaldo, publicación futura y reversión

El paquete local conserva los siete archivos de ejecución exactos de v408, sus hashes y un manifiesto de la candidata. No es una copia completa del proyecto ni un respaldo de cuentas: no se modifican datos remotos y no se necesita restaurar saldos o sesiones para este cambio.

Solo después de presentar estos resultados y recibir autorización:

1. Confirmar que el remoto sigue en la base esperada. Si avanzó, detenerse y revisar la nueva base; no forzar el push.
2. Repetir la lectura de los indicadores del piloto y comparar sus huellas; cualquier cambio requiere revisión.
3. Publicar **el commit de Entrega 1**, nunca el HEAD de otra rama o el árbol de trabajo con archivos de Entrega 2.
4. Esperar el despliegue, comparar hashes públicos y hacer la prueba de actualización Android sin borrar datos. El piloto y el alcance global se vuelven a leer, sin modificarlos.
5. Si hace falta revertir, usar los siete recursos de v408 y el worker preparado con una versión de caché **superior** (`v410-stability-rollback1`), en un commit nuevo aprobado. No volver a publicar un worker con numeración menor ni borrar cachés, recibos o progresos. Si ya existe otra versión superior, recalcular una numeración mayor antes de la reversión.

La reversión es de código; no ejecuta SQL. No se ha publicado ni activado el rollback preparado. Su manifiesto se contrasta con los bytes de respaldo y conserva la estrategia de reutilización de recursos de v408.
