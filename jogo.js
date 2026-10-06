// ======================================================
// CONFIGURAÇÃO DO JOGO
// ======================================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const larguraTela = canvas.width;
const alturaTela = canvas.height;


// ======================================================
// COELHO
// ======================================================

const jogador = {

    // Posição horizontal
    x: 80,

    // Posição vertical
    y: 200,

    // Tamanho
    largura: 40,
    altura: 50,

    // Velocidade vertical
    velocidadeY: 0,

    // Força do pulo
    forcaPulo: -12,

    // Verifica se o coelho está no chão
    noChao: true
};


// ======================================================
// GRAVIDADE
// ======================================================

const gravidade = 0.6;


// ======================================================
// CACTOS
// ======================================================

let cactos = [];

// Velocidade dos cactos
const velocidadeCacto = 5;

// Contador para o próximo cacto
let proximoCacto = 60;


// ======================================================
// ESTADO DO JOGO
// ======================================================

// false = jogo funcionando
// true = GAME OVER
let jogoAcabou = false;


// ======================================================
// DESENHAR O COELHO
// ======================================================

function desenharJogador() {

    // Corpo
    ctx.fillStyle = "#555555";

    ctx.fillRect(
        jogador.x,
        jogador.y,
        jogador.largura,
        jogador.altura
    );


    // Cabeça
    ctx.fillRect(
        jogador.x + 25,
        jogador.y - 20,
        35,
        35
    );


    // Orelha esquerda
    ctx.fillRect(
        jogador.x + 28,
        jogador.y - 35,
        8,
        20
    );


    // Orelha direita
    ctx.fillRect(
        jogador.x + 42,
        jogador.y - 35,
        8,
        20
    );


    // Olho
    ctx.fillStyle = "black";

    ctx.fillRect(
        jogador.x + 48,
        jogador.y - 10,
        5,
        5
    );
}


// ======================================================
// CRIAR CACTO
// ======================================================

function criarCacto() {

    // Alturas possíveis
    const alturas = [30, 45, 60, 75];

    // Escolhe uma altura aleatória
    const altura =
        alturas[Math.floor(Math.random() * alturas.length)];


    // Largura aleatória
    const largura =
        15 + Math.floor(Math.random() * 15);


    // Cria o cacto
    const cacto = {

        // Começa fora do lado direito da tela
        x: larguraTela + 10,

        // Faz o cacto ficar apoiado no chão
        y: 250 - altura,

        largura: largura,
        altura: altura
    };


    // Coloca o cacto na lista
    cactos.push(cacto);
}


// ======================================================
// DESENHAR CACTOS
// ======================================================

function desenharCactos() {

    for (let i = 0; i < cactos.length; i++) {

        const cacto = cactos[i];


        // Corpo verde
        ctx.fillStyle = "#2e8b57";

        ctx.fillRect(
            cacto.x,
            cacto.y,
            cacto.largura,
            cacto.altura
        );


        // Braço esquerdo
        if (cacto.altura > 40) {

            ctx.fillRect(
                cacto.x - 8,
                cacto.y + 15,
                8,
                8
            );

            ctx.fillRect(
                cacto.x - 8,
                cacto.y + 15,
                5,
                18
            );
        }


        // Braço direito
        if (cacto.altura > 55) {

            ctx.fillRect(
                cacto.x + cacto.largura,
                cacto.y + 25,
                8,
                8
            );

            ctx.fillRect(
                cacto.x + cacto.largura + 3,
                cacto.y + 10,
                5,
                20
            );
        }
    }
}


// ======================================================
// FAZER O COELHO PULAR
// ======================================================

function pular() {

    // Só permite pular quando está no chão
    if (jogador.noChao) {

        // Dá uma velocidade para cima
        jogador.velocidadeY = jogador.forcaPulo;

        // Agora o coelho está no ar
        jogador.noChao = false;
    }
}


// ======================================================
// ATUALIZAR O COELHO
// ======================================================

