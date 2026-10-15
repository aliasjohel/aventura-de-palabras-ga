# Etapa 3C: piloto de palabras del Bosque

Implementada el 15 de octubre de 2026. Publicación preparada como v358, conservando sonido, reglas 3B y las correcciones de arena v356/v357.

## Contenido y alcance

- `js/word-banks-forest.js`: 50 pares palabra/pista en inglés y 50 en portugués brasileño. Banco `forest-v1`, entradas y listas congeladas. Mantener su orden: los IDs de historial se refieren a posiciones estables dentro de cada idioma.
- Los desafíos normales del Bosque seleccionan el banco del idioma de la interfaz al comenzar el desafío. La respuesta, pista, reglas y teclado permanecen juntos y fijos durante el combate.
- Español conserva exactamente los datos originales. Inglés y portugués usan A–Z; el portugués conserva acentos y Ç al revelar la respuesta, aunque se acierten con la letra base.
- Los otros mundos, los duelos especiales del Bosque, Torre, Versus, online, puzzles y narrativa conservan sus bancos y contenido español. Sus controles continúan siguiendo las traducciones existentes.
- Si el módulo piloto no está disponible, se resuelven palabras, pistas y teclado juntos en español antes de comenzar. No se mezclan pistas y respuestas de idiomas diferentes.
- Configuración explica este alcance. Cambiar el idioma no reinicia misiones ni desafíos completados.
- El historial usa el mismo esquema 3B, con prefijos independientes `es:`, `en:` y `pt-BR:`. Los historiales españoles anteriores siguen siendo válidos y se conserva su campo de compatibilidad. No se modifica el banco español compartido para seleccionar otros idiomas.

No se modificaron tiempos, corazones, daño, carga de habilidades ni recompensas. No se realizaron operaciones en Supabase. La historia no está traducida en esta etapa y no se avanzó a 3D.

## Revisión de dificultad

Se usaron palabras naturales del mismo tema con pistas propias del idioma, sin exigir equivalencias literales cuando resultan poco adecuadas. Por ejemplo, portugués usa PERERECA para mantener una respuesta jugable de al menos tres letras, en lugar de RÃ.

| Banco | Entradas | Longitud media | Letras distintas medias |
| --- | ---: | ---: | ---: |
| Español original | 50 | 5,50 | 4,78 |
| Inglés | 50 | 5,10 | 4,58 |
| Portugués brasileño | 50 | 6,10 | 5,30 |

Las diferencias medias quedan por debajo del 15 %. Todas las palabras son alcanzables con su teclado y respetan el límite de 3–12 letras. Se probaron pistas presentes, duplicados normalizados, respuesta revelada y constantes de combate. Estas medidas comparan carga de letras, no garantizan idéntica dificultad subjetiva; falta la revisión del usuario en el celular.

## Verificación

- Suite general: **163 de 165 pruebas aprobadas**. Continúan los dos fallos ya documentados en 3B: fixture de `adventure-world5.test.cjs` sin `guardarDesbloqueoAzrak` y expectativa antigua de sprites en `versus-ui.test.cjs`. No se alteraron sus funciones ni pruebas.
- `tests/forest-word-banks.test.cjs`: bancos completos, inmutabilidad, validación, ortografía y normalización portuguesa, respuesta alcanzable, comparación de longitudes/letras distintas y separación de IDs por idioma.
- `tools/check-i18n-3c.cjs`: misión real, selección de respuesta/pista por idioma, teclado 26/27 letras, C revela Ç en OURIÇO, bloqueo de idioma en combate, dos ciclos completos por banco nuevo sin repetición inmediata, historia española conservada, guardado y recarga, monedas y experiencia conservadas. Diseños de 320/390 vertical y 844 horizontal con TREPADEIRA. Fallback español en otros mundos, duelos y ante el fallo del módulo piloto.
- `tools/check-i18n-3c-offline.cjs`: worker real y módulos/catálogos reales, bancos completos en caché, selección portuguesa, Ç, cambio diferido, recarga offline y selección inglesa. Como en 3B, se excluyen arte y audio de la lista de instalación del worker de prueba para evitar repetir descargas pesadas; los archivos del repositorio no se sustituyen.
- Regresión de `tools/check-i18n-2b.cjs`: menú, Configuración, tienda, perfiles, ranking, marcos y presentación de Torre en los tres idiomas; fallback español ante fallo de catálogos.
- Pruebas de actualización incremental, caché instalada, rangos de audio y funcionamiento offline aprobadas. Manifiesto regenerado y comprobado.

Los scripts históricos 3B conservan las expectativas del alcance de aquella versión (Bosque español con interfaz extranjera). Para el Bosque del piloto se utilizan los verificadores 3C.

## Prueba sugerida en el teléfono

Elegir inglés o portugués en Configuración y jugar desafíos normales del Bosque. Comprobar palabras, pistas y teclado; cambiar nuevamente a español y continuar el mismo avance. Después de instalar la actualización, repetir sin conexión. Los duelos especiales y la historia todavía deben aparecer en español. Revisar claridad y dificultad de las pistas antes de ampliar a otros mundos en 3D.
