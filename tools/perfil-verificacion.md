# Perfil del jugador — 20 de septiembre de 2026

Mi perfil muestra nombre, ID (código de amigo cuando existe), historial multijugador y los tres personajes más usados. La apariencia se guarda en este dispositivo. Las estadísticas pertenecen al usuario autenticado del servidor; las partidas locales y de aventura no se suman al ranking.

El historial conserva resultados de partidas terminadas incluso después de borrar la sala. Se importaron los resultados públicos anteriores sin atribuirles personajes que no se habían registrado. El ranking sigue dando 3 puntos por victoria pública y 1 por empate público. Las partidas privadas cuentan en el perfil, pero no dan puntos de ranking.

Validación: todos los tests tests/*.test.cjs; prueba SQL tests/player-profile.sql dentro de BEGIN/ROLLBACK; perfil real contra la API; pantalla a 390×844, 844×390 y 1365×900; selección, guardado, cancelación, desconexión y ausencia de desbordamiento. La cinemática de Kairos se verificó con 11 personajes en seis instantes.

La tabla privada de historial tiene RLS y no concede acceso directo a clientes. Solo una función que comprueba auth.uid() devuelve el resumen del propio usuario. El aviso informativo [RLS sin políticas](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy) es intencional: los clientes no leen ni escriben la tabla. El análisis no añadió avisos de funciones privilegiadas expuestas.

Los seis PNG están en assets/images/perfil; sus prompts y el método de generación se documentan en perfil-marcos-prompts.md. Subir fotos y conectar Facebook no forman parte de esta entrega.
