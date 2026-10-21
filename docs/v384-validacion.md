# Validación v384 — animaciones en perfiles de rivales

El perfil público muestra la decoración animada del fondo equipado devuelto por el servidor, usando los mismos elementos y coordenadas de poderes del perfil propio: luciérnagas, magia y runas de Zafir, partículas de desierto, remolino de Nimbus, aliento de Nivor y fuego de Azrak. El identificador SVG del gradiente de hielo se separa del perfil propio para evitar colisiones.

El movimiento se pausa al cerrar el perfil, al cargar otro jugador o al ocultar la página. Se respeta prefers-reduced-motion. La identidad y las estadísticas conservan la capa superior; no se añade equipamiento ni compras al perfil público. Ver un fondo ajeno no modifica la colección del visitante.

Prueba Edge con RPC simulada: los seis fondos se muestran animados, poderes visibles en su fase activa, sin duplicar capas, pausa al cerrar y ausencia de animaciones con movimiento reducido. Sin desbordamiento a 320/390/844 píxeles. Inventario del visitante intacto. Revisión visual en docs/v384-perfil-rival.png. La misma prueba conserva compras únicas, candados, excepción de administrador, aislamiento entre cuentas, recarga y traducciones.

212 pruebas automatizadas; manifest de 722 recursos; actualización incremental y v383 → v384, conservando localStorage e IndexedDB. Backend sin cambios.
