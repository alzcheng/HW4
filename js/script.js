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

    //Get elements from document
    var cardBody = document.querySelector(".card-body");
    var cardText = document.querySelector(".card-text");
    var cardTitle = document.querySelector(".card-title");
    var startGame = document.querySelector(".startGame");

    //Create new elements to be put into document
    var btnGroup = document.createElement("div");
    var btn1 = document.createElement("button");
    var btn2 = document.createElement("button");
    var btn3 = document.createElement("button");
    var btn4 = document.createElement("button");

    //Setting attributes 
    btnGroup.setAttribute("class", "btn-group-vertical btnGroup");
    btn1.setAttribute("type", "button");
    btn1.setAttribute("class", "btn btn-primary btn-stage2 choice1");
    btn2.setAttribute("type", "button");
    btn2.setAttribute("class", "btn btn-primary btn-stage2 choice2");
    btn3.setAttribute("type", "button");
    btn3.setAttribute("class", "btn btn-primary btn-stage2 choice3");
    btn4.setAttribute("type", "button");
    btn4.setAttribute("class", "btn btn-primary btn-stage2 choice4");
    cardTitle.removeAttribute("class");
    cardTitle.setAttribute("class", "card-title data-ct-stage2");

    //Remove children 
    cardBody.removeChild(cardText);
    cardBody.removeChild(startGame);

    //Append children
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

    var timer = setInterval(function () {
        count--
        countdownTimer.textContent = "Timer: " + count;
        if (count === 0) {
            countdownTimer.textContent = "Timer: " + count;
            clearInterval(timer)
            endGame();
        } else if (stopTimer) {
            countdownTimer.textContent = "Timer: " + count;
            clearInterval(timer)
            return;
        }
    }, 1000)
}

// function correctAnswer() {
//     var cardBody = document.querySelector(".card-body");
//     var displayElement = document.createElement("p");
//     displayElement.setAttribute("class", "displayElement")
//     displayElement.textContent = "Right Answer!"
//     cardBody.appendChild(displayElement);
//     var display = setInterval(function () {

//     }, 1000)
//     cardBody.removeChild(displayElement);
//     // console.log(document);
//     console.log(document.querySelector("displayElement"));
//     // cardBody.removeChild(document.querySelector("displayElement"));
// }
//startQuestions fills in the questions and the choices for answers from startTasks

function startQuestions() {

    //Getting elements from the document 
    var choice1 = document.querySelector(".choice1");
    var choice2 = document.querySelector(".choice2");
    var choice3 = document.querySelector(".choice3");
    var choice4 = document.querySelector(".choice4");
    var cardTitle = document.querySelector(".card-title");

    //Setting text content
    cardTitle.textContent = questionBank[questionCount].question;
    choice1.textContent = questionBank[questionCount].answer[0];
    choice2.textContent = questionBank[questionCount].answer[1];
    choice3.textContent = questionBank[questionCount].answer[2];
    choice4.textContent = questionBank[questionCount].answer[3];

    //Set click events to each of the buttons 
    choice1.addEventListener("click", userAnswer);
    choice2.addEventListener("click", userAnswer);
    choice3.addEventListener("click", userAnswer);
    choice4.addEventListener("click", userAnswer);

};

//userAnswer handles the choice of the user 
function userAnswer(e) {
    e.preventDefault();
    if (questionBank[questionCount].correctAnswer === this.textContent) {
        score++; //Add 1 to score if it is the right answer
        console.log("step1");
        // correctAnswer();
        //alert("Right Answer");
    } else {
        console.log("step2");
        if ((count + score) < 10) {
            count = 0;
            score = 0;
            endGame();
        } else {
            count = count - 10;
        }
        //alert("Wrong Answer");
    }

    if (questionCount === questionBank.length - 1) {
        console.log("step3");
        endGame();
    } else {
        questionCount = questionCount + 1;
        console.log("step4")
        startQuestions();
    }
}

