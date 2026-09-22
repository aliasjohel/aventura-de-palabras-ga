(() => {
  "use strict";
  const el = id => document.getElementById(id);
  const dialog = el("perfilPublico");
  let generation = 0;
  let currentId = null;
  let offset = 0;
  let nextOffset = 0;
  let history = [];
  let loading = false;
  function text(tag, value) { const node = document.createElement(tag); node.textContent = value; return node; }
  function render(profile, append) {
    currentId = profile.id;
    if (!append) {
      el("nombrePerfilPublico").textContent = VersusRoom.aliasVisible(profile.alias) || "Aventurero";
      el("avatarPerfilPublico").replaceChildren(PlayerAvatar.crear(profile));
      const frames = {clasico:"Clásico",bosque:"Bosque",hielo:"Hielo",fuego:"Fuego",arcano:"Arcano",real:"Real"};
      el("aparienciaPerfilPublico").textContent = `Marco ${frames[profile.frame] || "Clásico"}`;
      el("rankingPerfilPublico").textContent = `${profile.position ? `Puesto #${profile.position}` : "Sin puesto todavía"} · ${profile.points || 0} puntos`;
      el("rangoPerfilPublico").replaceChildren(VersusRanks.badge(profile.points, true));
      el("estadisticasPerfilPublico").replaceChildren();
      for (const [key,label] of [["played","Partidas"],["wins","Victorias"],["losses","Derrotas"],["draws","Empates"]]) {
        const tile = document.createElement("div"); tile.append(text("dd",profile[key] || 0),text("dt",label)); el("estadisticasPerfilPublico").append(tile);
      }
      const trophies = el("trofeosPerfilPublico"); trophies.replaceChildren();
      for (const [needed,label] of [[1,"Primera victoria"],[10,"10 victorias"],[50,"50 victorias"],[100,"100 victorias"]]) {
        if (profile.wins >= needed) trophies.append(text("span",`🏆 ${label}`));
      }
      if (!trophies.children.length) trophies.append(text("p","Su primer trofeo llegará con una victoria."));
      const favorite = el("favoritoPerfilPublico"); favorite.replaceChildren();
      const first = profile.favorites?.[0];
      if (first) {
        const portrait = document.createElement("img"); portrait.src = PlayerProfile.imagenPersonaje(first.character); portrait.alt = PlayerProfile.nombrePersonaje(first.character);
        const detail = document.createElement("div"); detail.append(text("strong",portrait.alt),text("p",`${first.played} partidas · ${first.wins} victorias`)); favorite.append(portrait,detail);
      } else favorite.append(text("p","Todavía no hay partidas con un personaje registrado."));
      el("partidasPerfilPublico").replaceChildren();
    }
    const matches = el("partidasPerfilPublico");
    for (const match of profile.recent || []) {
      const row = document.createElement("article");
      const outcome = match.win ? "Victoria" : match.draw ? "Empate" : "Derrota";
      row.dataset.resultado = match.win ? "victoria" : match.draw ? "empate" : "derrota";
      const info = document.createElement("div"); info.append(text("strong",outcome));
      const date = match.finished_at ? new Date(match.finished_at).toLocaleDateString("es-AR") : "Partida anterior";
      info.append(text("small",`${date} · ${match.ranked ? "Clasificatorio" : "Clásico"}`));
      const rival = document.createElement("button"); rival.type = "button"; rival.className = "enlace-perfil-jugador";
      rival.textContent = `${VersusRoom.aliasVisible(match.opponent_alias) || "Rival no disponible"}${match.opponent_id ? " ›" : ""}`;
      rival.disabled = !match.opponent_id;
      rival.setAttribute("aria-label",`Ver perfil de ${VersusRoom.aliasVisible(match.opponent_alias) || "rival"}`);
      rival.addEventListener("click",()=>abrir(match.opponent_id,true)); row.append(info,rival); matches.append(row);
    }
    if (!matches.children.length) matches.append(text("p","Todavía no tiene partidas terminadas."));
    el("masPartidasPerfil").hidden = !profile.has_more;
    el("contenidoPerfilPublico").hidden = false;
  }
  async function load(append = false) {
    const request = ++generation;
    loading = true;
    el("masPartidasPerfil").disabled = true;
    el("reintentarPerfilPublico").hidden = true;
    el("estadoPerfilPublico").textContent = append ? "Cargando más partidas…" : "Cargando perfil…";
    if (!append) el("contenidoPerfilPublico").hidden = true;
    try {
      const profile = await PlayerProfile.cargarPublico(currentId,append ? nextOffset : 0);
      if (request !== generation || !dialog.open) return;
      render(profile,append);
      offset = append ? nextOffset : 0; nextOffset = offset + 20;
      el("estadoPerfilPublico").textContent = "";
    } catch (error) {
      if (request !== generation || !dialog.open) return;
      el("estadoPerfilPublico").textContent = error.message || "No pudimos cargar este perfil.";
      el("reintentarPerfilPublico").hidden = false;
      el("reintentarPerfilPublico").dataset.append = String(append);
    } finally {
      if (request === generation) { loading = false; el("masPartidasPerfil").disabled = false; }
    }
  }
  function abrir(id = null, nested = false) {
    if (nested && currentId) history.push(currentId); else history = [];
    currentId = id; offset = 0; nextOffset = 0;
    el("nombrePerfilPublico").textContent = "Perfil del jugador";
    el("volverPerfilPublico").hidden = !history.length;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    return load();
  }
  globalThis.PublicPlayerProfile = Object.freeze({abrir});
  el("cerrarPerfilPublico").addEventListener("click",()=>dialog.close());
  dialog.addEventListener("close",()=>{ generation++; loading=false; history=[]; });
  el("volverPerfilPublico").addEventListener("click",()=>{
    currentId=history.pop() || null; el("volverPerfilPublico").hidden=!history.length; nextOffset=0; dialog.scrollTop=0; void load();
  });
  el("masPartidasPerfil").addEventListener("click",()=>{ if (!loading) void load(true); });
  el("reintentarPerfilPublico").addEventListener("click",()=>{ if (!loading) void load(el("reintentarPerfilPublico").dataset.append==="true"); });
  el("verHistorialRivales").addEventListener("click",()=>abrir());
  for (const id of ["verPerfilRival","avatarDueloRival"]) el(id).addEventListener("click",()=>{ const user=el(id).dataset.userId; if(user) void abrir(user); });
  // Local appearance remains usable offline; retry sharing it when connectivity returns.
  async function shareAppearance(status) {
    try { await PlayerProfile.guardarApariencia(); if (status) status.textContent="Apariencia guardada y visible para los demás."; }
    catch (_) { if (status) status.textContent="Guardada en este dispositivo. Se compartirá cuando vuelvas a conectarte."; }
  }
  window.addEventListener("player-appearance-saved", event => { void shareAppearance(el(event.detail.source === "shop" ? "tiendaEstado" : "estadoAvatar")); });
  window.addEventListener("online",()=>{ if(localStorage.getItem("aventuraPalabrasIdentidadV1")) void shareAppearance(); });
})();
