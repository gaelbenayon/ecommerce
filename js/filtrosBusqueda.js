const productosDisponibles = function() {
    let productos = obtenerProductos();
    return productos.filter(e => e.cantidad > 0);
}

guardarArrayActual(productosDisponibles());

const budines = function() {
    let productos = obtenerProductos();
    return productos.filter(e => e.categoria === "budines");
}
const tortas = function() {
    let productos = obtenerProductos();
    return productos.filter(e => e.categoria === "tortas");
}

function filtrarProductosRepetidos(array) {
    let productos = obtenerProductos();

    let idCoincidencias = [];
    for (item of array) {
        if (!idCoincidencias.includes(item.id)) {idCoincidencias.push(item.id);}
    }

    let coincidenciasFiltradas = [];
    for (id of idCoincidencias) {
        let posicion = productos.findIndex(e => e.id === id);
        let producto = productos[posicion];
        coincidenciasFiltradas.push(producto);
    }

    return coincidenciasFiltradas;
}

function filtrarBuscador() {
    event.preventDefault();
    try {
        let filtro = document.getElementById("buscador").value.toLowerCase();
        let productos = obtenerProductos();
        let coincidencias = productos.filter(e => e.nombre.includes(filtro) || e.categoria.includes(filtro));

        if (coincidencias.length > 0) {
            let resultados = filtrarProductosRepetidos(coincidencias);     
            guardarArrayActual(resultados);       
            renderizarProductos(resultados);
        } else {
            document.getElementById("contenido").innerHTML = "<p class='text-center'>No se encontraron resultados, intente con otra palabra o filtre con el botón superior</p>";
        } 
        
    } catch (error) {
        mostrarErrorEnDOM(error);
    }
}

//FILTROS - ORDEN

function ordenarPrecioAscendente(array) {
    if (array[0].hasOwnProperty("precio")) {
        return array.sort((a, b) => a.precio - b.precio);
    } else if (array[0].hasOwnProperty("price")) {
        return array.sort((a, b) => a.price - b.price);
    }
}

function ordenarPrecioDescendente(array) {
    let productos = ordenarPrecioAscendente(array);
    if (productos[0].hasOwnProperty("precio")) {
        return productos.sort((b, a) => a.precio - b.precio);
    } else if (productos[0].hasOwnProperty("price")) {
        return productos.sort((b, a) => a.price - b.price);
    }
}