# Aren Unión: prueba de administrador online

En el celular: Configuración → Acceso de desarrollador → ingresar el código personal existente → Activar Aren Unión online. El servidor habilita y equipa Aren Unión en la cuenta actual. Salir del Modo Pruebas y elegir a Aren en un duelo online. El mismo botón permite desactivarlo fuera de un duelo.

El acceso es una prueba de administrador, no una compra ni un pago. No descuenta monedas. Quien recibe el enlace normal no adquiere el acceso. Quien posee el código privado puede autorizar su propia cuenta. Vincular la cuenta con correo conserva el acceso al iniciar sesión en otros dispositivos.

El código se valida en el servidor; las credenciales completas permanecen en `.local-developer/`, fuera de Git. Los permisos y los intentos fallidos se guardan en tablas privadas sin acceso directo para jugadores. Se permiten seis intentos por cuenta cada quince minutos. Aren Unión no se importa desde compras locales ni se compra con monedas.

Los mensajes entre jugadores solicitan una actualización de los trajes; el servidor devuelve el equipo autorizado de los integrantes de la sala. La habilidad de Aren Unión conserva la pista de Aren, se carga mediante aciertos y aplica un bloqueo de teclado de dos segundos que el servidor también hace cumplir.

Validación:

- `tests/admin-union.sql`: ejecutar dentro de una transacción con `game.admin_test_code` configurado de forma privada y hacer rollback. Prueba permisos, código incorrecto, límite de intentos, importación falsificada, saldo, revocación, privacidad de salas, carga, pista, bloqueo y recuperación de letras.
- `node tools/check-admin-union-online.cjs`: prueba dos cuentas temporales contra el servidor real, en pantallas de celular. Escribe sus identificadores en `.local-developer/admin-ui-accounts.json` para eliminarlas después de la prueba. Requiere el código privado local. No ejecutar como una prueba rutinaria sin acceso al servidor.
- Pruebas de tienda, saldo, autor, recursos, modos sin conexión, salas y motor: 24 pruebas aprobadas. La prueba local de Aren Unión y la prueba visual de tienda también pasaron.
- `tests/versus-ui.test.cjs` conserva una aserción anterior que falla también en HEAD: espera asignaciones directas de sprites del Hombre Lobo, aunque ya usan `spriteTrajeVersus`. Esa aserción no evalúa este cambio.

El análisis de seguridad de Supabase no añadió advertencias ni errores de seguridad para esta implementación. Las tablas privadas con RLS y sin políticas son intencionales: solo se accede mediante funciones con permisos explícitos y validación del usuario autenticado.
