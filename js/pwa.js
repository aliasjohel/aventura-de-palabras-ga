const PWA_UPDATE_INTERVAL = 60 * 60 * 1000;

async function registrarAplicacionInstalable() {
  if (!("serviceWorker" in navigator)) {
    const estadoOffline = document.getElementById("estadoOfflineJuego");
    if (estadoOffline) {
      estadoOffline.dataset.estado = "error";
      GameUI.text(estadoOffline, GameUI.key('common.pwa.unsupported'));
    }
    return;
  }

  const avisoActualizacion = document.getElementById("avisoActualizacionPwa");
  const iconoActualizacion = document.getElementById("iconoActualizacionPwa");
  const tituloActualizacion = document.getElementById("tituloActualizacionPwa");
  const textoActualizacion = document.getElementById("textoActualizacionPwa");
  const progresoActualizacion = document.getElementById("progresoActualizacionPwa");
  const detalleProgreso = document.getElementById("detalleProgresoActualizacionPwa");
  const porcentajeActualizacion = document.getElementById("porcentajeActualizacionPwa");
  const barraActualizacion = document.getElementById("barraActualizacionPwa");
  const accionesActualizacion = document.getElementById("accionesActualizacionPwa");
  const estadoOfflineJuego = document.getElementById("estadoOfflineJuego");
  const btnActualizar = document.getElementById("btnActualizarAplicacion");
  const btnPosponer = document.getElementById("btnPosponerActualizacion");
  const menuPrincipalPwa = document.getElementById("pantallaMenu");
  let workerEnEspera = null;
  let avisoPendiente = false;
  let recargandoPorActualizacion = false;
  let progresoInstalacion = null;
  let errorInstalacion = false;

  const mostrarEstadoOffline = (estado, texto) => {
    if (!estadoOfflineJuego) return;
    estadoOfflineJuego.dataset.estado = estado;
    GameUI.text(estadoOfflineJuego, texto);
  };

  const mostrarModosLocalesDisponibles = () => {
    mostrarEstadoOffline(
      navigator.onLine ? "listo" : "sin-red",
      navigator.onLine
        ? GameUI.key('common.pwa.ready')
        : GameUI.key('common.pwa.offline'),
    );
  };

  const solicitarConservacionPaqueteLocal = async () => {
    if (!navigator.storage?.persist) return;
    try {
      const yaPersistente = await navigator.storage.persisted?.();
      if (!yaPersistente) await navigator.storage.persist();
    } catch (_error) {
      // La caché continúa disponible aunque el navegador no permita fijarla.
    }
  };

  const actualizarBarraDescarga = ({
    porcentaje,
    completados,
    total,
    descargados = 0,
    reutilizados = 0,
    estado,
  }) => {
    errorInstalacion = false;
    const valor = Math.min(100, Math.max(0, Number(porcentaje) || 0));
    progresoInstalacion = {
      porcentaje: valor,
      completados,
      total,
      descargados,
      reutilizados,
      estado,
    };
    mostrarEstadoOffline(
      estado === "completa" ? "listo" : "descargando",
      estado === "completa"
        ? GameUI.key('common.pwa.ready')
        : GameUI.key('common.pwa.saving', {percent:valor}),
    );
    barraActualizacion.value = valor;
    barraActualizacion.textContent = `${valor}%`;
    porcentajeActualizacion.textContent = `${valor}%`;
    GameUI.text(detalleProgreso, estado === "iniciando"
      ? GameUI.key('common.pwa.comparing')
      : GameUI.key('common.pwa.fileProgress', {completed:completados,total,reused:reutilizados,downloaded:descargados}));
    iconoActualizacion.textContent = "↓";
    GameUI.text(tituloActualizacion, GameUI.key('common.pwa.preparing'));
    GameUI.text(textoActualizacion, GameUI.key('common.pwa.reuseMedia'));
    progresoActualizacion.hidden = false;
    accionesActualizacion.hidden = true;
    avisoPendiente = !menuPrincipalPwa.classList.contains("activa");
    avisoActualizacion.hidden = avisoPendiente;
  };

  const mostrarErrorDescarga = () => {
    errorInstalacion = true;
    progresoInstalacion = null;
    iconoActualizacion.textContent = "!";
    GameUI.text(tituloActualizacion, GameUI.key('common.pwa.failed'));
    GameUI.text(textoActualizacion, GameUI.key('common.pwa.retryDownload'));
    progresoActualizacion.hidden = true;
    accionesActualizacion.hidden = true;
    avisoPendiente = !menuPrincipalPwa.classList.contains("activa");
    avisoActualizacion.hidden = avisoPendiente;
    mostrarEstadoOffline(
      "error",
      GameUI.key('common.pwa.incomplete'),
    );
  };

  const presentarAvisoActualizacion = () => {
    if (!workerEnEspera) return;
    avisoPendiente = false;
    iconoActualizacion.textContent = "↻";
    GameUI.text(tituloActualizacion, GameUI.key('common.pwa.available'));
    GameUI.text(textoActualizacion, GameUI.key('common.pwa.readyToUpdate'));
    barraActualizacion.value = 100;
    barraActualizacion.textContent = "100%";
    porcentajeActualizacion.textContent = "100%";
    GameUI.text(detalleProgreso, progresoInstalacion?.total
      ? GameUI.key('common.pwa.fileSummary', {reused:progresoInstalacion.reutilizados,downloaded:progresoInstalacion.descargados})
      : GameUI.key('common.pwa.allReady'));
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
    GameUI.text(btnActualizar, GameUI.key('common.pwa.updating'));
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
      if (workerEnEspera) presentarAvisoActualizacion();
      else if (errorInstalacion) mostrarErrorDescarga();
      else if (progresoInstalacion) actualizarBarraDescarga(progresoInstalacion);
    }
  }).observe(menuPrincipalPwa, { attributes: true, attributeFilter: ["class"] });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    mostrarModosLocalesDisponibles();
    if (!recargandoPorActualizacion) return;
    sessionStorage.setItem("actualizacionPwaAplicada", "si");
    window.location.reload();
  });

  if (sessionStorage.getItem("actualizacionPwaAplicada") === "si") {
    sessionStorage.removeItem("actualizacionPwaAplicada");
    iconoActualizacion.textContent = "✓";
    GameUI.text(tituloActualizacion, GameUI.key('common.pwa.updated'));
    GameUI.text(textoActualizacion, GameUI.key('common.pwa.latest'));
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
    navigator.serviceWorker.ready.then(() => {
      mostrarModosLocalesDisponibles();
      void solicitarConservacionPaqueteLocal();
    }).catch(() => {});
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
    mostrarEstadoOffline("error", GameUI.key('common.pwa.activationFailure'));
    console.warn("No se pudo activar el modo instalable.", error);
  }
}

window.addEventListener("online", () => {
  const estado = document.getElementById("estadoOfflineJuego");
  if (estado?.dataset.estado === "sin-red") {
    estado.dataset.estado = "listo";
    GameUI.text(estado, GameUI.key('common.pwa.ready'));
  }
});

window.addEventListener("offline", () => {
  const estado = document.getElementById("estadoOfflineJuego");
  if (estado?.dataset.estado === "listo") {
    estado.dataset.estado = "sin-red";
    GameUI.text(estado, GameUI.key('common.pwa.offline'));
  }
});

window.addEventListener("load", registrarAplicacionInstalable);
