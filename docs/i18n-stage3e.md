# Etapa 3E: Torre y duelos locales

Implementada el 16 de octubre de 2026. Versión v362.

## Alcance

- Bancos locales inmutables para las diez temáticas: 656 palabras inglesas y 762 portuguesas. Cada temática tiene al menos 40 respuestas únicas normalizadas, de 3 a 12 letras. Son vocabularios propios de cada idioma; no traducciones automáticas de posiciones españolas. Los bancos españoles originales de 2.000 palabras permanecen intactos.
- Torre, duelos locales y duelos especiales de Aventura eligen ambos conjuntos de palabras en el idioma efectivo del combate. La selección aleatoria, las palabras fijadas y las palabras extra de recuperación usan el mismo banco y las mismas claves.
- El formulario captura el idioma antes de escribir palabras y lo conserva hasta salir o terminar el combate. Los cambios de preferencia quedan pendientes. La validación detecta duplicados equivalentes, como AÇAÍ/ACAI, y acepta entradas en minúsculas o Unicode descompuesto. Instrucciones, opciones temáticas, reglas, errores, contadores y etiquetas accesibles tienen traducciones.
- Se reconstruyen teclado y miniatura al cambiar de alfabeto. La restauración y el desorden de teclas usan las filas del teclado renderizado, incluso si ya se liberó el contexto al regresar al menú. Esto evita buscar una tecla Ñ inexistente al limpiar un combate inglés o portugués.
- IA, lupa, fallo forzado, robo de teclas y carga de habilidades conservan el motor capturado. Las letras base revelan los acentos portugueses y Ç, conservando la grafía original.
- Online y tutorial mantienen sus palabras españolas. Si falta el módulo nuevo, todo el combate local usa el banco y teclado españoles. No hay cambios de protocolo ni de servidor.

No cambian vidas, intentos, tiempos, carga de habilidades, probabilidades de IA, premios ni progreso guardado. Los bancos nuevos son más pequeños que los españoles y no prometen la misma variedad. Longitud media/letras distintas: español 6,72/5,67; inglés 6,13/5,38; portugués 6,39/5,46. Estas medidas no garantizan idéntica dificultad subjetiva: corresponde probar vocabulario y dificultad en el celular.

## Verificación

- `tests/local-versus-banks.test.cjs`: cobertura temática, validación estricta, inmutabilidad, las 1.418 respuestas resolubles, ortografía revelada, recuperación sin duplicados y constantes de dificultad.
- `tools/check-i18n-3e.cjs`: Edge con recursos reales, tres idiomas y diez temáticas; formulario real y envío hasta la arena; fijación y sorteos; duplicados equivalentes; traducción de título y errores; ambos bancos de combate; recuperación; teclados de 26/27 letras; preferencia diferida; IA con lupa, fallo forzado y bloqueo de raíces; robo de teclas; entrada real de Torre y duelos de Aventura; progreso intacto; tutorial y online españoles; módulo ausente.
- El mismo verificador con `--offline` instala el worker real y recarga sin conexión. Solo excluye imágenes y audio de la lista de instalación de la prueba, sin modificar el worker del repositorio.
- Revisión visual del formulario portugués en horizontal (844 × 390).
- Regresión narrativa y del historial de prueba (incluido SAL), migración incremental de caché, aislamiento de versiones y rangos multimedia offline.
- Suite general: 172 de 174 pruebas aprobadas. Persisten los dos fallos anteriores: fixture de `adventure-world5.test.cjs` sin `guardarDesbloqueoAzrak` y asignaciones antiguas de sprites en `versus-ui.test.cjs`.
- Manifiesto de recursos regenerado y verificado según `AGENTS.md`.

## Próxima etapa

3F: puzzles y tutorial. Luego 3G: multijugador online. Probar antes Torre y duelos en inglés y portugués en el celular, incluidas las palabras fijadas, habilidades y el regreso al menú.
