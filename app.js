const quizData = [
    {
      question: 'What does HTML stand for?',
      options: 

['Hyper Tag Markup Language',
'Hyper Text Markup Language',
'Hyperlinks Text Mark Language',
'Hyperlinking Text Marking Language'],
      answer: 'Hyper Text Markup Language',
    },
    {
      question: 'The web is based on?',
      options: [ 'Images',
     'Text',
    'Information',
'HTML'],
answer:'HTML'
    
    },
    {
      question: 'What is the predominant markup language for web pages?',
      options: ['PHP', 'CSS', 'HTML', 'JS'],
      answer: 'HTML',
    },
    {
      question: 'What is a web browser??',
      options: ['Something in my dashboard','Used to make web pages', 'Software application for retrieving and presenting information on the web'],
      answer: 'Software application for retrieving and presenting information on the web',
    
    },
    {
      question: 'A domain name is a identification label.?',
    options: [
      
        'False',
        'True',
      ],
      answer: 'True',
    },
    {
      question: ' What is web hosting??',
      options: ['A domain name','Something people view with a browser','Online space for web site and data'],
      answer: 'Online space for web site and data',
    },
    {
      question: 'HTML provides 5 heading tags h1 to h5?',
      options: [
        'True',
        'False',
      ],
      answer: 'False',
    },
    {
      question: 'How many types of CSS?',
      options: ['2', '3', '4', '5'],
      answer: '3',
    },
    {
      question: 'Choose the correct HTML tag for the largest heading?',
      options: ['H1','H2','H4','H3'
      
      ],
      answer: 'H1',
    },
    {
      question: 'What is the correct HTML tag for inserting a line break?',
      options: ['Hr', 'Br', 'Lb'],
      answer: 'Br',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);

  
  displayQuestion();