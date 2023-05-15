//CALCULADORA DE PRECIOS (IVA, CUPONES DE DESCUENTO, FINANCIACIÓN EN CUOTAS)

function iniciarCalculadora() {
    let cantidadPrecios = parseInt(prompt("Bienvenido/a a la calculadora de precios finales con IVA, descuentos y financiación en cuotas \n \n ¿Cuántos valores ingresará?"));
    for (i=1; i <=cantidadPrecios; i++) {
        function calcularIVA() {
            let precioSinIVA = parseFloat(prompt("Ingrese el valor del producto sin IVA:"));
            if (precioSinIVA > 0) {
                let precioConIVA = precioSinIVA * 1.21;
                return precioConIVA;
            } else {
                alert("Ingrese un valor mayor a $0");
                return calcularIVA();
            }    
        }
        
        function calcularDescuento(valorConIVA) {
            let cuponDescuento = prompt("Ingrese su código de descuento o presione enter para avanzar al siguiente paso: \n \n 10OFF \n 25OFF \n 50OFF \n 2X1").toUpperCase();
            let valorDescuento;
            let productoGratis;
            switch (cuponDescuento) {
                case "10OFF":
                    valorDescuento = valorConIVA * 0.10;
                    break;
                case "25OFF":
                    valorDescuento = valorConIVA * 0.25;
                    break;
                case "50OFF":
                    valorDescuento = valorConIVA * 0.50;
                    break;
                case "2X1":
                    valorDescuento = 0;
                    productoGratis = true;
                    break;
                default:
                    alert("No has ingresado ningún cupón válido");
                    valorDescuento = 0;
                    break;
            } 
            if (productoGratis) {
                alert("¡Te llevas gratis otro producto igual al elegido, por la oferta de 2X1!");
            }
            return valorDescuento;
        }
        
        function calcularPrecioConDescuento(descuento) {
            let precioConDescuento = precioConIVA - descuento;
            return precioConDescuento;
        }
        
        function calcularFinanciacion(valorConDescuento,cuotas) {
            let precioFinanciado;
            let interes;
            switch (cuotas) {
                case 1:
                    interes = 1;
                    precioFinanciado = valorConDescuento * interes;
                    break;
                case 3:
                    interes = 1.25;
                    precioFinanciado = valorConDescuento * interes;
                    break;
                case 6:
                    interes = 1.6;
                    precioFinanciado = valorConDescuento * interes;
                    break;
                default:
                    alert("Ingrese una financiación aceptada");
                    cantidadCuotas = parseInt(prompt("¿En cuántas cuotas va a financiar el pago? \n \n 1 (sin interés) \n 3 (+25%) \n 6 (+60%)"));
                    return calcularFinanciacion(precioConDescuento,cantidadCuotas);
            }
            return precioFinanciado;
        }
        
        function calcularValorCuota(valorFinanciado,cuotas) {
            let valorPorCuota = valorFinanciado / cuotas;
            return valorPorCuota;
        }
        
        function informarPrecioFinal(precio,descuento,precioCuota) {
            if (descuento > 0) {
                alert("El precio final, con IVA, descuentos y recargos (si aplican), es de $" + precio.toFixed(2) + "\n\nEstás ahorrando $" + descuento.toFixed(2) + "\n\nLa financiación es de " + cantidadCuotas + " cuota/s de $" + precioCuota.toFixed(2));
            } else {
                alert("El precio final, con IVA y recargos (si aplican), es de $" + precio.toFixed(2) + "\n\nConseguí cupones para ahorrar en tu próxima compra \n\nLa financiación es de " + cantidadCuotas + " cuota/s de $" + precioCuota.toFixed(2));
            }
        }
        
        const precioConIVA = calcularIVA();
        const valorDescuento = calcularDescuento(precioConIVA);
        const precioConDescuento = calcularPrecioConDescuento(valorDescuento);
        let cantidadCuotas = parseInt(prompt("¿En cuántas cuotas va a financiar el pago? \n \n 1 (sin interés) \n 3 (+25%) \n 6 (+60%)"));
        const precioFinanciado = calcularFinanciacion(precioConDescuento,cantidadCuotas);
        const valorPorCuota = calcularValorCuota(precioFinanciado,cantidadCuotas);
        const precioFinal = informarPrecioFinal(precioFinanciado,valorDescuento,valorPorCuota);
        
        //PARA VERIFICAR DATOS POR SEPARADO EN LA CONSOLA
        console.log("El valor con IVA es: $" + precioConIVA);
        console.log("El descuento es de $" + valorDescuento);
        console.log("El precio con descuento (+IVA) es de $" + precioConDescuento);
        console.log("El pago se financia en " + cantidadCuotas + " cuotas");
        console.log("El valor total financiado es de $" + precioFinanciado);
        console.log("El valor de cada cuota es de $" + valorPorCuota);
        //

        if (i === cantidadPrecios) {
            let agregarProducto = confirm("¿Quiere agregar otro producto?");
            if (agregarProducto) {
                iniciarCalculadora();
            } else {
                alert("¡Gracias por operar con nosotros!")
            }
        }
    }
}

iniciarCalculadora();