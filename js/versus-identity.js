(() => {
  "use strict";
  const mensajes = Object.freeze({
    buena: "¡Buena jugada! 👏", alcanzo: "¡Ya te alcanzo! ⚡", facil: "Muy fácil 😏",
    preparate: "¡Preparate! 🔥", revancha: "¡Quiero revancha! ⚔️", suerte: "¡Buena suerte! 🍀",
  });
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
    panel.hidden = true;
    abrir.setAttribute("aria-expanded", "false");
  }
  function limpiarGlobos() {
    temporizadores.forEach(clearTimeout);
    temporizadores.clear();
    ["Propio", "Rival"].forEach((lado) => { el(`mensajeDuelo${lado}`).hidden = true; });
  }
  function mostrarMensaje(jugador, propio) {
    const texto = mensajes[jugador.mensajeRapido];
    if (!texto || (!propio && silenciado)) return;
    const lado = propio ? "Propio" : "Rival";
    const globo = el(`mensajeDuelo${lado}`);
    clearTimeout(temporizadores.get(lado));
    globo.textContent = `${propio ? "Vos" : jugador.alias}: ${texto}`;
    globo.hidden = false;
    temporizadores.set(lado, setTimeout(() => { globo.hidden = true; }, 4000));
  }
  function actualizarBotones() {
    const segundos = Math.max(0, Math.ceil((disponibleEn - Date.now()) / 1000));
    el("opcionesMensajesVersus").querySelectorAll("button").forEach((boton) => {
      boton.disabled = enviando || segundos > 0 || !contexto?.activo;
    });
    abrir.textContent = enviando ? "Enviando…" : segundos ? `💬 ${segundos}s` : "💬 Mensajes";
    if (!enviando && segundos === 0) { clearInterval(reloj); reloj = null; }
  }
  async function enviar(id) {
    if (!contexto?.activo || enviando || Date.now() < disponibleEn) return;
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
      if (turno === generacion) estado.textContent = error.message || "No pudimos enviar el mensaje. Intentá de nuevo.";
    } finally {
      if (turno === generacion) {
        enviando = false;
        actualizarBotones();
        if (disponibleEn > Date.now() && !reloj) reloj = setInterval(actualizarBotones, 250);
      }
    }
  }
  Object.entries(mensajes).forEach(([id, texto]) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.dataset.mensaje = id;
    boton.textContent = texto;
    boton.addEventListener("click", () => { void enviar(id); });
    el("opcionesMensajesVersus").append(boton);
  });
  abrir.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    abrir.setAttribute("aria-expanded", String(!panel.hidden));
  });
  document.addEventListener("pointerdown", (event) => { if (!control.contains(event.target)) cerrarPanel(); });
  control.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { cerrarPanel(); abrir.focus(); event.stopPropagation(); }
  });
  function actualizarSilencio() {
    el("silenciarMensajesVersus").setAttribute("aria-pressed", String(silenciado));
    el("silenciarMensajesVersus").textContent = silenciado ? "Activar mensajes del rival" : "Silenciar rival";
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
        avatar.setAttribute("aria-label", `Avatar de ${jugador.alias}`);
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
