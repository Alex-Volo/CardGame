"use strict"

function renderApp(mode = 0) {
    const appElem = document.querySelector('.app-container')

    switch (mode) {

        case 'result': 
            appElem.innerHTML = appElem.innerHTML + ``;
            break;
        
        case 'game': 
            appElem.style.flexDirection = 'column';
            appElem.innerHTML = `
            <p>Игра</p>
            <p>Сложность ${localStorage.getItem('CardGame_difficulty')}</p>
            <button class="btn">Назад</button>
            `;

            const backBtn = appElem.querySelector('.btn');
            backBtn.addEventListener('click', () => {
            console.log('Старт')
            localStorage.removeItem('CardGame_status');
            renderApp(localStorage.getItem('CardGame_status'));
        })
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
        
        for(let button of difficultyButtons){
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