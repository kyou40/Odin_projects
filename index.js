let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  random = Math.floor(Math.random() * 3);
  if (random === 0) {
    return "rock";
  } else if (random === 1) {
    return "paper";
  } else if (random === 2) {
    return "scissors";
  }
  console.log(random);
}

function getHumanChoice() {
  choice = prompt("rock, paper, scissors");
  return choice;
}

function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase();
  if (humanChoice === computerChoice) {
    return "Its a tie!";
  }
  switch (humanChoice) {
    case "rock":
      if (computerChoice === "paper") {
        computerScore++;
        return "You lose! Paper beats Rock";
      } else if (computerChoice === "scissors") {
        humanScore++;
        return "You Win! Rock beats Scissors";
      }
      break;
    case "paper":
      if (computerChoice === "rock") {
        humanScore++;
        return "You Win! Paper beats Rock";
      } else if (computerChoice === "scissors") {
        computerScore++;
        return "You lose! Scissors beats Paper";
      }
      break;
    case "scissors":
      if (computerChoice === "rock") {
        computerScore++;
        return "You lose! Rock beats Scissors";
      } else if (computerChoice === "paper") {
        humanScore++;
        return "You win! Scissors beats Paper";
      }
      break;
  }
}

function playGame() {
  for (let i = 0; i < 5; i++) {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    console.log(playRound(humanChoice, computerChoice));
    console.log(`Score -> Human: ${humanScore}, Computer: ${computerScore}`);
  }

  playGame();
  if (humanScore > computerScore) {
    console.log("You win!");
  } else if (computerScore > humanScore) {
    console.log("You lose");
  } else {
    console.log("draw!");
  }
}
