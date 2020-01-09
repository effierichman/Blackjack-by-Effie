// This code was given to me by Trevor
// Used by the program, don't edit these
let allConfetti = []
let fadeFallTimeOut

// confetti will be random colors picked from below array, add or remove any colors you want
let colors = ["green", "rgba(0,0,255,1)", "#ff0000"]

// adjust this to be the element where you want the confetti to start at.
// leave it as is if you just want it to center in the window
// let centerOnElement = document.querySelector('#exampleID')
let centerOnElement = document.querySelector('.game')

// adjust these to center it on the item
// since i am using the whole screen i get the whole width and divide by two
// if you change the centerOnElement to an element that is 100 by 100px
// you would change these both to 50 to center the confetti start position
let adjustTop = 488 / 2
let adjustLeft = 510

const prepareConfetti = () => {
  let amountOfConfetti = 60
  let confetti = document.createElement('div')
  for (let i = 0; i < amountOfConfetti; i++) {
    let newConfetti = document.createElement('div')
    newConfetti.classList.add('confetti')
    allConfetti.push(newConfetti)
    confetti.append(newConfetti)
  }
  document.body.append(confetti)
}

// from stack overflow: https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

const explodeConfetti = () => {
  resetConfetti()
  // radius controls the initial spread
  let radius = 200
  allConfetti.forEach(confetti => {
    confetti.style.display = 'block'
    confetti.style.left = getOffset(confetti).left + Math.random() * (radius * 2) - radius + "px"
    confetti.style.top = getOffset(confetti).top + Math.random() * (radius * 2) - radius + "px"
    let rotateValue = Math.random() * 360 + 360
    let translateValue = Math.random() * (radius * 2) - radius
    confetti.style.transform = ' translate3d(0,0,' + translateValue + 'px)' + ' rotate3d(1, 1, 1, ' + rotateValue + 'deg)'
    confetti.style.backgroundColor = colors[Math.round(Math.random() * (colors.length - 1))]
  })
  fadeFallTimeOut = setTimeout(fallAndFadeConfetti, 200)
}

const fallAndFadeConfetti = () => {
  allConfetti.forEach(confetti => {
    confetti.style.transition = "8s"
    confetti.style.transitionTimingFunction = "ease-in"
    confetti.style.top = getOffset(confetti).top + Math.random() * 1000 + 1000 + "px"
    confetti.style.opacity = "0%"
    let rotateValue = Math.random() * 360 + 360
    confetti.style.transform = 'rotate3d(1, 1, 1, ' + rotateValue + 'deg)'
  })
}

const resetConfetti = () => {
  clearTimeout(fadeFallTimeOut)
  allConfetti.forEach(confetti => {
    confetti.style.transition = '0.2s'
    confetti.style.display = 'none'
    confetti.style.left = (getOffset(centerOnElement).left + adjustLeft) + "px"
    confetti.style.top = (getOffset(centerOnElement).top + adjustTop) + "px"
    confetti.style.opacity = "100%"
    confetti.style.transform = 'rotate3d(0)'
    confetti.style.transitionTimingFunction = "ease-out"
    confetti.style.backgroundColor = 'black'
  })
}

// Call prepare confetti when page loads
prepareConfetti()

// call explode when you want it to go off
// explodeConfetti()

// call reset confetti before you can use it again (like maybe when a new game starts)
//resetConfetti()

//All my declerations 
let deckHolder = []
let playerCards = []
let dealerCards = []
let dealerCardPoints = 0
let playerCardPoints = 0
let discardedPile = []
let dealerScore = 0
let playerScore = 0
let alert = document.querySelector('.scoreBoardText')
let pctText = document.querySelector('.rec-button-text')

function setScore() {
  document.querySelector('#scoreBoard1Score').innerHTML = playerScore
  document.querySelector('#scoreBoard2Score').innerHTML = dealerScore
}

// this click event will start the game
startGane = document.querySelector('#start-button')
startGane.addEventListener('click', startTheGame)
function startTheGame() {
  pctText.innerHTML = ''
  resetConfetti()
  getCards()
}

//this function will grab a shuffled full deck from the api
function getCards() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response => response.json()).then(data => {
    //calling the the decktodeckholder function and search the deckid to make sure it is the same deck that is stored in the new array
    // console.log(data)
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
  pctText.innerHTML = ''
  resetConfetti()
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

  alert.innerHTML = ''
  console.log(discardedPile)
  console.log(deckHolder)
  playerCards[0] = deckHolder.pop()
  //store source in variable
  pCard1.innerHTML = `<img class='pCardImage' src='${playerCards[0].image}'>`
  playerCards[1] = deckHolder.pop()
  pCard2.innerHTML = `<img class='pCardImage' src='${playerCards[1].image}'>`
  dealerCards[0] = deckHolder.pop()
  dCard1.innerHTML = `<img class='dCardImage' src='20200107_134815.jpg'>`
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
    alert.innerHTML = `${name} has A BlackJack, You Win!!!`
    explodeConfetti()
    playerScore += 1
    setScore()
  }
}


// The following code is the functions that declare a winning had and how aces should react during any round.
//Michael Stromer Sent me and showed me how to use recurrsion to make the aces change from a value of 11 to 1
// setTimeout(handDraw, 1000)
function dealerWinningHand(cards) {
  const setHand = getWinningHand(cards);
  if (setHand.size) {
    const maxHand = Math.max(...Array.from(setHand.values()));
    return maxHand;
  }
}
function winningHand(cards) {
  const setHand = getWinningHand(cards);
  if (setHand.size) {
    const maxHand = Math.max(...Array.from(setHand.values()));
    return maxHand;
  }
  console.log('Player Busts')
  dealerScore += 1
  setScore()
  alert.innerHTML = `${name}  Busts, Dealer Wins!!`
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
  pctText.innerHTML = ''
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
  console.log(playerCards)
  console.log(deckHolder)
  console.log(playerCardPoints)
})

