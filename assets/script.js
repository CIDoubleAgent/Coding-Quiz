const questionsArray = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        title: "The conditions of an if/else statement are enclosed within _______.",
        choices: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        answer: "3. parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store _______.",
        choices: ["1. numbers & strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        title: "String values must be enclosed within _______ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        answer: "3. quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. javascript", "2. terminal/bash", "3. for loops", "4. console log"],
        answer: "4. console log"
    },
];


let secondsRemaining = 75;
let question = 0;
let playerScore = 0;
let penalty = 15;
let interval = 0;
let quizTimer = document.querySelector("#startTime");
let currentTime = document.querySelector("#currentTime");
let questionsDiv = document.querySelector("#questionsDiv");
let wrapper = document.querySelector("#wrapper");
let createList = document.createElement("ul");

quizTimer.addEventListener("click", function () {
    if (interval === 0) {
        interval = setInterval(function () {
            secondsRemaining--;
            currentTime.textContent = "Time: " + secondsRemaining;

            if (secondsRemaining <= 0) {
                clearInterval(interval);
                done();
                currentTime.textContent = "Time has run out!";
            }
        }, 1 * 1000);
    }
    render(question);
});
function render(question) { 
    questionsDiv.innerHTML = "";
    createList.innerHTML = "";

    for (var i = 0; i < questionsArray.length; i++) {
        var userQuestion = questionsArray[question].title;
        var userChoices = questionsArray[question].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(createList);
        createList.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == questionsArray[question].answer) {
            playerScore++;
            createDiv.textContent = "Thats right! The answer is:  " + questionsArray[question].answer;

        } else {
            secondsRemaining = secondsRemaining - penalty;
            createDiv.textContent = "Incorrect, The correct answer is:  " + questionsArray[question].answer;
        }

    }

    question++;

    if (question >= questionsArray.length) {
        done();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + playerScore + "/" + questionsArray.length + " Correct!";
    } else {
        render(question);
    }
    questionsDiv.appendChild(createDiv);
}

function done() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Done!"
    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);

    if (secondsRemaining >= 0) {

        var timeRemaining = secondsRemaining;
        var createP2 = document.createElement("p");
        clearInterval(interval);
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
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            let highScores = localStorage.getItem("highScores");
            if (highScores === null) {
                highScores = [];
            } else {
                highScores = JSON.parse(highScores);
            }
            highScores.push(finalScore);
            let newScore = JSON.stringify(highScores);
            localStorage.setItem("highScores", newScore);
            window.location.replace("./highScores.html");
        }
    });

}

console.log(window.innerWidth)