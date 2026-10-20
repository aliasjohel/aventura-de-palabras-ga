# Fondos con compras y logros — preparación local

El usuario eligió el modelo mixto el 20 de octubre de 2026. Este directorio no está cargado por el juego publicado: falta acceso al servidor real y su validación. No se ejecutaron migraciones ni se habilitaron cobros de fondos.

Reparto inicial propuesto, tomando como referencia los trajes existentes de 150–300 monedas:

| Fondo | Obtención |
| --- | --- |
| Bosque con luciérnagas | Gratis desde el inicio |
| Desierto | 100 monedas del juego |
| Zafir | 150 monedas del juego |
| Nimbus | Completar Mundo 3 |
| Nivor | Completar Mundo 4 |
| Azrak | Alcanzar Diamante, 240 puntos |

`background-inventory.cjs` separa probar, comprar y equipar; conserva inventarios por cuenta y rechaza respuestas de otra cuenta o anteriores. Las pruebas cubren doble clic, reintento, errores, inventario bloqueado y persistencia. Ejecutar `node --test drafts/profile-backgrounds/background-inventory.test.cjs`.

Integración pendiente al recuperar Supabase:

1. Verificar estructura y funciones reales de monedero, inventario, resultados y recompensas. El conector respondió `not available to the model`; no hay CLI o sesión local disponible.
2. Tabla privada de inventario de fondos con RLS y sin escrituras directas para clientes; RPC autenticada. Mantener el saldo existente de `game_wallets` y bloquear su fila antes de debitar, en la misma transacción que concede el fondo. Un objeto ya comprado no se cobra otra vez.
3. Conceder Nimbus y Nivor con las recompensas registradas de `aventura:nimbus_cumbres:duelo` y `aventura:nivor_cero_absoluto:duelo`, sin aceptar rangos enviados por el cliente. Revisar la migración de jugadores antiguos cuyos logros de Aventura existen solo en el dispositivo; no exigir repetir mundos sin una decisión explícita. Aventura ya admite recompensas locales sincronizadas: no presentar esos datos como prueba contra trampas.
4. Conceder Azrak desde puntos de resultados clasificados verificados; conservar el desbloqueo aunque cambie el rango. Comprobar el cálculo vigente en producción antes de fijarlo.
5. Adaptador a la cola de `GameWallet`, con sincronización previa y comprobación de cuenta antes y después de cada RPC. El resultado debe actualizar el saldo real y el inventario confirmado; no descontar monedas solo en el navegador.
6. Mostrar las seis opciones con requisito/precio. Permitir **Probar** sin conceder propiedad. **Equipar** solo para fondos obtenidos. Guardar selección y mostrarla en perfil propio y público. Integrar compras también en la tienda; mantener Aventura y rango como fuentes de logros.
7. Pruebas SQL con rollback, saldo insuficiente, concurrencia, equipamiento ajeno, cambios de cuenta, modo de prueba sin gastos reales y actualización sin perder datos. Servidor primero, cliente después.

No cargar este borrador en la versión pública hasta completar los puntos anteriores.
