const questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The conditions of an if/else statement are enclosed within _______.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store _______.",
        choices: ["numbers & strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within _______ when being assigned to variables.",
        choices: ["commas", "curly brackets", " quotes", "parentheses"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["javascript", "terminal/bash", "for loops", "console log"],
        answer: "console log"
    },
];

let score = 0;
let questionIndex = 0;

let currentTime = document.querySelector("#currentTime");
let timer = document.querySelector("#startTime");
let questionsDiv = document.querySelector("#questionsDiv");
let wrapper = document.querySelector("#wrapper");

let secondsLeft = 75;
let holdInterval = 0;
let penalty = 10;
let ulCreate = document.createElement("ul");

timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's Up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

function render(questionIndex) { 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;

        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }

    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

   let createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    let createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        let initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                inilettials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            let allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            let newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            window.location.replace("./HighScores.html");
        }
    });

}