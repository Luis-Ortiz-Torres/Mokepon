const seccionAtaque = document.getElementById('seleccionar-ataque');
const seccionReiniciar = document.getElementById('reiniciar');
const btnMascotaJugador = document.getElementById('btn-mascota');

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

const contenedorAtaques = document.getElementById('contenedor-ataques');

let ataqueJugador = [];
let ataqueEnemigo; 
let vidasJugadorContador = 3;
let vidasEnemigoContador = 3;
let mokepones = []
let opcionDeMokepones;
let hipodoge; 
let capipepo; 
let ratigueya;
let mascotaJugador2;
let ataquesMokepon;

let btnFuego;
let btnAgua;
let btnTierra;
let botones = [];



class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}

let hipodogeObj = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5)

let capipepoObj = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5)

let ratigueyaObj = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5)

hipodogeObj.ataques.push(
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '🌱', id: 'btn-tierra'},
);

capipepoObj.ataques.push(
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '🔥', id: 'btn-fuego'},
);

ratigueyaObj.ataques.push(
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '🌱', id: 'btn-tierra'},
    {nombre: '💧', id: 'btn-agua'},
);

mokepones.push(hipodogeObj, capipepoObj, ratigueyaObj);

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
    
    btnReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador(){
    seccionAtaque.style.display = 'flex';
    seccionMascota.style.display = 'none';

    if (hipodoge.checked) {
        mascotaJugador.innerHTML = hipodoge.id;
        mascotaJugador2 = hipodoge.id;
    }else if(capipepo.checked){
        mascotaJugador.innerHTML = capipepo.id;
        mascotaJugador2 = capipepo.id;
    }else if(ratigueya.checked){
        mascotaJugador.innerHTML = ratigueya.id;
        mascotaJugador2 = ratigueya.id;
    }else{
        alert('selecciona a tu mascota');
    }
    extraerAtaques(mascotaJugador2);
    seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador2){
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador2 === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
        
    } 
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="ataques">${ataque.nombre}</button>
        `;
        contenedorAtaques.innerHTML += ataquesMokepon;
    });
     btnFuego = document.getElementById('btn-fuego');
     btnAgua = document.getElementById('btn-agua');
     btnTierra = document.getElementById('btn-tierra');
     botones = document.querySelectorAll('.ataques');
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) =>{
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
            }else if (e.target.textContent === '💧'){
                ataqueJugador.push('AGUA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
            }else{
                ataqueJugador.push('TIERRA');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
            }
        });
    });
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1);
    mascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;

    secuenciaAtaque();
}

function aleatorio(min, max){
    return Math.floor(Math.random()* (max - min +1) +min);
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