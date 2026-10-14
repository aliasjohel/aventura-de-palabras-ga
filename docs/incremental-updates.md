# Actualizaciones incrementales — v348

Implementado el 14 de octubre de 2026, antes de la Etapa 3B.

Cada recurso instalado tiene una revisión SHA-256 calculada a partir de los
bytes publicados por Git. `tools/build-cache-manifest.cjs` genera el manifiesto
dentro de `sw.js`; `--check` detecta recursos modificados sin regenerarlo.

Cada versión guarda dos pequeños documentos: revisiones y ubicaciones. Las
imágenes, música, código y traducciones existentes se usan desde su ubicación
actual, sin copiarlas. Los archivos nuevos o modificados se guardan una sola
vez en una caché de recursos compartida, con claves que incluyen su hash.
Un archivo no se sobrescribe mientras la versión anterior lo está usando.

La migración reconoce las revisiones manuales anteriores solamente para
recursos cuyo contenido coincide con el publicado en v347. La tabla original
`tools/cache-legacy-v347.json` se conserva como evidencia de esa compatibilidad.
Una caché anterior se retiene mientras la nueva versión la siga usando.
Los documentos de versiones obsoletas que no sean necesarios se eliminan al
activar la actualización. Los recursos compartidos verificados se conservan
para reutilización y reintentos; esta versión no purga automáticamente bytes
individuales de revisiones anteriores.

Solo se activa una actualización completa. Las descargas se verifican antes
de guardarlas; una respuesta vieja del servidor o una interrupción deja el
juego anterior disponible. Un reintento conserva las descargas verificadas
que ya completó. La instalación inicial sí descarga el paquete completo.
Si el usuario borra los datos o Android elimina archivos por falta de espacio,
es necesario recuperar los recursos faltantes.

No cambia palabras, idiomas, progreso, mecánicas, compras ni multijugador.

## Validación

- Simulación completa de migración desde v347: 649 referencias reutilizadas,
  cero descargas de recursos y solamente dos escrituras de metadatos.
- Actualización de un único CSS: una descarga y una escritura de recurso;
  imágenes, música y código intactos, sin copiar.
- Fallo de red, reintento parcial, respuesta del servidor incorrecta,
  aislamiento entre versión activa y pendiente, y archivos de audio por rangos.
- Navegador Edge real: migración sin descargas, actualización de un único CSS,
  imagen offline y reproducción real de MP3 desde la caché original sin red.
