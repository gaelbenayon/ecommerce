//COMENZANDO EL ARMADO DEL ECCOMERCE

const productos = [];

class Producto {
    constructor(id,nombre,precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.disponible = true;
        productos.push(this);
    }
    mostrarEnConsola() {
        console.log("El precio de " + this.nombre + " es: $" + this.precio);
    }
}

new Producto(1,"budín de vainilla",1500);
new Producto(2,"budín de chocolate",1600);
new Producto(3,"budín de banana",1700);

console.log(productos);
console.log("Hay " + productos.length + " productos cargados en el array");
productos.forEach(producto => {
    producto.mostrarEnConsola();
});

function elegirProducto() {
    let productoElegido = prompt("Elija un producto mediante el NÚMERO de ID\n\n#1 - budín de vainilla\n#2 - budín de chocolate\n#3 - budín de banana");
    return parseInt(productoElegido);
}

let productoElegido = elegirProducto();

function enlazarProducto(producto) {
    if(productos.find(e => e.id === producto)) {
        let seleccion = productos.filter(e => e.id === producto);
        for(let e of seleccion) {
            alert("Llevarás un " + e.nombre + " por $" + e.precio);
        }
    } else {
        alert("Introduzca un producto válido");
    }
}

enlazarProducto(productoElegido);

// let cantidadPrecios = parseInt(prompt("Bienvenido/a a la calculadora de precios finales con IVA, descuentos y financiación en cuotas \n \n ¿Cuántos valores ingresará?",1));

// while (isNaN(cantidadPrecios) || cantidadPrecios <= 0) {
//     alert("Por favor, ingrese una cantidad válida.");
//     cantidadPrecios = parseInt(prompt("Bienvenido/a a la calculadora de precios finales con IVA, descuentos y financiación en cuotas \n \n ¿Cuántos valores ingresará?",1));
// } 

// function calcularPrecioConIVA() {
//     let precioSinIVA = parseFloat(prompt("Ingrese el valor del producto sin IVA:"));
//     if (isNaN(precioSinIVA) || precioSinIVA <= 0) {
//         alert("Ingrese un valor mayor a $0");
//         return calcularPrecioConIVA();
//     } else {
//         let precioConIVA= 0;
//         precioConIVA = precioSinIVA * 1.21;
//         return precioConIVA;
//     }    
// }

// function calcularDescuento(valorConIVA) {
//     let cuponDescuento = prompt("Ingrese su código de descuento o presione enter para avanzar al siguiente paso: \n \n 10OFF \n 25OFF \n 50OFF \n 2X1").toUpperCase();
//     let valorDescuento = 0;
//     let productoGratis = false;
//     switch (cuponDescuento) {
//         case "10OFF":
//             valorDescuento = valorConIVA * 0.10;
//             break;
//         case "25OFF":
//             valorDescuento = valorConIVA * 0.25;
//             break;
//         case "50OFF":
//             valorDescuento = valorConIVA * 0.50;
//             break;
//         case "2X1":
//             valorDescuento = 0;
//             productoGratis = true;
//             break;
//         default:
//             alert("No has ingresado ningún cupón válido");
//             valorDescuento = 0;
//             break;
//     } 
//     if (productoGratis) {
//         alert("¡Te llevas gratis otro producto igual al elegido, por la oferta de 2X1!");
//     }
//     return valorDescuento;
// }

// function calcularPrecioConDescuento(descuento) {
//     let precioConDescuento = 0;
//     precioConDescuento = precioConIVA - descuento;
//     return precioConDescuento;
// }

// function calcularFinanciacion(valorConDescuento,cuotas) {
//     let precioFinanciado = 0;
//     let interes = 0;
//     switch (cuotas) {
//         case 1:
//             interes = 1;
//             precioFinanciado = valorConDescuento * interes;
//             break;
//         case 3:
//             interes = 1.25;
//             precioFinanciado = valorConDescuento * interes;
//             break;
//         case 6:
//             interes = 1.6;
//             precioFinanciado = valorConDescuento * interes;
//             break;
//         default:
//             alert("Ingrese una financiación aceptada");
//             cantidadCuotas = parseInt(prompt("¿En cuántas cuotas va a financiar el pago? \n \n 1 (sin interés) \n 3 (+25%) \n 6 (+60%)"));
//             return calcularFinanciacion(precioConDescuento,cantidadCuotas);
//     }
//     return precioFinanciado;
// }

// function calcularValorCuota(valorFinanciado,cuotas) {
//     let valorPorCuota = 0;
//     valorPorCuota = valorFinanciado / cuotas;
//     return valorPorCuota;
// }

// function informarPrecioFinal(precio,descuento,precioCuota) {
//     if (descuento > 0) {
//         alert("El precio final, con IVA, descuentos y recargos (si aplican), es de $" + precio.toFixed(2) + "\n\nEstás ahorrando $" + descuento.toFixed(2) + "\n\nLa financiación es de " + cantidadCuotas + " cuota/s de $" + precioCuota.toFixed(2));
//     } else {
//         alert("El precio final, con IVA y recargos (si aplican), es de $" + precio.toFixed(2) + "\n\nConseguí cupones para ahorrar en tu próxima compra \n\nLa financiación es de " + cantidadCuotas + " cuota/s de $" + precioCuota.toFixed(2));
//     }
// }

// let precioConIVA;
// let valorDescuento;
// let precioConDescuento;
// let cantidadCuotas;
// let precioFinanciado;
// let valorPorCuota;
// let precioFinal;

// for (let i = 1; i <= cantidadPrecios; i++) {
//     precioConIVA = calcularPrecioConIVA();
//     valorDescuento = calcularDescuento(precioConIVA);
//     precioConDescuento = calcularPrecioConDescuento(valorDescuento);
//     cantidadCuotas = parseInt(prompt("¿En cuántas cuotas va a financiar el pago? \n \n 1 (sin interés) \n 3 (+25%) \n 6 (+60%)"));
//     precioFinanciado = calcularFinanciacion(precioConDescuento,cantidadCuotas);
//     valorPorCuota = calcularValorCuota(precioFinanciado,cantidadCuotas);
//     precioFinal = informarPrecioFinal(precioFinanciado,valorDescuento,valorPorCuota);
//     if (i === cantidadPrecios) {
//         let agregarProducto = confirm("¿Quiere agregar otro producto?");
//         if (agregarProducto) {
//             precioConIVA = calcularPrecioConIVA();
//             valorDescuento = calcularDescuento(precioConIVA);
//             precioConDescuento = calcularPrecioConDescuento(valorDescuento);
//             cantidadCuotas = parseInt(prompt("¿En cuántas cuotas va a financiar el pago? \n \n 1 (sin interés) \n 3 (+25%) \n 6 (+60%)"));
//             precioFinanciado = calcularFinanciacion(precioConDescuento,cantidadCuotas);
//             valorPorCuota = calcularValorCuota(precioFinanciado,cantidadCuotas);
//             precioFinal = informarPrecioFinal(precioFinanciado,valorDescuento,valorPorCuota);
//         } else {
//             alert("¡Gracias por operar con nosotros!");
//         }
//     }
// }