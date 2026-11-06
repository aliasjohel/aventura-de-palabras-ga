# Torre Arcade: auditoría e integración definitiva de recompensas

Fecha: 6 de noviembre de 2026. Base pública: **v394**, commit `f327875d4900ee344fb2006661ec0893e58d7d62`. La producción visual de los once trajes queda **finalizada y aceptada por el usuario en Android**. Esta entrega es diagnóstico y preparación del contrato; no implementa ni activa todavía los desbloqueos.

## Alcance y preservación

- Consultas alojadas exclusivamente mediante `BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY`, límites de tiempo y `ROLLBACK`, usando el helper local ya existente del proyecto `hlixavucxdxevbbhlxkc`. El conector Supabase devolvió “not available” en ambas conexiones disponibles.
- No se invocaron RPC de juego, cobro, sincronización ni equipamiento en producción. No se creó ni instaló una migración. No hubo publicación, activación, importación histórica ni cambio de opciones del piloto.
- El juego, selector visual, inventarios y progreso no se modificaron. Las huellas de billeteras, inventario de personajes, cosméticos XP, progreso Torre, pisos certificados y recibos Torre coinciden antes/después; también coinciden número de cuentas y configuración del piloto.
- El ensayo de PostgreSQL se hizo en un clúster efímero en `127.0.0.1`, con 53 cuentas sintéticas. Se excluyeron todas las migraciones posteriores a la de Torre, incluida la del laboratorio Multijugador. No se copió ni modificó el laboratorio ni se ejecutaron sus pruebas.
- Una auditoría y huellas no sustituyen un respaldo recuperable. Antes de una futura instalación habrá que crear un respaldo nuevo y ensayar su restauración; no restaurar saldos antiguos sobre actividad legítima posterior.

## 1. Estado real comprobado

| Componente | Implementado | Falta |
|---|---|---|
| Servidor Torre | Motor autoritativo, 110 definiciones, intentos, secuencias y recibos de acciones, progreso por cuenta/personaje, pisos certificados y monedas únicas | Entrega de los trajes y marcos |
| Piloto | `enabled=true`, `payments_enabled=true`, `global_enabled=false`; únicamente la cuenta previamente autorizada | Probar desbloqueos reales con cosméticos, todavía inexistentes |
| Juego principal v394 | Torre local y selector temporal de los once trajes | Portar de manera acotada el adaptador autoritativo; el cliente del piloto está separado en `/torre-piloto/` |
| Once trajes | 126 imágenes vigentes, archivos comprobados; correcciones de Guardiana/Nivor y victoria humana del lobo incluidas; aceptación física Android confirmada por el usuario | Catálogo definitivo de premios, propiedad remota, equipamiento persistente y resolución visual fuera de la prueba |
| Tres marcos | Conquistador/Maestro/Leyenda completos en galería local: 3 WebP de 512×512 y 3 miniaturas de 128×128, con alfa; 220.454 bytes | Catálogo, copias finales en recursos del juego, traducciones, propiedad, permisos de uso y presentación en todas las superficies |
| Perfil y vestuario | Sistema existente para compras, XP, rangos y apariencia | Admitir IDs de Torre y verificar propiedad sin mezclar sus condiciones con XP/ranking |

Fotografía de Supabase a las 18:21 de Argentina: **54 cuentas**, **21 billeteras**, **1.760 monedas** acumuladas; **0 intentos Torre, 0 pisos certificados, 0 filas de progreso Torre, 0 recorridos completos y 0 recibos/monedas de Torre**. Son cantidades observadas, no valores a restaurar. No hay trajes Torre en `game_wallets.owned` ni marcos Torre en catálogo XP o apariencia equipada.

Las pruebas visuales en la entrada principal no certifican victorias ni entregan premios permanentes. El progreso local existente continúa conservado: que el registro certificado esté vacío no significa que haya sido borrado el progreso del teléfono. No se convertirá automáticamente `progresoArcadeAventuraGA:*` en evidencia de Supabase.

La migración instalada es `20261031183634_tower_authoritative_combat_and_coins.sql`, SHA-256 `944f3492393328c501f480817dd0912edfa6024f4260dce38e6fd5cdb15f0353`. Los cuerpos de sus **16 funciones Torre** coinciden con los instalados. Ocho archivos de entrada/código del juego principal y del piloto coinciden por hash con el sitio público.

## 2. Reglas que debe conservar la integración

