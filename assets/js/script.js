let clockId;
let timer = 75;
let qIndex = 0;
let status = document.getElementById('status');

const resetGame = () => document.location.reload();

const clearScores = () => {
    localStorage.scores = JSON.stringify([]);
    document.querySelector('ol').innerHTML = '';
};

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

const setScore2 = async () => {
    let scores = localStorage.scores ? JSON.parse(localStorage.scores) : [];
    main.innerHTML = `<h1>High Scores</h1><ol id="scores"></ol>`;

    scores.forEach(player => {
        document.querySelector('ol').innerHTML += `<li>${player.initials} - ${player.score}</li>`;
    });

    main.innerHTML += `<button onclick="clearScores()">Clear Scores</button><button onclick="resetGame()">Play Again</button>`;
};

const endGame = () => {
    clearInterval(clockId);
    main.innerHTML = `<h1>Game Over</h1><h3>You got ${timer} points!</h3><p>Enter your initials: <input type="text" id="initials" maxlength="3"></p><button onclick="setScore()">Set Score</button>`;
};

const init = () => {
    timer--;
    document.getElementById('time').innerHTML = timer;
    if (timer < 1) endGame();
};

function handleAnswers(e) {
    e.target.innerHTML == questions[qIndex].C
        ? (
            status.innerHTML = '<h1 style="color:green;text-align:center; border-bottom:5px solid green">Correct!</h1>',
            setTimeout(() => status.innerHTML = '', 1000)
        )
        : (
            timer -= 10,
            status.innerHTML = '<h1 style="color:red;text-align:center; border-bottom:5px solid red">Wrong!</h1>',
            setTimeout(() => status.innerHTML = '', 1000)
        ) 

    qIndex++;
    handleQuestions();
};

const handleQuestions = () => {
    console.log(qIndex, questions.length);
    if (qIndex >= questions.length) {
        return endGame();
    };

    let { Q, A } = questions[qIndex];

    main.innerHTML = `<h1>${Q}</h1><div id="answers"></div>`;

    A.forEach((answer) => {
        document.getElementById('answers').innerHTML += `<button class="answerBtn">${answer}</button>`;
    });
};

const clock = () => {
    clockId = setInterval(init, 1000);
    handleQuestions();
}

start.onclick = clock;
scores.onclick = setScore2;
main.onclick = (e) => {
    if (e.target.className === 'answerBtn') {
        handleAnswers(e);
    }
};
