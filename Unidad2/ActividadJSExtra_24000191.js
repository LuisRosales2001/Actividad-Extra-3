const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// USE readline en vez de alert porque me daba error ya que estoy usando Node.js.
//tambien console.log por el mismo motivo
var sumaComputadora;
var sumaJugador;
var carta1;
var carta2;
var respuesta; 

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// funcion que copie de la documentacion de random

carta1 = getRandomArbitrary(1, 12);
carta2 = getRandomArbitrary(1, 12);
sumaComputadora = carta1 + carta2;

carta1 = getRandomArbitrary(1, 12);
carta2 = getRandomArbitrary(1, 12);
sumaJugador = carta1 + carta2;

console.log("Tus cartas son " + carta1 + " y " + carta2 + " y sumas " + sumaJugador);

if (sumaJugador > 21) {
  console.log("Lo siento, perdiste");
  rl.close();
} else {

  (function obtenerRespuesta() {
    rl.question("¿Deseas agarrar otra carta? si/no: ", function(respuestaUsuario) {
      respuesta = respuestaUsuario.toLowerCase();

      if (respuesta == "si") {
        cartaExtra = getRandomArbitrary(1, 12);
        sumaJugador += cartaExtra;

        console.log("Sacas un " + cartaExtra + " y sumas " + sumaJugador);

        if (sumaJugador > 21) {
          console.log("La computadora sumó " + sumaComputadora + " con sus cartas");
          console.log("Lo siento, perdiste");
          rl.close();
        } else {
          obtenerRespuesta();
        }
      } else if (respuesta == "no") {
// Agregue este pequenio bucle para que la probabilidad de que la computadora gane sea mayor
        while (sumaComputadora < 17) {
          cartaExtra = getRandomArbitrary(1, 12);
          sumaComputadora += cartaExtra;
        }


        console.log("La computadora sumó " + sumaComputadora + " con sus cartas");

        if (sumaComputadora > 21 || sumaJugador > sumaComputadora) {
          console.log("¡Felicidades, ganaste!");
        } else if (sumaComputadora > sumaJugador) {
          console.log("Lo siento, perdiste");
        } else {
          console.log("Empate");
        }

        rl.close();
      } else {
        console.log("Respuesta inválida, responde si o no");
        obtenerRespuesta();
      }
    });
  })();
  // Al final hice una funcion IIFE en vez de while para que sea mas facil de leer.
}
