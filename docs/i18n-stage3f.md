# Etapa 3F: puzzles y tutorial

Implementada el 16 de octubre de 2026. Publicación v363.

## Cambios

- Los catorce puzzles de los cinco mundos y el mural del santuario presentan títulos, instrucciones, pistas, controles, mensajes y etiquetas accesibles en español, inglés y portugués brasileño. Se incluyen las runas, los juramentos y las diferencias de Azrak. Los textos de CSS «ACÁ» y «ENTRADA» pasan a etiquetas traducibles.
- `js/puzzle-lessons.js` conserva los datos originales españoles y añade soluciones propias por idioma. La sopa mantiene el tablero de 10 × 10 y tres trayectos rectos que no se cruzan: CLOUD/WIND/SKY y NUVEM/VENTO/CÉU. Los sellos tienen tres rondas de AIR/CLOUD/FREE o VENTO/NUVEM/LIVRE; cada anillo mantiene cinco opciones y contiene su letra correcta.
- El tutorial utiliza CAT/DOG/GOOSE/OTTER/TIGER en inglés y GATO/CÃO/LOBO/URSO/TIGRE en portugués. Cambian las letras indicadas y los textos de los ocho pasos. Los seis errores siguen quitando un solo corazón; la habilidad se llena exactamente hasta 8/8 en el paso previsto. Se conservan las habilidades reales, el ataque rival y el cierre con cinemática.
- `js/lessons-i18n.js` traduce la presentación de los renderizadores antiguos dentro de los modales de puzzles, mural y tutorial. Conserva el texto original de cada nodo para permitir cambios de idioma y actualizaciones de estado. No traduce valores de estado, clases, IDs ni letras individuales usadas para validar soluciones. Las etiquetas de canales y piezas usan parámetros explícitos para evitar ambigüedades en listas de direcciones.
- El idioma permanece fijo mientras está abierto un puzzle, el mural o el tutorial. Al salir se libera la preferencia pendiente. La prueba nueva también cubre cambios solicitados durante el tutorial completo.
- Al abrir una prueba se limpia el mensaje de la anterior, evitando mostrar instrucciones térmicas debajo de los juramentos de Azrak.

No hay cambios en recompensas, progreso, claves de guardado, físicas del laberinto, rondas de memoria, mecanismos de los puzzles visuales ni protocolo online. La longitud y el vocabulario de los puzzles de palabras varían por idioma; no se promete dificultad subjetiva idéntica. Online sigue en español y corresponde a 3G.

## Verificación

- `tests/puzzle-lessons.test.cjs`: respuestas de las sopas accesibles sobre sus trayectos reales, sin cruces; tres rondas de sellos resolubles; controles y carga del tutorial en los tres idiomas.
- `tools/check-i18n-3f.cjs`: Edge y archivos reales; apertura de los catorce puzzles por idioma; instrucciones y controles traducidos; resolución de las tres palabras mediante los controles de extremos y de las tres rondas de anillos mediante sus botones; mural de dieciséis piezas; bloqueo de idioma; ocho pasos reales del tutorial, habilidad propia, habilidad rival, victoria y control de omitir cinemática; partida conservada.
- `tools/check-i18n-3f.cjs --offline`: mismo recorrido después de instalar el worker real y recargar sin conexión. La lista de instalación de la prueba omite imágenes y audio para evitar repetir descargas; el repositorio y la caché de producción mantienen los recursos completos.
- Revisión visual del tutorial inglés a 844 × 390 y de la sopa portuguesa a 320 × 740. Se comprueba que el tablero móvil cabe en el ancho de pantalla.
- Suite general: 175 de 177 pruebas aprobadas. Persisten los dos fallos previamente documentados: fixture de `adventure-world5.test.cjs` sin `guardarDesbloqueoAzrak` y expectativa antigua de sprites de `versus-ui.test.cjs`.
- Regresión de 3E, narrativa, historial de palabras y actualización incremental, junto con las comprobaciones de catálogos, fallback y manifiesto.

## Próxima etapa

3G: multijugador online. Antes, probar en el celular los puzzles y el tutorial en inglés y portugués, incluido el cambio de idioma después de cerrar una prueba.
