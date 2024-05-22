const boardBtns = document.getElementsByClassName("Board");
const pointsElmt = document.getElementById("Points");
const resetElmt = document.getElementById("resetBtn");
const remarkElmt = document.getElementById("Remark");
const deciderElmt = document.getElementById("Decider");
const msgElmt = document.getElementById("msg");
const pointerElmt = document.getElementById("Points");
let currentGameMode = 0;  
let currentWindow = 0; 
let playerTurn = true;
let isRunning = true;
let winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
let userWon = false;
let compWon = false;
let userPoints = 0;
let computerPoints = 0;
let pointsTemp = pointerElmt.innerHTML;
let Temp = boardBtns[0].innerHTML;
let prevNum = 0;
let index = 0;
function Game() {

    for (let i = 0; i < 9; i++) {
        boardBtns[0].children[i].addEventListener('click', () => {
            if (playerTurn) {
                if (boardBtns[0].children[i].textContent != '') {
                    alert("Already Taken");
                } else {
                    boardBtns[0].children[i].textContent = 'X';
                    playerTurn = false;
                    setTimeout(() => {
                        AiMove();
                    }, 600);
                }
            }
        });

    }

}
Game();

function AiMove() {
    let computerMove = Math.floor(Math.random() * 8);
    if (boardBtns[0].children[computerMove].textContent != '') {
        computerMove = Math.floor(Math.random() * 8);
        let Index = 0;
        for (let j = 0; j < 8; j++) {
            if (boardBtns[0].children[j].textContent != '') {
                Index++;
            }
        }
        if (Index == 8) {
            checkWinner();
            checkDraw();
        }
        else {
            AiMove();
        }
    }
    else {
        boardBtns[0].children[computerMove].textContent = 'O';
        playerTurn = true;
        checkWinner();
    }
}

function checkWinner() {
    for (let combo of winningCombos) {
        if (
            boardBtns[0].children[combo[0]].textContent !== '' &&
            boardBtns[0].children[combo[0]].textContent === boardBtns[0].children[combo[1]].textContent &&
            boardBtns[0].children[combo[0]].textContent === boardBtns[0].children[combo[2]].textContent
        ) {
            
                if (boardBtns[0].children[combo[2]].textContent === 'X') {
                    userWon = true;
                    userPoints++;
                    msgElmt.style.display = "grid";
                    remarkElmt.textContent = "Damn, You're Impressive!";
                    deciderElmt.textContent = "You Won!";
                    boardBtns[0].style.display = "none";
                    isRunning = false;
                    draw = false;
                } else{
                    compWon = true;
                    computerPoints++;
                    msgElmt.style.display = "grid";
                    remarkElmt.textContent = "Better Luck Next Time!";
                    deciderElmt.textContent = "You Lost!";
                    boardBtns[0].style.display = "none";
                    isRunning = false;
                }
            

        }
    }
    if (currentGameMode == 0) {
        pointsElmt.children[0].textContent = `Player Points: ${userPoints}`;
        pointsElmt.children[1].textContent = `Computer Points: ${computerPoints}`;
    }
}
function checkDraw() {
    if (userWon == false && compWon == false) {
        msgElmt.style.display = "grid";
        remarkElmt.textContent = "Try Harder!";
        deciderElmt.textContent = "Draw!";
        boardBtns.style.display = "none";
        isRunning = false;
    }
}
function resetGame() {
    for (let i = 0; i < boardBtns[0].children.length; i++) {
        boardBtns[0].children[i].textContent = '';
    }
    playerTurn = true;
    isRunning = true;
    compWon = false;
    userWon = false;
    msgElmt.style.display = "none";
    boardBtns[0].style.display = "grid";
}
resetElmt.addEventListener("click", () => {
    setTimeout(() => {
        resetGame();
    },300)
   
});