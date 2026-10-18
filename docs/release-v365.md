# Publicación v365: Versus y Amigos, etapas 1–3

Preparada el 18 de octubre de 2026 desde la versión pública v364 (`c2977e0`).

## Incluido

- Etapa 1: cancelación de preparación protegida y resultado definitivo coherente con historial/puntos.
- Etapa 2: exclusión de duelos simultáneos, reintento de aceptación y recuperación tras eventos perdidos o reconexión.
- Etapa 3: Amigos desde Perfil y Multijugador en un único panel; solicitudes, código, perfiles públicos y desafíos; miniaturas y tres idiomas.
- Las tres migraciones ya aplicadas en Supabase se incluyen en Git: `20261018151602`, `20261018153728`, `20261018171043`. No se reaplicaron ni cambiaron migraciones históricas.
- Versión de caché `aventura-palabras-runtime-v365`, revisiones de recursos `20261018-v365-1` y manifiesto SHA-256 regenerado. El sistema de caché incremental conserva sus reglas anteriores.
- Estado local de CLI y capturas de QA excluidos mediante `.gitignore`. El commit se prepara con una lista explícita de archivos y se revisa para descartar secretos y temporales.

## Validación previa

- Suite completa Node: **191/191** aprobadas.
- Dos archivos de pruebas antiguas se ajustaron tras reproducir sus fallos usando el código de v364: dependencia simulada de desbloqueo de Azrak y aserciones de sprites/firmas anteriores. No se modificó el comportamiento del juego para resolverlos.
- La comprobación de navegador de la antigua etapa 3D se actualizó para esperar los idiomas locales añadidos en 3E; conserva la comprobación del fallback español online. Pasó después, junto con las pruebas actuales de 3E.
- SQL real en Supabase: pruebas de las tres etapas aprobadas. Registro de migraciones comprobado. Sin avisos nuevos de seguridad frente a la revisión anterior.
- Aventura: mundos traducidos, palabras/pistas, historiales, bloqueo del idioma y persistencia, también offline.
- Torre y Versus local: bancos, temáticas, preparación y teclado en los tres idiomas, manteniendo el progreso.
- Puzzles/tutorial: catorce pantallas y ocho pasos reales con victoria, online y offline, en español/inglés/portugués.
- Amigos: cinco recorridos de navegador (320/390/844 px), solicitudes, código, perfil con estadísticas frescas, desafíos, invitado y conexión. PWA real offline en los tres idiomas.
- Versus online: dos sesiones reales contra Supabase para cada idioma; sala privada, entrada con otro idioma de interfaz, preparación, teclado, habilidad, cinco palabras, victoria y revancha. Se retiraron exclusivamente las seis cuentas anónimas creadas por esta ejecución.
- Huellas y cantidades de quince tablas originales en Supabase idénticas antes/después de las pruebas; perfiles, amistades, estadísticas y monederos existentes conservados.
- Actualización real del worker **v364→v365**: versión anterior activa mientras se instala la nueva, activación explícita, arranque del juego nuevo sin conexión y comparación exacta de todo el localStorage e IndexedDB de prueba antes/después. Incluye identidad/avatar, monedero y trajes, progreso de Aventura/Torre, idioma, audio y datos sintéticos de sesión. El servidor de pruebas reduce multimedia para acotar la descarga; el manifiesto de producción mantiene sus 696 recursos.
- Verificación de manifiesto, fallback, caché/rangos y reproducción multimedia offline. Sin cambios en catálogo, precios, recompensas ni lógica del monedero.

## Comprobación de publicación

Después del push se debe esperar a que GitHub Pages termine y comparar los hashes públicos con los bytes del commit de v365, incluidos worker, HTML, scripts, CSS, catálogos y las quince miniaturas. Una respuesta antigua durante el despliegue no confirma la publicación.

## Prueba en celulares

1. Abrir el juego con conexión, aplicar la actualización cuando aparezca y volver a abrir sin borrar datos del navegador ni reinstalar la PWA.
2. Verificar progreso de Aventura/Torre, monedas, trajes, avatar, marcos, idioma y audio.
3. Entrar en Perfil → Amigos, abrir un perfil, enviar/aceptar/rechazar/cancelar solicitudes y agregar por código.
4. Desafiar con dos cuentas, suspendiendo una aplicación antes de aceptar; volver y comprobar que ambos recuperan la misma sala.
5. Probar entrada por código, búsqueda, revancha, pérdida de red y cambio Wi-Fi/datos. Intentar otro duelo desde una cuenta ocupada debe bloquearse.
6. Repetir con interfaces en idiomas distintos: la sala conserva su idioma de palabras. Revisar también la experiencia offline y el botón atrás/gestos en Android/iOS.

Las pruebas de escritorio no sustituyen estas comprobaciones de suspensión y teclado nativo en teléfonos reales.
