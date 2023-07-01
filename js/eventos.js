const filtradorOnSubmit = Array.from(document.getElementsByClassName("filtradorOnSubmit"));
for (let buscador of filtradorOnSubmit) {
    buscador.onsubmit = function() {filtrarBuscador()};
}

const filtroProductosTodos = Array.from(document.getElementsByClassName("productosTodos"));
for (let item of filtroProductosTodos) {
    item.onclick = function() {
        guardarArrayActual(obtenerProductos());
        renderizarProductos(obtenerProductos());
    };
}

const filtroBudines = Array.from(document.getElementsByClassName("budines"));
for (let budin of filtroBudines) {
    budin.onclick = function() {
        guardarArrayActual(budines());
        renderizarProductos(budines());
    };
}

const filtroTortas = Array.from(document.getElementsByClassName("tortas"));
for (let torta of filtroTortas) {
    torta.onclick = function() {
        guardarArrayActual(tortas());
        renderizarProductos(tortas());
    };
}

const filtroAPI = Array.from(document.getElementsByClassName("otrosProductos"));
for (let item of filtroAPI) {
    item.onclick = function() {obtenerProductosAPI()};
} 

const botonCarrito = Array.from(document.getElementsByClassName("botonCarrito"));
for (let item of botonCarrito) {
    item.onclick = function() {abrirCarrito()};
}

//FILTROS - ORDEN

const ordenDefault = Array.from(document.getElementsByClassName("ordenDefault"));
for (let item of ordenDefault) {
    item.onclick = function() {renderizarProductos(obtenerArrayActual())};
}

const precioAscendente = Array.from(document.getElementsByClassName("precioAscendente"));
for (let item of precioAscendente) {
    item.onclick = function() {renderizarProductos(ordenarPrecioAscendente(obtenerArrayActual()))};
}

const precioDescendente = Array.from(document.getElementsByClassName("precioDescendente"));
for (let item of precioDescendente) {
    item.onclick = function() {renderizarProductos(ordenarPrecioDescendente(obtenerArrayActual()))};
}