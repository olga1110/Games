var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var SNAKE_SPEED = 1100;
var snake = [];
var direction = 'y+';

var oldDirection = 'y+';
var gameRunning = false;
var snakeTimer;
var score = 0;


prepareGameField();
document.getElementById('snake-new-game').addEventListener('click', startGame);
addEventListener('keydown', changeDirection);

function prepareGameField() {
    //Создание таблицы
    var gameTable = document.createElement('table');
    gameTable.classList.add('game-table');
    for (var i = 0; i < FIELD_SIZE_Y; i++) {
        var row = document.createElement('tr');
        row.classList.add('game-table-row');

        for (var j = 0; j < FIELD_SIZE_X; j++) {
            var cell = document.createElement('td');
            cell.classList.add('game-table-cell');
            cell.classList.add('cell-' + i + '-' + j); //номер внутри
            row.appendChild(cell);
        }
        gameTable.appendChild(row);
    }
    document.getElementById('snake-field').appendChild(gameTable);
}

//Создание змейки
function respawn() {
    var startCoordsX = Math.floor(FIELD_SIZE_X / 2); // 10
    var startCoordsY = Math.floor(FIELD_SIZE_Y / 2); // 10
    //Голова
    var snakeHead = document.getElementsByClassName('cell-' + startCoordsY + '-' + startCoordsX)[0];
    snakeHead.classList.add('snake-unit');
    snakeHead.setAttribute('data_y', startCoordsY.toString());
    snakeHead.setAttribute('data_x', startCoordsX.toString());
    //Тело змейки
    var snakeBody = document.getElementsByClassName('cell-' + (startCoordsY - 1) + '-' + startCoordsX)[0];
    snakeBody.classList.add('snake-unit');
    snake.push(snakeBody);
    snake.push(snakeHead);

}

//Создание еды
function createFood() {
    var foodCreated = false;
    while (!foodCreated) { //Бесконечный цикл создания еды
        var foodX = Math.floor(Math.random() * FIELD_SIZE_X); //Радом х
        var foodY = Math.floor(Math.random() * FIELD_SIZE_Y); //Радом y
        var foodCell = document.querySelector('.cell-' + foodY + '-' + foodX);
        if (!foodCell.classList.contains('snake-unit') && !foodCell.classList.contains('food-unit')) {
            foodCell.classList.add('food-unit');
            foodCreated = true;
        }
    }
}

//Проверка на ячейки на еду
function haveFood(unit) {
    if (unit.classList.contains('food-unit')) {
        unit.classList.remove('food-unit');
        createFood();
        score++;
        return true;
    }
    return false;
}

function move() {
    var newUnit;
    var coordY = parseInt(snake[snake.length - 1].getAttribute('data_y'));
    var coordX = parseInt(snake[snake.length - 1].getAttribute('data_x'));

    //Определение новой точки
    switch (direction) {
        case 'x-':
            newUnit = document.querySelector('.cell-' + (coordY) + '-' + (coordX -= 1));
            break;
        case 'x+':
            newUnit = document.querySelector('.cell-' + (coordY) + '-' + (coordX += 1));
            break;
        case 'y-':
            newUnit = document.querySelector('.cell-' + (coordY -= 1) + '-' + (coordX));
            break;
        case 'y+':
            newUnit = document.querySelector('.cell-' + (coordY += 1) + '-' + (coordX));
            break;
    }
    if (snake.indexOf(newUnit) === -1 && newUnit !== null) {
        snake[snake.length - 1].removeAttribute('data_y');
        snake[snake.length - 1].removeAttribute('data_x');

        newUnit.classList.add('snake-unit');
        snake.push(newUnit);
        snake[snake.length - 1].setAttribute('data_y', coordY.toString());
        snake[snake.length - 1].setAttribute('data_x', coordX.toString());
        //Проверка хвоста
        if (!haveFood(newUnit)) {
            //Уменьшение хвоста
            snake.splice(0, 1)[0].classList.remove('snake-unit');
        }
    } else {

        finishGame();
    }
    oldDirection = direction;
}

//Старт игры
function startGame() {
    gameRunning = true;
    //Сброс прошлой игры
    direction = 'y+';
    oldDirection = 'y+';
    score = 0;
    for (var i = 0; i < snake.length; i++) {
        snake[i].classList.remove('snake-unit');
    }
    snake = [];
    var units = document.getElementsByClassName('food-unit');
    for (i = 0; i < units.length; i++) {
        units[i].classList.remove('food-unit');
    }

    //Старт новой игры
    clearInterval(snakeTimer);
    respawn(); //Создание змейки
    snakeTimer = setInterval(move, SNAKE_SPEED);
    setTimeout(createFood, 3000);
}

function changeDirection(event) {
    switch (event.keyCode) {
        case 37: //Клавиша влево
            if (oldDirection !== 'x+') {
                direction = 'x-'
            }
            break;
        case 38: //Клавиша вверх
            if (oldDirection !== 'y+') {
                direction = 'y-'
            }
            break;
        case 39: //Клавиша вправо
            if (oldDirection !== 'x-') {
                direction = 'x+'
            }
            break;
        case 40: //Клавиша вниз
            if (oldDirection !== 'y-') {
                direction = 'y+'
            }
            break;
    }
}

function finishGame() {
    gameRunning = false;
    clearInterval(snakeTimer);
    console.log(FIELD_SIZE_X);
    console.log(FIELD_SIZE_Y);
    if (score < (FIELD_SIZE_X * FIELD_SIZE_Y - 2)) {
        alert("GAME OVER!!!\nВаш результат: " + score.toString());
    } else {
        alert("Победа!!!\nВаш результат: " + score.toString());
    }
}



