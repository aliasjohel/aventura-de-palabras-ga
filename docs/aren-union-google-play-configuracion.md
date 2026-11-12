# Aren Unión · configuración pendiente de Google Play Billing

Estado al 12/11/2026: Play Console todavía no está configurada. **No se realizaron compras reales ni compras de prueba contra Google.** La tienda muestra el personaje existente; el cliente nativo no puede abrir el pago en la compilación entregada. El backend está desplegado, pero su modo de compra, la lista de probadores y las credenciales de Google permanecen desactivados/sin configurar. No se crearon derechos de compra en cuentas reales.

## Identificadores preparados

| Concepto | Valor |
|---|---|
| Paquete Android de pruebas | `com.gagames.aventura.experimental` |
| Producto Google Play, INAPP de compra única | `aren_union_permanent` |
| Opción de compra | `buy` |
| Identidad del personaje existente | `aren-union`, sobre `explorador` |
| Precio base tentativo | USD 1,99; confirmar y configurar en Play Console |
| Entitlement existente | `versus_private.aren_entitlements`, fuente `google_play_purchase`, alcance `character.aren_five_crystals.purchase` |
| Función de validación | `https://hlixavucxdxevbbhlxkc.supabase.co/functions/v1/aren-play-billing` |
| Función de notificaciones | `https://hlixavucxdxevbbhlxkc.supabase.co/functions/v1/aren-play-rtdn` |
| Biblioteca nativa fijada | Google Play Billing 9.1.0 |

Se utiliza un producto **no consumible**: una compra permanente, sin suscripción ni renovación. El código nunca consume el producto. El precio que finalmente muestre una compra debe venir de `ProductDetails` de Google; el texto US$1,99 de la tienda es únicamente una previsión mientras no exista esa configuración.

## 1. Registrar la aplicación de pruebas

1. En Play Console, crear la aplicación de pruebas de Aventura de Palabras, o seleccionar la adecuada si ya existe.
2. Al subir el primer Android App Bundle firmado, confirmar que su `applicationId` es exactamente `com.gagames.aventura.experimental`. No cambiar el paquete de la APK ya instalada para hacer esta prueba.
3. Usar una clave de subida administrada por vos y Play App Signing para ese primer AAB. La APK experimental actual conserva su certificado previo de desarrollo para poder actualizarse encima; **esa firma de desarrollo no es un AAB de producción listo para subir**. La gestión/firma del primer AAB y su clave de subida siguen pendientes. No incluir una clave privada en este repositorio.
4. Preparar un lanzamiento en el canal de prueba interna. No publicar un lanzamiento de producción ni activar comercialización pública en esta tarea.

