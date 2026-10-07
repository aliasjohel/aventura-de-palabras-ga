(() => {
  "use strict";
  const key = "aventuraPalabrasIdentidadV1";
  const U=GameUI, K=U.key;
  const avatars = [
    ["explorador", K("characters.avatars.explorador")], ["mago", K("characters.avatars.mago")],
    ["guardian-alba", K("characters.avatars.guardian-alba")], ["t-shadow", K("characters.avatars.t-shadow")],
    ["kalamo", K("characters.avatars.kalamo")], ["dragon", K("characters.avatars.dragon")],
    ["dragon-hielo", K("characters.avatars.dragon-hielo")], ["hombre-lobo", K("characters.avatars.hombre-lobo")],
    ["azrak", K("characters.avatars.azrak")],
  ];
  const frames = AvatarRewards.catalog.map(frame=>[frame.id,K('profile.frames.'+frame.id)]);
  const rewardKey='aventuraMarcosDesbloqueadosV1';
  const unlocked=new Set(['clasico']);
  function readRewards(){
    try { const ids=JSON.parse(localStorage.getItem(rewardKey));if(Array.isArray(ids))ids.forEach(id=>{if(frames.some(([known])=>known===id))unlocked.add(id);}); }catch(_){}
  }
  function updateRewards(progress,points=0){
    readRewards();
    if(!progress){try{progress=JSON.parse(localStorage.getItem('progresoAventuraGA'))||{};}catch(_){progress={};}}
    const added=AvatarRewards.earned(progress,points).filter(id=>!unlocked.has(id));
    added.forEach(id=>unlocked.add(id));
    try{localStorage.setItem(rewardKey,JSON.stringify([...unlocked]));}catch(_){}
    renderPreview();
    return added;
  }
  readRewards();
  const defaults = { avatar: "explorador", frame: "clasico" };
  function normalize(value) {
    return {
      avatar: avatars.some(([id]) => id === value?.avatar) ? value.avatar : defaults.avatar,
      frame: frames.some(([id]) => id === value?.frame) ? value.frame : defaults.frame,
    };
  }
  let saved = { ...defaults };
  try { saved = normalize(JSON.parse(localStorage.getItem(key))); } catch (_) { /* Invalid or unavailable storage uses defaults. */ }
  // Preserve a frame already equipped before rewards were introduced.
  if(['clasico','bosque','hielo','fuego','arcano','real'].includes(saved.frame))unlocked.add(saved.frame);
  let draft = { ...saved };
  const el = (id) => document.getElementById(id);
  const dialog = el("editorAvatar");
  function portrait(avatar, frame) {
    const badge = document.createElement("span");
    badge.className = `player-avatar frame-${frame}`;
    const img = document.createElement("img");
    const face = document.createElement("span");
    face.className = "player-avatar-portrait";
    img.src = `assets/images/personajes/versus/${avatar}-base.png`;
    img.alt = "";
    face.append(img);
    const ranked=AvatarRewards.catalog.find(item=>item.id===frame)?.rank;
    const ornament = document.createElement(ranked?"span":"img");
    ornament.className = "player-avatar-frame";
    if(ranked){ornament.classList.add('rank-frame');ornament.dataset.symbol={bronce:'★',plata:'✦',oro:'★',platino:'✧',diamante:'◆',leyenda:'♛'}[frame];}
    else ornament.src = `assets/images/perfil/marco-${frame}-v1.png`;
    ornament.alt = "";
    ornament.setAttribute("aria-hidden", "true");
    badge.append(face, ornament);
    return badge;
  }
  function renderMenu() {
    el("avatarMenu").replaceChildren(portrait(saved.avatar, saved.frame));
  }
  // Shared by the room adapter and multiplayer UI. Only catalog IDs reach the DOM.
  globalThis.PlayerAvatar = Object.freeze({
    desbloquear:updateRewards,
    nombreMarco:id=>U.resolve(K('profile.frames.'+id)),
    obtener: () => {
      try { return normalize(JSON.parse(localStorage.getItem(key))); }
      catch (_) { return { ...saved }; }
    },
    normalizar: normalize,
    crear: (value) => {
      const identity = normalize(value);
      return portrait(identity.avatar, identity.frame);
    },
  });
  function renderPreview() {
    el("avatarPreview").replaceChildren(portrait(draft.avatar, draft.frame));
    GameUI.text(el("avatarDescripcion"), GameUI.key('profile.appearance', {avatar:avatars.find(([id]) => id === draft.avatar)[1],frame:frames.find(([id]) => id === draft.frame)[1]}));
    dialog.querySelectorAll("[data-choice]").forEach((button) => {
      const selected = draft[button.dataset.choice] === button.dataset.value;
      button.setAttribute("aria-pressed", String(selected));
      if(button.dataset.choice==='frame'){
        const owned=unlocked.has(button.dataset.value),reward=AvatarRewards.catalog.find(frame=>frame.id===button.dataset.value);
        button.disabled=!owned;
        U.text(button.querySelector('small'),owned?K('profile.rewards.unlocked'):reward.world?K('profile.rewards.world',{world:reward.world}):K('profile.rewards.rank',{rank:K('profile.frames.'+reward.id)}));
      }
    });
  }
  let profileRequest = 0;
  async function loadProfile() {
    const request = ++profileRequest;
    GameUI.text(el("perfilNombre"), GameUI.key('profile.adventurer'));
    GameUI.text(el("perfilId"), GameUI.key('profile.connecting'));
    GameUI.text(el("perfilEstado"), GameUI.key('profile.loadingHistory'));
    el("perfilRanking").textContent = "";
    el("rangoPerfilPropio").replaceChildren();
    el("perfilFavoritos").replaceChildren();
    el("reintentarPerfil").hidden = true;
    ["Jugadas", "Victorias", "Derrotas", "Empates"].forEach(key => { el(`perfil${key}`).textContent = "—"; });
    try {
      const profile = await globalThis.PlayerProfile.cargar();
      if (request !== profileRequest || !dialog.open) return;
      updateRewards(null,profile.points);
      U.text(el("perfilNombre"), profile.aliasIsFallback ? K("profile.adventurer") : profile.alias || K("profile.adventurer"));
      U.text(el("perfilId"), profile.friend_code || K("profile.friendCodeHelp"));
      for (const [id, key] of [["Jugadas", "played"], ["Victorias", "wins"], ["Derrotas", "losses"], ["Empates", "draws"]]) {
        el(`perfil${id}`).textContent = String(profile[key] || 0);
      }
      U.text(el("perfilEstado"), K(profile.guest?"profile.guest":"profile.linked"));
      GameUI.text(el("perfilRanking"), GameUI.key('profile.ranking', {points:profile.points||0,played:profile.ranked_played||0}));
      el("rangoPerfilPropio").replaceChildren(U.rankBadge(profile.points, true));
      for (const favorite of profile.favorites || []) {
        const card = document.createElement("div");
        const name = document.createElement("strong");
        name.textContent = globalThis.PlayerProfile.nombrePersonaje(favorite.character);
        const detail = document.createElement("span");
        GameUI.text(detail, GameUI.key('profile.favoriteStats', {played:favorite.played,wins:favorite.wins}));
        card.append(name, detail);
        el("perfilFavoritos").append(card);
      }
      if (!profile.favorites?.length) GameUI.text(el("perfilFavoritos"), GameUI.key('profile.noFavorites'));
      if (profile.legacy_played) {
        const note = document.createElement("small");
        GameUI.text(note, GameUI.key('profile.legacy'));
        el("perfilFavoritos").append(note);
      }
    } catch (_) {
      if (request !== profileRequest || !dialog.open) return;
      GameUI.text(el("perfilId"), GameUI.key('profile.offline'));
      GameUI.text(el("perfilEstado"), GameUI.key('errors.profileLoad'));
      el("reintentarPerfil").hidden = false;
    }
  }
  el("reintentarPerfil").addEventListener("click", () => { void loadProfile(); });
  dialog.addEventListener("close", () => { profileRequest += 1; });
  function choices(container, entries, property) {
    entries.forEach(([id, label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.choice = property;
      button.dataset.value = id;
      button.className = "avatar-choice";
      U.attribute(button,"aria-label",label);
      button.append(portrait(property === "avatar" ? id : "explorador", property === "frame" ? id : "clasico"));
      const name = document.createElement("span");
      U.text(name,label);
      button.append(name);
      if(property==='frame')button.append(document.createElement('small'));
      button.addEventListener("click", () => {
        if(property==='frame'&&!unlocked.has(id))return;
        draft[property] = id;
        el("estadoAvatar").textContent = "";
        renderPreview();
      });
      el(container).append(button);
    });
  }
  choices("opcionesAvatar", avatars, "avatar");
  choices("opcionesMarco", frames, "frame");
  el("btnMiAvatar").addEventListener("click", () => {
    updateRewards();
    draft = { ...saved };
    el("estadoAvatar").textContent = "";
    renderPreview();
    dialog.showModal();
    void loadProfile();
  });
  ["cerrarAvatar", "cancelarAvatar"].forEach((id) => el(id).addEventListener("click", () => dialog.close()));
  el("guardarAvatar").addEventListener("click", () => {
    if(!unlocked.has(draft.frame))return;
    try { localStorage.setItem(key, JSON.stringify(draft)); }
    catch (_) {
      GameUI.text(el("estadoAvatar"), GameUI.key('errors.avatarSave'));
      return;
    }
    saved = { ...draft };
    window.dispatchEvent(new CustomEvent("player-appearance-saved", { detail: { source: "profile" } }));
    renderMenu();
    dialog.close();
  });
  renderMenu();
  window.addEventListener('storage',event=>{if(event.key==='progresoAventuraGA'||event.key===rewardKey)updateRewards();});
  updateRewards();
})();
