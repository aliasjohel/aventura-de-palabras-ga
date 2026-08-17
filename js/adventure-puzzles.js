(function iniciarAdventurePuzzles(raiz, crearApi) {
  const api = crearApi();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  raiz.AdventurePuzzles = api;
})(typeof globalThis !== "undefined" ? globalThis : this, () => {
  "use strict";

  const LADO_TABLERO = 3;
  const CANTIDAD_PIEZAS = LADO_TABLERO * LADO_TABLERO - 1;

  function crearEstadoOrdenado() {
    return [...Array.from({ length: CANTIDAD_PIEZAS }, (_, indice) => indice), null];
  }

  function obtenerMovimientosValidos(estado) {
    const vacio = estado.indexOf(null);
    const fila = Math.floor(vacio / LADO_TABLERO);
    const columna = vacio % LADO_TABLERO;
    const movimientos = [];

    if (fila > 0) movimientos.push(vacio - LADO_TABLERO);
    if (fila < LADO_TABLERO - 1) movimientos.push(vacio + LADO_TABLERO);
    if (columna > 0) movimientos.push(vacio - 1);
    if (columna < LADO_TABLERO - 1) movimientos.push(vacio + 1);
    return movimientos;
  }

  function moverPieza(estado, indicePieza) {
    if (!obtenerMovimientosValidos(estado).includes(indicePieza)) {
      return { estado: [...estado], movida: false };
    }

    const siguiente = [...estado];
    const vacio = siguiente.indexOf(null);
    [siguiente[vacio], siguiente[indicePieza]] = [
      siguiente[indicePieza],
      siguiente[vacio],
    ];
    return { estado: siguiente, movida: true };
  }

  function estaOrdenado(estado) {
    return estado.every((valor, indice) =>
      indice === CANTIDAD_PIEZAS ? valor === null : valor === indice,
    );
  }

  function crearTableroMezclado(pasos = 16, aleatorio = Math.random) {
    let estado = crearEstadoOrdenado();
    let posicionAnteriorVacia = -1;

    for (let paso = 0; paso < pasos; paso += 1) {
      let opciones = obtenerMovimientosValidos(estado).filter(
        (indice) => indice !== posicionAnteriorVacia,
      );
      if (opciones.length === 0) opciones = obtenerMovimientosValidos(estado);
      const elegida = opciones[Math.floor(aleatorio() * opciones.length)];
      posicionAnteriorVacia = estado.indexOf(null);
      estado = moverPieza(estado, elegida).estado;
    }

    if (estaOrdenado(estado)) {
      estado = moverPieza(estado, obtenerMovimientosValidos(estado)[0]).estado;
    }
    return estado;
  }

  function crearSecuenciaMemoria(longitud, cantidadOpciones = 4, aleatorio = Math.random) {
    const secuencia = [];
    for (let indice = 0; indice < longitud; indice += 1) {
      let valor = Math.floor(aleatorio() * cantidadOpciones);
      if (cantidadOpciones > 1 && valor === secuencia.at(-1)) {
        valor = (valor + 1 + Math.floor(aleatorio() * (cantidadOpciones - 1))) % cantidadOpciones;
      }
      secuencia.push(valor);
    }
    return secuencia;
  }

  return {
    crearEstadoOrdenado,
    obtenerMovimientosValidos,
    moverPieza,
    estaOrdenado,
    crearTableroMezclado,
    crearSecuenciaMemoria,
  };
});
