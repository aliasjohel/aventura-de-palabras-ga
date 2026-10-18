# Etapa 2: invitaciones y reconexión de Versus

> Informe de la entrega original. La publicación conjunta se documenta en [release-v365.md](release-v365.md).

18 de octubre de 2026. Proyecto Supabase: `hlixavucxdxevbbhlxkc`.
Migración aplicada y registrada: `20261018153728_versus_stage2_invites_reconnect.sql`.

## Estado de entrega

Las protecciones y la consulta ampliada ya están activas en Supabase. Los cambios del adaptador y de navegación están guardados localmente y no están publicados. No se hicieron commits ni push. La recuperación nueva en los dispositivos requiere publicar posteriormente estos archivos del cliente; el cliente publicado conserva sus mecanismos anteriores hasta entonces.

No se crearon tablas ni endpoints sociales paralelos. Se agregó un único helper privado compartido, no ejecutable por jugadores. La migración reemplaza funciones existentes, sin actualizar ni eliminar filas de producción ni modificar migraciones históricas.

## Servidor

Se considera ocupado al jugador que pertenece a una sala `complete`, `preparing` o `playing`, o a una sala con una partida que aún está `playing`. Se permite seguir trabajando en la misma sala. Las salas privadas en espera no reservan otro duelo: al intentar completarlas se comprueba también la disponibilidad del anfitrión.

- `private.assert_versus_available(uuid[],uuid)`: comprobación común con el bloqueo transaccional que ya usa el emparejamiento, `927341`. No duplica el sistema de salas ni crea un estado de presencia.
- `public.create_versus_room`: impide crear otra sala si el jugador está ocupado.
- `versus_private.join_room_core`: comprueba al invitado y a los miembros existentes antes de admitirlo; conserva la reentrada a la misma sala y las restricciones clasificatorias.
- `public.set_versus_character`, `public.set_versus_challenge`, `public.request_versus_rematch` y `public.start_versus_match_on_room_ready`: usan la misma comprobación para cubrir preparaciones, salas antiguas y revanchas. El inicio y la revancha rechazan reemplazar una partida que siga activa. Se conserva el recorrido de revancha existente.
- `public.send_versus_invite`: comprueba a ambos amigos y serializa la operación. `public.cancel_versus_invite` comparte el bloqueo para ordenar cancelación y aceptación.
- `versus_private.respond_invite_core`: comprueba disponibilidad de ambos participantes antes de crear una sala. Un reintento después de perder la respuesta HTTP devuelve la misma sala aceptada si aún está vigente y ambos siguen siendo miembros; no crea otra. Los estados cancelado, rechazado, expirado y las invitaciones pendientes cuyo plazo terminó no se aceptan. El plazo se comprueba con `clock_timestamp()` después de adquirir el bloqueo, para no aceptar usando la hora anterior a una espera. Una aceptación ya consumada no vence por el plazo de la invitación pendiente; se recupera mientras su sala siga activa.
- `public.get_versus_social_state`: mantiene los campos anteriores, agrega el idioma a las invitaciones pendientes y `accepted_invites` para ambos participantes. Solo devuelve aceptaciones con sala activa y pertenencia de ambos jugadores, excluyendo salas cerradas, terminadas o abandonadas. No depende de recibir Realtime ni revela salas ajenas.

Se conservaron wrappers, firmas, permisos y restricciones de clientes antiguos: un cliente antiguo no acepta desafíos ni entra por código en otro idioma. La sala conserva el idioma del desafiante y la revancha lo mantiene. No se modificaron las funciones de historial, puntos ni monedas de la Etapa 1.

## Cliente local

`js/versus-room-supabase.js`:

- Usa el estado persistido como fuente para recuperar aceptaciones. Los eventos Realtime solo solicitan una nueva consulta.
- Actualiza al iniciar, recuperar foco/conexión/visibilidad, renovar la sesión y completar una suscripción. Una consulta cada 15 segundos mientras la aplicación está visible y online cubre eventos perdidos. Mantiene la verificación de sala existente.
- Agrupa consultas simultáneas, permite reintentar tras fallos y marca la sala como recuperada solo después de cargarla y suscribirse correctamente.
- Restaura primero la sala recordada, evita reemplazar otro duelo activo y conserva una notificación para los suscriptores que se registran después de inicializar.
- Descarta respuestas sociales/de combate de otra cuenta o sala, evita volver a abrir una sala abandonada explícitamente y contiene errores de consultas periódicas sin rechazos no controlados.

