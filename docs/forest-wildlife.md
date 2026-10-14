# Vida del bosque y temas de palabras

Implementación local del 14 de octubre de 2026. Publicación autorizada como v345; no avanza la Etapa 3B.

Misión 1: pájaro volando con cuatro cuadros de aleteo. Misión 3: ardilla corriendo con cuatro cuadros. Misión 4: sin visitantes ni sonidos de animales durante la lluvia (ajuste v349). Primera aparición a los 6–10 segundos de juego visible; siguientes a los 22–40 segundos. Sonidos breves sintetizados con Web Audio (canto y chillido estilizados, no grabaciones naturales ni música continua), desbloqueados por interacción. Sin sonido en segundo plano y sin visitantes durante modales ni otros modos. Movimiento reducido conserva solamente el sonido.

Tema del bosque: «palabras del bosque». Mundo 5: «fuego, luz y esperanza», que abarca el vocabulario existente de la forja y los valores de unión. Ambas etiquetas traducidas a inglés y portugués. No cambian palabras, pistas, progreso ni nombres de los mundos.

Recursos añadidos a la lista offline. Caché v345 y referencias de los archivos modificados actualizadas para la publicación.

Arte generado con la herramienta integrada image_gen. Recursos finales: assets/images/elementos/pajaro-bosque-aleteo-v1.png y assets/images/elementos/ardilla-bosque-carrera-v1.png.

Prompts de producción: 

- Pájaro: Transparent horizontal sprite sheet: blue-and-russet woodland bird flying right in four wing positions, equal cells, same scale and center; painterly fantasy storybook game art; no scenery or text.
- Ardilla: Transparent horizontal sprite sheet: reddish woodland squirrel running right in four sequential running poses, equal cells, same scale and center; painterly fantasy storybook game art; no scenery or text.

Validación: tools/check-forest-wildlife.cjs comprueba aparición, cuadros animados, limpieza en diálogos y menú, exclusión de otros mundos, movimiento reducido y etiquetas en tres idiomas en navegador móvil. Pruebas de bancos españoles y traducción: 18 comprobaciones aprobadas.
