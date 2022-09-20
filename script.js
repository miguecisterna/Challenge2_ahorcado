let listaDePalabras = ["calavera","castillo","horca","soga","sangre","muerte","ahorcado","mago","dragón","princesa","rey","zombie","vampiro","murcielago","torre","luna","estrella","rosa","reina","mundo","hermitaño","diablo","enamorados","fuerza","mundo","juicio"];
let palabraSecreta = "";
let teclaPulsada = "";
let ancestor = document.getElementById('letras');
let descendents = ancestor.getElementsByTagName('*');
let descendentsArray = [];
let contadorIntentos = 4;
let acerto;
let aciertos = [];

//Funciones:

function iniciarJuego() {
    //Disableamos los botones del menú principal y cambiamos color de fondo y imagen de logo de alura
    document.getElementById("botonesMenuPrinipal").style.display = "none";
    document.getElementById("body").style.backgroundColor = "#8FDE83";
    document.getElementById("logoAlura").style.backgroundImage = "url('images/aluralightgreen.png')";

    //Habilitamos los contenedores del juego
    document.getElementById("containerJuego").style.display = "block";
    document.getElementById("letrasAdivinadas").style.display = "block";
    document.getElementById("botonera").style.display = "block";

    //Deshabilitamos mensaje de game over
    document.getElementById("gameOver").style.display = "none";

    //Elejimos palabra Secreta
    elegirPalabraSecreta();

    //Creamos los tags que van a componer la palabraSecreta y los _ que estarán debajo de cada letra
    for (let i = 0; i < palabraSecreta.length; i++) {
        var tag = document.createElement("p");
        var tag2 = document.createElement("p");
        var letra = document.createTextNode(palabraSecreta[i]);
        var espacio = document.createTextNode("¯");

        tag.appendChild(letra);
        tag.classList.add("claseLetra");

        tag2.appendChild(espacio);

        document.getElementById("letras").appendChild(tag);
        document.getElementById("espacios").appendChild(tag2);

    }

    //Creamos un array con cada letra de la palabraSecreta
    for (let i = 0; i < descendents.length; i++) {
        descendentsArray.push(descendents[i].innerHTML);
    }
}

function terminarJuego() {

    document.getElementById("botonesMenuPrinipal").style.display = "block";
    document.getElementById("body").style.backgroundColor = "#C7F59D";
    document.getElementById("logoAlura").style.backgroundImage = "url('images/aluragreen.png')";
    document.getElementById("containerJuego").style.display = "none";
    palabraSecreta = "";
    document.getElementById("letras").innerHTML = "";
    document.getElementById("espacios").innerHTML = "";
    document.getElementById("imagenAhorcado").style.backgroundImage = 'url("images/_horca4.png")';
    document.getElementById("containerAgregarPalabra").style.display = "none";
    palabraSecreta = "";
    teclaPulsada = "";
    ancestor = document.getElementById('letras');
    descendents = ancestor.getElementsByTagName('*');
    descendentsArray = [];
    contadorIntentos;
    acerto;
    aciertos = [];

    
}

//Elegimos una palabra de la lista, la pasamos a mayuscula y activamos eventListener para teclado
function elegirPalabraSecreta() {
    palabraSecreta = listaDePalabras[Math.floor(Math.random() * listaDePalabras.length)].normalize("NFD").replace(/[\u0300-\u036f]/g, "");;
    palabraSecreta = palabraSecreta.toUpperCase();
    document.addEventListener('keydown', processKey);
}

//procesar y enviar letra al checkearLetra
function processKey(event) {
    key = event.key;
    teclaPulsada = key.toUpperCase();
    console.log(teclaPulsada);
    checkearLetra(teclaPulsada);
}

//Checkeamos la tecla pulsada
function checkearLetra(tecla) {
    for (let i = 0; i < descendents.length; i++) {
        if (tecla == descendents[i].innerHTML && descendents[i].id !== "adivinada") {
            descendents[i].setAttribute("id", "adivinada");
            console.log("Letra correcta, seguí intentando-");
            aciertos.push('v');
        }
    }

    if (descendentsArray.includes(tecla) === false) {
        contadorIntentos--;
    }

    document.getElementById("imagenAhorcado").style.backgroundImage = `url(images/_horca${contadorIntentos}.png)`;

    if(contadorIntentos < 0){
        document.getElementById("imagenAhorcado").style.backgroundImage = `url(images/_horca0.png)`;
    }

    if (contadorIntentos == 0) {
        document.getElementById("letrasAdivinadas").style.display = "none";
        document.getElementById("botonera").style.display = "none";
        document.getElementById("gameOver").style.display = "block";
    }

    if (descendentsArray.length === aciertos.length) {
        nuevaPalabra();
    }
}

function nuevaPalabra() {
    if (aciertos.length == palabraSecreta.length) {

        teclaPulsada = "null";

        var tag = document.createElement("p");
        var letra = document.createTextNode(palabraSecreta);

        //Eliminamos las letras ("claseLetra") ya adivinada y los espacios de la palabra adivinada
        for (let i = 0; i < palabraSecreta.length; i++) {
            child = document.getElementById("letras").firstChild;
            child2 = document.getElementById("espacios").firstChild;

            document.getElementById("letras").removeChild(child);
            document.getElementById("espacios").removeChild(child2);
        }

        //Creamos <p> con la palabra ya adivinada
        tag.appendChild(letra);
        tag.classList.add("palabraAdivinada");
        document.getElementById("palabrasAdivinadas").appendChild(tag);

        //Elegir nueva palabra secreta
        palabraSecreta = "";
        elegirPalabraSecreta();

        if (document.getElementById("espacios").childElementCount != 0 && document.getElementById("espacios").childElementCount != palabraSecreta.length) {
            child = document.getElementById("letras").firstChild;
            child2 = document.getElementById("espacios").firstChild;

            document.getElementById("letras").removeChild(child);
            document.getElementById("espacios").removeChild(child2);


        }   

        //reiniciamos contador de aciertos y el adescendentsArray
        aciertos = [];
        descendentsArray = [];

        for (let i = 0; i < descendents.length; i++) {
            descendentsArray.push(descendents[i].innerHTML);
        }

        //reinciamos el eventListener
        document.removeEventListener("keydown", processKey);
    }

    iniciarJuego();
    console.log(aciertos);
}

//Ingresar palabra nueva

function agregarPalabra(){
    //Disableamos los botones del menú principal y cambiamos color de fondo y imagen de logo de alura
    document.getElementById("botonesMenuPrinipal").style.display = "none";
    document.getElementById("body").style.backgroundColor = "#8FDE83";
    document.getElementById("logoAlura").style.backgroundImage = "url('images/aluralightgreen.png')";

    //Habilitamos los contenedores del juego
    document.getElementById("containerAgregarPalabra").style.display = "block";
    

    //Deshabilitamos mensaje de game over
    document.getElementById("gameOver").style.display = "none";
}
const palabra = document.querySelector(".palabraNueva");

function guardarNuevaPalabra(palabraNueva){
    palabraNueva = palabra.value; 
    listaDePalabras.push(palabraNueva);
    console.log("Lista de palabras Actualizada");
    console.log(listaDePalabras);
    document.getElementById("containerAgregarPalabra").style.display = "none";
    iniciarJuego();
}

