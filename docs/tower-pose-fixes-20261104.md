# Torre: escala de raíces y daño de Guardiana

La habilidad de raíces reutilizaba el dibujo agachado del ataque, pero solamente el ataque de viento aplicaba su calibración de 1,39. Se aplica también durante la habilidad del traje Orquídea, conservando el pulso de luz. El daño interrumpe esa calibración y recupera la pose de habilidad mientras siga activa.

La imagen anterior de daño mostraba el torso girado. La nueva `guardiana-orquidea-impacto-v2.webp` conserva el frente, mira hacia el rival a la derecha y mantiene dos brazos, el bastón y el traje. Se normalizó sobre la altura y apoyo de la base: límites opacos y=67..956, altura 890 píxeles, ambos iguales a la base. La imagen anterior permanece disponible para versiones ya instaladas. La nueva pesa 150.884 bytes y solo se descarga al seleccionar el traje.

Generación: herramienta integrada image_gen, transparencia RGBA; especificación en `tower-guardiana-pose-prompt-20261104.txt`. Maestro conservado localmente en `.local-developer/tower-pose-review/guardiana-impacto-v2-master.png`; normalización reproducible con `tools/tower-ten-outfits/fix-guardiana.cjs`.

Validación: 23 pruebas de regresión; diez conjuntos con 150 comprobaciones de geometría y 112 cinemáticas; Aren en tres tamaños con cinco poses y selector. Capturas animadas de los once personajes: base, ataque, habilidad, daño físico y mágico, conservando activas las animaciones CSS. Guardiana se verifica en 844×390, 667×375 y 1280×820, con y sin movimiento reducido, incluyendo daño durante habilidad y recuperación de la pose. No se encontró otra inversión evidente en la revisión visual de esas capturas.

Actualización v392 → v393: cuatro archivos de código descargados, cero imágenes durante instalación; la versión previa continúa activa hasta activar la nueva; conservación de localStorage e IndexedDB y traje previamente cacheado usable sin conexión. No hubo prueba física en Android.

Alcance: corrección visual de la prueba temporal existente. No cambia desbloqueos, inventarios, recompensas, reglas ni servicios de cuenta. Versión candidata: `v393-tower-pose-fixes1`.
