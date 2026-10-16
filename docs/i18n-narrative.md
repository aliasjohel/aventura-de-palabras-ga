# Relatos y cinemáticas en los tres idiomas

Los catálogos `adventure.narrative` incluyen los cincuenta carteles de misión
(capítulo, título y relato), los avisos de las cinco trampas progresivas, el
prólogo, la introducción del desierto y las cinemáticas de los cinco mundos.
También incluyen los controles de reproducción, avisos de música y orientación,
desbloqueos y descripciones accesibles de las escenas.

`js/narrative-i18n.js` adapta la presentación de los renderizadores anteriores.
Reconoce exclusivamente textos completos del catálogo español dentro de una
lista explícita de contenedores narrativos. No procesa respuestas, pistas,
puzzles, nombres de jugadores ni el resto del documento. Conserva el texto de
origen por nodo/atributo para cambiar de idioma y detecta cuando un renderizador
reutiliza un nodo para la escena o etapa siguiente. Un MutationObserver aplica
la traducción antes de pintar los textos nuevos, sin reemplazar elementos,
controles ni eventos. Los contadores se conservan al traducir su encabezado.

La fuente española de las escenas permanece intacta: se conservan los tiempos
de lectura, animaciones, actores, música, recompensas y progresión. El adaptador
usa el idioma activo de I18n, incluido su bloqueo durante el combate. La elección
que se difiere durante un combate se aplica al liberarlo. El catálogo de respaldo
en español también contiene las nuevas claves.

Para agregar una escena, incorporar su texto de origen y sus traducciones en los
tres catálogos. Si utiliza otro contenedor, añadirlo a la lista explícita del
adaptador. Nunca extender la traducción a todo el documento.

Verificación: `node tools/check-narrative-i18n.cjs` recorre los 150 carteles
(50 por idioma), las escenas exportadas del final y los encuentros de Shadow y
Kairós, todos los textos y atributos del catálogo, y los controles reales de
avance, pausa y salto. Comprueba cambios de idioma, bloqueo durante combate,
reutilización de textos y aislamiento de contenido ajeno a la narración.
