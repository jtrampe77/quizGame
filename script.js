const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')
const intro = document.getElementById('intro')

let shuffledQuestions, currentQuestionIndex 

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () =>{
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
    startButton.classList.add('hide')
    intro.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    console.log(showQuestion(shuffledQuestions[currentQuestionIndex]))
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer =>{
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')

        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })

    if(shuffledQuestions.length > currentQuestionIndex +1){
        nextButton.classList.remove('hide')
    }else{
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        intro.innerText = 'Quiz is done!'
        intro.style.fontWeight = 'bold'
        intro.style.fontSize = '32px'
        intro.classList.remove('hide')
    }
    
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions =[
    {
        question: 'Which river is the longest in the world?',
        answers:[
            {text: 'Nile', correct: true},
            {text: 'Amazon', correct: false},
            {text: 'Mississippi', correct: false},
            {text: 'Yangthze', correct: false}
        ]

    },
    {
        question: 'What is the largest desert in the world?',
        answers:[
            {text: 'Gobi Desert', correct: false},
            {text: 'Atacama Desert', correct: false},
            {text: 'Arabian Desert', correct: false},
            {text: 'Sahara Desert', correct: true}
        ]

    },
    {
        question: 'Which mountain range separates Europe from Asia?',
        answers:[
            {text: 'The Rocky Mountains', correct: false},
            {text: 'The Andes', correct: false},
            {text: 'The Ural Mountains', correct: true},
            {text: 'The Himalayas', correct: false}
        ]

    },
    {
        question: 'Which country is known as the "Land of the Rising Sun"?',
        answers:[
            {text: 'China', correct: false},
            {text: 'South Korea', correct: false},
            {text: 'Japan', correct: true},
            {text: 'Vietnam', correct: false}
        ]

    },
    {
        question: 'Which European city is famous for its canals and gondolas?',
        answers:[
            {text: 'Paris', correct: false},
            {text: 'Venice', correct: true},
            {text: 'Amsterdam', correct: false},
            {text: 'Barcelona', correct: false}
        ]

    }
]

