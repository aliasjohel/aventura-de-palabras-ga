# Candidata de recompensas definitivas de Torre Arcade

Fecha: 6 de noviembre de 2026. Rama `candidate/tower-rewards-20261106`, basada en la versión pública v394 (`f327875d4900ee344fb2006661ec0893e58d7d62`). Runtime preparado: `v395-tower-rewards-candidate1`. El diagnóstico aprobado está en `tower-rewards-diagnosis-20261106.md`.

**Implementación local terminada; pendiente de autorización para instalar y publicar.** No se ejecutó DDL ni DML en producción, no se activaron recompensas globales, no se publicó ni se modificaron cuentas reales. No se incorporaron los cambios pendientes del laboratorio Multijugador. Los cambios en las funciones compartidas se limitan a mostrar y proteger el equipamiento de Torre.

## Implementación

1. Inventario privado: catálogo de 14 artículos, concesiones únicas por cuenta/artículo con evidencia de los intentos certificados, equipamiento separado del monedero antiguo y recibos de acciones. RLS y permisos deniegan acceso directo; las funciones internas tampoco son invocables por clientes. El RPC público usa `auth.uid()` y exige una cuenta permanente confirmada.
2. Desbloqueos: diez pisos distintos certificados, vinculados al intento ganado de la misma cuenta/personaje/definición. El progreso resumido o local por sí solo no entrega premios. Marcos acumulativos a 1/6/11 personajes. Se conservaron byte por byte los seis WebP aprobados (tres originales y tres miniaturas); no se regeneró arte.
3. Monedas: mismo motor y recibos existentes, 30 en pisos 1–4, 50 en 5–9, 150 en 10. Total 520 por personaje y 5.720 por cuenta para los 110 pisos. Certificación, monedas y concesiones son una transacción. No se cambió el cálculo de XP ni los demás premios.
4. Juego principal: adaptador autoritativo de Torre para inicio, letras, habilidades, reloj, recuperación y liquidación. El resultado local no certifica la victoria. Se conserva el progreso histórico local sin utilizarlo para premios. La recuperación reenvía acciones pendientes con su identificador y recupera el estado del servidor.
5. Inventario y perfil: once trajes equipables desde la tienda y tres marcos desde el editor habitual. Revisión optimista y recibos por solicitud evitan sobreescritura silenciosa y duplicación entre dispositivos. Los clientes antiguos no pueden borrar el inventario nuevo mediante el monedero anterior; los disparadores preservan el marco seleccionado. Aren Unión conserva su prioridad y sus mecánicas. La selección de Torre queda guardada mientras esa forma esté activa.

El selector visual continúa habilitado. Sus partidas son práctica y no certifican progreso, monedas o propiedad. Las resoluciones de sprites para premios reales cubren combate, entradas y cinemáticas. La caché por cuenta muestra el último equipo recibido sin conexión; jamás autoriza un desbloqueo o equipamiento. Una respuesta fresca sustituye una caché manipulada. Los cambios de equipo requieren servidor.

## Resultados automatizados

Todas las cuentas y partidas de prueba son sintéticas. PostgreSQL se inicia en un clúster efímero en `127.0.0.1`, sin leer `.env` ni credenciales alojadas. Los fixtures históricos están sellados por SHA-256 y separados de las migraciones instalables.

| Prueba | Resultado y evidencia |
| --- | --- |
| Motor previo, sin migración nueva | 330 configuraciones, 332 victorias; `tower-existing-postgres-candidate-results.json` |
| Motor con inventario nuevo | 330 victorias legales, 110 pisos en cada uno de ES/EN/PT-BR, 110 recibos monetarios, 5.720 monedas, 14 premios; `tower-rewards-postgres-results.json` |
| Entrega única y fallos | Liquidación simultánea, repetición, respuesta perdida, error de almacenamiento con reversión completa y recuperación; mismo informe PostgreSQL |
| Umbrales y seguridad | 1/6/11, falta del décimo certificado, finales simultáneos distintos, cuenta ajena, anónimos, permisos directos y artículos no obtenidos; mismo informe |
| Equipamiento y compatibilidad | Once trajes, tres marcos, dos conexiones independientes, clientes antiguos, conflicto de revisión, cambio atómico a marco XP y Aren Unión; mismo informe |
| Navegador y conexión | Teclado real del juego principal conectado por HTTP local a PostgreSQL, corte tras confirmar una letra, desconexión, recuperación, dos contextos, 44 poses y selector separado; `tower-rewards-browser-results.json` |
| Cinemáticas reales equipadas | 61 casos de ganador/víctima para los once personajes, sin selector; fixture visual sintético, `tower-rewards-cinematics-results.json` |
| Pruebas Node específicas/PWA | 54 aprobadas; `tower-rewards-validation-results.json` |
| Regresión de combate/perfil/idiomas | 45 aprobadas; mismo informe de validación |
| Actualización real PWA | v394 → v395, versión anterior activa hasta aceptar, cero imágenes al instalar, traje disponible sin conexión, estado local e IndexedDB preservados; `tower-rewards-upgrade-results.json` |
| Caché y medios | Manifiesto de 907 recursos verificado; actualización incremental real, rangos de imagen/MP3 y audio sin conexión aprobados; informe de validación |

