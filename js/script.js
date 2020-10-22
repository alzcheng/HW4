//Variable definitions

//Variables for defining HTML
//Timer variables
var countdownTimer = document.querySelector(".countdownTimer");
var startGame = document.querySelector(".startGame");

//HTML variables
var cardBody = document.querySelector(".card-body");
var cardTitle = document.querySelector(".card-title");
var cardText = document.querySelector(".card-text");

console.log(cardBody);
console.log(cardTitle);
console.log(cardText);

var questionCount = 0;
var count = 75;
var score = 0;
var stopTimer = false;

var questionBank = [
    {
        Question: "Question1",
        Answer: ["a", "b", "c", "d"],
        AnswerKey: [false, true, false, false]
    },
    {
        Question: "Question2",
        Answer: ["e", "f", "g", "h"],
        AnswerKey: [false, true, false, false]
    }
];

//var timerStartSec= 75;


//Function definitions 

//startTasks sets up the page for mutliple choice questions and either calls startTimer and startQuestions. 

function startTasks(e) {
    e.preventDefault();
    console.log("before startTasks operations")
    // console.log(cardBody);
    //Traverse the DOM to change format of page
    // var cardBody = document.querySelector(".card-body");
    // var cardText = document.querySelector(".card-text");
    var btnGroup = document.createElement("div");
    var btn1 = document.createElement("button");
    var btn2 = document.createElement("button");
    var btn3 = document.createElement("button");
    var btn4 = document.createElement("button");
    //var cardBody = document.querySelector(".card-body");
    // var cardTitle = document.querySelector(".card-title");
    //var cardText = document.querySelector(".card-text");

    //Setting attributes for dynamic HTML 
    btnGroup.setAttribute("class", "btn-group-vertical btnGroup");
    btn1.setAttribute("type", "button");
    btn1.setAttribute("class", "btn btn-primary choice1");
    btn2.setAttribute("type", "button");
    btn2.setAttribute("class", "btn btn-primary choice2");
    btn3.setAttribute("type", "button");
    btn3.setAttribute("class", "btn btn-primary choice3");
    btn4.setAttribute("type", "button");
    btn4.setAttribute("class", "btn btn-primary choice4");

    //Remote and append children

    console.log(cardBody);
    console.log(cardText);
    cardBody.removeChild(document.querySelector(".card-text"));
    cardBody.removeChild(document.querySelector(".startGame"))
    cardBody.appendChild(btnGroup);
    btnGroup.appendChild(btn1);
    btnGroup.appendChild(btn2);
    btnGroup.appendChild(btn3);
    btnGroup.appendChild(btn4);

    console.log("startTasks");
    console.log(cardBody);
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
    var choice = document.querySelector(".btn");
    // console.log(questionCount);
    // console.log(choice1);


    cardTitle.textContent = questionBank[questionCount].Question;
    choice1.textContent = questionBank[questionCount].Answer[0];
    choice2.textContent = questionBank[questionCount].Answer[1];
    choice3.textContent = questionBank[questionCount].Answer[2];
    choice4.textContent = questionBank[questionCount].Answer[3];

    console.log("startQuestions")
    console.log(cardBody)

    choice.addEventListener("click", userAnswer);
};

//userAnswer handles the choice of the user 
function userAnswer(e) {
    e.preventDefault();
    console.log("userAnswer");
    if (questionBank[questionCount].AnswerKey[0]) {
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
    var comment = document.createElement("p");
    var inputForm = document.createElement("form")
    var inputFormRow = document.createElement("div");
    var inputTextBox = document.createElement("input");
    var button = document.createElement("button")

    stopTimer = true;

    comment.setAttribute("class", "card-text");

    inputForm.setAttribute("class", "inputForm")
    inputFormRow.setAttribute("class", "col-7 formRow");

    inputTextBox.setAttribute("type", "text");
    inputTextBox.setAttribute("class", "form-control initialInput");
    inputTextBox.setAttribute("placeholder", "Enter your initials");

    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-primary submitBtn");
    button.textContent = "Submit";

    score = score + count;

    cardBody.removeChild(btnGroup);
    cardBody.appendChild(comment);
    comment.textContent = "Your score is " + score + ".  Please enter you initials below:";
    cardBody.appendChild(inputForm);
    inputForm.appendChild(inputFormRow);
    inputFormRow.appendChild(inputTextBox);
    inputFormRow.appendChild(button);
    console.log("end game")
    console.log(cardBody)

    document.querySelector(".submitBtn").addEventListener("click", enterHighScores)

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


    var initialInput = document.querySelector(".initialInput");
    var formRow = document.querySelector(".formRow")
    var displayBlock = document.createElement("span");
    var clearBtn = document.createElement("button");
    var goBackBtn = document.createElement("button");
    var submitBtn = document.querySelector(".submitBtn");

    goBackBtn.removeAttribute("class");
    goBackBtn.setAttribute("class", "btn btn-primary getBackBtn");

    displayBlock.setAttribute("class", "d-block p-2 bg-primary text-white displayBlock");
    displayBlock.textContent = window.localStorage.getItem("user") + "-" + window.localStorage.getItem("score");
    clearBtn.setAttribute("type", "button");
    clearBtn.setAttribute("class", "btn btn-primary clearBtn");

    clearBtn.textContent = "Clear HighScore";
    goBackBtn.textContent = "Go Back";

    // console.log(initialInput);
    // console.log(formRow);
    formRow.removeChild(initialInput);
    formRow.removeChild(submitBtn);
    formRow.appendChild(displayBlock);
    formRow.appendChild(goBackBtn);
    formRow.appendChild(clearBtn);

    console.log("showHighScores");
    console.log(cardBody);


    clearBtn.addEventListener("click", clearScore);
    goBackBtn.addEventListener("click", restartGame);
}

function clearScore(e) {
    e.preventDefault();

    var displayBlock = document.querySelector(".displayBlock");
    var formRow = document.querySelector(".formRow");
    formRow.removeChild(displayBlock);
    console.log("clearScore")
    console.log(cardBody)
}

function restartGame(e) {
    e.preventDefault();
    var inputForm = document.querySelector(".inputForm");
    var restart = document.createElement("button");
    restart.setAttribute("type", "button");
    restart.setAttribute("class", "btn btn-primary startGame");
    restart.textContent = "Start"

    cardBody.removeChild(inputForm);
    cardBody.appendChild(restart);
    console.log("restartGame")
    console.log(cardBody);

    questionCount = 0;
    count = 75;
    score = 0;
    stopTimer = false;

    restart.addEventListener("click", startTasks);
};

console.log("start game")
startGame.addEventListener("click", startTasks);

//Script

//Stage 1:  Cover page with button that starts the program



// Once the program starts, the timer starts 

//Stage 2:  Questions and answer program - goes through each of the question and prompt the user to select answers
// The timer stops either when the user has answered all the questions or when it goes into zero 
//Stage 3:  Once all the questions are answered or the timer runs out, we prompt the user for initials for high score
//Stage 4:  If the user makes it to the high score, it is displayed.  Otherwise, a message says the user didn't not get to a highscore
//There are 2 buttons for this stage, either you start again or you can clear the top scores