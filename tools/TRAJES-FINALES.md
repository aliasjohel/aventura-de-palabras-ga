# Azrak y Kálamo — 29 de septiembre de 2026

La entrega anterior (Hombre Lobo, Nimbus, Nivor y tienda con pose principal) está publicada en GitHub Pages, commit `141b358`, caché v311. Verificada con `node tools/check-creature-release.cjs`: nueve trajes, imágenes disponibles, poses ocultas en tienda normal y sin errores de ejecución. No se realizó una compra con monedas reales. Las cuatro migraciones pendientes se aplicaron correctamente al servidor el 29/09/2026.

Esta entrega incorpora la segunda tanda al frontend (caché v312):

| Personaje | Traje | Monedas | Imágenes |
| --- | --- | --- | --- |
| Azrak | Señor del Eclipse | 250 | 10 |
| Kálamo | Escriba Astral | 200 | 18 |

PNG en `assets/images/trajes/`, prefijos `azrak-eclipse-` y `kalamo-astral-`. Arte generado mediante la herramienta integrada image_gen, con transparencia original conservada. Referencias y prompts exactos guardados en `tools/final-costume-prompts.json`.

Incluye combate, impacto, habilidad de Kálamo, ocho poses de ganador, tres fases de formación de Kálamo, capturas por planta/mano/vidrio y dos edades. La tienda normal muestra solo la pose principal; el modo prueba permite revisar las demás. Arcade usa el traje equipado del jugador y conserva el original del rival. La colección llega a los once personajes.

Validación completada: 13 pruebas de tienda y wallet; SQL con PGlite (precios, propiedad, saldo, doble cobro, permisos); navegador en 390×844 y 844×390 (22 escenas de víctima, ocho poses de ganador, combate, formación, Arcade y restauración del original). Los 28 PNG tienen canal alfa y están incluidos en la caché v312.

Servidor actualizado: rangos vecinos y colecciones de seis, nueve y once trajes, aplicadas en orden mediante la CLI autenticada. Verificación remota de once compras y precios, no doble cobro, equipamiento y permisos RPC. Todos los datos de prueba se revirtieron mediante ROLLBACK. Las pruebas de rangos vecinos pasaron en PGlite y la definición remota confirma la regla nueva; no se simularon dos jugadores reales en producción.
