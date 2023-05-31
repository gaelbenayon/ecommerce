//COMENZANDO EL ARMADO DEL ECCOMERCE

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
    eliminarProducto() {
        productos.splice(this,1);
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
    agregarStock() {
        let stockParaAgregar = parseInt(prompt("¿Cuántas unidades va a agregar?"));
        this.cantidad += stockParaAgregar;
        return this.cantidad;
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

// function elegirProducto() {
//     let productosDisponibles = productos.filter(e => e.cantidad > 0);
//     let salida = "\n";
//     for(let producto of productosDisponibles) {
//         salida += "#" + producto.id + " - " + producto.nombre + "\n";
//     }
//     if (productosDisponibles.length === 0) {
//         salida += "No hay productos disponibles...\n";
//     }
//     let productoElegido = prompt(`Elija un producto ingresando el número\n ${salida} \nEscriba volver para ir al menú`).toUpperCase();
//     if (productoElegido == "VOLVER") {
//         usuario = prompt("Ingrese C para ingresar como CLIENTE o A para ADMINISTRADOR").toLocaleUpperCase();
//         return validarUsuario();
//     }
//     return enlazarProducto(parseInt(productoElegido));
// }

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

// function enlazarProducto(producto) {
//     let seleccion = productos.find(e => e.id === producto);
//     if(seleccion) {
//         seleccion = productos.indexOf(seleccion);
//         if(productos[seleccion].cantidad > 0) {
//             productos[seleccion].cantidad--;
//             productos[seleccion].mostrarDisponibilidad();
//             alert(`Llevarás un(a) ${productos[seleccion].nombre} por $${productos[seleccion].precio}`);
//         } else {
//             alert(`Lo sentimos, actualmente no tenemos stock de ${productos[seleccion].nombre}`);
//         }
//     } else {
//         alert("Introduzca un producto válido");
//     }
// }

function enlazarProducto() {
    let metodoDeIdentificacion = prompt("1 - ID del producto\n2 - Nombre del producto").toUpperCase();
    switch (metodoDeIdentificacion) {
        case "1":
            return enlazarPorID();
            break;
        case "2":
            return enlazarPorNombre();
            break;
        default:
            alert("Introduzca una opción válida.");
            return enlazarProducto();
            break;
    }
}

function enlazarPorID(){
    let idParaEnlazar = parseInt(prompt("Ingrese el número de ID del producto"));
    let seleccion = productos.find(e => e.id === idParaEnlazar);
    if(seleccion) {
        return seleccion = productos.indexOf(seleccion);
    } else {
        alert("Introduzca un producto válido");
        return enlazarPorID();
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
    return validarUsuario();
}

function agregarStockProducto() {
    let productoParaAgregarStock = prompt("1 - Agregar stock mediante ID del producto\n2 - Agregar stock mediante nombre del producto\n\nEscriba volver para ir al menú").toUpperCase();
    switch (productoParaAgregarStock) {
        case "1":
            return agregarStockProductoPorID();
            break;
        case "2":
            return agregarStockProductoPorNombre();
            break;
        case "VOLVER":
            return validarUsuario();
            break;
        default:
            alert("Introduzca una opción válida.");
            return agregarStockProducto();
            break;
    }
}

function agregarStockProductoPorID() {
    let idProducto = parseInt(prompt("Ingrese el ID del producto al que desea agregarle stock"));
    let cantidadStockParaAgregar = parseInt(prompt("¿Cuántas unidades quiere agregar?"));
    let producto = productos.indexOf(productos.find(e => e.id === idProducto));
    productos[producto].cantidad += cantidadStockParaAgregar;
    console.log(productos);
    return usuarioAdministrador();
}

// function eliminarProductoPorID() {
//     let idProductoParaEliminar = parseInt(prompt("Ingrese el ID"));
//     let paraBorrar = productos.indexOf(productos.find(e => e.id === idProductoParaEliminar));
//     if (paraBorrar < 0) {
//         alert("No se encontró el producto");
//         return
//     }
//     let decisionBorrado = confirm(`Se eliminará ${productos[paraBorrar].nombre}, acepte para continuar o cancele para mantener el producto.`);
//     if (decisionBorrado) {
//         productos[paraBorrar].disponible = false;
//         productos[paraBorrar].cantidad = 0;
//     }
//     console.log(productos);
//     return validarUsuario();
// }

// function eliminarProductoPorNombre() {
//     let nombreProductoParaEliminar = prompt("Ingrese el nombre");
//     let coincidenciasNombre = productos.filter(e => e.nombre.toUpperCase() === nombreProductoParaEliminar.toUpperCase());
//     let salida = "\n";
//     for (producto of coincidenciasNombre) {
//         salida += "#" + producto.id + " - " + producto.nombre + " $" + producto.precio + " (" + producto.cantidad + " unidades disponibles)\n";
//     }

//     alert(`Hay ${coincidenciasNombre.length} coincidencias de productos con ese nombre, elija una con el número de ID e ingréselo a continuación\n ${salida}`);
//     eliminarProductoPorID();
// }

function eliminarProducto() {
    let productoParaEliminar = enlazarProducto();
    let chequeo = confirm(`El producto a eliminar es #${productos[productoParaEliminar].id} - ${productos[productoParaEliminar].nombre} | ${productos[productoParaEliminar].precio}`);
    if (chequeo) {
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
            productos[producto].mostrarDisponibilidad();
            productos[producto].cantidad--;
            console.log(productos);
            return usuarioCliente();
        } else {
            alert("Cancelaste la operación.");
            return usuarioCliente();
        }
    } else {
        alert("El producto no se encuentra en stock.");
        return elegirProductoParaComprar();
    }
}

function usuarioAdministrador() {
    funcion = prompt("Estás en el panel de administrador\n\n1 - Agregar nuevo producto\n2 - Agregar stock a un producto\n3 - Eliminar producto del stock disponible\n\nEscriba volver para ir al menú").toUpperCase();
            switch (funcion) {
                case "1":
                    return agregarNuevoProducto();
                    break;
                case "2":
                    return agregarStockProducto();
                case "3":
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