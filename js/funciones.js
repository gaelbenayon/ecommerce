function guardarProductos(productos) { 
    localStorage.setItem("productos",JSON.stringify(productos));
}

function obtenerProductos() {
    return JSON.parse(localStorage.getItem("productos")) || [];
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

function guardarArrayActual(array) {
    return localStorage.setItem("arrayActual",JSON.stringify(array));
}

function obtenerArrayActual() {
    return JSON.parse(localStorage.getItem("arrayActual"));
}

async function obtenerProductosAPI() {
    const response = await fetch('https://fakestoreapi.com/products/?limit=5');
    return await response.json(); 
}

function seleccionarProducto(id) {
    let productos = obtenerProductos();
    let producto = productos.find(e => e.id === id);
    sessionStorage.setItem("productoSeleccionado",JSON.stringify(producto));
    location.href = "producto.html";
}

function loader(array) {
    document.getElementById("contenido").innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Cargando...</span>
        </div>`;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(array);
        }, 500);
    })
}

function mostrarErrorEnDOM(respuesta) {
    document.getElementById("contenido").innerHTML = `
        <div class="alert alert-danger w-75 text-center" role="alert">
            <b>¡OCURRIÓ UN ERROR INESPERADO!</b> <br> ${respuesta}
        </div>
        `;
        console.error(respuesta);
}

async function renderizarProductos(filtro) {
    let array = await loader(filtro);
    try {
        if (array.length < 1) {
            document.getElementById("contenido").innerHTML = `
            <div class="alert alert-danger w-75 text-center" role="alert">
                <b>¡NO QUEDAN PRODUCTOS CON STOCK DISPONIBLE!</b>
            </div>
            `;
        } else {
            let salida = "";
            array.forEach(producto => {
                let {imagen,nombre,precio,id} = producto;
                //Si no se encuentran las variables, se trata de un producto de la API, que tiene otras propiedades
                if (!imagen || !nombre || !precio) {
                    const {image, title, price} = producto;
                    imagen = image;
                    nombre = title;
                    precio = price;
                }
                salida += `
                <div class="card col-11 col-sm-5 col-md-4 col-lg-3">
                    <img src="${imagen}" class="card-img-top" alt="${nombre.toUpperCase()}">
                    <div class="card-body text-start">
                        <h3 class="card-title text-primary text-start">$${precio}</h3>
                        <p class="card-text">${nombre.toUpperCase()}</p>
                        <button onclick="seleccionarProducto(${id})" class="btn btn-primary w-100 mt-2">Ver Producto</button>
                    </div>
                </div>`;
            });
            document.getElementById("contenido").innerHTML = salida;
        }
    } catch (error) {
        mostrarErrorEnDOM(error);
    }
}

async function renderizarProductosAPI() {
    try {
        let productos = await obtenerProductosAPI();           
        let salida = '<h3 class="text-primary text-center text-uppercase">Llegando a la Argentina próximamente</h3>';      
        productos.forEach(producto => {
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

async function renderizarProductoSeleccionado() {
    await loader(null);
    try {
        let producto = obtenerProductoSeleccionado();
        let {nombre,categoria,precio,imagen} = producto;
        let salida = `
        <div class="d-sm-flex col-11 align-items-center">
            <div class="col-12 col-sm-5 col-md-6 col-lg-5"> 
                <img class="img-fluid" src="${imagen}" alt="${nombre.toUpperCase()}"> 
            </div>
            <div class="col-12 col-sm-7 col-md-6 col-lg-7 pt-1 pt-sm-0 px-2">
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
                    <button onclick="consultarStock()" class="btn btn-primary d-block m-auto w-50 mt-4"><i class="fa-solid fa-cart-shopping me-2"></i>AGREGAR</button>
                </div>
            </div>
        </div>`;
        document.getElementById("contenido").innerHTML = salida;
        mostrarUnidadesDisponiblesSeleccion();
    } catch (error) {
        mostrarErrorEnDOM(error);
    }
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
    return parseInt(document.getElementById("unidadesProducto").value);
}

function obtenerUnidadesDisponiblesSeleccion() {
    let productos = obtenerProductos();
    let posicion = productos.findIndex(e => e.id == obtenerProductoSeleccionado().id);
    return parseInt(productos[posicion].cantidad);
}

function mostrarUnidadesDisponiblesSeleccion() {
    let campoUnidades = document.getElementById("unidadesDisponibles");
    if (campoUnidades) {
        let mensaje = obtenerUnidadesDisponiblesSeleccion() > 1 || obtenerUnidadesDisponiblesSeleccion() == 0 ? "UNIDADES DISPONIBLES" : "UNIDAD DISPONIBLE";
        campoUnidades.innerHTML = `${obtenerUnidadesDisponiblesSeleccion()} ${mensaje}`;
    }
}

function eliminarCantidadProducto(cantidad) {
    let productos = obtenerProductos();
    let posicionEnProductos = productos.findIndex(e => e.id === obtenerProductoSeleccionado().id);
    productos[posicionEnProductos].cantidad -= cantidad;
    guardarProductos(productos);
}