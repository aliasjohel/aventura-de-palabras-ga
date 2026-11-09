# Menú y tarjeta de Aventura — propuesta local

9 de noviembre de 2026. Base: v415-zafir-reading1, commit `305eef6580d77e56e7df5a73265cdff04ee30398`. Documento de revisión del diseño local, aprobado posteriormente para publicación como **v416-menu-navigation1**. Ver [informe de entrega](releases/v416-menu-navigation.md). v415 publicó únicamente las correcciones de Zafir y teclado, verificadas por separado.

## Diseño preparado

Cinco botones principales, en el orden pedido: Multijugador, Aventura y Torre, Ranking, Tienda y Configuración. Se reutilizan las cinco franjas ilustradas existentes; las dos primeras cambian de destino y recurso de fondo entre sí. No se añadieron botones, ilustraciones principales ni espacio vertical. El perfil y saldo conservan sus componentes actuales.

Multijugador abre directamente la sala y sus dos selectores existentes, ahora rotulados Duelo Clásico y Duelo Clasificatorio. No aparece la antigua tarjeta ilustrada de Multijugador y no se generó arte de duelos. Se mantienen valores `classic`/`ranked`, búsqueda, código de sala, amigos, ranking y funciones del adaptador. La sala y combate conservan sus requisitos de orientación actuales.

El tutorial sigue accesible mediante su botón dentro de la sala. No se interpone automáticamente antes de las dos opciones; no se eliminaron sus pasos ni funciones. Al cerrarlo devuelve el foco al flujo multijugador.

Aventura y Torre abre las dos tarjetas ilustradas en vertical para celulares. La tarjeta de Torre, su marcado, imagen, textos y efectos se conservaron. Aventura usa la nueva ilustración. Su botón abre el mapa existente; el botón de volver y Escape regresan a las tarjetas. El cierre de las tarjetas vuelve al menú, con cabecera de regreso visible al desplazarse.

Se evitó que el actualizador de texto del antiguo botón simple de Aventura reemplazara el contenido de la tarjeta. El menú sigue consultando el mismo progreso y no lo modifica por estos cambios.

## Ilustración y peso

| Propiedad | Resultado |
| --- | --- |
| Recurso público candidato | `assets/images/ui/adventure-card-v1.webp` |
| Dimensiones | 960 × 640 px, relación 3:2 |
| Tamaño exacto | **59.714 bytes / 58,31 KiB** |
| Optimización | WebP, calidad 76, esfuerzo 6, sin ampliar la fuente |
| Fuente generada | PNG 1536 × 1024, 2.351.136 bytes |
| Reducción de bytes | Aproximadamente 97,5 % respecto del PNG fuente |
| SHA-256 final | `e6e667cdd21c70783c35b9f77c585d68c9992c20cac97ad0a88afb6cb9f65696` |

Se generó **una sola ilustración**, usando la herramienta integrada de generación de imágenes; se optimizó después con Sharp. Los tres WebP comparados son codificaciones de esa misma imagen, no ilustraciones adicionales. Los archivos fuente y comparaciones de calidad quedan en `.local-developer/menu-reorganization-20261109/`; sólo el WebP elegido está en `assets/`.

Referencias: la imagen original de Torre para estilo/atmósfera y el personaje `explorador-base.png` para la identidad de Aren. El título, descripción y acción se dibujan con HTML traducible, sin texto incrustado en la ilustración. La imagen se registró en el catálogo y manifiesto de recursos existente, sin alterar medios previos.

### Prompt utilizado, herramienta integrada

> Use case: stylized-concept. Create ONE new fantasy game illustration, background artwork for an Adventure selection card in Aventura de Palabras. Input image 1 is STYLE/MOOD reference ONLY: the existing Tower card background, cinematic painted fantasy, dark violet nighttime atmospheric depth, magical glints, believable textures. Input image 2 is CHARACTER IDENTITY reference: Aren, retain his youthful face, brown explorer hat, tan explorer clothes, blue scarf, backpack and friendly adventurous look. New scene: Aren in an enchanted forest ruin, studying a levitating open magical book, with a few luminous blue and golden crystals surrounding the book. Adventure and wonder, friendly game art, combine Aren's stylized game look with the painted environment. Composition intended for a selection card that is cropped to wide landscape on phones and taller on desktop: place Aren's face, book, and crystals together in the upper CENTRAL 60% of the image with enough breathing room to survive side crops; scenery to both sides; bottom 35% should be darker quiet ground/mist with low visual detail for HTML overlay labels. Horizontal landscape 3:2 aspect ratio. Keep key subject large and legible at small phone size. Subtle violet/teal magic with warm booklight, matching Tower card overall dark fantasy palette. This is a NEW illustration, do not change Tower reference. NO text, NO letters, NO logo, NO border, NO UI, no additional characters. Opaque finished artwork.

## Pruebas y capturas

- Suite general: **346/346**, sin fallos ni omitidas. Las expectativas antiguas de botón principal y tutorial automático se adaptaron al flujo solicitado.
- 36 combinaciones de menú: anchos 280/320/360/393, alturas 480/640/852 y tres idiomas. La altura se comparó con v415 en cada tamaño e idioma; no aumentó.
- Navegador: cinco entradas en el orden indicado, ausencia de tarjeta antigua, dos tarjetas verticales, ida/vuelta del mapa, selección de Clásico/Clasificatorio y tutorial accesible. Servicios externos bloqueados; sin cuentas o recompensas reales.
- Comparación exacta del marcado de la tarjeta original de Torre: sin cambios.
- Manifiesto regenerado: **916 recursos**, conservando las revisiones de recursos no modificados. Antes de publicar se deberá asignar un identificador de versión nuevo; no publicar esta candidata reutilizando v415.
- Arranque local con Service Worker activo y núcleo guardado satisfactorio; captura final sin el aviso artificial del entorno con Service Worker bloqueado. Prueba incremental de cachés y audio offline satisfactoria.

Capturas locales:

- [Menú principal, 393 px](../.local-developer/menu-reorganization-20261109/main-menu-393.png).
- [Aventura y Torre, 393 px](../.local-developer/menu-reorganization-20261109/adventure-tower-393.png).
- [Clásico y Clasificatorio, horizontal](../.local-developer/menu-reorganization-20261109/multiplayer-options-844.png).
- [WebP candidato](../assets/images/ui/adventure-card-v1.webp).

Las capturas no están conectadas a una cuenta real: saldo y nivel pendientes se representan con «—»; no se muestran cantidades de prueba. El resultado de navegador completo queda en `.local-developer/menu-reorganization-20261109/browser-results.json`.

## Archivos y límites

Presentación y navegación: `index.html`, `js/app.js`, `js/intro.js`, `css/styles.css`, `css/menu-navigation.css`, `css/menu-fantasy.css`, `css/menu-wallet.css`. Idiomas: `locales/es/menu.json`, `locales/en/menu.json`, `locales/pt-BR/menu.json` y fallback generado. Recurso: el único WebP nuevo. Catálogo/manifiesto generados: `js/resource-catalog.js`, `sw.js`. Verificación: expectativa de `tests/versus-ui.test.cjs` y `tools/check-menu-reorganization.cjs`.

No se modificaron economía, XP, combate, Supabase, recompensas ni datos de progreso. Las funciones del duelo de Zafir publicadas en v415 se conservan. No hay migraciones nuevas. Voz Loca no se modificó.

Distribución e ilustración/peso aprobados por el usuario; autorización expresa de publicación recibida. La entrega v416 incluye preparación de versión, respaldo y prueba de actualización desde v415.
