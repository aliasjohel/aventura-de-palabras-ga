# Validación v383

Tienda: miniaturas estáticas de los seis fondos con sus personajes y candado visible para los no obtenidos; precio o requisito visible. Sin botón Probar para usuarios que no poseen el fondo. Los recursos visuales se solicitan al abrir la tienda.

Perfil: botones bloqueados con candado y comprobación de propiedad también en el manejador y API de previsualización. Excepción exclusivamente cuando están activos modoPruebasActivo y herramientasAutorDisponibles; la repetición de Aventura no concede esta excepción. La vista de administrador no compra, equipa ni concede propiedad; al salir vuelve al fondo real.

Verificado con Edge a 320, 390 y 844 píxeles, español/inglés/portugués: miniaturas, candados, bloqueo normal, excepción de administrador, salida del modo de prueba, compra única de 150/100 monedas, eliminación del candado al adquirir, equipamiento separado, aislamiento de cuentas, saldo insuficiente, perfil público y persistencia. RPC simulada sin gastos reales; backend de compras sin cambios.

212 pruebas aprobadas. Manifest de 722 recursos verificado. Actualización incremental y v382 → v383 aprobadas con localStorage e IndexedDB conservados y funcionamiento sin conexión.
