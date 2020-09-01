var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

document.addEventListener("keypress", function(event) {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence(event.key);
    started = true;

  }
});
$("button").click(function(event) {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence(event);
    started = true;
  }
});

// user sequence
$(".btn").click(function(event) {
  console.log(event.target.id);
  var userChosenColor = event.target.id;
  playSound(userChosenColor);
  animatePress(userChosenColor);
//  var answer = buttonColors.indexOf(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
 // comparing section
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("failure");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game over ..Press any key to continue ");
    playSound("wrong");
    startOver();
  }


}


// Game sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var res = Math.random();
  var randomNumber = Math.floor((res * 4));
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var id = "#" + randomChosenColor;
  $(id).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// sound section
function playSound(name) {
  switch (name) {
    case "red":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;
    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
    case "green":
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;
    case "wrong":
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      break;

    default:
  }
}

function animatePress(currentColor) {
  var animateColor = "#" + currentColor;
  $(animateColor).addClass("pressed");
  setTimeout(function() {
    $(animateColor).removeClass("pressed");
  }, 100);

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