Se corrigieron durante la validación la conservación del borrador de marco durante una sincronización, la prioridad de Aren Unión y la restauración de la apariencia confirmada sin conexión. Los tests antiguos que suponían importación de monedas locales se actualizaron al contrato autoritativo ya vigente en v394. Los arneses que extraen funciones de `app.js` incorporan el contexto nuevo de Torre; no se relajaron comprobaciones del combate.

## Límites de la evidencia

El puente de navegador usa roles reales de PostgreSQL con tokens sintéticos, **no** Supabase Auth/PostgREST alojados. Dos contextos independientes verifican persistencia y concurrencia, pero no sustituyen dos teléfonos físicos. La prueba física Android, Auth real, latencia móvil y transporte alojado corresponden al piloto posterior. No se afirma aprobación de esos puntos todavía.

La migración depende del estado auditado: comprueba las funciones base y aborta si cambiaron. Debe volver a compararse el esquema alojado antes de instalar; los guards no sustituyen revisar el diff completo de políticas, constraints e identidad. Mantener los permisos y las rutas de lectura nuevas es necesario incluso si se revierte la interfaz, para no perder premios ya entregados. No hay tarea de borrado/expiración de recibos: conservarlos garantiza reintentos idempotentes; vigilar crecimiento antes de una apertura global.

## Entrega e instalación futura

Migración única preparada: `supabase/migrations/20261106221752_tower_exclusive_rewards_inventory.sql`. Fuente y generador: `tools/tower-rewards-schema.sql` y `tools/build-tower-rewards-migration.cjs`; verificar con `node tools/build-tower-rewards-migration.cjs --check`. El archivo contiene su transacción y deja `grants_enabled=false`; no altera el rollout global ni reescribe progreso o inventarios.

1. Tras autorización explícita, registrar versión del proyecto y migraciones instaladas, exportar esquema y respaldo consistente de datos de Tower, monederos, apariencia, XP y Auth mediante el mecanismo de backup del proyecto. Guardar los artefactos fuera del repositorio y comprobar restauración en staging.
2. Comparar con el diagnóstico: 110 definiciones, funciones/ACL/RLS, restricciones de marcos, identidad y flags. Registrar conteos y hashes de progreso, inventarios y saldos antes de instalar. Detenerse ante divergencias; no forzar los guards ni importar fixtures.
3. Probar primero en staging con una copia autorizada. Instalar solamente la migración nueva revisada, respetando su transacción. No ejecutar `db push` indiscriminadamente: puede haber migraciones pendientes de otros sistemas. No instalar los SQL de `tools/tower-rewards-qa/migrations`.
4. Confirmar `global_enabled=false` y `tower_cosmetic_rollout.grants_enabled=false`, permisos RPC y que los datos previos siguen iguales. La instalación no concede artículos retroactivamente; la reconciliación solo ocurre cuando se habilita la concesión y se llama a sincronizar/liquidar.
5. Con autorización del piloto, conservar exclusivamente las cuentas piloto previamente aprobadas, habilitar concesión de cosméticos para ese alcance y comprobar que el flag global continúa apagado. El flag de cosméticos está además limitado por el rollout existente. Si ya hubiera certificados reales, revisar el efecto de reconciliación antes de habilitar; no reemplazarlos ni inventarlos.
6. Publicar únicamente la candidata aprobada y probar Android: actualización desde v394, cuenta real, victoria y derrota, reconexión/reapertura, repetición, equipo en dos dispositivos y perfiles. Verificar en servidor recibos únicos y saldos. Abrir globalmente requerirá otra autorización.

## Reversión

Procedimiento preparado en `tools/tower-rewards-qa/rollback-grants.sql`: apagar nuevas concesiones de cosméticos, conservando propiedad, equipo, certificados, recibos, monedas y progreso. Este archivo **no se ejecutó**. La prueba PostgreSQL comprueba que apagar el flag conserva los 14 artículos y el equipo.

Si fuera necesario detener también los pagos o el modo Torre, hacerlo únicamente con autorización operacional específica sobre el rollout existente. Para revertir la interfaz, preparar una publicación nueva basada en v394 con un número de caché superior al de la candidata; no bajar el número del service worker. Mantener tablas, IDs, restricciones y guards de propiedad nuevos en servidor. Un cliente antiguo puede no mostrar los premios, pero no los elimina.

No borrar tablas, concesiones, recibos o certificados; no restaurar saldos antiguos sobre cuentas que siguieron jugando. Un error en la migración revierte su transacción. Si ya fue instalada, preferir una corrección hacia adelante sobre el esquema aditivo; la restauración de un backup completo requiere revisión y autorización separadas.

## Reproducción local

Dependencias PostgreSQL fijadas en `tools/postgres-qa/package-lock.json`; instalar en un directorio de pruebas separado y definir `AVENTURA_POSTGRES_QA_PATH` si no se usa la caché temporal por defecto. Los scripts de navegador requieren Playwright y Edge instalados; la ruta de Playwright está declarada al inicio de cada script y puede adaptarse al entorno. No se instalan dependencias en producción.

Ejecutar `node tools/tower-rewards-qa/legacy-suite.cjs`, `check-postgres.cjs`, `check-browser.cjs`, `check-cinematics.cjs` y `check-upgrade.cjs` (estos últimos desde el mismo directorio). El informe de validación registra los comandos Node de regresión y hashes de los archivos finales. Regenerar manifiesto con `node tools/build-cache-manifest.cjs`, esperar su finalización y comprobar con `--check` antes de correr pruebas que validan hashes. Ninguno de estos comandos publica o migra el proyecto alojado.
