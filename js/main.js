//COMENZANDO EL ARMADO DEL ECCOMERCE PARA EL PROYECTO FINAL

const productos = [];

class Producto {
    constructor(categoria,nombre,precio) {
        this.id = productos.length + 1;
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = 1;
        productos.push(this);
    }
    mostrarEnConsola() {
        console.log("El precio de " + this.nombre + " es: $" + this.precio);
    }
    mostrarDisponibilidad() {
        let disponibilidad;
        console.log(`Quedan ${this.cantidad} ${this.nombre}`);
        if (this.cantidad > 0) {
            console.log(`Disponibilidad: ${disponibilidad = true}`);
        } else {
            console.log(`Disponibilidad: ${disponibilidad = false}`);
        }
        return disponibilidad;
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
    eliminarProducto() {
        productos.splice(this,1);
    }
}

const budinVainilla = new Producto("budines","budín de vainilla",1500);
const budinChocolate = new Producto("budines","budín de chocolate",1600);
const budinBanana = new Producto("budines","budín de banana",1700);

console.log(productos);
console.log(`Hay ${productos.length} productos cargados en el array`);
productos.forEach(producto => {
    producto.mostrarEnConsola();
});

function elegirProductoParaComprar() {
    let productosDisponibles = productos.filter(e => e.cantidad > 0);
    let salida = "\n";
    for(let producto of productosDisponibles) {
        salida += "#" + producto.id + " - " + producto.nombre + "\n";
    }
    if (productosDisponibles.length === 0) {
        salida += "No hay productos disponibles...\n";
        alert(salida);
        return validarUsuario();
    }
    alert(`Elija un producto ingresando el número de ID a continuación\n ${salida}`);
}

function enlazarProducto() {
    let metodoDeIdentificacion = prompt("1 - ID del producto\n2 - Nombre del producto\n\nEscriba volver para ir al menú principal").toUpperCase();
    switch (metodoDeIdentificacion) {
        case "1":
            return enlazarPorID();
            break;
        case "2":
            return enlazarPorNombre();
            break;
        case "VOLVER":
            return validarUsuario();
            break;
        default:
            alert("Introduzca una opción válida.");
            return enlazarProducto();
            break;
    }
}

function enlazarPorID(){
    let idParaEnlazar = prompt("Ingrese el número de ID del producto\n\nEscriba volver para ir al menú principal").toUpperCase();
    if (idParaEnlazar === "VOLVER") {
        return validarUsuario();
    } else {
        let seleccion = productos.find(e => e.id === parseInt(idParaEnlazar));
        if(seleccion) {
            return seleccion = productos.indexOf(seleccion);
        } else {
            alert("Introduzca un producto válido");
            return enlazarPorID();
        }
    }
}

function enlazarPorNombre() {
    let nombreProducto = prompt("Ingrese el nombre del producto");
    let coincidenciasNombre = productos.filter(e => e.nombre.toUpperCase() === nombreProducto.toUpperCase());
    if (coincidenciasNombre.length === 0) {
        alert("No hubo coincidencias encontradas, por favor intente nuevamente con otro nombre.");
        return enlazarPorNombre();
    } else {
        let salida = "\n";
        for (producto of coincidenciasNombre) {
            salida += "#" + producto.id + " - " + producto.nombre + " $" + producto.precio + " (" + producto.cantidad + " unidades disponibles)\n";
        }
        alert(`Hay ${coincidenciasNombre.length} coincidencias de productos con ese nombre, elija una con el número de ID e ingréselo a continuación\n ${salida}`);
        return enlazarPorID();
    }
}

function agregarNuevoProducto() {
    let categoriaNuevoProducto = prompt("Ingrese la categoría a la que corresponde el producto");
    let nombreNuevoProducto = prompt("Escriba el nombre del nuevo producto");
    let precioNuevoProducto = parseFloat(prompt("Ingrese el precio del nuevo producto"));
    if (precioNuevoProducto <= 0) {
        alert("El precio debe ser mayor a $0");
        return agregarNuevoProducto();
    }
    new Producto (categoriaNuevoProducto,nombreNuevoProducto,precioNuevoProducto);
    alert(`Usted agregó el producto #${productos[productos.length-1].id} llamado ${productos[productos.length-1].nombre} por un valor de $${productos[productos.length-1].precio}`);
    console.log(productos);
    return usuarioAdministrador();
}

function agregarStockProducto() {
    let productoStock = enlazarProducto();
    let confirmacion = confirm(`El producto seleccionado es #${productos[productoStock].id} - ${productos[productoStock].nombre} | ${productos[productoStock].precio}`);
    if (confirmacion) {
        let cantidadStock = parseInt(prompt("Ingrese la cantidad de unidades que desea agregar."));
        if (cantidadStock < 1) {
            alert("Debe añadir al menos 1 producto.");
            return agregarStockProducto();
        } else {
            productos[productoStock].agregarStock(cantidadStock);
            productos[productoStock].mostrarDisponibilidad();
        }
    } else {
        alert("La operación ha sido cancelada.");
        return eliminarProducto();
    }
    return usuarioAdministrador();
}

function eliminarStockProducto() {
    let productoEliminarStock = enlazarProducto();
    let confirmacion = confirm(`El producto seleccionado es #${productos[productoEliminarStock].id} - ${productos[productoEliminarStock].nombre} | ${productos[productoEliminarStock].precio}`);
    if (confirmacion) {
        let cantidadStockEliminar = parseInt(prompt("Ingrese la cantidad de unidades que desea eliminar."));
        productos[productoEliminarStock].eliminarStock(cantidadStockEliminar);
        productos[productoEliminarStock].mostrarDisponibilidad();
        return usuarioAdministrador();
    } else {
        alert("La operación ha sido cancelada.");
        return eliminarStockProducto();
    }
}

function eliminarProducto() {
    let productoParaEliminar = enlazarProducto();
    let confirmacion = confirm(`El producto a eliminar es #${productos[productoParaEliminar].id} - ${productos[productoParaEliminar].nombre} | ${productos[productoParaEliminar].precio}`);
    if (confirmacion) {
        productos.splice(productoParaEliminar,1);
        console.log(productos);
    } else {
        alert("La operación ha sido cancelada.");
        return eliminarProducto();
    }
    return usuarioAdministrador();
}

function validarUsuario() {
    let usuario = prompt("¡Bienvenido/a a nuestro E-COMMERCE!\n\nIngrese C para ingresar como CLIENTE o A para ADMINISTRADOR").toLocaleUpperCase();
    switch (usuario) {
        case "A":
            return usuarioAdministrador();
            break;
        case "C":
            return usuarioCliente();
            break;
        default:
            alert("Introduzca una opción válida.");
            return validarUsuario();
            break;
    }
}
            
validarUsuario();

function usuarioCliente() {
    elegirProductoParaComprar();
    let producto = enlazarPorID();
    if (productos[producto].cantidad > 0) {
        let chequeo = confirm(`Llevarás 1 ${productos[producto].nombre} - $${productos[producto].precio}`);
        if (chequeo) {
            productos[producto].cantidad--;
            productos[producto].mostrarDisponibilidad();
            return usuarioCliente();
        } else {
            alert("Cancelaste la operación.");
            return usuarioCliente();
        }
    } else {
        alert("El producto no se encuentra en stock.");
        return usuarioCliente();
    }
}

function usuarioAdministrador() {
    funcion = prompt("Estás en el panel de administrador\n\n1 - Agregar nuevo producto\n2 - Agregar stock a un producto\n3 - Eliminar stock de un producto\n4 - Eliminar producto de la tienda\n\nEscriba volver para ir al menú").toUpperCase();
        switch (funcion) {
            case "1":
                return agregarNuevoProducto();
                break;
            case "2":
                return agregarStockProducto();
            case "3":
                return eliminarStockProducto();
            case "4":
                return eliminarProducto();
                break;
            case "VOLVER":
                return validarUsuario();
                break;
            default:
                alert("Error, ingrese una función válida");
                return usuarioAdministrador();
                break;
        }
}