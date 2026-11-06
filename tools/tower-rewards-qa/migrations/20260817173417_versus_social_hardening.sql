create index versus_invites_room_idx
  on public.versus_invites(room_id)
  where room_id is not null;

drop policy "Players can read connected profiles" on public.versus_profiles;
create policy "Permanent players can read connected profiles"
on public.versus_profiles for select to authenticated
using (
  (select public.is_permanent_versus_user())
  and (
    versus_profiles.user_id = (select auth.uid())
    or exists (
      select 1 from public.versus_friendships f
      where f.status in ('pending', 'accepted')
        and (select auth.uid()) in (f.requester_id, f.addressee_id)
        and versus_profiles.user_id in (f.requester_id, f.addressee_id)
    )
  )
);

drop policy "Players can read their friendships" on public.versus_friendships;
create policy "Permanent players can read their friendships"
on public.versus_friendships for select to authenticated
using (
  (select public.is_permanent_versus_user())
  and (select auth.uid()) in (requester_id, addressee_id)
);

drop policy "Players can read their invites" on public.versus_invites;
create policy "Permanent players can read their invites"
on public.versus_invites for select to authenticated
using (
  (select public.is_permanent_versus_user())
  and (select auth.uid()) in (challenger_id, challenged_id)
);
