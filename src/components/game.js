import { Deck } from './deck.js';
import { renderApp } from '../index.js';
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
    clearInterval(window.cardGame.timerInterval);
    clearInterval(window.cardGame.countdownInterval);
    clearTimeout(window.cardGame.flipTimeout);

    const deck = new Deck();
    const cardPresets = [3, 3, 6, 9];
    window.cardGame.currentDeck = deck
        .shuffle()
        .cut(cardPresets[+difficulty])
        .double()
        .shuffle();

    renderCards(deck);
    window.cardGame.flipTimeout = setTimeout(() => {
        flipCards();
        addCardListener();
    }, 5000);
    countdown();
}

function renderCards(deck) {
    const gameField = document.querySelector('.game__field');
    gameField.innerHTML = '';

    for (let card of deck.cards) {
        gameField.innerHTML =
            gameField.innerHTML +
            `        
        <div data-value=${card.value} data-suit=${card.suit} class="card" >
            <div class="card__back"></div>
            <div class="card__face" style="background: url(./src/img/${
                suitsBackground[card.suit]
            }) center center no-repeat, rgb(255, 255, 255);">
                <div class="card__top">    
                    <div class="card__value">${card.value}
                    </div>
                    <img class="card__suit" src="./src/img/${
                        suitsBackground[card.suit]
                    }" alt="suit">
                </div>
                <div class="card__bottom">    
                    <div class="card__value">${card.value}
                    </div>
                    <img class="card__suit" src="./src/img/${
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
        card.addEventListener('click', compareCards);
    }

    function compareCards(event) {
        const card = event.srcElement.closest('.card');
        const face = card.querySelector('.card__face');
        const back = card.querySelector('.card__back');

        face.classList.add('card__flip-face1');
        back.classList.add('card__flip-back1');

        if (!firstCard.value) {
            firstCard = {
                value: card.dataset.value,
                suit: card.dataset.suit,
            };
            card.removeEventListener('click', compareCards);
        } else {
            secondCard = {
                value: card.dataset.value,
                suit: card.dataset.suit,
            };
            card.removeEventListener('click', compareCards);
            if (
                firstCard.value !== secondCard.value ||
                firstCard.suit !== secondCard.suit
            ) {
                clearInterval(window.cardGame.timerInterval);
                const timerValue =
                    document.querySelector('.game__digits').textContent;
                console.log(timerValue);
                window.cardGame.status = 'result';
                renderApp(window.cardGame.status, timerValue);
            }
            firstCard = resetCard();
            secondCard = resetCard();
        }
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
    window.cardGame.countdownInterval = setInterval(() => {
        if (countdownEl.textContent > 1) {
            countdownEl.textContent -= 1;
        } else {
            clearInterval(window.cardGame.countdownInterval);
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
    window.cardGame.timerInterval = setInterval(setTime, 1000);
    setTimeout(clearInterval, 600000, window.cardGame.timerInterval);
}
