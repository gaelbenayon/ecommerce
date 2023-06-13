let producto = JSON.parse(sessionStorage.getItem("productoSeleccionado"));

const {nombre, imagen, precio} = producto;

document.title = `${nombre.toUpperCase()} | Flikita's Bakery`;

function verProducto() {
    let salida = `
    <div class="d-grid d-lg-flex">
        <div class="col-12 col-lg-5 bg-danger"> 
            <img style="width:100%" src="${imagen}"> 
        </div>
        <div class="col-12 col-lg-7 pt-5">
            <div class="d-flex align-items-center flex-column">
                <h2>${nombre.toUpperCase()}</h2>
                <h4 class="text-primary"><b>$${precio}</b></h4>
                <button onclick="agregarAlCarrito(${JSON.stringify(producto)})" class="btn btn-primary mt-3"><i class="fa-solid fa-cart-shopping me-2"></i>AGREGAR</button>
            </div>
        </div>
    </div>`;
    document.getElementById("contenido").innerHTML = salida;
}

verProducto();

function agregarAlCarrito(producto) {
    let item = JSON.parse(producto);
    let carrito = localStorage.getItem("carrito");
    carrito = carrito ? JSON.parse(carrito) : [];
    carrito.push(item);
    localStorage.setItem("carrito",JSON.stringify(carrito));
}