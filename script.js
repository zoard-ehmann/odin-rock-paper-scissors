"use strict";

const ROUNDS = 5;

function getComputerChoice() {
  const computerChoice = Math.floor(Math.random() * 3) + 1;

  switch (computerChoice) {
    case 1:
      return "rock";
    case 2:
      return "paper";
    case 3:
      return "scissors";
  }
}

function getUserChoice() {
  while (true) {
    let userChoice = prompt(
      "Enter your choice: rock, paper, scissors"
    ).toLowerCase();
    if (
      userChoice === "rock" ||
      userChoice === "paper" ||
      userChoice === "scissors"
    ) {
      return userChoice;
    }
  }
}

function showResult(result, computerSelection, userSelection) {
  console.log(
    `${result}:\nPlayer - ${userSelection}\nComputer - ${computerSelection}`
  );
}

function showScore(round, userScore, computerScore) {
  console.log(`Round ${round}`);
  console.table({
    Player: userScore,
    Computer: computerScore,
  });
}

function playARound(computerSelection, userSelection) {
  if (computerSelection === userSelection) {
    showResult("Tie", computerSelection, userSelection);
    return;
  } else if (
    (userSelection === "rock" && computerSelection === "scissors") ||
    (userSelection === "paper" && computerSelection === "rock") ||
    (userSelection === "scissors" && computerSelection === "paper")
  ) {
    showResult("Win", computerSelection, userSelection);
    return true;
  } else {
    showResult("Lose", computerSelection, userSelection);
    return false;
  }
}

function game() {
  let userScore = 0;
  let computerScore = 0;

  for (let i = 0; i < ROUNDS; i++) {
    let currentRound = i + 1;
    const userChoice = getUserChoice();
    const computerChoice = getComputerChoice();

    console.clear();
    const userWonRound = playARound(computerChoice, userChoice);

    if (userWonRound) {
      userScore++;
    } else if (userWonRound === false) {
      computerScore++;
    }

    showScore(currentRound, userScore, computerScore);

    if (userScore === 3 || computerScore === 3 || currentRound === ROUNDS) {
      if (userScore > computerScore) {
        return "Congrats, you've won!";
      } else if (userScore < computerScore) {
        return "Too bad, you lose...";
      } else {
        return "It's a tie.";
      }
    }
  }
}

let keepGoing = true;
while (keepGoing) {
  console.clear();
  console.log(game());
  if (!confirm("Would you like to play again?")) keepGoing = false;
}
