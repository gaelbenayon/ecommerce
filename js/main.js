//CALCULADORA DE PRECIOS (IVA, CUPONES DE DESCUENTO, FINANCIACIÓN EN CUOTAS)

let cantidadPrecios = parseInt(prompt("Bienvenido/a a la calculadora de precios finales con IVA, descuentos y financiación en cuotas \n \n ¿Cuántos valores ingresará?"));

for (i=1; i <= cantidadPrecios; i++) {
    if (cantidadPrecios === i) {
        calcularIVA();
        confirm("¿Quiere calcular otro producto más?") ? calcularIVA() : alert("Gracias por operar con nosotros");
    } else {
        calcularIVA();
    }
}

function calcularIVA() {
    let precioSinIVA = parseFloat(prompt("Ingrese el valor del producto sin IVA:"));
    let precioConIVA = precioSinIVA * 1.21;
    if (precioConIVA > 0) {
        calcularDescuento(precioConIVA);
    } else {
        alert("Ingrese un valor mayor a $0");
        calcularIVA();
    }
}

function calcularDescuento(valorConIVA) {
    let codigoDescuento = prompt("Ingrese su código de descuento o presione enter para avanzar al siguiente paso: \n \n 10OFF \n 25OFF \n 50OFF \n 2X1").toUpperCase();
    let precioFinal;
    let productoGratis = false;
    switch (codigoDescuento) {
        case "10OFF":
            precioFinal = valorConIVA * 0.90;
            calcularCuotas(precioFinal);
            break;
        case "25OFF":
            precioFinal = valorConIVA * 0.75;
            calcularCuotas(precioFinal);
            break;
        case "50OFF":
            precioFinal = valorConIVA * 0.50;
            calcularCuotas(precioFinal);
            break;
        case "2X1":
            precioFinal = valorConIVA;
            productoGratis = true;
            calcularCuotas(precioFinal);
            // alert("Te llevás un producto gratis :)")
            break;
        default:
            alert("No has ingresado ningún cupón válido")
            precioFinal = valorConIVA;
            calcularCuotas(precioFinal);
            break;
    } 
}

function calcularCuotas(valor) {
    let cantidadCuotas = parseInt(prompt("¿En cuántas cuotas va a financiar el pago? \n \n 1 (sin interés) \n 3 (+25%) \n 6 (+60%)"));
    let precioFinanciado;
    let interes;
    let valorCuotas;
    switch (cantidadCuotas) {
        case 1:
            precioFinanciado = valor;
            valorCuotas = precioFinanciado;
            informarPrecioFinal(precioFinanciado, cantidadCuotas, valorCuotas);
            break;
        case 3:
            interes = 1.25;
            precioFinanciado = valor * interes;
            valorCuotas = precioFinanciado / cantidadCuotas;
            informarPrecioFinal(precioFinanciado, cantidadCuotas, valorCuotas);
            break;
        case 6:
            interes = 1.6;
            precioFinanciado = valor * interes;
            valorCuotas = precioFinanciado / cantidadCuotas;
            informarPrecioFinal(precioFinanciado, cantidadCuotas, valorCuotas);
            break;
        default:
            alert("Ingrese una financiación aceptada");
            calcularCuotas(valor);
            break;
    }
}

function informarPrecioFinal(precio,cantCuota,valorCuota) {
    alert("El precio final, con IVA y descuentos (si aplican), es de $" + precio.toFixed(2) + "\n \nLa financiación es de " + cantCuota + " cuota/s de $" + valorCuota.toFixed(2))
}
