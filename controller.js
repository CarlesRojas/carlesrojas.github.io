/* --- WINDOW EVENTS --- */

window.onresize = function () {
    Resize("gif-box", "gif-container", true);
    Resize("screenshots", "screenshots-container", false);
}
window.onload = function () {
    Resize("gif-box", "gif-container", true);
    Resize("screenshots", "screenshots-container", false);
}
window.onclick = function (event) {
    if (sidebarIsOpen && !event.target.classList.contains('menu-btn') && !event.target.classList.contains('sidebar') && !event.target.classList.contains('main-nav-btn') && !event.target.classList.contains('sub-nav-btn'))
        Sidebar();
}
window.onscroll = function () {
    if (sidebarIsOpen) Sidebar();
}




/* --- LINK --- */
function GoTo(destination) {
    if (destination == 'software')
        window.location.href = "software.html";

    else if (destination == 'design')
        window.location.href = "design.html";

    else if (destination == 'carlesrojas')
        window.location.href = "carlesrojas.html";
}




/* --- SIDEBAR --- */
// Movement speed, lower is faster
var sidebarSpeed = 20;

// Pixels per step
var sidebarStep = 25;

// Ammount moved (stop moving when it reaches 100)
var sidebarAmmountMoved = 0;

// If something is already moving don't allow new moves
var sidebarMoving = false;

// Open or close?
var sidebarIsOpen = false;

// Toggles the sidebar (asuming sidebar size = 275px)
function Sidebar() {
    if (sidebarMoving) return;
    sidebarAmmountMoved = 0;
    sidebarMoving = true;
    MoveSidebar();
}

function MoveSidebar() {
    var animator = setTimeout('MoveSidebar()', sidebarSpeed);
    // If not finished moving
    if (sidebarAmmountMoved != 300) {
        sidebarAmmountMoved += sidebarStep;

        // For each element move step% right
        var sidebar = document.getElementById('sidebar');
        var currLeft = parseInt(sidebar.style.left.slice(0, -2));

        if (!sidebarIsOpen) currLeft += sidebarStep;
        else currLeft -= sidebarStep;

        sidebar.style.left = currLeft.toString() + "px";
    }
    else {
        sidebarMoving = false;
        sidebarIsOpen = !sidebarIsOpen;
        if (!sidebarIsOpen) ToggleDropdownFor('all');
        clearTimeout(animator);
    }
}







/* --- DROPDOWNS --- */

// Opens or closes the dropdowns
function ToggleDropdownFor(elemID) {
    // Close other dropdowns
    var dropdowns = document.getElementsByClassName("drop-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var curr = dropdowns[i];
        if (curr.classList.contains('open') && curr.id != elemID)
            curr.classList.remove('open');
    }

    // Toggle Dropdown
    if (elemID != "all")
        document.getElementById(elemID).classList.toggle("open");
}






/* --- AUTOSCROLL --- */

// To Scroll to a certain element in the page
var scrollY = 0;
var distance = 500;
var speedAS = 20;
var scrollUp = true;
function ScrollTo(elemID) {
    var currentY = window.pageYOffset;
    var targetY = document.getElementById(elemID).offsetTop;

    // Scroll down or up
    if (currentY > targetY) scrollUp = true;
    else scrollUp = false;

    var animator = setTimeout('ScrollTo(\'' + elemID + '\')', speedAS);

    // Scroll if you are still not there
    if (scrollUp) {
        if (currentY > targetY + distance) {
            scrollY = currentY - distance;
            window.scroll(0, scrollY);
        }
        else {
            clearTimeout(animator);
            window.scroll(0, targetY);
        }
    }
    else {
        if (currentY < targetY - distance) {
            scrollY = currentY + distance;
            window.scroll(0, scrollY);
        }
        else {
            clearTimeout(animator);
            window.scroll(0, targetY);
        }
    }
}





/* --- AUTO RESIZE VIDEO / GIF / IMG --- */

// Resizes to fit the screen perfectly
function Resize(targetBox, targetContainer, adjustSides){
    // Size of the window
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // Desired size of the div element
    var targetWidth = width;
    var targetHeight = (9.0 * targetWidth) / 16.0;
    var targetLeft = 0;

    // If height is bigger than 70% ajust to it
    if (targetHeight > height * 0.7) {
        targetHeight = height * 0.7;
        if (adjustSides) {
            targetWidth = (16.0 * targetHeight) / 9.0;
            targetLeft = (width - targetWidth) / 2.0;
        }
    }

    // Get all videos
    var videos = document.getElementsByClassName(targetBox);
    var i;
    for (i = 0; i < videos.length; i++) {
        var currVideo = videos[i];
        currVideo.style.width = targetWidth.toString() + "px";
        currVideo.style.height = targetHeight.toString() + "px";
        currVideo.style.left = targetLeft.toString() + "px";
    }

    // Get all containers
    var conts = document.getElementsByClassName(targetContainer);
    var j;
    for (j = 0; j < conts.length; j++) {
        var currCont = conts[j];
        currCont.style.height = targetHeight.toString() + "px";
    }
}





/* --- SCREENSHOTS --- */

