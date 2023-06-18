let producto = obtenerProductoSeleccionado();

const {nombre,categoria,precio,imagen} = producto;

document.title = `${nombre.toUpperCase()} | Flikita's Bakery`;

renderizarProductoSeleccionado();

mostrarCantidadProductosCarrito();