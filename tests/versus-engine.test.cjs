const assert = require("node:assert/strict");
const engine = require("../js/versus-engine.js");

assert.equal(engine.normalizarPalabra("  árbol-ñandú  "), "ÁRBOLÑANDÚ");
assert.equal(engine.obtenerClavePalabra("cañón"), "CAÑON");

let turno = engine.evaluarLetra({ palabra: "SOL", letra: "S" });
assert.equal(turno.resultado, "acierto");
assert.deepEqual(turno.letras, ["S"]);

turno = engine.evaluarLetra({ palabra: "SOL", letras: turno.letras, errores: turno.errores, letra: "S" });
assert.equal(turno.resultado, "repetida");

turno = engine.evaluarLetra({ palabra: "SOL", letras: ["S", "O"], letra: "L" });
assert.equal(turno.resultado, "completa");
assert.equal(turno.palabraCompleta, true);

turno = engine.evaluarLetra({ palabra: "ANA", errores: 5, letra: "Z" });
assert.equal(turno.errores, 6);
assert.equal(turno.sinIntentos, true);

assert.deepEqual(engine.obtenerProgreso("SOL", ["S", "L"]), ["S", "_", "L"]);
assert.deepEqual(engine.obtenerProgreso("ÁFRICA", ["A"]), ["Á", "_", "_", "_", "_", "A"]);
assert.deepEqual(engine.obtenerProgreso("MAMÁ", ["Á"]), ["_", "A", "_", "Á"]);
assert.equal(engine.contarDescubiertas("MAMÁ", ["A"]), 2);
assert.equal(engine.sumarCargaHabilidad(6, 2), 8);
assert.equal(engine.sumarCargaHabilidad(8, 4), 8);
assert.equal(engine.CONFIG.maximoPalabras, 5);
assert.equal(engine.CONFIG.vidasIniciales, 5);
assert.equal(
  engine.elegirPalabraRecuperacion(["PERA", "MANZANA", "LIMÓN"], ["pera", "limon"], () => 0),
  "MANZANA",
);
assert.equal(engine.elegirPalabraRecuperacion(["SOL"], ["sol"], () => 0), "");
assert.equal(engine.obtenerEtiquetaRonda(4), "5/5");
assert.equal(engine.obtenerEtiquetaRonda(5), "EXTRA 1");
assert.equal(engine.reducirTiempo(1), 0);
assert.equal(engine.reducirTiempo(0), 0);
assert.equal(
  engine.resolverAgotamientoTiempo({ tiempoJugador: 40, tiempoRival: 0 }),
  "jugador",
);
assert.equal(
  engine.resolverAgotamientoTiempo({ tiempoJugador: 0, tiempoRival: 40 }),
  "rival",
);
assert.equal(
  engine.resolverAgotamientoTiempo({ tiempoJugador: 0, tiempoRival: 0 }),
  "ambos",
);
assert.equal(
  engine.resolverAgotamientoTiempo({
    tiempoJugador: 0,
    tiempoRival: 40,
    jugadorActivo: false,
  }),
  "",
);
assert.equal(
  engine.resolverGanador(
    { vidas: 2, palabras: 2, letras: 8, tiempo: 30 },
    { vidas: 2, palabras: 1, letras: 9, tiempo: 40 },
  ),
  "jugador",
);
assert.equal(
  engine.resolverGanador(
    { vidas: 2, palabras: 2, letras: 8, tiempo: 30 },
    { vidas: 2, palabras: 2, letras: 8, tiempo: 30 },
  ),
  "empate",
);

console.log("versus-engine: comprobaciones correctas");
