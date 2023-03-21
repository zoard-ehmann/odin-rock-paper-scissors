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
  let userChoice;
  while (
    userChoice != "rock" ||
    userChoice != "paper" ||
    userChoice != "scissors"
  ) {
    userChoice = prompt(
      "Enter your choice: rock, paper, scissors"
    ).toLowerCase();
  }
}
