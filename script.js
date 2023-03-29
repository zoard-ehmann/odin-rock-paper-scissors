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
        symbol.classList.remove("transform--off");
        symbol.addEventListener("click", handleUserChoice);
      } else {
        symbol.classList.add("transform--off");
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

  function showMessage(msg) {
    const subtitle = document.querySelector(".subtitle");

    subtitle.textContent = msg;
  }

  function showRoundResult(result, computerSelection, userSelection) {
    showMessage(
      `${userSelection.toUpperCase()} VS ${computerSelection.toUpperCase()}. It's a ${result}!`
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

  function checkWin() {
    if (scores.userScore === WIN) {
      showMessage("Congrats, you've won!");
    } else if (scores.computerScore === WIN) {
      showMessage("Too bad, you lose...");
    } else {
      return;
    }

    setClickListener(false);

    const replay = document.querySelector(".replay");

    replay.classList.remove("hidden");
    replay.addEventListener(
      "click",
      (e) => {
        if (e.target.id === "replay") {
          // TODO: Move out game initialization to its own function and rename functions accordingly
          replay.classList.add("hidden");
          scores = initScores();
          updateScore("player", 0);
          updateScore("computer", 0);
          showMessage("Up to 5 points...");
          setClickListener(true);
        }
      },
      {
        once: true,
      }
    );
  }

  function handleUserChoice(e) {
    const userChoice = e.target.id;
    const computerChoice = getComputerChoice();

    const userWonRound = playARound(computerChoice, userChoice);

    if (userWonRound === undefined) {
      showRoundResult("TIE", computerChoice, userChoice);
      return;
    } else if (userWonRound) {
      scores.userScore++;
      updateScore("player", scores.userScore);
      showRoundResult("WIN", computerChoice, userChoice);
    } else {
      scores.computerScore++;
      updateScore("computer", scores.computerScore);
      showRoundResult("LOSE", computerChoice, userChoice);
    }

    checkWin();
  }

  let scores = initScores();
  setClickListener(true);
})();
