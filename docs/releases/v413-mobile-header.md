# v413 — Cabecera horizontal, altura útil y carga del nivel

Base: v412, babfe3720089657451b68308f5a30f765facb345. Identificador PWA: v413-mobile-header1.

## Corrección visual

Perfil horizontal: avatar de 44 px en móvil, texto Mi perfil a su derecha e insignia Nv. debajo del texto, dentro del mismo botón. Se conserva el marco completo. La cabecera interior pasa de 108 px a unos 64 px; perfil y monedas comparten fila. Las monedas conservan diseño y acceso a tienda. La zona restante queda libre para la luna y el fondo, cuyo arte y animación no cambian.

Se eliminan los márgenes verticales automáticos del panel en móvil y se reserva una altura real de 100dvh. Las áreas seguras se consumen una sola vez, incluyendo el caso standalone que antes añadía padding también en .app. El ajuste de .app se limita al menú activo.

Buscar actualizaciones pasa a ser un enlace separado del panel desplazable, siempre dentro del área útil de la pantalla. No se oculta contenido: en alturas mínimas se desplaza el panel interior; los controles principales conservan al menos 48 px (50 px en el diseño compacto) y 17 px de texto. Se reduce primero el tamaño del logo y los espacios secundarios en pantallas de menos de 760 px de alto.

## Investigación de Nv. —

Se reprodujo el arranque con un monedero confirmado en caché y sin XP en memoria: el contador podía mostrar monedas, pero el menú de v412 se limitaba a escuchar eventos y no iniciaba ninguna consulta de XP. La carga normal se iniciaba al abrir tienda, perfil o un modo online. No es una pérdida del nivel guardado en el servidor.

El componente ahora puede cargar el SDK existente y consultar la sesión persistida; solo continúa cuando el ID coincide con el monedero confirmado. Reutiliza AventuraShop.connect() y la lectura existente de PlayerXP para sincronizar. Si otra parte de la sincronización falla después de conectar el monedero, reintenta únicamente la lectura de XP ya existente. No calcula ni asigna XP, no inventa un nivel 1, no crea invitados ni manipula tokens directamente. El servidor conserva toda autorización de los RPC.

Las consultas se deduplican, tienen un intervalo mínimo de 30 segundos ante eventos automáticos y se reintentan al volver al foco o recuperar conexión si falta el dato. Se ignoran respuestas de otra cuenta o de una generación anterior al cierre de sesión. Sin sesión coincidente, sin red o en Modo prueba se mantiene —; al llegar el snapshot confirmado se muestra el nivel general. No se utiliza el rango competitivo.

Se consultó la [documentación oficial de getSession](https://supabase.com/docs/reference/javascript/auth-getsession), junto con el índice de cambios. Se mantiene el SDK local fijado y toda la configuración de Auth, RLS, permisos y SQL. getSession solo decide si iniciar la presentación; no concede autoridad sobre saldos o XP.

## Pruebas

- 340/340 pruebas de regresión, cero fallos u omitidas. Tres nuevas pruebas cubren arranque frío, consulta demorada, deduplicación, sesión ausente/distinta, logout durante la consulta, offline, Modo prueba y fallo parcial del monedero.
- Navegador con los módulos reales de GameWallet, CosmeticStore y PlayerXP y respuestas RPC aisladas: carga demorada de nivel 4 sin abrir perfil/tienda, sincronización posterior de nivel 5, monedas sin cambios y logout que limpia el nivel. No se envían RPC externos ni se crean premios.
- 60 combinaciones de ancho (280, 320, 360, 393), alto (480, 568, 640, 740, 851) y áreas seguras superior/inferior (0/0, 24/24, 36/34). Sin desbordamiento de página; enlace de actualización dentro del área segura y cada botón principal alcanzable mediante el panel interior.
- Comprobación adicional de 12 anchos y tres idiomas, con saldos y niveles altos aislados: perfil horizontal y sin colisiones; un clic en la insignia abre el perfil y monedas abre tienda. Capturas sin sesión muestran —, sin cifras ficticias.
- Manifiesto generado y verificado: 915 recursos. Pruebas reales de actualización incremental y activación segura, incluida conservación de datos y medios cacheados.
- Transición completa v412 → v413 con los archivos antiguos/nuevos, un clic de actualización, conservación de marcadores de sesión, localStorage, sessionStorage, IndexedDB y cachés anteriores; recarga offline. El arnés libera sus cargas de audio como en las entregas anteriores, sin cambiar el actualizador publicado.

Las áreas seguras se simulan en navegador; la aceptación física en Android sigue pendiente del usuario. En pantallas extremadamente bajas no cabe todo a la vez sin achicar excesivamente los controles: se conserva desplazamiento solo del panel, con Buscar actualizaciones accesible fuera de él.

## Alcance y reversión

Cuatro archivos de ejecución: index.html, css/menu-wallet.css, js/menu-wallet.js y sw.js; además tests/menu-wallet.test.cjs y este informe.

Sin cambios en app.js, player-xp.js, game-wallet.js, supabase-client.js, reglas de economía, ranking, recompensas, permisos de Torre, assets, migraciones SQL o Me gusta. No se toca Voz Loca.

Respaldo exacto de los cuatro archivos de v412: .local-developer/releases/v413-mobile-header/backup-v412/. backup.json identifica la base y la reversión: revertir solo esta entrega mediante un nuevo commit, usar un identificador PWA superior libre y regenerar el manifiesto. Nunca restaurar saldos antiguos, borrar almacenamiento/cachés útiles, instalar SQL ni forzar main hacia atrás.

La evidencia de la publicación y los hashes públicos se guardan en .local-developer/releases/v413-mobile-header/.
