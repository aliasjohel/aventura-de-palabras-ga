(function iniciarVersusRoomSupabase(raiz) {
  "use strict";

  const sesionesEnCurso = new WeakMap();
  const adaptadores = new WeakMap();
  let secuenciaAdaptador = 0;

  function diagnosticar(operacion, error) {
    const mensaje = String(error?.message || error || '').slice(0, 1000)
      .replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, '[token]')
      .replace(/sb_(?:secret|publishable|p)_[A-Za-z0-9_-]+/g, '[clave]')
      .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[correo]');
    console.warn('[Aventura online]', { operacion, codigo: error?.code || 'CLIENT_ERROR', mensaje });
  }

  function recuperarSesion(cliente) {
    if (sesionesEnCurso.has(cliente)) return sesionesEnCurso.get(cliente);
    const recuperar = async () => {
      // Read again INSIDE the browser lock: another tab may just have saved its session.
      const { data, error } = await cliente.auth.getSession();
      if (error) throw traducirError(error, "No pudimos recuperar la sesión.");
      let sesion = data?.session;
      if (sesion) {
        // Keep the existing UUID, including confirmation completed in another browser.
        const renovacion = await cliente.auth.refreshSession(sesion);
        if (renovacion.error) throw traducirError(renovacion.error, "La sesión guardada venció. Volvé a entrar con tu correo.");
        return renovacion.data?.session || sesion;
      }
      // Supabase can fall back to memory if storage is unavailable. Do not create
      // disposable identities on each launch when we cannot remember the first one.
      const clave = "aventura-auth-storage-check";
      try {
        const storage = raiz.localStorage;
        if (!storage) throw new Error();
        const anterior = storage.getItem(clave);
        try {
          storage.setItem(clave, "1");
          if (storage.getItem(clave) !== "1") throw new Error();
        } finally {
          if (anterior === null) storage.removeItem(clave);
          else storage.setItem(clave, anterior);
        }
      } catch (_) {
        throw errorJugador("Habilitá el almacenamiento del navegador para conservar tu jugador online.");
      }
      const ingreso = await cliente.auth.signInAnonymously();
      if (ingreso.error) throw traducirError(ingreso.error, "No pudimos iniciar la sesión anónima.");
      return ingreso.data?.session;
    };
    // Separate from Supabase's own token lock, avoiding nested acquisition of that lock.
    const nombre = "aventura-auth-bootstrap:" + (cliente.supabaseUrl || raiz.AVENTURA_SUPABASE_CONFIG?.url || "default");
    const promesa = Promise.resolve().then(() => raiz.navigator?.locks?.request
      ? raiz.navigator.locks.request(nombre, { mode: "exclusive" }, recuperar)
      : recuperar()).finally(() => sesionesEnCurso.delete(cliente));
    sesionesEnCurso.set(cliente, promesa);
    return promesa;
  }

  const mensajesJugador = new WeakSet();
  function errorJugador(mensaje) {
    const error = new Error(mensaje);
    mensajesJugador.add(error);
    return error;
  }

  function traducirError(error, respaldo) {
    if (error && mensajesJugador.has(error)) return error;
    const mensaje = String(error?.message || '');
    diagnosticar('operacion', error);
    if (/anonymous sign-ins are disabled/i.test(mensaje)) {
      return errorJugador("El acceso de invitados no está disponible. Probá entrar con tu cuenta.");
    }
    // Only known, translated player messages may cross the backend/UI boundary.
    const conocido = Object.entries(raiz.I18nSpanishUI || {})
      .some(([clave, texto]) => clave.startsWith('errors.') && texto === mensaje);
    return errorJugador(conocido ? mensaje : respaldo || "No pudimos completar la conexión. Volvé a intentarlo.");
  }

  function crearAdaptador(cliente) {
    if (!cliente) throw new Error("El cliente de Supabase no está disponible.");
    if (adaptadores.has(cliente)) return adaptadores.get(cliente);

    const idAdaptador = ++secuenciaAdaptador;
    let secuenciaCanal = 0;
    let eliminado = false;
    let conexionLista = false;
    let cierreEnCurso = null;
    let colaSocial = Promise.resolve();
    let colaSala = Promise.resolve();
    let propietarioSocial = null;
    let propietarioSala = null;
    let salaCanal = null;
    const nuevoCanal = nombre => cliente.channel(`${nombre}-${idAdaptador}-${++secuenciaCanal}`);
    function encolarSocial(accion) {
      const siguiente = colaSocial.then(accion, accion);
      colaSocial = siguiente.catch(() => {});
      return siguiente;
    }
    function encolarSala(accion) {
      const siguiente = colaSala.then(accion, accion);
      colaSala = siguiente.catch(() => {});
      return siguiente;
    }

    let usuarioId = null;
    let inicializacionEnCurso = null;
    let confirmacionCorreoPendiente = false;
    let idiomaBusqueda = null;
    let usuarioActual = null;
    let sesionActual = null;
    let estadoSocial = null;
    let errorEstadoSocial = null;
    let salaActual = null;
    let partidaActual = null;
    let canalSala = null;
    let canalTrajes = null;
    let trajesRival = {};
    let propietarioTrajesRival = null;
    let rivalTrajesSolicitado = null;
    function enviarTrajes() {
      if(!canalTrajes||!usuarioId||!raiz.CosmeticStore)return;
      try { void canalTrajes.send({type:'broadcast',event:'outfit',payload:{player:usuarioId}}).catch(()=>{}); }
      catch(_) { /* La apariencia local sigue disponible sin conexión. */ }
    }
    raiz.addEventListener?.('costume-equipped',enviarTrajes);
    raiz.addEventListener?.('wallet-updated',enviarTrajes);
    async function cargarTrajesSala() {
      const roomId=salaActual?.id;
      const rival=salaActual?.jugadores.find(player=>player.id!==usuarioId)?.id;
      if(!roomId||!rival)return;
      const {data,error}=await cliente.rpc('get_versus_room_costumes',{p_room_id:roomId});
      if(error||salaActual?.id!==roomId||!salaActual.jugadores.some(player=>player.id===rival))return;
      const next=raiz.CosmeticStore.normalizeSkins(data?.[rival]);
      if(propietarioTrajesRival===rival&&JSON.stringify(next)===JSON.stringify(trajesRival))return;
      trajesRival=next;propietarioTrajesRival=rival;
      raiz.dispatchEvent?.(new Event('rival-costume-updated'));
    }
    let canalSocial = null;
    let suscripcionAuth = null;
    let ultimaSalaInvitada = null;
    let salaInvitadaPendiente = null;
    let aperturaInvitadaEnCurso = null;
    let cargaSocialEnCurso = null;
    let intervaloSocial = null;
    const salasAbandonadas = new Set();
    let intervaloVerificacionSala = null;
    let recargaEnCurso = null;
    let recargaSolicitada = false;
    let versionCanalSala = 0;
    let temporizadorSincronizacionAuth = null;
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
      suscriptor(estadoSocial, usuarioActual, errorEstadoSocial, esCuentaPermanente())
    ));

    function sesionTieneCuentaPermanente(sesion) {
      if (!sesion?.user || sesion.user.is_anonymous !== false) return false;
      try {
        const segmento = sesion.access_token.split(".")[1];
        const base64 = segmento.replace(/-/g, "+").replace(/_/g, "/")
          .padEnd(Math.ceil(segmento.length / 4) * 4, "=");
        const claims = JSON.parse(raiz.atob(base64));
        return claims.is_anonymous === false;
      } catch (_error) {
        return false;
      }
    }

    function actualizarSesion(sesion) {
      if (eliminado) return;
      const siguienteUsuario = sesion?.user?.id || null;
      if (usuarioId !== siguienteUsuario) {
        conexionLista = false;
        confirmacionCorreoPendiente = false;
        ultimaSalaInvitada = null;
        salaInvitadaPendiente = null;
        salasAbandonadas.clear();
        versionCanalSala += 1;
        salaActual = null;
        partidaActual = null;
        void detenerCanal().catch(() => {});
        void detenerCanalSocial().catch(error => diagnosticar('cerrar-social', error));
      }
      sesionActual = sesion || null;
      usuarioActual = sesionActual?.user || null;
      usuarioId = usuarioActual?.id || null;
      if (usuarioActual?.is_anonymous === false) confirmacionCorreoPendiente = false;
      else if (usuarioActual?.new_email) confirmacionCorreoPendiente = true;
      raiz.GameWallet?.connect(cliente, usuarioId);
    }

    function esCuentaPermanente() {
      return sesionTieneCuentaPermanente(sesionActual);
    }

    function urlRetornoAutenticacion() {
      return `${raiz.location?.origin || ""}${raiz.location?.pathname || "/"}`;
    }

    async function limpiarCanalSocial() {
      if (intervaloSocial) raiz.clearInterval(intervaloSocial);
      intervaloSocial = null;
      if (!canalSocial) return;
      const canal = canalSocial;
      canalSocial = null;
      propietarioSocial = null;
      await cliente.removeChannel(canal);
    }

    function detenerCanalSocial() {
      return encolarSocial(limpiarCanalSocial);
    }

    async function cargarEstadoSocial() {
      if (eliminado) return null;
      if (!esCuentaPermanente()) {
        estadoSocial = null;
        errorEstadoSocial = null;
        emitirSocial();
        return null;
      }
      const identidadCarga = usuarioId;
      if (cargaSocialEnCurso?.usuario === identidadCarga) return cargaSocialEnCurso.promesa;
      const carga = { usuario: identidadCarga };
      carga.promesa = (async () => {
        const { data, error } = await cliente.rpc("get_versus_social_state");
        if (eliminado || usuarioId !== identidadCarga) return null;
        if (error) {
          errorEstadoSocial = traducirError(error, "No pudimos cargar Amigos.");
          emitirSocial();
          throw errorEstadoSocial;
        }
        estadoSocial = data;
        errorEstadoSocial = null;
        emitirSocial();
        const aceptadas = data?.accepted_invites || [];
        const invitacion = aceptadas.find(i => i.room_id === salaActual?.id) || aceptadas[0];
        if (invitacion?.room_id) await abrirSalaInvitada(invitacion.room_id, identidadCarga);
        return estadoSocial;
      })().finally(() => {
        if (cargaSocialEnCurso === carga) cargaSocialEnCurso = null;
      });
      cargaSocialEnCurso = carga;
      return carga.promesa;
    }

    function sincronizarAlVolver() {
      if (eliminado || !usuarioId || raiz.document?.visibilityState === "hidden" || raiz.navigator?.onLine === false) return;
      void escucharSocial().catch(error => diagnosticar('reconectar-social', error));
      if (salaActual?.id) void escucharSala(salaActual.id).catch(error => diagnosticar('reconectar-sala', error));
      void Promise.allSettled([cargarEstadoSocial(), recargarSala()]);
    }
    raiz.addEventListener?.("online", sincronizarAlVolver);
    raiz.addEventListener?.("focus", sincronizarAlVolver);
    raiz.document?.addEventListener("visibilitychange", sincronizarAlVolver);

    function programarSincronizacionAuth() {
      if (eliminado) return;
      if (temporizadorSincronizacionAuth) {
        raiz.clearTimeout(temporizadorSincronizacionAuth);
      }
      temporizadorSincronizacionAuth = raiz.setTimeout(() => {
        temporizadorSincronizacionAuth = null;
        if (eliminado) return;
        void (async () => {
          try {
            await escucharSocial();
            if (esCuentaPermanente()) {
              await cargarEstadoSocial();
            }
          } catch (error) {
            console.warn("No pudimos sincronizar Amigos después de actualizar la sesión.", error);
          }
        })();
      }, 0);
    }

    async function abrirSalaInvitada(roomId, identidad = usuarioId) {
      if (!roomId || salasAbandonadas.has(roomId) || identidad !== usuarioId || roomId === ultimaSalaInvitada) return;
      if (salaActual && salaActual.id !== roomId && ["complete", "preparing", "playing"].includes(salaActual.estado)) return;
      if (aperturaInvitadaEnCurso) return aperturaInvitadaEnCurso;
      aperturaInvitadaEnCurso = (async () => {
        const sala = await cargarSala(roomId);
        if (salasAbandonadas.has(roomId) || identidad !== usuarioId || !sala || sala.id !== roomId
          || !["complete", "preparing", "playing"].includes(sala.estado)
          || !sala.jugadores.some(j => j.id === identidad)) return;
        await escucharSala(roomId);
        if (salasAbandonadas.has(roomId) || identidad !== usuarioId || salaActual?.id !== roomId) return;
        ultimaSalaInvitada = roomId;
        if (suscriptoresInvitacionAceptada.size) {
          suscriptoresInvitacionAceptada.forEach(suscriptor => suscriptor(salaActual));
        } else salaInvitadaPendiente = { sala: salaActual, usuario: identidad };
      })().finally(() => { aperturaInvitadaEnCurso = null; });
      return aperturaInvitadaEnCurso;
    }

    function escucharSocial() {
      return encolarSocial(async () => {
        const identidad = usuarioId;
        if (!eliminado && identidad && esCuentaPermanente() && canalSocial
          && propietarioSocial === identidad && canalSocial.state !== 'closed') return;
        await limpiarCanalSocial();
        if (eliminado || !identidad || identidad !== usuarioId || !esCuentaPermanente()) return;
        // Realtime is a refresh hint; only the persisted RPC state can open a room.
        const canal = nuevoCanal(`versus-social-${identidad}`);
        canalSocial = canal;
        propietarioSocial = identidad;
        const vigente = () => !eliminado && canalSocial === canal && usuarioId === identidad;
        const alCambiar = () => { if (vigente()) void cargarEstadoSocial().catch(() => {}); };
        try {
          canal
            .on("postgres_changes", { event: "*", schema: "public", table: "versus_profiles" }, alCambiar)
            .on("postgres_changes", { event: "*", schema: "public", table: "versus_friendships" }, alCambiar)
            .on("postgres_changes", { event: "*", schema: "public", table: "versus_invites" }, alCambiar)
            .subscribe((status, error) => {
              if (!vigente()) return;
              if (status === "SUBSCRIBED") sincronizarAlVolver();
              else if (error) diagnosticar('estado-social', error);
            });
          intervaloSocial = raiz.setInterval(sincronizarAlVolver, 15000);
        } catch (error) {
          await limpiarCanalSocial();
          throw traducirError(error, "No pudimos conectar las actualizaciones. Volvé a intentarlo.");
        }
      });
    }

    async function cargarPartida() {
      if (!salaActual?.id || !["playing", "finished"].includes(salaActual.estado)) {
        return partidaActual;
      }
      const roomId = salaActual.id;
      const identidad = usuarioId;
      const { data, error } = await cliente.rpc("get_versus_match_state", {
        p_room_id: roomId,
      });
      if (identidad !== usuarioId || salaActual?.id !== roomId) return partidaActual;
      if (error) throw traducirError(error, "No pudimos sincronizar el combate.");
      partidaActual = data;
      emitirPartida(partidaActual);
      return partidaActual;
    }

    function inicializar() {
      if (eliminado) return Promise.reject(new Error("La conexión se cerró. Volvé a entrar a Multijugador."));
      if (inicializacionEnCurso) return inicializacionEnCurso;
      if (conexionLista && usuarioId && suscripcionAuth && !confirmacionCorreoPendiente) return escucharSocial().then(() => usuarioId);
      inicializacionEnCurso = inicializarConexion()
        .catch(error => { throw traducirError(error, "No pudimos conectarnos al multijugador. Volvé a intentarlo."); })
        .finally(() => { inicializacionEnCurso = null; });
      return inicializacionEnCurso;
    }

    async function inicializarConexion() {
      const sesion = await recuperarSesion(cliente);
      if (eliminado) throw new Error("La conexión se cerró.");

      if (!sesion?.user?.id) throw new Error("Supabase no devolvió una identidad de jugador.");
      actualizarSesion(sesion);
      if (raiz.localStorage?.getItem("aventuraPalabrasIdentidadV1")) {
        try { await guardarApariencia(raiz.PlayerAvatar.obtener()); } catch (error) { console.warn(error.message); }
      }
      if (!suscripcionAuth) {
        const { data } = cliente.auth.onAuthStateChange((_evento, nuevaSesion) => {
          if (eliminado) return;
          actualizarSesion(nuevaSesion);
          estadoSocial = null;
          errorEstadoSocial = null;
          emitirSocial();
          // Las llamadas a Supabase se difieren hasta que Auth libera su bloqueo.
          programarSincronizacionAuth();
        });
        suscripcionAuth = data.subscription;
      }
      const roomId = obtenerSalaRecordada();
      if (roomId && /^[0-9a-f-]{36}$/i.test(roomId)) {
        await cargarSala(roomId);
        if (salaActual) await escucharSala(roomId);
      }
      await escucharSocial();
      if (esCuentaPermanente()) {
        try {
          await cargarEstadoSocial();
        } catch (error) {
          console.warn("La cuenta está conectada, pero Amigos todavía no respondió.", error);
        }
      }
      conexionLista = !eliminado;
      return usuarioId;
    }

    async function cargarSala(roomId) {
      const versionCarga = versionCanalSala;
      const [{ data: sala, error: errorSala }, { data: jugadores, error: errorJugadores }] = await Promise.all([
        cliente.from("versus_rooms").select("id, code, status, host_id, created_at, updated_at, queue_mode, word_language").eq("id", roomId).maybeSingle(),
        cliente.from("versus_players").select("id, user_id, alias, slot, ready, character_key, theme_key, preparation_ready, rematch_ready, joined_at, avatar_key, frame_key, quick_message_key, quick_message_at").eq("room_id", roomId).order("slot"),
      ]);

      if (errorSala) throw traducirError(errorSala, "No pudimos leer la sala.");
      if (errorJugadores) throw traducirError(errorJugadores, "No pudimos leer los jugadores.");
      if (versionCarga !== versionCanalSala) return salaActual;

      if (!sala) {
        salaActual = null;
        partidaActual = null;
        recordarSala(null);
        emitir(null);
        emitirPartida(null);
        await detenerCanal();
        return null;
      }

      const propio = jugadores.find((jugador) => jugador.user_id === usuarioId);
      const identidad = raiz.PlayerAvatar?.obtener();
      if (propio && identidad && (propio.avatar_key !== identidad.avatar || propio.frame_key !== identidad.frame)) {
        const { error } = await cliente.rpc("set_versus_identity", {
          p_room_id: roomId, p_avatar_key: identidad.avatar, p_frame_key: identidad.frame,
        });
        if (!error) {
          propio.avatar_key = identidad.avatar;
          propio.frame_key = identidad.frame;
        } else console.warn("No pudimos sincronizar el avatar.", error);
      }

      if (versionCarga !== versionCanalSala) return salaActual;
      salaActual = {
        id: sala.id,
        codigo: sala.code,
        idioma: sala.word_language || "es",
        modo: sala.queue_mode,
        estado: sala.status,
        creadaEn: sala.created_at,
        actualizadaEn: sala.updated_at,
        jugadores: jugadores.map((jugador) => ({
          id: jugador.user_id,
          registroId: jugador.id,
          alias: jugador.alias,
          identidad: { avatar: jugador.avatar_key, frame: jugador.frame_key },
          mensajeRapido: jugador.quick_message_key,
          mensajeEn: jugador.quick_message_at,
          anfitrion: jugador.slot === 1,
          listo: jugador.ready,
          personaje: jugador.character_key,
          tematica: jugador.theme_key,
          preparacionLista: jugador.preparation_ready,
          revanchaLista: jugador.rematch_ready,
        })),
      };
      const rivalActual=salaActual.jugadores.find(player=>player.id!==usuarioId)?.id||null;
      if(rivalActual!==rivalTrajesSolicitado){
        rivalTrajesSolicitado=rivalActual;trajesRival={};propietarioTrajesRival=null;
        if(canalTrajes&&rivalActual){enviarTrajes();void canalTrajes.send({type:'broadcast',event:'outfit-request',payload:{}}).catch(()=>{});}
        raiz.dispatchEvent?.(new Event('rival-costume-updated'));
      }
      recordarSala(salaActual.id);
      if(raiz.CosmeticStore)await cargarTrajesSala();
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

    async function limpiarCanalSala() {
      // Detach all handles BEFORE awaiting either SDK removal.
      const canales = [canalSala, canalTrajes].filter(Boolean);
      canalSala = null; canalTrajes = null; propietarioSala = null; salaCanal = null;
      trajesRival = {}; propietarioTrajesRival = null; rivalTrajesSolicitado = null;
      versionCanalSala += 1;
      if (intervaloVerificacionSala) raiz.clearInterval(intervaloVerificacionSala);
      intervaloVerificacionSala = null;
      await Promise.all(canales.map(canal => cliente.removeChannel(canal)));
    }

    function detenerCanal() {
      return encolarSala(limpiarCanalSala);
    }

    function escucharSala(roomId) {
      const identidad = usuarioId;
      return encolarSala(async () => {
        if (eliminado || identidad !== usuarioId || salaActual?.id !== roomId || salasAbandonadas.has(roomId)) return;
        if (canalSala && propietarioSala === identidad && salaCanal === roomId
          && canalSala.state !== 'closed' && (!raiz.CosmeticStore || (canalTrajes && canalTrajes.state !== 'closed'))) return;
        await limpiarCanalSala();
        if (eliminado || identidad !== usuarioId || salaActual?.id !== roomId || salasAbandonadas.has(roomId)) return;
        propietarioSala = identidad; salaCanal = roomId;
        const vigente = () => !eliminado && propietarioSala === identidad && usuarioId === identidad
          && salaCanal === roomId && salaActual?.id === roomId && !salasAbandonadas.has(roomId);
        try {
          if (raiz.CosmeticStore) {
            // Broadcasts are hints; ownership still comes only from the server.
            // Peers must share the broadcast topic. Its lifecycle is serialized above.
            const canal = cliente.channel('versus-outfits-' + roomId);
            canalTrajes = canal;
            canal.on('broadcast', {event:'outfit'}, ({payload}) => {
              if (!vigente() || canalTrajes !== canal || payload?.player === usuarioId) return;
              if (!salaActual.jugadores.some(player => player.id === payload?.player)) return;
              void cargarTrajesSala().catch(() => {});
            }).on('broadcast', {event:'outfit-request'}, () => {
              if (vigente() && canalTrajes === canal) enviarTrajes();
            }).subscribe(status => {
              if (status === 'SUBSCRIBED' && vigente() && canalTrajes === canal) {
                enviarTrajes(); void canal.send({type:'broadcast', event:'outfit-request', payload:{}}).catch(() => {});
              }
            });
          }
          const canal = nuevoCanal('versus-room-' + roomId + '-' + identidad);
          canalSala = canal;
          const recargar = () => { if (vigente() && canalSala === canal) void recargarSala().catch(() => {}); };
          canal.on('postgres_changes', {event:'*', schema:'public', table:'versus_rooms', filter:'id=eq.' + roomId}, recargar)
            .on('postgres_changes', {event:'*', schema:'public', table:'versus_players', filter:'room_id=eq.' + roomId}, recargar)
            .on('postgres_changes', {event:'*', schema:'public', table:'versus_matches', filter:'room_id=eq.' + roomId}, () => {
              if (vigente() && canalSala === canal) void cargarPartida().catch(() => {});
            }).subscribe((status, error) => {
              if (!vigente() || canalSala !== canal) return;
              if (status === 'SUBSCRIBED') recargar();
              else if (error) diagnosticar('estado-sala', error);
            });
          intervaloVerificacionSala = raiz.setInterval(recargar, 4000);
        } catch (error) {
          await limpiarCanalSala();
          throw traducirError(error, 'No pudimos conectar la sala. Volvé a intentarlo.');
        }
      });
    }

    async function crearSala({ alias }) {
      await inicializar();
      const nombre = raiz.VersusRoom.validarAlias(alias);
      if (nombre.length < 2) throw new Error("Escribí un nombre de al menos 2 caracteres.");

      const { data, error } = await cliente.rpc("create_versus_room_localized", { p_alias: nombre, p_language: raiz.I18n?.language || "es" });
      if (error) throw traducirError(error, "No pudimos crear la sala.");
      salasAbandonadas.delete(data.id);
      await cargarSala(data.id);
      await escucharSala(data.id);
      return salaActual;
    }

    async function buscarPartida({ alias, cancelar = false, modo = "classic" }) {
      if (!usuarioId) await inicializar();
      const { data, error } = await cliente.rpc("find_versus_opponent_localized", {
        p_language: raiz.I18n?.language || "es",
        p_alias: cancelar ? raiz.VersusRoom.limpiarAlias(alias) : raiz.VersusRoom.validarAlias(alias), p_cancel: cancelar, p_mode: modo,
      });
      if (error) { idiomaBusqueda = null; throw traducirError(error, "No pudimos buscar un rival."); }
      if(cancelar || data?.room_id) idiomaBusqueda = null;
      if (data?.room_id) {
        await cargarSala(data.room_id);
        await escucharSala(data.room_id);
      }
      return data;
    }

    async function obtenerRango(matchId = null) {
      const { data, error } = await cliente.rpc("get_versus_rank_status", { p_match_id: matchId });
      if (error) throw traducirError(error, "No pudimos cargar tu rango.");
      return data;
    }

    async function obtenerRanking() {
      await inicializar();
      const { data, error } = await cliente.rpc("get_versus_ranking");
      if (error) throw traducirError(error, "No pudimos cargar el ranking.");
      return data || [];
    }

    async function obtenerPerfilPublico(userId = null, offset = 0) {
      const { data, error } = await cliente.rpc("get_versus_public_profile", { p_user_id: userId, p_offset: offset });
      if (error) throw traducirError(error, "No pudimos cargar este perfil.");
      return data;
    }

    async function guardarApariencia(identidad) {
      const { error } = await cliente.rpc("save_versus_appearance", { p_avatar: identidad.avatar, p_frame: identidad.frame });
      if (error) throw traducirError(error, "No pudimos compartir tu apariencia. Volvé a intentarlo.");
    }

    async function obtenerPerfilJugador() {
      const { data, error } = await cliente.rpc("get_versus_player_profile");
      if (error) throw traducirError(error, "No pudimos cargar tu perfil.");
      return { ...data, guest: !esCuentaPermanente() };
    }

    async function unirseSala({ codigo, alias }) {
      await inicializar();
      const codigoLimpio = raiz.VersusRoom.limpiarCodigo(codigo);
      const nombre = raiz.VersusRoom.validarAlias(alias);
      if (nombre.length < 2) throw new Error("Escribí un nombre de al menos 2 caracteres.");
      if (codigoLimpio.length !== 6) throw new Error("El código debe tener 6 caracteres.");

      const { data, error } = await cliente.rpc("join_versus_room_localized", {
        p_code: codigoLimpio,
        p_alias: nombre,
      });
      if (error) throw traducirError(error, "No pudimos unirnos a la sala.");
      salasAbandonadas.delete(data.id);
      await cargarSala(data.id);
      await escucharSala(data.id);
      return salaActual;
    }

    async function actualizarPersonaje({ personaje, listo = true }) {
      if (!salaActual?.id) throw new Error("No hay una sala activa.");
      if(raiz.GameWallet)await raiz.GameWallet.sync();
      enviarTrajes();
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
      if (roomId) salasAbandonadas.add(roomId);
      await detenerCanal();
      salaActual = null;
      partidaActual = null;
      recordarSala(null);
      ultimaSalaInvitada = null;
      salaInvitadaPendiente = null;
      emitir(null);
      emitirPartida(null);
      if (!roomId) return;

      const { error } = await cliente.rpc("leave_versus_room", { p_room_id: roomId });
      if (error) {
        salasAbandonadas.delete(roomId);
        throw traducirError(error, "No pudimos abandonar la sala.");
      }
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
      suscriptor(estadoSocial, usuarioActual, errorEstadoSocial, esCuentaPermanente());
      return () => suscriptoresSocial.delete(suscriptor);
    }

    function suscribirInvitacionesAceptadas(suscriptor) {
      suscriptoresInvitacionAceptada.add(suscriptor);
      if (salaInvitadaPendiente?.usuario === usuarioId && salaInvitadaPendiente.sala.id === salaActual?.id) {
        salaInvitadaPendiente = null;
        if (["complete", "preparing", "playing"].includes(salaActual.estado)) suscriptor(salaActual);
      }
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
      // Confirmation in another browser must refresh this UUID rather than create a guest.
      confirmacionCorreoPendiente = true;
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
      "upsert_versus_profile", { p_alias: raiz.VersusRoom.validarAlias(alias) }, "No pudimos guardar tu perfil.",
    );
    const enviarSolicitudAmistad = (codigo) => ejecutarRpcSocial(
      "send_versus_friend_request", { p_friend_code: codigo }, "No pudimos enviar la solicitud.",
    );
    const responderSolicitudAmistad = (id, aceptar) => ejecutarRpcSocial(
      "respond_versus_friend_request",
      { p_friendship_id: id, p_accept: aceptar },
      "No pudimos responder la solicitud.",
    );
    const cancelarSolicitudAmistad = (id) => ejecutarRpcSocial(
      "respond_versus_friend_request", {p_friendship_id:id,p_accept:false}, "No pudimos responder la solicitud.",
    );
    const eliminarAmigo = (id) => ejecutarRpcSocial(
      "remove_versus_friend", { p_friendship_id: id }, "No pudimos quitar al amigo.",
    );
    const enviarInvitacion = (id) => ejecutarRpcSocial(
      "send_versus_invite_localized", { p_friend_id: id, p_language: raiz.I18n?.language || "es" }, "No pudimos enviar el desafío.",
    );
    const cancelarInvitacion = (id) => ejecutarRpcSocial(
      "cancel_versus_invite", { p_invite_id: id }, "No pudimos cancelar el desafío.",
    );
    async function responderInvitacion(id, aceptar) {
      const sala = await ejecutarRpcSocial(
        "respond_versus_invite_localized",
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

    async function enviarMensajeRapido(mensaje) {
      if (!salaActual?.id) throw new Error("No hay una sala activa.");
      const roomId = salaActual.id;
      const { error } = await cliente.rpc("send_versus_quick_message", {
        p_room_id: roomId, p_message_key: mensaje,
      });
      if (error) throw traducirError(error, "No pudimos enviar el mensaje. Intentá de nuevo.");
      if (salaActual?.id === roomId) await recargarSala();
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

    function destruir() {
      if (cierreEnCurso) return cierreEnCurso;
      eliminado = true; conexionLista = false;
      usuarioId = null; usuarioActual = null; sesionActual = null;
      versionCanalSala += 1;
      salaActual = null; partidaActual = null; estadoSocial = null;
      if (temporizadorSincronizacionAuth) raiz.clearTimeout(temporizadorSincronizacionAuth);
      temporizadorSincronizacionAuth = null;
      suscripcionAuth?.unsubscribe?.(); suscripcionAuth = null;
      raiz.removeEventListener?.('costume-equipped', enviarTrajes);
      raiz.removeEventListener?.('wallet-updated', enviarTrajes);
      raiz.removeEventListener?.('online', sincronizarAlVolver);
      raiz.removeEventListener?.('focus', sincronizarAlVolver);
      raiz.document?.removeEventListener?.('visibilitychange', sincronizarAlVolver);
      suscriptores.clear(); suscriptoresPartida.clear(); suscriptoresSocial.clear(); suscriptoresInvitacionAceptada.clear();
      // Keep this adapter in the client cache until removal settles: a replacement
      // must not overlap an old channel that is still unsubscribing.
      cierreEnCurso = Promise.allSettled([detenerCanalSocial(), detenerCanal()]).then(results => {
        for (const result of results) if (result.status === 'rejected') diagnosticar('cerrar-canales', result.reason);
        if (adaptadores.get(cliente) === adaptador) adaptadores.delete(cliente);
      });
      return cierreEnCurso;
    }

    const adaptador = Object.freeze({
      proveedor: "supabase",
      destruir,
      inicializar,
      crearSala,
      buscarPartida,
      obtenerRanking,
      obtenerRango,
      obtenerPerfilJugador,
      obtenerPerfilPublico,
      guardarApariencia,
      unirseSala,
      actualizarPersonaje,
      guardarDesafio,
      cancelarDesafio,
      pedirRevancha,
      cargarPartida,
      jugarLetra,
      enviarMensajeRapido,
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
      cancelarSolicitudAmistad,
      enviarInvitacion,
      cancelarInvitacion,
      responderInvitacion,
      obtenerSala: () => salaActual,
      obtenerTrajesRival: () => salaActual?.jugadores.some(player=>player.id===propietarioTrajesRival&&player.id!==usuarioId) ? {...trajesRival} : {},
      obtenerPartida: () => partidaActual,
      obtenerUsuarioId: () => usuarioId,
      obtenerUsuario: () => usuarioActual,
      obtenerEstadoSocial: () => estadoSocial,
      esCuentaPermanente,
    });
    adaptadores.set(cliente, adaptador);
    return adaptador;
  }

  raiz.VersusRoomSupabase = Object.freeze({ crearAdaptador });
})(globalThis);
