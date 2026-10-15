# Etapa 3B: contexto de combate, letras e historial

Implementada el 15 de octubre de 2026, después de los controles de sonido v354. Publicación preparada como v355.

## Alcance

- `js/word-gameplay.js` contiene reglas independientes para español, inglés y portugués brasileño, alfabetos congelados y validación estricta de bancos. Usa Unicode NFC. En español, las tildes y Ü equivalen a su vocal y Ñ sigue siendo distinta de N. En portugués, vocales acentuadas y Ç se aciertan con su letra base. La grafía original se conserva al revelar la palabra.
- Los bancos se validan antes del combate. Una palabra inválida, una pista ausente o un duplicado normalizado se rechazan; no se corrigen silenciosamente. Se conserva la limpieza histórica del formulario español de preparación para compatibilidad.
- Cada combate captura idioma solicitado, idioma efectivo, versión de banco y reglas, y alfabeto. Aventura, duelos locales, Torre y recepción de una partida online establecen ese contexto. IA, recuperación, pistas y habilidades que usan letras toman el mismo motor y filas de teclado.
- Únicamente están habilitados los bancos originales españoles. Elegir inglés o portugués conserva palabras, pistas y teclado españoles. Los bancos nuevos pertenecen a 3C y 3E. El online permanece en español sin cambiar el protocolo ni el servidor.
- La interfaz conserva su idioma durante el combate. Preferencias manuales, cambios del dispositivo y eventos de otra pestaña se guardan y se aplican al regresar al menú o iniciar el siguiente combate. Las cargas asíncronas de catálogos también respetan el bloqueo. La última preferencia prevalece.
- Las partidas existentes conservan avance, monedas, experiencia, desbloqueos y misiones. El historial nuevo se guarda por idioma y mundo, usando IDs de la posición del banco original (`es:world:0:word:0`) y una versión de esquema. No se deben reordenar esos bancos originales. Se mantiene el campo español anterior para compatibilidad con versiones anteriores. Los historiales de otros idiomas se conservan por separado.
- Se adaptó la evaluación de Aventura para comparar claves de letras y conservar la ortografía revelada, igual que el motor de duelos.

No se añadieron palabras ni traducciones narrativas. No se modificaron daño, tiempos, vidas, carga de habilidades ni recompensas. No se realizaron operaciones en Supabase. Esta etapa no añade guardado completo de un combate interrumpido; se conserva el punto de continuación existente.

## Verificación

- Suite completa: **159 pruebas aprobadas de 161**. Persisten los dos fallos previamente documentados: el fixture de `adventure-world5.test.cjs` no proporciona `guardarDesbloqueoAzrak`, y `versus-ui.test.cjs` exige asignaciones antiguas de sprites anteriores al sistema de trajes. Se actualizaron las expectativas estructurales afectadas por el mezclador de audio y el motor capturado.
- Las huellas originales de los 250 pares palabra/pista y las 2.000 palabras temáticas siguen siendo idénticas a v343.
- Pruebas nuevas de caracteres compuestos/descompuestos, Ñ/N, Ç/C, vocales portuguesas, letras repetidas, progreso visible, errores, recuperación, validación de bancos y constantes de dificultad.
- Pruebas nuevas de bloqueo de idioma, preferencias concurrentes, liberación múltiple, carga asíncrona de catálogos y detección inicial demorada.
- Historial: ciclos completos de palabras, recarga, migración de guardados anteriores, IDs estables, rechazo de IDs corruptos, compatibilidad del campo anterior y conservación del historial de otros idiomas.
- `tools/check-i18n-3b.cjs`: Edge con recursos reales, misión real, cambios desde otra pestaña y del dispositivo, palabras/pistas/letras/intentos/progreso/dinero estables, regreso al menú, recarga, preparación real de duelo local y Torre. El contexto online se prueba localmente; no equivale a un duelo entre dispositivos ni a validación del servidor.
- `tools/check-i18n-3b-offline.cjs`: worker real, archivos JS y catálogos reales, reglas y bancos españoles en caché, recarga offline, entrada de Ñ, bloqueo de idioma y normalización portuguesa. El worker de esta prueba omite imágenes y audio de su lista de instalación para no repetir su descarga; no modifica recursos del repositorio.
- `tools/check-i18n-2b.cjs`: regresión de menú, Configuración, tienda, perfiles, ranking, marcos y presentación de Torre en tres idiomas y tamaños móviles.
- `tools/check-audio-settings.cjs`: controles de volumen de v354, persistencia, silencio, ganancia del teclado, tres idiomas y diseño móvil.
- Manifiesto regenerado y comprobado. Migración de caché, aislamiento de la versión instalada y rangos multimedia cubiertos por la suite.

## Próxima etapa

3C: un mundo piloto de Aventura con bancos completos en inglés y portugués, revisión de dificultad y pruebas en celular y offline. La 3B todavía necesita una prueba física del usuario en su teléfono.
