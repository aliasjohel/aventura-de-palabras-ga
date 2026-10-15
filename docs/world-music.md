# Música ambiental por mundo — v350

Temas aprobados por el usuario el 14 de octubre de 2026:

| Mundo | Tema | Autor |
| --- | --- | --- |
| Bosque | Sunset Plains | Yoiyami |
| Desierto | Egyptian Meditation Music | brandon75689 |
| Cumbres Celestes | Fantasy: Rising Moon | RandomMind |
| Invierno, misiones 1–3 | Through the Snow, versión lenta original | Cleyton Kauffman |
| Invierno, misiones 4–10 | Through the Snow, versión normal original | Cleyton Kauffman |
| Reino de Azrak | At the End of Hope, sección loop original | Emma_MA |

El cambio de invierno coincide con «La aldea detenida», misión 4, donde Aren
descubre a los habitantes atrapados en el hielo. No se altera la velocidad de
reproducción en el navegador: se usan las dos versiones entregadas por el autor.

Volumen base de reproducción: 0.14, reducido a 0.035 durante diálogos. Las
piezas se normalizan a -18 LUFS con límite de pico de -3 dB y se codifican en
MP3 estéreo a 112 kbps. Se repiten y mantienen su posición entre desafíos.
Al cambiar de pieza se aplica una transición de volumen de 650 ms.
Se pausan al salir de Aventura, ocultar la aplicación y durante cinemáticas
con su propia música. El audio bloqueado por autoplay espera una interacción
del jugador y no impide jugar.

Licencia elegida: CC0 para todas las piezas. Autores, páginas de origen y
notas de procesamiento figuran en `assets/licenses/world-music.txt`.
Ese archivo y las seis pistas forman parte del paquete offline.

Descargas originales utilizadas:

- https://opengameart.org/sites/default/files/sunset_plains.wav
- https://opengameart.org/sites/default/files/v312.ogg
- https://opengameart.org/sites/default/files/Rising_Moon_0.mp3
- https://opengameart.org/sites/default/files/snow_theme_1.zip
- https://opengameart.org/sites/default/files/at_the_end_of_hope_loop.wav

Conversión reproducible con `tools/prepare-world-music.py` e imageio-ffmpeg.
Los originales quedan fuera del repositorio; se publican los MP3 comprimidos.
El manifiesto incremental descarga únicamente las pistas nuevas y los archivos
de integración modificados. Conserva todos los recursos existentes.

No modifica palabras, progreso, mecánicas ni avanza la Etapa 3B.

También se oculta el indicador de corazones de la exploración, a pedido del
usuario: las trampas de cada mundo conservan sus seis etapas y la cantidad
de intentos no cambia. Los indicadores de los duelos siguen disponibles.

El «Game Over» hablado se reemplaza por `defeat-crystal-chime.wav`: tres notas
descendentes de cristal, sintetizadas sin muestras de terceros. Se conserva
el mismo disparador de derrota en exploración y duelos. No cambia ningún
resultado, contador ni guardado. Generación reproducible en
`tools/generate-defeat-sound.py`.
