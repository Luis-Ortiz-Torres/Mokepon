let ataqueJugador;
let ataqueEnemigo; 

function iniciarJuego(){
    let btnMascotaJugador = document.getElementById('btn-mascota');
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    
    let btnFuego = document.getElementById('btn-fuego');
    btnFuego.addEventListener('click', ataqueFuego);

    let btnAgua = document.getElementById('btn-agua');
    btnAgua.addEventListener('click', ataqueAgua);

    let btnTierra = document.getElementById('btn-tierra');
    btnTierra.addEventListener('click', ataqueTierra);

    
}

function seleccionarMascotaJugador(){
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
    crearMensaje();
}

function crearMensaje(){
    let parrafo = document.createElement('p');
    parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador +', las mascota del enemigo atacó con ' + ataqueEnemigo + '-PENDIENTE';
}
window.addEventListener('load', iniciarJuego);