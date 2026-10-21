# v385 — personajes en la tienda

Precios acordados: Hombre Lobo 200, Kairós 250, Kálamo 300, Lume 300 y Shadow 350 monedas. Se compran una sola vez por cuenta. El Explorador es inicial; Guardiana, Zafir, Nimbus, Nivor y Azrak conservan los requisitos de Aventura. Versus y Arcade comparten disponibilidad. Los trajes existentes se conservan y no conceden el personaje base. El modo de pruebas conserva su selección libre y no permite compras.

Nueva sección con retratos en la tienda, estado de colección y traducciones es/en/pt-BR. Inventario por cuenta, recuperación al conectar y caché para jugar sin conexión tras sincronizar. Los cobros necesitan conexión y pasan por el mismo bloqueo de monedero que trajes y fondos. El servidor fija los precios, comprueba el saldo y rechaza selecciones online de personajes de pago no comprados.

Validación: 216 pruebas automatizadas. Navegador Edge: cinco compras por doble toque, descuento total 1400 sobre saldo ficticio de 1500, selección Arcade, cuenta separada, saldo insuficiente, modo de prueba, retratos y diseño a 320/390/844 px en tres idiomas. Captura: v385-tienda-personajes.png.

Supabase: migración aplicada. Pruebas transaccionales con usuarios efímeros y ROLLBACK: los cinco precios, repetición sin cobro, inventario, saldo insuficiente sin cambios, rechazo sin autenticación, selección no comprada y compra como rol authenticated. Sin modificar saldo de usuarios reales. RLS habilitado en tabla privada, sin permisos directos; API pública invoker y función privada con auth.uid. Asesor: información de RLS sin políticas intencional para la tabla privada; avisos de otras funciones públicas heredadas permanecen fuera de este cambio. Referencia: https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy

Manifiesto de 724 recursos. Prueba incremental y actualización v384 a v385 con almacenamiento local e IndexedDB conservados. La primera prueba de actualización coincidió con la regeneración del manifiesto; repetida tras finalizar la generación pasó.
