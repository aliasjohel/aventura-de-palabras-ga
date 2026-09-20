/* Cinemática ilustrada del prólogo; el juego conserva el control de su inicio y cierre. */
(() => {
  const scenes = [
    ['La leyenda de los cinco cristales', 'Hace muchos años, cinco Cristales de la Sabiduría mantenían el equilibrio entre los mundos. Sus guardianes habían jurado protegerlos para que su poder nunca cayera en manos equivocadas.', 'Los cinco cristales iluminan un antiguo santuario.', '0% 0%'],
    ['La huida de los guardianes', 'Una noche, Azrak llegó al santuario en busca de los cristales. Los guardianes intentaron detenerlo, pero no pudieron vencerlo. Para mantener los cristales a salvo, los separaron y huyeron con ellos hacia distintos reinos.', 'Una sombra envuelve los cristales y apaga el santuario.', '100% 0%'],
    ['Un mapa. Una esperanza.', 'Desde entonces, nadie volvió a tener noticias de los guardianes. Una extraña oscuridad comenzó a extenderse por los mundos. Aren, un joven explorador, encontró un antiguo mapa: la primera pista lo llevaba al Bosque Encantado.', 'Aren descubre una ruta en un antiguo mapa.', '0% 100%'],
    ['Tu aventura comienza aquí', 'Aren partió en busca de los guardianes. Para reunir los cristales y devolver el equilibrio a los mundos, tendría que ganarse su confianza y descubrir cómo detener la oscuridad.', 'Aren comienza su viaje por el Bosque Encantado.', '100% 100%'],
  ];
  const modal = document.getElementById('modalPrologo');
  const title = document.getElementById('tituloPrologo');
  const text = document.getElementById('textoPrologo');
  const art = document.getElementById('prologoIlustracion');
  const count = document.getElementById('prologoContador');
  const previous = document.getElementById('prologoAnterior');
  const next = document.getElementById('prologoSiguiente');
  const pause = document.getElementById('prologoPausa');
  const start = document.getElementById('btnComenzarPrologo');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, timer = 0, active = false, paused = false;
  function schedule() {
    clearTimeout(timer);
    if (active && !paused && !document.hidden && index < scenes.length - 1) {
      timer = setTimeout(() => { index++; render(); }, 10000);
    }
  }
  function render() {
    const scene = scenes[index];
    title.textContent = scene[0];
    text.textContent = scene[1];
    art.style.backgroundPosition = scene[3];
    art.setAttribute('aria-label', scene[2]);
    art.classList.remove('en-movimiento');
    void art.offsetWidth;
    art.classList.add('en-movimiento');
    count.textContent = `${index + 1} / ${scenes.length}`;
    previous.disabled = index === 0;
    next.hidden = index === scenes.length - 1;
    start.hidden = index !== scenes.length - 1;
    pause.textContent = paused ? 'Reanudar' : 'Pausar';
    pause.setAttribute('aria-pressed', String(paused));
    modal.classList.toggle('prologo-pausado', paused);
    schedule();
  }
  previous.addEventListener('click', () => {
    if (!active || index === 0) return;
    index--; render();
  });
  next.addEventListener('click', () => {
    if (!active || index >= scenes.length - 1) return;
    index++; render();
    if (next.hidden) start.focus();
  });
  pause.addEventListener('click', () => {
    if (!active) return;
    paused = !paused; render();
  });
  modal.addEventListener('keydown', (event) => {
    if (!active) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); next.click(); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); previous.click(); }
    if (event.key === 'Tab') {
      const buttons = [...modal.querySelectorAll('button')].filter(b => !b.hidden && !b.disabled);
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  document.getElementById('prologoOmitir').addEventListener('click', () => {
    if (active) start.click();
  });
  document.addEventListener('visibilitychange', schedule);
  window.PrologueCinematic = {
    open() {
      active = true; index = 0; paused = reduced.matches;
      render(); next.focus();
    },
    stop() { active = false; clearTimeout(timer); },
  };
})();
