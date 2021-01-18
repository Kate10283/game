"use strict"
var growingPlatform = document.querySelector(".groving-platform");
var newPlatform = document.querySelector(".new-platform");
var platform = document.querySelector(".platform");
var bird = document.querySelector(".bird");
var body = document.querySelector(".layout");
var heightGrowingPlatform = 0;
var distance = 0;
var widthNewPlatform = 0;
var distanceForBird = 0;  // расстояние для перехода на следующую платформу
var timerId1 = 0;
var timerId2 = 0;
var backgroundPosition = ["-130px 0", "-255px 0", "-380px 0", "-505px 0", "-630px 0",
    "-760px 0", "0 0"]; // позиции для спрайта
var widthBird = Number(getComputedStyle(bird).width.slice(0, getComputedStyle(bird).width.length - 2));
var lifes = document.querySelector(".lifes");
var counterLifes = 3;
var score = document.querySelector(".score");
var counterScore = 0;
var counterCalcScore = 0; // аналогично количеству пройденных уровней
var record = document.querySelector(".record");
var allRecords = [];

body.onmousedown = grow;
body.onmouseup = stopGrow;

function grow() {
    timerId1 = window.setInterval(() => {
        if (!growingPlatform.style.height) {
            growingPlatform.style.height = "10px";
            heightGrowingPlatform = 10;
        }
        else if (Number(growingPlatform.style.height.slice(0, growingPlatform.style.height.length - 2)) >= 619) {
            stopGrow();
        }
        else {
            let height = growingPlatform.style.height.slice(0, growingPlatform.style.height.length - 2);
            growingPlatform.style.height = Number(height) + 10 + "px";
            heightGrowingPlatform += 10;
        }
    }, 15);
}

function stopGrow() {
    window.clearInterval(timerId1);
    body.onmousedown = null;
    body.onmouseup = null;
    fallDown();
}

function fallDown() {
    growingPlatform.style.transform = "rotate(90deg)";
    checkAndRun();
}

function checkAndRun() {
    distance = Number(newPlatform.style.marginLeft.slice(0, newPlatform.style.marginLeft.length - 2));
    // console.log("distance (marginLeft) = " + distance);
    widthNewPlatform = Number(newPlatform.style.width.slice(0, newPlatform.style.width.length - 2));
    // console.log("widthNewPlatform = " + widthNewPlatform);
    // console.log("heightGrowingPlatform = " + heightGrowingPlatform);
    if (heightGrowingPlatform >= distance && heightGrowingPlatform <= distance + widthNewPlatform) {
        // console.log("you win");
        // птичка поднимается
        window.setTimeout(() => {
            bird.style.transform = "translate(0, -24px)";
            bird.style.transition = "transform 0.5s linear";
        }, 1000);
        // птичка бежит по вырастающей платформе (в конец новой платформы)
        window.setTimeout(() => {
            distanceForBird = Number(distance) + Number(widthNewPlatform);
            // console.log("distanceForBird = " + distanceForBird);
            bird.style.transform = "translate(" + distanceForBird + "px, -24px)";
            bird.style.transition = "transform 1s linear";
            run();
        }, 1500);
        // птичка опускается на новую платформу
        window.setTimeout(() => {
            stopRun();
            growingPlatform.style.opacity = "0";
            // let distanceForBird = Number(distance) + Number(widthNewPlatform);
            bird.style.transform = "translate(" + distanceForBird + "px, 0)";
            bird.style.transition = "transform 0.5s linear";
        }, 2500);
        // убираем вырастающую платформу
        window.setTimeout(() => {
            growingPlatform.style.height = "0";
            growingPlatform.style.transform = "rotate(0deg)";
            growingPlatform.style.opacity = "1";
            growingPlatform.style.left = (widthNewPlatform - 25) + "px";
            heightGrowingPlatform = 0;
            calcScore();
            shift();
        }, 3000);
    }
    else {
        // console.log("you lose");
        // птичка поднимается
        window.setTimeout(() => {
            bird.style.transform = "translate(0, -24px)";
            bird.style.transition = "transform 0.5s linear";
        }, 1000);
        // птичка бежит по вырастающей платформе
        window.setTimeout(() => {
            bird.style.transform = "translate(" + (heightGrowingPlatform + widthBird) + "px, -24px)";
            bird.style.transition = "transform 1s linear";
            run();
        }, 1500);
        // птичка падает
        window.setTimeout(() => {
            stopRun();
            bird.style.transform = "translate(" + (heightGrowingPlatform + widthBird) + "px, 100px)";
            bird.style.transition = "transform 0.3s ease-in";
        }, 2500);
        // начинаем все заново
        window.setTimeout(() => {
            bird.style.transform = "translate(0, 0)";
            bird.style.transition = "transform 0.1s linear";
            growingPlatform.style.height = "0";
            growingPlatform.style.transform = "rotate(0deg)";
            heightGrowingPlatform = 0;
            counterLifes--;
            switch (counterLifes) {
                case 3:
                    lifes.style.width = "120px";
                    break;
                case 2:
                    lifes.style.width = "80px";
                    break;
                case 1:
                    lifes.style.width = "40px";
                    break;
                default:
                    alert("You lose");
                    allRecords.push(counterScore);
                    // console.log("counterScore " + counterScore);
                    // console.log("allRecords.length " + allRecords.length);
                    // console.log("allRecords[0] " + allRecords[0]);
                    record.innerHTML = getMaxOfArray(allRecords);
                    score.innerHTML = "0";
                    counterLifes = 3;
                    lifes.style.width = "120px";
                    counterCalcScore = 0;
                    counterScore = 0;
            }
            body.onmousedown = grow;
            body.onmouseup = stopGrow;
        }, 2800);
    }
}

