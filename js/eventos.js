const filtroProductosTodos = Array.from(document.getElementsByClassName("productosTodos"));
for (let item of filtroProductosTodos) {
    item.onclick = function() {renderizarProductos(obtenerProductos())};
}

const filtroBudines = Array.from(document.getElementsByClassName("budines"));
for (let budin of filtroBudines) {
    budin.onclick = function() {renderizarProductos(budines())};
}

const filtroTortas = Array.from(document.getElementsByClassName("tortas"));
for (let torta of filtroTortas) {
    torta.onclick = function() {renderizarProductos(tortas())};
}

const botonCarrito = Array.from(document.getElementsByClassName("botonCarrito"));
for (let item of botonCarrito) {
    item.onclick = function() {abrirCarrito()};
}