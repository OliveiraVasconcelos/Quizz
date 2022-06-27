const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const answersBox     = document.querySelector('#answers-box');
const letters        = ['a', 'b', 'c', 'd'];
let points            = 0;
let actualQuestion   = 0;

const questions = [
    {
        "question" : "PHP foi desenvolvido para qual fim?",
        "answers"  : [
            {
                "answer" : "back-end",
                "correct": true
            },
            {
                "answer" : "Front-end",
                "correct": false   
            },
            {
                "answer" : "Sistema operacional",
                "correct": false   
            },
            {
                "answer" : "Banco de dados",
                "correct": false   
            },
        ]
    },
    
    {
        "question" : "O que é o SQL-Server?",
        "answers"  : [
            {
                "answer" : "Linguagem de Programação",
                "correct": false   
            }, {
                "answer" : "API",
                "correct": false   
            }, {
                "answer" : "Sistema Operacional",
                "correct": false   
            }, {
                "answer" : "SGBD",
                "correct": true   
            },
        ]
    },
    
    {
        "question" : "Quem foi o criador do protocolo HTTP?",
        "answers"  : [
            {
                "answer" : "Guido van Rossum",
                "correct": false   
            }, {
                "answer" : "Yukihiro Matsumoto",
                "correct": false   
            }, {
                "answer" : "Tim Berners-Lee",
                "correct": true   
            }, {
                "answer" : "Rasmus Lerdorf",
                "correct": false   
            },
        ]
    },
    
    {
        "question" : "Qual o seletor de id no CSS?",
        "answers"  : [
            {
                "answer" : "#",
                "correct": true
            },
            {
                "answer" : ".",
                "correct": false   
            },
            {
                "answer" : "/",
                "correct": false   
            },
            {
                "answer" : "@",
                "correct": false   
            },
        ]
    },
]


function init(){

    creatQuestion(0);

}


function creatQuestion(i){
    //limpando alternativas
    const oldButtons = answersBox.querySelectorAll('button');

    oldButtons.forEach(function(btn){

        btn.remove();

    })

    const questionNumber = quizzContainer.querySelector('#question-number');
    const questionText = quizzContainer.querySelector('#question-text');

    questionNumber.textContent = i + 1;
    questionText.textContent   = questions[i].question;

    //criando template das alternativas
    questions[i].answers.forEach(function(answer,i){

        const answerTemplate = document.querySelector('.answer-template').cloneNode(true);


        //alterando letra e conteúdo das alternativas
        const btnLetter = answerTemplate.querySelector('.btn-letter');
        const questionText = answerTemplate.querySelector('.question-answer');

        btnLetter.textContent = letters[i];
        questionText.textContent = answer['answer'];

        //exluindo classes desnecessárias para o momento
        answerTemplate.classList.remove('hide');
        answerTemplate.classList.remove('answer-template');


        //inserindo atributo para validar a alternativa
        answerTemplate.setAttribute('correct-answer', answer['correct']);
        
        //inserindo de fato o template das alternativas na página
        answersBox.appendChild(answerTemplate)

        answerTemplate.addEventListener('click',function(){
            checkAnswer(this);
        })

    })

    actualQuestion++;

}


function checkAnswer(btn){
    const buttons = answersBox.querySelectorAll('button');
    buttons.forEach(function(button){
        if(button.getAttribute('correct-answer') === 'true'){

            button.classList.add('correct-answer')
            
            if(button === btn){
            
                points++;
            
            }

        }else{

            button.classList.add('wrong-answer')

        }
    
    })
    
    nextQuestion();
    console.log(points)

}

function nextQuestion(){
    setTimeout(function(){

        if(actualQuestion >= questions.length){
            showSucessMensage();
            return;
        }

        creatQuestion(actualQuestion);

    },1200)
}

function showSucessMensage(){
    
    hideOrShowQuizz();

    //calculando o score 
    const score = ((points / questions.length) * 100).toFixed(1);
    
    //alterando score geral
    const displayScore = document.querySelector('#display-score');
    displayScore.textContent = score + '%';

    //alterando a quantidade de alternativas corretas computadas
    const correctAnswers = scoreContainer.querySelector('#correct-answers');
    correctAnswers.textContent = points;

    //alterando quantidade de perguntas
    const questionsQty = scoreContainer.querySelector('#questions-qty');
    questionsQty.textContent = questions.length;
}


function hideOrShowQuizz(){
    scoreContainer.classList.toggle('hide');
    quizzContainer.classList.toggle('hide');
};


const restartButton = document.querySelector('button#restart');

restartButton.addEventListener('click',function(){        
        
    points = 0;
    actualQuestion = 0;
    hideOrShowQuizz();
    init();
    
})


init();