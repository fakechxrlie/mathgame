let problems = []; // Array to store problems and answers
let currentProblemIndex = 0;
let startTime, endTime;

// Fetch problems from problems.txt
fetch('problems.txt')
  .then(response => response.text())
  .then(data => {
    problems = data.split('\n').map(problem => {
      const [question, answer] = problem.split(',');
      return { question, answer: parseInt(answer) };
    });
  });

function displayProblem() {
  document.getElementById('problem').innerText = `Solve: ${problems[currentProblemIndex].question}`;
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

  const correctAnswer = problems[currentProblemIndex].answer;
  if (userAnswer === correctAnswer) {
    document.getElementById('result').innerText = 'Correct!';
  } else {
    document.getElementById('result').innerText = 'Incorrect. Try again.';
  }

  setTimeout(() => {
    document.getElementById('result').innerText = '';
    document.getElementById('time').innerText = 'Time: 0s';
    document.getElementById('answer').value = '';
    currentProblemIndex = (currentProblemIndex + 1) % problems.length; // Move to the next problem
    displayProblem();
    startTimer();
  }, 2000); // Reset after 2 seconds
}

function startGame() {
  document.querySelector('.start-btn').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  displayProblem();
  startTimer();
}
