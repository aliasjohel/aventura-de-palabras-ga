/* Local volume mixer; authored levels and fades remain independent. */
(() => {
 'use strict';
 const key='aventuraAudioV1', defaults={music:65,keyboard:70,effects:80}; let values={...defaults};
 try { const saved=JSON.parse(localStorage.getItem(key)); for(const g in defaults) if(typeof saved?.[g]==='number'&&Number.isFinite(saved[g])) values[g]=Math.max(0,Math.min(100,saved[g])); } catch {}
 const media=new Set(), buses=new Set(), contexts=new WeakMap();
 let preview = null;
 const factor=g=>values[g]/100;
 function apply(){for(const refs of [media,buses]) for(const ref of refs){const item=ref.deref();if(item)item.apply();else refs.delete(ref);}}
 function create(src,group='effects'){
  const audio=new Audio(src);audio.preload="none";let proto=audio,desc;while(proto&&!desc){desc=Object.getOwnPropertyDescriptor(proto,'volume');proto=Object.getPrototypeOf(proto);}let base=audio.volume;
  if(!desc?.set)return audio;
  const entry={apply:()=>desc.set.call(audio,base*factor(group)*(preview && group==='music' && audio!==preview ? 0 : 1))};
  Object.defineProperty(audio,'volume',{configurable:true,get:()=>base,set(value){if(!Number.isFinite(value)||value<0||value>1)throw new RangeError('Invalid volume');base=value;entry.apply();}});
  audio.mixerEntry=entry;media.add(new WeakRef(entry));entry.apply();return audio;
 }
 function output(context,group='effects'){
  let groups=contexts.get(context);if(!groups){groups={};contexts.set(context,groups);}
  if(!groups[group]){const node=context.createGain();node.connect(context.destination);const entry={node,apply:()=>{node.gain.value=factor(group);}};groups[group]=entry;buses.add(new WeakRef(entry));entry.apply();}return groups[group].node;
 }
 function render(){for(const g in defaults){const input=document.getElementById('volume-'+g);if(input){input.value=values[g];document.getElementById('value-'+g).textContent=values[g]+'%';}}}
 function set(group,value){if(!(group in defaults)||!Number.isFinite(value))return;values[group]=Math.max(0,Math.min(100,value));apply();try{localStorage.setItem(key,JSON.stringify(values));}catch{}render();}
 for(const g in defaults)document.getElementById('volume-'+g)?.addEventListener('input',e=>set(g,Number(e.target.value)));
 const samples={music:create('assets/sounds/world-desert-meditation.mp3','music'),effects:create('assets/sounds/acertar.mp3')};samples.music.volume=.8;let timer;
 function stop(){clearTimeout(timer);Object.values(samples).forEach(a=>a.pause());preview=null;apply();}
 document.querySelectorAll('[data-audio-test]').forEach(button=>button.addEventListener('click',()=>{stop();const group=button.dataset.audioTest;if(group==='keyboard'){globalThis.reproducirPulsacionTeclaVersus?.();return;}const audio=samples[group];if(group==='music'){preview=audio;apply();}audio.currentTime=0;void audio.play().catch(()=>{});timer=setTimeout(stop,5000);}));
 new MutationObserver(()=>{if(document.getElementById('modalConfiguracion').classList.contains('oculto'))stop();}).observe(document.getElementById('modalConfiguracion'),{attributes:true,attributeFilter:['class']});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 window.addEventListener('storage',e=>{if(e.key!==key)return;try{const next=JSON.parse(e.newValue);for(const g in defaults)values[g]=typeof next?.[g]==='number'&&Number.isFinite(next[g])?Math.max(0,Math.min(100,next[g])):defaults[g];apply();render();}catch{}});
 globalThis.GameAudio=Object.freeze({create,output,set,get:g=>values[g]});render();
})();