| Condición comprobada por Supabase | Premio | Frecuencia máxima |
|---|---|---|
| Ganar pisos 1, 2, 3 o 4 | 30 monedas por piso | Una vez por cuenta/personaje/piso |
| Ganar pisos 5, 6, 7, 8 o 9 | 50 monedas por piso | Una vez por cuenta/personaje/piso |
| Ganar piso 10 | 150 monedas | Una vez por cuenta/personaje/piso |
| Diez pisos distintos certificados del mismo personaje | Su traje exclusivo | Una vez por cuenta/traje |
| Completar 1 personaje distinto | Marco `tower_conquistador` | Una vez por cuenta |
| Completar 6 personajes distintos | Marco `tower_maestro` | Una vez por cuenta |
| Completar 11 personajes distintos | Marco `tower_leyenda` | Una vez por cuenta |

Total: **520 monedas por personaje; 5.720 por los once; 110 recibos de monedas y como máximo 14 cosméticos distintos**. Los tres marcos son acumulativos. Repetir un personaje no aumenta el número de personajes completos. Cambiar de idioma, dispositivo o ID de solicitud tampoco reinicia el derecho a un premio. `tower_leyenda` será distinto de `leyenda`, que ya pertenece al ranking.

IDs persistentes propuestos: `tower_explorador`, `tower_mago`, `tower_guardiana`, `tower_dragon`, `tower_hombre_lobo`, `tower_t_shadow`, `tower_guardian_alba`, `tower_dragon_hielo`, `tower_azrak`, `tower_kalamo` y `tower_kairos`. El archivo de contrato enlaza cada uno con su nombre, ID visual actual, poses y hashes. Son propuestas de integración; no están instalados ni son comprables.

## 3. Seguridad actual y riesgos pendientes

**Evidencia y duplicados.** Las diez tablas Torre tienen RLS y no dan acceso directo a `anon` ni `authenticated`. La RPC pública exige autenticación; el helper privado usa `auth.uid()`, cuenta permanente confirmada y autorización del piloto. Hay claves únicas por cuenta/solicitud, intento/solicitud y cuenta/personaje/piso, una sola partida activa por cuenta y bloqueo transaccional por cuenta. Las monedas se calculan en servidor; insertar el recibo y acreditar el saldo ocurre en una transacción. Los pisos pueden repetirse sin volver a pagar.

**El juego principal todavía no usa esa autoridad.** No se puede conectar un premio al resultado local de `mostrarResultadoPartidaVersus`, al piso visible o a una bandera del selector. Hay que portar las llamadas de Torre y la presentación del resultado autoritativo a la base v394, conservando las correcciones visuales. No reemplazar `js/app.js` completo por la copia antigua del piloto.

**Piso 10 no basta por sí solo.** `tower_progress` avanza al ganar; `tower_verified_floors` se registra al liquidar. Una desconexión puede dejar victorias ganadas con liquidaciones pendientes. El cosmético debe exigir los diez pisos distintos certificados, cada uno enlazado a un intento propio ganado del mismo personaje. La reconciliación debe recuperar liquidaciones pendientes y después evaluar los premios, incluso si la moneda de ese piso ya fue acreditada. No volver a pagar monedas durante esa recuperación.

**Todavía no hay inventario cosmético Torre ni validadores de propiedad.** Las restricciones `player_appearance_frame_key_check` y `versus_players_frame_key_check` no admiten los tres IDs nuevos. El guard existente de XP solo comprueba IDs `xp_*`; ampliar una lista de marcos por sí solo permitiría equipar premios sin merecerlos. Hace falta verificación de Torre en guardar apariencia, selección de traje, identidad de sala y perfiles. Ver un premio público equipado por otro usuario no debe revelar ni conceder su inventario privado.

**Clientes antiguos pueden omitir equipo nuevo.** `CosmeticStore.read/applyAccount` filtran IDs desconocidos. En servidor, `sync_game_wallet` reconstruye el equipo desde una lista fija y reemplaza el objeto aceptado. Agregar propiedad y equipo Torre sin tratar esto podría hacer desaparecer el equipo al sincronizar desde un cliente antiguo. La solución debe preservar selecciones Torre ante sincronizaciones antiguas y exigir una acción explícita del protocolo nuevo para equipar/quitarlas, con revisión de versión. Los registros de propiedad no se borran nunca por una omisión del cliente.

**El selector visual permite ensayar personajes bloqueados, no concede personajes.** Se mantiene activo. Sus partidas deben seguir siendo práctica sin premios cuando no usan el servidor o la cuenta no posee el personaje. La RPC seguirá comprobando los desbloqueos reales de personajes. Las pruebas automáticas de los once usan cuentas sintéticas con requisitos satisfechos; no hay que conceder personajes reales gratis para probar.

