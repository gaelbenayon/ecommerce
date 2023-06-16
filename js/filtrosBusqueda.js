let productosDisponibles = obtenerProductos().filter(e => e.cantidad > 0);
let budines = obtenerProductos().filter(e => e.categoria === "budines");
let tortas = obtenerProductos().filter(e => e.categoria === "tortas");