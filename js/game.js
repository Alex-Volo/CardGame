import { Deck } from './deck.js';
const suitsBackground = {
    '♠': 'spades.svg',
    '♣': 'clubs.svg',
    '♥': 'hearts.svg',
    '♦': 'diamonds.svg',
};

let firstCard = {
    value: 0,
    suit: 0,
};

let secondCard = {
    value: 0,
    suit: 0,
};

export function renderGameField(difficulty = 1) {
    const deck = new Deck();
    const cardPresets = [3, 3, 6, 9];
    window.cardGame.currentDeck = deck
        .shuffle()
        .cut(cardPresets[+difficulty])
        .double()
        .shuffle();

    renderCards(deck);
    setTimeout(() => {
        flipCards();
        addCardListener();
    }, 5000);
    countdown();
}

function renderCards(deck) {
    const gameField = document.querySelector('.game__field');
    for (let card of deck.cards) {
        gameField.innerHTML =
            gameField.innerHTML +
            `
        
        <div data-value=${card.value} data-suit=${card.suit} class="card" >
            <div class="card__back"></div>
            <div class="card__face" style="background: url(./img/${
                suitsBackground[card.suit]
            }) center center no-repeat, rgb(255, 255, 255);">
                <div class="card__top">    
                    <div class="card__value">${card.value}
                    </div>
                    <img class="card__suit" src="img/${
                        suitsBackground[card.suit]
                    }" alt="suit">
                </div>
                <div class="card__bottom">    
                    <div class="card__value">${card.value}
                    </div>
                    <img class="card__suit" src="img/${
                        suitsBackground[card.suit]
                    }" alt="suit">
                </div>
            </div>
        </div>
        `;
    }
}

function addCardListener() {
    const cards = document.body.querySelectorAll('.card');
    const resetCard = () => {
        return { value: 0, suit: 0 };
    };

    for (let card of cards) {
        card.addEventListener('click', () => {
            const face = card.querySelector('.card__face');
            const back = card.querySelector('.card__back');

            face.classList.add('card__flip-face1');
            back.classList.add('card__flip-back1');

            if (!firstCard.value) {
                firstCard = {
                    value: card.dataset.value,
                    suit: card.dataset.suit,
                };
            } else {
                secondCard = {
                    value: card.dataset.value,
                    suit: card.dataset.suit,
                };
                if (
                    firstCard.value !== secondCard.value ||
                    firstCard.suit !== secondCard.suit
                ) {
                    console.log('Игра закончилась');
                }
                firstCard = resetCard();
                secondCard = resetCard();
            }
        });
    }
}

function flipCards() {
    const cards = document.body.querySelectorAll('.card');

    for (let card of cards) {
        const face = card.querySelector('.card__face');
        const back = card.querySelector('.card__back');

        face.classList.add('card__flip-face');
        back.classList.add('card__flip-back');
    }
}

function countdown() {
    const timer = document.querySelector('.game__timer');
    const countdownEl = document.createElement('div');
    countdownEl.classList.add('game__countdown');
    countdownEl.textContent = '5';
    timer.after(countdownEl);
    const countdownInterval = setInterval(() => {
        if (countdownEl.textContent > 1) {
            countdownEl.textContent -= 1;
        } else {
            clearInterval(countdownInterval);
            countdownEl.textContent = 'Start';
            setTimeout(() => (countdownEl.textContent = ''), 1000);
            startTimer();
        }
    }, 1000);
}

function startTimer() {
    const timerDigits = document.querySelector('.game__digits');
    let time = 0;

    function setTime() {
        time += 1;
        const minutes = ('00' + Math.round(time / 60)).slice(-2);
        const seconds = ('00' + (time % 60)).slice(-2);
        timerDigits.textContent = `${minutes}.${seconds}`;
    }
    const timerInterval = setInterval(setTime, 1000);
    setTimeout(clearInterval, 10000, timerInterval);
}