function endGame() {

    //Getting element from document
    var btnGroup = document.querySelector(".btnGroup");
    var cardBody = document.querySelector(".card-body");
    var cardTitle = document.querySelector(".card-title");

    //Create new element
    var cardText = document.createElement("p");
    var inputForm = document.createElement("form")
    var inputTextBox = document.createElement("input");
    var submitBtn = document.createElement("button")

    //Setting element attributes
    cardText.setAttribute("class", "card-text");
    inputForm.setAttribute("class", "form-inline inputForm");
    inputTextBox.setAttribute("type", "text");
    inputTextBox.setAttribute("class", "form-control initialInput");
    inputTextBox.setAttribute("placeholder", "Enter your initials");
    submitBtn.setAttribute("type", "button");
    submitBtn.setAttribute("class", "btn btn-primary submitBtn");

    //Setting text content
    cardTitle.textContent = "All done!"
    submitBtn.textContent = "Submit";

    //Removing child
    cardBody.removeChild(btnGroup);

    //Appending child
    cardBody.appendChild(cardText);
    cardBody.appendChild(inputForm);
    inputForm.appendChild(inputTextBox);
    inputForm.appendChild(submitBtn);
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

    //Getting elements from document
    var cardBody = document.querySelector(".card-body");
    var card = document.querySelector(".card");

    //Creating new elements
    var displayBlock = document.createElement("span");
    var clearBtn = document.createElement("button");
    var goBackBtn = document.createElement("button");
    var cardReplaceBody = document.createElement("div");
    var cardTitle = document.createElement("h5");

    //Setting element attribute
    cardReplaceBody.setAttribute("class", "card-body cb-stage4")
    cardTitle.setAttribute("class", "card-title ct-stage4");
    goBackBtn.setAttribute("class", "btn btn-primary getBackBtn");
    displayBlock.setAttribute("class", "d-block p-2 bg-primary text-white displayBlock");
    clearBtn.setAttribute("type", "button");
    clearBtn.setAttribute("class", "btn btn-primary clearBtn");

    //Setting text content
    displayBlock.textContent = window.localStorage.getItem("user") + "-" + window.localStorage.getItem("score");
    cardTitle.textContent = "Highscores"
    clearBtn.textContent = "Clear HighScore";
    goBackBtn.textContent = "Go Back";

    //Removing child
    card.removeChild(cardBody);

    //Appending child
    card.appendChild(cardReplaceBody);
    cardReplaceBody.appendChild(cardTitle);
    cardReplaceBody.appendChild(displayBlock);
    cardReplaceBody.appendChild(goBackBtn);
    cardReplaceBody.appendChild(clearBtn);

    clearBtn.addEventListener("click", clearScore);
    goBackBtn.addEventListener("click", restartGame);
}

function clearScore(e) {
    e.preventDefault();

    //Getting element from document
    var displayBlock = document.querySelector(".displayBlock");
    var cardBody = document.querySelector(".card-body");

    //Removing child
    cardBody.removeChild(displayBlock);
}

function restartGame(e) {
    e.preventDefault();

    //Getting element from document
    var getBackBtn = document.querySelector(".getBackBtn");
    var clearBtn = document.querySelector(".clearBtn");
    var displayBlock = document.querySelector(".displayBlock")
    var cardBody = document.querySelector(".card-body");
    var cardTitle = document.querySelector(".card-title");
    var countdownTimer = document.querySelector(".countdownTimer");

    //Creating new elements
    var restart = document.createElement("button");
    var cardText = document.createElement("p");

    //Setting attributes
    cardText.setAttribute("class", "card-text");
    restart.setAttribute("type", "button");
    restart.setAttribute("class", "btn btn-primary startGame");

    //Setting text content
    cardText.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score time by 10 seconds!"
    cardTitle.textContent = "Coding Quiz Challenge"
    countdownTimer.textContent = "Time: 75"
    restart.textContent = "Start";

    console.log(displayBlock);

    //Removing child
    if (displayBlock !== null) {
        cardBody.removeChild(displayBlock);
    }
    cardBody.removeChild(getBackBtn);
    cardBody.removeChild(clearBtn);

    //Appending chile
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