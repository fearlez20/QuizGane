const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const optionButtons = Array.from(document.querySelectorAll(".option-btn"));
const nextBtn = document.getElementById("next-btn");

const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Transfer Machine Language",
      "Hyperlink and Text Management Language",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
    question: "Which language is used to style web pages?",
    options: ["Python", "C++", "CSS", "Java"],
    answer: 2
  },
  {
    question: "Which JavaScript method converts JSON text to an object?",
    options: ["JSON.stringify()", "JSON.parse()", "JSON.object()", "JSON.convert()"],
    answer: 1
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["<!-- -->", "/* */", "//", "#"],
    answer: 2
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Oracle", "Google"],
    answer: 1
  },
  {
    question: "Which of these is a JavaScript data type?",
    options: ["Float", "String", "Character", "Decimal"],
    answer: 1
  },
  {
    question: "What symbol is used for comments in Python?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: 2
  },
  {
    question: "Which keyword is used to define a function in Python?",
    options: ["function", "def", "fun", "define"],
    answer: 1
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
    answer: 0
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<href>", "<link>", "<a>", "<url>"],
    answer: 2
  },
  {
    question: "What is the correct file extension for Python files?",
    options: [".python", ".pt", ".py", ".p"],
    answer: 2
  },
  {
    question: "Which operator is used for exponentiation in Python?",
    options: ["**", "//", "%", "+"],
    answer: 0
  },
  {
    question: "What does the 'len()' function do in Python?",
    options: [
      "Returns the length of an object",
      "Counts only numbers",
      "Deletes items",
      "Sorts a list"
    ],
    answer: 0
  },
  {
    question: "Which of the following is not a programming language?",
    options: ["Python", "Java", "HTML", "JavaScript"],
    answer: 2
  },
  {
    question: "What is the output of print(2 + 3 * 2) in Python?",
    options: ["10", "8", "7", "6"],
    answer: 2
  },
  {
    question: "Which keyword is used for conditional statements in most programming languages?",
    options: ["or", "else", "elif", "if"],
    answer: 3
  },
  {
    question: "Which method is used to add an element to the end of a list in Python?",
    options: ["push()", "add()", "insert()", "append()"],
    answer: 3
  },
  {
    question: "What does “IDE” stand for?",
    options: [
      "Interactive Development Environment",
      "Inspective Development Enviroment",
      "Integrated Development Environment",
      "Intelligent Development Environment"
    ],
    answer: 2
  },
  {
    question: "Which of the following is used to declare a variable in JavaScript (modern)?",
    options: ["var", "let", "int", "Both A and B"],
    answer: 3
  },
  {
    question: "Who is the best software engineering lecturer in VUNA?",
    options: ["Mr Issac", "Mr Iseoma", "Mr Usoh", "Both B and C"],
    answer: 3
  }
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answered = false;
  selectedQuestions = shuffleArray([...quizData]).slice(0, 5);
  startBtn.style.display = "none";
  quizContainer.style.display = "block";
  nextBtn.style.display = "none";
  nextBtn.textContent = "Next";
  renderQuestion();
}

function renderQuestion() {
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  answered = false;
  questionEl.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
  nextBtn.style.display = "none";
  optionButtons.forEach((button, index) => {
    button.style.display = "inline-block";
    button.textContent = currentQuestion.options[index];
    button.disabled = false;
    button.classList.remove("correct", "wrong");
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const correctIndex = currentQuestion.answer;
  optionButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("wrong");
    }
  });
  if (selectedIndex === correctIndex) {
    score++;
  }
  nextBtn.style.display = "inline-block";
  if (currentQuestionIndex === selectedQuestions.length - 1) {
    nextBtn.textContent = "Show Result";
  }
}

function showResult() {
  questionEl.textContent = `Quiz complete. Your score is ${score}/${selectedQuestions.length}.`;
  optionButtons.forEach((button) => {
    button.style.display = "none";
  });
  nextBtn.style.display = "inline-block";
  nextBtn.textContent = "Play Again";
}

function goNext() {
  if (!answered && currentQuestionIndex < selectedQuestions.length) {
    return;
  }
  if (currentQuestionIndex < selectedQuestions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else if (currentQuestionIndex === selectedQuestions.length - 1) {
    currentQuestionIndex++;
    showResult();
  } else {
    startQuiz();
  }
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", goNext);
optionButtons.forEach((button, index) => {
  button.addEventListener("click", () => selectAnswer(index));
});