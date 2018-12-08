$(document).ready(function() {});
var id;
var whosTurn = 1;
var gameOver = 0;
var xOrO = "O";
var arr = [0,0,0,0,0,0,0,0,0]
var numPlayers = 0;
var human; 
var firstMove =0;
var cMove;
var counter = 0;
var computer;
function drawBoard(){
  var c=document.getElementById("myCanvas");
  var ctx=c.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(0,111);
  ctx.lineTo(333,111);
  ctx.moveTo(0,222);
  ctx.lineTo(333,222);
  ctx.moveTo(111,0);
  ctx.lineTo(111,333);
  ctx.moveTo(222,0);
  ctx.lineTo(222,333); 
  ctx.stroke();
}
drawBoard();
function whoGoes() {
  if (xOrO == "O"){
    if (numPlayers-1){$('.whosTurn').html('X\'s turn');}
    xOrO = "X";
  }
  else{
    
    if (numPlayers-1){$('.whosTurn').html('O\'s turn');}
    xOrO = "O";
  }
}
function twoPlayerGame(){
  whoGoes();
  $('button').on('click',function(){
    id = $(this).parent().attr('id').replace(/z/,'');
    $(this).parent().html(xOrO);
    id = Number(id);
    $(this).remove();
    arr[id] = xOrO;//put the x or o in the array
    console.log(arr);
    checkWin('X');
    checkWin('O');
    whoGoes();
    
  //$("whosTurn").html('<div class=\"playAgain\" X wins!<span></span><button>Click to play again...</button></div>');
  })
}  
//***************************************************************************************************************************

