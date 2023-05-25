//COMENZANDO EL ARMADO DEL ECCOMERCE

let usuario = prompt("¡Bienvenido/a a nuestro E-COMMERCE!\n\nIngrese C para ingresar como CLIENTE o A para ADMINISTRADOR").toLocaleUpperCase();

const productos = [];

class Producto {
    constructor(categoria,nombre,precio) {
        this.id = productos.length + 1;
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.disponible = true;
        productos.push(this);
    }
    mostrarEnConsola() {
        console.log("El precio de " + this.nombre + " es: $" + this.precio);
    }
    eliminarProducto() {
        productos.splice(this,1);
    }
}

const budinVainilla = new Producto("budines","budín de vainilla",1500);
const budinChocolate = new Producto("budines","budín de chocolate",1600);
const budinBanana = new Producto("budines","budín de banana",1700);

console.log(productos);
console.log("Hay " + productos.length + " productos cargados en el array");
productos.forEach(producto => {
    producto.mostrarEnConsola();
});

let productoElegido;

function elegirProducto() {
    let salida = "\n";
    for(producto of productos) {
        salida += "#" + producto.id + " - " + producto.nombre + "\n";
    }
    let productoElegido = prompt("Elija un producto\n" + salida + "\nEscriba volver para ir al menú").toLocaleUpperCase();
    if (productoElegido === "VOLVER") {
        usuario = prompt("Ingrese C para ingresar como CLIENTE o A para ADMINISTRADOR").toLocaleUpperCase();
        return validarUsuario();
    }
    return parseInt(productoElegido);
}

function enlazarProducto(producto) {
    if(productos.find(e => e.id === producto)) {
        let seleccion = productos.filter(e => e.id === producto);
        for(let e of seleccion) {
            alert("Llevarás un(a) " + e.nombre + " por $" + e.precio);
        }
    } else {
        alert("Introduzca un producto válido");
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
    alert("Usted agregó el producto #" + productos[productos.length-1].id + " llamado " + productos[productos.length-1].nombre + " por un valor de $" + productos[productos.length-1].precio);
    console.log(productos);
    return validarUsuario();
}

function eliminarProductoPorID() {
    let idProductoParaEliminar = parseInt(prompt("Ingrese el ID"));
    let paraBorrar = productos.indexOf(productos.find(e => e.id === idProductoParaEliminar));
    if (paraBorrar < 0) {
        alert("No se encontró el producto");
        return
    }
    let decisionBorrado = confirm("Se eliminará " + productos[paraBorrar].nombre + ", acepte para continuar o cancele para mantener el producto.");
    if (decisionBorrado) {
        productos.splice(paraBorrar,1);
    }
    console.log(productos);
    return validarUsuario();
}

function eliminarProducto() {
    let productoParaEliminar = prompt("1 - Eliminar mediante número de ID\n2 - Eliminar mediante nombre del producto\n\nEscriba volver para ir al menú").toUpperCase();
    switch (productoParaEliminar) {
        case "1":
            return eliminarProductoPorID();
            break;
        case "2": 
            return eliminarProductoPorNombre();
            break;
        case "VOLVER":
            return validarUsuario();
            break;
        default:
            alert("Introduzca una opción válida.");
            return eliminarProducto();
            break;
    }
}


function validarUsuario() {
    switch (usuario) {
        case "A":
            return usuarioAdministrador();
            break;
            case "C":
                return usuarioCliente();
                break;
                default:
                    alert("Introduzca una opción válida.");
                    usuario = prompt("¡Bienvenido/a!\nIngrese C para ingresar como CLIENTE o A para ADMINISTRADOR").toLocaleUpperCase();
                    return validarUsuario();
                    break;
                }
}
            
validarUsuario();

function usuarioCliente() {
    productoElegido = elegirProducto();
    enlazarProducto(productoElegido);
}

function usuarioAdministrador() {
    funcion = prompt("Estás en el panel de administrador\n\n1 - Agregar nuevo producto\n2 - Eliminar producto\n\nEscriba volver para ir al menú").toUpperCase();
            switch (funcion) {
                case "1":
                    return agregarNuevoProducto();
                    break;
                case "2":
                    return eliminarProducto();
                    break;
                case "VOLVER":
                    usuario = prompt("Ingrese C para ingresar como CLIENTE o A para ADMINISTRADOR").toLocaleUpperCase();
                    return validarUsuario();
                    break;
                default:
                    alert("Error, ingrese una función válida");
                    return usuarioAdministrador();
                    break;
            }
}