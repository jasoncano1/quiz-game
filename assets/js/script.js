let clockId;
let timer = 5;
let qIndex = 0;

const setScore = async () => {
    let scores = localStorage.scores ? JSON.parse(localStorage.scores) : [];
    let initials = document.getElementById('initials').value;

    scores.push({ initials, score: timer });
    scores = scores.sort((a, b) => b.score - a.score);
    localStorage.scores = JSON.stringify(scores);

    main.innerHTML = `<h1>High Scores</h1><ol id="scores"></ol>`;

    scores.forEach(player => {
        document.querySelector('ol').innerHTML += `<li>${player.initials} - ${player.score}</li>`;
    });


    main.innerHTML += `<button onclick="clearScores()">Clear Scores</button><button onclick="resetGame()">Play Again</button>`;

};

const endGame = () => {
    clearInterval(clockId);
    let { Q } = questions[qIndex];
    main.innerHTML = `<h1>Game Over</h1><h3>You got ${timer} points!</h3><p>${Q}</p><p>Enter your initials: <input type="text" id="initials" maxlength="3"></p><button onclick="setScore()">Set Score</button>`;
};


const init = () => {
    timer--;
    document.getElementById('time').innerHTML = timer;
    if (timer < 1) endGame();
};

const handleAnswers = ans => {
    if (ans != questions[qIndex].C) timer -= 10;

    qIndex++;
    handleQuestions();
};

const handleQuestions = () => {
    if (qIndex >= questions.length) {
        clearInterval(clockId);
        return endGame();
    };

    let { Q, A } = questions[qIndex];

    main.innerHTML = `<h1>${Q}</h1><div id="answers"></div>`;

    A.forEach((answer) => {
        answers.innerHTML += `<button onclick="handleAnswers('${answer}')">${answer}</button>`;
    });
};

const clock = () => {
    clockId = setInterval(init, 1000);
    handleQuestions();
}

start.onclick = clock;