const persona = {
    nombre: "gael",
    apellido: "benayon",
    edad: 18,
    email: "gaelbenayon@gmail.com"
}
//RECORRER OBJETOS CON FOR IN
for (ps in persona) {
    console.log(ps + ": " + persona[ps]);
}

const animales = ["#1","#2","#3"];
//RECORRER ARRAYS CON FOR OF
for (animal of animales) {
    console.log(animal);
}
//EL FOR IN CON UN ARRAY DEVUELVE LAS POSICIONES
for (animal in animales) {
    console.log(animal);
}