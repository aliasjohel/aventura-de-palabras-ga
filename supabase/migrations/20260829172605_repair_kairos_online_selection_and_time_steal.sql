-- Registra la reparación aplicada al proyecto remoto, donde la migración de
-- Kairós había quedado omitida aunque la migración posterior de temporizadores
-- sí figuraba en el historial. En instalaciones nuevas, las migraciones
-- 20260823010000 y 20260825214904 ya construyen el estado correcto; esta
-- comprobación evita volver a renombrar las funciones envueltas.

do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'versus_match_players'
      and column_name = 'time_penalty_seconds'
  ) then
    raise exception 'Falta la columna de penalización temporal de Kairós.';
  end if;

  if position(
    '''kairos''' in pg_get_functiondef(
      'public.set_versus_character(uuid,text,boolean)'::regprocedure
    )
  ) = 0 then
    raise exception 'Kairós no está habilitado en la selección Versus online.';
  end if;

  if to_regprocedure('public.activate_versus_ability_without_kairos(uuid)') is null then
    raise exception 'Falta el motor base envuelto por la habilidad de Kairós.';
  end if;
end;
$$;
