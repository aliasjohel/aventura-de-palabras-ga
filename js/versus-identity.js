(() => {
  "use strict";
  const stickers = VersusStickers.catalog;
  const el = (id) => document.getElementById(id);
  const control = el("chatRapidoVersus");
  const panel = el("panelMensajesVersus");
  const abrir = el("abrirMensajesVersus");
  const estado = el("estadoMensajesVersus");
  let contexto = null;
  let salaId = null;
  let partidaId = null;
  let generacion = 0;
  let enviando = false;
  let disponibleEn = 0;
  let reloj = null;
  let silenciado = false;
  const vistos = new Map();
  const temporizadores = new Map();
  try { silenciado = localStorage.getItem("aventuraMensajesSilenciados") === "true"; } catch (_) { /* Optional preference. */ }

  function cerrarPanel() {
    if (panel.hidePopover && panel.matches(':popover-open')) panel.hidePopover();
    panel.hidden = true;
    abrir.setAttribute("aria-expanded", "false");
  }
  function limpiarGlobos() {
    temporizadores.forEach(clearTimeout);
    temporizadores.clear();
    ["Propio", "Rival"].forEach((lado) => { const globo=el(`mensajeDuelo${lado}`); globo.hidden = true; globo.replaceChildren(); });
  }
  function mostrarMensaje(jugador, propio) {
    const id = jugador.mensajeRapido;
    if (!Object.hasOwn(stickers, id) || (!propio && silenciado)) return;
    const lado = propio ? "Propio" : "Rival";
    const globo = el(`mensajeDuelo${lado}`);
    clearTimeout(temporizadores.get(lado));
    const alias = document.createElement('span'); alias.className = 'sticker-alias';
    GameUI.text(alias, propio ? GameUI.key('multiplayer.stickers.you') : jugador.alias);
    globo.replaceChildren(alias, VersusStickers.create(id));
    globo.hidden = false;
    temporizadores.set(lado, setTimeout(() => { globo.hidden = true; globo.replaceChildren(); temporizadores.delete(lado); }, 4000));
  }
  function actualizarBotones() {
    const segundos = Math.max(0, Math.ceil((disponibleEn - Date.now()) / 1000));
    el("opcionesMensajesVersus").querySelectorAll("button").forEach((boton) => {
      boton.disabled = enviando || segundos > 0 || !contexto?.activo;
    });
    GameUI.text(abrir, GameUI.key(enviando ? 'multiplayer.stickers.sending' : segundos ? 'multiplayer.stickers.cooldown' : 'multiplayer.stickers.open', {seconds: segundos}));
    if (!enviando && segundos === 0) { clearInterval(reloj); reloj = null; }
  }
  async function enviar(id) {
    if (!Object.hasOwn(stickers, id) || !contexto?.activo || enviando || Date.now() < disponibleEn) return;
    const turno = generacion;
    const enviarRemoto = contexto.enviar;
    enviando = true;
    estado.textContent = "";
    actualizarBotones();
    try {
      await enviarRemoto(id);
      if (turno !== generacion) return;
      disponibleEn = Date.now() + 5000;
      cerrarPanel();
      abrir.focus({ preventScroll: true });
    } catch (error) {
      if (turno === generacion) { console.warn('Sticker send failed', OnlineUI.error(error)); GameUI.text(estado, GameUI.key('multiplayer.stickers.sendError')); }
    } finally {
      if (turno === generacion) {
        enviando = false;
        actualizarBotones();
        if (disponibleEn > Date.now() && !reloj) reloj = setInterval(actualizarBotones, 250);
      }
    }
  }
  Object.entries(stickers).forEach(([id, sticker]) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.dataset.mensaje = id;
    GameUI.attribute(boton, 'aria-label', GameUI.key(sticker.label));
    const label = document.createElement('span'); label.className = 'sticker-option-label';
    GameUI.text(label, GameUI.key(sticker.label));
    boton.append(VersusStickers.create(id, true), label);
    boton.addEventListener("click", () => { void enviar(id); });
    el("opcionesMensajesVersus").append(boton);
  });
  abrir.addEventListener("click", () => {
    if (!panel.hidden) { cerrarPanel(); return; }
    panel.hidden = false;
    panel.showPopover?.();
    abrir.setAttribute("aria-expanded", "true");
    el('opcionesMensajesVersus').querySelector('button:not(:disabled)')?.focus({preventScroll:true});
  });
  document.addEventListener("pointerdown", (event) => { if (!control.contains(event.target)) cerrarPanel(); });
  control.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { cerrarPanel(); abrir.focus(); event.stopPropagation(); }
  });
  function actualizarSilencio() {
    el("silenciarMensajesVersus").setAttribute("aria-pressed", String(silenciado));
    GameUI.text(el("silenciarMensajesVersus"), GameUI.key(silenciado ? 'multiplayer.stickers.unmute' : 'multiplayer.stickers.mute'));
  }
  el("silenciarMensajesVersus").addEventListener("click", () => {
    silenciado = !silenciado;
    try { localStorage.setItem("aventuraMensajesSilenciados", String(silenciado)); } catch (_) { /* Still mute for this session. */ }
    if (silenciado) el("mensajeDueloRival").hidden = true;
    actualizarSilencio();
  });
  function actualizar({ sala, usuarioId, enviar, activo, matchId }) {
    if (salaId !== (sala?.id || null) || partidaId !== (matchId || null)) {
      generacion += 1;
      salaId = sala?.id || null;
      partidaId = matchId || null;
      vistos.clear();
      limpiarGlobos();
      cerrarPanel();
      estado.textContent = "";
      enviando = false;
      disponibleEn = 0;
      clearInterval(reloj);
      reloj = null;
    }
    contexto = { activo: Boolean(activo && sala?.jugadores.length === 2 && enviar), enviar };
    control.hidden = !contexto.activo;
    el("marcoVersus").classList.toggle("identidad-online", contexto.activo);
    if (!contexto.activo) { limpiarGlobos(); cerrarPanel(); estado.textContent = ""; }
    for (const lado of ["Propio", "Rival"]) {
      const propio = lado === "Propio";
      const jugador = sala?.jugadores.find((item) => (item.id === usuarioId) === propio);
      const avatar = el(`avatarDuelo${lado}`);
      avatar.hidden = !contexto.activo || !jugador;
      if (jugador && contexto.activo) {
        const identidad = PlayerAvatar.normalizar(jugador.identidad);
        const firma = `${identidad.avatar}:${identidad.frame}`;
        if (avatar.dataset.identidad !== firma) {
          avatar.replaceChildren(PlayerAvatar.crear(identidad));
          avatar.dataset.identidad = firma;
        }
        GameUI.attribute(avatar,"aria-label",OnlineUI.value(`Avatar de ${jugador.alias}`));
        document.querySelector(`.versus-jugador-${propio ? "uno" : "dos"} .versus-etiqueta`).textContent = jugador.alias;
      }
      if (!jugador) continue;
      const fecha = Date.parse(jugador.mensajeEn) || 0;
      const anterior = vistos.get(jugador.id);
      // A fresh connection establishes a baseline; old messages never replay.
      if (anterior !== undefined && fecha > anterior && contexto.activo) mostrarMensaje(jugador, propio);
      vistos.set(jugador.id, Math.max(anterior || 0, fecha));
    }
    actualizarBotones();
  }
  actualizarSilencio();
  globalThis.VersusIdentity = Object.freeze({ actualizar });
})();
