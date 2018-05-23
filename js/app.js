// Cards and deck variables
let deck = document.querySelector(".deck");
let card = document.querySelectorAll(".card");
let cards = Array.from(card); // Array which hold all cards
let openedCards = []; // Array that holds open cards
let open = document.getElementsByClassName("open");
let match = document.getElementsByClassName("match");
let show = document.getElementsByClassName("show");
let matchArray = [];
let matchedCards = 0;

let modal = document.querySelector(".modal");
let close = document.getElementById("close");
let play = document.querySelector(".play");

let moves = 0;

//  Timer
let timer = document.getElementById("timer");
let min = 0;
let sec = 0;
let time;

let restart = document.querySelector(".restart");

let starOne = document.querySelector(".starOne");

let starTwo = document.querySelector(".starTwo");

let starThree = document.querySelector(".starThree");

let stars;

let content = document.querySelector(".content");


// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(cards) {
  var currentIndex = cards.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
  return cards;
}

//Start the game
function startGame() {
  //Reset the timer and moves
  min = 0;
  sec = 0;
  timer.innerHTML = min + ":" + sec;
  moves = 0;
  document.querySelector(".moves").innerHTML = moves;
  //Reset the stars
  starOne.style.display = "inline";
  starTwo.style.display = "inline";
  starThree.style.display = "inline";

  //Shuffle deck
  let shuffledCards = shuffle(cards);
  for (let i = 0; i < card.length; i++) {
    deck.innerHTML = "";
    for (let card of cards) {
      deck.appendChild(card);
      card.classList.remove("open", "match", "show");
    }
  }
}

//Loop through cards and append to deck
for (let card of cards) {
  card.addEventListener("click", flip);
}

//Flip each card
function flip(event) {
  if (openedCards.length < 2) {
    event.target.classList.add("open", "show", "disabled");
    openedCards.push(event.target);
  }

  if (openedCards.length === 2) {
    deck.removeEventListener("click", flip);
    selectedCards();
  }

  //Count Moves and stars

  document.querySelector(".moves").innerHTML = moves;
  moves++;
  if (moves == 1) {
    startTimer();
  }
  if (moves >= 25) {
    starOne.style.display = "none";
    stars = 2;
  }
  if (moves >= 35) {
    starTwo.style.display = "none";
    stars = 1;
  }
  if (moves >= 45) {
    starThree.style.display = "none";
    stars = 0;
  }
}

//Check matching and unmatching cards
function selectedCards() {
  setTimeout(function() {
    if (openedCards[0].type === openedCards[1].type) {
      openedCards[0].classList.add("match");
      openedCards[1].classList.add("match");
      matchArray.push(openedCards[0]);
      matchArray.push(openedCards[1]);
      cardMatch();
    } else {
      openedCards[0].classList.remove("open", "show");
      openedCards[1].classList.remove("open", "show");
    }
    openedCards = [];
  }, 600);
}

//Check to see if all cards match
function cardMatch() {
  if (matchArray.length === cards.length) {
    endGame();
  } else {
    return false;
  }
}

//End game when all cards match
function endGame() {
  modal.style.display = "block";
  var h = document.createTextNode(
      "You made " + (moves - 1) + " moves in " + timer.innerHTML + " and earned " + stars + " stars!"
  );
  content.appendChild(h);
  stopTimer();

  //Restart game from modal and play again
  play.onclick = function() {
    modal.style.display = "none";
    startGame();
  };

  //Close modal
  close.onclick = function() {
    modal.style.display = "none";
  };
}

//Start time
function startTimer() {
  time = setInterval(function() {
    if (++sec === 60) {
      sec = 0;
      if (++min === 60) min = 0;
    }
    timer.innerHTML = min + ":" + sec;
  }, 1000);
}

//Stop time
function stopTimer() {
  clearInterval(time);
}

//Reset by restart button
restart.onclick = function() {
  stopTimer();

  startGame();
};
