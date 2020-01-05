
// let deck = document.querySelector('.deck-text')
// let discardedCards = document.querySelector('card-pile')
// let newDeck = document.querySelector('.deck')
// let deckPile = document.querySelector('.card-pile-t')
// let drawCards = document.querySelector('.player')

let deckHolder = []

for (i = 0; i < deckHolder.length; i++) {
  if (deckHolder[i].code === 'KS'|| deckHolder[i].code === 'KH' || deckHolder[i].code ===  'KS'|| deckHolder[i].code === 'KC') {
    deckholder[i].value = 10;
  } 
  }
 allCards = deckHolder;


//this function will grab a shuffled full deck from the api
function getCards() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response => response.json()).then(data => 
    //calling the the decktodeckholder function and search the deckid to make sure it is the same deck that is stored in the new array
   deckToDeckHolder(data.deck_id))
}
deckId = getCards()

//this function will take the deck from the getcards and store it in an array called cardHolder
function deckToDeckHolder(deckId) {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`).then(response => response.json()).then(data => {
    console.log(data.cards)
    deckHolder = data.cards
    console.log(deckHolder)
  }) 
}

// function drawACard() {
//   fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`).then(response => response.json()).then(data => console.log(data));
//   console.log(drawCards)
// }
// drawACard()


// set the initial values for player and dealer to 0

// hit button: deal player a new card- update value of array; if player busts over 21, declare the dealer a winner and add a point to scoreboard

//stand button: draw cards until dealer point are more than player; if bust, declare player winner and update scoreboard



