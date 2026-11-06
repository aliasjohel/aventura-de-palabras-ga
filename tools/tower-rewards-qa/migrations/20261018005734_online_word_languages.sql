-- Stage 3G: room-owned word language; old endpoints keep Spanish defaults.
begin;
alter table public.versus_rooms add column word_language text not null default 'es' check(word_language in ('es','en','pt-BR'));
alter table public.versus_invites add column word_language text not null default 'es' check(word_language in ('es','en','pt-BR'));
alter table versus_private.search_queue add column word_language text not null default 'es' check(word_language in ('es','en','pt-BR'));
create or replace function public.versus_letter_key(p_value text) returns text language sql immutable set search_path='' as $$select translate(upper(normalize(coalesce(p_value,''),NFC)), 'ÁÀÂÃÉÊÍÓÔÕÚÜÇ', 'AAAAEEIOOOUUC')$$;
create table versus_private.localized_dictionary (word_language text not null check(word_language in ('en','pt-BR')),theme_key text not null,word text not null,word_key text generated always as (public.versus_letter_key(word)) stored,primary key(word_language,theme_key,word_key));
alter table versus_private.localized_dictionary enable row level security;
revoke all on versus_private.localized_dictionary from public,anon,authenticated;
insert into versus_private.localized_dictionary(word_language,theme_key,word) values
('en','paises','ARGENTINA'),
('en','paises','BRAZIL'),
('en','paises','CANADA'),
('en','paises','CHILE'),
('en','paises','CHINA'),
('en','paises','COLOMBIA'),
('en','paises','CUBA'),
('en','paises','DENMARK'),
('en','paises','ECUADOR'),
('en','paises','EGYPT'),
('en','paises','FINLAND'),
('en','paises','FRANCE'),
('en','paises','GERMANY'),
('en','paises','GREECE'),
('en','paises','HAITI'),
('en','paises','HONDURAS'),
('en','paises','HUNGARY'),
('en','paises','ICELAND'),
('en','paises','INDIA'),
('en','paises','INDONESIA'),
('en','paises','IRAN'),
('en','paises','IRAQ'),
('en','paises','IRELAND'),
('en','paises','ISRAEL'),
('en','paises','ITALY'),
('en','paises','JAMAICA'),
('en','paises','JAPAN'),
('en','paises','JORDAN'),
('en','paises','KENYA'),
('en','paises','LEBANON'),
('en','paises','MALAYSIA'),
('en','paises','MEXICO'),
('en','paises','MOROCCO'),
('en','paises','NEPAL'),
('en','paises','NIGERIA'),
('en','paises','NORWAY'),
('en','paises','PAKISTAN'),
('en','paises','PANAMA'),
('en','paises','PARAGUAY'),
('en','paises','PERU'),
('en','paises','POLAND'),
('en','paises','PORTUGAL'),
('en','paises','ROMANIA'),
('en','paises','SENEGAL'),
('en','paises','SPAIN'),
('en','paises','SWEDEN'),
('en','paises','SWITZERLAND'),
('en','paises','THAILAND'),
('en','paises','TUNISIA'),
('en','paises','TURKEY'),
('en','paises','UGANDA'),
('en','paises','UKRAINE'),
('en','paises','URUGUAY'),
('en','paises','VENEZUELA'),
('en','paises','VIETNAM'),
('en','paises','ZAMBIA'),
('en','frutas','APPLE'),
('en','frutas','APRICOT'),
('en','frutas','AVOCADO'),
('en','frutas','BANANA'),
('en','frutas','BLACKBERRY'),
('en','frutas','BLUEBERRY'),
('en','frutas','CHERRY'),
('en','frutas','CLEMENTINE'),
('en','frutas','COCONUT'),
('en','frutas','CRANBERRY'),
('en','frutas','CURRANT'),
('en','frutas','DATE'),
('en','frutas','DRAGONFRUIT'),
('en','frutas','ELDERBERRY'),
('en','frutas','FIG'),
('en','frutas','GOOSEBERRY'),
('en','frutas','GRAPE'),
('en','frutas','GRAPEFRUIT'),
('en','frutas','GUAVA'),
('en','frutas','JACKFRUIT'),
('en','frutas','KIWI'),
('en','frutas','KUMQUAT'),
('en','frutas','LEMON'),
('en','frutas','LIME'),
('en','frutas','LYCHEE'),
('en','frutas','MANDARIN'),
('en','frutas','MANGO'),
('en','frutas','MELON'),
('en','frutas','MULBERRY'),
('en','frutas','NECTARINE'),
('en','frutas','OLIVE'),
('en','frutas','ORANGE'),
('en','frutas','PAPAYA'),
('en','frutas','PASSIONFRUIT'),
('en','frutas','PEACH'),
('en','frutas','PEAR'),
('en','frutas','PERSIMMON'),
('en','frutas','PINEAPPLE'),
('en','frutas','PLUM'),
('en','frutas','POMEGRANATE'),
('en','frutas','POMELO'),
('en','frutas','QUINCE'),
('en','frutas','RASPBERRY'),
('en','frutas','STARFRUIT'),
('en','frutas','STRAWBERRY'),
('en','frutas','TANGERINE'),
('en','frutas','WATERMELON'),
('en','animales','ANT'),
('en','animales','BADGER'),
('en','animales','BAT'),
('en','animales','BEAR'),
('en','animales','BEAVER'),
('en','animales','BEE'),
('en','animales','BEETLE'),
('en','animales','BISON'),
('en','animales','BUFFALO'),
('en','animales','BUTTERFLY'),
('en','animales','CAMEL'),
('en','animales','CAT'),
('en','animales','CHEETAH'),
('en','animales','CHICKEN'),
('en','animales','COW'),
('en','animales','CRAB'),
('en','animales','CROCODILE'),
('en','animales','DEER'),
('en','animales','DOG'),
('en','animales','DOLPHIN'),
('en','animales','DONKEY'),
('en','animales','DUCK'),
('en','animales','EAGLE'),
('en','animales','ELEPHANT'),
('en','animales','FOX'),
('en','animales','FROG'),
('en','animales','GIRAFFE'),
('en','animales','GOAT'),
('en','animales','GOOSE'),
('en','animales','GORILLA'),
('en','animales','HAMSTER'),
('en','animales','HAWK'),
('en','animales','HEDGEHOG'),
('en','animales','HIPPOPOTAMUS'),
('en','animales','HORSE'),
('en','animales','JAGUAR'),
('en','animales','JELLYFISH'),
('en','animales','KANGAROO'),
('en','animales','KOALA'),
('en','animales','LEOPARD'),
('en','animales','LION'),
('en','animales','LIZARD'),
('en','animales','LOBSTER'),
('en','animales','MONKEY'),
('en','animales','MOSQUITO'),
('en','animales','MOUSE'),
('en','animales','OCTOPUS'),
('en','animales','OTTER'),
('en','animales','OWL'),
('en','animales','PANDA'),
('en','animales','PARROT'),
('en','animales','PEACOCK'),
('en','animales','PELICAN'),
('en','animales','PENGUIN'),
('en','animales','PIG'),
('en','animales','PIGEON'),
('en','animales','RABBIT'),
('en','animales','RACCOON'),
('en','animales','RHINOCEROS'),
('en','animales','SALMON'),
('en','animales','SEAL'),
('en','animales','SHARK'),
('en','animales','SHEEP'),
('en','animales','SNAIL'),
('en','animales','SNAKE'),
('en','animales','SPIDER'),
('en','animales','SQUID'),
('en','animales','SQUIRREL'),
('en','animales','SWAN'),
('en','animales','TIGER'),
('en','animales','TURKEY'),
('en','animales','TURTLE'),
('en','animales','WALRUS'),
('en','animales','WHALE'),
('en','animales','WOLF'),
('en','animales','ZEBRA'),
('en','comidas','BREAD'),
('en','comidas','BUTTER'),
('en','comidas','CAKE'),
('en','comidas','CHEESE'),
('en','comidas','CHICKEN'),
('en','comidas','CHOCOLATE'),
('en','comidas','COOKIE'),
('en','comidas','CREAM'),
('en','comidas','CURRY'),
('en','comidas','CUSTARD'),
('en','comidas','DOUGHNUT'),
('en','comidas','DUMPLING'),
('en','comidas','EGG'),
('en','comidas','EMPANADA'),
('en','comidas','FALAFEL'),
('en','comidas','FISH'),
('en','comidas','FLOUR'),
('en','comidas','FRIES'),
('en','comidas','HAMBURGER'),
('en','comidas','HAM'),
('en','comidas','HONEY'),
('en','comidas','HUMMUS'),
('en','comidas','JAM'),
('en','comidas','JELLY'),
('en','comidas','LASAGNA'),
('en','comidas','MEAT'),
('en','comidas','MUFFIN'),
('en','comidas','NOODLES'),
('en','comidas','OATMEAL'),
('en','comidas','OMELET'),
('en','comidas','PANCAKE'),
('en','comidas','PASTA'),
('en','comidas','PIE'),
('en','comidas','PIZZA'),
('en','comidas','POPCORN'),
('en','comidas','PORRIDGE'),
('en','comidas','POTATO'),
('en','comidas','PRETZEL'),
('en','comidas','PUDDING'),
('en','comidas','RICE'),
('en','comidas','RISOTTO'),
('en','comidas','SALAD'),
('en','comidas','SALSA'),
('en','comidas','SANDWICH'),
('en','comidas','SAUSAGE'),
('en','comidas','SOUP'),
('en','comidas','SPAGHETTI'),
('en','comidas','STEAK'),
('en','comidas','STEW'),
('en','comidas','SUGAR'),
('en','comidas','SUSHI'),
('en','comidas','TACO'),
('en','comidas','TOAST'),
('en','comidas','TOFU'),
('en','comidas','TORTILLA'),
('en','comidas','WAFFLE'),
('en','comidas','YOGURT'),
('en','profesiones','ACTOR'),
('en','profesiones','ARCHITECT'),
('en','profesiones','ARTIST'),
('en','profesiones','ASTRONAUT'),
('en','profesiones','BAKER'),
('en','profesiones','BARBER'),
('en','profesiones','BIOLOGIST'),
('en','profesiones','BUTCHER'),
('en','profesiones','CARPENTER'),
('en','profesiones','CASHIER'),
('en','profesiones','CHEF'),
('en','profesiones','CHEMIST'),
('en','profesiones','CLEANER'),
('en','profesiones','COACH'),
('en','profesiones','COOK'),
('en','profesiones','DANCER'),
('en','profesiones','DENTIST'),
('en','profesiones','DESIGNER'),
('en','profesiones','DETECTIVE'),
('en','profesiones','DIRECTOR'),
('en','profesiones','DOCTOR'),
('en','profesiones','DRIVER'),
('en','profesiones','EDITOR'),
('en','profesiones','ELECTRICIAN'),
('en','profesiones','ENGINEER'),
('en','profesiones','FARMER'),
('en','profesiones','FIREFIGHTER'),
('en','profesiones','FISHERMAN'),
('en','profesiones','FLORIST'),
('en','profesiones','GARDENER'),
('en','profesiones','GEOLOGIST'),
('en','profesiones','GUARD'),
('en','profesiones','HAIRDRESSER'),
('en','profesiones','HISTORIAN'),
('en','profesiones','JOURNALIST'),
('en','profesiones','JUDGE'),
('en','profesiones','LAWYER'),
('en','profesiones','LIBRARIAN'),
('en','profesiones','LIFEGUARD'),
('en','profesiones','MECHANIC'),
('en','profesiones','MINER'),
('en','profesiones','MUSICIAN'),
('en','profesiones','NURSE'),
('en','profesiones','PAINTER'),
('en','profesiones','PHARMACIST'),
('en','profesiones','PHOTOGRAPHER'),
('en','profesiones','PILOT'),
('en','profesiones','PLUMBER'),
('en','profesiones','POET'),
('en','profesiones','PROGRAMMER'),
('en','profesiones','RECEPTIONIST'),
('en','profesiones','REPORTER'),
('en','profesiones','SAILOR'),
('en','profesiones','SCIENTIST'),
('en','profesiones','SECRETARY'),
('en','profesiones','SINGER'),
('en','profesiones','SOLDIER'),
('en','profesiones','SURGEON'),
('en','profesiones','TAILOR'),
('en','profesiones','TEACHER'),
('en','profesiones','TRANSLATOR'),
('en','profesiones','VETERINARIAN'),
('en','profesiones','WAITER'),
('en','profesiones','WELDER'),
('en','profesiones','WRITER'),
('en','deportes','ARCHERY'),
('en','deportes','ATHLETICS'),
('en','deportes','BADMINTON'),
('en','deportes','BASEBALL'),
('en','deportes','BASKETBALL'),
('en','deportes','BIATHLON'),
('en','deportes','BOBSLEIGH'),
('en','deportes','BOWLING'),
('en','deportes','BOXING'),
('en','deportes','CANOEING'),
('en','deportes','CLIMBING'),
('en','deportes','CRICKET'),
('en','deportes','CROQUET'),
('en','deportes','CURLING'),
('en','deportes','CYCLING'),
('en','deportes','DARTS'),
('en','deportes','DIVING'),
('en','deportes','FENCING'),
('en','deportes','FOOTBALL'),
('en','deportes','GOLF'),
('en','deportes','GYMNASTICS'),
('en','deportes','HANDBALL'),
('en','deportes','HOCKEY'),
('en','deportes','JUDO'),
('en','deportes','KARATE'),
('en','deportes','KAYAKING'),
('en','deportes','KICKBOXING'),
('en','deportes','LACROSSE'),
('en','deportes','NETBALL'),
('en','deportes','ORIENTEERING'),
('en','deportes','PADDLING'),
('en','deportes','POLO'),
('en','deportes','RACQUETBALL'),
('en','deportes','ROWING'),
('en','deportes','RUGBY'),
('en','deportes','RUNNING'),
('en','deportes','SAILING'),
('en','deportes','SKATING'),
('en','deportes','SKIING'),
('en','deportes','SNOWBOARDING'),
('en','deportes','SOCCER'),
('en','deportes','SOFTBALL'),
('en','deportes','SQUASH'),
('en','deportes','SUMO'),
('en','deportes','SURFING'),
('en','deportes','SWIMMING'),
('en','deportes','TAEKWONDO'),
('en','deportes','TENNIS'),
('en','deportes','TRIATHLON'),
('en','deportes','VOLLEYBALL'),
('en','deportes','WALKING'),
('en','deportes','WRESTLING'),
('en','transportes','AIRPLANE'),
('en','transportes','AMBULANCE'),
('en','transportes','BALLOON'),
('en','transportes','BARGE'),
('en','transportes','BICYCLE'),
('en','transportes','BLIMP'),
('en','transportes','BOAT'),
('en','transportes','BUGGY'),
('en','transportes','BULLDOZER'),
('en','transportes','BUS'),
('en','transportes','CAB'),
('en','transportes','CANOE'),
('en','transportes','CAR'),
('en','transportes','CARRIAGE'),
('en','transportes','CART'),
('en','transportes','CATAMARAN'),
('en','transportes','COACH'),
('en','transportes','FERRY'),
('en','transportes','FIRETRUCK'),
('en','transportes','FORKLIFT'),
('en','transportes','FREIGHTER'),
('en','transportes','GLIDER'),
('en','transportes','GONDOLA'),
('en','transportes','HELICOPTER'),
('en','transportes','HOVERCRAFT'),
('en','transportes','JEEP'),
('en','transportes','JET'),
('en','transportes','KAYAK'),
('en','transportes','LOCOMOTIVE'),
('en','transportes','MINIBUS'),
('en','transportes','MOPED'),
('en','transportes','MOTORBIKE'),
('en','transportes','MOTORBOAT'),
('en','transportes','MOTORCYCLE'),
('en','transportes','RAFT'),
('en','transportes','RICKSHAW'),
('en','transportes','ROCKET'),
('en','transportes','ROWBOAT'),
('en','transportes','SAILBOAT'),
('en','transportes','SCOOTER'),
('en','transportes','SEAPLANE'),
('en','transportes','SHIP'),
('en','transportes','SHUTTLE'),
('en','transportes','SLED'),
('en','transportes','SLEIGH'),
('en','transportes','SPACECRAFT'),
('en','transportes','SPEEDBOAT'),
('en','transportes','STEAMBOAT'),
('en','transportes','SUBMARINE'),
('en','transportes','SUBWAY'),
('en','transportes','TANK'),
('en','transportes','TAXI'),
('en','transportes','TRACTOR'),
('en','transportes','TRAIN'),
('en','transportes','TRAM'),
('en','transportes','TRICYCLE'),
('en','transportes','TRUCK'),
('en','transportes','UNICYCLE'),
('en','transportes','VAN'),
('en','transportes','WAGON'),
('en','transportes','YACHT'),
('en','transportes','ZEPPELIN'),
('en','objetos','BACKPACK'),
('en','objetos','BASKET'),
('en','objetos','BATTERY'),
('en','objetos','BED'),
('en','objetos','BELL'),
('en','objetos','BLANKET'),
('en','objetos','BOOK'),
('en','objetos','BOTTLE'),
('en','objetos','BOWL'),
('en','objetos','BOX'),
('en','objetos','BRUSH'),
('en','objetos','BUCKET'),
('en','objetos','BUTTON'),
('en','objetos','CAMERA'),
('en','objetos','CANDLE'),
('en','objetos','CHAIR'),
('en','objetos','CLOCK'),
('en','objetos','COIN'),
('en','objetos','COMB'),
('en','objetos','COMPUTER'),
('en','objetos','CUP'),
('en','objetos','DESK'),
('en','objetos','DOOR'),
('en','objetos','DRAWER'),
('en','objetos','DRUM'),
('en','objetos','ENVELOPE'),
('en','objetos','ERASER'),
('en','objetos','FAN'),
('en','objetos','FORK'),
('en','objetos','GLASS'),
('en','objetos','GUITAR'),
('en','objetos','HAMMER'),
('en','objetos','HAT'),
('en','objetos','HEADPHONES'),
('en','objetos','HELMET'),
('en','objetos','KEY'),
('en','objetos','KEYBOARD'),
('en','objetos','KNIFE'),
('en','objetos','LADDER'),
('en','objetos','LAMP'),
('en','objetos','LANTERN'),
('en','objetos','LOCK'),
('en','objetos','MAP'),
('en','objetos','MIRROR'),
('en','objetos','NEEDLE'),
('en','objetos','NOTEBOOK'),
('en','objetos','OVEN'),
('en','objetos','PAN'),
('en','objetos','PAPER'),
('en','objetos','PEN'),
('en','objetos','PENCIL'),
('en','objetos','PHONE'),
('en','objetos','PILLOW'),
('en','objetos','PLATE'),
('en','objetos','RADIO'),
('en','objetos','RING'),
('en','objetos','ROPE'),
('en','objetos','RUG'),
('en','objetos','RULER'),
('en','objetos','SCISSORS'),
('en','objetos','SCREW'),
('en','objetos','SHELF'),
('en','objetos','SHIRT'),
('en','objetos','SHOE'),
('en','objetos','SOAP'),
('en','objetos','SPOON'),
('en','objetos','SUITCASE'),
('en','objetos','TABLE'),
('en','objetos','TELEVISION'),
('en','objetos','TENT'),
('en','objetos','TOWEL'),
('en','objetos','UMBRELLA'),
('en','objetos','VASE'),
('en','objetos','WALLET'),
('en','objetos','WATCH'),
('en','objetos','WHISTLE'),
('en','objetos','WINDOW'),
('en','naturaleza','BEACH'),
('en','naturaleza','BRANCH'),
('en','naturaleza','BREEZE'),
('en','naturaleza','CACTUS'),
('en','naturaleza','CANYON'),
('en','naturaleza','CAVE'),
('en','naturaleza','CLIFF'),
('en','naturaleza','CLOUD'),
('en','naturaleza','COAST'),
('en','naturaleza','CORAL'),
('en','naturaleza','DAWN'),
('en','naturaleza','DEW'),
('en','naturaleza','DUNE'),
('en','naturaleza','EARTH'),
('en','naturaleza','FIELD'),
('en','naturaleza','FIRE'),
('en','naturaleza','FLAME'),
('en','naturaleza','FLOWER'),
('en','naturaleza','FOG'),
('en','naturaleza','FOREST'),
('en','naturaleza','FROST'),
('en','naturaleza','GLACIER'),
('en','naturaleza','GRASS'),
('en','naturaleza','HAIL'),
('en','naturaleza','HILL'),
('en','naturaleza','ICE'),
('en','naturaleza','ISLAND'),
('en','naturaleza','JUNGLE'),
('en','naturaleza','LAKE'),
('en','naturaleza','LAVA'),
('en','naturaleza','LEAF'),
('en','naturaleza','LIGHTNING'),
('en','naturaleza','MARSH'),
('en','naturaleza','MEADOW'),
('en','naturaleza','MOON'),
('en','naturaleza','MOSS'),
('en','naturaleza','MOUNTAIN'),
('en','naturaleza','MUD'),
('en','naturaleza','OCEAN'),
('en','naturaleza','PEBBLE'),
('en','naturaleza','POND'),
('en','naturaleza','RAIN'),
('en','naturaleza','RAINBOW'),
('en','naturaleza','REEF'),
('en','naturaleza','RIVER'),
('en','naturaleza','ROCK'),
('en','naturaleza','ROOT'),
('en','naturaleza','SAND'),
('en','naturaleza','SEED'),
('en','naturaleza','SHADOW'),
('en','naturaleza','SKY'),
('en','naturaleza','SNOW'),
('en','naturaleza','SOIL'),
('en','naturaleza','SPRING'),
('en','naturaleza','STAR'),
('en','naturaleza','STONE'),
('en','naturaleza','STORM'),
('en','naturaleza','STREAM'),
('en','naturaleza','SUN'),
('en','naturaleza','SUNRISE'),
('en','naturaleza','SUNSET'),
('en','naturaleza','SWAMP'),
('en','naturaleza','THUNDER'),
('en','naturaleza','TIDE'),
('en','naturaleza','TREE'),
('en','naturaleza','VALLEY'),
('en','naturaleza','VOLCANO'),
('en','naturaleza','WATER'),
('en','naturaleza','WATERFALL'),
('en','naturaleza','WAVE'),
('en','naturaleza','WIND'),
('en','naturaleza','WOOD'),
('en','nombres','AARON'),
('en','nombres','ABIGAIL'),
('en','nombres','ADAM'),
('en','nombres','ADRIAN'),
('en','nombres','ALICE'),
('en','nombres','AMELIA'),
('en','nombres','ANDREW'),
('en','nombres','ANNA'),
('en','nombres','ANTHONY'),
('en','nombres','ARTHUR'),
('en','nombres','AUDREY'),
('en','nombres','BENJAMIN'),
('en','nombres','BRIAN'),
('en','nombres','CALEB'),
('en','nombres','CAMERON'),
('en','nombres','CHARLES'),
('en','nombres','CHARLOTTE'),
('en','nombres','CHLOE'),
('en','nombres','CLARA'),
('en','nombres','DANIEL'),
('en','nombres','DAVID'),
('en','nombres','DYLAN'),
('en','nombres','EDWARD'),
('en','nombres','ELEANOR'),
('en','nombres','ELENA'),
('en','nombres','ELIJAH'),
('en','nombres','ELIZABETH'),
('en','nombres','ELLA'),
('en','nombres','EMILY'),
('en','nombres','EMMA'),
('en','nombres','ETHAN'),
('en','nombres','EVELYN'),
('en','nombres','FELIX'),
('en','nombres','GABRIEL'),
('en','nombres','GEORGE'),
('en','nombres','GRACE'),
('en','nombres','HANNAH'),
('en','nombres','HARRY'),
('en','nombres','HAZEL'),
('en','nombres','HENRY'),
('en','nombres','ISABELLA'),
('en','nombres','JACK'),
('en','nombres','JACOB'),
('en','nombres','JAMES'),
('en','nombres','JASMINE'),
('en','nombres','JASON'),
('en','nombres','JENNIFER'),
('en','nombres','JOHN'),
('en','nombres','JOSEPH'),
('en','nombres','JULIA'),
('en','nombres','KATE'),
('en','nombres','LAURA'),
('en','nombres','LEO'),
('en','nombres','LIAM'),
('en','nombres','LILY'),
('en','nombres','LUCAS'),
('en','nombres','LUCY'),
('en','nombres','LUKE'),
('en','nombres','MARIA'),
('en','nombres','MASON'),
('en','nombres','MATTHEW'),
('en','nombres','MAYA'),
('en','nombres','MICHAEL'),
('en','nombres','NATALIE'),
('en','nombres','NATHAN'),
('en','nombres','NICHOLAS'),
('en','nombres','NOAH'),
('en','nombres','NORA'),
('en','nombres','OLIVER'),
('en','nombres','OLIVIA'),
('en','nombres','OSCAR'),
('en','nombres','OWEN'),
('en','nombres','PATRICK'),
('en','nombres','PAUL'),
('en','nombres','PETER'),
('en','nombres','RACHEL'),
('en','nombres','REBECCA'),
('en','nombres','ROBERT'),
('en','nombres','ROSE'),
('en','nombres','RUBY'),
('en','nombres','RYAN'),
('en','nombres','SAMUEL'),
('en','nombres','SARAH'),
('en','nombres','SIMON'),
('en','nombres','SOPHIA'),
('en','nombres','STELLA'),
('en','nombres','STEPHEN'),
('en','nombres','THOMAS'),
('en','nombres','VICTOR'),
('en','nombres','VIOLET'),
('en','nombres','WILLIAM'),
('en','nombres','ZOE'),
('pt-BR','paises','ARGENTINA'),
('pt-BR','paises','BRASIL'),
('pt-BR','paises','CANADÁ'),
('pt-BR','paises','CHILE'),
('pt-BR','paises','CHINA'),
('pt-BR','paises','COLÔMBIA'),
('pt-BR','paises','CUBA'),
('pt-BR','paises','DINAMARCA'),
('pt-BR','paises','EQUADOR'),
('pt-BR','paises','EGITO'),
('pt-BR','paises','FINLÂNDIA'),
('pt-BR','paises','FRANÇA'),
('pt-BR','paises','ALEMANHA'),
('pt-BR','paises','GRÉCIA'),
('pt-BR','paises','HAITI'),
('pt-BR','paises','HONDURAS'),
('pt-BR','paises','HUNGRIA'),
('pt-BR','paises','ISLÂNDIA'),
('pt-BR','paises','ÍNDIA'),
('pt-BR','paises','INDONÉSIA'),
('pt-BR','paises','IRÃ'),
('pt-BR','paises','IRAQUE'),
('pt-BR','paises','IRLANDA'),
('pt-BR','paises','ISRAEL'),
('pt-BR','paises','ITÁLIA'),
('pt-BR','paises','JAMAICA'),
('pt-BR','paises','JAPÃO'),
('pt-BR','paises','JORDÂNIA'),
('pt-BR','paises','QUÊNIA'),
('pt-BR','paises','LÍBANO'),
('pt-BR','paises','MALÁSIA'),
('pt-BR','paises','MÉXICO'),
('pt-BR','paises','MARROCOS'),
('pt-BR','paises','NEPAL'),
('pt-BR','paises','NIGÉRIA'),
('pt-BR','paises','NORUEGA'),
('pt-BR','paises','PAQUISTÃO'),
('pt-BR','paises','PANAMÁ'),
('pt-BR','paises','PARAGUAI'),
('pt-BR','paises','PERU'),
('pt-BR','paises','POLÔNIA'),
('pt-BR','paises','PORTUGAL'),
('pt-BR','paises','ROMÊNIA'),
('pt-BR','paises','SENEGAL'),
('pt-BR','paises','ESPANHA'),
('pt-BR','paises','SUÉCIA'),
('pt-BR','paises','SUÍÇA'),
('pt-BR','paises','TAILÂNDIA'),
('pt-BR','paises','TUNÍSIA'),
('pt-BR','paises','TURQUIA'),
('pt-BR','paises','UGANDA'),
('pt-BR','paises','UCRÂNIA'),
('pt-BR','paises','URUGUAI'),
('pt-BR','paises','VENEZUELA'),
('pt-BR','paises','VIETNÃ'),
('pt-BR','paises','ZÂMBIA'),
('pt-BR','frutas','ABACATE'),
('pt-BR','frutas','ABACAXI'),
('pt-BR','frutas','ACEROLA'),
('pt-BR','frutas','AÇAÍ'),
('pt-BR','frutas','AMEIXA'),
('pt-BR','frutas','AMORA'),
('pt-BR','frutas','ARAÇÁ'),
('pt-BR','frutas','ATEMOIA'),
('pt-BR','frutas','BACABA'),
('pt-BR','frutas','BANANA'),
('pt-BR','frutas','CAJÁ'),
('pt-BR','frutas','CAJU'),
('pt-BR','frutas','CAQUI'),
('pt-BR','frutas','CARAMBOLA'),
('pt-BR','frutas','CEREJA'),
('pt-BR','frutas','CIRIGUELA'),
('pt-BR','frutas','COCO'),
('pt-BR','frutas','CUPUAÇU'),
('pt-BR','frutas','DAMASCO'),
('pt-BR','frutas','FIGO'),
('pt-BR','frutas','FRAMBOESA'),
('pt-BR','frutas','GOIABA'),
('pt-BR','frutas','GRAVIOLA'),
('pt-BR','frutas','GROSELHA'),
('pt-BR','frutas','GUARANÁ'),
('pt-BR','frutas','JABUTICABA'),
('pt-BR','frutas','JACA'),
('pt-BR','frutas','JAMBO'),
('pt-BR','frutas','JENIPAPO'),
('pt-BR','frutas','KIWI'),
('pt-BR','frutas','LARANJA'),
('pt-BR','frutas','LICHIA'),
('pt-BR','frutas','LIMA'),
('pt-BR','frutas','LIMÃO'),
('pt-BR','frutas','MAÇÃ'),
('pt-BR','frutas','MAMÃO'),
('pt-BR','frutas','MANGA'),
('pt-BR','frutas','MANGABA'),
('pt-BR','frutas','MARACUJÁ'),
('pt-BR','frutas','MARMELO'),
('pt-BR','frutas','MELANCIA'),
('pt-BR','frutas','MELÃO'),
('pt-BR','frutas','MEXERICA'),
('pt-BR','frutas','MIRTILO'),
('pt-BR','frutas','MORANGO'),
('pt-BR','frutas','NECTARINA'),
('pt-BR','frutas','NÊSPERA'),
('pt-BR','frutas','PEQUI'),
('pt-BR','frutas','PERA'),
('pt-BR','frutas','PÊSSEGO'),
('pt-BR','frutas','PITANGA'),
('pt-BR','frutas','PITAYA'),
('pt-BR','frutas','POMELO'),
('pt-BR','frutas','ROMÃ'),
('pt-BR','frutas','SAPOTI'),
('pt-BR','frutas','TAMARINDO'),
('pt-BR','frutas','TÂMARA'),
('pt-BR','frutas','TANGERINA'),
('pt-BR','frutas','UMBU'),
('pt-BR','frutas','UVA'),
('pt-BR','animales','ABELHA'),
('pt-BR','animales','ÁGUIA'),
('pt-BR','animales','ALCE'),
('pt-BR','animales','ANDORINHA'),
('pt-BR','animales','ANTA'),
('pt-BR','animales','ARANHA'),
('pt-BR','animales','ARARA'),
('pt-BR','animales','ATUM'),
('pt-BR','animales','AVESTRUZ'),
('pt-BR','animales','BALEIA'),
('pt-BR','animales','BARATA'),
('pt-BR','animales','BESOURO'),
('pt-BR','animales','BEZERRO'),
('pt-BR','animales','BODE'),
('pt-BR','animales','BOI'),
('pt-BR','animales','BORBOLETA'),
('pt-BR','animales','BOTO'),
('pt-BR','animales','BÚFALO'),
('pt-BR','animales','BURRO'),
('pt-BR','animales','CABRA'),
('pt-BR','animales','CACHORRO'),
('pt-BR','animales','CAMALEÃO'),
('pt-BR','animales','CAMARÃO'),
('pt-BR','animales','CAMELO'),
('pt-BR','animales','CAMUNDONGO'),
('pt-BR','animales','CAPIVARA'),
('pt-BR','animales','CARACOL'),
('pt-BR','animales','CARANGUEJO'),
('pt-BR','animales','CARNEIRO'),
('pt-BR','animales','CASTOR'),
('pt-BR','animales','CAVALO'),
('pt-BR','animales','CEGONHA'),
('pt-BR','animales','COALA'),
('pt-BR','animales','COBRA'),
('pt-BR','animales','COELHO'),
('pt-BR','animales','CORUJA'),
('pt-BR','animales','CROCODILO'),
('pt-BR','animales','ELEFANTE'),
('pt-BR','animales','EMA'),
('pt-BR','animales','ESCORPIÃO'),
('pt-BR','animales','ESQUILO'),
('pt-BR','animales','FALCÃO'),
('pt-BR','animales','FLAMINGO'),
('pt-BR','animales','FOCA'),
('pt-BR','animales','FORMIGA'),
('pt-BR','animales','GALINHA'),
('pt-BR','animales','GALO'),
('pt-BR','animales','GAMBÁ'),
('pt-BR','animales','GANSO'),
('pt-BR','animales','GARÇA'),
('pt-BR','animales','GATO'),
('pt-BR','animales','GAVIÃO'),
('pt-BR','animales','GIRAFA'),
('pt-BR','animales','GOLFINHO'),
('pt-BR','animales','GORILA'),
('pt-BR','animales','GRILO'),
('pt-BR','animales','GUAXINIM'),
('pt-BR','animales','HAMSTER'),
('pt-BR','animales','HIPOPÓTAMO'),
('pt-BR','animales','IGUANA'),
('pt-BR','animales','JABUTI'),
('pt-BR','animales','JACARÉ'),
('pt-BR','animales','JAGUATIRICA'),
('pt-BR','animales','JUMENTO'),
('pt-BR','animales','LAGARTA'),
('pt-BR','animales','LAGARTIXA'),
('pt-BR','animales','LEÃO'),
('pt-BR','animales','LEOPARDO'),
('pt-BR','animales','LHAMA'),
('pt-BR','animales','LOBO'),
('pt-BR','animales','LONTRA'),
('pt-BR','animales','LULA'),
('pt-BR','animales','MACACO'),
('pt-BR','animales','MORCEGO'),
('pt-BR','animales','MOSCA'),
('pt-BR','animales','MOSQUITO'),
('pt-BR','animales','ONÇA'),
('pt-BR','animales','OVELHA'),
('pt-BR','animales','PÁSSARO'),
('pt-BR','animales','PATO'),
('pt-BR','animales','PAVÃO'),
('pt-BR','animales','PEIXE'),
('pt-BR','animales','PELICANO'),
('pt-BR','animales','PERU'),
('pt-BR','animales','PINGUIM'),
('pt-BR','animales','POLVO'),
('pt-BR','animales','POMBO'),
('pt-BR','animales','PORCO'),
('pt-BR','animales','PREGUIÇA'),
('pt-BR','animales','RAPOSA'),
('pt-BR','animales','RATO'),
('pt-BR','animales','RINOCERONTE'),
('pt-BR','animales','SALMÃO'),
('pt-BR','animales','SAPO'),
('pt-BR','animales','SERPENTE'),
('pt-BR','animales','TAMANDUÁ'),
('pt-BR','animales','TARTARUGA'),
('pt-BR','animales','TATU'),
('pt-BR','animales','TIGRE'),
('pt-BR','animales','TOUPEIRA'),
('pt-BR','animales','TUBARÃO'),
('pt-BR','animales','TUCANO'),
('pt-BR','animales','URSO'),
('pt-BR','animales','URUBU'),
('pt-BR','animales','VACA'),
('pt-BR','animales','VEADO'),
('pt-BR','animales','ZEBRA'),
('pt-BR','comidas','ARROZ'),
('pt-BR','comidas','AÇÚCAR'),
('pt-BR','comidas','AZEITE'),
('pt-BR','comidas','BACALHAU'),
('pt-BR','comidas','BATATA'),
('pt-BR','comidas','BIFE'),
('pt-BR','comidas','BISCOITO'),
('pt-BR','comidas','BOLO'),
('pt-BR','comidas','BRIGADEIRO'),
('pt-BR','comidas','CALDO'),
('pt-BR','comidas','CANJA'),
('pt-BR','comidas','CARNE'),
('pt-BR','comidas','CHOCOLATE'),
('pt-BR','comidas','CHURRASCO'),
('pt-BR','comidas','COCADA'),
('pt-BR','comidas','CREME'),
('pt-BR','comidas','CUSCUZ'),
('pt-BR','comidas','DOCE'),
('pt-BR','comidas','EMPADA'),
('pt-BR','comidas','EMPADÃO'),
('pt-BR','comidas','FARINHA'),
('pt-BR','comidas','FAROFA'),
('pt-BR','comidas','FEIJOADA'),
('pt-BR','comidas','FEIJÃO'),
('pt-BR','comidas','FRANGO'),
('pt-BR','comidas','GELATINA'),
('pt-BR','comidas','GELEIA'),
('pt-BR','comidas','HAMBÚRGUER'),
('pt-BR','comidas','IOGURTE'),
('pt-BR','comidas','LASANHA'),
('pt-BR','comidas','MACARRÃO'),
('pt-BR','comidas','MAIONESE'),
('pt-BR','comidas','MANTEIGA'),
('pt-BR','comidas','MASSA'),
('pt-BR','comidas','MEL'),
('pt-BR','comidas','MINGAU'),
('pt-BR','comidas','MOQUECA'),
('pt-BR','comidas','OMELETE'),
('pt-BR','comidas','OVO'),
('pt-BR','comidas','PAÇOCA'),
('pt-BR','comidas','PANQUECA'),
('pt-BR','comidas','PÃO'),
('pt-BR','comidas','PASTEL'),
('pt-BR','comidas','PIPOCA'),
('pt-BR','comidas','PIZZA'),
('pt-BR','comidas','POLENTA'),
('pt-BR','comidas','PURÊ'),
('pt-BR','comidas','PUDIM'),
('pt-BR','comidas','QUEIJO'),
('pt-BR','comidas','QUIBE'),
('pt-BR','comidas','RISOTO'),
('pt-BR','comidas','ROCAMBOLE'),
('pt-BR','comidas','SALADA'),
('pt-BR','comidas','SALAME'),
('pt-BR','comidas','SALPICÃO'),
('pt-BR','comidas','SALSICHA'),
('pt-BR','comidas','SANDUÍCHE'),
('pt-BR','comidas','SOPA'),
('pt-BR','comidas','SORVETE'),
('pt-BR','comidas','SUFLÊ'),
('pt-BR','comidas','TAPIOCA'),
('pt-BR','comidas','TORRADA'),
('pt-BR','comidas','TORTA'),
('pt-BR','comidas','VINAGRE'),
('pt-BR','profesiones','ATOR'),
('pt-BR','profesiones','ATRIZ'),
('pt-BR','profesiones','ADVOGADO'),
('pt-BR','profesiones','AGRICULTOR'),
('pt-BR','profesiones','ARQUITETO'),
('pt-BR','profesiones','ARTISTA'),
('pt-BR','profesiones','ASTRONAUTA'),
('pt-BR','profesiones','ATLETA'),
('pt-BR','profesiones','BABÁ'),
('pt-BR','profesiones','BAILARINO'),
('pt-BR','profesiones','BARBEIRO'),
('pt-BR','profesiones','BIÓLOGO'),
('pt-BR','profesiones','BOMBEIRO'),
('pt-BR','profesiones','CANTOR'),
('pt-BR','profesiones','CARPINTEIRO'),
('pt-BR','profesiones','CARTEIRO'),
('pt-BR','profesiones','CIENTISTA'),
('pt-BR','profesiones','CIRURGIÃO'),
('pt-BR','profesiones','COBRADOR'),
('pt-BR','profesiones','COMERCIANTE'),
('pt-BR','profesiones','CONTADOR'),
('pt-BR','profesiones','COSTUREIRO'),
('pt-BR','profesiones','COZINHEIRO'),
('pt-BR','profesiones','DENTISTA'),
('pt-BR','profesiones','DESENHISTA'),
('pt-BR','profesiones','DETETIVE'),
('pt-BR','profesiones','DIRETOR'),
('pt-BR','profesiones','ECONOMISTA'),
('pt-BR','profesiones','ELETRICISTA'),
('pt-BR','profesiones','ENCANADOR'),
('pt-BR','profesiones','ENFERMEIRO'),
('pt-BR','profesiones','ENGENHEIRO'),
('pt-BR','profesiones','ESCRITOR'),
('pt-BR','profesiones','FARMACÊUTICO'),
('pt-BR','profesiones','FAZENDEIRO'),
('pt-BR','profesiones','FERREIRO'),
('pt-BR','profesiones','FÍSICO'),
('pt-BR','profesiones','FLORISTA'),
('pt-BR','profesiones','FOTÓGRAFO'),
('pt-BR','profesiones','GARÇOM'),
('pt-BR','profesiones','GEÓLOGO'),
('pt-BR','profesiones','GERENTE'),
('pt-BR','profesiones','GUARDA'),
('pt-BR','profesiones','GUIA'),
('pt-BR','profesiones','JARDINEIRO'),
('pt-BR','profesiones','JORNALISTA'),
('pt-BR','profesiones','JUIZ'),
('pt-BR','profesiones','LIXEIRO'),
('pt-BR','profesiones','MAESTRO'),
('pt-BR','profesiones','MARCENEIRO'),
('pt-BR','profesiones','MARINHEIRO'),
('pt-BR','profesiones','MECÂNICO'),
('pt-BR','profesiones','MÉDICO'),
('pt-BR','profesiones','MERGULHADOR'),
('pt-BR','profesiones','MOTORISTA'),
('pt-BR','profesiones','MÚSICO'),
('pt-BR','profesiones','PADEIRO'),
('pt-BR','profesiones','PEDREIRO'),
('pt-BR','profesiones','PESCADOR'),
('pt-BR','profesiones','PILOTO'),
('pt-BR','profesiones','PINTOR'),
('pt-BR','profesiones','POETA'),
('pt-BR','profesiones','POLICIAL'),
('pt-BR','profesiones','PORTEIRO'),
('pt-BR','profesiones','PROFESSOR'),
('pt-BR','profesiones','PROGRAMADOR'),
('pt-BR','profesiones','PSICÓLOGO'),
('pt-BR','profesiones','QUÍMICO'),
('pt-BR','profesiones','REPÓRTER'),
('pt-BR','profesiones','SAPATEIRO'),
('pt-BR','profesiones','SECRETÁRIO'),
('pt-BR','profesiones','SOLDADO'),
('pt-BR','profesiones','TÉCNICO'),
('pt-BR','profesiones','TRADUTOR'),
('pt-BR','profesiones','VENDEDOR'),
('pt-BR','profesiones','VETERINÁRIO'),
('pt-BR','profesiones','ZELADOR'),
('pt-BR','deportes','ATLETISMO'),
('pt-BR','deportes','BADMINTON'),
('pt-BR','deportes','BASQUETE'),
('pt-BR','deportes','BEISEBOL'),
('pt-BR','deportes','BIATLO'),
('pt-BR','deportes','BOLICHE'),
('pt-BR','deportes','BOXE'),
('pt-BR','deportes','CANOAGEM'),
('pt-BR','deportes','CAPOEIRA'),
('pt-BR','deportes','CICLISMO'),
('pt-BR','deportes','CORRIDA'),
('pt-BR','deportes','CRÍQUETE'),
('pt-BR','deportes','CROQUÊ'),
('pt-BR','deportes','CURLING'),
('pt-BR','deportes','ESGRIMA'),
('pt-BR','deportes','ESQUI'),
('pt-BR','deportes','ESCALADA'),
('pt-BR','deportes','FUTEBOL'),
('pt-BR','deportes','FUTSAL'),
('pt-BR','deportes','GINÁSTICA'),
('pt-BR','deportes','GOLFE'),
('pt-BR','deportes','HANDEBOL'),
('pt-BR','deportes','HIPISMO'),
('pt-BR','deportes','HÓQUEI'),
('pt-BR','deportes','IATISMO'),
('pt-BR','deportes','JUDÔ'),
('pt-BR','deportes','KARATÊ'),
('pt-BR','deportes','KART'),
('pt-BR','deportes','KITESURFE'),
('pt-BR','deportes','LACROSSE'),
('pt-BR','deportes','LUTA'),
('pt-BR','deportes','MARATONA'),
('pt-BR','deportes','MERGULHO'),
('pt-BR','deportes','MOTOCROSS'),
('pt-BR','deportes','NATAÇÃO'),
('pt-BR','deportes','PATINAÇÃO'),
('pt-BR','deportes','PETECA'),
('pt-BR','deportes','POLO'),
('pt-BR','deportes','RAQUETEBOL'),
('pt-BR','deportes','REMO'),
('pt-BR','deportes','RÚGBI'),
('pt-BR','deportes','SALTOS'),
('pt-BR','deportes','SKATE'),
('pt-BR','deportes','SNOWBOARD'),
('pt-BR','deportes','SOFTBOL'),
('pt-BR','deportes','SQUASH'),
('pt-BR','deportes','SUMÔ'),
('pt-BR','deportes','SURFE'),
('pt-BR','deportes','TAEKWONDO'),
('pt-BR','deportes','TÊNIS'),
('pt-BR','deportes','TRIATLO'),
('pt-BR','deportes','VELA'),
('pt-BR','deportes','VÔLEI'),
('pt-BR','deportes','WRESTLING'),
('pt-BR','transportes','AVIÃO'),
('pt-BR','transportes','AMBULÂNCIA'),
('pt-BR','transportes','BALÃO'),
('pt-BR','transportes','BALSA'),
('pt-BR','transportes','BARCA'),
('pt-BR','transportes','BARCO'),
('pt-BR','transportes','BICICLETA'),
('pt-BR','transportes','BONDE'),
('pt-BR','transportes','BUGUE'),
('pt-BR','transportes','CAMINHÃO'),
('pt-BR','transportes','CAMINHONETE'),
('pt-BR','transportes','CANOA'),
('pt-BR','transportes','CARAVELA'),
('pt-BR','transportes','CARRETA'),
('pt-BR','transportes','CARRO'),
('pt-BR','transportes','CARROÇA'),
('pt-BR','transportes','CARRUAGEM'),
('pt-BR','transportes','CATAMARÃ'),
('pt-BR','transportes','CHARRETE'),
('pt-BR','transportes','CICLOMOTOR'),
('pt-BR','transportes','DIRIGÍVEL'),
('pt-BR','transportes','ESCUNA'),
('pt-BR','transportes','FOGUETE'),
('pt-BR','transportes','FURGÃO'),
('pt-BR','transportes','GÔNDOLA'),
('pt-BR','transportes','HELICÓPTERO'),
('pt-BR','transportes','HIDROAVIÃO'),
('pt-BR','transportes','IATE'),
('pt-BR','transportes','JANGADA'),
('pt-BR','transportes','JATO'),
('pt-BR','transportes','JEEP'),
('pt-BR','transportes','LANCHA'),
('pt-BR','transportes','LOCOMOTIVA'),
('pt-BR','transportes','METRÔ'),
('pt-BR','transportes','MICROÔNIBUS'),
('pt-BR','transportes','MONOCICLO'),
('pt-BR','transportes','MONOTRILHO'),
('pt-BR','transportes','MOTO'),
('pt-BR','transportes','MOTOCICLETA'),
('pt-BR','transportes','NAVIO'),
('pt-BR','transportes','ÔNIBUS'),
('pt-BR','transportes','PATINETE'),
('pt-BR','transportes','PEDALINHO'),
('pt-BR','transportes','QUADRICICLO'),
('pt-BR','transportes','REBOQUE'),
('pt-BR','transportes','SUBMARINO'),
('pt-BR','transportes','TÁXI'),
('pt-BR','transportes','TELEFÉRICO'),
('pt-BR','transportes','TRATOR'),
('pt-BR','transportes','TREM'),
('pt-BR','transportes','TRENÓ'),
('pt-BR','transportes','TRICICLO'),
('pt-BR','transportes','TRÓLEBUS'),
('pt-BR','transportes','VAN'),
('pt-BR','transportes','VELEIRO'),
('pt-BR','transportes','VAPOR'),
('pt-BR','transportes','ZEPELIM'),
('pt-BR','objetos','AGULHA'),
('pt-BR','objetos','ALFINETE'),
('pt-BR','objetos','ALMOFADA'),
('pt-BR','objetos','ANEL'),
('pt-BR','objetos','APITO'),
('pt-BR','objetos','ARMÁRIO'),
('pt-BR','objetos','BACIA'),
('pt-BR','objetos','BALDE'),
('pt-BR','objetos','BANCO'),
('pt-BR','objetos','BANDEJA'),
('pt-BR','objetos','BATERIA'),
('pt-BR','objetos','BAÚ'),
('pt-BR','objetos','BERÇO'),
('pt-BR','objetos','BICICLETA'),
('pt-BR','objetos','BORRACHA'),
('pt-BR','objetos','BOTÃO'),
('pt-BR','objetos','BRINCO'),
('pt-BR','objetos','CABIDE'),
('pt-BR','objetos','CADERNO'),
('pt-BR','objetos','CADEADO'),
('pt-BR','objetos','CADEIRA'),
('pt-BR','objetos','CAIXA'),
('pt-BR','objetos','CAMA'),
('pt-BR','objetos','CANECA'),
('pt-BR','objetos','CANETA'),
('pt-BR','objetos','CAPACETE'),
('pt-BR','objetos','CARTEIRA'),
('pt-BR','objetos','CARTAZ'),
('pt-BR','objetos','CESTA'),
('pt-BR','objetos','CHAPÉU'),
('pt-BR','objetos','CHAVE'),
('pt-BR','objetos','CHINELO'),
('pt-BR','objetos','CINTO'),
('pt-BR','objetos','COBERTOR'),
('pt-BR','objetos','COLCHÃO'),
('pt-BR','objetos','COLHER'),
('pt-BR','objetos','COPO'),
('pt-BR','objetos','CORDA'),
('pt-BR','objetos','CORTINA'),
('pt-BR','objetos','ESPELHO'),
('pt-BR','objetos','ESTANTE'),
('pt-BR','objetos','ESTOJO'),
('pt-BR','objetos','FACA'),
('pt-BR','objetos','FERRO'),
('pt-BR','objetos','FLAUTA'),
('pt-BR','objetos','FOGÃO'),
('pt-BR','objetos','FONE'),
('pt-BR','objetos','FORNO'),
('pt-BR','objetos','GARFO'),
('pt-BR','objetos','GARRAFA'),
('pt-BR','objetos','GAVETA'),
('pt-BR','objetos','GUARDANAPO'),
('pt-BR','objetos','LÂMPADA'),
('pt-BR','objetos','LANTERNA'),
('pt-BR','objetos','LÁPIS'),
('pt-BR','objetos','LIVRO'),
('pt-BR','objetos','LIXEIRA'),
('pt-BR','objetos','LUPA'),
('pt-BR','objetos','MALA'),
('pt-BR','objetos','MARTELO'),
('pt-BR','objetos','MESA'),
('pt-BR','objetos','MOCHILA'),
('pt-BR','objetos','MOEDA'),
('pt-BR','objetos','ÓCULOS'),
('pt-BR','objetos','PANELA'),
('pt-BR','objetos','PAPEL'),
('pt-BR','objetos','PENTE'),
('pt-BR','objetos','PIANO'),
('pt-BR','objetos','PINCEL'),
('pt-BR','objetos','PRATO'),
('pt-BR','objetos','PREGO'),
('pt-BR','objetos','QUADRO'),
('pt-BR','objetos','RÁDIO'),
('pt-BR','objetos','RELÓGIO'),
('pt-BR','objetos','ROUPA'),
('pt-BR','objetos','SABÃO'),
('pt-BR','objetos','SACOLA'),
('pt-BR','objetos','SAPATO'),
('pt-BR','objetos','SOFÁ'),
('pt-BR','objetos','TAPETE'),
('pt-BR','objetos','TECLADO'),
('pt-BR','objetos','TELEFONE'),
('pt-BR','objetos','TESOURA'),
('pt-BR','objetos','TIJOLO'),
('pt-BR','objetos','TOALHA'),
('pt-BR','objetos','TRAVESSEIRO'),
('pt-BR','objetos','VASO'),
('pt-BR','objetos','VELA'),
('pt-BR','objetos','VIOLÃO'),
('pt-BR','objetos','XÍCARA'),
('pt-BR','naturaleza','ÁGUA'),
('pt-BR','naturaleza','ÁRVORE'),
('pt-BR','naturaleza','AREIA'),
('pt-BR','naturaleza','AURORA'),
('pt-BR','naturaleza','BAMBU'),
('pt-BR','naturaleza','BARRO'),
('pt-BR','naturaleza','BOSQUE'),
('pt-BR','naturaleza','BRISA'),
('pt-BR','naturaleza','BROTO'),
('pt-BR','naturaleza','CACHOEIRA'),
('pt-BR','naturaleza','CACTO'),
('pt-BR','naturaleza','CAMPO'),
('pt-BR','naturaleza','CAVERNA'),
('pt-BR','naturaleza','CÉU'),
('pt-BR','naturaleza','CHUVA'),
('pt-BR','naturaleza','COLINA'),
('pt-BR','naturaleza','CONCHA'),
('pt-BR','naturaleza','CORAL'),
('pt-BR','naturaleza','CÓRREGO'),
('pt-BR','naturaleza','COSTA'),
('pt-BR','naturaleza','CRATERA'),
('pt-BR','naturaleza','DESERTO'),
('pt-BR','naturaleza','DUNA'),
('pt-BR','naturaleza','ESPINHO'),
('pt-BR','naturaleza','ESTRELA'),
('pt-BR','naturaleza','FLOR'),
('pt-BR','naturaleza','FLORESTA'),
('pt-BR','naturaleza','FOGO'),
('pt-BR','naturaleza','FOLHA'),
('pt-BR','naturaleza','FONTE'),
('pt-BR','naturaleza','FURACÃO'),
('pt-BR','naturaleza','GALHO'),
('pt-BR','naturaleza','GEADA'),
('pt-BR','naturaleza','GELEIRA'),
('pt-BR','naturaleza','GELO'),
('pt-BR','naturaleza','GRAMA'),
('pt-BR','naturaleza','GRUTA'),
('pt-BR','naturaleza','ILHA'),
('pt-BR','naturaleza','JARDIM'),
('pt-BR','naturaleza','LAGO'),
('pt-BR','naturaleza','LAGOA'),
('pt-BR','naturaleza','LAMA'),
('pt-BR','naturaleza','LAVA'),
('pt-BR','naturaleza','LUA'),
('pt-BR','naturaleza','LUZ'),
('pt-BR','naturaleza','MADEIRA'),
('pt-BR','naturaleza','MAR'),
('pt-BR','naturaleza','MARÉ'),
('pt-BR','naturaleza','MATO'),
('pt-BR','naturaleza','MONTANHA'),
('pt-BR','naturaleza','MORRO'),
('pt-BR','naturaleza','MUSGO'),
('pt-BR','naturaleza','NASCENTE'),
('pt-BR','naturaleza','NEBLINA'),
('pt-BR','naturaleza','NEVE'),
('pt-BR','naturaleza','NUVEM'),
('pt-BR','naturaleza','OCEANO'),
('pt-BR','naturaleza','ONDA'),
('pt-BR','naturaleza','ORVALHO'),
('pt-BR','naturaleza','PÂNTANO'),
('pt-BR','naturaleza','PEDRA'),
('pt-BR','naturaleza','PENHASCO'),
('pt-BR','naturaleza','PLANÍCIE'),
('pt-BR','naturaleza','PRAIA'),
('pt-BR','naturaleza','RAIO'),
('pt-BR','naturaleza','RAIZ'),
('pt-BR','naturaleza','RECIFE'),
('pt-BR','naturaleza','RELÂMPAGO'),
('pt-BR','naturaleza','RIO'),
('pt-BR','naturaleza','ROCHA'),
('pt-BR','naturaleza','SEIVA'),
('pt-BR','naturaleza','SELVA'),
('pt-BR','naturaleza','SEMENTE'),
('pt-BR','naturaleza','SERRA'),
('pt-BR','naturaleza','SOL'),
('pt-BR','naturaleza','SOLO'),
('pt-BR','naturaleza','SOMBRA'),
('pt-BR','naturaleza','TEMPESTADE'),
('pt-BR','naturaleza','TERRA'),
('pt-BR','naturaleza','TROVÃO'),
('pt-BR','naturaleza','TRONCO'),
('pt-BR','naturaleza','VALE'),
('pt-BR','naturaleza','VENTO'),
('pt-BR','naturaleza','VULCÃO'),
('pt-BR','nombres','ABEL'),
('pt-BR','nombres','ADRIANA'),
('pt-BR','nombres','AFONSO'),
('pt-BR','nombres','ALANA'),
('pt-BR','nombres','ALBERTO'),
('pt-BR','nombres','ALICE'),
('pt-BR','nombres','ALINE'),
('pt-BR','nombres','AMANDA'),
('pt-BR','nombres','ANA'),
('pt-BR','nombres','ANDRÉ'),
('pt-BR','nombres','ANTÔNIO'),
('pt-BR','nombres','ARTHUR'),
('pt-BR','nombres','AUGUSTO'),
('pt-BR','nombres','BEATRIZ'),
('pt-BR','nombres','BERNARDO'),
('pt-BR','nombres','BIANCA'),
('pt-BR','nombres','BRUNA'),
('pt-BR','nombres','BRUNO'),
('pt-BR','nombres','CAIO'),
('pt-BR','nombres','CAMILA'),
('pt-BR','nombres','CARLA'),
('pt-BR','nombres','CARLOS'),
('pt-BR','nombres','CAROLINA'),
('pt-BR','nombres','CATARINA'),
('pt-BR','nombres','CECÍLIA'),
('pt-BR','nombres','CLARA'),
('pt-BR','nombres','CLÁUDIA'),
('pt-BR','nombres','DANIEL'),
('pt-BR','nombres','DANIELA'),
('pt-BR','nombres','DAVI'),
('pt-BR','nombres','DIEGO'),
('pt-BR','nombres','EDUARDO'),
('pt-BR','nombres','ELISA'),
('pt-BR','nombres','EMÍLIA'),
('pt-BR','nombres','ENZO'),
('pt-BR','nombres','ESTELA'),
('pt-BR','nombres','FÁBIO'),
('pt-BR','nombres','FELIPE'),
('pt-BR','nombres','FERNANDA'),
('pt-BR','nombres','FRANCISCO'),
('pt-BR','nombres','GABRIEL'),
('pt-BR','nombres','GABRIELA'),
('pt-BR','nombres','GIOVANA'),
('pt-BR','nombres','GUILHERME'),
('pt-BR','nombres','GUSTAVO'),
('pt-BR','nombres','HELENA'),
('pt-BR','nombres','HENRIQUE'),
('pt-BR','nombres','HUGO'),
('pt-BR','nombres','IGOR'),
('pt-BR','nombres','ISABEL'),
('pt-BR','nombres','ISABELA'),
('pt-BR','nombres','ISADORA'),
('pt-BR','nombres','JOANA'),
('pt-BR','nombres','JOÃO'),
('pt-BR','nombres','JOAQUIM'),
('pt-BR','nombres','JORGE'),
('pt-BR','nombres','JOSÉ'),
('pt-BR','nombres','JÚLIA'),
('pt-BR','nombres','JULIANA'),
('pt-BR','nombres','LAÍS'),
('pt-BR','nombres','LARA'),
('pt-BR','nombres','LAURA'),
('pt-BR','nombres','LEANDRO'),
('pt-BR','nombres','LEONARDO'),
('pt-BR','nombres','LETÍCIA'),
('pt-BR','nombres','LÍVIA'),
('pt-BR','nombres','LORENA'),
('pt-BR','nombres','LUANA'),
('pt-BR','nombres','LUCAS'),
('pt-BR','nombres','LÚCIA'),
('pt-BR','nombres','LUÍS'),
('pt-BR','nombres','LUÍSA'),
('pt-BR','nombres','MANUEL'),
('pt-BR','nombres','MANUELA'),
('pt-BR','nombres','MARCELO'),
('pt-BR','nombres','MÁRCIA'),
('pt-BR','nombres','MARCOS'),
('pt-BR','nombres','MARIA'),
('pt-BR','nombres','MARIANA'),
('pt-BR','nombres','MATEUS'),
('pt-BR','nombres','MATHEUS'),
('pt-BR','nombres','MIGUEL'),
('pt-BR','nombres','MURILO'),
('pt-BR','nombres','NATALIA'),
('pt-BR','nombres','NICOLAS'),
('pt-BR','nombres','OTÁVIO'),
('pt-BR','nombres','PAULA'),
('pt-BR','nombres','PAULO'),
('pt-BR','nombres','PEDRO'),
('pt-BR','nombres','RAFAEL'),
('pt-BR','nombres','RAFAELA'),
('pt-BR','nombres','RAQUEL'),
('pt-BR','nombres','RENAN'),
('pt-BR','nombres','RENATA'),
('pt-BR','nombres','RICARDO'),
('pt-BR','nombres','RITA'),
('pt-BR','nombres','ROBERTO'),
('pt-BR','nombres','RODRIGO'),
('pt-BR','nombres','ROSA'),
('pt-BR','nombres','SAMUEL'),
('pt-BR','nombres','SARA'),
('pt-BR','nombres','SOFIA'),
('pt-BR','nombres','TAÍS'),
('pt-BR','nombres','TERESA'),
('pt-BR','nombres','THIAGO'),
('pt-BR','nombres','TIAGO'),
('pt-BR','nombres','VALENTINA'),
('pt-BR','nombres','VERA'),
('pt-BR','nombres','VICTOR'),
('pt-BR','nombres','VINÍCIUS'),
('pt-BR','nombres','VITOR'),
('pt-BR','nombres','VITÓRIA'),
('pt-BR','nombres','YASMIN');
create function versus_private.check_word_language(p_language text) returns void language plpgsql immutable set search_path='' as $$begin if p_language is null or p_language not in ('es','en','pt-BR') then raise exception 'Idioma de partida inválido.';end if;end$$;
revoke all on function versus_private.check_word_language(text) from public,anon,authenticated;
create function versus_private.create_versus_room_localized(p_alias text,p_language text) returns public.versus_rooms language plpgsql security definer set search_path='' as $body$
declare r public.versus_rooms;begin perform versus_private.check_word_language(p_language);r:=public.create_versus_room(p_alias);update public.versus_rooms set word_language=p_language where id=r.id returning * into r;return r;end;
$body$;
revoke all on function versus_private.create_versus_room_localized(text,text) from public,anon,authenticated;
grant execute on function versus_private.create_versus_room_localized(text,text) to authenticated;
create function public.create_versus_room_localized(p_alias text,p_language text) returns public.versus_rooms language sql security invoker set search_path='' as $$select versus_private.create_versus_room_localized(p_alias,p_language)$$;
revoke all on function public.create_versus_room_localized(text,text) from public,anon,authenticated;
grant execute on function public.create_versus_room_localized(text,text) to authenticated;
CREATE OR REPLACE FUNCTION versus_private.find_opponent_mode(p_alias text, p_cancel boolean, p_mode text, p_language text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare u uuid:=auth.uid(); q versus_private.search_queue; rival versus_private.search_queue;
 r public.versus_rooms; n text; score bigint; my_rank jsonb; tier integer;
begin
 perform versus_private.check_word_language(p_language);
 if u is null then raise exception 'Iniciá sesión para buscar partida.'; end if;
 if p_mode is null or p_mode not in ('classic','ranked') then raise exception 'Modo de juego inválido.'; end if;
 -- One short transaction pairs exactly two players, including simultaneous polls/cancel.
 perform pg_advisory_xact_lock(927341);
 select * into q from versus_private.search_queue where user_id=u;
 if q.room_id is not null then
   select room.* into r from public.versus_rooms room join public.versus_players p on p.room_id=room.id
     where room.id=q.room_id and p.user_id=u and room.status in ('complete','preparing','playing');
   if r.id is not null then return jsonb_build_object('room_id',r.id,'mode',r.queue_mode); end if;
   delete from versus_private.search_queue where user_id=u;
 end if;
 if p_cancel then
   delete from versus_private.search_queue where user_id=u;
   return jsonb_build_object('cancelled',true);
 end if;
 -- Resume a pairing made by the previous app version.
 select room.* into r from public.versus_rooms room join versus_private.ranked_rooms rr on rr.room_id=room.id
   join public.versus_players p on p.room_id=room.id where p.user_id=u and room.status='complete' order by room.created_at desc limit 1;
 if r.id is not null then return jsonb_build_object('room_id',r.id,'mode',r.queue_mode); end if;
 n:=regexp_replace(btrim(coalesce(p_alias,'')),'\s+',' ','g');
 if length(n) not between 2 and 16 then raise exception 'Escribí un nombre de entre 2 y 16 caracteres.'; end if;
 if public.versus_alias_inappropriate(n) then raise exception 'Elegí otro nombre: no se permiten malas palabras ni insultos.' using errcode='23514'; end if;
 if exists(select 1 from public.versus_players p join public.versus_rooms room on room.id=p.room_id where p.user_id=u and room.status in ('complete','preparing','playing')) then
   raise exception 'Terminá o abandoná tu partida actual antes de buscar otra.';
 end if;
 delete from versus_private.search_queue where touched_at<now()-interval '30 seconds' and room_id is null;
 select coalesce(sum(points),0) into score from versus_private.ranked_results where user_id=u;
 my_rank:=public.versus_rank_info(score); tier:=(my_rank->>'index')::integer;
 insert into versus_private.search_queue(user_id,alias,mode,rating,word_language) values(u,n,p_mode,score,p_language)
 on conflict(user_id) do update set word_language=excluded.word_language,alias=excluded.alias,mode=excluded.mode,rating=excluded.rating,touched_at=now(),room_id=null,
 queued_at=case when search_queue.word_language<>excluded.word_language or search_queue.mode<>excluded.mode or search_queue.room_id is not null then now() else search_queue.queued_at end
 returning * into q;
 select candidate.* into rival from versus_private.search_queue candidate
 cross join lateral(select public.versus_rank_info(candidate.rating) as info) rank
 where candidate.user_id<>u and candidate.room_id is null and candidate.mode=p_mode and candidate.word_language=p_language
 and not exists(select 1 from public.versus_players p join public.versus_rooms room on room.id=p.room_id
   where p.user_id=candidate.user_id and room.status in ('complete','preparing','playing'))
 and (p_mode='classic' or abs((rank.info->>'index')::integer-tier)<=1)
 order by case when p_mode='ranked' then abs((rank.info->>'index')::integer-tier) else 0 end,
   case when p_mode='ranked' then abs(candidate.rating-score) else 0 end,candidate.queued_at,candidate.user_id
 limit 1;
 if rival.user_id is null then return jsonb_build_object('waiting',true,'mode',p_mode,'points',score,'rank',my_rank,'expanded',true,'wait_seconds',floor(extract(epoch from now()-q.queued_at))); end if;
 r:=public.create_versus_room(n);
 insert into public.versus_players(room_id,user_id,alias,slot) values(r.id,rival.user_id,rival.alias,2);
 update public.versus_rooms set status='complete',queue_mode=p_mode,word_language=p_language where id=r.id;
 if p_mode='ranked' then insert into versus_private.ranked_rooms values(r.id); end if;
 update versus_private.search_queue set room_id=r.id,touched_at=now() where user_id in(u,rival.user_id);
 return jsonb_build_object('room_id',r.id,'mode',p_mode);
end $function$
;
revoke all on function versus_private.find_opponent_mode(text,boolean,text,text) from public,anon,authenticated;
grant execute on function versus_private.find_opponent_mode(text,boolean,text,text) to authenticated;
create or replace function versus_private.find_opponent_mode(p_alias text,p_cancel boolean,p_mode text) returns jsonb language sql security invoker set search_path='' as $$select versus_private.find_opponent_mode(p_alias,p_cancel,p_mode,'es')$$;
create function public.find_versus_opponent_localized(p_alias text,p_cancel boolean,p_mode text,p_language text) returns jsonb language sql security invoker set search_path='' as $$select versus_private.find_opponent_mode(p_alias,p_cancel,p_mode,p_language)$$;
revoke all on function public.find_versus_opponent_localized(text,boolean,text,text) from public,anon,authenticated;grant execute on function public.find_versus_opponent_localized(text,boolean,text,text) to authenticated;
create function versus_private.send_versus_invite_localized(p_friend_id uuid,p_language text) returns public.versus_invites language plpgsql security definer set search_path='' as $body$
declare i public.versus_invites;begin perform versus_private.check_word_language(p_language);i:=public.send_versus_invite(p_friend_id);update public.versus_invites set word_language=p_language where id=i.id returning * into i;return i;end;
$body$;
revoke all on function versus_private.send_versus_invite_localized(uuid,text) from public,anon,authenticated;
grant execute on function versus_private.send_versus_invite_localized(uuid,text) to authenticated;
create function public.send_versus_invite_localized(p_friend_id uuid,p_language text) returns public.versus_invites language sql security invoker set search_path='' as $$select versus_private.send_versus_invite_localized(p_friend_id,p_language)$$;
revoke all on function public.send_versus_invite_localized(uuid,text) from public,anon,authenticated;
grant execute on function public.send_versus_invite_localized(uuid,text) to authenticated;
CREATE OR REPLACE FUNCTION public.respond_versus_invite(p_invite_id uuid, p_accept boolean)
 RETURNS versus_rooms
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_invite public.versus_invites;
  v_challenger_alias text;
  v_challenged_alias text;
  v_code text;
  v_room public.versus_rooms;
begin
  if not public.is_permanent_versus_user() then
    raise exception 'Guardá tu cuenta para responder desafíos.';
  end if;

  select * into v_invite
  from public.versus_invites
  where id = p_invite_id
  for update;

  if not found or v_invite.challenged_id <> v_user_id then
    raise exception 'No podés responder ese desafío.';
  end if;
  if v_invite.status <> 'pending' then
    raise exception 'El desafío ya fue respondido.';
  end if;
  if v_invite.expires_at <= now() then
    update public.versus_invites
    set status = 'expired', responded_at = now()
    where id = v_invite.id;
    raise exception 'El desafío venció. Pedile a tu amigo que envíe otro.';
  end if;

  if not coalesce(p_accept, false) then
    update public.versus_invites
    set status = 'declined', responded_at = now()
    where id = v_invite.id;
    return null;
  end if;

  if not exists (
    select 1 from public.versus_friendships
    where status = 'accepted'
      and least(requester_id, addressee_id) = least(v_invite.challenger_id, v_user_id)
      and greatest(requester_id, addressee_id) = greatest(v_invite.challenger_id, v_user_id)
  ) then
    raise exception 'La amistad ya no está activa.';
  end if;

  select alias into v_challenger_alias
  from public.versus_profiles where user_id = v_invite.challenger_id;
  select alias into v_challenged_alias
  from public.versus_profiles where user_id = v_user_id;
  if v_challenger_alias is null or v_challenged_alias is null then
    raise exception 'Falta el perfil de uno de los jugadores.';
  end if;

  loop
    select string_agg(
      substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 1 + floor(random() * 32)::integer, 1),
      ''
    ) into v_code
    from generate_series(1, 6);
    begin
      insert into public.versus_rooms (code, status, host_id, word_language)
      values (v_code, 'complete', v_invite.challenger_id, v_invite.word_language)
      returning * into v_room;
      exit;
    exception when unique_violation then
      -- Reintentamos con otro código compatible con las salas manuales.
    end;
  end loop;

  insert into public.versus_players (room_id, user_id, alias, slot)
  values
    (v_room.id, v_invite.challenger_id, v_challenger_alias, 1),
    (v_room.id, v_user_id, v_challenged_alias, 2);

  update public.versus_invites
  set status = 'accepted', room_id = v_room.id, responded_at = now()
  where id = v_invite.id;

  update public.versus_invites
  set status = 'cancelled', responded_at = now()
  where id <> v_invite.id
    and status = 'pending'
    and (
      v_invite.challenger_id in (challenger_id, challenged_id)
      or v_user_id in (challenger_id, challenged_id)
    );

  return v_room;
