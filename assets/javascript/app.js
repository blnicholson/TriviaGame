//start button to start the game
// variables needed
// win function
//loss function
//unanswered function

//variables
var userChoice;
var game = $("#here2")
var start;

//set timer to 10
var timer = 3;
$("<h3 id ='time'> Time Remaining: " + timer + "</h3>");
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








function countdown() {
    timer--;

    // if (timer === 0) {
    //     alert("time's up!")
    // }
    $("#zelda").html(timer);

    if (timer === 0) {
        console.log("no time!");
        timeupLoss();

    }
}
//user chooses correct answer
function correctAnswer() {
    clearInterval(timeCount);
    correctCounter++;
    game.html("<h2>You Answered Correctly!</h2>");
    game.append('<img src="' + triviaQuestions[this.current].image + '"/>');
    if (current === triviaQuestions.length - 1) {
        results();
    }
    else {
        setTimeout(showNext, 1000 * 4);
    }
}

function wrongAnswer() {
    clearInterval(timeCount);
    incorrectCounter++;
    game.html("<h2>You !</h2>");
    game.append("<h4> The Correct Answer is: " + triviaQuestions[this.current].correctAnswer);
    game.append('<img src="' + triviaQuestions[this.current].image + '"/>');
    if (current === triviaQuestions.length - 1) {
        results();
    }
    else {
        setTimeout(showNext, 1000 * 4);
    }

}
function timeupLoss() {
    clearInterval(timeCount);
    unansweredCounter++;
    game.html("<h2>Time's Up!</h2>");
    game.append("<h4> The Correct Answer is: " + triviaQuestions[this.current].correctAnswer);
    game.append('<img src="' + triviaQuestions[this.current].image + '"/>');
    if (current === triviaQuestions.length - 1) {
        results();
    }
    else {
        setTimeout(showNext, 1000 * 4);
    }
}
function showQuestion() {
    timeCount = setInterval(countdown, 1000);
    $("#here2").html("<p id = 'question'>" + triviaQuestions[this.current].question + "</p>");
    for (var i = 0; i < triviaQuestions[this.current].answerChoices.length; i++) {
        game.append("<button type='button' id='select' class='btn btn-outline-warning'  id='listAnswers'>" + triviaQuestions[this.current].answerChoices[i] + "</button>")
    }
}
function showNext() {
    timer = 3;
    $("#zelda").html(timer);
    current++;
    showQuestion();
}

function startScreen() {
    start = "<p class='startButton'><a  class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    $("#here2").html(start);
}
startScreen();

function reset() {
    timer = 3;
    current = 0;
    correctCounter = 0;
    incorrectCounter = 0;
    unansweredCounter = 0;
    showQuestion();
}
function results() {
    game.html("Here are your Results:")
    game.append("Correctly Answered: " + correctCounter);
    game.append("Answered Wrong: " + incorrectCounter);
    game.append("Not Answered: " + unansweredCounter);
    game.append("<button type='button' class='btn btn-outline-danger' id='startOver'>Danger</button>");

}
$(".startButton").on("click", function () {
    showQuestion();
});


$("#here2").on("click", "#select", function () {
    clearInterval(timeCount)
    userChoice = $(this).text();
    if (userChoice === triviaQuestions[current].correctAnswer) {
        correctAnswer();
    }
    else {
        wrongAnswer(); 
    }
});
$("#here2").on("click", "#startOver", function () {
  reset();
});


