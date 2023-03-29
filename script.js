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

  function showMessage(msg) {
    const subtitle = document.querySelector(".subtitle");

    subtitle.textContent = msg;
  }

  function showRoundResult(result, computerSelection, userSelection) {
    showMessage(
      `Round #${
        gameData.round
      } - ${userSelection.toUpperCase()} VS ${computerSelection.toUpperCase()}. It's a ${result}!`
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
    if (gameData.userScore === WIN) {
      showMessage("Congrats, you've won!");
    } else if (gameData.computerScore === WIN) {
      showMessage("Too bad, you've lost...");
    } else {
      return;
    }

    initGame(false);
  }

  function handleUserChoice(e) {
    const userChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const userWonRound = playARound(computerChoice, userChoice);

    gameData.round++;

    if (userWonRound === undefined) {
      showRoundResult("TIE", computerChoice, userChoice);
      return;
    } else if (userWonRound) {
      gameData.userScore++;
      updateScore("player", gameData.userScore);
      showRoundResult("WIN", computerChoice, userChoice);
    } else {
      gameData.computerScore++;
      updateScore("computer", gameData.computerScore);
      showRoundResult("LOSE", computerChoice, userChoice);
    }

    checkWin();
  }

  function setClickListener(active) {
    const symbols = document.querySelectorAll(".symbol");

    for (let symbol of symbols) {
      if (active) {
        symbol.classList.remove("transform--off");
        symbol.addEventListener("click", handleUserChoice);
      } else {
        symbol.classList.add("transform--off");
        symbol.removeEventListener("click", handleUserChoice);
      }
    }
  }

  function initUI() {
    updateScore("player", 0);
    updateScore("computer", 0);
    showMessage("Up to 5 points...");
  }

  function initGame(startGame) {
    const replay = document.querySelector(".replay");

    if (startGame) {
      initUI();
      setClickListener(true);
      replay.classList.add("hidden");
      return {
        round: 0,
        userScore: 0,
        computerScore: 0,
      };
    } else {
      setClickListener(false);
      replay.classList.remove("hidden");
      replay.addEventListener(
        "click",
        (e) => {
          if (e.target.id === "replay") {
            gameData = initGame(true);
          }
        },
        {
          once: true,
        }
      );
    }
  }

  let gameData = initGame(true);
})();
