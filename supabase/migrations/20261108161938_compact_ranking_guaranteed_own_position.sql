-- Bound the leaderboard to fifty entries and always include the caller separately.
CREATE OR REPLACE FUNCTION versus_private.ranking()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare result jsonb;
begin
 if auth.uid() is null then raise exception 'Iniciá sesión para ver el ranking.'; end if;
 with scores as (
 select r.user_id,coalesce(max(p.alias),max(r.alias)) as alias,sum(r.points) as points,count(*) as played,count(*) filter(where r.win) as wins,count(*) filter(where r.draw) as draws
 from versus_private.ranked_results r left join public.versus_profiles p on p.user_id=r.user_id group by r.user_id
 ), positions as (select *,rank() over(order by points desc,wins desc) as position from scores),
 leaders as (select * from positions order by position,alias,user_id limit 50),
 selected as (
  select *,true as listed from leaders
  union all
  select *,false as listed from positions where user_id=auth.uid() and not exists(select 1 from leaders where user_id=auth.uid())
 ),
 visible as (select user_id,position,case when public.versus_alias_inappropriate(alias) then 'Aventurero' else alias end as alias,points,played,wins,draws,user_id=auth.uid() as me,public.versus_rank_info(points) as rank,listed from selected order by position,alias,user_id)
 select coalesce(jsonb_agg(to_jsonb(visible)),'[]'::jsonb) into result from visible;
 return result;
end $function$
;
