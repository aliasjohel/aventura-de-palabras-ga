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
  const fireflies = document.createElement('span');
  fireflies.className = 'perfil-luciernagas';
  fireflies.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 8; i += 1) {
    const light = document.createElement('i');
    light.style.setProperty('--x', `${8 + (i * 37) % 84}%`);
    light.style.setProperty('--y', `${18 + (i * 23) % 66}%`);
    light.style.setProperty('--delay', `${-i * 1.7}s`);
    light.style.setProperty('--duration', `${6 + i % 4}s`);
    fireflies.append(light);
  }
  dialog.querySelector('.perfil-cabecera').prepend(fireflies);
  // Art previews are separate from owned cosmetics and public identity.
  const header = dialog.querySelector('.perfil-cabecera');
  const backgrounds = [
    {id:'bosque'}, {id:'zafir', character:true}, {id:'desierto'},
    {id:'cumbres', character:true, sprite:'figura-nimbus-v1.webp'},
    {id:'hielo', character:true, sprite:'figura-nivor-v1.webp'},
    {id:'azrak', character:true, sprite:'figura-azrak-v1.webp'}
  ];
  const scene = document.createElement('span');
  scene.className = 'perfil-zafir'; scene.setAttribute('aria-hidden', 'true');
  scene.innerHTML = '<img class="perfil-zafir-personaje" alt="" decoding="async"><span class="perfil-zafir-esfera"></span><span class="perfil-zafir-runas">✧ · ◇ · ✧ · ◇ · ✧ · ◇</span>';
  const creatures = document.createElement('span');
  creatures.className = 'perfil-escena-mundo'; creatures.setAttribute('aria-hidden', 'true'); creatures.hidden = true;
  creatures.innerHTML = '<span class="perfil-aura"></span><span class="perfil-figura"><img class="perfil-criatura" alt="" decoding="async"><svg class="perfil-poder perfil-espada-fuego" viewBox="0 0 100 150" aria-hidden="true"><path class="perfil-filo-caliente" d="M25 99 Q34 121 56 131" fill="none" stroke="#ffb52e" stroke-width="5" stroke-linecap="round"/><g class="perfil-llamarada"><path d="M25 99 C19 105 31 108 26 115 C34 111 33 124 41 126 C38 119 52 131 56 131 C43 118 44 111 39 107 C40 116 32 108 33 101 C28 106 29 100 25 99Z" fill="#ff690c"/><path d="M26 101 Q29 118 55 131 Q38 117 33 111 Q31 118 26 101Z" fill="#fff0a4"/></g><g class="perfil-chispas-espada" fill="#ffd168"><circle cx="29" cy="108" r="1.4"/><circle cx="35" cy="119" r="1"/><circle cx="42" cy="123" r="1.2"/></g></svg><svg class="perfil-poder perfil-ventisca" viewBox="0 0 150 100" aria-hidden="true"><defs><linearGradient id="perfil-aliento-hielo"><stop stop-color="#a4e6ff" stop-opacity="0"/><stop offset=".65" stop-color="#c6f4ff" stop-opacity=".7"/><stop offset="1" stop-color="#fff"/></linearGradient></defs><g class="perfil-chorro-hielo"><path d="M44 52 C20 44 0 42 -33 47 L-45 65 C-13 79 12 68 44 55Z" fill="url(#perfil-aliento-hielo)"/><path d="M44 53 Q10 45 -33 54 M44 54 Q8 57 -40 66 M40 55 Q14 65 -22 69" fill="none" stroke="#d5f8ff" stroke-width="1.1" stroke-linecap="round"/></g><g class="perfil-cristales-aliento" fill="#e2faff"><path d="M12 49 l3 4 -3 4 -3 -4Z M-9 59 l3 4 -3 4 -3 -4Z M-29 48 l2 3 -2 3 -2 -3Z"/></g></svg></span>';
  const creatureImage = creatures.querySelector('.perfil-criatura');
  const particles = document.createElement('span');
  particles.className = 'perfil-particulas'; particles.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 8; i += 1) {
    const particle = document.createElement('i');
    particle.style.setProperty('--x', (8 + i * 37 % 84) + '%');
    particle.style.setProperty('--y', (12 + i * 23 % 76) + '%');
    particle.style.setProperty('--delay', (-i * 1.7) + 's');
    particle.style.setProperty('--duration', (7 + i % 4) + 's');
    particles.append(particle);
  }
  header.prepend(scene, creatures, particles);
  const picker = document.createElement('div'); picker.className = 'perfil-fondos-prueba'; picker.setAttribute('role','group');
  const note = document.createElement('small'); picker.append(note);
  const buttons = backgrounds.map(background => {
    const button = document.createElement('button'); button.type = 'button';
    button.dataset.backgroundChoice = background.id;
    button.addEventListener('click', () => { preview = background.id; renderBackground(); });
    picker.append(button); return button;
  });
  header.after(picker);
  let preview = 'bosque';
  const labels = {
    es: ['Prueba de fondos animados', 'Bosque con luciérnagas', 'Zafir · Invocación arcana', 'Desierto · Arenas del crepúsculo', 'Nimbus · Cumbres celestes', 'Nivor · Aurora de hielo', 'Azrak · Reino del eclipse'],
    en: ['Animated background preview', 'Firefly forest', 'Zafir · Arcane invocation', 'Desert · Twilight sands', 'Nimbus · Celestial peaks', 'Nivor · Frozen aurora', 'Azrak · Eclipse kingdom'],
    'pt-BR': ['Prévia de fundos animados', 'Floresta de vaga-lumes', 'Zafir · Invocação arcana', 'Deserto · Areias do crepúsculo', 'Nimbus · Cumes celestes', 'Nivor · Aurora de gelo', 'Azrak · Reino do eclipse']
  };
  function renderBackground() {
    const text = labels[globalThis.I18n?.language] || labels.es;
    note.textContent = text[0]; picker.setAttribute('aria-label',text[0]);
    buttons.forEach((button,i) => { button.textContent = text[i + 1]; button.setAttribute('aria-pressed',String(preview === backgrounds[i].id)); });
    syncBackgroundSize();
    if (preview === 'zafir' && !scene.firstElementChild.getAttribute('src')) scene.firstElementChild.src = 'assets/images/personajes/versus/mago-ataque.png';
    const entry = backgrounds.find(background => background.id === preview);
    creatures.hidden = !entry.sprite;
    if (entry.sprite) {
      const source = 'assets/images/perfil/' + entry.sprite;
      if (creatureImage.getAttribute('src') !== source) creatureImage.src = source;
    }
  }
  function syncBackgroundSize() {
    // Use the original banner as the size reference, including translated text.
    header.style.removeProperty('min-height');
    header.classList.remove('perfil-fondo-personaje', 'perfil-fondo-zafir', 'perfil-fondo-mundo');
    delete header.dataset.profileBackground;
    const height = header.getBoundingClientRect().height;
    const entry = backgrounds.find(background => background.id === preview);
    header.dataset.profileBackground = preview;
    header.classList.toggle('perfil-fondo-personaje', Boolean(entry.character));
    header.classList.toggle('perfil-fondo-zafir', preview === 'zafir');
    header.classList.toggle('perfil-fondo-mundo', preview !== 'bosque');
    if (height && preview !== 'bosque') header.style.minHeight = height + 'px';
  }
  window.addEventListener('resize', syncBackgroundSize);
  new MutationObserver(syncBackgroundSize).observe(header.querySelector('.perfil-identidad'), {childList:true, subtree:true, characterData:true});
  globalThis.I18n?.subscribe(renderBackground);
  renderBackground();
  function syncProfileMotion() {
    dialog.classList.toggle('perfil-movimiento-pausado', document.hidden || !dialog.open);
    if (dialog.open) syncBackgroundSize();
  }
  document.addEventListener('visibilitychange', syncProfileMotion);
  dialog.addEventListener('close', syncProfileMotion);
  syncProfileMotion();
  function portrait(avatar, frame, miniatura = false) {
    const badge = document.createElement("span");
    badge.className = `player-avatar frame-${frame}`;
    if (avatar) {
      const img = document.createElement("img");img.loading='lazy';img.decoding='async';
      const face = document.createElement("span");
      face.className = "player-avatar-portrait";
      img.src = miniatura ? `assets/images/perfil/miniaturas/${avatar}-base.webp` : `assets/images/personajes/versus/${avatar}-base.png`;
      if (miniatura) {
        img.loading = 'lazy'; img.decoding = 'async'; img.width = 96; img.height = 96;
      }
      img.alt = "";
      face.append(img);
      badge.append(face);
    }
    const ranked=AvatarRewards.catalog.find(item=>item.id===frame)?.rank;
    const ornament = document.createElement("img");ornament.loading='lazy';ornament.decoding='async';
    ornament.className = "player-avatar-frame";
    if(ranked) ornament.classList.add('rank-frame');
    ornament.src = miniatura ? `assets/images/perfil/miniaturas/marco-${frame}-v1.webp` : `assets/images/perfil/marco-${frame}-v1.${ranked ? 'webp' : 'png'}`;
    ornament.decoding = 'async';
    if (miniatura) {
      ornament.loading = 'lazy'; ornament.decoding = 'async'; ornament.width = 96; ornament.height = 96;
    }
    ornament.alt = "";
    ornament.setAttribute("aria-hidden", "true");
    badge.append(ornament);
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
    crear: (value, options = {}) => {
      const identity = normalize(value);
      return portrait(identity.avatar, identity.frame, options.miniatura === true);
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
      button.append(portrait(property === "avatar" ? id : null, property === "frame" ? id : "clasico"));
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
    syncProfileMotion();
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