end;
$function$
;
CREATE OR REPLACE FUNCTION public.set_versus_challenge(p_room_id uuid, p_theme_key text, p_words text[])
 RETURNS versus_rooms
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_target_id uuid;
  v_room public.versus_rooms;
  v_words text[];
  v_player_count integer;
  v_ready_count integer;
begin
  if v_user_id is null then
    raise exception 'Debes iniciar una sesión antes de preparar el desafío.';
  end if;

  select * into v_room
  from public.versus_rooms
  where id = p_room_id
  for update;

  if not found or not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;
  if v_room.status not in ('preparing') then
    raise exception 'La sala todavía no está lista para recibir palabras.';
  end if;

  if p_theme_key is null or p_theme_key not in (
    'paises', 'frutas', 'animales', 'comidas', 'profesiones',
    'deportes', 'transportes', 'objetos', 'naturaleza', 'nombres'
  ) then
    raise exception 'La temática elegida no es válida.';
  end if;

  if coalesce(cardinality(p_words),0) <> 5 or array_ndims(p_words) <> 1 then
    raise exception 'Debes enviar exactamente cinco palabras.';
  end if;

  select array_agg(upper(normalize(btrim(word),NFC)) order by position)
  into v_words
  from unnest(p_words) with ordinality as supplied(word, position);

  if exists (
    select 1 from unnest(v_words) as word
    where word is null or char_length(word) not between 3 and 12
       or word !~ case v_room.word_language when 'en' then '^[A-Z]+$' when 'pt-BR' then '^[A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ]+$' else '^[A-ZÁÉÍÓÚÜÑ]+$' end
  ) then
    raise exception 'Las palabras deben tener entre 3 y 12 letras, sin espacios ni números.';
  end if;

  if (
    select count(distinct public.versus_letter_key(word))
    from unnest(v_words) as word
  ) <> 5 then
    raise exception 'Las cinco palabras deben ser diferentes.';
  end if;

  select user_id into v_target_id
  from public.versus_players
  where room_id = p_room_id and user_id <> v_user_id;
  if not found then raise exception 'El rival ya no está en la sala.'; end if;

  insert into public.versus_challenges (
    room_id, owner_id, target_id, theme_key, words
  ) values (
    p_room_id, v_user_id, v_target_id, p_theme_key, v_words
  )
  on conflict (room_id, owner_id) do update
  set target_id = excluded.target_id,
      theme_key = excluded.theme_key,
      words = excluded.words,
      updated_at = now();

  update public.versus_players
  set theme_key = p_theme_key, preparation_ready = true
  where room_id = p_room_id and user_id = v_user_id;

  select count(*), count(*) filter (where preparation_ready)
  into v_player_count, v_ready_count
  from public.versus_players
  where room_id = p_room_id;

  update public.versus_rooms
  set status = case
    when v_player_count = 2 and v_ready_count = 2 then 'playing'
    else 'preparing'
  end
  where id = p_room_id
  returning * into v_room;

  return v_room;
