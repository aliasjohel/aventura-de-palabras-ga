(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CostumeResources=api;})(globalThis,()=>{
'use strict';
// Explicit immutable outfit bundles; keep every combat and cinematic pose together.
const families={
  "aren-bosque": {
    "character": "explorador",
    "files": [
      "./assets/images/trajes/aren-bosque-anciano-v1.png",
      "./assets/images/trajes/aren-bosque-ataque-v1.png",
      "./assets/images/trajes/aren-bosque-base-v1.png",
      "./assets/images/trajes/aren-bosque-envejecido-v1.png",
      "./assets/images/trajes/aren-bosque-final-v1.png",
      "./assets/images/trajes/aren-bosque-habilidad-v1.png",
      "./assets/images/trajes/aren-bosque-impacto-v1.png",
      "./assets/images/trajes/aren-bosque-mano-v1.png",
      "./assets/images/trajes/aren-bosque-planta-v1.png",
      "./assets/images/trajes/aren-bosque-preparacion-v1.png",
      "./assets/images/trajes/aren-bosque-vidrio-v1.png"
    ],
    "combat": [
      "./assets/images/trajes/aren-bosque-base-v1.png",
      "./assets/images/trajes/aren-bosque-preparacion-v1.png",
      "./assets/images/trajes/aren-bosque-ataque-v1.png",
      "./assets/images/trajes/aren-bosque-habilidad-v1.png",
      "./assets/images/trajes/aren-bosque-impacto-v1.png"
    ],
    "shared": []
  },
  "zafir-celestial": {
    "character": "mago",
    "files": [
      "./assets/images/trajes/zafir-celestial-anciano-v1.png",
      "./assets/images/trajes/zafir-celestial-ataque-v1.png",
      "./assets/images/trajes/zafir-celestial-base-v1.png",
      "./assets/images/trajes/zafir-celestial-envejecido-v1.png",
      "./assets/images/trajes/zafir-celestial-final-v1.png",
      "./assets/images/trajes/zafir-celestial-impacto-v1.png",
      "./assets/images/trajes/zafir-celestial-mano-v1.png",
      "./assets/images/trajes/zafir-celestial-planta-v1.png",
      "./assets/images/trajes/zafir-celestial-vidrio-v1.png"
    ],
    "combat": [
      "./assets/images/trajes/zafir-celestial-base-v1.png",
      "./assets/images/trajes/zafir-celestial-ataque-v1.png",
      "./assets/images/trajes/zafir-celestial-impacto-v1.png"
    ],
    "shared": []
  },
  "kairos-real": {
    "character": "kairos",
    "files": [
      "./assets/images/trajes/kairos-real-anciano-v1.png",
      "./assets/images/trajes/kairos-real-ataque-v1.png",
      "./assets/images/trajes/kairos-real-base-v1.png",
      "./assets/images/trajes/kairos-real-envejecido-v1.png",
      "./assets/images/trajes/kairos-real-impacto-v1.png",
      "./assets/images/trajes/kairos-real-mano-v1.png",
      "./assets/images/trajes/kairos-real-planta-v1.png",
      "./assets/images/trajes/kairos-real-vidrio-v1.png"
    ],
    "combat": [
      "./assets/images/trajes/kairos-real-base-v1.png",
      "./assets/images/trajes/kairos-real-ataque-v1.png",
      "./assets/images/trajes/kairos-real-impacto-v1.png"
    ],
    "shared": []
  },
  "guardiana-otono": {
    "character": "guardiana",
    "files": [
      "./assets/images/trajes/guardiana-otono-anciano-v1.png",
      "./assets/images/trajes/guardiana-otono-ataque-v1.png",
      "./assets/images/trajes/guardiana-otono-base-v1.png",
      "./assets/images/trajes/guardiana-otono-envejecido-v1.png",
      "./assets/images/trajes/guardiana-otono-final-v1.png",
      "./assets/images/trajes/guardiana-otono-impacto-v1.png",
      "./assets/images/trajes/guardiana-otono-mano-v1.png",
      "./assets/images/trajes/guardiana-otono-planta-v1.png",
      "./assets/images/trajes/guardiana-otono-vidrio-v1.png"
    ],
    "combat": [
      "./assets/images/trajes/guardiana-otono-base-v1.png",
      "./assets/images/trajes/guardiana-otono-ataque-v1.png",
      "./assets/images/trajes/guardiana-otono-impacto-v1.png"
    ],
    "shared": []
  },
  "alba-lunar": {
    "character": "guardian_alba",
    "files": [
      "./assets/images/trajes/alba-lunar-anciano-v1.png",
      "./assets/images/trajes/alba-lunar-ataque-v1.png",
      "./assets/images/trajes/alba-lunar-base-v1.png",
      "./assets/images/trajes/alba-lunar-carga-v1.png",
      "./assets/images/trajes/alba-lunar-envejecido-v1.png",
      "./assets/images/trajes/alba-lunar-final-v1.png",
      "./assets/images/trajes/alba-lunar-habilidad-v1.png",
      "./assets/images/trajes/alba-lunar-impacto-v1.png",
      "./assets/images/trajes/alba-lunar-mano-v1.png",
      "./assets/images/trajes/alba-lunar-planta-v1.png",
      "./assets/images/trajes/alba-lunar-vidrio-v1.png"
    ],
    "combat": [
      "./assets/images/trajes/alba-lunar-base-v1.png",
      "./assets/images/trajes/alba-lunar-ataque-v1.png",
      "./assets/images/trajes/alba-lunar-habilidad-v1.png",
      "./assets/images/trajes/alba-lunar-carga-v1.png",
      "./assets/images/trajes/alba-lunar-impacto-v1.png"
    ],
    "shared": []
  },
  "shadow-carmesi": {
    "character": "t_shadow",
    "files": [
      "./assets/images/trajes/shadow-carmesi-anciano-v1.png",
      "./assets/images/trajes/shadow-carmesi-ataque-v1.png",
      "./assets/images/trajes/shadow-carmesi-base-v1.png",
      "./assets/images/trajes/shadow-carmesi-envejecido-v1.png",
      "./assets/images/trajes/shadow-carmesi-final-v1.png",
      "./assets/images/trajes/shadow-carmesi-impacto-v1.png",
      "./assets/images/trajes/shadow-carmesi-mano-v1.png",
      "./assets/images/trajes/shadow-carmesi-planta-v1.png",
      "./assets/images/trajes/shadow-carmesi-vidrio-v1.png"
    ],
    "combat": [
      "./assets/images/trajes/shadow-carmesi-base-v1.png",
      "./assets/images/trajes/shadow-carmesi-ataque-v1.png",
      "./assets/images/trajes/shadow-carmesi-impacto-v1.png"
    ],
    "shared": []
  },
  "lobo-lunar": {
    "character": "hombre_lobo",
    "files": [
      "./assets/images/trajes/lobo-lunar-anciano-v1.png",
      "./assets/images/trajes/lobo-lunar-ataque-v1.png",
      "./assets/images/trajes/lobo-lunar-aullido-v1.png",
      "./assets/images/trajes/lobo-lunar-base-v1.png",
      "./assets/images/trajes/lobo-lunar-envejecido-v1.png",
      "./assets/images/trajes/lobo-lunar-humano-v1.png",
      "./assets/images/trajes/lobo-lunar-impacto-v2.webp",
      "./assets/images/trajes/lobo-lunar-mano-v1.png",
      "./assets/images/trajes/lobo-lunar-planta-v1.png",
      "./assets/images/trajes/lobo-lunar-salto-v1.png",
      "./assets/images/trajes/lobo-lunar-transformacion-v1.png",
      "./assets/images/trajes/lobo-lunar-vidrio-v1.png"
    ],
    "combat": [
      "./assets/images/trajes/lobo-lunar-base-v1.png",
      "./assets/images/trajes/lobo-lunar-ataque-v1.png",
      "./assets/images/trajes/lobo-lunar-impacto-v2.webp",
      "./assets/images/trajes/lobo-lunar-humano-v1.png",
      "./assets/images/trajes/lobo-lunar-transformacion-v1.png",
      "./assets/images/trajes/lobo-lunar-aullido-v1.png",
      "./assets/images/trajes/lobo-lunar-salto-v1.png"
    ],
    "shared": []
  },
  "nimbus-aviador": {
    "character": "dragon",
    "files": [
      "./assets/images/trajes/nimbus-aviador-anciano-v1.png",
      "./assets/images/trajes/nimbus-aviador-ataque-v1.png",
      "./assets/images/trajes/nimbus-aviador-base-v1.png",
      "./assets/images/trajes/nimbus-aviador-envejecido-v1.png",
      "./assets/images/trajes/nimbus-aviador-final-v1.png",
      "./assets/images/trajes/nimbus-aviador-impacto-v1.png",
      "./assets/images/trajes/nimbus-aviador-llamado-v1.png",
      "./assets/images/trajes/nimbus-aviador-mano-v1.png",
      "./assets/images/trajes/nimbus-aviador-planta-v1.png",
      "./assets/images/trajes/nimbus-aviador-vidrio-v1.png"
    ],
    "combat": [
      "./assets/images/trajes/nimbus-aviador-base-v1.png",
      "./assets/images/trajes/nimbus-aviador-ataque-v1.png",
      "./assets/images/trajes/nimbus-aviador-impacto-v1.png",
      "./assets/images/trajes/nimbus-aviador-llamado-v1.png"
    ],
    "shared": []
  },
  "nivor-boreal": {
    "character": "dragon_hielo",
    "files": [
      "./assets/images/trajes/nivor-boreal-anciano-v1.png",
      "./assets/images/trajes/nivor-boreal-ataque-v1.png",
      "./assets/images/trajes/nivor-boreal-base-v1.png",
      "./assets/images/trajes/nivor-boreal-descenso-alto-v1.png",
      "./assets/images/trajes/nivor-boreal-descenso-bajo-v1.png",
      "./assets/images/trajes/nivor-boreal-envejecido-v1.png",
      "./assets/images/trajes/nivor-boreal-final-v1.png",
      "./assets/images/trajes/nivor-boreal-frontal-v1.png",
      "./assets/images/trajes/nivor-boreal-impacto-v1.png",
      "./assets/images/trajes/nivor-boreal-mano-v1.png",
      "./assets/images/trajes/nivor-boreal-planta-v1.png",
      "./assets/images/trajes/nivor-boreal-vidrio-v1.png",
      "./assets/images/trajes/nivor-boreal-vuelo-v1.png"
    ],
    "combat": [
      "./assets/images/trajes/nivor-boreal-base-v1.png",
      "./assets/images/trajes/nivor-boreal-ataque-v1.png",
      "./assets/images/trajes/nivor-boreal-impacto-v1.png",
      "./assets/images/trajes/nivor-boreal-vuelo-v1.png",
      "./assets/images/trajes/nivor-boreal-descenso-alto-v1.png",
      "./assets/images/trajes/nivor-boreal-descenso-bajo-v1.png",
      "./assets/images/trajes/nivor-boreal-frontal-v1.png"
    ],
    "shared": []
  },
  "azrak-eclipse": {
    "character": "azrak",
    "files": [
      "./assets/images/trajes/azrak-eclipse-anciano-v1.png",
      "./assets/images/trajes/azrak-eclipse-ataque-v1.png",
      "./assets/images/trajes/azrak-eclipse-base-v1.png",
      "./assets/images/trajes/azrak-eclipse-envejecido-v1.png",
      "./assets/images/trajes/azrak-eclipse-final-v1.png",
      "./assets/images/trajes/azrak-eclipse-impacto-v1.png",
      "./assets/images/trajes/azrak-eclipse-invocacion-v1.png",
      "./assets/images/trajes/azrak-eclipse-mano-v1.png",
      "./assets/images/trajes/azrak-eclipse-planta-v1.png",
      "./assets/images/trajes/azrak-eclipse-susto-v1.png",
      "./assets/images/trajes/azrak-eclipse-vidrio-v1.png"
    ],
    "combat": [
      "./assets/images/trajes/azrak-eclipse-base-v1.png",
      "./assets/images/trajes/azrak-eclipse-ataque-v1.png",
      "./assets/images/trajes/azrak-eclipse-impacto-v1.png",
      "./assets/images/trajes/azrak-eclipse-invocacion-v1.png",
      "./assets/images/trajes/azrak-eclipse-susto-v1.png"
    ],
    "shared": []
  },
  "kalamo-astral": {
    "character": "kalamo",
    "files": [
      "./assets/images/trajes/kalamo-astral-alcanza-v1.png",
      "./assets/images/trajes/kalamo-astral-anciano-v1.png",
      "./assets/images/trajes/kalamo-astral-ataque-v1.png",
      "./assets/images/trajes/kalamo-astral-base-v1.png",
      "./assets/images/trajes/kalamo-astral-envejecido-v1.png",
      "./assets/images/trajes/kalamo-astral-extrae-v1.png",
      "./assets/images/trajes/kalamo-astral-final-v1.png",
      "./assets/images/trajes/kalamo-astral-formacion-1-v1.png",
      "./assets/images/trajes/kalamo-astral-formacion-2-v1.png",
      "./assets/images/trajes/kalamo-astral-formacion-3-v1.png",
      "./assets/images/trajes/kalamo-astral-golpea-v1.png",
      "./assets/images/trajes/kalamo-astral-habilidad-v1.png",
      "./assets/images/trajes/kalamo-astral-impacto-v1.png",
      "./assets/images/trajes/kalamo-astral-lanza-v1.png",
      "./assets/images/trajes/kalamo-astral-mano-v1.png",
      "./assets/images/trajes/kalamo-astral-planta-v1.png",
      "./assets/images/trajes/kalamo-astral-prepara-v1.png",
      "./assets/images/trajes/kalamo-astral-vidrio-v1.png"
    ],
    "combat": [
      "./assets/images/trajes/kalamo-astral-base-v1.png",
      "./assets/images/trajes/kalamo-astral-ataque-v1.png",
      "./assets/images/trajes/kalamo-astral-habilidad-v1.png",
      "./assets/images/trajes/kalamo-astral-impacto-v1.png",
      "./assets/images/trajes/kalamo-astral-alcanza-v1.png",
      "./assets/images/trajes/kalamo-astral-extrae-v1.png",
      "./assets/images/trajes/kalamo-astral-prepara-v1.png",
      "./assets/images/trajes/kalamo-astral-lanza-v1.png",
      "./assets/images/trajes/kalamo-astral-golpea-v1.png",
      "./assets/images/trajes/kalamo-astral-formacion-1-v1.png",
      "./assets/images/trajes/kalamo-astral-formacion-2-v1.png",
      "./assets/images/trajes/kalamo-astral-formacion-3-v1.png"
    ],
    "shared": []
  },
  "aren-union": {
    "character": "explorador",
    "files": [
      "./assets/images/trajes/aren-union-anciano-v1.webp",
      "./assets/images/trajes/aren-union-ataque-rayo-v2.webp",
      "./assets/images/trajes/aren-union-ataque-v1.webp",
      "./assets/images/trajes/aren-union-base-v1.webp",
      "./assets/images/trajes/aren-union-capa-v1.webp",
      "./assets/images/trajes/aren-union-concepto-v1.webp",
      "./assets/images/trajes/aren-union-disparo-v2.webp",
      "./assets/images/trajes/aren-union-envejecido-v1.webp",
      "./assets/images/trajes/aren-union-guardianes-solos-v3.webp",
      "./assets/images/trajes/aren-union-guardianes-v2.webp",
      "./assets/images/trajes/aren-union-habilidad-v1.webp",
      "./assets/images/trajes/aren-union-impacto-duelo-v1.webp",
      "./assets/images/trajes/aren-union-impacto-v1.webp",
      "./assets/images/trajes/aren-union-impacto-v2.webp",
      "./assets/images/trajes/aren-union-invocacion-v1.webp",
      "./assets/images/trajes/aren-union-mano-v1.webp",
      "./assets/images/trajes/aren-union-planta-v1.webp",
      "./assets/images/trajes/aren-union-prision-v2.webp",
      "./assets/images/trajes/aren-union-rayo-v2.webp",
      "./assets/images/trajes/aren-union-victoria-v1.webp",
      "./assets/images/trajes/aren-union-vidrio-v1.webp"
    ],
    "combat": [
      "./assets/images/trajes/aren-union-base-v1.webp",
      "./assets/images/trajes/aren-union-ataque-rayo-v2.webp",
      "./assets/images/trajes/aren-union-habilidad-v1.webp",
      "./assets/images/trajes/aren-union-impacto-v2.webp",
      "./assets/images/trajes/aren-union-invocacion-v1.webp",
      "./assets/images/trajes/aren-union-victoria-v1.webp",
      "./assets/images/trajes/aren-union-capa-v1.webp",
      "./assets/images/trajes/aren-union-vidrio-v1.webp",
      "./assets/images/trajes/aren-union-mano-v1.webp",
      "./assets/images/trajes/aren-union-planta-v1.webp",
      "./assets/images/trajes/aren-union-envejecido-v1.webp",
      "./assets/images/trajes/aren-union-anciano-v1.webp",
      "./assets/images/trajes/aren-union-impacto-duelo-v1.webp"
    ],
    "shared": [
      "./assets/images/elements/cristal-sabiduria-esmeralda.png",
      "./assets/images/fondos/reino-azrak/trono-v1.png"
    ]
  }
};
const owners=new Map();
for(const [id,family] of Object.entries(families)){for(const file of family.files)owners.set(file,id);Object.freeze(family.files);Object.freeze(family.combat);Object.freeze(family.shared);Object.freeze(family);}Object.freeze(families);
const canonical=value=>'./'+String(value).replace(/^\.\//,'').split(/[?#]/)[0];
function forOutfits(ids){const out=[];for(const id of new Set(ids.filter(Boolean))){const family=families[id];if(!family)throw Error('Unknown outfit resource bundle');out.push(...family.files,...family.shared);}return [...new Set(out)];}
function fromPaths(paths){const ids=[];for(const path of paths){const key=canonical(path);const id=owners.get(key);if(id)ids.push(id);else if(key.includes('/trajes/'))throw Error('Outfit resource missing from explicit map');}return forOutfits(ids);}
function combat(id){if(!id)return [];const family=families[id];if(!family)throw Error('Unknown outfit resource bundle');return family.combat.slice();}
return Object.freeze({families,forOutfits,fromPaths,combat});
});