Los probadores con licencia pueden usar una APK instalada por archivo, incluso con firma de desarrollo, si el paquete coincide con la aplicación configurada en Play. Esto permite conservar la instalación experimental, sesión y caché. Instalar después desde Play una variante con certificado distinto no es una actualización compatible encima de la APK actual; la prueba inicial debe conservar el método por archivo. [Documentación oficial de pruebas](https://developer.android.com/google/play/billing/test).

## 2. Configurar el producto

En la aplicación de Play Console, entrar en **Monetizar con Play → Productos → Productos de compra única** (los rótulos pueden variar con el idioma de la consola).

1. Crear el producto `aren_union_permanent`.
2. Nombre: **Aren Unión · Guardián de los Cinco Cristales**. Descripción: personaje permanente, disponible desde el comienzo, sin completar cinco mundos.
3. Crear la opción de compra **`buy`**, de compra permanente. No configurar alquiler, suscripción, preventa ni compra de cantidad múltiple.
4. Definir el precio base tentativo de USD 1,99 y revisar precios regionales, países y presentación fiscal en la consola.
5. Dejar la configuración de venta restringida al circuito de pruebas previsto. Que el producto exista/esté activo para pruebas no debe acompañarse de un lanzamiento público ni de una compilación con pagos abiertos a usuarios generales.

La app consulta el producto real y su opción `buy`; no inventa una compra si Google devuelve producto inexistente o configuración incompleta. [Integración oficial](https://developer.android.com/google/play/billing/integrate).

## 3. Registrar los probadores con licencia

1. En la configuración de la cuenta de desarrollador de Play Console, abrir **Pruebas de licencia / License testing** y agregar el correo de Google que usa el celular de prueba.
2. Agregar también esa cuenta a la lista de probadores del canal interno y aceptar su invitación, si se usará ese canal.
3. Verificar en el teléfono qué cuenta de Google Play realiza la compra. Tener un correo de la cuenta del juego autorizado no sustituye el requisito de **probador con licencia de Google Play**.
4. En la compra de prueba deben aparecer el aviso de prueba y un medio de pago de prueba; usar la tarjeta de prueba que aprueba o rechaza, nunca un medio real.

**Un canal interno por sí solo no evita cobros:** Google advierte que los usuarios de un canal de pruebas que no son probadores con licencia pueden incurrir en cargos reales. Por eso esta entrega mantiene desactivado el flujo nativo y el servidor. No habilitarlos antes de completar esta configuración. [Pruebas de licencia](https://developer.android.com/google/play/billing/test).

## 4. Dar acceso al servidor de validación

1. Crear o elegir un proyecto de Google Cloud y habilitar **Google Play Android Developer API**.
2. Crear una cuenta de servicio destinada al backend. En Play Console → **Usuarios y permisos**, invitar su correo y limitarlo a esta aplicación, con los permisos necesarios para consultar y gestionar pedidos: **View financial data, orders, and cancellation survey responses** y **Manage orders and subscriptions**.
3. No hace falta vincular la cuenta de desarrollador a un proyecto de Cloud como en instrucciones antiguas; configurar API y permisos de la cuenta de servicio es el procedimiento actual.
4. Guardar el JSON privado de la cuenta de servicio únicamente en los secretos de Edge Functions de Supabase, con el nombre **`GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`**. No incluirlo en la PWA, APK, repositorio ni conversación.

[Configuración oficial de la API](https://developers.google.com/android-publisher/getting_started).

## 5. Configurar notificaciones de cancelaciones y reembolsos

1. Crear un tema de Cloud Pub/Sub para notificaciones de compras. Dar a `google-play-developer-notifications@system.gserviceaccount.com` el permiso de publicación sobre ese tema.
2. En la configuración de monetización de la app, asociar el tema mediante su ruta `projects/PROYECTO/topics/TEMA` a las Real-time Developer Notifications.
3. Crear una suscripción **push autenticada con OIDC** al endpoint `aren-play-rtdn` indicado arriba. Usar una cuenta de servicio de push y los permisos de generación de tokens que pide Pub/Sub.
4. La audiencia OIDC debe ser exactamente la URL completa de ese endpoint. Configurar en Supabase los secretos **`GOOGLE_PLAY_RTDN_AUDIENCE`** (esa URL) y **`GOOGLE_PLAY_RTDN_SERVICE_ACCOUNT_EMAIL`** (el correo de la cuenta de push).
5. Enviar una notificación de prueba desde la consola y comprobar su aceptación antes de habilitar una compra de prueba.

La función verifica firma RSA de Google, emisor, audiencia, correo verificado y vencimiento. Una notificación no concede derechos: obliga a consultar otra vez a Google. Sólo una cancelación/reembolso confirmado revoca una compra ya registrada. [Referencia oficial de RTDN](https://developer.android.com/google/play/billing/rtdn-reference).

## 6. Habilitar únicamente una prueba supervisada, en una tarea posterior

Actualmente se mantienen tres cierres independientes:

- `BuildConfig.AREN_PLAY_TEST_CHECKOUT = false`: la APK entregada no abre el pago, aunque JavaScript lo intente.
- `PLAY_BILLING_MODE` no está configurado como `test`, y faltan los secretos de Google/notificaciones.
- `versus_private.aren_play_settings.test_checkout_enabled = false`, sin probadores habilitados en `versus_private.aren_play_testers`.

Después de configurar Console y comprobar el correo de licencia, preparar una compilación **sólo para ese probador**, habilitar exclusivamente su UUID de cuenta verificada del juego en la lista privada, configurar el modo `test` del backend y probar los casos del apartado siguiente. No hacerlo en una distribución general. El UUID de Supabase y la cuenta de Google Play tienen funciones distintas; deben verificarse ambos.

El backend actual **rechaza todos los pagos que Google no marque `testPurchaseContext.fopType=TEST`**. No existe en este código una opción para activar cobros de producción cambiando un valor de la interfaz. Pasar a comercialización real requiere una revisión y autorización separadas.

## 7. Pruebas físicas que quedan pendientes

- Compra aprobada con tarjeta de prueba: Google confirma SKU/paquete/cuenta, el servidor reconoce la entrega, registra la evidencia y habilita el `aren-union` existente. La cuenta no necesita mundos completados.
- Cancelación del diálogo y tarjeta rechazada: no conceden ningún derecho ni gastan monedas.
- Pago pendiente: no habilita el personaje hasta confirmación.
- Repetir la validación: no duplica la compra, monedas ni recompensas.
- Reinstalar o usar otro celular e ingresar con la **misma cuenta del juego**: **Restaurar compra** recupera el derecho almacenado en Supabase. Google puede recuperar los tokens de productos no consumidos; no se solicita comprar otra vez.
- Probar una compra asociada a otra cuenta del juego: debe rechazarse. El identificador ofuscado vincula el pedido al UUID verificado, no a datos editables del perfil.
- Reembolso de prueba en Play Console: la notificación firmada y la nueva lectura de Google deben revocar únicamente ese derecho, conservando otros personajes, monedas y permisos de prueba existentes.
- Volver a probar ataques, habilidad, daño, orientación, remates y actualizaciones de sesión/caché en el teléfono.

El servidor usa `purchases.productsv2.getproductpurchasev2`, valida el resultado de Google, reconoce la compra sin consumirla, vuelve a consultar el estado y sólo entonces persiste el derecho. Las compras pendientes, repetidas, ajenas, consumidas, de alquiler o sin prueba verificada no crean un derecho permanente. [Estado de compra verificado](https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.productsv2).

## Evidencia disponible

Las pruebas automatizadas cubren validación/rechazos, firma OIDC real con claves de prueba, restauración, cambio de cuenta, duplicados y permisos SQL. PostgreSQL aislado comprueba conservación de monedas y otros derechos, sin conexiones de producción. En el backend desplegado, los intentos sin autorización y el RPC de escritura sin servicio se rechazaron; el modo de compra sigue apagado, hay cero probadores y cero recibos nuevos. Los asesores de Supabase no agregaron advertencias respecto del estado anterior. Estos resultados **no sustituyen las compras físicas de prueba pendientes en Google Play**.
