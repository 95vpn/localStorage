// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Agregar Event Listeners
function eventListeners() {
    //cuando el ususario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];
        console.log(tweets)
        crearHTML();
    });
}

// Llamar a la función para agregar los Event Listeners
eventListeners();

function agregarTweet(event) {
    event.preventDefault();


    //textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value
    //validacion

    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio')
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //Anadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    
    //una vez agregado vamos a crear html
    crearHTML();

    //reiniciar el formulario
    formulario.reset();

}

//Mostrar mensaje de erro
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError)

    //elimina la alerta despues de 3 segundos

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


//mUESTRA UN LISTADO DE LOS TWEETS
function crearHTML() {
    limpiarHTML();
    if(tweets.length > 0) {
        tweets.forEach( tweet => {

            //Agregar un botos eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //aÑADIR LA FUNCIÓN DE ELIMINAR
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // crear html
            const li = document.createElement('li');
            li.classList.add('listas')
            //añadir el texto
            li.innerText = tweet.tweet

            //asignar el boton
            li.appendChild(btnEliminar);

            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//Agregar los tweets actuales a LocalStorage

function sincronizarStorage() {
        localStorage.setItem('tweets', JSON.stringify(tweets));
}

//borrar Tweet
function borrarTweet (id) {
    // console.log('borrando tweet')

    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
    console.log(tweets)
}

//limpiar html
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}