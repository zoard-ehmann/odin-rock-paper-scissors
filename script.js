(function () {
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

  function handleUserChoice(e) {
    const userChoice = e.target.id;
    const computerChoice = getComputerChoice();

    currentRound++;

    const userWonRound = playARound(computerChoice, userChoice);

    if (userWonRound) {
      userScore++;
      updateScore("player", userScore);
    } else if (userWonRound === false) {
      computerScore++;
      updateScore("computer", computerScore);
    }
  }

  let userScore = 0;
  let computerScore = 0;
  let currentRound = 0;

  const symbols = document.querySelectorAll(".symbol");

  for (let symbol of symbols) {
    symbol.addEventListener("click", handleUserChoice);
  }
})();