end;
$function$
;
CREATE OR REPLACE FUNCTION private.validate_versus_challenge_dictionary()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if exists (
    select 1
    from unnest(new.words) as supplied(word)
    where not exists (
      select 1
      from private.versus_word_dictionary as dictionary
      where (select word_language from public.versus_rooms where id=new.room_id)='es' and dictionary.theme_key = new.theme_key
        and dictionary.word_key = public.versus_letter_key(supplied.word)
    )
    and not exists (select 1 from versus_private.localized_dictionary d join public.versus_rooms r on r.id=new.room_id where d.word_language=r.word_language and d.theme_key=new.theme_key and d.word_key=public.versus_letter_key(supplied.word))
  ) then
    raise exception 'Una o más palabras no figuran en el diccionario de la temática.';
  end if;

  return new;
end;
$function$
;
CREATE OR REPLACE FUNCTION private.add_versus_recovery_word()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_room_id uuid;
  v_theme_key text;
  v_words text[];
  v_failed_word text;
  v_recovery_word text;
begin
  if new.current_word_index <> old.current_word_index + 1 then
    return new;
  end if;

  select m.room_id, challenge.theme_key, challenge.words
  into v_room_id, v_theme_key, v_words
  from public.versus_matches as m
  join public.versus_challenges as challenge
    on challenge.room_id = m.room_id
   and challenge.target_id = new.user_id
  where m.id = new.match_id
  for update of challenge;

  if new.completed_words = old.completed_words then
    v_failed_word := v_words[old.current_word_index + 1];
    new.last_failed_word := v_failed_word;

    if new.lives > 0 and cardinality(v_words) < 9 then
      select dictionary.word
      into v_recovery_word
      from (select theme_key,word,word_key from private.versus_word_dictionary where (select word_language from public.versus_rooms where id=v_room_id)='es' union all select theme_key,word,word_key from versus_private.localized_dictionary where word_language=(select word_language from public.versus_rooms where id=v_room_id)) as dictionary
      where dictionary.theme_key = v_theme_key
        and not exists (
          select 1
          from unnest(v_words) as existing(word)
          where public.versus_letter_key(existing.word) = dictionary.word_key
        )
      order by random()
      limit 1;

      if v_recovery_word is null then
        raise exception 'No quedan palabras de recuperación para esta temática.';
      end if;

      update public.versus_challenges
      set words = array_append(words, v_recovery_word),
          updated_at = now()
      where room_id = v_room_id and target_id = new.user_id;
    end if;
  end if;

  -- Cinco palabras acertadas siguen siendo el objetivo. El índice también cuenta
  -- las falladas, por eso no debe finalizar el recorrido por sí solo.
  if new.lives > 0 and new.completed_words < 5 then
    new.finished := false;
    new.finish_reason := null;
  end if;

  return new;
