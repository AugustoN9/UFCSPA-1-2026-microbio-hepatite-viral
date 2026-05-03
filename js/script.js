   const quizData = [
        { q: "Qual vírus é o único da lista cujo material genético é composto por DNA?", a: ["Hepatite A", "Hepatite B", "Hepatite C", "Hepatite E"], correct: 1 },
        { q: "O que caracteriza o fenômeno de 'Quasespécies' na Hepatite C?", a: ["Replicação via DNA", "Dependência do vírus B", "Alta taxa de mutação do RNA", "Transmissão zoonótica"], correct: 2 },
        { q: "O vírus da Hepatite D é considerado defectivo porque:", a: ["Não possui RNA", "Depende do envelope (HBsAg) do vírus B", "Só infecta gestantes", "É autolimitado"], correct: 1 },
        { q: "Na patogênese, o dano principal ao fígado ocorre devido a:", a: ["Ação direta do vírus", "Resposta imune (Linfócitos T)", "Falta de microbiota", "Excesso de glicose"], correct: 1 },
        { q: "Qual o principal 'arquivo de backup' (DNA circular persistente) do vírus B no núcleo celular?", a: ["RNA mensageiro", "cccDNA", "Proteína VP1", "Carga viral"], correct: 1 }
    ];

    let currentQ = 0;
    let score = 0;

    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const nextBtn = document.getElementById('next-btn');
    const feedbackEl = document.getElementById('feedback');
    const quizContent = document.getElementById('quiz-content');
    const scoreContainer = document.getElementById('score-container');
    const scoreText = document.getElementById('score-text');

    function loadQuestion() {
        const data = quizData[currentQ];
        questionEl.innerText = `${currentQ + 1}. ${data.q}`;
        optionsEl.innerHTML = '';
        feedbackEl.innerText = '';
        nextBtn.style.display = 'none';
        
        data.a.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.innerText = opt;
            btn.onclick = () => checkAnswer(index, btn);
            optionsEl.appendChild(btn);
        });
    }

    function checkAnswer(selected, btn) {
        const correctIndex = quizData[currentQ].correct;
        const allButtons = optionsEl.querySelectorAll('button');
        allButtons.forEach(b => b.disabled = true);

        if (selected === correctIndex) {
            btn.classList.add('correct');
            feedbackEl.innerText = "✅ ACERTOU!";
            feedbackEl.style.color = "#3fb950";
            score++;
        } else {
            btn.classList.add('wrong');
            allButtons[correctIndex].classList.add('correct');
            feedbackEl.innerText = "❌ ERROU!";
            feedbackEl.style.color = "#f85149";
        }
        nextBtn.style.display = 'block';
    }

    nextBtn.onclick = () => {
        currentQ++;
        if (currentQ < quizData.length) {
            loadQuestion();
       } else {
    quizContent.style.display = 'none';
    scoreContainer.style.display = 'block';

    // 1. Calcular aproveitamento
    const percent = (score / quizData.length) * 100;
    
    // 2. Definir número de estrelas (1 a 5)
    let starsCount = 0;
    if (percent >= 100) starsCount = 5;
    else if (percent >= 80) starsCount = 4;
    else if (percent >= 60) starsCount = 3;
    else if (percent >= 40) starsCount = 2;
    else if (percent >= 20) starsCount = 1;
    else starsCount = 0; // Opcional: 0 estrelas para menos de 20%

    // 3. Gerar os ícones das estrelas
    const starsContainer = document.getElementById('stars-container');
    let starsHtml = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= starsCount) {
            starsHtml += '★'; // Estrela preenchida
        } else {
            starsHtml += '<span class="star-empty">☆</span>'; // Estrela vazia
        }
    }
    
    starsContainer.innerHTML = starsHtml;

    // 4. Atualizar o texto do score
    scoreText.innerHTML = `Análise concluída!<br><br><strong>Score: ${score} / ${quizData.length}</strong><br>Obrigado por participar!`;
}
    };

    loadQuestion();