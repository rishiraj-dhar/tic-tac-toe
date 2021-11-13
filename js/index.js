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
            // cellDiv.innerText = "X";
            gameBlock.appendChild(cellDiv);
        }
    }
};