let boxes = document.querySelectorAll('.box');
let reset= document.querySelector('#reset');
let newGameBtn=document.querySelector('#new-btn');
let msgcontainer = document.querySelector('.msg-container')
let msg=document.querySelector('#msg');
let playerO = document.querySelector('#playerO');
let playerX = document.querySelector('#playerX');

let turnO =true;
let count=0;
let playerO_wins=0;
let playerX_wins=0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
const resetGame= ()=> {
    turnO=true;
    count=0;
    enableBoxes();
    msgcontainer.classList.add('hide');
}

boxes.forEach((box) =>{ //taking input as x and o from players
    box.addEventListener('click',()=>{
        console.log('box was clicked')
        if(turnO){ //turn of playerO
            box.innerText='O';
            turnO=false;
        } else{ //turn of playerX
            box.innerText='X';
            turnO=true;
        }
        box.disabled=true;
        count++;
        let isWinner=checkWinner();
        if(count ===9 && !isWinner){
            drawCondition();
        }

    });
});
const drawCondition= ()=>{
        msg.innerText='Game was draw';
        msgcontainer.classList.remove('hide');
        disableBoxes();
    }

const disableBoxes= ()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes= ()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText='';
    }
}
const showWinner= (winner) => { //showing winner
    msg.innerText=`Congradulations,winner is ${winner}`;
    msgcontainer.classList.remove('hide');
    disableBoxes();
};
const checkWinner=()=>{ //checking the conditions for winner
    for(pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val!='' && pos2Val!='' && pos3Val!=''){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log('winner' , pos1Val);
                if(pos1Val==='O'){
                    playerO_wins+=1;
                }else{
                    playerX_wins+=1;
                }
                playerscore();
                showWinner(pos1Val);
                return true;
            }
        }
    }
};
const playerscore=()=>{
    playerO.innerText=`player_O=${playerO_wins}`;
    playerX.innerText=`player_X=${playerX_wins}`;
}

newGameBtn.addEventListener('click',resetGame);
reset.addEventListener('click',resetGame);