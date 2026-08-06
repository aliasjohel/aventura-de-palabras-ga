(function iniciarClienteSupabase(raiz) {
  "use strict";

  let cliente = null;

  function configuracionDisponible() {
    const config = raiz.AVENTURA_SUPABASE_CONFIG;
    return Boolean(
      config?.url?.startsWith("https://")
      && config?.publishableKey?.startsWith("sb_publishable_"),
    );
  }

  function obtenerClienteSupabase() {
    if (cliente) return cliente;
    if (!configuracionDisponible()) return null;
    if (typeof raiz.supabase?.createClient !== "function") return null;

    const { url, publishableKey } = raiz.AVENTURA_SUPABASE_CONFIG;
    cliente = raiz.supabase.createClient(url, publishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
    return cliente;
  }

  raiz.AventuraSupabase = Object.freeze({
    configuracionDisponible,
    obtenerCliente: obtenerClienteSupabase,
  });
})(globalThis);
