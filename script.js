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

function displayResult(result, computerSelection, userSelection) {
  console.log(
    `${result}:\nPlayer - ${userSelection}\nComputer - ${computerSelection}`
  );
}

function playARound(computerSelection, userSelection) {
  if (computerSelection === userSelection) {
    displayResult("Tie", computerSelection, userSelection);
    return;
  } else if (
    (userSelection === "rock" && computerSelection === "scissors") ||
    (userSelection === "paper" && computerSelection === "rock") ||
    (userSelection === "scissors" && computerSelection === "paper")
  ) {
    displayResult("Win", computerSelection, userSelection);
    return true;
  } else {
    displayResult("Lose", computerSelection, userSelection);
    return false;
  }
}

function showScore(round, userScore, computerScore) {
  console.log(`Round ${round}`);
  console.table({
    Player: userScore,
    Computer: computerScore,
  });
}

function game() {
  let userScore = 0;
  let computerScore = 0;

  for (let i = 0; i < ROUNDS; i++) {
    const userChoice = getUserChoice();
    const computerChoice = getComputerChoice();

    const win = playARound(computerChoice, userChoice);

    if (win) {
      userScore++;
    } else if (win === false) {
      computerScore++;
    }

    showScore(i + 1, userScore, computerScore);

    if (userScore === 3 || computerScore === 3 || i === ROUNDS - 1) {
      if (userScore > computerScore) {
        return `Congrats, you've won!`;
      } else if (userScore < computerScore) {
        return `Too bad, you lose...`;
      } else {
        return `It's a tie.`;
      }
    }
  }
}
