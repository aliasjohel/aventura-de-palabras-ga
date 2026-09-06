# Mundo 5 · Reino de Azrak

Diez misiones. Las misiones 2, 5 y 7 terminan con un puzzle, después de dos desafíos de palabras. La misión 10 encadena los duelos contra Shadow y Azrak. La victoria contra Shadow guarda un punto de continuidad: perder o abandonar contra Azrak no obliga a repetir el primer duelo.

El estado persistido `estadoFinalAzrak` distingue `shadow`, `traicion`, `azrak`, `final` y `completo`. Recargar durante una cinemática vuelve a reproducirla; saltarla continúa la historia. El quinto cristal se concede después del desenlace. El modo de pruebas no modifica la partida guardada.

## Puzzles

- Puente de runas: recordar tres secuencias de longitud creciente, con repetición disponible y sin penalización de vidas.
- Cuatro juramentos: interpretar las pistas de los puntos cardinales y asignar los cuatro símbolos.
- Luz entre las sombras: apagar un tablero 3 × 3 con cambios en cruz. El tablero siempre tiene solución y la pista calcula un movimiento para el estado actual.

## Cinemáticas

La traición muestra a Shadow absorbido por una grieta, sin confirmar su destino. El final muestra hielo de Nivor, rescate de Aren por Nimbus con movimiento lento, intervención de Aeralis, ataques de los guardianes, contraataque de Azrak, regreso y elección de Shadow, ataque conjunto y liberación del Cristal de la Unión. Se usan sprites existentes y efectos animados por CSS. Pausar detiene escenas y animaciones; saltar permite continuar. Movimiento reducido conserva el tiempo de lectura.

En Modo Pruebas: las misiones 8 y 9 ofrecen «Probar escena» para la traición y el desenlace, respectivamente. En los duelos de aventura aparece «Probar victoria» para revisar las transiciones sin jugar toda la batalla. Las misiones 2, 5 y 7 ofrecen «Probar puzzle».

## Arte

Generado con la herramienta integrada de generación de imágenes, sin CLI. Los personajes son los originales del proyecto. Archivos finales:

- `assets/images/fondos/reino-azrak/entrada-v1.png`
- `assets/images/fondos/reino-azrak/forja-v1.png`
- `assets/images/fondos/reino-azrak/trono-v1.png`

### Prompts utilizados

**Trono:** Create a single landscape 16:9 game background illustration for Aventura de Palabras world 5, Realm of Azrak. A grand empty volcanic obsidian throne arena inside a broken circular fortress, distant monumental empty black throne, glowing amber magma far below bridges, purple storm sky, jagged basalt pillars framing sides. Large unobstructed flat foreground where animated characters will be composited later. Rich polished storybook fantasy digital painting, cinematic colored lighting, detailed environment, family adventure tone, no gore, no people or creatures, no writing, no UI. Match the painterly detailed fantasy environment of the ice arena reference in conversation but this is a new volcanic location. This one image will be the final battle arena.

**Entrada:** Single 16:9 landscape background for family fantasy adventure game. Realm of Azrak, exterior approach: a winding safe black stone path crosses a chasm of softly glowing lava, huge carved gate ahead, ruined towers and violet storm clouds, tiny emerald moss stubbornly growing in sheltered stones hints at hope. No characters, no text or UI. Detailed polished painterly storybook environment with cinematic lighting, same visual world as the volcanic throne arena just generated. Large clear foreground for character sprites, distinguishable path, warm amber lava against cool violet shadows.

**Forja:** Create one 16:9 landscape game environment illustration, interior of the Forge of Lost Names in the volcanic Realm of Azrak. Massive basalt vaulted chamber, bronze rune mechanisms and four empty crystal sockets at center, branching glowing energy channels in the stone floor, molten amber furnace in distance, violet magical chains overhead. No readable text or letters, no characters or UI. Broad uncluttered foreground for adventure character overlays. Polished detailed painterly fantasy, storybook adventure atmosphere matching previously generated volcanic gate and throne arena. Mysterious and impressive but appropriate for families.
