function guardarProductos(productos) { 
    localStorage.setItem("productos",JSON.stringify(productos));
}

async function obtenerProductos() {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(JSON.parse(localStorage.getItem("productos")) || []);
        }, 300);
    })
}

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    return localStorage.setItem("carrito",JSON.stringify(carrito));
}

function obtenerProductoSeleccionado() {
    return JSON.parse(sessionStorage.getItem("productoSeleccionado"));
}

function loader() {
    document.getElementById("contenido").innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Cargando...</span>
        </div>`;
}

function mostrarErrorEnDOM(respuesta) {
    document.getElementById("contenido").innerHTML = `
        <div class="alert alert-danger w-75 text-center" role="alert">
            <b>¡OCURRIÓ UN ERROR INESPERADO!</b> <br> ${respuesta}
        </div>
        `;
}

async function renderizarProductos(filtro) {
    loader();
    try {
        let array = await filtro;
        if (array.length < 1) {
            document.getElementById("contenido").innerHTML = `
            <div class="alert alert-danger w-75 text-center" role="alert">
                <b>¡NO QUEDAN PRODUCTOS CON STOCK DISPONIBLE!</b>
            </div>
            `;
        } else {
            let salida = "";
            array.forEach(producto => {
                const {imagen,nombre,precio,id} = producto;
                salida += `
                <div class="card col-11 col-sm-5 col-md-4 col-lg-3">
                    <img src="${imagen}" class="card-img-top" alt="${nombre.toUpperCase()}">
                    <div class="card-body text-start">
                        <h3 class="card-title text-primary text-start">$${precio}</h3>
                        <p class="card-text">${nombre.toUpperCase()}</p>
                        <button onclick="seleccionarProducto(${id})" class="btn btn-primary w-100">Ver Producto</button>
                    </div>
                </div>`;
            });
            document.getElementById("contenido").innerHTML = salida;
        }
    } catch (error) {
        mostrarErrorEnDOM(error);
    }
}

async function obtenerProductosAPI() {
    loader();
    try {
        const response = await fetch('https://fakestoreapi.com/products/?limit=5');
        const data = await response.json();    
        let salida = "";      
        data.forEach(producto => {
            const {title,image,price} = producto;
            salida += `
            <div class="card col-11 col-sm-5 col-md-4 col-lg-3">
                <img src="${image}" class="card-img-top" alt="${title.toUpperCase()}">
                <div class="card-body text-start">
                    <h3 class="card-title text-primary text-start">USD $${price}</h3>
                    <p class="card-text">${title.toUpperCase()}</p>
                </div>
            </div>`;
        })
        document.getElementById("contenido").innerHTML = salida;
    } catch (error) {
        mostrarErrorEnDOM(error);
    }
}

async function seleccionarProducto(id) {
    let productos = await obtenerProductos();
    let producto = productos.find(e => e.id === id);
    sessionStorage.setItem("productoSeleccionado",JSON.stringify(producto));
    location.href = "producto.html";
}

async function renderizarProductoSeleccionado() {
    loader();
    try {
        let producto = obtenerProductoSeleccionado();
        let {nombre,categoria,precio,imagen} = producto;
        let salida = `
        <div class="d-sm-flex col-11 align-items-center">
            <div class="col-12 col-sm-5 col-md-6 col-lg-5"> 
                <img class="img-fluid" src="${imagen}" alt="${nombre.toUpperCase()}"> 
            </div>
            <div class="col-12 col-sm-7 col-md-6 col-lg-7 pt-5 px-2 border">
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
        document.getElementById("unidadesDisponibles").innerHTML = `${await obtenerUnidadesDisponiblesSeleccion()} UNIDADES DISPONIBLES`;
    } catch (error) {
        mostrarErrorEnDOM(error);
    }
}

async function consultarStock() {
    let unidadesDisponibles = await obtenerUnidadesDisponiblesSeleccion();
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
    return parseInt(document.getElementById("unidadesProducto").value);
}

async function obtenerUnidadesDisponiblesSeleccion() {
    let productos = await obtenerProductos();
    let posicion = productos.findIndex(e => e.id == obtenerProductoSeleccionado().id);
    return parseInt(productos[posicion].cantidad);
}

async function eliminarCantidadProducto(cantidad) {
    let productos = await obtenerProductos();
    let idProducto = obtenerProductoSeleccionado().id;
    let posicionEnProductos = productos.findIndex(e => e.id === idProducto);
    productos[posicionEnProductos].cantidad -= cantidad;
    guardarProductos(productos);
}