function guardarProductos(productos) {
    localStorage.setItem("productos",JSON.stringify(productos));
    console.log("Productos guardados / Local Storage actualizada");
}

function obtenerProductos() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

function cantidadEnCarrito() {
    return obtenerCarrito().length;
}

function obtenerProductoSeleccionado() {
    return JSON.parse(sessionStorage.getItem("productoSeleccionado"));
}

function mostrarCantidadProductosCarrito() {
    document.getElementById("carritoCantidad").innerHTML = cantidadEnCarrito();
}

function abrirCarrito() {
    cantidadEnCarrito() > 0 ? mostrarCarrito() : mensajeCarritoVacio();
}

function mostrarCarrito() {
    const botonCarrito = document.getElementById("botonCarrito");
    botonCarrito.setAttribute("data-bs-toggle","offcanvas");
    botonCarrito.setAttribute("data-bs-target","#carritoModal");
    let salida = '<div class="row my-3 d-flex align-items-center">';
    obtenerCarrito().forEach(element => {
        const {nombre,precio,imagen} = element;
        salida += `
        <div class="row my-2 align-items-center">
            <div class="col-4">
                <img src="${imagen}" class="rounded" width="100%">
            </div>
            <div class="col-6 text-center">
                ${nombre.toUpperCase()}
                <p class="text-primary"><b>$${precio}</b></p>
            </div>
            <div class="col-2">
                <button class="btn" onclick="eliminarDelCarrito()">
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
    return obtenerCarrito().reduce((ac,producto) => ac + producto.precio,0);
}

function mensajeCarritoVacio() {
    Toastify({
        text: "Todavía no has agregado productos a tu carrito",
        duration: 3000,
        gravity: "bottom",
        position: "left",
        style: {background: "red"},
    }).showToast();
}

function renderizarProductos(filtro) {
    let salida = "";
    filtro.forEach(producto => {
        const {imagen,nombre,precio,id} = producto;
        salida += `
        <div class="card col-11 col-sm-6 col-md-4 col-lg-3">
            <img src="${imagen}" class="card-img-top" alt="${nombre.toUpperCase()}">
            <div class="card-body text-start">
                <h3 class="card-title text-primary text-start">$${precio}</h3>
                <p class="card-text">${nombre.toUpperCase()}</p>
                <button onclick="seleccionarProducto(${id})" class="btn btn-primary w-100">Ver Producto</button>
            </div>
        </div>
        `;
    });
    document.getElementById("contenido").innerHTML = salida;
}

function seleccionarProducto(id) {
    let productos = obtenerProductos();
    let producto = productos.find(e => e.id === id);
    sessionStorage.setItem("productoSeleccionado",JSON.stringify(producto));
    location.href = "producto.html";
}

function renderizarProductoSeleccionado() {
    let producto = obtenerProductoSeleccionado();
    let {nombre,categoria,precio,imagen} = producto;
    let salida = `
    <div class="d-sm-flex col-11 align-items-center">
        <div class="col-12 col-sm-5 col-md-6 col-lg-5"> 
            <img class="img-fluid" src="${imagen}" alt="${nombre.toUpperCase()}"> 
        </div>
        <div class="col-12 col-sm-7 col-md-6 col-lg-7 pt-5 border">
            <div class="d-flex text-center flex-column"> 
                <button class="btn" onclick="renderizarProductos(${categoria})">${categoria.toUpperCase()}</button>
                <h2>${nombre.toUpperCase()}</h2>
                <h4 class="text-primary">$${precio}</h4>
                <h5 class="mt-3 small">CANTIDAD<h/5>
                <select title="Seleccione la cantidad de unidades para agregar al carrito" id="unidadesProducto">
                <option selected value="1">1</option>
                <option value="2">2</option>
                </select>
                <p id="unidadesDisponibles" class="mt-3 text-muted small"></p>
                <button onclick="consultarStock()" class="btn btn-primary d-block m-auto w-50 my-4"><i class="fa-solid fa-cart-shopping me-2"></i>AGREGAR</button>
            </div>
        </div>
    </div>`;
    document.getElementById("contenido").innerHTML = salida;
    document.getElementById("unidadesDisponibles").innerHTML = `${obtenerUnidadesDisponiblesSeleccion()} UNIDADES DISPONIBLES`;
}

function consultarStock() {
    let unidadesDisponibles = obtenerUnidadesDisponiblesSeleccion();
    let unidadesSeleccionadas = obtenerUnidadesSeleccionadas();
    if (unidadesDisponibles === 0) {
        notificacionSinStock();
    } else if (unidadesDisponibles < unidadesSeleccionadas) {
        notificacionStockInsuficiente();
    } else {
        agregarAlCarrito(unidadesSeleccionadas);
    }
}

function obtenerUnidadesSeleccionadas() {
    return document.getElementById("unidadesProducto").value;
}

function obtenerUnidadesDisponiblesSeleccion() {
    let productos = obtenerProductos();
    let posicion = productos.findIndex(e => e.id == obtenerProductoSeleccionado().id);
    return productos[posicion].cantidad;
}

function agregarAlCarrito(unidades) {
    let carrito = obtenerCarrito();
    let producto = obtenerProductoSeleccionado();
    producto.cantidad = 0;
    for (i=0;i<unidades;i++) {
        producto.cantidad++;
        carrito.push(producto);
        guardarCarrito(carrito);
        eliminarUnidadProducto();
    }
    notificacionAgregadoAlCarrito();
    mostrarCantidadProductosCarrito();
    document.getElementById("unidadesDisponibles").innerHTML = `${obtenerUnidadesDisponiblesSeleccion()} UNIDADES DISPONIBLES`;
}

function eliminarUnidadProducto() {
    let productos = obtenerProductos();
    let idProducto = obtenerProductoSeleccionado().id;
    let posicionEnProductos = productos.findIndex(e => e.id === idProducto);
    productos[posicionEnProductos].cantidad--;
    guardarProductos(productos);
}

function eliminarDelCarrito() {
    notificacionEliminadoDelCarrito();
}

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

function notificacionStockInsuficiente() {
    let mensaje = "";
    if (obtenerUnidadesDisponiblesSeleccion() > 1) {
        mensaje = "unidades disponibles";
    } else {
        mensaje = "unidad disponible";
    }
    Toastify({
        text: `No hay stock suficiente para su selección, hay ${obtenerUnidadesDisponiblesSeleccion()} ${mensaje}`,
        duration: 3000,
        gravity: "bottom",
        position: "left",
        style: {background: "red"},
    }).showToast();
}