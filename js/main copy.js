//COMENZANDO EL ARMADO DEL ECCOMERCE PARA EL PROYECTO FINAL

const productos = [];
const carrito = [];
const contenido = document.getElementById("contenido");

class Producto {
    constructor(categoria,nombre,precio,cantidad) {
        this.id = productos.length + 1;
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
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

const budinVainilla = new Producto("budines","budín de vainilla",1500,3);
const budinChocolate = new Producto("budines","budín de chocolate",1700,0);
const budinBanana = new Producto("budines","budín de banana",1600,1);
const chocotorta = new Producto("tortas","chocotorta",4500,1);

function mostrarTodo(array) {
    let salida = "";
    for (item of array) {
        salida += `#${item.id} "${item.nombre}" - $${item.precio} | (${item.cantidad} unidades disponibles)\n`;
    } 
    return salida;
}

mostrarTodo(productos);

function cantidadProductos() {
    return productos.length;
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
        alert(`Hay ${coincidenciasNombre.length} coincidencias de productos con ese nombre, elija una con el número de ID e ingréselo a continuación\n\n${mostrarTodo(coincidenciasNombre)}`);
        return enlazarPorID();
    }
}

function usuarioAdministrador() {
    let funcionAdministrador = prompt("Estás en el panel de administrador\n\n1 - Agregar nuevo producto\n2 - Agregar stock a un producto\n3 - Eliminar stock de un producto\n4 - Eliminar producto de la tienda\n5 - Panel de productos\n\nEscriba volver para ir al menú").toUpperCase();
    switch (funcionAdministrador) {
        case "1":
            return agregarNuevoProducto();
            break;
        case "2":
            return agregarStockProducto();
            break;
        case "3":
            return eliminarStockProducto();
            break;
        case "4":
            return eliminarProducto();
            break;
        case "5":
            return panelProductos();
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

function agregarNuevoProducto() {
    let categoriaNuevoProducto = prompt("Ingrese la categoría a la que corresponde el producto");
    if (!isNaN(categoriaNuevoProducto)) {
        alert("Debe ingresar una o más palabras");
        return agregarNuevoProducto();
    }
    let nombreNuevoProducto = prompt("Escriba el nombre del nuevo producto");
    if (!isNaN(nombreNuevoProducto)) {
        alert("Debe ingresar una o más palabras");
        return agregarNuevoProducto();
    }
    let precioNuevoProducto = parseFloat(prompt("Ingrese el precio del nuevo producto"));
    if (precioNuevoProducto <= 0) {
        alert("El precio debe ser mayor a $0");
        return agregarNuevoProducto();
    }
    let unidadesNuevoProducto = parseInt(prompt("Ingrese la cantidad de unidades para agregar en el stock"));
    if (unidadesNuevoProducto < 0) {
        alert("La cantidad mínima de unidades es 0");
        return agregarNuevoProducto();
    }
    let nuevoProducto = new Producto(categoriaNuevoProducto,nombreNuevoProducto,precioNuevoProducto,unidadesNuevoProducto);
    alert(nuevoProducto.mostrarInformacion());
    return usuarioAdministrador();
}

function agregarStockProducto() {
    let posicionProducto = enlazarProducto();
    let confirmacion = confirm(`Producto seleccionado: ${productos[posicionProducto].nombre}`);
    if (confirmacion) {
        let cantidadStock = parseInt(prompt("¿Cuántas unidades quiere agregar al stock?"));
        if (cantidadStock > 0) {
            productos[posicionProducto].agregarStock(cantidadStock);
            alert(productos[posicionProducto].mostrarInformacion());
            return usuarioAdministrador();
        } else {
            alert("Agregue al menos 1 producto");
            return agregarStockProducto();
        } 
    } else {
        return agregarStockProducto();
    }
}

function eliminarStockProducto() {
    let posicionProducto = enlazarProducto();
    let confirmacion = confirm(`Producto seleccionado: ${productos[posicionProducto].nombre}`);
    if (confirmacion) {
        let cantidadStock = parseInt(prompt("¿Cuántas unidades quiere eliminar del stock?"));
        if (cantidadStock <= productos[posicionProducto].cantidad) {
            productos[posicionProducto].eliminarStock(cantidadStock);
            alert(productos[posicionProducto].mostrarInformacion());
            return usuarioAdministrador();
        } else {
            alert("No puedes eliminar más productos de los que hay cargados, verifique la disponibilidad.");
        }
    } else {
        alert("La operación ha sido cancelada.");
        return eliminarStockProducto();
    }
}

function eliminarProducto() {
    let posicionProducto = enlazarProducto();
    let confirmacion = confirm(`Producto seleccionado: ${productos[posicionProducto].nombre}`);
    if (confirmacion) {
        productos[posicionProducto].eliminarProducto(posicionProducto);
        alert(`Eliminación completada`);
        return usuarioAdministrador();
    } else {
        alert("La operación ha sido cancelada.");
        return eliminarProducto();
    }
}

function panelProductos() {
    let filtroPrecios = prompt(`PANEL DE PRODUCTOS\n\n${mostrarTodo(productos)}\nIngrese A para ordenar los productos por precio ascendete (- a +), o D por precio descendente (+ a -). Escriba volver para ir al panel de administrador`).toUpperCase();
    switch (filtroPrecios) {
        case "A":
            let preciosAscendentes = ordenAscendentePrecios();
            alert(`Precios ordenados de menor a mayor:\n\n${mostrarTodo(preciosAscendentes)}`);
            return panelProductos();
            break;
        case "D":
            let preciosDescendentes = ordenDescendentePrecios();
            alert(`Precios ordenados de mayor a menor:\n\n${mostrarTodo(preciosDescendentes)}`);
            return panelProductos();
            break;
        case "VOLVER":
            return usuarioAdministrador();
            break;
        default:
            alert("Introduzca una opción válida.");
            return panelProductos();
            break;
    }
}

function ordenAscendentePrecios() {
    let preciosAscendentes = productos.slice(0,productos.length);
    preciosAscendentes.sort((a,b) => {
        if (a.precio > b.precio) {
            return 1;
        }
        if (a.precio < b.precio) {
            return -1;
        }
        return 0;
    });
    return preciosAscendentes;
}

function ordenDescendentePrecios() {
    let preciosDescendentes = productos.slice(0,productos.length);
    preciosDescendentes.sort((a,b) => {
        if (a.precio > b.precio) {
            return -1;
        }
        if (a.precio < b.precio) {
            return 1;
        }
        return 0;
    });
    return preciosDescendentes;
}

function usuarioCliente() {
    let funcionCliente = prompt("1 - Ver tienda\n2 - Ver mi carrito\n\nEscriba volver para ir al menú principal").toUpperCase();
    switch (funcionCliente) {
        case "1":
            return irTienda();
            break;
        case "2":
            return verCarrito();
            break;
        case "VOLVER":
            return validarUsuario();
            break;
        default:
            alert("Introduzca una opción válida");
            return usuarioCliente();
            break;
    }
}

function irTienda() {
    const productosDisponibles = productos.filter(e => e.cantidad > 0);
    if (productosDisponibles.length > 0) {
        alert(`PRODUCTOS DISPONIBLES\n\n${mostrarTodo(productosDisponibles)}\nIntroduzca el ID a continuación`);
        let producto = enlazarPorID();
        if (productos[producto].obtenerDisponibilidad()) {
            let confirmacion = confirm(`Llevarás 1 ${productos[producto].nombre} - $${productos[producto].precio}`);
            if (confirmacion) {
                productos[producto].cantidad--;
                productos[producto].mostrarInformacion();
                carrito.push(productos[producto]);
                return irTienda();
            } else {
                alert("Cancelaste la operación.");
                return usuarioCliente();
            }
        } else {
            alert("El producto no se encuentra en stock.");
            return usuarioCliente();
        }
    } else {
        alert("No hay productos disponibles en la tienda");
        return usuarioCliente();
    }
}

function verCarrito() {
    if (carrito.length > 0) {
        alert(`PRODUCTOS SELECCIONADOS\n\n${mostrarTodo(carrito)}\nTOTAL: $${totalCarrito()}`);
        return usuarioCliente();
    }  else {
        alert("No hay productos en el carrito");
        return usuarioCliente();
    }
}

function totalCarrito() {
    return carrito.reduce((total,producto) => total += producto.precio,0);
}

function validarUsuario() {
    let usuario = prompt("¡Bienvenido/a a nuestro E-COMMERCE!\n\nIngrese C para ingresar como CLIENTE o A para ADMINISTRADOR").toUpperCase();
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
            
// validarUsuario();