(function iniciarVersusEngine(raiz, crearApi) {
  const api = crearApi();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  raiz.VersusEngine = api;
})(typeof globalThis !== "undefined" ? globalThis : this, () => {
  "use strict";

  const CONFIG = Object.freeze({
    minimoLetras: 3,
    maximoLetras: 12,
    maximoErrores: 6,
    maximoPalabras: 3,
    vidasIniciales: 3,
    duracionSegundos: 150,
  });

  function normalizarPalabra(valor, maximoLetras = CONFIG.maximoLetras) {
    return `${valor || ""}`
      .toLocaleUpperCase("es-AR")
      .replace(/[^A-ZÁÉÍÓÚÜÑ]/g, "")
      .slice(0, maximoLetras);
  }

  function obtenerClavePalabra(valor) {
    return normalizarPalabra(valor)
      .replace(/Ñ/g, "\uE000")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\uE000/g, "Ñ");
  }

  function crearEstadoPalabra() {
    return { letras: [], errores: 0 };
  }

  function evaluarLetra({ palabra, letras = [], errores = 0, letra }) {
    const objetivo = obtenerClavePalabra(palabra);
    const intento = obtenerClavePalabra(letra).slice(0, 1);
    const usadas = [...new Set(letras.map((valor) => obtenerClavePalabra(valor).slice(0, 1)))];

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
    const usadas = new Set(letras);
    return [...obtenerClavePalabra(palabra)].every((letra) => usadas.has(letra));
  }

  function obtenerProgreso(palabra, letras = [], ocultarAciertos = false) {
    const usadas = new Set(letras);
    return [...obtenerClavePalabra(palabra)].map((letra) => {
      if (!usadas.has(letra)) return "_";
      return ocultarAciertos ? "?" : letra;
    });
  }

  function contarDescubiertas(palabra, letras = []) {
    const usadas = new Set(letras);
    return [...obtenerClavePalabra(palabra)].filter((letra) => usadas.has(letra)).length;
  }

  function reducirTiempo(tiempo, segundos = 1) {
    return Math.max(0, Number(tiempo || 0) - Math.max(0, segundos));
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
    CONFIG,
    normalizarPalabra,
    obtenerClavePalabra,
    crearEstadoPalabra,
    evaluarLetra,
    palabraCompletada,
    obtenerProgreso,
    contarDescubiertas,
    reducirTiempo,
    resolverGanador,
  });
});