function shift() {
    platform.style.width = widthNewPlatform + "px";
    distance = Number(newPlatform.style.marginLeft.slice(0, newPlatform.style.marginLeft.length - 2));
    platform.style.opacity = "0";
    platform.style.transition = "opacity 0s linear";

    var widthOldPlatform = Number(getComputedStyle(platform).width.slice(0, getComputedStyle(platform).width.length - 2));
    // console.log("widthOldPlatform: " + widthOldPlatform);
    // console.log("distance: " + distance);
    // console.log("distance + widthOldPlatform: " + (distance + widthOldPlatform));
    let temp = distance + widthOldPlatform;
    newPlatform.style.transform = "translate(-" + temp + "px, 0)";
    newPlatform.style.transition = "transform 1s linear";


    bird.style.transform = "translate(0, 0)";
    bird.style.transition = "transform 1s linear";

    window.setTimeout(() => {

        platform.style.visibility = "visible";
        platform.style.opacity = "1";
        platform.style.transition = "transform 0s linear";

        newPlatform.style.opacity = "0";
        newPlatform.style.transition = "opacity 0s linear";

    }, 1000);
    window.setTimeout(() => {
        newPlatform.style.visibility = "hidden";
        renderNewPlatform();
    }, 1500);
}

function renderNewPlatform() {
    newPlatform.style.width = rand(widthBird, 280) + "px";
    newPlatform.style.marginLeft = rand(widthBird, 550) + "px";
    newPlatform.style.transform = "translate(0,0)";
    newPlatform.style.transition = "transform 1s linear";
    window.setTimeout(() => {
        newPlatform.style.transition = "opacity 0.5s linear";
        newPlatform.style.opacity = "1";
        newPlatform.style.visibility = "visible";
        body.onmousedown = grow;
        body.onmouseup = stopGrow;
    }, 250);
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function run() {
    let counter = 0;
    bird.style.backgroundImage = "url(./images/run.png)";
    timerId2 = window.setInterval(() => {
        bird.style.backgroundPosition = backgroundPosition[counter];
        counter++;
        if (counter > 6) {
            counter = 0;
        }
    }, 190);
}

function stopRun() {
    bird.style.backgroundImage = "";
    bird.style.backgroundPosition = "";
    window.clearInterval(timerId2);
}

function calcScore() {
    counterCalcScore++;
    if (counterCalcScore >= 1 && counterCalcScore <= 20) {
        counterScore += 10;
    }
    else if (counterCalcScore >= 21 && counterCalcScore <= 40) {
        counterScore += 15;
    }
    else if (counterCalcScore >= 41 && counterCalcScore <= 60) {
        counterScore += 20;
    }
    else if (counterCalcScore >= 61 && counterCalcScore <= 80) {
        counterScore += 30;
    }
    else if (counterCalcScore >= 81 && counterCalcScore <= 100) {
        counterScore += 40;
    }
    else {
        counterScore += 50;
    }
    score.innerHTML = counterScore;
}

function getMaxOfArray(list) {
    return list.reduce((a, b) => a > b ? a : b);
}
