//COMENZANDO EL ARMADO DEL ECCOMERCE PARA EL PROYECTO FINAL

const productos = [];
const carrito = [];

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
        if (this.cantidad > 0) {
            return disponibilidad = true;
        } else {
            return disponibilidad = false;
        }
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

const budinLimon = new Producto("budines","budín de limón",1500,3,"budinLimon.png");
const budinMarmolado = new Producto("budines","budín marmolado",1700,0,"budinMarmolado.png");
const budinNaranja = new Producto("budines","budín de naranja",1600,1,"budinNaranja.png");
const chocotorta = new Producto("tortas","chocotorta",4500,1,"chocotorta.png");

function mostrarProductos() {
    let productos = cargarProductosLS();
    let salida = "";
    productos.forEach(producto => {
        salida += `
        <div class="card col-3">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre.toUpperCase()}">
            <div class="card-body">
                <h5 class="card-title">$${producto.precio}</h5>
                <p class="card-text">${producto.nombre.toUpperCase()}</p>
                <button onclick="verProducto(${producto.id})" class="btn btn-primary">Ver más información</button>
            </div>
        </div>
        `;
    });
    document.getElementById("contenido").innerHTML = salida;
}

function verProducto(id) {
    let productos = cargarProductosLS();
    
    let producto = productos.filter(item => item.id === id);
    localStorage.setItem("producto", JSON.stringify(producto));
    // guardarProductosLS();
    console.log(producto);
    location.href="producto.html";
    renderProducto();
}

mostrarProductos();