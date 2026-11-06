-- LOCAL ONLY. Required by the revised, unapplied action-validator draft. Rewards remain OFF.
update versus_private.adventure_reward_rollout set enabled=false where singleton;
create table versus_private.adventure_puzzle_definitions(kind text not null,language text not null,data jsonb not null,primary key(kind,language));
alter table versus_private.adventure_puzzle_definitions enable row level security;
revoke all on versus_private.adventure_puzzle_definitions from public,anon,authenticated,service_role;
-- BEGIN GENERATED PUZZLE DATA
insert into versus_private.adventure_puzzle_definitions(kind,language,data) values
('thermal','es','{"initial":[2,0,2],"target":[1,1,1],"modulo":3}'::jsonb),
('mirrors','es','{"target":[1,3,1,3,1],"modulo":4}'::jsonb),
('oaths','es','{"initial":[0,1,2,3],"target":[2,0,3,1],"modulo":4}'::jsonb),
('rings','es','{"rounds":[{"palabra":"AIRE","pista":"Lo que llena las Cumbres Celestes.","opciones":[["E","O","A","U","I"],["A","E","O","I","U"],["N","R","L","S","T"],["A","O","E","U","I"]]},{"palabra":"NUBE","pista":"Flota alrededor de las islas.","opciones":[["V","C","N","M","L"],["A","U","O","I","E"],["P","D","G","B","R"],["O","A","E","I","U"]]},{"palabra":"LIBRE","pista":"Así debe quedar Aeralis.","opciones":[["I","T","L","R","A"],["A","I","E","O","U"],["P","B","D","G","R"],["N","S","R","L","T"],["A","O","U","E","I"]]}]}'::jsonb),
('search','es','{"letters":"JGQSCSNMFGPCUITENENRBDEOFUBUÑVSLBORABBPJOINROEOOTVBCHUWTADAIJXACNCSZXASUZEIZJUGQSMIVXEEDFYEVIJWJMVFH","words":[{"palabra":"NUBE","indices":[18,27,36,45]},{"palabra":"VIENTO","indices":[91,82,73,64,55,46]},{"palabra":"CIELO","indices":[4,13,22,31,40]}]}'::jsonb),
('runes','es','{"targets":[{"name":"Hoja","x":134,"y":188,"size":80,"clue":"Entre las piedras y las hojas del muro izquierdo."},{"name":"Sol","x":1368,"y":269,"size":88,"clue":"Revisá el escudo junto a la pequeña sombra."},{"name":"Nube","x":730,"y":572,"size":84,"clue":"Buscá entre las vasijas del centro."},{"name":"Copo de nieve","x":167,"y":853,"size":100,"clue":"Entre los escombros de la esquina inferior izquierda."},{"name":"Estrella","x":1360,"y":853,"size":100,"clue":"Las cadenas de la derecha rodean una piedra especial."}]}'::jsonb),
('differences','es','{"targets":[{"x":95,"y":67,"w":110,"h":115,"name":"La luna del medallón","clue":"Compará los adornos de la pared superior izquierda."},{"x":1308,"y":123,"w":62,"h":66,"name":"El cristal de la lámpara","clue":"La luz que cuelga arriba a la derecha oculta un cambio."},{"x":65,"y":276,"w":49,"h":109,"name":"La botella del estante","clue":"Revisá los objetos de la estantería izquierda."},{"x":1364,"y":270,"w":100,"h":103,"name":"La estrella del escudo","clue":"Observá la decoración de la pared derecha."},{"x":171,"y":710,"w":41,"h":55,"name":"La cinta del libro","clue":"Compará con atención el libro de la esquina inferior izquierda."},{"x":666,"y":824,"w":182,"h":105,"name":"El triángulo del suelo","clue":"Hay una diferencia en los dibujos del piso."},{"x":1380,"y":627,"w":65,"h":112,"name":"El asa del jarrón","clue":"Observá la silueta de la vasija de la derecha."}]}'::jsonb),
('channels','es','{"types":[{"tipo":"curva","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":2},{"tipo":"recto","objetivo":0},{"tipo":"curva","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"ciego","objetivo":3},{"tipo":"curva","objetivo":1},{"tipo":"curva","objetivo":2},{"tipo":"recto","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"curva","objetivo":0},{"tipo":"curva","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":2},{"tipo":"recto","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"bloqueado","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"nucleo","objetivo":0},{"tipo":"curva","objetivo":3},{"tipo":"recto","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"curva","objetivo":0},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":3},{"tipo":"curva","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":3},{"tipo":"recto","objetivo":0},{"tipo":"ciego","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":3},{"tipo":"ciego","objetivo":0},{"tipo":"bloqueado","objetivo":0},{"tipo":"bloqueado","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"curva","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":3}],"modulo":4,"width":7,"source":42,"target":24}'::jsonb),
('oasis','es','{"rounds":3}'::jsonb),
('bells','es','{"rounds":[{"intercambios":5,"duracionPaso":650},{"intercambios":7,"duracionPaso":500},{"intercambios":9,"duracionPaso":380}]}'::jsonb),
('ice-path','es','{"rounds":[{"cian":[25,30],"violeta":[2,58],"dorado":[5,61]},{"cian":[12,52],"violeta":[23,16],"dorado":[47,40]},{"cian":[4,48],"violeta":[37,43],"dorado":[32,76]}]}'::jsonb),
('memory:wolves','es','{"rounds":3}'::jsonb),
('maze','es','{"map":["111111111111111111111","100010100000000010001","111010101111101010101","100010000000101000101","101111111111101111101","101000000000001010001","101010111111111010111","101010001000000010001","101011101011111011101","101010101000001000101","101010101111111011101","101000100000001000001","101111101111101111101","100000101000100000101","111110101110111110101","100010100000100000101","111010111110101111101","100010000010101000101","101111111011101010101","100000000000001010001","111111111111111111111"]}'::jsonb),
('thermal','en','{"initial":[2,0,2],"target":[1,1,1],"modulo":3}'::jsonb),
('mirrors','en','{"target":[1,3,1,3,1],"modulo":4}'::jsonb),
('oaths','en','{"initial":[0,1,2,3],"target":[2,0,3,1],"modulo":4}'::jsonb),
('rings','en','{"rounds":[{"palabra":"AIR","pista":"It fills the Celestial Heights.","opciones":[["A","E","I","O","U"],["E","O","U","B","I"],["O","U","B","R","I"]]},{"palabra":"CLOUD","pista":"It floats around the islands.","opciones":[["C","A","E","I","O"],["E","I","O","U","L"],["U","B","C","O","I"],["C","D","U","O","B"],["O","D","A","E","I"]]},{"palabra":"FREE","pista":"How Aeralis must be.","opciones":[["F","A","E","I","O"],["E","I","O","U","R"],["U","B","C","E","O"],["C","D","E","U","B"]]}]}'::jsonb),
('search','en','{"letters":"JGQSSSNMFGPCUKTENECRBDYOFUBLNVSLBORAOBPJOINROUOOTVBCHUDTADAIJXACDCSZXASUZNIZJUGQSMIVXEEDFYEWIJWJMVFH","words":[{"palabra":"CLOUD","indices":[18,27,36,45,54]},{"palabra":"WIND","indices":[91,82,73,64]},{"palabra":"SKY","indices":[4,13,22]}]}'::jsonb),
('runes','en','{"targets":[{"name":"Hoja","x":134,"y":188,"size":80,"clue":"Entre las piedras y las hojas del muro izquierdo."},{"name":"Sol","x":1368,"y":269,"size":88,"clue":"Revisá el escudo junto a la pequeña sombra."},{"name":"Nube","x":730,"y":572,"size":84,"clue":"Buscá entre las vasijas del centro."},{"name":"Copo de nieve","x":167,"y":853,"size":100,"clue":"Entre los escombros de la esquina inferior izquierda."},{"name":"Estrella","x":1360,"y":853,"size":100,"clue":"Las cadenas de la derecha rodean una piedra especial."}]}'::jsonb),
('differences','en','{"targets":[{"x":95,"y":67,"w":110,"h":115,"name":"La luna del medallón","clue":"Compará los adornos de la pared superior izquierda."},{"x":1308,"y":123,"w":62,"h":66,"name":"El cristal de la lámpara","clue":"La luz que cuelga arriba a la derecha oculta un cambio."},{"x":65,"y":276,"w":49,"h":109,"name":"La botella del estante","clue":"Revisá los objetos de la estantería izquierda."},{"x":1364,"y":270,"w":100,"h":103,"name":"La estrella del escudo","clue":"Observá la decoración de la pared derecha."},{"x":171,"y":710,"w":41,"h":55,"name":"La cinta del libro","clue":"Compará con atención el libro de la esquina inferior izquierda."},{"x":666,"y":824,"w":182,"h":105,"name":"El triángulo del suelo","clue":"Hay una diferencia en los dibujos del piso."},{"x":1380,"y":627,"w":65,"h":112,"name":"El asa del jarrón","clue":"Observá la silueta de la vasija de la derecha."}]}'::jsonb),
('channels','en','{"types":[{"tipo":"curva","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":2},{"tipo":"recto","objetivo":0},{"tipo":"curva","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"ciego","objetivo":3},{"tipo":"curva","objetivo":1},{"tipo":"curva","objetivo":2},{"tipo":"recto","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"curva","objetivo":0},{"tipo":"curva","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":2},{"tipo":"recto","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"bloqueado","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"nucleo","objetivo":0},{"tipo":"curva","objetivo":3},{"tipo":"recto","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"curva","objetivo":0},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":3},{"tipo":"curva","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":3},{"tipo":"recto","objetivo":0},{"tipo":"ciego","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":3},{"tipo":"ciego","objetivo":0},{"tipo":"bloqueado","objetivo":0},{"tipo":"bloqueado","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"curva","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":3}],"modulo":4,"width":7,"source":42,"target":24}'::jsonb),
('oasis','en','{"rounds":3}'::jsonb),
('bells','en','{"rounds":[{"intercambios":5,"duracionPaso":650},{"intercambios":7,"duracionPaso":500},{"intercambios":9,"duracionPaso":380}]}'::jsonb),
('ice-path','en','{"rounds":[{"cian":[25,30],"violeta":[2,58],"dorado":[5,61]},{"cian":[12,52],"violeta":[23,16],"dorado":[47,40]},{"cian":[4,48],"violeta":[37,43],"dorado":[32,76]}]}'::jsonb),
('memory:wolves','en','{"rounds":3}'::jsonb),
('maze','en','{"map":["111111111111111111111","100010100000000010001","111010101111101010101","100010000000101000101","101111111111101111101","101000000000001010001","101010111111111010111","101010001000000010001","101011101011111011101","101010101000001000101","101010101111111011101","101000100000001000001","101111101111101111101","100000101000100000101","111110101110111110101","100010100000100000101","111010111110101111101","100010000010101000101","101111111011101010101","100000000000001010001","111111111111111111111"]}'::jsonb),
('thermal','pt-BR','{"initial":[2,0,2],"target":[1,1,1],"modulo":3}'::jsonb),
('mirrors','pt-BR','{"target":[1,3,1,3,1],"modulo":4}'::jsonb),
('oaths','pt-BR','{"initial":[0,1,2,3],"target":[2,0,3,1],"modulo":4}'::jsonb),
('rings','pt-BR','{"rounds":[{"palabra":"VENTO","pista":"O ar em movimento nos Picos Celestes.","opciones":[["V","A","E","I","O"],["I","O","U","B","E"],["O","U","B","N","I"],["B","C","T","O","U"],["U","O","A","E","I"]]},{"palabra":"NUVEM","pista":"Flutua ao redor das ilhas.","opciones":[["N","A","E","I","O"],["E","I","O","B","U"],["O","U","B","V","I"],["C","D","E","U","B"],["O","M","A","E","I"]]},{"palabra":"LIVRE","pista":"Como Aeralis deve ficar.","opciones":[["L","A","E","I","O"],["E","O","U","B","I"],["O","U","B","V","I"],["B","C","R","O","U"],["U","E","A","I","O"]]}]}'::jsonb),
('search','pt-BR','{"letters":"JGQSCSNMFGPCUÉTENENRBDUOFUBUNVSLBORAVBPJOINROEOOTVBCHUMOADAIJXACTCSZXASUZNIZJUGQSMEVXEEDFYEVIJWJMVFH","words":[{"palabra":"NUVEM","indices":[18,27,36,45,54]},{"palabra":"VENTO","indices":[91,82,73,64,55]},{"palabra":"CÉU","indices":[4,13,22]}]}'::jsonb),
('runes','pt-BR','{"targets":[{"name":"Hoja","x":134,"y":188,"size":80,"clue":"Entre las piedras y las hojas del muro izquierdo."},{"name":"Sol","x":1368,"y":269,"size":88,"clue":"Revisá el escudo junto a la pequeña sombra."},{"name":"Nube","x":730,"y":572,"size":84,"clue":"Buscá entre las vasijas del centro."},{"name":"Copo de nieve","x":167,"y":853,"size":100,"clue":"Entre los escombros de la esquina inferior izquierda."},{"name":"Estrella","x":1360,"y":853,"size":100,"clue":"Las cadenas de la derecha rodean una piedra especial."}]}'::jsonb),
('differences','pt-BR','{"targets":[{"x":95,"y":67,"w":110,"h":115,"name":"La luna del medallón","clue":"Compará los adornos de la pared superior izquierda."},{"x":1308,"y":123,"w":62,"h":66,"name":"El cristal de la lámpara","clue":"La luz que cuelga arriba a la derecha oculta un cambio."},{"x":65,"y":276,"w":49,"h":109,"name":"La botella del estante","clue":"Revisá los objetos de la estantería izquierda."},{"x":1364,"y":270,"w":100,"h":103,"name":"La estrella del escudo","clue":"Observá la decoración de la pared derecha."},{"x":171,"y":710,"w":41,"h":55,"name":"La cinta del libro","clue":"Compará con atención el libro de la esquina inferior izquierda."},{"x":666,"y":824,"w":182,"h":105,"name":"El triángulo del suelo","clue":"Hay una diferencia en los dibujos del piso."},{"x":1380,"y":627,"w":65,"h":112,"name":"El asa del jarrón","clue":"Observá la silueta de la vasija de la derecha."}]}'::jsonb),
('channels','pt-BR','{"types":[{"tipo":"curva","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":2},{"tipo":"recto","objetivo":0},{"tipo":"curva","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"ciego","objetivo":3},{"tipo":"curva","objetivo":1},{"tipo":"curva","objetivo":2},{"tipo":"recto","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"curva","objetivo":0},{"tipo":"curva","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":2},{"tipo":"recto","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"bloqueado","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"nucleo","objetivo":0},{"tipo":"curva","objetivo":3},{"tipo":"recto","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"curva","objetivo":0},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":3},{"tipo":"curva","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":3},{"tipo":"recto","objetivo":0},{"tipo":"ciego","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":3},{"tipo":"ciego","objetivo":0},{"tipo":"bloqueado","objetivo":0},{"tipo":"bloqueado","objetivo":0},{"tipo":"recto","objetivo":0},{"tipo":"curva","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"recto","objetivo":1},{"tipo":"curva","objetivo":3}],"modulo":4,"width":7,"source":42,"target":24}'::jsonb),
('oasis','pt-BR','{"rounds":3}'::jsonb),
('bells','pt-BR','{"rounds":[{"intercambios":5,"duracionPaso":650},{"intercambios":7,"duracionPaso":500},{"intercambios":9,"duracionPaso":380}]}'::jsonb),
('ice-path','pt-BR','{"rounds":[{"cian":[25,30],"violeta":[2,58],"dorado":[5,61]},{"cian":[12,52],"violeta":[23,16],"dorado":[47,40]},{"cian":[4,48],"violeta":[37,43],"dorado":[32,76]}]}'::jsonb),
('memory:wolves','pt-BR','{"rounds":3}'::jsonb),
('maze','pt-BR','{"map":["111111111111111111111","100010100000000010001","111010101111101010101","100010000000101000101","101111111111101111101","101000000000001010001","101010111111111010111","101010001000000010001","101011101011111011101","101010101000001000101","101010101111111011101","101000100000001000001","101111101111101111101","100000101000100000101","111110101110111110101","100010100000100000101","111010111110101111101","100010000010101000101","101111111011101010101","100000000000001010001","111111111111111111111"]}'::jsonb);
-- END GENERATED PUZZLE DATA