function atualizarJogador() {

    // Aplica a gravidade
    jogador.velocidadeY += gravidade;

    // Move o jogador verticalmente
    jogador.y += jogador.velocidadeY;


    // Altura do chão
    const chao = 200;


    // Se o jogador chegou ao chão
    if (jogador.y >= chao) {

        jogador.y = chao;

        // Para a queda
        jogador.velocidadeY = 0;

        // Permite pular novamente
        jogador.noChao = true;
    }
}


// ======================================================
// ATUALIZAR CACTOS
// ======================================================

function atualizarCactos() {

    for (let i = 0; i < cactos.length; i++) {

        // Move o cacto para a esquerda
        cactos[i].x -= velocidadeCacto;
    }


    // Remove cactos que saíram da tela
    for (let i = cactos.length - 1; i >= 0; i--) {

        if (cactos[i].x + cactos[i].largura < 0) {

            cactos.splice(i, 1);
        }
    }
}


// ======================================================
// CONTROLAR APARECIMENTO DOS CACTOS
// ======================================================

function controlarNascimentoDosCactos() {

    proximoCacto--;


    if (proximoCacto <= 0) {

        criarCacto();


        // Escolhe aleatoriamente quando aparecerá
        // o próximo cacto
        proximoCacto =
            50 + Math.floor(Math.random() * 80);
    }
}


// ======================================================
// DETECTAR COLISÃO
// ======================================================

function verificarColisao() {

    for (let i = 0; i < cactos.length; i++) {

        const cacto = cactos[i];


        // Verifica se os dois retângulos
        // estão se sobrepondo
        if (

            jogador.x < cacto.x + cacto.largura &&

            jogador.x + jogador.largura > cacto.x &&

            jogador.y < cacto.y + cacto.altura &&

            jogador.y + jogador.altura > cacto.y

        ) {

            // O coelho bateu no cacto
            jogoAcabou = true;

            return;
        }
    }
}


// ======================================================
// DESENHAR O CHÃO
// ======================================================

function desenharChao() {

    ctx.fillStyle = "#555555";

    ctx.fillRect(
        0,
        250,
        larguraTela,
        3
    );
}


// ======================================================
// DESENHAR GAME OVER
// ======================================================

function desenharGameOver() {

    // Fundo branco transparente
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";

    ctx.fillRect(
        0,
        0,
        larguraTela,
        alturaTela
    );


    // GAME OVER
    ctx.fillStyle = "#222222";

    ctx.font = "bold 50px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "GAME OVER",
        larguraTela / 2,
        135
    );


    // Mensagem
    ctx.font = "20px Arial";

    ctx.fillText(
        "aperte espaço para jogar de novo",
        larguraTela / 2,
        175
    );
}


// ======================================================
// ATUALIZAR O JOGO
// ======================================================

function atualizar() {

    // Se o jogo acabou, não atualiza mais nada
    if (jogoAcabou) {
        return;
    }


    // Atualiza o movimento do coelho
    atualizarJogador();


    // Atualiza os cactos
    atualizarCactos();


    // Cria novos cactos
    controlarNascimentoDosCactos();


    // Verifica colisões
    verificarColisao();
}


// ======================================================
// DESENHAR TUDO
// ======================================================

function desenhar() {

    // Limpa a tela
    ctx.clearRect(
        0,
        0,
        larguraTela,
        alturaTela
    );


    // Desenha o chão
    desenharChao();


    // Desenha o coelho
    desenharJogador();


    // Desenha os cactos
    desenharCactos();


    // Se perdeu, mostra a mensagem
    if (jogoAcabou) {

        desenharGameOver();
    }
}


// ======================================================
// REINICIAR O JOGO
// ======================================================

function reiniciarJogo() {

    // Remove todos os cactos
    cactos = [];


    // Coloca o coelho na posição inicial
    jogador.x = 80;
    jogador.y = 200;


    // Zera a velocidade vertical
    jogador.velocidadeY = 0;


    // Coloca o coelho no chão
    jogador.noChao = true;


    // Reinicia o contador dos cactos
    proximoCacto = 60;


    // Volta o jogo ao normal
    jogoAcabou = false;
}


