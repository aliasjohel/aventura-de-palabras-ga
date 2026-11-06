-- Extend existing social RPCs only. No stored data or permissions changed.
CREATE OR REPLACE FUNCTION public.get_versus_social_state()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_user_id uuid := auth.uid();
  v_result jsonb;
begin
  if not public.is_permanent_versus_user() then
    raise exception 'Guardá tu cuenta para usar Amigos.';
  end if;

  select jsonb_build_object(
    'profile', (
      select to_jsonb(p) - 'created_at' - 'updated_at'
      from public.versus_profiles p
      where p.user_id = v_user_id
    ),
    'friends', coalesce((
      select jsonb_agg(jsonb_build_object(
        'friendship_id', f.id,
        'user_id', p.user_id,
        'alias', p.alias,
        'friend_code', p.friend_code,
        'avatar', appearance.avatar_key, 'frame', appearance.frame_key,
        'points', coalesce(ranking.points,0)
      ) order by lower(p.alias))
      from public.versus_friendships f
      join public.versus_profiles p
        on p.user_id = case
          when f.requester_id = v_user_id then f.addressee_id
          else f.requester_id
        end
      left join versus_private.player_appearance appearance on appearance.user_id=p.user_id
      left join lateral (
        select sum(points) points from versus_private.ranked_results where user_id=p.user_id
      ) ranking on true
      where f.status = 'accepted'
        and v_user_id in (f.requester_id, f.addressee_id)
    ), '[]'::jsonb),
    'incoming_requests', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', f.id,
        'user_id', p.user_id,
        'alias', p.alias,
        'friend_code', p.friend_code,
        'created_at', f.created_at
      ) order by f.created_at)
      from public.versus_friendships f
      join public.versus_profiles p on p.user_id = f.requester_id
      where f.addressee_id = v_user_id and f.status = 'pending'
    ), '[]'::jsonb),
    'outgoing_requests', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', f.id,
        'user_id', p.user_id,
        'alias', p.alias,
        'friend_code', p.friend_code,
        'created_at', f.created_at
      ) order by f.created_at)
      from public.versus_friendships f
      join public.versus_profiles p on p.user_id = f.addressee_id
      where f.requester_id = v_user_id and f.status = 'pending'
    ), '[]'::jsonb),
    'incoming_invites', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', i.id,
        'challenger_id', i.challenger_id,
        'alias', p.alias,
        'created_at', i.created_at,
        'expires_at', i.expires_at, 'word_language', i.word_language
      ) order by i.created_at desc)
      from public.versus_invites i
      join public.versus_profiles p on p.user_id = i.challenger_id
      where i.challenged_id = v_user_id
        and i.status = 'pending'
        and i.expires_at > now()
    ), '[]'::jsonb),
    'outgoing_invites', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', i.id,
        'challenged_id', i.challenged_id,
        'alias', p.alias,
        'created_at', i.created_at,
        'expires_at', i.expires_at, 'word_language', i.word_language
      ) order by i.created_at desc)
      from public.versus_invites i
      join public.versus_profiles p on p.user_id = i.challenged_id
      where i.challenger_id = v_user_id
        and i.status = 'pending'
        and i.expires_at > now()
    ), '[]'::jsonb)
  ) into v_result;

  return v_result || jsonb_build_object('accepted_invites',coalesce((
    select jsonb_agg(jsonb_build_object('id',i.id,'room_id',r.id,
      'challenger_id',i.challenger_id,'challenged_id',i.challenged_id,
      'word_language',r.word_language,'room_status',r.status,'responded_at',i.responded_at)
      order by i.responded_at desc,i.id)
    from public.versus_invites i join public.versus_rooms r on r.id=i.room_id
    where i.status='accepted' and v_user_id in(i.challenger_id,i.challenged_id)
      and r.status in ('complete','preparing','playing')
      and exists(select 1 from public.versus_players p where p.room_id=r.id and p.user_id=i.challenger_id)
      and exists(select 1 from public.versus_players p where p.room_id=r.id and p.user_id=i.challenged_id)
  ),'[]'::jsonb));
end;
$function$
;

-- Requesters can cancel only their pending request; they cannot self-accept.
-- The row lock/status check preserves a friendship accepted concurrently.
CREATE OR REPLACE FUNCTION public.respond_versus_friend_request(p_friendship_id uuid, p_accept boolean)
 RETURNS versus_friendships
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_friendship public.versus_friendships;
begin
  if not public.is_permanent_versus_user() then
    raise exception 'Guardá tu cuenta para responder solicitudes.';
  end if;

  select * into v_friendship
  from public.versus_friendships
  where id = p_friendship_id
  for update;

  if not found or not (
    v_friendship.addressee_id = auth.uid()
    or (v_friendship.requester_id = auth.uid() and p_accept is false)
  ) then
    raise exception 'No podés responder esa solicitud.';
  end if;
  if v_friendship.status <> 'pending' then
    raise exception 'La solicitud ya fue respondida.';
  end if;

  update public.versus_friendships
  set status = case when coalesce(p_accept, false) then 'accepted' else 'declined' end
  where id = v_friendship.id
  returning * into v_friendship;
  return v_friendship;
end;
$function$
;
notify pgrst,'reload schema';
