# Buscar partida y ranking

La sala multijugador permite buscar un rival público sin código. La cola se consulta cada tres segundos y caduca tras treinta segundos sin actividad. Cancelar espera la solicitud en curso antes de retirar al jugador. Las salas privadas y Amigos conservan su flujo.

El ranking registra partidas públicas terminadas: tres puntos por victoria, uno por empate. Un trigger del servidor conserva un resultado por jugador y partida, incluso después de eliminar la sala. Incluye revanchas públicas; no cuenta partidas incompletas ni duelos locales o de historia. Los invitados conservan su identidad en este navegador; pueden guardar su jugador mediante el flujo de cuenta existente.

Las tablas viven en un esquema privado, sin permisos directos para clientes. Las RPC públicas usan SECURITY INVOKER y llaman funciones privadas con identidad validada. Los avisos informativos de RLS sin políticas en estas tablas son intencionales: todo acceso directo está denegado.

Validación: 52 pruebas existentes; prueba SQL con rollback para emparejamiento, reintentos, cancelación, puntos, duplicados y persistencia; prueba real con dos sesiones anónimas independientes; prueba visual de ranking y estados en celular. Las dos cuentas temporales de la prueba online fueron eliminadas al terminar.

Los scripts online usan el proyecto configurado: ejecutar solamente cuando se quiera probar la integración real y limpiar las cuentas de prueba registradas en el archivo temporal local. No crean puntuaciones de prueba permanentes.
