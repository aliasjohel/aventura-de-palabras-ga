/* Event-driven presentation lifecycle. No animation loop, game state or network requests. */
(() => {
    'use strict';
    const menu = document.getElementById('pantallaMenu');
    const modes = document.getElementById('selectorModosJuego');
    const title = menu.querySelector('.menu-logo');
    const art = title.querySelector('.menu-logo-arte');
    const image = art.querySelector('img');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let suspended = false;
    function update() {
        const visible = !suspended && !document.hidden && !motion.matches
            && menu.classList.contains('activa') && !document.body.classList.contains('intro-pendiente');
        menu.dataset.menuEffects = visible && !document.querySelector('dialog[open]') ? 'running' : 'paused';
        modes.dataset.menuEffects = visible && modes.open ? 'running' : 'paused';
    }
    function reveal() {
        if (!image.naturalWidth) return;
        art.hidden = false;
        title.dataset.logoReady = '';
    }
    image.addEventListener('load', reveal);
    image.addEventListener('error', () => { art.hidden = true; delete title.dataset.logoReady; });
    if (image.complete) reveal();
    const observer = new MutationObserver(update);
    observer.observe(menu, {attributes: true, attributeFilter: ['class']});
    observer.observe(document.body, {attributes: true, attributeFilter: ['class']});
    document.querySelectorAll('dialog').forEach(dialog => {
        observer.observe(dialog, {attributes: true, attributeFilter: ['open']});
    });
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
    window.addEventListener('pagehide', () => { suspended = true; update(); });
    window.addEventListener('pageshow', () => { suspended = false; update(); });
    update();
})();
