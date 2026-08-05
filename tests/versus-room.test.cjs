const assert = require("node:assert/strict");
const { crearAdaptadorLocal, limpiarCodigo } = require("../js/versus-room.js");

function crearAlmacenamiento() {
  const datos = new Map();
  return {
    getItem: (clave) => datos.get(clave) ?? null,
    setItem: (clave, valor) => datos.set(clave, valor),
    removeItem: (clave) => datos.delete(clave),
  };
}

const almacenamiento = crearAlmacenamiento();
const anfitrion = crearAdaptadorLocal(almacenamiento);
const invitado = crearAdaptadorLocal(almacenamiento);

const salaCreada = anfitrion.crearSala({ alias: "Gabi" });
assert.equal(salaCreada.codigo.length, 6);
assert.equal(salaCreada.jugadores.length, 1);
assert.equal(salaCreada.estado, "esperando");
assert.equal(limpiarCodigo(" ab-c12! "), "ABC12");

const salaCompleta = invitado.unirseSala({ codigo: salaCreada.codigo, alias: "Luna" });
assert.equal(salaCompleta.jugadores.length, 2);
assert.equal(salaCompleta.jugadores[1].alias, "Luna");
assert.equal(salaCompleta.estado, "completa");
assert.throws(
  () => crearAdaptadorLocal(almacenamiento).unirseSala({ codigo: salaCreada.codigo, alias: "Sol" }),
  /completa/,
);

anfitrion.salirSala();
assert.throws(
  () => crearAdaptadorLocal(almacenamiento).unirseSala({ codigo: salaCreada.codigo, alias: "Sol" }),
  /No encontramos/,
);

console.log("versus-room: 9 comprobaciones correctas");
