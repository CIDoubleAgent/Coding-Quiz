let score = document.querySelector("#highScore");
let back = document.querySelector("#goBack");
let clear = document.querySelector("#clear");
let highScores = localStorage.getItem("highScores");

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

highScores = JSON.parse(highScores);

if (highScores !== null) {

    for (var i = 0; i < highScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = highScores[i].initials + " " + highScores[i].score;
        score.appendChild(createLi);
    }
}

back.addEventListener("click", function () {
    window.location.replace("./index.html");
});