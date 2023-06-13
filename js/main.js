const productos = [];

class Producto {
    constructor(categoria,nombre,precio,cantidad,imagen) {
        this.id = productos.length + 1;
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.imagen = `../assets/productos/${imagen}`;
        if (isNaN(categoria) && isNaN(nombre) && precio > 0 && cantidad >= 0) {
            productos.push(this);
            console.log(`Se agregó el producto #${this.id} - ${this.nombre}`);
        } else {
            console.error("No se agregó el producto porque se ingresaron datos inválidos");
            alert("Por favor, introduzca los datos de manera correcta");
        }
    }

    mostrarInformacion() {
        return `El precio del producto #${this.id} "${this.nombre}" es $${this.precio}\nQuedan ${this.cantidad} unidades disponibles`;
    }

    obtenerDisponibilidad() {
        let disponibilidad;
        this.cantidad > 0 ? disponibilidad = true : disponibilidad = false;
    }

    agregarStock(cantidad) {
        return this.cantidad += cantidad;
    }

    eliminarStock(cantidad) {
        if (this.cantidad >= cantidad) {
            return this.cantidad -= cantidad;
        } else {
            alert("No puedes eliminar más productos de los que hay cargados, verifique la disponibilidad.");
        }
    }

    eliminarProducto(posicion) {
        productos.splice(posicion,1);
    }
}

const budinLimon = new Producto("budines","budin de limon",1500,3,"budinLimon.png");
const budinMarmolado = new Producto("budines","budin marmolado",1700,0,"budinMarmolado.png");
const budinNaranja = new Producto("budines","budin de naranja",1600,1,"budinNaranja.png");
const chocotorta = new Producto("tortas","chocotorta",4500,1,"chocotorta.png");

function guardarProductos() {
    localStorage.setItem("productos",JSON.stringify(productos));
    console.log("Productos guardados");
}

guardarProductos();

function obtenerProductos() {
    return JSON.parse(localStorage.getItem("productos"));
}

function obtenerCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    return carrito;
}

obtenerCarrito();

function abrirCarrito() {
    console.log(obtenerCarrito());
    // obtenerCarrito() != null ? mostrarCarrito() : alert("El carrito está vacío");
}

function mostrarCarrito() {
    let productos = obtenerProductos();
    console.log(obtenerCarrito());
    obtenerCarrito().forEach(elemento => {
        console.log(productos.indexOf(elemento));
    });
}

function mostrarProductos() {
    let salida = "";
    productos.forEach(producto => {
        const {imagen, nombre, precio, id} = producto;
        salida += `
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3">
            <img style="width:100%" src="${imagen}" class="card-img-top" alt="${nombre.toUpperCase()}">
            <div class="card-body">
                <h5 class="card-title">$${precio}</h5>
                <p class="card-text">${nombre.toUpperCase()}</p>
                <button onclick="seleccionarProducto(${id})" class="btn btn-primary">VER INFO.</button>
            </div>
        </div>
        `;
    });
    document.getElementById("contenido").innerHTML = salida;
}

mostrarProductos();

function seleccionarProducto(id) {
    let productos = obtenerProductos();
    let producto = productos.find(e => e.id === id);
    sessionStorage.setItem("productoSeleccionado",JSON.stringify(producto));
    location.href = "producto.html";
}