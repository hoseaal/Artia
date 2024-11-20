
const questions = [ 
    {
        question: "Quien Fue Armando Reverón?",
        answers: [
            { Text: "Ingeniero", correct: false},
            { Text: "Artista Venezolano", correct: true},
            { Text: "Presidente", correct: false},
            { Text: "Piloto", correct: false},
        ]
    },
    {
        question: "Cual de estos es un Artista Venezolano?",
        answers: [
            { Text: "Carlos Cruz Dies", correct: true},
            { Text: "Vincent VanGhog", correct: false},
            { Text: "Miguel Angel", correct: false},
          
        ]
    },
    {
        question: "De Quien es la obra 'Los 3 comisarios'?",
        answers: [
            { Text: "William Shakespeare", correct: false},
            { Text: "Cristobal Rojas", correct: false},
            { Text: "Leonel Messi", correct: false},
            { Text: "Hector Poleo", correct: true},
          
        ]
    },
    {
        question: "Quien de estas es una Artista Venezolana?",
        answers: [
            { Text: "Luisa Ritcher", correct: true},
            { Text: "Frida Khalo", correct: false},
            { Text: "Beatriz Gonzalez", correct: false},
            { Text: "Taylor Swift", correct: false},
          
        ]
    },
    {
        question: "Quien es considerado el artista mas influyente del siglo XIX?",
        answers: [
            { Text: "Simon Bolivar", correct: false},
            { Text: "Arturo Michelena", correct: true},
            { Text: "Andres Bello", correct: false},
            { Text: "Antonio José de Sucre", correct: false},
          
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Siguiente";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn"); 
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correcto");
        score ++
    }else{
        selectedBtn.classList.add("Incorrecto");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correcto");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}
function showScore(){
    resetState();
    questionElement.innerHTML = `Acertaste ${score} de ${questions.length}!`;
    nextButton.innerHTML = "Otra vez";
    nextButton.style.display = "block";

}
function handleNextBotton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};
nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextBotton();
    }else{
        startQuiz();
    }
});
startQuiz();
