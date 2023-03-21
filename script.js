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
    `${result}: computer chose ${computerSelection}, user chose ${userSelection}`
  );
}

function playARound(computerSelection, userSelection) {
  if (computerSelection === userSelection) {
    displayResult("Tie", computerSelection, userSelection);
    return 0;
  } else if (
    (userSelection === "rock" && computerSelection === "scissors") ||
    (userSelection === "paper" && computerSelection === "rock") ||
    (userSelection === "scissors" && computerSelection === "paper")
  ) {
    displayResult("Win", computerSelection, userSelection);
    return 1;
  } else {
    displayResult("Lose", computerSelection, userSelection);
    return -1;
  }
}

function game() {
  let userScore = 0;

  for (let i = 0; i < ROUNDS; i++) {
    const userChoice = getUserChoice();
    const computerChoice = getComputerChoice();

    let result = playARound(computerChoice, userChoice);
    userScore += result;
  }

  if (userScore > 0) {
    return `Congrats, you've won!`;
  } else if (userScore < 0) {
    return `Too bad, you lose...`;
  } else {
    return `It's a tie.`;
  }
}
