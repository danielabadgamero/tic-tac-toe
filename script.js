const board = document.querySelector(".board");
const cells = [];
const playAgainstCheckboxes = [...document.querySelectorAll("input[type='radio']")];
const form = document.querySelector("form")
const startButton = form.querySelector("button");
const winnerBoard = document.querySelector("#winner-board")

let player1Name;
let player2Name;
let mode;
let occupiedCells = [];
let winner;

const start = (() => {
    occupiedCells = [];
    const computer = () => {
        document.getElementById("player1-turn").textContent = "You (X)";
        document.getElementById("player2-turn").textContent = "Computer (O)";
        if (Math.floor(Math.random() * 2)) {
            document.getElementById("player1-turn").classList.add("turn");
        } else {
            document.getElementById("player2-turn").classList.add("turn");
        }
    }
    const player = () => {
        document.getElementById("player1-turn").textContent = player1Name + "(X)";
        document.getElementById("player2-turn").textContent = player2Name + "(O)";
        if (Math.floor(Math.random() * 2)) {
            document.getElementById("player1-turn").classList.add("turn");
        } else {
            document.getElementById("player2-turn").classList.add("turn");
        }
    };
    return {
      computer,
      player,
    };
  })();

function nextTurn() {
    document.querySelector("#player1-turn").classList.toggle("turn");
    document.querySelector("#player2-turn").classList.toggle("turn");
}

function randomCellNumber() {
    return Math.floor(Math.random() * 9)
}

function computerMove(occupiedCells) {
    let randomCell = randomCellNumber();
    if (occupiedCells.length >= 9) {
        return "Ties!";
    }
    if (occupiedCells.indexOf(randomCell) === -1) {
        document.getElementById(randomCell).textContent = "O";
        occupiedCells.push(randomCell);
    } else {
        computerMove(occupiedCells);
    }
}

function checkWinner() {
    for (let i = 0; i <= 2; i++) { // checks for columns
        if (cells[i].textContent === "X" && cells[i + 3].textContent === "X" && cells[i + 6].textContent === "X") {
            return "player1";
        } else if(cells[i].textContent === "O" && cells[i + 3].textContent === "O" && cells[i + 6].textContent === "O") {
            return "player2";
        }
    }
    for (let j = 0; j <= 6; j += 3) { // checks for rows
        if (cells[j].textContent === "X" && cells[j + 1].textContent === "X" && cells[j + 2].textContent === "X") {
            return "player1";
        } else if (cells[j].textContent === "O" && cells[j + 1].textContent === "O" && cells[j + 2].textContent === "O") {
            return "player";
        }
    }
    if (cells[0].textContent === "X" && cells[4].textContent === "X" && cells[8].textContent === "X") { // checks for top-left to bottom-right diagonal
        return "player1";
    } else if (cells[0].textContent === "O" && cells[4].textContent === "O" && cells[8].textContent === "O") {
        return "player2";
    }
    if (cells[2].textContent === "X" && cells[4].textContent === "X" && cells[6].textContent === "X") { // checks for top-right to bottom-left diagonal
        return "player1";
    } else if (cells[2].textContent === "O" && cells[4].textContent === "O" && cells[6].textContent === "O") {
        return "player2";
    }
    if (occupiedCells[8] >= 0) {
        return "Ties!";
    }
}

function showWinner() {
    winnerBoard.classList.add("winner");
    if (mode === "computer") {
        if (winner === "player1") {
            winnerBoard.querySelector("span#winner").textContent = "Player1";
        } else if (winner === "player2") {
            winnerBoard.querySelector("span#winner").textContent = "Computer";
        } else {
            winnerBoard.querySelector("span#winner").textContent = winner;
        }
    } else {
        if (winner === "player1") {
            winnerBoard.querySelector("span#winner").textContent = player1Name;
        } else if (winner === "player2") {
            winnerBoard.querySelector("span#winner").textContent = player2Name;
        } else {
            winnerBoard.querySelector("span#winner").textContent = winner;
        }
    }
    document.querySelector("div.empty").classList.add("prompt-ask");

}

for (let i = 0; i <= 8; i++) {
    cells.push(document.createElement(`div`));
    cells[i].classList.add("cell");
    cells[i].setAttribute("id", i);
    board.appendChild(cells[i]);
}

playAgainstCheckboxes[0].addEventListener("change", (e) => {
    form.querySelector("div.empty").classList.remove("names");
})

playAgainstCheckboxes[1].addEventListener("change", (e) => {
        form.querySelector("div.empty").classList.add("names");
})

startButton.addEventListener("click", () => {
    occupiedCells = [];
    cells.forEach(cell => {
        cell.textContent = "";
    })
    winnerBoard.classList.remove("winner");
    document.querySelector("#player1-turn").classList.remove("turn");
    document.querySelector("#player2-turn").classList.remove("turn");
    document.querySelector("#player1-turn").textContent = "";
    document.querySelector("#player2-turn").textContent = "";
    if (!playAgainstCheckboxes[0].checked && !playAgainstCheckboxes[1].checked) {
        alert("No opponent selected");
    } else if (playAgainstCheckboxes[1].checked) {
        if (!document.getElementById("player1").value || !document.getElementById("player2").value) {
            document.getElementById("player1").style.borderColor = "red";
            document.getElementById("player2").style.borderColor = "red";
        } else {
            player1Name = document.getElementById("player1").value;
            player2Name = document.getElementById("player2").value;
            document.querySelector("div.empty").classList.remove("prompt-ask");
            start.player();
            mode = "player";
        }
    } else {
        document.querySelector("div.empty").classList.remove("prompt-ask");
        start.computer();
        mode = "computer";
    }
})

cells.forEach(cell => {
    cell.addEventListener("click", (e) => {
        if (!e.target.textContent) {
            if (mode === "computer") {
                if (document.getElementById("player1-turn").classList.contains("turn")) {
                    e.target.textContent = "X"
                    occupiedCells.push(parseInt(e.target.id));
                    computerMove(occupiedCells);
                } else {
                    computerMove(occupiedCells);
                    nextTurn();
                }
            } else {
                if (document.getElementById("player1-turn").classList.contains("turn")) {
                    e.target.textContent = "X"
                    occupiedCells.push(parseInt(e.target.id));
                    nextTurn();
                } else {
                    e.target.textContent = "O"
                    occupiedCells.push(parseInt(e.target.id));
                    nextTurn();
                }
            }
        } else {
            alert("Cell is not free");
        }
        winner = checkWinner();
        if (winner) {
            showWinner();
        }
    })
})