create function versus_private.adventure_slide_board() returns integer[] language plpgsql set search_path='' as $$
declare board_ integer[]:=array[0,1,2,3,4,5,6,7,-1];previous_ integer:=0;empty_ integer;options_ integer[];chosen_ integer;i integer;
begin
 for i in 1..6 loop empty_:=array_position(board_,-1);
  select array_agg(n) into options_ from generate_series(1,9) n where n<>previous_ and abs((n-1)/3-(empty_-1)/3)+abs((n-1)%3-(empty_-1)%3)=1;
  chosen_:=options_[1+floor(random()*cardinality(options_))::integer];board_[empty_]:=board_[chosen_];board_[chosen_]:=-1;previous_:=empty_;
 end loop;return board_;
end $$;
revoke all on function versus_private.adventure_slide_board() from public,anon,authenticated,service_role;

create function versus_private.adventure_channel_open(p_type text,p_rotation integer) returns integer[]
language sql immutable set search_path='' as $$select case p_type when 'bloqueado' then '{}'::integer[] when 'nucleo' then array[1] when 'ciego' then array[p_rotation%4] when 'recto' then array[p_rotation%4,(p_rotation+2)%4] else array[p_rotation%4,(p_rotation+1)%4] end$$;
revoke all on function versus_private.adventure_channel_open(text,integer) from public,anon,authenticated,service_role;
create function versus_private.adventure_channels_done(p_values jsonb,p_definition jsonb) returns boolean
language plpgsql immutable set search_path='' as $$
declare visited integer[]:=array[42];pending integer[]:=array[42];cell integer;dir integer;neighbor integer;opens integer[];offsets integer[]:=array[-7,1,7,-1];
begin
 if not 2=any(versus_private.adventure_channel_open(p_definition->'types'->42->>'tipo',(p_values->>42)::integer)) then return false;end if;
 while cardinality(pending)>0 loop
  cell:=pending[1];pending:=pending[2:cardinality(pending)];
  opens:=versus_private.adventure_channel_open(p_definition->'types'->cell->>'tipo',(p_values->>cell)::integer);
  foreach dir in array opens loop
   if (dir=0 and cell/7=0) or (dir=2 and cell/7=6) or (dir=1 and cell%7=6) or (dir=3 and cell%7=0) then continue;end if;
   neighbor:=cell+offsets[dir+1];
   if not neighbor=any(visited) and (dir+2)%4=any(versus_private.adventure_channel_open(p_definition->'types'->neighbor->>'tipo',(p_values->>neighbor)::integer)) then
    visited:=array_append(visited,neighbor);pending:=array_append(pending,neighbor);
   end if;
  end loop;
 end loop;
 return 24=any(visited);
