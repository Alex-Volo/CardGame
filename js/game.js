import { Deck } from "./deck.js";
const suitsBackground = {
    '♠': 'spades.svg', 
    '♣': 'clubs.svg', 
    '♥': 'hearts.svg', 
    '♦': 'diamonds.svg',
}
export function renderGameField(difficulty = 1) {
    const deck = new Deck;

    switch (difficulty) {
        case '1': 
            deck.shuffle().cut(3).double().shuffle();
            renderCards(deck);
            addCardListener()
            break;
        
        case '2':
            deck.shuffle().cut(6).double().shuffle();
            renderCards(deck);
            addCardListener()
            break;

        case '3':
            deck.shuffle().cut(9).double().shuffle();
            renderCards(deck);
            addCardListener()
    }
}

function renderCards(deck) {
    const gameField = document.querySelector('.game__field');
    for(let card of deck.cards){
        gameField.innerHTML = gameField.innerHTML + `
        
        <div data-value=${card.value} data-suit=${card.suit} class="card" >
            <div class="card__back"></div>
            <div class="card__face" style="background: url(./img/${suitsBackground[card.suit]}) center center no-repeat, rgb(255, 255, 255);">
                <div class="card__top">    
                    <div class="card__value">${card.value}
                    </div>
                    <img class="card__suit" src="img/${suitsBackground[card.suit]}" alt="suit">
                </div>
                <div class="card__bottom">    
                    <div class="card__value">${card.value}
                    </div>
                    <img class="card__suit" src="img/${suitsBackground[card.suit]}" alt="suit">
                </div>
            </div>
        </div>
        `
    }
}
function addCardListener() {
    const cards = document.body.querySelectorAll('.card');

    for (let card of cards) {
        card.addEventListener('click', () => {
            console.log('Карта');
        })
    }
}