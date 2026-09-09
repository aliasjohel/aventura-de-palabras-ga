/* La prueba de Kairós: ilustraciones y lectura independiente del duelo. */
(() => {
  const root = "assets/images/cinematicas/bosque-kairos/";
  const scenes = {
    entrada: [
      { image: "aparicion-v1.png", title: "El tiempo se detiene", text: "Aren termina de recorrer el sendero. De pronto, las hojas quedan suspendidas y un desconocido le cierra el paso. «Soy Kairós. Tu viaje termina acá… si no podés vencerme»." },
      { image: "ataque-v1.png", title: "Un ataque inesperado", text: "Un anillo de energía se lanza hacia Aren. El explorador se protege y toma posición. Kairós sonríe: «Demostrá que podés seguir adelante». ¡Comienza el duelo!" },
    ],
    informe: [
      { image: "informe-sombra-v1.png", title: "Un encargo en secreto", text: "Tras ser vencido, Kairós deja libre el sendero y regresa a un santuario oculto. Frente a una figura en sombras, inclina la cabeza: «Cumplí tu encargo. Puse a prueba al explorador»." },
      { image: "informe-sombra-v1.png", title: "La fuerza de Aren", text: "«Aren me venció. Tiene valor y sabe pensar bajo presión. Creo que podría reunir los cristales». La silueta guarda silencio mientras una luz verde comienza a iluminarla." },
      { image: "guardiana-revelada-v1.png", title: "La Guardiana del Bosque", text: "La luz revela su rostro. «Gracias, Kairós. Hiciste bien en probarlo», responde la Guardiana. «Dejemos que continúe. Cuando llegue a mi santuario, yo misma comprobaré si está preparado»." },
    ],
  };
  let active = null;
  function play(kind, { reduced = false, shots = scenes[kind], assetRoot = root, label = "La prueba de Kairós", heading = "BOSQUE ENCANTADO", onPauseChange = () => {} } = {}) {
    if (active) return active;
    if (!shots) return Promise.resolve();
    active = new Promise(resolve => {
      const previous = document.activeElement;
      const siblings = [...document.body.children].map(el => [el, el.inert]);
      siblings.forEach(([el]) => { el.inert = true; });
      const layer = document.createElement("section");
      layer.className = "kairos-cinema";
      layer.dataset.region = heading;
      layer.setAttribute("role", "dialog");
      layer.setAttribute("aria-modal", "true");
      layer.setAttribute("aria-label", label);
      layer.innerHTML = `<div class="story-cinema-scene"><img class="kairos-cinema-art" alt=""><img class="story-cinema-actor" alt="" hidden></div><div class="kairos-cinema-caption" aria-live="polite"><small></small><h2></h2><p></p></div><nav aria-label="Controles de la cinemática"><button type="button" data-action="pause"></button><button type="button" data-action="next">Siguiente →</button><button type="button" data-action="skip">Saltar</button></nav>`;
      document.body.append(layer);
      let index = 0, paused = reduced, elapsed = 0, last = performance.now(), ended = false;
      const buttons = [...layer.querySelectorAll("button")];
      function render() {
        const shot = shots[index];
        layer.dataset.shot = shot.image;
        layer.querySelector("img").src = assetRoot + shot.image;
        layer.querySelector("img").alt = shot.title;
        const actor = layer.querySelector(".story-cinema-actor");
        actor.hidden = !shot.actor;
        if (shot.actor) { actor.src = assetRoot + shot.actor; actor.alt = shot.actorName || ""; }
        layer.querySelector("small").textContent = `${heading} · ${index + 1} / ${shots.length}`;
        layer.querySelector("h2").textContent = shot.title;
        layer.querySelector("p").textContent = shot.text;
        buttons[0].textContent = paused ? "▶ Reanudar" : "Ⅱ Pausar";
        buttons[0].setAttribute("aria-pressed", String(paused));
        buttons[1].textContent = index === shots.length - 1 ? (kind === "entrada" ? "¡Al duelo!" : "Continuar →") : "Siguiente →";
        elapsed = 0;
        last = performance.now();
      }
      function finish() {
        if (ended) return;
        ended = true;
        clearInterval(timer);
        document.removeEventListener("keydown", keydown, true);
        document.removeEventListener("visibilitychange", visibility);
        layer.remove();
        siblings.forEach(([el, inert]) => { el.inert = inert; });
        previous?.focus?.();
        active = null;
        onPauseChange(false);
        resolve();
      }
      function next() { if (++index >= shots.length) finish(); else render(); }
      function keydown(event) {
        if (event.key === "Escape") { event.preventDefault(); event.stopImmediatePropagation(); finish(); }
        if (event.key === "Tab") {
          event.preventDefault();
          const at = buttons.indexOf(document.activeElement);
          buttons[(at + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length].focus();
        }
      }
      function visibility() { last = performance.now(); }
      buttons[0].onclick = () => { paused = !paused; buttons[0].textContent = paused ? "▶ Reanudar" : "Ⅱ Pausar"; buttons[0].setAttribute("aria-pressed", String(paused)); last = performance.now(); onPauseChange(paused); };
      buttons[1].onclick = next;
      buttons[2].onclick = finish;
      document.addEventListener("keydown", keydown, true);
      document.addEventListener("visibilitychange", visibility);
      const timer = setInterval(() => {
        const now = performance.now();
        if (!paused && !document.hidden) elapsed += Math.min(now - last, 250);
        last = now;
        if (elapsed >= Math.max(11000, shots[index].text.length * 55)) next();
      }, 100);
      render();
      onPauseChange(paused);
      buttons[0].focus();
    });
    return active;
  }
  window.StoryCinematic = { play };
  window.KairosForest = { play, scenes };
})();
