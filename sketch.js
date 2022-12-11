//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 26;
let raio = diametro / 2;

//variáveis da raquete
let xdo1 = 5;
let ydo1 = 150;
let raquetecomp = 13;
let raquetealt = 97;
let borda = 5;

//variáveis do oponente
let xdo2 = 582;
let ydo2 = 150;
let velocidade;
let chanceDeErrar = 0;

//variável de colisão
let colidiu = false;

//placar do jogo
let pontos1 = 0;
let pontos2 = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//função de ambiente
function setup() {
    createCanvas(600, 400);
    trilha.loop();
}

//funções principais
function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    colisaoborda();
    mostraRaquete(xdo1,ydo1);
    mostraRaquete(xdo2,ydo2);
    movimentaMinhaRaquete();
    setTimeout(colisaoraquete(xdo1,ydo1), 20);
    setTimeout(colisaoraquete(xdo2,ydo2), 20);
    oponente();
    incluiPlacar();
    marcaPonto();
    bolinhaNaoFicaPresa();
    calculaChanceDeErrar();
}

//cria a bolinha
function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro)
}


//faz a bolinha se mover
function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

//colisão de borda
function colisaoborda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
    }
}

//ciação das raquetes
function mostraRaquete(x,y) {
    rect(x, y, raquetecomp, raquetealt, borda);
}


//movimentação da minha raquete
function movimentaMinhaRaquete() {
  if(ydo1 >= 0){
    if (keyIsDown(UP_ARROW)) {
        ydo1 -= 10;
    }}
  if(ydo1 <= height - raquetealt){
    if (keyIsDown(DOWN_ARROW)) {
        ydo1 += 10;
    }}
}

function colisaoraquete(x,y) {
    colidiu = collideRectCircle(x, y, raquetecomp, raquetealt, xBolinha, yBolinha, raio)
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
  }
}

function oponente() {
    velocidade = yBolinha - ydo2 - raquetecomp / 2 - 30;
    ydo2 += velocidade + chanceDeErrar;
    calculaChanceDeErrar()
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(pontos1, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontos2, 470, 26);
}

function marcaPonto() {
    if (xBolinha > 585) {
        pontos1 += 1;
        ponto.play();
    }
    if (xBolinha < 15) {
        pontos2 += 1;
        ponto.play();
    }
}

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function calculaChanceDeErrar() {
  if (pontos2 >= pontos1) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 28;
    }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio > 600){
    xBolinha = 577;
    }
}
