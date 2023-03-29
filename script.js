(function () {
  "use strict";

  const WIN = 5;

  function initScores() {
    return {
      userScore: 0,
      computerScore: 0,
    };
  }

  function setClickListener(state) {
    const symbols = document.querySelectorAll(".symbol");
    for (let symbol of symbols) {
      if (state) {
        symbol.addEventListener("click", handleUserChoice);
      } else {
        symbol.removeEventListener("click", handleUserChoice);
      }
    }
  }

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

  function showResult(result, computerSelection, userSelection) {
    const subtitle = document.querySelector(".subtitle");

    subtitle.textContent = `${userSelection.toUpperCase()} VS ${computerSelection.toUpperCase()}. It's a ${result}!`;
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

    const userWonRound = playARound(computerChoice, userChoice);

    if (userWonRound === undefined) {
      showResult("TIE", computerChoice, userChoice);
      return;
    } else if (userWonRound) {
      scores.userScore++;
      updateScore("player", scores.userScore);
      showResult("WIN", computerChoice, userChoice);
    } else {
      scores.computerScore++;
      updateScore("computer", scores.computerScore);
      showResult("LOSE", computerChoice, userChoice);
    }
  }

  let scores = initScores();

  const symbols = document.querySelectorAll(".symbol");
  for (let symbol of symbols) {
    symbol.addEventListener("click", handleUserChoice);
  }
})();
