const PWA_UPDATE_INTERVAL = 60 * 60 * 1000;

async function registrarAplicacionInstalable() {
  if (!("serviceWorker" in navigator)) return;

  const avisoActualizacion = document.getElementById("avisoActualizacionPwa");
  const iconoActualizacion = document.getElementById("iconoActualizacionPwa");
  const tituloActualizacion = document.getElementById("tituloActualizacionPwa");
  const textoActualizacion = document.getElementById("textoActualizacionPwa");
  const progresoActualizacion = document.getElementById("progresoActualizacionPwa");
  const detalleProgreso = document.getElementById("detalleProgresoActualizacionPwa");
  const porcentajeActualizacion = document.getElementById("porcentajeActualizacionPwa");
  const barraActualizacion = document.getElementById("barraActualizacionPwa");
  const accionesActualizacion = document.getElementById("accionesActualizacionPwa");
  const btnActualizar = document.getElementById("btnActualizarAplicacion");
  const btnPosponer = document.getElementById("btnPosponerActualizacion");
  const menuPrincipalPwa = document.getElementById("pantallaMenu");
  let workerEnEspera = null;
  let avisoPendiente = false;
  let recargandoPorActualizacion = false;
  let progresoInstalacion = null;

  const actualizarBarraDescarga = ({ porcentaje, completados, total, estado }) => {
    const valor = Math.min(100, Math.max(0, Number(porcentaje) || 0));
    progresoInstalacion = { porcentaje: valor, completados, total, estado };
    barraActualizacion.value = valor;
    barraActualizacion.textContent = `${valor}%`;
    porcentajeActualizacion.textContent = `${valor}%`;
    detalleProgreso.textContent = estado === "iniciando"
      ? "Preparando archivos…"
      : `${completados} de ${total} archivos descargados`;
    iconoActualizacion.textContent = "↓";
    tituloActualizacion.textContent = "Descargando actualización";
    textoActualizacion.textContent =
      "Esperá a que finalice para disponer de todas las imágenes y sonidos.";
    progresoActualizacion.hidden = false;
    accionesActualizacion.hidden = true;
    avisoPendiente = !menuPrincipalPwa.classList.contains("activa");
    avisoActualizacion.hidden = avisoPendiente;
  };

  const mostrarErrorDescarga = () => {
    progresoInstalacion = null;
    iconoActualizacion.textContent = "!";
    tituloActualizacion.textContent = "No se completó la actualización";
    textoActualizacion.textContent =
      "Revisá tu conexión. El juego volverá a intentar la descarga automáticamente.";
    progresoActualizacion.hidden = true;
    accionesActualizacion.hidden = true;
    avisoPendiente = !menuPrincipalPwa.classList.contains("activa");
    avisoActualizacion.hidden = avisoPendiente;
  };

  const presentarAvisoActualizacion = () => {
    if (!workerEnEspera) return;
    avisoPendiente = false;
    iconoActualizacion.textContent = "↻";
    tituloActualizacion.textContent = "Actualización disponible";
    textoActualizacion.textContent = "La descarga llegó al 100%. Ya podés instalar la nueva versión.";
    barraActualizacion.value = 100;
    barraActualizacion.textContent = "100%";
    porcentajeActualizacion.textContent = "100%";
    detalleProgreso.textContent = progresoInstalacion?.total
      ? `${progresoInstalacion.total} de ${progresoInstalacion.total} archivos descargados`
      : "Todos los archivos están listos";
    progresoActualizacion.hidden = false;
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
      } else if (worker.state === "redundant" && progresoInstalacion) {
        mostrarErrorDescarga();
      }
    });
  };

  navigator.serviceWorker.addEventListener("message", (event) => {
    const mensaje = event.data;
    if (
      !navigator.serviceWorker.controller
      || mensaje?.type !== "PWA_INSTALL_PROGRESS"
    ) {
      return;
    }

    if (mensaje.estado === "error") {
      mostrarErrorDescarga();
      return;
    }

    actualizarBarraDescarga(mensaje);
  });

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
    progresoActualizacion.hidden = true;
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
