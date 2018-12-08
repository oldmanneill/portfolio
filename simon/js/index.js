$(document).ready(function() {
    
  });
var red = "#800000";
var redLit = "#ff6666";
var green = "#008000";
var greenLit = "#66ff66";
var blue = "#000080";
var blueLit= "#6666ff";
var yellow = "#808000";
var yellowLit = "#ffff66";
var random;
var arr=[];
var number=0;
var userNumber=0;
var fail = 0;
var success;
var gameOn=0;
var counter=1;
var strictModeLight =0;
var timeOutFunction;
var horn =0;
var sounds = [new Audio('http://oldmanneill.com/wp-content/uploads/2018/04/red.mp3'), new Audio('http://oldmanneill.com/wp-content/uploads/2018/04/yellow.mp3'), new Audio('http://oldmanneill.com/wp-content/uploads/2018/04/green.mp3'), new Audio('http://oldmanneill.com/wp-content/uploads/2018/04/blue.mp3'), new Audio('http://oldmanneill.com/wp-content/uploads/2017/10/Sad_Trombone.mp3'), new Audio('http://oldmanneill.com/wp-content/uploads/2017/10/winning-trumpet.mp3')];
c =document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
ctx.arc(250,250,240,0,2*Math.PI);//outer circle
ctx.fillStyle = "black";
ctx.fill();
ctx.stroke();
ctx.beginPath();
ctx.arc(250,250,110,0,2*Math.PI);
ctx.fillStyle="silver";
ctx.fill();
ctx.stroke();
redButton(red);
greenButton(green);
blueButton(blue);
yellowButton(yellow);
document.getElementById("onSwitch").addEventListener("click", turnOnGame);
function turnOnGame(){
  if (!gameOn){
    gameOn = 1;
    $('#onSwitch').html('<div id=\"on\"></div>');
    $('#countNumbers').html('--');
    document.getElementById("start").addEventListener("click", startGame);
    document.getElementById("strict").addEventListener("click", strictMode);
  }
  else {
    $('#onSwitch').html('<div id=\"off\"></div>');
    $('#countNumbers').html("");
    $("#strictLight").css('background-color','#33331a');
    strictModeLight = 0;
    document.getElementById("start").removeEventListener("click", startGame);
    document.getElementById("strict").removeEventListener("click", strictMode);
    document.getElementById("myCanvas").removeEventListener("click", mousePosition);

    
    gameOn = 0;
  }
}
function strictMode(){
  console.log(strictModeLight);
  if (!strictModeLight){
    $("#strictLight").css('background-color','red');
    strictModeLight = 1;
  }
  else{
    $("#strictLight").css('background-color','#33331a');
    strictModeLight = 0;

  }
}
function startGame(){
  userNumber=0;
  fail = 0;
  arr=[];
  counter=1;
  number=0;
  $('#countNumbers').html("");
  setTimeout(function(){
    $('#countNumbers').html("--");
      },300);
  setTimeout(function(){
    $('#countNumbers').html("");
    },600);
  setTimeout(function(){
    $('#countNumbers').html("--");
    },900);
  setTimeout(function(){
    $('#countNumbers').html("");
    },1200);
  setTimeout(function(){
    $('#countNumbers').html("1");
    },1500);
  starter=1500;
  pushRandom();
  blinkingEngine(arr);
}
function pushRandom(){
  random = Math.floor(Math.random()*4);
  arr.push(random*2,random*2+1);
}
function blinkingEngine(arrayGet){ 
  document.getElementById("myCanvas").removeEventListener("click", mousePosition);
    if (fail != 1 || horn == 1){
      fail=0;
      horn =0;
      setTimeout(function(){
        document.getElementById("myCanvas").addEventListener("click", mousePosition);
      },425*arrayGet.length);
    }
  if (arrayGet.length>2){ 
    counter++;
    $('#countNumbers').html(counter);
  }
  number++;
  if (number>1){
    starter=0;
  }
  for (i=0;i<arrayGet.length;i++){
    (function(i){
        setTimeout(function(){
        switch (arrayGet[i]){
          case 0:
            redButton(redLit);
            sounds[0].play();
            break;
          case 1:
            redButton(red);
            break;
          case 2:
            greenButton(greenLit);
            sounds[1].play();
            break;
          case 3:
            greenButton(green);
            break;
          case 4:
            yellowButton(yellowLit);
            sounds[2].play();
            break;
          case 5:
            yellowButton(yellow);
            break;
          case 6: 
            blueButton(blueLit);
            sounds[3].play();
            break;
          case 7:
            blueButton(blue);
            break;
        }
      },(i*500)+starter);
      
    })
    (i);
  }
}
function redButton(color){
  ctx.beginPath();
  ctx.arc(250,250,220,2*(Math.PI)-.1,(3*(Math.PI)/2)+.1,1);//1st quadrent outer button arc
  ctx.lineTo(270,122);
  ctx.arc(250,250,130,(3*(Math.PI)/2)+.15,2*(Math.PI)-.15);//1st quadrent inner button arc
  ctx.lineTo(470,230);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}
