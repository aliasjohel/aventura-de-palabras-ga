# v414 — Entrega 2: Me gusta después de limpiar la sala

Base publicada comprobada: v413-mobile-header1, 3ec120a0dd542fcac756582cb39931b384d42d5f. Propuesta original revisada: 8feff4240752c0595254a90673767f5bb37cc1d7. Se prepara esta entrega sobre v413; no se restaura el árbol antiguo ni se copian sus archivos de juego.

Migración específica: **20261109014503_retain_post_cleanup_match_likes.sql**. Versión PWA: **v414-match-likes1**.

## Causa y corrección

El helper alojado conservaba la definición original y requería que la partida y sus participantes temporales todavía existieran para un primer envío. Los recibos ya enviados sí sobrevivían. La corrección utiliza los participantes temporales si la partida existe y terminó; después de limpiarla, exige exactamente dos participantes en el historial escrito por el servidor, ambos con fecha de finalización. El remitente procede de auth.uid() y el destinatario se deriva del registro, nunca del cliente.

La comprobación de finalización y la selección del rival usan una sola instantánea SQL: una eliminación concurrente de la sala no separa ambas decisiones. Un duelo activo no se vuelve elegible por tener filas históricas. Un historial incompleto o heredado sin fecha se rechaza; no se repara ni se inventa una partida.

También se corrigió un segundo fallo: el cliente descartaba partidaOnlineVersus al recibir la eliminación de la sala y el botón dejaba de considerar actual un resultado que seguía visible. Ahora el contexto de Me gusta se vincula al resultado mostrado, al adaptador y a la cuenta, mientras esa pantalla siga activa. No se conserva la partida como autoridad del juego, no se repiten resultados ni se liquidan premios.

## Seguridad y compatibilidad

