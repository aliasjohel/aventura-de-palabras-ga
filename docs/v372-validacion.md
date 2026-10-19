# v372 — Aren inmóvil durante los errores de viento

19 de octubre de 2026.

- En el mundo 3, los errores conservan la pose de Aren en lugar de cambiar a la imagen desanimada, cuya geometría alteraba su posición visible.
- Se detienen la reacción temporal y el movimiento de respiración mientras está atrapado por el viento. El último error tampoco cambia a la pose triste ni aplica la elevación de 10 px.
- Se conserva el remolino denso y la pérdida de visibilidad del final. Al liberar al personaje, reintentar o cambiar de mundo se retira el estado de inmovilidad.
- Los otros mundos conservan sus reacciones.

Validación: `node tools/check-wind-finale.cjs` ejecutó seis letras incorrectas mediante `elegirLetra`, comprobando que las seis mantienen la misma imagen y coordenada vertical, sin animación de desplazamiento. Verificó también el remolino final, reinicio, liberación, cambio de mundo y movimiento reducido. Sin errores JavaScript en Edge, viewport 390 × 844.

Capturas: [quinto error](v372-viento-quinto-error.png), [último error](v372-viento-ultimo-error.png).

206/206 pruebas automáticas aprobadas. Manifiesto de 712 recursos comprobado. Actualización incremental y actualización v371 → v372 con conservación de localStorage e IndexedDB ficticios aprobadas.

Pendiente de comprobación física en celulares.