function blueButton(color){
  ctx.beginPath();
  ctx.arc(250,250,220,0+.1,((Math.PI)/2)-.1);//4th quadrent outer button arc
  ctx.lineTo(270,377);
  ctx.arc(250,250,130,((Math.PI)/2)-.15,.15,1);//4th quadrent inner button arc
  ctx.lineTo(470,270);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}
function yellowButton(color){
  ctx.beginPath();
  ctx.arc(250,250,220,((Math.PI)/2)+.1,(Math.PI)-.1);//3rd quadrent outer button arc
  ctx.lineTo(122,270);
  ctx.arc(250,250,130,(Math.PI)-.15,((Math.PI)/2)+.15,1);//3rd quadrent inner button arc
  ctx.lineTo(230,470);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();           
}
function greenButton(color){
  ctx.beginPath();
  ctx.moveTo(30,230);//2nd quadrent start
  ctx.arc(250,250,220,(Math.PI)+.1,(3*(Math.PI)/2)-.1);//2nd quadrent outer button arc
  ctx.lineTo(230,122);
  ctx.arc(250,250,130,(3*(Math.PI)/2)-.15,(Math.PI)+.15,1);//2nd quadrent inner button arc
  ctx.lineTo(30,230);
  ctx.fillStyle = color
  ctx.fill();
  ctx.stroke();
}
function mousePosition(event) {
  xCoo = event.clientX-10;
  yCoo = event.clientY-10;
  if (xCoo > -yCoo+190 && yCoo <231 && xCoo<231 && xCoo>29 && yCoo>29 && xCoo < -yCoo+350){
    if (arr[userNumber*2]==2){
      success=1;
      userNumber++;     
      blinkingEngine([2,3]);//green
    }
    else {
      fail=1;
      blinkingEngine([2,3]);//green
    }
  }
  if (xCoo < yCoo+310 && yCoo <231 && xCoo>269 && xCoo<471 && yCoo>29 && xCoo > yCoo+150){
    if (arr[userNumber*2]==0){
      success=1;
      userNumber++;
      blinkingEngine([0,1]);//red
    }
    else {
      fail=1;
      blinkingEngine([0,1]);//red
    }
      
  }
  if (yCoo < xCoo+310 && yCoo >269 && xCoo<231 && xCoo>29 && yCoo<471 && yCoo > xCoo+150){
    if (arr[userNumber*2]==4){
      success=1;
      userNumber++;
      blinkingEngine([4,5]);//yellow
    }
    else {
      fail=1;
      blinkingEngine([4,5]);//yellow
    }
  }
  if (yCoo < -xCoo+810 && yCoo >269 && xCoo>269 && xCoo<471 && yCoo<471 && yCoo > -xCoo+650){
    if (arr[userNumber*2]==6){
      success=1;
      userNumber++;
      blinkingEngine([6,7]);//blue
    }
    else {
      fail=1;
      blinkingEngine([6,7]);//blue
    }
  }
  
  if (fail){
    //document.getElementById("myCanvas").removeEventListener("click", mousePosition);
    setTimeout(function(){
      sounds[4].play();  
    },500);
    setTimeout(function(){
      if (strictModeLight){
        startGame();
      }
      else{
        counter--;
        userNumber = 0;
        horn = 1;
        blinkingEngine(arr);
      }
    },3500);
  }
  if(success){
    if (counter != 20){
      success=0;
      if (arr.length/2 ===userNumber){
        pushRandom();
        setTimeout(function(){
          blinkingEngine(arr);
        },1300);
        userNumber=0;
      }
    }
    else if (counter==20 && arr.length/2 ===userNumber){
      setTimeout(function(){
         $('#countNumbers').html('WIN!');
         sounds[5].play();                        
        },1500);
      setTimeout(function(){
         startGame();                        
        },4000); 
    }
  }
}