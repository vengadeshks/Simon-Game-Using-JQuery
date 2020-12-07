var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern=[];

var level =0;
var started = false;

$(document).keypress(function(){
  if (started === false){
      nextSequence();
      started = true;
  }
});


function nextSequence(){
  userClickedPattern=[];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// event listeners to detect click on the div buttons
$(".btn").click(function(){
  var userChosenColour= $(this).attr("id");
  userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if((userClickedPattern.length) === (gamePattern.length)){
          setTimeout(function(){
            nextSequence();
          },1000);
        }
    }
    else{
          var wrong = new Audio("sounds/wrong.mp3");
          wrong.play();
          $("body").addClass("game-over");
          setTimeout(function(){
            $("body").removeClass("game-over");
          },200);
          $("#level-title").text("Game Over, Press Any Key to Restart");
          startOver();
    }

}

// to play sound while pressing and game pattering
function playSound(sound){
  var audio = new Audio("sounds/"+sound+".mp3");
  audio.play();
}

// animation whille pressing key
function animatePress(currenColour){
  $("#"+currenColour).addClass("pressed");
  setTimeout(function(){
      $("#"+currenColour).removeClass("pressed");
  },100);
}
function startOver(){
  level=0;
  started = false;
  gamePattern=[];
}
