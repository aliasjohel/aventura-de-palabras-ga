const PWA_UPDATE_INTERVAL = 60 * 60 * 1000;

async function registrarAplicacionInstalable() {
  if (!("serviceWorker" in navigator)) return;

  const avisoActualizacion = document.getElementById("avisoActualizacionPwa");
  const iconoActualizacion = document.getElementById("iconoActualizacionPwa");
  const tituloActualizacion = document.getElementById("tituloActualizacionPwa");
  const textoActualizacion = document.getElementById("textoActualizacionPwa");
  const accionesActualizacion = document.getElementById("accionesActualizacionPwa");
  const btnActualizar = document.getElementById("btnActualizarAplicacion");
  const btnPosponer = document.getElementById("btnPosponerActualizacion");
  const menuPrincipalPwa = document.getElementById("pantallaMenu");
  let workerEnEspera = null;
  let avisoPendiente = false;
  let recargandoPorActualizacion = false;

  const presentarAvisoActualizacion = () => {
    if (!workerEnEspera) return;
    avisoPendiente = false;
    iconoActualizacion.textContent = "↻";
    tituloActualizacion.textContent = "Actualización disponible";
    textoActualizacion.textContent = "Hay una nueva versión de Aventura de Palabras.";
    accionesActualizacion.hidden = false;
    avisoActualizacion.hidden = false;
  };

  const mostrarActualizacionDisponible = (worker) => {
    if (!navigator.serviceWorker.controller || !worker) return;
    workerEnEspera = worker;
    if (!menuPrincipalPwa.classList.contains("activa")) {
      avisoPendiente = true;
      return;
    }
    presentarAvisoActualizacion();
  };

  const observarInstalacion = (worker) => {
    if (!worker) return;
    if (worker.state === "installed") {
      mostrarActualizacionDisponible(worker);
      return;
    }
    worker.addEventListener("statechange", () => {
      if (worker.state === "installed") {
        mostrarActualizacionDisponible(worker);
      }
    });
  };

  btnActualizar.addEventListener("click", () => {
    if (!workerEnEspera || recargandoPorActualizacion) return;
    recargandoPorActualizacion = true;
    btnActualizar.disabled = true;
    btnPosponer.disabled = true;
    btnActualizar.textContent = "Actualizando...";
    workerEnEspera.postMessage({ type: "SKIP_WAITING" });
  });

  btnPosponer.addEventListener("click", () => {
    avisoPendiente = false;
    avisoActualizacion.hidden = true;
  });

  new MutationObserver(() => {
    if (!menuPrincipalPwa.classList.contains("activa")) {
      if (!avisoActualizacion.hidden) avisoPendiente = true;
      avisoActualizacion.hidden = true;
      return;
    }
    if (avisoPendiente && menuPrincipalPwa.classList.contains("activa")) {
      presentarAvisoActualizacion();
    }
  }).observe(menuPrincipalPwa, { attributes: true, attributeFilter: ["class"] });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!recargandoPorActualizacion) return;
    sessionStorage.setItem("actualizacionPwaAplicada", "si");
    window.location.reload();
  });

  if (sessionStorage.getItem("actualizacionPwaAplicada") === "si") {
    sessionStorage.removeItem("actualizacionPwaAplicada");
    iconoActualizacion.textContent = "✓";
    tituloActualizacion.textContent = "Aplicación actualizada";
    textoActualizacion.textContent = "Ya estás usando la última versión.";
    accionesActualizacion.hidden = true;
    avisoActualizacion.hidden = false;
    window.setTimeout(() => {
      avisoActualizacion.hidden = true;
    }, 4500);
  }

  try {
    const registro = await navigator.serviceWorker.register("./sw.js", {
      scope: "./",
      updateViaCache: "none",
    });

    document.documentElement.dataset.pwa = "activa";
    mostrarActualizacionDisponible(registro.waiting);
    observarInstalacion(registro.installing);
    registro.addEventListener("updatefound", () => {
      observarInstalacion(registro.installing);
    });
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
