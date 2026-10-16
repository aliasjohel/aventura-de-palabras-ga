/* Stage 3D adventure banks v1. Keep world/entry positions stable for saved IDs. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.AdventureWordBanks=api;})(globalThis,()=>{
 'use strict';
 const banks = {
  "en": {
    "1": [
      {
        "palabra": "SAND",
        "pista": "Loose grains that cover many desert landscapes."
      },
      {
        "palabra": "DUNE",
        "pista": "A hill of sand shaped by the wind."
      },
      {
        "palabra": "CAMEL",
        "pista": "A desert animal that can go a long time without drinking."
      },
      {
        "palabra": "CACTUS",
        "pista": "A plant with spines that stores water in its tissues."
      },
      {
        "palabra": "OASIS",
        "pista": "A place in a desert where water supports plant life."
      },
      {
        "palabra": "SUN",
        "pista": "The star whose light makes the desert days so bright."
      },
      {
        "palabra": "SCORPION",
        "pista": "A small animal with pincers and a sting at the end of its tail."
      },
      {
        "palabra": "SNAKE",
        "pista": "A long reptile that moves without legs."
      },
      {
        "palabra": "HEAT",
        "pista": "What you feel when the temperature is high."
      },
      {
        "palabra": "COMPASS",
        "pista": "An instrument with a needle that helps you find north."
      },
      {
        "palabra": "PALM",
        "pista": "A tree with a tall trunk and a crown of large leaves."
      },
      {
        "palabra": "DATE",
        "pista": "A sweet fruit that grows on certain palm trees."
      },
      {
        "palabra": "CARAVAN",
        "pista": "A group of travellers crossing the desert together."
      },
      {
        "palabra": "CANTEEN",
        "pista": "A portable container for drinking water on a journey."
      },
      {
        "palabra": "MAP",
        "pista": "A drawing that shows the places and routes of an area."
      },
      {
        "palabra": "MIRAGE",
        "pista": "An optical illusion that may look like distant water."
      },
      {
        "palabra": "DROUGHT",
        "pista": "A long period with little or no rainfall."
      },
      {
        "palabra": "THIRST",
        "pista": "The feeling that tells you that you need to drink."
      },
      {
        "palabra": "DUST",
        "pista": "Very fine particles that can be lifted by the wind."
      },
      {
        "palabra": "ROCK",
        "pista": "A natural solid mass that forms part of the ground."
      },
      {
        "palabra": "STONE",
        "pista": "A small piece of rock that you can pick up from the ground."
      },
      {
        "palabra": "CANYON",
        "pista": "A deep, narrow valley between steep rocky walls."
      },
      {
        "palabra": "PLATEAU",
        "pista": "High ground with a fairly flat top."
      },
      {
        "palabra": "VALLEY",
        "pista": "Low ground between hills or mountains."
      },
      {
        "palabra": "HORIZON",
        "pista": "The distant line where land and sky seem to meet."
      },
      {
        "palabra": "SHADE",
        "pista": "Shelter from direct sunlight when something blocks its rays."
      },
      {
        "palabra": "SHELTER",
        "pista": "A place that protects you from danger or bad weather."
      },
      {
        "palabra": "TENT",
        "pista": "A fabric shelter that you put up when camping."
      },
      {
        "palabra": "TURBAN",
        "pista": "A long cloth wound around the head."
      },
      {
        "palabra": "SANDAL",
        "pista": "An open shoe held on the foot by straps."
      },
      {
        "palabra": "LIZARD",
        "pista": "A scaly reptile with four legs and a long tail."
      },
      {
        "palabra": "GECKO",
        "pista": "A small lizard; many species can climb smooth walls."
      },
      {
        "palabra": "VIPER",
        "pista": "A venomous snake with specialised fangs."
      },
      {
        "palabra": "VULTURE",
        "pista": "A bird that feeds mainly on dead animals."
      },
      {
        "palabra": "FALCON",
        "pista": "A bird of prey known for its fast flight."
      },
      {
        "palabra": "JACKAL",
        "pista": "A wild relative of the dog found in some dry regions."
      },
      {
        "palabra": "FENNEC",
        "pista": "A small desert fox with very large ears."
      },
      {
        "palabra": "DROMEDARY",
        "pista": "A relative of the camel with a single hump."
      },
      {
        "palabra": "BEETLE",
        "pista": "An insect whose hard front wings protect the wings underneath."
      },
      {
        "palabra": "SALT",
        "pista": "A salty mineral left behind when certain waters evaporate."
      },
      {
        "palabra": "GYPSUM",
        "pista": "A soft mineral that can form where mineral-rich water evaporates."
      },
      {
        "palabra": "CLAY",
        "pista": "Fine earth that can be shaped when mixed with water."
      },
      {
        "palabra": "COPPER",
        "pista": "A reddish metal used in wires and utensils."
      },
      {
        "palabra": "QUARTZ",
        "pista": "A hard mineral that can form transparent crystals."
      },
      {
        "palabra": "FOSSIL",
        "pista": "The remains or trace of an ancient living thing preserved in rock."
      },
      {
        "palabra": "RUIN",
        "pista": "What remains of an old or destroyed building."
      },
      {
        "palabra": "PYRAMID",
        "pista": "A structure with a broad base and faces meeting at a point."
      },
      {
        "palabra": "OBELISK",
        "pista": "A tall, narrow monument with a pointed top."
      },
      {
        "palabra": "HIEROGLYPH",
        "pista": "A sign in an ancient writing system that uses pictures."
      },
      {
        "palabra": "AMPHORA",
        "pista": "An ancient vessel with a narrow neck and two handles."
      }
    ],
    "2": [
      {
        "palabra": "CLOUD",
        "pista": "A mass of tiny water droplets or ice crystals floating in the sky."
      },
      {
        "palabra": "WIND",
        "pista": "Moving air that makes flags flutter."
      },
      {
        "palabra": "SUMMIT",
        "pista": "The highest point reached when climbing a mountain."
      },
      {
        "palabra": "EAGLE",
        "pista": "A large bird of prey with excellent eyesight."
      },
      {
        "palabra": "LIGHTNING",
        "pista": "A bright electrical discharge during a storm."
      },
      {
        "palabra": "ALTITUDE",
        "pista": "The height of a place above sea level."
      },
      {
        "palabra": "TEMPLE",
        "pista": "A building dedicated to worship or a sacred power."
      },
      {
        "palabra": "ISLAND",
        "pista": "A piece of land surrounded by water, or by clouds in this world."
      },
      {
        "palabra": "THUNDERSTORM",
        "pista": "A storm with lightning and the sound that follows it."
      },
      {
        "palabra": "CRYSTAL",
        "pista": "The shining treasure that helps keep each world in balance."
      },
      {
        "palabra": "CREST",
        "pista": "The upper ridge or top edge of a mountain."
      },
      {
        "palabra": "MOUNTAINS",
        "pista": "A group of large natural elevations linked in a range."
      },
      {
        "palabra": "PINNACLE",
        "pista": "A high, pointed top of rock."
      },
      {
        "palabra": "SLOPE",
        "pista": "The inclined side of a hill or mountain."
      },
      {
        "palabra": "CLIFF",
        "pista": "A steep face of rock with a deep drop."
      },
      {
        "palabra": "ABYSS",
        "pista": "An extremely deep gap that seems almost bottomless."
      },
      {
        "palabra": "BOULDER",
        "pista": "A very large rock lying on or rising from the ground."
      },
      {
        "palabra": "ROCK",
        "pista": "Natural solid material that makes up mountains."
      },
      {
        "palabra": "BRIDGE",
        "pista": "A structure that lets you cross a river or a deep gap."
      },
      {
        "palabra": "ROPE",
        "pista": "Twisted fibres used for tying or supporting things."
      },
      {
        "palabra": "KNOT",
        "pista": "A tight fastening made by looping a rope around itself."
      },
      {
        "palabra": "CLIMBING",
        "pista": "The activity of going up a steep rock face."
      },
      {
        "palabra": "HARNESS",
        "pista": "A set of straps that holds a climber securely."
      },
      {
        "palabra": "CARABINER",
        "pista": "A metal loop with a gate used to connect climbing equipment."
      },
      {
        "palabra": "BREEZE",
        "pista": "A gentle wind that brushes your face."
      },
      {
        "palabra": "GUST",
        "pista": "A brief and sudden burst of wind."
      },
      {
        "palabra": "GALE",
        "pista": "A very strong wind that shakes things in its path."
      },
      {
        "palabra": "THUNDER",
        "pista": "The loud sound heard after a flash in a storm."
      },
      {
        "palabra": "FLASH",
        "pista": "A sudden, brief burst of light in the sky."
      },
      {
        "palabra": "RAIN",
        "pista": "Water falling from clouds in drops."
      },
      {
        "palabra": "HAIL",
        "pista": "Balls or lumps of ice that fall from storm clouds."
      },
      {
        "palabra": "FOGBANK",
        "pista": "A thick mass of low cloud that can hide the path ahead."
      },
      {
        "palabra": "MIST",
        "pista": "Thin low cloud that leaves distant objects partly visible."
      },
      {
        "palabra": "RAINBOW",
        "pista": "An arc of colours formed by sunlight passing through water droplets."
      },
      {
        "palabra": "SKY",
        "pista": "The space we see above our heads."
      },
      {
        "palabra": "STAR",
        "pista": "A celestial body that shines with its own light."
      },
      {
        "palabra": "MOON",
        "pista": "The natural satellite that travels around Earth."
      },
      {
        "palabra": "COMET",
        "pista": "A celestial body that can grow a long tail near the Sun."
      },
      {
        "palabra": "ECLIPSE",
        "pista": "An event in which one celestial body hides another."
      },
      {
        "palabra": "DAWN",
        "pista": "The first light of day before the sun rises."
      },
      {
        "palabra": "SUNSET",
        "pista": "The time when the sun disappears at the end of the day."
      },
      {
        "palabra": "CONDOR",
        "pista": "A large Andean bird that glides on enormous wings."
      },
      {
        "palabra": "FALCON",
        "pista": "A bird of prey that can reach great speed in a dive."
      },
      {
        "palabra": "FEATHER",
        "pista": "One of the light structures covering a bird's wings."
      },
      {
        "palabra": "WING",
        "pista": "A body part that allows many birds to fly."
      },
      {
        "palabra": "FLIGHT",
        "pista": "The act of travelling through the air."
      },
      {
        "palabra": "BELL",
        "pista": "A metal object that rings when struck."
      },
      {
        "palabra": "ECHO",
        "pista": "A sound heard again after reflecting from a surface."
      },
      {
        "palabra": "SHRINE",
        "pista": "A sacred place dedicated to worship or remembrance."
      },
      {
        "palabra": "COLUMN",
        "pista": "A vertical support that holds up part of a building."
      }
    ],
    "3": [
      {
        "palabra": "SNOW",
        "pista": "White flakes of frozen water that fall from clouds."
      },
      {
        "palabra": "ICE",
        "pista": "Frozen water that can make the ground slippery."
      },
      {
        "palabra": "GLACIER",
        "pista": "A huge mass of ice that moves very slowly over land."
      },
      {
        "palabra": "FROST",
        "pista": "A thin layer of ice crystals on a cold surface."
      },
      {
        "palabra": "AURORA",
        "pista": "Coloured lights that glow and move in the polar sky."
      },
      {
        "palabra": "BLIZZARD",
        "pista": "A snowstorm accompanied by strong wind."
      },
      {
        "palabra": "WINTER",
        "pista": "The coldest season of the year."
      },
      {
        "palabra": "FORTRESS",
        "pista": "A strong, protected building that is hard to capture."
      },
      {
        "palabra": "CRYSTAL",
        "pista": "A shining treasure that keeps this world in balance."
      },
      {
        "palabra": "TEMPERATURE",
        "pista": "The measurement of how hot or cold something is."
      },
      {
        "palabra": "SNOWFLAKE",
        "pista": "One small frozen shape falling in a snow shower."
      },
      {
        "palabra": "ICICLE",
        "pista": "A pointed piece of ice hanging from a surface."
      },
      {
        "palabra": "FREEZE",
        "pista": "A period of cold weather in which water turns to ice."
      },
      {
        "palabra": "COLD",
        "pista": "The feeling you have when the temperature is low."
      },
      {
        "palabra": "FREEZING",
        "pista": "The process in which a liquid becomes solid because of cold."
      },
      {
        "palabra": "THAW",
        "pista": "The melting of snow or ice as the temperature rises."
      },
      {
        "palabra": "AVALANCHE",
        "pista": "A large mass of snow rushing down a mountain slope."
      },
      {
        "palabra": "SNOWSLIDE",
        "pista": "A fall of snow sliding down the side of a mountain."
      },
      {
        "palabra": "ICEBERG",
        "pista": "A large piece of ice floating in the sea."
      },
      {
        "palabra": "TUNDRA",
        "pista": "A very cold landscape with low plants and few trees."
      },
      {
        "palabra": "IGLOO",
        "pista": "A shelter built from blocks of compacted snow."
      },
      {
        "palabra": "SLED",
        "pista": "A vehicle with runners that slides over snow."
      },
      {
        "palabra": "SKI",
        "pista": "A long narrow board used to glide over snow."
      },
      {
        "palabra": "SKATE",
        "pista": "A boot with a blade that lets you glide over ice."
      },
      {
        "palabra": "COAT",
        "pista": "A thick outer garment that protects you from cold."
      },
      {
        "palabra": "SCARF",
        "pista": "A long piece of fabric worn around the neck for warmth."
      },
      {
        "palabra": "GLOVE",
        "pista": "A hand covering with a separate section for each finger."
      },
      {
        "palabra": "MITTEN",
        "pista": "A warm hand covering that keeps four fingers together."
      },
      {
        "palabra": "HAT",
        "pista": "A covering worn on the head to keep it warm."
      },
      {
        "palabra": "BOOT",
        "pista": "Footwear that covers the foot and part of the leg."
      },
      {
        "palabra": "WOOL",
        "pista": "A fibre obtained from the fleece of sheep."
      },
      {
        "palabra": "BLANKET",
        "pista": "A large piece of fabric used to cover and warm the body."
      },
      {
        "palabra": "CHIMNEY",
        "pista": "A passage through which smoke leaves a building."
      },
      {
        "palabra": "BONFIRE",
        "pista": "An outdoor fire that people can gather around for warmth."
      },
      {
        "palabra": "FIREWOOD",
        "pista": "Pieces of cut wood used as fuel."
      },
      {
        "palabra": "SEAL",
        "pista": "A marine mammal with short flippers that may rest on ice."
      },
      {
        "palabra": "WALRUS",
        "pista": "A large marine mammal with two long tusks."
      },
      {
        "palabra": "PENGUIN",
        "pista": "A flightless bird that uses its wings like flippers to swim."
      },
      {
        "palabra": "REINDEER",
        "pista": "A deer from cold regions that can pull a sled."
      },
      {
        "palabra": "HARE",
        "pista": "A long-eared animal; some species turn white in winter."
      },
      {
        "palabra": "WOLF",
        "pista": "A wild mammal that howls and often lives in a pack."
      },
      {
        "palabra": "BEAR",
        "pista": "A large mammal whose polar species has white fur."
      },
      {
        "palabra": "FOX",
        "pista": "A bushy-tailed mammal whose Arctic species survives extreme cold."
      },
      {
        "palabra": "THERMOMETER",
        "pista": "An instrument used to measure temperature."
      },
      {
        "palabra": "HEATER",
        "pista": "A device that warms a room."
      },
      {
        "palabra": "STEAM",
        "pista": "Water in its gaseous state."
      },
      {
        "palabra": "TRANSPARENT",
        "pista": "Describes something you can see through, like clear glass."
      },
      {
        "palabra": "POLAR",
        "pista": "Related to the regions around Earth's poles."
      },
      {
        "palabra": "NORTH",
        "pista": "The direction opposite to south."
      },
      {
        "palabra": "SOUTH",
        "pista": "The direction opposite to north."
      }
    ],
    "4": [
      {
        "palabra": "ASH",
        "pista": "Fine powder left behind after something burns."
      },
      {
        "palabra": "BRIDGE",
        "pista": "A structure joining two sides of a river or a deep gap."
      },
      {
        "palabra": "SHADOW",
        "pista": "A dark area formed when an object blocks light."
      },
      {
        "palabra": "FORGE",
        "pista": "A place where metal is heated and shaped."
      },
      {
        "palabra": "UNITY",
        "pista": "The strength of people joining together for a shared purpose."
      },
      {
        "palabra": "LOYALTY",
        "pista": "The commitment to stand by those who trust you."
      },
      {
        "palabra": "LIGHT",
        "pista": "What makes it possible for us to see in the darkness."
      },
      {
        "palabra": "VALOR",
        "pista": "Bravery that helps a person act despite fear."
      },
      {
        "palabra": "HOPE",
        "pista": "The belief that the future can be better."
      },
      {
        "palabra": "FREEDOM",
        "pista": "The ability to choose your own path."
      },
      {
        "palabra": "FIRE",
        "pista": "Burning that produces light and heat."
      },
      {
        "palabra": "FLAME",
        "pista": "The visible, glowing part of a fire."
      },
      {
        "palabra": "EMBER",
        "pista": "A glowing piece of fuel that burns without a flame."
      },
      {
        "palabra": "SPARK",
        "pista": "A tiny glowing particle that jumps from a fire."
      },
      {
        "palabra": "SMOKE",
        "pista": "Gases and particles rising from something that burns."
      },
      {
        "palabra": "COAL",
        "pista": "A black fuel that can be used to heat a forge."
      },
      {
        "palabra": "LAVA",
        "pista": "Molten rock that has reached Earth's surface."
      },
      {
        "palabra": "VOLCANO",
        "pista": "A mountain with an opening through which molten rock can emerge."
      },
      {
        "palabra": "CRATER",
        "pista": "The bowl-shaped opening at the top of a volcano."
      },
      {
        "palabra": "MAGMA",
        "pista": "Molten rock beneath Earth's surface."
      },
      {
        "palabra": "OBSIDIAN",
        "pista": "Dark volcanic rock with a glassy appearance."
      },
      {
        "palabra": "ROCK",
        "pista": "Natural solid material that forms part of the land."
      },
      {
        "palabra": "CRACK",
        "pista": "A narrow opening in rock or a wall."
      },
      {
        "palabra": "CAVERN",
        "pista": "A large, deep hollow underground."
      },
      {
        "palabra": "TUNNEL",
        "pista": "A passage dug through a mountain or beneath the ground."
      },
      {
        "palabra": "TORCH",
        "pista": "A stick with burning material at one end, used for light."
      },
      {
        "palabra": "LANTERN",
        "pista": "A lamp protected by a case that can light your path."
      },
      {
        "palabra": "IRON",
        "pista": "A metal used to make tools and armour."
      },
      {
        "palabra": "STEEL",
        "pista": "A strong alloy made mainly from iron and carbon."
      },
      {
        "palabra": "ANVIL",
        "pista": "A heavy metal block on which a smith works."
      },
      {
        "palabra": "HAMMER",
        "pista": "A tool used to strike metal and shape it."
      },
      {
        "palabra": "SHIELD",
        "pista": "An object held in front of the body to block attacks."
      },
      {
        "palabra": "ARMOR",
        "pista": "Protective pieces worn over a warrior's body."
      },
      {
        "palabra": "SWORD",
        "pista": "A weapon with a long blade and a handle."
      },
      {
        "palabra": "CHAIN",
        "pista": "A series of linked metal loops."
      },
      {
        "palabra": "KEY",
        "pista": "An object used to open a lock."
      },
      {
        "palabra": "PORTAL",
        "pista": "A gateway connecting distant places in this adventure."
      },
      {
        "palabra": "TOWER",
        "pista": "A tall structure used to watch the surrounding land."
      },
      {
        "palabra": "WALL",
        "pista": "A large barrier that protects a town or fortress."
      },
      {
        "palabra": "CASTLE",
        "pista": "A fortified building with towers and defensive walls."
      },
      {
        "palabra": "THRONE",
        "pista": "The ceremonial seat of a ruler."
      },
      {
        "palabra": "CROWN",
        "pista": "A ring worn on the head as a symbol of royalty."
      },
      {
        "palabra": "BANNER",
        "pista": "A flag representing a kingdom or a group."
      },
      {
        "palabra": "OATH",
        "pista": "A solemn promise to do or uphold something."
      },
      {
        "palabra": "FRIENDSHIP",
        "pista": "Affection and trust between people who care about each other."
      },
      {
        "palabra": "COURAGE",
        "pista": "The strength to face danger even when you feel afraid."
      },
      {
        "palabra": "FORGIVENESS",
        "pista": "The decision to let go of resentment over an offence."
      },
      {
        "palabra": "TRUTH",
        "pista": "What agrees with the facts rather than a lie."
      },
      {
        "palabra": "PEACE",
        "pista": "A state of calm and absence of war."
      },
      {
        "palabra": "DESTINATION",
        "pista": "The place that someone is travelling towards."
      }
    ]
  },
  "pt-BR": {
    "1": [
      {
        "palabra": "AREIA",
        "pista": "Grãos soltos que cobrem muitas paisagens do deserto."
      },
      {
        "palabra": "DUNA",
        "pista": "Monte de areia formado pela ação do vento."
      },
      {
        "palabra": "CAMELO",
        "pista": "Animal do deserto que suporta longos períodos sem beber água."
      },
      {
        "palabra": "CACTO",
        "pista": "Planta com espinhos que armazena água em seus tecidos."
      },
      {
        "palabra": "OÁSIS",
        "pista": "Lugar no deserto onde a água permite o crescimento de plantas."
      },
      {
        "palabra": "SOL",
        "pista": "Estrela cuja luz deixa os dias do deserto tão claros."
      },
      {
        "palabra": "ESCORPIÃO",
        "pista": "Pequeno animal com pinças e um ferrão na ponta da cauda."
      },
      {
        "palabra": "SERPENTE",
        "pista": "Réptil de corpo comprido que se move sem patas."
      },
      {
        "palabra": "CALOR",
        "pista": "Sensação que sentimos quando a temperatura está alta."
      },
      {
        "palabra": "BÚSSOLA",
        "pista": "Instrumento com uma agulha que ajuda a encontrar o norte."
      },
      {
        "palabra": "PALMEIRA",
        "pista": "Árvore de tronco alto com grandes folhas no topo."
      },
      {
        "palabra": "TÂMARA",
        "pista": "Fruto doce produzido por certas palmeiras."
      },
      {
        "palabra": "CARAVANA",
        "pista": "Grupo de viajantes que atravessa o deserto em conjunto."
      },
      {
        "palabra": "CANTIL",
        "pista": "Recipiente portátil para levar água durante uma viagem."
      },
      {
        "palabra": "MAPA",
        "pista": "Desenho que mostra os lugares e caminhos de uma região."
      },
      {
        "palabra": "MIRAGEM",
        "pista": "Ilusão de óptica que pode parecer água ao longe."
      },
      {
        "palabra": "SECA",
        "pista": "Período prolongado com pouca ou nenhuma chuva."
      },
      {
        "palabra": "SEDE",
        "pista": "Sensação que avisa que precisamos beber água."
      },
      {
        "palabra": "POEIRA",
        "pista": "Partículas muito finas que o vento pode levantar."
      },
      {
        "palabra": "ROCHA",
        "pista": "Massa sólida natural que forma parte do terreno."
      },
      {
        "palabra": "PEDRA",
        "pista": "Fragmento de rocha que você pode pegar do chão."
      },
      {
        "palabra": "CÂNION",
        "pista": "Vale profundo e estreito entre paredes de rocha."
      },
      {
        "palabra": "PLANALTO",
        "pista": "Terreno elevado cuja parte superior é relativamente plana."
      },
      {
        "palabra": "VALE",
        "pista": "Terreno baixo situado entre montanhas ou colinas."
      },
      {
        "palabra": "HORIZONTE",
        "pista": "Linha distante onde o céu e a terra parecem se encontrar."
      },
      {
        "palabra": "SOMBRA",
        "pista": "Área protegida da luz direta quando algo bloqueia o sol."
      },
      {
        "palabra": "ABRIGO",
        "pista": "Lugar que oferece proteção contra perigos ou mau tempo."
      },
      {
        "palabra": "TENDA",
        "pista": "Abrigo de tecido que pode ser montado para acampar."
      },
      {
        "palabra": "TURBANTE",
        "pista": "Faixa comprida de tecido enrolada ao redor da cabeça."
      },
      {
        "palabra": "SANDÁLIA",
        "pista": "Calçado aberto preso ao pé por tiras."
      },
      {
        "palabra": "LAGARTO",
        "pista": "Réptil de escamas, quatro patas e cauda comprida."
      },
      {
        "palabra": "LAGARTIXA",
        "pista": "Pequeno lagarto que costuma subir por paredes."
      },
      {
        "palabra": "VÍBORA",
        "pista": "Serpente venenosa com presas especializadas."
      },
      {
        "palabra": "ABUTRE",
        "pista": "Ave que se alimenta principalmente de animais mortos."
      },
      {
        "palabra": "FALCÃO",
        "pista": "Ave de rapina conhecida pela velocidade de seu voo."
      },
      {
        "palabra": "CHACAL",
        "pista": "Parente selvagem do cão encontrado em algumas regiões áridas."
      },
      {
        "palabra": "FENECO",
        "pista": "Pequena raposa do deserto com orelhas muito grandes."
      },
      {
        "palabra": "DROMEDÁRIO",
        "pista": "Parente do camelo que possui uma única corcova."
      },
      {
        "palabra": "ESCARAVELHO",
        "pista": "Inseto cujas asas dianteiras duras protegem as asas de baixo."
      },
      {
        "palabra": "SAL",
        "pista": "Mineral de sabor salgado que resta quando certas águas evaporam."
      },
      {
        "palabra": "SALINA",
        "pista": "Local onde se acumula ou se extrai sal."
      },
      {
        "palabra": "ARGILA",
        "pista": "Terra fina que pode ser moldada quando misturada com água."
      },
      {
        "palabra": "COBRE",
        "pista": "Metal avermelhado usado em fios e utensílios."
      },
      {
        "palabra": "QUARTZO",
        "pista": "Mineral duro que pode formar cristais transparentes."
      },
      {
        "palabra": "FÓSSIL",
        "pista": "Resto ou marca de um ser vivo antigo preservado em rocha."
      },
      {
        "palabra": "RUÍNA",
        "pista": "O que resta de uma construção antiga ou destruída."
      },
      {
        "palabra": "PIRÂMIDE",
        "pista": "Construção de base larga e faces que se encontram em uma ponta."
      },
      {
        "palabra": "OBELISCO",
        "pista": "Monumento alto e estreito com a parte superior pontuda."
      },
      {
        "palabra": "HIERÓGLIFO",
        "pista": "Sinal de uma escrita antiga que usa figuras."
      },
      {
        "palabra": "ÂNFORA",
        "pista": "Vaso antigo de gargalo estreito e duas alças."
      }
    ],
    "2": [
      {
        "palabra": "NUVEM",
        "pista": "Conjunto de gotículas de água ou cristais de gelo suspensos no céu."
      },
      {
        "palabra": "VENTO",
        "pista": "Ar em movimento que faz as bandeiras balançarem."
      },
      {
        "palabra": "TOPO",
        "pista": "Parte mais alta que se alcança ao subir uma montanha."
      },
      {
        "palabra": "ÁGUIA",
        "pista": "Grande ave de rapina com visão muito aguçada."
      },
      {
        "palabra": "RAIO",
        "pista": "Descarga elétrica brilhante que ocorre numa tempestade."
      },
      {
        "palabra": "ALTITUDE",
        "pista": "Altura de um lugar em relação ao nível do mar."
      },
      {
        "palabra": "TEMPLO",
        "pista": "Construção dedicada à adoração ou a um poder sagrado."
      },
      {
        "palabra": "ILHA",
        "pista": "Porção de terra cercada de água, ou de nuvens neste mundo."
      },
      {
        "palabra": "TEMPESTADE",
        "pista": "Fenômeno com ventos fortes e que pode trazer chuva e raios."
      },
      {
        "palabra": "CRISTAL",
        "pista": "Tesouro brilhante que ajuda a manter cada mundo em equilíbrio."
      },
      {
        "palabra": "CUME",
        "pista": "Ponto mais elevado de uma montanha."
      },
      {
        "palabra": "CORDILHEIRA",
        "pista": "Conjunto de montanhas ligadas umas às outras."
      },
      {
        "palabra": "PICO",
        "pista": "Ponta elevada de uma montanha."
      },
      {
        "palabra": "ENCOSTA",
        "pista": "Parte inclinada da lateral de uma montanha."
      },
      {
        "palabra": "PRECIPÍCIO",
        "pista": "Corte do terreno que termina numa queda muito profunda."
      },
      {
        "palabra": "ABISMO",
        "pista": "Profundidade enorme que parece não ter fundo."
      },
      {
        "palabra": "PENHASCO",
        "pista": "Grande formação de rocha que se destaca no terreno."
      },
      {
        "palabra": "ROCHA",
        "pista": "Material sólido natural que forma as montanhas."
      },
      {
        "palabra": "PONTE",
        "pista": "Construção que permite atravessar um rio ou um abismo."
      },
      {
        "palabra": "CORDA",
        "pista": "Conjunto de fibras trançadas usado para prender ou sustentar algo."
      },
      {
        "palabra": "LAÇO",
        "pista": "Volta de corda que pode servir para prender algo."
      },
      {
        "palabra": "ESCALADA",
        "pista": "Atividade de subir por paredes de rocha."
      },
      {
        "palabra": "CADEIRINHA",
        "pista": "Conjunto de tiras que prende o corpo do escalador."
      },
      {
        "palabra": "MOSQUETÃO",
        "pista": "Aro metálico com fecho usado para conectar equipamentos de escalada."
      },
      {
        "palabra": "BRISA",
        "pista": "Vento suave que passa pelo rosto."
      },
      {
        "palabra": "RAJADA",
        "pista": "Sopro de vento breve e repentino."
      },
      {
        "palabra": "VENDAVAL",
        "pista": "Vento muito forte que sacode o que encontra pelo caminho."
      },
      {
        "palabra": "TROVÃO",
        "pista": "Som forte que ouvimos depois de um clarão numa tempestade."
      },
      {
        "palabra": "RELÂMPAGO",
        "pista": "Clarão que ilumina o céu durante uma tempestade."
      },
      {
        "palabra": "CHUVA",
        "pista": "Água que cai das nuvens em gotas."
      },
      {
        "palabra": "GRANIZO",
        "pista": "Bolinhas ou pedaços de gelo que caem das nuvens."
      },
      {
        "palabra": "NEVOEIRO",
        "pista": "Nuvem baixa e densa que dificulta enxergar o caminho."
      },
      {
        "palabra": "NEBLINA",
        "pista": "Névoa leve que ainda permite ver parte do que está ao longe."
      },
      {
        "palabra": "PRISMA",
        "pista": "Peça transparente que pode separar a luz em diferentes cores."
      },
      {
        "palabra": "CÉU",
        "pista": "Espaço que vemos acima de nossas cabeças."
      },
      {
        "palabra": "ESTRELA",
        "pista": "Astro que brilha com luz própria."
      },
      {
        "palabra": "LUA",
        "pista": "Satélite natural que gira ao redor da Terra."
      },
      {
        "palabra": "COMETA",
        "pista": "Astro que pode formar uma longa cauda ao se aproximar do Sol."
      },
      {
        "palabra": "ECLIPSE",
        "pista": "Ocorre quando um astro esconde outro total ou parcialmente."
      },
      {
        "palabra": "ALVORADA",
        "pista": "Primeira claridade do dia antes do nascer do sol."
      },
      {
        "palabra": "OCASO",
        "pista": "Momento em que o sol desaparece ao fim do dia."
      },
      {
        "palabra": "CÔNDOR",
        "pista": "Grande ave dos Andes que plana com asas enormes."
      },
      {
        "palabra": "FALCÃO",
        "pista": "Ave de rapina que pode atingir grande velocidade ao mergulhar."
      },
      {
        "palabra": "PENA",
        "pista": "Uma das estruturas leves que cobrem as asas das aves."
      },
      {
        "palabra": "ASA",
        "pista": "Parte do corpo que permite voar a muitas aves."
      },
      {
        "palabra": "VOO",
        "pista": "Ato de se deslocar pelo ar."
      },
      {
        "palabra": "SINO",
        "pista": "Objeto de metal que soa quando é golpeado."
      },
      {
        "palabra": "ECO",
        "pista": "Som que se repete ao refletir em uma superfície."
      },
      {
        "palabra": "SANTUÁRIO",
        "pista": "Lugar sagrado dedicado à veneração ou ao refúgio."
      },
      {
        "palabra": "COLUNA",
        "pista": "Suporte vertical que sustenta parte de uma construção."
      }
    ],
    "3": [
      {
        "palabra": "NEVE",
        "pista": "Flocos brancos de água congelada que caem das nuvens."
      },
      {
        "palabra": "GELO",
        "pista": "Água congelada que pode deixar o chão escorregadio."
      },
      {
        "palabra": "GELEIRA",
        "pista": "Grande massa de gelo que se move muito lentamente sobre a terra."
      },
      {
        "palabra": "CRISTAIS",
        "pista": "Pequenas estruturas de gelo que podem cobrir superfícies frias."
      },
      {
        "palabra": "AURORA",
        "pista": "Luzes coloridas que brilham e se movem no céu das regiões polares."
      },
      {
        "palabra": "NEVASCA",
        "pista": "Tempestade de neve que pode vir acompanhada de ventos fortes."
      },
      {
        "palabra": "INVERNO",
        "pista": "Estação mais fria do ano."
      },
      {
        "palabra": "FORTALEZA",
        "pista": "Construção protegida e difícil de conquistar."
      },
      {
        "palabra": "CRISTAL",
        "pista": "Tesouro brilhante que mantém este mundo em equilíbrio."
      },
      {
        "palabra": "TEMPERATURA",
        "pista": "Medida que indica o quanto algo está quente ou frio."
      },
      {
        "palabra": "FLOCO",
        "pista": "Pequena porção de neve que cai do céu."
      },
      {
        "palabra": "ESTALACTITE",
        "pista": "Formação em ponta que pende de um teto e pode ser de gelo."
      },
      {
        "palabra": "GEADA",
        "pista": "Camada de gelo que se forma no solo e nas plantas em noites frias."
      },
      {
        "palabra": "FRIO",
        "pista": "Sensação que sentimos quando a temperatura está baixa."
      },
      {
        "palabra": "CONGELAMENTO",
        "pista": "Processo em que um líquido se torna sólido pela ação do frio."
      },
      {
        "palabra": "DEGELO",
        "pista": "Derretimento da neve ou do gelo quando a temperatura aumenta."
      },
      {
        "palabra": "AVALANCHE",
        "pista": "Grande massa de neve que desce rapidamente por uma encosta."
      },
      {
        "palabra": "DESLIZAMENTO",
        "pista": "Movimento de uma massa de terra ou neve encosta abaixo."
      },
      {
        "palabra": "ICEBERG",
        "pista": "Grande bloco de gelo que flutua no mar."
      },
      {
        "palabra": "TUNDRA",
        "pista": "Paisagem muito fria com plantas baixas e poucas árvores."
      },
      {
        "palabra": "IGLU",
        "pista": "Abrigo construído com blocos de neve compacta."
      },
      {
        "palabra": "TRENÓ",
        "pista": "Veículo com patins que desliza sobre a neve."
      },
      {
        "palabra": "ESQUI",
        "pista": "Prancha longa e estreita usada para deslizar sobre a neve."
      },
      {
        "palabra": "PATIM",
        "pista": "Calçado com lâmina que permite deslizar sobre o gelo."
      },
      {
        "palabra": "CASACO",
        "pista": "Peça de roupa grossa que protege o corpo contra o frio."
      },
      {
        "palabra": "CACHECOL",
        "pista": "Peça comprida de tecido usada ao redor do pescoço para aquecer."
      },
      {
        "palabra": "LUVA",
        "pista": "Peça que cobre a mão e pode ter uma divisão para cada dedo."
      },
      {
        "palabra": "CAPUZ",
        "pista": "Parte de um casaco que pode cobrir e proteger a cabeça."
      },
      {
        "palabra": "GORRO",
        "pista": "Peça usada na cabeça para protegê-la do frio."
      },
      {
        "palabra": "BOTA",
        "pista": "Calçado que cobre o pé e parte da perna."
      },
      {
        "palabra": "FELTRO",
        "pista": "Material compacto que pode ser feito com fibras de lã."
      },
      {
        "palabra": "MANTA",
        "pista": "Peça grande de tecido usada para cobrir e aquecer o corpo."
      },
      {
        "palabra": "CHAMINÉ",
        "pista": "Passagem por onde a fumaça sai de uma construção."
      },
      {
        "palabra": "FOGUEIRA",
        "pista": "Fogo aceso ao ar livre que pode servir para aquecer as pessoas."
      },
      {
        "palabra": "LENHA",
        "pista": "Pedaços de madeira cortada usados como combustível."
      },
      {
        "palabra": "FOCA",
        "pista": "Mamífero marinho de nadadeiras curtas que pode descansar no gelo."
      },
      {
        "palabra": "MORSA",
        "pista": "Grande mamífero marinho que possui duas presas compridas."
      },
      {
        "palabra": "PINGUIM",
        "pista": "Ave que não voa e usa as asas como nadadeiras para nadar."
      },
      {
        "palabra": "RENA",
        "pista": "Cervo de regiões frias que pode puxar um trenó."
      },
      {
        "palabra": "LEBRE",
        "pista": "Animal de orelhas compridas; algumas espécies ficam brancas no inverno."
      },
      {
        "palabra": "LOBO",
        "pista": "Mamífero selvagem que uiva e costuma viver em alcateias."
      },
      {
        "palabra": "URSO",
        "pista": "Grande mamífero cuja espécie polar tem pelos brancos."
      },
      {
        "palabra": "RAPOSA",
        "pista": "Mamífero de cauda peluda cuja espécie ártica suporta frio intenso."
      },
      {
        "palabra": "TERMÔMETRO",
        "pista": "Instrumento usado para medir a temperatura."
      },
      {
        "palabra": "AQUECEDOR",
        "pista": "Aparelho usado para aquecer um ambiente."
      },
      {
        "palabra": "VAPOR",
        "pista": "Água no estado gasoso."
      },
      {
        "palabra": "TRANSPARENTE",
        "pista": "Diz-se de algo através do qual é possível enxergar, como vidro limpo."
      },
      {
        "palabra": "POLAR",
        "pista": "Relacionado às regiões próximas dos polos da Terra."
      },
      {
        "palabra": "NORTE",
        "pista": "Ponto cardeal oposto ao sul."
      },
      {
        "palabra": "SUL",
        "pista": "Ponto cardeal oposto ao norte."
      }
    ],
    "4": [
      {
        "palabra": "CINZA",
        "pista": "Pó fino que sobra depois que algo é queimado."
      },
      {
        "palabra": "PONTE",
        "pista": "Construção que une dois lados de um rio ou de um abismo."
      },
      {
        "palabra": "SOMBRA",
        "pista": "Área escura formada quando um objeto bloqueia a luz."
      },
      {
        "palabra": "FORJA",
        "pista": "Local onde o metal é aquecido e trabalhado."
      },
      {
        "palabra": "UNIÃO",
        "pista": "Força de pessoas que se juntam para um objetivo comum."
      },
      {
        "palabra": "LEALDADE",
        "pista": "Compromisso de permanecer ao lado de quem confia em você."
      },
      {
        "palabra": "LUZ",
        "pista": "O que nos permite enxergar na escuridão."
      },
      {
        "palabra": "VALOR",
        "pista": "Bravura que ajuda alguém a agir apesar do medo."
      },
      {
        "palabra": "ESPERANÇA",
        "pista": "Confiança de que o futuro pode ser melhor."
      },
      {
        "palabra": "LIBERDADE",
        "pista": "Possibilidade de escolher o próprio caminho."
      },
      {
        "palabra": "FOGO",
        "pista": "Queima que produz luz e calor."
      },
      {
        "palabra": "CHAMA",
        "pista": "Parte visível e luminosa de um fogo."
      },
      {
        "palabra": "BRASA",
        "pista": "Pedaço de combustível que fica incandescente sem produzir chama."
      },
      {
        "palabra": "FAÍSCA",
        "pista": "Pequena partícula acesa que salta do fogo."
      },
      {
        "palabra": "FUMAÇA",
        "pista": "Mistura de gases e partículas que sai de algo que está queimando."
      },
      {
        "palabra": "CARVÃO",
        "pista": "Combustível preto que pode ser usado para aquecer uma forja."
      },
      {
        "palabra": "LAVA",
        "pista": "Rocha derretida que chegou à superfície da Terra."
      },
      {
        "palabra": "VULCÃO",
        "pista": "Montanha com uma abertura por onde pode sair rocha derretida."
      },
      {
        "palabra": "CRATERA",
        "pista": "Abertura em forma de bacia na parte superior de um vulcão."
      },
      {
        "palabra": "MAGMA",
        "pista": "Rocha derretida que está abaixo da superfície da Terra."
      },
      {
        "palabra": "OBSIDIANA",
        "pista": "Rocha vulcânica escura com aparência semelhante à do vidro."
      },
      {
        "palabra": "ROCHA",
        "pista": "Material sólido natural que faz parte do terreno."
      },
      {
        "palabra": "FENDA",
        "pista": "Abertura estreita em uma rocha ou parede."
      },
      {
        "palabra": "CAVERNA",
        "pista": "Cavidade grande e profunda debaixo da terra."
      },
      {
        "palabra": "TÚNEL",
        "pista": "Passagem escavada através de uma montanha ou do subsolo."
      },
      {
        "palabra": "TOCHA",
        "pista": "Bastão com material aceso em uma ponta, usado para iluminar."
      },
      {
        "palabra": "LAMPIÃO",
        "pista": "Lâmpada protegida por uma estrutura que pode iluminar o caminho."
      },
      {
        "palabra": "FERRO",
        "pista": "Metal usado para fabricar ferramentas e armaduras."
      },
      {
        "palabra": "AÇO",
        "pista": "Liga resistente feita principalmente de ferro e carbono."
      },
      {
        "palabra": "BIGORNA",
        "pista": "Bloco pesado de metal sobre o qual trabalha um ferreiro."
      },
      {
        "palabra": "MARTELO",
        "pista": "Ferramenta usada para golpear o metal e dar forma a ele."
      },
      {
        "palabra": "ESCUDO",
        "pista": "Objeto segurado diante do corpo para bloquear ataques."
      },
      {
        "palabra": "ARMADURA",
        "pista": "Conjunto de peças usadas para proteger o corpo de um guerreiro."
      },
      {
        "palabra": "ESPADA",
        "pista": "Arma com lâmina comprida e empunhadura."
      },
      {
        "palabra": "CORRENTE",
        "pista": "Sequência de elos metálicos ligados uns aos outros."
      },
      {
        "palabra": "CHAVE",
        "pista": "Objeto usado para abrir uma fechadura."
      },
      {
        "palabra": "PORTAL",
        "pista": "Passagem que conecta lugares distantes nesta aventura."
      },
      {
        "palabra": "TORRE",
        "pista": "Construção alta usada para observar o terreno ao redor."
      },
      {
        "palabra": "MURALHA",
        "pista": "Grande barreira que protege uma cidade ou fortaleza."
      },
      {
        "palabra": "CASTELO",
        "pista": "Construção fortificada com torres e muralhas defensivas."
      },
      {
        "palabra": "TRONO",
        "pista": "Assento cerimonial de quem governa um reino."
      },
      {
        "palabra": "COROA",
        "pista": "Aro usado na cabeça como símbolo de realeza."
      },
      {
        "palabra": "ESTANDARTE",
        "pista": "Bandeira que representa um reino ou um grupo."
      },
      {
        "palabra": "JURAMENTO",
        "pista": "Promessa solene de fazer ou cumprir algo."
      },
      {
        "palabra": "AMIZADE",
        "pista": "Afeto e confiança entre pessoas que gostam umas das outras."
      },
      {
        "palabra": "CORAGEM",
        "pista": "Força para enfrentar um perigo mesmo sentindo medo."
      },
      {
        "palabra": "PERDÃO",
        "pista": "Decisão de deixar para trás o ressentimento por uma ofensa."
      },
      {
        "palabra": "VERDADE",
        "pista": "O que corresponde aos fatos e se opõe à mentira."
      },
      {
        "palabra": "PAZ",
        "pista": "Estado de tranquilidade e ausência de guerra."
      },
      {
        "palabra": "DESTINO",
        "pista": "Lugar para o qual alguém está viajando."
      }
    ]
  }
};
 for(const worlds of Object.values(banks)){for(const entries of Object.values(worlds)){entries.forEach(Object.freeze);Object.freeze(entries);}Object.freeze(worlds);}
 return Object.freeze({version:'worlds-v1',banks:Object.freeze(banks)});
});
