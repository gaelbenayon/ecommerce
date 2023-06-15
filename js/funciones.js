function guardarProductos() {
    localStorage.setItem("productos",JSON.stringify(productos));
    console.log("Productos guardados");
}

function obtenerProductos() {
    return JSON.parse(localStorage.getItem("productos"));
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

document.getElementById("carritoCantidad").innerHTML = cantidadEnCarrito();

function abrirCarrito() {
    cantidadEnCarrito() > 0 ? mostrarCarrito() : mensajeCarritoVacio();
}

function mostrarCarrito() {
    const botonCarrito = document.getElementById("botonCarrito");
    botonCarrito.setAttribute("data-bs-toggle","offcanvas");
    botonCarrito.setAttribute("data-bs-target","#carritoModal");
    let salida = '';
    obtenerCarrito().forEach(element => {
        const {nombre,id,precio,imagen} = element;
        salida += `
        <div class="row my-3 d-flex align-items-center">
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
    
    document.getElementById("carrito").innerHTML = salida;
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
        const {imagen, nombre, precio, id} = producto;
        salida += `
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3">
            <img style="width:100%" src="${imagen}" class="card-img-top" alt="${nombre.toUpperCase()}">
            <div class="card-body">
                <h5 class="card-title text-primary">$${precio}</h5>
                <p class="card-text">${nombre.toUpperCase()}</p>
                <button onclick="seleccionarProducto(${id})" class="btn btn-primary">VER</button>
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
    let salida = `
    <div class="d-grid d-lg-flex">
        <div class="col-12 col-lg-5 bg-danger"> 
            <img style="width:100%" src="${imagen}"> 
        </div>
        <div class="col-12 col-lg-7 pt-5">
            <div class="d-flex align-items-center flex-column">
                <h2>${nombre.toUpperCase()}</h2>
                <h4 class="text-primary"><b>$${precio}</b></h4>
                <button onclick="consultarStock()" class="btn btn-primary mt-3"><i class="fa-solid fa-cart-shopping me-2"></i>AGREGAR</button>
            </div>
        </div>
    </div>`;
    document.getElementById("contenido").innerHTML = salida;
}

function consultarStock() {
    obtenerProductoSeleccionado().cantidad > 0 ? agregarAlCarrito() : notificacionSinStock();
}

function agregarAlCarrito() {
    let carrito = obtenerCarrito();
    carrito.push(obtenerProductoSeleccionado());
    guardarCarrito(carrito);
    notificacionAgregadoAlCarrito();
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
        text: "Función a desarrollar para la próxima entrega :)",
        duration: 3000,
        gravity: "bottom",
        position: "left",
        style: {background: "red"},
      }).showToast();
}

function notificacionSinStock() {
    alert("CONFIGURAR");
}