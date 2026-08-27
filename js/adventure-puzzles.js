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

  function obtenerTrayectoRecto(inicio, fin, lado) {
    if (
      !Number.isInteger(inicio) ||
      !Number.isInteger(fin) ||
      !Number.isInteger(lado) ||
      lado < 2 ||
      inicio < 0 ||
      fin < 0 ||
      inicio >= lado * lado ||
      fin >= lado * lado
    ) {
      return [];
    }

    const filaInicio = Math.floor(inicio / lado);
    const columnaInicio = inicio % lado;
    const filaFin = Math.floor(fin / lado);
    const columnaFin = fin % lado;
    const diferenciaFila = filaFin - filaInicio;
    const diferenciaColumna = columnaFin - columnaInicio;
    const esRecto =
      diferenciaFila === 0 ||
      diferenciaColumna === 0 ||
      Math.abs(diferenciaFila) === Math.abs(diferenciaColumna);
    if (!esRecto) return [];

    const pasoFila = Math.sign(diferenciaFila);
    const pasoColumna = Math.sign(diferenciaColumna);
    const cantidad = Math.max(Math.abs(diferenciaFila), Math.abs(diferenciaColumna));
    return Array.from({ length: cantidad + 1 }, (_, posicion) =>
      (filaInicio + pasoFila * posicion) * lado + columnaInicio + pasoColumna * posicion,
    );
  }

  function sonCeldasAdyacentes(inicio, fin, lado) {
    if (!Number.isInteger(inicio) || !Number.isInteger(fin) || !Number.isInteger(lado)) {
      return false;
    }
    const filaInicio = Math.floor(inicio / lado);
    const columnaInicio = inicio % lado;
    const filaFin = Math.floor(fin / lado);
    const columnaFin = fin % lado;
    return Math.abs(filaInicio - filaFin) + Math.abs(columnaInicio - columnaFin) === 1;
  }

  return {
    crearEstadoOrdenado,
    obtenerMovimientosValidos,
    moverPieza,
    estaOrdenado,
    crearTableroMezclado,
    crearSecuenciaMemoria,
    obtenerTrayectoRecto,
    sonCeldasAdyacentes,
  };
});
