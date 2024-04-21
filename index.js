const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const resetButton = document.querySelector("#restartButton");

const win=[
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6],
];

let options = ["","","","","","","","",""];
let currPlayer = "X";
let running = false;

initialize();

function initialize(){
    for(var i=0;i<cells.length;i++){
        cells[i].addEventListener("click",cellClicked);
    }
    resetButton.addEventListener("click",reset);
    statusText.textContent=currPlayer+"'s turn";
    running=true;
}
function cellClicked(){
    const cellindex = this.getAttribute("cellIndex");
    if(options[cellindex]!="" || !running){
        return;
    }else{
        options[cellindex]=currPlayer;
        this.textContent=currPlayer;
        checkWinner();
    }
}
function changePlayer(){
    if(currPlayer=="X"){
        currPlayer="O";
    }else{
        currPlayer="X";
    }
    statusText.textContent=currPlayer+"'s turn";
}
function checkWinner(){
    let roundWon = false;

    for(var i=0;i<win.length;i++){
        var a = options[win[i][0]];
        var b = options[win[i][1]];
        var c = options[win[i][2]];
        
        if(a=="" || b=="" || c==""){
            continue;
        }
        if(a==b && b==c){
            cells[win[i][0]].classList.add("won");
            cells[win[i][1]].classList.add("won");
            cells[win[i][2]].classList.add("won");
            roundWon=true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent=a+" Won ✌🏻";
        running = false;
    }else if(!options.includes("")){
        statusText.textContent="Draw!";
        running = false;
    }else{
        changePlayer();
    }
}
function reset(){
    currPlayer = "X";
    statusText.textContent = currPlayer+"'s turn";
    options = ["","","","","","","","",""];
    for(var i=0;i<cells.length;i++){
        cells[i].textContent="";
        cells[i].classList.remove("won");
    }
    running = true;
}
