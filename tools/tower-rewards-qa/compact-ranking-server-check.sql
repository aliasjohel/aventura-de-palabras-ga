do $qa$
declare rows_ jsonb;own_ jsonb;expected_ bigint;
begin
 perform set_config('request.jwt.claim.sub','__CALLER__',true);
 perform set_config('request.jwt.claims',jsonb_build_object('sub','__CALLER__','role','authenticated')::text,true);
 rows_:=public.get_versus_ranking();
 if jsonb_array_length(rows_)>51 or (select count(*) from jsonb_array_elements(rows_) e where (e->>'listed')::boolean)>50 then raise exception 'Unbounded ranking response';end if;
 if exists(select 1 from jsonb_array_elements(rows_) e where not(e?'listed')) then raise exception 'Missing leader-list flag';end if;
 with scores as (select user_id,sum(points) points,count(*) filter(where win) wins from versus_private.ranked_results group by user_id),positions as(select user_id,rank() over(order by points desc,wins desc) position from scores) select position into expected_ from positions where user_id=auth.uid();
 select e into own_ from jsonb_array_elements(rows_) e where (e->>'me')::boolean;
 if expected_ is not null and (own_ is null or (own_->>'position')::bigint<>expected_) then raise exception 'Caller position missing or wrong';end if;
 if (select count(*) from jsonb_array_elements(rows_) e where (e->>'me')::boolean)>1 then raise exception 'Duplicate own row';end if;
end $qa$;
select jsonb_build_object('passed',true,'maximumRows',51,'maximumLeaders',50,'callerPositionChecked',true) result;