- Un recibo por (match_id,sender_id), protegido por la clave primaria existente. Los reintentos y los envíos simultáneos son idempotentes.
- p_send sigue siendo false por defecto. Mostrar el resultado solo consulta estado; únicamente el clic voluntario solicita true. No hay reciprocidad automática.
- El RPC conserva su firma y su respuesta. Su wrapper público sigue siendo SECURITY INVOKER; el helper privado mantiene SECURITY DEFINER, propietario y search_path vacío.
- RLS permanece activo. anon, authenticated y service_role no tienen permisos directos de inserción/edición en votos o historial; solo authenticated puede ejecutar este RPC. El cliente no puede escribir participantes temporales ni fijar el estado final de una partida directamente.
- No hay nuevo destinatario, remitente o lista de participantes en los argumentos del RPC. Un tercero, un UUID desconocido o un duelo sin finalizar se rechazan.
- CREATE OR REPLACE conserva los permisos y propietario existentes, como establece la [documentación de PostgreSQL](https://www.postgresql.org/docs/current/sql-createfunction.html). Se verifica además la igualdad de OID, propietario y ACL en el ensayo y en la instalación.
- Las funciones de perfiles existentes siguen calculando los votos recibidos desde los recibos permanentes. No se cambian monedas, XP, puntos, premios, permisos de Torre, tablas, índices ni políticas.

La revisión alojada encontró 36 filas de historial y 0 votos. El índice de historial por (match_id,user_id) y los índices de recibos existentes permiten estas consultas sin añadir estructuras. La línea de base del asesor de seguridad contiene 24 advertencias históricas, sin errores; se compara nuevamente después de aplicar para detectar avisos nuevos.

## Archivos de esta entrega

- js/app.js: solo el contexto de vigencia del botón dentro de mostrarResultadoPartidaVersus.
- sw.js: versión PWA y hash generado de app.js.
- supabase/migrations/20261109014503_retain_post_cleanup_match_likes.sql: sustitución protegida de un helper, sin reescritura de datos ni GRANT/REVOKE.
- tools/tower-rewards-qa/check-match-like-retention.cjs y check-match-like-retention-browser.cjs: PostgreSQL aislado, permisos, concurrencia y dos navegadores.
- Este informe.

Se mantienen intactos el menú aprobado, sus estilos, PlayerXP, monedero, ranking, Torre, anuncios, assets y los demás archivos pendientes. El SQL y las páginas publicadas se verifican contra el commit de esta entrega.

## Pruebas realizadas

- **340/340 pruebas generales**, cero fallos u omitidas.
- PostgreSQL aislado: sala/partida todavía existente, limpieza antes del primer voto, rechazo con partida activa, historial incompleto/de tres jugadores/sin fecha, tercero ajeno, identidad nula, parámetros inválidos, destinatario arbitrario y escritura directa no autorizada.
- Solicitudes simultáneas del mismo remitente, reintentos y 12 carreras entre limpieza y voto. Un recibo por remitente y duelo.
- Votos recíprocos independientes, conteos de ambos perfiles y persistencia de recibos creados antes de migrar. La reversión del helper conserva los recibos; la eliminación de cuenta respeta las cascadas ya existentes.
- Navegador real + PostgreSQL local: trigger real que crea el historial al terminar, eliminación de sala con cascada de tablas temporales antes de votar, notificación al cliente que elimina su partida temporal, voto voluntario, respuesta perdida y reintento sin duplicación, voto recíproco y consulta del recibo tras reconstruir la vista al recargar. Ninguna solicitud de esas pruebas alcanza Supabase alojado.
- Control de interfaz existente: clic explícito, estado enviado, traducciones, móvil, respuestas atrasadas/cambio de cuenta, exclusión de duelos locales/Torre y contador de perfiles.
- Manifiesto de 915 recursos generado y comprobado; pruebas de actualización incremental, aislamiento activo/en espera, conservación de datos y medios offline; transición completa v413 → v414.

Los ensayos locales usan roles/claims de prueba y no sustituyen la autenticación física de dos teléfonos. Recargar conserva los votos del servidor; esta entrega no añade una nueva pantalla para recuperar resultados que el jugador ya cerró o que no pueden reconstruirse porque la sala desapareció. La corrección permite votar desde el resultado abierto aunque se limpie la sala.

## Instalación, respaldo y reversión

La instalación usa una transacción exclusiva de esta migración, con límites de espera, huella del helper original y comprobaciones de catálogo. Se registra la migración y su SQL de reversión en supabase_migrations.schema_migrations. Si cambian funciones no objetivo, permisos, políticas, triggers o los permisos de Torre, o si faltan registros previos, la transacción se cancela. No se usan db push ni una instalación global de migraciones pendientes.

El respaldo de votos e historial está cifrado con DPAPI y permisos locales restringidos; su descifrado fue comprobado. También se guardan la definición original del helper, metadatos/ACL, los dos archivos de ejecución de v413 y las huellas de seguridad. Evidencia privada: .local-developer/releases/v414-match-likes/.

La reversión del servidor restaura solo el helper original si todavía coincide con la huella de esta entrega; mantiene los votos creados antes y después. Debe registrarse como una nueva migración de reversión, sin borrar el historial de instalación. La reversión del cliente es un nuevo commit que revierta solo este cambio y use un identificador PWA superior libre, regenerando el manifiesto. Nunca restaurar saldos antiguos, borrar almacenamiento/cachés útiles ni forzar main hacia atrás.

La verificación alojada posterior consulta únicamente estado con p_send=false en una transacción de solo lectura y compara los datos, permisos y funciones con el respaldo. No se crean cuentas, partidas, votos ni premios artificiales en producción. El resultado definitivo de instalación, asesor y publicación queda registrado en installation-result.json, metadata-after.json y publication-result.json dentro de la evidencia privada.

## Comprobación Android con dos cuentas reales

1. Actualizar ambas instalaciones desde el menú sin borrar datos. Abrir cada perfil y anotar su contador de Me gusta. Jugar un duelo online real y esperar la liquidación normal de monedas/XP/ranking antes de comparar valores.
2. Con el resultado abierto en ambos teléfonos, comprobar que no se envió ningún Me gusta por aparecer la pantalla. Enviar uno desde A: solo el contador recibido de B debe aumentar. Enviar desde B es una decisión independiente.
3. En otro duelo, dejar el resultado abierto en A y salir/cerrar la sala desde B antes del primer voto de A. A debe poder enviar el Me gusta a B aunque la sala ya no exista.
4. Si se pierde la conexión durante el envío, reconectar y reintentar. Debe contarse una sola vez; al confirmar, el botón muestra Me gusta enviado y queda deshabilitado.
5. Cerrar y volver a abrir los perfiles, o recargar la aplicación: los votos recibidos deben seguir presentes. No se debe sumar otro voto por consultar o recargar.
6. Comparar monedas, XP y ranking después de la liquidación del duelo y antes/después del voto. El Me gusta solo afecta su propio recibo y contador. No usar créditos de administrador ni resultados ficticios para esta prueba.
