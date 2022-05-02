// First Thing is getting the each Page Id
const fisrtPage = document.getElementById('fisrtPage')
const questionsPage = document.getElementById('questionsPage')
const scorePage = document.getElementById('scorePage')

// Getting questions Page Elements
const QuestionCounter = document.querySelector('#QuestionCounter');
const countDown = document.querySelector('#countDown');
const question = document.querySelector('#question');
const choices = document.getElementsByName('choices')
const choice1 = document.querySelector('#choice1');
const choice2 = document.querySelector('#choice2');
const choice3 = document.querySelector('#choice3');
const choice4 = document.querySelector('#choice4');
const previousButten = document.querySelector('#previousButten');
const nextButton = document.querySelector('#nextButton');

// Getting Score Page Elements
const scoreText = document.querySelector('.score');
const scorePageText = document.getElementById('scorePage-text')

// Presenting the pages
// Making the First Page show first 
scorePage.style.display='none'
questionsPage.style.display='none'
fisrtPage.style.display='inline'

// Declaring the constants
const MAX_QUESTION = 12
const time = 5 // Quiz timer in minutes 

// Declaring the variables
let timeLeft = time * 60
let questionCounter = 0;
let score=0;

// questions list with answers
let questionsWithoutShuffle = [

    {
        question: 'What is actually electricity?',
        choice1: '  A flow of water',
        choice2: '  A flow of air',
        choice3: '  A flow of electrons',
        choice4: '  A flow of atoms',
        answer:'3',
    },
    {
        question:'which two months are named after Emperors of the Roman Empire?',
        choice1: '  January and February',
        choice2: '  March and April',
        choice3: '  May and June',
        choice4: '  July and August',
        answer:'4',
    },
    {
        question: 'What is the national language of Canada ?',
        choice1: '  English',
        choice2: '  Dutch',
        choice3: '  French',
        choice4: '  Spanish',
        answer:'1',
    },
    {
        question: 'Brazil is the biggest producer of?',
        choice1: '  Rice',
        choice2: '  Oil',
        choice3: '  Coffee',
        choice4: '  Salt',
        answer:'3',
    },
    {
        question: 'How to write a comment on a single line in Javascript?',
        choice1: '  /* my comment ',
        choice2: '  // my comment //',
        choice3: '  // my comment',
        choice4: '  /* my comment */',
        answer:'3',
    },
    {
        question: 'Which of the following characters is used to make a line break on the screen?',
        choice1: '  /t',
        choice2: '  /a',
        choice3: '  /r',
        choice4: '  /n',
        answer:'4',
    },
    {
        question: 'Which of the following keywords is used to define a variable in Javascript?',
        choice1: '  var',
        choice2: '  let',
        choice3: '  Both var and let',
        choice4: '  None of the above',
        answer:'3',
    },
    {
        question: 'Which of the following methods can be used to display data in some form using Javascript?',
        choice1: '  document.write( )',
        choice2: '  console.log( )',
        choice3: '  window.alert( )',
        choice4: '  All of the above',
        answer:'3',
    },
    {
        question: 'How can a datatype be declared to be a constant type in javascript?        ',
        choice1: '  constant',
        choice2: '  const',
        choice3: '  let',
        choice4: '  var',
        answer:'2',
    },
    {
        question: 'Which of the following is not a Javascript framework?',
        choice1: '  Node',
        choice2: '  Vue',
        choice3: '  React',
        choice4: '  Cassandra',
        answer:'4',
    },
    {
        question: 'Which of the following is the correct extension of the Python file?',
        choice1: '  .python',
        choice2: '  .pl',
        choice3: '  .py',
        choice4: '  .p',
        answer:'3',
    },
    {
        question: 'what is the output of (4 + 3 % 5)',
        choice1: '  7',
        choice2: '  2',
        choice3: '  4',
        choice4: '  1',
        answer:'1',
    },
    {
        question: 'Which keyword is used for function in Python language?',
        choice1: '  Function',
        choice2: '  Def',
        choice3: '  Fun',
        choice4: '  Define',
        answer:'2',
    },
    {
        question: 'Which of the following functions is a built-in function in python?',
        choice1: '  factorial( )',
        choice2: '  print( )',
        choice3: '  seed( )',
        choice4: '  sqrt( )',
        answer:'2',
    },
    {
        question: 'Which of these U.S. states does NOT border Canada?',
        choice1: '  Maine',
        choice2: '  Indiana',
        choice3: '  Minnesota',
        choice4: '  Alaska',
        answer:'2',
    },
    {
        question: 'Which of these countries was NEVER part of the British Empire?        ',
        choice1: '  Thailand',
        choice2: '  New Zealand',
        choice3: '  Ireland',
        choice4: '  Kenya',
        answer:'1',
    },
    {
        question: 'Lionel Messi holds the record for most goals in a calscorePagear year but how many did he score?',
        choice1: '  81',
        choice2: '  71',
        choice3: '  101',
        choice4: '  91',
        answer:'4',
    },
    {
        question: 'Which nation won the 2010 World Cup?',
        choice1: '  Spain',
        choice2: '  Germany',
        choice3: '  Brazil',
        choice4: '  Argentina',
        answer:'1',
    },
    {
        question: 'What is 109,786,865 rounded to the nearest ten million?',
        choice1: '  110,000,000',
        choice2: '  100,000,000',
        choice3: '  111,000,000',
        choice4: '  109,770,000',
        answer:'1',
    },
    {
        question: 'How is 23,456 rounded to obtain 23,500?',
        choice1: '  to the nearest ten',
        choice2: '  to the nearest hundred',
        choice3: '  to the nearest thousand',
        choice4: '  to the nearest ten thousand',
        answer:'2',
    },
    {
        question: 'Round 312.92 to the nearest whole number.',
        choice1: '  313',
        choice2: '  312',
        choice3: '  312.9',
        choice4: '  300',
        answer:'1',
    },

]

