# i18n — Etapa 1

Estado: implementación local, español únicamente. Sin publicación, cambios remotos, migraciones SQL ni escrituras nuevas de preferencias. Esta etapa no habilita selección automática/manual de idioma.

## Infraestructura

- `js/i18n.js`: servicio central `I18n.ready`, `t(key, parameters)`, `apply(root)`, `number()` y `date()`; fábrica exportada para pruebas sin navegador.
- `locales/languages.json`: registro de idiomas y namespaces. Español (`es`, formato `es-AR`) es principal y respaldo.
- `locales/es/`: once catálogos por área. Solamente `common.json` y `menu.json` tienen contenido; los otros nueve son estructuras vacías deliberadas.
- `data-i18n` vincula texto de elementos sin hijos. También se admiten vínculos de `aria-label`, `title`, `placeholder` y `alt`. No se usan traducciones como HTML ni se sustituyen contenedores con botones/eventos.
- La inicialización es asíncrona. El HTML español existente permanece disponible antes de cargar, si falla la red o si falta una clave. Una falla en un catálogo no impide cargar los otros.
- `t()` admite variables y variantes plurales con `Intl.PluralRules`. Una clave/variable inexistente genera un diagnóstico y devuelve la clave; los vínculos DOM retienen el texto original. Por eso las llamadas JS futuras deberán probar cobertura de claves antes de migrarse.
- No hay acceso a `localStorage`, sesiones, Supabase, monedas, inventarios ni bancos de palabras desde i18n.

## Muestra migrada

Diez elementos, nueve claves. Las cadenas coinciden exactamente con el HTML anterior:

| Clave | Texto |
|---|---|
| `menu.title` | Aventura de Palabras |
| `menu.subtitle` | Explorá mundos resolviendo palabras |
| `menu.adventure` | 🗺️ Aventura |
| `menu.modes` | ⚔️ Modos de juego |
| `menu.ranking` | 🏆 Ranking |
| `menu.shop` | ✦ Tienda |
| `menu.configuration` | Configuración (botón y título del panel) |
| `common.settings` | AJUSTES |
| `common.done` | Listo |

Los literales del HTML se mantienen como respaldo de carga, no como una segunda fuente editable. La prueba compara cada literal con su catálogo para detectar diferencias.

## Inventario inicial para las siguientes etapas

| Área | Fuentes actuales | Tratamiento futuro |
|---|---|---|
| Menú, configuración, ventanas, accesibilidad | `index.html`, `actualizar.html` | Claves y vínculos DOM; separar elementos que tengan hijos |
| Misiones, mensajes, resultados, mapa, pistas | `js/app.js` | Extraer texto de presentación; conservar índices, IDs y datos guardados |
| Narración y subtítulos | `intro.js`, `prologue-cinematic.js`, `kairos-forest.js`, `kalamo-desert.js`, `azrak-world.js`, módulos de Aren Unión | Mantener escenas, tiempos, imágenes, música y nombres propios |
| Perfil, marcos, rangos | `player-avatar.js`, `public-player-profile.js`, `avatar-rewards.js`, `versus-ranks.js` | Traducir etiquetas, nunca claves de propiedad o desbloqueo |
| Tienda, skins, monedas y compras | `cosmetic-shop.js`, `cosmetic-store.js`, `game-wallet.js` | Separar textos del catálogo y errores de las operaciones de compra |
| Salas, amigos, avisos y errores | `versus-identity.js`, `versus-room.js`, `versus-room-supabase.js`, `developer-access.js` | Localizar presentación; estudiar códigos de error sin cambiar RPC existentes en esta etapa |
| Instalación y actualización | `pwa.js`, `manifest.json` | Conservar funcionamiento offline y examinar metadatos separadamente |
| Palabras y soluciones | `app.js`, `azrak-world.js`, `versus-engine.js`, funciones SQL | Fuera de esta migración; requieren diseño por idioma y compatibilidad de partidas |

