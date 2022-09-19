const seccionAtaque = document.getElementById('seleccionar-ataque');
const seccionReiniciar = document.getElementById('reiniciar');
const btnMascotaJugador = document.getElementById('btn-mascota');
const btnFuego = document.getElementById('btn-fuego');
const btnAgua = document.getElementById('btn-agua');
const btnTierra = document.getElementById('btn-tierra');
const btnReiniciar = document.getElementById('btn-reiniciar');

const seccionMascota = document.getElementById('seleccionar-mascota');
const hipodoge = document.getElementById('hipodoge');
const capipepo = document.getElementById('capipepo');
const ratigueya = document.getElementById('ratigueya');
const mascotaJugador = document.getElementById('mascota-jugador');

const mascotaEnemigo = document.getElementById('mascota-enemigo');

const seccionMensajes = document.getElementById('resultado');
const ataqueDelJugador = document.getElementById('ataque-del-jugador');
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo');

const vidasJugador=document.getElementById('vidas-jugador');
const vidasEnemigo=document.getElementById('vidas-enemigo');

let ataqueJugador;
let ataqueEnemigo; 
let vidasJugadorContador = 3;
let vidasEnemigoContador = 3;

function iniciarJuego(){
    
    seccionAtaque.style.display = 'none';
    seccionReiniciar.style.display = 'none';

    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    
    btnFuego.addEventListener('click', ataqueFuego);
    btnAgua.addEventListener('click', ataqueAgua);
    btnTierra.addEventListener('click', ataqueTierra);
    
    btnReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador(){
    seccionAtaque.style.display = 'flex';
    seccionMascota.style.display = 'none';

    if (hipodoge.checked) {
        mascotaJugador.innerHTML = 'Hipodoge';
    }else if(capipepo.checked){
        mascotaJugador.innerHTML = 'Capipepo';
    }else if(ratigueya.checked){
        mascotaJugador.innerHTML = 'Ratigueya';
    }else{
        alert('selecciona a tu mascota');
    }
    seleccionarMascotaEnemigo();
}


function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(1,3);

    if (mascotaAleatoria == 1) {
        mascotaEnemigo.innerHTML = 'Hipodoge';
    }else if(mascotaAleatoria == 2){
        mascotaEnemigo.innerHTML = 'Capipepo';
    }else{
        mascotaEnemigo.innerHTML = 'Ratigueya';
    }
}

function aleatorio(min, max){
    return Math.floor(Math.random()* (max - min +1) +min);
}

function ataqueFuego(){
    ataqueJugador = 'FUEGO';
    ataqueAleatorioEnemigo();

}

function ataqueAgua(){
    ataqueJugador = 'AGUA';
    ataqueAleatorioEnemigo();
}

function ataqueTierra(){
    ataqueJugador = 'TIERRA';
    ataqueAleatorioEnemigo();
}


function ataqueAleatorioEnemigo(){
    let ataqueAleaotorio = aleatorio(1,3);

    if (ataqueAleaotorio == 1) {
        ataqueEnemigo = 'FUEGO';
    }else if(ataqueAleaotorio == 2){
        ataqueEnemigo = 'AGUA';
    }else{
        ataqueEnemigo = 'TIERRA';
    }
    combate();
}

function crearMensaje(resultado){
    let NuevoataqueDelJugador = document.createElement('p');
    let NuevoataqueDelEnemigo = document.createElement('p');

    seccionMensajes.innerHTML = resultado;
    NuevoataqueDelJugador.innerHTML = ataqueJugador;
    NuevoataqueDelEnemigo.innerHTML = ataqueEnemigo;
    
    ataqueDelJugador.appendChild(NuevoataqueDelJugador);
    ataqueDelEnemigo.appendChild(NuevoataqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    seccionMensajes.innerHTML = resultadoFinal;
    
    btnFuego.disabled = true;
    btnAgua.disabled = true;
    btnTierra.disabled = true;

    seccionReiniciar.style.display = 'flex';
}

function combate(){
    if (ataqueJugador == ataqueEnemigo) {
        crearMensaje('EMPATE');
    }else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA'){
        crearMensaje('GANASTE');
        vidasEnemigoContador--;
        vidasEnemigo.innerHTML = vidasEnemigoContador;

    }else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO'){
        crearMensaje('GANASTE');
        vidasEnemigoContador--;
        vidasEnemigo.innerHTML = vidasEnemigoContador;
    }else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA'){
        crearMensaje('GANASTE');
        vidasEnemigoContador--;
        vidasEnemigo.innerHTML = vidasEnemigoContador;
    }else{
        crearMensaje('PERDISTE');
        vidasJugadorContador--;
        vidasJugador.innerHTML = vidasJugadorContador;
    }
    revisarVidas();
}

function revisarVidas(){
    if (vidasEnemigoContador == 0) {
        crearMensajeFinal('Felicitaciones! GANASTE :)');
    }else if(vidasJugadorContador == 0){
        crearMensajeFinal('LO SIENTO! PERDISTE :(');

    }
}

function reiniciarJuego(){
    location.reload();
}
window.addEventListener('load', iniciarJuego);