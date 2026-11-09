/* Account snapshot presentation only: no RPCs, credits, XP changes or storage writes. */
(() => {
    'use strict';
    const menu=document.getElementById('pantallaMenu'),balance=document.getElementById('menuSaldo'),value=document.getElementById('menuSaldoValor');
    const level=document.getElementById('menuNivel'),levelValue=document.getElementById('menuNivelValor');
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    let previous=null,sessionEnded=false,levelRefresh=null,refreshOwner=null,lastRefresh=0,refreshGeneration=0;
    // Restore only an existing matching session; never create a guest for the header.
    function refreshLevel(force=false) {
        let wallet;
        try { wallet=globalThis.CosmeticStore?.read(); } catch (_) { return; }
        const owner=wallet?.accountId;
        if(sessionEnded||document.hidden||!menu.classList.contains('activa')||globalThis.navigator?.onLine===false||globalThis.AventuraShop?.testing()||!wallet?.securityReady||!owner||globalThis.PlayerXP?.read()?.userId===owner||!globalThis.AventuraOnline?.cargarSupabase||!globalThis.AventuraSupabase?.obtenerCliente||levelRefresh)return;
        if(!force&&refreshOwner===owner&&Date.now()-lastRefresh<30000)return;
        refreshOwner=owner;lastRefresh=Date.now();
        const generation=refreshGeneration;
        const current=()=>generation===refreshGeneration&&!sessionEnded&&globalThis.CosmeticStore?.read()?.accountId===owner&&!globalThis.AventuraShop?.testing();
        levelRefresh=(async()=>{
            await AventuraOnline.cargarSupabase();
            const client=AventuraSupabase.obtenerCliente();
            if(!client?.auth?.getSession)return;
            const {data,error}=await client.auth.getSession();
            if(error||data?.session?.user?.id!==owner||!current())return;
            try { await AventuraShop.connect(); }
            finally { if(current()&&!globalThis.PlayerXP?.read())await globalThis.PlayerXP?.sync(); }
        })().catch(()=>{}).finally(()=>{levelRefresh=null;render();});
    }
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
        const validLevel=xp?.userId===wallet?.accountId&&Number.isInteger(xp?.level)&&xp.level>=1;
        GameUI.text(levelValue,GameUI.key('menu.levelShort',{level:validLevel?xp.level:'—'}));
        GameUI.attribute(level,'aria-label',GameUI.key(validLevel?'menu.levelProfile':'menu.levelUnavailable',{level:validLevel?xp.level:'—'}));
        if(!validLevel)refreshLevel();
    }
    balance.addEventListener('click',()=>document.getElementById('btnTienda').click());
    balance.addEventListener('animationend',()=>balance.classList.remove('menu-saldo-aumenta'));
    window.addEventListener('wallet-updated',()=>{sessionEnded=false;render();});
    window.addEventListener('wallet-local-changed',render);
    window.addEventListener('player-xp-updated',render);
    window.addEventListener('wallet-session-ended',()=>{sessionEnded=true;refreshGeneration++;previous=null;balance.classList.remove('menu-saldo-aumenta');render();});
    document.getElementById('modoPruebas').addEventListener('change',render);
    new MutationObserver(render).observe(menu,{attributes:true,attributeFilter:['class']});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)balance.classList.remove('menu-saldo-aumenta');else {render();refreshLevel(true);}});
    motion.addEventListener('change',()=>{balance.classList.remove('menu-saldo-aumenta');render();});
    window.addEventListener('online',()=>refreshLevel(true));
    window.addEventListener('focus',()=>refreshLevel(true));
    globalThis.I18n?.subscribe(render);render();
})();
