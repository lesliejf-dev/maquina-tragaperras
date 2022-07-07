var listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];


//variables para monedero
var monedero = document.getElementById("monedas");
var cantidadDinero = 0;

//variables para los botones 
const btnIntroduce = document.getElementById("introduceMonedas");
const botonTirar = document.getElementById("tirar");
const botonSalida = document.getElementById("salir");


//guardo en la variable que voy a usar para mostrar las monedas
var mostrarMonedas = document.getElementById("saldo");

//Enlazando las imágenes con el JavaScript
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

//Creo variables para utilizarlas despues en otras funciones
var srcImagenes1;
var srcImagenes2;
var srcImagenes3;

//lista del historial 
const historial = document.getElementById('historialTiradas');
var puntos = 0;
var tiradas = 0;


//funcion que devuelve una imagen aleatoria del array
function randomImagenes() {
    do {
        var aleatori = false
        let randomImg = (Math.ceil(Math.random() * 10)); //utilizo random para sacar imagenes aleatoriamente
        console.log("La imagen aleatoria es:" + randomImg);

        if (randomImg > 0 && randomImg <11) { //le indico las opciones del array
            return (randomImg - 1); //Le resto 1 para que me de la posibilidad del 0 del array
        }

    } while (!aleatori);
}

//funcion para mostrar las imagenes
function imprimeImagenes() {

    //selecciono el String del array con el random de la función random
    srcImagenes1 = listaImagenes[randomImagenes()];
    //Con la imagen seleccionada del array la inserto en el codigo de la imagen
    img1.setAttribute('src', ("./img/" + srcImagenes1 + ".png"));
    console.log(img1.getAttribute('src'));

    //hago lo mismo con las otras dos imagenes
    srcImagenes2 = listaImagenes[randomImagenes()];
    img2.setAttribute('src', ("./img/" + srcImagenes2 + ".png"));
    console.log(img2.getAttribute('src'));

    srcImagenes3 = listaImagenes[randomImagenes()];
    img3.setAttribute('src', ("./img/" + srcImagenes3 + ".png"));
    console.log(img3.getAttribute('src'));

}


function selMonedas() {

    btnIntroduce.addEventListener('click', function() {
        //Cuando se pulsa el botón introducir guardo el numero que se introdujo en el input monedas y lo paso a entero 
        monedero = document.getElementById("monedas");
        
        //Lo guardo en la variable cantidadDinero
        cantidadDinero = parseInt(monedero.value);
        if (cantidadDinero > 30) {
            alert(" Por favor, seleccione menos de 30 monedas");
            location.reload();
        }
        console.log("Cantidad incial:" + cantidadDinero);
        //deshabilito el input y el boton introducir para que no ingrese mas monedas
        monedero.disabled = true;
        monedero.value = 0;
        btnIntroduce.disabled = true;
        //Muestro en el input el saldo actual de monedas
        mostrarMonedas.setAttribute("value", cantidadDinero);
    })
}


//funcion para subir y bajar palanca 
function mostrarEvento(tipo) {
    
    let mySrc = botonTirar.getAttribute('src');
        if (tipo == 1){
            mySrc === "img/palancaUP.png"
            botonTirar.setAttribute('src', "img/palancaDOWN.png");
        }else if (tipo ==2){
            mySrc === "img/palancaDOWN.png"
            botonTirar.setAttribute('src', "img/palancaUP.png");
        }
  }

//funcion para tirar y empezar partida 
function partida() {

    botonTirar.addEventListener('click', function() {
        
        if (cantidadDinero == 0) {
            alert("Por favor, introduce monedas");            
        } else {
            //Antes resto una moneda ya que es lo que se gasta por cada tirada
            tiradas += 1;
            cantidadDinero -= 1;
            console.log("antes: " + cantidadDinero)

            imprimeImagenes();
            //Después de tirar e imprimir contamos el puntaje y sumamos la cantidad de monedas con la función puntaje
            puntaje();
        }
    })
}

//
function puntaje() {
    puntos = 0;
    let dollar = 0;
    //Construyo un array con las src de las imágenes resultantes de la tirada
    let arrayResultado = [srcImagenes1, srcImagenes2, srcImagenes3];
    //LO recorro y cuento las monedas del caso
    arrayResultado.forEach(element => {

        if (element == "dollar") { dollar += 1 }

    });

    if (dollar != 0) {

        switch (dollar) {
            case 1:
                if ((srcImagenes1 == srcImagenes2) || (srcImagenes1 == srcImagenes3) || (srcImagenes2 == srcImagenes3)) {
                    puntos = 3; // Un dollar y 2 frutas o verduras iguales, 3 monedas
                } else { puntos = 1; } // Sólo un dollar, una moneda

                break;
            case 2:
                puntos = 4; // Si hay 2 monedas de dollar, 4 monedas

                break;
            case 3:
                puntos = 10; // Si hay 3 monedas de dollar, 10 monedas

                break;
            default:
                break;
        }
    } else if ((srcImagenes1 == srcImagenes2) && (srcImagenes1 == srcImagenes3)) {
        puntos = 5; // Si son 3 iguales que no sean monedas de dollar

    } else if ((srcImagenes1 == srcImagenes2) || (srcImagenes1 == srcImagenes3) || (srcImagenes2 == srcImagenes3)) {
        //Si son 2 iguales sin dollar, 2 monedas
        puntos = 2;
    }

    cantidadDinero += puntos;
    console.log("Cantidad de monedas: " + cantidadDinero);
    mostrarMonedas.setAttribute("value", cantidadDinero);
    imprimeHistorial();

}


function salir() {

    botonSalida.addEventListener('click', function() {
        alert("Has conseguido un total de " + cantidadDinero + " monedas");
        location.reload();        
    })
}

//funcion para visualizar el historial con cuanto se gana y se pierde
function imprimeHistorial() {
    let listadoHistorial = document.createElement("li"); //Creo el elemento li para el listado
    let textoHistorial = document.createTextNode(("Ganas " + puntos.toString() + " monedas y pierde una moneda"));
    listadoHistorial.appendChild(textoHistorial); //Agrego el texto al listado
    historial.appendChild(listadoHistorial); //Agrego a la lista historial
}

selMonedas();

partida();

salir();
