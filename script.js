document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENU MOBILE ---
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- 2. FILTRO DE PRODUTOS ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'todos' || filterValue === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 3. CALCULADORA DE IMPACTO ECOLÓGICO ---
    const hivesInput = document.getElementById('hivesInput');
    const hiveValue = document.getElementById('hiveValue');
    const flowersCount = document.getElementById('flowersCount');
    const flightsCount = document.getElementById('flightsCount');
    const honeyCount = document.getElementById('honeyCount');

    function updateCalculator() {
        const hives = parseInt(hivesInput.value);
        hiveValue.textContent = hives;

        // Cálculos aproximados
        const flowers = hives * 50; // 50 milhões de flores
        const flights = hives * 2;   // 2 milhoes de voos (2000k)
        const honey = hives * 20;    // 20 kg de mel por ano

        flowersCount.textContent = `${flowers}M`;
        flightsCount.textContent = `${flights.toLocaleString('pt-BR')}k`;
        honeyCount.textContent = `${honey} kg`;
    }

    if (hivesInput) {
        hivesInput.addEventListener('input', updateCalculator);
        updateCalculator(); // Inicializa
    }

    // --- 4. QUIZ INTERATIVO ---
    const quizData = [
        {
            question: "Quantas flores uma única abelha visita, em média, por dia?",
            options: ["Cerca de 10 a 50 flores", "Até 2.000 flores", "Mais de 100.000 flores", "Apenas 1 flor"],
            correct: 1
        },
        {
            question: "Qual dessas abelhas nativas do Brasil NÃO possui ferrão?",
            options: ["Apis mellifera", "Mamangava", "Jataí", "Abelha Africana"],
            correct: 2
        },
        {
            question: "Aproximadamente qual porcentagem dos alimentos mundiais depende da polinização?",
            options: ["10%", "35%", "75%", "100%"],
            correct: 2
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    const questionNum = document.getElementById('questionNum');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('nextBtn');
    const quizBox = document.getElementById('quizBox');
    const quizResult = document.getElementById('quizResult');
    const resultScore = document.getElementById('resultScore');
    const restartBtn = document.getElementById('restartBtn');

    function loadQuestion() {
        const q = quizData[currentQuestion];
        questionNum.textContent = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
        questionText.textContent = q.question;
        optionsContainer.innerHTML = '';
        feedback.classList.add('hidden');
        nextBtn.classList.add('hidden');

        q.options.forEach((opt, idx) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = opt;
            button.addEventListener('click', () => selectOption(idx, q.correct));
            optionsContainer.appendChild(button);
        });
    }

    function selectOption(selectedIdx, correctIdx) {
        const buttons = optionsContainer.querySelectorAll('.option-btn');
        buttons.forEach(btn => btn.disabled = true);

        if (selectedIdx === correctIdx) {
            buttons[selectedIdx].classList.add('correct');
            feedback.textContent = "✨ Resposta Correta! Você conhece muito sobre abelhas.";
            feedback.className = "quiz-feedback correct";
            score++;
        } else {
            buttons[selectedIdx].classList.add('incorrect');
            buttons[correctIdx].classList.add('correct');
            feedback.textContent = "❌ Resposta Incorreta!";
            feedback.className = "quiz-feedback incorrect";
        }

        feedback.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        });
    }

    function showResults() {
        quizBox.classList.add('hidden');
        quizResult.classList.remove('hidden');
        resultScore.textContent = `Você acertou ${score} de ${quizData.length} perguntas!`;
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            quizResult.classList.add('hidden');
            quizBox.classList.remove('hidden');
            loadQuestion();
        });
    }

    // Inicializa o quiz caso a seção exista na página
    if (questionText) {
        loadQuestion();
    }
});
