(() => {
  "use strict";
  const key = "aventuraPalabrasIdentidadV1";
  const avatars = [
    ["explorador", "Explorador"], ["mago", "Mago"],
    ["guardian-alba", "Guardián del Alba"], ["t-shadow", "T. Shadow"],
    ["kalamo", "Cálamo"], ["dragon", "Dragón"],
    ["dragon-hielo", "Dragón de hielo"], ["hombre-lobo", "Hombre lobo"],
    ["azrak", "Azrak"],
  ];
  const frames = [["clasico", "Clásico"], ["bosque", "Bosque"], ["hielo", "Hielo"], ["fuego", "Fuego"], ["arcano", "Arcano"], ["real", "Real"]];
  const defaults = { avatar: "explorador", frame: "clasico" };
  function normalize(value) {
    return {
      avatar: avatars.some(([id]) => id === value?.avatar) ? value.avatar : defaults.avatar,
      frame: frames.some(([id]) => id === value?.frame) ? value.frame : defaults.frame,
    };
  }
  let saved = { ...defaults };
  try { saved = normalize(JSON.parse(localStorage.getItem(key))); } catch (_) { /* Invalid or unavailable storage uses defaults. */ }
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
    const ornament = document.createElement("img");
    ornament.className = "player-avatar-frame";
    ornament.src = `assets/images/perfil/marco-${frame}-v1.png`;
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
    el("avatarDescripcion").textContent = `${avatars.find(([id]) => id === draft.avatar)[1]} · Marco ${frames.find(([id]) => id === draft.frame)[1]}`;
    dialog.querySelectorAll("[data-choice]").forEach((button) => {
      const selected = draft[button.dataset.choice] === button.dataset.value;
      button.setAttribute("aria-pressed", String(selected));
    });
  }
  let profileRequest = 0;
  async function loadProfile() {
    const request = ++profileRequest;
    el("perfilNombre").textContent = "Aventurero";
    el("perfilId").textContent = "Conectando…";
    el("perfilEstado").textContent = "Cargando tu historial…";
    el("perfilRanking").textContent = "";
    el("perfilFavoritos").replaceChildren();
    el("reintentarPerfil").hidden = true;
    ["Jugadas", "Victorias", "Derrotas", "Empates"].forEach(key => { el(`perfil${key}`).textContent = "—"; });
    try {
      const profile = await globalThis.PlayerProfile.cargar();
      if (request !== profileRequest || !dialog.open) return;
      el("perfilNombre").textContent = profile.alias || "Aventurero";
      el("perfilId").textContent = profile.friend_code || profile.id;
      for (const [id, key] of [["Jugadas", "played"], ["Victorias", "wins"], ["Derrotas", "losses"], ["Empates", "draws"]]) {
        el(`perfil${id}`).textContent = String(profile[key] || 0);
      }
      el("perfilEstado").textContent = profile.guest
        ? "Perfil de invitado. Vinculá tu cuenta desde Multijugador para conservar el historial al cambiar de dispositivo."
        : "Tu historial está vinculado a tu cuenta.";
      el("perfilRanking").textContent = `${profile.points || 0} puntos de ranking · ${profile.ranked_played || 0} partidas públicas`;
      for (const favorite of profile.favorites || []) {
        const card = document.createElement("div");
        const name = document.createElement("strong");
        name.textContent = globalThis.PlayerProfile.nombrePersonaje(favorite.character);
        const detail = document.createElement("span");
        detail.textContent = `${favorite.played} partidas · ${favorite.wins} victorias`;
        card.append(name, detail);
        el("perfilFavoritos").append(card);
      }
      if (!profile.favorites?.length) el("perfilFavoritos").textContent = "Jugá una partida multijugador para descubrir tus favoritos.";
      if (profile.legacy_played) {
        const note = document.createElement("small");
        note.textContent = "Tus resultados anteriores cuentan; sus personajes no quedaron registrados.";
        el("perfilFavoritos").append(note);
      }
    } catch (_) {
      if (request !== profileRequest || !dialog.open) return;
      el("perfilId").textContent = "Sin conexión";
      el("perfilEstado").textContent = "No pudimos cargar tu perfil. Podés elegir tu apariencia y reintentar la conexión.";
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
      button.setAttribute("aria-label", label);
      button.append(portrait(property === "avatar" ? id : "explorador", property === "frame" ? id : "clasico"));
      const name = document.createElement("span");
      name.textContent = label;
      button.append(name);
      button.addEventListener("click", () => {
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
    draft = { ...saved };
    el("estadoAvatar").textContent = "";
    renderPreview();
    dialog.showModal();
    void loadProfile();
  });
  ["cerrarAvatar", "cancelarAvatar"].forEach((id) => el(id).addEventListener("click", () => dialog.close()));
  el("guardarAvatar").addEventListener("click", () => {
    try { localStorage.setItem(key, JSON.stringify(draft)); }
    catch (_) {
      el("estadoAvatar").textContent = "No pudimos guardar tu avatar. Revisá que el navegador permita guardar datos y volvé a intentar.";
      return;
    }
    saved = { ...draft };
    renderMenu();
    dialog.close();
  });
  renderMenu();
})();
