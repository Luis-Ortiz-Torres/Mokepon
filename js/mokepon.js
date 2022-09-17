let ataqueJugador;
let ataqueEnemigo; 
let vidasJugadorContador = 3;
let vidasEnemigoContador = 3;

function iniciarJuego(){
    let seccionAtaque = document.getElementById('seleccionar-ataque');
    seccionAtaque.style.display = 'none';

    let seccionReiniciar = document.getElementById('reiniciar');
    seccionReiniciar.style.display = 'none';

    let btnMascotaJugador = document.getElementById('btn-mascota');
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    
    let btnFuego = document.getElementById('btn-fuego');
    btnFuego.addEventListener('click', ataqueFuego);

    let btnAgua = document.getElementById('btn-agua');
    btnAgua.addEventListener('click', ataqueAgua);

    let btnTierra = document.getElementById('btn-tierra');
    btnTierra.addEventListener('click', ataqueTierra);

    let btnReiniciar = document.getElementById('btn-reiniciar');
    btnReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador(){
    let seccionAtaque = document.getElementById('seleccionar-ataque');
    seccionAtaque.style.display = 'flex';

    let seccionMascota = document.getElementById('seleccionar-mascota');
    seccionMascota.style.display = 'none';

    let hipodoge = document.getElementById('hipodoge');
    let capipepo = document.getElementById('capipepo');
    let ratigueya = document.getElementById('ratigueya');
    let mascotaJugador = document.getElementById('mascota-jugador');

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
    let mascotaEnemigo = document.getElementById('mascota-enemigo');
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
    let seccionMensajes = document.getElementById('resultado');
    let ataqueDelJugador = document.getElementById('ataque-del-jugador');
    let ataqueDelEnemigo = document.getElementById('ataque-del-enemigo');
    
    
    let NuevoataqueDelJugador = document.createElement('p');
    let NuevoataqueDelEnemigo = document.createElement('p');

    seccionMensajes.innerHTML = resultado;
    NuevoataqueDelJugador.innerHTML = ataqueJugador;
    NuevoataqueDelEnemigo.innerHTML = ataqueEnemigo;
    
    
    ataqueDelJugador.appendChild(NuevoataqueDelJugador);
    ataqueDelEnemigo.appendChild(NuevoataqueDelEnemigo);

}

function crearMensajeFinal(resultadoFinal){
    let seccionMensajes = document.getElementById('resultado');
    seccionMensajes.innerHTML = resultadoFinal;
    

    let btnFuego = document.getElementById('btn-fuego');
    btnFuego.disabled = true;

    let btnAgua = document.getElementById('btn-agua');
    btnAgua.disabled = true;

    let btnTierra = document.getElementById('btn-tierra');
    btnTierra.disabled = true;

    let seccionReiniciar = document.getElementById('reiniciar');
    seccionReiniciar.style.display = 'flex';
}

function combate(){
    let vidasJugador=document.getElementById('vidas-jugador');
    let vidasEnemigo=document.getElementById('vidas-enemigo');

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