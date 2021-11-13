let turn = 0;

class Player {
    isMarkedCell(row, col) {
        return this.occupancyGrid[row][col] == 1;
    }

    markCell(row, col) {
        this.occupancyGrid[row][col] = 1;
    }

    getSymbol() {
        return this.symbol;
    }

    constructor(symbol) {
        this.symbol = symbol;
        this.occupancyGrid = [  [0, 0, 0], 
                                [0, 0, 0],
                                [0, 0, 0]   ];
    }
};

let player = [];

player.push(new Player('X'));
player.push(new Player('O'));

const checkCell = (row, col) => {
    if (!(player[0].isMarkedCell(row, col) || player[1].isMarkedCell(row, col))) {
        player[turn].markCell(row, col);
        return true;
    } else {
        return false;
    }
};

const clickOnCell = (row, col) => {
    if (checkCell(row, col)) {
        let clickedCell = document.getElementById(`cell-${row}${col}`);
        clickedCell.innerText = player[turn].getSymbol();
        turn = 1 - turn;
    }
};

window.onload = (loadEvent) => {
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