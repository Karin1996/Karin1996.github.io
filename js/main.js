let playerSelection;
let computerSelection;
let playerWins = false;
let playerCounter = 0;
let computerCounter = 0;
let draw = false;
let counter = 0;

// Disable reset button
document.getElementById("reset").disabled = true;

// Register event listeners
for(let i = 0; i < document.getElementsByClassName("choice").length; i++){
  document.getElementsByClassName("choice")[i].addEventListener("click", function(){
    playerSelection = this.value;
    SimulateMatch();
  });
}

/**
 * Increments match counter
 * Executes ComputerPlay
 * Executes PlayRound
 * Executes UpdateUI
 */
function SimulateMatch(){
  counter++;
  ComputerPlay();
  PlayRound();
  UpdateUI();
  if(counter == 5){
    EndGame();
  }
}

/**
 * Update the UI with the correct texts;
 */
function UpdateUI(){
  document.getElementById("playerChoice").innerHTML = "Player chose: " + playerSelection;
  document.getElementById("computerChoice").innerHTML = "Computer chose: " + computerSelection;
  document.getElementById("counter").innerHTML = "Current round: " + counter;
  
  if (playerWins == false && draw == true){
    document.getElementById("result").innerHTML = "It's a tie";
  }
  else if(playerWins == true){
    document.getElementById("result").innerHTML = "You win this round";
    playerCounter++;
  }
  else if(playerWins == false){
    document.getElementById("result").innerHTML = "Computer wins this round";
    computerCounter++;
  }
  else{
    document.getElementById("result").innerHTML = "-";
  }
}

/**
 * Computes a random option from ["Rock", "Paper", "Scissors"];
 */
function ComputerPlay(){
  const possibleThrows = ["Rock", "Paper", "Scissors"]; 
  let nr = Math.floor(Math.random() * possibleThrows.length);
  computerSelection = possibleThrows[nr];
}

/**
 * Simulates a round of rock-paper-scissors
 */
function PlayRound(){
  // Setup map
  let gameRules = new Map([
    ["Rock", "Scissors"], 
    ["Scissors" , "Paper"], 
    ["Paper" , "Rock"]
  ]);
 
  // Determine outcome
  if(playerSelection == computerSelection){
    playerWins = false;
    draw = true;
    return;
    }
  if(gameRules.get(playerSelection) === computerSelection){
    playerWins = true 
    }
   else{
     playerWins = false;
    }

  draw = false;
}

/**
 * Check who is the winner 
 * Executes ResetGame
 */
function EndGame(){
  if(playerCounter == computerCounter){
    document.getElementById("endResult").innerHTML = "It's a tie, no one won";
  }
  else if(playerCounter > computerCounter){
    document.getElementById("endResult").innerHTML = "You have won this match";
  }
  else{
    document.getElementById("endResult").innerHTML = "Computer has won this match";
  }
  
  for(let i = 0; i < document.getElementsByTagName("input").length; i++){
    document.getElementsByTagName("input")[i].disabled = true;
    document.getElementById("reset").disabled = false;
  }  
  
  document.getElementById("reset").addEventListener("click", function(){
    ResetGame();
  });
}

/**
 * Reset all variables and UI to default values
 */
function ResetGame(){
  playerSelection = undefined;
  computerSelection = undefined;
  playerWins = false;
  playerCounter = 0;
  computerCounter = 0;
  draw = false;
  counter = 0;
  
  for(let i = 0; i < document.getElementsByTagName("input").length; i++){
    document.getElementsByTagName("input")[i].disabled = false;
    document.getElementById("reset").disabled = true;
  }
  
  document.getElementById("playerChoice").innerHTML = "Player chose: - ";
  document.getElementById("computerChoice").innerHTML = "Computer chose: - " 
  document.getElementById("counter").innerHTML = "Current round: " + counter;
  document.getElementById("result").innerHTML = "-";
  document.getElementById("endResult").innerHTML = "";
}