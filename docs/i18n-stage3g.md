# Etapa 3G: multijugador por idioma

Implementada el 17 de octubre de 2026. Publicación v364.

## Comportamiento

- La sala guarda `word_language` (es, en, pt-BR). La búsqueda pública captura el idioma al iniciarse y solo empareja jugadores del mismo idioma y modo; conserva las reglas de rango. Una sala por código usa el idioma de quien la crea. Un desafío a un amigo conserva el idioma del desafiante. La revancha conserva el idioma de la sala.
- La interfaz sigue el idioma de cada dispositivo. Preparación, validación local, teclado y motor de palabras usan el idioma confirmado por la sala/partida, aunque el invitado use otra interfaz. Se muestra el idioma de las palabras en la sala. Los cambios de preferencia durante el combate siguen diferidos.
- El servidor valida palabras, temática, longitud, letras y duplicados; el nuevo diccionario privado comparte los bancos revisados en 3E para inglés y portugués. Las palabras de recuperación usan el mismo idioma. La equivalencia de acentos portugueses y Ç conserva la Ñ española. Azrak no selecciona Ñ en inglés o portugués. No se envían palabras secretas completas en el estado de combate.
- Salas, búsqueda, amigos, solicitudes, avisos, selección y mensajes rápidos usan catálogos. Los códigos y alias siguen literales, incluso cuando coinciden con una palabra de la interfaz. Los mensajes rápidos conservan sus IDs de protocolo y se traducen en el dispositivo receptor. Los errores desconocidos tienen un aviso traducido con el detalle conservado en español.
- Los RPC anteriores conservan el idioma español. Una versión anterior que intente entrar o aceptar un desafío de otro idioma recibe una indicación para actualizar. Se preservan las salas españolas existentes.
- La migración `20261018005734_online_word_languages.sql` fue aplicada y registrada en el proyecto existente. Los endpoints nuevos tienen wrappers SECURITY INVOKER, lógica privilegiada privada, comprobaciones de identidad/pertenencia y permisos limitados a authenticated. El diccionario privado no tiene acceso directo de jugadores.

## Verificación

- `tests/online-languages.sql`: ejecutado en el servidor con roles authenticated y rollback de fixtures. Cubre tres idiomas, validación de temática y duplicados, recuperación, habilidades, estado sin secretos completos, cola por idioma, compatibilidad con cliente anterior e invitaciones entre cuentas permanentes sintéticas.
- `tools/check-i18n-3g.cjs`: dos sesiones independientes de Edge contra el servidor real por idioma; creación, entrada por código desde otro idioma de interfaz, selección, cinco palabras, habilidad, victoria y revancha. Tres recorridos completos aprobados, sin errores JavaScript.
- `tools/check-i18n-3g-ui.cjs` y `--offline`: sala y selección en tres idiomas, mensajes rápidos, cambios de preferencia y alias/códigos literales. La variante offline instala el worker real omitiendo multimedia únicamente en el servidor de prueba; producción conserva la lista completa.
- Revisión visual a 844 × 390 de sala inglesa y combate portugués.
- `tests/online-languages.test.cjs`: contexto autoritativo independiente del idioma de interfaz y parámetros literales.
- Suite general: 177 de 179 aprobadas. Los dos fallos previos continúan: fixture de `adventure-world5.test.cjs` sin `guardarDesbloqueoAzrak` y expectativa antigua de sprites de `versus-ui.test.cjs`.
- Actualización incremental y reproducción offline aprobadas con `tools/check-incremental-update.cjs`. Catálogos, fallback y manifiesto verificados.
- Advisors del servidor revisados: sin errores nuevos de seguridad. El diccionario privado con RLS sin políticas está cerrado intencionalmente; los avisos de funciones privilegiadas y configuración de Auth corresponden al modelo existente de acceso mediante RPC.

## Prueba en celulares

Probar dos celulares en inglés o portugués: búsqueda de rival en el mismo idioma; sala por código con interfaces diferentes; mensajes rápidos; palabras con acentos portugueses; habilidad y revancha. El multijugador necesita conexión; la interfaz y los modos individuales siguen disponibles sin conexión.
