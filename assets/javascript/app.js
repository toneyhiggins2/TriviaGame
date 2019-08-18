
var questOptions = [
    // array to hold all of the questions
    {
        "question": "What is the name of Nas' debut album?",
        "answers": ["The Lost Tapes", "NASIR", "Illmatic", "I Am"],
        "correctAnswer": "answer3",
    }, {
        "question": "What label did Dr. Dre, Snoop Dogg and Tupac Shakur all belong to?",
        "answers": ["Death Row", "Bad Boy", "Atlantic", "Motown"],
        "correctAnswer": "answer1"
    }, {
        "question": "Who founded Bad Boy Records?",
        "answers": ["Biggie", "Sean Combs", "Dr Dre", "Sean Carter"],
        "correctAnswer": "answer2"
    }, {
        "question": "Name a member of Mobb Deep",
        "answers": ["Prodigy", "Eminem", "Tupac", "Earl Jones"],
        "correctAnswer": "answer1"
    }, {
        "question": "Q-Tip, Phife Dawg & Ali Shaheed Muhammad founded which group?",
        "answers": ["Black Eye Peas", "Nsync", "Boys 2 Men", "A Tribe Called Quest"],
        "correctAnswer": "answer4"
    }, {
        "question": 'What was Christopher Wallaces stage name?',
        "answers": ["Biggie", "Smalls", "Notorius BIG", "Chris"],
        "correctAnswer": "answer3"
    }, {
        "question": "What is Jay-Z's real name?",
        "answers": ["Shawn Carter", "Big Sean", "Sean Alexander", "Shawn Combs"],
        "correctAnswer": "answer1"
    }, {
        "question": "What NY borough did the Wu-Tang Clan refer to as 'Shaolin'?",
        "answers": ["Brooklyn", "Staten Island", "Flat Bush", "Queens"],
        "correctAnswer": "answer2"
    }, {
        "question": "This artist starred in the films 'Above The Rim' and 'Juice'",
        "answers": ["Denzel Washington", "Duane Martin", "Tupac Shakur", "Will Smith"],
        "correctAnswer": "answer3"
    }, {
        "question": "Will Smith starred in what TV show?",
        "answers": ["Fresh Prince of Bel-Air", "My Wife and Kids", "Tales", "All American"],
        "correctAnswer": "answer1"
    }
];

function newTimer(counter) {


    var timerRunning = true;
    var nextQuestionTimer = setInterval(function () {
        $("#timer").html("<h3>Next question in " + counter + " seconds!</h3>")
        counter--;
        if (counter <= 0) {
            clearInterval(nextQuestionTimer);

            var questionsLeft = questOptions.length;
            if (questionsLeft === 0) {
                $("#timer").html("<h3>No questions remain.</h3>")
                endofGame();

            } else {
                $("#timer").html("<h3>Next Question!</h3>");
                timerExpired = true;
                timerRunning = false;
                currentQuestionAnswer = selectQuestion(questOptions); //once timer expires call next question.
            }
        } else if (null === selectedAnswer && counter > 3) {
            $("#timer").html("<h3>Time is up!</h3>");
        } else if (currentQuestionAnswer === selectedAnswer && counter > 3) {
            $("#timer").html("<h3>Correct Choice</h3>");
        } else if (currentQuestionAnswer !== selectedAnswer && counter > 3) {
            $("#timer").html("<h3>Incorrect Choice</h3>");
        } else {
            $("#timer").html("<h3>Next question in " + counter + " seconds!</h3>");
        }
    }, 1000);
}



function selectQuestion(array) {

    timeUp = false;
    userSelected = false;


    indexNumber = Math.floor(Math.random() * array.length);

    question = array[indexNumber];
    if (question) {
        $("#triviaQuestion").html("<h4>" + question.question + "</h4>")
        $("#answer1").html("<h5>" + question.answers[0] + "</h5>")
        $("#answer2").html("<h5>" + question.answers[1] + "</h5>")
        $("#answer3").html("<h5>" + question.answers[2] + "</h5>")
        $("#answer4").html("<h5>" + question.answers[3] + "</h5>")

    }


    counter = 30;
    var timerRunning = true;
    $("#timer").html("<h3>Time Remaining: " + counter + "</h3>");
    timerCountdown = setInterval(function () {
        counter--;
        if (counter <= 0) {
            clearInterval(timerCountdown);
            $("#timer").html("<h3>Time is up!</h3>");
            timerRunning = false;
            timerExpired = true;
            selectedAnswer = null;
            newTimer(7);
        } else {
            $("#timer").html("<h3>Time Remaining: " + counter + "</h3>");
        }
    }, 1000);


    return question.correctAnswer;

}

function endofGame() {

    $("#userScore").text("Score: " + ((answeredCorrect / total) * 100));
    $("#correct").text("Correct Answers: " + answeredCorrect);
    $("#incorrect").text("Incorrect Answers: " + (total - answeredCorrect));
}

$(document).ready(function () {

    gameQuestions = questOptions;

    total = questOptions.length;

    currentQuestionAnswer = selectQuestion(questOptions);
    timerRunning = true;

    $(".answers").on("click", function () {

        if (timeUp === true) {
            alert("Time is up, cannot select an answer.")
        } else {
            selectedAnswer = this.id;
            selectedAnswerID = "#" + selectedAnswer;
            answerSelected = true;
            clearInterval(timerCountdown);
        }// stop the countdown timer

        if (currentQuestionAnswer === selectedAnswer) {
            // if the user selects the correct answer do the following
            $(selectedAnswerID).addClass("correct-answer");
            // add timer for 3 seconds
            answeredCorrect = answeredCorrect + 1;

        } else {
            // if the user is incorrect do the following.
            correctAnswerId = "#" + currentQuestionAnswer;
            $(correctAnswerId).addClass("correct-answer");
            $(selectedAnswerID).addClass("incorrect-answer");
        }
        // regardless of whether the answer is right or wrong, prep for next question
        newTimer(5); // new question will be selected here. 

    })

}) 
