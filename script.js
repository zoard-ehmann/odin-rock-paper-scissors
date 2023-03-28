"use strict";

const WIN = 5;

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

function updateScore(player, score) {
  const scoreField = document.querySelector(`[data-score="${player}"]`);
  scoreField.textContent = score;
}

function playARound(computerSelection, userSelection) {
  if (computerSelection === userSelection) {
    return;
  } else if (
    (userSelection === "rock" && computerSelection === "scissors") ||
    (userSelection === "paper" && computerSelection === "rock") ||
    (userSelection === "scissors" && computerSelection === "paper")
  ) {
    return true;
  } else {
    return false;
  }
}

function game() {
  let userScore = 0;
  let computerScore = 0;
  let currentRound = 0;

  gameLoop: while (true) {
    currentRound++;
    const userChoice = getUserChoice();
    const computerChoice = getComputerChoice();

    console.clear();
    const userWonRound = playARound(computerChoice, userChoice);

    if (userWonRound) {
      showResult("Win", computerChoice, userChoice);
      userScore++;
      updateScore("player", userScore);
    } else if (userWonRound === false) {
      showResult("Lose", computerChoice, userChoice);
      computerScore++;
      updateScore("computer", computerScore);
    } else {
      showResult("Tie", computerChoice, userChoice);
      showScore(currentRound, userScore, computerScore);
      continue gameLoop;
    }

    showScore(currentRound, userScore, computerScore);

    if (userScore === WIN) {
      return "Congrats, you've won!";
    } else if (computerScore === WIN) {
      return "Too bad, you lose...";
    }
  }
}
