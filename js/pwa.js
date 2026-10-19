const PWA_UPDATE_INTERVAL = 60 * 60 * 1000;
let verificarEstadoOfflinePwa = () => {};

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
  let registroPwa = null;
  let busquedaEnCurso = null;
  const buscarActualizacion = () => {
    if (!registroPwa) return Promise.resolve();
    busquedaEnCurso ||= registroPwa.update().catch(() => mostrarErrorDescarga())
      .finally(() => { busquedaEnCurso = null; });
    return busquedaEnCurso;
  };

  const mostrarEstadoOffline = (estado, texto) => {
    if (!estadoOfflineJuego) return;
    estadoOfflineJuego.dataset.estado = estado;
    GameUI.text(estadoOfflineJuego, texto);
  };

  const mostrarModosLocalesDisponibles = async () => {
    if (globalThis.GameResources?.coreAvailable) {
      let disponible = false;
      try { disponible = await GameResources.coreAvailable(); } catch (_error) {}
      if (!disponible) {
        mostrarEstadoOffline('pendiente', GameUI.key('common.pwa.checkPending'));
        return;
      }
    }
    mostrarEstadoOffline(
      navigator.onLine ? "listo" : "sin-red",
      navigator.onLine
        ? GameUI.key('common.pwa.coreReady')
        : GameUI.key('common.pwa.cachedOnly'),
    );
  };
  verificarEstadoOfflinePwa = mostrarModosLocalesDisponibles;

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
        ? GameUI.key('common.pwa.coreReady')
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
    accionesActualizacion.hidden = false;
    btnActualizar.disabled = false;
    btnPosponer.disabled = false;
    GameUI.text(btnActualizar, GameUI.key('common.pwa.retry'));
    avisoPendiente = !menuPrincipalPwa.classList.contains("activa");
    avisoActualizacion.hidden = avisoPendiente;
    mostrarEstadoOffline(
      "error",
      GameUI.key('common.pwa.incomplete'),
    );
  };

  const presentarAvisoActualizacion = () => {
    if (!workerEnEspera) return;
    btnActualizar.disabled = false;
    btnPosponer.disabled = false;
    GameUI.text(btnActualizar, GameUI.key('common.pwa.updateNow'));
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

  navigator.serviceWorker.addEventListener("message", async (event) => {
    const mensaje = event.data;
    if (mensaje?.type !== "PWA_INSTALL_PROGRESS") {
      return;
    }

    const registro = await navigator.serviceWorker.getRegistration();
    if (![registro?.installing, registro?.waiting, registro?.active].includes(event.source)) return;

    if (mensaje.estado === "error") {
      mostrarErrorDescarga();
      return;
    }

    actualizarBarraDescarga(mensaje);
    if (mensaje.estado === 'completa' && !navigator.serviceWorker.controller) {
      avisoActualizacion.hidden = true;
      avisoPendiente = false;
    }
  });

  btnActualizar.addEventListener("click", async () => {
    if (errorInstalacion && !workerEnEspera) {
      btnActualizar.disabled = true;
      try { await buscarActualizacion(); }
      finally { btnActualizar.disabled = false; }
      return;
    }
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
    registroPwa = registro;

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
    void buscarActualizacion();
    window.addEventListener('online', () => { void buscarActualizacion(); });

    window.setInterval(() => {
      void buscarActualizacion();
    }, PWA_UPDATE_INTERVAL);

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        void buscarActualizacion();
      }
    });
  } catch (error) {
    document.documentElement.dataset.pwa = "error";
    mostrarEstadoOffline("error", GameUI.key('common.pwa.activationFailure'));
    console.warn("No se pudo activar el modo instalable.", error);
  }
}

window.addEventListener("online", () => {
  void verificarEstadoOfflinePwa();
});

window.addEventListener("offline", () => {
  void verificarEstadoOfflinePwa();
});

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", registrarAplicacionInstalable, { once: true });
else void registrarAplicacionInstalable();
