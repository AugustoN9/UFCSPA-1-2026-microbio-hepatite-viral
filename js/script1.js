// ===============================
// DADOS DO QUIZ
// ===============================
const quizData = [
    {
        q: "Qual vírus é o único da lista cujo material genético é composto por DNA?",
        a: ["Hepatite A", "Hepatite B", "Hepatite C", "Hepatite E"],
        correct: 1
    },
    {
        q: "O que caracteriza o fenômeno de 'Quasespécies' na Hepatite C?",
        a: ["Replicação via DNA", "Dependência do vírus B", "Alta taxa de mutação do RNA", "Transmissão zoonótica"],
        correct: 2
    },
    {
        q: "O vírus da Hepatite D é considerado defectivo porque:",
        a: ["Não possui RNA", "Depende do envelope (HBsAg) do vírus B", "Só infecta gestantes", "É autolimitado"],
        correct: 1
    },
    {
        q: "Na patogênese, o dano principal ao fígado ocorre devido a:",
        a: ["Ação direta do vírus", "Resposta imune (Linfócitos T)", "Falta de microbiota", "Excesso de glicose"],
        correct: 1
    },
    {
        q: "Qual o principal 'arquivo de backup' (DNA circular persistente) do vírus B no núcleo celular?",
        a: ["RNA mensageiro", "cccDNA", "Proteína VP1", "Carga viral"],
        correct: 1
    }
];

// ===============================
// ESTADO
// ===============================
let currentQ = 0;
let score = 0;

// ===============================
// ELEMENTOS DOM
// ===============================
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('feedback');
const quizContent = document.getElementById('quiz-content');
const scoreContainer = document.getElementById('score-container');
const scoreText = document.getElementById('score-text');

// ===============================
// FUNÇÃO: EMBARALHAR ARRAY
// ===============================
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ===============================
// CARREGAR PERGUNTA
// ===============================
function loadQuestion() {
    const data = quizData[currentQ];

    // Atualiza pergunta
    questionEl.innerText = `${currentQ + 1}. ${data.q}`;

    // Reset UI
    optionsEl.innerHTML = '';
    feedbackEl.innerText = '';
    nextBtn.style.display = 'none';

    // Monta opções com controle de resposta correta
    const options = data.a.map((text, index) => ({
        text,
        isCorrect: index === data.correct
    }));

    // Embaralha opções
    shuffleArray(options);

    // Renderiza botões
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = option.text;

        // Armazena se é correta
        btn.dataset.correct = option.isCorrect;

        btn.addEventListener('click', () => handleAnswer(btn));

        optionsEl.appendChild(btn);
    });
}

// ===============================
// VERIFICAR RESPOSTA
// ===============================
function handleAnswer(selectedBtn) {
    const isCorrect = selectedBtn.dataset.correct === "true";
    const allButtons = optionsEl.querySelectorAll('button');

    // Desabilita todos
    allButtons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        selectedBtn.classList.add('correct');
        feedbackEl.innerText = "✅ ACERTOU!";
        feedbackEl.style.color = "#3fb950";
        score++;
    } else {
        selectedBtn.classList.add('wrong');

        // Marca a correta
        allButtons.forEach(btn => {
            if (btn.dataset.correct === "true") {
                btn.classList.add('correct');
            }
        });

        feedbackEl.innerText = "❌ ERROU!";
        feedbackEl.style.color = "#f85149";
    }

    nextBtn.style.display = 'block';
}

// ===============================
// PRÓXIMA PERGUNTA
// ===============================
nextBtn.addEventListener('click', () => {
    currentQ++;

    if (currentQ < quizData.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
});

// ===============================
// RESULTADO FINAL
// ===============================
function showFinalScore() {
    quizContent.style.display = 'none';
    scoreContainer.style.display = 'block';

    scoreText.innerHTML = `
        Análise concluída!<br><br>
        <strong>Score: ${score} / ${quizData.length}</strong><br>
        Obrigado por participar!
    `;
}

// ===============================
// INICIALIZAÇÃO
// ===============================
loadQuestion();