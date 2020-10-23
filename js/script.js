//Variable definitions

//Variables for defining HTML
//Timer variables
var countdownTimer = document.querySelector(".countdownTimer");
var startGame = document.querySelector(".startGame");
var viewHS = document.querySelector(".viewHS");

//HTML variables
var questionCount = 0;
var count = 75;
var score = 0;
var stopTimer = false;

var questionBank = [
    {
        question: "Commonly used data types DO NOT include: ",
        answer: ["1. Strings", "2. Boolean", "3. Alerts", "4. Numbers"],
        correctAnswer: "3. Alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within _____.",
        answer: ["1. Quotes", "2. Curly brackets", "3. Paratheses", "4. Square brackets"],
        correctAnswer: "3. Paratheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answer: ["1. Numbers and strings", "2. Other arrays", "3. Booleans", "4. All of the above"],
        correctAnswer: "4. All of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answer: ["1. Comas", "2. Curly brackets", "3. Quotes", "4. Parantheses"],
        correctAnswer: "4. Parantheses"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer: ["1. Javascript", "2. Terminal/bash", "3. For loops", "4. Console log"],
        correctAnswer: "4. Console log"
    },

];


//Function definitions 

//startTasks sets up the page for mutliple choice questions and either calls startTimer and startQuestions. 

function startTasks(e) {
    e.preventDefault();

    var cardBody = document.querySelector(".card-body");
    var cardText = document.querySelector(".card-text");
    var startGame = document.querySelector(".startGame");
    var btnGroup = document.createElement("div");
    var btn1 = document.createElement("button");
    var btn2 = document.createElement("button");
    var btn3 = document.createElement("button");
    var btn4 = document.createElement("button");

    //Setting attributes for dynamic HTML 
    btnGroup.setAttribute("class", "btn-group-vertical btnGroup");
    btn1.setAttribute("type", "button");
    btn1.setAttribute("class", "btn btn-primary allBtn choice1");
    btn2.setAttribute("type", "button");
    btn2.setAttribute("class", "btn btn-primary allBtn choice2");
    btn3.setAttribute("type", "button");
    btn3.setAttribute("class", "btn btn-primary allBtn choice3");
    btn4.setAttribute("type", "button");
    btn4.setAttribute("class", "btn btn-primary allBtn choice4");

    //Remote and append children

    cardBody.removeChild(cardText);
    cardBody.removeChild(startGame);
    cardBody.appendChild(btnGroup);
    btnGroup.appendChild(btn1);
    btnGroup.appendChild(btn2);
    btnGroup.appendChild(btn3);
    btnGroup.appendChild(btn4);

    startTimer();
    startQuestions();

};


//startTimer counts down the time from a pre-determiend count.  
//It will initiate endGame if time runs out.  Otherwise, it will stop if stopTimer = true; 
function startTimer() {
    console.log("startTimer")
    var timer = setInterval(function () {
        count--
        countdownTimer.textContent = "Timer: " + count;
        if (count === 0) {
            clearInterval(timer)
            countdownTimer.textContent = "Timer: " + count;
            //Tallies up the scores
            endGame();
        } else if (stopTimer) {
            clearInterval(timer)
            countdownTimer.textContent = "Timer: " + count;
            return;
        }
    }, 1000)
}

//startQuestions fills in the questions and the choices for answers from startTasks

function startQuestions() {

    var choice1 = document.querySelector(".choice1");
    var choice2 = document.querySelector(".choice2");
    var choice3 = document.querySelector(".choice3");
    var choice4 = document.querySelector(".choice4");
    var choice = document.getElementsByClassName("allBtn");
    var cardTitle = document.querySelector(".card-title");



    cardTitle.textContent = questionBank[questionCount].question;
    choice1.textContent = questionBank[questionCount].answer[0];
    choice2.textContent = questionBank[questionCount].answer[1];
    choice3.textContent = questionBank[questionCount].answer[2];
    choice4.textContent = questionBank[questionCount].answer[3];

    choice1.addEventListener("click", userAnswer);
    choice2.addEventListener("click", userAnswer);
    choice3.addEventListener("click", userAnswer);
    choice4.addEventListener("click", userAnswer);

};

//userAnswer handles the choice of the user 
function userAnswer(e) {
    e.preventDefault();
    if (questionBank[questionCount].correctAnswer === this.textContent) {
        score++;
        console.log("step1");
        alert("Right Answer1");
    } else {
        console.log("step2");
        alert("Wrong Answer1");

    }

    if (questionCount == questionBank.length - 1) {
        console.log("step3");
        endGame();
    } else {
        questionCount = questionCount + 1;
        console.log("step4")
        startQuestions();
    }
}

