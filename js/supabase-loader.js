(function iniciarCargadorOnline(raiz) {
  "use strict";

  const URL_SUPABASE = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";
  let promesaCarga = null;

  function clienteDisponible() {
    return typeof raiz.supabase?.createClient === "function";
  }

  function cargarSupabase() {
    if (clienteDisponible()) return Promise.resolve(raiz.supabase);
    if (!raiz.navigator?.onLine) {
      return Promise.reject(new Error(
        "El multijugador necesita conexión a internet. Aventura, Modo Pruebas y Torre siguen disponibles sin conexión.",
      ));
    }
    if (promesaCarga) return promesaCarga;

    promesaCarga = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      let finalizada = false;
      const temporizador = setTimeout(() => {
        finalizar(new Error("La conexión con el servicio multijugador tardó demasiado."));
      }, 15000);

      function finalizar(error = null) {
        if (finalizada) return;
        finalizada = true;
        clearTimeout(temporizador);
        if (error || !clienteDisponible()) {
          script.remove();
          promesaCarga = null;
          reject(error || new Error("No se pudo iniciar el servicio multijugador."));
          return;
        }
        resolve(raiz.supabase);
      }

      script.src = URL_SUPABASE;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.dataset.servicio = "supabase-multijugador";
      script.addEventListener("load", () => finalizar(), { once: true });
      script.addEventListener("error", () => finalizar(new Error(
        "No se pudo cargar el multijugador. Revisá tu conexión a internet.",
      )), { once: true });
      document.head.appendChild(script);
    });

    return promesaCarga;
  }

  raiz.AventuraOnline = Object.freeze({
    cargarSupabase,
    clienteDisponible,
  });
})(globalThis);
