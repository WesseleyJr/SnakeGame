window.onload = function(){

    var stage = document.getElementById('stage');
    var ctx = stage.getContext("2d");
    var go = document.getElementById('go');
    document.addEventListener("keydown", keyPush);

    setInterval(game, 1000/15);
    //setar a velocidade da cobra

    const vel = 1;

    var vx = 0;
    var vy = 0;
    // vx e vy      velocidade da cobra
    var px = 10;
    var py = 10;
    // px e py       cabeça da cobra
    var tp = 20;
    // lp            tamanho da peça
    var qp = 20;
    // qp            quantidade de peças
    var ax = 15;
    var ay = 15;
    // ax e ay       posição da maça

    var trail = [];
    // trail         rastro
    tail = 5;
    // tail          tamanho da calda

    function game(){
        px += vx;
        py += vy;
        //ponto inical recebe velocidade inicial

        if (px<0){
            px = qp-1;
        }
        if(px > qp-1){
            px = 0;
        }
        if (py < 0){
            py = qp-1;
        }
        if (py > qp-1){
            py = 0;
        }
        // ao atingir a borda sai do outro lado

        ctx.fillStyle = "black";
        ctx.fillRect(0,0, stage.width, stage.height);
        //pintar a tela

        ctx.fillStyle = "red";
        ctx.fillRect (ax * tp, ay * tp, tp, tp);
        //pintar a maça

        ctx.fillStyle = "gray";
        for (var i = 0; i < trail.length; i++){
            ctx.fillRect (trail[i].x*tp, trail[i].y*tp, tp-1, tp-1);
            go.style = "display: none";
            // pintar a cobra
            if (trail[i].x == px && trail[i].y == py){
                vx = vy = 0;
                tail = 5;
                go.style = "display: block";

            }
            else{
                go.style = "display: none";
            }
        }
        //verificar se a cobra está batendo nela mesma

        trail.push({x:px, y:py})
        while (trail.length > tail){
            trail.shift();
        }
        //estou garantindo que o rastro não vai ser maior que a cobra

        if (ax == px && ay==py){
            tail++;
            ax = Math.floor(Math.random()*qp);
            ay = Math.floor(Math.random()*qp);
        }
        //ao pegar a maça cresce
              
    }

    function keyPush(event){
        switch (event.keyCode){
            case 37: 
            // tecla da esquerda
                vx = -vel;
                vy = 0;
                break;

            case 38: 
            // tecla da cima
                vx = 0;
                vy = -vel;
                break;

            case 39: 
            // tecla da direita
                vx = vel;
                vy = 0;
                break;
            case 40: 
            // tecla da baixo
                vx = 0;
                vy = vel;
                break;
        }
    }
}

