const questions = [];
let currentQuestionIndex = 0;
let startTime, endTime;

function startGame() {
  document.getElementById('startBtn').style.display = 'none';
  document.getElementById('result').innerHTML = '';
  document.getElementById('choices').innerHTML = '';

  generateQuestions();
  displayQuestion();
  startTime = new Date().getTime();
}

function generateQuestions() {
  for (let i = 0; i < 5; i++) {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const answer = num1 + num2;
    const choices = generateChoices(answer);
    const question = {
      question: `${num1} + ${num2} = ?`,
      choices: choices,
      correctAnswer: answer
    };
    questions.push(question);
  }
}

function generateChoices(answer) {
  const choices = [];
  choices.push(answer);

  while (choices.length < 4) {
    const random = Math.floor(Math.random() * 20);
    if (!choices.includes(random) && random !== answer) {
      choices.push(random);
    }
  }

  return shuffleArray(choices);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;

    question.choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.textContent = choice;
      button.onclick = () => checkAnswer(choice, question.correctAnswer);
      document.getElementById('choices').appendChild(button);
    });
  } else {
    endTime = new Date().getTime();
    const totalTime = (endTime - startTime) / 1000;
    document.getElementById('timer').textContent = `Time: ${totalTime.toFixed(1)}s`;
    document.getElementById('result').textContent = 'Game Over';
  }
}

function checkAnswer(selectedAnswer, correctAnswer) {
  if (parseInt(selectedAnswer) === correctAnswer) {
    document.getElementById('result').textContent = 'Correct!';
  } else {
    document.getElementById('result').textContent = 'Wrong!';
  }
  currentQuestionIndex++;
  setTimeout(displayQuestion, 1000);
}
