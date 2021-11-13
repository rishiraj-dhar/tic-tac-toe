let turn = 0;

class Player {
    isMarkedCell(row, col) {
        return this.occupancyGrid[row][col] == 1;
    }

    markCell(row, col) {
        this.occupancyGrid[row][col] = 1;
    }

    getName() {
        return this.name;
    }

    getSymbol() {
        return this.symbol;
    }

    getScore() {
        return this.score;
    }

    hasWon() {
        // check rows
        for (let row = 0; row < 3; row++) {
            if (this.occupancyGrid[row][0] + this.occupancyGrid[row][1] + this.occupancyGrid[row][2] == 3) {
                return true;
            }
        }

        // check columns
        for (let col = 0; col < 3; col++) {
            if (this.occupancyGrid[0][col] + this.occupancyGrid[1][col] + this.occupancyGrid[2][col] == 3) {
                return true;
            }
        }

        // check 1st diagonal
        if (this.occupancyGrid[0][0] + this.occupancyGrid[1][1] + this.occupancyGrid[2][2] == 3) {
            return true;
        }

        // check 2nd diagonal
        if (this.occupancyGrid[0][2] + this.occupancyGrid[1][1] + this.occupancyGrid[2][0] == 3) {
            return true;
        }

        // all cases failed
        return false;
    }

    incrementScore() {
        this.score++;
    }

    resetGrid() {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                this.occupancyGrid[r][c] = 0;
            }
        }
    }

    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.occupancyGrid = [  [0, 0, 0], 
                                [0, 0, 0],
                                [0, 0, 0]   ];
        this.score = 0;
    }
};

const gridIsFull = () => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!(player[0].isMarkedCell(i, j) || player[1].isMarkedCell(i, j))) {
                return false;
            }
        }
    }
    return true;
};

let player = [];

player.push(new Player('Player 01', 'X'));
player.push(new Player('Player 02', 'O'));

const checkCell = (row, col) => {
    if (!(player[0].isMarkedCell(row, col) || player[1].isMarkedCell(row, col))) {
        player[turn].markCell(row, col);
        return true;
    } else {
        return false;
    }
};

const roundIsOver = () => {
    for (let i = 0; i < 2; i++){
        if (player[i].hasWon()) {
            let winner_msg = document.createElement("p");
            winner_msg.innerText = player[i].getName() + " is the winner!";
            document.body.appendChild(winner_msg);
            player[i].incrementScore();
            document.getElementById("player-" + i).lastChild.innerText = player[i].getScore();
            return true;
        }
    }
    if (gridIsFull()) {
        let draw_msg = document.createElement("p");
        draw_msg.innerText = "It's a draw!";
        document.body.appendChild(draw_msg);
        return true;
    }
    return false;
};

const resetBoard = () => {
    player[0].resetGrid();
    player[1].resetGrid();
    let cells = document.getElementsByClassName("game-block")[0].children;
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
    }
};

const clickOnCell = (row, col) => {
    if (checkCell(row, col)) {
        let clickedCell = document.getElementById(`cell-${row}${col}`);
        clickedCell.innerText = player[turn].getSymbol();
        if(roundIsOver()){
            resetBoard();
            turn = 0;
        } else {
            turn = 1 - turn;
        }
    }
};

window.onload = (loadEvent) => {
    let scoreBlock = document.getElementsByClassName("score")[0];
    for (let p = 0; p < 2; p++) {
        let playerDiv = document.createElement("div");
        playerDiv.classList.add("player");
        playerDiv.id = `player-${p}`;

        let playerSymbol = document.createElement("p");
        playerSymbol.classList.add("player-symbol");
        playerSymbol.innerText = player[p].getSymbol();
        playerDiv.appendChild(playerSymbol);

        let playerName = document.createElement("p");
        playerName.classList.add("player-name");
        playerName.innerText = player[p].getName();
        playerDiv.appendChild(playerName);

        let playerScore = document.createElement("p");
        playerScore.classList.add("player-score");
        playerScore.innerText = player[p].getScore();
        playerDiv.appendChild(playerScore);

        scoreBlock.appendChild(playerDiv);
    }

    let gameBlock = document.getElementsByClassName("game-block")[0];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cellDiv = document.createElement("div");
            cellDiv.id = `cell-${i}${j}`;
            cellDiv.classList.add("game-cell");
            if (i != 0) {
                cellDiv.classList.add("cell-border-top");
            }
            if (j != 2) {
                cellDiv.classList.add("cell-border-right");
            }
            if (i != 2) {
                cellDiv.classList.add("cell-border-bottom");
            }
            if (j != 0) {
                cellDiv.classList.add("cell-border-left");
            }

            clickFunctionString = `clickOnCell(${i}, ${j})`;
            cellDiv.setAttribute("onclick", clickFunctionString);
            gameBlock.appendChild(cellDiv);
        }
    }
};