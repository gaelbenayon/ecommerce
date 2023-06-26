function agregarAlCarrito(unidades) {
    let carrito = obtenerCarrito();
    let producto = obtenerProductoSeleccionado();
    producto.cantidad = 0;
    let productoEnCarrito = carrito.find(e => e.id === producto.id);
    if (productoEnCarrito) {
        let pos = carrito.findIndex(e => e == productoEnCarrito);
        carrito[pos].cantidad += unidades;
        guardarCarrito(carrito);
        eliminarCantidadProducto(unidades);
    } else {
        for (i=0;i<unidades;i++) {
            producto.cantidad++;
        }
        carrito.push(producto);
        guardarCarrito(carrito);
        eliminarCantidadProducto(unidades);
    }
    notificacionAgregadoAlCarrito();
    mostrarCantidadProductosCarrito();
    document.getElementById("unidadesDisponibles").innerHTML = `${obtenerUnidadesDisponiblesSeleccion()} UNIDADES DISPONIBLES`;
}

function mostrarCantidadProductosCarrito() {
    document.getElementById("carritoCantidad").innerHTML = cantidadEnCarrito();
}

function abrirCarrito() {
    cantidadEnCarrito() > 0 ? mostrarCarrito() : notificacionCarritoVacio();
    const botones = Array.from(document.getElementsByClassName("btnCarritoEliminar"));
    for (boton of botones) {
        boton.onclick = function() {
            console.log(this.parentElement.previousElementSibling.children[0]); 
        }
    }
}

function mostrarCarrito() {
    const botonCarrito = document.getElementById("botonCarrito");
    botonCarrito.setAttribute("data-bs-toggle","offcanvas");
    botonCarrito.setAttribute("data-bs-target","#carritoModal");
    let salida = '<div class="row my-3 d-flex align-items-center">';
    obtenerCarrito().forEach(element => {
        const {nombre,precio,cantidad,imagen} = element;
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
                <button class="btn btnCarritoEliminar">
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

function eliminarDelCarrito() {
    // notificacionEliminadoDelCarrito();
    
}