// ======================================================
// CONTROLE DO TECLADO
// ======================================================

document.addEventListener("keydown", function(event) {

    // Verifica se a tecla apertada foi Espaço
    if (event.code === "Space") {

        // Evita que a página role para baixo
        event.preventDefault();


        // Se o jogo acabou,
        // Espaço reinicia o jogo
        if (jogoAcabou) {

            reiniciarJogo();

        } else {

            // Se o jogo está funcionando,
            // Espaço faz o coelho pular
            pular();
        }
    }
});


// ======================================================
// LOOP PRINCIPAL
// ======================================================

function loop() {

    // Atualiza o jogo
    atualizar();


    // Desenha o jogo
    desenhar();


    // Continua o jogo
    requestAnimationFrame(loop);
}


// ======================================================
// INICIAR O JOGO
// ======================================================

loop();// ======================================================
// CONFIGURAÇÃO DO JOGO
// ======================================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const larguraTela = canvas.width;
const alturaTela = canvas.height;


// ======================================================
// COELHO
// ======================================================

const jogador = {

    x: 80,
    y: 200,

    largura: 40,
    altura: 50,

    // Velocidade vertical
    velocidadeY: 0,

    // Força do pulo
    forcaPulo: -12,

    // Diz se o coelho está no chão
    noChao: true
};


// ======================================================
// GRAVIDADE
// ======================================================

const gravidade = 0.6;


// ======================================================
// CACTOS
// ======================================================

let cactos = [];

// Velocidade inicial dos cactos
const velocidadeInicial = 5;

// Velocidade atual
let velocidadeCacto = velocidadeInicial;

// Velocidade máxima para o jogo não ficar impossível
const velocidadeMaxima = 8;


// ======================================================
// CONTROLE DOS CACTOS
// ======================================================

let proximoCacto = 60;


// ======================================================
// PONTUAÇÃO
// ======================================================

// Pontuação atual
let pontuacao = 0;

// Contador usado para aumentar a pontuação
let contadorPontuacao = 0;

// Pontuação necessária para aumentar a velocidade
let proximaAceleracao = 100;


// ======================================================
// ESTADO DO JOGO
// ======================================================

let jogoAcabou = false;


// ======================================================
// DESENHAR O COELHO
// ======================================================

function desenharJogador() {

    // Corpo
    ctx.fillStyle = "#555555";

    ctx.fillRect(
        jogador.x,
        jogador.y,
        jogador.largura,
        jogador.altura
    );


    // Cabeça
    ctx.fillRect(
        jogador.x + 25,
        jogador.y - 20,
        35,
        35
    );


    // Orelha esquerda
    ctx.fillRect(
        jogador.x + 28,
        jogador.y - 35,
        8,
        20
    );


    // Orelha direita
    ctx.fillRect(
        jogador.x + 42,
        jogador.y - 35,
        8,
        20
    );


    // Olho
    ctx.fillStyle = "black";

    ctx.fillRect(
        jogador.x + 48,
        jogador.y - 10,
        5,
        5
    );
}


// ======================================================
// CRIAR CACTO
// ======================================================

function criarCacto() {

    // Alturas possíveis
    const alturas = [30, 45, 60, 75];

    // Escolhe uma altura aleatória
    const altura =
        alturas[Math.floor(Math.random() * alturas.length)];


    // Largura aleatória
    const largura =
        15 + Math.floor(Math.random() * 15);


    const cacto = {

        // Começa fora da tela
        x: larguraTela + 10,

        // Fica apoiado no chão
        y: 250 - altura,

        largura: largura,
        altura: altura
    };


    cactos.push(cacto);
}


// ======================================================
// DESENHAR CACTOS
// ======================================================

