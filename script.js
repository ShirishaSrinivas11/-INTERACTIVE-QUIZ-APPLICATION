const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const resultsEl = document.getElementById('results');
const questions = [
  {
    question: "Which animal is known as the ‘Ship of the Desert’?",
    answers: [
      { text: "Camel", correct: true },
      { text: "Horse", correct: false },
      { text: "Elephant", correct: false },
      { text: "Dog", correct: false }
    ]
  },
  {
    question: "What is the capital city of Germany?",
    answers: [
      { text: "Munich", correct: false },
      { text: "Berlin", correct: true },
      { text: "Frankfurt", correct: false },
      { text: "Hamburg", correct: false }
    ]
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Pablo Picasso", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Vincent van Gogh", correct: false },
      { text: "Michelangelo", correct: false }
    ]
  },
  {
    question: "What is the main gas found in the air we breathe?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: true },
      { text: "Carbon Dioxide", correct: false },
      { text: "Hydrogen", correct: false }
    ]
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Earth", correct: false },
      { text: "Saturn", correct: false }
    ]
  },
  {
    question: "Who was the first person to walk on the Moon?",
    answers: [
      { text: "Buzz Aldrin", correct: false },
      { text: "Neil Armstrong", correct: true },
      { text: "Yuri Gagarin", correct: false },
      { text: "John Glenn", correct: false }
    ]
  },
  {
    question: "Which festival is also known as the festival of colours?",
    answers: [
      { text: "Diwali", correct: false },
      { text: "Holi", correct: true },
      { text: "Christmas", correct: false },
      { text: "Eid", correct: false }
    ]
  },
  {
    question: "Which is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Arctic Ocean", correct: false }
    ]
  },
  {
    question: "Which language runs in a browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "Which company developed JavaScript?",
    answers: [
      { text: "Netscape", correct: true },
      { text: "Mozilla", correct: false },
      { text: "Google", correct: false },
      { text: "Microsoft", correct: false }
    ]
  }
];
let shuffledQuestions, currentQuestion, score;
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
  currentQuestion++;
  setNextQuestion();
});
function startGame() {
  startBtn.classList.add('hide');
  resultsEl.classList.add('hide');
  questionContainer.classList.remove('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  score = 0;
  setNextQuestion();
}
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestion]);
}
function showQuestion(question) {
  questionEl.innerHTML = question.question;
  question.answers.forEach((ans) => {
    const btn = document.createElement('button');
    btn.innerHTML = ans.text;
    btn.classList.add('btn');
    btn.onclick = () => selectAnswer(btn, ans.correct);
    answerButtons.appendChild(btn);
  });
}
function resetState() {
  nextBtn.classList.add('hide');
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(btn, correct) {
  Array.from(answerButtons.children).forEach(b => {
    b.disabled = true;
    if (b === btn) {
      b.classList.add(correct ? 'correct' : 'wrong');
    }
    if (b !== btn && b.innerHTML === btn.innerHTML && correct) {
      b.classList.add('correct');
    }
  });
  if (correct) score++;
  if (shuffledQuestions.length > currentQuestion + 1) {
    nextBtn.classList.remove('hide');
  } else {
    setTimeout(showResults, 700);
  }
}
function showResults() {
  questionContainer.classList.add('hide');
  resultsEl.classList.remove('hide');
  resultsEl.innerHTML = `
    <h2>Quiz Complete!</h2>
    <p>Your score: <strong>${score}</strong> out of ${questions.length}.</p>
    <button class="btn" id="restart-btn">Restart Quiz</button>
  `;
  document.getElementById('restart-btn').onclick = startGame;
}
