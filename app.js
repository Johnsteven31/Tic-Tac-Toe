const tac = document.querySelectorAll(".tac"); 
const statusText = document.querySelector("#statusText");
const restartBttn = document.querySelector("#restartBttn"); 
const winConditions  = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let options = ["", "", "", "", "", "", "", "", ""]; 

let currentPlayer = "X"
let running = true;

initializeGame();

function initializeGame() {
    tac.forEach (tac => tac.addEventListener("click", tacClicked))
    restartBttn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn` ; 
}
 function tacClicked (){
    const tacIndex = this.getAttribute ("tacIndex"); 

    if (options[tacIndex] != "" || !running){
        return; 
    }

    updateTac(this, tacIndex); 
    checkWinner ();
 }

 function updateTac(tac, index){
    options[index] = currentPlayer; 
    tac.textContent = currentPlayer;
 }

 function changePlayer (){
    currentPlayer = (currentPlayer == "X") ? "O" : "X"; 
    statusText.textContent = `${currentPlayer}'s turn`; 
 }
 function checkWinner(){
    let roundWon = false; 

    for (let i = 0; i < winConditions.length; i++){
        const condition = winConditions [i]; 
        const tacA = options [condition[0]];
        const tacB = options [condition[1]];
        const tacC = options [condition[2]];

        if(tacA == ""|| tacB == ""|| tacC == ""){
            continue; 
        }
        if (tacA == tacB && tacB == tacC) {
            roundWon = true; 
            break;
        }
    }

    if (roundWon){
        statusText.textContent = `${currentPlayer} Wins!`; 
        running = false; 
    }
    else if (!options.includes("")){
        statusText.textContent = `${currentPlayer} Draw!`; 
        running = false; 
    }
    else {
        changePlayer();
    }
 }

 function restartGame (){
    currentPlayer = "X"
    options = ["", "", "", "", "", "", "", "", ""]; 
    statusText.textContent =  `${currentPlayer}'s turn`; 
    tac.forEach(tac => tac.textContent = "");
    running = true;
 }