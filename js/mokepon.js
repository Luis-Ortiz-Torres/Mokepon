function iniciarJuego(){
    let btnMascotaJugador = document.getElementById('btn-mascota');
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    
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
    let ataqueAleatorio = aleatorio(1,3);

    if (ataqueAleatorio == 1) {
        mascotaEnemigo.innerHTML = 'Hipodoge';
    }else if(mascotaEnemigo == 2){
        mascotaEnemigo.innerHTML = 'Capipepo';
    }else{
        mascotaEnemigo.innerHTML = 'Ratigueya';
    }

}

function aleatorio(min, max){
    return Math.floor(Math.random()* (max - min +1) +min);
}

window.addEventListener('load', iniciarJuego);