**Asesores actuales.** La CLI devolvió 25 avisos de nivel WARN, ninguno referido a objetos Torre: funciones públicas `SECURITY DEFINER` ejecutables por autenticados, políticas de salas que admiten sesiones anónimas, protección de contraseñas filtradas y evaluación repetida de `auth.uid()` en RLS. No se modifican por quedar fuera del alcance. Esto no constituye una garantía absoluta de seguridad; se revisaron específicamente las rutas Torre. Referencias: [funciones expuestas](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable), [roles y RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [protección de contraseñas](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection), [evaluación RLS](https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan).

## 4. Plan concreto, en orden

1. **Fijar catálogo y contrato.** Usar el manifiesto preparado para los 11 trajes, 3 marcos, 110 pisos y sus importes. Mantener los IDs de imágenes actuales; asociarlos a IDs permanentes de premios. Registrar origen Torre y condición, sin precio ni disponibilidad de compra. Copiar los seis archivos aprobados de marcos a sus destinos del manifiesto cuando se prepare la candidata funcional.
2. **Preparar en entorno local el inventario y la liquidación.** Propuesta: registro privado aditivo `tower_cosmetic_grants`, con clave única `(user_id,item_id)`, clase de artículo, evidencia/fecha y versión de reglas. No reutilizar XP/ranking ni tratar el traje como compra gratuita. Un helper privado evalúa diez pruebas por personaje y umbrales 1/6/11 con personajes distintos. Se llama desde liquidación y reconciliación; el usuario proviene de la sesión, nunca del cuerpo enviado por el cliente. Inventario/recibo quedan en la misma fila o transacción para que no exista un premio a medias.
3. **Añadir API acotada.** Contrato propuesto `tower_cosmetics`: lectura propia de estado, reconciliación de pruebas existentes y equipar/quitar artículo. No admite crear pruebas, enviar un ganador, cantidades de monedas, umbrales ni un dueño arbitrario. Reusar el bloqueo por cuenta y respetar el orden existente de bloqueo de monedero/intento. La recuperación devuelve las propiedades ya registradas; no crea otro crédito de monedas. Una futura bandera cosmética empieza apagada y se restringe al piloto; `global_enabled` continúa en falso.
4. **Equipamiento y compatibilidad.** Integrar comprobación de propiedad Torre en los puntos existentes imprescindibles de vestuario, apariencia, perfiles e identidad de sala. Añadir los IDs de marcos a ambas restricciones junto con un guard de propiedad. Separar las solicitudes antiguas de equipamiento del protocolo nuevo: una sincronización antigua no puede borrar el equipo Torre por omitir IDs desconocidos; quitarlo requiere acción explícita. Compra directa por RPC de cualquiera de los premios debe rechazarse.
5. **Cliente sobre v394.** Adaptar solo el flujo Torre a la autoridad del piloto, sumar un estado remoto de premios por cuenta y su equipamiento, mostrar condiciones/bloqueos y restaurar estado desde Supabase en otro dispositivo. Reutilizar el arte actual en el resolver de trajes reales, incluyendo cada pose de daño/final. Generalizar el render de marcos para los tres WebP y miniaturas, con textos ES/EN/PT-BR, alternativa si falla la imagen y movimiento reducido. Conservar `TowerOutfitPreview` activo e independiente de propiedad/pagos. No trasladar cambios del directorio general ni del laboratorio Multijugador.
6. **Validar candidata local completa.** Ejecutar la matriz de pruebas siguiente sobre PostgreSQL real, RPC/roles y navegador, incluidas dos sesiones independientes. Comparar antes/después datos sintéticos y una restauración aislada de respaldo para detectar efectos sobre compras, saldo, XP, ranking y progreso. Preparar migración aditiva exacta, revisión de seguridad, plan de reversión por opciones y lista acotada de archivos. No instalar todavía.
7. **Revisión del usuario antes de instalar.** Entregar SQL/diff exactos, pruebas completas y respaldo/ensayo. Solo con autorización posterior se instalaría y probaría en la cuenta piloto, sin abrir recompensas globales. Si surge necesidad de migrar o modificar progreso/inventario existente, detener ese paso y consultarlo primero.
8. **Aceptar desbloqueos reales antes de retirar el selector.** Confirmar en Android concesión, repetición sin duplicados, equipamiento y segundo dispositivo. Mantener el selector hasta esa aceptación. Activación global y retirada del selector son decisiones posteriores; ninguna se ejecuta en esta entrega.

## 5. Pruebas ejecutadas y pendientes

| Verificación ejecutada ahora | Resultado y límite |
|---|---|
| Contrato e inventario de arte | 110 casos únicos, once conjuntos/126 poses, 3 marcos/6 archivos, límites 520/5.720; valida archivos y reglas propuestas, no entrega cosméticos |
| PostgreSQL real local | 330 configuraciones (11×10×3 idiomas), 332 combates completados en la suite existente, 110 recibos únicos, 5.720 monedas; concurrencia, repetición, reconexión, secuencias, roles, bloqueo de pisos y fallo transaccional aprobados |
| Cliente Torre | 12 pruebas aprobadas de reconexión, respuesta perdida, cambio de cuenta, aislamiento de pantallas, latido y aplicación de monedas sin alterar compras/XP; pruebas de cliente, no sesiones reales de producción |
| Correspondencia con servidor | 16 cuerpos de funciones Torre instalados coinciden con la migración ensayada; no se ejecutaron combates en producción |
| Correspondencia pública | Ocho archivos del juego/piloto coinciden por hash; v394 sigue publicada |
| Preservación alojada | Seis huellas de datos, número de cuentas y opciones del piloto idénticos antes/después; transacciones de solo lectura |

**Pendiente, sin fingirlo como aprobado:** concesión de los once trajes, tres marcos, equipamiento de premios, sincronización entre dispositivos y compatibilidad antigua del nuevo protocolo. El código de esas funciones todavía no existe. El contrato de pruebas preparado contiene estos casos obligatorios:

- Recorrer los 110 pisos: pisos 1–9 sin traje; piso 10 entrega únicamente su traje con diez pruebas válidas. Repetir cualquier piso/personaje/idioma no concede duplicados. Perder, empatar, abandonar o presentar resultados locales falsos no entrega premios.
- Umbrales con 0/1/5/6/10/11 personajes distintos; casos de huecos en pisos certificados, evidencia ajena o de otro personaje. Los tres marcos son acumulativos y no colisionan con `leyenda` de ranking.
- Repetir una solicitud y usar nuevos IDs después de perder la respuesta; dos dispositivos y liquidaciones concurrentes que cruzan seis/once personajes; un solo artículo/recibo por cuenta; reinicios antes/después del commit.
- Interrumpir red antes y después de ganar/liquidar, recuperar el intento y reconciliar un cosmético pendiente aunque las monedas ya estén pagadas. Fallos de monedero y de inserción cosmética no dejan entregas parciales; reintentar no duplica el saldo.
- Equipar cada traje y marco legítimo por RPC, recuperarlo en otra sesión limpia y renderizar menú/perfil/sala/duelo; rechazar artículo ajeno/no poseído, traje de personaje incorrecto y compra directa. Cambio de cuenta con respuesta en vuelo no transfiere propiedad ni apariencia.
- Cliente antiguo después de cliente nuevo, recarga sin conexión con recursos ya descargados y reconexión; propiedad remota intacta. El guardado antiguo no borra equipo Torre. Definir con precisión la presentación offline: no conceder derechos nuevos sin servidor.
- Selector temporal activo durante la integración: no registra victorias, propiedad ni recibos por seleccionar arte; cuenta sin personaje habilitado no gana premios por ese atajo. Comparar inventarios y claves de progreso originales sin reescribirlos.

## Evidencia y ejecución reproducible

- `docs/tower-rewards-audit-20261106.json`: fotografía agregada de producción, restricciones, índices y permisos. No contiene correos, tokens ni sesiones.
- `docs/tower-rewards-integration-plan-20261106.json`: correspondencia de artículos/arte, destinos de los marcos, SHA-256, matriz 110 y grupos de pruebas pendientes.
- `.local-developer/tower-rewards-audit-20261106/`: funciones consultadas, asesores, restricciones de marcos, suite PostgreSQL, procedencia del fixture, TAP cliente, comparación pública, contrato y preservación. Artefactos locales; no se publicaron.
- Herramientas nuevas: `audit-tower-rewards-20261106.cjs`, `prepare-tower-rewards-plan-20261106.cjs`, `check-tower-audit-contract-20261106.cjs`, `audit-tower-existing-qa-20261106.cjs`, `verify-tower-audit-readonly-20261106.cjs`, dentro de `tools/`. Las herramientas de lectura no invocan RPC mutadoras; QA usa exclusivamente PostgreSQL local sintético.

Documentación oficial revisada: [privilegios de funciones](https://supabase.com/docs/guides/database/functions), [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security) y [changelog](https://supabase.com/changelog). CLI local comprobada: 2.121.0, con ayuda de `db query` y `db advisors`; no se actualizó ni se utilizó `db push`.
