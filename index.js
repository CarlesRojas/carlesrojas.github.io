/* --- WINDOW EVENTS --- */

window.onload = function () {
    Slide();
}




/* --- SLIDE --- */

// Movement speed, lower is faster
var speed = 20;

// Percentage per step
var step = 10;

// Ammount moved (stop moving when it reaches 100)
var ammountMoved = 0;

// Elements that are being moved
var movingElements;

// Time between slides in miliseconds
var frequency = 5000; 

// Interval
var interval = 0;

// Slide in 'frequency' seconds
function Slide() {
    movingElements = document.getElementsByClassName("slide-img");
    interval = setInterval(MoveHorizontalImage, frequency);
}

// Moves elements 100% left or right
function MoveHorizontalImage() {
    var animator = setTimeout('MoveHorizontalImage()', speed);

    // If not finished moving
    if (ammountMoved != 100) {
        ammountMoved += step;

        // For each element move step% right
        var i;
        for (i = 0; i < movingElements.length; i++) {
            var curr = movingElements[i];
            var currLeft = parseInt(curr.style.left.slice(0, -1));
            currLeft -= step;
            curr.style.left = currLeft.toString() + "%";
        }
    }

    // Stop scrolling
    else {
        ammountMoved = 0;
        MoveFirstImgToLast();
        clearTimeout(animator);
    }
}

// Moves the first image to last position
function MoveFirstImgToLast(){
    var i;
    for (i = 0; i < movingElements.length; i++) {
        var curr = movingElements[i];
        var currLeft = parseInt(curr.style.left.slice(0, -1));
        if (currLeft == -100)
            curr.style.left = ((movingElements.length - 1) * 100).toString() + "%";
    }
}