# Torre: reacciones de impacto y diagnóstico del piloto

Versión: `v396-tower-impact-reactions1`. Fecha: 7 de noviembre de 2026.

## Recompensas

Consulta de solo lectura al proyecto alojado: el piloto aprobado sigue habilitado, pagos activos y alcance global apagado. La cuenta piloto no tenía intentos, pisos certificados, recibos de monedas ni concesiones de cosméticos de Torre. Por tanto, el combate informado no se registró como un intento autoritativo de esa cuenta. No se ha confirmado todavía si el teléfono usaba una versión anterior, otro modo o una sesión diferente. No se modificaron cuentas, permisos, progreso ni saldos en producción.

El progreso histórico local se conserva, pero no certifica victorias para premios. La ruta validada empieza en el piso 1 y requiere completar los diez pisos con conexión y la cuenta piloto, sin Modo prueba ni selector visual. Repetir el jefe final histórico no sustituye esa ruta. Un piso ya pagado no vuelve a pagar.

La pantalla de Torre ahora explica la diferencia y el motivo de práctica cuando se activa Modo prueba o el selector visual. Durante el duelo aparece «Combate por premios» o «Práctica · Sin premios». El resultado de práctica también lo indica, incluso cuando existe una Torre histórica completada. Se conserva la progresión temporal de práctica y no se reescribe el progreso histórico.

## Reacciones

- Nueva pose de Zafir normal: `assets/images/personajes/versus/mago-impacto-v2.webp`.
- Nueva pose de Zafir de Torre: `assets/images/tower-preview/zafir-vitral-impacto-v2.webp`.
- Ambas tienen transparencia, retroceso corporal y ojos cerrados de impacto. Se conserva el lienzo y la altura visible de referencia, sin recortar al personaje.
- Se añadieron las poses de daño normales faltantes de Aren, Zafir, Guardiana y Nimbus al duelo. La pose de daño tiene prioridad sobre una pose de ataque o habilidad concurrente.
- Se precargan y decodifican las poses de base e impacto antes de iniciar la cinemática, para que el cambio no dependa de una descarga en el instante del golpe.
- Se revisaron las 22 poses de impacto, once normales y once de Torre, y las capturas del tronco contra ambos Zafir.

## Validación

- 176 casos de reacción en ocho cinemáticas × once víctimas × dos trajes; 44 comprobaciones adicionales de daño normal y mágico durante el duelo, incluyendo un ataque concurrente.
- Otros 61 casos de cinemáticas del catálogo de Torre, incluidas planta, mano, vidrio y envejecimiento.
- 32 pruebas Node de recompensas, selector, personajes, IA y caché, incluidas dos comprobaciones que garantizan terminar la cinemática si falta una imagen sin conexión.
- Navegador real: migración incremental, conservación de versión activa hasta aceptación, imágenes/audio y rangos sin conexión.
- Actualización v395 → v396: sin descargar imágenes durante instalación; conserva localStorage e IndexedDB y permite usar sin conexión el traje descargado. Evidencia: `tower-impact-upgrade-results.json`.
- Evidencia de escenas: `tower-impact-reactions-results.json`, `tower-impact-cinematics-results.json`; capturas en `.local-developer/impact-review/`.
- No se automatizó el teléfono físico del usuario.

## Imágenes: herramienta y prompts finales

Se usó la herramienta integrada `image_gen`, sin CLI de API. Los originales están en `C:/Users/User/.codex/generated_images/01a1b69e-0d12-70a2-8023-a635b806b3cb/`, archivos `exec-e7458ea5-a437-4b68-98e2-28c526749307.png` y `exec-bf5e8cf6-8f32-467e-9bcb-5c4a8adff46e.png`. `tools/tower-rewards-qa/build-zafir-impact.cjs` conserva referencias, normalización y rutas finales.

Prompt de Zafir normal:

> Edit this exact game character Zafir into a clear non-graphic cartoon impact reaction sprite. Preserve character identity, purple hood robes golden trim, glowing magenta oval eyes in dark faceless hood, staff with purple crystal, polished colorful 3D cartoon game rendering. Full body isolated transparent background, portrait 1024x1536 canvas, no cropping, margins. The character is facing screen LEFT and struck in torso from screen LEFT: torso visibly bends backwards to screen right, shoulders thrown backward, head tilted back, eyes squeezed narrow in surprise/pain, knees buckle, boots lifted slightly as knocked back, arms flung away from body while keeping staff in one hand. Dynamic readable exaggerated recoiling silhouette dramatically different from calm standing base. No attacker no trunk no effects no blood no text no ground. Retain same character size and sharp detailed style as reference, full body centered with clear margins. This is the moment of being hit, not attacking or calmly holding staff.

Prompt de Zafir de Torre:

> Edit FIRST reference Zafir stained-glass outfit sprite into a clear impact recoil pose like SECOND reference. Preserve exact outfit identity of FIRST: ivory hood and robes, copper bronze frames with emerald turquoise stained glass inlays, turquoise glowing eyes in black faceless hood, pink gloved hands, copper staff with circular flower stained glass head. Match FIRST rendering colorful polished cartoon 3D game sprite, NOT purple costume. Use SECOND ONLY for the exaggerated hit reaction pose: torso bends visibly backward to right from impact arriving from left, head thrown back, eyes squeezed in pain, one arm thrown outward open hand, one hand holds staff, knees buckled and boots off ground. Whole body isolated transparent background, portrait canvas 1024x1536, transparent margins, no cropping, no effects no ground no attacker no trunk no blood no text. Dramatically different silhouette from calm sitting pose; readable cartoon flinch. Same size and identity as FIRST.
