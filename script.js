const perguntas = [
    {
        pergunta: "1. Qual linguagem cria a estrutura de um site?",
        alternativas: ["CSS", "HTML", "JavaScript", "Python"],
        correta: 1
    },
    {
        pergunta: "2. Qual linguagem estiliza a página?",
        alternativas: ["HTML", "Java", "CSS", "PHP"],
        correta: 2
    },
    {
        pergunta: "3. Qual linguagem adiciona interatividade?",
        alternativas: ["JavaScript", "CSS", "HTML", "SQL"],
        correta: 0
    },
    {
        pergunta: "4. Qual comando seleciona um elemento pelo ID?",
        alternativas: [
            "console.log()",
            "getElementById()",
            "alert()",
            "prompt()"
        ],
        correta: 1
    },
    {
        pergunta: "5. O que significa DOM?",
        alternativas: [
            "Data Object Mode",
            "Document Object Model",
            "Digital Output Method",
            "Display Object Mode"
        ],
        correta: 1
    }
];

let indice = 0;
let pontos = 0;
let respondeu = false;

const perguntaEl = document.getElementById("pergunta");
const alternativasEl = document.getElementById("alternativas");
const feedbackEl = document.getElementById("feedback");
const pontuacaoEl = document.getElementById("pontuacao");
const proximoBtn = document.getElementById("proximo");
const barra = document.getElementById("barra");

function mostrarPergunta() {
    respondeu = false;

    const atual = perguntas[indice];

    perguntaEl.textContent = atual.pergunta;
    alternativasEl.innerHTML = "";
    feedbackEl.textContent = "";

    proximoBtn.disabled = true;

    atual.alternativas.forEach((texto, i) => {
        const botao = document.createElement("button");

        botao.textContent = texto;
        botao.className = "alternativa";

        botao.addEventListener("click", function () {
            verificarResposta(i);
        });

        alternativasEl.appendChild(botao);
    });

    pontuacaoEl.textContent = "Pontuação: " + pontos;
    barra.style.width =
        (indice / perguntas.length) * 100 + "%";
}

function verificarResposta(escolhida) {
    if (respondeu) return;

    respondeu = true;

    const correta = perguntas[indice].correta;
    const botoes = alternativasEl.querySelectorAll("button");

    botoes.forEach((botao, i) => {
        botao.disabled = true;

        if (i === correta) {
            botao.classList.add("correta");
        }
    });

    if (escolhida === correta) {
        pontos++;
        feedbackEl.textContent = "Resposta correta!";
    } else {
        feedbackEl.textContent = "Resposta errada!";
        botoes[escolhida].classList.add("errada");
    }

    pontuacaoEl.textContent = "Pontuação: " + pontos;
    barra.style.width =
        ((indice + 1) / perguntas.length) * 100 + "%";

    proximoBtn.disabled = false;
}

proximoBtn.addEventListener("click", function () {
    if (!respondeu) return;

    indice++;

    if (indice < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }
});

function finalizarQuiz() {
    document.getElementById("pergunta").classList.add("escondido");
    document.getElementById("alternativas").classList.add("escondido");
    document.getElementById("feedback").classList.add("escondido");
    document.getElementById("pontuacao").classList.add("escondido");
    document.querySelector(".progresso").classList.add("escondido");
    proximoBtn.classList.add("escondido");

    document.getElementById("resultado").classList.remove("escondido");

    document.getElementById("mensagem").textContent =
        "Você acertou " + pontos + " de " +
        perguntas.length + " perguntas!";
}

function reiniciar() {
    indice = 0;
    pontos = 0;

    document.getElementById("pergunta").classList.remove("escondido");
    document.getElementById("alternativas").classList.remove("escondido");
    document.getElementById("feedback").classList.remove("escondido");
    document.getElementById("pontuacao").classList.remove("escondido");
    document.querySelector(".progresso").classList.remove("escondido");
    proximoBtn.classList.remove("escondido");

    document.getElementById("resultado").classList.add("escondido");

    mostrarPergunta();
}

mostrarPergunta();