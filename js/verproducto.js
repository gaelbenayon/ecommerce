function verProducto() {
    let producto = JSON.parse(sessionStorage.getItem("productoSeleccionado"));

    const {nombre, imagen, precio} = producto[0];

    let salida = `
    <div class="d-grid d-lg-flex">
        <div class="col-12 col-lg-5 bg-danger"> 
            <img style="width:100%" src="${imagen}"> 
        </div>
        <div class="col-12 col-lg-7 pt-5">
            <div class="d-flex align-items-center flex-column">
                <h2>${nombre.toUpperCase()}</h2>
                <h4 class="text-primary"><b>$${precio}</b></h4>
                <button onclick="agregarAlCarrito()" class="btn btn-primary mt-3"><i class="fa-solid fa-cart-shopping me-2"></i>AGREGAR</button>
            </div>
        </div>
    </div>`;
    document.getElementById("contenido").innerHTML = salida;
}

verProducto();

const carrito = JSON.parse(sessionStorage.getItem("carrito"));

function agregarAlCarrito() {
    let producto = JSON.parse(sessionStorage.getItem("productoSeleccionado"));
    carrito.push(producto);
    console.log(carrito);
}