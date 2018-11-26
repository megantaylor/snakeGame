const SnakeGame = function() {
  const CANVAS_BORDER_COLOUR = 'black';
  const CANVAS_BACKGROUND_COLOUR = 'white';
  const SNAKE_FILL_COLOUR = 'lightGreen';
  const SNAKE_BORDER_COLOUR = 'darkGreen';
  const FOOD_FILL_COLOUR = 'red';
  const FOOD_BORDER_COLOUR = 'darkRed';
  const GAME_CANVAS = document.getElementById('gameCanvas');
  const CTX = GAME_CANVAS.getContext('2d');

  let score;
  let snakeSpeed;
  let gameLoop;
  let snake;
  let velocityX;
  let velocityY;
  let foodX;
  let foodY;
  let changingDirection;
  let inProgress;
  let changeSpeedValue;
  let gridCellSize;
  let foodScoreValue;

  const initialize = () => {
    score = 0;
    snakeSpeed = 200;
    snake = [
      { x: 150, y: 150 },
      { x: 140, y: 150 },
      { x: 130, y: 150 },
      { x: 120, y: 150 },
      { x: 110, y: 150 }
    ];
    velocityX = 10;
    velocityY = 0;
    changingDirection = false;
    inProgress = true;
    changeSpeedValue = 10;
    gridCellSize = 10;
    foodScoreValue = 10;
    updateGameData();
  };

  //create game elements
  const setCanvas = () => {
    CTX.fillStyle = CANVAS_BACKGROUND_COLOUR;
    CTX.strokeStyle = CANVAS_BORDER_COLOUR;
    CTX.fillRect(0, 0, GAME_CANVAS.width, GAME_CANVAS.height);
    CTX.strokeRect(0, 0, GAME_CANVAS.width, GAME_CANVAS.height);
  };

  const drawSnakeUnit = snakeUnit => {
    CTX.fillStyle = SNAKE_FILL_COLOUR;
    CTX.strokeStyle = SNAKE_BORDER_COLOUR;
    CTX.fillRect(snakeUnit.x, snakeUnit.y, gridCellSize, gridCellSize);
    CTX.strokeRect(snakeUnit.x, snakeUnit.y, gridCellSize, gridCellSize);
  };

  const drawFood = () => {
    CTX.fillStyle = FOOD_FILL_COLOUR;
    CTX.strokeStyle = FOOD_BORDER_COLOUR;
    CTX.fillRect(foodX, foodY, gridCellSize, gridCellSize);
    CTX.strokeRect(foodX, foodY, gridCellSize, gridCellSize);
  };

  //food logic
  const randomMultipleOfTen = (min, max) => {
    return (
      Math.round((Math.random() * (max - min) + min) / gridCellSize) *
      gridCellSize
    );
  };

  const makeFood = () => {
    foodX = randomMultipleOfTen(0, GAME_CANVAS.width - gridCellSize);
    foodY = randomMultipleOfTen(0, GAME_CANVAS.height - gridCellSize);

    snake.forEach(function isFoodOnSnake(part) {
      const foodIsOnSnake = part.x == foodX && part.y == foodY;
      if (foodIsOnSnake) makeFood();
    });
  };

  //snake logic
  const drawSnake = () => {
    snake.forEach(drawSnakeUnit);
  };
  const moveSnake = () => {
    const head = { x: snake[0].x + velocityX, y: snake[0].y + velocityY };
    snake.unshift(head);

    const snakeAteFood = snake[0].x === foodX && snake[0].y === foodY;
    if (snakeAteFood) {
      score += foodScoreValue;
      snakeSpeed -= changeSpeedValue;
      updateGameData();
      makeFood();
    } else {
      snake.pop();
    }
  };
  const changeDirection = event => {
    const keyPressed = event.code;
    const movingUp = velocityY === -gridCellSize;
    const movingDown = velocityY === gridCellSize;
    const movingRight = velocityX === gridCellSize;
    const movingLeft = velocityX === -gridCellSize;

    if (changingDirection) return;
    changingDirection = true;

    if (keyPressed === 'ArrowLeft' && !movingRight) {
      event.preventDefault();
      velocityX = -gridCellSize;
      velocityY = 0;
    } else if (keyPressed === 'ArrowUp' && !movingDown) {
      event.preventDefault();
      velocityX = 0;
      velocityY = -gridCellSize;
    } else if (keyPressed === 'ArrowRight' && !movingLeft) {
      event.preventDefault();
      velocityX = gridCellSize;
      velocityY = 0;
    } else if (keyPressed === 'ArrowDown' && !movingUp) {
      event.preventDefault();
      velocityX = 0;
      velocityY = gridCellSize;
    }
  };

  //game logic
  const didGameEnd = () => {
    // init i at 4 because first 4 units of snake cannot collide with each other
    for (let i = 4; i < snake.length; i++) {
      const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
      if (didCollide) return true;
    }

    const hitLeftBorder = snake[0].x < 0;
    const hitRightBorder = snake[0].x > GAME_CANVAS.width - gridCellSize;
    const hitTopBorder = snake[0].y < 0;
    const hitBottomBorder = snake[0].y > GAME_CANVAS.height - gridCellSize;

    return hitLeftBorder || hitRightBorder || hitTopBorder || hitBottomBorder;
  };
  const updateGameData = () => {
    document.getElementById('score').innerHTML = score;
    document.getElementById('speed').innerHTML = snakeSpeed;
  };
  const gameEngine = () => {
    if (didGameEnd()) {
      alert('You died!');
      clearInterval(gameLoop);
      inProgress = false;
      return;
    }

    gameLoop = setTimeout(function() {
      changingDirection = false;
      setCanvas();
      drawSnake();
      drawFood();
      moveSnake();
      gameEngine();
    }, snakeSpeed);
  };

  document.addEventListener('keydown', changeDirection);
  document.getElementById('startGame').addEventListener('click', function() {
    if (!inProgress) {
      initialize();
      gameEngine();
      makeFood();
    } else {
      return;
    }
  });
};
SnakeGame();
