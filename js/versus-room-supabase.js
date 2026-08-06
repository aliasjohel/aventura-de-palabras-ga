(function iniciarVersusRoomSupabase(raiz) {
  "use strict";

  function traducirError(error, respaldo) {
    const mensaje = error?.message || respaldo;
    if (/anonymous sign-ins are disabled/i.test(mensaje)) {
      return new Error("Supabase indica que los jugadores anónimos todavía están desactivados.");
    }
    return new Error(mensaje.replace(/^.*?: /, ""));
  }

  function crearAdaptador(cliente) {
    if (!cliente) throw new Error("El cliente de Supabase no está disponible.");

    let usuarioId = null;
    let salaActual = null;
    let canalSala = null;
    let recargaEnCurso = null;
    const suscriptores = new Set();

    const emitir = (sala) => suscriptores.forEach((suscriptor) => suscriptor(sala));

    async function inicializar() {
      const { data: sesionActual, error: errorSesion } = await cliente.auth.getSession();
      if (errorSesion) throw traducirError(errorSesion, "No pudimos recuperar la sesión.");

      let sesion = sesionActual.session;
      if (!sesion) {
        const { data, error } = await cliente.auth.signInAnonymously();
        if (error) throw traducirError(error, "No pudimos iniciar la sesión anónima.");
        sesion = data.session;
      }

      if (!sesion?.user?.id) throw new Error("Supabase no devolvió una identidad de jugador.");
      usuarioId = sesion.user.id;
      return usuarioId;
    }

    async function cargarSala(roomId) {
      const [{ data: sala, error: errorSala }, { data: jugadores, error: errorJugadores }] = await Promise.all([
        cliente.from("versus_rooms").select("id, code, status, host_id, created_at, updated_at").eq("id", roomId).maybeSingle(),
        cliente.from("versus_players").select("id, user_id, alias, slot, ready, character_key, joined_at").eq("room_id", roomId).order("slot"),
      ]);

      if (errorSala) throw traducirError(errorSala, "No pudimos leer la sala.");
      if (errorJugadores) throw traducirError(errorJugadores, "No pudimos leer los jugadores.");

      if (!sala) {
        salaActual = null;
        emitir(null);
        return null;
      }

      salaActual = {
        id: sala.id,
        codigo: sala.code,
        estado: sala.status,
        creadaEn: sala.created_at,
        actualizadaEn: sala.updated_at,
        jugadores: jugadores.map((jugador) => ({
          id: jugador.user_id,
          registroId: jugador.id,
          alias: jugador.alias,
          anfitrion: jugador.slot === 1,
          listo: jugador.ready,
          personaje: jugador.character_key,
        })),
      };
      emitir(salaActual);
      return salaActual;
    }

    async function recargarSala() {
      if (!salaActual?.id) return null;
      if (recargaEnCurso) return recargaEnCurso;
      recargaEnCurso = cargarSala(salaActual.id).finally(() => { recargaEnCurso = null; });
      return recargaEnCurso;
    }

    async function detenerCanal() {
      if (!canalSala) return;
      const canal = canalSala;
      canalSala = null;
      await cliente.removeChannel(canal);
    }

    async function escucharSala(roomId) {
      await detenerCanal();
      canalSala = cliente
        .channel(`versus-room-${roomId}-${usuarioId}`)
        .on("postgres_changes", {
          event: "*",
          schema: "public",
          table: "versus_rooms",
          filter: `id=eq.${roomId}`,
        }, () => { void recargarSala(); })
        .on("postgres_changes", {
          event: "*",
          schema: "public",
          table: "versus_players",
          filter: `room_id=eq.${roomId}`,
        }, () => { void recargarSala(); })
        .subscribe();
    }

    async function crearSala({ alias }) {
      await inicializar();
      const nombre = raiz.VersusRoom.limpiarAlias(alias);
      if (nombre.length < 2) throw new Error("Escribí un nombre de al menos 2 caracteres.");

      const { data, error } = await cliente.rpc("create_versus_room", { p_alias: nombre });
      if (error) throw traducirError(error, "No pudimos crear la sala.");
      await cargarSala(data.id);
      await escucharSala(data.id);
      return salaActual;
    }

    async function unirseSala({ codigo, alias }) {
      await inicializar();
      const codigoLimpio = raiz.VersusRoom.limpiarCodigo(codigo);
      const nombre = raiz.VersusRoom.limpiarAlias(alias);
      if (nombre.length < 2) throw new Error("Escribí un nombre de al menos 2 caracteres.");
      if (codigoLimpio.length !== 6) throw new Error("El código debe tener 6 caracteres.");

      const { data, error } = await cliente.rpc("join_versus_room", {
        p_code: codigoLimpio,
        p_alias: nombre,
      });
      if (error) throw traducirError(error, "No pudimos unirnos a la sala.");
      await cargarSala(data.id);
      await escucharSala(data.id);
      return salaActual;
    }

    async function salirSala() {
      const roomId = salaActual?.id;
      await detenerCanal();
      salaActual = null;
      emitir(null);
      if (!roomId) return;

      const { error } = await cliente.rpc("leave_versus_room", { p_room_id: roomId });
      if (error) throw traducirError(error, "No pudimos abandonar la sala.");
    }

    function suscribir(suscriptor) {
      suscriptores.add(suscriptor);
      return () => suscriptores.delete(suscriptor);
    }

    return Object.freeze({
      proveedor: "supabase",
      inicializar,
      crearSala,
      unirseSala,
      salirSala,
      suscribir,
      obtenerSala: () => salaActual,
      obtenerUsuarioId: () => usuarioId,
    });
  }

  raiz.VersusRoomSupabase = Object.freeze({ crearAdaptador });
})(globalThis);
