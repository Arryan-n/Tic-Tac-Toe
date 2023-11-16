const X_class = "x";
const Circle_class = "circle";
const Winning_Combination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellEl = document.querySelectorAll("[data-cell]");
const WinningMsgTextEl = document.querySelector("[data-winning-text]");
const WinningMsgEl = document.getElementById("winning-message");
const RestartBtn = document.getElementById("restartbtn");
const board = document.getElementById("board");
let circleTurn;

startGame();

RestartBtn.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellEl.forEach((cell) => {
    cell.classList.remove(X_class);
    cell.classList.remove(Circle_class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  WinningMsgEl.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? Circle_class : X_class;
  placeMark(cell, currentClass);
  //e.target returns the HTML element that triggered an event.
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapMark();
    setBoardHoverClass();
    //here we will  swap the board
  }
}

//this function is for showing the end window after Either player win or draw
function endGame(draw) {
  if (draw) {
    WinningMsgTextEl.innerText = "Draw!";
  } else {
    WinningMsgTextEl.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  WinningMsgEl.classList.add("show");
}

function isDraw() {
  return [...cellEl].every((cell) => {
    return (
      cell.classList.contains(X_class) || cell.classList.contains(Circle_class)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapMark() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_class);
  board.classList.remove(Circle_class);
  if (circleTurn) {
    board.classList.add(Circle_class);
  } else {
    board.classList.add(X_class);
  }
}

//checking the win in the end of Game
function checkWin(currentClass) {
  return Winning_Combination.some((combinations) => {
    return combinations.every((index) => {
      return cellEl[index].classList.contains(currentClass);
    });
  });
}
