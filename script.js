const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const resultElement = document.getElementById('result');
const timeElement = document.getElementById('time');

let correctAnswer;
let startTime;
let timer;

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  correctAnswer = num1 * num2;

  questionElement.textContent = `${num1} x ${num2} = ?`;

  const choices = [];
  choices.push(correctAnswer);

  while (choices.length < 4) {
    const wrongAnswer = (Math.floor(Math.random() * 10) + 1) * (Math.floor(Math.random() * 10) + 1);
    if (!choices.includes(wrongAnswer)) {
      choices.push(wrongAnswer);
    }
  }

  choices.sort(() => Math.random() - 0.5);

  choicesElement.innerHTML = '';
  choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.classList.add('choice-btn');
    button.addEventListener('click', () => checkAnswer(choice));
    choicesElement.appendChild(button);
  });
}

function startTimer() {
  startTime = Date.now();
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = Math.floor((Date.now() - startTime) / 1000);
  timeElement.textContent = currentTime;
}

function checkAnswer(selectedAnswer) {
  clearInterval(timer);
  if (parseInt(selectedAnswer) === correctAnswer) {
    resultElement.textContent = 'Correct!';
  } else {
    resultElement.textContent = 'Wrong!';
  }

  setTimeout(() => {
    resultElement.textContent = '';
    generateQuestion();
    startTimer();
  }, 1000); // Delay before showing the next question (1 second in this case)
}

generateQuestion();
startTimer();
