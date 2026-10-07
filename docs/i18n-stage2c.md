# Etapa 2C: interfaz de combate y ajustes visuales

Implementada el 7 de octubre de 2026. El usuario aprobó publicar únicamente la Etapa 2C como v343 para probarla en su celular. La caché v343 y las revisiones de recursos están preparadas para el despliegue; su resultado se verificará al finalizar.

## Cambios

- Español, inglés y portugués brasileño para controles compartidos de combate: tiempo, vidas, intentos, carga y disponibilidad de habilidades, categorías del HUD, aciertos, errores, avisos de ataque, efectos, agotamiento de energía/tiempo, accesibilidad y resultados.
- Resultados de Aventura y Torre: victoria, derrota, empate, continuación, repetición de piso y conservación de avance. Las razones dentro de los mensajes también cambian de idioma con la ventana abierta.
- HUD de partida online y textos del premio/puntos usan la misma presentación traducida. El cambio de idioma no vuelve a consultar premios, no guarda apariencia y no ejecuta acciones del juego.
- Aventura: contador de misión/desafío y repetición, avisos básicos de acierto/error y etiqueta accesible de vidas.
- El remate integrado de Aren con el traje de los cinco cristales muestra únicamente **Juicio de los Cinco Cristales**. Se ocultó el subtítulo y se impidió que las fases sobrescriban el título. Conserva poses, guardianes, prisión, estallido, tiempos, sonido y señal de finalización. El título sigue el idioma del juego. La página independiente de prueba mantiene sus explicaciones.
- El VS central aparece en la entrada y se oculta al comenzar la ronda, tanto al finalizar normalmente como al saltar la entrada. El VS pequeño de la cabecera permanece. Se reutiliza el ciclo existente, sin añadir temporizadores.

## Separación entre lógica y presentación

`js/i18n-combat.js` adapta exclusivamente valores de presentación españoles a referencias del catálogo `adventure.combat`. Las cadenas internas y los identificadores de efectos/resultados se conservan. Las referencias usan la capa existente `GameUI` para cambiar de idioma sin reconstruir el combate.

Las letras del teclado, progresos de palabras y respuestas reveladas se muestran como valores literales y no se pasan al adaptador de etiquetas. Las etiquetas de categorías del HUD sí se traducen; los bancos de palabras permanecen idénticos. Las respuestas remotas se conservan y solo se traduce su representación. Los errores desconocidos del servidor conservan el diagnóstico recibido.

El respaldo español generado contiene las nuevas claves. El módulo nuevo está precacheado; código, estilos, catálogos y recurso del remate tienen revisiones actualizadas.

## Verificación

- **67 pruebas automatizadas aprobadas**: traducciones, preferencias, parámetros, fallback, caché offline, actualización PWA, motor de combate, bloqueos del teclado/IA, recuperación de palabras, monedas, tienda, rangos y marcos.
- `tools/check-i18n-2c.cjs`: Edge, recursos gráficos reales, tres idiomas, cambio durante el combate, letras y palabras literales (incluyendo FRUTAS/ANIMALES), estado y almacenamiento conservados, resultados abiertos de Aventura/Torre, HUD online simulado, premio simulado sin consultas repetidas y persistencia al recargar.
- Entrada real con preparación de imágenes y botón de saltar: VS visible en la entrada y oculto durante la ronda.
- Remate integrado real: título fijo y subtítulo oculto durante prisión, estallido y victoria; actualización del título en los tres idiomas; terminación y retirada del iframe correctas. Se inspeccionó la captura `tools/i18n-2c-final.png`.
- Tamaños horizontales 844×390 y 740×320: controles de resultados sin desbordamiento horizontal.
- `tools/check-i18n-2b.cjs`: regresión de menú, configuración, tienda, perfiles, marcos y Torre; tres idiomas, 320/390 vertical y 844 horizontal, datos conservados y fallback español cuando fallan todos los catálogos.
- `tools/check-i18n-2a.cjs`: instalación del service worker real, cambio de idioma y recarga offline, preferencias y página de actualización.
- Sintaxis JS y worker, generación del fallback y `git diff --check` correctos.

La suite completa tiene tres fallos también reproducidos usando `HEAD:js/app.js`: `adventure-word-bank.test.cjs` no aporta `GameUI` a su entorno; un caso de `adventure-world5.test.cjs` no aporta `guardarDesbloqueoAzrak`; `versus-ui.test.cjs` espera asignaciones de sprites anteriores al sistema de trajes. No se corrigieron esas pruebas ajenas a esta etapa.

## Límites y pendientes

- No se modificaron bancos de palabras, soluciones, dificultad, daño, estadísticas, mecánicas ni identificadores.
- Historia, diálogos, textos narrativos de encuentros, cinemáticas narrativas y ayudas propias de puzzles quedan fuera. Única modificación explícita de cinemática: quitar la descripción de movimientos del remate integrado de Aren solicitada por el usuario.
- Salas, amigos, tutorial narrativo y mensajes sociales de multijugador siguen pendientes de su etapa propia; los controles de combate compartidos sí están traducidos.
- No se realizaron operaciones en Supabase ni compras de Google Play. Las pruebas de presentación bloquearon conexiones externas y simularon los límites de red; no equivalen a una prueba de duelo contra otro dispositivo.
- Publicación v343 autorizada para prueba física en la APK. Pendiente comprobar Aventura, Torre, los tres idiomas, el VS de entrada y el remate especial de Aren en el dispositivo. No avanzar a otra etapa antes de recibir el resultado del usuario.

## Archivos

`js/app.js`, `js/i18n-combat.js`, `js/i18n-es-fallback.js`, `js/aren-union-preview.js`, `index.html`, `css/styles.css`, `css/aren-union-preview.css`, `locales/{es,en,pt-BR}/adventure.json`, `sw.js`, pruebas de i18n/teclado, `tests/i18n-combat.test.cjs`, `tools/check-i18n-2a.cjs`, `tools/check-i18n-2c.cjs` y este informe.
