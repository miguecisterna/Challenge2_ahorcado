let listaDePalabras = ["hombre","usted","mucho","hace","entonces","siento","tenemos","puedes","ahí","ti","vida","ver","alguien","sr","hasta","sin","mí","solo","años","sobre","decir","uno","siempre","oh","ir","cosas","también","antes","has","ni","mis","día","estar","estamos","noche","nadie","otra","quiere","parece","nosotros","poco","padre","trabajo","gente","mira","vas","sea","les","donde","mismo","hecho","ellos","dijo","pasa","dinero","hijo","tal","otro","hablar","seguro","claro","estas","lugar","mundo","amigo","espera","mierda","han","tus","sabe","después","momento","desde","fuera","cosa","tipo","mañana","podemos","dije","gran","necesito","estado","podría","acuerdo","papá","tener","dice","mío","crees","buena","gusta","nuestro","nuevo","será","haciendo","días","nombre","buen","había","ven","tres","menos","debe","tenía","mal","conmigo","madre","hoy","quien","sido","mamá","tienen","luego","todas","allí","toda","hora","mujer","visto","haces","importa","contigo","ve","tarde","oye","parte","haber","hombres","problema","mas","saber","quería","aún","veces","nuestra","hacerlo","cada","hizo","veo","tanto","razón","ustedes","idea","esos","van","quizá","debo","alguna","cierto","ud","muerto","unos","estos","salir","policía","realmente","demasiado","familia","pueden","cabeza","hemos","amigos","chica","cariño","lado","allá","entre","minutos","digo","algún","serio","cuidado","pasó","buenas","somos","amor","puerta","ves","vaya","ah","suerte","eh","rápido","cuenta","quizás","io","esas","pues","pasado","pensé","todavía","hermano","debes","casi","forma","aqui","chico","ok","dicho","nueva","sabía","muchas","dentro","hice","contra","auto","camino","ayuda","primera","hacia","vi","miedo","adiós","primero","debería","poder","niños","sería","historia","hey","mientras","ciudad","dijiste","espero","cuánto","esposa","pronto","chicos","cualquier","viejo","debemos","deja","año","muerte","hablando","manos","da","loco","problemas","mano","guerra","semana","pasar","vale","cuál","viene","volver","toma","caso","agua","haré","vete","entiendo","horas","personas","capitán","adelante","niño","listo","noches","buenos","iba","juntos","dame","único","déjame","cerca","otros","sigue","grande","arriba","jefe","habla","supongo","manera","quieren","feliz","significa","sangre","fin","bajo","llama","venir","morir","importante","hiciste","ojos","escucha","entrar","ningún","corazón","diablos","necesitamos","atrás","durante","dices","nuestros","persona","abajo","dr","hija","dejar","necesita","llegar","hago","señora","haya","suficiente","doctor","gustaría","tierra","cara","siquiera","genial","cree"];
let palabraSecreta = "";
let teclaPulsada = "";
let ancestor = document.getElementById('letras'),
    descendents = ancestor.getElementsByTagName('*');
let descendentsArray = [];    
let contadorIntentos = 4;
let acerto;
    
    
//Funciones:
function iniciarJuego(){

    contadorIntentos = 4;
    
    document.getElementById("botonesMenuPrinipal").style.display = "none";
    document.getElementById("body").style.backgroundColor = "#8FDE83";
    document.getElementById("logoAlura").style.backgroundImage = "url('images/aluralightgreen.png')";
    document.getElementById("containerJuego").style.display = "block";
    document.getElementById("letrasAdivinadas").style.display = "block";
    document.getElementById("botonera").style.display = "block";
    document.getElementById("gameOver").style.display = "none";
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

    for(let i = 0; i < descendents.length; i++){

        descendentsArray.push(descendents[i].innerHTML);
          
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
    document.getElementById("imagenAhorcado").style.backgroundImage = 'url("images/horca.png")';
    
}

function elegirPalabraSecreta(){
    palabraSecreta = listaDePalabras[Math.floor(Math.random() * listaDePalabras.length)];
    palabraSecreta = palabraSecreta.toUpperCase();
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    teclaPulsada = key.toUpperCase();
    key.length === 1;
    console.log(teclaPulsada);
    checkearLetra();
});

function checkearLetra(tecla){
    tecla = teclaPulsada;    

    for(let i = 0; i < descendents.length; i++){        
        
        if(tecla == descendents[i].innerHTML){
            descendents[i].setAttribute("id","adivinada");
            console.log("Letra correcta, seguí intentandos-");
            acerto = true;
            nuevaPalabra();
        }       
            
    }
  // |||ACA CREO QUE ESTÁ EL ERROR DEL CONTADOR EN LA ULTIMA LETRA ADIVINADA (SIEMPRE QUE NO SE CONDIGA CON ALGUNA DE LA PROXIMA PALABRA)|||
    if(descendentsArray.includes(tecla) == false){
        acerto = false;        
    }

    if(!acerto){
        contadorIntentos--;
        console.log(contadorIntentos);
    }
    if(contadorIntentos == 4){
        document.getElementById("imagenAhorcado").style.backgroundImage = 'url(images/horca.png)';
    }
    if(contadorIntentos == 3){
        document.getElementById("imagenAhorcado").style.backgroundImage = 'url(images/horca1.png)';
    }
    if(contadorIntentos == 2){
        document.getElementById("imagenAhorcado").style.backgroundImage = 'url(images/horca2.png)';
    }
    if(contadorIntentos == 1){
        document.getElementById("imagenAhorcado").style.backgroundImage = 'url(images/horca3.png)';
    }
    if(contadorIntentos == 0){
        document.getElementById("imagenAhorcado").style.backgroundImage = 'url(images/horca4.png)';
        document.getElementById("letrasAdivinadas").style.display = "none";
        document.getElementById("botonera").style.display = "none";
        document.getElementById("gameOver").style.display = "block";
    }     
}

function nuevaPalabra(){
    let aciertos = [];
    let acierto = "v";

    for(let i=0; i < descendents.length;i++){
        if(descendents[i].id == "adivinada"){
            aciertos.push(acierto);
        }
    }

    if(aciertos.length == palabraSecreta.length){
        var tag = document.createElement("p");
        var letra = document.createTextNode(palabraSecreta);

        //Eliminamos ls letras ("claseLetra") ya adivinada y los espacios de la palabra adivinada
        for(let i = 0; i < palabraSecreta.length; i++){
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
        
        if(document.getElementById("espacios").childElementCount != 0 && document.getElementById("espacios").childElementCount != palabraSecreta.length){
            child = document.getElementById("letras").firstChild;
            child2 = document.getElementById("espacios").firstChild;

            document.getElementById("letras").removeChild(child);
            document.getElementById("espacios").removeChild(child2);

            
        }
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

        //reiniciamos contador de aciertos y el adescendentsArray
        aciertos = [];
        descendentsArray = [];

        for(let i = 0; i < descendents.length; i++){

            descendentsArray.push(descendents[i].innerHTML);
              
        }
    }

    console.log(aciertos);
}



