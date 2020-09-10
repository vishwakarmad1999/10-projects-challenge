const question = document.getElementById("question")
const text_a = document.getElementById("text-a")
const text_b = document.getElementById("text-b")
const text_c = document.getElementById("text-c")
const text_d = document.getElementById("text-d")
const answers = document.querySelectorAll(".answer")
const next_button = document.getElementById("next")
const time = document.getElementById("time")

let myVar

const quizData = [
    {
        question: "Which function among the following lets to register a function to be invoked once?",
        a: "setTimeout()",
        b: "setTotaltime()",
        c: "setInterval()",
        d: "settime()",
        correctAnswer: "a"
    },
    {
        question: "Which function among the following lets to register a function to be invoked repeatedly after a certain time?",
        a: "setTimeout()",
        b: "setTotaltime()",
        c: "setInterval()",
        d: "settime()",
        correctAnswer: "c"
    },
    {
        question: "Which is the handler method used to invoke when uncaught JavaScript exceptions occur?",
        a: "Onhalt",
        b: "Onerror",
        c: "Both onhalt and onerror",
        d: "Onsuspend",
        correctAnswer: "b"
    },
    {
        question: "Which property is used to obtain browser vendor and version information?",
        a: "modal",
        b: "version",
        c: "browser",
        d: "navigator",
        correctAnswer: "d"
    },
    {
        question: "Which method receives the return value of setInterval() to cancel future invocations?",
        a: "clearInvocation()",
        b: "cancelInvocation()",
        c: "clearInterval()",
        d: "clear()",
        correctAnswer: "c"
    }
]

let currentQuiz = 0
let score = 0

function clearFields() {
    answers.forEach((item) => {
        item.checked = false
    })
}

function setQuiz() {
    clearFields()
    let count = 5
    time.innerText = ""
    const quiz = quizData[currentQuiz]
    
    question.innerText = quiz.question
    text_a.innerText = quiz.a
    text_b.innerText = quiz.b
    text_c.innerText = quiz.c
    text_d.innerText = quiz.d

    myVar = setInterval(() => {
        console.log(count)
        if (count == 0) {
            console.log("Inside")
            updateQuiz()
        } else {
            time.innerText = count
        }
        count--;
    }, 1000)
}

function getSelected() {
    let answer = undefined;
    answers.forEach((item) => {
        if (item.checked) {
            answer = item.id
        }
    })
    return answer
}

setQuiz()

next_button.addEventListener("click", () => {
    updateQuiz()
})

function updateQuiz() {
    clearInterval(myVar)
    const ans = getSelected()
    if (ans) {
        if (ans === quizData[currentQuiz].correctAnswer) {
            score++;
        }
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        setQuiz()
    } else {
        document.querySelector(".quiz-container").innerHTML = `<h3 style="text-align:center">Your score: ${score}/${quizData.length}</h3><button onclick="location.reload()">Reload</button>`
    } 
}

