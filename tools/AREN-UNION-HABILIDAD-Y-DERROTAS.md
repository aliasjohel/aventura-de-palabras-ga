# Aren Unión: habilidad y derrotas · 5 de octubre de 2026

Destello de Sabiduría sustituye la lupa visual únicamente para Aren de los Cinco Cristales. Nueva pose con índice extendido; rayo dorado desde el dedo hasta la letra sugerida. Después apunta al mini teclado rival electrificado. Desde el rival apunta al teclado propio. Conserva la letra sugerida y el bloqueo de 2 segundos ya existente. No modifica reglas de servidor ni habilita el traje fuera de su acceso actual.

La pose incluye la capa, por lo que la capa separada se oculta durante la habilidad. La limpieza cancela el seguimiento del rayo y restaura el reposo al terminar, interrumpir o salir. El evento online de habilidad rival ahora reproduce también la animación.

Se agregan cinco poses para las cinemáticas de derrota: vidrio de Kálamo, Mano del Abismo de Azrak, planta de la Guardiana y edades adulta y anciana de Kairós. Los selectores usan el traje de la víctima en ambos lados del duelo. El vidrio de este traje utiliza encuadre frontal con object-fit contain. Los seis nuevos PNG están en assets/images/trajes/aren-union-{habilidad,vidrio,mano,planta,envejecido,anciano}-v1.png y están incluidos en la instalación offline v337.

Arte creado con image_gen integrado, alpha preservado. Referencias y prompts exactos: aren-union-20261005-art.json. No se publicó ni se modificó el acceso de administrador.

Validación:
- tools/check-aren-union-ability.cjs: pose, origen y destino, letra revelada, bloqueo, interrupción, evento rival online, movimiento reducido y Aren clásico; 844 y 667 px.
- tools/check-aren-union-cinematics.cjs: cinco poses cargadas, ambos lados de víctima, traje original y capturas; 844 y 667 px.
- tools/check-aren-union-duel.cjs: regresión de entrada, capa, ataque básico, corriente y remate.
- tests/cosmetic-store.test.cjs, tests/game-assets.test.cjs, tests/versus-engine.test.cjs y tests/arcade-ai-keyboard-blocks.test.cjs: 12 comprobaciones correctas.

tests/versus-ui.test.cjs tiene un fallo anterior en una expresión regular de las poses del hombre lobo. Confirmado ejecutando el mismo test contra js/app.js de HEAD; no corresponde a estos cambios.
