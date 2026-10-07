(() => {
  'use strict';
  const select=document.getElementById('idiomaJuego'),status=document.getElementById('estadoIdioma');
  const refresh=()=>{select.value=I18n.preference;};
  I18n.ready.then(ready=>{
    if(!ready){GameUI.text(status,GameUI.key('common.languageUnavailable'));return;}
    for(const language of I18n.languages){const option=document.createElement('option');option.value=language.id;option.textContent=language.name;select.append(option);}
    refresh();select.disabled=false;I18n.subscribe(refresh);
  });
  select.addEventListener('change',async()=>{
    select.disabled=true;status.textContent='';
    try{const result=await I18n.setPreference(select.value);if(result.applied&&!result.saved)GameUI.text(status,GameUI.key('common.languageUnsaved'));}
    catch(_){GameUI.text(status,GameUI.key('common.languageUnavailable'));refresh();}
    finally{select.disabled=false;}
  });
})();
