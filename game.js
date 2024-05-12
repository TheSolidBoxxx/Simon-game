const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var urTurn = false;

function nextSequence(){
    $("#level-title").text("Level "+ level);
    level++;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animateBtn_ai(randomChosenColour);

    urTurn = true;
}

function userInput(e){
    if(urTurn){
        var userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour);

        if(userChosenColour == gamePattern[userClickedPattern.length - 1]){
            animateBtn_user(userChosenColour);
            if(userClickedPattern.length == gamePattern.length){
                setTimeout(function(){
                    userClickedPattern = [];
                    urTurn = false;
                    nextSequence();
                }, 1000);
            }
        }else{
            level = 0;
            userClickedPattern = [];
            gamePattern = [];
            urTurn = false;

            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $("#level-title").text("Game Over, Press Any Key to Restart");

            $("body").addClass("game-over")
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);

            $(document).on("keydown", function(){
                $(document).off("keydown");
                nextSequence();
            });
        }
    }
}

function animateBtn_user(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    $("#" + color).addClass("pressed");

    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    }, 100);

    audio.play();
}

function animateBtn_ai(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    $("#" + color).animate({opacity: 0}, 100).animate({opacity: 1}, 100);

    audio.play();
}

$(".btn").on("click", userInput);
$(document).on("keydown", function(){
    $(document).off("keydown");
    nextSequence();
});