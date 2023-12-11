let startTime, endTime;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  const num1 = getRandomInt(1, 10);
  const num2 = getRandomInt(1, 10);
  const operator = getRandomInt(1, 2); // 1 for addition, 2 for multiplication

  let problemText;
  let answer;
  
  if (operator === 1) {
    problemText = `${num1} + ${num2}`;
    answer = num1 + num2;
  } else {
    problemText = `${num1} * ${num2}`;
    answer = num1 * num2;
  }

  document.getElementById('problem').innerText = `Solve: ${problemText}`;
  return answer;
}

function startTimer() {
  startTime = new Date().getTime();
}

function stopTimer() {
  endTime = new Date().getTime();
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById('answer').value);
  if (isNaN(userAnswer)) {
    document.getElementById('result').innerText = 'Please enter a valid number.';
    return;
  }

  stopTimer();
  const elapsedTime = (endTime - startTime) / 1000; // Convert to seconds
  document.getElementById('time').innerText = `Time: ${elapsedTime.toFixed(2)}s`;

  const correctAnswer = generateProblem();
  if (userAnswer === correctAnswer) {
    document.getElementById('result').innerText = 'Correct!';
  } else {
    document.getElementById('result').innerText = 'Incorrect. Try again.';
  }

  setTimeout(() => {
    document.getElementById('result').innerText = '';
    document.getElementById('time').innerText = 'Time: 0s';
    document.getElementById('answer').value = '';
    generateProblem();
    startTimer();
  }, 2000); // Reset after 2 seconds
}

function startGame() {
  document.querySelector('.start-btn').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  generateProblem();
  startTimer();
}
