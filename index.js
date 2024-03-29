//variaveis de uso global
var direcao = '';
var pontuacao_atual = 0;
var partes_do_corpo = [];
var historico_de_posicoes = [];
var velocidade_x = 0;
var velocidade_y = 0;
var sizeObjects = 0;
var sizeBorder = 0;
var sizeBackground = 0;
var playing = true;
function init(){
    if(window.innerHeight < window.innerWidth){
        document.getElementById('botoes').style.display = 'none';
    }
    //criar a lista de posicoes
    let posicoes = [];
    let contador  = 10;
    while(contador<=390){
        posicoes.push(contador);
        contador += 10;
    }
    //posicionando objetos//
    //fundo
    if(window.innerHeight > window.innerWidth){
        sizeBackground = (window.innerWidth / 10) * 9;
        sizeBorder = (window.innerWidth/10)/2;
        document.getElementById('pontuacao').style.left = (sizeBorder) + 'px';
        document.getElementById('pontuacao').style.bottom = (window.innerHeight/100*25) + 'px';
        document.getElementById('novamente').style.right = (sizeBorder) + 'px';
        document.getElementById('novamente').style.bottom = (window.innerHeight/100*25) + 'px';
    }
    else{
        sizeBackground = (window.innerHeight / 10) * 9;
        sizeBorder = (window.innerHeight/10)/2;
        document.getElementById('pontuacao').style.left = (sizeBackground + (sizeBorder*4)) + 'px';
        document.getElementById('pontuacao').style.top = ((window.innerHeight/10)*3) + 'px';
        document.getElementById('novamente').style.left = (sizeBackground + (sizeBorder*4)) + 'px';
        document.getElementById('novamente').style.top = ((window.innerHeight/10)*7) + 'px';
        
    }
    document.getElementById("fundo").style.width = sizeBackground + 'px';
    document.getElementById("fundo").style.height = sizeBackground + 'px';
    document.getElementById("fundo").style.left = sizeBorder + 'px';
    document.getElementById("fundo").style.top = sizeBorder + 'px';
    sizeObjects = sizeBackground / 50;
    //cabeca
    document.getElementById("head").style.width =  sizeObjects + 'px';
    document.getElementById("head").style.height = sizeObjects + 'px';
    document.getElementById("head").style.left = (sizeBorder+sizeObjects) + 'px';
    document.getElementById("head").style.top = (sizeBorder+sizeObjects) + 'px';
    //food
    document.getElementById('comida').style.width = sizeObjects + 'px';
    document.getElementById('comida').style.height = sizeObjects + 'px';
    //body
    document.getElementById('corpo').style.width = sizeObjects + 'px';
    document.getElementById('corpo').style.height = sizeObjects + 'px';
    //morte
    let morte = document.getElementById('morte');
    morte.style.left = ((window.innerWidth/2) - 200) + 'px';
    morte.style.top = ((window.innerHeight/2) - 200) + 'px';
    //colocar comida
    colocar_comida();
    let head = document.getElementById('head');
    let comida = document.getElementById('comida'); 
    n_head_top = parseInt(head.style.top.slice(0,-2));
    n_head_left = parseInt(head.style.left.slice(0,-2));
    n_comida_top = parseInt(comida.style.top.slice(0,-2));
    n_comida_left = parseInt(comida.style.left.slice(0,-2));
    historico_de_posicoes.unshift([head.style.left,head.style.top]);
    
    //rotina de atualização
    setInterval(loop,200);
    //ouvir teclado
    document.addEventListener ('keypress', (event) => {
    const keyName = event.key;
    direcao=keyName;
    })
}
function inputs(input){
    direcao = input;
    return true;
}
function mover(direcao){
    let head = document.getElementById('head');
    if(direcao=="w"){
        head.style.top = (parseInt(head.style.top.slice(0,-2)) - sizeObjects) + 'px'};    
        velocidade_y = 10  
        velocidade_x = 0
    if(direcao=="s"){
        head.style.top = (parseInt(head.style.top.slice(0,-2)) + sizeObjects) + 'px'};
        velocidade_y = - 10
        velocidade_x = 0
    if(direcao=="a"){
        head.style.left = (parseInt(head.style.left.slice(0,-2)) - sizeObjects) + 'px'};
        velocidade_x = -10
        velocidade_y = 0
    if(direcao=="d"){
        head.style.left = (parseInt(head.style.left.slice(0,-2)) + sizeObjects) + 'px'};
        velocidade_x = 10
        velocidade_y = 0
    }
