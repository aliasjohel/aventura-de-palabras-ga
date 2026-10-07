const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {create}=require('../js/i18n.js');
const root=path.resolve(__dirname,'..');
async function harness(failed=false){
 const api=create({loadJson:async file=>{if(failed)throw Error('offline');return JSON.parse(fs.readFileSync(path.join(root,'locales',file),'utf8'));},report:()=>{}});
 api.ready=api.init().catch(()=>false);
 const context=vm.createContext({I18n:api,console,document:{createTextNode:nodeValue=>({nodeValue,isConnected:true})}});
 for(const file of ['i18n-es-fallback.js','i18n-ui.js','i18n-combat.js'])vm.runInContext(fs.readFileSync(path.join(root,'js',file),'utf8'),context);
 await api.ready;return {api,UI:context.CombatUI,resolve:context.GameUI.resolve};
}
test('combat presentation localizes nested names and result reasons while retaining original strings',async()=>{
 const {api,UI,resolve}=await harness();
 const original='¡Robo de instantes restó 20 segundos!',descriptor=UI.value(original);
 await api.setPreference('en');assert.equal(resolve(descriptor),'Moment Theft took away 20 seconds!');
 await api.setPreference('pt-BR');assert.equal(resolve(descriptor),'Roubo de Instantes tirou 20 segundos!');
 const detail=UI.value('Se agotó tu tiempo antes que el del rival. Podés volver a intentar este piso.');
 await api.setPreference('en');assert.equal(resolve(detail),"Your time ran out before the opponent's. You can retry this floor.");assert.equal(original,'¡Robo de instantes restó 20 segundos!');
});
test('icons and accented ability names translate without changing character names or identifiers',async()=>{
 const {api,UI,resolve}=await harness();await api.setPreference('en');
 assert.equal(resolve(UI.value('💎 Destello de Sabiduría')),'💎 Flash of Wisdom');
 assert.equal(resolve(UI.value('¡Superaste a Kairós!')),'You defeated Kairós!');
 for(const literal of ['Aren','Kairós','forced_miss','rival','F _ _ _ _ _'])assert.equal(resolve(UI.value(literal)),literal);
 // Gameplay words bypass the combat-label adapter at their presentation sinks.
 for(const word of ['FRUTAS','ANIMALES'])assert.equal(resolve(word),word);
});
test('time, lives and attempts retain counters and switch subject labels',async()=>{
 const {api,UI,resolve}=await harness();await api.setPreference('en');
 assert.equal(resolve(UI.value('Jugador 1 tiene un intento')),'Player 1 has one attempt');
 assert.equal(resolve(UI.value('El rival tiene 3 intentos')),'Opponent has 3 attempts');
 assert.equal(resolve(UI.value('Tiempo de Jugador 2: 3 minutos y 12 segundos')),"Player 2's time: 3 minutes and 12 seconds");
 assert.equal(resolve(UI.value('Jugador 1: 4 vidas')),'Player 1: 4 lives');
});
test('combat descriptors remain usable when every catalog request fails',async()=>{
 const {UI,resolve}=await harness(true);
 assert.equal(resolve(UI.value('¡Palabra 2 superada! Atacaste al rival.')),'¡Palabra 2 superada! Atacaste al rival.');
 assert.equal(resolve(UI.value('Juicio de los Cinco Cristales')),'Juicio de los Cinco Cristales');
});
