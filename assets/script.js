//Create variables from HTML
var yourScore = document.querySelector("#yourScore");
var timerEl = document.querySelector("#timer");
var highscoresButton = document.querySelector('#highscores');
var displayBox = document.querySelector("#display-box");
var answerStatusWrap = document.querySelector("#answerStatus-wrap");
var answerStatus = document.querySelector("#answerStatus");
var header = document.querySelector("#header-wrap");
var startButton = document.querySelector("#start-wrap");
var answerWrap = document.querySelector("#answer-wrap");
var answerList = document.querySelector("#answerButtons");
var formWrap = document.querySelector("#form-wrap");
var form = document.querySelector("#label");
var form = document.querySelector("#input");
var currentQuestion = 0;
var score = 0;
var timeLeft = 30;
var submitInitials;

//Add event listener to start button - start clock, hide paragraph, and bring up first question
startButton.addEventListener("click", function(event) {
  countdown();

  header.setAttribute("data-state", "hidden");
  header.textContent = header.getAttribute("");

  startButton.setAttribute("data-state", "hidden");
  startButton.textContent = startButton.getAttribute("");

  quizQuestion();
});

//Create timer to countdown
function countdown() {
    var timeInterval = setInterval(function () {

        if(timeLeft >= 1) {
        timerEl.textContent = "Timer: " + timeLeft;
        timeLeft--;
        } else {
        clearInterval(timeInterval);
        gameOver();
        }

    }, 1000);
    return timeLeft;
};

//Create questions
var questions = [
    {
        question: "What day is it?",
        answers: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        correctAnswer: "Thursday"
    },
    {
        question: "What month is it?",
        answers: ["November", "December", "January", "February"],
        correctAnswer: "December"
    },
    {
        question: "What year is it?",
        answers: ["2020", "2021", "2022", "2023"],
        correctAnswer: "2022"
    },
    {
        question: "What time is it?",
        answers: ["1:00", "2:00", "3:00", "4:00"],
        correctAnswer: "2:00"
    },
    {
        question: "What holiday is it?",
        answers: ["Easter", "Juneteenth", "Indigenous People's Day", "New Year"],
        correctAnswer: "New Year"
    }
]

//Call quiz function and write answers to the page
function quizQuestion() {
    if (currentQuestion === 0) {
        var question = document.createElement("h1");
        question.textContent = questions[currentQuestion].question;
        header.appendChild(question);

        var li1 = document.createElement("li");
        li1.textContent = questions[currentQuestion].answers[0];
        answerButtons.appendChild(li1);

        var li2 = document.createElement("li");
        li2.textContent = questions[currentQuestion].answers[1];
        answerButtons.appendChild(li2);

        var li3 = document.createElement("li");
        li3.textContent = questions[currentQuestion].answers[2];
        answerButtons.appendChild(li3);

        var li4 = document.createElement("li");
        li4.textContent = questions[currentQuestion].answers[3];
        answerButtons.appendChild(li4); 
    } else if (currentQuestion < 5) {
        header.textContent = header.getAttribute("");
        answerList.textContent = answerList.getAttribute("");

        var question = document.createElement("h1");
        question.textContent = questions[currentQuestion].question;
        header.appendChild(question);

        var li1 = document.createElement("li");
        li1.textContent = questions[currentQuestion].answers[0];
        answerButtons.appendChild(li1);

        var li2 = document.createElement("li");
        li2.textContent = questions[currentQuestion].answers[1];
        answerButtons.appendChild(li2);

        var li3 = document.createElement("li");
        li3.textContent = questions[currentQuestion].answers[2];
        answerButtons.appendChild(li3);

        var li4 = document.createElement("li");
        li4.textContent = questions[currentQuestion].answers[3];
        answerButtons.appendChild(li4); 
    } else {
        gameOver();
    }
}

//Notify player if they got the answer right and update score
answerList.addEventListener("click", function(event) {
    var questionNumber = currentQuestion + 1;

    if (event.target.textContent === questions[currentQuestion].correctAnswer){
        score++;
        yourScore.textContent = "Your Score: " + score;
        answerStatus.textContent = "Correct! You got question " + questionNumber + " right. Can you do it again?";
    } else {
        timeLeft = timeLeft - 5;
        yourScore.textContent = "Your Score: " + score;
        answerStatus.textContent = "Wrong! You got question " + questionNumber + " incorrect, but there's still time.";
    }

    currentQuestion++;

    quizQuestion();
});

//highscores variable
var highscores = [
    {
        initials: "",
        score: 0,
    }
];

//Create form to collect initials
function gameOver() {
    header.textContent = header.getAttribute("");
    answerList.textContent = answerList.getAttribute("");
    answerStatus.textContent = answerStatus.getAttribute("");

    label.textContent = "Enter Initials";
    input = document.createElement("input");
    input.textContent = "";
    label.appendChild(input);
    
    submitInitials = document.createElement("button");
    submitInitials.textContent = "Submit";
    label.appendChild(submitInitials);
};

//Save initials to highscore
formWrap.addEventListener("click", function(event) {    
    var element = event.target;

    if (element.matches("button") === true) {
        var yourhighscoretemp = {
            initials: input.value.trim(),
            score: score,
        }
        //localstorage.getItem (get it, hold onto it, put it all back)
        localStorage.setItem("yourhighscoretemp", JSON.stringify(yourhighscoretemp));
        var yourhighscoretemp = JSON.parse(localStorage.getItem("yourhighscoretemp"));
        highscores.push(yourhighscoretemp);

        var viewYourScore = document.createElement("h4");
        viewYourScore.textContent = "Your Score: " + yourhighscoretemp.initials + " - " + yourhighscoretemp.score;
        label.appendChild(viewYourScore);
    }

    console.log(highscores);
});

//Create highscore button to display list of highscores
function viewHighScores() {
    for (var i = 0; i < highscores.length; i++) {
        var highscoreinitials = highscores[i].initials;
        var highscoreScore = highscores[i].score

        var initialli = document.createElement("li");
        initialli.textContent = highscoreinitials + " : " + highscoreScore;
        displayBox.appendChild(initialli);
    };
};

//Add event listener to viewHighScores
highscoresButton.addEventListener("click", function(event) {
    viewHighScores();
});

