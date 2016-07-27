//Rayman RPG
$(document).ready(function(){
  $('main').hide();
  var fade = $('main').fadeIn(3000);
// });
//Data

var imagesDir = "assets/images/";

var fighters = {
  fighter1 : {
    hp : 120,
    attackPower: 8,
    counterAttackPower: 16,
    name: "Rayman",
    picture: "rayman.png"
  },

  fighter2 : {
    hp : 100,
    attackPower: 5,
    counterAttackPower: 5,
    name: "Globox",
    picture: "globox.png"
  },

  fighter3 : {
    hp : 150,
    attackPower: 20,
    counterAttackPower: 20,
    name: "Betilla",
    picture: "betilla.png"
  },

  fighter4 : {
    hp : 180,
    attackPower: 25,
    counterAttackPower: 25,
    name: "Polokus",
    picture: "polokus.png"
  }
};

var game = {
  player : "",
  bolPlayerChosen : false,
  apAdder: 0,

  enemy : "",
  bolEnemyChosen : false,

  inProgress: false,
  over : false,

  victory: false,

  numEnemiesLeft: -1,

  write: function(i, msg){

    $(i).html(msg);
  },

  output :  $('#output')

}

// var htmlOutput = {
//   write : function(tag, msg){

//   },
// }

//TEST construction html objects based on fighters object
function resetGame() {
  $(".fighterBox").remove();

  for (f in fighters){
    game.numEnemiesLeft++;

    var newFighter = $('<div>');
    newFighter.addClass("fighterBox");
    newFighter.attr('value', fighters[f].name.toLowerCase())
    newFighter.attr('hp',fighters[f].hp);
    newFighter.attr('ap', fighters[f].attackPower);
    newFighter.attr('cap', fighters[f].counterAttackPower);
    newFighter.attr('id', f);

    var backImg = $('<img>');
    backImg.addClass("bi");
    backImg.attr("src", imagesDir + fighters[f].picture);

    newFighter.append(backImg);

    var fighterName = $('<span>');
    fighterName.addClass('fighterSpecs');
    fighterName.append(fighters[f].name);

    newFighter.append(fighterName);

    var fighterHP = $('<span>');
    fighterHP.addClass('hp');
    fighterHP.attr('id', "hp-" + f);
    fighterHP.append("HP: " + fighters[f].hp);

    newFighter.append(fighterHP);

    $("#fighterSelection").append(newFighter);
    $('#output').html('');
  }
}

// resetGame();
//Functions


function initializeGame() {
  game.over = false;
  game.player = "";
  game.bolPlayerChosen = false;
  game.enemy = "";
  game.bolEnemyChosen = false;
  resetGame();
};

initializeGame();
console.log("Enemies: " + game.numEnemiesLeft);

function newEnemy (){
  if (game.numEnemiesLeft < 1){
    game.write('#output', "Congratulations, you beat all your opponents!");
    $('#output').css('color', '#c30700');
    $('#output').css('font-size', '24px');

    $('#output').fadeOut(500).fadeIn(1000);
    btnNewGame();

  } else {
      game.enemy = "";
      game.bolEnemyChosen = false;
      game.over = false;
      setTimeout(msgChooseEnemy, 2000);
    }
};

function attack(f1, f2){

  var strF1 ="#" + f1;
  var strF2 ="#" + f2;

  var newHP = parseInt($(strF2).attr('hp')) - parseInt($(strF1).attr('ap'));
  $(strF2).attr('hp', newHP);
  game.write($(strF2).attr('hp'));

  var newAP = parseInt($(strF1).attr('ap')) + parseInt(game.apAdder);
  $(strF1).attr('ap', newAP);
  game.write("#hp-" + f2, "HP: " + $(strF1).attr('hp'));

};

function counterAttack (f1, f2){

  var strF1 ="#" + f1;
  var strF2 ="#" + f2;

  var newHP = parseInt($(strF1).attr('hp')) - parseInt($(strF2).attr('ap'));
  $(strF1).attr('hp', newHP);

  game.write("#hp-" + f1, "HP: " + $(strF1).attr('hp'));

}

function btnNewGame(){
  var newButton = $('<button>');
  newButton.click(function(){
    // initializeGame();
    location.reload();
  });
  $('#attack').remove();
  newButton.html("Restart game");
  $('#matchControls').append(newButton);
}

function cleanDOM () {
  $("#battleGround").attr("display", "inline-block");
  $('header').fadeOut('slow');
  $('main').animate({marginTop: '+=10px'}, 'slow');
}


function msgChooseEnemy () {
  game.write('#output', "Choose an enemy");
  $('#output').fadeOut(500).fadeIn(1000);
  $('#fighterSelection').css('opacity', '1');
  $('#fighterSelection').fadeOut(500).fadeIn(1000);
}

function msgFeedbackEn () {
  $('#output').fadeOut(1000);
  game.write('#output', " Your enemy is " + fighters[f].name);
  $("#battleGround").append($(this));
  $('#attack').css('display', 'inline-block');
  $('#output').fadeIn(1000);
}

function msgYouWon(){
  game.write("#output","You won!");
}
// initializeGame(fighters);


//Listeners

$(".fighterBox").on("click", function(){
  f = $(this).attr('id');

  if (game.bolPlayerChosen == false){
    game.player = f;
    game.bolPlayerChosen = true;
    game.apAdder = $(this).attr('ap');
    $("#battleGround").prepend($(this));
    cleanDOM();
    msgChooseEnemy();

  } 
  else if (f == game.player && game.bolEnemyChosen == false){
    msgChooseEnemy();
  }


  else if (game.bolEnemyChosen == false){
    game.enemy = f;
    game.bolEnemyChosen = true;
    game.numEnemiesLeft--;
    console.log("Enemies: " + game.numEnemiesLeft);
    // msgFeedbackEn();
    game.write('#output', " Your enemy is " + fighters[f].name);
    $("#battleGround").append($(this));
    $('#attack').css('display', 'inline-block');

    $('#fighterSelection').css('opacity', '0.3');
    
  }
});



$("#attack").on("click", function(){

  if (game.bolEnemyChosen == false && game.bolPlayerChosen == true){
    msgChooseEnemy();
  }

  else if (game.over == false && game.bolEnemyChosen ==false && game.bolPlayerChosen == true){
    game.write('#ouput', "You obliterated your enemy! Choose a new opponent.");
    
  } 

  else if (game.bolPlayerChosen && game.bolEnemyChosen && game.over == false){
    attack(game.player, game.enemy);
    counterAttack(game.player, game.enemy);

    e = $('#' + game.enemy)

    var msg = "Your attack power is " + $('#' + game.player).attr('ap');
    msg += "<br>";
    msg += fighters[game.enemy].name + " attacked you for " + e.attr('cap') + " damage";
    game.write("#output", msg);


    //Nested If statements
    if (parseInt($('#' + game.enemy).attr('hp')) < 0){
      game.output.html("Match is over");
      setTimeout(msgYouWon, 1000);
      $('#' + game.enemy).remove();
      setTimeout(newEnemy, 1000);
      


    } 

    else if ((parseInt($('#' + game.player).attr('hp')))< 0) {
      game.output.html("Critical hit. You lost the match");
      btnNewGame();
      game.over = true;

    } //End Nested If statements

  } 

  
  
});

});

// }); //END document.ready()