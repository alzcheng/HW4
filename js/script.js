//Variable definitions

//Variables for defining HTML
//Timer variables
var countdownTimer = document.querySelector(".countdownTimer");
var startGame = document.querySelector(".startGame");

//HTML variables
var cardTitle = document.querySelector(".card-title");
var cardText = document.querySelector(".card-text");


var questionsArr = [
    "Question 1", "Question 2", "Question 3", "Question 4", "Question 5"
];
var score = 0;




//var timerStartSec= 75;


//Function definitions 

//Countdown timer 
function startTimer() {
    var count = 10;
    var timer = setInterval(function () {
        count--
        countdownTimer.textContent = "Timer: " + count;
        if (count === 0) {
            clearInterval(timer)
            countdownTimer.textContent = "Timer: " + count;
            //Tallies up the scores
            scoreTally()
            return
        }
    }, 1000)
}

function startGame() {
    //set up the HTML 



}

//Going through the questions:



startGame.addEventListener("click", function () {
    startTimer();
    startQuestions();
})


//Script 

//Stage 1:  Cover page with button that starts the program



// Once the program starts, the timer starts 

//Stage 2:  Questions and answer program - goes through each of the question and prompt the user to select answers
// The timer stops either when the user has answered all the questions or when it goes into zero 
//Stage 3:  Once all the questions are answered or the timer runs out, we prompt the user for initials for high score
//Stage 4:  If the user makes it to the high score, it is displayed.  Otherwise, a message says the user didn't not get to a highscore
//There are 2 buttons for this stage, either you start again or you can clear the top scores