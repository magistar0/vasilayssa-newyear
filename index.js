const questions = [
    {
        question: "В каком университете ты учишься?",
        optionA: "НИУ ВШЭ",
        optionB: "МИФИ",
        optionC: "МГТУ",
        optionD: "МИРЭА",
        correctOption: "optionC",
        hint: "ㅤДаже не притворяйся, что не знаешь.ㅤ"
    },

    {
        question: "Что значит имя Василиса?",
        optionA: "Дорогая",
        optionB: "Царица",
        optionC: "Милая",
        optionD: "Светлая",
        correctOption: "optionB",
        hint: "ㅤПравильный ответ – не прилагательное :(ㅤ"
    },

    {
        question: "Что из этого не является одной из трех парадигм ООП?",
        optionA: "Перегрузки",
        optionB: "Инкапсуляция",
        optionC: "Наследование",
        optionD: "Полиморфизм",
        correctOption: "optionA",
        hint: "ㅤВспоминай.ㅤ"
    }

]

let gameQuestions = []

function handleQuestions() { 
    questions.forEach((question) => {
        gameQuestions.push(question)
        })
}

let questionNumber = 1
let indexNumber = 0


function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = gameQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = gameQuestions[indexNumber]
    const currentQuestionAnswer = currentQuestion.correctOption
    const currentQuestionHint = currentQuestion.hint
    const options = document.getElementsByName("option");
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            setTimeout(() => {
                document.getElementById('hint').innerHTML = currentQuestionHint
                document.getElementById('wrong-modal').style.display = "flex"
            }, 100)
        }
    })
}


function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= questions.length - 1) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEndGame() {
    document.getElementById('score-modal').style.display = "flex"
}

function closeScoreModal() {
    questionNumber = 1
    indexNumber = 0
    gameQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
    window.location.href = "final.html";
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}

function finallyGetTheGift() {
    window.location.href = "https://ga.gift/ru/c4e382e172f54212813e52a0d82b4730";
}

function showReady() {
    document.getElementById('ready-modal').style.display = "flex"
}

function closeWrongModal() {
    document.getElementById('wrong-modal').style.display = "none"
}

function closeStartModal() {
    window.location.href = "index.html";
}