function desenharCactos() {

    for (let i = 0; i < cactos.length; i++) {

        const cacto = cactos[i];


        // Corpo verde
        ctx.fillStyle = "#2e8b57";

        ctx.fillRect(
            cacto.x,
            cacto.y,
            cacto.largura,
            cacto.altura
        );


        // Braço esquerdo
        if (cacto.altura > 40) {

            ctx.fillRect(
                cacto.x - 8,
                cacto.y + 15,
                8,
                8
            );

            ctx.fillRect(
                cacto.x - 8,
                cacto.y + 15,
                5,
                18
            );
        }


        // Braço direito
        if (cacto.altura > 55) {

            ctx.fillRect(
                cacto.x + cacto.largura,
                cacto.y + 25,
                8,
                8
            );

            ctx.fillRect(
                cacto.x + cacto.largura + 3,
                cacto.y + 10,
                5,
                20
            );
        }
    }
}


// ======================================================
// DESENHAR PONTUAÇÃO
// ======================================================

function desenharPontuacao() {

    // Converte a pontuação para texto
    // com exatamente 5 dígitos.
    //
    // Exemplos:
    // 5    -> 00005
    // 25   -> 00025
    // 125  -> 00125
    // 9999 -> 09999

    const textoPontuacao =
        String(pontuacao).padStart(5, "0");


    // Configuração do texto
    ctx.fillStyle = "#333333";

    ctx.font = "bold 22px Arial";

    ctx.textAlign = "right";


    // Desenha no canto superior direito
    ctx.fillText(
        textoPontuacao,
        larguraTela - 20,
        30
    );
}


// ======================================================
// ATUALIZAR PONTUAÇÃO
// ======================================================

function atualizarPontuacao() {

    // Aumenta o contador a cada quadro
    contadorPontuacao++;


    // Aproximadamente a cada 10 quadros,
    // aumenta 1 ponto.
    if (contadorPontuacao >= 10) {

        pontuacao++;

        contadorPontuacao = 0;
    }


    // Verifica se chegou a uma nova marca de 100 pontos
    if (pontuacao >= proximaAceleracao) {

        // Aumenta um pouco a velocidade
        velocidadeCacto += 0.5;


        // Nunca deixa passar da velocidade máxima
        if (velocidadeCacto > velocidadeMaxima) {

            velocidadeCacto = velocidadeMaxima;
        }


        // Próxima aceleração será em mais 100 pontos
        proximaAceleracao += 100;
    }
}


// ======================================================
// FAZER O COELHO PULAR
// ======================================================

function pular() {

    // Só pode pular quando está no chão
    if (jogador.noChao) {

        jogador.velocidadeY = jogador.forcaPulo;

        jogador.noChao = false;
    }
}


// ======================================================
// ATUALIZAR O COELHO
// ======================================================

function atualizarJogador() {

    // Aplica a gravidade
    jogador.velocidadeY += gravidade;

    // Move o coelho verticalmente
    jogador.y += jogador.velocidadeY;


    // Posição do chão
    const chao = 200;


    // Se chegou ao chão
    if (jogador.y >= chao) {

        jogador.y = chao;

        jogador.velocidadeY = 0;

        jogador.noChao = true;
    }
}


// ======================================================
// ATUALIZAR CACTOS
// ======================================================

function atualizarCactos() {

    for (let i = 0; i < cactos.length; i++) {

        // Move os cactos usando a velocidade atual
        cactos[i].x -= velocidadeCacto;
    }


    // Remove os cactos que saíram da tela
    for (let i = cactos.length - 1; i >= 0; i--) {

        if (cactos[i].x + cactos[i].largura < 0) {

            cactos.splice(i, 1);
        }
    }
}


// ======================================================
// CONTROLAR APARECIMENTO DOS CACTOS
// ======================================================

function controlarNascimentoDosCactos() {

    proximoCacto--;


    if (proximoCacto <= 0) {

        criarCacto();


        // Intervalo aleatório para o próximo cacto
        proximoCacto =
            50 + Math.floor(Math.random() * 80);
    }
}


