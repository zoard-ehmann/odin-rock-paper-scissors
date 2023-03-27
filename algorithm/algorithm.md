# Algorithm: Rock, Paper, Scissors

## Plan

### UI

- Does the program will have a UI?
  - The program will have a GUI.
- How will it look like?
  - 3 symbols layed out in a row, after choosing one of them, the result will be shown.
- What functionality will it has?
  - The interface will accept a user input that refers to the chosen symbol.
  - The interface will have a replay functionality after a whole game.
  - The interface will have a round-level score table.

### Inputs

- What inputs the program will have?
  - A string that will select the chosen symbol: _String_
  - Replay value: _Boolean_
- Will the program get the inputs from the user or elsewhere?
  - The program will get the string input from the user in each turn.
  - The program will get the replay value from the user after declaring the winner.

### Outputs

- What will be the desired output?
  - Each round will have an output about the result of the round.
  - A score table that tracks the scores.
  - The final output will be the overall result.

### Steps

- What will be the steps necessary to return the desired output based on the inputs?
  1. Get the user input
  2. Generate a random computer chosen value
  3. Check the user input against the computer chosen value
  4. Determine the result
  5. Inform the user about the result

## Pseudocode

- Start the main loop
  - Start the game
    - Initialize score tracking for player and computer
    - Start a loop that continues for 5 points for either the player or the computer
      - Wait for a player input, and store it in a variable
      - Generate a random choice for the computer and store it in a variable
      - Check the player input against the computer chosen value
      - Determine the result from player perspective: win, lose or tie
        - Inform the player about the result
        - Update the scores
    - Inform the player about the overall result
  - Provide a button for replay

## Flowchart

![Algorithm flowchart](algorithm.drawio.png)
