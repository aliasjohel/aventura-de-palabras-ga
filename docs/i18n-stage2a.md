# Etapa 2A — selector y muestra de idiomas

Implementación local sobre `751bd83` (Etapa 1 publicada). No se publica, no se modifica Supabase y no se incorporan los cambios locales de marcos. El usuario autorizó incluirlos, pero se conservan en el checkout original para la preparación posterior de una versión.

## Alcance

- Opciones: Automático, Español, English y Português.
- Automático recorre `navigator.languages` por orden de preferencia. Si no hay lista, usa `navigator.language`; si ninguno es compatible, usa español. Las variantes `pt-*` se resuelven al catálogo brasileño `pt-BR`.
- Única clave nueva: `aventuraIdiomaV1`, cuyos valores son `auto`, `es`, `en` o `pt-BR`. La inicialización la lee sin escribir. Solo la elección explícita la guarda. Una preferencia desconocida se interpreta como Automático sin borrar ni reparar datos.
- Una selección manual prevalece sobre el idioma del teléfono. Automático vuelve a consultar el dispositivo; el evento `languagechange` solo afecta a esa opción. El evento `storage` sincroniza la preferencia entre pestañas.
- Las claves ausentes, plantillas inválidas o catálogos inaccesibles usan español por clave. Una clave inexistente también en español conserva el texto de respaldo HTML. En JS, `t()` devuelve la clave y deja un diagnóstico.
- La última selección gana si varias cargas se solapan. No se escribe una selección antigua al terminar una solicitud lenta.
- Si el navegador impide guardar preferencias, el cambio funciona durante la sesión y aparece un aviso indicando que no se guardó.

## Muestra

Se mantienen las nueve claves previas de menú/controles: título, subtítulo, Aventura, Modos de juego, Ranking, Tienda, Configuración, AJUSTES y Listo. El título comercial `Aventura de Palabras` permanece igual. Los nombres propios no se traducen.

Se agregan únicamente las etiquetas del selector, Automático, un aviso sobre el alcance parcial y dos avisos de carga/guardado. Son trece elementos vinculados en HTML; Configuración aparece como botón y como título. Vibración, perfil, tienda interna, misiones, cinemáticas y demás pantallas continúan en español.

Los once namespaces existen para los tres idiomas. `common` y `menu` contienen la muestra; los otros nueve catálogos de inglés y portugués están vacíos, preparados para etapas futuras. Las palabras jugables, soluciones y bancos no se extraen ni traducen.

## Archivos

Modificados: `js/i18n.js`, `index.html`, `locales/languages.json`, `locales/es/common.json`, `sw.js`, `tests/i18n.test.cjs`.

Creados: `js/i18n-settings.js`, `css/i18n-settings.css`, once JSON en `locales/en/`, once JSON en `locales/pt-BR/`, `tests/i18n-preferences.test.cjs`, `tools/check-i18n-2a.cjs`, este documento y una captura de Configuración en portugués (`tools/i18n-2a-mobile.png`).

## PWA

La nueva caché local es v340. El selector, sus estilos y los 33 catálogos forman parte de `CORE_ASSETS`. Los recursos de idiomas reciben la misma revisión que el código para evitar mezclar versiones durante una actualización. Se conservan las rutas de caché, el soporte de rangos multimedia y los procedimientos existentes de instalación/actualización.

Para cambiar de idioma offline, la instalación debe haber terminado y el service worker debe controlar la página. Este requisito existente de la PWA se verificó explícitamente en las pruebas; estar offline antes de instalar los recursos no garantiza que un idioma esté disponible.

## Verificación

- Antes: 27 pruebas de i18n, PWA, monedas, tienda y modos offline; todas pasan.
- Después: 42 pruebas; todas pasan. Incluyen selección automática, variantes regionales, orden del dispositivo, preferencia manual/persistencia, claves y catálogos faltantes, almacenamiento denegado, selección simultánea, extensión a un idioma adicional y catálogos servidos sin red.
- Navegador Edge/Playwright: dispositivos es-AR/en-US/pt-BR, cuatro opciones, cambio real de textos, recarga, vuelta a Automático y conservación exacta de datos de prueba (progreso, monedas, inventario, identidad y marcador de sesión).
- Prueba con el service worker real y Cache Storage: instalación, cambios a en/pt-BR/es sin conexión y recarga offline conservando portugués. El servidor de pruebas devuelve imágenes pequeñas y medios vacíos únicamente para evitar descargar toda la multimedia; no cambia ningún archivo del juego. No se comprueba reproducción multimedia mediante esa prueba.
- Diseño comprobado a 390 y 320 píxeles de ancho; captura inspeccionada.
- Las solicitudes de servicios remotos se bloquean en las pruebas de navegador. No se usan datos de usuarios reales ni se escribe en Supabase.

## Prueba posterior en celular

Esta versión todavía no está en GitHub Pages. Una vez autorizada su publicación:

1. Actualizar el juego y esperar a que finalice la preparación sin conexión.
2. En Configuración, elegir English y comprobar Settings, Shop, Game modes y Done.
3. Elegir Português y comprobar Configurações, Loja, Modos de jogo y Pronto.
4. Volver a Español y comprobar el texto original.
5. Cerrar y volver a abrir; comprobar la selección guardada.
6. Elegir Automático y comprobar el idioma preferido del teléfono, con español para idiomas no compatibles.
7. Activar modo avión y repetir el cambio y la reapertura.
8. Comprobar que el avance y las monedas visibles no cambiaron.

No borrar datos de la aplicación para realizar estas pruebas. La mezcla de idiomas fuera de la muestra es intencional. No iniciar otras etapas ni publicar sin autorización adicional.
