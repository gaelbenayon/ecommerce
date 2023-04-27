let = peso = parseFloat(prompt("Introduzca el peso:"));
let = altura = parseFloat(prompt("Introduzca la altura:"));

let = IMC = peso / (altura*altura).toFixed(2); //toFixed corta los números después de la coma

alert("El IMC es " + IMC.toFixed(2));