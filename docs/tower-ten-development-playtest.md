# Diez trajes de Torre Arcade · Candidata de desarrollo

Los diez conjuntos están producidos e integrados en el selector temporal Configuración → Trajes de Torre · Prueba visual. Se prepararon juntos sobre la versión de Aren ya aprobada. La rama es `development/tower-ten-outfits-20261103`; esta candidata **no está publicada**.

| Personaje real | Traje nuevo | Imágenes | WebP (MiB) | Selección inicial (MiB) |
|---|---|---:|---:|---:|
| Zafir | Custodio del Vitral | 9 | 1.12 | 0.30 |
| Guardiana | Soberana de la Orquídea | 10 | 1.66 | 0.39 |
| Nimbus | Farero de las Nubes | 10 | 1.66 | 0.40 |
| Hombre Lobo | Vigía del Basalto | 12 | 1.95 | 0.99 |
| T. Shadow | Máscara de Porcelana | 9 | 1.13 | 0.30 |
| A. Lumen | Paladín del Cardenal | 11 | 1.49 | 0.58 |
| Nivor | Monarca de la Geoda | 15 | 2.78 | 1.11 |
| Azrak | Soberano de la Brasa Blanca | 11 | 1.72 | 0.56 |
| Kálamo | Maestro de las Mil Tintas | 18 | 4.70 | 1.78 |
| Kairós | Maestro de la Clepsidra | 9 | 1.64 | 0.67 |

## Recursos y calidad

- 114 PNG maestros conservados, 244.00 MiB. Se utilizó el generador integrado image_gen; los prompts y las referencias están guardados junto a los maestros y en el ZIP de revisión.
- 19.85 MiB en WebP (20,818,886 bytes), calidad 86, alfa 100, borde máximo 1024 px. Reducción del 91.86 % frente a los maestros.
- Incremento neto del código y catálogos de juego: 66,108 bytes. Incremento total de recursos públicos de juego: 20,884,994 bytes (19.92 MiB), calculado con los bytes normalizados que publica Git. No incluye maestros ni galería local de revisión, que no se añaden al juego público.
- Normalización uniforme por pose: se conserva el aspecto del dibujo y se alinea su centro y borde inferior opaco con el lienzo original. No se estiran las figuras. El inventario técnico completo registra dimensiones, límites opacos, recursos originales, trajes previos, ataques, habilidades y transformaciones en [tower-ten-outfit-audit.json](tower-ten-outfit-audit.json).
- Cero recortes de arte detectados. Esquinas transparentes revisadas; la captura escenográfica de Kairós conserva el fondo que ya tenía su escena original.

## Pruebas del candidato

- Diez trajes: ataques, habilidades, daño, recuperación y cambio al traje habitual. El rival del mismo personaje conserva su apariencia habitual.
- 150 comparaciones de combate y selección en 844×390, 667×375 y 1280×820. Diferencia máxima: 0.736 px de altura y 0.867 px en el apoyo.
- 112 comprobaciones de cinemáticas en dos pantallas móviles: final propio y escenas como víctima de Aren, Guardiana, Azrak, Kálamo y Kairós cuando corresponde.
- Secuencia real humana → transformación → aullido → lobo; fotogramas reales de descenso de Nivor; tres fases reales de formación de Kálamo.
- 21/21 pruebas de caché, rangos multimedia, puertas de desarrollo, motor de Versus, reloj de Kairós y bloqueo del teclado de la IA. Se actualizó el fixture aislado del teclado para declarar la dependencia de autoridad ya existente; no se cambiaron sus reglas.
- La escala de Aren aprobado mantiene sus 15 comprobaciones de poses de combate y tres tarjetas de selección correctas.
- Actualización real de PWA v390 → candidata v391: solo cinco archivos de código/catálogos, cero imágenes descargadas durante la actualización, versión previa activa hasta confirmar, datos locales e IndexedDB conservados y selección temporal borrada al recargar.
- Selección y reutilización offline verificadas con un traje nuevo en el Service Worker real. El módulo libera referencias de imágenes decodificadas al desactivar o cambiar de traje; no mantiene los diez conjuntos decodificados a la vez.
- Almacenamiento de negocio idéntico antes y después de la revisión; cero escrituras remotas. Los trajes temporales no aparecen en CosmeticStore ni se serializan como equipamiento autorizado.

## Correcciones incluidas

- Guardiana: sustituida la pose de impacto de tres brazos por una pose anatómica de dos brazos. El descarte está archivado fuera de assets y no forma parte de la galería ni de los recursos públicos. El defecto provenía de la referencia original, que se conserva sin editar.
- Kálamo: reemplazado el diseño apagado por Maestro de las Mil Tintas, con turquesa, coral, violeta y oro. Sus 18 poses usan la nueva referencia.
- Nivor y T. Shadow: corregidas las siluetas base que inicialmente excedían el encuadre.
- Nimbus: eliminada la neblina rectangular de la pose contra el vidrio.
- Entrada de Nivor: el observador de daño recupera reposo solo desde la pose de impacto, para no interrumpir el aleteo exclusivo al cambiar una clase visual.

## Límites y publicación pendiente

Las pruebas se realizaron en Edge Chromium con emulación móvil y táctil. **No se probó físicamente esta candidata en Android**; la validación de memoria, fluidez y descarga en el dispositivo real se hará después de una publicación candidata autorizada. No se afirma una tasa de cuadros ni un consumo de RAM físico.

El acceso es visual, temporal y local a la sesión. En Multijugador el rival conserva la apariencia autorizada habitual. No se modifican monedas, XP, ranking, inventarios, recompensas ni esquemas de Supabase. Los originales y los trajes existentes permanecen sin cambios.

El desbloqueo definitivo no está implementado ni activado: deberá validar en Supabase los diez pisos completos con el personaje correspondiente y otorgar exclusivamente su traje. Antes de Google Play se mantiene obligatoria la desactivación de la puerta DEVELOPMENT_OUTFIT_PREVIEW.

Galería local: http://127.0.0.1:4198/gallery/ . Artefactos completos: `.local-developer/tower-ten-outfits/`. Comprobaciones reproducibles: `tools/tower-ten-outfits/check.cjs`, `upgrade.cjs`, `report.cjs`, `tools/check-tower-preview-scale.cjs` y `tools/check-incremental-update.cjs`.
