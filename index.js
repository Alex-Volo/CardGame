"use strict"
import { Deck } from "./js/deck.js";
import { renderGameField } from "./js/game.js";


function renderApp(mode = 0) {
    const appElem = document.querySelector('.app-container')

    switch (mode) {

        case 'result':
            appElem.innerHTML = appElem.innerHTML + ``;
            break;

        case 'game':
            appElem.style.flexDirection = 'column';
            appElem.innerHTML = `
            <div class="game">
                <div class="game__header">
                    <div class="game__timer">
                        <div class="game__min-sec">min</div>
                        <div class="game__min-sec">sec</div>
                        <div class="game__digits">00.00</div>
                    </div>
                    <button class="btn">Начать заново</button>
                </div>
                <div class="game__field">
                </div>
            </div>
            <p>Сложность ${localStorage.getItem('CardGame_difficulty')}</p>
            <button class="btn">Назад</button>
            `;

            const backBtn = appElem.querySelector('.btn');
            backBtn.addEventListener('click', () => {
                console.log('Старт')
                localStorage.removeItem('CardGame_status');
                renderApp(localStorage.getItem('CardGame_status'));
            })
            renderGameField(localStorage.getItem('CardGame_difficulty'));
            break;

        default:
            appElem.innerHTML = `
                <div class="difficulty">
                    <h1 class="difficulty__heading">Выбери<br>сложность</h1>
                    <div class="difficulty__selection">
                        <button class="difficulty__selection-item">1</button>
                        <button class="difficulty__selection-item">2</button>
                        <button class="difficulty__selection-item">3</button>
                    </div>
                    <button class="btn start-button">Старт</button>
                </div>
            `;

            const difficultyButtons = appElem.querySelectorAll('.difficulty__selection-item');
            localStorage.setItem('CardGame_difficulty', '1');

            for (let button of difficultyButtons) {
                button.addEventListener('click', () => {
                    difficultyButtons.forEach((el) => el.classList.remove('difficulty__selection-item_checked'));
                    button.classList.add('difficulty__selection-item_checked');
                    localStorage.setItem('CardGame_difficulty', button.textContent);
                })
            }

            const startBtn = appElem.querySelector('.start-button');
            startBtn.addEventListener('click', () => {
                console.log('Старт')
                localStorage.setItem('CardGame_status', 'game');
                renderApp(localStorage.getItem('CardGame_status'));
            })
    }
}


renderApp(localStorage.getItem('CardGame_status'));