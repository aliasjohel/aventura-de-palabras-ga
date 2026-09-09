# Cierre de la batalla de Azrak

Actualización posterior: la llegada de Cálamo y los tiempos vigentes se describen en [calamo-rescate-y-cine-horizontal.md](calamo-rescate-y-cine-horizontal.md). Los tiempos de esta nota corresponden al montaje anterior a esa llegada.

## Corrección de identidad integrada el 9 de septiembre

Se recuperaron las dos imágenes ya generadas mediante ImageGen integrado en la tarea anterior y se verificaron contra `assets/images/personajes/versus/azrak-base.png`. Archivos finales: `assets/images/cinematicas/reino-azrak/azrak-sellado-v2.png` y `assets/images/cinematicas/reino-azrak/amanecer-v2.png`. Azrak conserva piel roja, silueta delgada, pelo oscuro, cuernos con grietas de lava y armadura ajustada. Se actualizaron las referencias de la cinemática, las precargas y la caché v254 para descargar las imágenes nuevas. La música incorpora la introducción descrita abajo.

Prompt del sello: corregir únicamente al personaje encerrado usando el diseño original de Azrak como referencia; rostro rojo visible, orejas puntiagudas, pelo oscuro, cuernos negros con grietas naranjas, armadura negra con bordes de bronce y emblema naranja, cintura delgada y cola roja. Sin casco ni torso voluminoso. Mantener cristal completamente cerrado, cinco gemas, fortaleza, cielo y composición.

Prompt de victoria: corregir únicamente al villano dentro del cristal violeta del fondo superior izquierdo con esa misma identidad. Mantener todos los personajes del primer plano, rostros, ropa, posiciones, cinco cristales, altar, encuadre, castillo y cielo. Sin personajes adicionales ni texto.

Imagen generada con la herramienta integrada ImageGen: `assets/images/cinematicas/reino-azrak/azrak-sellado-v1.png`. Referencia: `amanecer-v1.png`.

## Tiempos vigentes

- Música original victoria-mundo5.mp3 desde cero hasta su final (130,951813 s). Nivor entra a los 17 s, conservando los tiempos originales de los planos.
- Después entra Final Battle de MusicLFiles, archivo aportado por el usuario, desde 88,333126 s hasta su final a 134,896313 s. Se utilizan sus últimos 46,563187 s con una entrada de volumen de 0,5 s.
- Fuente: https://pixabay.com/music/main-title-final-battle-123148/
- Archivo integrado: assets/sounds/azrak-batalla-final-musiclfiles.mp3. AlexGrohl ya no se reproduce en la cinemática.
- La batalla dura 177,515 s y termina con el sello cerrado. Sigue el interludio silencioso de 6,5 s y el epílogo con su pista completa de 183,864 s.
- Validación: 12 pruebas y reproducción acelerada en navegador con audio simulado, verificando Nivor a 17 s, ausencia de repetición, punto de entrada y final natural de MusicLFiles, silencio y epílogo. Duración del MP3 medida mediante decodificación del archivo real. No se realizó escucha subjetiva del empalme.

## Prompt de la imagen

Use case: illustration-story. Create a cinematic 16:9 final victory shot for this family fantasy adventure, using reference for exact art style, villain identity and setting. Focus exclusively on Azrak, the dark horned armored villain seen imprisoned in the purple crystal at far left of reference. Show him full body clearly and visibly ENCLOSED INSIDE a completely finished sealed monumental violet crystal prison in center foreground. Closed faceted pointed top and solid sealed base, continuous crystal on every side, no openings, no beam still sealing, no escape. Villain powerless, arms lowered, subdued glowing purple eyes, dark armor and horns matching reference. Five small colored magical seals around base signify completed lock. Peaceful fading golden light beyond dark volcanic fortress ruins, embers settling. The transparent purple facets let us see Azrak within but clearly separate him from outside. No other characters, no text, no labels, no watermark. Polished storybook 3D style matching reference, dramatic readable wide composition.
