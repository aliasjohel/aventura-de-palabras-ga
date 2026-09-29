-- Exercise actual server functions with a temporary user; roll back every change.
begin;
do $$
declare test_user uuid:=gen_random_uuid(); item text; result jsonb;
begin
 insert into auth.users(id) values(test_user);
 perform set_config('request.jwt.claim.sub',test_user::text,true);
 insert into versus_private.game_wallets(user_id,coins,legacy_done) values(test_user,3000,true);
 foreach item in array array['aren-bosque','zafir-celestial','kairos-real','guardiana-otono','alba-lunar','shadow-carmesi','lobo-lunar','nimbus-aviador','nivor-boreal','azrak-eclipse','kalamo-astral'] loop
   result:=public.purchase_game_costume(item);
 end loop;
 if (result->>'coins')::integer<>600 or jsonb_array_length(result->'owned')<>11 then raise exception 'Purchase validation failed'; end if;
 result:=public.purchase_game_costume('kalamo-astral');
 if (result->>'coins')::integer<>600 then raise exception 'Duplicate charge'; end if;
 result:=public.sync_game_wallet(null,'[]','{"azrak":"azrak-eclipse","kalamo":"kalamo-astral","dragon":"nimbus-aviador"}');
 if result->'equipped'->>'azrak'<>'azrak-eclipse' or result->'equipped'->>'kalamo'<>'kalamo-astral' then raise exception 'Equipment validation failed'; end if;
 if has_function_privilege('anon','public.purchase_game_costume(text)','EXECUTE') then raise exception 'Unexpected anonymous permission'; end if;
 if not has_function_privilege('authenticated','public.purchase_game_costume(text)','EXECUTE') then raise exception 'Missing player permission'; end if;
end $$;
rollback;
select 'PASS: eleven purchases, correct prices, repeat purchase, equipment and RPC permissions; test user and wallet rolled back' as verification;