function endGame() {

    var btnGroup = document.querySelector(".btnGroup");
    var cardText = document.createElement("p");
    var inputForm = document.createElement("form")
    var inputFormRow = document.createElement("div");
    var inputTextBox = document.createElement("input");
    var submitBtn = document.createElement("button")
    var cardBody = document.querySelector(".card-body");
    var cardTitle = document.querySelector(".card-title");
    cardText.setAttribute("class", "card-text");
    cardTitle.textContent = "All done!"


    inputForm.setAttribute("class", "inputForm")
    inputFormRow.setAttribute("class", "col-7 formRow");

    inputTextBox.setAttribute("type", "text");
    inputTextBox.setAttribute("class", "form-control initialInput");
    inputTextBox.setAttribute("placeholder", "Enter your initials");

    submitBtn.setAttribute("type", "button");
    submitBtn.setAttribute("class", "btn btn-primary submitBtn");
    submitBtn.textContent = "Submit";

    cardBody.removeChild(btnGroup);
    cardBody.appendChild(cardText);

    cardBody.appendChild(inputForm);
    inputForm.appendChild(inputFormRow);
    inputFormRow.appendChild(inputTextBox);
    inputFormRow.appendChild(submitBtn);
    console.log(document);
    score = score + count;
    stopTimer = true;
    cardText.textContent = "Your score is " + score + ".  Please enter you initials below:";


    submitBtn.addEventListener("click", enterHighScores)
}

function enterHighScores(e) {
    e.preventDefault();
    console.log("enterHighScore");
    // var lastUser = window.localStorage.getItem("user");
    //var lastScore = window.localStorage.getItem("score");
    var currentUser = document.querySelector(".initialInput").value;
    var currentScore = score;

    // if (currentScore < lastScore) {
    //     window.localStorage.setItem("user", lastUser);
    //     window.localStorage.setItem("score", lastScore);
    // } else {
    window.localStorage.setItem("user", currentUser);
    window.localStorage.setItem("score", currentScore);
    // }
    showHighScores()
}

function showHighScores() {

    // var initialInput = document.querySelector(".initialInput");
    var formRow = document.createElement("form")
    var displayBlock = document.createElement("span");
    var clearBtn = document.createElement("button");
    var goBackBtn = document.createElement("button");
    // var submitBtn = document.querySelector(".submitBtn");
    //var cardTitle = document.querySelector(".card-title");
    // var cardText = document.querySelector(".card-text");
    var cardBody = document.querySelector(".card-body");
    var cardReplaceBody = document.createElement("div");
    var cardTitle = document.createElement("h5");
    var card = document.querySelector(".card");
    formRow.setAttribute("class", "formRow");
    cardReplaceBody.setAttribute("class", "card-body")
    cardTitle.setAttribute("class", "card-title");
    cardTitle.textContent = "Highscores"

    goBackBtn.setAttribute("class", "btn btn-primary getBackBtn");

    displayBlock.setAttribute("class", "d-block p-2 bg-primary text-white displayBlock");
    displayBlock.textContent = window.localStorage.getItem("user") + "-" + window.localStorage.getItem("score");
    clearBtn.setAttribute("type", "button");
    clearBtn.setAttribute("class", "btn btn-primary clearBtn");

    clearBtn.textContent = "Clear HighScore";
    goBackBtn.textContent = "Go Back";

    card.removeChild(cardBody);
    card.appendChild(cardReplaceBody);
    cardReplaceBody.appendChild(cardTitle);
    cardReplaceBody.appendChild(formRow)
    //formRow.removeChild(initialInput);
    //formRow.removeChild(submitBtn);
    formRow.appendChild(displayBlock);
    formRow.appendChild(goBackBtn);
    formRow.appendChild(clearBtn);

    clearBtn.addEventListener("click", clearScore);
    goBackBtn.addEventListener("click", restartGame);
}

function clearScore(e) {
    e.preventDefault();

    var displayBlock = document.querySelector(".displayBlock");
    var formRow = document.querySelector(".formRow");

    formRow.removeChild(displayBlock);
}

function restartGame(e) {
    e.preventDefault();

    var formRow = document.querySelector(".formRow");
    var restart = document.createElement("button");
    var cardBody = document.querySelector(".card-body");
    var cardTitle = document.querySelector(".card-title");
    var cardText = document.createElement("p");
    var countdownTimer = document.querySelector(".countdownTimer");
    cardText.setAttribute("class", "card-text");
    cardText.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score time by 10 seconds!"
    cardTitle.textContent = "Coding Quiz Challenge"
    countdownTimer.textContent = "Time: 75"


    restart.setAttribute("type", "button");
    restart.setAttribute("class", "btn btn-primary startGame");
    restart.textContent = "Start";

    cardBody.removeChild(formRow);
    cardBody.appendChild(cardText);
    cardBody.appendChild(restart);

    console.log(document)

    //Reset initial variables
    questionCount = 0;
    count = 75;
    score = 0;
    stopTimer = false;

    restart.addEventListener("click", startTasks);
};

startGame.addEventListener("click", startTasks);
viewHS.addEventListener("click", showHighScores);