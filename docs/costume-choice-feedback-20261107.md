# Respuesta visible al elegir el traje de Torre

Versión: `v401-costume-choice-feedback1`.

El usuario informó que podía seleccionar Original y Guardián del Bosque, pero Campeón del Último Piso no reaccionaba al clic. La v400 deshabilitaba preventivamente los botones de premios cuando `navigator.onLine` era falso, mientras permitía los trajes normales si no había un premio activo. Además, un error de guardado se mostraba en la selección de personaje, detrás del diálogo abierto. Ambos comportamientos impedían entender qué sucedía.

Se eliminó ese bloqueo previo y la comprobación equivalente dentro del manejador. El intento de selección ahora llega a la API de equipamiento, que sigue siendo la autoridad para confirmar propiedad y guardar la elección. El indicador de conexión del navegador no basta para impedir el intento. Si realmente no hay conexión o la solicitud falla, la elección anterior se conserva.

El diálogo ahora incluye un estado accesible y visible: «Guardando traje…», «Traje seleccionado.» o una indicación para revisar conexión, cuenta o salir de Aren Unión, según corresponda. El estado también se mantiene en la pantalla de selección. Solo se bloquean los controles mientras una operación está en curso o el combate no admite cambios.

## Verificación

- Consulta alojada: premio y marco existentes, Aren Unión desactivado, marco equipado. No había una selección de traje de Torre guardada.
- Prueba real de la función `public.tower_cosmetics` como rol authenticated y con la identidad del piloto, dentro de una transacción con ROLLBACK: `equip_costume(tower_explorador, explorador)` fue aceptado, devolvió el traje equipado y revisión 2 dentro de la prueba. No se conservó esa elección ni su recibo. Esto verifica la función y los permisos del servidor, no una sesión extraída del teléfono.
- No se inspeccionó directamente `navigator.onLine` en el teléfono. Se reprodujo la ruta de interfaz compatible con el síntoma y se comprobó que el botón permita intentar la API incluso cuando ese indicador es falso.
- 44 casos visuales de selección en Torre y Versus con los once personajes y dos tamaños de pantalla. Se añadieron la comprobación del error visible dentro del diálogo y un intento exitoso con `navigator.onLine=false` y API disponible.
- Rechazo de guardado sin alterar la selección anterior; monedas y marco conservados en las pruebas.
- 50 pruebas Node aprobadas, manifiesto de 912 recursos comprobado y prueba de caché incremental en navegador real.
- Actualización v400 → v401: cambian `index.html`, `js/app.js` y `css/cosmetic-shop.css`, sin descargar imágenes durante instalación; conserva versión activa hasta aceptar, localStorage e IndexedDB y la recarga sin conexión.

Las pruebas visuales usan RPC e inventario sintéticos en un navegador aislado. No se cambiaron contraseñas, cuentas ni permisos; no se aplicaron migraciones. No se automatizó el teléfono físico del usuario.

Evidencia: `.local-developer/tower-costume-selector/`. Pruebas reproducibles: `tools/tower-rewards-qa/check-costume-selector.cjs` y `check-selector-feedback-upgrade.cjs`.