end $$;
revoke all on function versus_private.adventure_channels_done(jsonb,jsonb) from public,anon,authenticated,service_role;

create function versus_private.adventure_puzzle_round(p_kind text,p_language text,p_state jsonb,p_now timestamptz)
returns jsonb language plpgsql security definer set search_path='' as $$
declare s jsonb:=p_state;d jsonb;goal jsonb;previous jsonb:=p_state->'goal';choices jsonb;colors text[]:=array['ninguno','azul','dorado'];c integer;n integer;r integer:=(s->>'round')::integer;seq integer[];last_ integer:=-1;i integer;
begin
 select data into strict d from versus_private.adventure_puzzle_definitions where kind=p_kind and language=p_language;
 if p_kind='maze' then return jsonb_build_object('kind','maze','x',1.5,'y',1.5,'vx',0,'vy',0,'force_x',0,'force_y',0,'ticks',0,'started_at',p_now,'done',false,'found','[]'::jsonb);end if;
 if p_kind='oasis' then
  loop c:=floor(random()*3)::integer+1;n:=floor(random()*3)::integer+1;goal:=jsonb_build_object('ondas',random()<0.5,'palmeras',n,'brillo',colors[c]);exit when goal is distinct from previous;end loop;
  select jsonb_agg(choice order by gen_random_uuid()) into choices from (values(goal),
   (goal||jsonb_build_object('palmeras',n%3+1,'brillo',colors[c%3+1])),
   (goal||jsonb_build_object('ondas',not (goal->>'ondas')::boolean,'brillo',colors[(c+1)%3+1])),
   (goal||jsonb_build_object('ondas',not (goal->>'ondas')::boolean,'palmeras',(n+1)%3+1))) q(choice);
  return s||jsonb_build_object('goal',goal,'choices',choices);
 elsif p_kind='bells' then
  return s||jsonb_build_object('relic',floor(random()*3)::integer,'offset',floor(random()*3)::integer,
   'ready_at',p_now+make_interval(secs=>1.77+(d->'rounds'->r->>'intercambios')::integer*((d->'rounds'->r->>'duracionPaso')::numeric/1000+0.09)));
 elsif p_kind='memory:wolves' then
  if s->'values' is not null and s->'values'<>'null'::jsonb then select array_agg(value::integer order by ordinality) into seq from jsonb_array_elements_text(s->'values') with ordinality;end if;
  if seq is null then
   seq:='{}';for i in 1..3 loop c:=floor(random()*4)::integer;if c=last_ then c:=(c+1+floor(random()*3)::integer)%4;end if;seq:=array_append(seq,c);last_:=c;end loop;
  elsif cardinality(seq)<r+3 then c:=floor(random()*4)::integer;if c=seq[cardinality(seq)] then c:=(c+1)%4;end if;seq:=array_append(seq,c);
  end if;
  return s||jsonb_build_object('values',seq,'cursor',0,'ready_at',p_now+make_interval(secs=>0.25+cardinality(seq)*0.51));
 elsif p_kind='ice-path' then return s||jsonb_build_object('paths','{}'::jsonb,'active',null);
 end if;
 raise exception 'Ronda inválida.' using errcode='22023';
