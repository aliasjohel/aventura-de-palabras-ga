# v412 — Perfil ampliado con insignia de nivel integrada

Base: v411, 19e407c40c854fb159e86c6a9aef5ee66964bd41. Identificador PWA: v412-profile-level1.

Se elimina el botón de nivel independiente de la derecha. El nivel general pasa a ser una insignia debajo del avatar, dentro del mismo botón Mi perfil. La insignia queda fuera del contenedor que regenera el retrato, para conservarse al cambiar el marco o actualizar el XP. El marco no queda cubierto. El botón incluye el nivel como descripción accesible y tocar la insignia abre el perfil mediante el evento nativo del botón, una sola vez.

En móvil el avatar crece de 28 a 36 px y Mi perfil pasa de 10 a 12 px (11 px por debajo de 310 px). Hasta 459 px, el bloque se dispone en vertical para conservar el texto, el avatar y las monedas centradas. Se reserva la altura de la cabecera y se mantiene el desplazamiento del panel en alturas pequeñas. El contador conserva formato, sincronización y acceso a tienda. La derecha queda libre para el fondo; no se cambia el arte, la luna, la animación del fondo ni la secuencia del libro y cristal.

## Alcance

Cuatro archivos de ejecución: index.html, css/menu-wallet.css, js/menu-wallet.js y sw.js. También tests/menu-wallet.test.cjs y este informe. El único cambio del módulo JS elimina la redirección artificial del clic del nivel: al estar dentro del botón de perfil se utiliza el clic nativo.

No cambia la lectura del nivel general, XP, monedero, economía, ranking, recompensas, sincronización, Supabase, permisos, SQL ni Me gusta. No se instalan migraciones ni se modifican archivos de Voz Loca.

## Verificación

- 337/337 pruebas de regresión aprobadas, sin fallos ni omitidas, junto con las pruebas reales de actualización incremental y activación segura.
- Comprobación en navegador de 280, 300, 320, 340, 359, 360, 375, 390, 400, 412, 568 y 844 px, en español, inglés y portugués. Monedas centradas, sin colisiones; nivel dentro del perfil y debajo del avatar. Se usan snapshots aislados de saldo y nivel alto, sin RPC reales ni premios.
- Capturas en 280×640, 320×640, 360×780, 390×844, 568×320, 844×390 y 1365×900. Las capturas sin sesión muestran —, sin valores ficticios.
- Clic real sobre la insignia: una sola apertura del perfil. Clic sobre monedas: abre tienda.
- Manifiesto generado y comprobado (915 recursos). Transición con los archivos exactos de v411 a v412 y conservación de marcadores en localStorage, sessionStorage, IndexedDB y cachés útiles, seguida de recarga offline. El arnés libera sus cargas de audio, como en los ensayos documentados anteriores; no modifica el actualizador publicado.

La evidencia y resultados definitivos se guardan en .local-developer/releases/v412-profile-level/. La aceptación física en Android corresponde al usuario: actualizar desde el menú sin borrar datos, comprobar el nivel general dentro del perfil, tocarlo para abrir Mi perfil y tocar monedas para abrir la tienda.

## Respaldo y reversión

Los cuatro archivos sustituidos de v411 están respaldados en .local-developer/releases/v412-profile-level/backup-v411/; backup.json identifica la base y el procedimiento. Para revertir, preparar un nuevo commit que revierta solo esta entrega, asignar una versión de caché superior libre y regenerar el manifiesto. No restaurar saldos, borrar datos o cachés útiles, instalar SQL ni forzar main hacia atrás.
