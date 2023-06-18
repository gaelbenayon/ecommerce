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
        let carrito = obtenerCarrito();
        carrito.splice(posicion,1);
        guardarCarrito(carrito);
    }
}

new Producto("budines","budin de limon",1500,3,"budinLimon.png");
new Producto("budines","budin marmolado",1700,0,"budinMarmolado.png");
new Producto("budines","budin de naranja",1600,1,"budinNaranja.png");
new Producto("tortas","chocotorta",4500,1,"chocotorta.png");
new Producto("tortas","torta de coco y dulce de leche",3200,2,"tortaCoco.png");

guardarProductos(productos);

obtenerCarrito();

mostrarCantidadProductosCarrito();

renderizarProductos(productosDisponibles());