`js/app.js`: al recuperar una invitación, continúa en selección, preparación o combate según el estado actual, en lugar de volver siempre a selección de personajes.

`index.html` y `sw.js`: revisiones de los scripts y manifiesto de hashes regenerado. No se cambió el nombre de la versión pública ni se publicó un release; al autorizar una publicación deberá prepararse la versión de release correspondiente.

## Pruebas

- `tests/versus-stage2-invites.sql`: ejecutado primero con la migración en una transacción revertida y después contra las funciones instaladas. En español, inglés y portugués cubre rechazo/cancelación mediante RPC reales, vencimiento, aceptación/reintento, recuperación de ambos participantes, privacidad ante terceros, cliente antiguo, jugador ocupado de cualquiera de los dos lados, creación privada, desafíos adicionales, búsqueda, preparación, comienzo, finalización y revancha. Sus fixtures siempre terminan en rollback.
- `tests/versus-stage1-integrity.sql`: volvió a pasar después de aplicar la Etapa 2, incluidos los 24 escenarios y la habilidad real de Kairós.
- `tests/versus-stage2-reconnect.test.cjs`: 12 casos de comportamiento del adaptador: tres idiomas con preferencia de interfaz distinta, evento perdido, arranque, consulta periódica, foco/visibilidad/conexión/suscripción, fallo transitorio, eventos atrasados, sala activa diferente, almacenamiento viejo, cambio de cuenta, abandono explícito y notificación tardía con el estado actual.
- `tools/check-versus-stage2-concurrency.cjs`: solicitudes realmente paralelas a Supabase, sin adquirir el bloqueo desde el test. Pasaron: dos aceptaciones del mismo desafío en español devuelven una sala; aceptación contra entrada por código en inglés admite un solo duelo; aceptación contra emparejamiento en portugués admite un solo duelo. La transacción ganadora mantiene brevemente abierta la operación para solapar las solicitudes. Usa un runner SQL externo por variable de entorno, sin guardar credenciales en el repositorio.
- Para las pruebas paralelas se crearon cuentas sintéticas marcadas con un identificador único. La limpieza comprobó el identificador y los UUID creados en esa ejecución antes de quitar únicamente esos fixtures. Las huellas y cantidades de las 15 tablas protegidas resultaron idénticas antes y después: cuentas, amistades, invitaciones, salas, partidas, historiales, clasificación y monedas existentes se conservaron.
- Suite automática focalizada: 33/33 aprobadas, incluyendo las 12 nuevas, Versus, idiomas, sistema social, monedero y caché/rangos multimedia.
- `tools/build-cache-manifest.cjs --check`: correcto. `tools/check-incremental-update.cjs`: navegador real, actualización incremental, aislamiento de versión activa/en espera y reproducción de multimedia offline correctos.
- Navegador real: `tools/check-i18n-3g-ui.cjs` y `--offline` pasaron en los tres idiomas, verificando sala, selección, mensajes y nombres literales. La consulta final confirmó cero cuentas sintéticas restantes y cero jugadores duplicados en salas ocupadas.
- Advisors de seguridad: mismos nombres, niveles y detalles antes/después, sin avisos nuevos. La revisión previa encontró cero jugadores duplicados en salas ocupadas.

## Pendiente en celulares reales

Tras revisar y publicar el cliente, probar con dos cuentas amigas en Android/iOS y PWA:

1. Desafiante en segundo plano o sin conexión cuando el otro acepta: al volver recupera la misma sala, sin otro desafío.
2. Destinatario que pierde red justo después de aceptar: reintento y reapertura conservan una única sala.
3. Suspensión/bloqueo de pantalla y cambio Wi-Fi/datos durante selección, preparación y combate: vuelve al estado correcto sin reiniciar el duelo ni el reloj del servidor.
4. Intentar aceptar otro desafío, entrar a otra sala o buscar rival mientras se está ocupado; repetir desde dos dispositivos con la misma cuenta.
5. Invitaciones canceladas, rechazadas o vencidas, incluidas notificaciones atrasadas: no vuelven a abrirse.
6. Amigos con interfaces en idiomas diferentes: palabras del desafiante, interfaz propia; entrada por código, búsqueda por idioma y revancha conservan las reglas.

Estas pruebas automatizadas no simulan todas las decisiones de suspensión de Android/iOS. El bloqueo compartido conserva el patrón actual de emparejamiento; no se hizo una prueba de carga masiva.
