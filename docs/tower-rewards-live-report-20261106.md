# Torre Arcade: instalación y publicación del piloto

Versión de juego: v395-tower-rewards-candidate1. Commit aprobado y enviado a main: 0a6505839dda2fbfe3f0c2427b594422309a4b82. Sitio: https://aliasjohel.github.io/aventura-de-palabras-ga/ . Pages terminó con estado built y el commit esperado. Se verificaron 24 archivos públicos, todos idénticos por SHA-256 al commit aprobado. Evidencia: tower-rewards-live-pages.json y tower-rewards-live-public-assets.json.

## Auth y cuenta autorizada

No hace falta iniciar sesión en la PC ni cerrar ninguna sesión. El usuario confirmó la cuenta correcta en el navegador del teléfono. Una consulta de solo lectura a auth.users/auth.sessions confirmó su ingreso a las 02:23:16 UTC del 7 de noviembre (23:23:16 del 6 de noviembre en Argentina), cuenta permanente y correo confirmado, y una sesión reciente. El ID coincide con el único piloto previamente aprobado. No se extrajeron contraseñas, JWT, refresh tokens ni claves privadas. La cuenta utiliza enlace por correo, no tiene contraseña configurada; se retiró el verificador local por contraseña.

La verificación de Auth se apoya en la sesión alojada y en la sesión del teléfono confirmada por el usuario. Las pruebas SQL de permisos usan roles authenticated y claims locales de transacción, no un JWT extraído del teléfono. La prueba REST anónima del nuevo RPC devuelve HTTP 401/código 42501. No se afirma haber automatizado el navegador físico Android.

## Respaldo y preservación

El respaldo cifrado DPAPI se actualizó después del ingreso del teléfono y se restauró en PGlite en memoria. Se restauraron 61 tablas y 23.053 filas del juego y se comprobaron 66 claves foráneas; la migración exacta se ensayó sobre esa copia, conservando los datos. Hay 54 cuentas y 22 monederos con total de 1.760 monedas en ese respaldo. La sincronización normal del juego había inicializado tres filas desde el respaldo anterior; se preservaron, sin restaurar ni sobrescribir el estado anterior.

Instalación real: migración 20261106221752_tower_exclusive_rewards_inventory.sql, SHA-256 3c92450855f918ad1760996107e8009cd13f2c4cc561208d1651ce65b288d49b. Se aplicó mediante CLI al proyecto hlixavucxdxevbbhlxkc, con transacción, registro de historial y guards de datos, funciones y permisos. Dentro de la misma transacción se comprobó que las 61 tablas originales conservaran todas sus filas, los ACL existentes y las 160 funciones ajenas a los cuatro reemplazos autorizados. No se ejecutó db push general.

La concesión de cosméticos quedó apagada al instalar. Se activó después exclusivamente bajo el rollout ya existente, con un solo piloto y global_enabled=false. No se modificaron otras listas de pilotos ni sistemas de premios. Evidencia: tower-rewards-live-installation.json y tower-rewards-live-activation.json.

## Pruebas reales de servidor

- Seguridad: RLS y acceso directo cerrado en las cinco tablas nuevas; helpers internos no ejecutables por anon/authenticated. Las 54 cuentas se comprobaron por roles, con 52 cuentas anónimas/no confirmadas rechazadas y exactamente una cuenta elegible para concesiones. Los 14 intentos de equipar artículos no obtenidos se rechazaron. Las mutaciones de prueba se revirtieron.
- Motor alojado: diez victorias de Aren con acciones legales de letras y diez pisos distintos certificados. El administrador leyó las palabras privadas únicamente para generar las acciones de QA; no se cambiaron reloj, resultado ni reglas. El traje y Conquistador aparecieron únicamente tras el décimo piso, pudieron equiparse, el total temporal fue 520 monedas y las repeticiones no volvieron a pagar.
- Toda esa prueba estuvo dentro de ROLLBACK. Se compararon huellas antes/después de monederos, XP, intentos, certificados, progreso, recibos, concesiones y equipo: iguales. No se avanzó la cuenta real ni se conservaron premios o monedas de prueba.
- Asesor de seguridad antes/después: 24 advertencias existentes, cero nuevas y cero errores. No se alteraron otros sistemas para silenciarlas.
- Los once personajes/110 pisos, los tres marcos y todos los umbrales se probaron en la candidata aislada: 330 victorias en tres idiomas, 99 pruebas Node y 61 casos de cinemáticas. En producción la prueba positiva de motor se limitó a Aren/Conquistador; no se concedieron artificialmente los otros diez trajes ni Maestro/Leyenda.

## Publicación, caché y datos

Se envió exactamente el commit aprobado a GitHub Pages, sin copiar el árbol de trabajo con cambios pendientes ni el laboratorio Multijugador. Se conserva el selector visual de once trajes. Los informes de Pages y de archivos verifican la compilación y los hashes públicos contra el commit.

El manifiesto de 907 recursos se comprobó antes de publicar. La prueba de actualización real v394 → v395 de la candidata comprobó versión activa hasta aceptación, cero descargas de imágenes durante instalación y conservación de localStorage/IndexedDB. La comprobación de hashes públicos vincula esa prueba con los mismos bytes publicados. La instalación efectiva en Android queda para la prueba del usuario; no borrar datos ni desinstalar para actualizar.

## Prueba desde Android

1. Abrir el juego en el navegador donde aparece la cuenta correcta. Recargar y aceptar la actualización cuando se ofrezca; esperar a que termine. No cerrar sesión ni borrar caché/datos.
2. En Configuración, dejar el selector visual en Desactivado/usar traje habitual y desactivar Modo prueba. Si Aren usa la forma Unión, elegir su traje habitual antes de equipar el de Torre. El selector se mantiene para pruebas visuales separadas.
3. Entrar en Torre y elegir Aren. Ganar los diez pisos con conexión y validación del servidor. El progreso histórico local no se borró y no se convierte en certificados; al publicar aún no había pisos certificados reales.
4. Los primeros cuatro pisos pagan 30 cada uno; del 5 al 9, 50 cada uno; el 10, 150. Total máximo nuevo del recorrido: 520 monedas, una sola vez por piso.
5. Tras confirmar el piso 10, ir a Tienda → Premios exclusivos de Torre → Aren → Equipar. Elegir Conquistador en Mi perfil → marcos y guardar. Si se interrumpió la conexión, reconectar y actualizar premios para recuperar la entrega, sin repetir pagos.
6. Recargar o volver a abrir el juego con la misma cuenta para comprobar persistencia. Repetir un piso ya pagado para verificar que no vuelve a dar monedas. Informar si no aparece la validación, la actualización o el premio; no reiniciar los datos del teléfono.

## Reversión disponible

El archivo tools/tower-rewards-qa/rollback-grants.sql y su copia en el respaldo apagan nuevas concesiones y conservan artículos, equipamiento, certificados, recibos y saldos. No se ejecutó la reversión. No eliminar las tablas ni IDs/guards nuevos después de entregar premios. Una reversión de interfaz requiere una versión de caché superior, conservando el esquema aditivo. No restaurar saldos antiguos sobre actividad posterior.
