function triviaQuestions() {
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
            "answers": ["United States", "France", "Germany", "Brazil"],
            "correctAnswer": "answer-2"
        }, {
            "question": "Name a member of Mobb Deep",
            "answers": ["Brady Bunch", "Two and A Half Men", "Sopranos", "The Big Bang Theory"],
            "correctAnswer": "answer-4"
        }, {
            "question": "Q-Tip, Phife Dawg & Ali Shaheed Muhammad founded which group?",
            "answers": ["Green Bay Packers", "Denver Broncos", "Carolina Panthers", "New England Patriots"],
            "correctAnswer": "answer-1"
        }, {
            "question": 'What was Christopher Wallaces stage name?',
            "answers": ["Dale Earnhardt", "Michael Schumacher", "Colin McRae", "Darrell Waltrip"],
            "correctAnswer": "answer-3"
        }, {
            "question": "What is Jay-Z's real name?",
            "answers": ["One", "Two", "Five", "Seven"],
            "correctAnswer": "answer-2"
        }, {
            "question": "What NY borough did the Wu-Tang Clan refer to as 'Shaolin'?",
            "answers": ["42", "80", "200", "153"],
            "correctAnswer": "answer-3"
        }, {
            "question": "WThis artist starred in the films 'Above The Rim' and 'Juice'",
            "answers": ["Shel Silverstein", "Johnny Cash", "Elvis Pressley", "Elton John"],
            "correctAnswer": "answer-1"
        }, {
            "question": "Will Smith starred in what TV show?",
            "answers": ["Thomas Jefferson", "Theodore Roosevelt", "George Washington", "Franklin Roosevelt"],
            "correctAnswer": "answer-4"
        }
    ];
    // load variables
    amountCorrect = 0;

    return questOptions;
}

function newTimer(counter) {

    var timerRunning = true;
    var nextQuestionTimer = setInterval(function () {
        $("#timer").html("<h3>Next question in " + counter + " seconds!</h3>")
        counter--;
        if (counter <= 0) {
            clearInterval(nextQuestionTimer);
            // check to see if there are any remaining questions
            var questionsLeft = questOptions.length
            if (questionsLeft === 0) {
                $("#timer").html("<h3>No questions remain.</h3>")
                //endOfGamePopup();
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
    // this function selects a question from the bank of questions

    // sets the games basic conditions.
    timeUp = false;
    userSelected = false;

    // indexNumber = 0; //maybe make random, but for testing will be static
    indexNumber = Math.floor(Math.random() * array.length); // this will select a random question.

    question = array[indexNumber];
    if (question) {
        $("#triviaQuestion").html("<h4>" + question.question + "</h4>")
        $("#answer1").html("<h5>" + question.answers[0] + "</h5>")
        $("#answer2").html("<h5>" + question.answers[1] + "</h5>")
        $("#answer3").html("<h5>" + question.answers[2] + "</h5>")
        $("#answer4").html("<h5>" + question.answers[3] + "</h5>")

    }

    // set timer for question
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

$(document).ready(function () {

    gameQuestions = triviaQuestions();

    // once the page is loaded a question is selected.
    currentQuestionAnswer = selectQuestion(gameQuestions);
    timerRunning = true;

    

    })
