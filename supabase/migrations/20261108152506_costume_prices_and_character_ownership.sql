-- Cosmetic prices and verified character prerequisite. Existing collections and balances are unchanged.
CREATE OR REPLACE FUNCTION versus_private.purchase_game_costume(p_skin text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare u uuid:=auth.uid();w versus_private.game_wallets;cost integer;character_ text;
begin
 if u is null then raise exception 'Iniciá sesión para comprar.';end if;
 select p.cost,p.character into cost,character_ from (values
  ('aren-bosque',1000,'explorador'),
  ('zafir-celestial',1500,'mago'),
  ('kairos-real',1500,'kairos'),
  ('guardiana-otono',1000,'guardiana'),
  ('alba-lunar',1000,'guardian_alba'),
  ('shadow-carmesi',1500,'t_shadow'),
  ('lobo-lunar',1000,'hombre_lobo'),
  ('nimbus-aviador',1000,'dragon'),
  ('nivor-boreal',1500,'dragon_hielo'),
  ('azrak-eclipse',1500,'azrak'),
  ('kalamo-astral',1500,'kalamo')
 ) as p(skin,cost,character) where p.skin=p_skin;
 if cost is null then raise exception 'Este traje no está disponible.';end if;
 select * into w from versus_private.game_wallets where user_id=u for update;
 if not found or not w.legacy_done then raise exception 'Sincronizá tus monedas antes de comprar.';end if;
 if not (p_skin=any(w.owned)) then
  if not versus_private.tower_character_allowed(u,character_) then
   raise exception 'Primero conseguí el personaje para comprar este traje.' using errcode='42501';
  end if;
  if w.coins<cost then raise exception 'Te faltan % monedas.',cost-w.coins;end if;
  update versus_private.game_wallets set coins=coins-cost,owned=array_append(owned,p_skin),revision=revision+1 where user_id=u;
 end if;
 return versus_private.sync_game_wallet(null,'[]',null,null);
end $function$
;

CREATE OR REPLACE FUNCTION versus_private.game_characters(p_action text, p_character text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare u uuid:=auth.uid(); inv versus_private.character_inventory; cost integer; wallet jsonb;
begin
 if u is null then raise exception 'Iniciá sesión para comprar personajes.'; end if;
 if p_action is null or p_action not in ('sync','purchase') then raise exception 'Acción inválida.'; end if;
 cost:=case p_character when 'hombre_lobo' then 2000 when 'kairos' then 2500 when 'kalamo' then 3000 when 'guardian_alba' then 3000 when 't_shadow' then 3500 else null end;
 if p_action='purchase' and cost is null then raise exception 'Personaje no disponible.'; end if;
 wallet:=versus_private.sync_game_wallet(null,'[]'::jsonb,null,null);
 insert into versus_private.character_inventory(user_id) values(u) on conflict do nothing;
 select * into inv from versus_private.character_inventory where user_id=u for update;
 if p_action='purchase' and not(p_character=any(inv.owned)) then
  update versus_private.game_wallets set coins=coins-cost,revision=revision+1 where user_id=u and coins>=cost;
  if not found then raise exception 'No tenés suficientes monedas para este personaje.'; end if;
  inv.owned:=array_append(inv.owned,p_character);inv.revision:=inv.revision+1;
  update versus_private.character_inventory set owned=inv.owned,revision=inv.revision where user_id=u;
  wallet:=versus_private.sync_game_wallet(null,'[]'::jsonb,null,null);
 end if;
 return wallet || jsonb_build_object('characters',jsonb_build_object('userId',u,'owned',inv.owned,'unlocked',(select coalesce(jsonb_agg(c.character),'[]'::jsonb) from unnest(array['explorador','guardiana','mago','dragon','dragon_hielo','azrak','hombre_lobo','kairos','kalamo','guardian_alba','t_shadow']) as c(character) where versus_private.tower_character_allowed(u,c.character)),'revision',inv.revision));
end $function$
;
