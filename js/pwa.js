const PWA_UPDATE_INTERVAL = 60 * 60 * 1000;

async function registrarAplicacionInstalable() {
  if (!("serviceWorker" in navigator)) return;

  const yaEstabaControlada = Boolean(navigator.serviceWorker.controller);
  let recargandoPorActualizacion = false;

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!yaEstabaControlada || recargandoPorActualizacion) return;
    recargandoPorActualizacion = true;
    window.location.reload();
  });

  try {
    const registro = await navigator.serviceWorker.register("./sw.js", {
      scope: "./",
      updateViaCache: "none",
    });

    document.documentElement.dataset.pwa = "activa";
    registro.update().catch(() => {});

    window.setInterval(() => {
      registro.update().catch(() => {});
    }, PWA_UPDATE_INTERVAL);

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        registro.update().catch(() => {});
      }
    });
  } catch (error) {
    document.documentElement.dataset.pwa = "error";
    console.warn("No se pudo activar el modo instalable.", error);
  }
}

window.addEventListener("load", registrarAplicacionInstalable);
