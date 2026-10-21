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
  const B = ProfileBackgrounds;
  let backgroundBusy=false, backgroundNotice='', previewTouched=false;
  let backgroundAccount=CosmeticStore.read().accountId||null;
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
  creatures.innerHTML = '<span class="perfil-aura"></span><span class="perfil-figura"><img class="perfil-criatura" alt="" decoding="async"><svg class="perfil-poder perfil-espada-fuego" viewBox="0 0 100 150" aria-hidden="true"><path class="perfil-filo-caliente" d="M25 99 Q34 121 56 131" fill="none" stroke="#ffb52e" stroke-width="5" stroke-linecap="round"/><g class="perfil-llamarada"><path d="M25 99 C19 105 31 108 26 115 C34 111 33 124 41 126 C38 119 52 131 56 131 C43 118 44 111 39 107 C40 116 32 108 33 101 C28 106 29 100 25 99Z" fill="#ff690c"/><path d="M26 101 Q29 118 55 131 Q38 117 33 111 Q31 118 26 101Z" fill="#fff0a4"/></g><g class="perfil-chispas-espada" fill="#ffd168"><circle cx="29" cy="108" r="1.4"/><circle cx="35" cy="119" r="1"/><circle cx="42" cy="123" r="1.2"/></g></svg><svg class="perfil-poder perfil-ventisca" viewBox="0 0 150 100" aria-hidden="true"><defs><linearGradient id="perfil-aliento-hielo"><stop stop-color="#a4e6ff" stop-opacity="0"/><stop offset=".65" stop-color="#c6f4ff" stop-opacity=".7"/><stop offset="1" stop-color="#fff"/></linearGradient></defs><g class="perfil-chorro-hielo"><path d="M44 52 C20 44 0 42 -33 47 L-45 65 C-13 79 12 68 44 55Z" fill="url(#perfil-aliento-hielo)"/><path d="M44 53 Q10 45 -33 54 M44 54 Q8 57 -40 66 M40 55 Q14 65 -22 69" fill="none" stroke="#d5f8ff" stroke-width="1.1" stroke-linecap="round"/></g><g class="perfil-cristales-aliento" fill="#e2faff"><path d="M12 49 l3 4 -3 4 -3 -4Z M-9 59 l3 4 -3 4 -3 -4Z M-29 48 l2 3 -2 3 -2 -3Z"/></g></svg><svg class="perfil-poder perfil-viento-nimbus" viewBox="0 0 100 150" aria-hidden="true"><g class="perfil-remolino-nimbus"><path d="M5 74 C19 67 43 69 45 77 C45 86 34 85 34 94 C34 101 23 103 24 113 C14 109 19 98 13 94 C7 90 13 84 5 74Z" fill="#9ceeff" fill-opacity=".2"/><g class="perfil-anillos-viento" fill="none" stroke="#c8faff" stroke-width="2" stroke-linecap="round"><path d="M6 77 C12 67 49 68 45 78 C43 85 4 85 7 77 M11 88 C19 82 38 84 37 90 C36 96 12 96 14 90 M18 101 C23 97 30 99 29 103 C28 108 20 109 24 113"/><path d="M9 74 Q27 67 42 76 M16 89 Q28 86 34 91" stroke="#fff" stroke-width="1"/></g></g><g class="perfil-rafaga-nimbus" fill="none" stroke="#b8f5ff" stroke-width="1.4" stroke-linecap="round"><path d="M13 80 C-2 71 -22 79 -26 71 M18 96 C0 105 -15 90 -31 100 M10 88 C-8 82 -24 94 -35 87"/></g></svg></span>';
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
    button.addEventListener('click', () => { previewTouched=true; preview = background.id; backgroundNotice=''; renderBackground(); });
    picker.append(button); return button;
  });
  header.after(picker);
  const backgroundActions=document.createElement('div');backgroundActions.className='perfil-fondos-acciones';
  const backgroundBalance=document.createElement('p'), backgroundStatus=document.createElement('p');
  backgroundStatus.setAttribute('role','status');backgroundStatus.setAttribute('aria-live','polite');
  const buyBackground=document.createElement('button'), equipBackground=document.createElement('button');
  buyBackground.type=equipBackground.type='button';buyBackground.id='comprarFondoPerfil';equipBackground.id='equiparFondoPerfil';
  backgroundActions.append(backgroundBalance,backgroundStatus,buyBackground,equipBackground);picker.after(backgroundActions);
  buyBackground.addEventListener('click',()=>void actBackground('purchase'));
  equipBackground.addEventListener('click',()=>void actBackground('equip'));
  let preview = B.read().equipped;
  async function actBackground(action){
    if(backgroundBusy)return;const id=preview;backgroundBusy=true;backgroundNotice='';renderBackground();
    try{
      if(!CosmeticStore.read().accountId)await globalThis.AventuraShop?.connect();
      await B[action](id);preview=id;backgroundNotice=B.text(action==='purchase'?'purchased':'success');
    }catch(error){backgroundNotice=error.message||B.text('failed');}
    finally{backgroundBusy=false;renderBackground();}
  }
  function renderBackground() {
    const inventory=B.read(), selected=B.catalog.find(item=>item.id===preview), owned=inventory.owned.includes(preview);
    note.textContent=B.text('title');picker.setAttribute('aria-label',note.textContent);
    buttons.forEach((button,i)=>{const id=backgrounds[i].id,has=inventory.owned.includes(id);const name=document.createElement('span'),detail=document.createElement('small');name.textContent=B.name(id);detail.textContent=inventory.equipped===id?B.text('equipped'):has?B.text('owned'):B.requirement(id);button.replaceChildren(name,detail);button.dataset.owned=String(has);button.disabled=backgroundBusy;button.setAttribute('aria-pressed',String(preview===id));});
    backgroundBalance.textContent=B.text('balance',{n:CosmeticStore.read().coins});
    backgroundStatus.textContent=backgroundNotice||(!owned?B.text('locked',{requirement:B.requirement(preview)}):B.text('hint'));
    buyBackground.hidden=owned||!selected.price;buyBackground.disabled=backgroundBusy||Boolean(globalThis.AventuraShop?.testing());buyBackground.textContent=B.text('buy',{n:selected.price});
    equipBackground.disabled=backgroundBusy||!owned||inventory.equipped===preview||Boolean(globalThis.AventuraShop?.testing());equipBackground.textContent=B.text(inventory.equipped===preview?'equipped':'equip');
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
  window.addEventListener('profile-backgrounds-updated',renderBackground);
  window.addEventListener('wallet-updated',()=>{const account=CosmeticStore.read().accountId||null;if(account!==backgroundAccount){backgroundAccount=account;previewTouched=false;preview=B.read().equipped;}renderBackground();});
  window.addEventListener('storage',event=>{if(event.key?.startsWith('aventuraFondosV1:account:')){preview=B.read().equipped;renderBackground();}});
  globalThis.ProfileBackgroundsUI=Object.freeze({preview:id=>{if(!B.catalog.some(item=>item.id===id))return;el('btnMiAvatar').click();previewTouched=true;preview=id;renderBackground();}});
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
      if(!globalThis.AventuraShop?.testing())void B.sync().then(()=>{if(!previewTouched)preview=B.read().equipped;renderBackground();}).catch(()=>{if(dialog.open){backgroundNotice=B.text('connect');renderBackground();}});
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
    previewTouched=false;preview=B.read().equipped;backgroundNotice='';renderBackground();
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
