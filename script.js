let problems = []; // Array to store problems and options
let currentProblemIndex = 0;
let startTime, endTime;

// Fetch problems from problems.txt
fetch('problems.txt')
  .then(response => response.text())
  .then(data => {
    problems = data.split('\n').map(problem => {
      const [question, ...options] = problem.split(',');
      const answerIndex = parseInt(options[0]); // Index of correct answer
      return { question, options, answerIndex };
    });
  });

function displayProblem() {
  const currentProblem = problems[currentProblemIndex];
  document.getElementById('problem').innerText = `Solve: ${currentProblem.question}`;

  const options = currentProblem.options.slice(1); // Exclude the correct answer index
  const answerIndex = currentProblem.answerIndex;

  const shuffledOptions = shuffleArray([...options]); // Shuffle options
  const buttons = document.getElementsByClassName('option-btn');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].innerText = shuffledOptions[i];
    buttons[i].setAttribute('data-index', i);
  }
}

function startTimer() {
  startTime = new Date().getTime();
}

function stopTimer() {
  endTime = new Date().getTime();
}

function checkAnswer(selectedIndex) {
  stopTimer();
  const elapsedTime = (endTime - startTime) / 1000; // Convert to seconds
  document.getElementById('time').innerText = `Time: ${elapsedTime.toFixed(2)}s`;

  const correctIndex = problems[currentProblemIndex].answerIndex;
  if (selectedIndex === correctIndex) {
    document.getElementById('result').innerText = 'Correct!';
  } else {
    document.getElementById('result').innerText = 'Incorrect. Try again.';
  }

  setTimeout(() => {
    document.getElementById('result').innerText = '';
    document.getElementById('time').innerText = 'Time: 0s';
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

// Function to shuffle array elements
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
