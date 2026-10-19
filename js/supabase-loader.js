(function iniciarCargadorOnline(raiz) {
  "use strict";

  const URL_SUPABASE = "js/vendor/supabase-2.116.0.js";
  let promesaCarga = null;

  function clienteDisponible() {
    return typeof raiz.supabase?.createClient === "function";
  }

  function cargarSupabase() {
    if (clienteDisponible()) return Promise.resolve(raiz.supabase);
    if (!raiz.navigator?.onLine) {
      return Promise.reject(new Error(
        "El multijugador necesita conexión a internet. Podés jugar sin conexión al contenido ya descargado.",
      ));
    }
    if (promesaCarga) return promesaCarga;

    promesaCarga = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      let finalizada = false;
      const temporizador = setTimeout(() => {
        finalizar(new Error("La descarga del SDK multijugador tardó demasiado. Todavía no se comprobó la conexión con el servidor. Reintentá."));
      }, 30000);

      function finalizar(error = null) {
        if (finalizada) return;
        finalizada = true;
        clearTimeout(temporizador);
        if (error || !clienteDisponible()) {
          script.remove();
          promesaCarga = null;
          const motivo = error || new Error("No se pudo iniciar el SDK multijugador.");
          motivo.code = 'SDK_LOAD_FAILED';
          reject(motivo);
          return;
        }
        resolve(raiz.supabase);
      }

      script.src = URL_SUPABASE;
      script.async = true;
      script.fetchPriority = "high";
      script.crossOrigin = "anonymous";
      script.dataset.servicio = "supabase-multijugador";
      script.addEventListener("load", () => finalizar(), { once: true });
      script.addEventListener("error", () => finalizar(new Error(
        "No se pudo descargar el SDK multijugador. Reintentá la carga; todavía no se comprobó la conexión con Supabase.",
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
