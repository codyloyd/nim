var gameboard;
function startGame(){
  gameboard = {
    "a": 5,
    "b": 5,
    "c": 5
  }
  $(".instructions").html(
    "<h2>how to play</h2>" +
    "<p> Players take turns taking any number of objects from one of the piles. Whoever takes the last of the objects wins!</p>" +
    "<p>click one of the piles and enter the number of objects you would like to remove.</p>"
  )
}

function removeMarkers(args){
  var pile = args.pile
  var amount = args.amount
  gameboard[pile] -= amount
  // console.log(gameboard)
}

function userTurn(pile, message="how many?"){
  var amount = prompt(message)
  if (gameboard[pile] >= amount && amount > 0){
    removeMarkers({"pile": pile, "amount": amount})
  } else {
    userTurn(pile,"that wasn't a valid amount: TRY AGAIN")
  }
}

function computerTurn(){
  var pile = ["a","b","c"][parseInt(Math.random() * 3)]
  if (gameboard[pile] > 0) {
    var amount = parseInt(Math.random() * gameboard[pile] + 1)
    removeMarkers({"pile": pile, "amount": amount})
  } else {
    computerTurn()
  }
}

function isGameOver() {
  if(gameboard.a == 0 && 
     gameboard.b == 0 && 
     gameboard.c == 0){
    return true
  }
  return false
}

function takeTurn(pile){
  if (currentPlayer == 0 ) {
    userTurn(pile)
    currentPlayer = 1
  } else {
    computerTurn()
    currentPlayer = 0
  }
}

function winner(){
  if (currentPlayer == 1){
    return "COMPUTER"
  } else {
    return "HUMAN"
  }
}

function renderGameboard(){
  $(".grid > .circle-container").empty()
  //append grid-a
  var letters = ["a","b","c","d","e"]
  for (var i = 0; i < gameboard.a; i++) {
    $("#grid-a > .circle-container").append('<div class="marker ' + letters[i] + '"></div>')
  }
  letters = ["b","d","c","a","e"]
  for (var i = 0; i < gameboard.b; i++) {
    $("#grid-b > .circle-container").append('<div class="marker ' + letters[i] + '"></div>')
  }
  letters = ["e","c","d","a","b"]
  for (var i = 0; i < gameboard.c; i++) {
    $("#grid-c > .circle-container").append('<div class="marker ' + letters[i] + '"></div>')
  }
  //append grid-b
  //append grid-c
  
}
function gameOverAlert(){
  $(".instructions").html(
    "<h2>Game Over!</h2>" +
    "<p>The winner is " + winner() + "</p>" +
    "<button class='restart'>Play Again?</button>"
    )
  $(".restart").click(function(){
    startGame()
    renderGameboard()
  })
}

var currentPlayer = 0

$(document).ready(function(){
  startGame()
  renderGameboard()
  $(".game").click(function(e){
    var pile = $(this).attr("id")[5]
    takeTurn(pile)
    renderGameboard()
    if (isGameOver()) {
      gameOverAlert()
    }
    takeTurn(pile)
    renderGameboard()
    if (isGameOver()) {
      gameOverAlert()
    }
  })
})

