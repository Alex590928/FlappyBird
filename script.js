let cvs = document.getElementById("canvas");
let ctx = cvs.getContext('2d');

let bird = new Image(),
    bg = new Image(),
    fg = new Image(),
    pipeUp = new Image(),
    pipeBottom = new Image();

    bird.src = 'img/bird.png';
    bg.src = 'img/bg.png';
    fg.src = 'img/fg.png';
    pipeUp.src = 'img/pipeUp.png';
    pipeBottom.src = 'img/pipeBottom.png';

    // audio
    let fly = new Audio(),
        score_audio = new Audio();

    fly.src = 'audio/fly.mp3';
    score_audio.src = 'audio/score.mp3';

    var gap = 90;

    //Блоки
    let pipe = [];

    pipe[0] = {
        x : cvs.clientWidth,
        y : 0
    }

    // Нажитие кнопок
    moveUp = () => {
        yPos -= 35;
        fly.play();
    }
    document.addEventListener('keydown', moveUp);

    let = score = 0;
    // Позиция птицы
    let xPos = 10,
        yPos = 150,
        grav = 1.5;

    draw = () => {
        ctx.drawImage(bg, 0, 0);

        for(let i = 0; i < pipe.length; i++) {
            ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    
            pipe[i].x--;

            if(pipe[i].x == 125) {
                pipe.push({
                    x : cvs.width,
                    y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
                });
            }

            // Отслеживание прикосновений
            if (xPos + bird.width >= pipe[i].x 
                && xPos <= pipe[i].x + pipeUp.width 
                && (yPos <= pipe[i].y + pipeUp.height 
                || yPos + bird.height >= pipe[i].y
                + pipeUp.height + gap) 
                || yPos + bird.height >= cvs.height - fg.height) {
                    location.reload(); //reset
                }

            if (pipe[i].x == 5) {
                score++;
                score_audio.play();
            }
        }
       
        ctx.drawImage(fg, 0, cvs.height - fg.height);
        ctx.drawImage(bird, xPos, yPos);

        yPos += grav;

        ctx.fillStyle = "#000";
        ctx.font = '24px Verdana';
        ctx.fillText('Счет: ' + score, 10, cvs.height -20);
        requestAnimationFrame(draw);
    }


    pipeBottom.onload = draw;