// shuffle the questions
questions = questionsWithoutShuffle.sort(() => Math.random() - 0.5)

// Answers
let choicedAnswer=[]
let correctAnsewrs = []
for (let i = 0; i < 12; i++) {
    correctAnsewrs[i] = questions[i].answer;
}


// Main Functions 


// This function will Start the quiz
function startGame(){
    setInterval(update,1000); // to update timer each second
    hide() 
    availableQuestions = questions.slice(0, MAX_QUESTION); // getting the the first 12 questions after shuffing.
    getNextQuestion()
    
}


// timer function 
function update(){
    let minuts = Math.floor(timeLeft/60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? '0' + seconds:seconds // if seconds were 5 this will add 0 to make it 05
    countDown.innerHTML = `${minuts}:${seconds}`
    timeLeft--;
    if( timeLeft == -2 && questionsPage.style.display =='inline'){ // -2 should be 0 but the quiz will end before time is up 
        submit()}
}

// a function to submit the quiz
function submit(){
    saveAnswers()
    getScore()
    hide()
}




// This function will Show Next question with it answers & it will save the answer
function getNextQuestion(){
    currentQuestion = availableQuestions[questionCounter]
    question.innerText = currentQuestion.question
    choice1.innerText = currentQuestion.choice1
    choice2.innerText = currentQuestion.choice2
    choice3.innerText = currentQuestion.choice3
    choice4.innerText = currentQuestion.choice4
    QuestionCounter.innerText = `Question ${questionCounter + 1} of ${MAX_QUESTION}`
    saveAnswers()
    questionCounter++
    getSelectedAnswer()
    hideButtens()
}

// This function will Show previous question with it answers & it will save the answer
function getPreQuestion(){
    saveAnswers()
    questionCounter--
    getSelectedAnswer()
    QuestionCounter.innerText = `Question ${questionCounter} of ${MAX_QUESTION}`
    currentQuestion = availableQuestions[questionCounter-1]
    question.innerText = currentQuestion.question
    choice1.innerText = currentQuestion.choice1
    choice2.innerText = currentQuestion.choice2
    choice3.innerText = currentQuestion.choice3
    choice4.innerText = currentQuestion.choice4
    hideButtens()
}

// This function is uesd to move between question faster (e.g. moving from 1 to 10)
function questionNumber(clicked_value){
    saveAnswers()
    // the Clicked value is a String to we have to make it integer  
    questionCounter = Number(clicked_value)  
    getSelectedAnswer()
    hideButtens()
    QuestionCounter.innerText = `Question ${questionCounter} of ${MAX_QUESTION}`
    currentQuestion = availableQuestions[questionCounter-1]
    question.innerText = currentQuestion.question
    choice1.innerText = currentQuestion.choice1
    choice2.innerText = currentQuestion.choice2
    choice3.innerText = currentQuestion.choice3
    choice4.innerText = currentQuestion.choice4
}

// This function is used to save answers
function saveAnswers() {
    for (let i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
        choicedAnswer[questionCounter-1]= choices[i].value
        choices[i].checked = false
        }  
    }
}

// This function will show which answer is selected when moving between Question
// when moving to another question , he function will check if it was solved before
function getSelectedAnswer(){
    if (choicedAnswer[questionCounter-1] == '1') {
        choices[0].checked = true
    }

    if (choicedAnswer[questionCounter-1] == '2') {
        choices[1].checked = true
    }

    if (choicedAnswer[questionCounter-1] == '3') {
        choices[2].checked = true
    }
    
    if (choicedAnswer[questionCounter-1] == '4') {
        choices[3].checked = true
    } 

}

// This function to show and hide next butten & previous butten
function hideButtens(){
    if (questionCounter == 1) {
        previousButten.style.display='none'
    }else{
        previousButten.style.display='inline'
    }

    if (questionCounter == MAX_QUESTION) {
        nextButton.style.display='none'
    }else{
        nextButton.style.display='inline'
    }
}


// this function will calculate the final score 
function getScore(){
    for (let i = 0; i < MAX_QUESTION; i++) {
        if (choicedAnswer[i] == correctAnsewrs[i]) {
            score = score+ 1 // it the answer is correct, the score will increse by 1 point 
        }  
    }  
scoreText.innerText =`your score is ${score} out of ${MAX_QUESTION}` 
    if (score >= 5 && score < 10) {
        // if score is between 5 and 10 , this massages will be Shown
        scorePageText.innerHTML = `Keep Going !!`
    } else if (score < 5) {
        // if score is less than 5, this massages will be Shown
        scorePageText.innerHTML = `nice try`
    } else{
        // if score is more than 10, this massages will be Shown
        scorePageText.innerHTML = `well done`
    }

hide()
}

// this function will show each page in the correct order 
function hide(){
    if (fisrtPage.style.display == 'inline') {
        fisrtPage.style.display='none'
        questionsPage.style.display='inline'
        scorePage.style.display='none'
    } else if(questionsPage.style.display='inline') {
        fisrtPage.style.display == 'none'
        questionsPage.style.display='none'
        scorePage.style.display='inline'
    }
}

// This function is used to be able to select an answer by pressing the butten 
function reply_click(clicked_value){
choices[clicked_value].checked = true;
}
