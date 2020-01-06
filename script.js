

let deckHolder = []
let playerCards = []
let dealerCards = []
let dealerCardPoints = 0
let playerCardPoints = 0
let discardedPile = []
let dealerScore = 0
let playerScore = 0

// this click event will start the game
startGane = document.querySelector('#start-button')
startGane.addEventListener('click', startTheGame)
function startTheGame() {
  getCards()
  setTimeout(handDraw, 1000)
}

//this function will grab a shuffled full deck from the api
function getCards() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response => response.json()).then(data =>
    //calling the the decktodeckholder function and search the deckid to make sure it is the same deck that is stored in the new array
    deckToDeckHolder(data.deck_id))
}
// deckId = getCards()

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

  let dCard1 = document.querySelector('.dcard1')
  let dCard2 = document.querySelector('.dcard2')
  let dCard3 = document.querySelector('.dcard3')
  let dCard4 = document.querySelector('.dcard4')
  let dCard5 = document.querySelector('.dcard5')
  let pCard1 = document.querySelector('.pcard1')
  let pCard2 = document.querySelector('.pcard2')
  let pCard3 = document.querySelector('.pcard3')
  let pCard4 = document.querySelector('.pcard4')
  let pCard5 = document.querySelector('.pcard5')
  playerCards = []
  dealerCards = []
  console.log(discardedPile)
  console.log(deckHolder)
  playerCards[0] = deckHolder.pop()
  pCard1.innerHTML = `<img src='${playerCards[0].image}'>`
  playerCards[1] = deckHolder.pop()
  pCard2.innerHTML = `<img src='${playerCards[1].image}'>`
  dealerCards[0] = deckHolder.pop()
  dCard1.innerHTML = `<img src='${dealerCards[0].image}'>`
  dealerCards[1] = deckHolder.pop()
  dCard2.innerHTML = `<img src='${dealerCards[1].image}'>`
  console.log(playerCards)
  console.log(dealerCards)
  console.log(deckHolder)
  dealerCardPoints = dealerPointCounter(dealerCards)
  playerCardPoints = playerPointCounter(playerCards)
  console.log(dealerCardPoints)
  console.log(playerCardPoints)

  if (playerCardPoints == 21) {
    playerScore += 1
    alert('player has a blackjack!!')
  }
}
// setTimeout(handDraw, 1000)



function dealerPointCounter(dealerCards) {
  // if (deckHolder == 0) {
  //   getCards()
  // }
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
    if (element.value == 'ACE' && dealerCardPoints <= 21) {
      element.value = 11
      console.log('was ace')
    }
  })

  let sum = 0
  dealerCards.forEach(element => {
    sum += element.value
    if (sum > 21) {
      alert('Dealer Busts, you win this round')
      playerScore += 1
      console.log('player went over, check for aces')
      sum = 0
      dealerCards.forEach(element => {
        console.log('log each element', element);

        if (element.value == 'ACE') {
          element.value = 1
        } else {
          sum += element.value
        }
      })
    }
    // as each card is drawn to the dealer, this will add the points together
  })
  return sum
  if (playerCards.length > 2 && playerCardPoints == 21 && dealerCardPoints == 21) {
    alert('You have pushed, there is no winner here, nor a loser')
  }
}

function playerPointCounter(playerCards) {
  // if (deckHolder == 0) {
  //   getCards()
  // }
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
    if (element.value == 'ACE' && playerCardPoints <= 21) {
      element.value = 11
      console.log('was ace');
    }
  })
  let sum = 0
  playerCards.forEach(element => {
    sum += element.value

  })
  if (sum > 21) {
    playerCards.forEach(element => {
      console.log('log each element', element);

      if (element.value == 'ACE') {
        element.value = 1
      } else {
        sum += element.value
      }
    })
    alert('Player Busts, you will do better next hand')
    dealerScore += 1
    // hitButton.removeEventListener
    console.log('player went over, check for aces')
    sum = 0
  }
  console.log(dealerScore)

  if (playerCards.length > 2 && playerCardPoints == 21 && dealerCardPoints == 21) {
    alert('You have pushed, there is no winner here, nor a loser')
  }
  return sum
  // as each card is drawn to the player, this will add the points together
}

