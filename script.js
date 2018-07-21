//script.js

var playing = false;
var score;
var trialsLeft;
var action; //used for setInterval
var fruits = ['apple','banana','cherries','grapes','mango','orange', 'peach', 'pear', 'watermelon'];
var step;

$(function(){
    
    $("#startreset").click(function(){
        if(playing == true){
            //reload page
            location.reload();
        }else{
            //we are not playing but now starting to play
            playing=true;
            score=0;
            $("#scorevalue").text(score);
            trialsLeft=3;
            $("#trialsLeft").show();
            addHearts();
            
            //hide gameover of previous time if there
            $("#gameOver").hide();
            
            $("#startreset").text("Reset Game");
            //start sending the fruits
            startAction();
        }
        
    });
    
    function addHearts(){
        $("#trialsLeft").empty();
        for(i=0; i<trialsLeft; i++){
            $("#trialsLeft").append("<img src='images/heart.png' class='life'>");
        }
    }
    
    function startAction(){
        //generate a fruit
        $("#fruit1").css("display","block");
        chooseFruit();
        $("#fruit1").css({
            'left': Math.round(550*Math.random()),
            'top': '-50px',
        });
        step = 1 + Math.round(Math.random() * 5);
        action = setInterval(function(){
            $("#fruit1").css("top", $("#fruit1").position().top + step);
            if($("#fruit1").position().top > $("#fruitsContainer").height()){
                if(trialsLeft > 1){
                    //generate a fruit and decrease the life
                    $("#fruit1").show();
                    chooseFruit();
                    
                    $("#fruit1").css({
                        'left': Math.round(550*Math.random()),
                        'top': '-50px',
                    });
                    
                    step = 1+ Math.round(Math.random()*5);
                    trialsLeft--;
                    addHearts();
                }else{
                    //game is over just get lost
                    playing=false;
                    $("#startreset").text("Start Game");
                    $("#gameOver").show();
                    $("#gameOver").html("<p>Game Over!</p><p>Your score is:"+score+"</p>");
                    $("#trialsLeft").hide();
                    $("#score").hide();
                    $("#fruit1").hide();
                    stopAction();
                }
            }
        }, 10);
    }
    
    function chooseFruit(){
        $("#fruit1").attr("src","images/" +fruits[Math.round(8*Math.random())] +".png");
    }
    
    function stopAction(){
        clearInterval(action);
    }
    
    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").text(score);
//        document.getElementById("slicesound").play();
        $("#slicesound")[0].play();
        
        //stop moving fruit
        stopAction();
        $("#fruit1").hide("explode", 200);
//        startAction(); nahi chalegaa
        setTimeout(startAction, 500);
        
    });
});