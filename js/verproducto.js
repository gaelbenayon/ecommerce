let producto = JSON.parse(sessionStorage.getItem("productoSeleccionado"));

const {nombre, imagen, precio} = producto;

document.title = `${nombre.toUpperCase()} | Flikita's Bakery`;

renderizarProductoSeleccionado();