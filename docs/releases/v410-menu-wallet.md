# v410 — Monedas y nivel en el menú

Base: v409, commit 5fcc92a949fb3c6906a259c4bc47152936718f42.
Identificador PWA: v410-menu-wallet1.

El menú incorpora un acceso al monedero con moneda dorada y saldo centrado, mantiene el perfil a la izquierda y muestra el nivel a la derecha cuando hay espacio. En pantallas menores de 360 px prioriza el saldo y el avatar. Mantiene el arte y la secuencia del libro y el cristal: la cabecera permanece oculta durante la introducción. En horizontal bajo el panel usa dos columnas y conserva desplazamiento cuando la altura es insuficiente.

## Fuente de datos

El nuevo componente solo lee los snapshots existentes. CosmeticStore recibe el saldo confirmado por los RPC existentes de GameWallet; el componente exige accountId, securityReady y un entero válido. Durante una carga sin saldo confirmado muestra —. Puede mostrar el último saldo confirmado de esa cuenta antes de que termine la sincronización normal. No usa la variable local de monedas de Modo prueba.

Los eventos wallet-updated y player-xp-updated actualizan la presentación tras sincronizar, cobrar o comprar; wallet-session-ended oculta saldo y nivel. El nivel proviene de PlayerXP.read() y exige la misma cuenta. No hay nuevas consultas, premios, escrituras de saldo ni cambios de cálculo de XP. Tocar monedas reutiliza el botón existente de tienda. El realce de un aumento es breve, no ocurre al cambiar de cuenta y se deshabilita con movimiento reducido.

## Alcance de publicación

Nueve archivos de ejecución: index.html, css/menu-wallet.css, js/menu-wallet.js, js/i18n-es-fallback.js, js/resource-catalog.js, locales/es/menu.json, locales/en/menu.json, locales/pt-BR/menu.json y sw.js. Además, tests/menu-wallet.test.cjs y este informe.

Sin diferencias respecto de v409 en app.js, game-wallet.js, cosmetic-store.js, player-xp.js, match-likes.js, permisos, configuración de Supabase, SQL, migraciones ni arte. Los archivos pendientes de Entrega 2 y otros informes quedan fuera del commit. No se cambian los permisos del piloto ni se habilitan recompensas globales.

## Verificación

- 337/337 pruebas de regresión, sin fallos ni omitidas. Incluye tres nuevas pruebas de presentación e integración con los módulos reales GameWallet y CosmeticStore, usando respuestas RPC aisladas: sincronización, aumento, compra, nivel, cambio de cuenta, cierre de sesión y movimiento reducido. No se generaron premios en cuentas reales.
- Manifiesto generado y verificado: 915 recursos. Se conserva el algoritmo del SW y solo se actualizan versión, catálogo y hashes.
- Pruebas reales existentes del actualizador: aviso inmediato, progreso tardío, activación segura, no recargar duelos/otras pestañas, conservación de marcadores de sesión, localStorage, IndexedDB y rangos de audio offline.
- Prueba incremental: reutilización de medios, descarga de un solo CSS modificado, separación de versión activa/en espera y reproducción offline.
- Seis tamaños de navegador: 320×568, 360×640, 390×844, 568×320, 844×390 y 1365×900. Sin desborde de cabecera. Comprobación adicional de colisiones con saldos y niveles altos en español, inglés y portugués.

Los ensayos aislados no sustituyen una compra real ni una renovación real de sesión en Android. El servidor de prueba bloquea servicios externos. Las capturas del menú no usan saldos ficticios.

## Respaldo y reversión

Se conserva el commit completo de v409 y un respaldo de los siete archivos sustituidos en .local-developer/releases/v410-menu-wallet/backup-v409/. Los dos archivos nuevos están identificados en backup.json. Se conserva también el respaldo anterior de v408.

Si hiciera falta revertir, preparar un nuevo commit que revierta solo esta entrega, elegir un identificador PWA superior libre y regenerar el manifiesto. Nunca restaurar saldos antiguos, borrar almacenamiento o cachés útiles, ejecutar SQL ni forzar main hacia atrás. No se ejecuta la reversión durante esta publicación.

## Android

Actualizar desde el menú sin borrar datos. Comparar el saldo con la tienda y el nivel con Mi perfil. Recibir una recompensa legítima y volver al menú; el saldo debe actualizarse con el monedero confirmado. Si se decide hacer una compra real, comprobar que el saldo baja al volver. Comprobar también reabrir la aplicación y cambiar de orientación; por debajo de 360 px el nivel se oculta deliberadamente.

Observación del arnés de transición completo: con audio activo, el navegador Edge de pruebas puede mantener pendiente la activación del SW. Se reprodujo también al actualizar una copia de v409 a otra copia idéntica de v409 con distinto nombre de caché, sin el nuevo menú. Liberar las solicitudes de audio del arnés permite completar v409 → v410 con un clic, conservar localStorage, sessionStorage, IndexedDB y las cachés anteriores, y recargar el menú nuevo offline. El ensayo registra harnessAudioReleased=true; no se modificó el actualizador del juego. Verificar en Android con el audio habitual. Si una activación queda pendiente, probar una recarga normal desde el menú, sin borrar datos. Esta observación no equivale a una prueba física del teléfono ni acredita que todas las condiciones de audio estén resueltas.
