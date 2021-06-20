let canvas = document.getElementById("cobra"); // variavel canvas indicada pelo ID cobra referenciada a posição na tag<canvas>
let context = canvas.getContext("2d"); // formato 2D pelo .getContext
let box = 32;
let cobra = []; //criar cobrinha um array de posiçoes
cobra[0] = {
    x: 8 * box,
    y: 8 * box
}
let direcao = "right";
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarPista() {
    context.fillStyle = "lightgreen";                          //comando .fillstyle da cor aos objeto 
    context.fillRect(0, 0, 16 * box, 16 * box);               //comando fillrect constroi o formato do objeto informado os 04 paramento pedido 
}

function criarCobrinha() {
    for (i = 0; i < cobra.length; i++) {
        context.fillStyle = "black";                         //comando .fillstyle da cor aos objeto
        context.fillRect(cobra[i].x, cobra[i].y, box, box);  //comando fillrect constroi o formato do objeto informado os 04 paramento pedido 
    }
}

function comer() {
    context.fillStyle = "blue";
    context.fillRect(comida.x,comida.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direcao != 'right') direcao = 'left';
    if (event.keyCode == 38 && direcao != 'down') direcao = 'up';
    if (event.keyCode == 39 && direcao != 'left') direcao = 'right';
    if (event.keyCode == 40 && direcao != 'up') direcao = 'down';
}

function iniciarJogo() {

    if (cobra[0].x > 15 * box && direcao == "right") cobra[0].x = 0;
    if (cobra[0].x < 0 && direcaon == 'left') cobra[0].x = 16 * box;
    if (cobra[0].y > 15 * box && direcao == "down") cobra[0].y = 0;
    if (cobra[0].y < 0 && direcao == 'up') cobra[0].y = 16 * box;

    for (i = 1; i < cobra.length; i++) {
        if (cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y) {
            clearInterval(jogo); //metodo limpa o jogo
            alert('Game Over ');//caixa de alerta
        }
    }

    criarPista();
    criarCobrinha();
    comer();

    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;

    if (direcao == "right") cobraX += box;
    if (direcao == "left") cobraX -= box;
    if (direcao == "up") cobraY -= box;
    if (direcao == "down") cobraY += box;

    if (cobraX != comida.x || cobraY != comida.y) {
        cobra.pop(); //pop tira o último elemento da lista
    } else {
        comida.x = Math.floor(Math.random() * 15 + 1) * box;
        comida.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: cobraX,
        y: cobraY
    }

    cobra.unshift(newHead); //método unshift adiciona nova peça
}

let jogo = setInterval(iniciarJogo, 100);//metodo de uso conntinuo de movimento, chama o metodo, e o tempo de execução