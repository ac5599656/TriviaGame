//counter for the correct answer
var numA = QUIZ_SOURCE.A;
//counter for the wrong answer
var numB = QUIZ_SOURCE.B;
//counter for the current question
var currentQuestion = 0;
//counter for the question
var num = 1;
//counter for unanswered question
var noAnswer = 0;
//the number of seconds for the timer
var number = 30;
//functional variable for running the timer
var intervalId;
console.log(SOURCE);
console.log(SOURCE[0].question);
console.log(SOURCE[0].choices);
console.log(SOURCE[0].choices[0].choice);
console.log(SOURCE[0].choices[0].type);
console.log(SOURCE[0].choices[0].type);

//start function iniates the trivia
function startQuiz() {
    $('.submit').click(function () {
        console.log('startQuiz, ran');
        renderQuestion();
        run();
    });


}
//timer run function
function run() {
    number = 30;
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

//  The decrement function.
function decrement() {

    //  Decrease number by one.
    number--;

    //  Show the number in the #show-number tag.
    $("#show-number").html("<h2>" + number + "</h2>");


    //  Once number hits zero...
    if (number === 0) {

        //  ...run the stop function.
        stop();
        //feedback when the timer runs out of time
        $('.feedback').html(`You did not select an answer. The right answer is ${SOURCE[currentQuestion].choices[currentQuestion].choice}.`);
        //hide questions, answers,scores and timer
        $('.score, .questions, .answers').hide();
        $('#show-number').hide();
        //counter for unanswered question
        noAnswer++;
        //pass noAnswer counter to the result function
        result(noAnswer);
        //timer set to go the next page
        setTimeout(function () {
            next();
        }, 5000);

    }
}

//  The stop function
function stop() {

    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
}



//submit function
function submit() {

    $('#main').on('click', '.answers', function (event) {
        //prevent default
        event.preventDefault();
        //capture the value by the user.
        var answer = parseInt($("input:checked").val(), 10);
        //stop the timer
        stop();
        //correct answer recieves a feedback for getting the correct answers
        //the score, question, answers, and timer are hidden from the user
        if (answer == 1) {

            $('.feedback').text('You selected the right answer.');
            $('.score, .questions, .answers').hide();
            $('#show-number').hide();
            numA++;
            //time sets to go the next page
            setTimeout(function () {
                next();
            }, 5000);

        }
        //wrong answer recieves a feedback for getting the wrong answers
        //the score, question, answers, and timer are hidden from the user
        else if (answer == 2) {

            $('.feedback').html(`You selected the wrong answer. The right answer is ${SOURCE[currentQuestion].choices[currentQuestion].choice}.`);
            $('.score, .questions, .answers').hide();
            $('#show-number').hide();
            numB++;
            //time sets to go the next page
            setTimeout(function () {
                next();
            }, 5000);

        }
        //pass the counter for the correct and wrong answers to the result function
        result(numA, numB);
    });

}

//next function takes you to the next page
function next() {
    //goes to the next question if the current question is less than the array length minus one.
    if (currentQuestion < SOURCE.length - 1) {
        currentQuestion++;
        num++;
        renderQuestion();

    }

    //else goes show the result page
    else {
        resultPage();
        result(numA, numB, noAnswer);
    }


}
//render the next question
function renderQuestion() {
    var availableChoices = handleChoices()
    run();
    $('#main').html(
        ` <div class="picture"><img src="./assets/images/big_head.png" alt="human head"/></div>	
        <form class ='form'>
            <h1>Question ${num} of ${SOURCE.length} </h1>
            <div id="show-number"></div>
            <div class="score">
                <span class="A">
                Correct Answer:${numA}
                </span>
                <span class="B">
                Wrong Answer:${numB}
                </span>
            </div>
            <section role="region"class="feedback">
            </section>   
            <p class="questions">
                ${SOURCE[currentQuestion].question}
            </p>
            <section role= "region" class = "answers">
                ${availableChoices}
            </section>
            
        </form>`

    )
}
//function
function handleChoices() {
    let choices = [];
    let choiceArray = SOURCE[currentQuestion].choices
    for (var i = 0; i < choiceArray.length; i++) {

        choices.push(`<input type="radio" name="feelings-2" id="ans" value="${choiceArray[i].type}" ><label for="ans-${i + 1}">${choiceArray[i].choice}</label>
        <br>`);

    }
    return choices.join("");
}
//function starts the trivia game
function initialPage() {
    $('#main').html(
        `<div class = "row">
   	    <div class="col-12">
            <div class="heading">
   	            <h1> Trivia</h1>
            </div>
        </div>
    </div>
    <div class = "row">
   	    <div class = "col-12">
   	        <div class="container">
   	            <img src="./assets/images/big_head.png" alt="human head"/>	
            </div>
        </div>
    </div>  
    <div class = "row">
        <div class = "col-12">
            <button type="Enter" class="submit">Click Here To Find Out</button>
        </div>
    </div>`)
    startQuiz();
}
//function restart the trivia game
function restart() {
    $('#main').on('click', '.restart', function () {
        currentQuestion = 0;
        num = 1;
        numA = 0;
        numB = 0;
        initialPage();
    });

}

//function for showing the correct, wrong, and unanswered answers
function result(numA, numB, noAnswer) {

    $('.content').text(`Correct Answers: ${numA} Wrong Answers:${numB} No Answer: ${noAnswer} `)


}
//function for the result of the game
function resultPage() {

    $('#main').html(
        `<div class="result">
   	        <h1>Result:</h1>
            <p class = "content">
            </p>
            <button class = "restart">
                Restart
            </button>
        </div>
        `
    )

}
//initate the startQuiz, submit, and restart functions
function renderFunction() {
    startQuiz();
    submit();
    restart();

}
//iniate the renderFunction
$(renderFunction);