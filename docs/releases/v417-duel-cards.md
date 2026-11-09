# v417 — Tarjetas ilustradas de Clásico y Clasificatorio

Versión: `v417-duel-cards1`. Base: v416-menu-navigation1, commit `7507a93db089f5f7aa07d7883c1fff1e0d46a4b3`. Publicación directa autorizada por el usuario el 9 de noviembre de 2026.

Multijugador conserva los dos radios nativos de modalidad y sus valores `classic`/`ranked`, ahora como tarjetas ilustradas. Los títulos se simplifican a Clásico y Clasificatorio, con sus traducciones Classic/Ranked y Clássico/Ranqueado. Las descripciones y acciones siguen siendo texto HTML accesible.

Se reutilizan las clases visuales de tarjetas y el borde de selección existente. El radio sigue operable mediante toque o teclado; se conserva el bloqueo durante búsquedas. No se añaden efectos animados nuevos y las transiciones respetan movimiento reducido. La sala mantiene su orientación horizontal y su desplazamiento para alcanzar búsqueda, creación, códigos, tutorial y regreso en pantallas bajas.

## Recursos nuevos

| Modalidad | Archivo | Dimensiones | Bytes | KiB |
| --- | --- | --- | --- | --- |
| Clásico | `assets/images/ui/multiplayer-classic-card-v1.webp` | 800 × 533 | 63.442 | 61,96 |
| Clasificatorio | `assets/images/ui/multiplayer-ranked-card-v1.webp` | 800 × 533 | 64.898 | 63,38 |

Total: 128.340 bytes / 125,33 KiB. Se generaron exactamente dos ilustraciones con la herramienta integrada de imágenes y se optimizaron con Sharp, WebP calidad 74/esfuerzo 6. PNG originales de 1536 × 1024 conservados sólo en `.local-developer/releases/v417-duel-cards/sources/`; no se publican ni se solicitan galerías de aprobación.

Clásico representa a Aren y Zafir en un duelo mágico amistoso; Clasificatorio, a Aren y Shadow en una arena con un emblema de competición. Se usaron como referencias la tarjeta existente de Aventura y los personajes originales. No hay nombres o reglas incrustados en las imágenes.

## Alcance de archivos

`index.html`, `css/versus-ranks.css`, `locales/es/menu.json`, `locales/en/menu.json`, `locales/pt-BR/menu.json`, fallback español y catálogo generados, `sw.js`, los dos WebP, este informe y `tools/check-duel-cards.cjs`.

Sin cambios en `js/app.js`, adaptador de salas, lógica de búsqueda/partida, monedero, XP, Me gusta, Supabase o migraciones. Se mantienen intactos el menú principal, las tarjetas de Aventura/Torre y las correcciones de Zafir. La comprobación previa comparó expresamente los archivos protegidos con la base publicada.

## Pruebas

- **346/346 pruebas generales**, sin fallos ni omitidas.
- **60 casos de navegador**: seis tamaños horizontales (480×280, 568×320, 640×360, 780×360, 844×390, 915×412), cuatro tamaños verticales (280×480, 320×568, 360×640, 393×852), tres idiomas y movimiento normal/reducido. Se mantiene el aviso/orientación vertical existente; las tarjetas se verifican en horizontal.
- Títulos, imágenes y selección por toque; texto sin desbordamiento; controles de crear/unirse/código/búsqueda accesibles mediante el desplazamiento existente; regreso al menú.
- Navegación de radios con flechas; no cambiar selección mientras se busca; entrega de `classic` y `ranked` al adaptador sintético, sin crear duelos ni premios.
- Actualización exacta **v416 → v417** con un clic, sin recarga previa: preserva localStorage, sessionStorage, IndexedDB y cachés útiles, con recarga offline satisfactoria.
- Manifiesto de **918 recursos** y prueba incremental adicional de recursos, imagen/rangos de audio y reproducción offline.

Los ensayos de navegador bloquean servicios externos y simulan la preparación multimedia y el adaptador. No usan cuentas reales ni certifican un duelo online real o un teléfono Android físico. Se realiza además la comprobación de interfaz contra el sitio publicado y se comparan los archivos públicos con el commit.

## Respaldo y reversión

Ocho archivos de ejecución anteriores y SHA-256 guardados en `.local-developer/releases/v417-duel-cards/backup/` y `preflight.json`. La base Git también conserva el estado publicado v416.

Revertir sólo esta entrega mediante un nuevo commit y un identificador PWA superior, regenerar/verificar catálogo y manifiesto y ejecutar las pruebas de actualización. Conservar servidos los dos WebP durante la transición para clientes v417 todavía activos. No resetear main ni restaurar saldos o borrar datos locales, inventarios, progreso o cachés útiles. No se requiere reversión de base de datos.

## Android

Buscar actualizaciones → Actualizar ahora, sin borrar datos. Entrar a Multijugador y usar la orientación habitual. Verificar ambos dibujos/títulos, seleccionar cada modo y comprobar su descripción y botón de búsqueda. Crear/unirse por código sigue dentro de su sección habitual. La primera entrada puede requerir descargar el paquete multimedia existente. Comprobar que el saldo, XP y progreso se mantienen.

## Prompts de generación

Herramienta integrada, sin CLI ni API key. Registro exacto: `.local-developer/releases/v417-duel-cards/image-prompts.json`.
