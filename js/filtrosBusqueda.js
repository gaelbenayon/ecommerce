const productosDisponibles = async function() {
    let productos = await obtenerProductos();
    return productos.filter(e => e.cantidad > 0);
}
const budines = async function() {
    let productos = await obtenerProductos();
    return productos.filter(e => e.categoria === "budines");
}
const tortas = async function() {
    let productos = await obtenerProductos();
    return productos.filter(e => e.categoria === "tortas");
}

async function filtrarBuscador() {
    loader();
    try {
        event.preventDefault();
        let filtro = document.getElementById("buscador").value.toLowerCase();
        let productos = await obtenerProductos();
        let coincidenciasNombre = productos.filter(e => e.nombre === filtro);
        let coincidenciasCategoria = productos.filter(e => e.categoria === filtro);
        let coincidencias = coincidenciasNombre.concat(coincidenciasCategoria);
        
        if (coincidencias.length > 0) {
            renderizarProductos(coincidencias);
        } else {
            document.getElementById("contenido").innerHTML = "<p class='text-center'>No se encontraron resultados, intente con otra palabra o filtre con el botón superior</p>";
        }
    } catch (error) {
        mostrarErrorEnDOM(error);
    }
    
}