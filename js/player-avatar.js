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
    img.src = `assets/images/personajes/versus/${avatar}-base.png`;
    img.alt = "";
    badge.append(img);
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
