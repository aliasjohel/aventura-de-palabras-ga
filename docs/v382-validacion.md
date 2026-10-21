# Validación v382 — fondos con compras y logros

Supabase: migración aplicada `20261021002155_profile_background_inventory_and_unlocks.sql`, tras verificar tablas y funciones reales. RPC autenticada; inventario privado con RLS sin permisos directos. Bloqueo del monedero y concesión en una transacción. Perfil público devuelve el fondo equipado.

SQL real con fixtures y ROLLBACK: fondo inicial, rechazo de equipamiento bloqueado, débitos de 100 y 150 monedas, compra repetida sin nuevo débito, saldo insuficiente sin cambios parciales, aislamiento entre cuentas, perfil público, logros de Aventura, rango Diamante persistente, importación histórica una sola vez y permisos. No se gastaron monedas de jugadores durante QA.

Se preserva la compatibilidad de Aventura: importación única del avance antiguo local y posteriores eventos de recompensas existentes. No es una garantía contra trampas de progreso local. Azrak se calcula desde resultados clasificados del servidor.

Cliente: 212 pruebas automatizadas aprobadas. Navegador Edge: compra y doble clic, saldo real del adaptador, compra separada de equipar, tienda, recarga, bloqueo por logros, saldo insuficiente, modo de prueba, aislamiento de cuentas y perfil público con RPC simulada sin gastos. Tres idiomas y anchos 320/390/844 sin desbordamiento. Colección animada y carga diferida verificadas. Capturas `v382-coleccion-fondos.png` y `v382-fondos-bloqueados.png`.

Manifest: 722 recursos verificados. Actualización incremental en navegador y actualización v381 → v382 aprobadas; conserva localStorage e IndexedDB y funciona sin conexión. Las compras y cambios de equipamiento requieren conexión para confirmarse.

Advisors de seguridad y rendimiento ejecutados. La tabla privada nueva muestra INFO RLS habilitado sin políticas: acceso directo denegado intencionadamente; acceso únicamente por RPC autenticada. Referencia: https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy . No se modificaron avisos preexistentes de otras funciones/políticas de Versus, índices y protección de contraseñas. Referencias: https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable y https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection .
