# Etapa 3D: palabras y pistas de los cuatro mundos restantes

Implementada el 15 de octubre de 2026. Publicación preparada como v360, sobre v359. Conserva sonido, tormenta y transición del desierto, piloto 3C e historial separado del modo prueba.

## Alcance

`js/word-banks-worlds.js` incorpora bancos `worlds-v1` de 50 pares palabra/pista por mundo e idioma:

| Mundo | Inglés | Portugués brasileño |
| --- | ---: | ---: |
| Desierto | 50 | 50 |
| Cumbres | 50 | 50 |
| Invierno | 50 | 50 |
| Azrak | 50 | 50 |

Se añaden **400 pares**. Con las 100 entradas del Bosque de 3C, cada idioma nuevo tiene 250 palabras/pistas para los cinco mundos. El español original permanece idéntico.

El selector de idioma ahora se aplica a los desafíos normales de palabras de todos los mundos. El contexto fija banco, idioma efectivo, reglas y teclado antes de seleccionar la respuesta y su pista. Inglés y portugués usan 26 teclas; español conserva Ñ. Las tildes y Ç se muestran con su ortografía original y se aciertan mediante su letra base según las reglas 3B.

Las pistas se adaptaron para cada idioma. No se fuerza una traducción literal si produce una respuesta demasiado corta, con guion o poco adecuada. Por ejemplo, portugués usa FELTRO en lugar de LÃ (dos letras) y PRISMA en lugar de arco-íris (con guion). Cada respuesta tiene una pista correspondiente a esa respuesta, no a la palabra española sustituida.

Se tradujeron las etiquetas de tema de Cumbres e Invierno y la explicación corta de que las palabras corresponden al tema. Se conserva la indicación genérica del desierto solicitada por el usuario. Configuración explica el alcance vigente.

**Fuera de esta etapa:** narrativa, diálogos, cinemáticas, puzzles, tutorial y bancos de duelos locales/especiales, Torre y online. Esos contenidos siguen en español; sus controles mantienen las traducciones anteriores. No se modificaron Supabase, daño, corazones, tiempos, estadísticas, carga de habilidades ni recompensas. No se avanzó a 3E.

## Historial y compatibilidad

- Se conserva el esquema de IDs de 3B y el orden de los bancos. Los IDs del Bosque `forest-v1` no cambian al incorporar los otros mundos.
- Los historiales se mantienen por mundo e idioma. La selección actualiza solamente el registro del mundo utilizado; no sobrescribe otros registros si temporalmente falta un módulo de datos.
- El modo prueba conserva su almacenamiento independiente de v359, incluyendo cambios de misión y recargas. No consume el historial de la partida real.
- Se mantiene el ciclo de selección aleatoria sin repetición hasta agotar las 50 palabras del banco; al comenzar otro ciclo se evita repetir inmediatamente la última.
- Si no está disponible el módulo nuevo, el Bosque conserva sus bancos y los otros mundos usan palabra, pista y teclado españoles de manera conjunta. Los historiales extranjeros de mundos no disponibles se conservan.
- No se reinician avance, monedas, experiencia, misiones ni desbloqueos. Las partidas antiguas siguen cargándose mediante la migración existente.

## Revisión de dificultad

En cada banco se verificaron longitud de 3–12 letras, alfabeto alcanzable, pistas no vacías y ausencia de duplicados normalizados. Las medias de longitud y de letras distintas quedan dentro del 15 % del banco español correspondiente. Los límites y constantes de combate permanecen iguales.

Esta comparación controla la carga de letras, no garantiza idéntica dificultad subjetiva. La claridad de las pistas y el vocabulario requieren la prueba del usuario en su celular antes de extender los otros modos en 3E.

## Verificación

- Suite completa: **167/169 pruebas aprobadas**. Continúan los dos fallos antiguos documentados en 3B/3C: fixture de `adventure-world5.test.cjs` sin `guardarDesbloqueoAzrak` y expectativa obsoleta de sprites de `versus-ui.test.cjs`. No se modificaron esas funciones ni sus pruebas.
- `tests/adventure-translated-banks.test.cjs`: ocho bancos completos e inmutables, 400 palabras/pistas, respuestas alcanzables, diacríticos, constantes intactas, comparación de dificultad e IDs de Bosque conservados al migrar a cinco mundos.
- `tools/check-i18n-3d.cjs`: Edge y recursos reales; respuesta y pista correspondientes en los ocho bancos nuevos; dos ciclos completos normales y uno de prueba por banco; recarga de ambos historiales; progreso e historial español conservados; C revela Ç en AÇO; idioma fijo durante el combate; palabras de 12 letras en tamaños 320/390/844; duelos siguen en español. Simulación de módulo ausente: fallback completo y conservación de historial de otro mundo.
- `tools/check-i18n-3d-offline.cjs`: worker real con módulos y catálogos reales; selección en los cinco mundos, ambos idiomas, teclados, preferencias y todos los historiales tras recargar sin conexión. El worker de prueba excluye imágenes/audio de su lista de instalación para evitar repetir descargas pesadas; no sustituye archivos del repositorio.
- `tools/check-test-word-history.cjs`: regresión del caso SAL, selección sin repetir entre misiones y recargas, idiomas del Bosque separados y partida real intacta.
- `tools/check-desert-weather-transition.cjs`: completar las tres palabras, atravesar la caminata y llegar a la tormenta de la misión 2; cambio de clima entre misiones, entrada directa y movimiento reducido.
- `tools/check-i18n-2b.cjs`: regresión de menú, Configuración, tienda, perfiles, ranking, marcos y presentación de Torre en tres idiomas y tamaños móviles.
- Actualización incremental, aislamiento del paquete instalado, rangos multimedia y reproducción offline comprobados. Manifiesto regenerado y verificado.
- Revisión visual de Invierno en portugués (320 px, CONGELAMENTO) y Desierto en inglés con tormenta, pista y teclado visibles.

Los verificadores históricos 3B/3C que esperaban bancos españoles fuera del piloto documentan aquellas versiones. Para el alcance actual se utilizan los verificadores 3D.

## Prueba sugerida en el celular

Actualizar, elegir English o Português (Brasil) y continuar desafíos de Desierto, Cumbres, Invierno y Azrak. Revisar pista, teclado y respuesta; alternar idiomas entre combates, cerrar/reabrir y comprobar avance. Después de instalar, repetir sin conexión. El modo prueba también debe mantener las palabras pendientes entre misiones. La narrativa, los puzzles y los duelos especiales todavía deben usar su contenido español.
