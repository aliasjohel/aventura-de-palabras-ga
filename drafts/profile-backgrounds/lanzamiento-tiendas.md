# Preparación para tiendas

Recomendación al 20 de octubre de 2026: empezar con Google Play, validar Android y después preparar App Store. La PWA actual también puede seguir usándose desde el navegador de iPhone mientras se prepara la aplicación iOS.

## Estado encontrado

- Existe la PWA (`manifest.json` y service worker). No se encontró proyecto Android/iOS, Gradle, Capacitor ni configuración TWA dentro de este repositorio. Hay que elegir y construir el empaquetado, firmar el paquete y probarlo; el sitio publicado por sí solo no es una entrega de Play Store.
- Los fondos son vistas previas temporales. Antes del lanzamiento falta catálogo con requisitos, compra contra saldo real, inventario por cuenta, selección persistente y representación en perfiles propios y públicos. El modelo mixto está aprobado; este directorio propone el reparto y contiene lógica de inventario con seis pruebas.
- No se encontraron pantallas o documentos de política de privacidad ni un flujo de eliminación de cuenta en la revisión de este repositorio. Hay que verificar si existen fuera del proyecto y completar la integración correspondiente; esto no es una auditoría integral de los datos del servidor.
- No se debe añadir más contenido cosmético como requisito para terminar: la prioridad es cerrar los flujos ya existentes y probarlos con jugadores.

## Orden recomendado

1. Corregir el apoyo de Aren en Cumbres (v381) y probarlo en un celular real.
2. Cerrar los fondos con monedas y logros, preservando perfiles, compras y progreso existentes. Recuperar acceso a Supabase, probar transacciones con rollback y desplegar servidor antes del cliente.
3. Preparar Android: método de empaquetado, identificador definitivo, firma, paquete AAB, instalación y actualizaciones. Ver [Trusted Web Activities](https://developer.android.com/develop/ui/views/layout/webapps/trusted-web-activities).
4. Preparar ficha, icono, capturas, clasificación de contenido y público objetivo; definir si habrá anuncios o dinero real. Las monedas obtenidas jugando no deben confundirse con compras con dinero real.
5. Verificar privacidad, declaración Data safety y borrado de cuenta/datos donde corresponda. [Política de datos de Google Play](https://support.google.com/googleplay/android-developer/answer/10144311) y [requisitos de eliminación de cuentas](https://support.google.com/googleplay/android-developer/answer/13327111).
6. Prueba cerrada en Android: instalación limpia, actualización de la PWA existente, persistencia de avance, compra/reintento, modo avión, descargas interrumpidas, reconexión y partidas en dos celulares. Para cuentas personales de Play creadas después del 13 de noviembre de 2023, Google exige como mínimo 12 testers inscritos continuamente durante 14 días antes de solicitar acceso a producción. [Requisito oficial](https://support.google.com/googleplay/android-developer/answer/14151465).
7. Después de validar Android, preparar iOS y probar en iPhone. Apple revisa la aplicación, incluido que la experiencia tenga suficiente funcionalidad; no se presume aceptación por envolver la web. [Directrices de revisión, sección 4.2](https://developer.apple.com/app-store/review/guidelines/).

Este es un orden de trabajo, no una confirmación de que la aplicación ya cumple todos los requisitos de las tiendas. No se inició ninguna publicación en Google Play ni App Store.
