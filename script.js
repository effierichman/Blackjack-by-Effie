

let deckHolder = []
let playerCards = []
let dealerCards = []
let dealerCardPoints = 0
let playerCardPoints = 0
let discardedPile = []

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

nextHand = document.querySelector('#next-hand-button')
nextHand.addEventListener('click', handDraw)

function handDraw() {
  // this will draw the first two cards of the deckholder array to the playercards array, and the the next two cards to the dealercards array

  playerCards.forEach(element => {
    discardedPile.push(element)
  })
  dealerCards.forEach(element => {
    discardedPile.push(element.value)
  })
  playerCards = []
  dealerCards = []
  console.log(discardedPile)
  console.log(deckHolder)
  playerCards[0] = deckHolder.pop()
  playerCards[1] = deckHolder.pop()
  dealerCards[0] = deckHolder.pop()
  dealerCards[1] = deckHolder.pop()
  console.log(playerCards)
  console.log(dealerCards)
  console.log(deckHolder)
  dealerCardPoints = dealerPointCounter(dealerCards)
  playerCardPoints = playerPointCounter(playerCards)
  console.log(dealerCardPoints)
  console.log(playerCardPoints)
}
setTimeout(handDraw, 1000)



function dealerPointCounter(dealerCards) {
  // this will check the array for face cards and aces and change then into intergers and the same with the rest of the cards
  dealerCards.forEach(element => {
    if (element.value == 'KING' || element.value == 'QUEEN' || element.value == 'JACK') {
      element.value = 10
      console.log('was queen king or jack');

    } else if (element.value != 'ACE') {
      element.value = parseInt(element.value)
      console.log(element.value);

    }
  })
  dealerCards.forEach(element => {
    if (element.value == 'ACE') {
      element.value = 11
      console.log('was ace');
    }
  })
  let sum = 0
  dealerCards.forEach(element => {
    sum += element.value
    if (sum > 21) {
      sum = 0
      dealerCards.forEach(element => {
        if (element.value == 'ACE') {
          element.value = 1
        }
        dealerCards.forEach(element => {
          sum += element.value
        })
      })
    }
  })
  return sum
  // as each card is drawn to the dealer, this will add the points together
}

function playerPointCounter(playerCards) {
  // this will check the array for face cards and aces and change then into intergers and the same with the rest of the cards
  playerCards.forEach(element => {
    if (element.value == 'KING' || element.value == 'QUEEN' || element.value == 'JACK') {
      element.value = 10
      console.log('was queen king or jack');

    } else if (element.value != 'ACE') {
      element.value = parseInt(element.value)
      console.log(element.value)

    }
  })

  playerCards.forEach(element => {
    if (element.value == 'ACE') {
      element.value = 11
      console.log('was ace');
    }
  })
  let sum = 0
  playerCards.forEach(element => {
    sum += element.value
    
  })
  if (sum > 21) {
    console.log('player went over, check for aces')
    sum = 0
    playerCards.forEach(element => {
      console.log('log each element', element);
      
      if (element.value == 'ACE') {
        element.value = 1
      } else {
        sum += element.value
      }
      // playerCards.forEach(element => {
      //   sum += element.value
      // })
    })
  }

  return sum
  // as each card is drawn to the player, this will add the points together

}

hitButton = document.querySelector('#hit-button')
hitButton.addEventListener('click', function(event) {
  // this will let the player draw additional cards until the sum is 21 or over or five card total drawn
  if (playerCardPoints < 21) {
    // playerCards = []
    // dealerCards = []
    // playerCardPoints = playerPointCounter(playerCards)
    
    playerCards.push(deckHolder.pop())
    playerCardPoints = playerPointCounter(playerCards)
    
    // dealerCards[1] = deckHolder.pop()

  } 
  console.log('made it in hit card')
  console.log(playerCards)
  console.log(deckHolder)
  console.log(playerCardPoints)
})



standButton = document.querySelector('#stand-button')
standButton.addEventListener('click', standButton)

function standButton() {
  //this will end the players turn and switch over to the dealercard array
}


function whoWins() {
  //this will compare the player and dealers points and declare a winner. 
  // if player busts, automatic win for dealer and visa versa
  //when round is over, update the scoreboard
  while (playerCardPoints > dealerCardPoints && playerCardPoints <= 21) {

  }
}

function playAgain() {
  //this will reset the entire game, the same as refreshing the page
}

function recbutton() {
  //this will calculate the chances of hitting and standing and display a percentage for whichever has the higher perrcentage
}


// function drawACard() {
//   fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`).then(response => response.json()).then(data => console.log(data));
//   console.log(drawCards)
// }
// drawACard()


// set the initial values for player and dealer to 0

// hit button: deal player a new card- update value of array; if player busts over 21, declare the dealer a winner and add a point to scoreboard

//stand button: draw cards until dealer point are more than player; if bust, declare player winner and update scoreboard



