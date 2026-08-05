(function iniciarVersusRoom(raiz, crearApi) {
  const api = crearApi(raiz);
  if (typeof module === "object" && module.exports) module.exports = api;
  raiz.VersusRoom = api;
})(typeof globalThis !== "undefined" ? globalThis : this, (raiz) => {
  "use strict";

  const PREFIJO = "aventura-versus-sala:";
  const ALFABETO_CODIGO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  function crearId() {
    if (raiz.crypto?.randomUUID) return raiz.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  function limpiarAlias(alias) {
    return `${alias || ""}`.trim().replace(/\s+/g, " ").slice(0, 16);
  }

  function limpiarCodigo(codigo) {
    return `${codigo || ""}`.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  }

  function generarCodigo() {
    return Array.from({ length: 6 }, () => (
      ALFABETO_CODIGO[Math.floor(Math.random() * ALFABETO_CODIGO.length)]
    )).join("");
  }

  function crearAdaptadorLocal(almacenamiento = raiz.localStorage) {
    const clienteId = crearId();
    let salaActual = null;
    const suscriptores = new Set();

    const claveSala = (codigo) => `${PREFIJO}${limpiarCodigo(codigo)}`;
    const leer = (codigo) => {
      const valor = almacenamiento.getItem(claveSala(codigo));
      return valor ? JSON.parse(valor) : null;
    };
    const emitir = (sala) => suscriptores.forEach((suscriptor) => suscriptor(sala));
    const guardar = (sala) => {
      sala.actualizadaEn = new Date().toISOString();
      almacenamiento.setItem(claveSala(sala.codigo), JSON.stringify(sala));
      salaActual = sala;
      emitir(sala);
      return sala;
    };

    function crearSala({ alias }) {
      const nombre = limpiarAlias(alias);
      if (nombre.length < 2) throw new Error("Escribí un nombre de al menos 2 caracteres.");
      let codigo = generarCodigo();
      while (leer(codigo)) codigo = generarCodigo();
      const ahora = new Date().toISOString();
      return guardar({
        version: 1,
        codigo,
        estado: "esperando",
        creadaEn: ahora,
        actualizadaEn: ahora,
        jugadores: [{ id: clienteId, alias: nombre, anfitrion: true, listo: false }],
      });
    }

    function unirseSala({ codigo, alias }) {
      const codigoLimpio = limpiarCodigo(codigo);
      const nombre = limpiarAlias(alias);
      if (nombre.length < 2) throw new Error("Escribí un nombre de al menos 2 caracteres.");
      if (codigoLimpio.length !== 6) throw new Error("El código debe tener 6 caracteres.");
      const sala = leer(codigoLimpio);
      if (!sala) throw new Error("No encontramos una sala con ese código.");
      const existente = sala.jugadores.find((jugador) => jugador.id === clienteId);
      if (!existente && sala.jugadores.length >= 2) throw new Error("La sala ya está completa.");
      if (!existente) sala.jugadores.push({ id: clienteId, alias: nombre, anfitrion: false, listo: false });
      sala.estado = sala.jugadores.length === 2 ? "completa" : "esperando";
      return guardar(sala);
    }

    function agregarRivalDePrueba(alias = "Rival local") {
      if (!salaActual) throw new Error("Primero creá una sala.");
      if (salaActual.jugadores.length < 2) {
        salaActual.jugadores.push({ id: `prueba-${crearId()}`, alias, anfitrion: false, listo: false });
      }
      salaActual.estado = "completa";
      return guardar(salaActual);
    }

    function salirSala() {
      if (!salaActual) return;
      const sala = leer(salaActual.codigo);
      if (sala) {
        const jugadorActual = sala.jugadores.find((jugador) => jugador.id === clienteId);
        if (jugadorActual?.anfitrion) {
          almacenamiento.removeItem(claveSala(sala.codigo));
        } else {
          sala.jugadores = sala.jugadores.filter((jugador) => jugador.id !== clienteId);
          sala.estado = "esperando";
          guardar(sala);
        }
      }
      salaActual = null;
      emitir(null);
    }

    function suscribir(suscriptor) {
      suscriptores.add(suscriptor);
      return () => suscriptores.delete(suscriptor);
    }

    function manejarCambio(evento) {
      if (!salaActual || evento.key !== claveSala(salaActual.codigo)) return;
      salaActual = evento.newValue ? JSON.parse(evento.newValue) : null;
      emitir(salaActual);
    }

    raiz.addEventListener?.("storage", manejarCambio);

    return Object.freeze({
      proveedor: "local",
      clienteId,
      crearSala,
      unirseSala,
      agregarRivalDePrueba,
      salirSala,
      suscribir,
      obtenerSala: () => salaActual,
      limpiarAlias,
      limpiarCodigo,
    });
  }

  return Object.freeze({ crearAdaptadorLocal, limpiarAlias, limpiarCodigo });
});
