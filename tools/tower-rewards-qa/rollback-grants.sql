-- PREPARED ONLY. Run ONLY after installation and explicit operational approval.
-- Additive rollback: retain every grant, receipt, certificate and equipment row.
begin;
set local lock_timeout='5s';
update versus_private.tower_cosmetic_rollout set grants_enabled=false where singleton;
commit;
-- Existing tower_rollout/global_enabled/payments_enabled are intentionally unchanged.
-- Do not drop the new schema, frame constraints or guards after awarding items.
