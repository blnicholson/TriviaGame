//start button to start the game
// variables needed
// win function
//loss function
//unanswered function

//variables
var lossSound=new Audio("assets/audio/death.wav");
var winSound=new Audio("assets/audio/fanFare.wav");
var resultSound=new Audio("assets/audio/secret.wav");
var userChoice;
var game = $(".gameCard");
var start;
var timer=3;
//set timer to 10

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
    answerChoices: ["Five", "Three", "Eight",],
    correctAnswer: "Eight",
    image: "assets/images/triforce1.gif"
}, {
    question: "What is the name of the final boss in the Legend of Zelda?",
    answerChoices: ["Wario", "Ganon", "King Slime"],
    correctAnswer: "Ganon",
    image: "assets/images/ganon.gif"
}, {
    question:"What hand does Link primarily use?",
    answerChoices: ["Left-Handed", "Right-Handed","Ambidextrous"],
    correctAnswer: "Left-Handed",
    image:"assets/images/Link.gif"
}, {
    question:"What color is Link's tunic in The Legend Of Zelda?",
    answerChoices: ["Purple", "Teal", "Green"],
    correctAnswer: "Green",
    image:"assets/images/8bitLink.gif"

},{
    question:"In the Legend of Zelda, Link starts out with how many hearts?",
    answerChoices: ["Three", "Five","One"],
    correctAnswer: "Three",
    image:"assets/images/lifeHearts.gif"
},{
    question:"What year did the very first Legend of Zelda game come out?",
    answerChoices: ["1981", "1986","1999"],
    correctAnswer: "1986",
    image:"assets/images/oldSchool.gif"
},{
    question:"The ocarinia is used in which Zelda game?",
    answerChoices: ["Ocarina of Time", "The Legend of Zelda","A Link to the Past"],
    correctAnswer: "Ocarina of Time",
    image:"assets/images/ocarina.gif"
},{
    question:"In Legend of Zelda, where do you get your first sword?",
    answerChoices: ["Princess Zelda", "An old woman","The Old Man in a Cave"],
    correctAnswer: "The Old Man in a Cave",
    image:"assets/images/oldMan.gif"
},{
    question:"In what land does the Legend of Zelda take place?",
    answerChoices: ["Calatia", "Hyrule","Sacred Land"],
    correctAnswer: "Hyrule",
    image:"assets/images/Hyrule.gif"
},{
    question:"What is the currency called in The Legend of Zelda?",
    answerChoices: ["Gols", "Jewels","Rupees"],
    correctAnswer: "Rupees",
    image:"assets/images/rupees.gif" 
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
    start = "<p class='startButton'><a  class='btn btn-outline-success' href='#' role='button'>Start</a></p>";
    $(".gameCard").html(start);
}
startScreen();

function showQuestion() {
    timeCount = setInterval(countdown, 1000);
    $(".timer").show();
    var timer = 3;
    $(".timer").html("<h4 id='timer'>Time Remaining: " + timer);
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
    winSound.play();
    game.html("<h2 id = 'correct'>You Answered Correctly!</h2>");
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
    lossSound.play();
    game.html("<h2 id ='wrongAnswer'>Aww, Wrong Answer!</h2>");
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
    game.html("<h2 id = 'timeUp'>Time's Up!</h2>");
    game.append("<h4> The Correct Answer is: " + triviaQuestions[this.current].correctAnswer);
    game.append('<img src="' + triviaQuestions[this.current].image + '"/>');
    if (current === triviaQuestions.length - 1) {
        setTimeout(results, 1000 * 5)

    }
    else {
        setTimeout(showNext, 1000 * 5);
    }
}

function results() {
    resultSound.play();
    $(".timer").hide();
    game.html("<h3>And The Results Are In: ")
    game.append("<h4 id= 'answered'>Correctly Answered: " + correctCounter);
    game.append("<h4 id ='answered'>Answered Wrong: " + incorrectCounter);
    game.append("<h4 id ='answered'>Not Answered: " + unansweredCounter);
    game.append("<button type='button' class='btn btn-outline-danger' id='startOver'>Start Over</button>");

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