end $$;
revoke all on function versus_private.adventure_puzzle_round(text,text,jsonb,timestamptz) from public,anon,authenticated,service_role;

create function versus_private.adventure_puzzle_start(p_kind text,p_language text,p_now timestamptz)
returns jsonb language plpgsql security definer set search_path='' as $$
declare d jsonb;values_ jsonb;idx integer;steps integer;v integer[];i integer;
begin
 if p_kind like 'duel:%' then return versus_private.adventure_duel_initial(p_kind,p_language,p_now);end if;
 select data into strict d from versus_private.adventure_puzzle_definitions where kind=p_kind and language=p_language;
 values_:=d->'initial';
 if p_kind='mirrors' then
  v:=array[1,3,1,3,1];steps:=9+floor(random()*5)::integer;
  for i in 1..steps loop idx:=floor(random()*5)::integer+1;v[idx]:=(v[idx]+1)%4;v[idx%5+1]:=(v[idx%5+1]+1)%4;end loop;
  if v=array[1,3,1,3,1] then v[1]:=(v[1]+1)%4;v[2]:=(v[2]+1)%4;end if;
  values_:=to_jsonb(v);
 elsif p_kind='rings' then values_:=(select jsonb_agg(0) from jsonb_array_elements(d->'rounds'->0->'opciones'));
 elsif p_kind='channels' then
  select jsonb_agg(case when value->>'tipo' in ('nucleo','bloqueado') then 0 else ((value->>'objetivo')::integer+case when value->>'tipo'='recto' then 1+2*floor(random()*2)::integer else 1+floor(random()*3)::integer end)%4 end order by ordinality) into values_ from jsonb_array_elements(d->'types') with ordinality;
 elsif p_kind in ('oasis','bells','memory:wolves','ice-path','maze') then
  return versus_private.adventure_puzzle_round(p_kind,p_language,jsonb_build_object('kind',p_kind,'round',0,'found','[]'::jsonb,'done',false,'feedback',true),p_now);
 end if;
 return jsonb_build_object('kind',p_kind,'round',0,'values',values_,'found','[]'::jsonb,'done',false,'feedback',true);
