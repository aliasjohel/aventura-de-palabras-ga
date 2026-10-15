(function iniciarVersusEngine(raiz, crearApi) {
  const api = crearApi("es", typeof module === "object" && module.exports ? require("./word-gameplay.js") : raiz.WordGameplay);

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  raiz.VersusEngine = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function crearMotor(idioma, WordGameplay) {
  "use strict";

  const reglas = WordGameplay.rules(idioma);

  const CONFIG = Object.freeze({
    minimoLetras: 3,
    maximoLetras: 12,
    maximoErrores: 6,
    maximoPalabras: 5,
    vidasIniciales: 5,
    duracionSegundos: 240,
    letrasParaHabilidad: 8,
  });

  function normalizarPalabra(valor, maximoLetras = CONFIG.maximoLetras) {
    if (idioma === "es") return reglas.clean(valor, maximoLetras);
    return reglas.validate(valor, {min: 1, max: maximoLetras}) ? reglas.display(valor) : "";
  }

  function obtenerClavePalabra(valor) {
    return reglas.key(normalizarPalabra(valor));
  }

  function crearEstadoPalabra() {
    return { letras: [], errores: 0 };
  }

  function evaluarLetra({ palabra, letras = [], errores = 0, letra }) {
    const objetivo = obtenerClavePalabra(palabra);
    const intento = reglas.letter(letra);
    const usadas = [...new Set(letras.map((valor) => reglas.letter(valor)))];

    if (!intento || usadas.includes(intento)) {
      return {
        letras: usadas,
        errores,
        resultado: "repetida",
        palabraCompleta: palabraCompletada(objetivo, usadas),
      };
    }

    usadas.push(intento);
    const acierto = objetivo.includes(intento);
    const nuevosErrores = acierto ? errores : errores + 1;
    const completa = palabraCompletada(objetivo, usadas);

    return {
      letras: usadas,
      errores: nuevosErrores,
      resultado: completa ? "completa" : (acierto ? "acierto" : "error"),
      palabraCompleta: completa,
      sinIntentos: nuevosErrores >= CONFIG.maximoErrores,
    };
  }

  function palabraCompletada(palabra, letras = []) {
    const usadas = new Set(letras.map(reglas.letter));
    return Boolean(obtenerClavePalabra(palabra)) && [...obtenerClavePalabra(palabra)].every((letra) => usadas.has(letra));
  }

  function obtenerProgreso(palabra, letras = [], ocultarAciertos = false) {
    const original = [...normalizarPalabra(palabra)];
    const clave = [...obtenerClavePalabra(palabra)];
    const usadas = new Set(letras.map((letra) => reglas.letter(letra)));
    return clave.map((letra, indice) => {
      if (!usadas.has(letra)) return "_";
      return ocultarAciertos ? "?" : original[indice];
    });
  }

  function contarDescubiertas(palabra, letras = []) {
    const usadas = new Set(letras.map((letra) => reglas.letter(letra)));
    return [...obtenerClavePalabra(palabra)].filter((letra) => usadas.has(letra)).length;
  }

  function elegirPalabraRecuperacion(banco = [], usadas = [], aleatorio = Math.random) {
    const clavesUsadas = new Set(usadas.map(obtenerClavePalabra));
    const disponibles = banco
      .filter(palabra => reglas.validate(palabra))
      .map((palabra) => normalizarPalabra(palabra))
      .filter((palabra) => palabra && !clavesUsadas.has(obtenerClavePalabra(palabra)));
    if (!disponibles.length) return "";

    const valorAleatorio = Math.max(0, Math.min(0.999999999, Number(aleatorio()) || 0));
    return disponibles[Math.floor(valorAleatorio * disponibles.length)];
  }

  function obtenerEtiquetaRonda(indice, maximo = CONFIG.maximoPalabras) {
    const numero = Math.max(0, Number(indice || 0)) + 1;
    return numero <= maximo ? `${numero}/${maximo}` : `EXTRA ${numero - maximo}`;
  }

  function reducirTiempo(tiempo, segundos = 1) {
    return Math.max(0, Number(tiempo || 0) - Math.max(0, segundos));
  }

  function resolverAgotamientoTiempo({
    tiempoJugador,
    tiempoRival,
    jugadorActivo = true,
    rivalActivo = true,
  }) {
    const jugadorAgotado = jugadorActivo && Number(tiempoJugador) <= 0;
    const rivalAgotado = rivalActivo && Number(tiempoRival) <= 0;

    if (jugadorAgotado && rivalAgotado) return "ambos";
    if (jugadorAgotado) return "rival";
    if (rivalAgotado) return "jugador";
    return "";
  }

  function sumarCargaHabilidad(carga, letrasReveladas) {
    return Math.min(
      CONFIG.letrasParaHabilidad,
      Math.max(0, Number(carga || 0)) + Math.max(0, Number(letrasReveladas || 0)),
    );
  }

  function resolverGanador(jugador, rival) {
    const puntaje = (competidor) => ({
      vidas: Number(competidor.vidas || 0),
      palabras: Number(competidor.palabras || 0),
      letras: Number(competidor.letras || 0),
      tiempo: Number(competidor.tiempo || 0),
    });
    const uno = puntaje(jugador);
    const dos = puntaje(rival);
    const criterios = ["vidas", "palabras", "letras", "tiempo"];

    for (const criterio of criterios) {
      if (uno[criterio] > dos[criterio]) return "jugador";
      if (dos[criterio] > uno[criterio]) return "rival";
    }

    return "empate";
  }

  return Object.freeze({
    idioma, reglas, paraIdioma: idioma => crearMotor(idioma, WordGameplay),
    CONFIG,
    normalizarPalabra,
    obtenerClavePalabra,
    crearEstadoPalabra,
    evaluarLetra,
    palabraCompletada,
    obtenerProgreso,
    contarDescubiertas,
    elegirPalabraRecuperacion,
    obtenerEtiquetaRonda,
    sumarCargaHabilidad,
    reducirTiempo,
    resolverAgotamientoTiempo,
    resolverGanador,
  });
});