// ======================================================
// DETECTAR COLISÃO
// ======================================================

function verificarColisao() {

    for (let i = 0; i < cactos.length; i++) {

        const cacto = cactos[i];


        // Verifica se os dois retângulos
        // estão se sobrepondo
        if (

            jogador.x < cacto.x + cacto.largura &&

            jogador.x + jogador.largura > cacto.x &&

            jogador.y < cacto.y + cacto.altura &&

            jogador.y + jogador.altura > cacto.y

        ) {

            // O coelho bateu
            jogoAcabou = true;

            return;
        }
    }
}


// ======================================================
// DESENHAR O CHÃO
// ======================================================

function desenharChao() {

    ctx.fillStyle = "#555555";

    ctx.fillRect(
        0,
        250,
        larguraTela,
        3
    );
}


// ======================================================
// DESENHAR GAME OVER
// ======================================================

function desenharGameOver() {

    // Fundo transparente
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";

    ctx.fillRect(
        0,
        0,
        larguraTela,
        alturaTela
    );


    // Texto GAME OVER
    ctx.fillStyle = "#222222";

    ctx.font = "bold 50px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "GAME OVER",
        larguraTela / 2,
        135
    );


    // Mensagem para reiniciar
    ctx.font = "20px Arial";

    ctx.fillText(
        "aperte espaço para jogar de novo",
        larguraTela / 2,
        175
    );
}


// ======================================================
// ATUALIZAR O JOGO
// ======================================================

function atualizar() {

    // Se o jogo acabou,
    // tudo fica parado
    if (jogoAcabou) {

        return;
    }


    // Atualiza o coelho
    atualizarJogador();


    // Atualiza os cactos
    atualizarCactos();


    // Cria novos cactos
    controlarNascimentoDosCactos();


    // Atualiza a pontuação
    atualizarPontuacao();


    // Verifica colisões
    verificarColisao();
}


// ======================================================
// DESENHAR TUDO
// ======================================================

function desenhar() {

    // Limpa a tela
    ctx.clearRect(
        0,
        0,
        larguraTela,
        alturaTela
    );


    // Chão
    desenharChao();


    // Coelho
    desenharJogador();


    // Cactos
    desenharCactos();


    // Pontuação
    desenharPontuacao();


    // GAME OVER
    if (jogoAcabou) {

        desenharGameOver();
    }
}


// ======================================================
// REINICIAR O JOGO
// ======================================================

function reiniciarJogo() {

    // Remove todos os cactos
    cactos = [];


    // Coloca o coelho no começo
    jogador.x = 80;
    jogador.y = 200;


    // Zera o movimento vertical
    jogador.velocidadeY = 0;


    // Coloca o coelho no chão
    jogador.noChao = true;


    // ==================================================
    // REINICIAR VELOCIDADE
    // ==================================================

    velocidadeCacto = velocidadeInicial;


    // ==================================================
    // REINICIAR PONTUAÇÃO
    // ==================================================

    pontuacao = 0;

    contadorPontuacao = 0;

    proximaAceleracao = 100;


    // Reinicia o aparecimento dos cactos
    proximoCacto = 60;


    // O jogo volta a funcionar
    jogoAcabou = false;
}


// ======================================================
// CONTROLE DO TECLADO
// ======================================================

document.addEventListener("keydown", function(event) {

    // Verifica se apertou Espaço
    if (event.code === "Space") {

        // Impede a página de rolar
        event.preventDefault();


        // Se perdeu, Espaço reinicia
        if (jogoAcabou) {

            reiniciarJogo();

        } else {

            // Se está jogando, Espaço pula
            pular();
        }
    }
});


// ======================================================
// LOOP PRINCIPAL
// ======================================================

function loop() {

    // Atualiza o jogo
    atualizar();


    // Desenha o jogo
    desenhar();


    // Continua executando
    requestAnimationFrame(loop);
}


