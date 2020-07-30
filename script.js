

var questionsArr = [
    {
        q: "What is the special character used to target an ID in CSS?",
        a: [".","=","#","^"],
        correctAnswer: "#",
    },
    {
        q: "What is the element tag used to create a line break?",
        a: ["<td>","<br>","<a>","<div>"],
        correctAnswer: "<br>",
    },
    {
        q: "What is the Javascript identifier that activates Jquery",
        a: ["@","!","()","$"],
        correctAnswer: "$",
    },
    {
        q: "Using a _________ tag i can apply Javascript directly from my HTML file.",
        a: ["img","anchor","script","link"],
        correctAnswer: "script",
    },
    {
        q: "var x = 5-2, var y = 2+3, if var z = x * y what will the outcome be?",
        a: [15,"15", 8,"8"],
        correctAnswer: 15,
    },
    {
        q: "What is the acronym for 'CSS'?",
        a: ["correct styling system","cascading style sheets","color style synergy","custom style selections"],
        correctAnswer: "cascading style sheets",
    },
    {
        q: "Bootstrap can be used for adding pre-coded _________.",
        a: ["buttons","forms","cards","all of the above"],
        correctAnswer: "all of the above"
    },
    {
        q: "A Boolean can be used to add, subtract, multiply, or divide a set of numbers?",
        a: ["true","sometimes","false","accordingly"],
        correctAnswer: "false",
    },
    {
        q: "What's the assignment operator to set a value to a variable",
        a: ["/","<>","||","="],
        correctAnswer: "=",
    },
    {
        q: "After creating a folder and subsequent files on the command line, what is the last step to push your repo to github?",
        a: ["git init","git push -u origin master","git commit -m 'first commit'","git remote add origin https:"],
        correctAnswer: "git push -u origin master",
    },
];

//page elements
var startGame = document.querySelector("#startGame");
var gameContainer = document.querySelector(".container");

//variables
var counter = 0;
var score = 0;
var timer = 60;
var stopTimer = false;

startGame.addEventListener("click", function () {
    //start the game
    //add questions and answers
    var timerOnScreen = document.createElement("h2");
    timerOnScreen.textContent = timer;
    document.querySelector(".time").appendChild(timerOnScreen);

    renderQuestions();
    gameTimer();
});

function renderQuestions() {
     gameContainer.innerHTML = "";
     var currentQuestions = questionsArr[counter];

    //question Element
     var newQuestionH1 = document.createElement("h1");
     newQuestionH1.textContent = currentQuestions.q;
     gameContainer.appendChild(newQuestionH1);

    // unordered list Element
     var ulEl= document.createElement("ul");
     gameContainer.appendChild(ulEl);

    // answers Elements
    for (var i = 0; i < currentQuestions.a.length; i++) {
        var newAnswer = document.createElement("button");
        var space = document.createElement("br");
        newAnswer.setAttribute("class", "btn btn-primary");
        newAnswer.setAttribute("data-answer", currentQuestions.a[i]);
        newAnswer.textContent = currentQuestions.a[i];
        newAnswer.addEventListener("click", answeringQuestions);
        ulEl.appendChild(newAnswer);
        ulEl.appendChild(space);
    }
}

function answeringQuestions(event) {
    var currentQuestions = questionsArr[counter];
    var currentPressedButton = event.target;
    var valueOfButton = currentPressedButton.getAttribute("data-answer");
    console.log(valueOfButton);
    
    if (valueOfButton == currentQuestions.correctAnswer) {
        console.log("you are right");
        score++;
    } else {
        timer = timer - 5;
        console.log("you are wrong");
    }

    counter++;

    if (counter >= questionsArr.lenth) {
        endgame();
    } else {
        renderQuestions();
    }
}

function endgame(text) {
    gameContainer.innerHTML = "";
    stopTimer = true;
    var scoreEl = document.createElement("h3");
    var form = document.createElement("form");
    var inputName = document.createElement("input");
    var submitBtn = document.createElement("button");

    inputName.setAttribute("placeholder", "Save your HighScore");
    inputName.setAttribute("name", "playerName");
    submitBtn.textContent = "SAVE";
    submitBtn.addEventListener("click", saveHighScore);

    scoreEl.textContent = "your score is : " + score;
    gameContainer.appendChild(scoreEl)

    form.appendChild(inputName);
    form.appendChild(submitBtn);
    gameContainer.appendChild(form)

    counter = 0;
    score = 0;
    timer = 60;
}

function gameTimer() {
    var gameT = setInterval(function (){
        timer--;
        
        var timerOnScreen = document.querySelector("h2");
        timerOnScreen.textContent = timer;

        if (timer == 0 || counter >= questionsArr.length || stopTimer) {
            document.querySelector(".time").innerHTML = "";
            clearInterval(gameT);
            endgame();
        }
    }, 1000);
}

function saveHighScore(e) {
    event.preventDefault();

    var playerName = document.querySelector("input").value;
    var currentScores = localStorage.getItem("scores");

    if (currentScores !== null) {
        currentScores = JSON.parse(currentScores);

        gameResult = { player: playerName, score: score };
        currentScores.push(gameResult);
        currentScores.sort(function (a, b) {
            return b.score - a.score;
        });

        localStorage.setItem("scores", JSON.stringify(currentScores));

        console.log(currentScores);
    } else {
        currentScores = [];
        currentScores.push({ player: playerName, score : 100});

        localStorage.setItem("scores", JSON.stringify(currentScores));
    }

    gameContainer.innerHTML = "";

    var listHs = document.createElement("ol");

    for( var i = 0; i < currentScores.length; i++) {
        var listEl = document.createElement("li");
        listEl.textContent =
            currentScores[i].player + ":" + currentScores[i].score;

        listHs.appendChild(listEl);
    }
    gameContainer.appendChild(listHs);
}


