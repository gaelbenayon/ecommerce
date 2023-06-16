let producto = JSON.parse(sessionStorage.getItem("productoSeleccionado"));

const {nombre,categoria,precio,imagen} = producto;

document.title = `${nombre.toUpperCase()} | Flikita's Bakery`;

renderizarProductoSeleccionado();

mostrarCantidadProductosCarrito();