//StarWars RPG

// $( document ).ready(function() {

//Data

var imagesDir = "assets/images/";

var fighters = {
  fighter1 : {
    hp : 120,
    attackPower: 8,
    counterAttackPower: 16,
    name: "Rayman",
    picture: "rayman.jpg"
  },

  fighter2 : {
    hp : 100,
    attackPower: 5,
    counterAttackPower: 5,
    name: "Globox",
    picture: "globox.jpg"
  },

  fighter3 : {
    hp : 150,
    attackPower: 20,
    counterAttackPower: 20,
    name: "Admiral Razorbeard",
    picture: "az.jpg"
  },

  fighter4 : {
    hp : 180,
    attackPower: 25,
    counterAttackPower: 25,
    name: "Polokus",
    picture: "polokus.jpg"
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

  match : {}

}

//TEST construction html objects based on fighters object
for (f in fighters){
  var newFighter = $('<div>');
  newFighter.addClass("fighterBox");
  newFighter.attr('value', fighters[f].name.toLowerCase())
  newFighter.attr('hp',fighters[f].hp);
  newFighter.attr('ap', fighters[f].attackPower);
  newFighter.attr('cap', fighters[f].counterAttackPower);
  newFighter.attr('id', f);

  $("#fighterSelection").append(newFighter);
}
//Functions

function intializeGame() {
  game.player = "";
  game.bolPlayerChosen = false;
  game.enemy = "";
  game.bolEnemyChosen = false;
  game.match = {};
};

function setupMatch() {
  console.log("setup match");
};

function attack(f1, f2){

  var strF1 ="#" + f1;
  var strF2 ="#" + f2;

  var newHP = parseInt($(strF2).attr('hp')) - parseInt($(strF1).attr('ap'));
  $(strF2).attr('hp', newHP);

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

}

function newEnemy (){
  game.enemy = "";
  game.bolEnemyChosen = false;
};



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
  if (game.over == true){
    console.log("You obliterated your enemy! Choose a new opponent.");
    newEnemy();
  } 

  else if (fighters[game.enemy].hp < 0){
    console.log("match is over");
    game.over = true;

  } 

  else if (game.bolPlayerChosen && game.bolEnemyChosen && game.over == false){
    attack(game.player, game.enemy);
    counterAttack(game.player, game.enemy);
  } 
  
});



// }); //END document.ready()