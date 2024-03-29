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
const seccionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');
const moverArribaVar = document.getElementById('mover-arriba');
const moverAbajoVar = document.getElementById('mover-abajo');
const moverDerechaVar = document.getElementById('mover-derecha');
const moverIzquierdaVar = document.getElementById('mover-izquierda');


let ataqueJugador = [];
let ataqueEnemigo = []; 
let vidasJugadorContador = 3;
let vidasEnemigoContador = 3;
let mokepones = []
let opcionDeMokepones;
let hipodoge; 
let capipepo; 
let ratigueya;
let mascotaJugador2;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let btnFuego;
let btnAgua;
let btnTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
let mokeponCanvas;
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth -20;
const anchoMaximoDelMapa = 480;

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa -20;
}

alturaQueBuscamos = anchoDelMapa * 600 / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

mapaBackground.src = './assets/mokemap.webp';

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 40;
        this.alto = 40;
        this.x = aleatorio(0, mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height - this.alto);
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodogeObj = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.png')

let capipepoObj = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.png')

let ratigueyaObj = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueya.webp')

let hipodogeObjEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5, './assets/hipodoge.png')

let capipepoObjEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5, './assets/capipepo.png')

let ratigueyaObjEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueya.webp')

hipodogeObj.ataques.push(
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '💧', id: 'btn-agua'},
    {nombre: '🔥', id: 'btn-fuego'},
    {nombre: '🌱', id: 'btn-tierra'},
);

hipodogeObjEnemigo.ataques.push(
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

capipepoObjEnemigo.ataques.push(
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

ratigueyaObjEnemigo.ataques.push(
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
    seccionVerMapa.style.display = 'none';

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

    moverArribaVar.addEventListener('mousedown', moverArriba);
    moverAbajoVar.addEventListener('mousedown', moverAbajo);
    moverDerechaVar.addEventListener('mousedown', moverDerecha);
    moverIzquierdaVar.addEventListener('mousedown', moverIzquierda);

    moverArribaVar.addEventListener('mouseup', detenerMovimiento);
    moverAbajoVar.addEventListener('mouseup', detenerMovimiento);
    moverDerechaVar.addEventListener('mouseup', detenerMovimiento);
    moverIzquierdaVar.addEventListener('mouseup', detenerMovimiento);
    
    btnReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador(){
    
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
    
    seccionVerMapa.style.display = 'flex';
    iniciarMapa();
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
                boton.disable = true;
                boton.style.background = '#112f58';
            }else if (e.target.textContent === '💧'){
                ataqueJugador.push('AGUA');
                console.log(ataqueJugador);
                boton.disable = true;
                boton.style.background = '#112f58';
            }else{
                ataqueJugador.push('TIERRA');
                console.log(ataqueJugador);
                boton.disable = true;
                boton.style.background = '#112f58';
            }
            ataqueAleatorioEnemigo();
        });
    });
}

function seleccionarMascotaEnemigo(enemigo){
    
    mascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesMokeponEnemigo = enemigo.ataques;
    secuenciaAtaque();
}

function aleatorio(min, max){
    return Math.floor(Math.random()* (max - min +1) +min);
}

function ataqueAleatorioEnemigo(){
    let ataqueAleaotorio = aleatorio(0,ataquesMokeponEnemigo.length -1);

    if (ataqueAleaotorio == 0 || ataqueAleaotorio == 1) {
        ataqueEnemigo.push('FUEGO');
    }else if(ataqueAleaotorio == 3 || ataqueAleaotorio == 4){
        ataqueEnemigo.push('AGUA');
    }else{
        ataqueEnemigo.push('TIERRA');
    }
    console.log(ataqueEnemigo);
    IniciarPelea();
}

function IniciarPelea(){
    if (ataqueJugador.length === 5) {
        combate();
    }
}

