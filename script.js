"use strict"
var growingPlatform = document.querySelector(".groving-platform");
var newPlatform = document.querySelector(".new-platform");
var platform = document.querySelector(".platform");
var bird = document.querySelector(".bird");
var body = document.body;
var heightGrowingPlatform = 0;
var distance = 0;
var widthNewPlatform = 0;
// расстояние для перехода на следующую платформу
var distanceForBird = 0;
var timerId = 0;

// body.addEventListener("mousedown", grow);
// body.addEventListener("mouseup", stopGrow);

body.onmousedown = grow;
body.onmouseup = stopGrow;

function grow() {
    timerId = window.setInterval(() => {
        if (!growingPlatform.style.height) {
            // console.log("heightGrowingPlatform before 0 " + heightGrowingPlatform);
            growingPlatform.style.height = "10px";
            heightGrowingPlatform = 10;
        }
        else {
            // console.log("heightGrowingPlatform " + heightGrowingPlatform);
            let height = growingPlatform.style.height.slice(0, growingPlatform.style.height.length - 2);
            growingPlatform.style.height = Number(height) + 10 + "px";
            heightGrowingPlatform += 10;
        }
        // console.log("px: " + body.clientHeight * heightGrowingPlatformVH / 100);
    }, 15);
}

function stopGrow() {
    window.clearInterval(timerId);
    body.onmousedown = null;
    body.onmouseup = null;
    fallDown();
}

function fallDown() {
    growingPlatform.style.transform = "rotate(90deg)";
    // переводим падающую платформу из vh в vw
    // heightGrowingPlatform = body.clientHeight * heightGrowingPlatformVH / body.clientWidth;
    // run();
    checkAndRun();
}

// function run() {
//     window.setTimeout(() => {
//         bird.style.transform = "translate(5vw, -1.4vw)";
//         bird.style.transition = "transform 0.5s linear";
//     }, 1000);
//     window.setTimeout(() => {
//         bird.style.transform = "translate(" + heightGrowingPlatformVH + "vh, -1.4vw)";
//         bird.style.transition = "transform 1s linear";
//     }, 1500);
//     check();
// }

function checkAndRun() {
    distance = Number(newPlatform.style.marginLeft.slice(0, newPlatform.style.marginLeft.length - 2));
    console.log("distance (marginLeft) = " + distance);
    widthNewPlatform = Number(newPlatform.style.width.slice(0, newPlatform.style.width.length - 2));
    // console.log("newPlatform = " + newPlatform.style.width);
    console.log("widthNewPlatform = " + widthNewPlatform);
    console.log("heightGrowingPlatform = " + heightGrowingPlatform);
    // bird.style.backgroundImage = "url(/images/run.png)";
    // bird.style.backgroundPosition = "-496px 0";
    // bird.style.backgroundSize = "cover";
    if (heightGrowingPlatform >= distance && heightGrowingPlatform <= distance + widthNewPlatform) {
        console.log("you win");
        // птичка поднимается
        window.setTimeout(() => {
            bird.style.transform = "translate(0, -24px)";
            bird.style.transition = "transform 0.5s linear";
        }, 1000);
        // птичка бежит по вырастающей платформе (в конец новой платформы)
        window.setTimeout(() => {
            distanceForBird = Number(distance) + Number(widthNewPlatform);
            console.log("distanceForBird = " + distanceForBird);
            bird.style.transform = "translate(" + distanceForBird + "px, -24px)";
            bird.style.transition = "transform 1s linear";
        }, 1500);
        // птичка опускается на новую платформу
        window.setTimeout(() => {
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
            shift();
        }, 3000);
    }
    else {
        console.log("you lose");
        // птичка поднимается
        window.setTimeout(() => {
            bird.style.transform = "translate(0, -24px)";
            bird.style.transition = "transform 0.5s linear";
        }, 1000);
        // птичка бежит по вырастающей платформе
        window.setTimeout(() => {
            bird.style.transform = "translate(" + (heightGrowingPlatform + 100) + "px, -24px)";
            bird.style.transition = "transform 1s linear";
        }, 1500);
        // птичка падает
        window.setTimeout(() => {
            bird.style.transform = "translate(" + (heightGrowingPlatform + 100) + "px, 100px)";
            bird.style.transition = "transform 0.3s ease-in";
        }, 2500);
        // начинаем все заново
        window.setTimeout(() => {
            bird.style.transform = "translate(0, 0)";
            bird.style.transition = "transform 0.1s linear";
            growingPlatform.style.height = "0";
            growingPlatform.style.transform = "rotate(0deg)";
            heightGrowingPlatform = 0;
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
    console.log("widthOldPlatform: " + widthOldPlatform);
    console.log("distance: " + distance);
    console.log("distance + widthOldPlatform: " + (distance + widthOldPlatform));
    let temp = distance + widthOldPlatform;
    // let temp = 830;
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
    newPlatform.style.width = rand(100, 280) + "px";
    newPlatform.style.marginLeft = rand(100, 550) + "px";
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