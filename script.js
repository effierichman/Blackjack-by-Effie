

let deckHolder = []
let playerCards = []
let dealerCards = []
let dealerCardPoints = 0
let playerCardPoints = 0
let discardedPile = []
let dealerScore = 0
let playerScore = 0

function setScore() {
  document.querySelector('#scoreBoard1Score').innerHTML = playerScore
  document.querySelector('#scoreBoard2Score').innerHTML = dealerScore
}
// this click event will start the game
startGane = document.querySelector('#start-button')
startGane.addEventListener('click', startTheGame)
function startTheGame() {
  getCards()
}

//this function will grab a shuffled full deck from the api
function getCards() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response => response.json()).then(data => {
    //calling the the decktodeckholder function and search the deckid to make sure it is the same deck that is stored in the new array
    console.log(data)

    deckToDeckHolder(data.deck_id)
    setTimeout(handDraw, 1000)
  })
}

//this function will take the deck from the getcards and store it in an array called deckHolder
function deckToDeckHolder(deckId) {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`).then(response => response.json()).then(data => {
    console.log(data.cards)
    data.cards.forEach(element => {
      if (element.value == 'KING' || element.value == 'QUEEN' || element.value == 'JACK') {
        element.value = 10
        console.log('was queen king or jack');

      } else if (element.value != 'ACE') {
        element.value = parseInt(element.value)
        console.log(element.value)

      } else if (element.value == 'ACE') {
        element.value = 11
        console.log(element.value)
      }
    })
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
  if (playerCards.length == 0 && dealerCards.length == 0) {
    if (dCard1.lastChild) {
      dCard1.removeChild(dCard1.lastChild)
    }
    if (dCard2.lastChild) {
      dCard2.removeChild(dCard2.lastChild)
    }
    if (dCard3.lastChild) {
      dCard3.removeChild(dCard3.lastChild)
    }
    if (dCard4.lastChild) {
      dCard4.removeChild(dCard4.lastChild)
    }
    if (dCard5.lastChild) {
      dCard5.removeChild(dCard5.lastChild)
    }
    if (pCard1.lastChild) {
      pCard1.removeChild(pCard1.lastChild)
    }
    if (pCard2.lastChild) {
      pCard2.removeChild(pCard2.lastChild)
    }
    if (pCard3.lastChild) {
      pCard3.removeChild(pCard3.lastChild)
    }
    if (pCard4.lastChild) {
      pCard4.removeChild(pCard4.lastChild)
    }
    if (pCard5.lastChild) {
      pCard5.removeChild(pCard5.lastChild)
    }
  }
  console.log(discardedPile)
  console.log(deckHolder)
  playerCards[0] = deckHolder.pop()
  //store source in variable
  pCard1.innerHTML = `<img class='pCardImage' src='${playerCards[0].image}'>`
  playerCards[1] = deckHolder.pop()
  pCard2.innerHTML = `<img class='pCardImage' src='${playerCards[1].image}'>`
  dealerCards[0] = deckHolder.pop()
  dCard1.innerHTML = `<img class='dCardImage' src='${dealerCards[0].image}'>`
  dealerCards[1] = deckHolder.pop()
  dCard2.innerHTML = `<img class='dCardImage' src='${dealerCards[1].image}'>`
  console.log(playerCards)
  console.log(dealerCards)
  console.log(deckHolder)
  dealerCardPoints = dealerWinningHand(dealerCards)
  playerCardPoints = winningHand(playerCards)
  console.log(dealerCardPoints)
  console.log(playerCardPoints)
  if (playerCards.length == 2 && playerCardPoints == 21) {
    alert('Player has a BlackJack, you get a point')
    playerScore += 1
    setScore()
  }

}
// setTimeout(handDraw, 1000)
function dealerWinningHand(cards) {
  const setHand = getWinningHand(cards);
  if (setHand.size) {
    const maxHand = Math.max(...Array.from(setHand.values()));
    return maxHand;
  }
  console.log('dealer busts')
  playerScore += 1
  setScore()
  return 0

}
function winningHand(cards) {
  const setHand = getWinningHand(cards);
  if (setHand.size) {
    const maxHand = Math.max(...Array.from(setHand.values()));
    return maxHand;
  }
  console.log('player busts')
  dealerScore += 1
  setScore()
  return 0

}
function getWinningHand(cards, curr = [], start = 0, results = new Set()) {
  // reduce the hand to a number value

  const result = curr.reduce((sum, card) => {
    return sum + card;
  }, 0);
  if (result > 21 || results.has(result)) {
    return results;
  } else if (curr.length == cards.length) {
    // console.log(curr);
    if (result <= 21) {
      results.add(result);
    }
    return results;
  } else {
    // iterate over remaining cards
    for (var i = start; i < cards.length; i++) {
      const card = cards[i];
      if (card.value !== 11) {
        // add card to current hand
        curr.push(parseInt(card.value));
        getWinningHand(cards, curr, i + 1, results);
        curr.pop();
      } else {
        // try eleven
        curr.push(11);
        getWinningHand(cards, curr, i + 1, results);
        curr.pop();
        // try one
        curr.push(1);
        getWinningHand(cards, curr, i + 1, results);
        curr.pop();
      }
    }
  }
  return results;
}




hitButton = document.querySelector('#hit-button')
hitButton.addEventListener('click', function (event) {
  // this will let the player draw additional cards until the sum is 21 or over or five card total drawn
  if (playerCardPoints < 21) {

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

    // pCard4.innerHTML = `<img src='${playerCards[3].image}'>`
    // pCard5.innerHTML = `<img src='${playerCards[4].image}'>`
    playerCards.push(deckHolder.pop())
    setTimeout(() => {

      if (playerCards.length == 3) {
        pCard3.innerHTML = `<img class='pCardImage' src='${playerCards[2].image}'>`
      } else if (playerCards.length == 4) {
        pCard4.innerHTML = `<img class='pCardImage' src='${playerCards[3].image}'>`
      }
      else if (playerCards.length == 5) {
        pCard5.innerHTML = `<img class='pCardImage' src='${playerCards[4].image}'>`
      }
    }, 100)
    playerCardPoints = winningHand(playerCards)

  }
  console.log('made it in hit card')
  console.log(playerCards)
  console.log(deckHolder)
  console.log(playerCardPoints)
})



standButton = document.querySelector('#stand-button')
standButton.addEventListener('click', function (event) {
  //this will end the players turn and switch over to the dealercard array
  if (dealerCardPoints > playerCardPoints) {
    alert('dealer wins and dealer gets a point')
    dealerScore += 1
    setScore()
  }
  while (dealerCardPoints <= playerCardPoints && dealerCardPoints <= 21 && dealerCardPoints !== 0) {

    dealerCards.push(deckHolder.pop())
    dealerCardPoints = dealerWinningHand(dealerCards)
    let dCard3 = document.querySelector('.dcard3')
    let dCard4 = document.querySelector('.dcard4')
    let dCard5 = document.querySelector('.dcard5')

    if (dealerCards.length == 3) {
      dCard3.innerHTML = `<img class='dCardImage' src='${dealerCards[2].image}'>`
    } else if (playerCards.length == 4) {
      dCard4.innerHTML = `<img class='dCardImage' src='${dealerCards[3].image}'>`
    }
    else if (playerCards.length == 5) {
      dCard5.innerHTML = `<img class='dCardImage' src='${dealerCards[4].image}'>`
    }

    if (dealerCardPoints > playerCardPoints) {
      alert('dealer wins and dealer gets a point')
      dealerScore += 1
      setScore()
      return
    }


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
    setScore()
    dealerScore = 0
    setScore()
    discardedPile = []
    console.log(discardedPile)
    console.log(deckHolder)
    console.log(playerCards)
    console.log(dealerCards)
    console.log(deckHolder)
    console.log(dealerCardPoints)
    console.log(playerCardPoints)
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
    if (playerCards.length == 0 && dealerCards.length == 0) {
      if (dCard1.lastChild) {
        dCard1.removeChild(dCard1.lastChild)
      }
      if (dCard2.lastChild) {
        dCard2.removeChild(dCard2.lastChild)
      }
      if (dCard3.lastChild) {
        dCard3.removeChild(dCard3.lastChild)
      }
      if (dCard4.lastChild) {
        dCard4.removeChild(dCard4.lastChild)
      }
      if (dCard5.lastChild) {
        dCard5.removeChild(dCard5.lastChild)
      }
      if (pCard1.lastChild) {
        pCard1.removeChild(pCard1.lastChild)
      }
      if (pCard2.lastChild) {
        pCard2.removeChild(pCard2.lastChild)
      }
      if (pCard3.lastChild) {
        pCard3.removeChild(pCard3.lastChild)
      }
      if (pCard4.lastChild) {
        pCard4.removeChild(pCard4.lastChild)
      }
      if (pCard5.lastChild) {
        pCard5.removeChild(pCard5.lastChild)
      }
    }
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

// idea and code my Ethan Jarrell
// 1 Create a simulated deck.
// 2 remove known cards from the deck.
// 3 draw a new card and substitute it for the unknown card.
// 4 If the sum of the new card, plus the known dealer card is higher than the player sum, add 1 to a variable.
// 5 If the test runs a million times, determine the number of times the outcome puts the dealer hand higher than the players.

// recButton = document.querySelector('#rec-button')
// recButton.addEventListener('click', getPrecentage)
// function getPrecentage (p,d) {
//     let percentageOne = 0;
//     let testDeck2 = testDeck;
//     let valP = [];
//     let valD = [];
//     for (i = 0; i < playerCards.length; i++) {
//       valP.push(playerCards[i].value);
//     }
//     for (var i = 0; i < dealerCards.length; i++) {
//       valD.push(dealerCards[i].value);
//     }
//     p = valP;
//     d = valD;

//     for (i = 0; i < p.length; i++) {
//       if(testDeck2.includes(p[i])==true){
//         let index1 = testDeck2.indexOf(p[i]);
//         testDeck2.splice(index1,1);
//       }
//     }
//     for (i = 0; i < d.length; i++) {
//       if(testDeck2.includes(d[i])==true && i!=0){
//         let index1 = testDeck2.indexOf(d[i]);
//         testDeck2.splice(index1,1);
//       }
//     }

//     let dealerCardss2 = [d.pop()];
//     function getSum(total, num) {
//       return total + num;
//     }
//     let playerCardPoints2 = p.reduce(getSum);
//  let dealerCardPoints2 = dealerCardss2.reduce(getSum);
//   console.log(dealerCardPoints2);
//   console.log(playerCardPoints2)

//     for (i = 0; i < iterations; i++) {
//       let dealerCard1 = testDeck2[Math.floor(Math.random()*testDeck2.length)];

//       if(dealerCardPoints2+dealerCard1 > playerCardPoints2){
//         percentageOne = percentageOne + 1
//       }
//     }

//     let percentageTwo = Math.round((percentageOne/iterations)*100);

//   return percentageTwo;

//   }

// getPrecentage()


// function dealerPointCounter(dealerCards) {
//   // if (deckHolder == 0) {
//   //   getCards()
//   // }
//   // this will check the array for face cards and aces and change then into intergers and the same with the rest of the cards
//   dealerCards.forEach(element => {
//     if (element.value == 'KING' || element.value == 'QUEEN' || element.value == 'JACK') {
//       element.value = 10
//       console.log('was queen king or jack');

//     } else if (element.value != 'ACE') {
//       element.value = parseInt(element.value)
//       console.log(element.value);

//     }
//   })

//   dealerCards.forEach(element => {
//     if (element.value == 'ACE' && dealerCardPoints <= 21) {
//       element.value = 11
//       console.log('was ace')
//     }
//   })

//   let sum = 0
//   dealerCards.forEach(element => {
//     sum += element.value
//     if (sum > 21) {
//       alert('Dealer Busts, you win this round')
//       playerScore += 1
//       console.log('player went over, check for aces')
//       sum = 0
//       dealerCards.forEach(element => {
//         console.log('log each element', element);

//         if (element.value == 'ACE') {
//           element.value = 1
//         } else {
//           sum += element.value
//         }
//       })
//     }
//     // as each card is drawn to the dealer, this will add the points together
//   })
//   return sum
//   if (playerCards.length > 2 && playerCardPoints == 21 && dealerCardPoints == 21) {
//     alert('You have pushed, there is no winner here, nor a loser')
//   }
// }

// function PlayerPointCounter(playerCards) {
//   // if (deckHolder == 0) {
//   //   getCards()
//   // }
//   // this will check the array for face cards and aces and change then into intergers and the same with the rest of the cards
//   playerCards.forEach(element => {
//     if (element.value == 'KING' || element.value == 'QUEEN' || element.value == 'JACK') {
//       element.value = 10
//       console.log('was queen king or jack');

//     } else if (element.value != 'ACE') {
//       element.value = parseInt(element.value)
//       console.log(element.value)

//     }
//   })

//   playerCards.forEach(element => {
//     if (element.value == 'ACE' && playerCardPoints <= 21) {
//       element.value = 11
//       console.log('was ace');
//     }
//   })
//   let sum = 0
//   playerCards.forEach(element => {
//     sum += element.value

//   })
//   if (sum > 21) {
//     playerCards.forEach(element => {
//       console.log('log each element', element);

//       if (element.value == 'ACE') {
//         element.value = 1
//       } else {
//         sum += element.value
//       }
//     })
//     alert('Player Busts, you will do better next hand')
//     dealerScore += 1
//     // hitButton.removeEventListener
//     console.log('player went over, check for aces')
//     sum = 0
//   }
//   console.log(dealerScore)

//   if (playerCards.length > 2 && playerCardPoints == 21 && dealerCardPoints == 21) {
//     alert('You have pushed, there is no winner here, nor a loser')
//   }
//   return sum
//   // as each card is drawn to the player, this will add the points together
// }