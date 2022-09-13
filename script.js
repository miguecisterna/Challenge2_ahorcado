//Funciones:
function iniciarJuego(){
    
    document.getElementById("botonesMenuPrinipal").style.display = "none";
    document.getElementById("body").style.backgroundColor = "#8FDE83";
    document.getElementById("logoAlura").style.backgroundImage = "url('images/aluralightgreen.png')";
    document.getElementById("containerJuego").style.display = "block";
}

function terminarJuego(){
    
    document.getElementById("botonesMenuPrinipal").style.display = "block";
    document.getElementById("body").style.backgroundColor = "#C7F59D";
    document.getElementById("logoAlura").style.backgroundImage = "url('images/aluragreen.png')";
    document.getElementById("containerJuego").style.display = "none";
}