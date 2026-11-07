# Hombre lobo: retroceso al recibir golpes

Versión: `v398-werewolf-recoil1`.

Se reemplazó la reacción encorvada de los tres aspectos por una pose de golpe con pecho y cabeza hacia atrás, ojos cerrados y brazos abiertos. Se aplica en el duelo y en las cinemáticas que usan la pose de impacto, incluida la Trampa Selvática de Aren. Se conservan el aspecto original, el Centinela Lunar y el Basáltico de Torre, sin modificar sus ataques, transformaciones ni victoria humana.

Raíz del proyecto: `E:/Proyectos/Aventura-de-Palabras-i18n-stage2b/.local-developer/aren-champion-release/`.

Rutas finales dentro de esa raíz:

| Aspecto | Imagen |
| --- | --- |
| Original | `assets/images/personajes/versus/hombre-lobo-impacto-v3.webp` |
| Centinela Lunar | `assets/images/trajes/lobo-lunar-impacto-v2.webp` |
| Basáltico de Torre | `assets/images/tower-preview/lobo-basaltico-impacto-v2.webp` |

Las tres imágenes se crearon con la herramienta integrada `image_gen`. Los prompts exactos y las referencias están en `docs/werewolf-recoil-prompts-20261107.json`. Los maestros generados se conservaron en `C:/Users/User/.codex/generated_images/01a1b69e-0d12-70a2-8023-a635b806b3cb/`: `exec-8e7c71e9-1bfd-4836-8e62-d0eb8839c031.png`, `exec-bb78ddb1-690d-43e2-8c11-872b67d2dc27.png` y `exec-7a2799d3-a6ee-4bdb-8220-0937cf3b16a6.png`.

Se preservó la transparencia y se normalizaron los lienzos y la línea de los pies contra la pose base de cada aspecto. Se usa la altura de la pose de pie, para evitar reproducir el encogimiento de la reacción anterior. Se añadieron versiones inmutables; se conservan los archivos anteriores para las instalaciones antiguas. El catálogo de Torre y el paquete explícito de recursos del Centinela Lunar apuntan a las nuevas imágenes.

Validación:

- 24 escenas contra el tronco: tres aspectos, ambos lados del duelo, dos tamaños de pantalla y movimiento normal/reducido. Se comprobó el cambio de pose y el desplazamiento hacia atrás y se inspeccionaron capturas del instante de impacto.
- 48 comprobaciones de daño de duelo normal y mágico, incluso con una pose de ataque concurrente.
- 38 pruebas Node de tienda, propiedad de cosméticos, catálogo, reacciones, caché incremental y rangos de audio.
- Actualización v397 → v398: descarga cinco archivos de código, sin imágenes durante instalación; conserva el estado local e IndexedDB. Las tres poses nuevas se descargaron y pudieron leerse sin conexión.
- Manifiesto de 912 recursos comprobado y prueba de caché incremental en navegador real aprobada.

Evidencia de imágenes, escenas y actualización: `.local-developer/werewolf-recoil/`. Scripts: `tools/tower-rewards-qa/build-werewolf-recoil.cjs`, `check-werewolf-recoil.cjs` y `check-werewolf-upgrade.cjs`.

Las pruebas usan una cuenta sintética local y bloquean llamadas a servicios externos. No se modificaron datos, permisos, saldos ni premios del servidor. No se automatizó el teléfono físico del usuario.
