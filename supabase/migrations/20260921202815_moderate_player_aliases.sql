-- Apply the same alias policy to profiles, lobbies and historical ranking names.
create or replace function public.versus_alias_inappropriate(p_alias text)
returns boolean language plpgsql immutable parallel safe security invoker set search_path = ''
as $fn$
declare base text; normal text; compact text; part text; candidate text;
begin
  normal := lower(normalize(coalesce(p_alias, ''), NFKD));
  normal := regexp_replace(normal, U&'[\0300-\036f\200b-\200f\202a-\202e\2060-\206f\feff]', '', 'g');
  base := normal;
  foreach candidate in array array[base, regexp_replace(base, '[0-9]+$', '', 'g')] loop
  normal := candidate;
  normal := translate(normal, '034157@$!', 'oeaistasi');
  compact := regexp_replace(regexp_replace(normal, '[^a-z]', '', 'g'), '(.)\1+', '\1', 'g');
  if compact ~ '(boludo|boluda|pelotudo|pelotuda|mierda|carajo|hijodeputa|hijadeputa|hdp|putamadre|conchadetumadre|conchatumadre|pendejo|pendeja|cabron|cabrona|maricon|gilipolas|culero|culera|verga|fuck|shit|bitch|ashole)' or compact ~ '^(el|la|soy|un|una)?(puto|puta|culo|pija|pito|cono|foro|fora|marica)(s|123|pro|gamer|xd)?$' then return true; end if;
  foreach part in array regexp_split_to_array(normal, '[^a-z]+') loop
    if regexp_replace(part, '(.)\1+', '\1', 'g') ~ '^(el|la|soy|un|una)?(puto|puta|culo|pija|pito|cono|foro|fora|marica)(s|123|pro|gamer|xd)?$' then return true; end if;
  end loop;
  end loop;
  return false;
end;
$fn$;

create or replace function public.moderate_versus_alias()
returns trigger language plpgsql security invoker set search_path = ''
as $fn$
begin
  if public.versus_alias_inappropriate(new.alias) then
    if TG_TABLE_SCHEMA = 'versus_private' and TG_TABLE_NAME <> 'search_queue' then
      new.alias := 'Aventurero'; -- Never discard a match result because of an old alias.
    else
      raise exception 'Elegí otro nombre: no se permiten malas palabras ni insultos.' using errcode = '23514';
    end if;
  end if;
  return new;
end;
$fn$;
revoke all on function public.moderate_versus_alias() from public, anon, authenticated;

-- Only the display alias changes; user IDs, scores, games and friendships remain intact.
update public.versus_profiles set alias = 'Aventurero' where public.versus_alias_inappropriate(alias);
update public.versus_players set alias = 'Aventurero' where public.versus_alias_inappropriate(alias);
update versus_private.ranked_results set alias = 'Aventurero' where public.versus_alias_inappropriate(alias);

create trigger moderate_profile_alias before insert or update of alias on public.versus_profiles
for each row execute function public.moderate_versus_alias();
create trigger moderate_player_alias before insert or update of alias on public.versus_players
for each row execute function public.moderate_versus_alias();
create trigger moderate_ranked_alias before insert or update of alias on versus_private.ranked_results
for each row execute function public.moderate_versus_alias();
update versus_private.player_history set alias = 'Aventurero' where public.versus_alias_inappropriate(alias);
update versus_private.search_queue set alias = 'Aventurero' where public.versus_alias_inappropriate(alias);
create trigger moderate_history_alias before insert or update of alias on versus_private.player_history
for each row execute function public.moderate_versus_alias();
create trigger moderate_queue_alias before insert or update of alias on versus_private.search_queue
for each row execute function public.moderate_versus_alias();
