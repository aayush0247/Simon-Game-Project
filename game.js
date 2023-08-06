var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var patternLength;
var count;

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 50);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[count]){
        return true;
    }
    else{
        return false;
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence(){
    userClickedPattern = [];
    level = level + 1;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    $("#"+randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    gamePattern.push(randomChosenColor);
    patternLength = gamePattern.length;
    count = 0;
}

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
    if($("#level-title").text() === "Game Over, Press Any Key to Restart"){
        $("#level-title").text("Press A Key to Start");
        startOver();
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    if(checkAnswer(userClickedPattern.length - 1) === true){
        if(count === patternLength - 1){
            setTimeout(function(){
                nextSequence(); 
            }, 1000);
        }
        else{
            count++;
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
});

// Different approach:

// var buttonColors = ["red", "green", "blue", "yellow"];
// var gamePattern = [];
// var userClickedPattern = [];
// var level = 0;
// var started = false;
// var patternLength;
// var count;
// var firstClick = false;
// var start = 0;

// function playSound(name){
//     var audio = new Audio("sounds/" + name + ".mp3");
//     audio.play();
// }

// function animatePress(currentColor){
//     $("#" + currentColor).addClass("pressed");
//     setTimeout(function(){
//         $("#" + currentColor).removeClass("pressed");
//     }, 50);
// }

// function nextSequence(){
//     level = level + 1;
//     $("#level-title").text("Level " + level);
//     var randomNumber = Math.floor(Math.random()*4);
//     var randomChosenColor = buttonColors[randomNumber];
//     $("#" + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
//     playSound(randomChosenColor);
//     animatePress(randomChosenColor);
//     gamePattern.push(randomChosenColor);
//     patternLength = gamePattern.length;
//     count = 0;
//     firstClick = false;
// }

// $(document).keydown(function(){
//     if(!started){
//         $("#level-title").text("Level " + level);
//         nextSequence();
//         started = true;
//     }
// });

// $(".btn").click(function(){
//     if(count != patternLength - 1){
//         var userChosenColor = $(this).attr("id");
//         playSound(userChosenColor);
//         animatePress(userChosenColor);
//         userClickedPattern.push(userChosenColor);
//         if(!firstClick){
//             start = userClickedPattern.length - 1;
//             firstClick = true;
//         }
//         if(userClickedPattern[start + count] === gamePattern[count]){
//             count++;
//         }
//         else{
//             alert("Better luck next time.")
//         }
//     }
//     else if(count === patternLength - 1){
//         var userChosenColor = $(this).attr("id");
//         playSound(userChosenColor);
//         animatePress(userChosenColor);
//         userClickedPattern.push(userChosenColor);
//         if(userClickedPattern[start + count] === gamePattern[count]){
//             setTimeout(function(){
//                 nextSequence();
//             }, 1000);
//         }
//         else{
//             alert("Better luck next time.")
//         }
//     }
// });









