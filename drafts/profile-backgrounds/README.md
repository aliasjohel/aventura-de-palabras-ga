# Fondos con compras y logros

Implementación promovida a `js/profile-backgrounds.js` e integrada en perfil, tienda y perfil público en v382. Supabase verificado y migración `20261021002155_profile_background_inventory_and_unlocks.sql` aplicada. El adaptador de este directorio conserva compatibilidad con las pruebas iniciales.

| Fondo | Obtención |
| --- | --- |
| Bosque con luciérnagas | Gratis |
| Desierto | 100 monedas |
| Zafir | 150 monedas |
| Nimbus | Completar Mundo 3 |
| Nivor | Completar Mundo 4 |
| Azrak | Alcanzar Diamante: 240 puntos |

Probar no concede propiedad. Comprar y equipar son operaciones independientes, confirmadas por RPC autenticada. Inventario privado con RLS, monedero bloqueado durante la transacción, compras repetidas sin nuevo débito. Rango verificado desde resultados del servidor. Se importa una vez el avance histórico local de Aventura, compatible con su modelo previo; esto no constituye una prueba contra trampas. Los logros posteriores usan los eventos existentes de recompensas de Aventura.

Pruebas de inventario: `node --test tests/profile-background-inventory.test.cjs`. SQL transaccional con rollback: `tests/profile-backgrounds.sql`. Prueba de interfaz sin gastos reales: `node tools/check-background-purchases.cjs`.
