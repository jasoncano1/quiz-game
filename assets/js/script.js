let clockId;
let timer = 75;
let qIndex = 0;

const init = () => {
    timer--;
    document.getElementById('time').innerHTML = timer;
    if (timer < 1) {
        clearInterval(clockId);
    };
    
};

const handleQuestions = () => {
    let {Q,A,C} = questions[qIndex];

    main.innerHTML = `<h1>${Q}</h1><div id="answers"></div>`;

    A.forEach((answer) => {
        answers.innerHTML += `<button class="answerBtn">${answer}</button>`;
    });
};

const clock = () => {
    clockId = setInterval(init, 1000);
    handleQuestions();
}

start.onclick = clock;