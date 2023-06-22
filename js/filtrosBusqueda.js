const productosDisponibles = function () {return obtenerProductos().filter(e => e.cantidad > 0);};
const budines = function() {return obtenerProductos().filter(e => e.categoria === "budines");};
const tortas = function() {return obtenerProductos().filter(e => e.categoria === "tortas");};

function filtrarBuscador() {
    event.preventDefault();
    let filtro = document.getElementById("buscador").value.toLowerCase();
    switch (filtro) {
        case "budines":
            renderizarProductos(budines());
            break;
        case "tortas":
            renderizarProductos(tortas());
            break;
        default:
            document.getElementById("contenido").innerHTML = "<p class='text-center'>No se encontraron resultados, intente con otra palabra o filtre con el botón superior</p>";
            break;
    }
}