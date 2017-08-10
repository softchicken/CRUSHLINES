'use strict';
var model = {
    mapWidth: 1500,
    mapHeight: 900,
    pixelSize: 2,
    positionXPlayer1: 200,
    positionYPlayer1: (900) / 2,
    positionXPlayer2: (1500 - 2 - 200),
    positionYPlayer2: (900) / 2,
    directionPlayer1: 4,
    directionPlayer2: 2,
    collision: false,
    playerWins: 0
    
};

var view = {
    displayMap: function () {
        var canvas = document.getElementById("c");
        canvas.width = model.mapWidth;
        canvas.height = model.mapHeight;
    },
    displayPlayer1: function () {
        var ctx = document.getElementById("c").getContext('2d');
        ctx.fillStyle = 'rgb(' + [255, 1, 1].join() + ')';
        ctx.fillRect(model.positionXPlayer1, model.positionYPlayer1, model.pixelSize, model.pixelSize);
    },
    displayPlayer2: function () {
        var ctx = document.getElementById("c").getContext('2d');
        ctx.fillStyle = 'rgb(' + [1, 1, 255].join() + ')';
        ctx.fillRect(model.positionXPlayer2, model.positionYPlayer2, model.pixelSize, model.pixelSize);
    },
    displayMessage: function(msg) {
        var comment = document.getElementById("p");
        comment.innerHTML = msg;
    }
};

var controller = {
    updateTheGamePlayer1: function () {
        if (model.directionPlayer1 === 1) {
            model.positionYPlayer1 -= model.pixelSize;
        } else if (model.directionPlayer1 === 2) {
            model.positionXPlayer1 -= model.pixelSize;
        } else if (model.directionPlayer1 === 3) {
            model.positionYPlayer1 += model.pixelSize;
        } else if (model.directionPlayer1 === 4) {
            model.positionXPlayer1 += model.pixelSize;
        }
    },
    updateTheGamePlayer2: function () {
        if (model.directionPlayer2 === 1) {
            model.positionYPlayer2 -= model.pixelSize;
        } else if (model.directionPlayer2 === 2) {
            model.positionXPlayer2 -= model.pixelSize;
        } else if (model.directionPlayer2 === 3) {
            model.positionYPlayer2 += model.pixelSize;
        } else if (model.directionPlayer2 === 4) {
            model.positionXPlayer2 += model.pixelSize;
        }
    },
    collisionPlayer1: function () {
        // PLAYER1 OUT OF MAP RANGE
        if (model.positionYPlayer1 < 0 || model.positionYPlayer1 > model.mapHeight || model.positionXPlayer1 < 0 || model.positionXPlayer1 > model.mapWidth) {
            model.collision = true;
            model.playerWins = 1;
            return true;
        }
        // GETS COLOR OF ACTUAL PIXEL BEFORE view.displayPlayer1 COLORS THE PIXEL
        var ctx = document.getElementById("c").getContext('2d');
        var getColorData = ctx.getImageData(model.positionXPlayer1, model.positionYPlayer1, 1, 1).data;
        //PLAYER1 ON THE COLOR OF PLAYER2
        if (getColorData[0] !== 0) {
            model.collision = true;
            model.playerWins = 1;
            return true;
        }
        return false;
    },
    collisionPlayer2: function () {
        // PLAYER2 OUT OF MAP RANGE
        if (model.positionYPlayer2 < 0 || model.positionYPlayer2 > model.mapHeight || model.positionXPlayer2 < 0 || model.positionXPlayer2 > model.mapWidth) {
            model.collision = true;
            model.playerWins = 2;
            return true;
        }
        // GETS COLOR OF ACTUAL PIXEL BEFORE view.displayPlayer2 COLORS THE PIXEL
        var ctx = document.getElementById("c").getContext('2d');
        var getColorData = ctx.getImageData(model.positionXPlayer2, model.positionYPlayer2, 1, 1).data;
        if (getColorData[0] !== 0) {
            model.collision = true;
            model.playerWins = 2;
            return true;
        }
        return false;
    },
    
     getKey: function() {

    window.addEventListener("keydown", function (event) {
        var key = event.keyCode;
        // KEY UP - "W" - PLAYER 1
        if (event.keyCode === 87 && model.directionPlayer1 !== 3) {
            model.directionPlayer1 = 1;
        // KEY LEFT - "A" - PLAYER 1 
        } else if (event.keyCode === 65 && model.directionPlayer1 !== 4) {
            model.directionPlayer1 = 2;
        // KEY DOWN - "S" - PLAYER 1 
        } else if (event.keyCode === 83 && model.directionPlayer1 !== 1) {
            model.directionPlayer1 = 3;
        // KEY RIGHT - "D" - PLAYER 1 
        } else if (event.keyCode === 68 && model.directionPlayer1 !== 2) {
            model.directionPlayer1 = 4;
        // KEY UP - "UP" - PLAYER 2
        } else if (event.keyCode === 38 && model.directionPlayer2 !== 3) {
            model.directionPlayer2 = 1;
        // KEY LEFT - "LEFT" - PLAYER 2
        } else if (event.keyCode === 37 && model.directionPlayer2 !== 4) {
            model.directionPlayer2 = 2;
        // KEY DOWN - "DOWN" - PLAYER 2 
        } else if (event.keyCode === 40 && model.directionPlayer2 !== 1) {
            model.directionPlayer2 = 3;
        // KEY RIGHT - "RIGHT" - PLAYER 2 
        } else if (event.keyCode === 39 && model.directionPlayer2 !== 2) {
            model.directionPlayer2 = 4;
        }  
    });
}
    
};

function gameLoop() {
    controller.collisionPlayer1();
    controller.collisionPlayer2();
    if (controller.collisionPlayer1() && controller.collisionPlayer2()) {
        //alert("REMIS!!");
        view.displayMessage("DRAW");
        return false;
    }
    if (model.collision) {
        if (model.playerWins === 1) {
            //alert("Wygral gracz nr 2");
            view.displayMessage("Wygral gracz nr 2");
        } else if (model.playerWins === 2) {
            //alert("Wygral gracz nr 1");
            view.displayMessage("Wygral gracz nr 1");
        }
        return false;
    }
    view.displayPlayer1();
    view.displayPlayer2();    
    controller.updateTheGamePlayer1();
    controller.updateTheGamePlayer2();
    //requestAnimationFrame(gameLoop);
}

function newGame() {
    controller.getKey();
    gameLoop();
    var gameSpeed = prompt("Give me the speed leszczu :)");
   // requestAnimationFrame(gameLoop);
    setInterval(gameLoop, gameSpeed);
    //model.collision = true;
}
window.onload = view.displayMap;