function morrer(){
    direcao = '';
    document.getElementById("head").style.left = (window.innerWidth/2) + 'px';
    document.getElementById("head").style.top = (window.innerHeight/2) + 'px';
    document.getElementById('morte').style.visibility = 'visible';
    document.getElementById('pontuacao').style.visibility = 'hidden';
    document.getElementById('novamente').style.visibility = 'hidden';
    }
function loop(){
    if(!playing){
        return 0;
    }
    mover(direcao);
    atualizar_partes_do_corpo();
    let head = document.getElementById('head');
    let comida = document.getElementById('comida'); 
    if(velocidade_x != 0 || velocidade_y != 0){
        historico_de_posicoes.unshift([head.style.left,head.style.top]);
    }
    
    //colisao com as laterais
    if(
        ((parseInt(head.style.left.slice(0,-2)))<sizeBorder-sizeObjects)||
    ((parseInt(head.style.left.slice(0,-2)))>sizeBackground+sizeBorder)||
    ((parseInt(head.style.top.slice(0,-2)))<sizeBorder-sizeObjects)||
    ((parseInt(head.style.top.slice(0,-2)))>sizeBorder + sizeBackground)){
        console.log("Snake is dead");
        morrer();
    }
    
    //colisao com a comida
    n_head_top = parseInt(head.style.top.slice(0,-2));
    n_head_left = parseInt(head.style.left.slice(0,-2));
    n_comida_top = parseInt(comida.style.top.slice(0,-2));
    n_comida_left = parseInt(comida.style.left.slice(0,-2));
    if(n_head_left > n_comida_left - 10 && n_head_left < n_comida_left + 10 &&
    n_head_top > n_comida_top - 10 &&  n_head_top < n_comida_top + 10){
    colocar_comida();
    pontuacao_atual ++;
    console.log('Snake did eat the food')
    let  novo_corpo = document.getElementById("corpo").cloneNode(true);
    partes_do_corpo.unshift([partes_do_corpo.length,novo_corpo]);
    document.getElementById('fundo').appendChild(novo_corpo);
    }
    //verificar colisao com o corpo
    for(i =0;i<partes_do_corpo.length;i++){
        let objeto = partes_do_corpo[i][1];
        if((objeto.style.left == head.style.left) && (objeto.style.top == head.style.top)){
            morrer();
        }
    }
    //atualizar pontucao
    document.getElementById('pontuacao').innerText = 'Score: ' + pontuacao_atual;
}
function atualizar_partes_do_corpo(){
    for(i = 0;i < partes_do_corpo.length;i++){
        partes_do_corpo[i][1].style.left =  historico_de_posicoes[partes_do_corpo[i][0]][0];
        partes_do_corpo[i][1].style.top = historico_de_posicoes[partes_do_corpo[i][0]][1];
    }
}
function reiniciar(){
    window.location.reload();
}   
function colocar_comida(){
    //criar a lista de posicoes
    let x,y;
    let posicoes = [];
    let contador  = sizeObjects;
    //console.log(parseInt(sizeBackground));
    while(contador<=sizeBackground-(sizeObjects)){
        posicoes.push(contador);
        contador += sizeObjects;
    }
    
    if (posicoes.length > 2){
        while(true){
            let posicao_x = Math.round((Math.random()*posicoes.length));
            let posicao_y = Math.round((Math.random()*posicoes.length));
            let posicoes_teste = [posicao_x,posicao_y];
            if(historico_de_posicoes.indexOf(posicoes_teste) == -1){
                x = posicoes[posicao_x];
                y = posicoes[posicao_y];
                break;
            }
        }
        document.getElementById('comida').style.left = (sizeBorder + x) + 'px';
        document.getElementById('comida').style.top = (sizeBorder + y) + 'px';
    }
}