//CALCULADORA DE PRECIOS (IVA, CUPONES DE DESCUENTO, FINANCIACIÓN EN CUOTAS)

let cantidadPrecios = parseInt(prompt("Bienvenido/a a la calculadora de precios finales con IVA, descuentos y financiación en cuotas \n \n ¿Cuántos valores ingresará?"));
let precioSinIVA = parseFloat(prompt("Ingrese el valor del producto sin IVA:"));
let codigoDescuento = prompt("Ingrese su código de descuento o presione enter para avanzar al siguiente paso: \n \n 10OFF \n 25OFF \n 50OFF \n 2X1").toUpperCase();
let cantidadCuotas = parseInt(prompt("¿En cuántas cuotas va a financiar el pago? \n \n 1 (sin interés) \n 3 (+25%) \n 6 (+60%)"));

const calcularIVA = function(montoSinIVA) {
    let precioConIVA = montoSinIVA * 1.21;
    if (precioConIVA > 0) {
        return precioConIVA;
    } else {
        alert("Ingrese un valor mayor a $0");
        calcularIVA(precioSinIVA);
    }
}

const calcularDescuento = function(valorConIVA,cupon) {
    let precioFinal;
    let productoGratis = false;
    switch (cupon) {
        case "10OFF":
            precioFinal = valorConIVA * 0.90;
            break;
        case "25OFF":
            precioFinal = valorConIVA * 0.75;
            break;
        case "50OFF":
            precioFinal = valorConIVA * 0.50;
            break;
        case "2X1":
            precioFinal = valorConIVA;
            productoGratis = true;
            break;
        default:
            alert("No has ingresado ningún cupón válido");
            precioFinal = valorConIVA;
            break;
    } 
    return precioFinal;
}

const calcularFinanciacion = function(valor) {
    let precioFinanciado;
    let interes;
    switch (cantidadCuotas) {
        case 1:
            interes = 1;
            precioFinanciado = valor * interes;
            break;
        case 3:
            interes = 1.25;
            precioFinanciado = valor * interes;
            break;
        case 6:
            interes = 1.6;
            precioFinanciado = valor * interes;
            break;
        default:
            alert("Ingrese una financiación aceptada");
            cantidadCuotas = parseInt(prompt("¿En cuántas cuotas va a financiar el pago? \n \n 1 (sin interés) \n 3 (+25%) \n 6 (+60%)"));
            calcularFinanciacion(calcularDescuento(calcularIVA(precioSinIVA),codigoDescuento));
            break;
    }
    return precioFinanciado;
}

const calcularValorCuota = function(financiacion,cuotas) {
    let valorCuotas = financiacion / cuotas;
    return valorCuotas;
}

const informarTotal = function(precio,precioPorCuota) {
    alert("El precio final, con IVA y descuentos (si aplican), es de $" + precio.toFixed(2) + "\n \nLa financiación es de " + cantidadCuotas + " cuota/s de $" + precioPorCuota.toFixed(2));
}

for (i=1; i <= cantidadPrecios; i++) {
    if (cantidadPrecios === i) {
        calculadora();
        confirm("¿Quiere calcular otro producto más?") ? repetirCalculadora() : alert("Gracias por operar con nosotros");
    } else {
        calculadora();
        precioSinIVA = parseFloat(prompt("Ingrese el valor del producto sin IVA:"));
        codigoDescuento = prompt("Ingrese su código de descuento o presione enter para avanzar al siguiente paso: \n \n 10OFF \n 25OFF \n 50OFF \n 2X1").toUpperCase();
        cantidadCuotas = parseInt(prompt("¿En cuántas cuotas va a financiar el pago? \n \n 1 (sin interés) \n 3 (+25%) \n 6 (+60%)"));
    }
}

function calculadora() {
    informarTotal(calcularFinanciacion(calcularDescuento(calcularIVA(precioSinIVA),codigoDescuento)),calcularValorCuota(calcularFinanciacion(calcularDescuento(calcularIVA(precioSinIVA),codigoDescuento)),cantidadCuotas));
}

function repetirCalculadora() {
    precioSinIVA = parseFloat(prompt("Ingrese el valor del producto sin IVA:"));
    codigoDescuento = prompt("Ingrese su código de descuento o presione enter para avanzar al siguiente paso: \n \n 10OFF \n 25OFF \n 50OFF \n 2X1").toUpperCase();
    cantidadCuotas = parseInt(prompt("¿En cuántas cuotas va a financiar el pago? \n \n 1 (sin interés) \n 3 (+25%) \n 6 (+60%)"));
    informarTotal(calcularFinanciacion(calcularDescuento(calcularIVA(precioSinIVA),codigoDescuento)),calcularValorCuota(calcularFinanciacion(calcularDescuento(calcularIVA(precioSinIVA),codigoDescuento)),cantidadCuotas));
    confirm("¿Quiere calcular otro producto más?") ? repetirCalculadora() : alert("Gracias por operar con nosotros");
}

//PARA VERIFICAR DATOS POR SEPARADO EN LA CONSOLA
// console.log("El valor con IVA es: $" + calcularIVA(precioSinIVA));
// console.log("El valor con descuento es de $" + calcularDescuento(calcularIVA(precioSinIVA),codigoDescuento));
// console.log("El valor financiado es de $" + calcularFinanciacion(calcularDescuento(calcularIVA(precioSinIVA),codigoDescuento)));
// console.log("El valor de cada cuota es de $" + calcularValorCuota(calcularFinanciacion(calcularIVA(precioSinIVA),codigoDescuento),cantidadCuotas));