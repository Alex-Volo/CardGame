import { Deck } from "./deck.js";
const suitsBackground = {
    '♠': 'spades.svg', 
    '♣': 'clubs.svg', 
    '♥': 'hearts.svg', 
    '♦': 'diamonds.svg',
}
export function renderGameField(difficulty = 1) {
    const deck = new Deck;
    const gameField = document.querySelector('.game__field');

    switch (difficulty) {
        case '1': 
            deck.shuffle().cut(6).double().shuffle();
            console.log(deck);
            for(let card of deck.cards){
                const cardDiv = document.createElement('div');
                cardDiv.dataset.value = card.value;
                cardDiv.dataset.suit = card.suit;
                cardDiv.classList.add('game__card');
                cardDiv.style.background = `url(../img/${suitsBackground[card.suit]}) center no-repeat, #FFF`;
                gameField.append(cardDiv);
            }
            break;
        
        case '2':
            break;

        case '3':
    }
}