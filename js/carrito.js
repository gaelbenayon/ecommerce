async function agregarAlCarrito(unidades) {
    let carrito = obtenerCarrito();
    let producto = obtenerProductoSeleccionado();
    let productoEnCarrito = carrito.find(e => e.id === producto.id);
    if (productoEnCarrito) {
        let pos = carrito.findIndex(e => e == productoEnCarrito);
        carrito[pos].cantidad += unidades;
        guardarCarrito(carrito);
        eliminarCantidadProducto(unidades);
    } else {
        producto.cantidad = 0;
        for (i=0;i<unidades;i++) {
            producto.cantidad++;
        }
        carrito.push(producto);
        guardarCarrito(carrito);
        eliminarCantidadProducto(unidades);
    }
    notificacionAgregadoAlCarrito();
    mostrarCantidadProductosCarrito();
    activarCarritoModal();
    document.getElementById("unidadesDisponibles").innerHTML = `${await obtenerUnidadesDisponiblesSeleccion()} UNIDADES DISPONIBLES`;
}

function mostrarCantidadProductosCarrito() {
    document.getElementById("carritoCantidad").innerHTML = cantidadEnCarrito();
}

function abrirCarrito() {
    cantidadEnCarrito() > 0 ? mostrarCarrito() : notificacionCarritoVacio();
}

function activarCarritoModal() {
    const botonCarrito = document.getElementById("botonCarrito");
    if (cantidadEnCarrito() > 0) {
        botonCarrito.setAttribute("data-bs-toggle","offcanvas");
        botonCarrito.setAttribute("data-bs-target","#carritoModal");
    } else {
        botonCarrito.removeAttribute("data-bs-toggle");
        botonCarrito.removeAttribute("data-bs-target");
    }
}

function mostrarCarrito() {
    activarCarritoModal();
    let salida = '<div class="row my-3 d-flex align-items-center">';
    obtenerCarrito().forEach(producto => {
        const {id,nombre,precio,cantidad,imagen} = producto;
        salida += `
        <div class="row my-2 align-items-center">
            <div class="col-4">
                <img src="${imagen}" class="rounded" width="100%">
            </div>
            <div class="col-6 text-center">
                <p>${nombre.toUpperCase()}</p>
                <p class="text-primary">${cantidad} x <b>$${precio}</b></p>
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

async function eliminarDelCarrito(id) {
    let productos = await obtenerProductos();
    let posicionProductos = productos.findIndex(e => e.id === id);
    productos[posicionProductos].cantidad++;
    guardarProductos(productos);

    let posicionCarrito = obtenerCarrito().findIndex(e => e.id === id);
    let carrito = obtenerCarrito();
    carrito[posicionCarrito].cantidad--;

    if (carrito[posicionCarrito].cantidad < 1) {
        carrito.splice(posicionCarrito,1);
    }

    guardarCarrito(carrito);
    mostrarCarrito();
    mostrarCantidadProductosCarrito();
    verificarCarritoVacio();
}

function verificarCarritoVacio() {
    if(cantidadEnCarrito() < 1) {
        document.getElementById("carrito").textContent = `Tu carrito está vacío, ¡agregá todos los productos que te gusten!`;
    }
}