# Etapa 3: Amigos dentro de Perfil

> Informe de la entrega original. La publicación conjunta se documenta en [release-v365.md](release-v365.md).

18 de octubre de 2026. Cambios del cliente locales, sin commits, push ni publicación.
Migración aplicada: `20261018171043_profile_friends_summary_and_requests.sql`, proyecto `hlixavucxdxevbbhlxkc`.

## Resultado

Perfil incluye una sección Amigos, antes del historial y de la personalización. Su botón abre el mismo diálogo que el acceso conservado en Multijugador. No hay un botón nuevo en el menú principal ni listas duplicadas.

El diálogo funciona en vertical y horizontal y contiene:

- **Mis amigos:** avatar, marco, alias literal y rango calculado con los puntos del servidor cuando están disponibles. Abre el perfil público existente y permite enviar un desafío. Conserva la acción existente de quitar amigos.
- **Solicitudes:** recibidas con aceptar/rechazar y enviadas con cancelar. Tiene estados vacíos separados.
- **Agregar:** código propio, copiar y formulario del código existente de ocho caracteres.
- **Desafíos:** reutiliza las invitaciones recibidas y enviadas. Al aceptar muestra el idioma de las palabras; la recuperación conserva el idioma de la sala.

El perfil público sigue consultando sus estadísticas e historial actuales al abrirse. No se carga un perfil completo por cada fila de Amigos. Las invitaciones aceptadas cierran los diálogos superpuestos y continúan en selección, preparación o combate según el estado, conservando la recuperación de la Etapa 2.

Los controles tienen un mínimo de 44 px, alias largos ajustados, pestañas con roles y navegación de teclado, retorno al Perfil anterior y textos en español, inglés y portugués. Sin conexión se muestra el motivo y se deshabilitan las acciones de red. Hay reintento explícito tras errores; las operaciones simultáneas desde el panel se bloquean hasta terminar.

## Funciones reutilizadas

- `asegurarConexionSalasVersus`, su adaptador y sus suscripciones sociales existentes.
- `get_versus_social_state`, amistades, solicitudes y códigos de `versus_profiles`/`versus_friendships`.
- `send_versus_friend_request` y `respond_versus_friend_request`.
- Invitaciones existentes: enviar, responder y cancelar, con las protecciones de ocupación, idioma y reconexión de las Etapas 1 y 2.
- `PublicPlayerProfile.abrir` y `PlayerProfile.cargarPublico`: sin duplicar el componente ni las estadísticas.
- `PlayerAvatar.crear`, su normalización de catálogo y `VersusRanks.division`, con las traducciones de rango existentes.

## Supabase

La migración reemplaza solo dos funciones existentes. No crea tablas, endpoints ni copias de amistades, perfiles, resultados o estadísticas.

1. `public.get_versus_social_state()`: añade avatar y marco de `versus_private.player_appearance` y puntos agregados de `versus_private.ranked_results` a la lista de amigos. Conserva todos los campos anteriores y las invitaciones aceptadas de la Etapa 2. No devuelve correos, datos de cuentas ajenas ni historiales completos.
2. `public.respond_versus_friend_request(uuid,boolean)`: permite al emisor cancelar únicamente su solicitud pendiente mediante `p_accept=false`, cambiándola a `declined`. No borra la fila. El bloqueo y la comprobación de estado impiden que una cancelación tardía quite una amistad ya aceptada; el emisor sigue sin poder aceptar su propia solicitud.

Permisos, RLS y firmas permanecen iguales. Se probó primero en una transacción revertida y después se aplicó con el registro de migraciones de Supabase. No hubo cambios persistentes de datos: las huellas y cantidades de las 15 tablas verificadas fueron idénticas antes/después. Los fixtures SQL se revirtieron. Advisors: mismos avisos previos, sin avisos nuevos.

## Archivos de esta etapa

