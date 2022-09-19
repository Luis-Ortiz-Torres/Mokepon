const seccionAtaque = document.getElementById('seleccionar-ataque');
const seccionReiniciar = document.getElementById('reiniciar');
const btnMascotaJugador = document.getElementById('btn-mascota');
const btnFuego = document.getElementById('btn-fuego');
const btnAgua = document.getElementById('btn-agua');
const btnTierra = document.getElementById('btn-tierra');
const btnReiniciar = document.getElementById('btn-reiniciar');

const seccionMascota = document.getElementById('seleccionar-mascota');

const mascotaJugador = document.getElementById('mascota-jugador');

const mascotaEnemigo = document.getElementById('mascota-enemigo');

const seccionMensajes = document.getElementById('resultado');
const ataqueDelJugador = document.getElementById('ataque-del-jugador');
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo');

const vidasJugador=document.getElementById('vidas-jugador');
const vidasEnemigo=document.getElementById('vidas-enemigo');

const contenedorTarjetas = document.getElementById('contenedor-tarjetas');

let ataqueJugador;
let ataqueEnemigo; 
let vidasJugadorContador = 3;
let vidasEnemigoContador = 3;
let mokepones = []
let opcionDeMokepones;
let hipodoge; 
let capipepo; 
let ratigueya;
class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}

let hipodoge2 = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5)

let capipepo2 = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5)

let ratigueya2 = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5)

hipodoge2.ataques.push(
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '🌱', id: 'btn-tierra'},
);

capipepo2.ataques.push(
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '🔥', id: 'btn-fuego'},
);

ratigueya2.ataques.push(
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '💧', id: 'btn-agua'},
);

mokepones.push(hipodoge2, capipepo2, ratigueya2);

function iniciarJuego(){
    
    seccionAtaque.style.display = 'none';
    seccionReiniciar.style.display = 'none';

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label for=${mokepon.nombre} class="tarjeta-mokepon">
          <p>${mokepon.nombre}</p>
          <img
            src=${mokepon.foto} alt=${mokepon.nombre}
          />
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones;
        hipodoge = document.getElementById('Hipodoge');
        capipepo = document.getElementById('Capipepo');
        ratigueya = document.getElementById('Ratigueya');
    });

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