standButton = document.querySelector('#stand-button')
standButton.addEventListener('click', function (event) {
  //this will end the players turn and switch over to the dealercard array
  //which will hit if the dealer is less or even than the player
  pctText.innerHTML = ''
  let dCard1 = document.querySelector('.dcard1')
  dCard1.innerHTML = `<img class='dCardImage' src='${dealerCards[0].image}'>`
  if (dealerCardPoints > playerCardPoints) {
    alert.innerHTML = 'Dealer Wins!!!'
    dealerScore += 1
    setScore()
    return
  }
  while (dealerCardPoints <= playerCardPoints && dealerCardPoints <= 21 && dealerCardPoints !== 0 && dealerCards.length < 5) {

    dealerCards.push(deckHolder.pop())
    dealerCardPoints = dealerWinningHand(dealerCards)

    let dCard3 = document.querySelector('.dcard3')
    let dCard4 = document.querySelector('.dcard4')
    let dCard5 = document.querySelector('.dcard5')

    if (dealerCards.length == 3) {
      dCard3.innerHTML = `<img class='dCardImage' src='${dealerCards[2].image}'>`

    } else if (dealerCards.length == 4) {
      dCard4.innerHTML = `<img class='dCardImage' src='${dealerCards[3].image}'>`
    }
    else if (dealerCards.length == 5) {
      dCard5.innerHTML = `<img class='dCardImage' src='${dealerCards[4].image}'>`
    }

  }
  if (dealerCardPoints > playerCardPoints) {
    alert.innerHTML = 'Dealer Wins'
    dealerScore += 1
    setScore()
    //This return stopped the dealer to recieve two points at once, because this is in a while loop and if I didn't return here, it would continue and add a point 
    return
  } else {
    alert.innerHTML = 'Player Wins'
    playerScore += 1
    setScore()
    explodeConfetti()
  }

  console.log('made it in hit card')
  console.log(dealerCards)
  console.log(dealerCardPoints);

  console.log(deckHolder)
  console.log(playerCardPoints)
})

playAgainButton = document.querySelector('#reset-button')
playAgainButton.addEventListener('click', function (event) {
  //this will reset the entire game, the same as refreshing the page
  setTimeout(function () {
    resetConfetti()
    playerCards = []
    dealerCards = []
    alert.innerHTML = ''
    pctText.innerHTML = ''
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


// this is for the name function
let submit = document.querySelector('#submitbutton')
submit.addEventListener('click', nameInput)

function nameInput() {
  event.preventDefault()
  name = document.querySelector('#input-name').value
  let scoreBoardName = document.querySelector('#scoreBoard1')
  scoreBoardName.innerHTML = name + ':'
  let playerHandName = document.querySelector('.playerNameInput')
  playerHandName.innerHTML = name
  let form = document.querySelector('.titleScreen')
  form.style.display = 'none'
  let game = document.querySelector('.game')
  game.style.display = 'flex'
}

// This is the rec button function
// got the code idea from Ethan Jarrell https://hackernoon.com/blackjack-application-with-javascript-2c76db51dea7
let iterations = 10000;
let testDeck = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11];

//this function takes the value of the players cards and the dealers visible card, and funs a million iteration of the possible moves and gives you the percentage of whether you will hit and bust or hit and still win
recButton = document.querySelector('#rec-button')
recButton.addEventListener('click', (e) => {
  let pct = determinePercent(playerCards, dealerCards[1])
  pctText.innerHTML = `${name} You Have a ${pct} Percent Chance to Hit`
})

function determinePercent(p, d) {
  let percentageOne = 0;
  let testDeck2 = testDeck;
  let valP = [];
  let valD = [];
  for (var i = 0; i < playerCards.length; i++) {
    valP.push(playerCards[i].value);
  }
  for (var i = 0; i < dealerCards.length; i++) {
    valD.push(dealerCards[i].value);
  }
  p = valP;
  d = valD;

  for (var i = 0; i < p.length; i++) {
    if (testDeck2.includes(p[i]) == true) {
      let index1 = testDeck2.indexOf(p[i]);
      testDeck2.splice(index1, 1);
    }
  }
  for (var i = 0; i < d.length; i++) {
    if (testDeck2.includes(d[i]) == true && i != 0) {
      let index1 = testDeck2.indexOf(d[i]);
      testDeck2.splice(index1, 1);
    }
  }

  let dealerValues2 = [d.pop()];
  function getSum(total, num) {
    return total + num;
  }

  let playerSum2 = p.reduce(getSum);
  let dealerSum2 = dealerValues2.reduce(getSum);
  console.log(dealerSum2);

  for (var i = 0; i < iterations; i++) {
    let dealerCard1 = testDeck2[Math.floor(Math.random() * testDeck2.length)];

    if (dealerSum2 + dealerCard1 > playerSum2) {
      percentageOne = percentageOne + 1
    }
  }

  let percentageTwo = Math.round((percentageOne / iterations) * 100);

  return percentageTwo;
}

// function animation() {
//   let container = document.querySelector('.flip-container')
//   container.classList.add('animate')
// }

