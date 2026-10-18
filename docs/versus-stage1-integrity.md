# Etapa 1: integridad de Versus

> Informe de la entrega original. La publicación conjunta se documenta en [release-v365.md](release-v365.md).

Aplicada en Supabase `hlixavucxdxevbbhlxkc` el 18 de octubre de 2026.
Migración registrada: `20261018151602_versus_stage1_integrity.sql`.
No se publicaron cambios en GitHub ni se modificaron recursos del cliente.

## Cambios

- `public.cancel_versus_challenge(uuid)`: bloquea la fila de la sala con `FOR UPDATE`, igual que la preparación de personajes/palabras. Comprueba identidad y pertenencia antes de modificar datos. Solo admite salas `preparing` sin partida activa; rechaza combates y salas terminadas. Conserva la cancelación repetida durante preparación y elimina únicamente el desafío propio cuando el jugador solicita esa acción.
- `private.expire_versus_player_times(uuid)`: cuando vence un solo reloj, determina al rival ganador antes de cambiar el estado a `finished`, en una única actualización. Historial y clasificación reciben el ganador definitivo; no hay una segunda corrección posterior. Conserva el incremento del evento, su motivo, ganador/perdedor y evento previo. Si vencen ambos relojes, conserva `public.finish_versus_match` y sus desempates existentes.
- Las firmas, permisos, funciones de historial/clasificación/monedas y sus triggers se conservaron. La función privada sigue sin ejecución para jugadores. La migración solo reemplaza dos funciones y reafirma permisos: no migra, elimina ni recalcula datos existentes.
- El error de cancelación reutiliza un mensaje existente de preparación para conservar las traducciones del cliente. No se modificó la lógica de idiomas, revancha ni diccionarios.

## Dependencias revisadas

Definiciones reales de preparación de palabras y personajes, creación automática de partidas al pasar la sala a `playing`, finalización general, sincronización de sala terminada, vencimiento individual, consulta de estado, habilidad de Kairós, triggers de carga de habilidad, historial, clasificación y recompensas diferidas. Se consultaron también permisos, columnas, restricciones y registro de migraciones actuales.

## Verificación

1. Se reprodujo el problema de cancelación con la versión anterior: la prueba falló porque aceptaba cancelar en combate.
2. Se reprodujo el problema de historial con la habilidad real de Kairós en la versión anterior: el ganador final era correcto y el historial marcaba otro ganador.
3. La migración propuesta y las pruebas se ejecutaron primero en una transacción revertida.
4. Se aplicó la migración mediante la API de migraciones de Supabase y se comprobó su registro. El servidor asignó `20261018151602`; el archivo local usa esa misma versión.
5. `tests/versus-stage1-integrity.sql` pasó sobre las funciones instaladas: 24 combinaciones (es/en/pt-BR × clásica/clasificatoria × vencimiento individual, vencimiento doble con ganador, empate y final normal), más un caso con la habilidad real de Kairós. Verifica cancelación legítima y repetida, rechazo de ambos participantes/terceros/sin identidad durante combate, conservación de filas ante rechazos, bloqueo tras terminar, ganador/evento, historial, puntos, recompensas, permisos y finalización repetida sin duplicados. Fuerza los triggers diferidos para comprobar monedas antes del rollback.
6. Todas las cuentas, salas, partidas, resultados y monedas de las pruebas son sintéticos y se revirtieron. El SQL incluye `BEGIN` y `ROLLBACK`; no requiere limpieza ni borra datos existentes.
7. Pruebas Node: 12/12 aprobadas, de `versus-migrations`, `versus-kairos`, `versus-engine`, `online-languages`, `versus-social` y `game-wallet`.
8. Consulta de solo lectura posterior: cero discrepancias entre ganador e historial y cero entre ganador y resultados clasificatorios, para los registros que aún pueden cruzarse con una partida existente. No se recalcularon historiales antiguos.
9. Advisors de seguridad: mismos nombres, niveles y detalles antes/después, sin avisos nuevos. Permanecen avisos previos sobre RPC privilegiados autenticados, acceso anónimo, configuración de protección de contraseñas y tablas privadas con RLS sin políticas. No se ampliaron permisos.

## Alcance y límites

Los cambios ya actúan en el servidor y son compatibles con el cliente publicado. No se tocaron migraciones históricas ni se hicieron commits/push. No se agregaron funciones sociales, tienda ni anuncios. Las verificaciones cubren transacciones y permisos reales de Supabase; no incluyen una prueba de carga concurrente ni un recorrido nuevo en dos celulares.

Para repetir las pruebas SQL, ejecutar el archivo completo contra el mismo esquema. Está diseñado para terminar en rollback. Ante un error, revertir la transacción; no confirmar fixtures.