end $$;
revoke all on function versus_private.adventure_puzzle_start(text,text,timestamptz) from public,anon,authenticated,service_role;

create function versus_private.adventure_puzzle_step(p_kind text,p_language text,p_state jsonb,p_payload jsonb,p_now timestamptz)
returns jsonb language plpgsql security definer set search_path='' as $$
declare d jsonb;s jsonb:=p_state;op text:=p_payload->>'op';idx integer;n integer;v integer[];r integer:=(p_state->>'round')::integer;
 a integer;b integer;dx integer;dy integer;distance_ integer;i integer;x integer;y integer;line text:='';answer text;
 found_ jsonb:=p_state->'found';target jsonb;done_ boolean:=false;path_ integer[];color_ text;paths_ jsonb;pair_ integer[];cursor_ integer;
begin
 if p_kind like 'duel:%' then return versus_private.adventure_duel_input(p_state,p_payload,p_now);end if;
 select data into strict d from versus_private.adventure_puzzle_definitions where kind=p_kind and language=p_language;
 if coalesce((s->>'done')::boolean,false) or op is null then raise exception 'Acción fuera de fase.' using errcode='22023';end if;
 if p_kind='maze' then return versus_private.adventure_maze_input(s,d,p_payload,p_now);end if;
 s:=jsonb_set(s,'{feedback}','true');
 if op='rotate' and p_kind in ('thermal','mirrors','oaths','rings','channels') then
  if p_payload-array['op','index']<>'{}'::jsonb or jsonb_typeof(p_payload->'index') is distinct from 'number' or (p_payload->>'index')!~ '^[0-9]{1,2}$' then raise exception 'Índice inválido.' using errcode='22023';end if;
  idx:=(p_payload->>'index')::integer;select array_agg(value::integer order by ordinality) into v from jsonb_array_elements_text(s->'values') with ordinality;
  n:=cardinality(v);if idx<0 or idx>=n then raise exception 'Índice inválido.' using errcode='22023';end if;
  if p_kind='channels' and d->'types'->idx->>'tipo' in ('nucleo','bloqueado') then raise exception 'Canal fijo.' using errcode='22023';end if;
  if p_kind='rings' then i:=jsonb_array_length(d->'rounds'->r->'opciones'->idx);else i:=(d->>'modulo')::integer;end if;
  v[idx+1]:=(v[idx+1]+1)%i;
  if p_kind in ('thermal','mirrors') then v[(idx+1)%n+1]:=(v[(idx+1)%n+1]+1)%i;end if;
  s:=jsonb_set(s,'{values}',to_jsonb(v));
  done_:=p_kind in ('thermal','mirrors') and to_jsonb(v)=d->'target';
  if p_kind='channels' then done_:=versus_private.adventure_channels_done(to_jsonb(v),d);end if;
 elsif op='choose' and p_kind in ('oasis','bells','memory:wolves') then
  if p_payload-array['op','index']<>'{}'::jsonb or jsonb_typeof(p_payload->'index') is distinct from 'number' or (p_payload->>'index')!~ '^[0-3]$' then raise exception 'Opción inválida.' using errcode='22023';end if;
  idx:=(p_payload->>'index')::integer;
  if p_kind='bells' and idx>2 then raise exception 'Campana inválida.' using errcode='22023';end if;
  if p_kind in ('bells','memory:wolves') and p_now<(s->>'ready_at')::timestamptz then raise exception 'La observación no terminó.' using errcode='22023';end if;
  if p_kind='oasis' then done_:=s->'choices'->idx=s->'goal';
  elsif p_kind='bells' then done_:=idx=(s->>'relic')::integer;
  else
   cursor_:=(s->>'cursor')::integer;done_:=idx=(s->'values'->>cursor_)::integer;
   if done_ and cursor_+1<jsonb_array_length(s->'values') then return jsonb_set(s,'{cursor}',to_jsonb(cursor_+1));end if;
  end if;
  s:=jsonb_set(s,'{feedback}',to_jsonb(done_));
  if done_ then r:=r+1;s:=jsonb_set(s,'{round}',to_jsonb(r));end if;
  done_:=r=3;
  if not done_ then s:=versus_private.adventure_puzzle_round(p_kind,p_language,s,p_now);end if;
 elsif op='replay' and p_kind='memory:wolves' then
  if p_payload-'op'<>'{}'::jsonb then raise exception 'Parámetros inválidos.' using errcode='22023';end if;
  s:=versus_private.adventure_puzzle_round(p_kind,p_language,s,p_now);
 elsif op in ('path_start','path') and p_kind='ice-path' then
  color_:=p_payload->>'color';
  if color_ is null or color_ not in ('cian','violeta','dorado') then raise exception 'Color inválido.' using errcode='22023';end if;
  select array_agg(value::integer order by ordinality) into pair_ from jsonb_array_elements_text(d->'rounds'->r->color_) with ordinality;
  paths_:=s->'paths';
  if op='path_start' then
   if p_payload-array['op','color','start']<>'{}'::jsonb or jsonb_typeof(p_payload->'start') is distinct from 'number' or (p_payload->>'start')!~ '^[0-9]{1,2}$' then raise exception 'Inicio inválido.' using errcode='22023';end if;
   idx:=(p_payload->>'start')::integer;if not idx=any(pair_) then raise exception 'Comenzá en un cristal.' using errcode='22023';end if;
   return s||jsonb_build_object('paths',paths_-color_,'active',jsonb_build_object('color',color_,'start',idx));
  end if;
  if p_payload-array['op','color','path']<>'{}'::jsonb or jsonb_typeof(p_payload->'path') is distinct from 'array' then raise exception 'Camino inválido.' using errcode='22023';end if;
  if jsonb_array_length(p_payload->'path') not between 2 and 81 or exists(select 1 from jsonb_array_elements(p_payload->'path') where jsonb_typeof(value)<>'number' or value::text!~ '^[0-9]{1,2}$') then raise exception 'Camino inválido.' using errcode='22023';end if;
  select array_agg(value::integer order by ordinality) into path_ from jsonb_array_elements_text(p_payload->'path') with ordinality;
  if s->'active'->>'color' is distinct from color_ or (s->'active'->>'start')::integer is distinct from path_[1] or not path_[1]=any(pair_) or not path_[cardinality(path_)]=any(pair_) or path_[1]=path_[cardinality(path_)] then raise exception 'Extremos inválidos.' using errcode='22023';end if;
  n:=case when r=2 then 9 else 8 end;
  if (select count(distinct value) from unnest(path_) value)<>cardinality(path_) then raise exception 'El camino no puede cruzarse.' using errcode='22023';end if;
  for i in 1..cardinality(path_) loop
   idx:=path_[i];
   if idx<0 or idx>=n*n or (r=2 and ((idx/9-4)^2+(idx%9-4)^2)>21.16) then raise exception 'Casilla fuera del tablero.' using errcode='22023';end if;
   if i>1 and abs(idx/n-path_[i-1]/n)+abs(idx%n-path_[i-1]%n)<>1 then raise exception 'Camino no adyacente.' using errcode='22023';end if;
   if exists(select 1 from jsonb_each(paths_) e where e.key<>color_ and e.value @> to_jsonb(array[idx])) or
    exists(select 1 from jsonb_each(d->'rounds'->r) e where e.key<>color_ and e.value @> to_jsonb(array[idx])) then raise exception 'Las corrientes no se cruzan.' using errcode='22023';end if;
  end loop;
  paths_:=paths_||jsonb_build_object(color_,path_);s:=s||jsonb_build_object('paths',paths_,'active',null);
  if (select count(*) from jsonb_object_keys(paths_))=3 then r:=r+1;s:=jsonb_set(s,'{round}',to_jsonb(r));done_:=r=3;if not done_ then s:=versus_private.adventure_puzzle_round(p_kind,p_language,s,p_now);end if;end if;
 elsif op='check' and p_kind in ('oaths','rings') then
  if p_payload-'op'<>'{}'::jsonb then raise exception 'Parámetros inválidos.' using errcode='22023';end if;
  if p_kind='oaths' then done_:=s->'values'=d->'target';s:=jsonb_set(s,'{feedback}',to_jsonb(done_));
  else
   select string_agg(d->'rounds'->r->'opciones'->(ordinality::integer-1)->>value::integer,'' order by ordinality) into answer from jsonb_array_elements_text(s->'values') with ordinality;
   if answer=d->'rounds'->r->>'palabra' then
    r:=r+1;s:=jsonb_set(s,'{round}',to_jsonb(r));done_:=r=jsonb_array_length(d->'rounds');
    if not done_ then s:=jsonb_set(s,'{values}',(select jsonb_agg(0) from jsonb_array_elements(d->'rounds'->r->'opciones')));end if;
   else s:=jsonb_set(s,'{feedback}','false');end if;
  end if;
 elsif op='find' and p_kind='runes' then
  if p_payload-array['op','index']<>'{}'::jsonb or jsonb_typeof(p_payload->'index') is distinct from 'number' or (p_payload->>'index')!~ '^[0-4]$' then raise exception 'Runa inválida.' using errcode='22023';end if;
  idx:=(p_payload->>'index')::integer;
  if not found_ @> to_jsonb(array[idx]) then found_:=found_||to_jsonb(idx);else s:=jsonb_set(s,'{feedback}','false');end if;
  done_:=jsonb_array_length(found_)=5;
 elsif op='mark' and p_kind='differences' then
  if p_payload-array['op','x','y']<>'{}'::jsonb or jsonb_typeof(p_payload->'x') is distinct from 'number' or jsonb_typeof(p_payload->'y') is distinct from 'number' then raise exception 'Coordenadas inválidas.' using errcode='22023';end if;
  if (p_payload->>'x')::numeric not between 0 and 1536 or (p_payload->>'y')::numeric not between 0 and 1024 then raise exception 'Coordenadas inválidas.' using errcode='22023';end if;
  idx:=-1;
  for target in select value from jsonb_array_elements(d->'targets') loop
   idx:=idx+1;
   if not found_ @> to_jsonb(array[idx]) and (p_payload->>'x')::numeric between (target->>'x')::numeric-12 and (target->>'x')::numeric+(target->>'w')::numeric+12
    and (p_payload->>'y')::numeric between (target->>'y')::numeric-12 and (target->>'y')::numeric+(target->>'h')::numeric+12 then found_:=found_||to_jsonb(idx);exit;end if;
  end loop;
  done_:=jsonb_array_length(found_)=7;
 elsif op='search' and p_kind='search' then
  if p_payload-array['op','from','to']<>'{}'::jsonb or jsonb_typeof(p_payload->'from') is distinct from 'number' or jsonb_typeof(p_payload->'to') is distinct from 'number'
   or (p_payload->>'from')!~ '^[0-9]{1,2}$' or (p_payload->>'to')!~ '^[0-9]{1,2}$' then raise exception 'Trayecto inválido.' using errcode='22023';end if;
  a:=(p_payload->>'from')::integer;b:=(p_payload->>'to')::integer;dx:=b%10-a%10;dy:=b/10-a/10;
  if dx<>0 and dy<>0 and abs(dx)<>abs(dy) then return jsonb_set(s,'{feedback}','false');end if;
  distance_:=greatest(abs(dx),abs(dy));
  for i in 0..distance_ loop line:=line||substr(d->>'letters',(a/10+i*sign(dy)::integer)*10+a%10+i*sign(dx)::integer+1,1);end loop;
  for target in select value from jsonb_array_elements(d->'words') loop
   answer:=target->>'palabra';
   if (line=answer or reverse(line)=answer) and not found_ @> jsonb_build_array(answer) then found_:=found_||to_jsonb(answer);exit;end if;
  end loop;
  s:=jsonb_set(s,'{feedback}',to_jsonb(found_<>s->'found'));done_:=jsonb_array_length(found_)=3;
 else raise exception 'Acción inválida para este puzzle.' using errcode='22023';
 end if;
 return s||jsonb_build_object('found',found_,'done',done_);
end $$;
revoke all on function versus_private.adventure_puzzle_step(text,text,jsonb,jsonb,timestamptz) from public,anon,authenticated,service_role;
