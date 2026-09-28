# Colección con monedas ganadas jugando

Preparada localmente; publicación pendiente de aplicar la migración de Supabase.

| Personaje | Traje | Monedas |
| --- | --- | --- |
| Guardiana | Guardiana de Otoño | 150 |
| A. Lumen | Alba Lunar | 200 |
| T. Shadow | Sombra Carmesí | 250 |

Los tres tienen imágenes propias para combate, victoria, planta, captura de Azrak, vidrio de Kálamo y ambas edades de Kairós. Alba incluye habilidad y carga de su técnica final. Shadow actualiza todos sus clones. La tienda permite previsualizar cada pose sin gastar monedas.

## Activación

1. Ejecutar `supabase/migrations/20260928013057_earnable_costume_collection.sql` en el SQL Editor del proyecto `hlixavucxdxevbbhlxkc`. Amplía el catálogo del servidor y conserva saldos y compras existentes. No crea moneda premium ni cobros con dinero real.
2. Confirmar ejecución correcta. Publicar después los cambios del juego y verificar compras con la nueva versión.

No hay acceso administrativo a Supabase en esta sesión. No se aplicó la migración remota ni se publicó el frontend.

## Arte y validación

29 PNG finales en `assets/images/trajes/`, con prefijos `guardiana-otono-`, `alba-lunar-` y `shadow-carmesi-`. Generados mediante la herramienta integrada image_gen, conservando el canal alfa original. Prompts conservados en `tools/costume-collection-prompts.json` (resumen para base y ataque; texto exacto para las demás poses).

Pruebas: `node --test tests/cosmetic-store.test.cjs tests/game-wallet.test.cjs`; `node tools/check-costume-collection-db.cjs`; `node tools/check-costume-collection-ui.cjs`. La prueba de navegador usa datos locales aislados, sin cuentas ni monedas reales: vistas previas, 33 combinaciones de víctima y técnica final en ambas orientaciones del celular, ganadores y clones, restauración del traje original y saldo sin cambios durante las cinemáticas.

La colección total queda en seis personajes. Para llegar a un traje alternativo por cada personaje quedan dragón, hombre lobo, Nivor, Azrak y Kálamo, cada uno con sus poses completas.