// Movement speed, lower is faster
var ssSpeed = 20;

// Percentage per step
var ssStep = 10;

// Ammount moved (stop moving when it reaches 100)
var ssAmmountMoved = 0;

// Direction of the movement
var movingRight = true;

// Elements that are being moved
var movingElements;

// If something is already moving don't allow new moves
var scrolling = false;

// Save last button clicked and ids
var idLeftSaved = "";
var idRightSaved = "";

// Where does the left value start
var baseLeftSaved = 0;

// idClicked = true when right button was cliked
function ArrowClick(idLeft, idRight, idClicked, baseLeft) {
    if (scrolling) return;

    idLeftSaved = idLeft;
    idRightSaved = idRight;
    baseLeftSaved = baseLeft;
    
    // TrickShots
    if (!idClicked && idLeft == 'trickshots-left-arrow') {
        scrolling = true;
        movingRight = false;
        ssAmmountMoved = 0;
        movingElements = document.getElementsByClassName("trickshots-ss-img");
        MoveHorizontalImage();
        return;
    }
    if (idClicked && idRight == 'trickshots-right-arrow') {
        scrolling = true;
        movingRight = true;
        ssAmmountMoved = 0;
        movingElements = document.getElementsByClassName("trickshots-ss-img");
        MoveHorizontalImage();
        return;
    }

    // HoloChess
    if (!idClicked && idLeft == 'holochess-left-arrow') {
        scrolling = true;
        movingRight = false;
        ssAmmountMoved = 0;
        movingElements = document.getElementsByClassName("holochess-ss-img");
        MoveHorizontalImage();
        return;
    }
    if (idClicked && idRight == 'holochess-right-arrow') {
        scrolling = true;
        movingRight = true;
        ssAmmountMoved = 0;
        movingElements = document.getElementsByClassName("holochess-ss-img");
        MoveHorizontalImage();
        return;
    }

    // Cubic3D
    if (!idClicked && idLeft == 'cubic3d-left-arrow') {
        scrolling = true;
        movingRight = false;
        ssAmmountMoved = 0;
        movingElements = document.getElementsByClassName("cubic3d-ss-img");
        MoveHorizontalImage();
        return;
    }
    if (idClicked && idRight == 'cubic3d-right-arrow') {
        scrolling = true;
        movingRight = true;
        ssAmmountMoved = 0;
        movingElements = document.getElementsByClassName("cubic3d-ss-img");
        MoveHorizontalImage();
        return;
    }
    
    // Infinity Gallery
    if (!idClicked && idLeft == 'infinitygallery-left-arrow') {
        scrolling = true;
        movingRight = false;
        ssAmmountMoved = 0;
        movingElements = document.getElementsByClassName("infinitygallery-ss-img");
        MoveHorizontalImage();
        return;
    }
    if (idClicked && idRight == 'infinitygallery-right-arrow') {
        scrolling = true;
        movingRight = true;
        ssAmmountMoved = 0;
        movingElements = document.getElementsByClassName("infinitygallery-ss-img");
        MoveHorizontalImage();
        return;
    }
    
    // Gwood
    if (!idClicked && idLeft == 'gwood-left-arrow') {
        scrolling = true;
        movingRight = false;
        ssAmmountMoved = 0;
        movingElements = document.getElementsByClassName("gwood-ss-img");
        MoveHorizontalImage();
        return;
    }
    if (idClicked && idRight == 'gwood-right-arrow') {
        scrolling = true;
        movingRight = true;
        ssAmmountMoved = 0;
        movingElements = document.getElementsByClassName("gwood-ss-img");
        MoveHorizontalImage();
        return;
    }
}

// Moves elements 100% left or right
function MoveHorizontalImage() {
    var animator = setTimeout('MoveHorizontalImage()', ssSpeed);

    // If not finished moving
    if (ssAmmountMoved != 100) {
        ssAmmountMoved += ssStep;

        // For each element move step% right
        var i;
        for (i = 0; i < movingElements.length; i++) {
            var curr = movingElements[i];
            var currLeft = parseInt(curr.style.left.slice(0, -1));

            if (movingRight) currLeft -= ssStep;
            else currLeft += ssStep;

            curr.style.left = currLeft.toString() + "%";
        }
    }
    else {
        ShowHideArrows();

        // Stop scrolling
        scrolling = false;
        clearTimeout(animator);
    }
}

// Checks if arrows showld be displayed
function ShowHideArrows() {
    var showLeft = false;
    var showRight = false;
    var i;
    for (i = 0; i < movingElements.length && (!showLeft || !showRight); i++) {
        var curr = movingElements[i];
        var currLeft = parseInt(curr.style.left.slice(0, -1));
        if (currLeft < baseLeftSaved) showLeft = true;
        if (currLeft > baseLeftSaved) showRight = true;
    }

    if (showLeft) document.getElementById(idLeftSaved).style.display = "block";
    else document.getElementById(idLeftSaved).style.display = "none";

    if (showRight) document.getElementById(idRightSaved).style.display = "block";
    else document.getElementById(idRightSaved).style.display = "none";
}

