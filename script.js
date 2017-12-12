'use strict';
var model = {
    mapWidth: screen.width,
    mapHeight: screen.height-100,
    pixelSize: 2,
    positionXPlayer1: 200,
    positionYPlayer1: ((screen.height - 100) / 2),
    positionXPlayer2: (screen.width - 200),
    positionYPlayer2: ((screen.height - 100) / 2),
    directionPlayer1: 4,
    directionPlayer2: 2,
	lastDirectionPlayer1: 4,
	lastDirectionPlayer2: 2,
	gameSpeed: 10
    
};

var view = {
    displayMap: function () {
        var canvas = document.getElementById("canvas-game-map");
        canvas.width = model.mapWidth;
        canvas.height = model.mapHeight;
    },
    displayPlayer1: function () {
        var canvasContext = document.getElementById("canvas-game-map").getContext('2d');
        canvasContext.fillStyle = 'rgb(' + [255, 1, 1].join() + ')';
        canvasContext.fillRect(model.positionXPlayer1, model.positionYPlayer1, model.pixelSize, model.pixelSize);
    },
    displayPlayer2: function () {
        var canvasContext = document.getElementById("canvas-game-map").getContext('2d');
        canvasContext.fillStyle = 'rgb(' + [1, 1, 255].join() + ')';
        canvasContext.fillRect(model.positionXPlayer2, model.positionYPlayer2, model.pixelSize, model.pixelSize);
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
						model.lastDirectionPlayer1 = 1;
        } else if (model.directionPlayer1 === 2) {
            model.positionXPlayer1 -= model.pixelSize;
						model.lastDirectionPlayer1 = 2;
        } else if (model.directionPlayer1 === 3) {
            model.positionYPlayer1 += model.pixelSize;
						model.lastDirectionPlayer1 = 3;
        } else if (model.directionPlayer1 === 4) {
            model.positionXPlayer1 += model.pixelSize;
						model.lastDirectionPlayer1 = 4;
        }
    },
    updateTheGamePlayer2: function () {
        if (model.directionPlayer2 === 1) {
            model.positionYPlayer2 -= model.pixelSize;
						model.lastDirectionPlayer2 = 1;
        } else if (model.directionPlayer2 === 2) {
            model.positionXPlayer2 -= model.pixelSize;
						model.lastDirectionPlayer2 = 2;
        } else if (model.directionPlayer2 === 3) {
            model.positionYPlayer2 += model.pixelSize;
						model.lastDirectionPlayer2 = 3;
        } else if (model.directionPlayer2 === 4) {
            model.positionXPlayer2 += model.pixelSize;
						model.lastDirectionPlayer2 = 4;
        }
    },
    collisionPlayer1: function () {
        // PLAYER1 OUT OF MAP RANGE
        if (model.positionYPlayer1 < 0 || model.positionYPlayer1 > model.mapHeight || model.positionXPlayer1 < 0 || model.positionXPlayer1 > model.mapWidth) {

            return true;
        }
        // GETS COLOR OF ACTUAL PIXEL BEFORE view.displayPlayer1 COLORS THE PIXEL
        var canvasContext = document.getElementById("canvas-game-map").getContext('2d');
        var getColorData = canvasContext.getImageData(model.positionXPlayer1, model.positionYPlayer1, 1, 1).data;
        //PLAYER1 ON THE COLOR OF PLAYER2
        return getColorData[0] !== 0;

    },
    collisionPlayer2: function () {
        // PLAYER2 OUT OF MAP RANGE
        if (model.positionYPlayer2 < 0 || model.positionYPlayer2 > model.mapHeight || model.positionXPlayer2 < 0 || model.positionXPlayer2 > model.mapWidth) {

            return true;
        }
        // GETS COLOR OF ACTUAL PIXEL BEFORE view.displayPlayer2 COLORS THE PIXEL
        var canvasContext = document.getElementById("canvas-game-map").getContext('2d');
        var getColorData = canvasContext.getImageData(model.positionXPlayer2, model.positionYPlayer2, 1, 1).data;

        return getColorData[0] !== 0;
    },
  
     getKey: function() {

    window.addEventListener("keydown", function (event) {
        var key = event.keyCode;
        // KEY UP - "W" - PLAYER 1
        if (event.keyCode === 87 && model.directionPlayer1 !== 3 && model.lastDirectionPlayer1 !== 3) {
            model.directionPlayer1 = 1;
        // KEY LEFT - "A" - PLAYER 1 
        } else if (event.keyCode === 65 && model.directionPlayer1 !== 4 && model.lastDirectionPlayer1 !== 4) {
            model.directionPlayer1 = 2;
        // KEY DOWN - "S" - PLAYER 1 
        } else if (event.keyCode === 83 && model.directionPlayer1 !== 1 && model.lastDirectionPlayer1 !== 1) {
            model.directionPlayer1 = 3;
        // KEY RIGHT - "D" - PLAYER 1 
        } else if (event.keyCode === 68 && model.directionPlayer1 !== 2 && model.lastDirectionPlayer1 !== 2) {
            model.directionPlayer1 = 4;
        // KEY UP - "UP" - PLAYER 2
        } else if (event.keyCode === 38 && model.directionPlayer2 !== 3 && model.lastDirectionPlayer2 !== 3) {
            model.directionPlayer2 = 1;
        // KEY LEFT - "LEFT" - PLAYER 2
        } else if (event.keyCode === 37 && model.directionPlayer2 !== 4 && model.lastDirectionPlayer2 !== 4) {
            model.directionPlayer2 = 2;
        // KEY DOWN - "DOWN" - PLAYER 2 
        } else if (event.keyCode === 40 && model.directionPlayer2 !== 1 && model.lastDirectionPlayer2 !== 1) {
            model.directionPlayer2 = 3;
        // KEY RIGHT - "RIGHT" - PLAYER 2 
        } else if (event.keyCode === 39 && model.directionPlayer2 !== 2 && model.lastDirectionPlayer2 !== 2) {
            model.directionPlayer2 = 4;
        }  
    });
}
    
};

function gameLoop() {
    var isPlayer1Crushed = controller.collisionPlayer1();
   	var isPlayer2Crushed = controller.collisionPlayer2();
    if (isPlayer1Crushed && isPlayer2Crushed) {
        view.displayMessage("DRAW");
        return false;
    }
    if (isPlayer1Crushed || isPlayer2Crushed) {
        if (isPlayer1Crushed) {
            view.displayMessage("PLAYER 2 WINS");
        } else if (isPlayer2Crushed) {
            view.displayMessage("PLAYER 1 WINS");
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
	document.getElementById("navigation").className += " hide-element";
    //var gameSpeed = 20;
//prompt("Give me the speed:");
   // requestAnimationFrame(gameLoop);
	setInterval(gameLoop, model.gameSpeed);
}

function loadMenu() {
	
	document.getElementById("new-game").addEventListener("click", function () {
		newGame();
	});
	
	document.getElementById("difficulty").addEventListener("click", function () {
		document.getElementById("difficulty-navigation").classList.toggle("hide-element");
	});
	
	document.getElementById("easy").addEventListener("click", function () {
		model.gameSpeed = 15;
		document.getElementById("difficulty-navigation").classList.toggle("hide-element");
	});
	document.getElementById("normal").addEventListener("click", function () {
		model.gameSpeed = 7;
		document.getElementById("difficulty-navigation").classList.toggle("hide-element");
	});
	document.getElementById("hard").addEventListener("click", function () {
		model.gameSpeed = 3;
		document.getElementById("difficulty-navigation").classList.toggle("hide-element");
	});
}

window.onload = function() {
	view.displayMap();
	loadMenu();
};
