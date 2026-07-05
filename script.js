const homeScreen = document.getElementById("home-screen");
const aboutScreen = document.getElementById("about-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("startBtn");
const aboutBtn = document.getElementById("aboutBtn");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const progressBar = document.getElementById("progress-bar");
const scoreText = document.getElementById("score");
const bestScoreText = document.getElementById("best-score");
const timerText = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let timer;
let timeLeft = 15;

function showScreen(screen) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
}

aboutBtn.onclick = () => showScreen(aboutScreen);
backBtn.onclick = () => showScreen(homeScreen);

startBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    showScreen(quizScreen);
    loadQuestion();
};

function loadQuestion() {
    clearInterval(timer);

    timeLeft = 15;
    timerText.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerText.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);

    selectedAnswer = null;

    const q = questions[currentQuestion];

    questionNumber.innerText =
        `Question ${currentQuestion + 1}/${questions.length}`;

    questionText.innerText = q.question;

    answersDiv.innerHTML = "";

    q.answers.forEach((answer, index) => {

        const btn = document.createElement("button");

        btn.className = "answer-btn";

        btn.innerText = answer;

        btn.onclick = () => selectAnswer(btn, index);

        answersDiv.appendChild(btn);

    });

    progressBar.style.width =
        ((currentQuestion) / questions.length) * 100 + "%";
}

function selectAnswer(button, index) {

    document.querySelectorAll(".answer-btn")
        .forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");

    selectedAnswer = index;
}

nextBtn.onclick = () => {
    nextQuestion();
};

function nextQuestion() {

    clearInterval(timer);

    if (selectedAnswer === questions[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

}

function showResult() {

    showScreen(resultScreen);

    scoreText.innerText =
        `Your Score: ${score}/${questions.length}`;

    let best = localStorage.getItem("bestScore");

    if (best == null || score > best) {

        localStorage.setItem("bestScore", score);

        best = score;

    }

    bestScoreText.innerText =
        `Best Score: ${best}/${questions.length}`;

    progressBar.style.width = "100%";

}

restartBtn.onclick = () => {

    showScreen(homeScreen);

};