(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./word-gameplay.js'):root.WordGameplay);if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcadeRules=api;})(globalThis,(WordGameplay)=>{
 'use strict';
 const nybor=Object.freeze({interval:3200,accuracy:.62,recoveryMs:12000});
 const rivalIntervals=Object.freeze({dragon_hielo:nybor.interval,kairos:2700,t_shadow:2500,azrak:2500});
 // One letter attempt per timer tick; effects may pause a tick, never accelerate it.
 function rivalInterval(floor,rival){return rivalIntervals[rival]||Math.max(2800,3550-Math.max(0,Math.min(9,Math.trunc(Number(floor)||0)))*125);}
 function rivalAccuracy(base,rival){return rival==='dragon_hielo'?Math.min(base,nybor.accuracy):base;}
 function createNyborFreezeRecovery(){
  let pendingOrActive=false,readyAt=0;
  return Object.freeze({
   reserve(now){if(pendingOrActive||now<readyAt)return false;pendingOrActive=true;return true;},
   finish(now){if(pendingOrActive){pendingOrActive=false;readyAt=now+nybor.recoveryMs;}},
   reset(){pendingOrActive=false;readyAt=0;},
  });
 }
 // Editorial allowlists, not word-length guesses about familiarity. Global banks stay intact.
 const commonVocabulary={
  es:{
   paises:'ARGENTINA BRASIL CHILE PERÚ ESPAÑA MÉXICO CANADÁ ITALIA JAPÓN INDIA FRANCIA ALEMANIA PORTUGAL URUGUAY PARAGUAY BOLIVIA COLOMBIA ECUADOR CUBA CHINA EGIPTO AUSTRALIA SUIZA GRECIA',
   frutas:'MANZANA PERA UVA KIWI MANGO LIMÓN NARANJA BANANA CIRUELA MELÓN SANDÍA PAPAYA ANANÁ DURAZNO CEREZA FRUTILLA MANDARINA POMELO COCO HIGO GRANADA FRAMBUESA MORA PALTA',
   animales:'PERRO GATO CABALLO CONEJO LEÓN TIGRE OSO LOBO ZORRO VACA OVEJA CABRA CERDO PATO GALLO GALLINA MONO CEBRA JIRAFA ELEFANTE TORTUGA DELFÍN TIBURÓN BALLENA',
   comidas:'PAN QUESO LECHE HUEVO ARROZ SOPA PIZZA PASTA EMPANADA MILANESA HELADO ENSALADA TORTILLA ASADO GUISO TARTA FLAN GALLETA POLLO CARNE PESCADO CHOCOLATE MIEL AZÚCAR',
   profesiones:'MÉDICO MAESTRO DOCENTE BOMBERO ABOGADO PANADERO PILOTO ACTOR COCINERO DENTISTA MECÁNICO PINTOR MÚSICO CANTANTE POLICÍA CARTERO VENDEDOR CARPINTERO JARDINERO ENFERMERO PROFESOR TAXISTA ESCRITOR PERIODISTA',
   deportes:'FÚTBOL TENIS RUGBY HOCKEY BOXEO NATACIÓN CICLISMO VOLEY GOLF JUDO BÁSQUET BÉISBOL PÁDEL SURF REMO VELA ATLETISMO KARATE LUCHA AJEDREZ PATINAJE ESQUÍ PESCA GIMNASIA',
   transportes:'AUTO TREN BARCO AVIÓN METRO BICICLETA CAMIÓN COLECTIVO MOTO TAXI SUBTE ÓMNIBUS TRACTOR CAMIONETA MONOPATÍN TRICICLO VELERO LANCHA CANOA BOTE YATE SUBMARINO AMBULANCIA CARRO',
   objetos:'MESA SILLA RELOJ LLAVE VASO LÁMPARA CUADERNO ESPEJO BOTELLA TIJERA PLATO TAZA TENEDOR CUCHILLO CUCHARA OLLA MOCHILA PARAGUAS ZAPATO CAMISA LIBRO LÁPIZ PAPEL CAMA',
   naturaleza:'SOL MAR RÍO LUNA MONTAÑA BOSQUE NUBE VIENTO LAGUNA PLAYA ISLA VALLE DESIERTO SELVA CASCADA LAGO CUEVA ROCA ARENA TIERRA LLUVIA NIEVE ÁRBOL FLOR',
   nombres:'ANA LUZ LEO JUAN SOFÍA TOMÁS CARLOS ELENA MARÍA PEDRO LUCÍA DIEGO CAMILA MATEO PAULA PABLO LAURA MARCOS JULIÁN EMILIA BRUNO DANIELA MARTINA NICOLÁS',
   invertebrados:'ABEJA AVISPA HORMIGA MARIPOSA POLILLA MOSCA MOSQUITO PULGA PIOJO CUCARACHA GRILLO ESCARABAJO ARAÑA GUSANO LOMBRIZ BABOSA CARACOL PULPO CALAMAR MEDUSA CANGREJO CAMARÓN ALMEJA OSTRA',
  },
  en:{
   paises:'ARGENTINA BRAZIL CANADA CHILE CHINA COLOMBIA CUBA EGYPT FRANCE GERMANY GREECE INDIA IRELAND ITALY JAMAICA JAPAN MEXICO NORWAY PERU PORTUGAL SPAIN SWEDEN AUSTRALIA TURKEY',
   frutas:'APPLE BANANA CHERRY COCONUT GRAPE KIWI LEMON LIME MANGO MELON ORANGE PAPAYA PEACH PEAR PINEAPPLE PLUM RASPBERRY STRAWBERRY WATERMELON APRICOT AVOCADO BLUEBERRY BLACKBERRY FIG',
   animales:'CAT DOG BEAR HORSE COW SHEEP GOAT PIG DUCK CHICKEN LION TIGER WOLF FOX RABBIT MONKEY ZEBRA GIRAFFE ELEPHANT TURTLE DOLPHIN SHARK WHALE FROG',
   comidas:'BREAD BUTTER CAKE CHEESE CHOCOLATE COOKIE CREAM EGG FISH FRIES HAM HONEY JAM MEAT PASTA PIE PIZZA POTATO RICE SALAD SANDWICH SOUP SUGAR TOAST',
   profesiones:'ACTOR ARTIST BAKER BARBER CHEF COACH COOK DANCER DENTIST DOCTOR DRIVER FARMER GUARD JUDGE LAWYER MECHANIC MUSICIAN NURSE PAINTER PILOT PLUMBER SINGER TEACHER WRITER',
   deportes:'FOOTBALL SOCCER TENNIS GOLF HOCKEY BOXING SWIMMING CYCLING RUNNING JUDO KARATE RUGBY BASEBALL BOWLING SKATING SKIING SURFING ROWING SAILING CHESS DIVING DARTS CLIMBING WALKING',
   transportes:'CAR BUS TRAIN BOAT SHIP TAXI TRUCK BICYCLE AIRPLANE HELICOPTER SUBWAY TRAM VAN TRACTOR MOTORBIKE SCOOTER CANOE KAYAK FERRY AMBULANCE ROCKET BALLOON SAILBOAT SUBMARINE',
   objetos:'TABLE CHAIR CLOCK KEY GLASS LAMP NOTEBOOK MIRROR BOTTLE PLATE CUP FORK KNIFE SPOON PAN BACKPACK UMBRELLA SHOE SHIRT BOOK PENCIL PAPER BED PHONE',
   naturaleza:'SUN MOON SKY RAIN SNOW CLOUD WIND TREE FLOWER RIVER LAKE FIRE OCEAN BEACH ISLAND FOREST MOUNTAIN ROCK SAND EARTH WATER LEAF STAR STORM',
   nombres:'ANNA EMMA EMILY ALICE JOHN JAMES DAVID DANIEL JACK JANE KATE MICHAEL SARAH PETER PAUL LUCY HARRY HENRY THOMAS ROBERT JULIA LAURA LILY OLIVIA',
   invertebrados:'ANT BEE BEETLE BUTTERFLY MOSQUITO CATERPILLAR CRICKET DRAGONFLY FLEA FLY LADYBUG MOTH WASP SPIDER SCORPION EARTHWORM WORM SLUG SNAIL CRAB LOBSTER OCTOPUS SQUID JELLYFISH',
  },
  'pt-BR':{
   paises:'ARGENTINA BRASIL CANADÁ CHILE CHINA COLÔMBIA CUBA EGITO FRANÇA ALEMANHA GRÉCIA ÍNDIA IRLANDA ITÁLIA JAPÃO MÉXICO PERU PORTUGAL ESPANHA URUGUAI PARAGUAI BOLÍVIA AUSTRÁLIA SUÍÇA',
   frutas:'ABACATE ABACAXI BANANA MAÇÃ PERA UVA LARANJA LIMÃO MANGA MELÃO MELANCIA MORANGO MAMÃO COCO GOIABA MARACUJÁ PÊSSEGO AMEIXA CEREJA AMORA FIGO KIWI CAJU TANGERINA',
   animales:'CACHORRO GATO CAVALO COELHO LEÃO TIGRE URSO LOBO RAPOSA VACA OVELHA CABRA PORCO PATO GALO GALINHA MACACO ZEBRA GIRAFA ELEFANTE TARTARUGA GOLFINHO TUBARÃO BALEIA',
   comidas:'ARROZ FEIJÃO PÃO QUEIJO LEITE OVO CARNE FRANGO FARINHA SOPA SALADA PIZZA BOLO BISCOITO SORVETE PUDIM CHOCOLATE MANTEIGA AÇÚCAR MEL BATATA MACARRÃO PIPOCA TORTA',
   profesiones:'MÉDICO PROFESSOR BOMBEIRO ADVOGADO PADEIRO PILOTO ATOR ATRIZ COZINHEIRO DENTISTA MECÂNICO PINTOR MÚSICO CANTOR POLICIAL CARTEIRO VENDEDOR MOTORISTA PEDREIRO ENFERMEIRO JORNALISTA PESCADOR SOLDADO ARTISTA',
   deportes:'FUTEBOL TÊNIS BASQUETE VÔLEI NATAÇÃO CICLISMO CORRIDA BOXE JUDÔ KARATÊ GOLFE HANDEBOL GINÁSTICA SURFE REMO VELA LUTA XADREZ BOLICHE SKATE FUTSAL PETECA PESCA SALTOS',
   transportes:'CARRO TREM BARCO AVIÃO METRÔ BICICLETA CAMINHÃO ÔNIBUS MOTO TÁXI TRATOR CANOA LANCHA NAVIO BALSA BONDE FOGUETE BALÃO AMBULÂNCIA HELICÓPTERO PATINETE TRICICLO VELEIRO SUBMARINO',
   objetos:'MESA CADEIRA RELÓGIO CHAVE COPO LÂMPADA CADERNO ESPELHO GARRAFA TESOURA PRATO XÍCARA GARFO FACA COLHER PANELA MOCHILA SAPATO CAMISA LIVRO LÁPIS PAPEL CAMA CANETA',
   naturaleza:'SOL MAR RIO LUA MONTANHA FLORESTA NUVEM VENTO LAGOA PRAIA ILHA VALE DESERTO SELVA CACHOEIRA LAGO CAVERNA PEDRA AREIA TERRA CHUVA NEVE ÁRVORE FLOR',
   nombres:'ANA MARIA JOÃO JOSÉ PEDRO PAULO LUCAS JÚLIA SOFIA LAURA CARLOS DANIEL DIEGO CAMILA CLARA BRUNO GABRIEL RAFAEL MIGUEL FELIPE ALICE MARCOS BEATRIZ TIAGO',
   invertebrados:'ABELHA BARATA BESOURO BORBOLETA FORMIGA GRILO LAGARTA MOSCA MOSQUITO CIGARRA JOANINHA PULGA PIOLHO VESPA ARANHA ESCORPIÃO MINHOCA LESMA CARACOL CAMARÃO CARANGUEJO LULA POLVO LAGOSTA',
  },
 };
 for(const topics of Object.values(commonVocabulary)){for(const key of Object.keys(topics))topics[key]=Object.freeze(topics[key].split(' '));Object.freeze(topics);}Object.freeze(commonVocabulary);
 function vocabularyLimits(floor,rival){
  if(rival==='kairos')return {maxLength:9,maxDistinct:8};
  if(rival==='t_shadow'||rival==='azrak')return {maxLength:10,maxDistinct:9};
  return Number(floor)<3?{maxLength:8,maxDistinct:7}:{maxLength:9,maxDistinct:8};
 }
 function wordPool({bank=[],language,category,floor=0,rival=''}){
  const approved=new Set(commonVocabulary[language]?.[category]||[]),rules=WordGameplay.rules(language),limits=vocabularyLimits(floor,rival),seen=new Set();
  return bank.filter(word=>{
   const display=rules.display(word),key=rules.key(word);
   if(!approved.has(display)||!rules.validate(word)||word.length>limits.maxLength||new Set(key).size>limits.maxDistinct||seen.has(key))return false;
   seen.add(key);return true;
  });
 }
 function createCategoryRotation({storage,random=Math.random}={}){
  const memory=new Map(),prefix='categoriasRivalTorreV1:';
  function next(character,themes){
   const keys=[...new Set(themes)];if(!keys.length)throw Error('La torre necesita categorías válidas.');
   const key=prefix+character,signature=keys.slice().sort().join('|');let state=memory.get(key);
   if(!state)try{state=JSON.parse(storage?.getItem(key)||'null');}catch{}
   if(state?.version!==1||state.signature!==signature||!Array.isArray(state.remaining)||new Set(state.remaining).size!==state.remaining.length||state.remaining.some(topic=>!keys.includes(topic)))state={version:1,signature,remaining:[]};
   if(!state.remaining.length){state.remaining=keys.slice();for(let i=state.remaining.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[state.remaining[i],state.remaining[j]]=[state.remaining[j],state.remaining[i]];}}
   const topic=state.remaining.shift();memory.set(key,state);try{storage?.setItem(key,JSON.stringify(state));}catch{}
   return topic;
  }
  return Object.freeze({next});
 }
 return Object.freeze({nybor,rivalIntervals,rivalInterval,rivalAccuracy,createNyborFreezeRecovery,commonVocabulary,vocabularyLimits,wordPool,createCategoryRotation});
});
