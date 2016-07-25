//StarWars RPG
$(document).ready(function(){
  $('#main').hide();
  $().delay(50000);
  $('#main').fadeIn('slow');
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

  match : {},
  victory: false

}

// var htmlOutput = {
//   write : function(tag, msg){

//   },
// }

//TEST construction html objects based on fighters object
// function resetGame(fighters) {
//   $(".fighterBox").remove();


  for (f in fighters){
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
  }
// }
//Functions

function initializeGame() {
  game.player = "";
  game.bolPlayerChosen = false;
  game.enemy = "";
  game.bolEnemyChosen = false;
  game.match = {};
  resetGame();
};

function newEnemy (){
  game.enemy = "";
  game.bolEnemyChosen = false;
  game.over = false;
};


function setupMatch() {
  console.log("setup match");
};

function attack(f1, f2){

  var strF1 ="#" + f1;
  var strF2 ="#" + f2;

  var newHP = parseInt($(strF2).attr('hp')) - parseInt($(strF1).attr('ap'));
  $(strF2).attr('hp', newHP);
  console.log($(strF2).attr('hp'));

  var newAP = parseInt($(strF1).attr('ap')) + parseInt(game.apAdder);
  $(strF1).attr('ap', newAP);
  console.log("Your attack power is now " + $(strF1).attr('ap'));

};

function counterAttack (f1, f2){

  console.log("Your enemy has counter attacked");
  var strF1 ="#" + f1;
  var strF2 ="#" + f2;

  var newHP = parseInt($(strF1).attr('hp')) - parseInt($(strF2).attr('ap'));
  $(strF1).attr('hp', newHP);

  console.log ("Your new HP is " + $(strF1).attr('hp'));

}

// initializeGame(fighters);


//Listeners

$(".fighterBox").on("click", function(){
  var f = $(this).attr('id');

  if (game.bolPlayerChosen == false){
    game.player = f;
    game.bolPlayerChosen = true;
    game.apAdder = $(this).attr('ap');
    console.log(" You've chosen " + f);
    $("#battleGround").prepend($(this));
  } 

  else if (game.bolEnemyChosen == false){
    game.enemy = f;
    game.bolEnemyChosen = true;
    console.log(" Your enemy is " + f);
    $("#battleGround").append($(this));
  }
});



$("#attack").on("click", function(){

  if (game.bolEnemyChosen == false){
    console.log("choose an enemy");
  }

  else if (game.over == false && game.bolEnemyChosen ==false){
    console.log("You obliterated your enemy! Choose a new opponent.");
    
  } 

  // else if (parseInt($('#' + game.enemy).attr('hp')) < 0){
  //   console.log("match is over");
  //   game.over = true;

  //   $('#' + game.enemy).remove();
  //   newEnemy();


  // } 

  // else if ((parseInt($('#' + game.player).attr('hp')))< 0) {
  //   console.log("Critical hit. You lost the match");
  //   game.over = true;

  // }

  else if (game.bolPlayerChosen && game.bolEnemyChosen && game.over == false){
    attack(game.player, game.enemy);
    counterAttack(game.player, game.enemy);

    //Nested If statements
    if (parseInt($('#' + game.enemy).attr('hp')) < 0){
      console.log("match is over");
      $('#' + game.enemy).remove();
      newEnemy();


    } 

    else if ((parseInt($('#' + game.player).attr('hp')))< 0) {
      console.log("Critical hit. You lost the match");
      game.over = true;

    } //End Nested If statements
  } 
  
});

});

// }); //END document.ready()