function crearMensaje(resultado){
    let NuevoataqueDelJugador = document.createElement('p');
    let NuevoataqueDelEnemigo = document.createElement('p');

    seccionMensajes.innerHTML = resultado;
    NuevoataqueDelJugador.innerHTML = indexAtaqueJugador;
    NuevoataqueDelEnemigo.innerHTML = indexAtaqueEnemigo;
    
    ataqueDelJugador.appendChild(NuevoataqueDelJugador);
    ataqueDelEnemigo.appendChild(NuevoataqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    seccionMensajes.innerHTML = resultadoFinal;
    seccionReiniciar.style.display = 'flex';
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate(){
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index);
            crearMensaje('EMPATE');
        }else if(ataqueJugador[index]=== 'FUEGO' && ataqueEnemigo[index]=== 'TIERRA'){
            indexAmbosOponentes(index,index);
            victoriasJugador++;
            vidasJugador.innerHTML = victoriasJugador;
            crearMensaje('GANASTE');
        }else if(ataqueJugador[index]=== 'AGUA' && ataqueEnemigo[index]=== 'FUEGO'){
            indexAmbosOponentes(index,index);
            victoriasJugador++;
            vidasJugador.innerHTML = victoriasJugador;
            crearMensaje('GANASTE');
        }else if(ataqueJugador[index]=== 'TIERRA' && ataqueEnemigo[index]=== 'AGUA'){
            indexAmbosOponentes(index,index);
            victoriasJugador++;
            vidasJugador.innerHTML = victoriasJugador;
            crearMensaje('GANASTE');
        }else{
            indexAmbosOponentes(index,index);
            victoriasEnemigo++;
            vidasEnemigo.innerHTML = victoriasEnemigo;
            crearMensaje('PERDISTE');
        }    
    }
    
    revisarVidas();
}

function revisarVidas(){
    if (victoriasJugador ===  victoriasEnemigo) {
        crearMensajeFinal('Esto Fue Un Empate');
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('FELICITACIONES, ¡GANASTE! :)');
    }else{
        crearMensajeFinal('LO SIENTO, ¡PERDISTE! :(')
    }
}

function reiniciarJuego(){
    location.reload();
}

function pintarCanvas(){

    mokeponCanvas.x = mokeponCanvas.x + mokeponCanvas.velocidadX;
    mokeponCanvas.y = mokeponCanvas.y + mokeponCanvas.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mokeponCanvas.pintarMokepon();
    hipodogeObjEnemigo.pintarMokepon();
    capipepoObjEnemigo.pintarMokepon();
    ratigueyaObjEnemigo.pintarMokepon();

    if (mokeponCanvas.velocidadX !== 0||
        mokeponCanvas.velocidadY !== 0) {
        
            revisarColision(hipodogeObjEnemigo);
            revisarColision(capipepoObjEnemigo);
            revisarColision(ratigueyaObjEnemigo);
    }
}

function moverArriba(){
    mokeponCanvas.velocidadY = -5;
}

function moverAbajo(){
    mokeponCanvas.velocidadY = 5;
}

function moverIzquierda(){
   mokeponCanvas.velocidadX = -5;
}

function moverDerecha(){
    mokeponCanvas.velocidadX = 5;
}

function detenerMovimiento(){
    mokeponCanvas.velocidadX = 0;
    mokeponCanvas.velocidadY = 0;
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba();
            break;
        case 'ArrowDown':
            moverAbajo();
            break;
        case 'ArrowLeft':
            moverIzquierda();
            break;
        case 'ArrowRight':
            moverDerecha();
            break;
        default:
            break;
    }
}

function iniciarMapa(){
    mokeponCanvas = obtenerObjetoMascota();
    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador2 === mokepones[i].nombre) {
            return mokepones[i];
        }
        
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x; 

    const arribaMascota = mokeponCanvas.y;
    const abajoMascota = mokeponCanvas.y + mokeponCanvas.alto;
    const derechaMascota = mokeponCanvas.x + mokeponCanvas.ancho;
    const izquierdaMascota = mokeponCanvas.x; 
    
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento();
    clearInterval(intervalo);
    seccionAtaque.style.display = 'flex';
    seccionVerMapa.style.display = 'none';
    seleccionarMascotaEnemigo(enemigo);
    
}
window.addEventListener('load', iniciarJuego);