// ======================================================
// COMEÇAR O JOGO
// ======================================================

loop();// ======================================================
// CONFIGURAÇÃO DO JOGO
// ======================================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const larguraTela = canvas.width;
const alturaTela = canvas.height;


// ======================================================
// COELHO
// ======================================================

const jogador = {

    x: 80,
    y: 200,

    largura: 40,
    altura: 50,

    // Velocidade vertical
    velocidadeY: 0,

    // Força do pulo
    forcaPulo: -12,

    // Verifica se está no chão
    noChao: true
};


// ======================================================
// GRAVIDADE
// ======================================================

const gravidade = 0.6;


// ======================================================
// CACTOS
// ======================================================

let cactos = [];

// Velocidade inicial
const velocidadeInicial = 5;

// IMPORTANTE:
// Usamos "let" porque essa velocidade vai mudar
// durante o jogo.
let velocidadeCacto = velocidadeInicial;

// Limite máximo da velocidade
const velocidadeMaxima = 8;


// ======================================================
// CONTROLE DOS CACTOS
// ======================================================

let proximoCacto = 60;


// ======================================================
// PONTUAÇÃO
// ======================================================

let pontuacao = 0;

// Contador usado para aumentar a pontuação
let contadorPontuacao = 0;

// Próxima pontuação em que a velocidade aumenta
let proximaAceleracao = 100;


// ======================================================
// RECORDe
// ======================================================

// Busca o recorde salvo no navegador.
//
// Se ainda não existir um recorde,
// começa com 0.
let recorde = Number(localStorage.getItem("recordeCoelhinho")) || 0;


// ======================================================
// ESTADO DO JOGO
// ======================================================

let jogoAcabou = false;


// ======================================================
// DESENHAR O COELHO
// ======================================================

function desenharJogador() {

    // Corpo
    ctx.fillStyle = "#555555";

    ctx.fillRect(
        jogador.x,
        jogador.y,
        jogador.largura,
        jogador.altura
    );


    // Cabeça
    ctx.fillRect(
        jogador.x + 25,
        jogador.y - 20,
        35,
        35
    );


    // Orelha esquerda
    ctx.fillRect(
        jogador.x + 28,
        jogador.y - 35,
        8,
        20
    );


    // Orelha direita
    ctx.fillRect(
        jogador.x + 42,
        jogador.y - 35,
        8,
        20
    );


    // Olho
    ctx.fillStyle = "black";

    ctx.fillRect(
        jogador.x + 48,
        jogador.y - 10,
        5,
        5
    );
}


// ======================================================
// CRIAR CACTO
// ======================================================

function criarCacto() {

    // Alturas possíveis
    const alturas = [30, 45, 60, 75];

    // Escolhe uma altura aleatória
    const altura =
        alturas[Math.floor(Math.random() * alturas.length)];


    // Largura aleatória
    const largura =
        15 + Math.floor(Math.random() * 15);


    const cacto = {

        // Começa fora da tela
        x: larguraTela + 10,

        // Fica apoiado no chão
        y: 250 - altura,

        largura: largura,
        altura: altura
    };


    cactos.push(cacto);
}


// ======================================================
// DESENHAR CACTOS
// ======================================================

function desenharCactos() {

    for (let i = 0; i < cactos.length; i++) {

        const cacto = cactos[i];


        // Corpo verde
        ctx.fillStyle = "#2e8b57";

        ctx.fillRect(
            cacto.x,
            cacto.y,
            cacto.largura,
            cacto.altura
        );


        // Braço esquerdo
        if (cacto.altura > 40) {

            ctx.fillRect(
                cacto.x - 8,
                cacto.y + 15,
                8,
                8
            );

            ctx.fillRect(
                cacto.x - 8,
                cacto.y + 15,
                5,
                18
            );
        }


        // Braço direito
        if (cacto.altura > 55) {

            ctx.fillRect(
                cacto.x + cacto.largura,
                cacto.y + 25,
                8,
                8
            );

            ctx.fillRect(
                cacto.x + cacto.largura + 3,
                cacto.y + 10,
                5,
                20
            );
        }
    }
}


