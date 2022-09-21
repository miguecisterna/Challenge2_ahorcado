let listaDePalabras = ["calavera","castillo","horca","soga","sangre","muerte","ahorcado","mago","dragón","princesa","rey","zombie","vampiro","murcielago","torre","luna","estrella","rosa","reina","mundo","hermita","diablo","enamorados","fuerza","mundo","juicio"];
let palabraSecreta = "";
let teclaPulsada = "";
let ancestor = document.getElementById('letras');
let descendents = ancestor.getElementsByTagName('*');
let descendentsArray = [];
let contadorIntentos = 4;
let acerto;
let aciertos = [];
let palabra = document.querySelector(".palabraNueva");

var audio = new Audio("audio/mainMenu.mp3");
var inGameAudio = new Audio("audio/inGame.mp3");
var gameOverAudio = new Audio("audio/gameOver.mp3")

//Funciones:

function muteUnmuteSound(){
    if(!audio.muted){
    audio.muted = true;
    inGameAudio.muted = true;
    gameOverAudio.muted = true;
    }else{
    audio.muted = false;
    inGameAudio.muted = false;
    gameOverAudio.muted = false;
    }    
}

function iniciarJuego() { 
    audio.pause();   
    inGameAudio.pause();

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

    
    inGameAudio.play();
    inGameAudio.loop = true;
}

function terminarJuego() {
    inGameAudio.pause();
    inGameAudio.currentTime = 0;
    gameOverAudio.pause();
    gameOverAudio.currentTime = 0;
    audio.currentTime = 0;
    audio.play();
    audio.loop = true;

    document.getElementById("botonesMenuPrinipal").style.display = "block";
    document.getElementById("body").style.backgroundColor = "#C7F59D";
    document.getElementById("logoAlura").style.backgroundImage = "url('images/aluragreen.png')";
    document.getElementById("containerJuego").style.display = "none";
    palabraSecreta = "";
    document.getElementById("letras").innerHTML = "";
    document.getElementById("espacios").innerHTML = "";
    document.getElementById("imagenAhorcado").style.backgroundImage = 'url("images/horca4.png")';
    document.getElementById("containerAgregarPalabra").style.display = "none";
   
    var e = document.getElementById("palabrasAdivinadas");
    var child = e.lastElementChild;

    var f = document.getElementById("letrasErradas");
    var childf = f.lastElementChild;

    while(child){
        e.removeChild(child);
        child = e.lastElementChild;
    }
    while(childf){
        f.removeChild(childf);
        childf = f.lastElementChild;
    }

    palabraSecreta = "";
    teclaPulsada = "";
    ancestor = document.getElementById('letras');
    descendents = ancestor.getElementsByTagName('*');
    descendentsArray = [];
    contadorIntentos = 4;
    acerto;
    aciertos = [];

    document.removeEventListener("keydown", processKey);

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
        var tag = document.createElement("p");
        var letra = document.createTextNode(tecla);
        tag.appendChild(letra);
        tag.classList.add("letraErrada");
        document.getElementById("letrasErradas").appendChild(tag);
    }

    document.getElementById("imagenAhorcado").style.backgroundImage = `url(images/horca${contadorIntentos}.png)`;

    if(contadorIntentos < 0){
        document.getElementById("imagenAhorcado").style.backgroundImage = `url(images/horca0.png)`;
    }

    if (contadorIntentos == 0) {
        document.getElementById("letrasAdivinadas").style.display = "none";
        document.getElementById("botonera").style.display = "none";
        document.getElementById("gameOver").style.display = "block";
        inGameAudio.pause();
        inGameAudio.currentTime = 0;
        gameOverAudio.play();
    }

    if (descendentsArray.length === aciertos.length) {
        nuevaPalabra();
    }
}

function nuevaPalabra() {
    inGameAudio.pause();

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

function guardarNuevaPalabra(palabraNueva){
    palabraNueva = palabra.value; 
    listaDePalabras.push(palabraNueva);
    console.log("Lista de palabras Actualizada");
    console.log(listaDePalabras);
    document.getElementById("containerAgregarPalabra").style.display = "none";
    iniciarJuego();
    palabra.value = "";
}

function nuevoJuego(){
    palabraSecreta = "";
    contadorIntentos = 4;
    document.getElementById("letras").innerHTML = "";
    document.getElementById("espacios").innerHTML = "";
    document.getElementById("imagenAhorcado").style.backgroundImage = 'url("images/horca4.png")';

    var e = document.getElementById("palabrasAdivinadas");
    var child = e.lastElementChild;

    while(child){
        e.removeChild(child);
        child = e.lastElementChild;
    }

    iniciarJuego();
}
