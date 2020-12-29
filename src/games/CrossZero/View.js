import * as $ from 'jquery';
// Класс отвечающий за UI: отрисовка/обновление/добавление элементов
let audio = new Audio();
export default class View {
    constructor(gameLogic) {
        this.gameLogic = gameLogic;

        // Инициализация нужных HTML элементов
        this.board = document.getElementById("game__board");
        this.metaBoard = document.getElementById("game__board-meta");
        this.board.innerHTML = '';
        this.gameState = this.gameLogic.gameState;
    }
    // const GAME_STATE = {
    //     isReadyToPlay: 0,
    //     inProcess: 1,
    //     isWined: 2,
    //     isLosed: 3,
    //     isDraw: 4,
    // }
    // Обновление UI в зависимости от исхода партии
    updateUiAfterEndParty(message, stateChanged) {

        if (message === 'Ничья') {
            this.metaBoard.textContent = 'Ну что ж, пока вы идете на равных, хочешь отыграться? Ход за тобой!';
            audio.src = './audio/fany-failure.mp3';
            audio.volume = 0.4;
            audio.play();
            stateChanged(4)
        } else if (message === 'Вы проиграли в партии') {
            audio.src = './audio/failure.mp3';
            audio.volume = 0.4;
            audio.play();
            this.metaBoard.textContent = 'Наступющий год оказался не так то прост для тебя? Возьми реванш!';
            stateChanged(3)
        } else {
            setTimeout(function()  {
                audio.src = './audio/win.mp3';
                audio.volume = 0.4;
                audio.play();
            }, 100);
        }
        // swal({ title: message, icon: alert });
        this.removeEvent();
        this.addElementToHistory(this.gameLogic.board);
    }

    setWhoseMove(isUser) {
        if (!isUser) {
            this.board.style.pointerEvents = 'none';
            if (this.gameLogic.gameState === 1)
                this.metaBoard.textContent = 'Ходит 2021!';
        } else {
            this.board.style.pointerEvents = 'all';
            if (this.gameLogic.gameState === 1)
                this.metaBoard.textContent = 'Твой ход!';
        }
    }

    // Добавление нового элемента в историю игр
    addElementToHistory() {
        // var historyBlock = document.getElementById("history");
        // var elementOfHistory = this.board.cloneNode(true);
        // historyBlock.appendChild(elementOfHistory);
    }

    // Удаления событий повешенных на ячейки игрового поля
    removeEvent() {
        const elements = this.board.getElementsByTagName("td");
        $(elements).unbind();
    }

    // Рестарт игры
    restart(board) {
        const elements = $(board).find("td");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = "";
            elements[i].classList.remove("x");
            elements[i].classList.remove("o");
        }
        // this.showBlock($(".choose-player"), "inline-block");
    }

    // Изменение видмости блока
    showBlock(element, blockStyle) {
        if (!$(element).is(":visible")) {
            $(element).fadeIn(250);
            $(element).css({ display: blockStyle });
        } else $(element).fadeOut(250);
    }

    // Отрисовка таблицы согласно заданным размерам
    renderTable(boardLength) {
        for (let j = 0; j < boardLength; j++) {
            let row = document.createElement("tr");

            for (var i = 0; i < boardLength; i++) {
                let cell = document.createElement("td");
                row.appendChild(cell);
            }

            this.board.appendChild(row);
        }
    }

    // Занятие ячейки игрового поля
    occupationCell(x, y, icon) {
        this.board.rows[x].cells[y].innerHTML = `<div class="re-${icon}">${icon}</div>`;
        this.board.rows[x].cells[y].classList.add(icon);
    }
}