function onePlayerGame(){
  whosTurn = Math.floor(Math.random()*2);
  if (!whosTurn){
    $('.whosTurn').append('<div class = \'first\'>Human goes first!</div>')
    $('button').on('click',function(){
      counter++;
      id = $(this).parent().attr('id').replace(/z/,'');
      $(this).parent().html(human);
      id = Number(id);
      $(this).remove();
      arr[id] = xOrO;//put the x or o in the array
      if (!whosTurn){
        if (counter==1){
          firstHuman();
        }
        if (counter==2){
          secondHuman();
        }
        if (counter==3 || counter==4){
          finalHuman();
        }
        
      console.log('counter is:01: '+counter) ;
        if (counter==5){catsGame();}
      }
    })
  }
  else{
    cMove =2*(Math.floor(Math.random() * 4))
    arr[cMove]= computer;
    cMove = '#z'+cMove;
    $(cMove).html(computer);
    $('button').on('click',function(){
      counter++;
      id = $(this).parent().attr('id').replace(/z/,'');
      $(this).parent().html(human);
      id = Number(id);
      $(this).remove();
      arr[id] = xOrO;//put the x or o in the array
      if (counter==1){
        firstComputer();
      }
      else if (counter==2 || counter==3 || counter==4){
        finalHuman();
      }
      if (counter ==4){
        if (!checkWin(computer)){
          catsGame();
        }  
      }
    })  
  }
}
//***************************************************************
function firstComputer(){
  if(oppositeCorner(computer)){
    return;
  }
  else center();
  return;
}
function finalHuman(){
  checkWin(human);
  if (possibleWin(computer)){
    checkWin(computer);
    return;
  }
  if (possibleWin(human)){
    return;
  }
  if (createFork(xOrO)){
    return;
  }
  if (blockFork(xOrO)){
    return;
  }
  if (oppositeCorner(xOrO)){
    return;
  }
  if (emptyCorner()){
    return;
  }
  emptySide();
}
function secondHuman(){
  if(possibleWin(human)){
    return;
  }
  if (blockFork(xOrO)){
    return;
  }
  if (oppositeCorner(xOrO)){
    return;
  }
  opposingSides(xOrO);
  return;
}
function firstHuman(){
  if(id==8){
    cMove =2*(Math.floor(Math.random() * 4))
  }
  else{
    cMove = 8;
  }
  whoGoes();
  arr[cMove]= xOrO;
  cMove = 'z'+cMove;
  $('#'+cMove).html(xOrO);
  whoGoes();
}
function emptySide(){
  for (i=0;i<4;i++){
    if (!(arr[i*2+1])){
      arr[i*2+1]= computer;
      cMove = '#z'+(i*2+1);
      $(cMove).html(computer);
      console.log('empty side');
    }
  }
}
function emptyCorner(value){
  for (i=0;i<4;i++){
    if (!(arr[i*2])){
      arr[i*2]= computer;
      cMove = '#z'+(i*2);
      $(cMove).html(computer);
      console.log('empty corner');
      return(1);
    }
  }
  console.log('no empty corner');
  return(0);
}
function createFork(value){
  tempArr=[0,4,2,2,6,4,4,0,6,6,2,0];
  for(i=0;i<4;i++){
    if (arr[tempArr[i*3]]==value && arr[tempArr[(i*3)+1]]==value && !arr[tempArr[(i*3)+2]]){
      whoGoes();
      cMove = '#z'+tempArr[(i*3)+2];
      arr[tempArr[(i*3)+1]] = xOrO;
      $(cMove).html(xOrO);
      whoGoes();
      console.log('create fork');
      return(1);
    }
  }
  tempArr=[0,8,2,6,7,6,0,8,3,6,7,7,2,8,3,4,0,4,2,8,3,4,7,3,4,8,1,5,6,5,4,8,2,5,6,6,6,8,0,3,7,7,6,8,0,4,7,0,0,8,1,2,5,1,0,8,1,2,6,2,
           2,8,0,1,5,1,2,8,0,1,4,0,4,8,2,3,7,3,4,8,2,3,6,2,6,8,1,4,5,5,6,8,0,4,5,4];
  for (i=0;i<16;i++){
    if(tempArr[i*6] == computer && tempArr[i*6+1] == computer && !(tempArr[i*6+2]) && !(tempArr[i*6+3]) && !(tempArr[i*6+4])){
      whoGoes();
      cMove = '#z'+tempArr[i*6+5];
      arr[tempArr[(i*6)+5]] = computer;
      $(cMove).html(computer);
      whoGoes();
      console.log('create 2nd type of fork');
      return(1);
    }
  }
  console.log('no forks')
  return(0);
}
function oppositeCorner(value){
  console.log(arr+" "+value);
  var tempArr=[0,4,2,6,4,0,6,2]
  for (i=0;i<4;i++){
    if (arr[tempArr[i*2]]==value && !arr[tempArr[i*2+1]]){
      whoGoes();
      cMove = '#z'+tempArr[i*2+1];
      arr[tempArr[i*2+1]] = xOrO;
      $(cMove).html(xOrO);
      whoGoes();
      console.log('opp corner');
      return(1);
    }
  }
  console.log('no opp corner');
  return(0);
}
function opposingSides(value){
  whoGoes();
  arr[0] = xOrO;
  $('#z0').html(xOrO);
  whoGoes();
}
function center(){
  if (!arr[8]){
    whoGoes();
    arr[8] = computer;
    $('#z8').html(xOrO);
    whoGoes();
  }
}
function blockFork(value){
  if ((arr[0]==value && arr[4]==value)||(arr[2]==value && arr[6]==value)){
    whoGoes();
    do{
      cMove =2*(Math.floor(Math.random() * 4))+1;
    }
    while (arr[cMove]);
    arr[cMove]= xOrO;
    cMove = 'z'+cMove;
    $('#'+cMove).html(xOrO);
    whoGoes();
    console.log('blocked fork1');
    return(1);
  }
  console.log('no blocked fork1');
  tempArr=[1,3,3,5,5,7,7,1]
  for(i=0;i<4;i++){
    if (arr[tempArr[i*2]]==arr[tempArr[(i*2)+1]] && arr[tempArr[i*2]]==human & !(arr[tempArr[i*2]+1])){
      whoGoes();
      cMove = '#z'+(tempArr[i*2]+1);
      arr[tempArr[i*2]+1] = xOrO;
      $(cMove).html(xOrO);
      whoGoes();
      console.log('blocked fork2');
      return(1);
    }
  }
  console.log('no blocked fork2');
  return(0);
}
function checkWin(value){
  if ((arr[0]==value && arr[1]==value && arr[2]==value)||
     (arr[7]==value && arr[8]==value && arr[3]==value)||
     (arr[6]==value && arr[5]==value && arr[4]==value)||
     (arr[0]==value && arr[7]==value && arr[6]==value)||
     (arr[1]==value && arr[8]==value && arr[5]==value)||
     (arr[2]==value && arr[3]==value && arr[4]==value)||
     (arr[0]==value && arr[4]==value && arr[8]==value)||
     (arr[2]==value && arr[8]==value && arr[6]==value))
    {
      if (value == "X"){
        $("#whoWon").html('<div class = \"clicker\">X wins!<span></span><button class=\"playAgain\">Play again?</button></div>');
      }
      else {
        $("#whoWon").html('<div class = \"clicker\">O wins!<span></span><button class=\"playAgain\">Play again?</button></div>');
      }
      $("#whoWon").click(function(){
        window.history.go(0);
      })
    return(1);
    }
}
function possibleWin(value){
  var tempArr=[1,2,0,7,6,0,8,4,0,//check 4 corners
               0,1,2,3,4,2,6,8,2,
               6,5,4,0,8,4,2,3,4,
               0,7,6,2,8,6,4,5,6,
               0,2,1,5,8,1,//now check edges
               7,8,3,2,4,3,
               4,6,5,1,8,5,
               3,8,7,0,6,7,
               0,4,8,1,5,8,2,6,8,3,7,8]; //finally check middle
  for(i=0;i<tempArr.length/3;i++){
    
    if (arr[tempArr[i*3]]==value && arr[tempArr[i*3+1]]==value && arr[tempArr[i*3+2]]==0){
      whoGoes();
      cMove= "#z"+tempArr[i*3+2];
      arr[tempArr[i*3+2]] = xOrO;
      $(cMove).html(xOrO);
      whoGoes();
      console.log(tempArr[i*3]+ " "+tempArr[i*3+1]+ " "+tempArr[i*3+2]);
      console.log('possibleWin');
      console.log(arr);
      return(1);
    }
  }
  console.log('no poss win');
  return(0);
}
function catsGame(){
  $("#whoWon").html('<div class = \"clicker\">Cats game<span></span><button class=\"playAgain\">Play again?</button></div>');
  $("#whoWon").click(function(){
        window.history.go(0);
      })
}

$('button').on('click',function(){ //start of code...
  if (!numPlayers){
    numPlayers = $(this).attr('id').replace(/p/,'');
    numPlayers = Number(numPlayers);
    if (numPlayers==2){
      $(this).parent().remove();
      twoPlayerGame();
    }
    else{
      $(this).parent().html("<div>O\'s or X\'s: <span></span><button id=\"x1\">O\'s</button><span></span><button id= \"x2\">X\'s</button></div></>");
      $("#x1").click(function(){
        $(this).parent().remove();
        human = "O";
        computer = "X";
        xOrO = 'O';
        onePlayerGame();
      })
      $("#x2").click(function(){
        $(this).parent().remove();
        human = "X";
        computer = "O";
        xOrO = "X";
        onePlayerGame();
      })       
    }
  }
})