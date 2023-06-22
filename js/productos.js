const productos = [];

class Producto {
    constructor(categoria,nombre,precio,cantidad,imagen) {
        this.id = obtenerProductos().length + 1;
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.imagen = `assets/productos/${imagen}`;
        this.guardarEnLS();
    }

    guardarEnLS() {
        if (isNaN(this.categoria) && isNaN(this.nombre) && this.precio > 0 && this.cantidad >= 0) {
            productos.push(this);
            guardarProductos(productos);
        } else {
            console.error("No se agregó el producto porque se ingresaron datos inválidos");
            console.error("Por favor, introduzca los datos de manera correcta");
        }
    }
}

new Producto("budines","budin de limon",1500,3,"budinLimon.png");
new Producto("budines","budin marmolado",1700,0,"budinMarmolado.png");
new Producto("budines","budin de naranja",1600,1,"budinNaranja.png");
new Producto("tortas","chocotorta",4500,1,"chocotorta.png");
new Producto("tortas","torta de coco y dulce de leche",3200,2,"tortaCoco.png");