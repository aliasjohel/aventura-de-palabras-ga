# v419-adventure-music1

Corrección limitada a la coordinación musical del menú, selector Aventura/Torre y mapa.

## Causa y comportamiento
El cierre del selector al abrir el mapa reanudaba la melodía principal. El regreso al selector por código no ejecutaba el controlador de clic que debía detenerla. Ahora se observa el estado real de ambos diálogos y de la pantalla, incluyendo visibilidad y pageshow. El mapa conserva el ambiente Old Tower Inn; la melodía principal solo vuelve fuera de esos diálogos. La música de combate y las cinemáticas conservan sus controladores.

## Validación
- 350/350 pruebas Node, sin omisiones; incluye música de personajes/mundos y caché incremental.
- Navegador Edge con HTMLAudio real: tres recorridos tarjetas → mapa → tarjetas, Escape y evento de retorno a primer plano; una sola pista en cada destino.
- 18 combinaciones de pantalla/idioma y controles de búsqueda clásica/clasificatoria, sin búsqueda automática ni duplicación.
- Actualización exacta desde 00b878f (v418): un clic, sin recarga previa, conserva marcadores localStorage, sessionStorage, IndexedDB y nombres de caché útil; recarga offline.
- Comprobación incremental general: migración v347, rangos offline y reproducción MP3 offline.
- Manifest de 922 recursos verificado. La ejecución inicial de regresión coincidió con la generación del manifest y detectó el hash anterior; tras terminar la generación, las 350 pruebas pasaron.
- No se utilizaron cuentas reales ni se alteraron datos de servidor. Android físico pendiente de comprobación del propietario.

## Alcance y reversión
Cambios runtime: js/app.js, js/multiplayer-lobby.js y sw.js (versión/hashes). Herramienta de QA y este informe. Sin nuevos audios, cambios visuales, economía, XP, progreso ni Supabase.
Respaldo exacto v418 en .local-developer/releases/v419-adventure-music/backup-v418 y commit 00b878f7fca9025f12ba7096124c749aeeff81b9.
Para revertir, restaurar los dos módulos desde ese commit, asignar una versión de caché nueva, regenerar manifest, ejecutar las mismas pruebas y publicar un commit correctivo. No borrar almacenamiento, inventarios o cachés útiles ni forzar historial Git.