// ======================================================
// DESENHAR PONTUAÇÃO E RECORDE
// ======================================================

function desenharPontuacao() {

    // Transforma a pontuação em 5 dígitos.
    //
    // 5    -> 00005
    // 25   -> 00025
    // 340  -> 00340
    // 1250 -> 01250

    const textoPontuacao =
        String(pontuacao).padStart(5, "0");


    // Faz a mesma coisa com o recorde
    const textoRecorde =
        String(recorde).padStart(5, "0");


    // Configuração do texto
    ctx.fillStyle = "#333333";

    ctx.font = "bold 20px Arial";

    ctx.textAlign = "right";


    // Pontuação atual
    ctx.fillText(
        textoPontuacao,
        larguraTela - 125,
        30
    );


    // Recorde
    ctx.fillText(
        "HI " + textoRecorde,
        larguraTela - 20,
        30
    );
}


// ======================================================
// ATUALIZAR PONTUAÇÃO
// ======================================================

function atualizarPontuacao() {

    // Aumenta o contador
    contadorPontuacao++;


    // A cada aproximadamente 10 quadros,
    // ganha 1 ponto.
    if (contadorPontuacao >= 10) {

        pontuacao++;

        contadorPontuacao = 0;
    }


    // ==================================================
    // ATUALIZAR O RECORDE
    // ==================================================

    // Se a pontuação atual ultrapassar o recorde,
    // atualizamos o recorde.
    if (pontuacao > recorde) {

        recorde = pontuacao;


        // Salva o novo recorde no navegador
        localStorage.setItem(
            "recordeCoelhinho",
            recorde
        );
    }


    // ==================================================
    // AUMENTAR A VELOCIDADE
    // ==================================================

    if (pontuacao >= proximaAceleracao) {

        // Aumenta um pouco a velocidade
        velocidadeCacto += 0.5;


        // Impede que fique rápido demais
        if (velocidadeCacto > velocidadeMaxima) {

            velocidadeCacto = velocidadeMaxima;
        }


        // Próxima aceleração
        proximaAceleracao += 100;
    }
}


// ======================================================
// FAZER O COELHO PULAR
// ======================================================

function pular() {

    // Só pode pular se estiver no chão
    if (jogador.noChao) {

        jogador.velocidadeY = jogador.forcaPulo;

        jogador.noChao = false;
    }
}


// ======================================================
// ATUALIZAR O COELHO
// ======================================================

function atualizarJogador() {

    // Aplica a gravidade
    jogador.velocidadeY += gravidade;

    // Move o coelho verticalmente
    jogador.y += jogador.velocidadeY;


    // Altura do chão
    const chao = 200;


    // Se chegou ao chão
    if (jogador.y >= chao) {

        jogador.y = chao;

        jogador.velocidadeY = 0;

        jogador.noChao = true;
    }
}


// ======================================================
// ATUALIZAR CACTOS
// ======================================================

function atualizarCactos() {

    for (let i = 0; i < cactos.length; i++) {

        // Move os cactos para a esquerda
        cactos[i].x -= velocidadeCacto;
    }


    // Remove os cactos que saíram da tela
    for (let i = cactos.length - 1; i >= 0; i--) {

        if (cactos[i].x + cactos[i].largura < 0) {

            cactos.splice(i, 1);
        }
    }
}


// ======================================================
// CONTROLAR APARECIMENTO DOS CACTOS
// ======================================================

function controlarNascimentoDosCactos() {

    proximoCacto--;


    if (proximoCacto <= 0) {

        criarCacto();


        // Intervalo aleatório
        proximoCacto =
            50 + Math.floor(Math.random() * 80);
    }
}


// ======================================================
// DETECTAR COLISÃO
// ======================================================