| Archivo | Cambio |
|---|---|
| `index.html` | Acceso en Perfil y Multijugador, único diálogo compartido y tres pestañas; revisiones de scripts y CSS. |
| `js/app.js` | Apertura, navegación, renderizado común, rango, solicitudes enviadas, conexión/errores y cierre de diálogos al recuperar un duelo. |
| `js/versus-room-supabase.js` | Método `cancelarSolicitudAmistad`, usando la respuesta existente; conserva las mejoras de la Etapa 2. |
| `js/player-avatar.js` | Opción de miniatura en el componente existente; el resto de usos conserva sus recursos originales. |
| `css/player-avatar.css` | Diseño móvil del diálogo y acceso desde Perfil, foco visible y distribución a 320 px. |
| `locales/{es,en,pt-BR}/profile.json` | Textos de Amigos. |
| `js/i18n-es-fallback.js` | Fallback español regenerado desde los catálogos. |
| `assets/images/perfil/miniaturas/*.webp` | Quince miniaturas de los retratos y marcos existentes, sin modificar originales. |
| `tools/build-friend-thumbnails.py` | Generador reproducible con Pillow, resolución máxima 96 px. |
| `sw.js` | Miniaturas en caché y manifiesto de hashes regenerado, sin cambiar la versión pública. |
| `supabase/migrations/20261018171043_profile_friends_summary_and_requests.sql` | Ampliación compatible de las dos funciones existentes. |
| `tests/profile-friends.sql` | Pruebas de amistad, cancelación segura, metadatos, rangos y privacidad. |
| `tools/check-profile-friends-ui.cjs` | Recorridos de navegador y modo de prueba real offline. |

Las quince miniaturas suman **72.818 bytes**, frente a **21.147.946 bytes** de sus originales. Solo las filas que usan miniaturas las solicitan; tienen carga diferida y decodificación asíncrona. El rango de la lista es texto y no carga insignias pesadas. La prueba offline reduce únicamente los recursos multimedia de su servidor de pruebas; la caché de producción conserva la lista completa.

## Verificaciones

- SQL nuevo aprobado contra Supabase: agregar por código, solicitudes entrantes/salientes, cancelación sin borrado, bloqueo de autoaceptación, terceros sin permiso, cancelación posterior a una aceptación sin romper la amistad, avatar/marco/puntos reales, valores vacíos y permisos.
- SQL de Etapa 1 aprobado: 24 escenarios y habilidad real de Kairós.
- SQL de Etapa 2 aprobado: invitaciones, recuperación, jugadores ocupados, salas privadas, clasificación, revancha y tres idiomas.
- Navegador con fixtures de servidor: cinco recorridos completos (`es`, `en`, `pt-BR` a 390×844, portugués a 320×740 e inglés a 844×390). Validan entrada desde Perfil sin pasar por Multijugador, panel único, estadísticas recargadas al reabrir perfil, desafío, aceptar/rechazar, cancelación, código, estados vacíos, invitado, offline, teclado, alias literales y miniaturas. También comprueban el cierre de los tres diálogos al recibir una aceptación.
- PWA real sin conexión: arranque tras instalar el worker, entrada Perfil → Amigos en los tres idiomas, textos cargados y controles de red deshabilitados.
- Suite focalizada: 76 pruebas automáticas aprobadas (Versus, reconexión, idiomas, avatar/marcos, clasificación, monedero y caché).
- `tools/check-i18n-3g-ui.cjs` y `--offline`: sala, selección, mensajes rápidos y traducciones previas correctas.
- Fallback español, manifiesto de caché y `git diff --check` verificados. La prueba de navegador de actualización incremental y reproducción offline sigue aprobada.

## Pendiente

- Revisar y autorizar la publicación del cliente. La ampliación de Supabase ya está activa; el nuevo acceso en Perfil todavía no está publicado. Al preparar el release deberá ajustarse el nombre de versión de caché como en el flujo habitual.
- Probar con cuentas y dispositivos reales Android/iOS: teclado del código y correo, botón atrás/gestos entre diálogos, desafío desde Perfil, suspensión y pérdida de red al aceptar, interfaces en idiomas distintos y retorno a una partida existente. Las pruebas de navegador de la interfaz usan fixtures; las funciones y protecciones se verificaron por separado en Supabase.
- Búsqueda por nombre, presencia online y nuevas tarjetas de presentación del rival quedan fuera de esta etapa, igual que anuncios y productos.
