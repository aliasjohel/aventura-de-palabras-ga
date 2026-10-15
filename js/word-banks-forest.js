/* Forest pilot banks, v1. Keep order stable: history IDs refer to entry positions. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.ForestWordBanks=api;})(globalThis,()=>{
 'use strict';
 const banks = {
  "en": [
    {
      "palabra": "TREE",
      "pista": "It has a trunk, branches and leaves."
    },
    {
      "palabra": "LEAF",
      "pista": "A flat green part that grows on a branch."
    },
    {
      "palabra": "RIVER",
      "pista": "A large natural flow of water through the land."
    },
    {
      "palabra": "FOX",
      "pista": "A wild animal with a pointed nose and a bushy tail."
    },
    {
      "palabra": "CAVE",
      "pista": "A natural hollow in rock that can provide shelter."
    },
    {
      "palabra": "MOSS",
      "pista": "A soft green plant that carpets damp rocks and tree trunks."
    },
    {
      "palabra": "WOLF",
      "pista": "A wild relative of the dog that often lives in a pack."
    },
    {
      "palabra": "DEER",
      "pista": "A woodland animal; the males of many species grow antlers."
    },
    {
      "palabra": "BRANCH",
      "pista": "A woody part that grows out from a tree trunk."
    },
    {
      "palabra": "OWL",
      "pista": "A bird with large eyes that often hunts at night."
    },
    {
      "palabra": "SQUIRREL",
      "pista": "A small rodent with a bushy tail that climbs trees."
    },
    {
      "palabra": "RABBIT",
      "pista": "A small animal with long ears that may live in a burrow."
    },
    {
      "palabra": "HARE",
      "pista": "A long-eared relative of the rabbit, known for running fast."
    },
    {
      "palabra": "HEDGEHOG",
      "pista": "A small mammal that curls up to protect itself with spines."
    },
    {
      "palabra": "BADGER",
      "pista": "A digging mammal with dark and pale stripes on its face."
    },
    {
      "palabra": "BEAVER",
      "pista": "A rodent that builds dams from branches."
    },
    {
      "palabra": "OTTER",
      "pista": "A playful mammal that swims in rivers and catches fish."
    },
    {
      "palabra": "BOAR",
      "pista": "A wild pig with tusks."
    },
    {
      "palabra": "BEAR",
      "pista": "A large furry mammal that may sleep through winter."
    },
    {
      "palabra": "BUTTERFLY",
      "pista": "An insect with colourful wings that was once a caterpillar."
    },
    {
      "palabra": "BEE",
      "pista": "An insect that visits flowers to collect nectar."
    },
    {
      "palabra": "ANT",
      "pista": "A tiny insect that lives in a colony and often follows trails."
    },
    {
      "palabra": "CRICKET",
      "pista": "An insect that chirps by rubbing parts of its wings together."
    },
    {
      "palabra": "SNAIL",
      "pista": "A slow animal that carries a coiled shell on its back."
    },
    {
      "palabra": "FROG",
      "pista": "An amphibian that jumps and croaks beside ponds."
    },
    {
      "palabra": "TOAD",
      "pista": "An amphibian with bumpy skin, related to the frog."
    },
    {
      "palabra": "BIRD",
      "pista": "An animal with feathers, a beak and two wings."
    },
    {
      "palabra": "NEST",
      "pista": "A shelter where birds lay their eggs."
    },
    {
      "palabra": "FEATHER",
      "pista": "One of the light structures that cover a bird's body."
    },
    {
      "palabra": "TRUNK",
      "pista": "The thick main stem that supports a tree's branches."
    },
    {
      "palabra": "ROOT",
      "pista": "The part of a plant that takes up water from the soil."
    },
    {
      "palabra": "BARK",
      "pista": "The protective outer covering of a tree trunk."
    },
    {
      "palabra": "SEED",
      "pista": "It can sprout and grow into a new plant."
    },
    {
      "palabra": "ACORN",
      "pista": "The nut of an oak tree, with a little cup at one end."
    },
    {
      "palabra": "PINECONE",
      "pista": "A woody cone that holds the seeds of a pine tree."
    },
    {
      "palabra": "FERN",
      "pista": "A plant with divided fronds that does not produce flowers."
    },
    {
      "palabra": "MUSHROOM",
      "pista": "A fungus that often has a cap on top of a stalk."
    },
    {
      "palabra": "FLOWER",
      "pista": "The colourful part of many plants that attracts pollinators."
    },
    {
      "palabra": "PETAL",
      "pista": "One of the coloured parts that make up a flower."
    },
    {
      "palabra": "OAK",
      "pista": "A tree with strong wood that produces acorns."
    },
    {
      "palabra": "PINE",
      "pista": "An evergreen tree with needles and woody cones."
    },
    {
      "palabra": "WILLOW",
      "pista": "A tree whose long branches may hang down beside water."
    },
    {
      "palabra": "SHRUB",
      "pista": "A woody plant, shorter than a tree, with several stems."
    },
    {
      "palabra": "VINE",
      "pista": "A plant that climbs or winds around other surfaces."
    },
    {
      "palabra": "PATH",
      "pista": "A narrow track for walking through the woods."
    },
    {
      "palabra": "STREAM",
      "pista": "A natural flow of water smaller than a river."
    },
    {
      "palabra": "WATERFALL",
      "pista": "Water dropping over the edge of a steep slope."
    },
    {
      "palabra": "POND",
      "pista": "A small, still body of water."
    },
    {
      "palabra": "DEWDROP",
      "pista": "A tiny bead of water that forms on leaves at dawn."
    },
    {
      "palabra": "CLEARING",
      "pista": "An open space among trees where sunlight reaches the ground."
    }
  ],
  "pt-BR": [
    {
      "palabra": "ÁRVORE",
      "pista": "Tem tronco, galhos e folhas."
    },
    {
      "palabra": "FOLHA",
      "pista": "Parte geralmente verde que cresce nos galhos de uma planta."
    },
    {
      "palabra": "RIO",
      "pista": "Corrente natural de água que atravessa a paisagem."
    },
    {
      "palabra": "RAPOSA",
      "pista": "Animal de focinho pontudo e cauda comprida e peluda."
    },
    {
      "palabra": "CAVERNA",
      "pista": "Cavidade natural na rocha que pode servir de abrigo."
    },
    {
      "palabra": "MUSGO",
      "pista": "Planta pequena que forma um tapete verde em lugares úmidos."
    },
    {
      "palabra": "LOBO",
      "pista": "Parente selvagem do cão que costuma viver em alcateia."
    },
    {
      "palabra": "CERVO",
      "pista": "Animal da floresta; os machos de muitas espécies têm galhadas."
    },
    {
      "palabra": "GALHO",
      "pista": "Parte de madeira que sai do tronco de uma árvore."
    },
    {
      "palabra": "CORUJA",
      "pista": "Ave de olhos grandes que costuma caçar à noite."
    },
    {
      "palabra": "ESQUILO",
      "pista": "Pequeno roedor de cauda peluda que sobe em árvores."
    },
    {
      "palabra": "COELHO",
      "pista": "Animal de orelhas compridas que pode viver em tocas."
    },
    {
      "palabra": "LEBRE",
      "pista": "Parente do coelho que corre muito depressa."
    },
    {
      "palabra": "OURIÇO",
      "pista": "Pequeno mamífero que usa espinhos para se proteger."
    },
    {
      "palabra": "TEXUGO",
      "pista": "Mamífero que escava e tem faixas claras e escuras no rosto."
    },
    {
      "palabra": "CASTOR",
      "pista": "Roedor que constrói barragens com galhos."
    },
    {
      "palabra": "LONTRA",
      "pista": "Mamífero que nada em rios e se alimenta de peixes."
    },
    {
      "palabra": "JAVALI",
      "pista": "Porco selvagem que possui presas."
    },
    {
      "palabra": "URSO",
      "pista": "Grande mamífero peludo que pode passar o inverno em repouso."
    },
    {
      "palabra": "BORBOLETA",
      "pista": "Inseto de asas coloridas que antes foi uma lagarta."
    },
    {
      "palabra": "ABELHA",
      "pista": "Inseto que visita flores para recolher néctar."
    },
    {
      "palabra": "FORMIGA",
      "pista": "Inseto pequeno que vive em colônias e costuma seguir trilhas."
    },
    {
      "palabra": "GRILO",
      "pista": "Inseto que canta esfregando partes das asas."
    },
    {
      "palabra": "CARACOL",
      "pista": "Animal lento que carrega uma concha em espiral."
    },
    {
      "palabra": "PERERECA",
      "pista": "Pequeno anfíbio que pode se prender às folhas com os dedos."
    },
    {
      "palabra": "SAPO",
      "pista": "Anfíbio de pele rugosa que costuma viver perto da água."
    },
    {
      "palabra": "AVE",
      "pista": "Animal com penas, bico e duas asas."
    },
    {
      "palabra": "NINHO",
      "pista": "Abrigo onde as aves põem seus ovos."
    },
    {
      "palabra": "PENA",
      "pista": "Uma das estruturas leves que cobrem o corpo das aves."
    },
    {
      "palabra": "TRONCO",
      "pista": "Parte grossa da árvore que sustenta os galhos."
    },
    {
      "palabra": "RAIZ",
      "pista": "Parte da planta que absorve água do solo."
    },
    {
      "palabra": "CASCA",
      "pista": "Camada externa que protege o tronco de uma árvore."
    },
    {
      "palabra": "SEMENTE",
      "pista": "Pode germinar e dar origem a uma nova planta."
    },
    {
      "palabra": "BOLOTA",
      "pista": "Fruto do carvalho, com uma pequena cúpula em uma ponta."
    },
    {
      "palabra": "PINHA",
      "pista": "Cone do pinheiro que abriga suas sementes."
    },
    {
      "palabra": "SAMAMBAIA",
      "pista": "Planta de folhas divididas que não produz flores."
    },
    {
      "palabra": "COGUMELO",
      "pista": "Fungo que muitas vezes tem um chapéu sobre uma haste."
    },
    {
      "palabra": "FLOR",
      "pista": "Parte vistosa de muitas plantas que atrai polinizadores."
    },
    {
      "palabra": "PÉTALA",
      "pista": "Cada uma das partes coloridas que formam uma flor."
    },
    {
      "palabra": "CARVALHO",
      "pista": "Árvore de madeira resistente que produz bolotas."
    },
    {
      "palabra": "PINHEIRO",
      "pista": "Árvore com folhas em forma de agulha e cones com sementes."
    },
    {
      "palabra": "SALGUEIRO",
      "pista": "Árvore cujos galhos longos podem pender perto da água."
    },
    {
      "palabra": "ARBUSTO",
      "pista": "Planta lenhosa mais baixa que uma árvore, com vários caules."
    },
    {
      "palabra": "TREPADEIRA",
      "pista": "Planta que sobe e se enrola em outras superfícies."
    },
    {
      "palabra": "TRILHA",
      "pista": "Caminho estreito para andar pela floresta."
    },
    {
      "palabra": "RIACHO",
      "pista": "Curso de água menor que um rio."
    },
    {
      "palabra": "CACHOEIRA",
      "pista": "Queda de água que desce de um desnível."
    },
    {
      "palabra": "LAGOA",
      "pista": "Depósito natural de água parada, menor que um lago."
    },
    {
      "palabra": "ORVALHO",
      "pista": "Gotinhas de água que se formam nas folhas ao amanhecer."
    },
    {
      "palabra": "CLAREIRA",
      "pista": "Espaço aberto entre as árvores por onde entra a luz do sol."
    }
  ]
};
 for(const entries of Object.values(banks)){entries.forEach(Object.freeze);Object.freeze(entries);}
 return Object.freeze({version:'forest-v1',banks:Object.freeze(banks)});
});
