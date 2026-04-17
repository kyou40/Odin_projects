let humanScore = 0;
let computerScore = 0;

const round = document.querySelector("#round");
const h_score = document.querySelector("#h-score");
const c_score = document.querySelector("#c-score");
const h_choice = document.querySelector("#h-choice");
const c_choice = document.querySelector("#c-choice");
const message = document.querySelector("#msg");
const result = document.querySelector("#result");

function getComputerChoice() {
  const choice = ["rock", "paper", "scissors"];
  return choice[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection) {
  if (humanScore === 5 || computerScore === 5) return;
  const computerChoice = getComputerChoice();
  c_choice.textContent = computerChoice;
  h_choice.textContent = playerSelection;
  let msg = "";

  if (playerSelection === computerChoice) {
    msg = "Its a tie!";
  }
  switch (playerSelection) {
    case "rock":
      if (computerChoice === "paper") {
        computerScore++;
        msg = "You lose! Paper beats Rock";
      } else if (computerChoice === "scissors") {
        humanScore++;
        msg = "You Win! Rock beats Scissors";
      }
      break;
    case "paper":
      if (computerChoice === "rock") {
        humanScore++;
        msg = "You Win! Paper beats Rock";
      } else if (computerChoice === "scissors") {
        computerScore++;
        msg = "You lose! Scissors beats Paper";
      }
      break;
    case "scissors":
      if (computerChoice === "rock") {
        computerScore++;
        msg = "You lose! Rock beats Scissors";
      } else if (computerChoice === "paper") {
        humanScore++;
        msg = "You win! Scissors beats Paper";
      }
      break;
  }
  h_score.textContent = humanScore;
  c_score.textContent = computerScore;
  message.textContent = msg;

  if (humanScore === 5) {
    result.textContent = "You beat the machine!";
    return;
  } else if (computerScore === 5) {
    result.textContent = "The computer has won";
    return;
  }
}
document.querySelectorAll(".btn-choice").forEach((button) => {
  button.addEventListener("click", () => playRound(button.id));
});
