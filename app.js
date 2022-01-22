const rpcButtons = document.getElementById("rpc-buttons");
const playerIcon = document.getElementById("player-icon");
const computerIcon = document.getElementById("computer-icon");
const playerPips = document.getElementById("player-pips");
const computerPips = document.getElementById("computer-pips");
const displayResults = document.getElementById("display-results");

let roundNumber = 0;
let playerPoints = 0;
let computerPoints = 0;

const rockPaperScissors = {
    rock: `<i class="fas fa-hand-rock" id="option">`,
    paper: `<i class="fas fa-hand-paper" id="option">`,
    scissors: `<i class="fas fa-hand-scissors" id="option">`
};

function convertNumberToOption(choice) {
    if (choice === 0) return "rock";
    if (choice === 1) return "paper";
    if (choice === 2) return "scissors";
};

function playerOptionSelection(el) {
    if(el.target.classList.contains("rock")) return "rock";
    if(el.target.classList.contains("paper")) return "paper";
    if(el.target.classList.contains("scissors")) return "scissors";
};

function computerOptionSelection() {
    const choice = Math.floor(Math.random() * 3);
    return convertNumberToOption(choice);
};

function displayPlayerOptionSelected(option) {
    if (option === null || option === "") return;

    if (option === "rock") {  
        playerIcon.innerHTML = rockPaperScissors.rock;
    } else if (option === "paper") {
        playerIcon.innerHTML = rockPaperScissors.paper;
    } else {
        playerIcon.innerHTML = rockPaperScissors.scissors;
    }
};

function displayComputerOptionSelected(option) {
   if (option === "rock") {
    computerIcon.innerHTML = rockPaperScissors.rock;
   } else if (option === "paper") {
    computerIcon.innerHTML = rockPaperScissors.paper;
   } else {
    computerIcon.innerHTML = rockPaperScissors.scissors;
   }
};

function rpcLogic(playerOption, computerOption) {

    let results;
    if (playerOption === "rock") {
        if (computerOption === "rock") {
            results = "tie";
        } else if (computerOption === "paper") {
            results = "loss";
        } else {
            results = "win";
        }
    }

    if (playerOption === "paper") {
        if (computerOption === "rock") {
            results = "win";
        } else if (computerOption === "paper") {
            results = "tie";
        } else {
            results = "loss";
        }
    }

    if (playerOption === "scissors") {
        if (computerOption === "rock") {
            results = "loss";
        } else if (computerOption === "paper") {
            results = "win";
        } else {
            results = "tie";
        }
    }

    return results;
};

function pointAllocation(results) {
    roundNumber += 1;
    if (results === "win") {
        // playerScores(); Maybe?
        playerPips.innerHTML += `<div class="pip"></div>`;
        playerPoints += 1;
        displayResults.innerHTML = `
        <span class="results-text player">Player wins round ${roundNumber}</span>
        `;
    } else if (results === "loss") {
        computerPips.innerHTML += `<div class="pip"></div>`;
        computerPoints +=1;
        displayResults.innerHTML = `
        <span class="results-text computer">Computer wins round ${roundNumber}</span>
        `;
    } else {
        displayResults.innerHTML = `
        <span class="results-text">Round ${roundNumber} is a tie.</span>
        `;
    }
};

function playerWins() {
    if (playerPoints === 3) {
        displayResults.innerHTML = `
        <span class="results-icon"><i class="fas fa-trophy"></i></span>
        <span class="results-text player">PLAYER WINS THE GAME!</span>
        `;
    } 
};

function computerWins() {
    if (computerPoints === 3) {
        displayResults.innerHTML = `
        <span class="results-icon computer"><i class="fas fa-sad-tear"></i></span>
        <span class="results-text computer">COMPUTER WINS THE GAME!</span>
        `;
    }
};

function gameResults() {
    if (playerPoints === 3 || computerPoints === 3) {
        playerWins();
        computerWins();
        playerPoints = 0;
        computerPoints = 0;
        roundNumber = 0
        playerPips.innerHTML = "";
        computerPips.innerHTML = "";

    }
};

rpcButtons.addEventListener("click", e => {
    const playerOption = playerOptionSelection(e);
    const computerOption = computerOptionSelection();

    displayPlayerOptionSelected(playerOption);
    displayComputerOptionSelected(computerOption);

    const results = rpcLogic(playerOption, computerOption);

    pointAllocation(results);

    gameResults();
});
