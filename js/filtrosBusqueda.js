const productosDisponibles = function () {return obtenerProductos().filter(e => e.cantidad > 0);}
const budines = function() {return obtenerProductos().filter(e => e.categoria === "budines");}
const tortas = function() {return obtenerProductos().filter(e => e.categoria === "tortas");}