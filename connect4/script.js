$(document).ready(function () {
    var board = [ //[rows][columns]
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];

    var color = 1;
    var flag;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var dropTo = 6;
    blueCanvas(0, 500, 71, 500);
    slots(0, 7, 6); //creates the white slots, 7 across, 6 down
    doItAllAgain();

    function blueCanvas(x1, x2, y1, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1, y2);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x2, y1);
        ctx.lineTo(x1, y1);
        ctx.fillStyle = "#00004d";
        ctx.fill();
    }

    function slots(columnStart, columnStop) { //columnStop is left in because the beginning of the board draw requires it 
        for (var i = columnStart; i < columnStop; i++) { //for every drop, it is only running this loop once
            for (var j = 0; j < dropTo; j++) {
                ctx.beginPath();
                ctx.arc(36 + i * 71, 107 + j * 71, 29, 0, 2 * Math.PI);
                ctx.strokeStyle = "#fff";
                ctx.fillStyle = "#fff";
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    function clearTop(topStart, topStop) {
        ctx.beginPath();
        ctx.moveTo(topStart, 0);
        ctx.lineTo(topStart, 70);
        ctx.lineTo(topStop, 70);
        ctx.lineTo(topStop, 0);
        ctx.lineTo(topStart, 0);
        ctx.strokeStyle = "#fff";
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.stroke();
    }

    function top(x, y, r) {
        var y2 = 71;
        var startingAngle;
        var endingAngle;
        if ((Math.abs(y2 - y)) >= 29) {
            startingAngle = 0;
            endingAngle = 2 * Math.PI;
        } else {
            var changeInX = Math.sqrt((r * r) - ((y2 - y) * (y2 - y)));
            startingAngle = Math.atan((y2 - y) / (changeInX));
            endingAngle = Math.PI - startingAngle;
        }
        ctx.beginPath();
        ctx.arc(x, y, r, startingAngle, endingAngle, true);
        if (color - 1) {
            ctx.strokeStyle = "#f00";
            ctx.fillStyle = "#f00";
        } else {
            ctx.strokeStyle = "#e6e600";
            ctx.fillStyle = "#e6e600";
        }
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    function slowdrop(yCoordAndTimer, x) {
        setTimeout(function () {
            var colStart = (x - 36) / 71; //ok to access array with colStart...0 based
            var colStop = colStart + 1;
            slots(colStart, colStop); //clears slots while dropping
            if (yCoordAndTimer < 103) { //clears top while dropping
                var clrTopStart = x - 36;
                var clrTopStop = x + 36;
                clearTop(clrTopStart, clrTopStop);
            }

            if (yCoordAndTimer < 100) {
                top(x, yCoordAndTimer, 29);
            }
            for (var k = 0; k < dropTo + 1; k++) {
                behindBlueDrop(x, k, yCoordAndTimer);
            }
        }, 2.5 * (yCoordAndTimer - 30));
    }

    function behindBlueDrop(x, checkAllSix, movingY) {
        if (Math.abs((36 + checkAllSix * 71) - movingY) < 59) {
            partial(x, movingY, 36 + checkAllSix * 71, 29);
        }
        if (movingY >= (dropTo * 71) + 35) {
            doItAllAgain();
        }
    }

    function partial(x, y1, y2, r) {
        var yp = (y2 + y1) / 2;
        var xp = x + (Math.sqrt((r * r) - ((y2 - y1) / 2) * ((y2 - y1) / 2)));
        var direction;
        if (xp == x) {
            return;
        }
        var startingAngle1 = Math.atan((yp - y1) / (xp - x));
        var endingAngle1 = (Math.PI) - startingAngle1;
        var endingAngle2 = 0 - startingAngle1;
        var startingAngle2 = (Math.PI) - endingAngle2;
        if (y1 < y2) {
            direction = false;
        } else {
            direction = true;
        }
        ctx.beginPath();
        ctx.arc(x, y1, r, startingAngle1, endingAngle1, direction);
        ctx.arc(x, y2, r, startingAngle2, endingAngle2, direction);
        if (color - 1) {
            ctx.strokeStyle = "#f00";
            ctx.fillStyle = "#f00";
        } else {
            ctx.strokeStyle = "#e6e600";
            ctx.fillStyle = "#e6e600";
        }
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    function chipBeforeFall(xTop) {
        ctx.beginPath();
        ctx.arc(xTop, 30, 29, 0, 2 * Math.PI);
        if (!(color - 1)) {
            ctx.strokeStyle = "#f00";
            ctx.fillStyle = "#f00";
        } else {
            ctx.strokeStyle = "#e6e600";
            ctx.fillStyle = "#e6e600";
        }
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    function changeColor() {
        color *= -1;
    }

    function doItAllAgain() {
        if (checkForWin()) {
            var winner;
            if (color == 1) {
                winner = "yellow";
            } else
                winner = "red";
            $('#one').text("Game over, " + winner + " wins!");
            doYouWantToPlayAgain();
        } else if (catsGame()) {
            $('#one').text("Cats game!");
            doYouWantToPlayAgain();

        } else {
            flag = 0;
            chipBeforeFall(250); //chip starts in the middle
            moveChipSideToSide();
        }
    }

    function doYouWantToPlayAgain() {
        $("#two").html('<button class=\"playAgain\">Play again?</button>');
        $("#two").click(function () {
            window.history.go(0);
        })
    }

    function catsGame() {
        if (board[0][0] && board[0][1] && board[0][2] & board[0][3] && board[0][4] && board[0][5] && board[0][6]) { //check to see if there is a chip in all of the slots of the top row
            return true;
        } else {
            return false;
        }
    }

    function checkForWin() {
        var gameOver = false;
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == color && board[i][j + 1] == color && board[i][j + 2] == color && board[i][j + 3] == color) { //check for win horizontally
                    gameOver = true;
                }
            }
        }
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 7; j++) {
                if (board[i][j] == color && board[i + 1][j] == color && board[i + 2][j] == color && board[i + 3][j] == color) { //check for win vertically
                    gameOver = true;
                }
            }
        }
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == color && board[i + 1][j + 1] == color && board[i + 2][j + 2] == color && board[i + 3][j + 3] == color) { //check for win 135 degrees diagonally
                    gameOver = true;
                }
            }
        }
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j + 3] == color && board[i + 1][j + 2] == color && board[i + 2][j + 1] == color && board[i + 3][j + 0] == color) { //check for win 45 degrees diagonally
                    gameOver = true;
                }
            }
        }
        if (gameOver) {
            return true;
        } else {
            return false;
        }
    }

    function moveChipSideways() {
        var x = event.pageX;
        if (x > 29 && x < 470 && flag == 0) {
            clearTop(0, 500);
            chipBeforeFall(x);
        }
    }

    function startMovingChip() {
        var x = event.pageX;
        var y = event.pageY;
        if (x > 221 && x < 279 && y > 0 && y < 59 && flag == 0) { //check if click is on the chip in the middle. if it is clicked, movement is triggered
            c.addEventListener("mousemove", moveChipSideways);
        }
    }

    function mouseUp() {
        c.removeEventListener("mousemove", moveChipSideways);
        c.removeEventListener("mousedown", startMovingChip);
        c.removeEventListener("mouseup", mouseUp);
        changeColor();
        clearTop(0, 500); //made sure there are no ghosts left up top.
        var x = event.pageX;
        flag = 1;
        var track = Math.round((x - 36) / 71); //track = which column to drop the chip into
        if (track < 0) {
            track = 0;
        }
        if (board[0][track] == 0) { //only drop if the first slot is unoccupied
            for (var j = 1; j < 6; j++) { //keep track of the board array...update and check how far we are dropping
                if (board[j][track] != 0) {
                    board[j - 1][track] = color;
                    dropTo = j;
                    j = 10;
                } else if (j == 5) {
                    board[5][track] = color;
                    dropTo = 6;
                }
            }

            // $('#one').text('color: ' + color);
            track = 36 + (track * 71);
            for (var i = 30; i < (dropTo * 71) + 36; i++) { //(dropTo*71)+36
                slowdrop(i, track);
            }
        } else {
            changeColor();
            doItAllAgain();
        }
    }

    function moveChipSideToSide() {
        //flag = 0;
        c.addEventListener("mousedown", startMovingChip);
        c.addEventListener("mouseup", mouseUp);
    }
})