# v411 — Nivel compacto siempre visible en el menú

Base: v410, d5eceae289fd35b64620af12b6047b2c0e740550. Identificador PWA: v411-menu-level1.

El nivel general aparece a la derecha como «Nv. 15» (Lv. en inglés), sin ocultarlo por ancho de pantalla ni añadir barra. Se compactan perfil, moneda y separaciones hasta 400 px; por debajo de 310 px el perfil conserva el avatar y su etiqueta accesible. Se mantiene el saldo centrado, el estilo dorado, el arte y la secuencia original del libro/cristal. Tocar nivel abre Mi perfil.

Solo se presenta el snapshot de PlayerXP.read() de la misma cuenta que el monedero. Cuando no hay un nivel confirmado se mantiene el acceso visible con «Nv. —»; no se inventa un nivel 1 ni se sustituye por el rango competitivo. Se conservan la sincronización, los eventos y la fuente de datos de v410.

## Validación

- 337 pruebas de regresión aprobadas, cero fallos y omitidas. Las pruebas del componente verifican nivel confirmado, cuenta incorrecta, cierre de sesión, carga, Modo prueba, sincronización y compra mediante los módulos reales de monedero en un entorno aislado.
- Navegador móvil: cabecera sin colisiones, monedas centradas y nivel visible en 280, 300, 320, 340, 359, 360, 375, 390, 400, 412, 568 y 844 px; español, inglés y portugués, incluyendo nivel 9999 y saldo 999999 exclusivamente como snapshots aislados, sin RPC reales. Capturas adicionales de 320×568, 360×640, 390×844, 568×320, 844×390 y 1365×900. El nivel abre el diálogo de perfil.
- Manifiesto generado y comprobado: 915 recursos.
- Pruebas reales existentes de actualización incremental, aislamiento activo/en espera, activación segura, conservación de datos y audio offline aprobadas.
- Transición completa v410 → v411: un clic en Actualizar ahora, conservación de marcadores en localStorage, sessionStorage, IndexedDB y cachés anteriores; menú nuevo disponible tras recarga offline. El arnés libera sus cargas de audio antes de activar, igual que el ensayo documentado de v410; no cambia el actualizador publicado.

## Alcance y respaldo

Ocho archivos de ejecución: css/menu-wallet.css, index.html, js/i18n-es-fallback.js, js/menu-wallet.js, locales/es/menu.json, locales/en/menu.json, locales/pt-BR/menu.json y sw.js. Se incluyen tests/menu-wallet.test.cjs y este informe.

No hay cambios en XP, monedero, economía, ranking, recompensas, configuración o permisos de Supabase, arte, SQL ni Me gusta. No se instalan migraciones ni se toca Voz Loca. Se conservan los permisos actuales del piloto y de recompensas globales.

Respaldo exacto de los ocho archivos de v410 y procedimiento: .local-developer/releases/v411-menu-level/backup-v410/ y backup.json. Para revertir, un nuevo commit que revierta esta entrega y use una versión de caché superior libre, regenerando el manifiesto. No restaurar saldos antiguos, borrar almacenamiento/cachés útiles ni forzar main hacia atrás.

La publicación requiere verificar SHA-256 de los archivos públicos contra el commit y comprobar desde navegador móvil que Nv. — permanezca visible sin sesión y que tocarlo abra el perfil. La aceptación con el nivel real de la cuenta sigue correspondiendo a Android: actualizar sin borrar datos, esperar sincronización y comparar Nv. con el nivel general de Mi perfil.
