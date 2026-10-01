# Aren · Guardián de los Cinco Cristales

Prototipo visual local del 30/09/2026. La referencia aprobada es la transformación del final del Mundo 5: ropa de explorador marrón, sombrero original, pañuelo azul, detalles geométricos dorados y capa de energía ámbar. Los primeros conceptos de armadura blanca/azul quedan descartados para esta dirección visual.

Abrir prueba-aren-union.html desde el servidor del juego o usar el enlace «Probar Aren · Cinco Cristales» en herramientas de Modo Pruebas. Servidor de vista previa: node tools/serve-aren-union.cjs, puerto local 4178.

Incluye entrada, vista de duelo con capa separada animada, demostración de ataque y remate. Guardianes en segundo plano (Guardiana, A. Lumen, Nimbus, Nivor y Shadow) envían energía; Aren levanta la espada; cinco cristales rodean al rival, forman una prisión, estallan y regresan a Aren. Final con espada apoyada. Pausa detiene fases y animaciones; repetir cancela la secuencia anterior; movimiento reducido desactiva capa y partículas.

Arte generado con image_gen a partir del Aren original y las dos referencias de la cinemática aportadas por el usuario. PNG con transparencia preservada: aren-union-base-v1, aren-union-invocacion-v1, aren-union-victoria-v1, aren-union-capa-v1; aren-union-concepto-v1 es la referencia inicial con capa integrada.

Validación: node tools/check-aren-union-preview.cjs (390x844 y 844x390): imágenes, capa independiente, guardianes, prisión, retorno, pausa/reanudación y repetición. Capturas en tools/aren-union-*.png.

Esta prueba no equipa contenido en duelos reales, no gasta monedas y no habilita cobros. Antes de entregar el paquete comercial faltan poses específicas de combate y derrota, integrar el traje/entrada/remate con el equipamiento del juego y conectar/restaurar compras de Google Play. No está publicado.

Integración de prueba: en selección de Aren, el selector de traje incluye Guardián de los Cinco Cristales solamente en Modo Pruebas de autor. Usa entrada de cristales, sin bumerán de entrada, y capa independiente en el duelo. Fuera de pruebas no da propiedad ni aparece en catálogo. Las poses de ataque usan provisionalmente la invocación; resta terminar el combate y el remate integrado.

Habilidad de prueba aprobada: Destello de la Unión conserva la pista de una letra y bloquea al rival por 2000 ms, con descarga dorada y temblor marcado. Implementación en duelo local; el protocolo en línea aún requiere integrar esta variante antes de habilitar ventas.

Actualización 01/10/2026: selección y vista previa de tienda usan el retrato con capa integrada. La entrada de Unión excluye la animación lateral de explorador para evitar la segunda aparición. Destello de la Unión muestra una miniatura eléctrica durante 2000 ms y mantiene el bloqueo real de 2000 ms. Remate ilustrado: cuadro nuevo de cinco guardianes, cristales orbitando, pose de disparo, rayo multicolor, prisión violeta del estilo del Mundo 5 y segundo rayo que rompe el sello; rival seleccionado se conserva dentro de la prisión. Arte y prompts en AREN-UNION-ARTE-V2.md. Cambios locales, sin habilitar el traje para venta.
