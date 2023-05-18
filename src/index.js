/* eslint-disable no-case-declarations */
import { renderGameField } from './components/game.js';
window.cardGame = {};

export function renderApp(mode = 0) {
    const appElem = document.querySelector('.app-container');

    switch (mode) {
        case 'result':
            appElem.innerHTML =
                appElem.innerHTML +
                `<div class="shadow"></div>
                <div class="difficulty result">
                    <h1 class="difficulty__heading">Вы проиграли</h1>
                    <div class="difficulty__selection">
                        
                    </div>
                    <button class="btn result__again-btn">Играть снова</button>
                </div>
                `;

            appElem
                .querySelector('.result__again-btn')
                .addEventListener('click', () => {
                    window.cardGame.status = null;
                    renderApp(window.cardGame.status);
                });
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
                    <button class="btn again_btn">Начать заново</button>
                </div>
                <div class="game__field">
                </div>
            </div>
            <p>Сложность ${window.cardGame.difficulty}</p>
            <button class="btn back_btn">Назад</button>
            `;

            const backBtn = appElem.querySelector('.back_btn');
            backBtn.addEventListener('click', () => {
                window.cardGame.status = null;
                renderApp(window.cardGame.status);
            });

            const againBtn = appElem.querySelector('.again_btn');
            againBtn.addEventListener('click', () => {
                renderApp(window.cardGame.status);
            });

            renderGameField(window.cardGame.difficulty);
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

            const difficultyButtons = appElem.querySelectorAll(
                '.difficulty__selection-item'
            );
            window.cardGame.difficulty = '1';

            for (let button of difficultyButtons) {
                button.addEventListener('click', () => {
                    difficultyButtons.forEach((el) =>
                        el.classList.remove(
                            'difficulty__selection-item_checked'
                        )
                    );
                    button.classList.add('difficulty__selection-item_checked');
                    window.cardGame.difficulty = button.textContent;
                });
            }

            const startBtn = appElem.querySelector('.start-button');
            startBtn.addEventListener('click', () => {
                window.cardGame.status = 'game';
                renderApp(window.cardGame.status);
            });
    }
}

renderApp(window.cardGame.status);
