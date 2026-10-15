const {test} = require('node:test');
const assert = require('node:assert/strict');
const words = require('../js/word-gameplay.js');
const engine = require('../js/versus-engine.js');
const banks = require('../js/word-banks-es.js');

test('all original words pass strict validation with unchanged hints and spelling', () => {
  for (const world of [...banks.adventure, {palabras: banks.azrak}]) words.validateBank(world.palabras, 'es', {hints: true});
  for (const entries of Object.values(banks.versus)) words.validateBank(entries, 'es');
});

test('canonical Unicode, Spanish Ñ, Portuguese accents and Ç use the matching alphabet', () => {
  const es = words.rules('es'), pt = words.rules('pt-BR'), en = words.rules('en');
  for (const [value, expected] of [['ACCIÓN','ACCION'], ['PINGÜINO','PINGUINO'], ['PIÑA','PIÑA']]) {
    assert.equal(es.key(value), expected); assert.equal(es.key(value.normalize('NFD')), expected);
  }
  assert.notEqual(es.key('PENA'), es.key('PEÑA'));
  for (const [value, expected] of [['AÇÃO','ACAO'], ['MAÇÃ','MACA'], ['PÃO','PAO'], ['AVÓ','AVO'], ['ÔNIBUS','ONIBUS']]) {
    assert.equal(pt.key(value), expected); assert.equal(pt.key(value.normalize('NFD')), expected); assert(pt.validate(value));
  }
  assert.equal(es.alphabet.length, 27); assert.equal(pt.alphabet.length, 26); assert.equal(en.alphabet.length, 26);
  assert(!en.validate('PIÑA')); assert(!es.validate('AÇÃO')); assert(en.validate('APPLE'));
  assert(Object.isFrozen(es.rows)); assert(Object.isFrozen(es.rows[0]));
});

test('bank validation rejects invalid characters, duplicates, missing hints and excessive length without repairing them', () => {
  for (const value of ['MA-ÇÃ', 'MA ÇÃ', 'MAÇÃ1', 'MAÇÃ🙂', 'A'.repeat(13), '']) {
    assert.throws(() => words.validateBank([value], 'pt-BR'));
  }
  assert.throws(() => words.validateBank(['AVO','AVÓ'], 'pt-BR'), /Duplicate/);
  assert.throws(() => words.validateBank([{palabra:'ARBOL'}], 'es', {hints:true}), /hint/);
  assert.throws(() => words.rules('de'));
});

test('each engine retains its rules independently; repeated letters, progress, errors and recovery stay coherent', () => {
  const pt = engine.paraIdioma('pt-BR'), es = engine.paraIdioma('es'), en = engine.paraIdioma('en');
  let turn = pt.evaluarLetra({palabra:'AÇÃO', letra:'a'});
  assert.equal(turn.resultado,'acierto'); assert.equal(pt.contarDescubiertas('AÇÃO',turn.letras),2);
  assert.deepEqual(pt.obtenerProgreso('AÇÃO',turn.letras),['A','_','Ã','_']);
  turn = pt.evaluarLetra({palabra:'AÇÃO', letras:turn.letras, letra:'ã'});
  assert.equal(turn.resultado,'repetida'); assert.equal(turn.errores,0);
  turn = pt.evaluarLetra({palabra:'AÇÃO', letras:turn.letras, letra:'Ç'});
  turn = pt.evaluarLetra({palabra:'AÇÃO', letras:turn.letras, letra:'O'});
  assert.equal(turn.resultado,'completa'); assert(pt.palabraCompletada('AÇÃO'.normalize('NFD'),turn.letras));
  assert.equal(pt.evaluarLetra({palabra:'AÇÃO',letra:'X',errores:0}).resultado,'error');
  assert.equal(pt.elegirPalabraRecuperacion(['MAÇÃ','AÇÃO'],['MACA'],()=>0),'AÇÃO');
  assert.equal(es.obtenerClavePalabra('PEÑA'),'PEÑA'); assert.equal(en.obtenerClavePalabra('apple'),'APPLE');
  assert.equal(es.evaluarLetra({palabra:'PEÑA',letra:'N'}).resultado,'error');
  assert.equal(es.evaluarLetra({palabra:'PEÑA',letra:'Ñ'}).resultado,'acierto');
  assert.deepEqual(pt.CONFIG,es.CONFIG); assert.deepEqual(en.CONFIG,es.CONFIG);
  assert.equal(pt.evaluarLetra({palabra:'AÇÃO',letra:'🙂'}).resultado,'repetida');
});

test('context resolves a complete bank before combat, freezes all rules and keeps online in Spanish', () => {
  const context = words.createContext({requestedLanguage:'pt-BR'});
  assert.equal(context.requestedLanguage,'pt-BR'); assert.equal(context.language,'es'); assert(context.fallback);
  assert(Object.isFrozen(context)); assert(Object.isFrozen(context.rules));
  assert.equal(words.createContext({requestedLanguage:'en',availableLanguages:['es','en']}).language,'en');
  assert.equal(words.createContext({requestedLanguage:'en',availableLanguages:['es','en'],online:true}).language,'es');
  assert.throws(()=>words.createContext({availableLanguages:[]}));
});

test('stable history IDs round trip, reject corrupt IDs and remain separate from future languages', () => {
  const worlds = banks.adventure;
  const original = {0:{usadas:['ARBOL','HOJA','ARBOL','FAKE'],enMision:['HOJA'],mision:2}};
  const encoded = words.encodeHistory(original,worlds);
  assert.deepEqual(encoded[0].used,[words.wordId(0,0),words.wordId(0,1)]);
  encoded[0].used.push('es:world:1:word:0','corrupt');
  assert.deepEqual(words.decodeHistory(encoded,worlds)[0],{usadas:['ARBOL','HOJA'],enMision:['HOJA'],mision:2});
  assert.equal(words.decodeHistory(null,worlds),null);
  assert.deepEqual(original[0].usadas,['ARBOL','HOJA','ARBOL','FAKE']);
});
