//StarWars RPG

// $( document ).ready(function() {

//Data
var fighters = {
  fighter1 : {
    hp : 120,
    attackPower: 8,
    counterAttackPower: 16
  },

  fighter2 : {
    hp : 100,
    attackPower: 5,
    counterAttackPower: 5
  },

  fighter3 : {
    hp : 150,
    attackPower: 20,
    counterAttackPower: 20
  },

  fighter4 : {
    hp : 180,
    attackPower: 25,
    counterAttackPower: 25
  }
};

var game = {
  player : "",
  playerChosen : false,

  enemy : "",
  enemyChosen : false,

  gameOver : false,

  match : Object.assign(fighters)

}

//Functions

function intializeGame() {
  game.player = "";
  game.playerChosen = false;
  game.enemy = "";
  game.enemyChosen = false;
};

function setupMatch() {
  console.log("setup match");
};

function attack(f1, f2){
  console.log(fighters[f2].hp);
  console.log(f1 + " has attacked " + f2);
  fighters[f2].hp -= fighters[f1].attackPower;
  console.log(fighters[f2].hp);
  // fighters.f1.attackPower += fighters.f1.attackPower;
  // console.log("");

};


function newEnemy (){
  game.enemy = "";
  game.enemyChosen = false;
};



//Listeners

$(".fighterBox").on("click", function(){
  var f = $(this).attr('value');

  if (game.playerChosen == false){
    game.player = f;
    game.playerChosen = true;
    console.log(" You've chosen " + f);
  } 

  else if (game.enemyChosen == false){
    game.enemy = f;
    game.enemyChosen = true;
    console.log(" Your enemy is " + f);
  }



});

$("#attack").on("click", function(){
  if (game.playerChosen && game.enemyChosen){
    attack(game.player, game.enemy);
  };
  
});



// }); //END document.ready()