function verificarColisao() {

    for (let i = 0; i < cactos.length; i++) {

        const cacto = cactos[i];


        // Verifica se os dois retângulos
        // estão se sobrepondo.
        if (

            jogador.x < cacto.x + cacto.largura &&

            jogador.x + jogador.largura > cacto.x &&

            jogador.y < cacto.y + cacto.altura &&

            jogador.y + jogador.altura > cacto.y

        ) {

            // O coelho bateu no cacto
            jogoAcabou = true;

            return;
        }
    }
}


// ======================================================
// DESENHAR O CHÃO
// ======================================================

function desenharChao() {

    ctx.fillStyle = "#555555";

    ctx.fillRect(
        0,
        250,
        larguraTela,
        3
    );
}


// ======================================================
// DESENHAR GAME OVER
// ======================================================

function desenharGameOver() {

    // Fundo transparente
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";

    ctx.fillRect(
        0,
        0,
        larguraTela,
        alturaTela
    );


    // GAME OVER
    ctx.fillStyle = "#222222";

    ctx.font = "bold 50px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "GAME OVER",
        larguraTela / 2,
        135
    );


    // Mensagem para reiniciar
    ctx.font = "20px Arial";

    ctx.fillText(
        "aperte espaço para jogar de novo",
        larguraTela / 2,
        175
    );
}


// ======================================================
// ATUALIZAR O JOGO
// ======================================================

function atualizar() {

    // Se o jogo acabou, tudo fica parado
    if (jogoAcabou) {

        return;
    }


    // Atualiza o coelho
    atualizarJogador();


    // Atualiza os cactos
    atualizarCactos();


    // Cria novos cactos
    controlarNascimentoDosCactos();


    // Atualiza pontuação e recorde
    atualizarPontuacao();


    // Verifica colisões
    verificarColisao();
}


// ======================================================
// DESENHAR TUDO
// ======================================================

function desenhar() {

    // Limpa a tela
    ctx.clearRect(
        0,
        0,
        larguraTela,
        alturaTela
    );


    // Desenha o chão
    desenharChao();


    // Desenha o coelho
    desenharJogador();


    // Desenha os cactos
    desenharCactos();


    // Desenha pontuação e recorde
    desenharPontuacao();


    // Se perdeu, mostra GAME OVER
    if (jogoAcabou) {

        desenharGameOver();
    }
}


// ======================================================
// REINICIAR O JOGO
// ======================================================

function reiniciarJogo() {

    // Remove todos os cactos
    cactos = [];


    // Volta o coelho para o começo
    jogador.x = 80;
    jogador.y = 200;


    // Zera o movimento vertical
    jogador.velocidadeY = 0;


    // Coloca o coelho no chão
    jogador.noChao = true;


    // ==================================================
    // REINICIAR VELOCIDADE
    // ==================================================

    velocidadeCacto = velocidadeInicial;


    // ==================================================
    // REINICIAR PONTUAÇÃO
    // ==================================================

    pontuacao = 0;

    contadorPontuacao = 0;

    proximaAceleracao = 100;


    // Reinicia o aparecimento dos cactos
    proximoCacto = 60;


    // Volta o jogo ao normal
    jogoAcabou = false;
}


// ======================================================
// CONTROLE DO TECLADO
// ======================================================

document.addEventListener("keydown", function(event) {

    // Verifica se apertou Espaço
    if (event.code === "Space") {

        // Impede a página de rolar
        event.preventDefault();


        // Se perdeu, Espaço reinicia
        if (jogoAcabou) {

            reiniciarJogo();

        } else {

            // Se está jogando, Espaço pula
            pular();
        }
    }
});


// ======================================================
// LOOP PRINCIPAL
// ======================================================

function loop() {

    // Atualiza o jogo
    atualizar();


    // Desenha o jogo
    desenhar();


    // Continua executando
    requestAnimationFrame(loop);
}


// ======================================================
// INICIAR O JOGO
// ======================================================

loop();