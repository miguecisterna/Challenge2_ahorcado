let listaDePalabras = ["Abaco","Berenjena","Calido","Dios","Esfinge","Femur","Gelido","Hipocampo","Iglu","Joroba","Kiosco","Lagrima","Moneda","Notario","Orificio","Pedazo","Queso","Rio","Saturno","Tiburon","Ultimo","Vasos","Washington","Xilofon","Yendo","Zamba"];
let palabraSecreta = "";
let teclaPulsada = "";



//Funciones:
function iniciarJuego(){
    
    document.getElementById("botonesMenuPrinipal").style.display = "none";
    document.getElementById("body").style.backgroundColor = "#8FDE83";
    document.getElementById("logoAlura").style.backgroundImage = "url('images/aluralightgreen.png')";
    document.getElementById("containerJuego").style.display = "block";
    elegirPalabraSecreta();
    console.log(palabraSecreta);
    
    for(let i = 0; i < palabraSecreta.length; i++){
        var tag = document.createElement("p");
        var tag2 = document.createElement("p");
        var letra = document.createTextNode(palabraSecreta[i]);
        var espacio = document.createTextNode("¯");

        tag.appendChild(letra);
        tag.classList.add("claseLetra");

        tag2.appendChild(espacio);       

        document.getElementById("letras").appendChild(tag);
        document.getElementById("espacios").appendChild(tag2);

        var letraSecreta = document.getElementById("letras").appendChild(tag);        
    }
}

function terminarJuego(){
    
    document.getElementById("botonesMenuPrinipal").style.display = "block";
    document.getElementById("body").style.backgroundColor = "#C7F59D";
    document.getElementById("logoAlura").style.backgroundImage = "url('images/aluragreen.png')";
    document.getElementById("containerJuego").style.display = "none";
    palabraSecreta = "";
    document.getElementById("letras").innerHTML = "";
    document.getElementById("espacios").innerHTML = "";
}

function elegirPalabraSecreta(){
    palabraSecreta = listaDePalabras[Math.floor(Math.random() * listaDePalabras.length)];
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    teclaPulsada = key;
    key.length === 1;
    console.log(teclaPulsada);
});