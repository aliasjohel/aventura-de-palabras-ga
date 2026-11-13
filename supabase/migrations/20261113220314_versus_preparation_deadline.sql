begin;
alter table public.versus_rooms add column preparation_deadline_at timestamptz;
create table versus_private.versus_preparation_drafts(
 room_id uuid not null references public.versus_rooms(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 theme_key text not null, words text[] not null default '{}',primary key(room_id,user_id)
);
alter table versus_private.versus_preparation_drafts enable row level security;
revoke all on versus_private.versus_preparation_drafts from public,anon,authenticated;
create function versus_private.start_preparation_deadline() returns trigger
language plpgsql security definer set search_path='' as $$
begin
 if new.status='preparing' and (TG_OP='INSERT' or old.status is distinct from 'preparing') then
  if TG_OP='UPDATE' and old.status='complete' and old.preparation_deadline_at is not null then
   new.preparation_deadline_at:=old.preparation_deadline_at;
  else
   new.preparation_deadline_at:=now()+interval '90 seconds';
   delete from versus_private.versus_preparation_drafts where room_id=new.id;
  end if;
 end if;
 return new;
end $$;
revoke all on function versus_private.start_preparation_deadline() from public,anon,authenticated;
create trigger versus_preparation_deadline before insert or update of status on public.versus_rooms
for each row execute function versus_private.start_preparation_deadline();
-- Existing preparations get the full period on rollout; completed matches stay unchanged.
update public.versus_rooms set preparation_deadline_at=now()+interval '90 seconds' where status='preparing';

-- The private submission function below is copied from the current validated
-- submission endpoint. Only server-selected actors can be used by the timeout.

CREATE OR REPLACE FUNCTION versus_private.submit_preparation_challenge(p_actor uuid, p_room_id uuid, p_theme_key text, p_words text[])
 RETURNS versus_rooms
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := p_actor;
  v_target_id uuid;
  v_room public.versus_rooms;
  v_words text[];
  v_player_count integer;
  v_ready_count integer;
begin
  perform private.assert_versus_available(
    array(select user_id from public.versus_players where room_id=p_room_id) || array[p_actor],p_room_id);
  if v_user_id is null then
    raise exception 'Debes iniciar una sesión antes de preparar el desafío.';
  end if;

  select * into v_room
  from public.versus_rooms
  where id = p_room_id
  for update;

  if not found or not exists(select 1 from public.versus_players where room_id=p_room_id and user_id=p_actor) then
    raise exception 'No perteneces a esta sala.';
  end if;
  if v_room.status not in ('preparing') then
    raise exception 'La sala todavía no está lista para recibir palabras.';
  end if;

  if p_theme_key is null
 or (v_room.word_bank_version='legacy-v1' and p_theme_key not in ('paises','frutas','animales','comidas','profesiones','deportes','transportes','objetos','naturaleza','nombres'))
 or (v_room.word_bank_version='reviewed-v2' and not exists(select 1 from versus_private.reviewed_word_dictionary where word_language=v_room.word_language and theme_key=p_theme_key)) then
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
revoke all on function versus_private.submit_preparation_challenge(uuid,uuid,text,text[]) from public,anon,authenticated;

create function versus_private.preparation_dictionary(p_room uuid,p_theme text)
returns table(word text,word_key text) language sql stable security definer set search_path='' as $$
 select d.word,d.word_key from public.versus_rooms r join versus_private.reviewed_word_dictionary d
 on d.word_language=r.word_language and d.theme_key=p_theme where r.id=p_room and r.word_bank_version='reviewed-v2'
 union all
 select d.word,d.word_key from public.versus_rooms r join private.versus_word_dictionary d
 on d.theme_key=p_theme where r.id=p_room and r.word_bank_version='legacy-v1'
$$;
revoke all on function versus_private.preparation_dictionary(uuid,text) from public,anon,authenticated;

create function versus_private.expire_preparation(p_room uuid) returns void
language plpgsql security definer set search_path='' as $$
declare r public.versus_rooms;p record;d versus_private.versus_preparation_drafts;theme_ text;words_ text[];extra_ text[];
begin
 select * into r from public.versus_rooms where id=p_room for update;
 if r.status<>'preparing' or r.preparation_deadline_at is null or now()<r.preparation_deadline_at then return;end if;
 if (select count(*) from public.versus_players where room_id=p_room)<>2 then return;end if;
 for p in select * from public.versus_players where room_id=p_room and not preparation_ready order by slot loop
  select * into d from versus_private.versus_preparation_drafts where room_id=p_room and user_id=p.user_id;
  theme_:=coalesce(d.theme_key,p.theme_key,'animales');
  if (select count(distinct word_key) from versus_private.preparation_dictionary(p_room,theme_))<5 then
   select theme_key into theme_ from (
    select q.theme_key from versus_private.reviewed_word_dictionary q where r.word_bank_version='reviewed-v2' and q.word_language=r.word_language group by q.theme_key having count(distinct q.word_key)>=5
    union all select q.theme_key from private.versus_word_dictionary q where r.word_bank_version='legacy-v1' group by q.theme_key having count(distinct q.word_key)>=5
   ) q order by theme_key limit 1;
  end if;
  select coalesce(array_agg(word order by pos),'{}') into words_ from (
   select distinct on (dictionary.word_key) dictionary.word,min(supplied.pos) over(partition by dictionary.word_key) pos
   from unnest(coalesce(d.words,'{}')) with ordinality supplied(word,pos)
   join versus_private.preparation_dictionary(p_room,theme_) dictionary on dictionary.word_key=public.versus_letter_key(upper(normalize(btrim(supplied.word),NFC)))
   order by dictionary.word_key,pos
  ) q;
  select array_agg(word) into extra_ from (
   select distinct on(word_key) word,word_key from versus_private.preparation_dictionary(p_room,theme_)
   where not(word_key=any(array(select public.versus_letter_key(w) from unnest(words_) w)))
   order by word_key,word
  ) q;
  -- Randomize only the missing words; retain the latest valid draft entries.
  select array_agg(w) into extra_ from (select w from unnest(extra_) w order by random() limit greatest(0,5-cardinality(words_))) q;
  words_:=words_||coalesce(extra_,'{}');
  if cardinality(words_)<>5 then raise exception 'No hay cinco palabras válidas para completar el desafío.';end if;
  perform versus_private.submit_preparation_challenge(p.user_id,p_room,theme_,words_);
 end loop;
end $$;
revoke all on function versus_private.expire_preparation(uuid) from public,anon,authenticated;

create function versus_private.versus_preparation_tick(p_room_id uuid,p_theme_key text default null,p_words text[] default null)
returns jsonb language plpgsql security definer set search_path='' as $$
declare r public.versus_rooms;u uuid:=auth.uid();
begin
 if u is null or not public.is_versus_room_member(p_room_id) then raise exception 'No perteneces a esta sala.' using errcode='42501';end if;
 select * into strict r from public.versus_rooms where id=p_room_id for update;
 if r.status='preparing' and now()<r.preparation_deadline_at and p_theme_key is not null and p_words is not null
 and not exists(select 1 from public.versus_players where room_id=p_room_id and user_id=u and preparation_ready) then
  if length(p_theme_key)>40 or cardinality(p_words)>5 or coalesce(array_ndims(p_words),1)<>1
   or exists(select 1 from unnest(p_words) w where length(w)>12) then raise exception 'Borrador inválido.' using errcode='22023';end if;
  insert into versus_private.versus_preparation_drafts(room_id,user_id,theme_key,words) values(p_room_id,u,p_theme_key,p_words)
  on conflict(room_id,user_id) do update set theme_key=excluded.theme_key,words=excluded.words;
 end if;
 perform versus_private.expire_preparation(p_room_id);
 select * into strict r from public.versus_rooms where id=p_room_id;
 return jsonb_build_object('deadlineAt',r.preparation_deadline_at,'serverNow',clock_timestamp(),'status',r.status);
end $$;
revoke all on function versus_private.versus_preparation_tick(uuid,text,text[]) from public,anon;
grant execute on function versus_private.versus_preparation_tick(uuid,text,text[]) to authenticated;
create function public.versus_preparation_tick(p_room_id uuid,p_theme_key text default null,p_words text[] default null)
returns jsonb language sql security invoker set search_path='' as $$
 select versus_private.versus_preparation_tick(p_room_id,p_theme_key,p_words)
$$;
revoke all on function public.versus_preparation_tick(uuid,text,text[]) from public,anon;
grant execute on function public.versus_preparation_tick(uuid,text,text[]) to authenticated;

create or replace function public.set_versus_challenge(p_room_id uuid,p_theme_key text,p_words text[])
returns public.versus_rooms language plpgsql security definer set search_path='' as $$
declare r public.versus_rooms;
begin
 if auth.uid() is null or not public.is_versus_room_member(p_room_id) then raise exception 'No perteneces a esta sala.' using errcode='42501';end if;
 select * into strict r from public.versus_rooms where id=p_room_id for update;
 perform versus_private.expire_preparation(p_room_id);
 select * into strict r from public.versus_rooms where id=p_room_id;
 if r.status='playing' and now()>=r.preparation_deadline_at then return r;end if;
 return versus_private.submit_preparation_challenge(auth.uid(),p_room_id,p_theme_key,p_words);
end $$;
notify pgrst,'reload schema';
commit;
