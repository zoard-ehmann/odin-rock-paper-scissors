"use strict";

(function () {
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

  function showRoundResult(result, emoji) {
    showMessage(`Round #${gameData.round} // ${result} ${emoji}`);
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
      return false;
    }

    initGame(false);
  }

  function setSymbols(userChoice, computerChoice) {
    const playerSymbols = document.querySelectorAll(".symbols__player");
    const computerSymbols = document.querySelectorAll(".symbols__computer");

    setClickListener(false);

    playerSymbols.forEach((symbol) => {
      if (symbol.dataset.symbol !== userChoice)
        symbol.classList.toggle("hidden");
    });

    computerSymbols.forEach((symbol) => {
      if (symbol.dataset.symbol === computerChoice)
        symbol.classList.toggle("hidden");
    });
  }

  function resetSymbols() {
    const playerSymbols = document.querySelectorAll(".symbols__player");
    const computerSymbols = document.querySelectorAll(".symbols__computer");

    setClickListener(true);

    playerSymbols.forEach((symbol) => {
      symbol.classList.remove("hidden");
    });

    computerSymbols.forEach((symbol) => {
      symbol.classList.add("hidden");
    });
  }

  function handleUserChoice(e) {
    const userChoice = e.target.dataset.symbol;
    const computerChoice = getComputerChoice();
    const userWonRound = playARound(computerChoice, userChoice);

    gameData.round++;
    setSymbols(userChoice, computerChoice);

    if (userWonRound === undefined) {
      showRoundResult("TIE", "⚠️");
    } else if (userWonRound) {
      gameData.userScore++;
      updateScore("player", gameData.userScore);
      showRoundResult("WIN", "✅");
    } else {
      gameData.computerScore++;
      updateScore("computer", gameData.computerScore);
      showRoundResult("LOSE", "❌");
    }

    if (checkWin() === false) {
      setTimeout(() => {
        resetSymbols();
      }, 2000);
    }
  }

  function setClickListener(active) {
    const playerSymbols = document.querySelectorAll(".symbols__player");

    for (let symbol of playerSymbols) {
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
    resetSymbols();
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
