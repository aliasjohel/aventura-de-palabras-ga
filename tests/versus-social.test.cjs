const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "js", "app.js"), "utf8");
const adapter = fs.readFileSync(path.join(root, "js", "versus-room-supabase.js"), "utf8");
const client = fs.readFileSync(path.join(root, "js", "supabase-client.js"), "utf8");
const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
const migration = fs.readFileSync(
  path.join(root, "supabase", "migrations", "20260817172734_versus_social_accounts_and_invites.sql"),
  "utf8",
);
const hardening = fs.readFileSync(
  path.join(root, "supabase", "migrations", "20260817173417_versus_social_hardening.sql"),
  "utf8",
);

for (const id of [
  "registroCuentaVersus",
  "contenidoAmigosVersus",
  "codigoAmigoVersus",
  "formAgregarAmigoVersus",
  "solicitudesAmigosVersus",
  "invitacionesVersus",
  "listaAmigosVersus",
]) assert.match(html, new RegExp(`id="${id}"`));

assert.match(client, /detectSessionInUrl: true/);
assert.match(adapter, /auth\.updateUser\(/);
assert.match(adapter, /auth\.refreshSession\(sesion\)/);
assert.match(adapter, /claims\.is_anonymous === false/);
assert.match(adapter, /programarSincronizacionAuth\(\)/);
assert.doesNotMatch(adapter, /queueMicrotask\(/);
assert.match(adapter, /auth\.linkIdentity\(/);
assert.match(adapter, /send_versus_friend_request/);
assert.match(adapter, /respond_versus_invite/);
assert.match(adapter, /suscribirInvitacionesAceptadas/);
assert.match(adapter, /cambio\?\.eventType === "UPDATE"/);
assert.doesNotMatch(adapter, /\.eq\("status", "accepted"\)/);
assert.match(app, /function actualizarPanelAmigosVersus\(/);
assert.match(app, /abrirSeleccionPersonajeVersus\(\)/);

for (const table of ["versus_profiles", "versus_friendships", "versus_invites"]) {
  assert.match(migration, new RegExp(`alter table public\\.${table} enable row level security`));
  assert.match(migration, new RegExp(`revoke all on public\\.${table} from public, anon, authenticated`));
}
for (const rpc of [
  "upsert_versus_profile",
  "send_versus_friend_request",
  "respond_versus_friend_request",
  "send_versus_invite",
  "respond_versus_invite",
]) {
  assert.match(migration, new RegExp(`revoke execute on function public\\.${rpc}`));
  assert.match(migration, new RegExp(`grant execute on function public\\.${rpc}`));
}
assert.match(migration, /security definer[\s\S]+set search_path = ''/);
assert.match(migration, /insert into public\.versus_rooms[\s\S]+values \(v_code, 'complete'/);
assert.match(migration, /insert into public\.versus_players[\s\S]+v_invite\.challenger_id[\s\S]+v_user_id/);
assert.match(hardening, /create index versus_invites_room_idx/);
assert.match(hardening, /select public\.is_permanent_versus_user\(\)/);
assert.match(sw, /CACHE_NAME = `\$\{CACHE_PREFIX\}v101`/);
assert.match(sw, /"\.\/js\/versus-room-supabase\.js": "20260817-auth-cuentas-2"/);

console.log("versus-social: comprobaciones correctas");
