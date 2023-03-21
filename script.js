"use strict";

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
