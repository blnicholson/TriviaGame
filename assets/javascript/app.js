//start button to start the game
// variables needed
// win function
//loss function
//unanswered function

//variables
var userChoice;
var game = $(".gameCard")
var start;

//set timer to 10
var timer = 3;
$(".timer").html("<h4 id='timer'>Time Remaining: " + timer);
//holds correct answered
var correctCounter = 0;
//hold incorrect answered
var incorrectCounter = 0;
//hold unanswered 
var unansweredCounter = 0;
var current = 0;
//question object
var triviaQuestions = [{
    question: "How many pieces are there to the Triforce?",
    answerChoices: ["Five", "Three", "Eight", "One"],
    correctAnswer: "Eight",
    image: "assets/images/triforce1.gif"
}, {
    question: "What is the name of the final boss in the Legend of Zelda?",
    answerChoices: ["Wario", "Ganon", "King Slime", "Queen Bee"],
    correctAnswer: "Ganon",
    image: "assets/images/ganon.gif"
}];







//Countdown function
function countdown() {
    timer--;
    $(".timer").html("<h4 id='timer'>Time Remaining: " + timer);
    if (timer === 0) {
        console.log("no time!");
        timeupLoss();
    }
}
//Start Screen Function
function startScreen() {
    start = "<p class='startButton'><a  class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    $(".gameCard").html(start);
}
startScreen();

function showQuestion() {
    timeCount = setInterval(countdown, 1000);

    $(".gameCard").html("<h5 id = 'question'>" + triviaQuestions[this.current].question + "</h5>");
    for (var i = 0; i < triviaQuestions[this.current].answerChoices.length; i++) {
        game.append("<h5> <button type='button' id='select' class='btn btn-outline-warning'  id='listAnswers'>" + triviaQuestions[this.current].answerChoices[i] + "</button></h5>")
    }
}

function showNext() {
    timer = 3;
    $(".timer").html("<h4 id='timer'>Time Remaining: " + timer);
    current++;
    showQuestion();
} 

function correctAnswer() {
    clearInterval(timeCount);
    correctCounter++;
    game.html("<h2>You Answered Correctly!</h2>");
    game.append('<img src="' + triviaQuestions[this.current].image + '"/>');
    if (current === triviaQuestions.length - 1) {
        setTimeout(results, 1000 * 5)
    }
    else {
        setTimeout(showNext, 1000 * 4);
    }
}

function wrongAnswer() {
    clearInterval(timeCount);
    incorrectCounter++;
    game.html("<h2>Aww! Wrong!</h2>");
    game.append("<h4> The Correct Answer is: " + triviaQuestions[this.current].correctAnswer);
    game.append('<img src="' + triviaQuestions[this.current].image + '"/>');
    if (current === triviaQuestions.length - 1) {
        setTimeout(results, 1000 * 5)
    }
    else {
        setTimeout(showNext, 1000 * 5);
    }

}
function timeupLoss() {
    clearInterval(timeCount);
    unansweredCounter++;
    game.html("<h2>Time's Up!</h2>");
    game.append("<h4> The Correct Answer is: " + triviaQuestions[this.current].correctAnswer);
    game.append('<img src="' + triviaQuestions[this.current].image + '"/>');
    if (current === triviaQuestions.length - 1){
        setTimeout(results, 1000 * 5)
        
    }
    else {
        setTimeout(showNext, 1000 * 5);
    }
}

function results() {
    game.html("<h3>And The Results Are In: ")
    game.append("<h4>Correctly Answered: " + correctCounter);
    game.append("<h4>Answered Wrong: " + incorrectCounter);
    game.append("<h4>Not Answered: " + unansweredCounter);
    game.append("<button type='button' class='btn btn-outline-danger' id='startOver'>Danger</button>");

}

function reset() {
    timer = 3;
    current = 0;
    correctCounter = 0;
    incorrectCounter = 0;
    unansweredCounter = 0;
    showQuestion();
}

//On Click Events
$(".startButton").on("click", function () {
    showQuestion();
});


$(".gameCard").on("click", "#select", function () {
    clearInterval(timeCount)
    userChoice = $(this).text();
    if (userChoice === triviaQuestions[current].correctAnswer) {
        correctAnswer();
    }
    else {
        wrongAnswer();
    }
});
$(".gameCard").on("click", "#startOver", function () {
    reset();
});


