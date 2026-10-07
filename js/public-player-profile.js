(() => {
  "use strict";
  const el = id => document.getElementById(id);
  const U=GameUI, K=U.key;
  const dialog = el("perfilPublico");
  let generation = 0;
  let currentId = null;
  let offset = 0;
  let nextOffset = 0;
  let history = [];
  let loading = false;
  function text(tag, value) { const node = document.createElement(tag); U.text(node,value); return node; }
  function render(profile, append) {
    currentId = profile.id;
    if (!append) {
      U.text(el("nombrePerfilPublico"), VersusRoom.aliasVisible(profile.alias) || K("profile.adventurer"));
      el("avatarPerfilPublico").replaceChildren(PlayerAvatar.crear(profile));
      const frames = new Set(AvatarRewards.catalog.map(frame=>frame.id));
      GameUI.text(el("aparienciaPerfilPublico"), GameUI.key('profile.frame', {frame:K("profile.frames."+(frames.has(profile.frame)?profile.frame:"clasico"))}));
      GameUI.text(el("rankingPerfilPublico"), GameUI.key('profile.publicRanking', {position:profile.position?K("profile.position",{position:profile.position}):K("profile.noPosition"),points:profile.points||0}));
      el("rangoPerfilPublico").replaceChildren(U.rankBadge(profile.points, true));
      el("estadisticasPerfilPublico").replaceChildren();
      for (const [key,label] of [["played",K("profile.played")],["wins",K("profile.wins")],["losses",K("profile.losses")],["draws",K("profile.draws")]]) {
        const tile = document.createElement("div"); tile.append(text("dd",profile[key] || 0),text("dt",label)); el("estadisticasPerfilPublico").append(tile);
      }
      const trophies = el("trofeosPerfilPublico"); trophies.replaceChildren();
      for (const needed of [1,10,50,100]) {
        if (profile.wins >= needed) trophies.append(text("span",needed===1?K("profile.firstWin"):K("profile.winTrophy",{wins:needed})));
      }
      if (!trophies.children.length) trophies.append(text("p",K("profile.noTrophies")));
      const favorite = el("favoritoPerfilPublico"); favorite.replaceChildren();
      const first = profile.favorites?.[0];
      if (first) {
        const portrait = document.createElement("img"); portrait.src = PlayerProfile.imagenPersonaje(first.character); portrait.alt = PlayerProfile.nombrePersonaje(first.character);
        const detail = document.createElement("div"); detail.append(text("strong",portrait.alt),text("p",K("profile.favoriteStats",{played:first.played,wins:first.wins}))); favorite.append(portrait,detail);
      } else favorite.append(text("p",K("profile.noCharacterMatches")));
      el("partidasPerfilPublico").replaceChildren();
    }
    const matches = el("partidasPerfilPublico");
    for (const match of profile.recent || []) {
      const row = document.createElement("article");
      const outcome = K(match.win?"profile.win":match.draw?"profile.draw":"profile.loss");
      row.dataset.resultado = match.win ? "victoria" : match.draw ? "empate" : "derrota";
      const info = document.createElement("div"); info.append(text("strong",outcome));
      const date = match.finished_at ? {i18nDate:match.finished_at} : K("profile.previousMatch");
      info.append(text("small",K("profile.matchDetail",{date,mode:K(match.ranked?"profile.ranked":"profile.classic")})));
      const rival = document.createElement("button"); rival.type = "button"; rival.className = "enlace-perfil-jugador";
      GameUI.text(rival, GameUI.key('profile.rivalLink', {alias:VersusRoom.aliasVisible(match.opponent_alias)||K("profile.unavailableRival"),arrow:match.opponent_id?" ›":""}));
      rival.disabled = !match.opponent_id;
      U.attribute(rival,"aria-label",K("profile.viewAlias",{alias:VersusRoom.aliasVisible(match.opponent_alias)||K("profile.rival")}));
      rival.addEventListener("click",()=>abrir(match.opponent_id,true)); row.append(info,rival); matches.append(row);
    }
    if (!matches.children.length) matches.append(text("p",K("profile.noMatches")));
    el("masPartidasPerfil").hidden = !profile.has_more;
    el("contenidoPerfilPublico").hidden = false;
  }
  async function load(append = false) {
    const request = ++generation;
    loading = true;
    el("masPartidasPerfil").disabled = true;
    el("reintentarPerfilPublico").hidden = true;
    U.text(el("estadoPerfilPublico"),K(append?"profile.loadingMore":"profile.loading"));
    if (!append) el("contenidoPerfilPublico").hidden = true;
    try {
      const profile = await PlayerProfile.cargarPublico(currentId,append ? nextOffset : 0);
      if (request !== generation || !dialog.open) return;
      render(profile,append);
      offset = append ? nextOffset : 0; nextOffset = offset + 20;
      el("estadoPerfilPublico").textContent = "";
    } catch (error) {
      if (request !== generation || !dialog.open) return;
      U.text(el("estadoPerfilPublico"),U.error(error,"errors.publicProfile"));
      el("reintentarPerfilPublico").hidden = false;
      el("reintentarPerfilPublico").dataset.append = String(append);
    } finally {
      if (request === generation) { loading = false; el("masPartidasPerfil").disabled = false; }
    }
  }
  function abrir(id = null, nested = false) {
    if (nested && currentId) history.push(currentId); else history = [];
    currentId = id; offset = 0; nextOffset = 0;
    GameUI.text(el("nombrePerfilPublico"), GameUI.key('profile.title'));
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
    try { await PlayerProfile.guardarApariencia(); if (status) U.text(status,K("profile.appearanceShared")); }
    catch (_) { if (status) U.text(status,K("profile.appearanceLocal")); }
  }
  window.addEventListener("player-appearance-saved", event => { void shareAppearance(el(event.detail.source === "shop" ? "tiendaEstado" : "estadoAvatar")); });
  window.addEventListener("online",()=>{ if(localStorage.getItem("aventuraPalabrasIdentidadV1")) void shareAppearance(); });
})();
