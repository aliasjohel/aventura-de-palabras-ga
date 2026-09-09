/* Cálamo intercepta el mapa al terminar los tres desafíos de la misión 6. */
(() => {
  const scenes = {
    entrada: [
      { image: '../../fondos/desierto-6.png', actor: '../../personajes/versus/kalamo-base.png', actorName: 'Cálamo', title: 'El escriba de la caravana', text: 'Entre los carros enterrados aparece un joven cubierto de pergaminos. «Cálamo, a su servicio. Puedo descifrar esa última señal», dice. Aren le muestra el mapa, pero Zafir no aparta la vista de su tintero.' },
      { image: 'robo-mapa-v1.png', title: 'Un mapa sin palabras', text: 'Una cinta de tinta arranca las letras del mapa. «¿Un simple humano pretende salvar los mundos? No podés proteger ni tus propias palabras», se burla Cálamo. Aren se aferra al pergamino: «¡Devolvelas!».' },
      { image: 'aren-se-levanta-v1.png', title: 'El precio de avanzar', text: 'Un golpe de tinta arroja a Aren contra la arena. Le duele el brazo y le cuesta incorporarse. Zafir se arrodilla a su lado: «Estás herido. Este viaje puede costarte la vida. ¿Por qué seguís, si sabés lo difícil que es para un humano?».' },
      { image: 'aren-se-levanta-v1.png', title: 'La decisión de Aren', text: '«Porque hay gente que todavía espera ayuda. Tengo miedo, Zafir. Pero si me voy, nada va a cambiar». Aren acepta la mano del mago y se pone de pie. «Entonces seguimos juntos», responde Zafir. Cálamo aún bloquea el camino: comienza el duelo.' },
    ],
    huida: [
      { image: '../../fondos/desierto-6.png', actor: '../../personajes/versus/kalamo-base.png', actorName: 'Cálamo', title: 'Las palabras regresan', text: 'Vencido, Cálamo abre el tintero. Las letras vuelven al mapa y revelan el camino al templo. «Ganaste, explorador. Pero cuidado: lo que duerme bajo la arena también está prisionero». Antes de que Zafir pueda interrogarlo, el escriba desaparece entre manchas de tinta.' },
    ],
  };
  window.KalamoDesert = {
    scenes,
    play(kind, options = {}) {
      return StoryCinematic.play(kind, {
        ...options, shots: scenes[kind],
        assetRoot: 'assets/images/cinematicas/desierto-calamo/',
        label: 'Cálamo, el ladrón de palabras', heading: 'DESIERTO PERDIDO',
      });
    },
  };
})();