end;
$function$
;
CREATE OR REPLACE FUNCTION public.get_versus_match_state(p_room_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_match public.versus_matches%rowtype;
  v_state jsonb;
  v_me public.versus_match_players%rowtype;
  v_opponent public.versus_match_players%rowtype;
begin
  if v_user_id is null or not public.is_versus_room_member(p_room_id) then
    raise exception 'No perteneces a esta sala.';
  end if;

  select * into v_match from public.versus_matches where room_id = p_room_id;
  if not found then return null; end if;
  perform private.expire_versus_player_times(v_match.id);
  select * into v_match from public.versus_matches where id = v_match.id;

  v_state := public.get_versus_match_state_without_time_penalty(p_room_id);
  if v_state is null then return null; end if;

  select * into v_me from public.versus_match_players
  where match_id = v_match.id and user_id = v_user_id;
  select * into v_opponent from public.versus_match_players
  where match_id = v_match.id and user_id <> v_user_id;

  return v_state || jsonb_build_object('wordLanguage',(select word_language from public.versus_rooms where id=p_room_id),'wordRulesVersion','word-rules-v1') || jsonb_build_object(
    'me', (v_state->'me') || jsonb_build_object(
      'timePenaltySeconds', v_me.time_penalty_seconds,
      'remainingSeconds', greatest(0, ceil(extract(epoch from (v_match.deadline_at - now())))::integer - v_me.time_penalty_seconds)
    ),
    'opponent', (v_state->'opponent') || jsonb_build_object(
      'timePenaltySeconds', v_opponent.time_penalty_seconds,
      'remainingSeconds', greatest(0, ceil(extract(epoch from (v_match.deadline_at - now())))::integer - v_opponent.time_penalty_seconds)
    )
  );
end;
$function$
;
CREATE OR REPLACE FUNCTION public.activate_versus_ability_without_kairos(p_room_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_match public.versus_matches%rowtype;
  v_me public.versus_match_players%rowtype;
  v_opponent public.versus_match_players%rowtype;
  v_character text;
  v_word text;
  v_hint text;
  v_effect text;
  v_expires_at timestamptz;
  v_forced_letter text;
  v_forced_letters text[];
  v_word_failed boolean := false;
  v_should_finish boolean := false;
begin
  if not public.is_versus_room_member(p_room_id) then raise exception 'No perteneces a esta sala.'; end if;

  select * into v_match from public.versus_matches where room_id = p_room_id for update;
  if not found or v_match.status <> 'playing' or now() >= v_match.deadline_at then
    raise exception 'La partida ya no está disponible.';
  end if;

  select * into v_me from public.versus_match_players
  where match_id = v_match.id and user_id = v_user_id for update;
  select * into v_opponent from public.versus_match_players
  where match_id = v_match.id and user_id <> v_user_id for update;

  if v_me.finished then raise exception 'Tu recorrido ya terminó.'; end if;
  if v_me.ability_charge < 8 then raise exception 'La habilidad todavía no está cargada.'; end if;

  select character_key into v_character from public.versus_players
  where room_id = p_room_id and user_id = v_user_id;
  if v_character not in (
    'explorador', 'guardiana', 'dragon', 'mago', 'hombre_lobo', 't_shadow',
    'guardian_alba', 'dragon_hielo', 'azrak', 'kalamo'
  ) then
    raise exception 'El personaje no tiene una habilidad válida.';
  end if;

  if v_character = 'explorador' then
    select words[v_me.current_word_index + 1] into v_word
    from public.versus_challenges where room_id = p_room_id and target_id = v_user_id;
    select key into v_hint
    from (
      select distinct public.versus_letter_key(character) as key
      from unnest(string_to_array(coalesce(v_word, ''), null)) as character
    ) as pending
    where key <> all(v_me.guessed_letters)
    order by random() limit 1;
    if v_hint is null then raise exception 'No quedan letras para revelar.'; end if;
    update public.versus_match_players
    set ability_charge = 0, ability_hint = v_hint, updated_at = now()
    where match_id = v_match.id and user_id = v_user_id;

  elsif v_character = 'azrak' then
    if v_opponent.finished then raise exception 'El recorrido del rival ya terminó.'; end if;
    select words[v_opponent.current_word_index + 1] into v_word
    from public.versus_challenges where room_id = p_room_id and target_id = v_opponent.user_id;
    if v_word is null then raise exception 'No encontramos la palabra actual del rival.'; end if;

    select candidate into v_forced_letter
    from unnest(array[
      'A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'
    ]) as candidate
    where (candidate<>'Ñ' or (select word_language from public.versus_rooms where id=p_room_id)='es') and candidate <> all(v_opponent.guessed_letters)
      and not exists (
        select 1 from unnest(string_to_array(v_word, null)) as character
        where public.versus_letter_key(character) = candidate
      )
    order by random() limit 1;
    if v_forced_letter is null then raise exception 'No quedan letras incorrectas disponibles.'; end if;

    v_forced_letters := array_append(v_opponent.guessed_letters, v_forced_letter);
    v_word_failed := v_opponent.errors + 1 >= 6;
    if v_word_failed then
      update public.versus_match_players
      set current_word_index = current_word_index + 1,
          guessed_letters = '{}', errors = 0,
          lives = greatest(0, lives - 1),
          finished = current_word_index + 1 >= 5 or lives - 1 <= 0,
          finish_reason = case
            when lives - 1 <= 0 then 'lives'
            when current_word_index + 1 >= 5 then 'complete'
            else null
          end,
          updated_at = now()
      where match_id = v_match.id and user_id = v_opponent.user_id;
    else
      update public.versus_match_players
      set guessed_letters = v_forced_letters, errors = errors + 1, updated_at = now()
      where match_id = v_match.id and user_id = v_opponent.user_id;
    end if;
    update public.versus_match_players
    set ability_charge = 0, ability_hint = null, updated_at = now()
    where match_id = v_match.id and user_id = v_user_id;
    v_effect := 'forced_miss';

  else
    v_effect := case v_character
      when 'guardiana' then 'roots' when 'dragon' then 'roar'
      when 'hombre_lobo' then 'invert' when 't_shadow' then 'black_hole'
      when 'guardian_alba' then 'key_bounce' when 'dragon_hielo' then 'ice_screen'
      when 'kalamo' then 'key_theft'
      else 'shuffle'
    end;
    v_expires_at := now() + interval '5 seconds';
    update public.versus_match_players
    set ability_charge = 0, ability_hint = null, updated_at = now()
    where match_id = v_match.id and user_id = v_user_id;
    update public.versus_match_players
    set active_effect = v_effect, effect_expires_at = v_expires_at, updated_at = now()
    where match_id = v_match.id and user_id = v_opponent.user_id;
  end if;

  update public.versus_matches
  set event_sequence = event_sequence + 1,
      last_event = jsonb_strip_nulls(jsonb_build_object(
        'type', 'ability_used', 'actorId', v_user_id, 'character', v_character,
        'effect', coalesce(v_effect, 'hint'), 'expiresAt', v_expires_at,
        'letter', v_forced_letter, 'wordFailed', v_word_failed,
        'word', case when v_word_failed then v_word else null end
      )),
      updated_at = now()
  where id = v_match.id;

  if v_character = 'azrak' and v_word_failed then
    select exists (
      select 1 from public.versus_match_players where match_id = v_match.id and lives <= 0
    ) or (
      select bool_and(finished) from public.versus_match_players where match_id = v_match.id
    ) into v_should_finish;
    if v_should_finish then perform public.finish_versus_match(v_match.id, 'rules'); end if;
  end if;
  return public.get_versus_match_state(p_room_id);
end;
$function$
;
do $patch$ declare d text;begin select pg_get_functiondef('versus_private.play_versus_letter(uuid,text)'::regprocedure) into d;d:=replace(d,' result:=versus_private.play_versus_letter_without_union',$check$ if p_letter is null or public.versus_letter_key(p_letter) !~ (case (select word_language from public.versus_rooms where id=p_room_id) when 'es' then '^[A-ZÑ]$' else '^[A-Z]$' end) then raise exception 'Letra inválida para el idioma de la partida.';end if;
 result:=versus_private.play_versus_letter_without_union$check$);execute d;end $patch$;

-- Keep older clients from entering a non-Spanish room with a Spanish keyboard.
alter function public.join_versus_room(text,text) set schema versus_private;
alter function versus_private.join_versus_room(text,text) rename to join_room_core;
revoke all on function versus_private.join_room_core(text,text) from public,anon,authenticated;
create function versus_private.join_room(p_code text,p_alias text,p_localized boolean) returns public.versus_rooms language plpgsql security definer set search_path='' as $$begin
 if auth.uid() is null then raise exception 'Iniciá sesión para entrar a la sala.';end if;
 if not p_localized and exists(select 1 from public.versus_rooms where code=upper(btrim(p_code)) and word_language<>'es') then raise exception 'Actualizá el juego para entrar a una sala en otro idioma.';end if;
 return versus_private.join_room_core(p_code,p_alias);end$$;
revoke all on function versus_private.join_room(text,text,boolean) from public,anon,authenticated;grant execute on function versus_private.join_room(text,text,boolean) to authenticated;
create function public.join_versus_room(p_code text,p_alias text) returns public.versus_rooms language sql security invoker set search_path='' as $$select versus_private.join_room(p_code,p_alias,false)$$;
create function public.join_versus_room_localized(p_code text,p_alias text) returns public.versus_rooms language sql security invoker set search_path='' as $$select versus_private.join_room(p_code,p_alias,true)$$;
revoke all on function public.join_versus_room(text,text),public.join_versus_room_localized(text,text) from public,anon,authenticated;grant execute on function public.join_versus_room(text,text),public.join_versus_room_localized(text,text) to authenticated;
alter function public.respond_versus_invite(uuid,boolean) set schema versus_private;
alter function versus_private.respond_versus_invite(uuid,boolean) rename to respond_invite_core;
revoke all on function versus_private.respond_invite_core(uuid,boolean) from public,anon,authenticated;
create function versus_private.respond_invite(p_invite_id uuid,p_accept boolean,p_localized boolean) returns public.versus_rooms language plpgsql security definer set search_path='' as $$begin
 if auth.uid() is null then raise exception 'Iniciá sesión para responder desafíos.';end if;
 if p_accept and not p_localized and exists(select 1 from public.versus_invites where id=p_invite_id and challenged_id=auth.uid() and word_language<>'es') then raise exception 'Actualizá el juego para aceptar un desafío en otro idioma.';end if;
 return versus_private.respond_invite_core(p_invite_id,p_accept);end$$;
revoke all on function versus_private.respond_invite(uuid,boolean,boolean) from public,anon,authenticated;grant execute on function versus_private.respond_invite(uuid,boolean,boolean) to authenticated;
create function public.respond_versus_invite(p_invite_id uuid,p_accept boolean) returns public.versus_rooms language sql security invoker set search_path='' as $$select versus_private.respond_invite(p_invite_id,p_accept,false)$$;
create function public.respond_versus_invite_localized(p_invite_id uuid,p_accept boolean) returns public.versus_rooms language sql security invoker set search_path='' as $$select versus_private.respond_invite(p_invite_id,p_accept,true)$$;
revoke all on function public.respond_versus_invite(uuid,boolean),public.respond_versus_invite_localized(uuid,boolean) from public,anon,authenticated;grant execute on function public.respond_versus_invite(uuid,boolean),public.respond_versus_invite_localized(uuid,boolean) to authenticated;

notify pgrst,'reload schema';
commit;