La comparación del texto «Activar música» en la cinemática de Azrak se sustituyó por `musicAction` (`activate`/`mute`). Cada lugar que cambia el botón actualiza el estado mediante `showMusicAction()`. Se conserva el comportamiento de silenciar, reactivar y reintentar tras falla de reproducción. Otras comparaciones del DOM encontradas usan letras jugables; no se modifican ni se incluyen en traducciones.

## PWA y separación del trabajo anterior

La caché pasa de v338 a v339. Se agregan el servicio y todos los catálogos a `CORE_ASSETS`. Los archivos de `locales/` reciben la revisión de la caché igual que HTML/JS/CSS, evitando reutilizar traducciones de otra versión. No se altera la gestión de descargas, rangos de medios ni almacenamiento del jugador.

Los cambios anteriores de marcos permanecen intactos. `index.html` y `sw.js` son archivos compartidos: esta etapa solo añade vínculos/scripts y recursos/revisiones. Los módulos `app.js`, `player-avatar.js`, `public-player-profile.js` y `css/player-avatar.css` se compararon byte a byte contra una copia anterior a i18n. No se creó commit que mezcle ambas tareas.

## Comprobaciones

- Base anterior: 37 pruebas, 36 correctas y una falla previa en `adventure-world5.test.cjs`: el entorno de prueba no define `guardarDesbloqueoAzrak`.
- Después: 45 pruebas, 44 correctas y exactamente la misma falla. Las ocho pruebas nuevas de i18n pasan.
- Pruebas PWA: actualización, reutilización y versiones coherentes; recursos i18n incluidos; lectura de catálogo instalado sin consultar la red.
- Edge/Playwright, servicios remotos bloqueados: comparación anterior/nueva de las diez cadenas, apertura/cierre de Configuración, móvil/escritorio y catálogos inaccesibles.
- Datos locales de prueba: progreso, monedas, skin poseída/equipada, identidad, marcos y marcador de sesión permanecen iguales. No se utilizaron datos reales del usuario ni se validó una sesión real contra producción.
- Control de música probado con etiquetas alteradas: su comportamiento depende del estado, no de la redacción.
- Sintaxis JavaScript y `git diff --check`.

Estas comprobaciones no equivalen a recorrer visualmente toda la aventura ni a probar una APK Android. No hay instalación nueva sobre un dispositivo real en esta etapa.

## Propuesta de Etapa 2 (requiere aprobación)

1. Extender el registro y la carga con fallback español por clave, más selección manual/automática y preferencia en una clave local independiente.
2. Migrar los demás textos de Configuración, menú, perfil y tienda, incluidas etiquetas accesibles y avisos; mantener IDs y operaciones.
3. Incorporar inglés/portugués solo con traducciones aprobadas. No ofrecer un idioma como completo mientras sus pantallas migradas carezcan de cobertura.
4. Probar cambio de idioma, persistencia, datos anteriores y caché offline por idioma. Las palabras jugables, soluciones, migraciones y publicación continúan fuera del alcance.

No iniciar la Etapa 2 sin autorización.

## Versión aislada para GitHub Pages

La publicación autorizada parte del commit `72066c1`, sin los cambios locales pendientes de marcos. Su caché pasa de v337 a v339; el salto evita coincidir con la caché local de marcos. Solo se modifican `index.html`, `js/azrak-world.js` y `sw.js`, además de agregar la infraestructura, catálogos y comprobaciones i18n descritos arriba.

La revisión aislada ejecuta 40 pruebas: 39 pasan y persiste la misma falla anterior de `guardarDesbloqueoAzrak`. Las pruebas locales de marcos, que no están publicadas, no forman parte de esta versión. El comprobador de navegador acepta `I18N_BASELINE_DIR` para comparar con una copia de la versión publicada anterior, sin depender del trabajo local de marcos.