const currentHand = [{value: 'A'}, {value: 'A'}, {value: '5'}, {value: '5'}];
​
function getWinningHands(cards, curr = [], start = 0, results = new Set()) {
	const result = curr.reduce((sum, card) => {
		return sum + card; 
	}, 0);
	if (result > 21 || results.has(result)) {
		return results;
	} else if (curr.length == cards.length) {
		console.log(curr);
		if (result <= 21) {
			results.add(result);
		} 
		return results;
	} else {
		// iterate over remaining cards
		for (var i = start; i < cards.length; i++) {
			const card = cards[i];
			if(card.value !== 'A') {
				// add card to current hand
	            curr.push(parseInt(card.value));
	            getWinningHands(cards, curr, i+1, results);
	            curr.pop();
​
	        } else {
	        	// try eleven
	        	curr.push(11);
	            getWinningHands(cards, curr, i+1, results);
	            curr.pop();
​
	            // try one
	            curr.push(1);
	            getWinningHands(cards, curr, i+1, results);
	            curr.pop();
	        }
		}
	}
    return results;
}
​
const hands = getWinningHands(currentHand, [], 0, new Set());
console.log(hands);

hitButton = document.querySelector('#hit-button')
hitButton.addEventListener('click', function (event) {
  // this will let the player draw additional cards until the sum is 21 or over or five card total drawn
  if (playerCardPoints < 21) {
   
  // let dCard1 = document.querySelector('.dcard1')
  // let dCard2 = document.querySelector('.dcard2')
  // let dCard3 = document.querySelector('.dcard3')
  // let dCard4 = document.querySelector('.dcard4')
  // let dCard5 = document.querySelector('.dcard5')
  // let pCard1 = document.querySelector('.pcard1')
  // let pCard2 = document.querySelector('.pcard2')
  // let pCard3 = document.querySelector('.pcard3')
  // let pCard4 = document.querySelector('.pcard4')
  //   let pCard5 = document.querySelector('.pcard5')
  //   pCard3.innerHTML = `<img src='${playerCards[2].image}'>`
  //   pCard4.innerHTML = `<img src='${playerCards[3].image}'>`
  //   pCard5.innerHTML = `<img src='${playerCards[4].image}'>`
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
standButton.addEventListener('click', function (event) {
  //this will end the players turn and switch over to the dealercard array
  while (dealerCardPoints <= playerCardPoints && dealerCardPoints < 21) {
    // playerCards = []
    // dealerCards = []
    // playerCardPoints = playerPointCounter(playerCards)

    dealerCards.push(deckHolder.pop())
    dealerCardPoints = dealerPointCounter(dealerCards)

    // dealerCards[1] = deckHolder.pop()

  }
  console.log('made it in hit card')
  console.log(dealerCards)
  console.log(dealerCardPoints);

  console.log(deckHolder)
  console.log(playerCardPoints)
})


// function whoWins() {
//this will compare the player and dealers points and declare a winner. 
// if player busts, automatic win for dealer and visa versa
//when round is over, update the scoreboard
//   while (playerCardPoints > dealerCardPoints && playerCardPoints <= 21) {

//   }
// }

playAgainButton = document.querySelector('#reset-button')
playAgainButton.addEventListener('click', function (event) {
  //this will reset the entire game, the same as refreshing the page
  setTimeout(function () {
    playerCards = []
    dealerCards = []
    playerScore = 0
    dealerScore = 0
    discardedPile = []
    console.log(discardedPile)
    console.log(deckHolder)
    console.log(playerCards)
    console.log(dealerCards)
    console.log(deckHolder)
    console.log(dealerCardPoints)
    console.log(playerCardPoints)
    getCards()
  })
}, 1000)



// function drawACard() {
//   fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`).then(response => response.json()).then(data => console.log(data));
//   console.log(drawCards)
// }
// drawACard()


// set the initial values for player and dealer to 0

// hit button: deal player a new card- update value of array; if player busts over 21, declare the dealer a winner and add a point to scoreboard

//stand button: draw cards until dealer point are more than player; if bust, declare player winner and update scoreboard

