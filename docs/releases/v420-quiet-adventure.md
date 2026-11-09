# v420-quiet-adventure1

Se oculta la nota de recompensas durante el juego normal de Aventura: disponibilidad online, verificación en curso y recompensa ya cobrada. Se conservan los avisos de conexión/reintento y recompensas no disponibles, y la notificación al recibir monedas confirmadas.

Solo cambia la presentación en js/adventure-reward-feedback.js; sw.js actualiza versión y hash. No cambia economía, XP, progreso, llamadas al servidor ni Supabase. No afecta otros modos.

Validación: 350/350 pruebas; 36 combinaciones de estado/conexión/idioma (es/en/pt-BR); actualización incremental exacta v419 → v420 con un clic, conservación de localStorage, sessionStorage, IndexedDB y cachés útiles; recarga offline. Comprobación incremental general con rangos y audio offline. Manifest 922 recursos verificado.

Base/restauración: ce155c56864d9cbaca3d5776f7a5779c103e28fc (v419). Respaldo exacto en .local-developer/releases/v420-quiet-adventure/backup-v419. Reversión: restaurar el módulo desde la base, incrementar versión de caché, regenerar manifest y publicar un nuevo commit tras las mismas pruebas; sin borrar datos ni forzar Git.
