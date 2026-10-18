const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),vm=require('vm');
const Words=require('../js/word-gameplay.js'),{create}=require('../js/i18n.js');
test('online word context follows the authoritative room language, independently of UI preference',()=>{
 for(const language of ['es','en','pt-BR']){const context=Words.createContext({online:true,onlineLanguage:language,requestedLanguage:'en',availableLanguages:['es','en','pt-BR']});assert.equal(context.language,language);assert.equal(context.rules.alphabet.length,language==='es'?27:26);assert(Object.isFrozen(context));}
 assert.equal(Words.createContext({online:true,requestedLanguage:'en'}).language,'es');
});
test('online messages translate in the recipient locale while aliases and codes remain literal',async()=>{
 const I18n=create({loadJson:async p=>JSON.parse(fs.readFileSync(path.join(__dirname,'../locales',p),'utf8'))});await I18n.init();
 const ctx={I18n,GameUI:{key:(i18nKey,params={})=>({i18nKey,params}),error:()=>({i18nKey:'multiplayer.failure',params:{}})}};
 vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../js/i18n-es-fallback.js'),'utf8'),ctx);vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../js/multiplayer-i18n.js'),'utf8'),ctx);
 for(const l of ['es','en','pt-BR']){await I18n.setPreference(l);const value=ctx.OnlineUI.value('Aceptar quiere agregarte');assert.equal(value.params.alias,'Aceptar');assert.equal(ctx.OnlineUI.value('Código ABC123').params.code,'ABC123');const result=I18n.t(value.i18nKey,value.params);assert(result.startsWith('Aceptar '));assert(!result.includes('multiplayer.'));}
});
