"use strict"

function renderApp(mode = "difficulty") {
    const appElem = document.querySelector('.app-container')

    switch (mode) {
        case "difficulty": 
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
            `
    }
    const difficultyButtons = document.querySelectorAll('.difficulty__selection-item');
    for(let button of difficultyButtons){
        button.addEventListener('click', () => {
            difficultyButtons.forEach((el) => el.classList.remove('difficulty__selection-item_checked'));
            button.classList.add('difficulty__selection-item_checked')
        })
    }
}

renderApp();