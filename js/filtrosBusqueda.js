const productosDisponibles = function() {
    let productos = obtenerProductos();
    return productos.filter(e => e.cantidad > 0);
}
const budines = function() {
    let productos = obtenerProductos();
    return productos.filter(e => e.categoria === "budines");
}
const tortas = function() {
    let productos = obtenerProductos();
    return productos.filter(e => e.categoria === "tortas");
}

function filtrarBuscador() {
    event.preventDefault();
    try {
        let filtro = document.getElementById("buscador").value.toLowerCase();
        let productos = obtenerProductos();
        let coincidencias = productos.filter(e => e.nombre.includes(filtro) || e.categoria.includes(filtro));

        if (coincidencias.length > 0) {
            let resultados = filtrarProductosRepetidos(coincidencias);            
            renderizarProductos(resultados);
        } else {
            document.getElementById("contenido").innerHTML = "<p class='text-center'>No se encontraron resultados, intente con otra palabra o filtre con el botón superior</p>";
        } 
        
    } catch (error) {
        mostrarErrorEnDOM(error);
    }
}