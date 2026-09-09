# Cálamo interviene en el final y modo horizontal móvil

## Secuencia y música

Después de las ocho entregas de energía, Azrak grita «¡No lo permitiré!» y dispara al grupo. La pista original ya terminó con la entrega de Shadow, después de Lume. El ataque de Azrak dura 5,5 segundos en silencio. La segunda pista, Final Battle de MusicLFiles, entra al aparecer el primer plano de Cálamo sonriendo: «Perdón por llegar tarde». Cálamo levanta una barrera y después contiene los brazos de Azrak con tinta, dando tiempo a que Aren reciba la energía. Siguen la transformación, el ataque y las tres etapas del sello.

Se conserva la entrada de Nivor a los 17 segundos. Se restauraron los tiempos originales de todos los planos hasta Shadow, sin ajuste proporcional. Shadow comienza a los 127,160 segundos y su último plano dura 3,791813 segundos, cerrando los 130,951813 segundos de victoria-mundo5.mp3. La segunda música entra desde 68,071313 segundos (1:08,071), utiliza sus últimos 66,825 segundos y termina con el sello cerrado. La sonrisa y la segunda música comienzan a los 136,451813 segundos, después del ataque silencioso. Total de batalla, incluyendo ese silencio: 203,276813 segundos. Se conservan el silencio posterior y el epílogo musical completo.

En el duelo de Cálamo del desierto, assets/sounds/azrak-batalla-final-musiclfiles.mp3 empieza desde cero con la primera escena de su presentación en el desierto. Continúa sin reiniciarse durante el duelo, la victoria y la cinemática de retirada. Repite si el combate supera la duración de la pista. Se pausa al ocultar la pestaña, continúa desde el mismo punto al regresar y se detiene al terminar la cinemática de retirada o al abandonar/perder el duelo. La pausa manual de las cinemáticas también pausa el tema. Un reintento empieza desde cero.

## Arte generado con ImageGen integrado

Las cuatro imágenes se crearon con referencias del propio proyecto y se revisaron visualmente. Carpeta final: assets/images/cinematicas/reino-azrak/.

- **azrak-interrumpe-union-v1.png**. Prompt: plano cinematográfico 16:9; Azrak delgado de piel roja, cuernos con grietas de lava y armadura negra/bronce en primer plano derecho, gritando y lanzando un proyectil violeta al grupo de guardianes y Aren a la izquierda, antes de completar la unión. Fortaleza volcánica, estilo familiar del juego, sin texto ni prisión de cristal. Referencias: azrak-base.png y energia-unida-v1.png.
- **calamo-sonrisa-detalle-v1.png**. Reemplaza el primer plano anterior. Prompt de edición con ImageGen integrado: acercamiento extremo 16:9 exclusivamente a la boca sonriente de Cálamo y una pequeña parte de la máscara agrietada de pergamino en mejillas y nariz. Sonrisa segura ocupando el encuadre. Recorte debajo de los ojos: sin ojos, cabeza completa, sombrero, hombros, torso, manos, pluma ni tintero. Conservar tono de piel, diseño de máscara y estilo de fantasía de la referencia calamo-llegada-sonrisa-v1.png. Luz cálida y reflejo violeta tenue, sin texto.
- **calamo-barrera-tinta-v1.png**. Prompt: Cálamo en el centro mirando a la derecha, levanta una barrera curva de tinta turquesa con trazos dorados. La descarga violeta choca contra la cara exterior de la barrera. Aren y los guardianes quedan protegidos a la izquierda; Azrak se ve lejos a la derecha. Mantener identidades, iluminación y escenario, sin texto. Referencias: primer plano de Cálamo y ataque de Azrak.
- **calamo-contiene-azrak-v1.png**. Prompt: siguiente instante; Cálamo a la izquierda sujeta las muñecas de Azrak a la derecha mediante largas cintas turquesas ancladas al suelo. El proyectil se dispersa. Los guardianes siguen reuniendo energía detrás. Cálamo gana tiempo, no vence solo a Azrak; sin prisión de cristal ni texto. Referencias: barrera de tinta y azrak-base.png.

## Celular horizontal

La cinemática final detecta dispositivos táctiles pequeños. Libera el bloqueo vertical del juego e intenta orientación horizontal. En vertical muestra «Girá el celular» y mantiene detenidos el audio y el tiempo de los planos. Al girar, continúa automáticamente; una pausa manual se conserva. Ofrece pantalla completa mediante interacción del usuario y permite ver en vertical si hace falta. Al salir, limpia los eventos y restaura la orientación previa. La traición mantiene su comportamiento anterior.

La compatibilidad de bloqueo y pantalla completa depende del navegador: https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/lock. Se probó con emulación táctil; falta comprobar el cambio físico en los dispositivos del usuario.

## Validación

- Suite de 45 pruebas: tiempos, orden de escenas, recursos offline y regresiones del juego.
- Navegador con reloj de audio simulado: Nivor a 17 segundos, cierre con Shadow, ataque silencioso y cambio de pista exactamente en calamo-llegada, reproducción hasta el final natural de MusicLFiles, silencio y epílogo.
- Emulación móvil 390×844 y 844×390: guía, rechazo de pantalla completa sin bloqueo del flujo, giro y regreso a vertical, pausa manual conservada, salida y opción vertical.
- Duelo de Cálamo con audio instrumentado: pista compartida, inicio en la presentación, pausa manual y por visibilidad, continuidad sin reinicio a través del duelo y la victoria hasta la retirada, detención al salir y reintento desde cero.
