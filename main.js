// game board dimensions
const boardWidth = 400;
const boardHeight = 400;

// create the game board
const gameBoard = document.getElementById("game-board");
gameBoard.style.width = `${boardWidth}px`;
gameBoard.style.height = `${boardHeight}px`;

// create the snake
const snake = [];
snake[0] = document.createElement("div");
snake[0].classList.add("snake");
snake[0].style.left = "0px";
snake[0].style.top = "0px";
gameBoard.appendChild(snake[0]);

// create the food
const food = document.createElement("div");
food.classList.add("food");
food.style.left = `${Math.floor(Math.random() * boardWidth / 20) * 20}px`;
food.style.top = `${Math.floor(Math.random() * boardHeight / 20) * 20}px`;
gameBoard.appendChild(food);

// snake movement
let xPosition = 0;
let yPosition = 0;
let previousXPosition = 0;
let previousYPosition = 0;
let foodEaten = false;
document.addEventListener("keydown", function(event) {
	switch (event.key) {
		case "ArrowUp":
			if (previousYPosition !== 20) {
				yPosition -= 20;
			}
			break;
		case "ArrowDown":
			if (previousYPosition !== -20) {
				yPosition += 20;
			}
			break;
		case "ArrowLeft":
			if (previousXPosition !== 20) {
				xPosition -= 20;
			}
			break;
		case "ArrowRight":
			if (previousXPosition !== -20) {
				xPosition += 20;
			}
			break;
	}
	if (xPosition === parseInt(food.style.left) && yPosition === parseInt(food.style.top)) {
		// if the snake eats the food
		foodEaten = true;
		food.style.left = `${Math.floor(Math.random() * boardWidth / 20) * 20}px`;
		food.style.top = `${Math.floor(Math.random() * boardHeight / 20) * 20}px`;
	}
	if (!foodEaten) {
		// if the snake did not eat the food, remove the last element of the snake
		gameBoard.removeChild(snake[snake.length - 1]);
		snake.pop();
	} else {
		// if the snake ate the food, add a new div to the snake
		foodEaten = false;
	}
	// move the head of the snake to the new position
	previousXPosition = xPosition;
	previousYPosition = yPosition;
	snake.unshift(document.createElement("div"));
	snake[0].classList.add("snake");
	snake[0].style.left = `${xPosition}px`;
	snake[0].style.top = `${yPosition}px`;
	gameBoard.insertBefore(snake[0], gameBoard.firstChild);
});
