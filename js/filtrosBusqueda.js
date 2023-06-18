const productosDisponibles = function () {return obtenerProductos().filter(e => e.cantidad > 0);}
const budines = function() {obtenerProductos().filter(e => e.categoria === "budines");}
const tortas = function() {obtenerProductos().filter(e => e.categoria === "tortas");}