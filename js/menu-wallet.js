/* Account snapshot presentation only: no RPCs, credits, XP changes or storage writes. */
(() => {
    'use strict';
    const menu=document.getElementById('pantallaMenu'),balance=document.getElementById('menuSaldo'),value=document.getElementById('menuSaldoValor');
    const level=document.getElementById('menuNivel'),levelValue=document.getElementById('menuNivelValor');
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    let previous=null,sessionEnded=false;
    function render() {
        let wallet=null;
        try { if(!sessionEnded&&!globalThis.AventuraShop?.testing())wallet=globalThis.CosmeticStore?.read(); } catch (_) {}
        const valid=wallet?.accountId&&wallet.securityReady===true&&Number.isSafeInteger(wallet.coins)&&wallet.coins>=0;
        const locale=globalThis.I18n?.language||'es';
        const number=valid?new Intl.NumberFormat(locale).format(wallet.coins):'—';
        value.textContent=valid&&wallet.coins>=1e6?new Intl.NumberFormat(locale,{notation:'compact',maximumFractionDigits:1}).format(wallet.coins):number;
        GameUI.attribute(balance,'aria-label',GameUI.key(valid?'menu.walletOpen':'menu.walletUnavailable',{coins:number}));
        GameUI.attribute(balance,'title',GameUI.key(valid?'menu.walletOpen':'menu.walletUnavailable',{coins:number}));
        const changed=valid&&previous?.owner===wallet.accountId&&wallet.coins>previous.coins;
        previous=valid?{owner:wallet.accountId,coins:wallet.coins}:null;
        if(changed&&!motion.matches&&!document.hidden&&menu.classList.contains('activa')){
            balance.classList.remove('menu-saldo-aumenta');void balance.offsetWidth;balance.classList.add('menu-saldo-aumenta');
        }
        const xp=valid?globalThis.PlayerXP?.read():null;
        level.hidden=!(xp?.userId===wallet?.accountId&&Number.isInteger(xp?.level)&&xp.level>=1);
        if(!level.hidden){levelValue.textContent=PlayerXP.text('level',{n:xp.level});GameUI.attribute(level,'aria-label',GameUI.key('menu.levelProfile',{level:xp.level}));}
    }
    balance.addEventListener('click',()=>document.getElementById('btnTienda').click());
    level.addEventListener('click',()=>document.getElementById('btnMiAvatar').click());
    balance.addEventListener('animationend',()=>balance.classList.remove('menu-saldo-aumenta'));
    window.addEventListener('wallet-updated',()=>{sessionEnded=false;render();});
    window.addEventListener('wallet-local-changed',render);
    window.addEventListener('player-xp-updated',render);
    window.addEventListener('wallet-session-ended',()=>{sessionEnded=true;previous=null;balance.classList.remove('menu-saldo-aumenta');render();});
    document.getElementById('modoPruebas').addEventListener('change',render);
    new MutationObserver(render).observe(menu,{attributes:true,attributeFilter:['class']});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)balance.classList.remove('menu-saldo-aumenta');else render();});
    motion.addEventListener('change',()=>{balance.classList.remove('menu-saldo-aumenta');render();});
    globalThis.I18n?.subscribe(render);render();
})();
