# Marcos e idiomas: preparación local de la versión v342

La publicación fue autorizada por el usuario al terminar los marcos. La versión está preparada para GitHub Pages.

## Cambios locales preparados

- Etapa 2B: interfaz de menú, Configuración, perfil y tienda en español, inglés y portugués de Brasil.
- Inicio de Etapa 2C: controles de Aventura y pantalla de selección de pisos de Torre. Quedan pendientes los controles compartidos del combate y resultados; no declarar completa la Etapa 2C.
- Los marcos salen de la tienda. Mi perfil muestra los requisitos y bloquea los que no se obtuvieron.
- Mundos completados/cristales: Bosque → Hojas; Desierto → Arcano; Cumbres → Real; Invierno → Hielo; Azrak → Fuego.
- Rangos: Bronce 10, Plata 30, Oro 60, Platino 120, Diamante 240, Leyenda 480. Los marcos se conservan cuando bajan los puntos.
- Marcos de rango dibujados con CSS y formas variadas, sin imágenes nuevas.
- Persistencia independiente `aventuraMarcosDesbloqueadosV1`. No se reescriben progreso, identidad existente, monedas, compras ni sesiones al inicializar. Se conserva un marco antiguo ya equipado.
- El service worker precarga el módulo nuevo y usa v342 para evitar mezclar código y catálogos.

## Ampliación de Supabase autorizada y verificada

El usuario autorizó únicamente ampliar el catálogo de marcos. Se verificó el esquema remoto antes de aplicar la migración nueva `20261007015431_avatar_reward_frames_catalog.sql`.

Se ampliaron únicamente las dos restricciones de marcos en `versus_players` y `player_appearance`, y la lista de IDs de `versus_identity_private.set_identity`. No hubo operaciones de actualización, inserción o borrado sobre filas de jugadores. La migración quedó registrada en el historial administrativo. Las funciones de guardar apariencia no requerían cambios porque ya usan la restricción de la tabla.

Verificación remota posterior: los 12 IDs pasan ambas restricciones, un ID inválido se rechaza, ambos RPC conservan el requisito de autenticación, y los permisos y las otras definiciones de funciones de apariencia permanecen idénticos. La CLI falló por conectividad IPv6, incluida la ejecución de advisors; se utilizó la API administrativa con las credenciales existentes, sin copiarlas al repositorio. No se ejecutaron otras migraciones pendientes ni se modificaron migraciones antiguas.

## Verificación realizada

- 58 pruebas automatizadas aprobadas: i18n, preferencias, equivalencia de catálogos, fallback, actualización PWA, monedas, trajes, modos offline, divisiones y recompensas.
- Navegador Edge con imágenes reales, tres idiomas, tamaños 320/390 vertical y 844 horizontal: interfaz 2B, marcos bloqueados/desbloqueados, marcos de rango y etiquetas de Torre. Sin errores JS ni claves ausentes.
- Cancelar cambios de apariencia conserva la identidad; cambiar idioma conserva los datos existentes y no genera llamadas extra de sincronización.
- Instalación de service worker real, cambio de idioma y reapertura sin conexión aprobados. Catálogos inaccesibles mantienen fallback español.
- Inspección visual de la grilla de marcos en portugués: sin textos cortados.
- Sintaxis JS, fallback generado y `git diff --check` aprobados.

Los ensayos de navegador bloquearon las solicitudes externas y sustituyeron la frontera de red con datos de prueba locales. La verificación SQL remota fue independiente y no creó usuarios, sesiones ni perfiles de prueba.
