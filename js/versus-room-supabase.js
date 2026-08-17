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
    let usuarioActual = null;
    let estadoSocial = null;
    let salaActual = null;
    let partidaActual = null;
    let canalSala = null;
    let canalSocial = null;
    let suscripcionAuth = null;
    let ultimaSalaInvitada = null;
    let intervaloVerificacionSala = null;
    let recargaEnCurso = null;
    let recargaSolicitada = false;
    const suscriptores = new Set();
    const suscriptoresPartida = new Set();
    const suscriptoresSocial = new Set();
    const suscriptoresInvitacionAceptada = new Set();
    const claveSalaActiva = "aventura-versus-room-id";

    function recordarSala(roomId) {
      try {
        if (roomId) raiz.localStorage?.setItem(claveSalaActiva, roomId);
        else raiz.localStorage?.removeItem(claveSalaActiva);
      } catch (error) {
        console.warn("No pudimos recordar la sala activa.", error);
      }
    }

    function obtenerSalaRecordada() {
      try {
        return raiz.localStorage?.getItem(claveSalaActiva) || null;
      } catch (error) {
        return null;
      }
    }

    const emitir = (sala) => suscriptores.forEach((suscriptor) => suscriptor(sala));
    const emitirPartida = (partida) => (
      suscriptoresPartida.forEach((suscriptor) => suscriptor(partida))
    );
    const emitirSocial = () => suscriptoresSocial.forEach((suscriptor) => (
      suscriptor(estadoSocial, usuarioActual)
    ));

    function esCuentaPermanente() {
      return Boolean(usuarioActual && usuarioActual.is_anonymous === false);
    }

    function urlRetornoAutenticacion() {
      return `${raiz.location?.origin || ""}${raiz.location?.pathname || "/"}`;
    }

    async function detenerCanalSocial() {
      if (!canalSocial) return;
      const canal = canalSocial;
      canalSocial = null;
      await cliente.removeChannel(canal);
    }

    async function cargarEstadoSocial() {
      if (!esCuentaPermanente()) {
        estadoSocial = null;
        emitirSocial();
        return null;
      }
      const { data, error } = await cliente.rpc("get_versus_social_state");
      if (error) throw traducirError(error, "No pudimos cargar Amigos.");
      estadoSocial = data;
      emitirSocial();
      return estadoSocial;
    }

    async function abrirSalaInvitada(roomId) {
      if (!roomId || roomId === ultimaSalaInvitada) return;
      ultimaSalaInvitada = roomId;
      await cargarSala(roomId);
      await escucharSala(roomId);
      suscriptoresInvitacionAceptada.forEach((suscriptor) => suscriptor(salaActual));
    }

    async function escucharSocial() {
      await detenerCanalSocial();
      if (!usuarioId || !esCuentaPermanente()) return;
      const alCambiar = (cambio) => {
        void cargarEstadoSocial();
        const invitacion = cambio?.new;
        const esAceptacionNueva = cambio?.table === "versus_invites"
          && cambio?.eventType === "UPDATE"
          && invitacion?.status === "accepted"
          && invitacion?.room_id
          && [invitacion.challenger_id, invitacion.challenged_id].includes(usuarioId);
        if (esAceptacionNueva) void abrirSalaInvitada(invitacion.room_id);
      };
      canalSocial = cliente
        .channel(`versus-social-${usuarioId}`)
        .on("postgres_changes", { event: "*", schema: "public", table: "versus_profiles" }, alCambiar)
        .on("postgres_changes", { event: "*", schema: "public", table: "versus_friendships" }, alCambiar)
        .on("postgres_changes", { event: "*", schema: "public", table: "versus_invites" }, alCambiar)
        .subscribe();
    }

    async function cargarPartida() {
      if (!salaActual?.id || !["playing", "finished"].includes(salaActual.estado)) {
        return partidaActual;
      }
      const { data, error } = await cliente.rpc("get_versus_match_state", {
        p_room_id: salaActual.id,
      });
      if (error) throw traducirError(error, "No pudimos sincronizar el combate.");
      partidaActual = data;
      emitirPartida(partidaActual);
      return partidaActual;
    }

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
      usuarioActual = sesion.user;
      usuarioId = sesion.user.id;
      if (!suscripcionAuth) {
        const { data } = cliente.auth.onAuthStateChange((_evento, nuevaSesion) => {
          usuarioActual = nuevaSesion?.user || null;
          usuarioId = usuarioActual?.id || null;
          estadoSocial = null;
          emitirSocial();
          queueMicrotask(() => {
            void escucharSocial();
            if (esCuentaPermanente()) void cargarEstadoSocial();
          });
        });
        suscripcionAuth = data.subscription;
      }
      await escucharSocial();
      if (esCuentaPermanente()) await cargarEstadoSocial();
      const roomId = obtenerSalaRecordada();
      if (roomId && /^[0-9a-f-]{36}$/i.test(roomId)) {
        await cargarSala(roomId);
        if (salaActual) await escucharSala(roomId);
      }
      return usuarioId;
    }

    async function cargarSala(roomId) {
      const [{ data: sala, error: errorSala }, { data: jugadores, error: errorJugadores }] = await Promise.all([
        cliente.from("versus_rooms").select("id, code, status, host_id, created_at, updated_at").eq("id", roomId).maybeSingle(),
        cliente.from("versus_players").select("id, user_id, alias, slot, ready, character_key, theme_key, preparation_ready, rematch_ready, joined_at").eq("room_id", roomId).order("slot"),
      ]);

      if (errorSala) throw traducirError(errorSala, "No pudimos leer la sala.");
      if (errorJugadores) throw traducirError(errorJugadores, "No pudimos leer los jugadores.");

      if (!sala) {
        salaActual = null;
        partidaActual = null;
        recordarSala(null);
        emitir(null);
        emitirPartida(null);
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
          tematica: jugador.theme_key,
          preparacionLista: jugador.preparation_ready,
          revanchaLista: jugador.rematch_ready,
        })),
      };
      recordarSala(salaActual.id);
      emitir(salaActual);
      if (["playing", "finished"].includes(salaActual.estado)) {
        await cargarPartida();
      } else if (partidaActual) {
        partidaActual = null;
        emitirPartida(null);
      }
      return salaActual;
    }

    async function recargarSala() {
      if (!salaActual?.id) return null;
      if (recargaEnCurso) {
        recargaSolicitada = true;
        return recargaEnCurso;
      }
      recargaEnCurso = (async () => {
        do {
          recargaSolicitada = false;
          if (!salaActual?.id) return null;
          await cargarSala(salaActual.id);
        } while (recargaSolicitada && salaActual);
        return salaActual;
      })().finally(() => { recargaEnCurso = null; });
      return recargaEnCurso;
    }

    async function detenerCanal() {
      if (intervaloVerificacionSala) clearInterval(intervaloVerificacionSala);
      intervaloVerificacionSala = null;
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
        .on("postgres_changes", {
          event: "*",
          schema: "public",
          table: "versus_matches",
          filter: `room_id=eq.${roomId}`,
        }, () => { void cargarPartida(); })
        .subscribe();
      intervaloVerificacionSala = setInterval(() => { void recargarSala(); }, 4000);
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

    async function actualizarPersonaje({ personaje, listo = true }) {
      if (!salaActual?.id) throw new Error("No hay una sala activa.");
      const { data, error } = await cliente.rpc("set_versus_character", {
        p_room_id: salaActual.id,
        p_character_key: personaje,
        p_ready: listo,
      });
      if (error) throw traducirError(error, "No pudimos guardar el personaje.");
      await cargarSala(data.id);
      return salaActual;
    }

    async function guardarDesafio({ tematica, palabras }) {
      if (!salaActual?.id) throw new Error("No hay una sala activa.");
      const { data, error } = await cliente.rpc("set_versus_challenge", {
        p_room_id: salaActual.id,
        p_theme_key: tematica,
        p_words: palabras,
      });
      if (error) throw traducirError(error, "No pudimos guardar las palabras.");
      await cargarSala(data.id);
      return salaActual;
    }

    async function cancelarDesafio() {
      if (!salaActual?.id) return salaActual;
      const { data, error } = await cliente.rpc("cancel_versus_challenge", {
        p_room_id: salaActual.id,
      });
      if (error) throw traducirError(error, "No pudimos cancelar las palabras.");
      await cargarSala(data.id);
      return salaActual;
    }

    async function pedirRevancha() {
      if (!salaActual?.id) throw new Error("No hay una sala activa.");
      const { data, error } = await cliente.rpc("request_versus_rematch", {
        p_room_id: salaActual.id,
      });
      if (error) throw traducirError(error, "No pudimos solicitar la revancha.");
      await cargarSala(data.id);
      return salaActual;
    }

    async function salirSala() {
      const roomId = salaActual?.id;
      await detenerCanal();
      salaActual = null;
      partidaActual = null;
      recordarSala(null);
      emitir(null);
      emitirPartida(null);
      if (!roomId) return;

      const { error } = await cliente.rpc("leave_versus_room", { p_room_id: roomId });
      if (error) throw traducirError(error, "No pudimos abandonar la sala.");
    }

    function suscribir(suscriptor) {
      suscriptores.add(suscriptor);
      return () => suscriptores.delete(suscriptor);
    }

    function suscribirPartida(suscriptor) {
      suscriptoresPartida.add(suscriptor);
      return () => suscriptoresPartida.delete(suscriptor);
    }

    function suscribirSocial(suscriptor) {
      suscriptoresSocial.add(suscriptor);
      suscriptor(estadoSocial, usuarioActual);
      return () => suscriptoresSocial.delete(suscriptor);
    }

    function suscribirInvitacionesAceptadas(suscriptor) {
      suscriptoresInvitacionAceptada.add(suscriptor);
      return () => suscriptoresInvitacionAceptada.delete(suscriptor);
    }

    async function vincularCorreo(correo) {
      const email = String(correo || "").trim().toLowerCase();
      if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Escribí un correo válido.");
      const { error } = await cliente.auth.updateUser(
        { email },
        { emailRedirectTo: urlRetornoAutenticacion() },
      );
      if (error) throw traducirError(error, "No pudimos enviar la confirmación.");
      return email;
    }

    async function entrarConCorreo(correo) {
      const email = String(correo || "").trim().toLowerCase();
      if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Escribí un correo válido.");
      const { error } = await cliente.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false, emailRedirectTo: urlRetornoAutenticacion() },
      });
      if (error) throw traducirError(error, "No pudimos enviar el enlace de acceso.");
      return email;
    }

    async function vincularGoogle() {
      const { data, error } = await cliente.auth.linkIdentity({
        provider: "google",
        options: { redirectTo: urlRetornoAutenticacion() },
      });
      if (error) throw traducirError(error, "No pudimos vincular Google.");
      return data;
    }

    async function ejecutarRpcSocial(nombre, parametros, respaldo) {
      const { data, error } = await cliente.rpc(nombre, parametros);
      if (error) throw traducirError(error, respaldo);
      await cargarEstadoSocial();
      return data;
    }

    const guardarPerfil = (alias) => ejecutarRpcSocial(
      "upsert_versus_profile", { p_alias: alias }, "No pudimos guardar tu perfil.",
    );
    const enviarSolicitudAmistad = (codigo) => ejecutarRpcSocial(
      "send_versus_friend_request", { p_friend_code: codigo }, "No pudimos enviar la solicitud.",
    );
    const responderSolicitudAmistad = (id, aceptar) => ejecutarRpcSocial(
      "respond_versus_friend_request",
      { p_friendship_id: id, p_accept: aceptar },
      "No pudimos responder la solicitud.",
    );
    const eliminarAmigo = (id) => ejecutarRpcSocial(
      "remove_versus_friend", { p_friendship_id: id }, "No pudimos quitar al amigo.",
    );
    const enviarInvitacion = (id) => ejecutarRpcSocial(
      "send_versus_invite", { p_friend_id: id }, "No pudimos enviar el desafío.",
    );
    const cancelarInvitacion = (id) => ejecutarRpcSocial(
      "cancel_versus_invite", { p_invite_id: id }, "No pudimos cancelar el desafío.",
    );
    async function responderInvitacion(id, aceptar) {
      const sala = await ejecutarRpcSocial(
        "respond_versus_invite",
        { p_invite_id: id, p_accept: aceptar },
        "No pudimos responder el desafío.",
      );
      if (aceptar && sala?.id) {
        await abrirSalaInvitada(sala.id);
      }
      return sala;
    }

    async function jugarLetra(letra) {
      if (!salaActual?.id) throw new Error("No hay una sala activa.");
      const { data, error } = await cliente.rpc("play_versus_letter", {
        p_room_id: salaActual.id,
        p_letter: letra,
      });
      if (error) throw traducirError(error, "No pudimos enviar la letra.");
      // Recarga el estado enriquecido con carga, pista y efectos.
      return cargarPartida();
    }

    async function activarHabilidad() {
      if (!salaActual?.id) throw new Error("No hay una sala activa.");
      const { data, error } = await cliente.rpc("activate_versus_ability", {
        p_room_id: salaActual.id,
      });
      if (error) throw traducirError(error, "No pudimos activar la habilidad.");
      partidaActual = data;
      emitirPartida(partidaActual);
      return partidaActual;
    }

    return Object.freeze({
      proveedor: "supabase",
      inicializar,
      crearSala,
      unirseSala,
      actualizarPersonaje,
      guardarDesafio,
      cancelarDesafio,
      pedirRevancha,
      cargarPartida,
      jugarLetra,
      activarHabilidad,
      salirSala,
      suscribir,
      suscribirPartida,
      suscribirSocial,
      suscribirInvitacionesAceptadas,
      cargarEstadoSocial,
      vincularCorreo,
      entrarConCorreo,
      vincularGoogle,
      guardarPerfil,
      enviarSolicitudAmistad,
      responderSolicitudAmistad,
      eliminarAmigo,
      enviarInvitacion,
      cancelarInvitacion,
      responderInvitacion,
      obtenerSala: () => salaActual,
      obtenerPartida: () => partidaActual,
      obtenerUsuarioId: () => usuarioId,
      obtenerUsuario: () => usuarioActual,
      obtenerEstadoSocial: () => estadoSocial,
      esCuentaPermanente,
    });
  }

  raiz.VersusRoomSupabase = Object.freeze({ crearAdaptador });
})(globalThis);
