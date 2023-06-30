function notificacionAgregadoAlCarrito() {
    Toastify({
        text: "¡Producto agregado al carrito!",
        duration: 3000,
        gravity: "bottom",
        position: "left",
        style: {background: "#0d6efd"},
      }).showToast();
}

function notificacionEliminadoDelCarrito() {
    Toastify({
        text: "Función a desarrollar para la entrega final :)",
        duration: 3000,
        gravity: "bottom",
        position: "left",
        style: {background: "red"},
      }).showToast();
}

function notificacionSinStock() {
    Toastify({
        text: "¡Producto sin stock disponible!",
        duration: 3000,
        gravity: "bottom",
        position: "left",
        style: {background: "red"},
      }).showToast();
}

async function notificacionStockInsuficiente() {
    let mensaje = await obtenerUnidadesDisponiblesSeleccion() > 1 ? "unidades disponibles" : "unidad disponible";
    Toastify({
        text: `No hay stock suficiente para su selección, hay ${await obtenerUnidadesDisponiblesSeleccion()} ${mensaje}`,
        duration: 3000,
        gravity: "bottom",
        position: "left",
        style: {background: "red"},
    }).showToast();
}

function notificacionCarritoVacio() {
    Toastify({
        text: "Todavía no has agregado productos a tu carrito",
        duration: 3000,
        gravity: "bottom",
        position: "left",
        style: {background: "red"},
    }).showToast();
}