const cardsAnimal = ['chicken', 'chicken', 'dog', 'dog', 'panda', 'panda', 'amphibian', 'amphibian', 'bears', 'bears', 'goldfish', 'goldfish', 'seal', 'seal', 'tucan', 'tucan', 'turtle', 'turtle'];

let cards = [...document.querySelectorAll('.board div')];
let startTime = undefined;
let activeCard = '';
const activeCards = [];
const gamePairs = cards.length / 2
let gameResult = 0;
let topResults = [];
const btnStart = document.querySelector('.start');
const btnReset = document.querySelector('.reset');
const olTop10 = document.querySelector('.top10');
let li = document.querySelectorAll('li');

const clickCard = function () {
  activeCard = this;
  if (activeCard == activeCards[0]) return;
  activeCard.classList.remove('hidden');

  if (activeCards.length === 0) {
    activeCards[0] = activeCard;
    return
  } else {
    cards.forEach(card => {
      card.removeEventListener('click', clickCard)
    })
    activeCards[1] = activeCard;

    setTimeout(function () {
      if (activeCards[0].className === activeCards[1].className) {
        activeCards.forEach(card => card.classList.add('off'));
        gameResult++
        cards = cards.filter(card => !card.classList.contains('off'));
        if (gameResult == gamePairs) {
          const endTime = new Date().getTime();
          const gameTime = (endTime - startTime) / 1000;
          topResults.push(gameTime)
          topResults.sort();
          let numberOfResult = topResults.slice(0, 10);

          while (olTop10.firstChild) {
            olTop10.removeChild(olTop10.firstChild);
          }
          for (let i = 0; i < numberOfResult.length; i++) {
            const li = document.createElement('li');
            olTop10.appendChild(li);
            li.textContent = `${numberOfResult[i]}`;
          }
        }
        cards.forEach(card => {
          card.removeEventListener('click', clickCard)
        })
      } else {
        activeCards.forEach(activeCard => {
          activeCard.classList.add('hidden');
        })
      }
      activeCards.length = 0;
      activeCard = '';
      cards.forEach(card => card.addEventListener('click', clickCard));
    }, 400)
  }
}

const init = function () {
  startTime = new Date().getTime();
  cards.forEach(card => {
    const position = Math.floor(Math.random() * cardsAnimal.length);
    card.classList.add(cardsAnimal[position]);
    cardsAnimal.splice(position, 1);
  })

  setTimeout(function () {
    cards.forEach(card => {
      card.classList.add('hidden')
      card.addEventListener('click', clickCard)
    })
  }, 1200)
}
init()

btnStart.addEventListener('click', function () {

  let cards = [...document.querySelectorAll('.board div')];

  const cardsAnimal = ['chicken', 'chicken', 'dog', 'dog', 'panda', 'panda', 'amphibian', 'amphibian', 'bears', 'bears', 'goldfish', 'goldfish', 'seal', 'seal', 'tucan', 'tucan', 'turtle', 'turtle'];

  gameResult = 0;
  move = 0;
  startTime = new Date().getTime();

  cards.forEach(card => {
    const position = Math.floor(Math.random() * cardsAnimal.length);
    card.removeAttribute('class');
    card.classList.add(cardsAnimal[position]);
    cardsAnimal.splice(position, 1);
  })

  setTimeout(function () {
    cards.forEach(card => {
      card.classList.add('hidden');
      card.addEventListener('click', clickCard);
    })
  }, 1200)
})

btnReset.addEventListener('click', () => {
  olTop10.textContent = '';
  topResults.length = 0;
})