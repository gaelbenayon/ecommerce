function agregarAlCarrito(unidades) {
    let carrito = obtenerCarrito();
    let producto = obtenerProductoSeleccionado();
    let productoEnCarrito = carrito.find(e => e.id === producto.id);

    if (productoEnCarrito) {
        let posicion = carrito.findIndex(e => e == productoEnCarrito);
        carrito[posicion].cantidad += unidades;
    } else {
        producto.cantidad = 0;
        for (i=0;i<unidades;i++) {
            producto.cantidad++;
        }
        carrito.push(producto);
    }
    guardarCarrito(carrito);
    eliminarCantidadProducto(unidades);

    mostrarUnidadesDisponiblesSeleccion();
    notificacionAgregadoAlCarrito();
    mostrarCantidadProductosCarrito();
    abrirCarrito();
}

function mostrarCantidadProductosCarrito() {
    document.getElementById("carritoCantidad").innerHTML = cantidadEnCarrito();
}

function abrirCarrito() {
    cantidadEnCarrito() > 0 ? renderizarCarrito() : notificacionCarritoVacio();
    carritoModal();
}

function carritoModal() {
    const botonCarrito = document.getElementById("botonCarrito");
    if (cantidadEnCarrito() > 0) {
        botonCarrito.setAttribute("data-bs-toggle","offcanvas");
        botonCarrito.setAttribute("data-bs-target","#carritoModal");
    } else {
        botonCarrito.removeAttribute("data-bs-toggle");
        botonCarrito.removeAttribute("data-bs-target");
        document.getElementById("carrito").textContent = `Tu carrito está vacío, ¡agregá todos los productos que te gusten!`;
    }
}

function renderizarCarrito() {
    let salida = '<div class="row my-3 d-flex align-items-center">';
    obtenerCarrito().forEach(producto => {
        const {id,nombre,precio,cantidad,imagen} = producto;
        salida += `
        <div class="row my-2 align-items-center">
            <div class="col-4">
                <img src="${imagen}" class="rounded" width="100%">
            </div>
            <div class="col-6 text-center">
                <p class="pb-2">${nombre.toUpperCase()}</p>
                <div class="d-flex justify-content-center align-items-center">
                    <button class="btn" onclick="eliminarUnidadDelCarrito(${id})">
                        <i class="fa-solid fa-circle-minus"></i>
                    </button>
                    <p class="text-primary">${cantidad} x <b>$${precio}</b></p>
                    <button class="btn" onclick="agregarUnidadAlCarrito(${id})">
                        <i class="fa-solid fa-circle-plus"></i>
                    </button>
                </div>
            </div>
            <div class="col-2">
                <button class="btn" onclick="eliminarDelCarrito(${id})">
                    <i class="fa-solid fa-trash-can text-primary"></i>
                </button>
            </div>
        </div>`;
    });
    salida += `
        <div class="col-6 my-2"><h6 class="text-primary">TOTAL: $${calcularTotalCarrito()}</div>
    </div>
    `
    document.getElementById("carrito").innerHTML = salida;
}

function calcularTotalCarrito() {
    return obtenerCarrito().reduce((ac,producto) => ac + (producto.precio * producto.cantidad),0);
}

function cantidadEnCarrito() {
    return obtenerCarrito().reduce((ac,producto) => ac + producto.cantidad,0);
}

function eliminarDelCarrito(id) {
    let carrito = obtenerCarrito();
    let producto = carrito.find(e => e.id === id);
    let posicionCarrito = carrito.findIndex(e => e === producto);
    carrito.splice(posicionCarrito,1);
    guardarCarrito(carrito);

    let productos = obtenerProductos();
    let posicionProductos = productos.findIndex(e => e.id === id);
    productos[posicionProductos].cantidad += producto.cantidad;
    guardarProductos(productos);

    mostrarCantidadProductosCarrito();
    mostrarUnidadesDisponiblesSeleccion();
    renderizarCarrito();
    carritoModal();
}

function eliminarUnidadDelCarrito(id) {
    let productos = obtenerProductos();
    let posicionProductos = productos.findIndex(e => e.id === id);
    productos[posicionProductos].cantidad++;
    guardarProductos(productos);

    let carrito = obtenerCarrito();
    let posicionCarrito = carrito.findIndex(e => e.id === id);
    carrito[posicionCarrito].cantidad--;

    if (carrito[posicionCarrito].cantidad < 1) {
        carrito.splice(posicionCarrito,1);
    }
    guardarCarrito(carrito);
        
    renderizarCarrito();
    mostrarCantidadProductosCarrito();
    mostrarUnidadesDisponiblesSeleccion();
    carritoModal();
}

function agregarUnidadAlCarrito(id) {
    let productos = obtenerProductos();
    let posicionProductos = productos.findIndex(e => e.id === id);
    if (productos[posicionProductos].cantidad > 0) {
        productos[posicionProductos].cantidad--;
        guardarProductos(productos);

        let carrito = obtenerCarrito();
        let posicionCarrito = carrito.findIndex(e => e.id === id);
        carrito[posicionCarrito].cantidad++;
        guardarCarrito(carrito);
        
        renderizarCarrito();
        mostrarCantidadProductosCarrito();
        mostrarUnidadesDisponiblesSeleccion();
    } else {notificacionStockInsuficiente()}
}