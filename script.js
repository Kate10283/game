var grovingPlatform = document.querySelector(".groving-platform");
var body = document.body;

body.onmousedown = grow;
body.onmouseup = stopGrow;

function grow() {
    timerId = window.setInterval(() => {
        if (!grovingPlatform.style.height) {
            grovingPlatform.style.height = "1vh";
        }
        else if (grovingPlatform.style.height.length <= 3) {
            let height = grovingPlatform.style.height.slice(0, 1);
            grovingPlatform.style.height = Number(height) + 1 + "vh";
        }
        else {
            let height = grovingPlatform.style.height.slice(0, 2);
            grovingPlatform.style.height = Number(height) + 1 + "vh";
        }
    }, 20);   
}

function stopGrow() {
    window.clearInterval(timerId);
    fallDown();
}

function fallDown() {
    grovingPlatform.style.transform = "rotate(90deg)";
    run();
}

function run() {

}