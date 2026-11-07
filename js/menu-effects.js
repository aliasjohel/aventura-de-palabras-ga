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
    const scene=menu.querySelector('.menu-escena-animada'),plane=scene.querySelector('.menu-paisaje');
    function frameScene(){
        const {width,height}=scene.getBoundingClientRect();if(!width||!height)return;
        const size=Math.max(width,height)*1.06,x=(width-size)/2,y=(height-size)/2;
        const targetX=width>=height?x:width-size+Math.min(24,(size-width)/2);
        const targetY=width>=height?-Math.min(24,(size-height)/2):y;
        for(const [key,value]of Object.entries({'--menu-camera-size':size,'--menu-start-x':x,'--menu-start-y':y,'--menu-scenic-x':targetX,'--menu-scenic-y':targetY}))plane.style.setProperty(key,value+'px');
    }
    new ResizeObserver(frameScene).observe(scene);frameScene();
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
